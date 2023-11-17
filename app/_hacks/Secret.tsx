import { createClient } from "@vercel/postgres";
import { HackContext } from "../hack/HackContext";
import Image from "next/image";
import ResourceLink from "../_components/ResourceLink";

export default async function Secret(context: HackContext) {
  const sqlClient = createClient();
  await sqlClient.connect();
  const hackData =
    await sqlClient.sql`SELECT secret FROM hack WHERE id=${context.params.id}`;
  const secret = hackData.rows[0]?.secret;
  return (
    <div>
      <p>Gut gemacht!</p>
      <p>Der Code für das Zahlenschloss lautet: {secret}</p>
      <b>Zusatz Herausforderung:</b>
      <p>
        Es existiert noch eine weitere, geheime 6. Seite. Dort drauf zu kommen
        ist allerdings wirklich nicht einfach, weswegen ich dass einfach als
        Herausforderung lasse. Unten stehen trotzdem einige Hinweise wie man zur
        nächsten Seite kommen könnte.
      </p>
      <p>
        Wenn du in den Devtools auf die Registerkarte "Netzwerk" gehst, kannst
        du die Kommunikation zwischen deinem Browser und dem Server, auf dem
        diese Website liegt, ansehen.
      </p>
      <p>
        Versuche doch einmal wie im ersten Rätsel (am besten in einem neuen
        Browser Tab) manuell zum nächsten hack zu gehen und schaue dir im
        Netzwerk Tab die Anfrage an. Diese sollte eine rot markierte "6" sein.
        Rot markiert ist sie, da du derzeit noch keinen Zugriff auf diese Seite
        hast. Der Server antwortet hier mit einem "Status 403: forbidden"
      </p>
      <p>
        Klickst du auf die Anfrage kannst du die Kopfzeilen (zusätzliche
        Informationen über die Anfrage, in welchen auch oft ein Nachweis über
        die Zugriffsrechte auf eine Seite vorhanden ist) anzeigen lassen.
      </p>
      <Image src={"/Token.png"} alt="Token" width={1920} height={1080}></Image>
      <p>
        Am interessantesten ist hier die im Bild gelb markierte Kopfzeile
        "Cookies". Cookies sind Informationen die dein Browser automatisch an
        den Server mitsendet, oft um sicherzustellen dass es sich um einen
        bestimmten Nutzer handelt. Im Fall des Bildes gibts es einen "Cookie"
        mit dem namen "token" und dem Wert
        <code className="break-all block py-2">
          eyJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6IjMgNCA1IiwiaWF0IjoxNzAwMTQ5MDcxLCJpc3MiOiJqYXJvaGFja2luZyIsImF1ZCI6Imphcm9oYWNraW5nIn0.gn-7U1xjDbovC1KwJFGOjl1DcX59oO-BqKkZSTgxJIQ
        </code>
        Das ganze ist ein
        <ResourceLink href="https://jwt.io/">JWT token</ResourceLink>. Diesen
        Token Cookie findest du auch in den Devtools im Tab "Anwendung" und dort
        auf der linken Seite unter "Speicher", "Cookies" und der URL dieser
        Internetseite.
      </p>
      <p>
        An dieser Stelle kannst du den Wert dieses token auch verändern! Nur wie
        und was genau?
      </p>
      <p>
        Kopiere doch deinen Token einmal in die linke "Encoded" Seite der
        <ResourceLink href="https://jwt.io/">JWT token</ResourceLink> Seite.
      </p>
      <p>
        Auf der rechten Seite siehst du, dass die "Payload" einen Eintrag
        "scope" hat. Dass sind alle Seiten auf welche du mit diesem Token
        Zugriff hast. Auf der Seite kannst du auf der rechten "Decoded" Seite
        auch einfach einen Eintrag für die Seite 6 im scope
        hinzufügen ("scope": "3 4 5 6"). Dadurch ändert sich der Token auf der
        linken "Encoded" Seite.
      </p>
      <p>
        Wäre diese Internetseite komplett unsicher, könntest du dieses Token
        jetzt nehmen und den Wert des Cookies über die Devtools mit deinem
        modifizierten Token überschreiben. Versuch dass doch einfach mal!
      </p>
      <p>
        Du solltest bei dem Versuch einen Fehler "Ungültige Token Signatur"
        bekommen. Der Server hat gemerkt das jemand diesen token manipuliert
        hat.
      </p>
      <p>
        Es gibt allerdings auf dieser Seite einen Bug der dazu führt, dass beim
        freischalten einer nächsten Seite alle bereits vorhandenen scope
        einträge aus einem nicht korrekt signierten token in das neue, dann
        korrekt signierte, token übernommen werden.
      </p>
      <p>
        Findest du einen Weg dass der Server dein modifiziertes Token signiert und du damit dann auf die 6. Seite gelangst?
      </p>
    </div>
  );
}
