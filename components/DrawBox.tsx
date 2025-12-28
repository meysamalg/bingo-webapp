"use client";

import { useState } from "react";

type DrawBoxProps = {
  drawnNumbers: number[];
  setDrawnNumbers: (nums: number[]) => void;
};

export default function DrawBox({
  drawnNumbers,
  setDrawnNumbers,
}: DrawBoxProps) {
  const [current, setCurrent] = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);

  const drawNumber = () => {
    if (drawnNumbers.length === 75) return;

    let num;
    do {
      num = Math.floor(Math.random() * 75) + 1;
    } while (drawnNumbers.includes(num));

    setDrawnNumbers([...drawnNumbers, num]);
    setCurrent(num);

    // trigger animation
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  return (
    <div className="glass p-6 text-center">
      <div className="text-sm opacity-70 mb-2">عدد قرعه‌کشی شده</div>

      <div
        className={`
          text-6xl font-extrabold mb-4
          transition-all duration-500
          ${
            animate
              ? "scale-100 opacity-100 shadow-[0_0_20px_#34d399] animate-bounce-slow"
              : "scale-50 opacity-0 shadow-none"
          }
        `}
      >
        {current ?? "--"}
      </div>

      <button
        onClick={drawNumber}
        className="px-6 py-2 rounded-lg bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition"
      >
        قرعه‌کشی عدد بعدی
      </button>

      <div className="mt-4 text-sm opacity-70">{drawnNumbers.length} / 75</div>
    </div>
  );
}
