"use client";

import React, { useState } from "react";
import Link from "next/link";
import DoodleLogo from "@/components/DoodleLogo";
import { useVriddhiStore } from "@/lib/store";
import { 
  Users, 
  BookOpenCheck, 
  TrendingUp, 
  ShieldCheck, 
  Download, 
  Sparkles, 
  Brain, 
  Flame, 
  Target, 
  CheckCircle2, 
  Printer, 
  FileText,
  Search,
  Save,
  Bot,
  Send,
  HelpCircle,
  Lightbulb
} from "lucide-react";

interface TeacherStudentRecord {
  id: string;
  name: string;
  rollNo: string;
  academicScore: number;
  principles: {
    concentration: { baseline: number; current: number; trend: string };
    courage: { baseline: number; current: number; trend: string };
    faith: { baseline: number; current: number; trend: string };
    purity: { baseline: number; current: number; trend: string };
    service: { baseline: number; current: number; trend: string };
    perseverance: { baseline: number; current: number; trend: string };
  };
  evidenceCount: number;
  reflectionRate: number;
  evidenceConfidence: "High" | "Moderate";
  teacherObservations: string;
  nitiGap: string;
  nitiIntervention: string;
}

const initialClassRoster: TeacherStudentRecord[] = [
  {
    id: "st-aviral",
    name: "Aviral Gupta",
    rollNo: "10A-01",
    academicScore: 88,
    principles: {
      concentration: { baseline: 48, current: 74, trend: "+14%" },
      courage: { baseline: 42, current: 71, trend: "+18%" },
      faith: { baseline: 50, current: 78, trend: "+12%" },
      purity: { baseline: 55, current: 80, trend: "+8%" },
      service: { baseline: 40, current: 76, trend: "+20%" },
      perseverance: { baseline: 46, current: 82, trend: "+16%" },
    },
    evidenceCount: 146,
    reflectionRate: 94,
    evidenceConfidence: "High",
    teacherObservations: "Aviral has shown remarkable progress in concentration and task persistence over the last 4 weeks. He used to seek hints within 40 seconds; he now works independently for 4+ minutes before asking. Recommend open-ended science investigation with flexible methods.",
    nitiGap: "Courage is improving (+18%), but public question-asking evidence is predominantly anonymous on Sahaay.",
    nitiIntervention: "Invite Aviral to be the opening speaker in a small 3-person peer study circle."
  },
  {
    id: "st-anurag",
    name: "Anurag Chaudhary",
    rollNo: "10A-02",
    academicScore: 82,
    principles: {
      concentration: { baseline: 52, current: 80, trend: "+15%" },
      courage: { baseline: 54, current: 48, trend: "-6%" },
      faith: { baseline: 48, current: 74, trend: "+11%" },
      purity: { baseline: 58, current: 82, trend: "+10%" },
      service: { baseline: 45, current: 79, trend: "+18%" },
      perseverance: { baseline: 50, current: 77, trend: "+12%" },
    },
    evidenceCount: 135,
    reflectionRate: 90,
    evidenceConfidence: "High",
    teacherObservations: "Steady progress in classroom concentration, but Anurag exhibits a recent dip in vocal courage (-6%). He hesitates to present conclusions to the class after receiving critical peer feedback during a project presentation.",
    nitiGap: "Intellectual concentration is solid, but Courage & Fearlessness dropped (-6%) with noticeable presentation avoidance and silence during whole-class inquiries.",
    nitiIntervention: "Design a paired presentation where Anurag co-explains a single experiment step with a close friend, rebuilding confidence before independent public speaking."
  },
  {
    id: "st-mayank",
    name: "Mayank Jha",
    rollNo: "10A-03",
    academicScore: 79,
    principles: {
      concentration: { baseline: 44, current: 69, trend: "+13%" },
      courage: { baseline: 52, current: 76, trend: "+12%" },
      faith: { baseline: 46, current: 72, trend: "+14%" },
      purity: { baseline: 50, current: 75, trend: "+11%" },
      service: { baseline: 42, current: 71, trend: "+15%" },
      perseverance: { baseline: 40, current: 84, trend: "+24%" },
    },
    evidenceCount: 152,
    reflectionRate: 92,
    evidenceConfidence: "High",
    teacherObservations: "Mayank exhibits the highest retry rate in mathematics after initial incorrect answers (+24% perseverance). Academic exam marks are beginning to reflect his grit.",
    nitiGap: "Exceptional grit during single-focus problems, but attention wanders during multi-stage instructions.",
    nitiIntervention: "Introduce structured 10-minute micro-intervals with written checklists to channel his high perseverance."
  },
  {
    id: "st-akshat",
    name: "Akshat Garg",
    rollNo: "10A-04",
    academicScore: 74,
    principles: {
      concentration: { baseline: 56, current: 49, trend: "-7%" },
      courage: { baseline: 46, current: 73, trend: "+15%" },
      faith: { baseline: 54, current: 48, trend: "-6%" },
      purity: { baseline: 54, current: 74, trend: "+8%" },
      service: { baseline: 48, current: 82, trend: "+22%" },
      perseverance: { baseline: 44, current: 71, trend: "+13%" },
    },
    evidenceCount: 122,
    reflectionRate: 86,
    evidenceConfidence: "Moderate",
    teacherObservations: "Outstanding dedication to classroom community duties and helping peers (+22% service). However, Akshat shows a noticeable dip in individual concentration (-7%) and self-confidence (-6%) during theoretical physics and algebra modules.",
    nitiGap: "Strong peer service (+22%), but Concentration (-7%) and Self-Confidence (-6%) declined due to test anxiety and difficulty maintaining focus through multi-step algebra drills.",
    nitiIntervention: "Anchor theoretical problems in Akshat's proven hands-on lab strengths. Introduce 10-minute focused chunking with positive reinforcement on intermediate steps."
  },
  {
    id: "st-akansha",
    name: "Akansha Mishra",
    rollNo: "10A-05",
    academicScore: 92,
    principles: {
      concentration: { baseline: 60, current: 88, trend: "+12%" },
      courage: { baseline: 50, current: 74, trend: "+10%" },
      faith: { baseline: 62, current: 86, trend: "+11%" },
      purity: { baseline: 60, current: 84, trend: "+9%" },
      service: { baseline: 52, current: 78, trend: "+12%" },
      perseverance: { baseline: 58, current: 80, trend: "+9%" },
    },
    evidenceCount: 168,
    reflectionRate: 96,
    evidenceConfidence: "High",
    teacherObservations: "Exemplary concentration and academic rigor. However, exhibits acute self-imposed stress whenever a challenge problem is intentionally open-ended.",
    nitiGap: "High academic accuracy, but low tolerance for initial failure on open-ended creative puzzles.",
    nitiIntervention: "Provide intentionally playful unsolvable riddles in pairs to normalize failure as a scientific exploration step."
  }
];

export default function Teacher() {
  const { triggerConfetti } = useVriddhiStore();
  const [roster, setRoster] = useState<TeacherStudentRecord[]>(initialClassRoster);
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudentRecord>(initialClassRoster[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHolisticReportModal, setShowHolisticReportModal] = useState(false);
  const [editingNotes, setEditingNotes] = useState(initialClassRoster[0].teacherObservations);
  const [saveToast, setSaveToast] = useState(false);

  const [nitiChat, setNitiChat] = useState<{ id: string; sender: "teacher" | "niti"; text: string; timestamp: string }[]>([
    {
      id: "niti-1",
      sender: "niti",
      text: "Namaste Ms. Anjali Verma! I am NitiAI (नीति AI), your pedagogical strategy and character development advisor. Based on Swami Vivekananda's philosophy of education, I analyze observable student signals across concentration, perseverance, and courage to suggest school-appropriate interventions. How can I assist you with Class 10-A today?",
      timestamp: "Just now"
    }
  ]);
  const [nitiQuery, setNitiQuery] = useState("");
  const [nitiLoading, setNitiLoading] = useState(false);

  const filteredRoster = roster.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStudent = (st: TeacherStudentRecord) => {
    setSelectedStudent(st);
    setEditingNotes(st.teacherObservations);
  };

  const handleSaveObservation = () => {
    setRoster(prev =>
      prev.map(s => (s.id === selectedStudent.id ? { ...s, teacherObservations: editingNotes } : s))
    );
    setSelectedStudent(prev => ({ ...prev, teacherObservations: editingNotes }));
    setSaveToast(true);
    triggerConfetti();
    setTimeout(() => setSaveToast(false), 3000);
  };

  const renderTrendSpan = (trend: string) => {
    const isNeg = trend.startsWith("-");
    return (
      <span className={isNeg ? "text-rose-600 font-black inline-flex items-center gap-0.5" : "text-emerald-700 font-black inline-flex items-center gap-0.5"}>
        {isNeg ? "↓" : "↑"} {trend}
      </span>
    );
  };

  const renderDeltaSpan = (current: number, baseline: number) => {
    const delta = current - baseline;
    const isNeg = delta < 0;
    return (
      <span className={isNeg ? "text-rose-600 font-black" : "text-emerald-800 font-black"}>
        {isNeg ? `${delta} pts` : `+${delta} pts`}
      </span>
    );
  };

  const handleSendNitiMessage = async (customText?: string) => {
    const textToSend = customText || nitiQuery;
    if (!textToSend.trim() || nitiLoading) return;

    const teacherMsg = {
      id: `teacher-${Date.now()}`,
      sender: "teacher" as const,
      text: textToSend,
      timestamp: "Just now"
    };

    setNitiChat(prev => [...prev, teacherMsg]);
    setNitiQuery("");
    setNitiLoading(true);

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `Educator Inquiry for student ${selectedStudent.name} (Class 10-A, Academic: ${selectedStudent.academicScore}%): ${textToSend}`,
          studentContext: {
            name: selectedStudent.name,
            grade: "Class 10-A",
            role: "educator",
            principles: selectedStudent.principles
          },
          conversationHistory: nitiChat
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          const nitiReply = {
            id: `niti-${Date.now()}`,
            sender: "niti" as const,
            text: data.text,
            timestamp: "Just now"
          };
          setNitiChat(prev => [...prev, nitiReply]);
          setNitiLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("NitiAI error:", e);
    }

    const fallbackReply = {
      id: `niti-${Date.now()}`,
      sender: "niti" as const,
      text: `Based on Swami Vivekananda's principle: "Education is the manifestation of the perfection already in man." For ${selectedStudent.name}, focus on scaffolded micro-challenges. Pair 10-minute focus sprints with verbal encouragement on independent effort.`,
      timestamp: "Just now"
    };
    setNitiChat(prev => [...prev, fallbackReply]);
    setNitiLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-slate-900">

      <header className="border-b-3 border-slate-900 bg-white sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <DoodleLogo size="md" href="/" />
          <span className="hidden sm:inline-block doodle-tag bg-purple-200 text-purple-950 border border-slate-900 text-[10px] font-black uppercase">
            Educator Portal • Class 10-A
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHolisticReportModal(true)}
            className="doodle-btn px-3.5 py-1.5 bg-[#FFD12E] text-slate-900 text-xs font-black border-2 border-slate-900 shadow-doodle-sm flex items-center gap-1.5"
          >
            <FileText size={14} /> Generate Holistic Report
          </button>

          <div className="flex items-center gap-2 pl-2 border-l-2 border-slate-300">
            <div className="w-8 h-8 rounded-xl bg-purple-200 border-2 border-slate-900 flex items-center justify-center font-black text-xs text-purple-950 shadow-[1px_1px_0px_#0F172A]">
              AV
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-black text-slate-900 leading-none">Ms. Anjali Verma</div>
              <div className="text-[10px] font-bold text-slate-500">Class Educator</div>
            </div>
            <Link
              href="/login"
              className="text-[11px] font-black text-slate-600 hover:text-slate-900 ml-2 underline"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-6">

        <div className="doodle-card p-6 sm:p-7 bg-white border-3 border-slate-900 shadow-doodle flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="doodle-badge bg-purple-100 text-slate-900 border-2 border-slate-900 text-[11px] font-black uppercase tracking-wider">
              <Users size={13} /> Class 10-A Educator Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Teacher Growth Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-bold">
              Observing concentration, courage, faith, purity, service, and perseverance alongside academic outcomes.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowHolisticReportModal(true)}
              className="doodle-btn px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black border-2.5 border-slate-900 shadow-doodle flex items-center gap-2"
            >
              <FileText size={15} /> Generate Teacher Holistic Report
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="doodle-card p-4 border-3 border-slate-900 shadow-doodle-sm bg-white">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] font-black uppercase tracking-wider">Active Students</span>
              <Users size={16} className="text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">5</div>
            <div className="text-[11px] text-slate-600 font-bold mt-0.5">Aviral, Anurag, Mayank, Akshat, Akansha</div>
          </div>

          <div className="doodle-card p-4 border-3 border-slate-900 shadow-doodle-sm bg-white">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] font-black uppercase tracking-wider">Academic Average</span>
              <BookOpenCheck size={16} className="text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">83%</div>
            <div className="text-[11px] text-emerald-700 font-black mt-0.5">↑ 4% this term</div>
          </div>

          <div className="doodle-card p-4 border-3 border-slate-900 shadow-doodle-sm bg-white">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] font-black uppercase tracking-wider">Concentration Trend</span>
              <Brain size={16} className="text-blue-600" />
            </div>
            <div className="text-2xl font-black text-blue-700 mt-1">↑ 14%</div>
            <div className="text-[11px] text-slate-600 font-bold mt-0.5">Primary focus area growth</div>
          </div>

          <div className="doodle-card p-4 border-3 border-slate-900 shadow-doodle-sm bg-white">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] font-black uppercase tracking-wider">Perseverance Leap</span>
              <Flame size={16} className="text-orange-600" />
            </div>
            <div className="text-2xl font-black text-orange-700 mt-1">↑ 16%</div>
            <div className="text-[11px] text-slate-600 font-bold mt-0.5">Retry rate after failure</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">

          <div className="doodle-card p-5 bg-white border-3 border-slate-900 shadow-doodle space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Student Roster</h3>
                <p className="text-xs text-slate-500 font-bold">{filteredRoster.length} students enrolled</p>
              </div>

              <div className="relative w-44">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name/roll..."
                  className="w-full pl-7 pr-2.5 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-bold outline-none bg-slate-50 focus:bg-white shadow-doodle-sm"
                />
                <Search size={13} className="absolute left-2 top-2.5 text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              {filteredRoster.map(st => {
                const isSelected = selectedStudent.id === st.id;

                return (
                  <div
                    key={st.id}
                    onClick={() => handleSelectStudent(st)}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#FFD12E] border-slate-900 shadow-doodle-sm font-black"
                        : "bg-white border-slate-300 hover:border-slate-900 hover:bg-slate-50 text-slate-700 font-bold"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-black text-slate-900 leading-tight">
                          {st.name}
                        </div>
                        <div className="text-[10px] text-slate-600 font-bold">
                          Roll: {st.rollNo} • Academics: {st.academicScore}%
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-[11px] font-black ${st.principles.concentration.trend.startsWith("-") ? "text-rose-600" : "text-emerald-800"}`}>
                          Focus: {st.principles.concentration.current}% {st.principles.concentration.trend.startsWith("-") ? "(↓)" : ""}
                        </span>
                        <div className="text-[10px] text-slate-600 font-bold">
                          {st.evidenceCount} evidences
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border-2.5 border-slate-900 shadow-doodle-sm space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-black">
                    🧠
                  </span>
                  <span className="text-xs font-black text-purple-950 uppercase">
                    NitiAI • Character Pedagogy Advisor
                  </span>
                </div>
                <span className="doodle-tag bg-white text-purple-900 border border-slate-900 text-[9px] font-black">
                  Vivekananda Model
                </span>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 text-xs pr-1 scrollbar-thin">
                {nitiChat.map((m) => (
                  <div
                    key={m.id}
                    className={`p-2.5 rounded-xl border-1.5 border-slate-900 ${
                      m.sender === "teacher"
                        ? "bg-white text-slate-900 ml-4 font-bold"
                        : "bg-purple-100/90 text-purple-950 mr-2 font-medium"
                    }`}
                  >
                    <div className="text-[9px] font-black uppercase text-slate-500 mb-0.5">
                      {m.sender === "teacher" ? "You (Ms. Anjali Verma)" : "NitiAI Pedagogical Advisor"}
                    </div>
                    <p className="leading-relaxed whitespace-pre-line text-[11px]">{m.text}</p>
                  </div>
                ))}
                {nitiLoading && (
                  <div className="p-2 rounded-lg bg-purple-100 text-[11px] font-black text-purple-800 animate-pulse">
                    NitiAI is formulating pedagogical strategy...
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {[
                  `Focus strategy for ${selectedStudent.name.split(" ")[0]}`,
                  `Classroom Seva plan for Class 10-A`,
                  `Perseverance booster idea`
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendNitiMessage(prompt)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white hover:bg-yellow-100 border border-slate-900 text-slate-800"
                  >
                    ⚡ {prompt}
                  </button>
                ))}
              </div>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={nitiQuery}
                  onChange={(e) => setNitiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendNitiMessage()}
                  placeholder={`Consult NitiAI about ${selectedStudent.name}...`}
                  className="flex-1 p-2 rounded-xl border-1.5 border-slate-900 text-xs font-bold outline-none bg-white"
                />
                <button
                  onClick={() => handleSendNitiMessage()}
                  disabled={nitiLoading || !nitiQuery.trim()}
                  className="doodle-btn px-3 py-1 bg-purple-600 text-white text-xs font-black border-2 border-slate-900 shadow-doodle-sm"
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="doodle-card p-5 bg-white border-3 border-slate-900 shadow-doodle space-y-5">

            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
              <div>
                <span className="doodle-badge bg-blue-100 text-slate-900 border border-slate-900 text-[10px] font-black uppercase">
                  Class 10-A • Student Profile
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  {selectedStudent.name}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-600 font-bold mt-1">
                  <span>Roll: {selectedStudent.rollNo}</span>
                  <span>•</span>
                  <span>Exam Average: {selectedStudent.academicScore}%</span>
                  <span>•</span>
                  <span className="text-emerald-700">{selectedStudent.reflectionRate}% Reflection Depth</span>
                </div>
              </div>

              <button
                onClick={() => setShowHolisticReportModal(true)}
                className="doodle-btn px-3 py-2 bg-slate-900 text-white text-xs font-black border-2 border-slate-900 shadow-doodle-sm flex items-center gap-1.5"
              >
                <Printer size={13} /> Full Report
              </button>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase text-slate-700 mb-2">
                Six Principles Baseline vs Current Progress
              </h3>

              <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs shadow-doodle-sm">
                <table className="w-full text-left">
                  <thead className="bg-[#FFD12E] font-black text-slate-900 text-[11px] border-b-2 border-slate-900">
                    <tr>
                      <th className="p-2.5">Principle</th>
                      <th className="p-2.5">Baseline</th>
                      <th className="p-2.5">Current</th>
                      <th className="p-2.5">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-200 font-bold text-slate-800 bg-white">
                    <tr className="bg-blue-50/70">
                      <td className="p-2.5 font-black text-blue-900">1. Concentration (Primary Anchor)</td>
                      <td className="p-2.5">{selectedStudent.principles.concentration.baseline}</td>
                      <td className="p-2.5 font-black text-blue-800">{selectedStudent.principles.concentration.current}</td>
                      <td className="p-2.5">{renderTrendSpan(selectedStudent.principles.concentration.trend)}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">2. Courage &amp; Fearlessness</td>
                      <td className="p-2.5">{selectedStudent.principles.courage.baseline}</td>
                      <td className="p-2.5 font-black">{selectedStudent.principles.courage.current}</td>
                      <td className="p-2.5">{renderTrendSpan(selectedStudent.principles.courage.trend)}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">3. Self-Confidence &amp; Faith</td>
                      <td className="p-2.5">{selectedStudent.principles.faith.baseline}</td>
                      <td className="p-2.5 font-black">{selectedStudent.principles.faith.current}</td>
                      <td className="p-2.5">{renderTrendSpan(selectedStudent.principles.faith.trend)}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">4. Purity of Mind &amp; Heart</td>
                      <td className="p-2.5">{selectedStudent.principles.purity.baseline}</td>
                      <td className="p-2.5 font-black">{selectedStudent.principles.purity.current}</td>
                      <td className="p-2.5">{renderTrendSpan(selectedStudent.principles.purity.trend)}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">5. Selfless Service</td>
                      <td className="p-2.5">{selectedStudent.principles.service.baseline}</td>
                      <td className="p-2.5 font-black">{selectedStudent.principles.service.current}</td>
                      <td className="p-2.5">{renderTrendSpan(selectedStudent.principles.service.trend)}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">6. Perseverance &amp; Hard Work</td>
                      <td className="p-2.5">{selectedStudent.principles.perseverance.baseline}</td>
                      <td className="p-2.5 font-black">{selectedStudent.principles.perseverance.current}</td>
                      <td className="p-2.5">{renderTrendSpan(selectedStudent.principles.perseverance.trend)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-xl border-2 border-slate-900 bg-purple-50 space-y-2 shadow-doodle-sm">
              <div className="flex items-center gap-1.5 text-xs font-black text-purple-950">
                <Bot size={15} />
                NitiAI Automated Gap Analysis &amp; Pedagogical Intervention Recommendation
              </div>
              <p className="text-xs font-bold text-slate-800 leading-relaxed">
                <strong>Gap Detected:</strong> {selectedStudent.nitiGap}
              </p>
              <div className="p-2.5 rounded-lg bg-white border-2 border-slate-900 text-xs font-bold text-purple-950 flex items-center justify-between gap-2 shadow-[1px_1px_0px_#0F172A]">
                <span><strong>Suggested Action:</strong> {selectedStudent.nitiIntervention}</span>
                <button
                  onClick={() => triggerConfetti()}
                  className="doodle-btn px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black border border-slate-900 shrink-0"
                >
                  Approve Quest
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900">
                  Teacher Contextual Observations (Private to Educator)
                </label>
                {saveToast && (
                  <span className="text-[11px] font-black text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 size={13} /> Notes saved!
                  </span>
                )}
              </div>
              <textarea
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border-2 border-slate-900 text-xs font-bold outline-none bg-slate-50 focus:bg-white shadow-doodle-sm"
              />
              <button
                onClick={handleSaveObservation}
                className="doodle-btn px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black border-2 border-slate-900 shadow-doodle-sm flex items-center gap-1.5"
              >
                <Save size={13} /> Save Educator Observation
              </button>
            </div>
          </div>
        </div>

        {showHolisticReportModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full bg-white rounded-3xl border-3 border-slate-900 p-6 sm:p-8 shadow-doodle-xl max-h-[92vh] overflow-y-auto space-y-6 text-left">

              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div>
                  <span className="doodle-tag bg-slate-900 text-white border border-slate-900 text-[10px] font-black uppercase tracking-wider">
                    CONFIDENTIAL • TEACHER-ONLY HOLISTIC REPORT
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    VRIDDHI Character &amp; Academic Development Synthesis
                  </h3>
                  <p className="text-xs text-slate-600 font-bold">
                    Student: {selectedStudent.name} • Class 10-A • Roll: {selectedStudent.rollNo}
                  </p>
                </div>
                <button
                  onClick={() => setShowHolisticReportModal(false)}
                  className="w-8 h-8 rounded-xl bg-slate-100 border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 shadow-doodle-sm"
                >
                  ✕
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-slate-900 text-xs text-slate-800 font-bold flex items-start gap-2 shadow-doodle-sm">
                <ShieldCheck size={18} className="text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Critical Product Boundary:</strong> This synthesis is accessible only to authorized educators and mentors. Students receive supportive habit challenges without access to cumulative character evaluations.
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-doodle-sm">
                  <span className="text-[10px] font-black text-slate-500 uppercase">Academic Exam Score</span>
                  <div className="text-xl font-black text-slate-900 mt-0.5">{selectedStudent.academicScore}%</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-doodle-sm">
                  <span className="text-[10px] font-black text-slate-500 uppercase">Evidence Volume</span>
                  <div className="text-xl font-black text-slate-900 mt-0.5">{selectedStudent.evidenceCount} Events</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-doodle-sm">
                  <span className="text-[10px] font-black text-slate-500 uppercase">Reflection Participation</span>
                  <div className="text-xl font-black text-emerald-800 mt-0.5">{selectedStudent.reflectionRate}%</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-slate-800 mb-2">
                  1. Six Principles Longitudinal Trajectory
                </h4>

                <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs shadow-doodle-sm">
                  <table className="w-full text-left">
                    <thead className="bg-[#FFD12E] font-black text-slate-900 text-[11px] border-b-2 border-slate-900">
                      <tr>
                        <th className="p-2.5">Principle Area</th>
                        <th className="p-2.5">Baseline</th>
                        <th className="p-2.5">Current Level</th>
                        <th className="p-2.5">Net Delta</th>
                        <th className="p-2.5">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-200 font-bold text-slate-800 bg-white">
                      <tr className="bg-blue-50/70">
                        <td className="p-2.5 font-black text-blue-900">Concentration (Primary Focus)</td>
                        <td className="p-2.5">{selectedStudent.principles.concentration.baseline}</td>
                        <td className="p-2.5 font-black">{selectedStudent.principles.concentration.current}</td>
                        <td className="p-2.5 font-black">{renderDeltaSpan(selectedStudent.principles.concentration.current, selectedStudent.principles.concentration.baseline)}</td>
                        <td className="p-2.5 font-black">{renderTrendSpan(selectedStudent.principles.concentration.trend)}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">Courage &amp; Fearlessness</td>
                        <td className="p-2.5">{selectedStudent.principles.courage.baseline}</td>
                        <td className="p-2.5 font-black">{selectedStudent.principles.courage.current}</td>
                        <td className="p-2.5 font-black">{renderDeltaSpan(selectedStudent.principles.courage.current, selectedStudent.principles.courage.baseline)}</td>
                        <td className="p-2.5 font-black">{renderTrendSpan(selectedStudent.principles.courage.trend)}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">Self-Confidence &amp; Faith</td>
                        <td className="p-2.5">{selectedStudent.principles.faith.baseline}</td>
                        <td className="p-2.5 font-black">{selectedStudent.principles.faith.current}</td>
                        <td className="p-2.5 font-black">{renderDeltaSpan(selectedStudent.principles.faith.current, selectedStudent.principles.faith.baseline)}</td>
                        <td className="p-2.5 font-black">{renderTrendSpan(selectedStudent.principles.faith.trend)}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">Purity of Mind &amp; Heart</td>
                        <td className="p-2.5">{selectedStudent.principles.purity.baseline}</td>
                        <td className="p-2.5 font-black">{selectedStudent.principles.purity.current}</td>
                        <td className="p-2.5 font-black">{renderDeltaSpan(selectedStudent.principles.purity.current, selectedStudent.principles.purity.baseline)}</td>
                        <td className="p-2.5 font-black">{renderTrendSpan(selectedStudent.principles.purity.trend)}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">Selfless Service</td>
                        <td className="p-2.5">{selectedStudent.principles.service.baseline}</td>
                        <td className="p-2.5 font-black">{selectedStudent.principles.service.current}</td>
                        <td className="p-2.5 font-black">{renderDeltaSpan(selectedStudent.principles.service.current, selectedStudent.principles.service.baseline)}</td>
                        <td className="p-2.5 font-black">{renderTrendSpan(selectedStudent.principles.service.trend)}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">Perseverance &amp; Hard Work</td>
                        <td className="p-2.5">{selectedStudent.principles.perseverance.baseline}</td>
                        <td className="p-2.5 font-black">{selectedStudent.principles.perseverance.current}</td>
                        <td className="p-2.5 font-black">{renderDeltaSpan(selectedStudent.principles.perseverance.current, selectedStudent.principles.perseverance.baseline)}</td>
                        <td className="p-2.5 font-black">{renderTrendSpan(selectedStudent.principles.perseverance.trend)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 text-xs space-y-1 shadow-doodle-sm">
                <span className="font-black text-slate-900 uppercase text-[10px]">2. Educator Qualitative Observations</span>
                <p className="text-slate-800 leading-relaxed font-bold">
                  &ldquo;{selectedStudent.teacherObservations}&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border-2 border-slate-900 text-xs space-y-1 shadow-doodle-sm">
                <span className="font-black text-purple-950 uppercase text-[10px] flex items-center gap-1">
                  <Bot size={13} /> 3. NitiAI Recommended Pedagogical Steps
                </span>
                <p className="text-slate-800 leading-relaxed font-bold">
                  <strong>Intervention:</strong> {selectedStudent.nitiIntervention}
                </p>
                <p className="text-[11px] text-purple-900 font-black italic">
                  Confidence Coverage: High ({selectedStudent.evidenceCount} logged activity traces across 4 weeks).
                </p>
              </div>

              <div className="pt-3 border-t-2 border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-bold">
                  Official Record • Kendriya Vidyalaya
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="doodle-btn px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black border-2 border-slate-900 shadow-doodle-sm flex items-center gap-1.5"
                  >
                    <Printer size={14} /> Print / Save PDF
                  </button>
                  <button
                    onClick={() => setShowHolisticReportModal(false)}
                    className="doodle-btn px-4 py-2 bg-white text-slate-800 text-xs font-black border-2 border-slate-900 shadow-doodle-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
