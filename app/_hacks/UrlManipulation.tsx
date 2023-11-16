import Link from "next/link";
import { HackContext } from "../hack/HackContext";

export default function UrlManipulation(context: HackContext) {
  return (
    <div>
      <p className="mb-6">UrlManipulation</p>
      <Link
        href={`/hack/${context.params.id - 1}`}
        className="middle none center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Zurück
      </Link>
    </div>
  );
}
