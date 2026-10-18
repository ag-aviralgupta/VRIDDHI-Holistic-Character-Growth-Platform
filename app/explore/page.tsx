"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import ActivityHub from "@/components/ActivityHub";
import { useVriddhiStore } from "@/lib/store";
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Laptop, 
  Palette, 
  Atom, 
  Megaphone, 
  Users, 
  HeartHandshake, 
  RotateCcw
} from "lucide-react";
import { DoodleExplorationBlob } from "@/components/doodles/DoodleCharacters";

interface InterestDomainItem {
  id: string;
  name: string;
  score: number;
  status: "Strong" | "Emerging" | "Growing";
  description: string;
  microChallenge: string;
}

const interestDomains: InterestDomainItem[] = [
  {
    id: "dom-1",
    name: "Creative Technology & Coding",
    score: 88,
    status: "Strong",
    description: "Algorithmic thinking, interactive web widgets, and problem solving through code.",
    microChallenge: "Build a tiny responsive button with custom micro-interactions."
  },
  {
    id: "dom-2",
    name: "Scientific Inquiry & Logic",
    score: 82,
    status: "Strong",
    description: "Tackling open-ended mathematical riddles and breaking complexity into hypotheses.",
    microChallenge: "Solve the 'Bridge and Torch' riddle with zero hints."
  },
  {
    id: "dom-3",
    name: "Visual Design & Posters",
    score: 78,
    status: "Emerging",
    description: "Creating expressive visual posters and communicating ideas through illustrations.",
    microChallenge: "Sketch a clean 1-page visual summary of Vivekananda's message."
  },
  {
    id: "dom-4",
    name: "Communication & Public Speaking",
    score: 65,
    status: "Growing",
    description: "Explaining difficult concepts clearly in 60 seconds without filler words.",
    microChallenge: "Record a 60-second explanation of recursion for a 6th grader."
  },
  {
    id: "dom-5",
    name: "Collaborative Leadership & Seva",
    score: 75,
    status: "Strong",
    description: "Facilitating peer study circles and coordinating community seva initiatives.",
    microChallenge: "Volunteer 15 minutes of anonymous homework assistance on Sahaay."
  }
];

export default function Explore() {
  const { awardXP, recordGrowthEvent, triggerConfetti } = useVriddhiStore();
  const [activeModal, setActiveModal] = useState<InterestDomainItem | null>(null);
  const [attemptText, setAttemptText] = useState("");
  const [isDone, setIsDone] = useState(false);

  const handleComplete = () => {
    if (!activeModal) return;
    awardXP(20, `Explored: ${activeModal.name}`);
    recordGrowthEvent({
      eventType: "INTEREST_ACTIVITY_COMPLETED",
      principle: "Self-Confidence & Faith",
      value: 2,
      description: `Hands-on micro-task in ${activeModal.name}`
    });
    setIsDone(true);
    triggerConfetti();
  };

  return (
    <AppShell>
      <div className="space-y-7">

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-[11px] font-black uppercase tracking-wider">
              <Compass size={13} /> Activity Library &amp; Interest Explorer
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore → Try → Reflect → Discover
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              We do not tell you: &ldquo;You should become an engineer.&rdquo; Instead, we connect the same character principles across sports, coding, public speaking, and seva.
            </p>
          </div>

          <DoodleExplorationBlob className="w-20 h-20 shrink-0" animated={false} />
        </div>

        <section>
          <ActivityHub />
        </section>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Emerging Interest Signals
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Developing character principles through activities aligned with your natural enthusiasm
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {interestDomains.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      {item.status} Signal
                    </span>
                    <span className="text-xs font-black text-slate-900">{item.score}%</span>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">Micro-task ready</span>
                  <button
                    onClick={() => {
                      setActiveModal(item);
                      setAttemptText("");
                      setIsDone(false);
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold hover:bg-slate-800 transition"
                  >
                    Try Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-4 text-left">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-pink-600">Interest Micro-Task</span>
                  <h3 className="font-extrabold text-base text-slate-900">{activeModal.name}</h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
                >
                  ✕
                </button>
              </div>

              {!isDone ? (
                <>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed bg-amber-50 p-3 rounded-xl border border-amber-200">
                    🎯 <strong>Action:</strong> {activeModal.microChallenge}
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Record your attempt or insights:
                    </label>
                    <textarea
                      value={attemptText}
                      onChange={(e) => setAttemptText(e.target.value)}
                      placeholder="e.g. I spent 12 minutes testing different button animations..."
                      className="w-full h-24 p-3 rounded-xl border border-slate-300 text-xs font-medium outline-none focus:border-slate-900"
                    />
                  </div>

                  <button
                    onClick={handleComplete}
                    disabled={!attemptText.trim()}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-50 transition"
                  >
                    Record Attempt (+20 XP)
                  </button>
                </>
              ) : (
                <div className="text-center py-4 space-y-2">
                  <div className="text-3xl">🌟</div>
                  <h4 className="font-black text-base text-slate-900">Interest Signal Logged!</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Evidence of voluntary effort in <strong>{activeModal.name}</strong> added to your growth timeline.
                  </p>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold mt-2"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
