import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { challenged, learned, differently, activity } = body;

    const entry = {
      id: `ref-${Date.now()}`,
      activity: activity || "Focus Lab",
      challenged,
      learned,
      differently,
      aiInsight: "Observable pattern: Thoughtful self-awareness and intentional strategy iteration.",
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, reflection: entry, xpAwarded: 10 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
  }
}
