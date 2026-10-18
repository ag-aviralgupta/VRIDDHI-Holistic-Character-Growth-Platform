"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { DoodleVivekMentor, DoodleSparkle } from "./doodles/DoodleCharacters";

export default function QuoteCard({
  text = "The essence of education is the concentration of mind, not the collection of facts.",
  action = "Turn the principle into practice → Focus Lab",
  href = "/focus-lab"
}: {
  text?: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="doodle-card p-6 bg-gradient-to-br from-amber-100/80 via-white to-orange-50 relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-start gap-4">
        <DoodleVivekMentor className="w-20 h-20 shrink-0" />
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-doodle-yellow border-2 border-slate-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles size={12} />
            Vivekananda Educational Principle
          </div>
          <blockquote className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            &ldquo;{text}&rdquo;
          </blockquote>
          <div className="text-xs font-semibold text-slate-500 mt-2">
            — Swami Vivekananda (Principles of Mind Concentration)
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t-2 border-slate-900/10 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-600">Principle → Practice → Action → Growth</span>
        <Link
          href={href}
          className="doodle-btn px-4 py-2 bg-doodle-yellow hover:bg-amber-300 text-slate-900 text-xs font-extrabold flex items-center gap-1.5"
        >
          {action} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
