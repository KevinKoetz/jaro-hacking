import { createClient } from "@vercel/postgres";
import Unlock from "../_auth/Unlock";
import Comment from "../_components/Comment";
import { HackContext } from "../hack/HackContext";

export default async function PasswordAsComment(context: HackContext) {
  const sqlClient = createClient();
  await sqlClient.connect();
  const hackData = await sqlClient.sql`SELECT password FROM hack WHERE id=${
    context.params.id + 1
  }`;
  const password = hackData.rows[0]?.password;
  return (
    <div>
      Password As Comment
      <Comment comment={`Testweise Zugang über Adminpasswort: ${password} `} />
      <Unlock hackId={context.params.id + 1}></Unlock>
    </div>
  );
}
