"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface DoodleLogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  showSubtitle?: boolean;
}

export default function DoodleLogo({ size = "md", href = "/", showSubtitle = true }: DoodleLogoProps) {
  const isLg = size === "lg";
  const isSm = size === "sm";

  const content = (
    <div className="flex items-center gap-3 select-none group">

      <div 
        className={`relative flex items-center justify-center border-3 border-slate-900 bg-[#FFD12E] shadow-doodle-sm rounded-2xl transition-all duration-200 group-hover:rotate-[-6deg] group-hover:scale-105 shrink-0 ${
          isLg ? "w-13 h-13 p-2.5 rotate-[-3deg]" : isSm ? "w-9 h-9 p-1 rotate-[-2deg]" : "w-11 h-11 p-1.5 rotate-[-3deg]"
        }`}
      >

        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full text-slate-900"
        >

          <path 
            d="M8 10 L19 32 C19.5 33 21 33 21.5 32 L32 10" 
            stroke="#0F172A" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          <path 
            d="M26 15 C30 11 36 12 36 16 C36 21 28 20 25 18" 
            fill="#70E000" 
            stroke="#0F172A" 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />

          <circle cx="12" cy="7" r="2" fill="#FF6584" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="28" cy="6" r="1.5" fill="#2563EB" stroke="#0F172A" strokeWidth="1.5" />
        </svg>

        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF6584] border-2 border-slate-900 flex items-center justify-center text-[8px] text-white font-black animate-pulse">
          ✨
        </span>
      </div>

      <div>
        <div className="flex items-center gap-1.5">
          <span 
            className={`font-black tracking-tight text-slate-900 leading-none ${
              isLg ? "text-2xl" : isSm ? "text-base" : "text-xl"
            }`}
            style={{ fontFamily: "'Outfit', 'Fredoka', cursive, sans-serif" }}
          >
            VRIDDHI
          </span>
          <span className="w-2 h-2 rounded-full bg-[#70E000] border-1.5 border-slate-900 inline-block" />
        </div>

        {showSubtitle && (
          <div className="mt-1">
            <span className="inline-block px-1.5 py-0.5 rounded-md bg-blue-100 border-1.5 border-slate-900 text-slate-900 text-[9px] font-black tracking-wider uppercase shadow-[1px_1px_0px_#0F172A]">
              Growth Beyond Marks
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-block">{content}</Link>;
  }

  return content;
}
