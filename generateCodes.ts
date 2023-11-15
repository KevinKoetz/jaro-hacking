import { config } from "dotenv";
config({ path: "./.env.development.local", debug: true, encoding: "UTF-8" });
import { createInterface } from "node:readline/promises";
import { hackConfigs } from "./config";
import { createClient } from "@vercel/postgres";
import { stdin, stdout } from "node:process";

async function main() {
  await prepareDataBase();
}

async function prepareDataBase() {
  const sqlClient = createClient();
  const rl = createInterface({ input: stdin, output: stdout });
  await sqlClient.connect();

  await sqlClient.sql`DROP TABLE IF EXISTS hack`;

  await sqlClient.sql`CREATE TABLE hack (
    id INT NOT NULL PRIMARY KEY,
    password VARCHAR(50),
    secret VARCHAR(200)
    );`;

  for (const [id, hack] of Object.entries(hackConfigs)) {
    const hackId = hack.hackId;
    let password: string | null = null;
    let secret: string | null = null;
    if (hack.isAuthenticated) {
      if (hackConfigs[Number.parseInt(id) - 1].component === "CommonlyUsedPasswords") {
        password = "123456";
      } else {
        password = generateRandomString(8);
      }
    }
    if (hack.hasSecret) {
      secret = await rl.question(`Geheimnis für hackId: ${hackId}?\n`);
    }
    await sqlClient.query(
      `INSERT INTO hack
      VALUES ($1, $2, $3)`,
      [hackId, password, secret]
    );
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
