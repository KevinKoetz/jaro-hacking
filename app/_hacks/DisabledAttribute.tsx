import { createClient } from "@vercel/postgres";
import Unlock from "../_auth/Unlock";
import { HackContext } from "../hack/HackContext";

export default async function DisabledAttribute(context: HackContext) {
  const sqlClient = createClient();
  await sqlClient.connect();
  const hackData = await sqlClient.sql`SELECT password FROM hack WHERE id=${
    context.params.id + 1
  }`;
  const password = hackData.rows[0]?.password;

  return (
    <div>
      Disabled Attribute
      <Unlock
        hackId={context.params.id + 1}
        password={password}
        disabled={true}
      ></Unlock>
    </div>
  );
}
