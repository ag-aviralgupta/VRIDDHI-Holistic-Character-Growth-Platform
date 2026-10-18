"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useVriddhiStore } from "@/lib/store";
import { TrendingUp, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

const PRINCIPLE_ACTION_ROUTES: Record<string, { href: string; label: string }> = {
  Concentration: { href: "/focus-lab", label: "Open Focus Lab" },
  "Courage & Fearlessness": { href: "/quests", label: "View Missions" },
  "Self-Confidence & Faith": { href: "/explore", label: "Try Challenges" },
  "Purity of Mind & Heart": { href: "/reflection", label: "Open Reflection Journal" },
  "Selfless Service": { href: "/sahaay", label: "Go to Sahaay" },
  "Perseverance & Hard Work": { href: "/quests", label: "Continue Quests" },
};

export default function GrowthBars() {
  const { principles } = useVriddhiStore();
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>("Concentration");

  const principleList = Object.values(principles);

  return (
    <div className="space-y-3">
      {principleList.map(item => {
        const isPrimary = item.isPrimary;
        const isExpanded = expandedPrinciple === item.name;
        const targetRoute = PRINCIPLE_ACTION_ROUTES[item.name] || { href: "/focus-lab", label: "Open Focus Lab" };

        return (
          <div
            key={item.name}
            className={`doodle-card-static transition-all duration-200 overflow-hidden ${
              isPrimary
                ? "bg-[#FFFDF7] border-3 border-slate-900 shadow-doodle ring-2 ring-blue-500/40"
                : "bg-white border-3 border-slate-900 shadow-doodle-sm hover:shadow-doodle"
            }`}
          >

            <div
              onClick={() => setExpandedPrinciple(isExpanded ? null : item.name)}
              className="p-3.5 sm:p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border-2 border-slate-900 shadow-doodle-sm"
                  style={{
                    backgroundColor: item.badgeBg || "#FEF3C7",
                    color: "#0F172A"
                  }}
                >
                  {isPrimary ? "★" : item.name[0]}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm text-slate-900 truncate">
                      {item.name}
                    </span>
                    {isPrimary && (
                      <span className="doodle-tag bg-blue-600 text-white border-1.5 border-slate-900 text-[9px] font-black uppercase">
                        Primary Anchor
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 truncate mt-0.5">
                    {item.currentLevel} • {item.evidenceCount} observable evidences
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-base font-black text-slate-900 leading-none">
                    {item.currentScore}
                    <span className="text-xs text-slate-400 font-bold"> / 100</span>
                  </div>
                  <div className={`text-[11px] font-black flex items-center gap-0.5 justify-end mt-0.5 ${
                    item.trend.startsWith("-") ? "text-rose-600" : "text-emerald-700"
                  }`}>
                    <TrendingUp size={12} />
                    {item.trend}
                  </div>
                </div>

                <div className="w-7 h-7 rounded-lg border-2 border-slate-900 bg-slate-50 flex items-center justify-center text-slate-700 shadow-[1px_1px_0px_#0F172A]">
                  {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>
            </div>

            <div className="px-4 pb-3">
              <div className="h-3 rounded-full bg-slate-100 border-2 border-slate-900 overflow-hidden relative shadow-inner">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${item.currentScore}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>

            {isExpanded && (
              <div className="px-4 pb-4 pt-3 border-t-2 border-slate-900 bg-amber-50/40 space-y-3 text-xs">

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2 rounded-xl bg-white border-2 border-slate-900 shadow-doodle-sm">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Baseline</span>
                    <span className="font-black text-slate-900 text-sm">{item.baselineScore}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border-2 border-slate-900 shadow-doodle-sm">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Prev Week</span>
                    <span className="font-black text-slate-900 text-sm">{item.prevWeekScore}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border-2 border-slate-900 shadow-doodle-sm">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Prev Month</span>
                    <span className="font-black text-slate-900 text-sm">{item.prevMonthScore}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border-2 border-slate-900 shadow-doodle-sm">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Net Delta</span>
                    <span className={`font-black text-sm ${item.trend.startsWith("-") ? "text-rose-600" : "text-emerald-700"}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase text-slate-600 block mb-1">
                    Recent Evidences Recorded:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.recentActivities.map((act, idx) => (
                      <span
                        key={idx}
                        className="doodle-tag bg-white text-slate-800 text-[10px] font-bold border border-slate-900"
                      >
                        ✓ {act}
                      </span>
                    ))}
                  </div>
                </div>

                {item.reflectionSnippet && (
                  <div className="p-2.5 rounded-xl bg-yellow-50 border-2 border-slate-900 text-slate-800 shadow-doodle-sm">
                    <span className="text-[10px] font-black text-amber-900 uppercase block mb-0.5">
                      Student Reflection Snippet:
                    </span>
                    <p className="italic text-slate-700 font-semibold leading-relaxed">
                      &ldquo;{item.reflectionSnippet}&rdquo;
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-blue-50 border-2 border-slate-900 text-blue-950 shadow-doodle-sm">
                  <div className="pr-2 min-w-0">
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider block">
                      Next Recommended Step:
                    </span>
                    <span className="font-bold text-xs text-slate-800 leading-snug block mt-0.5">
                      {item.recommendedNextAction}
                    </span>
                  </div>

                  <Link
                    href={targetRoute.href}
                    onClick={(e) => e.stopPropagation()}
                    className="doodle-btn px-4 py-1.5 bg-[#FFD12E] hover:bg-yellow-300 text-slate-900 border-2 border-slate-900 text-xs font-black shadow-doodle-sm flex items-center gap-1.5 shrink-0 cursor-pointer active:translate-x-0.5 transition"
                    title={`Ready! Open ${targetRoute.label} to practice this step`}
                  >
                    <span>Ready</span>
                    <ArrowRight size={13} className="text-slate-900 stroke-[3]" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
