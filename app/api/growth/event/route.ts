import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventType, dimension, value, description, metadata } = body;

    const recordedEvent = {
      id: `evt-${Date.now()}`,
      eventType,
      dimension,
      value: value || 1,
      description: description || "Observable growth action",
      metadata: metadata || {},
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ success: true, event: recordedEvent });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid event" }, { status: 400 });
  }
}
