import { NextRequest, NextResponse } from "next/server";
import { SignJWT, decodeJwt, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { UnlockDto } from "./unlockDto";
import { createClient } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  const body: UnlockDto = await request.json();
  let hackId = body.hackId;
  let password = body.password;

  const sqlClient = createClient();
  await sqlClient.connect();
  const hackData =
    await sqlClient.sql`SELECT password FROM hack WHERE id=${hackId}`;
    
  if (hackData.rows[0]?.password !== password) {
    sqlClient.end();
    return new NextResponse(null, { status: 401 });
  }
  sqlClient.end();

  const tokenSecretEnv = process.env["ENCRYPTION_SECRET"];
  if (tokenSecretEnv === undefined) {
    return new NextResponse(null, { status: 500 });
  }

  const previousJwt = cookies().get("token")?.value;
  let decodedJwt: null | JWTPayload = null;
  if (previousJwt) {
    //Intentional Bug
    decodedJwt = decodeJwt(previousJwt);
  }
  let previousScope: number[] = [];
  if (typeof decodedJwt?.scope === "string") {
    previousScope = decodedJwt.scope.split(" ").map((v) => Number.parseInt(v));
  }
  if (!previousScope.includes(hackId)) {
    previousScope.push(hackId);
  }

  const secret = new TextEncoder().encode(tokenSecretEnv);
  const alg = "HS256";

  const jwt = await new SignJWT({ scope: previousScope.join(" ") })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("jarohacking")
    .setAudience("jarohacking")
    .sign(secret);

  const responseCookies = cookies().set("token", jwt, {
    httpOnly: true,
    sameSite: "strict",
  });
  return new NextResponse(null, {
    headers: { "Set-Cookie": responseCookies.toString() },
  });
}
