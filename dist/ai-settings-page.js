/**
 * ProjectGate AI — Settings tab (API keys, models, providers).
 * Sensitive values are stored only in the browser localStorage.
 */

function readAiSettingsBundle(){
  const llm = typeof window.getLLMSettings === 'function'
    ? window.getLLMSettings()
    : {
        provider: localStorage.getItem('pg_llm_provider') || 'gemini',
        geminiKey: localStorage.getItem('pg_gemini_key') || '',
        geminiModel: 'gemini-3.8-flash',
        ollamaUrl: localStorage.getItem('pg_ollama_url') || 'https://ollama.com/api',
        ollamaModel: localStorage.getItem('pg_ollama_model') || 'gpt-oss:20b',
        ollamaToken: localStorage.getItem('pg_ollama_token') || ''
      };
  const ollama = (typeof state !== 'undefined' && state.ollama) ? state.ollama : { url: 'http://localhost:11434', model: 'qwen3:4b' };
  const mode = (typeof state !== 'undefined' && state.mode) ? state.mode : 'demo';
  return { llm, vivaMode: mode, vivaOllama: ollama };
}

function aiSettingsPage(){
  const s = readAiSettingsBundle();
  const llm = s.llm;
  const canEditViva = typeof state !== 'undefined';

  const closeBtn = `<button type="button" class="btn secondary settings-page-close" onclick="window.closeSettingsPage()" title="Back to workspace" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;font-size:12px;font-weight:700">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Close
      </button>`;
  return heading('AI & mentor settings', 'API keys, models, and providers', closeBtn) +
    `<div class="notice">Settings saved in this browser.</div>
    <div class="grid">
      <section class="card">
        <div class="card-head">
          <div>
            <h2>Portfolio mentor</h2>
          </div>
          <span class="tag">LLM</span>
        </div>

        <label for="pg-set-provider">Generation engine</label>
        <select id="pg-set-provider">
          <option value="gemini" ${llm.provider === 'gemini' ? 'selected' : ''}>Google Gemini first (recommended)</option>
          <option value="auto" ${llm.provider === 'auto' ? 'selected' : ''}>Auto — Gemini, then Ollama proxy, then offline</option>
          <option value="ollama" ${llm.provider === 'ollama' ? 'selected' : ''}>Prefer Ollama after Gemini fails</option>
          <option value="extractive" ${llm.provider === 'extractive' ? 'selected' : ''}>Offline extractive RAG (no API key)</option>
        </select>

        <h3 style="margin:18px 0 10px;font-size:14px;color:var(--ink)">Google Gemini</h3>
        <label for="pg-set-gemini-key">Gemini API key</label>
        <input id="pg-set-gemini-key" type="password" autocomplete="off" placeholder="AIzaSy..." value="${esc(llm.geminiKey)}">
        <p class="mini"><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">Get a key from Google AI Studio</a></p>

        <label for="pg-set-gemini-model">Gemini model</label>
        <select id="pg-set-gemini-model">
          <option value="gemini-3.8-flash" selected>gemini-3.8-flash</option>
        </select>

        <h3 style="margin:22px 0 10px;font-size:14px;color:var(--ink)">Ollama (cloud or local)</h3>
        <label for="pg-set-ollama-url">Ollama base URL</label>
        <input id="pg-set-ollama-url" type="url" placeholder="https://ollama.com/api or http://localhost:11434" value="${esc(llm.ollamaUrl)}">

        <label for="pg-set-ollama-model">Ollama model</label>
        <input id="pg-set-ollama-model" type="text" placeholder="gpt-oss:20b" value="${esc(llm.ollamaModel)}">
        <p class="mini">Examples: gpt-oss:20b, qwen3:4b</p>

        <label for="pg-set-ollama-token">Ollama bearer token (optional)</label>
        <input id="pg-set-ollama-token" type="password" autocomplete="off" placeholder="For Ollama Cloud" value="${esc(llm.ollamaToken)}">
      </section>

      <div>
        <section class="card">
          <div class="card-head">
            <div>
              <h2>Viva practice</h2>
            </div>
            <span class="tag amber">VIVA</span>
          </div>
          ${canEditViva ? `
            <label for="pg-set-viva-mode">Generation mode</label>
            <select id="pg-set-viva-mode">
              <option value="demo" ${s.vivaMode === 'demo' ? 'selected' : ''}>Submission coach (offline)</option>
              <option value="ollama" ${s.vivaMode === 'ollama' ? 'selected' : ''}>Ollama (live)</option>
            </select>

            <label for="pg-set-viva-endpoint">Ollama endpoint (viva)</label>
            <input id="pg-set-viva-endpoint" type="url" value="${esc(s.vivaOllama.url || 'http://localhost:11434')}">

            <label for="pg-set-viva-model">Model name (viva)</label>
            <input id="pg-set-viva-model" type="text" value="${esc(s.vivaOllama.model || 'qwen3:4b')}">
          ` : `<p class="mini">Workspace state is not loaded.</p>`}
        </section>

        <section class="card" style="margin-top:18px">
          <h2>Browser settings</h2>
          <div class="actions" style="margin-top:16px">
            <button type="button" class="btn" onclick="window.saveAiSettingsPage()">Save all settings</button>
            <button type="button" class="btn secondary" onclick="window.clearAiSettingsKeys()">Clear API keys only</button>
          </div>
        </section>
      </div>
    </div>`;
}

window.saveAiSettingsPage = function(){
  const provider = document.getElementById('pg-set-provider')?.value || 'gemini';
  const geminiKey = document.getElementById('pg-set-gemini-key')?.value || '';
  const geminiModel = 'gemini-3.8-flash';
  const ollamaUrl = document.getElementById('pg-set-ollama-url')?.value || '';
  const ollamaModel = document.getElementById('pg-set-ollama-model')?.value || '';
  const ollamaToken = document.getElementById('pg-set-ollama-token')?.value || '';

  if(typeof window.saveLLMSettings === 'function'){
    window.saveLLMSettings({ provider, geminiKey, geminiModel, ollamaUrl, ollamaModel, ollamaToken });
  } else {
    localStorage.setItem('pg_llm_provider', provider);
    localStorage.setItem('pg_gemini_key', geminiKey.trim());
    localStorage.setItem('pg_gemini_model', geminiModel.trim());
    localStorage.setItem('pg_ollama_url', ollamaUrl.trim());
    localStorage.setItem('pg_ollama_model', ollamaModel.trim());
    localStorage.setItem('pg_ollama_token', ollamaToken.trim());
  }

  if(typeof state !== 'undefined'){
    const mode = document.getElementById('pg-set-viva-mode')?.value;
    if(mode === 'demo' || mode === 'ollama') state.mode = mode;
    const endpoint = (document.getElementById('pg-set-viva-endpoint')?.value || '').trim();
    const vivaModel = (document.getElementById('pg-set-viva-model')?.value || '').trim();
    if(endpoint){
      try{
        const u = new URL(endpoint);
        if(['http:','https:'].includes(u.protocol)){
          state.ollama = state.ollama || {};
          state.ollama.url = u.origin;
          state.ollama.model = vivaModel || state.ollama.model || 'qwen3:4b';
        }
      }catch(_){}
    } else if(vivaModel){
      state.ollama = state.ollama || {};
      state.ollama.model = vivaModel;
    }
    if(typeof save === 'function') save();
  }

  if(typeof toast === 'function') toast('AI settings saved locally.');
  if(typeof render === 'function') render();
};

window.clearAiSettingsKeys = function(){
  if(!confirm('Remove Gemini and Ollama API keys from this browser? Models and provider choice stay unless you change them.')) return;
  localStorage.removeItem('pg_gemini_key');
  localStorage.removeItem('pg_ollama_token');
  if(typeof toast === 'function') toast('API keys cleared from localStorage.');
  if(typeof render === 'function') render();
};
