"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useVriddhiStore } from "@/lib/store";
import { 
  GraduationCap, 
  User, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";
import DoodleLogo from "@/components/DoodleLogo";

export default function Login() {
  const router = useRouter();
  const { setCurrentRole } = useVriddhiStore();
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT");
  const [email, setEmail] = useState("aviral.gupta@kvdelhi.edu.in");
  const [password, setPassword] = useState("••••••••");

  const handleRoleSwitch = (selected: "STUDENT" | "TEACHER") => {
    setRole(selected);
    if (selected === "STUDENT") {
      setEmail("aviral.gupta@kvdelhi.edu.in");
    } else {
      setEmail("anjali.verma@kvdelhi.edu.in");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole(role);
    if (role === "STUDENT") {
      router.push("/dashboard");
    } else {
      router.push("/teacher");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7] text-slate-900 flex flex-col justify-between p-4 sm:p-6">

      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-4">
        <DoodleLogo size="md" href="/" />

        <Link
          href="/"
          className="doodle-btn px-3 py-1.5 bg-white text-slate-900 text-xs font-black border-2 border-slate-900 shadow-doodle-sm"
        >
          ← Back to Home
        </Link>
      </header>

      <div className="max-w-md w-full mx-auto my-8">
        <div className="doodle-card p-7 sm:p-8 bg-white border-3 border-slate-900 shadow-doodle space-y-6">

          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border-2 border-slate-900 text-slate-900 text-[11px] font-black uppercase tracking-wider shadow-[1px_1px_0px_#0F172A]">
              <Sparkles size={13} className="text-amber-600 fill-amber-500" /> Secure Classroom Entry
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Sign In to VRIDDHI
            </h1>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">
              Choose your role to enter your personalized growth space.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 border-2 border-slate-900">
            <button
              type="button"
              onClick={() => handleRoleSwitch("STUDENT")}
              className={`py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition ${
                role === "STUDENT"
                  ? "bg-[#FFD12E] text-slate-900 border-2 border-slate-900 shadow-doodle-sm"
                  : "text-slate-600 hover:text-slate-900 border-2 border-transparent"
              }`}
            >
              <User size={15} /> Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch("TEACHER")}
              className={`py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition ${
                role === "TEACHER"
                  ? "bg-purple-200 text-slate-900 border-2 border-slate-900 shadow-doodle-sm"
                  : "text-slate-600 hover:text-slate-900 border-2 border-transparent"
              }`}
            >
              <GraduationCap size={16} /> Teacher / Mentor
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-black text-slate-900 block mb-1">
                School Email / Student ID
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-slate-900 text-xs font-black bg-slate-50 outline-none focus:bg-white shadow-[2px_2px_0px_#0F172A] transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-black text-slate-900 block">
                  Password / PIN
                </label>
                <span className="text-[11px] text-blue-700 font-black hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-slate-900 text-xs font-black bg-slate-50 outline-none focus:bg-white shadow-[2px_2px_0px_#0F172A] transition"
              />
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border-2 border-slate-900 text-xs text-slate-800 space-y-1 shadow-[2px_2px_0px_#0F172A]">
              <div className="font-black text-[11px] text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-700" />
                Demo Account Loaded:
              </div>
              <div className="font-bold text-[11px] text-slate-600">
                {role === "STUDENT" 
                  ? "Aviral Gupta (Class 10-A • Student Mode)" 
                  : "Ms. Anjali Verma (Class 10-A • Teacher Mode with Holistic Report Access)"}
              </div>
            </div>

            <button
              type="submit"
              className="doodle-btn w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black border-3 border-slate-900 shadow-doodle flex items-center justify-center gap-2"
            >
              Enter {role === "STUDENT" ? "Student Dashboard" : "Teacher Dashboard"} <ArrowRight size={15} />
            </button>
          </form>

          <div className="text-center pt-2 border-t-2 border-slate-100">
            <span className="text-[11px] font-bold text-slate-500">
              VRIDDHI • Holistic Character Development Platform
            </span>
          </div>
        </div>
      </div>

      <footer className="text-center py-4 text-xs font-bold text-slate-500">
        &ldquo;Education is the manifestation of perfection already in man.&rdquo; — Swami Vivekananda
      </footer>
    </main>
  );
}
