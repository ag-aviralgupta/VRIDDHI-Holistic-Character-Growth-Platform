export interface VivekanandaPrinciple {
  id: string;
  dimension: "Focus" | "Self-Belief" | "Perseverance" | "Self-Reliance" | "Initiative" | "Exploration" | "Seva";
  title: string;
  corePrinciple: string;
  source: string;
  practicalExperiment: string;
  reflectionPrompt: string;
  keywords: string[];
}

export const VIVEKANANDA_KNOWLEDGE_BASE: VivekanandaPrinciple[] = [
  {
    id: "prin-focus-1",
    dimension: "Focus",
    title: "Concentration is the Essence of All Knowledge",
    corePrinciple: "The difference between an ordinary mind and an extraordinary mind lies entirely in the degree of concentration. To me, the very essence of education is concentration of mind, not the collecting of facts.",
    source: "Complete Works of Swami Vivekananda, Vol 1 / Conversations",
    practicalExperiment: "Take one difficult problem or page. Eliminate all devices for 12 minutes. Track each time your attention slips and gently guide it back without frustration.",
    reflectionPrompt: "What single thought or habit tried to pull your mind away during those 12 minutes?",
    keywords: ["focus", "concentration", "distraction", "attention", "mind", "study", "forget", "daydreaming", "can't focus"]
  },
  {
    id: "prin-selfbelief-1",
    dimension: "Self-Belief",
    title: "Faith in Oneself Before Faith in Anything Else",
    corePrinciple: "The history of the world is the history of a few men and women who had faith in themselves. That faith calls out the divinity within. You can do anything and everything without even the guidance of any one.",
    source: "Lectures from Colombo to Almora, 'The Work Before Us'",
    practicalExperiment: "Write down one task you believe you are 'bad at'. Before touching it, write: 'My present skill is not my final limit.' Spend 10 minutes on the fundamentals.",
    reflectionPrompt: "Is the obstacle in the task itself, or in the story you tell yourself about your ability?",
    keywords: ["belief", "confidence", "fear", "insecure", "scared", "nervous", "not good enough", "exam stress", "self-doubt"]
  },
  {
    id: "prin-perseverance-1",
    dimension: "Perseverance",
    title: "Arise, Awake, and Stop Not Till the Goal is Reached",
    corePrinciple: "Take up one idea. Make that one idea your life — think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea. This is the way to success.",
    source: "Raja Yoga, Chapter 2",
    practicalExperiment: "When a problem or code errors out, do not ask a teacher or AI immediately. Make exactly two alternative attempts with different hypotheses before seeking outside help.",
    reflectionPrompt: "When you felt like giving up, what specifically triggered that sensation?",
    keywords: ["give up", "hard", "difficult", "tired", "failed", "failure", "try again", "stuck", "frustrated", "quit"]
  },
  {
    id: "prin-selfreliance-1",
    dimension: "Self-Reliance",
    title: "True Help is Helping One to Help Oneself",
    corePrinciple: "You have to grow from the inside out. None can teach you, none can make you spiritual. There is no other teacher but your own soul. Education is the manifestation of the perfection already in man.",
    source: "Karma Yoga / Letters",
    practicalExperiment: "Set a 10-minute 'No-Hint Clock'. Break the problem into its smallest parts and solve part one completely on your own paper before consulting hints.",
    reflectionPrompt: "What did you discover about your own problem-solving power when hints were delayed?",
    keywords: ["hint", "help", "spoon-fed", "independent", "alone", "solve", "rely", "answer", "cheating", "guidance"]
  },
  {
    id: "prin-initiative-1",
    dimension: "Initiative",
    title: "Be a Leader by Being the Foremost Servant",
    corePrinciple: "Stand up, be bold, be strong. Take the whole responsibility on your own shoulders, and know that you are the creator of your own destiny. All the strength and succor you want is within yourselves.",
    source: "Addresses on Practical Vedanta",
    practicalExperiment: "Choose one unassigned task today — clean your study table, organize a group project note, or solve an optional bonus question without being told.",
    reflectionPrompt: "How did starting before anyone commanded you change your feeling of ownership?",
    keywords: ["start", "lead", "proactive", "lazy", "procrastinate", "waiting", "initiative", "action", "first step"]
  },
  {
    id: "prin-exploration-1",
    dimension: "Exploration",
    title: "Manifestation of the Infinite Potential Within",
    corePrinciple: "Infinite knowledge and power are within. What a person 'learns' is really what they 'discover' by taking the cover off their own mind. Explore varied fields to find where your natural light shines brightest.",
    source: "Lectures on Raja Yoga & Karma Yoga",
    practicalExperiment: "Spend 20 minutes trying a domain completely foreign to you (e.g. sketching if you code, or writing a mini-algorithm if you draw). Note what stirred your curiosity.",
    reflectionPrompt: "Did you enjoy the activity for its own sake or only for the final result?",
    keywords: ["career", "future", "what should i do", "interest", "bored", "curiosity", "explore", "options", "stream"]
  },
  {
    id: "prin-seva-1",
    dimension: "Seva",
    title: "Service to Others as the Highest Form of Learning",
    corePrinciple: "They alone live, who live for others, the rest are more dead than alive. In helping your peers learn, your own understanding deepens ten-fold.",
    source: "Epistles of Swami Vivekananda",
    practicalExperiment: "Find one classmate who is struggling with a concept you recently solved. Explain it to them without giving away the direct answer.",
    reflectionPrompt: "What gaps in your own understanding did explaining to someone else reveal?",
    keywords: ["help", "friends", "classmates", "service", "seva", "community", "kindness", "teach"]
  }
];

export function retrievePrinciples(query: string): VivekanandaPrinciple[] {
  const q = query.toLowerCase();
  const scored = VIVEKANANDA_KNOWLEDGE_BASE.map(p => {
    let score = 0;
    p.keywords.forEach(k => {
      if (q.includes(k.toLowerCase())) score += 3;
    });
    if (q.includes(p.dimension.toLowerCase())) score += 5;
    if (q.includes(p.title.toLowerCase())) score += 4;
    return { principle: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter(s => s.score > 0).map(s => s.principle).slice(0, 2);
}
