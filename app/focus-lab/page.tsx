"use client";

import React, { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { useAwakenStore } from "@/lib/store";
import { 
  Brain, 
  Clock3, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Lightbulb,
  AlertCircle,
  Zap,
  Target
} from "lucide-react";
import { 
  DoodleFocusBlob, 
  DoodleSelfRelianceBlob, 
  DoodlePerseveranceBlob, 
  DoodleSparkle,
  DoodleTarget 
} from "@/components/doodles/DoodleCharacters";

type ActiveGameType = "grid" | "memory" | "flexibility" | "self_reliance" | null;

export default function FocusLab() {
  const { awardXP, recordGrowthEvent, triggerConfetti, addReflection } = useAwakenStore();
  const [activeGame, setActiveGame] = useState<ActiveGameType>(null);

  const [completedGames, setCompletedGames] = useState<Record<string, number>>({
    grid: 88,
    memory: 92
  });

  const [postGameReflection, setPostGameReflection] = useState<{
    gameName: string;
    score: number;
    xp: number;
  } | null>(null);
  const [reflectionAnswer, setReflectionAnswer] = useState("");

  const [gridNumbers, setGridNumbers] = useState<number[]>([]);
  const [nextExpected, setNextExpected] = useState(1);
  const [gridTimer, setGridTimer] = useState(30);
  const [gridStarted, setGridStarted] = useState(false);
  const [gridFinished, setGridFinished] = useState(false);
  const [gridErrors, setGridErrors] = useState(0);

  const startGridGame = () => {
    const nums = Array.from({ length: 16 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    setGridNumbers(nums);
    setNextExpected(1);
    setGridTimer(30);
    setGridErrors(0);
    setGridStarted(true);
    setGridFinished(false);
  };

  useEffect(() => {
    let interval: any;
    if (gridStarted && !gridFinished && gridTimer > 0) {
      interval = setInterval(() => setGridTimer(t => t - 1), 1000);
    } else if (gridTimer === 0 && gridStarted && !gridFinished) {
      finishGridGame(false);
    }
    return () => clearInterval(interval);
  }, [gridStarted, gridFinished, gridTimer]);

  const handleGridClick = (num: number) => {
    if (!gridStarted || gridFinished) return;
    if (num === nextExpected) {
      if (num === 16) {
        finishGridGame(true);
      } else {
        setNextExpected(n => n + 1);
      }
    } else {
      setGridErrors(e => e + 1);
    }
  };

  const finishGridGame = (completedAll: boolean) => {
    setGridFinished(true);
    const score = completedAll ? Math.max(60, 100 - gridErrors * 8) : Math.round((nextExpected / 16) * 100);
    setCompletedGames(prev => ({ ...prev, grid: score }));
    awardXP(20, "Completed Concentration Grid Challenge");
    recordGrowthEvent({
      eventType: "TASK_COMPLETED",
      dimension: "Focus",
      value: 2,
      description: `Completed Concentration Grid with ${score}% accuracy.`
    });
    triggerConfetti();
    setPostGameReflection({ gameName: "Concentration Grid", score, xp: 20 });
  };

  const lanternColors = ["#2563EB", "#EF4444", "#EAB308", "#10B981"];
  const lanternNames = ["Blue", "Red", "Yellow", "Green"];
  const [memorySequence, setMemorySequence] = useState<number[]>([0, 2, 1, 3]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [memoryActiveStep, setMemoryActiveStep] = useState<number | null>(null);
  const [memoryPlayingSeq, setMemoryPlayingSeq] = useState(false);
  const [memoryLevel, setMemoryLevel] = useState(1);

  const playSequencePreview = () => {
    setMemoryPlayingSeq(true);
    setPlayerInput([]);
    const seq = Array.from({ length: 3 + memoryLevel }, () => Math.floor(Math.random() * 4));
    setMemorySequence(seq);

    seq.forEach((val, i) => {
      setTimeout(() => {
        setMemoryActiveStep(val);
        setTimeout(() => setMemoryActiveStep(null), 400);
      }, (i + 1) * 700);
    });

    setTimeout(() => {
      setMemoryPlayingSeq(false);
    }, (seq.length + 1) * 700);
  };

  const handleLanternClick = (index: number) => {
    if (memoryPlayingSeq) return;
    const nextInput = [...playerInput, index];
    setPlayerInput(nextInput);

    const currentStep = nextInput.length - 1;
    if (nextInput[currentStep] !== memorySequence[currentStep]) {

      alert("Oops! Memory sequence mismatch. Try with full concentration!");
      setPlayerInput([]);
      return;
    }

    if (nextInput.length === memorySequence.length) {

      const score = 95;
      setCompletedGames(prev => ({ ...prev, memory: score }));
      awardXP(25, "Completed Memory Lantern Challenge");
      recordGrowthEvent({
        eventType: "TASK_COMPLETED",
        dimension: "Focus",
        value: 2,
        description: `Reproduced ${memorySequence.length}-step visual sequence.`
      });
      triggerConfetti();
      setPostGameReflection({ gameName: "Memory Lantern Sequence", score, xp: 25 });
    }
  };

  const flexRules = ["COLOR", "SHAPE"];
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [flexScore, setFlexScore] = useState(0);
  const [flexRoundsDone, setFlexRoundsDone] = useState(0);
  const [flexTargetCard, setFlexTargetCard] = useState({ color: "BLUE", shape: "CIRCLE" });

  const startFlexibilityRound = () => {
    const colors = ["BLUE", "RED", "YELLOW"];
    const shapes = ["CIRCLE", "SQUARE", "TRIANGLE"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setFlexTargetCard({ color: randomColor, shape: randomShape });

    if (flexRoundsDone > 0 && flexRoundsDone % 3 === 0) {
      setCurrentRuleIndex(r => (r === 0 ? 1 : 0));
    }
  };

  const handleFlexChoice = (attribute: string) => {
    const currentRule = flexRules[currentRuleIndex];
    const isCorrect = (currentRule === "COLOR" && attribute === flexTargetCard.color) ||
                      (currentRule === "SHAPE" && attribute === flexTargetCard.shape);

    if (isCorrect) {
      setFlexScore(s => s + 1);
    }
    const nextRounds = flexRoundsDone + 1;
    setFlexRoundsDone(nextRounds);

    if (nextRounds >= 6) {
      const finalScore = Math.round(((flexScore + (isCorrect ? 1 : 0)) / 6) * 100);
      setCompletedGames(prev => ({ ...prev, flexibility: finalScore }));
      awardXP(25, "Completed Cognitive Flexibility Challenge");
      recordGrowthEvent({
        eventType: "TASK_COMPLETED",
        dimension: "Focus",
        value: 2,
        description: `Completed cognitive rule switching with ${finalScore}% accuracy.`
      });
      triggerConfetti();
      setPostGameReflection({ gameName: "Cognitive Flexibility / Rule Switching", score: finalScore, xp: 25 });
    } else {
      startFlexibilityRound();
    }
  };

  const [srTimer, setSrTimer] = useState(60); 
  const [srHintUnlocked, setSrHintUnlocked] = useState(false);
  const [srHintUsed, setSrHintUsed] = useState(false);
  const [srAttempts, setSrAttempts] = useState(0);
  const [srUserAnswer, setSrUserAnswer] = useState("");
  const [srFeedback, setSrFeedback] = useState<string | null>(null);

  useEffect(() => {
    let t: any;
    if (activeGame === "self_reliance" && srTimer > 0) {
      t = setInterval(() => setSrTimer(s => s - 1), 1000);
    } else if (srTimer === 0) {
      setSrHintUnlocked(true);
    }
    return () => clearInterval(t);
  }, [activeGame, srTimer]);

  const handleSrSubmit = () => {
    setSrAttempts(a => a + 1);

    if (srUserAnswer.trim().toLowerCase().includes("5")) {
      const isIndependent = !srHintUsed;
      if (isIndependent) {
        awardXP(20, "Independent Problem-Solving Attempt");
        recordGrowthEvent({
          eventType: "INDEPENDENT_ATTEMPT",
          dimension: "Self-Reliance",
          value: 3,
          description: "Solved the Riddle of the 5 Machines independently without requesting hints."
        });
      } else {
        awardXP(10, "Solved Riddle with hint guidance");
        recordGrowthEvent({
          eventType: "TASK_COMPLETED",
          dimension: "Self-Reliance",
          value: 1,
          description: "Solved Riddle after consulting hints."
        });
      }
      triggerConfetti();
      setCompletedGames(prev => ({ ...prev, self_reliance: 100 }));
      setPostGameReflection({
        gameName: "Self-Reliance Logic Challenge",
        score: 100,
        xp: isIndependent ? 20 : 10
      });
    } else {

      setSrFeedback("Try another approach! Check the relationship between machines, items, and time.");

      awardXP(15, "Retried problem after failure");
      recordGrowthEvent({
        eventType: "TASK_RETRIED",
        dimension: "Perseverance",
        value: 2,
        description: "Attempted another strategy after initial incorrect answer."
      });
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">

        <div className="rounded-2xl border-2 border-blue-600 bg-gradient-to-r from-blue-50 via-white to-indigo-50/60 p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider">
              <Brain size={13} />
              Concentration Lab • Primary Growth Area
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Concentration: The Essence of Education
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Swami Vivekananda taught that concentration is the only method to attain knowledge. These short exercises build sustained attention, working memory, and rule flexibility through repeatable practice.
            </p>
          </div>
          <DoodleFocusBlob className="w-20 h-20 shrink-0" animated={false} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="doodle-card p-6 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-doodle-blue text-white border-2 border-slate-900 flex items-center justify-center font-black text-xl shadow-doodle-sm">
                  1
                </div>
                {completedGames.grid ? (
                  <span className="doodle-tag bg-emerald-100 text-emerald-800 border-emerald-800">
                    <CheckCircle2 size={13} className="mr-1 text-emerald-600" />
                    Score: {completedGames.grid}%
                  </span>
                ) : (
                  <span className="doodle-tag bg-doodle-yellow text-slate-900">+20 XP</span>
                )}
              </div>

              <h3 className="text-xl font-black mt-4 text-slate-900">Concentration Grid</h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 leading-relaxed">
                A 4x4 randomized number grid. Click numbers in exact ascending order (1 → 16) without letting visual clutter distract you.
              </p>

              <div className="mt-4 flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1"><Clock3 size={14} /> 30 Seconds</span>
                <span>•</span>
                <span>Sustained Attention</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-slate-900/10">
              <button
                onClick={() => {
                  setActiveGame("grid");
                  startGridGame();
                }}
                className="doodle-btn w-full py-3 bg-doodle-yellow hover:bg-amber-300 text-slate-900 text-xs font-black flex items-center justify-center gap-2"
              >
                {completedGames.grid ? "Play Again (Review Score)" : "Start Concentration Challenge"}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="doodle-card p-6 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 border-2 border-slate-900 flex items-center justify-center font-black text-xl shadow-doodle-sm">
                  2
                </div>
                {completedGames.memory ? (
                  <span className="doodle-tag bg-emerald-100 text-emerald-800 border-emerald-800">
                    <CheckCircle2 size={13} className="mr-1 text-emerald-600" />
                    Score: {completedGames.memory}%
                  </span>
                ) : (
                  <span className="doodle-tag bg-doodle-yellow text-slate-900">+25 XP</span>
                )}
              </div>

              <h3 className="text-xl font-black mt-4 text-slate-900">Memory Lantern Sequence</h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 leading-relaxed">
                Observe the colored lantern flash pattern without speaking, hold it in working memory, and reproduce the sequence accurately.
              </p>

              <div className="mt-4 flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1"><Clock3 size={14} /> 2 Minutes</span>
                <span>•</span>
                <span>Working Memory</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-slate-900/10">
              <button
                onClick={() => {
                  setActiveGame("memory");
                  playSequencePreview();
                }}
                className="doodle-btn w-full py-3 bg-doodle-pink text-white hover:bg-pink-500 text-xs font-black flex items-center justify-center gap-2"
              >
                {completedGames.memory ? "Play Again" : "Start Memory Challenge"}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="doodle-card p-6 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-doodle-purple text-white border-2 border-slate-900 flex items-center justify-center font-black text-xl shadow-doodle-sm">
                  3
                </div>
                {completedGames.flexibility ? (
                  <span className="doodle-tag bg-emerald-100 text-emerald-800 border-emerald-800">
                    <CheckCircle2 size={13} className="mr-1 text-emerald-600" />
                    Score: {completedGames.flexibility}%
                  </span>
                ) : (
                  <span className="doodle-tag bg-doodle-yellow text-slate-900">+25 XP</span>
                )}
              </div>

              <h3 className="text-xl font-black mt-4 text-slate-900">Cognitive Flexibility (Switch & Stay)</h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 leading-relaxed">
                The sorting rule dynamically switches between <span className="font-extrabold text-doodle-blue">COLOR</span> and <span className="font-extrabold text-doodle-purple">SHAPE</span> every 3 rounds. Test your mental switching composure.
              </p>

              <div className="mt-4 flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1"><Clock3 size={14} /> 6 Rounds</span>
                <span>•</span>
                <span>Cognitive Flexibility</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-slate-900/10">
              <button
                onClick={() => {
                  setActiveGame("flexibility");
                  setFlexScore(0);
                  setFlexRoundsDone(0);
                  startFlexibilityRound();
                }}
                className="doodle-btn w-full py-3 bg-doodle-purple text-white hover:bg-purple-600 text-xs font-black flex items-center justify-center gap-2"
              >
                {completedGames.flexibility ? "Play Again" : "Start Rule Switch Challenge"}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="doodle-card p-6 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-doodle-green text-slate-900 border-2 border-slate-900 flex items-center justify-center font-black text-xl shadow-doodle-sm">
                  4
                </div>
                {completedGames.self_reliance ? (
                  <span className="doodle-tag bg-emerald-100 text-emerald-800 border-emerald-800">
                    <CheckCircle2 size={13} className="mr-1 text-emerald-600" />
                    Solved
                  </span>
                ) : (
                  <span className="doodle-tag bg-doodle-yellow text-slate-900">+20 XP (Independent)</span>
                )}
              </div>

              <h3 className="text-xl font-black mt-4 text-slate-900">Self-Reliance Riddle (Hint Delay)</h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 leading-relaxed">
                A logic challenge where hints are delayed for 60 seconds. Attempting independently builds self-reliance; retrying after errors builds perseverance.
              </p>

              <div className="mt-4 flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1"><Clock3 size={14} /> 60s Hint Lock</span>
                <span>•</span>
                <span>Self-Reliance &amp; Perseverance</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-slate-900/10">
              <button
                onClick={() => {
                  setActiveGame("self_reliance");
                  setSrTimer(60);
                  setSrHintUnlocked(false);
                  setSrHintUsed(false);
                  setSrAttempts(0);
                  setSrFeedback(null);
                }}
                className="doodle-btn w-full py-3 bg-doodle-green text-slate-900 hover:bg-lime-400 text-xs font-black flex items-center justify-center gap-2"
              >
                {completedGames.self_reliance ? "Retry Challenge" : "Accept Independent Challenge"}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {activeGame === "grid" && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="doodle-card max-w-md w-full p-6 bg-white">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
                <div>
                  <div className="doodle-tag bg-doodle-blue text-white">Focus Lab Mini-Game</div>
                  <h2 className="text-xl font-black mt-1">Concentration Grid (1 → 16)</h2>
                </div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-900"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between my-4 p-3 rounded-xl bg-amber-50 border-2 border-slate-900 text-xs font-black">
                <div className="flex items-center gap-1.5">
                  <Target size={16} className="text-doodle-blue" />
                  <span>Target: <span className="text-lg text-doodle-blue underline">{nextExpected}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock3 size={16} className="text-doodle-orange" />
                  <span>Time: <span className="text-lg text-doodle-orange">{gridTimer}s</span></span>
                </div>
                <div className="text-slate-500">
                  Errors: {gridErrors}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2.5 my-6">
                {gridNumbers.map((num) => {
                  const isDone = num < nextExpected;
                  return (
                    <button
                      key={num}
                      onClick={() => handleGridClick(num)}
                      disabled={isDone}
                      className={`h-16 rounded-2xl border-3 border-slate-900 font-black text-2xl flex items-center justify-center transition-all ${
                        isDone
                          ? "bg-slate-100 text-slate-300 border-slate-300 pointer-events-none"
                          : "bg-white text-slate-900 shadow-doodle-sm hover:-translate-y-0.5 active:translate-y-0.5 hover:bg-amber-100"
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              <div className="text-center text-xs font-bold text-slate-500">
                Find and tap numbers in ascending order from 1 to 16. Don&apos;t rush!
              </div>
            </div>
          </div>
        )}

        {activeGame === "memory" && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="doodle-card max-w-md w-full p-6 bg-white text-center">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900 text-left">
                <div>
                  <div className="doodle-tag bg-doodle-pink text-white">Focus Lab Mini-Game</div>
                  <h2 className="text-xl font-black mt-1">Memory Lantern Sequence</h2>
                </div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-900"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              <div className="my-4 text-xs font-black text-slate-600">
                {memoryPlayingSeq ? (
                  <span className="text-doodle-blue animate-pulse">Watch closely! Sequence flashing...</span>
                ) : (
                  <span className="text-emerald-700">Your turn! Reproduce the exact sequence ({playerInput.length}/{memorySequence.length})</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 my-6">
                {lanternColors.map((color, idx) => {
                  const isActive = memoryActiveStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleLanternClick(idx)}
                      disabled={memoryPlayingSeq}
                      style={{ backgroundColor: color }}
                      className={`h-28 rounded-3xl border-3 border-slate-900 font-black text-lg text-white shadow-doodle-sm transition-all flex flex-col items-center justify-center ${
                        isActive ? "scale-105 ring-4 ring-slate-900 brightness-125" : "hover:opacity-90 active:scale-95"
                      }`}
                    >
                      <div className="text-3xl mb-1">🪔</div>
                      {lanternNames[idx]}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={playSequencePreview}
                disabled={memoryPlayingSeq}
                className="doodle-btn px-4 py-2 bg-slate-100 text-xs font-black text-slate-800"
              >
                Replay Sequence
              </button>
            </div>
          </div>
        )}

        {activeGame === "flexibility" && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="doodle-card max-w-md w-full p-6 bg-white text-center">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900 text-left">
                <div>
                  <div className="doodle-tag bg-doodle-purple text-white">Rule Switching</div>
                  <h2 className="text-xl font-black mt-1">Switch &amp; Stay Challenge</h2>
                </div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-900"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              <div className="my-4 p-3 rounded-2xl bg-purple-100 border-3 border-slate-900 shadow-doodle-sm">
                <div className="text-[10px] font-black uppercase text-purple-700">Active Matching Rule</div>
                <div className="text-2xl font-black text-slate-900">
                  MATCH BY {flexRules[currentRuleIndex]}!
                </div>
              </div>

              <div className="p-8 my-4 rounded-3xl bg-slate-50 border-3 border-slate-900 shadow-doodle-sm inline-block">
                <div className="text-5xl mb-2">
                  {flexTargetCard.shape === "CIRCLE" ? "●" : flexTargetCard.shape === "SQUARE" ? "■" : "▲"}
                </div>
                <div className="text-xs font-black uppercase" style={{ color: flexTargetCard.color === "BLUE" ? "#2563EB" : flexTargetCard.color === "RED" ? "#EF4444" : "#D97706" }}>
                  {flexTargetCard.color} {flexTargetCard.shape}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {flexRules[currentRuleIndex] === "COLOR" ? (
                  <>
                    <button onClick={() => handleFlexChoice("BLUE")} className="doodle-btn py-3 bg-doodle-blue text-white text-xs font-black">BLUE</button>
                    <button onClick={() => handleFlexChoice("RED")} className="doodle-btn py-3 bg-doodle-red text-white text-xs font-black">RED</button>
                    <button onClick={() => handleFlexChoice("YELLOW")} className="doodle-btn py-3 bg-doodle-yellow text-slate-900 text-xs font-black">YELLOW</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleFlexChoice("CIRCLE")} className="doodle-btn py-3 bg-slate-900 text-white text-xs font-black">CIRCLE</button>
                    <button onClick={() => handleFlexChoice("SQUARE")} className="doodle-btn py-3 bg-slate-900 text-white text-xs font-black">SQUARE</button>
                    <button onClick={() => handleFlexChoice("TRIANGLE")} className="doodle-btn py-3 bg-slate-900 text-white text-xs font-black">TRIANGLE</button>
                  </>
                )}
              </div>

              <div className="mt-4 text-[11px] font-bold text-slate-500">
                Round {flexRoundsDone + 1} of 6 • Notice how your mind adjusts when the rule flips!
              </div>
            </div>
          </div>
        )}

        {activeGame === "self_reliance" && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="doodle-card max-w-lg w-full p-6 bg-white">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
                <div>
                  <div className="doodle-tag bg-doodle-green text-slate-900">Self-Reliance Challenge</div>
                  <h2 className="text-xl font-black mt-1">The 5 Machines Riddle</h2>
                </div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-900"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              <div className="p-4 my-4 rounded-2xl bg-amber-50 border-2 border-slate-900 text-sm font-semibold text-slate-800 leading-relaxed">
                &ldquo;If it takes <strong>5 machines 5 minutes to make 5 widgets</strong>, how long would it take <strong>100 machines to make 100 widgets</strong>?&rdquo;
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border-2 border-slate-900 flex items-center justify-between text-xs font-black mb-4">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Clock3 size={15} />
                  Independent Solving Window:
                </span>
                {srTimer > 0 ? (
                  <span className="text-doodle-orange">{srTimer}s until hint unlock</span>
                ) : (
                  <span className="text-emerald-700 font-black">Hint Unlocked!</span>
                )}
              </div>

              {srTimer === 0 ? (
                <div className="mb-4">
                  {!srHintUsed ? (
                    <button
                      onClick={() => setSrHintUsed(true)}
                      className="doodle-btn px-3 py-1.5 bg-amber-200 text-xs font-black text-slate-900"
                    >
                      <Lightbulb size={14} className="mr-1" /> View Hint (Reduces XP slightly)
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-yellow-50 border-2 border-amber-400 text-xs text-amber-900 font-semibold">
                      Hint: Think about how long ONE single machine takes to create ONE single widget!
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs font-semibold text-slate-400 mb-4 italic">
                  💡 Practice self-reliance: write your reasoning on paper before looking for clues.
                </div>
              )}

              <div className="space-y-3">
                <input
                  type="text"
                  value={srUserAnswer}
                  onChange={(e) => setSrUserAnswer(e.target.value)}
                  placeholder="Enter minutes (e.g. 5 minutes)..."
                  className="w-full p-3 rounded-xl border-2 border-slate-900 text-sm font-bold outline-none focus:ring-2 focus:ring-doodle-green"
                />

                {srFeedback && (
                  <div className="p-3 rounded-xl bg-red-50 border-2 border-red-400 text-xs font-bold text-red-800 flex items-start gap-2">
                    <AlertCircle size={15} className="shrink-0 mt-0.5" />
                    <span>{srFeedback} (+15 XP awarded for persistent retry!)</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleSrSubmit}
                    className="doodle-btn flex-1 py-3 bg-doodle-green hover:bg-lime-400 text-slate-900 text-xs font-black"
                  >
                    Submit Answer (Attempt #{srAttempts + 1})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {postGameReflection && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="doodle-card max-w-lg w-full p-6 bg-white text-center">
              <div className="w-16 h-16 rounded-2xl bg-doodle-yellow border-3 border-slate-900 mx-auto flex items-center justify-center text-3xl shadow-doodle-sm mb-3">
                🎯
              </div>

              <div className="doodle-tag bg-emerald-100 text-emerald-800">
                Challenge Complete • {postGameReflection.score}% Score
              </div>

              <h2 className="text-2xl font-black mt-2 text-slate-900">
                +{postGameReflection.xp} XP Earned!
              </h2>

              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-slate-900 text-left my-4">
                <label className="text-xs font-black text-slate-800 block mb-1">
                  What did you notice about your concentration during this challenge?
                </label>
                <textarea
                  value={reflectionAnswer}
                  onChange={(e) => setReflectionAnswer(e.target.value)}
                  placeholder="e.g. I noticed I rushed at the start, but when I took a deep breath, my accuracy improved..."
                  className="w-full h-24 p-3 rounded-xl border-2 border-slate-900 text-xs font-medium outline-none bg-white"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (reflectionAnswer.trim()) {
                      addReflection("Time pressure & visual clutter", reflectionAnswer, "Breathe calmly before tapping", postGameReflection.gameName);
                    }
                    setPostGameReflection(null);
                    setActiveGame(null);
                  }}
                  className="doodle-btn flex-1 py-3 bg-doodle-yellow hover:bg-amber-300 text-slate-900 text-xs font-black"
                >
                  Save Reflection &amp; Return (+10 XP)
                </button>
                <button
                  onClick={() => {
                    setPostGameReflection(null);
                    setActiveGame(null);
                  }}
                  className="doodle-btn px-4 py-3 bg-slate-100 text-xs font-black text-slate-700"
                >
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
