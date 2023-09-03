import { config } from "dotenv";
config({ path: "./.env.development.local", debug: true, encoding: "UTF-8" });
import { createInterface } from "node:readline/promises";
import { hackConfigs } from "./config";
import { createClient } from "@vercel/postgres";
import { stdin, stdout } from "node:process";
import { webcrypto } from "crypto";
import qrcode from "qrcode";

const domain = "https://jaro-hacking.vercel.app/";
const decryptPath = "decrypt";

async function main() {
  await prepareDataBase();
}

async function prepareDataBase() {
  const sqlClient = createClient();
  const rl = createInterface({ input: stdin, output: stdout });
  await sqlClient.connect();

  await sqlClient.sql`DROP TABLE IF EXISTS hack`;

  await sqlClient.sql`CREATE TABLE Hack (
    id INT NOT NULL PRIMARY KEY,
    password VARCHAR(50),
    jwk JSONB,
    iv BYTEA
    );`;

  sqlClient;

  for (const hack of hackConfigs) {
    const hackId = hack.hackId;
    let password: string | null = null;
    let jwk: JsonWebKey | null = null;
    if (hack.isAuthenticated) {
      if (hack.component === "CommonlyUsedPasswords") {
        password = "123456";
      } else {
        password = generateRandomString(8);
      }
    }
    if (hack.hasSecret) {
      const secret = await rl.question(`Geheimnis für hackId: ${hackId}?\n`);
      const cryptoKey = (await webcrypto.subtle.generateKey(
        { name: "AES-CBC", length: 128 },
        true,
        ["decrypt", "encrypt"]
      )) as CryptoKey;

      jwk = await webcrypto.subtle.exportKey("jwk", cryptoKey);

      const iv = webcrypto.getRandomValues(new Uint8Array(16));
      console.log(Buffer.from(iv).toString("base64url"));
      const encrypted = await webcrypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        cryptoKey,
        Buffer.from(secret)
      );
      const encryptedBase64url = Buffer.from(encrypted).toString("base64url");
      console.log(encryptedBase64url);
      const buf = Buffer.from(encryptedBase64url, "base64url");
      const decrypted = await webcrypto.subtle.decrypt(
        { name: "AES-CBC", iv: iv },
        cryptoKey,
        buf
      );
      console.log(Buffer.from(decrypted).toString("utf-8"));
      qrcode.toFile(
        `./gifts/qr/${hackId}.png`,
        `${domain}${decryptPath}?secret=${encryptedBase64url}`,
        { errorCorrectionLevel: "L", width: 512, type: "png" }
      );

      console.log("password: ", password);
      await sqlClient.query(
        `INSERT INTO hack
        VALUES ($1, $2, $3, $4)`,
        [hackId, password, jwk, iv]
      );

      const { rows } =
        await sqlClient.sql`SELECT * FROM hack WHERE id = ${hackId}`;

      const iv2 = rows[0].iv;
      const jwk2 = rows[0].jwk;

      const key2 = await webcrypto.subtle.importKey(
        "jwk",
        jwk2,
        "AES-CBC",
        false,
        ["decrypt"]
      );

      const decrypted2 = await webcrypto.subtle.decrypt(
        { name: "AES-CBC", iv: iv2 },
        key2,
        buf
      );

      console.log(Buffer.from(decrypted2).toString("utf-8"));
    }
  }
  await sqlClient.end();
  rl.close();
}

function generateRandomString(length: number) {
  const possibleChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const chars = new Array(length);
  for (let i = 0; i < length; i++) {
    const char =
      possibleChars[Math.floor(Math.random() * possibleChars.length)];
    chars[i] = char;
  }
  return chars.join("");
}

main();
