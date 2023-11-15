import { createClient } from "@vercel/postgres";
import { HackContext } from "../hack/HackContext";

export default async function Secret(context: HackContext) {
  const sqlClient = createClient();
  await sqlClient.connect();
  const hackData =
    await sqlClient.sql`SELECT secret FROM hack WHERE id=${context.params.id}`;
  const secret = hackData.rows[0]?.secret;
  return <div>Secret: {secret}</div>;
}
