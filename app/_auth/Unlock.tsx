"use client";

import { useRouter } from "next/navigation";
import { UnlockDto } from "../api/unlock/unlockDto";

export default function Unlock({ hackId }: { hackId: number }) {
  const router = useRouter();
  const unlock = async () => {
    const nextHack = hackId + 1;
    const res = await fetch("/api/unlock", {
      method: "POST",
      body: JSON.stringify({ hackId: nextHack } satisfies UnlockDto),
    });
    if (res.status === 200) {
      router.push(`/hack/${nextHack}`);
    }
  };
  return <button onClick={unlock}>Unlock</button>;
}
