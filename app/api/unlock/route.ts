import { NextRequest, NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { cookies, headers } from "next/headers";

export async function POST(request: NextRequest) {
  //TODO: Implement actual logic for each site
  const tokenSecret = process.env["ENCRYPTION_SECRET"];
  if (tokenSecret === undefined) {
    return new NextResponse(null, { status: 500 });
  }

  const jwt = jsonwebtoken.sign(
    { scope: "0 1 2 3 4 5 6 7 8 9 10 11 12" },
    tokenSecret
  );
  const responseCookies = cookies().set("token", jwt, {
    httpOnly: true,
    sameSite: "strict",
  });
  return new NextResponse(null, {
    headers: { "Set-Cookie": responseCookies.toString() },
  });
}
