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
  if (!prompt || String(prompt).length > 4000) {
    return res.status(prompt ? 200 : 400).json(prompt
      ? { useFallback: true, error: 'Prompt is longer than 4000 characters.' }
      : { error: 'Missing prompt parameter' });
  }

  const requestedProvider = body.provider || 'gemini'; // 'auto', 'gemini', 'ollama', 'vercel_api'
  const clientGeminiKey = (body.geminiKey || '').trim();
  const geminiApiKey = clientGeminiKey || process.env.GEMINI_API_KEY || '';
  const geminiModel = (body.geminiModel === 'gemini-2.5-flash' ? 'gemini-3.8-flash' : (body.geminiModel || 'gemini-3.8-flash')).trim();

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
        stream: false,
        options: { temperature: 0.2 }
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

  function geminiModelCandidates(requested) {
    const names = [requested, 'gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    const unique = [];
    for (const name of names) {
      const model = (name || '').trim();
      if (model && !unique.includes(model)) unique.push(model);
    }
    return unique;
  }

  function sleepMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function geminiBusy(status, message) {
    return status === 503 || status === 429 || status === 500 || /high demand|unavailable|overloaded|try again later|resource exhausted/i.test(String(message || ''));
  }

  // Helper: call Google Gemini from server-side
  async function callGemini() {
    if (!geminiApiKey) throw new Error('No Gemini API key available');
    const models = geminiModelCandidates(geminiModel || 'gemini-3.8-flash');
    let lastErr = null;
    const payload = JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemInstruction || 'You are an accurate academic project portfolio AI assistant.' }]
      },
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4096
      }
    });

    for (const model of models) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          const geminiRes = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload
          });

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              return {
                text,
                provider: `Google Gemini (${model})`
              };
            }
            lastErr = new Error('Gemini returned an empty response');
            break;
          }

          const errData = await geminiRes.json().catch(() => ({}));
          const message = errData.error?.message || `HTTP ${geminiRes.status}`;
          lastErr = new Error(message);
          const missingModel = geminiRes.status === 404 || /not found|not supported|no longer available/i.test(message);
          if (missingModel) break;
          if (geminiBusy(geminiRes.status, message) && attempt < 3) {
            await sleepMs(800 * (attempt + 1));
            continue;
          }
          break;
        } catch (e) {
          lastErr = e;
          if (attempt < 3) {
            await sleepMs(800 * (attempt + 1));
            continue;
          }
        }
      }
    }
    throw lastErr || new Error('Gemini call failed');
  }

  async function callKilo() {
    const maxTokens = Math.min(4096, Number(body.maxOutputTokens) || 1024);
    const messages = [];
    const system = String(systemInstruction || '').slice(0, 6000);
    if (system) messages.push({ role: 'system', content: system });
    messages.push({ role: 'user', content: String(prompt).slice(0, 3500) });
    const kRes = await fetch('https://ai-gateway.kilo.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer anonymous'
      },
      body: JSON.stringify({
        model: 'kilo-auto/free',
        messages,
        temperature: 0.2,
        max_tokens: maxTokens
      })
    });
    if (!kRes.ok) {
      const errText = await kRes.text().catch(() => '');
      throw new Error(`Kilo HTTP ${kRes.status}: ${errText.slice(0, 180)}`);
    }
    const data = await kRes.json();
    const message = data.choices?.[0]?.message || {};
    const text = typeof message.content === 'string' ? message.content.trim() : '';
    if (!text) throw new Error('Kilo returned empty response');
    return { text, provider: 'Kilo (kilo-auto/free)' };
  }

  if (requestedProvider === 'kilo') {
    try {
      const result = await callKilo();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(200).json({ useFallback: true, error: err.message });
    }
  }

  // 1. If explicit Ollama requested — still try Gemini first when a key is available
  if (requestedProvider === 'ollama') {
    if (geminiApiKey) {
      try {
        const result = await callGemini();
        return res.status(200).json(result);
      } catch (err) {
        console.warn('Ollama mode: Gemini attempt failed, trying Ollama:', err.message);
      }
    }
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
