import { hackConfigs } from "@/config";
import { jwtVerify } from "jose";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export default async function canAccess(hack: number, cookies: RequestCookies) {
  if (hackConfigs[hack]?.isAuthenticated) {
    const jwt = cookies.get("token")?.value;
    console.log(jwt);
    if (jwt === undefined) {
      return false;
    }
    const secretEnv = process.env["ENCRYPTION_SECRET"];
    if (secretEnv === undefined) {
      throw new Error("Encryption secret is undefined.");
    }
    const secret = new TextEncoder().encode(secretEnv);
    const result = await jwtVerify(jwt, secret);

    if (typeof result.payload.scope !== "string") {
      return false;
    }

    const scopes: number[] = result.payload.scope
      .split(" ")
      .map((scope: string) => Number.parseInt(scope));
    console.log(scopes);
    return scopes.includes(hack);
  } else {
    return true;
  }
}
