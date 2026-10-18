"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import { useVriddhiStore } from "@/lib/store";
import { 
  Bot, 
  Send, 
  Sparkles, 
  BookOpen, 
  Lightbulb, 
  User, 
  CheckCircle2, 
  ShieldCheck,
  Brain
} from "lucide-react";
import { DoodleVivekMentor } from "@/components/doodles/DoodleCharacters";

export default function Mentor() {
  const { mitraChat, sendMessageToMitra, student, principles } = useVriddhiStore();
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim() || isSending) return;
    const txt = inputText;
    setInputText("");
    setIsSending(true);
    await sendMessageToMitra(txt);
    setIsSending(false);
  };

  const quickPrompts = [
    "How can I maintain concentration when my study room gets noisy?",
    "I feel nervous about speaking up in class discussions.",
    "A friend got praised for something I wanted, and I felt jealous.",
    "How do I practice perseverance when a math problem seems impossible?"
  ];

  return (
    <AppShell>
      <div className="space-y-6">

        <div className="doodle-card p-6 sm:p-7 bg-[#FFFDF7] border-3 border-slate-900 shadow-doodle flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="doodle-badge bg-purple-100 text-purple-950 border-2 border-slate-900 text-[11px] font-black uppercase tracking-wider shadow-doodle-sm">
              <Bot size={13} className="text-purple-700" /> MitraAI • Powered by OpenRouter &amp; Vivekananda Wisdom
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              MitraAI Learning Companion
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
              Grounding daily student challenges in Swami Vivekananda&apos;s man-making education philosophy. MitraAI suggests actionable micro-experiments without clinical diagnosis.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <DoodleVivekMentor className="w-20 h-20 shrink-0" />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-6">

          <div className="doodle-card p-5 bg-white border-3 border-slate-900 shadow-doodle flex flex-col h-[580px] justify-between">

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5 scrollbar-thin">
              {mitraChat.map((msg, idx) => {
                const isUser = msg.sender === "user";

                return (
                  <div
                    key={msg.id || idx}
                    className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-purple-200 border-2 border-slate-900 text-purple-950 flex items-center justify-center font-black text-xs shrink-0 shadow-[1px_1px_0px_#0F172A]">
                        <Bot size={16} />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-bold leading-relaxed border-2 border-slate-900 shadow-doodle-sm ${
                        isUser
                          ? "bg-slate-900 text-white rounded-br-none"
                          : "bg-amber-50 text-slate-900 rounded-bl-none"
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {msg.principle && (
                        <div className="mt-2.5 pt-2 border-t-1.5 border-slate-900/30 text-[11px] bg-white/80 p-2 rounded-xl border border-slate-900">
                          <span className="font-black text-blue-800 block">
                            📜 Vivekananda Anchor: {msg.principle.title}
                          </span>
                          <span className="italic text-slate-700 font-semibold block mt-0.5">
                            &ldquo;{msg.principle.corePrinciple}&rdquo;
                          </span>
                        </div>
                      )}

                      <div className={`text-[10px] mt-1.5 text-right font-black ${isUser ? "text-slate-400" : "text-slate-500"}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isSending && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-xl bg-purple-200 border-2 border-slate-900 flex items-center justify-center text-xs shrink-0 animate-bounce">
                    🤖
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50 border-2 border-slate-900 text-xs font-black text-slate-700 shadow-doodle-sm flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-600 animate-spin" />
                    <span>MitraAI is contemplating Vivekananda&apos;s wisdom...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t-2 border-slate-200 space-y-2.5">
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputText(p);
                    }}
                    className="doodle-tag bg-amber-100 hover:bg-yellow-200 text-slate-900 border border-slate-900 text-[10px] font-black cursor-pointer transition"
                  >
                    💡 {p}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  disabled={isSending}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask MitraAI for an actionable learning experiment..."
                  className="flex-1 p-3 rounded-xl border-2 border-slate-900 text-xs font-bold outline-none bg-slate-50 focus:bg-white shadow-doodle-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={isSending || !inputText.trim()}
                  className="doodle-btn px-4 py-3 bg-purple-600 disabled:opacity-50 hover:bg-purple-700 text-white text-xs font-black border-2 border-slate-900 shadow-doodle-sm flex items-center gap-1.5"
                >
                  <Send size={14} /> Send
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">

            <div className="doodle-card p-5 bg-white border-3 border-slate-900 shadow-doodle-sm space-y-3">
              <span className="doodle-tag bg-blue-100 text-blue-900 border border-slate-900 text-[10px] font-black uppercase">
                Active Student Signals
              </span>
              <h3 className="font-black text-sm text-slate-900">Observable Principles Seen by MitraAI</h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-[1px_1px_0px_#0F172A]">
                  <span className="text-[10px] font-black text-slate-500 block">CONCENTRATION</span>
                  <span className="font-black text-blue-700 text-sm">{principles.Concentration.currentScore}/100</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-[1px_1px_0px_#0F172A]">
                  <span className="text-[10px] font-black text-slate-500 block">PERSEVERANCE</span>
                  <span className="font-black text-orange-700 text-sm">{principles["Perseverance & Hard Work"].currentScore}/100</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-[1px_1px_0px_#0F172A]">
                  <span className="text-[10px] font-black text-slate-500 block">COURAGE</span>
                  <span className="font-black text-red-700 text-sm">{principles["Courage & Fearlessness"].currentScore}/100</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-[1px_1px_0px_#0F172A]">
                  <span className="text-[10px] font-black text-slate-500 block">PURITY OF MIND</span>
                  <span className="font-black text-purple-700 text-sm">{principles["Purity of Mind & Heart"].currentScore}/100</span>
                </div>
              </div>
            </div>

            <div className="doodle-card p-5 bg-amber-50 border-3 border-slate-900 shadow-doodle-sm space-y-2 text-xs text-slate-800">
              <div className="flex items-center gap-1.5 font-black text-slate-900">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                <span>Ethical AI Boundaries Guarantee</span>
              </div>
              <p className="leading-relaxed font-bold text-slate-700 text-[11px]">
                MitraAI never diagnoses mental health, labels students with negative moral traits, or makes disciplinary decisions. All guidance suggests student-paced experiments inspired by Swami Vivekananda&apos;s man-making education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
