// Remove the OpenAI import
// import { OpenAIChatModelId } from "@ai-sdk/openai/internal/dist";

// Use a string for the Hugging Face model ID
export const aiModel = "HuggingFaceH4/zephyr-7b-beta";

export function getRoomId(pageId: string) {
  return `liveblocks:rooms:${pageId}`;
}

export function getPageId(roomId: string) {
  return roomId.split(":")[2];
}

export function getPageUrl(roomId: string) {
  return `/${getPageId(roomId)}`;
}
