"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
// Import your Firebase functions if you want to use them for user/room info
// import { getUsersByIds, searchUsers, getRoomsInfo } from "./firebase";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      // Optionally, implement these with Firebase if needed:
      // resolveUsers={getUsersByIds}
      // resolveMentionSuggestions={searchUsers}
      // resolveRoomsInfo={getRoomsInfo}
    >
      {children}
    </LiveblocksProvider>
  );
}
