import { redirect } from "next/navigation";
import {
  listRoomsFromFirebase,
  createRoomInFirebase,
} from "./utils/liveblocks";
import { getPageUrl } from "./config";

export const maxDuration = 30;
export const revalidate = 0;

export default async function Page() {
  // Get the first room from Firebase
  const rooms = await listRoomsFromFirebase(1);
  let room = rooms[0];

  // If no room exists, create one
  if (!room) {
    room = await createRoomInFirebase();
    console.log("No room found, created a new one:", room);
  }

  console.log("Redirecting to room:", room);
  redirect(getPageUrl(room.roomId));
}
