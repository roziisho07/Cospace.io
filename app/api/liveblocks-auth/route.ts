import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

// Authenticating your Liveblocks application
// https://liveblocks.io/docs/authentication

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

// export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Get the current Clerk user
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Create a Liveblocks session for the current user
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.firstName ?? user.username ?? "Anonymous",
      avatar: user.imageUrl,
      color:
        typeof user.publicMetadata?.color === "string"
          ? user.publicMetadata.color
          : "#000000", // Default color if not set
      // color: you can add a color property if you want, e.g. "#ff0000"
    },
  });

  // Allow access to all your Firebase-backed rooms
  session.allow("liveblocks:rooms:*", session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
