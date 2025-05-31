import { getUser } from "../../database";
import { NextRequest, NextResponse } from "next/server";
// Update the path below to the correct relative location of your .firebase-admin file
import { testFirebaseConnection } from "../../../firebase-admin";

// export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userIds = searchParams.getAll("userIds");

  if (!userIds || !Array.isArray(userIds)) {
    return new NextResponse("Missing or invalid userIds", { status: 400 });
  }
  if (!userIds || !Array.isArray(userIds)) {
    return new NextResponse("Missing or invalid userIds", { status: 400 });
  }

  await testFirebaseConnection();

  return NextResponse.json(
    userIds.map((userId) => getUser(userId)?.info || null),
    { status: 200, }
  );
}
