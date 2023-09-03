import { hackConfigs } from "@/config";
import { FC } from "react";

export async function generateStaticParams() {
  return await Promise.all(
    hackConfigs.map(async (config) => ({
      id: config.hackId.toString(),
    }))
  );
}

export default async function HackPage(context: { params: { id: string } }) {
  const id = Number.parseInt(context.params.id);
  if (Number.isNaN(id) || id < 0 || id > hackConfigs.length - 1) {
    throw new Error("Ungültiger Pfad Parameter.");
  }
  const component = (
    await import(`../../_hacks/${hackConfigs[id].component}.tsx`)
  ).default;
  return component({ params: { id } });
}
