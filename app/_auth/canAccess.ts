import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export default async function canAccess(hack: number) {
  console.log(hack);
  switch (hack) {
    case 0:
    case 1:
      return true;
    default:
      const jwt = cookies().get("token")?.value;
      console.log(jwt);
      if (jwt === undefined) {
        console.log("here?");
        return false;
      }
      const secretEnv = process.env["ENCRYPTION_SECRET"];
      if (secretEnv === undefined) {
        throw new Error("Encryption secret is undefined.");
      }
      const secret = new TextEncoder().encode(secretEnv);
      //TODO: Add Propper Options
      const result = await jwtVerify(jwt, secret);

      if (typeof result.payload.scope !== "string") {
        return false;
      }

      const scopes: number[] = result.payload.scope
        .split(" ")
        .map((scope: string) => Number.parseInt(scope));
      console.log(scopes);
      return scopes.includes(hack);
  }
}
