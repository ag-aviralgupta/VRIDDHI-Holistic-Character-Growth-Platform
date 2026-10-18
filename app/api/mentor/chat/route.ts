import { NextResponse } from "next/server";
import { retrievePrinciples, VIVEKANANDA_KNOWLEDGE_BASE } from "@/lib/vivekananda-rag";


const OPENROUTER_API_KEY =
  process.env.OPENROUTER_API_KEY ||
  process.env.LLM_API_KEY;


const FAST_MODELS = [
  "openai/gpt-4o-mini",
  "meta-llama/llama-3.1-8b-instruct"
];

async function callOpenRouterWithTimeout(
  model: string,
  messages: any[],
  maxTokens: number = 240,
  timeoutMs: number = 4200
): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "VRIDDHI - Fast AI Companion",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: maxTokens
      })
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();
      if (content) return content;
    }
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn(`[OpenRouter ${model}] Fast fetch attempt skipped/timed out:`, err?.message || err);
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, studentContext, conversationHistory } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ success: false, error: "Query is required" }, { status: 400 });
    }

    const isEducator =
      studentContext?.role === "educator" ||
      body.role === "educator" ||
      query.startsWith("Educator Inquiry");

    const retrieved = retrievePrinciples(query);
    const principleAnchor = retrieved.length > 0 ? retrieved[0] : VIVEKANANDA_KNOWLEDGE_BASE[0];

    let systemPrompt = "";

    if (isEducator) {
      systemPrompt = `You are NitiAI (नीति AI), the pedagogical advisor for teachers inside VRIDDHI, grounded in Swami Vivekananda's philosophy of education: "Education is the manifestation of the perfection already in man."
Role: Advise teachers on school-appropriate, non-clinical classroom interventions for observable learning habits (Concentration, Courage, Faith, Purity, Service, Perseverance).
Guidelines:
- Keep response concise, practical, and empathetic (2 short paragraphs).
- Provide 1 actionable classroom micro-strategy or peer-group intervention for the teacher.
- Reference Vivekananda's strength-building approach. Never use clinical labels or deficit-based framing.`;
    } else {
      systemPrompt = `You are MitraAI (मित्र AI), a compassionate, inspiring AI Growth Companion inside VRIDDHI, grounded in Swami Vivekananda's philosophy:
- Focus on man-making character development, especially Concentration ("the essence of education"), Courage (Abhaya), Faith (Shraddha), Purity (Chitta-Shuddhi), Service (Karma Yoga), and Perseverance (Titiksha).
- Student: ${studentContext?.name || "Student"} (Class ${studentContext?.grade || "10-A"})
- Vivekananda Anchor: "${principleAnchor.title}" - "${principleAnchor.corePrinciple}"
Guidelines:
- Warm, grounded mentor tone (friendly English/Hinglish).
- Concise (2 short paragraphs).
- ALWAYS suggest 1 practical, actionable "Daily Micro-Experiment" for today/tomorrow.
- Never diagnose psychiatric conditions or label the student negatively.`;
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...(Array.isArray(conversationHistory)
        ? conversationHistory.slice(-3).map((m: any) => ({
          role: m.sender === "user" || m.sender === "teacher" ? "user" : "assistant",
          content: m.text
        }))
        : []),
      { role: "user", content: query }
    ];

    let aiText: string | null = null;

    for (const model of FAST_MODELS) {
      aiText = await callOpenRouterWithTimeout(model, messages, 240, 4200);
      if (aiText) break;
    }

    if (!aiText) {
      if (isEducator) {
        aiText = `Based on Swami Vivekananda's principle: "Education is the manifestation of the perfection already in man."\n\nFor ${studentContext?.name || "this student"}, focus on scaffolded micro-challenges that build self-reliance. Pair 10-minute focus sprints with verbal encouragement on independent effort.\n\nRecommended Intervention: ${principleAnchor.practicalExperiment}`;
      } else {
        aiText = `Namaste! Based on Swami Vivekananda's teachings on ${principleAnchor.dimension || "Concentration"}:\n\n"${principleAnchor.corePrinciple}"\n\nDaily Micro-Experiment: ${principleAnchor.practicalExperiment}\n\nRemember: All power is already within you. What small step will you take today?`;
      }
    }

    return NextResponse.json({
      success: true,
      text: aiText,
      principle: principleAnchor,
      experiment: principleAnchor.practicalExperiment,
      timestamp: "Just now"
    });
  } catch (error: any) {
    console.error("Fast chat route error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate guidance"
    }, { status: 500 });
  }
}
