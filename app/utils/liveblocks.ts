"use server";

import { adminDb } from "../../firebase-admin";
import { getRoomId } from "../config";

// Create a new room in Firebase
export async function createRoomInFirebase(
  title: string = "Untitled document"
) {
  const pageId = crypto.randomUUID();
  const roomId = getRoomId(pageId);

  await adminDb.collection("rooms").doc(roomId).set({
    title,
    pageId,
    createdAt: Date.now(),
  });

  return { roomId, pageId, title };
}

// List rooms from Firebase
export async function listRoomsFromFirebase(limit = 10) {
  const snapshot = await adminDb.collection("rooms").limit(limit).get();
  const rooms = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      roomId: doc.id,
      pageId: data.pageId ?? "",
      title: data.title ?? "",
      ...data,
    };
  });
  return rooms;
}

// Get a room from Firebase
export async function getRoomFromFirebase(roomId: string) {
  const doc = await adminDb.collection("rooms").doc(roomId).get();
  if (!doc.exists) return null;
  const data = doc.data() ?? {};
  return {
    roomId: doc.id,
    pageId: data.pageId ?? "",
    title: data.title ?? "",
    ...data,
  };
}
