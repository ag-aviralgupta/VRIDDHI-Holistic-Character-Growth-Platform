"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Flame, Star, Sparkles, ChevronRight } from "lucide-react";
import { useVriddhiStore } from "@/lib/store";

const VIVEKANANDA_THOUGHTS = [
  {
    short: "Concentration is the essence of education.",
    author: "Swami Vivekananda"
  },
  {
    short: "All power is within you. You can do anything.",
    author: "Swami Vivekananda"
  },
  {
    short: "Arise, awake, and stop not till the goal is reached.",
    author: "Swami Vivekananda"
  },
  {
    short: "Faith in yourself is the secret of all greatness.",
    author: "Swami Vivekananda"
  }
];

export default function Topbar() {
  const { student, triggerConfetti } = useVriddhiStore();
  const [thoughtIdx, setThoughtIdx] = useState(0);

  const xpPercent = Math.min(100, Math.round((student.totalXP / student.nextLevelXP) * 100));
  const currentThought = VIVEKANANDA_THOUGHTS[thoughtIdx];

  const handleNextThought = () => {
    setThoughtIdx((prev) => (prev + 1) % VIVEKANANDA_THOUGHTS.length);
  };

  return (
    <header className="hidden lg:flex w-full h-16 bg-[#FFFDF7] border-b-3 border-slate-900 sticky top-0 z-20 px-6 xl:px-8 items-center justify-between gap-4">

      <div className="flex items-center min-w-0 mr-4 flex-1">
        <button
          onClick={handleNextThought}
          className="doodle-tag bg-amber-100 hover:bg-yellow-200 text-slate-900 border-2 border-slate-900 shadow-doodle-sm px-3.5 py-1.5 flex items-center gap-2 cursor-pointer transition select-none min-w-0 text-left group"
          title="Click to see another reflection by Swami Vivekananda"
        >
          <Sparkles size={14} className="text-amber-600 fill-amber-500 shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-black truncate">
            &ldquo;{currentThought.short}&rdquo;
            <span className="hidden xl:inline text-slate-600 font-bold ml-1.5">
              — {currentThought.author}
            </span>
          </span>
          <ChevronRight size={13} className="text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="flex items-center gap-2.5 xl:gap-3 shrink-0">

        <button
          onClick={triggerConfetti}
          className="doodle-btn px-3 py-1.5 bg-orange-100 border-2 border-slate-900 text-slate-900 text-xs font-black flex items-center gap-1.5 hover:bg-orange-200 cursor-pointer shadow-doodle-sm shrink-0 active:scale-95 transition"
          title="Daily practice streak! Missed days never penalize your growth."
        >
          <Flame size={15} className="text-orange-600 fill-orange-500" />
          <span>{student.streakDays} Days</span>
        </button>

        <div 
          className="doodle-badge bg-yellow-100 border-2 border-slate-900 text-slate-900 text-xs font-black flex items-center gap-2 shadow-doodle-sm shrink-0"
          title={`${student.totalXP} XP earned (Level ${student.levelNumber})`}
        >
          <div className="flex items-center gap-1">
            <Star size={14} className="text-amber-600 fill-amber-500" />
            <span>{student.totalXP} XP</span>
          </div>
          <div className="w-12 h-2 rounded-full bg-slate-200 border border-slate-900 overflow-hidden">
            <div className="h-full bg-[#FFD12E] transition-all duration-300" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>

        <div 
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-100 border-2 border-slate-900 text-slate-900 text-xs font-black shadow-doodle-sm shrink-0"
          title={`Level ${student.levelNumber}: ${student.levelName}`}
        >
          <span className="text-purple-800 font-black">LVL {student.levelNumber}</span>
          <span className="hidden xl:inline text-slate-600 font-bold">· {student.levelName}</span>
          <span className="xl:hidden text-slate-600 font-bold">· {student.levelName.split(" ")[0]}</span>
        </div>

        <Link
          href="/growth"
          className="w-9 h-9 rounded-xl bg-[#FFD12E] border-2 border-slate-900 shadow-doodle-sm text-slate-900 flex items-center justify-center text-xs font-black hover:scale-105 hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition shrink-0 ml-0.5"
          title={`${student.name} (${student.grade}) • View Character Mirror`}
        >
          {student.name.charAt(0)}
        </Link>
      </div>
    </header>
  );
}
