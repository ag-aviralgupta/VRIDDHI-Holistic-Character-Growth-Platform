"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import { useVriddhiStore } from "@/lib/store";
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  TrendingUp, 
  MessageSquare,
  ArrowRight,
  Send,
  Info
} from "lucide-react";

export default function Reflection() {
  const { reflections, addReflection, triggerConfetti } = useVriddhiStore();

  const [activityName, setActivityName] = useState("15-Minute Concentration Sprint");
  const [selectedPrinciple, setSelectedPrinciple] = useState("Concentration");
  const [happenedAndDifficult, setHappenedAndDifficult] = useState("");
  const [distractionOrNerves, setDistractionOrNerves] = useState("");
  const [tryDifferently, setTryDifferently] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!happenedAndDifficult.trim() || !distractionOrNerves.trim()) return;

    addReflection(happenedAndDifficult, distractionOrNerves, tryDifferently, activityName, selectedPrinciple);
    setHappenedAndDifficult("");
    setDistractionOrNerves("");
    setTryDifferently("");
    setSavedSuccess(true);
    triggerConfetti();

    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <AppShell>
      <div className="space-y-6">

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-black uppercase tracking-wider">
              <BookOpen size={13} /> Follow-Up Reflection Journal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Turn Experiences into Learning Material
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Reflection converts repeated activities into observable self-awareness. Reflections are growth evidence, not a psychological examination.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Post-Activity Follow-Up</h3>
                <p className="text-xs text-slate-400 font-medium">Answer promptly while the experience is fresh</p>
              </div>
              <span className="text-xs font-black text-amber-600">+15 XP</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">
                    Activity Context
                  </label>
                  <input
                    type="text"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">
                    Tracked Principle Area
                  </label>
                  <select
                    value={selectedPrinciple}
                    onChange={(e) => setSelectedPrinciple(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 outline-none focus:border-slate-900"
                  >
                    <option value="Concentration">Concentration (Primary)</option>
                    <option value="Courage & Fearlessness">Courage &amp; Fearlessness</option>
                    <option value="Self-Confidence & Faith">Self-Confidence &amp; Faith</option>
                    <option value="Purity of Mind & Heart">Purity of Mind &amp; Heart</option>
                    <option value="Selfless Service">Selfless Service</option>
                    <option value="Perseverance & Hard Work">Perseverance &amp; Hard Work</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-extrabold text-slate-800 block mb-1 leading-snug">
                  1. What happened during the task, and what was difficult or tempting to give up on?
                </label>
                <textarea
                  required
                  value={happenedAndDifficult}
                  onChange={(e) => setHappenedAndDifficult(e.target.value)}
                  placeholder="e.g. When numbers scrambled in the grid, I felt rushed. I thought about clicking hints after 30 seconds..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="font-extrabold text-slate-800 block mb-1 leading-snug">
                  2. What did you do when you got distracted or felt nervous?
                </label>
                <textarea
                  required
                  value={distractionOrNerves}
                  onChange={(e) => setDistractionOrNerves(e.target.value)}
                  placeholder="e.g. I took one deep breath, grounded my feet, and reminded myself that mistakes are data..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="font-extrabold text-slate-800 block mb-1 leading-snug">
                  3. What would you do differently next time?
                </label>
                <textarea
                  value={tryDifferently}
                  onChange={(e) => setTryDifferently(e.target.value)}
                  placeholder="e.g. Place my phone in another room before starting my study block..."
                  rows={2}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Send size={14} /> Log Reflection Evidence (+15 XP)
              </button>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Reflection added to your longitudinal growth timeline!</span>
                </div>
              )}
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Reflection Timeline</h3>
                <p className="text-xs text-slate-400 font-medium">Tracking mindset evolution across weeks</p>
              </div>
              <span className="text-xs font-bold text-slate-400">{reflections.length} Entries</span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {reflections.map(entry => (
                <div key={entry.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-blue-700">
                      {entry.principle}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{entry.week} • {entry.date}</span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-xs">{entry.activityTitle}</h4>

                  <div className="space-y-1 text-slate-600 font-medium">
                    <p><strong>Difficulty faced:</strong> {entry.challengedYou}</p>
                    <p><strong>Action taken:</strong> {entry.learnedAboutSelf}</p>
                    {entry.tryDifferently && (
                      <p className="text-emerald-700"><strong>Next adjustment:</strong> {entry.tryDifferently}</p>
                    )}
                  </div>

                  {entry.aiInsight && (
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-medium italic flex items-center gap-1.5">
                      <Sparkles size={12} className="text-amber-500 shrink-0" />
                      {entry.aiInsight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
