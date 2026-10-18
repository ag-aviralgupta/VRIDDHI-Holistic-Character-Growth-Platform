"use client";

import React, { useState } from "react";
import AppShell from "@/components/AppShell";
import { useVriddhiStore } from "@/lib/store";
import { 
  HeartHandshake, 
  LockKeyhole, 
  MessageCircleQuestion, 
  Plus, 
  ThumbsUp, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Send,
  HelpCircle,
  Filter,
  Users,
  Award
} from "lucide-react";

interface SahaayAnswer {
  id: string;
  author: string;
  role: "Teacher" | "MitraAI" | "Student Peer" | "Senior Peer";
  text: string;
  verified: boolean;
  upvotes: number;
  hasUpvoted?: boolean;
}

interface SahaayItem {
  id: string;
  authorAlias: string;
  category: "Academic" | "Confidence" | "Concentration" | "Career" | "FearOfAsking";
  question: string;
  upvotes: number;
  hasUpvoted?: boolean;
  createdAt: string;
  answers: SahaayAnswer[];
}

const defaultSahaayFeed: SahaayItem[] = [
  {
    id: "sah-1",
    authorAlias: "Silent Falcon #204",
    category: "FearOfAsking",
    question: "I don't understand how recursion pauses execution on the stack, and everyone else seemed to nod when the teacher asked. Is it normal to feel completely blank?",
    upvotes: 16,
    createdAt: "3 hours ago",
    answers: [
      {
        id: "ans-1",
        author: "Mr. R. Sengupta (Computer Science)",
        role: "Teacher",
        text: "Dear student, at least 15 students in every batch feel blank at that exact moment! Think of it like stacking cafeteria trays: you cannot clean the bottom tray until the top ones are lifted off. Let's do a live tray demonstration in tomorrow's class.",
        verified: true,
        upvotes: 8
      },
      {
        id: "ans-2",
        author: "Aviral Gupta (Classmate)",
        role: "Student Peer",
        text: "Hey! What helped me was drawing a tree on paper with n = 3. Each function call pauses and waits for the one below it to finish before it can add its own number. Don't worry, you're not the only one!",
        verified: false,
        upvotes: 12
      },
      {
        id: "ans-3",
        author: "MitraAI Companion",
        role: "MitraAI",
        text: "Experiment: Trace a function with n = 3 on real paper using index cards. Physical cards make the invisible stack visible. You have nothing to fear in seeking clarity.",
        verified: true,
        upvotes: 5
      }
    ]
  },
  {
    id: "sah-2",
    authorAlias: "Curious Otter #312",
    category: "Confidence",
    question: "Whenever our maths teacher calls my name on the blackboard, my heart beats like crazy and my hands tremble even when I know the answer at my desk. How do I stop freezing?",
    upvotes: 24,
    createdAt: "Yesterday",
    answers: [
      {
        id: "ans-4",
        author: "Priya Nair (Peer Helper)",
        role: "Student Peer",
        text: "I used to have this exact problem! My trick is: take 3 seconds before picking up the chalk to look at the chalk itself, not the audience. Ground your feet. Your brain knows the formula, just let your hand write.",
        verified: false,
        upvotes: 14
      },
      {
        id: "ans-5",
        author: "MitraAI Companion",
        role: "MitraAI",
        text: "Swami Vivekananda taught: 'All power is within you.' The trembling is energy, not weakness. Try this micro-experiment: Before you touch the chalk, take one deep breath, feel both your feet grounded on the floor, and whisper: 'I am here to learn, not to prove.'",
        verified: true,
        upvotes: 9
      }
    ]
  }
];

export default function Sahaay() {
  const { awardXP, recordGrowthEvent, triggerConfetti, student } = useVriddhiStore();
  const [sahaayPosts, setSahaayPosts] = useState<SahaayItem[]>(defaultSahaayFeed);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SahaayItem["category"]>("FearOfAsking");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [showSuccess, setShowSuccess] = useState(false);

  const [answeringPostId, setAnsweringPostId] = useState<string | null>(null);
  const [peerAnswerText, setPeerAnswerText] = useState("");
  const [peerIsAnonymous, setPeerIsAnonymous] = useState(false);
  const [helpToast, setHelpToast] = useState(false);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const randomAliases = ["Courageous Sparrow #512", "Bright Lynx #841", "Quiet Oak #229", "Inquisitive Wolf #107"];
    const chosenAlias = randomAliases[Math.floor(Math.random() * randomAliases.length)];

    const newPost: SahaayItem = {
      id: `sah-${Date.now()}`,
      authorAlias: chosenAlias,
      category: selectedCategory,
      question: newQuestion,
      upvotes: 1,
      createdAt: "Just now",
      answers: [
        {
          id: `ans-${Date.now()}`,
          author: "MitraAI Companion",
          role: "MitraAI",
          text: "Thank you for asking without hesitation. Discussing this doubt openly unlocks clarity for your entire class. The mind expands when questions are voiced.",
          verified: true,
          upvotes: 1
        }
      ]
    };

    setSahaayPosts([newPost, ...sahaayPosts]);
    setNewQuestion("");
    setShowSuccess(true);
    awardXP(10, "Asked an anonymous question on Sahaay");
    recordGrowthEvent({
      eventType: "TASK_COMPLETED",
      principle: "Courage & Fearlessness",
      value: 2,
      description: "Overcame hesitation by asking a doubt on Sahaay"
    });
    triggerConfetti();
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleUpvoteQuestion = (id: string) => {
    setSahaayPosts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const up = !p.hasUpvoted;
          return { ...p, upvotes: up ? p.upvotes + 1 : p.upvotes - 1, hasUpvoted: up };
        }
        return p;
      })
    );
  };

  const handleUpvoteAnswer = (postId: string, answerId: string) => {
    setSahaayPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const updatedAnswers = post.answers.map(ans => {
            if (ans.id === answerId) {
              const up = !ans.hasUpvoted;
              return { ...ans, upvotes: up ? ans.upvotes + 1 : ans.upvotes - 1, hasUpvoted: up };
            }
            return ans;
          });
          return { ...post, answers: updatedAnswers };
        }
        return post;
      })
    );
  };

  const handleSendPeerHelp = (postId: string) => {
    if (!peerAnswerText.trim()) return;

    const helperName = peerIsAnonymous ? "Helpful Peer #772" : `${student.name} (Classmate)`;

    const newAnswer: SahaayAnswer = {
      id: `ans-${Date.now()}`,
      author: helperName,
      role: "Student Peer",
      text: peerAnswerText,
      verified: false,
      upvotes: 1
    };

    setSahaayPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            answers: [newAnswer, ...post.answers]
          };
        }
        return post;
      })
    );

    awardXP(25, "Helped a classmate solve a doubt on Sahaay");
    recordGrowthEvent({
      eventType: "SEVA_COMPLETED",
      principle: "Selfless Service",
      value: 4,
      description: `Offered peer help on Sahaay to solve a classmate's doubt`
    });

    setPeerAnswerText("");
    setAnsweringPostId(null);
    setHelpToast(true);
    triggerConfetti();
    setTimeout(() => setHelpToast(false), 4500);
  };

  const filteredPosts = filterCategory === "ALL" 
    ? sahaayPosts 
    : sahaayPosts.filter(p => p.category === filterCategory);

  return (
    <AppShell>
      <div className="space-y-6">

        <div className="doodle-card p-6 sm:p-7 bg-[#FFFDF7] border-3 border-slate-900 shadow-doodle flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="doodle-badge bg-purple-100 text-purple-950 border-2 border-slate-900 text-[11px] font-black uppercase tracking-wider shadow-doodle-sm">
              <HeartHandshake size={14} className="text-purple-700" /> Sahaay • Peer Help &amp; Anonymous Question Space
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Ask Without Hesitation. Grow Through Mutual Service.
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
              When you help another, you help yourself. Ask any classroom doubt with 100% anonymous safety, and offer selfless answers to help your classmates grow. Inspired by Swami Vivekananda&apos;s principles of Seva (Selfless Service) &amp; Abhaya (Fearlessness).
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-[#FFD12E] border-3 border-slate-900 text-slate-900 flex items-center justify-center text-3xl shadow-doodle-sm shrink-0 rotate-[-3deg]">
            🤝
          </div>
        </div>

        {helpToast && (
          <div className="doodle-card p-4 bg-emerald-100 border-3 border-slate-900 shadow-doodle flex items-center justify-between gap-3 text-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#70E000] border-2 border-slate-900 flex items-center justify-center text-lg font-black shadow-doodle-sm">
                🌱
              </div>
              <div>
                <div className="text-xs font-black">Selfless Service (Seva) Recorded!</div>
                <div className="text-[11px] font-bold text-slate-700">
                  Your answer was posted to your classmate. You earned <strong>+25 XP</strong> for Selfless Service!
                </div>
              </div>
            </div>
            <span className="doodle-tag bg-white text-slate-900 border border-slate-900 text-[10px] font-black">
              +25 XP
            </span>
          </div>
        )}

        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-6">

          <div className="doodle-card p-6 bg-white border-3 border-slate-900 shadow-doodle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LockKeyhole size={18} className="text-purple-600" />
                <h2 className="text-xl font-black text-slate-900">
                  Ask Anonymously
                </h2>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border-2 border-slate-900 text-xs font-bold text-slate-800 mb-5 flex items-center gap-2 shadow-doodle-sm">
                <ShieldCheck size={16} className="text-purple-700 shrink-0" />
                <span>Your real name and roll number are NEVER visible to peers.</span>
              </div>

              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                <div>
                  <label className="text-xs font-black text-slate-900 block mb-1">
                    Select Topic Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="w-full p-3 rounded-xl border-2 border-slate-900 text-xs font-black bg-slate-50 outline-none shadow-doodle-sm"
                  >
                    <option value="FearOfAsking">Fear of Asking in Front of Class</option>
                    <option value="Academic">Concept Doubt (Maths / Science / Code)</option>
                    <option value="Confidence">Exam Stress &amp; Self-Belief</option>
                    <option value="Concentration">Distraction &amp; Attention Trouble</option>
                    <option value="Career">Career &amp; Subject Stream Confusion</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-900 block mb-1">
                    Your Question / Doubt
                  </label>
                  <textarea
                    required
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="e.g. I freeze whenever the teacher calls on me at the blackboard, even when I know the formula. How do I stop trembling?..."
                    className="w-full h-32 p-3.5 rounded-xl border-2 border-slate-900 text-xs sm:text-sm font-bold outline-none bg-slate-50 shadow-doodle-sm focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="doodle-btn w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black border-2.5 border-slate-900 shadow-doodle flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Post Anonymously to Class (+10 XP)
                </button>

                {showSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-100 border-2 border-slate-900 text-xs font-black text-emerald-950 flex items-center gap-2 shadow-doodle-sm">
                    <CheckCircle2 size={16} className="text-emerald-700" />
                    <span>Question posted anonymously as a mystery animal!</span>
                  </div>
                )}
              </form>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-slate-200 text-[11px] font-bold text-slate-500">
              Swami Vivekananda: &ldquo;Stand up, be bold, be strong. Take the whole responsibility on your own shoulders.&rdquo;
            </div>
          </div>

          <div className="doodle-card p-6 bg-white border-3 border-slate-900 shadow-doodle flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="doodle-tag bg-sky-100 text-blue-900 border border-slate-900 text-[10px] font-black">
                    Class 10-A Feed
                  </div>
                  <h2 className="text-xl font-black mt-1 text-slate-900">
                    Community Doubts &amp; Peer Help
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {["ALL", "FearOfAsking", "Confidence", "Academic"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`text-[10px] font-black px-2 py-1 rounded-lg border-2 border-slate-900 transition ${
                        filterCategory === cat
                          ? "bg-slate-900 text-white shadow-doodle-sm"
                          : "bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {cat === "ALL" ? "All" : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1.5 scrollbar-thin">
                {filteredPosts.map(post => {
                  const isAnsweringThis = answeringPostId === post.id;

                  return (
                    <div
                      key={post.id}
                      className="p-4 sm:p-4.5 rounded-2xl bg-amber-50/40 border-2.5 border-slate-900 shadow-doodle-sm space-y-3"
                    >

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-amber-200 border-1.5 border-slate-900 flex items-center justify-center text-xs font-black shadow-[1px_1px_0px_#0F172A]">
                            🎭
                          </span>
                          <div>
                            <div className="text-xs font-black text-slate-900">
                              {post.authorAlias}
                            </div>
                            <div className="text-[10px] font-bold text-slate-500">{post.createdAt}</div>
                          </div>
                        </div>

                        <span className="doodle-tag bg-white text-slate-800 border border-slate-900 text-[10px] font-black">
                          #{post.category}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                        &ldquo;{post.question}&rdquo;
                      </p>

                      <div className="flex items-center gap-2 flex-wrap pt-1">
                        <button
                          onClick={() => handleUpvoteQuestion(post.id)}
                          className={`doodle-btn px-2.5 py-1 text-[11px] font-black flex items-center gap-1 border-2 border-slate-900 ${
                            post.hasUpvoted ? "bg-amber-300 text-slate-900 shadow-doodle-sm" : "bg-white text-slate-700 shadow-none hover:bg-slate-100"
                          }`}
                        >
                          <ThumbsUp size={12} />
                          <span>I also have this doubt ({post.upvotes})</span>
                        </button>

                        <button
                          onClick={() => {
                            if (isAnsweringThis) {
                              setAnsweringPostId(null);
                            } else {
                              setAnsweringPostId(post.id);
                              setPeerAnswerText("");
                            }
                          }}
                          className={`doodle-btn px-2.5 py-1 text-[11px] font-black flex items-center gap-1 border-2 border-slate-900 ${
                            isAnsweringThis ? "bg-slate-900 text-white" : "bg-[#FFD12E] hover:bg-yellow-300 text-slate-900 shadow-doodle-sm"
                          }`}
                        >
                          <HeartHandshake size={13} />
                          <span>{isAnsweringThis ? "Close Composer" : "Help Classmate 🤝"}</span>
                        </button>

                        <span className="text-[10px] font-extrabold text-slate-500 ml-auto">
                          {post.answers.length} {post.answers.length === 1 ? "response" : "responses"}
                        </span>
                      </div>

                      {isAnsweringThis && (
                        <div className="p-3.5 rounded-xl bg-white border-2 border-slate-900 space-y-2.5 shadow-doodle-sm mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-purple-900 flex items-center gap-1">
                              <Sparkles size={13} /> Offer Selfless Peer Help (Karma Yoga)
                            </span>
                            <span className="doodle-tag bg-emerald-100 text-emerald-950 border border-slate-900 text-[9px] font-black">
                              Earn +25 XP
                            </span>
                          </div>

                          <textarea
                            value={peerAnswerText}
                            onChange={(e) => setPeerAnswerText(e.target.value)}
                            placeholder="Write an encouraging explanation, analogy, or tip for your classmate..."
                            className="w-full h-20 p-2.5 rounded-lg border-2 border-slate-900 text-xs font-bold outline-none bg-slate-50 focus:bg-white"
                          />

                          <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={peerIsAnonymous}
                                onChange={(e) => setPeerIsAnonymous(e.target.checked)}
                                className="rounded border-slate-900 text-purple-600"
                              />
                              <span>Post anonymously</span>
                            </label>

                            <button
                              onClick={() => handleSendPeerHelp(post.id)}
                              disabled={!peerAnswerText.trim()}
                              className="doodle-btn px-3 py-1 bg-[#70E000] disabled:opacity-40 hover:bg-green-500 text-slate-900 text-xs font-black border-2 border-slate-900 shadow-doodle-sm flex items-center gap-1"
                            >
                              <Send size={12} /> Submit Answer (+25 XP)
                            </button>
                          </div>
                        </div>
                      )}

                      {post.answers.length > 0 && (
                        <div className="mt-3 pt-3 border-t-2 border-slate-200">
                          <div className="text-[10px] font-black uppercase text-slate-500 mb-2 flex items-center gap-1">
                            <Users size={12} /> Class Answers &amp; Guidance ({post.answers.length}):
                          </div>

                          <div className="max-h-56 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                            {post.answers.map((ans) => {
                              const isTeacher = ans.role === "Teacher";
                              const isMitra = ans.role === "MitraAI";
                              const isPeer = ans.role === "Student Peer";

                              return (
                                <div
                                  key={ans.id}
                                  className={`p-3 rounded-xl border-2 border-slate-900 text-xs text-slate-900 shadow-[2px_2px_0px_#0F172A] ${
                                    isTeacher
                                      ? "bg-emerald-50/90"
                                      : isMitra
                                      ? "bg-purple-50/90"
                                      : "bg-amber-50"
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2 mb-1.5">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      {ans.verified ? (
                                        <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                                      ) : (
                                        <Award size={13} className="text-amber-600 shrink-0" />
                                      )}
                                      <span className="font-black text-slate-900 text-xs">{ans.author}</span>
                                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded border border-slate-900 ${
                                        isTeacher
                                          ? "bg-emerald-200 text-emerald-950"
                                          : isMitra
                                          ? "bg-purple-200 text-purple-950"
                                          : "bg-amber-200 text-amber-950"
                                      }`}>
                                        {ans.role}
                                      </span>
                                    </div>

                                    <button
                                      onClick={() => handleUpvoteAnswer(post.id, ans.id)}
                                      className={`px-2 py-0.5 rounded-md text-[10px] font-black border border-slate-900 flex items-center gap-1 transition ${
                                        ans.hasUpvoted ? "bg-[#FFD12E] text-slate-900" : "bg-white text-slate-700 hover:bg-slate-100"
                                      }`}
                                    >
                                      👍 {ans.upvotes}
                                    </button>
                                  </div>

                                  <p className="text-slate-800 font-bold leading-relaxed whitespace-pre-line text-[11px] sm:text-xs">
                                    {ans.text}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
