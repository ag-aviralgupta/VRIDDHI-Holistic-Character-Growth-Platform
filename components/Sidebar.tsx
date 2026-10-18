"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Target, 
  Brain, 
  Compass, 
  BookOpen, 
  Bot, 
  HeartHandshake, 
  BarChart3, 
  Flame, 
  Star,
  Wifi, 
  WifiOff, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";
import { useVriddhiStore } from "@/lib/store";
import DoodleLogo from "./DoodleLogo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home, badge: null, color: "bg-amber-100" },
  { href: "/growth", label: "Six Principles & Mirror", icon: BarChart3, badge: "6 Core", color: "bg-blue-100" },
  { href: "/focus-lab", label: "Concentration Lab", icon: Brain, badge: "Primary", color: "bg-purple-100" },
  { href: "/quests", label: "Weekly Missions", icon: Target, badge: "Week 4", color: "bg-green-100" },
  { href: "/explore", label: "Activity Library", icon: Compass, badge: "3 Types", color: "bg-orange-100" },
  { href: "/reflection", label: "Reflection Journal", icon: BookOpen, badge: "+15 XP", color: "bg-pink-100" },
  { href: "/mentor", label: "MitraAI Assistant", icon: Bot, badge: "AI", color: "bg-yellow-100" },
  { href: "/sahaay", label: "Sahaay Help Space", icon: HeartHandshake, badge: "Anon", color: "bg-teal-100" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { student, isOfflineSimulated, toggleOfflineMode, offlineQueue, syncOfflineQueue } = useVriddhiStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#FFFDF7] border-b-3 border-slate-900 z-30 px-3.5 sm:px-4 flex items-center justify-between">
        <DoodleLogo size="sm" href="/" />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="doodle-tag bg-orange-100 text-slate-900 border-2 border-slate-900 text-[10px] sm:text-xs font-black flex items-center gap-1 shadow-doodle-sm">
            <Flame size={12} className="text-orange-600 fill-orange-500" />
            <span>{student.streakDays}d</span>
          </div>
          <div className="doodle-tag bg-yellow-100 text-slate-900 border-2 border-slate-900 text-[10px] sm:text-xs font-black flex items-center gap-1 shadow-doodle-sm">
            <Star size={12} className="text-amber-600 fill-amber-500" />
            <span>{student.totalXP}</span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="doodle-btn w-9 h-9 bg-white border-2 border-slate-900 text-slate-900 flex items-center justify-center shadow-doodle-sm ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#FFFDF7] border-r-3 border-slate-900 z-40 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="p-4 border-b-3 border-slate-900 bg-white">
          <DoodleLogo size="md" href="/" />

          <div className="mt-3.5 p-2.5 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-doodle-sm flex items-center justify-between">
            <div className="truncate pr-1">
              <div className="text-xs font-black text-slate-900 truncate">{student.name}</div>
              <div className="text-[10px] font-bold text-slate-600">{student.grade} • Roll {student.rollNo}</div>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-lg bg-[#FFD12E] border-1.5 border-slate-900 text-slate-900 text-[10px] font-black shadow-[1px_1px_0px_#0F172A]">
              LVL {student.levelNumber}
            </span>
          </div>
        </div>

        <div className="p-3 flex-1 overflow-y-auto space-y-1.5">
          <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Student Journey</span>
            <Sparkles size={11} className="text-amber-500" />
          </div>

          {navItems.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition-all duration-100 ${
                  isActive
                    ? "bg-[#FFD12E] text-slate-900 border-2 border-slate-900 shadow-doodle-sm translate-x-1"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:border-2 hover:border-slate-300 border-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg border-1.5 border-slate-900 flex items-center justify-center shrink-0 ${
                    isActive ? "bg-white" : item.color
                  }`}>
                    <Icon size={14} className="text-slate-900" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border border-slate-900 ${
                      isActive ? "bg-white text-slate-900 shadow-[1px_1px_0px_#0F172A]" : "bg-slate-50 text-slate-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-3 border-t-3 border-slate-900 bg-white space-y-2">
          <div className="p-2 rounded-xl bg-slate-50 border-2 border-slate-900 shadow-doodle-sm flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-900 truncate">
              {isOfflineSimulated ? (
                <>
                  <WifiOff size={13} className="text-red-500 shrink-0" />
                  <span className="text-red-600 truncate">Offline Queue: {offlineQueue.length}</span>
                </>
              ) : (
                <>
                  <Wifi size={13} className="text-emerald-600 shrink-0" />
                  <span className="text-emerald-700 truncate">Classroom Online</span>
                </>
              )}
            </div>
            {isOfflineSimulated && offlineQueue.length > 0 ? (
              <button
                onClick={syncOfflineQueue}
                className="doodle-btn px-2 py-0.5 bg-[#70E000] text-slate-900 text-[10px] font-black border border-slate-900 shadow-none hover:shadow-xs shrink-0"
              >
                Sync
              </button>
            ) : (
              <button
                onClick={toggleOfflineMode}
                className="text-[10px] font-bold text-slate-500 hover:text-slate-900 underline shrink-0"
              >
                {isOfflineSimulated ? "Go Online" : "Simulate Offline"}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
