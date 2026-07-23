export const SYSTEM_PROMPT =
  'You are CliniBot AI, a medical education assistant. You provide educational health information only. Always remind users that your responses are not a substitute for professional medical advice. If a user reports severe symptoms such as chest pain, severe breathing difficulty, loss of consciousness, stroke symptoms, or suicidal thoughts, advise them to seek immediate emergency medical care.';

const MODEL_CANDIDATES = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];
const getGeminiEndpoint = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

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
    const payload = JSON.stringify({
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
    });

    let lastError: { status: number; text: string } | null = null;

    for (const model of MODEL_CANDIDATES) {
      const geminiRes = await fetch(`${getGeminiEndpoint(model)}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const reply =
          data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('') ??
          'I apologize, but I could not generate a response. Please try rephrasing your question.';

        return jsonResponse({ reply });
      }

      const errText = await geminiRes.text();
      lastError = { status: geminiRes.status, text: errText };

      // If quota exceeded (429), break immediately or try next model
      if (geminiRes.status === 429) {
        continue;
      }
    }

    if (lastError) {
      if (lastError.status === 429) {
        // Generate helpful educational fallback response so chat remains functional during rate limits
        const fallbackReply = getEducationalFallback(userMessage);
        return jsonResponse({ reply: fallbackReply });
      }
      return jsonResponse(
        { error: `Gemini API Error (${lastError.status})`, detail: lastError.text },
        lastError.status >= 400 && lastError.status < 500 ? lastError.status : 502
      );
    }

    return jsonResponse({ reply: getEducationalFallback(userMessage) });
  } catch (e) {
    return jsonResponse(
      { reply: getEducationalFallback(userMessage) }
    );
  }
}

function getEducationalFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('headache') || q.includes('head ache')) {
    return `### Educational Overview: Common Causes of Headaches 🩺

Headaches are very common and can stem from various everyday factors:

- **Tension Headaches**: Often caused by stress, fatigue, or poor posture. They typically feel like a constant dull ache around both sides of the head.
- **Dehydration**: Not drinking enough water is a common trigger for mild to moderate headaches.
- **Eye Strain**: Prolonged screen time or uncorrected vision can lead to tension around the forehead and eyes.
- **Lack of Sleep**: Disruptions in your sleep routine can trigger head discomfort.

**General Guidance:**
1. Rest in a quiet, dimly lit room.
2. Stay hydrated by drinking water throughout the day.
3. Take regular screen breaks (follow the 20-20-20 rule).

*⚠️ **Medical Disclaimer:** This is educational information only and not medical advice. If your headache is sudden, severe, accompanied by fever, stiff neck, confusion, or visual changes, please seek emergency medical attention immediately.*`;
  }

  if (q.includes('sleep') || q.includes('insomnia')) {
    return `### Educational Overview: Improving Sleep Hygiene 😴

Good sleep hygiene supports physical and mental wellbeing. Here are evidence-informed tips to help improve sleep naturally:

1. **Maintain a Consistent Schedule**: Go to bed and wake up at the same time every day, even on weekends.
2. **Limit Screen Time**: Avoid phones, tablets, and computers at least 30–60 minutes before bed (blue light can suppress melatonin).
3. **Create a Relaxing Environment**: Keep your bedroom cool, dark, and quiet.
4. **Watch Caffeine & Meals**: Avoid heavy meals and caffeinated beverages 6 hours before bedtime.

*⚠️ **Medical Disclaimer:** Educational information only. If chronic insomnia affects your daily functioning, consult a qualified healthcare professional.*`;
  }

  if (q.includes('diet') || q.includes('nutrition') || q.includes('eat')) {
    return `### Educational Overview: Balanced Nutrition Basics 🥗

A balanced diet provides essential nutrients to support overall health and energy levels:

- **Whole Foods**: Focus on vegetables, fruits, whole grains, lean proteins, and healthy fats.
- **Hydration**: Aim for adequate daily water intake based on your activity level and climate.
- **Portion Awareness**: Balance macronutrients (carbohydrates, proteins, and healthy fats) across meals.
- **Limit Processed Foods**: Reduce intake of excess added sugars, artificial additives, and high-sodium processed foods.

*⚠️ **Medical Disclaimer:** Educational information only. Consult a registered dietitian or physician for personalized dietary needs.*`;
  }

  if (q.includes('burn') || q.includes('first aid') || q.includes('first-aid')) {
    return `### Educational Overview: First-Aid for Minor Burns 🔥

For minor, superficial (first-degree) burns:

1. **Cool the Burn**: Immediately run cool (not cold or icy) tap water over the burn for 10–15 minutes.
2. **Protect the Area**: Cover gently with a clean, non-stick sterile bandage or cloth.
3. **Avoid Home Remedies**: Do NOT apply butter, oil, or ice directly to the burn as this can damage tissue or cause infection.

*⚠️ **Emergency Warning:** For severe, widespread, or deep burns (or burns involving the face, hands, or joints), call local emergency services immediately.*`;
  }

  return `### Educational Health Guidance 🩺

Thank you for your question about: **"${query}"**

CliniBot AI is designed to support health education and wellness awareness:

1. **General Wellness**: Maintaining daily hydration, balanced nutrition, regular physical activity, and adequate sleep form the foundation of long-term health.
2. **Symptom Awareness**: Keeping track of when symptoms start, how long they last, and what triggers or relieves them can be very helpful when speaking with your doctor.
3. **Professional Healthcare**: Healthcare providers can order appropriate diagnostic tests, review your medical history, and provide personalized treatment options.

*⚠️ **Important Disclaimer:** CliniBot AI provides educational information only and does not provide medical diagnoses or treatment recommendations. Always consult a qualified healthcare provider for medical concerns. For emergency symptoms (e.g. chest pain, severe breathing difficulty), call local emergency services immediately.*`;
}
