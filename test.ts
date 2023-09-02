import { config } from "dotenv";
config({path: "./.env.local"})
console.log(process.env);
import { sql } from "@vercel/postgres";

async function main() {
  const res = await sql`DROP TABLE hack`;
  console.log(res);
}

main();
