"use client";

import { useState } from "react";
import GlassContainer from "@/components/GlassContainer";
import BingoBoard from "@/components/BingoBoard";
import DrawBox from "@/components/DrawBox";

export default function Home() {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);

  return (
    <GlassContainer>
      <h1 className="text-3xl font-bold text-center">بازی بینگوی آنلاین</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <DrawBox
          drawnNumbers={drawnNumbers}
          setDrawnNumbers={setDrawnNumbers}
        />
        <BingoBoard drawnNumbers={drawnNumbers} />
      </div>
    </GlassContainer>
  );
}
