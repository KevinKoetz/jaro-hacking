import { createClient } from "@vercel/postgres";
import Unlock from "../_auth/Unlock";
import { HackContext } from "../hack/HackContext";
import ResourceLink from "../_components/ResourceLink";
import Image from "next/image";

export default async function DisabledAttribute(context: HackContext) {
  const sqlClient = createClient();
  await sqlClient.connect();
  const hackData = await sqlClient.sql`SELECT password FROM hack WHERE id=${
    context.params.id + 1
  }`;
  const password = hackData.rows[0]?.password;

  return (
    <div>
      <p>
        Gut gemacht! Die nächsten Seiten sind allerdings nicht so einfach zu
        erreichen.
      </p>
      <p>
        Auf diese Seite gibt es bereits einen Button "Nächste Seite
        Freischalten" welcher dich zur nächsten Aufgabe bringt.
      </p>
      <p>
        Leider hat jemand diesem Button das "disabled" Atribut
        (deaktiviert/ausgeschalten). Deine Aufgabe ist es, den Button wieder zu
        aktivieren!
      </p>
      <p>
        Über einen Rechtsklick auf die Internetseite und dann einen klick auf
        "Untersuchen" oder alternativ über die "F12" Taste und anschließende
        auswahl von "Elemente" in den Registerkarten, kannst du die
        <ResourceLink href="https://learn.microsoft.com/de-de/microsoft-edge/devtools-guide-chromium/landing/">
          Entwicklertools
        </ResourceLink>
        öffnen. Eventuell fragt dich dein Browser beim ersten öffnen ob du das
        wirklich tun möchtest, bestätige dies einfach.
      </p>
      <p>
        Du solltest die Tools wie auf der rechten Seite dieses Bildes sehen:
      </p>
      <Image
        src={"/Devtools.png"}
        alt="Devtools"
        width={1920}
        height={1080}
      ></Image>
      <p>
        Wenn du mit der Maus über die
        <ResourceLink href="https://de.wikipedia.org/wiki/Hypertext_Markup_Language">
          Html
        </ResourceLink>
        Elemente hoverst, zeigt der Browser dir das Element visuell an. Andersherum kannst du über den rot eingekreisten Button ein Element auf der Internetseite auswählen und es wird rechts geöffnet.
        Alternativ kannst du nach einem klick in die Devtools, die Elemente auch mit "STRG + F" durchsuchen.
      </p>
      <p>
        Findest du den Button und kannst das disabled Attribut entfernen?
      </p>
      <Unlock
        hackId={context.params.id + 1}
        password={password}
        disabled={true}
      ></Unlock>
    </div>
  );
}
