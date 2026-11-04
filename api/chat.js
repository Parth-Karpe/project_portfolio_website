/**
 * Vercel Serverless Function: /api/chat
 * Provides zero-compute Google Gemini 1.5 Flash proxy for ProjectGate AI.
 * Keeps GEMINI_API_KEY securely on the server side without exposing it to clients.
 */

async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, systemInstruction } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt parameter' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Graceful notification to client to use smart extractive RAG
    return res.status(200).json({
      useFallback: true,
      message: 'GEMINI_API_KEY is not configured in Vercel Environment Variables. Using Smart Extractive RAG.'
    });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction || 'You are an accurate academic project portfolio AI assistant.' }]
        },
        contents: [
          { parts: [{ text: prompt }] }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 850
        }
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return res.status(geminiRes.status).json({ error: errText, useFallback: true });
    }

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return res.status(200).json({ text, provider: 'Google Gemini 1.5 Flash (via Vercel Serverless)' });
  } catch (err) {
    return res.status(500).json({ error: err.message, useFallback: true });
  }
}

module.exports = handler;
module.exports.default = handler;
