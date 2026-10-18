import { NextResponse } from "next/server";

export async function GET() {
  const profile = {
    student: {
      name: "Aviral Gupta",
      grade: "Class 10-A",
      level: 4,
      levelTitle: "Self-Reliant",
      totalXP: 1240,
      streakDays: 7
    },
    indicators: {
      Focus: { current: 74, previous: 62, delta: 12, history: [42, 51, 62, 74] },
      SelfBelief: { current: 68, previous: 60, delta: 8, history: [48, 55, 60, 68] },
      Perseverance: { current: 81, previous: 66, delta: 15, history: [45, 54, 66, 81] },
      SelfReliance: { current: 72, previous: 51, delta: 21, history: [30, 41, 51, 72] },
      Initiative: { current: 77, previous: 70, delta: 7, history: [50, 62, 70, 77] },
      Exploration: { current: 84, previous: 63, delta: 21, history: [40, 52, 63, 84] }
    }
  };

  return NextResponse.json({ success: true, data: profile });
}
