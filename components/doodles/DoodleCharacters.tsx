"use client";

import React from "react";

export function DoodleFocusBlob({ className = "w-32 h-32", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <div className={`relative inline-block ${animated ? "animate-doodle-bob" : ""} ${className}`}>
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[3px_3px_0px_#0F172A]">

        <path
          d="M35 150 C30 80 40 25 80 25 C120 25 130 80 125 150 Z"
          fill="#5B73DF"
          stroke="#0F172A"
          strokeWidth="4"
        />

        <circle cx="65" cy="55" r="7" fill="#8CA1F7" opacity="0.8" />
        <circle cx="105" cy="70" r="9" fill="#8CA1F7" opacity="0.8" />
        <circle cx="55" cy="115" r="8" fill="#8CA1F7" opacity="0.8" />
        <circle cx="100" cy="125" r="6" fill="#8CA1F7" opacity="0.8" />
        <circle cx="80" cy="140" r="7" fill="#8CA1F7" opacity="0.8" />

        <rect x="70" y="42" width="20" height="12" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
        <circle cx="80" cy="48" r="3.5" fill="#0F172A" />

        <g>

          <path d="M48 68 L76 76" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="84" r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="63" cy="85" r="6" fill="#0F172A" />
          <circle cx="65" cy="82" r="2" fill="#FFFFFF" />

          <path d="M112 68 L84 76" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <circle cx="100" cy="84" r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="97" cy="85" r="6" fill="#0F172A" />
          <circle cx="99" cy="82" r="2" fill="#FFFFFF" />
        </g>

        <path
          d="M68 106 Q80 102 92 106 C92 122 68 122 68 106 Z"
          fill="#0F172A"
        />
        <path d="M72 107 Q80 110 88 107" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M73 118 Q80 114 87 118" fill="#FF6584" />

        <g transform="translate(100, 95)">
          <rect x="0" y="8" width="28" height="16" rx="4" fill="#FFA500" stroke="#0F172A" strokeWidth="3" />
          <rect x="4" y="12" width="12" height="4" rx="2" fill="#FFFFFF" />

          <rect x="26" y="10" width="22" height="4" rx="2" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
          <rect x="26" y="15" width="24" height="4" rx="2" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
          <rect x="26" y="20" width="22" height="4" rx="2" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />

          <circle cx="4" cy="20" r="6" fill="#5B73DF" stroke="#0F172A" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

export function DoodleSelfRelianceBlob({ className = "w-28 h-28", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <div className={`relative inline-block ${animated ? "animate-doodle-bob-slow" : ""} ${className}`}>
      <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[3px_3px_0px_#0F172A]">

        <path
          d="M25 135 C20 70 30 25 70 25 C110 25 120 70 115 135 Z"
          fill="#84CC16"
          stroke="#0F172A"
          strokeWidth="4"
        />

        <circle cx="45" cy="50" r="5" fill="#65A30D" opacity="0.6" />
        <circle cx="95" cy="45" r="6" fill="#65A30D" opacity="0.6" />
        <circle cx="35" cy="110" r="7" fill="#65A30D" opacity="0.6" />

        <rect x="22" y="55" width="96" height="26" rx="6" fill="#0F172A" />

        <circle cx="50" cy="68" r="10" fill="#FFFFFF" />
        <circle cx="53" cy="68" r="5" fill="#0F172A" />
        <circle cx="55" cy="66" r="2" fill="#FFFFFF" />

        <circle cx="90" cy="68" r="10" fill="#FFFFFF" />
        <circle cx="87" cy="68" r="5" fill="#0F172A" />
        <circle cx="89" cy="66" r="2" fill="#FFFFFF" />

        <path d="M60 96 Q70 106 80 96" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="#FF6584" />

        <line x1="70" y1="25" x2="70" y2="8" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="6" r="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.5" />

        <g transform="translate(75, 95)">
          <rect x="0" y="0" width="16" height="22" rx="3" fill="#0F172A" />
          <line x1="8" y1="0" x2="8" y2="-8" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="8" cy="-9" r="2.5" fill="#EF4444" />
          <circle cx="8" cy="8" r="3" fill="#3B82F6" />
          <circle cx="8" cy="15" r="2" fill="#EAB308" />
          <circle cx="-2" cy="12" r="5" fill="#84CC16" stroke="#0F172A" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

export function DoodlePerseveranceBlob({ className = "w-28 h-28", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <div className={`relative inline-block ${animated ? "animate-doodle-bob" : ""} ${className}`}>
      <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[3px_3px_0px_#0F172A]">

        <path
          d="M25 135 C20 70 30 25 70 25 C110 25 120 70 115 135 Z"
          fill="#EF4444"
          stroke="#0F172A"
          strokeWidth="4"
        />

        <rect x="36" y="52" width="68" height="12" rx="4" fill="#B91C1C" stroke="#0F172A" strokeWidth="3" />

        <g>
          <circle cx="52" cy="74" r="11" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          <path d="M41 70 Q52 66 63 70" stroke="#0F172A" strokeWidth="3" fill="#B91C1C" />
          <circle cx="54" cy="76" r="4.5" fill="#0F172A" />

          <circle cx="88" cy="74" r="11" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          <path d="M77 70 Q88 66 99 70" stroke="#0F172A" strokeWidth="3" fill="#B91C1C" />
          <circle cx="86" cy="76" r="4.5" fill="#0F172A" />
        </g>

        <path
          d="M50 96 Q70 118 90 96 Z"
          fill="#0F172A"
          stroke="#0F172A"
          strokeWidth="2"
        />
        <path d="M54 98 Q70 102 86 98" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M58 106 Q70 112 82 106" fill="#FF6584" />

        <g transform="translate(90, 85)">
          <rect x="0" y="8" width="18" height="12" rx="3" fill="#FF8A00" stroke="#0F172A" strokeWidth="2.5" />
          <rect x="18" y="10" width="18" height="3" rx="1.5" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1.5" />
          <rect x="18" y="14" width="18" height="3" rx="1.5" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="0" cy="14" r="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

export function DoodleExplorationBlob({ className = "w-28 h-28", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <div className={`relative inline-block ${animated ? "animate-doodle-bob-slow" : ""} ${className}`}>
      <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[3px_3px_0px_#0F172A]">

        <path
          d="M30 135 C20 75 35 30 70 30 C105 30 120 75 110 135 Z"
          fill="#FF70A6"
          stroke="#0F172A"
          strokeWidth="4"
        />

        <rect x="42" y="32" width="22" height="38" rx="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
        <rect x="76" y="32" width="22" height="38" rx="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />

        <circle cx="56" cy="52" r="5" fill="#0F172A" />
        <circle cx="58" cy="50" r="2" fill="#FFFFFF" />
        <circle cx="90" cy="52" r="5" fill="#0F172A" />
        <circle cx="92" cy="50" r="2" fill="#FFFFFF" />

        <line x1="42" y1="56" x2="64" y2="56" stroke="#EF4444" strokeWidth="3" />
        <line x1="76" y1="56" x2="98" y2="56" stroke="#EF4444" strokeWidth="3" />

        <path d="M58 92 Q70 102 82 92" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />

        <circle cx="44" cy="94" r="6" fill="#F43F5E" opacity="0.6" />
        <circle cx="96" cy="94" r="6" fill="#F43F5E" opacity="0.6" />
      </svg>
    </div>
  );
}

export function DoodleInitiativeBlob({ className = "w-28 h-28", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <div className={`relative inline-block ${animated ? "animate-doodle-bob" : ""} ${className}`}>
      <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[3px_3px_0px_#0F172A]">

        <path
          d="M28 135 C15 70 30 20 70 20 C110 20 125 70 112 135 Z"
          fill="#8B5CF6"
          stroke="#0F172A"
          strokeWidth="4"
        />

        <circle cx="45" cy="40" r="6" fill="#6D28D9" opacity="0.6" />
        <circle cx="95" cy="45" r="7" fill="#6D28D9" opacity="0.6" />
        <circle cx="40" cy="90" r="5" fill="#6D28D9" opacity="0.6" />
        <circle cx="100" cy="110" r="8" fill="#6D28D9" opacity="0.6" />

        <rect x="42" y="35" width="56" height="40" rx="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
        <circle cx="58" cy="52" r="5" fill="#0F172A" />
        <circle cx="82" cy="52" r="5" fill="#0F172A" />
        <circle cx="60" cy="50" r="2" fill="#FFFFFF" />
        <circle cx="84" cy="50" r="2" fill="#FFFFFF" />

        <path
          d="M52 86 C52 112 88 112 88 86 Z"
          fill="#0F172A"
          stroke="#0F172A"
          strokeWidth="2"
        />
        <path d="M58 98 C65 110 75 110 82 98 Z" fill="#FF6584" />
      </svg>
    </div>
  );
}

export function DoodleSelfBeliefBlob({ className = "w-28 h-28", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <div className={`relative inline-block ${animated ? "animate-doodle-bob" : ""} ${className}`}>
      <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[3px_3px_0px_#0F172A]">

        <path
          d="M25 135 C15 70 30 25 70 25 C110 25 125 70 115 135 Z"
          fill="#F59E0B"
          stroke="#0F172A"
          strokeWidth="4"
        />
        <circle cx="50" cy="45" r="6" fill="#D97706" opacity="0.5" />
        <circle cx="95" cy="50" r="8" fill="#D97706" opacity="0.5" />

        <rect x="22" y="55" width="96" height="26" rx="8" fill="#0F172A" />
        <circle cx="48" cy="68" r="9" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="48" cy="68" r="4" fill="#0F172A" />
        <circle cx="92" cy="68" r="9" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="92" cy="68" r="4" fill="#0F172A" />
        <line x1="57" y1="68" x2="83" y2="68" stroke="#FFFFFF" strokeWidth="3" />

        <rect x="30" y="92" width="20" height="4" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
        <path d="M60 92 Q70 102 80 92" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />

        <polygon
          points="70,105 73,112 80,113 75,118 77,125 70,121 63,125 65,118 60,113 67,112"
          fill="#FFD12E"
          stroke="#0F172A"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export function DoodleVivekMentor({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <div className={`relative inline-block animate-doodle-bob ${className}`}>
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[4px_4px_0px_#0F172A]">

        <circle cx="80" cy="45" r="38" fill="#FEF08A" stroke="#0F172A" strokeWidth="3" strokeDasharray="6 4" />

        <path
          d="M50 48 C50 25 110 25 110 48 C110 70 50 70 50 48 Z"
          fill="#FB923C"
          stroke="#0F172A"
          strokeWidth="3.5"
        />

        <path d="M52 44 Q80 54 108 44" stroke="#0F172A" strokeWidth="3" />
        <path d="M54 36 Q80 46 106 36" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="80" cy="30" r="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />

        <circle cx="80" cy="62" r="24" fill="#FED7AA" stroke="#0F172A" strokeWidth="3.5" />

        <ellipse cx="72" cy="60" rx="3.5" ry="4.5" fill="#0F172A" />
        <circle cx="73" cy="58" r="1.5" fill="#FFFFFF" />
        <ellipse cx="88" cy="60" rx="3.5" ry="4.5" fill="#0F172A" />
        <circle cx="89" cy="58" r="1.5" fill="#FFFFFF" />

        <line x1="80" y1="50" x2="80" y2="56" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />

        <path d="M72 69 Q80 77 88 69" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />

        <path
          d="M40 148 C35 105 50 82 80 82 C110 82 125 105 120 148 Z"
          fill="#F97316"
          stroke="#0F172A"
          strokeWidth="4"
        />

        <path d="M70 84 L95 148" stroke="#0F172A" strokeWidth="3" />
        <path d="M65 100 Q80 115 100 105" stroke="#EA580C" strokeWidth="3" fill="none" />

        <rect x="62" y="112" width="36" height="24" rx="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
        <line x1="68" y1="120" x2="92" y2="120" stroke="#0F172A" strokeWidth="2" />
        <line x1="68" y1="126" x2="86" y2="126" stroke="#0F172A" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function DoodleTarget({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[2px_2px_0px_#0F172A]">
        <circle cx="50" cy="50" r="44" fill="#FDE047" stroke="#0F172A" strokeWidth="4" />
        <circle cx="50" cy="50" r="28" fill="#F97316" stroke="#0F172A" strokeWidth="3.5" />
        <circle cx="50" cy="50" r="14" fill="#EF4444" stroke="#0F172A" strokeWidth="3" />
        <circle cx="50" cy="50" r="4" fill="#FFFFFF" />

        <line x1="8" y1="8" x2="48" y2="48" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
        <polygon points="48,48 38,44 44,38" fill="#0F172A" />
      </svg>
    </div>
  );
}

export function DoodleRocket({ className = "w-20 h-14" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[3px_3px_0px_#0F172A]">

        <path d="M10 20 L80 20 Q105 35 80 50 L10 50 Z" fill="#F43F5E" stroke="#0F172A" strokeWidth="3.5" />
        <rect x="25" y="24" width="8" height="22" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        <rect x="37" y="24" width="8" height="22" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

        <line x1="88" y1="35" x2="114" y2="35" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
        <circle cx="114" cy="35" r="3" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />

        <polygon points="10,20 0,10 20,20" fill="#EAB308" stroke="#0F172A" strokeWidth="2" />
        <polygon points="10,50 0,60 20,50" fill="#EAB308" stroke="#0F172A" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function DoodleSparkle({ className = "w-6 h-6", color = "#FFD12E" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} drop-shadow-[1.5px_1.5px_0px_#0F172A]`}>
      <path
        d="M20 2 C20 12 28 20 38 20 C28 20 20 28 20 38 C20 28 12 20 2 20 C12 20 20 12 20 2 Z"
        fill={color}
        stroke="#0F172A"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function DoodleHeaderBanner({ className = "h-28" }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden flex items-end justify-between px-4 ${className}`}>
      <div className="flex items-end -space-x-4">
        <DoodleFocusBlob className="w-20 h-20 -mb-2" animated={false} />
        <DoodleSelfBeliefBlob className="w-18 h-18 -mb-2" animated={false} />
        <DoodleSelfRelianceBlob className="w-16 h-16 -mb-2" animated={false} />
      </div>
      <div className="flex items-center gap-3">
        <DoodleRocket className="w-20 h-10 hidden sm:block" />
        <DoodleTarget className="w-14 h-14" />
      </div>
      <div className="flex items-end -space-x-4">
        <DoodleInitiativeBlob className="w-16 h-16 -mb-2" animated={false} />
        <DoodleExplorationBlob className="w-18 h-18 -mb-2" animated={false} />
        <DoodlePerseveranceBlob className="w-20 h-20 -mb-2" animated={false} />
      </div>
    </div>
  );
}
