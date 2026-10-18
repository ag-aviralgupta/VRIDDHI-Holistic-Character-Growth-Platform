import { NextResponse } from "next/server";

export async function GET() {
  const activities = [
    { id: "act-1", title: "Concentration Grid", type: "Focus", duration: "30s", xp: 20 },
    { id: "act-2", title: "Memory Lantern Sequence", type: "Memory", duration: "2m", xp: 25 },
    { id: "act-3", title: "Cognitive Flexibility", type: "Rule Switching", duration: "1m", xp: 25 },
    { id: "act-4", title: "Self-Reliance Riddle", type: "Independent Logic", duration: "3m", xp: 20 }
  ];

  return NextResponse.json({ success: true, activities });
}
