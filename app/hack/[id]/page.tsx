import { hackConfigs } from "@/config";
import { HackContext } from "../HackContext";
import MatrixBackground from "@/app/_components/MatrixBackground";

export async function generateStaticParams() {
  return await Promise.all(
    hackConfigs.map(async (config) => ({
      id: config.hackId.toString(),
    }))
  );
}

export default async function HackPage(context: HackContext) {
  const id = Number.parseInt(context.params.id as unknown as string);
  if (Number.isNaN(id) || id < 0 || id > hackConfigs.length - 1) {
    throw new Error("Ungültiger Pfad Parameter.");
  }
  const component = (
    await import(`../../_hacks/${hackConfigs[id].component}.tsx`)
  ).default;
  return (
    <>
      <div className="container mx-auto bg-gray-50/80 p-5 m-10">{component({ params: { id } })}</div>
    </>
  );
}
