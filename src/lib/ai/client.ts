import OpenAI from "openai";

const MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

function createClient(): OpenAI {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY environment variable is not set. Get a free key at https://openrouter.ai/keys");
  }
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://lvl-up.vercel.app",
      "X-Title": "LVL Up - Branch Performance",
    },
  });
}

export async function aiChat(messages: { role: "user" | "assistant" | "system"; content: string }[]) {
  const client = createClient();
  return client.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 0.7,
    max_tokens: 4096,
  });
}

export async function aiAnalyze(systemPrompt: string, userContent: string) {
  const client = createClient();
  return client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
    temperature: 0.3,
    max_tokens: 2048,
  });
}