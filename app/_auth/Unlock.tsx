"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UnlockDto } from "../api/unlock/unlockDto";

export default function Unlock({
  hackId: hackId,
  password: providedPassword,
  disabled,
}: {
  hackId: number;
  password?: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement | null>();
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const unlock = async () => {
      const res = await fetch("/api/unlock", {
        method: "POST",
        body: JSON.stringify({
          hackId,
          password: providedPassword ?? password,
        } satisfies UnlockDto),
      });
      if (res.status === 200) {
        router.push(`/hack/${hackId}`);
      }
      if (res.status === 401) {
      }
    };
    if (ref.current) {
      ref.current.addEventListener("click", unlock);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("click", unlock);
      }
    };
  }, [password]);

  return (
    <form>
      {providedPassword ? null : (
        <div>
          <label htmlFor="password">Passwort: </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
          />
        </div>
      )}
      {/*I know there is onClick from react, but this is needed to be able 
to manipulate the disabled attribute in the browser without react dev tools*/}
      <button ref={(r) => (ref.current = r)} type="button" disabled={disabled}>
        Nächste Seite freischalten
      </button>
    </form>
  );
}
