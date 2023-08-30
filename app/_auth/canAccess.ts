import jsonwebtoken from "jsonwebtoken";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export default function canAccess(hack: number, request: NextRequest) {
  switch (hack) {
    case 0:
    case 1:
      return true;
    default:
      const jwt = cookies().get("token")?.value;
      if (jwt === undefined) {
        return false;
      }
      const secret = process.env["ENCRYPTION_SECRET"];
      if (secret === undefined) {
        throw new Error("Encryption secret is undefined.");
      }
      //TODO: Add Propper Options
      const payload = jsonwebtoken.verify(jwt, secret);
      if (typeof payload === "string") {
        throw new Error("Invalid Token.");
      }
      const scopes: number[] = payload.scope
        .split(" ")
        .map((scope: string) => Number.parseInt(scope));
      return scopes.includes(hack);
  }
}

function extractJwt(request: NextRequest): string | Error {
  const authHeader = request.headers.get("Authorization");
  if (authHeader === null) {
    return new Error("Missing Authorization Header.");
  }
  const [type, token] = authHeader.split(" ");
  if (type.toLowerCase() !== "bearer") {
    return new Error("Invalid Authentication Method.");
  }
  return token;
}
