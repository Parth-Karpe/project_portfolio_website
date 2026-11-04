/**
 * Portfolio RAG & LLM Engine
 * Designed for Vercel low-compute hosting:
 * - 100% In-Browser RAG Indexing & BM25 Relevance Retrieval (0 Vercel server CPU)
 * - Vercel Serverless / Client Cloud LLM (Gemini 1.5 Flash / Groq)
 * - Instant Built-in Smart Extractive RAG Fallback (works offline with 0 API keys)
 * - Clickable Citation Deep-Linking to Portfolio Tables and Diagrams
 */

(function(){
  'use strict';

  // State for active chat
  let activeChatTeamId = null;
  let chatMessages = [];
  let isChatOpen = false;
  let isGenerating = false;

  // Retrieve stored settings
  function getLLMSettings(){
    return {
      provider: localStorage.getItem('pg_llm_provider') || 'auto', // 'auto', 'vercel_api', 'gemini', 'ollama', 'extractive'
      geminiKey: localStorage.getItem('pg_gemini_key') || '',
      geminiModel: localStorage.getItem('pg_gemini_model') || 'gemini-3.8-flash',
      ollamaUrl: localStorage.getItem('pg_ollama_url') || 'https://ollama.com/api',
      ollamaModel: localStorage.getItem('pg_ollama_model') || 'gpt-oss:20b',
      ollamaToken: localStorage.getItem('pg_ollama_token') || ''
    };
  }

  function saveLLMSettings(settings){
    if(settings.provider) localStorage.setItem('pg_llm_provider', settings.provider);
    if(settings.geminiKey !== undefined) localStorage.setItem('pg_gemini_key', settings.geminiKey.trim());
    if(settings.geminiModel !== undefined) localStorage.setItem('pg_gemini_model', settings.geminiModel.trim());
    if(settings.ollamaUrl !== undefined) localStorage.setItem('pg_ollama_url', settings.ollamaUrl.trim());
    if(settings.ollamaModel !== undefined) localStorage.setItem('pg_ollama_model', settings.ollamaModel.trim());
    if(settings.ollamaToken !== undefined) localStorage.setItem('pg_ollama_token', settings.ollamaToken.trim());
  }

  // ==========================================
  // 1. KNOWLEDGE BASE EXTRACTOR & CHUNKER
  // ==========================================
  function buildTeamKnowledgeBase(teamId){
    const cleanId = String(teamId || '').replace(/^[A-Za-z]-/, '');
    const staticTeam = (typeof window !== 'undefined' && window.STATIC_TEAMS_DATA && (
      window.STATIC_TEAMS_DATA[teamId] ||
      window.STATIC_TEAMS_DATA[cleanId] ||
      window.STATIC_TEAMS_DATA[String(cleanId).padStart(2,'0')] ||
      window.STATIC_TEAMS_DATA[String(parseInt(cleanId, 10))]
    )) || null;

    const t = (typeof activeTeam === 'function' ? activeTeam() : null) || (window.state?.teams || []).find(x => x.id === teamId) || {};
    const title = staticTeam?.title || t.title || 'Project Portfolio';
    const theme = staticTeam?.theme || t.topic || 'Specialization Theme';
    const guide = staticTeam?.guide || t.faculty || 'Faculty Guide';
    const members = staticTeam?.members || t.members || [];
    const st0 = staticTeam?.stage0 || {};
    const st1 = staticTeam?.stage1 || {};

    const chunks = [];

    // Chunk: Overview & Team Members
    const membersDesc = members.map(m => `${m.name} (USN: ${m.usn || 'N/A'}, Role: ${m.role || 'Member'}, Skills: ${m.skills || 'N/A'}, Contribution: ${m.contribution || 'N/A'})`).join('; ');
    chunks.push({
      id: 'team-meta',
      elementId: 'sec-problem',
      type: 'Metadata',
      label: 'Team Overview & Roster',
      citation: `[Team ${teamId} Overview]`,
      text: `Project Title: ${title}. Specialization Theme: ${theme}. Faculty Guide: ${guide}. Academic Year: 2026–27. Team Members: ${membersDesc}.`
    });

    // Chunk: Stage 0 Problem Statement
    if(st0.problem){
      chunks.push({
        id: 'stage0-problem',
        elementId: 'sec-problem',
        type: 'Problem Definition',
        label: 'Problem Statement & Needs',
        citation: '[Stage 0: Problem Statement]',
        text: `Problem Statement: ${st0.problem} Target Stakeholders: ${st0.targetUsers || 'Students, Faculty, and Administrators'}. Baseline Friction: ${st0.baselineFriction || 'Manual ad-hoc coordination'}.`
      });
    }

    // Chunk: Stage 0 Objectives & Success Criteria
    if(st0.objectives){
      chunks.push({
        id: 'stage0-objectives',
        elementId: 'sec-objectives',
        type: 'Objectives',
        label: 'Project Objectives & Targets',
        citation: '[Stage 0: Objectives]',
        text: `Objectives: ${st0.objectives}. Measurable Target 1: ${st0.success1 || 'Zero validation errors'}. Measurable Target 2: ${st0.success2 || 'Optimized runtime performance'}.`
      });
    }

    // Chunk: Table 0.1 Foundation Course Integration
    if(st0.coursesTable && st0.coursesTable.length){
      const coursesText = st0.coursesTable.map(c => `${c.course} (Role: ${c.role}): ${c.concepts}`).join('. ');
      chunks.push({
        id: 'table-0-1',
        elementId: 'table-courses',
        type: 'Foundations',
        label: 'Foundation Course Integration (Table 0.1)',
        citation: '[Table 0.1: Courses]',
        text: `Academic Foundation Course Integration (Table 0.1): ${coursesText}`
      });
    }

    // Chunk: Table 0.2 Conceptual Pipeline Flow
    if(st0.pipelineTable && st0.pipelineTable.length){
      const pipe = st0.pipelineTable[0];
      chunks.push({
        id: 'table-0-2',
        elementId: 'table-pipeline',
        type: 'Pipeline',
        label: 'Conceptual Pipeline Flow (Table 0.2)',
        citation: '[Table 0.2: Pipeline]',
        text: `Conceptual Pipeline (Table 0.2): Input: ${pipe.input}. Assessment: ${pipe.assessment}. User Action: ${pipe.userAction}. Output: ${pipe.output}.`
      });
    }

    // Chunk: Table 0.3 Conceptual Workflow Engines
    if(st0.enginesTable && st0.enginesTable.length){
      st0.enginesTable.forEach(e => {
        chunks.push({
          id: `engine-${e.id}`,
          elementId: `portfolio-engine-${e.id}`,
          type: 'Engine',
          label: `Engine ${e.id}: ${e.name || e.engine}`,
          citation: `[Engine ${e.id}]`,
          text: `Engine ${e.id} (${e.name || e.engine}): ${e.desc}`
        });
      });
    }

    // Chunk: Table 0.4 Project Scope (In-Scope & Out-of-Scope)
    const inScope = (st0.scopeInTable || []).map(s => `#${s.num}: ${s.item}`).join('; ');
    const outScope = (st0.scopeOutTable || []).map(s => `#${s.num}: ${s.item} (Reason: ${s.reason})`).join('; ');
    if(inScope || outScope){
      chunks.push({
        id: 'table-0-4',
        elementId: 'table-scope',
        type: 'Scope',
        label: 'Scope Boundaries (Table 0.4)',
        citation: '[Table 0.4: Scope Boundaries]',
        text: `In-Scope Items: ${inScope}. Out-of-Scope Exclusions: ${outScope}.`
      });
    }

    // Chunk: Table 0.5 Feasibility
    if(st0.feasibilityTable && st0.feasibilityTable.length){
      const feasText = st0.feasibilityTable.map(f => `${f.aspect}: ${f.assessment}`).join('; ');
      chunks.push({
        id: 'table-0-5',
        elementId: 'table-feasibility',
        type: 'Feasibility',
        label: 'Feasibility Assessment (Table 0.5)',
        citation: '[Table 0.5: Feasibility]',
        text: `Feasibility & Resource Assessment (Table 0.5): ${feasText}`
      });
    }

    // Chunk: Diagrams
    if(st0.useCaseImage){
      chunks.push({
        id: 'diag-usecase',
        elementId: 'portfolio-diagram-usecase',
        type: 'Diagram',
        label: 'Contextual Use Case Diagram (Figure 0.1)',
        citation: '[Figure 0.1: Use Case Diagram]',
        text: `Figure 0.1 illustrates the complete UML Use Case Diagram for ${title}, capturing user actors, system boundaries, and core operational interactions.`
      });
    }
    if(st0.asIsWorkflowImage){
      chunks.push({
        id: 'diag-asis',
        elementId: 'portfolio-diagram-asis',
        type: 'Diagram',
        label: 'AS-IS Swimlane Workflow Diagram (Figure 0.2)',
        citation: '[Figure 0.2: AS-IS Workflow]',
        text: `Figure 0.2 illustrates the AS-IS Process Swimlane Workflow Diagram for current manual booking and scheduling processes.`
      });
    }

    // Chunk: Functional Requirements (Individual high-precision chunks)
    (st1.frTable || []).forEach(fr => {
      chunks.push({
        id: `fr-${fr.id}`,
        elementId: `portfolio-fr-${fr.id}`,
        type: 'Functional Requirement',
        label: `${fr.id}: ${fr.desc}`,
        citation: `[${fr.id}]`,
        text: `Functional Requirement ${fr.id}: ${fr.desc} Priority: ${fr.priority || 'Mandatory'}. Source Need: ${fr.sourceNeed || 'Gate 0 Need'}.`
      });
    });

    // Chunk: Non-Functional Requirements (Individual chunks)
    (st1.nfrTable || []).forEach(nfr => {
      chunks.push({
        id: `nfr-${nfr.id}`,
        elementId: `portfolio-nfr-${nfr.id}`,
        type: 'Non-Functional Requirement',
        label: `${nfr.id}: ${nfr.desc}`,
        citation: `[${nfr.id}]`,
        text: `Non-Functional Requirement ${nfr.id} (${nfr.cat || 'Quality'}): ${nfr.desc} Measurable Target: ${nfr.target || 'Defined benchmark'}.`
      });
    });

    // Chunk: Stage 1 Architecture & Workflow
    if(st1.archDesc || st1.workflowDesc){
      chunks.push({
        id: 'stage1-arch-workflow',
        elementId: 'sec-arch',
        type: 'Architecture & Workflow',
        label: 'System Architecture & Workflow Pipeline',
        citation: '[Stage 1: Architecture & Workflow]',
        text: `System Architecture: ${st1.archDesc || 'Multi-tier modular architecture'}. Operational Workflow Pipeline: ${st1.workflowDesc || 'Step-by-step pipeline execution'}.`
      });
    }

    // Chunk: Tech Stack
    if(st1.techStack){
      const stackText = Array.isArray(st1.techStack) 
        ? st1.techStack.map(s => `${s.layer}: ${s.tech}`).join('; ')
        : String(st1.techStack);
      chunks.push({
        id: 'stage1-techstack',
        elementId: 'sec-techstack',
        type: 'Tech Stack',
        label: 'Technologies & Tools',
        citation: '[Tech Stack]',
        text: `System Tech Stack: ${stackText}`
      });
    }

    // Chunk: Test Suite Matrix
    if(st1.testCases && st1.testCases.length){
      const testText = st1.testCases.map(tc => `${tc.id} (Maps to ${tc.req}): ${tc.desc} -> Acceptance Criteria: ${tc.criteria} (Status: ${tc.status})`).join('; ');
      chunks.push({
        id: 'stage1-testcases',
        elementId: 'table-testsuite',
        type: 'Testing',
        label: 'Acceptance Test Suite Matrix (Table 1.3)',
        citation: '[Table 1.3: Test Matrix]',
        text: `Acceptance Verification Test Cases: ${testText}`
      });
    }

    return { teamId, title, theme, guide, chunks };
  }

  // ==========================================
  // 2. BM25 / RELEVANCE RETRIEVAL ENGINE
  // ==========================================
  function tokenize(str){
    return (str.toLowerCase().match(/[a-z0-9_-]+/g) || []).filter(w => w.length > 1);
  }

  function retrieveRelevantChunks(query, kb, topK = 4){
    const qTokens = tokenize(query);
    if(!qTokens.length) return kb.chunks.slice(0, topK);

    // Score chunks
    const scored = kb.chunks.map(chunk => {
      let score = 0;
      const cText = chunk.text.toLowerCase();
      const cLabel = chunk.label.toLowerCase();
      const cId = chunk.id.toLowerCase();

      qTokens.forEach(token => {
        // Exact requirement / engine tag match bonus
        if(cId === token || cId.includes(token)) score += 15;
        if(token.startsWith('fr-') && cText.includes(token)) score += 20;
        if(token.startsWith('nfr-') && cText.includes(token)) score += 20;

        // Label match
        if(cLabel.includes(token)) score += 5;

        // Full word match vs substring match
        const regex = new RegExp(`\\b${token}\\b`, 'i');
        if(regex.test(cText)) score += 3;
        else if(cText.includes(token)) score += 1;
      });

      // Semantic domain boosts
      if(/title|project name|theme|who|member|lead|usn|student|contribut|guide|faculty/i.test(query) && chunk.type === 'Metadata') score += 25;
      if(/requirement|fr\b|functional/i.test(query) && chunk.type === 'Functional Requirement') score += 6;
      if(/performance|latency|quality|target|nfr\b|security/i.test(query) && chunk.type === 'Non-Functional Requirement') score += 6;
      if(/engine|module|component/i.test(query) && chunk.type === 'Engine') score += 12;
      if(/out.of.scope|in.scope|scope|boundary/i.test(query) && chunk.type === 'Scope') score += 20;
      if(/course|foundation|curriculum/i.test(query) && chunk.type === 'Foundations') score += 15;
      if(/test|criteria|verification|pass/i.test(query) && chunk.type === 'Testing') score += 12;
      if(/diagram|figure|flowchart|swimlane|usecase/i.test(query) && chunk.type === 'Diagram') score += 15;
      if(/architecture|workflow|pipeline/i.test(query) && chunk.type === 'Architecture & Workflow') score += 20;
      if(/problem|friction|pain|need/i.test(query) && chunk.type === 'Problem Definition') score += 15;

      return { chunk, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const valid = scored.filter(s => s.score > 0);
    // If top chunk is an overwhelming match (e.g. Scope Table 0.4 or Tech Stack), don't pollute with weak chunks
    if(valid.length > 1 && valid[0].score >= 25 && valid[1].score < 10){
      return [Object.assign({}, valid[0].chunk, { score: valid[0].score })];
    }
    return valid.slice(0, topK).map(s => Object.assign({}, s.chunk, { score: s.score }));
  }

  // ==========================================
  // 3. SMART EXTRACTIVE RAG SYNTHESIZER
  // (Zero Compute / Offline Fallback)
  // ==========================================
  function synthesizeExtractiveAnswer(query, retrievedChunks, kb){
    if(!retrievedChunks || !retrievedChunks.length){
      return {
        answer: `I could not find specific documentation in **Team ${kb.teamId}'s** portfolio for that query. Try asking about their **Problem Statement**, **Functional Requirements (FRs)**, **Non-Functional Requirements (NFRs)**, **Engines**, or **Scope**!`,
        citations: []
      };
    }

    const citations = retrievedChunks.map(c => ({
      citation: c.citation,
      elementId: c.elementId,
      label: c.label
    }));

    const bullets = retrievedChunks.map(c => {
      return `• **${c.label}** ${c.citation}:\n  ${c.text}`;
    }).join('\n\n');

    const answer = `Based on the verified portfolio submission for **${kb.title}** (Team ${kb.teamId}):\n\n${bullets}\n\n*Click on any citation pill above to jump directly to that section in the portfolio.*`;

    return { answer, citations };
  }

  // ==========================================
  // 4. CLOUD & LOCAL LLM CLIENTS
  // ==========================================
  async function queryLLM(query, retrievedChunks, kb){
    const settings = getLLMSettings();

    // Prepare grounded system instruction
    const systemPrompt = `You are the AI technical pair programmer and viva assistant for the project "${kb.title}" (Team ${kb.teamId}) under Theme "${kb.theme}".
Your answers MUST be strictly grounded in the verified context provided below.
Rules:
1. Cite sources with exact tags like [FR-01], [NFR-04], [Engine E1], [Table 0.1], [Stage 0: Problem Statement] whenever making claims.
2. If the user asks about something not in the context, clearly state that it is not documented.
3. Keep your answers concise, structured (using bullet points), and professional for university evaluation.

VERIFIED CONTEXT FROM PORTFOLIO:
${retrievedChunks.map(c => `Source ${c.citation} (${c.label}):\n${c.text}`).join('\n\n')}`;

    // 1. Try Vercel Serverless Function `/api/chat`
    if(settings.provider === 'auto' || settings.provider === 'vercel_api'){
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: query,
            systemInstruction: systemPrompt
          })
        });
        if(response.ok){
          const data = await response.json();
          if(data && data.text && !data.useFallback){
            return {
              answer: data.text,
              citations: retrievedChunks.map(c => ({ citation: c.citation, elementId: c.elementId, label: c.label })),
              provider: 'Gemini 1.5 Flash (via Vercel Serverless)'
            };
          }
        }
      } catch(e) {
        // Vercel serverless function not present (e.g. running local python http.server) -> proceed to next option
      }
    }

    // 2. Direct Google Gemini API (if user entered client key in settings)
    const geminiKey = settings.geminiKey;
    if(geminiKey && (settings.provider === 'auto' || settings.provider === 'gemini')){
      const targetModel = (settings.geminiModel || 'gemini-3.8-flash').trim();
      let lastError = null;

      const candidateEndpoints = [
        { url: `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${geminiKey}`, label: targetModel },
        { url: `https://generativelanguage.googleapis.com/v1/models/${targetModel}:generateContent?key=${geminiKey}`, label: `${targetModel} (v1)` },
        { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, label: 'Gemini 2.0 Flash' },
        { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, label: 'Gemini 2.5 Flash' },
        { url: `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, label: 'Gemini 2.0 Flash (v1)' },
        { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, label: 'Gemini 1.5 Flash' }
      ];

      for (const cand of candidateEndpoints) {
        try {
          const response = await fetch(cand.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `${systemPrompt}\n\nUSER QUESTION:\n${query}\n\nStrict Rules: Answer only using verified portfolio facts above. Include citations like [FR-01], [Table 0.1].` }]
              }],
              generationConfig: { temperature: 0.2, maxOutputTokens: 900 }
            })
          });

          if(response.ok){
            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if(text){
              return {
                answer: text,
                citations: retrievedChunks.map(c => ({ citation: c.citation, elementId: c.elementId, label: c.label })),
                provider: `${cand.label} (Direct API)`
              };
            }
          } else {
            const errData = await response.json().catch(() => ({}));
            lastError = errData.error?.message || `HTTP ${response.status} ${response.statusText}`;
            console.warn(`Gemini endpoint (${cand.label}) error:`, lastError);
            if(response.status === 404){
              continue;
            } else {
              break;
            }
          }
        } catch(e) {
          lastError = e.message;
          console.warn(`Fetch error for ${cand.label}:`, e);
        }
      }

      if(lastError){
        console.warn('Gemini calls failed, proceeding to Ollama Cloud fallback:', lastError);
      }
    }

    // 3. Ollama Cloud / Local Fallback
    // Automatically runs if provider is 'auto', 'ollama', or if Gemini API call failed
    const rawOllamaUrl = settings.ollamaUrl || 'https://ollama.com/api';
    const cleanUrl = rawOllamaUrl.replace(/\/+$/, '');
    if(cleanUrl && (settings.provider === 'auto' || settings.provider === 'ollama' || settings.provider === 'gemini')){
      try {
        const headers = { 'Content-Type': 'application/json' };
        if(settings.ollamaToken){
          headers['Authorization'] = settings.ollamaToken.startsWith('Bearer ') ? settings.ollamaToken : `Bearer ${settings.ollamaToken}`;
        }
        const oModel = settings.ollamaModel || 'gpt-oss:20b';
        let answerText = null;

        // Try /api/chat first (standard for Ollama Cloud models like gpt-oss:20b)
        try {
          const chatEndpoint = cleanUrl.endsWith('/api') ? `${cleanUrl}/chat` : cleanUrl.includes('/api/') ? cleanUrl : `${cleanUrl}/api/chat`;
          const chatRes = await fetch(chatEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              model: oModel,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `USER QUESTION: ${query}\nStrict Rules: Answer only using verified portfolio facts above. Include citations like [FR-01], [Table 0.1].` }
              ],
              stream: false
            })
          });
          if(chatRes.ok){
            const data = await chatRes.json();
            answerText = data.message?.content || data.response;
          }
        } catch(e) {
          console.warn('Ollama chat endpoint attempt failed:', e);
        }

        // Fallback to /api/generate if /api/chat did not succeed
        if(!answerText){
          const genEndpoint = cleanUrl.endsWith('/api') ? `${cleanUrl}/generate` : cleanUrl.includes('/api/') ? cleanUrl : `${cleanUrl}/api/generate`;
          const genRes = await fetch(genEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              model: oModel,
              prompt: `${systemPrompt}\n\nUSER QUESTION: ${query}\nStrict Rules: Answer only using verified portfolio facts above. Include citations like [FR-01], [Table 0.1].\nANSWER:`,
              stream: false
            })
          });
          if(genRes.ok){
            const data = await genRes.json();
            answerText = data.response || data.message?.content;
          }
        }

        if(answerText){
          const isCloud = cleanUrl.includes('ollama.com') || (!cleanUrl.includes('localhost') && !cleanUrl.includes('127.0.0.1'));
          return {
            answer: answerText,
            citations: retrievedChunks.map(c => ({ citation: c.citation, elementId: c.elementId, label: c.label })),
            provider: `${isCloud ? 'Ollama Cloud' : 'Local Ollama'} (${oModel})`
          };
        }
      } catch(e) {
        console.warn('Ollama Cloud connection attempt failed:', e);
      }
    }

    // 4. Default Smart Extractive RAG Synthesizer (Instant & Zero-Compute)
    const fallback = synthesizeExtractiveAnswer(query, retrievedChunks, kb);
    fallback.provider = 'Smart Extractive RAG (Zero-Compute)';
    return fallback;
  }

  // ==========================================
  // 5. CITATION DEEP-LINKING SCROLLER
  // ==========================================
  window.scrollToPortfolioCitation = function(elementId){
    if(!elementId) return;
    const el = document.getElementById(elementId);
    if(el){
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add glowing pulse highlight
      el.classList.add('citation-target-pulse');
      setTimeout(() => {
        el.classList.remove('citation-target-pulse');
      }, 2500);
      if(typeof toast === 'function') toast(`Scrolled to ${elementId}`);
    } else {
      console.warn('Portfolio element not found:', elementId);
    }
  };

  // Convert raw text citations like [FR-01] or [Table 0.1] into clickable chips
  function formatResponseWithClickableCitations(text, citations){
    if(!text) return '';
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Map citation text to elementId
    const citationMap = {};
    (citations || []).forEach(c => {
      citationMap[c.citation] = c.elementId;
    });

    // Replace [FR-XX], [NFR-XX], [Engine EX], [Table X.X], [Figure X.X] with clickable links
    formatted = formatted.replace(/\[(FR-\d+|NFR-\d+|Engine\s+E\d+|Table\s+\d+\.\d+|Figure\s+\d+\.\d+|Stage\s+\d+[^\]]*)\]/gi, (match, tag) => {
      let elemId = citationMap[match];
      if(!elemId){
        if(/FR-(\d+)/i.test(tag)) elemId = `portfolio-fr-${tag.toUpperCase()}`;
        else if(/NFR-(\d+)/i.test(tag)) elemId = `portfolio-nfr-${tag.toUpperCase()}`;
        else if(/Engine\s+(E\d+)/i.test(tag)) elemId = `portfolio-engine-${RegExp.$1.toUpperCase()}`;
        else if(/Figure\s+0\.1/i.test(tag)) elemId = 'portfolio-diagram-usecase';
        else if(/Figure\s+0\.2/i.test(tag)) elemId = 'portfolio-diagram-asis';
        else if(/Figure\s+1\.1/i.test(tag)) elemId = 'portfolio-diagram-arch';
        else if(/Table\s+0\.1/i.test(tag)) elemId = 'table-courses';
        else if(/Table\s+0\.2/i.test(tag)) elemId = 'table-pipeline';
        else if(/Table\s+0\.4/i.test(tag)) elemId = 'table-scope';
        else if(/Table\s+0\.5/i.test(tag)) elemId = 'table-feasibility';
        else if(/Table\s+1\.3/i.test(tag)) elemId = 'table-testsuite';
        else if(/Problem/i.test(tag)) elemId = 'sec-problem';
        else if(/Objectives/i.test(tag)) elemId = 'sec-objectives';
        else if(/Architecture/i.test(tag)) elemId = 'sec-arch';
      }

      if(elemId){
        return `<button type="button" class="citation-pill" onclick="window.scrollToPortfolioCitation('${elemId}')" title="Click to view in Portfolio">${match}</button>`;
      }
      return `<span class="citation-pill static">${match}</span>`;
    });

    // Simple markdown format: bold and bullet lists
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n\n/g, '<br><br>');
    formatted = formatted.replace(/\n• /g, '<br>• ');
    formatted = formatted.replace(/\n- /g, '<br>• ');

    return formatted;
  }

  // ==========================================
  // 6. UI RENDERING & CHAT DRAWER
  // ==========================================
  function renderChatDrawer(){
    let container = document.getElementById('portfolio-chat-container');
    if(!container){
      container = document.createElement('div');
      container.id = 'portfolio-chat-container';
      document.body.appendChild(container);
    }

    const kb = buildTeamKnowledgeBase(activeChatTeamId);
    const settings = getLLMSettings();

    container.innerHTML = `
      <!-- Floating Action Button (FAB) -->
      <button id="portfolio-chat-fab" class="portfolio-chat-fab ${isChatOpen ? 'active' : ''}" onclick="window.togglePortfolioChat()" title="Ask Team AI Assistant" aria-label="Toggle Team AI Chatbot">
        <span class="chat-fab-icon">${isChatOpen ? '✕' : '💬'}</span>
        <span class="chat-fab-text">Ask Portfolio AI</span>
        <span class="chat-fab-badge">Team ${esc(kb.teamId)}</span>
      </button>

      <!-- Expandable Chat Drawer -->
      <div id="portfolio-chat-drawer" class="portfolio-chat-drawer ${isChatOpen ? 'open' : ''}" role="dialog" aria-label="Team AI Chat Assistant">
        <header class="portfolio-chat-header">
          <div class="chat-header-info">
            <span class="chat-header-dot"></span>
            <div>
              <strong style="display:block;font-size:13.5px;color:var(--ink)">Team ${esc(kb.teamId)} AI Assistant</strong>
              <small style="color:var(--muted);font-size:11px">${esc(kb.title.length > 36 ? kb.title.slice(0,34)+'…' : kb.title)}</small>
            </div>
          </div>
          <div class="chat-header-actions">
            <button class="chat-icon-btn" onclick="window.openChatSettingsModal()" title="AI Settings (API Key / Local Model)">⚙️</button>
            <button class="chat-icon-btn" onclick="window.clearPortfolioChat()" title="Clear Chat History">🗑️</button>
            <button class="chat-icon-btn" onclick="window.togglePortfolioChat()" title="Minimize Chat">✕</button>
          </div>
        </header>

        <!-- Quick Suggestions Scroller -->
        <div class="portfolio-chat-suggestions">
          <button class="prompt-pill" onclick="window.submitQuickPrompt('What are the core functional requirements?')">📋 Functional Requirements</button>
          <button class="prompt-pill" onclick="window.submitQuickPrompt('What are the non-functional quality targets?')">🎯 Non-Functional Targets</button>
          <button class="prompt-pill" onclick="window.submitQuickPrompt('Who is working on each engine and what are their roles?')">👥 Team & Engines</button>
          <button class="prompt-pill" onclick="window.submitQuickPrompt('What is in-scope vs out-of-scope for this project?')">🛡️ Scope Boundaries</button>
          <button class="prompt-pill" onclick="window.submitQuickPrompt('Explain the system architecture and workflow pipeline')">🏛️ Architecture & Flow</button>
        </div>

        <!-- Messages Thread -->
        <div id="portfolio-chat-messages" class="portfolio-chat-messages" aria-live="polite">
          ${chatMessages.length === 0 ? `
            <div class="chat-empty-state">
              <div class="chat-empty-icon">🤖</div>
              <strong style="color:var(--ink);font-size:13px">Ask anything about Team ${esc(kb.teamId)}'s Project</strong>
              <p style="color:var(--muted);font-size:11.5px;margin:4px 0 0">Grounded exclusively in this portfolio's requirements, architecture, tables, and evidence.</p>
            </div>
          ` : chatMessages.map(m => `
            <div class="chat-bubble-wrap ${m.role === 'user' ? 'user' : 'assistant'}">
              <div class="chat-bubble">
                <div class="chat-bubble-content">${m.html}</div>
                ${m.provider ? `<div class="chat-bubble-meta"><small>${esc(m.provider)}</small></div>` : ''}
              </div>
            </div>
          `).join('')}
          ${isGenerating ? `
            <div class="chat-bubble-wrap assistant">
              <div class="chat-bubble typing">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Input Area -->
        <form class="portfolio-chat-input-form" onsubmit="event.preventDefault(); window.handleChatSubmit();">
          <textarea 
            id="portfolio-chat-input" 
            placeholder="Ask about Team ${esc(kb.teamId)}'s requirements, engines, architecture…" 
            rows="1" 
            maxlength="1000"
            onkeydown="if(event.key==='Enter' && !event.shiftKey){ event.preventDefault(); window.handleChatSubmit(); }"
          ></textarea>
          <button type="submit" id="portfolio-chat-send-btn" class="chat-send-btn" ${isGenerating ? 'disabled' : ''} aria-label="Send message">
            ➤
          </button>
        </form>
      </div>

      <!-- Settings Modal Popover -->
      <div id="portfolio-chat-settings-modal" class="chat-settings-modal" style="display:none">
        <div class="chat-settings-card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <h3 style="margin:0;font-size:14px;color:var(--ink)">AI Chatbot Settings</h3>
            <button class="chat-icon-btn" onclick="window.closeChatSettingsModal()">✕</button>
          </div>
          <p class="mini" style="margin:0 0 12px;color:var(--muted)">Designed for zero-compute Vercel hosting. Select your generation engine:</p>
          
          <label style="font-size:11.5px;font-weight:600;display:block;margin-bottom:4px">Generation Provider</label>
          <select id="chat-set-provider" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid var(--line);background:var(--surface);margin-bottom:10px;font-size:12px">
            <option value="auto" ${settings.provider==='auto'?'selected':''}>Auto (Gemini → Ollama Cloud → Offline Fallback)</option>
            <option value="ollama" ${settings.provider==='ollama'?'selected':''}>Ollama Cloud (gpt-oss:20b, gemma4:31b, etc.)</option>
            <option value="gemini" ${settings.provider==='gemini'?'selected':''}>Google Gemini</option>
            <option value="extractive" ${settings.provider==='extractive'?'selected':''}>Smart Extractive RAG (Zero-Compute Offline)</option>
          </select>

          <label style="font-size:11.5px;font-weight:600;display:block;margin-bottom:4px">Google Gemini API Key (Optional)</label>
          <input id="chat-set-gemini-key" type="password" placeholder="AIzaSy... (optional, saves to your browser)" value="${esc(settings.geminiKey)}" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid var(--line);background:var(--surface);margin-bottom:8px;font-size:12px">
          
          <label style="font-size:11.5px;font-weight:600;display:block;margin-bottom:4px">Gemini Model Identifier</label>
          <input id="chat-set-gemini-model" type="text" placeholder="gemini-3.8-flash" value="${esc(settings.geminiModel || 'gemini-3.8-flash')}" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid var(--line);background:var(--surface);margin-bottom:8px;font-size:12px">
          
          <!-- Ollama Cloud Fallback Section -->
          <div style="border-top:1px solid var(--line);margin:10px 0 8px;padding-top:10px">
            <strong style="font-size:12px;display:block;margin-bottom:6px;color:var(--brand)">☁️ Ollama Cloud (Free Usage Models)</strong>
            
            <label style="font-size:11px;font-weight:600;display:block;margin-bottom:3px">Ollama Cloud Endpoint URL</label>
            <input id="chat-set-ollama-url" type="text" placeholder="https://ollama.com/api" value="${esc(settings.ollamaUrl || 'https://ollama.com/api')}" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid var(--line);background:var(--surface);margin-bottom:6px;font-size:12px">

            <label style="font-size:11px;font-weight:600;display:block;margin-bottom:3px">Cloud Model</label>
            <input list="ollama-free-models" id="chat-set-ollama-model" type="text" placeholder="gpt-oss:20b" value="${esc(settings.ollamaModel || 'gpt-oss:20b')}" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid var(--line);background:var(--surface);margin-bottom:6px;font-size:12px">
            <datalist id="ollama-free-models">
              <option value="gpt-oss:20b">gpt-oss:20b (Recommended - Fast, high reasoning)</option>
              <option value="gemma4:31b">gemma4:31b</option>
              <option value="gpt-oss:120b">gpt-oss:120b (Heavy reasoning)</option>
              <option value="nemotron-3-nano:30b">nemotron-3-nano:30b</option>
              <option value="nemotron-3-super">nemotron-3-super</option>
              <option value="nemotron-3-ultra">nemotron-3-ultra</option>
              <option value="beam">beam</option>
            </datalist>

            <label style="font-size:11px;font-weight:600;display:block;margin-bottom:3px">Ollama API Key / Bearer Token</label>
            <input id="chat-set-ollama-token" type="password" placeholder="Bearer ... or your Ollama API key" value="${esc(settings.ollamaToken || '')}" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid var(--line);background:var(--surface);margin-bottom:4px;font-size:12px">
            <small style="color:var(--muted);display:block;margin-bottom:8px;font-size:10.5px">Connects to <code>https://ollama.com/api</code> using your free usage credits.</small>
          </div>

          <div style="display:flex;justify-content:flex-end;gap:8px">
            <button class="btn secondary" style="padding:4px 12px;font-size:11.5px" onclick="window.closeChatSettingsModal()">Cancel</button>
            <button class="btn" style="padding:4px 12px;font-size:11.5px" onclick="window.saveChatSettingsFromModal()">Save Settings</button>
          </div>
        </div>
      </div>
    `;

    // Scroll to bottom of message thread
    const thread = document.getElementById('portfolio-chat-messages');
    if(thread) thread.scrollTop = thread.scrollHeight;
  }

  // ==========================================
  // 7. WINDOW ACTIONS & EVENT HANDLERS
  // ==========================================
  window.togglePortfolioChat = function(){
    isChatOpen = !isChatOpen;
    renderChatDrawer();
    if(isChatOpen){
      setTimeout(() => {
        const input = document.getElementById('portfolio-chat-input');
        if(input) input.focus();
      }, 100);
    }
  };

  window.clearPortfolioChat = function(){
    chatMessages = [];
    renderChatDrawer();
  };

  window.openChatSettingsModal = function(){
    const modal = document.getElementById('portfolio-chat-settings-modal');
    if(modal) modal.style.display = 'flex';
  };

  window.closeChatSettingsModal = function(){
    const modal = document.getElementById('portfolio-chat-settings-modal');
    if(modal) modal.style.display = 'none';
  };

  window.saveChatSettingsFromModal = function(){
    const provider = document.getElementById('chat-set-provider')?.value || 'auto';
    const geminiKey = document.getElementById('chat-set-gemini-key')?.value || '';
    const geminiModel = document.getElementById('chat-set-gemini-model')?.value || 'gemini-3.8-flash';
    const ollamaUrl = document.getElementById('chat-set-ollama-url')?.value || 'https://ollama.com/api';
    const ollamaModel = document.getElementById('chat-set-ollama-model')?.value || 'gpt-oss:20b';
    const ollamaToken = document.getElementById('chat-set-ollama-token')?.value || '';
    saveLLMSettings({ provider, geminiKey, geminiModel, ollamaUrl, ollamaModel, ollamaToken });
    window.closeChatSettingsModal();
    if(typeof toast === 'function') toast('AI settings saved!');
    renderChatDrawer();
  };

  window.submitQuickPrompt = function(promptText){
    const input = document.getElementById('portfolio-chat-input');
    if(input) input.value = promptText;
    window.handleChatSubmit();
  };

  window.handleChatSubmit = async function(){
    const input = document.getElementById('portfolio-chat-input');
    if(!input || isGenerating) return;
    const query = input.value.trim();
    if(!query) return;

    input.value = '';
    isChatOpen = true;

    // Push User message
    chatMessages.push({
      role: 'user',
      text: query,
      html: esc(query)
    });
    isGenerating = true;
    renderChatDrawer();

    try {
      const kb = buildTeamKnowledgeBase(activeChatTeamId);
      const retrieved = retrieveRelevantChunks(query, kb, 4);
      const result = await queryLLM(query, retrieved, kb);

      const formattedHtml = formatResponseWithClickableCitations(result.answer, result.citations);

      chatMessages.push({
        role: 'assistant',
        text: result.answer,
        html: formattedHtml,
        provider: result.provider
      });
    } catch(err) {
      chatMessages.push({
        role: 'assistant',
        text: 'Sorry, I encountered an error processing your question.',
        html: `<strong>Connection Notice:</strong> ${esc(err.message || 'Error executing request.')}`
      });
    } finally {
      isGenerating = false;
      renderChatDrawer();
    }
  };

  // Mount / Unmount API for Department router
  window.mountPortfolioChat = function(teamId){
    activeChatTeamId = teamId;
    renderChatDrawer();
  };

  window.unmountPortfolioChat = function(){
    const container = document.getElementById('portfolio-chat-container');
    if(container) container.remove();
    isChatOpen = false;
  };

  // Programmatic API & Testing Namespace
  window.PortfolioRAG = {
    buildTeamKnowledgeBase,
    retrieveRelevantChunks,
    synthesizeExtractiveAnswer,
    formatResponseWithClickableCitations,
    queryLLM,
    getLLMSettings,
    saveLLMSettings
  };

})();
