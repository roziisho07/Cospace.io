"use client";

import { useStorage, useMutation } from "@liveblocks/react";
import { useState, useEffect } from "react";

export function TitleEditor() {
  // Get the title from Liveblocks storage
  const title = useStorage((root) => root.title as string);

  // Mutation to update the title in storage
  const updateTitle = useMutation(({ storage }, newTitle: string) => {
    storage.set("title", newTitle);
  }, []);

  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(title);

  // Sync input with storage title
  useEffect(() => {
    setInput(title);
  }, [title]);

  return (
    <div className="mb-2 bg-slate-400 flex items-center justify-between p-2 rounded">
      {editing ? (
        <input
          className="border px-2 py-1 rounded"
          value={input ?? ""}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => {
            updateTitle(input ?? "");
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateTitle(input ?? "");
              setEditing(false);
            }
          }}
          autoFocus
        />
      ) : (
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => setEditing(true)}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
