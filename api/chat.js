/**
 * Serverless / Local API Endpoint: /api/chat
 * Provides zero-CORS proxy for Google Gemini and Ollama Cloud (gpt-oss:20b, gemma4:31b, etc.).
 * Works seamlessly in both Vercel serverless environment and local Node development server.
 */

async function handler(req, res) {
  // Enforce permissive CORS headers for all origins
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const { prompt, systemInstruction } = body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt parameter' });
  }

  const requestedProvider = body.provider || 'auto'; // 'auto', 'gemini', 'ollama', 'vercel_api'
  const clientGeminiKey = (body.geminiKey || '').trim();
  const geminiApiKey = clientGeminiKey || process.env.GEMINI_API_KEY || '';
  const geminiModel = (body.geminiModel || 'gemini-1.5-flash').trim();

  const clientOllamaToken = (body.ollamaToken || '').trim();
  const ollamaToken = clientOllamaToken || process.env.OLLAMA_API_KEY || '';
  const ollamaModel = (body.ollamaModel || 'gpt-oss:20b').trim();
  const rawOllamaUrl = (body.ollamaUrl || 'https://ollama.com/api').trim();
  const cleanOllamaUrl = rawOllamaUrl.replace(/\/+$/, '');

  // Helper: call Ollama Cloud / Local from server-side (Bypasses browser CORS entirely)
  async function callOllama() {
    const chatEndpoint = cleanOllamaUrl.endsWith('/api')
      ? `${cleanOllamaUrl}/chat`
      : cleanOllamaUrl.includes('/api/')
      ? cleanOllamaUrl
      : `${cleanOllamaUrl}/api/chat`;

    const headers = { 'Content-Type': 'application/json' };
    if (ollamaToken) {
      headers['Authorization'] = ollamaToken.startsWith('Bearer ') ? ollamaToken : `Bearer ${ollamaToken}`;
    }

    const oRes = await fetch(chatEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: ollamaModel,
        messages: [
          { role: 'system', content: systemInstruction || 'You are an accurate academic project portfolio AI assistant.' },
          { role: 'user', content: prompt }
        ],
        stream: false
      })
    });

    if (!oRes.ok) {
      const errText = await oRes.text().catch(() => '');
      throw new Error(`Ollama HTTP ${oRes.status}: ${errText}`);
    }

    const data = await oRes.json();
    const text = data.message?.content || data.response;
    if (!text) throw new Error('Ollama returned empty response');
    const isCloud = cleanOllamaUrl.includes('ollama.com');
    return {
      text,
      provider: `${isCloud ? 'Ollama Cloud' : 'Local Ollama'} (${ollamaModel})`
    };
  }

  // Helper: call Google Gemini from server-side
  async function callGemini() {
    if (!geminiApiKey) throw new Error('No Gemini API key available');
    const targetModel = geminiModel || 'gemini-1.5-flash';
    const candidateUrls = [
      `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${geminiApiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`
    ];

    let lastErr = null;
    for (const url of candidateUrls) {
      try {
        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemInstruction || 'You are an accurate academic project portfolio AI assistant.' }]
            },
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 900
            }
          })
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return {
              text,
              provider: `Google Gemini (${targetModel})`
            };
          }
        } else {
          const errData = await geminiRes.json().catch(() => ({}));
          lastErr = new Error(errData.error?.message || `HTTP ${geminiRes.status}`);
          if (geminiRes.status === 404) continue;
          break;
        }
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error('Gemini call failed');
  }

  // 1. If explicit Ollama requested
  if (requestedProvider === 'ollama') {
    try {
      const result = await callOllama();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(200).json({ useFallback: true, error: err.message });
    }
  }

  // 2. If explicit Gemini requested
  if (requestedProvider === 'gemini') {
    try {
      const result = await callGemini();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(200).json({ useFallback: true, error: err.message });
    }
  }

  // 3. Auto mode: Gemini -> Ollama Cloud -> Fallback
  // Try Gemini first if key available
  if (geminiApiKey) {
    try {
      const result = await callGemini();
      return res.status(200).json(result);
    } catch (err) {
      console.warn('Auto mode Gemini attempt failed, trying Ollama:', err.message);
    }
  }

  // Try Ollama Cloud if token available or custom local URL
  if (ollamaToken || (!cleanOllamaUrl.includes('ollama.com') && cleanOllamaUrl)) {
    try {
      const result = await callOllama();
      return res.status(200).json(result);
    } catch (err) {
      console.warn('Auto mode Ollama attempt failed:', err.message);
    }
  }

  // Graceful fallback to client-side Smart Extractive RAG
  return res.status(200).json({
    useFallback: true,
    message: 'No server keys configured or remote endpoints unreachable. Using Smart Extractive RAG.'
  });
}

module.exports = handler;
module.exports.default = handler;
