"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import GrowthBars from "@/components/GrowthBars";
import GrowthMirror from "@/components/GrowthMirror";
import { useVriddhiStore } from "@/lib/store";
import { 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Sparkles, 
  ArrowUpRight, 
  Info, 
  ShieldCheck, 
  Brain,
  Star,
  CheckCircle2
} from "lucide-react";

export default function Growth() {
  const { principles, student } = useVriddhiStore();
  const [activeTab, setActiveTab] = useState<"PRINCIPLES" | "MIRROR" | "TRENDS">("PRINCIPLES");

  const principleList = Object.values(principles);

  return (
    <AppShell>
      <div className="space-y-6">

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-black uppercase tracking-wider">
              <BarChart3 size={13} /> Longitudinal Character Analytics
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Growth Profile &amp; Principles
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Observable evidence across the six foundational dimensions inspired by Swami Vivekananda.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveTab("PRINCIPLES")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === "PRINCIPLES" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Six Principles
            </button>
            <button
              onClick={() => setActiveTab("MIRROR")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === "MIRROR" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Growth Mirror
            </button>
            <button
              onClick={() => setActiveTab("TRENDS")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === "TRENDS" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Week/Month Trends
            </button>
          </div>
        </div>

        {activeTab === "PRINCIPLES" && (
          <div className="space-y-6">
            <GrowthBars />
          </div>
        )}

        {activeTab === "MIRROR" && (
          <div className="space-y-6">
            <GrowthMirror />
          </div>
        )}

        {activeTab === "TRENDS" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Longitudinal Trend View</h3>
              <p className="text-xs text-slate-500 font-medium">Tracking baseline, previous week, and previous month movements</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {principleList.map(item => (
                <div key={item.name} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-800">{item.name}</span>
                    <span className="text-xs font-black text-emerald-600 flex items-center gap-0.5">
                      <ArrowUpRight size={13} /> {item.trend}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <div className="text-[9px] font-bold text-slate-400 uppercase">Baseline</div>
                      <div className="font-black text-slate-800">{item.baselineScore}</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <div className="text-[9px] font-bold text-slate-400 uppercase">Prev Wk</div>
                      <div className="font-black text-slate-800">{item.prevWeekScore}</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-[9px] font-bold text-blue-600 uppercase">Current</div>
                      <div className="font-black text-blue-700">{item.currentScore}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 font-medium">
                    Level: <strong className="text-slate-800">{item.currentLevel}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium flex items-start gap-2.5">
          <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Privacy &amp; Boundaries:</strong> You are viewing your student-side growth signals. The teacher&apos;s holistic developmental report and contextual notes are maintained separately for educator pedagogy and are never used to categorize or rank students.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
