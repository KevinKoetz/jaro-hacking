import Link from "next/link";
import { HackContext } from "../hack/HackContext";
import ResourceLink from "../_components/ResourceLink";

export default function UrlManipulation(context: HackContext) {
  return (
    <div>
      <p>
        Manchmal sind Internetseiten mit sensibelen Information einfach nur
        dadurch versteckt, dass man Sie nicht über einen Link erreichen kann.
      </p>
      <p>Findest du einen Weg, trotzdem zur nächsten Aufgabe zu kommen?</p>
      <p className="mb-6">
        Wirf dazu am besten einen Blick auf die
        <ResourceLink
          href={"https://de.wikipedia.org/wiki/Uniform_Resource_Locator"}
        >
          URL
        </ResourceLink>
        dieser Seite und der vorherigen. Fällt dir etwas am
        <ResourceLink
          href={
            "https://de.wikipedia.org/wiki/Uniform_Resource_Locator#Pfad_(Path)"
          }
        >
          Pfad
        </ResourceLink>
        auf?
      </p>
      <Link
        href={`/hack/${context.params.id - 1}`}
        className="middle none  center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Zurück
      </Link>
    </div>
  );
}
