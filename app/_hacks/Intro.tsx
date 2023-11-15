import Link from "next/link";
import { HackContext } from "../hack/HackContext";

export default function Intro(context: HackContext) {
  return (
    <div>
      Hallo Jaro,
      <p>
        auf dieser Internetseite findest du ein paar kleine Aufgaben/Rätsel nach
        deren Lösung du den Code für das Zahlenschloss an deinem Geschenk finden
        wirst.
      </p>
      <p>Ich hoffe du hast Spaß!</p>
      <Link href={`/hack/${context.params.id + 1}`}>Weiter</Link>
    </div>
  );
}
