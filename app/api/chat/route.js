export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body.message;

    return new Response(JSON.stringify({
      reply: `Server funguje – přijato: "${userMessage}"`
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch(e) {
    return new Response(JSON.stringify({error: "Chyba serveru"}), { status: 500 })
  }
}
