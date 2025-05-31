"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";

const AVATAR_SIZE = 36;

export function Avatars() {
  return (
    <ClientSideSuspense
      fallback={
        <div className="flex items-center">
          <AvatarPlaceholder />
          <div className="ml-2 text-gray-500 text-sm select-none"></div>
        </div>
      }
    >
      <AvatarStack />
    </ClientSideSuspense>
  );
}

function AvatarStack() {
  const users = useOthers();
  const currentUser = useSelf();

  // Combine current user and others for stacking
  const allUsers = [
    ...(currentUser ? [{ ...currentUser, isCurrent: true }] : []),
    ...users.map((u) => ({ ...u, isCurrent: false })),
  ];

  return (
    <div className="flex items-center">
      <div className="flex">
        {allUsers.map((user, idx) => (
          <div
            key={user.connectionId ?? "self"}
            className={idx === 0 ? "" : "-ml-2"}
          >
            <Avatar
              src={user.info.avatar}
              name={user.isCurrent ? "You" : user.info.name}
            />
          </div>
        ))}
      </div>
      <div className="ml-2 text-gray-500 text-sm select-none">
        {allUsers.length} user{allUsers.length !== 1 && "s"} editing
      </div>
    </div>
  );
}

export function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="group flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
      data-tooltip={name}
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
        {name}
      </div>
      <img
        alt={name}
        src={src}
        className="w-full h-full rounded-full"
        data-tooltip={name}
      />
    </div>
  );
}

export function AvatarPlaceholder() {
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="group flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
    >
      <div className="w-full h-full rounded-full bg-neutral-200" />
    </div>
  );
}
