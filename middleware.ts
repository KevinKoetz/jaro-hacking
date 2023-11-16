import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import canAccess from "./app/_auth/canAccess";
import { errors } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const hackId = extractHackId(request);
  request.cookies;

  if (hackId instanceof Error) {
    return new NextResponse(hackId.message, { status: 404 });
  }
  try {
    if (!(await canAccess(hackId, request.cookies))) {
      console.log("Access denied for hackId: ", hackId);
      return new NextResponse(null, { status: 403 });
    }
  } catch (error) {
    if (error instanceof errors.JWSSignatureVerificationFailed) {
      return new NextResponse("Ungültige Token Signatur", { status: 400 });
    }
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
