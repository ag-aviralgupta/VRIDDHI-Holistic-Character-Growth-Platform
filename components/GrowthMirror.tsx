"use client";

import React from "react";
import { useVriddhiStore } from "@/lib/store";
import { ShieldCheck, Target } from "lucide-react";

export default function GrowthMirror() {
  const { student } = useVriddhiStore();

  return (
    <div className="doodle-card p-5 sm:p-6 bg-white space-y-4">
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 border-2 border-slate-900 text-purple-900 flex items-center justify-center font-black text-xl shadow-doodle-sm">
            🪞
          </div>
          <div>
            <h3 className="font-black text-base text-slate-900">Personal Growth Mirror</h3>
            <p className="text-xs text-slate-600 font-bold">Reflecting on verified observable habits &amp; next frontiers</p>
          </div>
        </div>
        <span className="doodle-badge bg-amber-100 text-slate-900 border-2 border-slate-900 text-[10px] font-black uppercase">
          Week 4 Synthesis
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="rounded-2xl p-4 bg-emerald-50 border-3 border-slate-900 shadow-doodle-sm space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-black text-slate-900">
            <span className="w-5 h-5 rounded-md bg-emerald-300 border border-slate-900 flex items-center justify-center text-[10px]">✓</span>
            <span>Where I Am (Established Observable Strengths)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-800 font-bold pl-1">
            {student.growthMirror.whereIAm.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-700 font-black shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-4 bg-amber-50 border-3 border-slate-900 shadow-doodle-sm space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-black text-slate-900">
            <span className="w-5 h-5 rounded-md bg-amber-300 border border-slate-900 flex items-center justify-center text-[10px]">→</span>
            <span>Where I Can Grow Next (My Next Growth Frontiers)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-800 font-bold pl-1">
            {student.growthMirror.whereICanGrowNext.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-700 font-black shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
