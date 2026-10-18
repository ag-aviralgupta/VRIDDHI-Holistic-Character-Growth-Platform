"use client";

import React from "react";
import AppShell from "@/components/AppShell";
import Link from "next/link";
import { useVriddhiStore } from "@/lib/store";
import { 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Flame, 
  Star, 
  Sparkles, 
  Target, 
  Brain, 
  Clock3
} from "lucide-react";
import { DoodleFocusBlob } from "@/components/doodles/DoodleCharacters";

export default function Quests() {
  const { weeklyQuest, completeQuestDay, student } = useVriddhiStore();

  const completedCount = weeklyQuest.days.filter(d => d.status === "completed").length;

  return (
    <AppShell>
      <div className="space-y-6">

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-black uppercase tracking-wider">
              <Target size={13} /> Weekly Growth Mission • Week {weeklyQuest.weekNumber}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {weeklyQuest.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              &ldquo;{weeklyQuest.principle}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[100px]">
              <div className="text-[10px] font-extrabold uppercase text-slate-400">Total XP</div>
              <div className="text-base font-black text-amber-600">135 XP</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[100px]">
              <div className="text-[10px] font-extrabold uppercase text-slate-400">Streak</div>
              <div className="text-base font-black text-orange-600">{student.streakDays} Days</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-3 text-xs text-slate-700">
          <Sparkles size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            <strong>Consistency, not pressure:</strong> If you miss a day, your streak and growth signals never reset to zero. VRIDDHI is designed to support practice at your pace.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">5 Daily Action Steps</h3>
              <p className="text-xs text-slate-400 font-medium">{completedCount} of 5 completed this week</p>
            </div>
            <div className="h-2 w-32 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(completedCount / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {weeklyQuest.days.map((item, idx) => {
              const isDone = item.status === "completed";
              const isActive = item.status === "active";

              return (
                <div
                  key={item.day}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                    isDone
                      ? "bg-slate-50/70 border-slate-200 text-slate-700"
                      : isActive
                      ? "bg-blue-50/80 border-blue-500 shadow-sm"
                      : "bg-white border-slate-100 text-slate-400"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isDone ? "bg-emerald-600 text-white" : isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-400"
                    }`}>
                      {isDone ? "✓" : item.day}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">Day 0{item.day}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          {item.principle}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white">
                            Today&apos;s Active Step
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 leading-snug">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="text-xs font-extrabold text-amber-600">+{item.xp} XP</span>

                    {isDone ? (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 size={15} /> Done
                      </span>
                    ) : isActive ? (
                      <div className="flex gap-2">
                        <Link
                          href="/focus-lab"
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1"
                        >
                          Play Challenge <ArrowRight size={13} />
                        </Link>
                        <button
                          onClick={() => completeQuestDay(idx)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-800 text-xs font-bold transition"
                        >
                          Mark Finished
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Lock size={13} /> Locked
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
