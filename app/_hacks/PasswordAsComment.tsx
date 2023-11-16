import { createClient } from "@vercel/postgres";
import Unlock from "../_auth/Unlock";
import Comment from "../_components/Comment";
import { HackContext } from "../hack/HackContext";
import ResourceLink from "../_components/ResourceLink";

export default async function PasswordAsComment(context: HackContext) {
  const sqlClient = createClient();
  await sqlClient.connect();
  const hackData = await sqlClient.sql`SELECT password FROM hack WHERE id=${
    context.params.id + 1
  }`;
  const password = hackData.rows[0]?.password;
  return (
    <div>
      <p>
        Manchmal sind es die Entwickler selbst, die Geheimnisse in Quellcode
        vergessen.
      </p>
      <p>
        Es scheint mir als hätte hier ein Entwickler das Passwort als
        <ResourceLink href="https://de.w3docs.com/html-lernen/html-kommentare.html">
          HTML Kommentar
        </ResourceLink>
        im Quellcode vergessen. Vielleicht findest du es über die Devtools?
      </p>
      <b>Bitte beachte dass das Passwort nicht der einzige Kommentar sein muss.</b>
      <Comment comment={`Testweise Zugang über Adminpasswort: ${password} `} />
      <Unlock hackId={context.params.id + 1}></Unlock>
    </div>
  );
}
