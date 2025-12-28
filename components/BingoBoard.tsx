"use client";

import { useState, useEffect } from "react";

type BingoBoardProps = {
  drawnNumbers: number[]; // اعداد قرعه کشی، فقط برای نمایش برد قابل مقایسه
};

export default function BingoBoard({ drawnNumbers }: BingoBoardProps) {
  type Cell = {
    number: number | null;
    id: number;
  };

  const [board, setBoard] = useState<Cell[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [isWin, setIsWin] = useState(false);

  // تولید کارت 5x5 با 15 عدد تصادفی و نامنظم
  useEffect(() => {
    const numbers: number[] = [];
    while (numbers.length < 15) {
      const n = Math.floor(Math.random() * 75) + 1;
      if (!numbers.includes(n)) numbers.push(n);
    }

    const tempBoard: (number | null)[] = Array(25).fill(null);
    numbers.forEach((num) => {
      let index;
      do {
        index = Math.floor(Math.random() * 25);
      } while (tempBoard[index] !== null);
      tempBoard[index] = num;
    });

    const cells: Cell[] = tempBoard.map((num, i) => ({
      id: i,
      number: num,
    }));

    setBoard(cells);
  }, []);

  // صدا هنگام انتخاب خانه
  const playSound = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.3;
    audio.play();
  };

  const toggleCell = (id: number, num: number | null) => {
    if (num === null) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
    playSound();
  };

  // بررسی برد بعد از هر انتخاب
  useEffect(() => {
    const checkWin = () => {
      // خطوط افقی
      for (let row = 0; row < 5; row++) {
        const rowCells = board.slice(row * 5, row * 5 + 5);
        const numbersInRow = rowCells
          .filter((c) => c.number !== null)
          .map((c) => c.id);
        if (
          numbersInRow.length > 0 &&
          numbersInRow.every((id) => selected.includes(id))
        ) {
          return true;
        }
      }
      // فول کارت (تمام 15 خانه پر انتخاب شده)
      const allCells = board.filter((c) => c.number !== null).map((c) => c.id);
      if (allCells.every((id) => selected.includes(id))) return true;

      return false;
    };

    setIsWin(checkWin());
  }, [selected, board]);

  return (
    <>
      <div className="mt-8 grid grid-cols-5 gap-3">
        {board.map((cell) => {
          const isActive = selected.includes(cell.id);

          return (
            <div
              key={cell.id}
              onClick={() => toggleCell(cell.id, cell.number)}
              className={`
                glass
                aspect-square
                flex items-center justify-center
                text-xl font-bold
                cursor-pointer
                transition-all duration-200
                select-none
                ${cell.number === null ? "opacity-30 cursor-default" : ""}
                ${
                  isActive
                    ? "scale-105 ring-2 ring-emerald-400 shadow-lg shadow-emerald-400/30"
                    : "hover:scale-105 hover:ring-2 hover:ring-white/40"
                }
                active:scale-95
              `}
            >
              {cell.number ?? ""}
            </div>
          );
        })}
      </div>

      {isWin && (
        <div className="mt-4 p-4 bg-emerald-500 text-black font-bold rounded-lg text-center animate-pulse">
          🎉 تبریک! بردید! 🎉
        </div>
      )}
    </>
  );
}
