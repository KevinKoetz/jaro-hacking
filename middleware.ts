import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import canAccess from "./app/_auth/canAccess";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const hackId = extractHackId(request);
  if (hackId instanceof Error) {
    return new NextResponse(hackId.message, { status: 404 });
  }
  if (!canAccess(hackId, request)) {
    return new NextResponse(null, { status: 403 });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/hack/:id*",
};

function extractHackId(request: NextRequest): number | Error {
  console.log(request.nextUrl.pathname);
  const lastPathSegment = request.nextUrl.pathname.split("/").at(-1);
  if (lastPathSegment === undefined) {
    return new Error("Invalid Path.");
  }
  const hackId = Number.parseInt(lastPathSegment);
  if (Number.isNaN(hackId) || hackId < 0) {
    return new Error("Invalid HackId.");
  }
  return hackId;
}
