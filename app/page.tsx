"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Brain, 
  Compass, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Users, 
  HeartHandshake, 
  BookOpen, 
  Bot, 
  GraduationCap, 
  User, 
  CheckCircle2,
  Star
} from "lucide-react";
import DoodleLogo from "@/components/DoodleLogo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] text-slate-900 selection:bg-amber-200">

      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between border-b-3 border-slate-900 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <DoodleLogo size="md" href="/" />

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/login"
            className="doodle-btn px-3.5 py-2 bg-amber-100 hover:bg-amber-200 border-2 border-slate-900 text-xs font-black text-slate-900 shadow-doodle-sm flex items-center gap-1.5"
          >
            <User size={14} /> Student Login
          </Link>
          <Link
            href="/login"
            className="doodle-btn px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black border-2 border-slate-900 shadow-doodle-sm flex items-center gap-1.5"
          >
            <GraduationCap size={15} /> Teacher Login
          </Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-12 pb-16 text-center">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200 border-2 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-wider mb-6 shadow-doodle-sm">
          <Sparkles size={14} className="text-amber-600 fill-amber-500" />
          Swami Vivekananda&apos;s Philosophy of Character &amp; Concentration
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto font-doodle">
          Education should not <br />
          <span className="text-blue-600 underline decoration-[#FFD12E] decoration-wavy decoration-4">
            stop at marks.
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base text-slate-700 font-bold max-w-2xl mx-auto leading-relaxed">
          VRIDDHI establishes a joyful, observable evidence loop for inner strength—concentration, fearlessness, self-confidence, pure intentions, selfless service, and perseverance.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/login"
            className="doodle-btn px-6 py-3.5 bg-[#FFD12E] hover:bg-yellow-300 text-slate-900 text-sm font-black border-3 border-slate-900 shadow-doodle flex items-center gap-2 text-center"
          >
            <User size={16} /> Enter Student Portal <ArrowRight size={16} />
          </Link>
          <Link
            href="/login"
            className="doodle-btn px-6 py-3.5 bg-purple-200 hover:bg-purple-300 text-slate-900 text-sm font-black border-3 border-slate-900 shadow-doodle flex items-center gap-2 text-center"
          >
            <GraduationCap size={17} /> Enter Teacher Portal <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-4">
          <a
            href="#how-it-works"
            className="text-xs font-extrabold text-slate-600 hover:text-slate-900 underline underline-offset-4"
          >
            See How VRIDDHI Works ↓
          </a>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="doodle-card p-6 sm:p-8 bg-[#FFFDF7] border-3 border-slate-900 shadow-doodle-lg flex flex-col md:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-3 border-slate-900 shadow-doodle overflow-hidden bg-amber-100 rotate-[-2deg]">
              <Image 
                src="/vivekananda.jpg" 
                alt="Swami Vivekananda Portrait" 
                width={180} 
                height={180}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-[#FFD12E] border-2 border-slate-900 text-slate-900 text-[10px] font-black shadow-[2px_2px_0px_#0F172A]">
              Revered Teacher
            </span>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <span className="doodle-badge bg-amber-300 text-slate-900 border-2 border-slate-900 text-[10px] font-black uppercase">
              Core Philosophical Anchor
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              &ldquo;Education is the manifestation of perfection already in man.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
              &ldquo;What is education? Is it book-learning? No. Is it diverse knowledge? Not even that. The training by which the current and expression of will are brought under control and become fruitful is education.&rdquo;
            </p>
            <div className="pt-2 text-[11px] font-black text-blue-700">
              Concentration is the primary focus • Universal &amp; School-Appropriate
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-5xl mx-auto px-6 pb-20 space-y-8">
        <div className="text-center space-y-2">
          <span className="doodle-badge bg-blue-100 text-slate-900 border-2 border-slate-900 text-[10px] font-black uppercase">
            6 Tracked Dimensions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Observable Growth Principles
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-bold max-w-xl mx-auto">
            Not numerical moral judgments, but verifiable daily habits recorded through tasks, scenario quizzes, and reflections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "1. Concentration",
              isPrimary: true,
              desc: "Primary focus area. Trained via distraction-free sprints and cognitive mini-games without mental exhaustion.",
              icon: Brain,
              bg: "bg-blue-50",
              accent: "bg-[#FFD12E]"
            },
            {
              title: "2. Courage & Fearlessness",
              isPrimary: false,
              desc: "Speaking up in class, asking honest doubts, attempting difficult problems without fear of social failure.",
              icon: Flame,
              bg: "bg-orange-50",
              accent: "bg-orange-200"
            },
            {
              title: "3. Self-Confidence & Faith",
              isPrimary: false,
              desc: "Belief in one's capacity to learn, positive self-talk, and overcoming initial self-doubt through practice.",
              icon: ShieldCheck,
              bg: "bg-emerald-50",
              accent: "bg-emerald-200"
            },
            {
              title: "4. Purity of Mind & Heart",
              isPrimary: false,
              desc: "Honest intentions, sincerity in work, rejoicing in peer successes, and dissolving toxic comparison.",
              icon: Sparkles,
              bg: "bg-purple-50",
              accent: "bg-purple-200"
            },
            {
              title: "5. Selfless Service",
              isPrimary: false,
              desc: "Assisting classmates without expecting praise, classroom stewardship, and caring for others quietly.",
              icon: HeartHandshake,
              bg: "bg-rose-50",
              accent: "bg-rose-200"
            },
            {
              title: "6. Perseverance & Hard Work",
              isPrimary: false,
              desc: "Continuing when a concept is tricky, retrying failed attempts, and maintaining sustained effort over time.",
              icon: Target,
              bg: "bg-amber-50",
              accent: "bg-amber-200"
            }
          ].map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className={`doodle-card p-5 bg-white border-3 border-slate-900 flex flex-col justify-between transition-transform duration-150 ${
                  principle.isPrimary ? "shadow-doodle-lg ring-2 ring-blue-500/40" : "shadow-doodle-sm hover:shadow-doodle"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${principle.accent} border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-doodle-sm`}>
                      <Icon size={18} />
                    </div>
                    {principle.isPrimary && (
                      <span className="doodle-badge bg-blue-600 text-white border-1.5 border-slate-900 text-[9px] font-black uppercase">
                        Primary Anchor
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-base text-slate-900 mb-1">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-bold leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t-3 border-slate-900 bg-white py-8 px-6 text-center text-xs font-black text-slate-600 space-y-1">
        <p>VRIDDHI — Holistic Character Development Platform</p>
        <p className="text-slate-400 font-bold">&ldquo;Arise, awake, and stop not till the goal is reached.&rdquo; — Swami Vivekananda</p>
      </footer>
    </main>
  );
}
