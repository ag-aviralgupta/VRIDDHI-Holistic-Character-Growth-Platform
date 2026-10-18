import { NextResponse } from "next/server";

export async function GET() {
  const currentQuest = {
    week: 4,
    title: "Train Your Focus",
    theme: "Mastering the Power of Sustained Attention",
    principle: "The essence of education is the concentration of mind, not the mere collection of facts.",
    days: [
      { day: 1, title: "Baseline Focus Challenge", xp: 20, status: "completed" },
      { day: 2, title: "Memory Sequence Lantern", xp: 20, status: "completed" },
      { day: 3, title: "Rule-Switching Flexibility", xp: 25, status: "completed" },
      { day: 4, title: "Deep Focus 2-Minute Sprint", xp: 30, status: "active" },
      { day: 5, title: "Classroom Observation & Seva", xp: 40, status: "locked" }
    ]
  };

  return NextResponse.json({ success: true, quest: currentQuest });
}
