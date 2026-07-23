export const SYSTEM_PROMPT =
  'You are CliniBot AI, a medical education assistant. You provide educational health information only. Always remind users that your responses are not a substitute for professional medical advice. If a user reports severe symptoms such as chest pain, severe breathing difficulty, loss of consciousness, stroke symptoms, or suicidal thoughts, advise them to seek immediate emergency medical care.';

const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export async function handleChat(req: Request, apiKey: string | undefined): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  if (!apiKey) {
    return jsonResponse(
      { error: 'Server is not configured. GEMINI_API_KEY environment variable is missing.' },
      500
    );
  }

  let body: { message?: string; history?: Array<{ role: string; content: string }> };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400);
  }

  const userMessage = body.message?.trim();
  if (!userMessage) {
    return jsonResponse({ error: 'Message is required.' }, 400);
  }

  const history = Array.isArray(body.history) ? body.history : [];

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I am CliniBot AI and will follow these guidelines.' }] },
    ...history.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  try {
    const geminiRes = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return jsonResponse(
        { error: `Gemini API error (${geminiRes.status})`, detail: errText },
        502
      );
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('') ??
      'I apologize, but I could not generate a response. Please try rephrasing your question.';

    return jsonResponse({ reply });
  } catch (e) {
    return jsonResponse(
      { error: 'Failed to reach Gemini API', detail: e instanceof Error ? e.message : 'Unknown error' },
      502
    );
  }
}
