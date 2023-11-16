"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const ref = useRef<HTMLCanvasElement | null>();
  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d")!;
      let cols = Math.floor(window.innerWidth / 20) + 1;
      let ypos = Array(cols).fill(0);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      setInterval(() => matrix(canvas, ctx, cols, ypos), 50);
    }
  }, []);
  return (
    <canvas
      ref={(el) => {
        ref.current = el;
      }}
      className="fixed top-0 left-0 -z-50 w-full h-full"
      style={{ backgroundColor: "black" }}
    ></canvas>
  );
}

function matrix(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  cols: number,
  ypos: number[]
) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (canvas.width !== w) {
    canvas.width = w;
    cols = Math.floor(window.innerWidth / 20) + 1;
    ypos = Array(cols).fill(0);
  }
  if (canvas.height !== h) {
    canvas.height = h;
  }

  ctx.fillStyle = "#0001";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#0f0";
  ctx.font = "15pt monospace";

  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = ind * 20;
    ctx.fillText(text, x, y);
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    else ypos[ind] = y + 20;
  });
}
