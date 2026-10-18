"use client";

import React, { createContext, useContext, useState } from "react";
import confetti from "canvas-confetti";
import { retrievePrinciples, VivekanandaPrinciple, VIVEKANANDA_KNOWLEDGE_BASE } from "./vivekananda-rag";

export interface PrincipleData {
  id: string;
  name: "Concentration" | "Courage & Fearlessness" | "Self-Confidence & Faith" | "Purity of Mind & Heart" | "Selfless Service" | "Perseverance & Hard Work";
  isPrimary?: boolean;
  baselineScore: number;
  currentScore: number;
  currentLevel: string;
  prevWeekScore: number;
  prevMonthScore: number;
  trend: string;
  trendPositive: boolean;
  evidenceCount: number;
  recentActivities: string[];
  reflectionSnippet: string;
  recommendedNextAction: string;
  color: string;
  badgeBg: string;
  mascotName: string;
}

export interface GrowthEvent {
  id: string;
  timestamp: string;
  eventType: 
    | "TASK_STARTED" 
    | "TASK_COMPLETED" 
    | "TASK_RETRIED" 
    | "HINT_USED" 
    | "INDEPENDENT_ATTEMPT" 
    | "REFLECTION_COMPLETED" 
    | "QUEST_COMPLETED" 
    | "QUIZ_COMPLETED"
    | "INTEREST_ACTIVITY_COMPLETED" 
    | "SEVA_COMPLETED";
  principle?: string;
  dimension?: string;
  value: number;
  description: string;
  metadata?: Record<string, any>;
  synced: boolean;
}

export interface ActivityTask {
  id: string;
  title: string;
  type: "TASK" | "QUIZ" | "INTEREST";
  principle: PrincipleData["name"];
  duration: string;
  xpReward: number;
  difficulty: "Beginner" | "Intermediate" | "Challenging";
  description: string;
  scenarioQuestion?: string;
  scenarioOptions?: { text: string; signal: string; score: number }[];
  completed: boolean;
}

export interface QuestDay {
  day: number;
  title: string;
  subtitle: string;
  principle: string;
  xp: number;
  status: "completed" | "active" | "locked";
  challengeType: "focus" | "memory" | "flexibility" | "sprint" | "seva";
}

export interface ReflectionEntry {
  id: string;
  week: string;
  date: string;
  activityTitle: string;
  principle: string;
  challengedYou: string;
  learnedAboutSelf: string;
  tryDifferently: string;
  aiInsight: string;
}

export interface MitraAIRecommendation {
  id: string;
  studentId: string;
  targetPrinciple: string;
  gapIdentified: string;
  suggestedIntervention: string;
  reasoning: string;
  status: "Pending Teacher Review" | "Approved" | "In Progress";
  timestamp: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  rollNo: string;
  grade: string;
  school: string;
  academicScore: number;
  levelNumber: number;
  levelName: string;
  totalXP: number;
  nextLevelXP: number;
  streakDays: number;
  growthMirror: {
    whereIAm: string[];
    whereICanGrowNext: string[];
  };
  teacherObservations: string;
}

interface VriddhiStoreContextType {

  currentRole: "STUDENT" | "TEACHER";
  setCurrentRole: (role: "STUDENT" | "TEACHER") => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;

  principles: Record<string, PrincipleData>;
  updatePrincipleScore: (name: string, delta: number, activityName: string) => void;

  activities: ActivityTask[];
  completeActivity: (id: string, customReflection?: string) => void;

  growthEvents: GrowthEvent[];
  offlineQueue: GrowthEvent[];
  isOfflineSimulated: boolean;
  toggleOfflineMode: () => void;
  syncOfflineQueue: () => void;
  recordGrowthEvent: (event: Omit<GrowthEvent, "id" | "timestamp" | "synced">) => void;

  weeklyQuest: {
    title: string;
    theme: string;
    weekNumber: number;
    principle: string;
    days: QuestDay[];
  };
  completeQuestDay: (dayIndex: number) => void;

  reflections: ReflectionEntry[];
  addReflection: (challenged: string, learned: string, differently: string, activityName?: string, principleName?: string) => void;

  mitraChat: { id: string; sender: "user" | "mitra"; text: string; principle?: VivekanandaPrinciple; experiment?: string; timestamp: string }[];
  sendMessageToMitra: (text: string) => void;
  teacherRecommendations: MitraAIRecommendation[];
  approveRecommendation: (id: string) => void;

  updateTeacherObservation: (notes: string) => void;

  awardXP: (amount: number, reason: string) => void;
  triggerConfetti: () => void;

  hasCompletedBaseline: boolean;
  submitBaselineAssessment: (scores: Record<string, number>) => void;
}

const VriddhiStoreContext = createContext<VriddhiStoreContextType | null>(null);

const INITIAL_PRINCIPLES: Record<string, PrincipleData> = {
  Concentration: {
    id: "prin-conc",
    name: "Concentration",
    isPrimary: true,
    baselineScore: 48,
    currentScore: 74,
    currentLevel: "Level 4 · Focused Practitioner",
    prevWeekScore: 70,
    prevMonthScore: 55,
    trend: "+14%",
    trendPositive: true,
    evidenceCount: 28,
    recentActivities: ["15-min Deep Focus Grid", "Memory Lantern 4-stage", "Breath anchor sprint"],
    reflectionSnippet: "When I paused for 2 seconds before tapping, my distraction count dropped to zero.",
    recommendedNextAction: "Practice a 15-minute distraction-free study sprint during daily homework.",
    color: "#2563EB",
    badgeBg: "bg-blue-100 text-blue-800 border-blue-400",
    mascotName: "Dhyan"
  },
  "Courage & Fearlessness": {
    id: "prin-courage",
    name: "Courage & Fearlessness",
    baselineScore: 42,
    currentScore: 71,
    currentLevel: "Level 3 · Emerging Courage",
    prevWeekScore: 66,
    prevMonthScore: 50,
    trend: "+18%",
    trendPositive: true,
    evidenceCount: 19,
    recentActivities: ["Blackboard math question attempt", "Shared unasked doubt on Sahaay", "Spoke first in group discussion"],
    reflectionSnippet: "My hands were shaking before I stood up, but after speaking the fear disappeared completely.",
    recommendedNextAction: "Volunteer to present one science concept outline in tomorrow's class.",
    color: "#EF4444",
    badgeBg: "bg-red-100 text-red-800 border-red-400",
    mascotName: "Veer"
  },
  "Self-Confidence & Faith": {
    id: "prin-faith",
    name: "Self-Confidence & Faith",
    baselineScore: 50,
    currentScore: 78,
    currentLevel: "Level 4 · Grounded Faith",
    prevWeekScore: 74,
    prevMonthScore: 60,
    trend: "+12%",
    trendPositive: true,
    evidenceCount: 22,
    recentActivities: ["Solved Olympiad-level bonus puzzle", "Recorded 60-second speech without scripts"],
    reflectionSnippet: "I realized my current skill is not my final limit; testing difficulty is how I grow.",
    recommendedNextAction: "Tackle the Level 5 Advanced Algorithm challenge without checking solutions beforehand.",
    color: "#F59E0B",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-400",
    mascotName: "Vishwa"
  },
  "Purity of Mind & Heart": {
    id: "prin-purity",
    name: "Purity of Mind & Heart",
    baselineScore: 55,
    currentScore: 80,
    currentLevel: "Level 4 · Sincere Intent",
    prevWeekScore: 78,
    prevMonthScore: 64,
    trend: "+8%",
    trendPositive: true,
    evidenceCount: 24,
    recentActivities: ["Celebrated peer's top quiz score without envy", "Admitted error on quiz without defensive excuse"],
    reflectionSnippet: "It felt genuinely joyful to cheer for Rahul when he received the consistency badge.",
    recommendedNextAction: "Notice any micro-moments of comparison or jealousy today and replace with sincere encouragement.",
    color: "#8B5CF6",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-400",
    mascotName: "Shuchi"
  },
  "Selfless Service": {
    id: "prin-service",
    name: "Selfless Service",
    baselineScore: 40,
    currentScore: 76,
    currentLevel: "Level 4 · Dedicated Seva",
    prevWeekScore: 71,
    prevMonthScore: 52,
    trend: "+20%",
    trendPositive: true,
    evidenceCount: 21,
    recentActivities: ["Helped classmate with recursion without giving answer", "Cleaned shared laboratory bench unasked"],
    reflectionSnippet: "Explaining the concept to Priya clarified my own doubts ten times more.",
    recommendedNextAction: "Offer 15 minutes of anonymous homework assistance on Sahaay this week.",
    color: "#10B981",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-400",
    mascotName: "Seva"
  },
  "Perseverance & Hard Work": {
    id: "prin-persev",
    name: "Perseverance & Hard Work",
    baselineScore: 46,
    currentScore: 82,
    currentLevel: "Level 5 · Resilient Dynamo",
    prevWeekScore: 77,
    prevMonthScore: 58,
    trend: "+16%",
    trendPositive: true,
    evidenceCount: 32,
    recentActivities: ["Retried 5 Machines puzzle after 2 wrong attempts", "Completed 5-day quest streak"],
    reflectionSnippet: "I used to give up when stuck; now I treat each wrong attempt as data.",
    recommendedNextAction: "Work on a challenging 30-minute programming sprint without quitting early.",
    color: "#F97316",
    badgeBg: "bg-orange-100 text-orange-800 border-orange-400",
    mascotName: "Atma"
  }
};

const INITIAL_ACTIVITIES: ActivityTask[] = [
  {
    id: "act-task-1",
    title: "15-Minute Distraction-Free Study Sprint",
    type: "TASK",
    principle: "Concentration",
    duration: "15 mins",
    xpReward: 25,
    difficulty: "Intermediate",
    description: "Silence all notifications, set a timer for 15 minutes, and stay with a single textbook page without switching away.",
    completed: true
  },
  {
    id: "act-task-2",
    title: "Speak Up in Classroom Discussion",
    type: "TASK",
    principle: "Courage & Fearlessness",
    duration: "5 mins",
    xpReward: 20,
    difficulty: "Challenging",
    description: "Voice an unasked doubt or answer one open question during science class, despite internal hesitation.",
    completed: false
  },
  {
    id: "act-quiz-1",
    title: "Scenario: Mistake in Front of Class",
    type: "QUIZ",
    principle: "Self-Confidence & Faith",
    duration: "3 mins",
    xpReward: 20,
    difficulty: "Beginner",
    description: "You make an arithmetic slip on the blackboard and a few classmates giggle. What do you do next?",
    scenarioQuestion: "You made a calculation mistake in front of the class. What is your immediate next action?",
    scenarioOptions: [
      { text: "Smile calmly, spot the arithmetic step that slipped, and correct it aloud.", signal: "High Faith & Calmness", score: 85 },
      { text: "Ask the teacher to explain why the step failed before feeling embarrassed.", signal: "Inquisitive Courage", score: 75 },
      { text: "Put down the chalk and rush back to your desk feeling ashamed.", signal: "Performance Anxiety", score: 45 }
    ],
    completed: true
  },
  {
    id: "act-quiz-2",
    title: "Scenario: Peer Receives Praise",
    type: "QUIZ",
    principle: "Purity of Mind & Heart",
    duration: "3 mins",
    xpReward: 20,
    difficulty: "Beginner",
    description: "Your desk partner receives the star badge for a project you also worked hard on. How do you respond?",
    scenarioQuestion: "Your friend receives public praise for something you wanted. What is your sincere first reaction?",
    scenarioOptions: [
      { text: "Genuinely congratulate them and celebrate their hard work with a high-five.", signal: "Purity of Mind & Generosity", score: 88 },
      { text: "Feel a brief twinge of jealousy, but remind myself that their success doesn't diminish mine.", signal: "Conscious Self-Awareness", score: 78 },
      { text: "Whisper to a neighbor that the teacher was biased in their grading.", signal: "Unhealthy Envy", score: 40 }
    ],
    completed: false
  },
  {
    id: "act-interest-1",
    title: "Creative Technology: Micro-Coding Challenge",
    type: "INTEREST",
    principle: "Perseverance & Hard Work",
    duration: "20 mins",
    xpReward: 30,
    difficulty: "Challenging",
    description: "Debug a broken JavaScript loop independently for 15 minutes before seeking hints.",
    completed: true
  },
  {
    id: "act-interest-2",
    title: "Quiet Classroom Service (Seva)",
    type: "INTEREST",
    principle: "Selfless Service",
    duration: "10 mins",
    xpReward: 25,
    difficulty: "Intermediate",
    description: "Sharpen spare pencils, wipe clean the laboratory table, or assist a classmate with homework without being asked.",
    completed: false
  }
];

export function VriddhiProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<"STUDENT" | "TEACHER">("STUDENT");

  const [student, setStudent] = useState<StudentProfile>({
    id: "st-aviral",
    name: "Aviral Gupta",
    rollNo: "10A-01",
    grade: "Class 10-A",
    school: "Kendriya Vidyalaya, Delhi",
    academicScore: 88,
    levelNumber: 4,
    levelName: "Self-Reliant Practitioner",
    totalXP: 1340,
    nextLevelXP: 1600,
    streakDays: 8,
    growthMirror: {
      whereIAm: [
        "Concentration duration has expanded from 4 minutes to 15 minutes in focus sprints.",
        "Consistently retries failed problems twice before asking for hints (+16% perseverance).",
        "Demonstrated active selfless service by assisting classmates on Sahaay anonymously.",
        "Academic average is strong (88%), reinforced by rising self-confidence in math."
      ],
      whereICanGrowNext: [
        "Notice moments of restlessness during open-ended, unstructured problem solving.",
        "Practice speaking up earlier in classroom discussions rather than waiting until the end.",
        "Deepen purity of intent by doing service entirely in secret without expecting acknowledgment."
      ]
    },
    teacherObservations: "Aviral has shown remarkable progress in concentration and task persistence over the last 4 weeks. He used to seek hints within 40 seconds; he now works independently for 4+ minutes before asking. Recommend open-ended science investigation with flexible methods."
  });

  const [principles, setPrinciples] = useState<Record<string, PrincipleData>>(INITIAL_PRINCIPLES);
  const [activities, setActivities] = useState<ActivityTask[]>(INITIAL_ACTIVITIES);
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<GrowthEvent[]>([]);
  const [hasCompletedBaseline, setHasCompletedBaseline] = useState(true);

  const [growthEvents, setGrowthEvents] = useState<GrowthEvent[]>([
    {
      id: "evt-1",
      timestamp: "15 mins ago",
      eventType: "TASK_COMPLETED",
      principle: "Concentration",
      value: 2,
      description: "Finished 15-minute distraction-free study sprint without app switching.",
      synced: true
    },
    {
      id: "evt-2",
      timestamp: "2 hours ago",
      eventType: "TASK_RETRIED",
      principle: "Perseverance & Hard Work",
      value: 2,
      description: "Retried Level 3 math riddle immediately after an initial incorrect answer.",
      synced: true
    },
    {
      id: "evt-3",
      timestamp: "Yesterday",
      eventType: "REFLECTION_COMPLETED",
      principle: "Courage & Fearlessness",
      value: 1,
      description: "Reflected on stepping onto the blackboard stage despite nervousness.",
      synced: true
    },
    {
      id: "evt-4",
      timestamp: "2 days ago",
      eventType: "SEVA_COMPLETED",
      principle: "Selfless Service",
      value: 3,
      description: "Cleaned laboratory table and answered peer doubt on Sahaay.",
      synced: true
    }
  ]);

  interface QuestDayItem {
    day: number;
    title: string;
    subtitle: string;
    principle: string;
    xp: number;
    status: "completed" | "active" | "locked";
    challengeType: "focus" | "flexibility" | "memory" | "sprint" | "seva";
  }

  const [weeklyQuest, setWeeklyQuest] = useState<{
    title: string;
    theme: string;
    weekNumber: number;
    principle: string;
    days: QuestDayItem[];
  }>({
    title: "Strengthen Your Concentration",
    theme: "Mastering the Power of Sustained, Fearless Attention",
    weekNumber: 4,
    principle: "Concentration of mind is at the heart of meaningful learning and self-mastery.",
    days: [
      { day: 1, title: "Baseline Concentration Sprint", subtitle: "Establish your attention baseline with the 4x4 Grid.", principle: "Concentration", xp: 20, status: "completed", challengeType: "focus" },
      { day: 2, title: "Courage in Silence", subtitle: "Speak up with an honest question in class.", principle: "Courage & Fearlessness", xp: 20, status: "completed", challengeType: "flexibility" },
      { day: 3, title: "Sincere Joy Challenge", subtitle: "Purity of mind: celebrate another student's win.", principle: "Purity of Mind & Heart", xp: 25, status: "completed", challengeType: "memory" },
      { day: 4, title: "Deep 2-Minute Concentration Sprint", subtitle: "Sustained focus challenge: resist distracting bubbles.", principle: "Concentration", xp: 30, status: "active", challengeType: "sprint" },
      { day: 5, title: "Selfless Classroom Seva", subtitle: "Help a classmate without being asked or expecting reward.", principle: "Selfless Service", xp: 40, status: "locked", challengeType: "seva" }
    ]
  });

  const [reflections, setReflections] = useState<ReflectionEntry[]>([
    {
      id: "ref-1",
      week: "Week 4",
      date: "Oct 6, 2026",
      activityTitle: "15-Minute Focus Sprint",
      principle: "Concentration",
      challengedYou: "When notifications buzzed, I felt an itch to check my phone.",
      learnedAboutSelf: "When I placed the device in another room, my mind naturally settled into deep reading.",
      tryDifferently: "Always create physical distance between distraction triggers and my workspace.",
      aiInsight: "Observable pattern: Transitioning from reactive willpower to deliberate environment design."
    },
    {
      id: "ref-2",
      week: "Week 3",
      date: "Sep 29, 2026",
      activityTitle: "Blackboard Math Problem",
      principle: "Courage & Fearlessness",
      challengedYou: "Fear of looking foolish in front of classmates who might laugh.",
      learnedAboutSelf: "Mistakes are just data. The teacher explained the concept better because I showed where I got stuck.",
      tryDifferently: "Raise my hand on the very first question tomorrow instead of waiting.",
      aiInsight: "Observable pattern: Rapid demystification of social performance anxiety."
    },
    {
      id: "ref-3",
      week: "Week 2",
      date: "Sep 22, 2026",
      activityTitle: "Peer Praise Scenario",
      principle: "Purity of Mind & Heart",
      challengedYou: "Initial feeling of comparison when my friend got praised for something I wanted.",
      learnedAboutSelf: "Recognizing jealousy quickly helps dissolve it. Cheering for others makes my own heart lighter.",
      tryDifferently: "Congratulate peers immediately before my ego has time to compare.",
      aiInsight: "Observable pattern: Emergence of sincere goodwill and emotional maturity."
    }
  ]);

  const [teacherRecommendations, setTeacherRecommendations] = useState<MitraAIRecommendation[]>([
    {
      id: "rec-1",
      studentId: "st-aviral",
      targetPrinciple: "Perseverance & Hard Work",
      gapIdentified: "Concentration has risen to 74% (+14%), but perseverance during open-ended ambiguity shows hesitation.",
      suggestedIntervention: "Assign a 7-day open-ended science investigation where only the final objective is given, requiring 3 independent procedural drafts.",
      reasoning: "Strengthens self-reliance while preventing early surrender when no ready template exists.",
      status: "Approved",
      timestamp: "Today"
    },
    {
      id: "rec-2",
      studentId: "st-aviral",
      targetPrinciple: "Courage & Fearlessness",
      gapIdentified: "Courage score is improving (+18%), but public question-asking evidence is predominantly anonymous on Sahaay.",
      suggestedIntervention: "Invite Aviral to be the opening speaker in a small 3-person peer study circle.",
      reasoning: "Builds a safe bridge from anonymous courage to live vocal participation in class.",
      status: "Pending Teacher Review",
      timestamp: "Yesterday"
    }
  ]);

  const [mitraChat, setMitraChat] = useState<{ id: string; sender: "user" | "mitra"; text: string; principle?: VivekanandaPrinciple; experiment?: string; timestamp: string }[]>([
    {
      id: "mitra-welcome",
      sender: "mitra",
      text: "Namaste! I am MitraAI, your holistic growth companion in VRIDDHI. I look at observable learning patterns across your six core principles to suggest practical daily experiments. What challenge are we working on today?",
      timestamp: "Just now"
    }
  ]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#2563EB", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"]
      });
    } catch {

    }
  };

  const awardXP = (amount: number, reason: string) => {
    setStudent(prev => {
      const newTotal = prev.totalXP + amount;
      let newLevel = prev.levelNumber;
      let newLevelName = prev.levelName;

      if (newTotal >= 2300) { newLevel = 6; newLevelName = "Guide"; }
      else if (newTotal >= 1600) { newLevel = 5; newLevelName = "Initiator"; }
      else if (newTotal >= 1000) { newLevel = 4; newLevelName = "Self-Reliant Practitioner"; }
      else if (newTotal >= 600) { newLevel = 3; newLevelName = "Practitioner"; }
      else if (newTotal >= 250) { newLevel = 2; newLevelName = "Explorer"; }

      if (newLevel > prev.levelNumber) {
        triggerConfetti();
      }

      return {
        ...prev,
        totalXP: newTotal,
        levelNumber: newLevel,
        levelName: newLevelName
      };
    });
  };

  const recordGrowthEvent = (eventData: Omit<GrowthEvent, "id" | "timestamp" | "synced">) => {
    let resolvedPrinciple = eventData.principle;
    if (!resolvedPrinciple && eventData.dimension) {
      if (eventData.dimension === "Focus") resolvedPrinciple = "Concentration";
      else if (eventData.dimension === "Self-Belief") resolvedPrinciple = "Self-Confidence & Faith";
      else if (eventData.dimension === "Initiative") resolvedPrinciple = "Courage & Fearlessness";
      else if (eventData.dimension === "Exploration") resolvedPrinciple = "Perseverance & Hard Work";
      else resolvedPrinciple = eventData.dimension;
    }
    const finalPrinciple = resolvedPrinciple || "Concentration";

    const newEvent: GrowthEvent = {
      ...eventData,
      principle: finalPrinciple,
      id: `evt-${Date.now()}`,
      timestamp: "Just now",
      synced: !isOfflineSimulated
    };

    if (isOfflineSimulated) {
      setOfflineQueue(prev => [newEvent, ...prev]);
    } else {
      setGrowthEvents(prev => [newEvent, ...prev]);
    }

    setPrinciples(prev => {
      const target = prev[finalPrinciple];
      if (!target) return prev;
      const nextScore = Math.min(100, Math.max(0, target.currentScore + eventData.value));
      return {
        ...prev,
        [finalPrinciple]: {
          ...target,
          currentScore: nextScore,
          evidenceCount: target.evidenceCount + 1,
          trend: `+${nextScore - target.baselineScore}%`
        }
      };
    });
  };

  const updatePrincipleScore = (name: string, delta: number, activityName: string) => {
    recordGrowthEvent({
      eventType: "TASK_COMPLETED",
      principle: name,
      value: delta,
      description: `Completed ${activityName}`
    });
  };

  const completeActivity = (id: string, customReflection?: string) => {
    setActivities(prev =>
      prev.map(act => {
        if (act.id === id) {
          awardXP(act.xpReward, `Completed: ${act.title}`);
          recordGrowthEvent({
            eventType: act.type === "QUIZ" ? "QUIZ_COMPLETED" : act.type === "INTEREST" ? "INTEREST_ACTIVITY_COMPLETED" : "TASK_COMPLETED",
            principle: act.principle,
            value: 2,
            description: `Finished ${act.title}`
          });
          if (customReflection) {
            addReflection("Pushing through initial hesitation", customReflection, "Maintain consistency tomorrow", act.title, act.principle);
          }
          triggerConfetti();
          return { ...act, completed: true };
        }
        return act;
      })
    );
  };

  const completeQuestDay = (dayIndex: number) => {
    setWeeklyQuest(prev => {
      const newDays = [...prev.days];
      const target = newDays[dayIndex];
      if (target && target.status !== "completed") {
        target.status = "completed";
        if (dayIndex + 1 < newDays.length && newDays[dayIndex + 1].status === "locked") {
          newDays[dayIndex + 1].status = "active";
        }
        awardXP(target.xp, `Completed Day ${target.day} Quest: ${target.title}`);
        recordGrowthEvent({
          eventType: "QUEST_COMPLETED",
          principle: target.principle,
          value: 3,
          description: `Finished Quest Day ${target.day}: ${target.title}`
        });
      }
      return { ...prev, days: newDays };
    });
    triggerConfetti();
  };

  const addReflection = (challenged: string, learned: string, differently: string, activityName = "Focus & Practice", principleName = "Concentration") => {
    const newEntry: ReflectionEntry = {
      id: `ref-${Date.now()}`,
      week: "Week 4",
      date: "Today",
      activityTitle: activityName,
      principle: principleName,
      challengedYou: challenged,
      learnedAboutSelf: learned,
      tryDifferently: differently,
      aiInsight: "Observable pattern: Developing deliberate self-monitoring and iterative learning composure."
    };

    setReflections(prev => [newEntry, ...prev]);
    awardXP(15, "Completed Follow-Up Reflection");
    recordGrowthEvent({
      eventType: "REFLECTION_COMPLETED",
      principle: principleName,
      value: 1,
      description: `Reflected on ${activityName}`
    });
    triggerConfetti();
  };

  const sendMessageToMitra = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user" as const,
      text: userText,
      timestamp: "Just now"
    };

    setMitraChat(prev => [...prev, userMsg]);
    awardXP(5, "Consulted MitraAI");

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userText,
          studentContext: {
            name: student.name,
            grade: student.grade,
            principles: principles
          },
          conversationHistory: mitraChat
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          const aiMsg = {
            id: `mitra-${Date.now()}`,
            sender: "mitra" as const,
            text: data.text,
            principle: data.principle,
            experiment: data.experiment,
            timestamp: "Just now"
          };
          setMitraChat(prev => [...prev, aiMsg]);
          return;
        }
      }
    } catch (e) {
      console.warn("Error calling /api/mentor/chat, using local fallback:", e);
    }

    const retrieved = retrievePrinciples(userText);
    const principle = retrieved.length > 0 ? retrieved[0] : VIVEKANANDA_KNOWLEDGE_BASE[0];

    const fallbackMsg = {
      id: `mitra-${Date.now()}`,
      sender: "mitra" as const,
      text: `Based on Swami Vivekananda's teachings on ${principle.dimension}:\n\n"${principle.corePrinciple}"\n\nDaily Micro-Experiment: ${principle.practicalExperiment}`,
      principle: principle,
      experiment: principle.practicalExperiment,
      timestamp: "Just now"
    };

    setMitraChat(prev => [...prev, fallbackMsg]);
  };

  const approveRecommendation = (id: string) => {
    setTeacherRecommendations(prev =>
      prev.map(rec => (rec.id === id ? { ...rec, status: "Approved" } : rec))
    );
    triggerConfetti();
  };

  const updateTeacherObservation = (notes: string) => {
    setStudent(prev => ({ ...prev, teacherObservations: notes }));
  };

  const toggleOfflineMode = () => {
    setIsOfflineSimulated(prev => !prev);
  };

  const syncOfflineQueue = () => {
    if (offlineQueue.length === 0) return;
    setGrowthEvents(prev => [...offlineQueue.map(e => ({ ...e, synced: true })), ...prev]);
    setOfflineQueue([]);
    triggerConfetti();
  };

  const submitBaselineAssessment = (scores: Record<string, number>) => {
    setPrinciples(prev => {
      const updated = { ...prev };
      Object.keys(scores).forEach(key => {
        if (updated[key]) {
          updated[key] = {
            ...updated[key],
            baselineScore: scores[key],
            currentScore: scores[key],
            prevWeekScore: Math.max(30, scores[key] - 5),
            prevMonthScore: Math.max(25, scores[key] - 10),
            trend: "+0%"
          };
        }
      });
      return updated;
    });
    setHasCompletedBaseline(true);
    awardXP(100, "Completed Start-of-Year Baseline Assessment");
    triggerConfetti();
  };

  return (
    <VriddhiStoreContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        student,
        setStudent,
        principles,
        updatePrincipleScore,
        activities,
        completeActivity,
        growthEvents,
        offlineQueue,
        isOfflineSimulated,
        toggleOfflineMode,
        syncOfflineQueue,
        recordGrowthEvent,
        weeklyQuest,
        completeQuestDay,
        reflections,
        addReflection,
        mitraChat,
        sendMessageToMitra,
        teacherRecommendations,
        approveRecommendation,
        updateTeacherObservation,
        awardXP,
        triggerConfetti,
        hasCompletedBaseline,
        submitBaselineAssessment
      }}
    >
      {children}
    </VriddhiStoreContext.Provider>
  );
}

export function useVriddhiStore() {
  const context = useContext(VriddhiStoreContext);
  if (!context) {
    throw new Error("useVriddhiStore must be used within a VriddhiProvider");
  }
  return context;
}

export const useAwakenStore = useVriddhiStore;
export const AwakenProvider = VriddhiProvider;
