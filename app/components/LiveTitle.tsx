"use client";
import { RoomProvider, useStorage } from "@liveblocks/react";
import { getRoomId } from "../config";

function LiveTitleInner({ fallback }: { fallback: string }) {
  const title = useStorage((root) => root.title as string);
  return <>{title || fallback}</>;
}

export function LiveTitle({
  pageId,
  fallback,
}: {
  pageId: string;
  fallback: string;
}) {
  return (
    <RoomProvider
      id={getRoomId(pageId)}
      initialStorage={{ title: "Untitled document" }}
    >
      <LiveTitleInner fallback={fallback} />
    </RoomProvider>
  );
}
