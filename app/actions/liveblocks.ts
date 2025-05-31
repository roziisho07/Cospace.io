"use server";
import {
  createRoomInFirebase,
  listRoomsFromFirebase,
  getRoomFromFirebase,
} from "../utils/liveblocks";
import { getPageUrl } from "../config";

// Room type for clarity
type Room = {
  roomId: string;
  pageId: string;
  title: string;
  [key: string]: any;
};

// Get info for a list of room IDs from Firebase
export async function getRoomInfo(
  roomIds: string[]
): Promise<{ name: string; url: string; pageId: string; roomId: string }[]> {
  const validRoomIds = roomIds.filter(Boolean);
  const rooms = await Promise.all(
    validRoomIds.map((roomId) => getRoomFromFirebase(roomId))
  );

  return rooms.map((room, index) => ({
    name: room?.title ?? "Untitled",
    url: getPageUrl(validRoomIds[index]),
    pageId: room?.pageId ?? "",
    roomId: validRoomIds[index] ?? "",
  }));
}

// Create a new room in Firebase (optionally with a title)
export async function createRoomWithLexicalDocument(
  markdown: string,
  title?: string
) {
  const room = await createRoomInFirebase(title);
  // Add logic here if you want to store markdown in Firebase
  return room;
}

// List rooms and their info from Firebase
export async function getRoomsAndInfo({ limit = 10 }: { limit?: number }) {
  const rooms: Room[] = await listRoomsFromFirebase(limit);
  const roomIds = rooms.map((room) => room.roomId).filter(Boolean);
  const roomsInfo = await getRoomInfo(roomIds);

  const finalRooms = rooms.map((room, index) => ({
    ...room,
    pageId: room.pageId ?? roomsInfo[index]?.pageId ?? "",
    roomId: room.roomId ?? roomsInfo[index]?.roomId ?? "",
    info: roomsInfo[index] ?? {
      name: "Untitled",
      url: "#",
      pageId: "",
      roomId: "",
    },
  }));

  return { rooms: finalRooms };
}
