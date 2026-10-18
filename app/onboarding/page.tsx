"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Brain, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  HeartHandshake, 
  Zap, 
  Target,
  Info
} from "lucide-react";
import { useVriddhiStore } from "@/lib/store";
import { DoodleFocusBlob, DoodleVivekMentor } from "@/components/doodles/DoodleCharacters";

interface BaselineQuestion {
  id: number;
  category: string;
  principle: "Concentration" | "Courage & Fearlessness" | "Self-Confidence & Faith" | "Purity of Mind & Heart" | "Selfless Service" | "Perseverance & Hard Work";
  question: string;
  scenario: string;
  options: {
    text: string;
    score: number;
    signal: string;
  }[];
}

const baselineQuestions: BaselineQuestion[] = [
  {
    id: 1,
    category: "Concentration Mini-Task",
    principle: "Concentration",
    question: "While studying a dense chapter, when notifications or ambient noise occur, what is your experience?",
    scenario: "You have 20 minutes to read an important science topic before class discussion.",
    options: [
      { text: "I can immerse deeply and barely notice sounds once I get into flow.", score: 80, signal: "Strong Concentration Gate" },
      { text: "I get briefly tempted, but bring my attention back to the page within seconds.", score: 72, signal: "Active Attentional Recovery" },
      { text: "I constantly pick up my phone or check messages every few minutes.", score: 50, signal: "Frequent Attention Shifts" },
      { text: "I struggle to stay with a single paragraph for more than 2 minutes.", score: 40, signal: "Diffused Attention Baseline" }
    ]
  },
  {
    id: 2,
    category: "Courage & Fearlessness Scenario",
    principle: "Courage & Fearlessness",
    question: "When you have a doubt that nobody else in the classroom seems to ask, what do you usually do?",
    scenario: "The teacher asks 'Did everyone understand?' and the room is completely quiet.",
    options: [
      { text: "Raise my hand and ask clearly, even if I feel brief nervousness.", score: 85, signal: "High Classroom Courage" },
      { text: "Wait to ask a desk partner or search online later to avoid drawing attention.", score: 65, signal: "Cautious Hesitation" },
      { text: "Keep quiet and hope the teacher repeats it on their own.", score: 48, signal: "Performance Anxiety" },
      { text: "Ask anonymously on Sahaay where I feel safe from peer judgment.", score: 75, signal: "Constructive Digital Courage" }
    ]
  },
  {
    id: 3,
    category: "Self-Confidence & Faith",
    principle: "Self-Confidence & Faith",
    question: "When faced with an advanced challenge labeled 'Olympiad / High Difficulty', what is your first thought?",
    scenario: "A challenge beyond your normal grade textbook is placed on the blackboard.",
    options: [
      { text: "Excitement! My current skill is not my final limit; testing difficulty is how I grow.", score: 86, signal: "Growth Mindset & Inner Faith" },
      { text: "I might not solve it completely, but I will definitely understand something new.", score: 74, signal: "Healthy Self-Trust" },
      { text: "This is probably only for the top rankers, not for me.", score: 50, signal: "Fixed Intelligence Belief" },
      { text: "I try to look busy so the teacher does not call on me.", score: 42, signal: "Fear of Failure" }
    ]
  },
  {
    id: 4,
    category: "Purity of Mind & Heart",
    principle: "Purity of Mind & Heart",
    question: "When your close friend receives praise or a star badge for something you wanted, how do you feel?",
    scenario: "Your classmate is awarded the star badge in front of the entire assembly.",
    options: [
      { text: "I feel genuinely happy for them and celebrate their hard work with sincerity.", score: 88, signal: "Purity of Intent & Generosity" },
      { text: "I feel a brief moment of envy, but consciously remind myself that their win doesn't diminish mine.", score: 76, signal: "Self-Aware Composure" },
      { text: "I feel sour and look for flaws in their work to feel better.", score: 42, signal: "Unhealthy Comparison" }
    ]
  },
  {
    id: 5,
    category: "Selfless Service (Seva)",
    principle: "Selfless Service",
    question: "When you see a classmate struggling with homework or laboratory setup, what is your instinct?",
    scenario: "You have finished your work 10 minutes early in the science lab.",
    options: [
      { text: "Offer to explain the concept quietly without giving away the direct answer.", score: 85, signal: "Empowering Selfless Service" },
      { text: "Help only if the teacher asks me or if it will get me extra credit.", score: 60, signal: "Transaction-Based Help" },
      { text: "Do nothing and scroll through my notebooks.", score: 45, signal: "Passive Disengagement" }
    ]
  },
  {
    id: 6,
    category: "Perseverance & Hard Work",
    principle: "Perseverance & Hard Work",
    question: "If a difficult problem or coding task fails twice in a row, what do you usually do?",
    scenario: "You are stuck on a multi-step logic problem with no obvious next step.",
    options: [
      { text: "Take a deep breath, break it into smaller sub-problems, and try a 3rd distinct approach.", score: 88, signal: "High Perseverance & Strategy Iteration" },
      { text: "Pause for 10 minutes, review fundamental formulas, then retry.", score: 75, signal: "Reflective Persistence" },
      { text: "Immediately seek the ready-made solution or hint.", score: 55, signal: "Early Hint Reliance" },
      { text: "Feel frustrated and abandon the task completely.", score: 40, signal: "Low Frustration Tolerance" }
    ]
  }
];

export default function Onboarding() {
  const router = useRouter();
  const { submitBaselineAssessment, triggerConfetti } = useVriddhiStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isDone, setIsDone] = useState(false);

  const [scores, setScores] = useState<Record<string, number>>({
    Concentration: 48,
    "Courage & Fearlessness": 42,
    "Self-Confidence & Faith": 50,
    "Purity of Mind & Heart": 55,
    "Selfless Service": 40,
    "Perseverance & Hard Work": 46
  });

  const handleSelect = (idx: number, optScore: number, principle: BaselineQuestion["principle"]) => {
    setSelectedAnswers({ ...selectedAnswers, [idx]: optScore });
    setScores(prev => ({ ...prev, [principle]: optScore }));

    if (currentStep + 1 < baselineQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsDone(true);
      triggerConfetti();
    }
  };

  const handleFinish = () => {
    submitBaselineAssessment(scores);
    router.push("/dashboard");
  };

  const q = baselineQuestions[currentStep];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-slate-900 p-4 sm:p-6 flex items-center justify-center">
      <div className="max-w-xl w-full">

        <div className="flex items-center justify-between mb-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              V
            </div>
            <span className="font-extrabold text-sm tracking-wider">VRIDDHI</span>
          </Link>
          <span className="text-xs font-bold text-slate-500">
            {isDone ? "Baseline Completed" : `Question ${currentStep + 1} of ${baselineQuestions.length}`}
          </span>
        </div>

        {!isDone ? (

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">

            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / baselineQuestions.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase">
                {q.category}
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                {q.principle}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {q.question}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {q.scenario}
              </p>
            </div>

            <div className="space-y-2.5">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(currentStep, opt.score, q.principle)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 transition flex items-center justify-between gap-3 group bg-white"
                >
                  <span className="text-xs font-semibold text-slate-800 leading-relaxed">
                    {opt.text}
                  </span>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-600 shrink-0" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium flex items-center justify-between">
              <span>Start-of-year baseline • Not a diagnosis or test</span>
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-slate-600 font-bold hover:underline"
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
        ) : (

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 mx-auto flex items-center justify-center text-3xl">
              🌱
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                Start-of-Year Baseline Established
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Your Baseline Profile is Ready
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1 max-w-sm mx-auto leading-relaxed">
                These scores are starting points for your practice, not permanent judgments of your character.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left text-xs">
              {Object.entries(scores).map(([name, score]) => (
                <div key={name} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-extrabold text-slate-400 block truncate">{name}</span>
                  <div className="text-xl font-black text-slate-900 mt-0.5">{score}</div>
                  <span className="text-[10px] text-slate-500 font-medium">Initial Baseline</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-700 font-medium text-left flex items-start gap-2">
              <DoodleVivekMentor className="w-10 h-10 shrink-0" />
              <span className="leading-relaxed">
                &ldquo;All power is within you. You can do anything and everything.&rdquo; — Swami Vivekananda
              </span>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black flex items-center justify-center gap-2 shadow-sm transition"
            >
              Enter VRIDDHI Dashboard <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
