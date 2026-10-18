"use client";

import React, { useState } from "react";
import Image from "next/image";
import AppShell from "@/components/AppShell";
import GrowthBars from "@/components/GrowthBars";
import GrowthMirror from "@/components/GrowthMirror";
import ActivityHub from "@/components/ActivityHub";
import Link from "next/link";
import { 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Target, 
  Brain, 
  BookOpen, 
  Bot, 
  CheckCircle2, 
  Star,
  Quote,
  ShieldCheck
} from "lucide-react";
import { useVriddhiStore } from "@/lib/store";
import { DoodleFocusBlob } from "@/components/doodles/DoodleCharacters";

const VIVEKANANDA_QUOTES = [
  {
    quote: "Education is the manifestation of the perfection already in man.",
    context: "Real character is not forced from outside—it unfolds from within through self-reliance and pure intention."
  },
  {
    quote: "Concentration is the only method to attain knowledge. Without it, nothing can be achieved.",
    context: "The difference between an ordinary mind and a great mind lies in the degree of concentration."
  },
  {
    quote: "Arise, awake, and stop not till the goal is reached.",
    context: "Every mistake is a step forward. Never give up when the problem is challenging."
  },
  {
    quote: "You have to grow from the inside out. None can teach you, none can make you spiritual. There is no other teacher but your own soul.",
    context: "True courage begins with honest self-reflection and sincere faith in your own inner capacity."
  }
];

export default function Dashboard() {
  const { student, weeklyQuest, completeQuestDay, principles } = useVriddhiStore();
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  const completedCount = weeklyQuest.days.filter(d => d.status === "completed").length;
  const conc = principles.Concentration;

  return (
    <AppShell>

      <div 
        className="fixed right-0 bottom-0 w-[420px] h-[420px] opacity-[0.04] pointer-events-none select-none z-0 hidden lg:block"
        style={{
          backgroundImage: "url('/vivekananda.jpg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right"
        }}
      />

      <div className="relative z-10 space-y-7">

        <div className="doodle-card p-5 sm:p-7 bg-[#FFFDF7] border-3 border-slate-900 shadow-doodle flex flex-col lg:flex-row items-center gap-6">

          <div className="relative shrink-0 group">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-3 border-slate-900 shadow-doodle overflow-hidden bg-amber-100 rotate-[-2deg] group-hover:rotate-0 transition-transform">
              <Image 
                src="/vivekananda.jpg" 
                alt="Swami Vivekananda" 
                width={160} 
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-[#FFD12E] border-2 border-slate-900 text-slate-900 text-[10px] font-black shadow-[2px_2px_0px_#0F172A] flex items-center gap-1">
              ✨ Inspiration
            </span>
          </div>

          <div className="flex-1 space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <span className="doodle-badge bg-amber-300 text-slate-900 border-2 border-slate-900 shadow-doodle-sm text-[10px] font-black uppercase">
                Swami Vivekananda • Educational Philosophy
              </span>
              <span className="doodle-tag bg-blue-100 text-slate-900 border border-slate-900 text-[10px] font-black">
                Week 4 Growth Cycle
              </span>
            </div>

            <div className="relative py-1">
              <p className="text-base sm:text-lg md:text-xl font-black text-slate-900 tracking-tight leading-snug">
                &ldquo;{VIVEKANANDA_QUOTES[activeQuoteIdx].quote}&rdquo;
              </p>
              <p className="text-xs text-slate-600 font-bold mt-1 leading-relaxed max-w-2xl">
                {VIVEKANANDA_QUOTES[activeQuoteIdx].context}
              </p>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-1.5 pt-1">
              {VIVEKANANDA_QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuoteIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full border border-slate-900 transition-all ${
                    activeQuoteIdx === i ? "bg-[#FFD12E] w-6" : "bg-white hover:bg-slate-200"
                  }`}
                  aria-label={`View Quote ${i + 1}`}
                />
              ))}
              <span className="text-[10px] font-bold text-slate-500 ml-2">Click to rotate wisdom</span>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col gap-2.5 shrink-0 w-full sm:w-auto justify-center">
            <div className="p-2.5 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-doodle-sm text-center min-w-[110px]">
              <span className="text-[9px] font-black text-slate-500 uppercase block">Current Level</span>
              <span className="text-base font-black text-blue-700 block leading-tight">LVL 0{student.levelNumber}</span>
              <span className="text-[10px] font-bold text-slate-600 truncate block">{student.levelName}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-doodle-sm text-center min-w-[110px]">
              <span className="text-[9px] font-black text-slate-500 uppercase block">Total Growth XP</span>
              <span className="text-base font-black text-amber-600 block leading-tight">{student.totalXP} XP</span>
              <span className="text-[10px] font-bold text-slate-600 block">{student.streakDays}-Day Streak</span>
            </div>
          </div>
        </div>

        <div className="doodle-card p-5 sm:p-6 bg-gradient-to-r from-blue-100 via-sky-50 to-indigo-100 border-3 border-slate-900 shadow-doodle flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD12E] border-3 border-slate-900 shadow-doodle-sm flex items-center justify-center text-3xl shrink-0 rotate-[-3deg]">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="doodle-badge bg-blue-600 text-white border-2 border-slate-900 shadow-doodle-sm text-[10px] font-black uppercase">
                  PRIMARY FOCUS AREA
                </span>
                <span className="text-xs font-black text-slate-700">
                  Vivekananda&apos;s Central Pillar
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Concentration of Mind
              </h2>
              <p className="text-xs font-bold text-slate-700 max-w-xl mt-1 leading-relaxed">
                Current Score: <strong className="text-slate-900 font-black">{conc.currentScore}/100</strong> ({conc.trend} from baseline). Master attention through 4 cognitive focus games without digital fatigue.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/focus-lab"
              className="doodle-btn px-4 py-2.5 bg-[#FFD12E] hover:bg-yellow-300 text-slate-900 text-xs font-black border-3 border-slate-900 shadow-doodle-sm flex items-center gap-2"
            >
              <Brain size={16} /> Enter Concentration Lab <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6">

          <section className="doodle-card p-5 sm:p-6 bg-white space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">
                  Six Observable Principles
                </h3>
                <p className="text-xs text-slate-600 font-bold">
                  Longitudinal character signals beyond academic marks
                </p>
              </div>
              <Link
                href="/growth"
                className="doodle-btn px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-slate-900 text-xs font-black border-2 border-slate-900 shadow-doodle-sm"
              >
                Deep Analytics →
              </Link>
            </div>

            <GrowthBars />
          </section>

          <section className="doodle-card p-5 sm:p-6 bg-white flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 border-b-2 border-slate-900 pb-3">
                <div>
                  <span className="doodle-tag bg-amber-200 text-slate-900 border border-slate-900 text-[10px] font-black uppercase">
                    Weekly Growth Mission • Week {weeklyQuest.weekNumber}
                  </span>
                  <h3 className="font-black text-base text-slate-900 mt-1">
                    {weeklyQuest.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-bold mt-0.5">
                    {completedCount} of {weeklyQuest.days.length} daily steps completed
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-slate-900 text-slate-900 flex items-center justify-center font-black shadow-doodle-sm">
                  <Target size={20} />
                </div>
              </div>

              <div className="mt-4">
                <div className="h-3 rounded-full bg-slate-100 border-2 border-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-[#FFD12E] transition-all duration-300"
                    style={{ width: `${(completedCount / weeklyQuest.days.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {weeklyQuest.days.map((item, idx) => {
                  const isDone = item.status === "completed";
                  const isActive = item.status === "active";

                  return (
                    <div
                      key={item.day}
                      className={`p-3 rounded-xl border-2 text-xs flex items-center justify-between gap-3 transition ${
                        isDone
                          ? "bg-slate-50 border-slate-300 text-slate-700"
                          : isActive
                          ? "bg-amber-50 border-slate-900 shadow-doodle-sm font-black"
                          : "bg-white border-slate-200 text-slate-400"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-lg border-1.5 border-slate-900 flex items-center justify-center text-[10px] font-black shadow-[1px_1px_0px_#0F172A] ${
                          isDone ? "bg-[#70E000] text-slate-900" : isActive ? "bg-[#FFD12E] text-slate-900" : "bg-slate-100 text-slate-400"
                        }`}>
                          {isDone ? "✓" : item.day}
                        </span>
                        <div>
                          <span className="text-slate-900 block leading-tight font-black">{item.title}</span>
                          <span className="text-[10px] text-slate-600 font-bold">{item.principle}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="doodle-tag bg-yellow-100 text-slate-900 border border-slate-900 text-[10px] font-black">
                          +{item.xp} XP
                        </span>
                        {isActive && (
                          <button
                            onClick={() => completeQuestDay(idx)}
                            className="doodle-btn px-2.5 py-1 bg-blue-600 text-white text-[10px] font-black border border-slate-900 shadow-none hover:shadow-xs"
                          >
                            Finish
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border-2 border-slate-900 text-[11px] text-slate-800 font-bold flex items-center gap-2 shadow-doodle-sm mt-3">
              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
              <span>Missing a day never resets your growth signals. Return anytime with joy.</span>
            </div>
          </section>
        </div>

        <section>
          <GrowthMirror />
        </section>

        <section>
          <ActivityHub />
        </section>

        <div className="doodle-card p-5 sm:p-6 bg-gradient-to-r from-purple-100 via-pink-50 to-amber-100 border-3 border-slate-900 shadow-doodle flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white border-2.5 border-slate-900 shadow-doodle-sm flex items-center justify-center font-black text-2xl shrink-0 rotate-[-2deg]">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="doodle-badge bg-purple-200 text-purple-950 border-1.5 border-slate-900 text-[10px] font-black uppercase">
                  MitraAI Learning Companion
                </span>
                <span className="text-xs text-slate-700 font-bold">Daily Reflective Nudge</span>
              </div>
              <h3 className="font-black text-base text-slate-900 mt-1">
                &ldquo;Your concentration improved this month. Your next challenge is maintaining calm focus when tasks become difficult.&rdquo;
              </h3>
              <p className="text-xs text-slate-700 font-semibold mt-1 leading-relaxed">
                MitraAI suggests practical daily experiments rooted in Vivekananda&apos;s man-making education philosophy without psychological diagnosis.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/mentor"
              className="doodle-btn px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black border-2.5 border-slate-900 shadow-doodle-sm flex items-center gap-2"
            >
              <Bot size={16} /> Consult MitraAI <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
