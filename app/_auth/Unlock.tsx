"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UnlockDto } from "../api/unlock/unlockDto";
import { Input, Spinner } from "@material-tailwind/react";

export default function Unlock({
  hackId: hackId,
  password: providedPassword,
  disabled,
}: {
  hackId: number;
  password?: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLFormElement | null>();
  const [password, setPassword] = useState<string>("");
  const [invalidPw, setInvalidPw] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unlock = async (e: Event) => {
      e.preventDefault();
      setShowSpinner(true);
      setInvalidPw(false);
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
        setInvalidPw(true);
      }
      setShowSpinner(false);
    };
    if (ref.current) {
      ref.current.addEventListener("submit", unlock);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("submit", unlock);
      }
    };
  }, [
    password,
    hackId,
    providedPassword,
    router,
    setShowSpinner,
    setInvalidPw,
  ]);

  return (
    <form
      className="my-3"
      ref={(e) => {
        ref.current = e;
      }}
    >
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
      <button
        type="submit"
        disabled={disabled}
        className="middle none center rounded-lg bg-green-500 mt-3 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Nächste Seite freischalten
      </button>{" "}
      {showSpinner && <Spinner />}
      {invalidPw && <div className="text-red-600">Ungültiges Passwort!</div>}
    </form>
  );
}
