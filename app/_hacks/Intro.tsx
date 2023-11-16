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
      <p>Am besten verwendest du den Microsoft Edge Browser für diese Internetseite!</p>
      <p className="mb-6">Ich hoffe du hast Spaß!</p>
      <Link
        href={`/hack/${context.params.id + 1}`}
        className="middle none center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Weiter
      </Link>
    </div>
  );
}
