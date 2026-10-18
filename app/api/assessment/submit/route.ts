import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { scores } = body;

    const initialProfile = {
      focus: scores?.Focus || 62,
      selfBelief: scores?.["Self-Belief"] || 68,
      perseverance: scores?.Perseverance || 76,
      selfReliance: scores?.["Self-Reliance"] || 69,
      initiative: scores?.Initiative || 64,
      exploration: scores?.Exploration || 82,
      xpAwarded: 100,
      message: "Your journey begins."
    };

    return NextResponse.json({ success: true, profile: initialProfile });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
}
