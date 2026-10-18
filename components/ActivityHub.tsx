"use client";

import React, { useState } from "react";
import { useVriddhiStore, ActivityTask } from "@/lib/store";
import { 
  CheckCircle2, 
  Clock, 
  Star, 
  ArrowRight, 
  HelpCircle, 
  Compass, 
  BookOpen, 
  Zap,
  Sparkles
} from "lucide-react";

export default function ActivityHub() {
  const { activities, completeActivity } = useVriddhiStore();
  const [activeTab, setActiveTab] = useState<"ALL" | "TASK" | "QUIZ" | "INTEREST">("ALL");
  const [activeQuizModal, setActiveQuizModal] = useState<ActivityTask | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const filtered = activeTab === "ALL" 
    ? activities 
    : activities.filter(a => a.type === activeTab);

  const handleOpenQuiz = (task: ActivityTask) => {
    setActiveQuizModal(task);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleFinishQuiz = () => {
    if (!activeQuizModal || selectedQuizOption === null) return;
    const option = activeQuizModal.scenarioOptions?.[selectedQuizOption];
    completeActivity(activeQuizModal.id, `Selected: ${option?.text} (${option?.signal})`);
    setQuizSubmitted(true);
  };

  return (
    <div className="doodle-card p-5 sm:p-6 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-900 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-black text-base text-slate-900">Activity Hub (3 Core Formats)</h3>
            <span className="doodle-tag bg-pink-100 text-slate-900 border border-slate-900 text-[10px] font-black uppercase">
              Actionable Evidence
            </span>
          </div>
          <p className="text-xs text-slate-600 font-bold mt-0.5">
            Practical Tasks, Scenario Quizzes, and Interest-Based Missions
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {(["ALL", "TASK", "QUIZ", "INTEREST"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`doodle-btn px-3 py-1.5 text-xs font-black border-2 border-slate-900 transition-all ${
                activeTab === tab
                  ? "bg-[#FFD12E] text-slate-900 shadow-doodle-sm translate-x-0.5 translate-y-0.5"
                  : "bg-white text-slate-700 shadow-none hover:bg-slate-100"
              }`}
            >
              {tab === "ALL" ? "All Formats" : tab === "TASK" ? "⚡ Tasks" : tab === "QUIZ" ? "❓ Quizzes" : "🎨 Interests"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3.5">
        {filtered.map(item => {
          const isTask = item.type === "TASK";
          const isQuiz = item.type === "QUIZ";
          const isInterest = item.type === "INTEREST";

          return (
            <div
              key={item.id}
              className={`rounded-2xl border-3 border-slate-900 p-4 flex flex-col justify-between transition-all duration-150 ${
                item.completed
                  ? "bg-slate-50 opacity-85 shadow-[2px_2px_0px_#0F172A]"
                  : "bg-white shadow-doodle-sm hover:shadow-doodle hover:-translate-y-0.5"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`doodle-tag text-[9px] font-black uppercase border border-slate-900 ${
                        isTask ? "bg-amber-200 text-amber-950" : isQuiz ? "bg-purple-200 text-purple-950" : "bg-emerald-200 text-emerald-950"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300">
                      {item.principle}
                    </span>
                  </div>

                  <span className="doodle-tag bg-yellow-100 text-slate-900 border border-slate-900 text-[10px] font-black shrink-0">
                    +{item.xpReward} XP
                  </span>
                </div>

                <h4 className="font-black text-sm text-slate-900 mb-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t-2 border-slate-200 flex items-center justify-between text-xs mt-2">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <Clock size={12} /> {item.duration}
                </span>

                {item.completed ? (
                  <span className="doodle-badge bg-emerald-100 text-emerald-900 border border-slate-900 text-[10px] font-black">
                    ✓ Completed
                  </span>
                ) : isQuiz ? (
                  <button
                    onClick={() => handleOpenQuiz(item)}
                    className="doodle-btn px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-black border-2 border-slate-900 shadow-doodle-sm"
                  >
                    Answer Quiz →
                  </button>
                ) : (
                  <button
                    onClick={() => completeActivity(item.id, `Completed self-reported task: ${item.title}`)}
                    className="doodle-btn px-3 py-1 bg-[#2563EB] hover:bg-blue-700 text-white text-[11px] font-black border-2 border-slate-900 shadow-doodle-sm"
                  >
                    Mark Done →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activeQuizModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="doodle-card max-w-lg w-full bg-white p-6 space-y-4 shadow-doodle-xl">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div>
                <span className="doodle-tag bg-purple-200 text-slate-900 border border-slate-900 text-[10px] font-black uppercase">
                  Scenario Quiz • {activeQuizModal.principle}
                </span>
                <h3 className="font-black text-lg text-slate-900 mt-1">
                  {activeQuizModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveQuizModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 shadow-doodle-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-slate-900 text-xs font-bold text-slate-800 leading-relaxed shadow-doodle-sm">
              ❓ &ldquo;{activeQuizModal.scenarioQuestion}&rdquo;
            </div>

            {!quizSubmitted ? (
              <div className="space-y-2">
                <span className="text-[11px] font-black text-slate-700 uppercase block">Choose your honest natural reaction:</span>
                {activeQuizModal.scenarioOptions?.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedQuizOption(idx)}
                    className={`w-full p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                      selectedQuizOption === idx
                        ? "bg-[#FFD12E] border-slate-900 shadow-doodle-sm text-slate-900"
                        : "bg-white border-slate-300 hover:border-slate-900 text-slate-800"
                    }`}
                  >
                    <span className="font-black mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt.text}
                  </button>
                ))}

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveQuizModal(null)}
                    className="doodle-btn px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold border-2 border-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={handleFinishQuiz}
                    className="doodle-btn px-4 py-1.5 bg-blue-600 disabled:opacity-40 text-white text-xs font-black border-2 border-slate-900 shadow-doodle-sm"
                  >
                    Submit Reflection
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border-2 border-slate-900 space-y-3 text-center">
                <div className="text-2xl">🌱</div>
                <h4 className="font-black text-emerald-950 text-sm">Reflection Recorded as Evidence!</h4>
                <p className="text-xs text-slate-700 font-bold">
                  Your choice has been logged as observable behavioral evidence for <strong>{activeQuizModal.principle}</strong>.
                </p>
                <button
                  onClick={() => setActiveQuizModal(null)}
                  className="doodle-btn px-4 py-1.5 bg-[#FFD12E] text-slate-900 text-xs font-black border-2 border-slate-900 shadow-doodle-sm"
                >
                  Awesome, Return to Hub
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
