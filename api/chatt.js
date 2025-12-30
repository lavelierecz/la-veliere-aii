import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const userMessage = req.body.message;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
You are a professional skincare consultant for the brand La Velière.
You speak Czech, politely, calmly and with confidence.
You never mention AI or technology.
You guide users through skincare routines.
        `
      },
      {
        role: "user",
        content: userMessage
      }
    ]
  });

  res.status(200).json({
    reply: completion.choices[0].message.content
  });
}
