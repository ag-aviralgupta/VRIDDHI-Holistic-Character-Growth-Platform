import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, question } = body;

    const post = {
      id: `sah-${Date.now()}`,
      authorAlias: "Anonymous Scholar #" + Math.floor(100 + Math.random() * 900),
      category: category || "Academic",
      question,
      upvotes: 1,
      createdAt: "Just now"
    };

    return NextResponse.json({ success: true, post, xpAwarded: 10 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to post question" }, { status: 400 });
  }
}
