import OpenAI from "openai";

export async function POST(req) {
  const body = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "Jsi profesionální kosmetický poradce značky La Velière. Mluvíš česky, jemně, luxusně a srozumitelně."
      },
      {
        role: "user",
        content: body.message
      }
    ]
  });

  return new Response(
    JSON.stringify({ reply: completion.choices[0].message.content }),
    { status: 200 }
  );
}
