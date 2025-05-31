"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import { getRoomId } from "../config";
import { TitleEditor } from "../components/TitleEditor";

export function Room({
  pageId,
  children,
}: {
  pageId: string;
  children: React.ReactNode;
}) {
  const roomId = getRoomId(pageId);

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
      initialStorage={{
        title: "Untitled document",
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => (
          <>
            {/* <TitleEditor /> */}
            {children}
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
