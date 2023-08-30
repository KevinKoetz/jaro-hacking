"use client";

import { useRouter } from "next/navigation";

export default function Unlock({ hackId }: { hackId: number }) {
  const router = useRouter();
  const unlock = async () => {
    const res = await fetch("/api/unlock", { method: "POST" });
    if (res.status === 200) {
      router.push(`/hack/${3}`);
    }
  };
  return <button onClick={unlock}>Unlock</button>;
}
