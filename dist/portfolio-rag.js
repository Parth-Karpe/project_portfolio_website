/**
 * Portfolio RAG & AI Mentor Engine
 * Designed for academic viva preparation & gate verification:
 * - 100% In-Browser Pure KB-Driven Indexing & Relevance Retrieval (0 Vercel server CPU)
 * - Deterministic Seeded Viva Quiz Generation with Distractor Sampling & Grading
 * - Dynamic Hint Indexer with Symmetric Stemmer (Zero domain hardcoding)
 * - 5-Stage Intent Router with Raw Query Regex & Base Context Synthesis
 * - Clickable Citation Deep-Linking to Portfolio Tables and Diagrams
 * - At-Most-One /api/chat probe with localStorage caching
 */

(function(){
  'use strict';

  // State for active chat
  let activeChatTeamId = null;
  let chatMessages = [];
  let isChatOpen = false;
  let isGenerating = false;
  let activeQuizState = null; // Stored per active team

  // ==========================================
  // 0. SETTINGS & AT-MOST-ONE PROBE
  // ==========================================
  function getLLMSettings(){
    return {
      provider: localStorage.getItem('pg_llm_provider') || 'auto', // 'auto', 'vercel_api', 'gemini', 'ollama', 'extractive'
      geminiKey: localStorage.getItem('pg_gemini_key') || '',
      geminiModel: localStorage.getItem('pg_gemini_model') || 'gemini-1.5-flash',
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

  // Network fetch with strict timeout to prevent indefinite loading
  async function fetchWithTimeout(url, options = {}, timeoutMs = 4500){
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch(err){
      clearTimeout(timer);
      throw err;
    }
  }

  // At-most-one /api/chat probe cached in localStorage for 1 hour
  let memoryApiAvailable = null;
  async function checkApiChatAvailability(){
    if(memoryApiAvailable !== null) return memoryApiAvailable;
    const settings = getLLMSettings();
    if(settings.provider === 'extractive'){
      memoryApiAvailable = false;
      return false;
    }
    const stored = localStorage.getItem('pg_api_available');
    const storedTime = parseInt(localStorage.getItem('pg_api_checked_time') || '0', 10);
    const ONE_HOUR = 3600000;
    if(stored !== null && (Date.now() - storedTime < ONE_HOUR)){
      memoryApiAvailable = (stored === 'true');
      return memoryApiAvailable;
    }

    try {
      const res = await fetchWithTimeout('/api/chat', { method: 'OPTIONS' }, 1500);
      memoryApiAvailable = res.ok;
    } catch(e) {
      memoryApiAvailable = false;
    }
    try {
      localStorage.setItem('pg_api_available', String(memoryApiAvailable));
      localStorage.setItem('pg_api_checked_time', String(Date.now()));
    } catch(_) {}
    return memoryApiAvailable;
  }

  // Helper: escape HTML
  function esc(str){
    if(str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ==========================================
  // 1. STEMMER & STOPWORDS & SYNONYMS
  // ==========================================
  // Symmetric suffix stemmer: ensures identical reduction on query and index tokens
  function stemWord(word){
    if(!word || typeof word !== 'string') return '';
    const w = word.toLowerCase();
    if(w.length < 3) return w;
    return w.replace(/(?:ing|es|s|ed|ment|able)$/i, '');
  }

  // Comprehensive stopword list including generic project inquiries
  const STOPWORDS = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'it', 'its', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'what', 'which', 'who', 'how', 'when', 'where', 'why', 'do', 'does', 'did', 'can', 'could', 'should', 'would',
    'project', 'team', 'system', 'portfolio', 'about', 'tell', 'me', 'give', 'we', 'our', 'us', 'show', 'explain',
    'please', 'there', 'this', 'that', 'these', 'those', 'from', 'have', 'has', 'had', 'i', 'my', 'their'
  ]);

  // Generic category synonyms ONLY (strictly no domain-specific project hardcoding)
  const CATEGORY_SYNONYMS = {
    'fast': 'performance', 'speed': 'performance', 'latency': 'performance', 'slow': 'performance',
    'throughput': 'performance', 'quick': 'performance', 'quickly': 'performance', 'seconds': 'performance',
    'clash': 'accuracy', 'overlap': 'accuracy', 'duplicate': 'accuracy', 'conflict': 'accuracy', 'clashes': 'accuracy',
    'secure': 'security', 'privacy': 'security', 'auth': 'security', 'authorization': 'security',
    'authentication': 'security', 'rbac': 'security'
  };

  function tokenize(str){
    if(!str) return [];
    return (str.toLowerCase().match(/[a-z0-9_-]+/g) || [])
      .filter(w => w.length > 1 && !STOPWORDS.has(w));
  }

  // ==========================================
  // 2. KNOWLEDGE BASE EXTRACTOR & CHUNKER
  // ==========================================
  function buildTeamKnowledgeBase(teamId){
    const cleanId = String(teamId || '').replace(/^[A-Za-z]-/, '');
    const staticTeam = (typeof window !== 'undefined' && window.STATIC_TEAMS_DATA && (
      window.STATIC_TEAMS_DATA[teamId] ||
      window.STATIC_TEAMS_DATA[cleanId] ||
      window.STATIC_TEAMS_DATA[String(cleanId).padStart(2,'0')] ||
      window.STATIC_TEAMS_DATA[String(parseInt(cleanId, 10))]
    )) || null;

    const t = (typeof activeTeam === 'function' ? activeTeam() : null) || (typeof window !== 'undefined' && window.state?.teams || []).find(x => x.id === teamId) || {};
    const title = staticTeam?.title || t.title || 'Project Portfolio';
    const theme = staticTeam?.theme || t.topic || 'Specialization Theme';
    const guide = staticTeam?.guide || t.faculty || 'Faculty Guide';
    const members = staticTeam?.members || t.members || [];
    const st0 = staticTeam?.stage0 || {};
    const st1 = staticTeam?.stage1 || {};

    const chunks = [];
    const citationRegistry = {};

    function registerChunk(chunk){
      chunks.push(chunk);
      if(chunk.citation && chunk.elementId){
        const norm = chunk.citation.toLowerCase().trim();
        citationRegistry[norm] = chunk.elementId;
        citationRegistry[chunk.citation] = chunk.elementId;

        // Register short alias without subtitle e.g. [Table 1.3: Test Matrix] -> [Table 1.3]
        const colonMatch = chunk.citation.match(/^\[([^:\]]+)/);
        if(colonMatch){
          const shortTag = `[${colonMatch[1].trim()}]`;
          citationRegistry[shortTag.toLowerCase()] = chunk.elementId;
          citationRegistry[shortTag] = chunk.elementId;
        }

        // Register unpadded/padded number aliases e.g. [FR-01] <-> [FR-1]
        const numMatch = chunk.citation.match(/^\[(FR|NFR)-0*(\d+)\]$/i);
        if(numMatch){
          const prefix = numMatch[1].toUpperCase();
          const unpadded = `[${prefix}-${numMatch[2]}]`;
          const padded = `[${prefix}-${numMatch[2].padStart(2, '0')}]`;
          citationRegistry[unpadded.toLowerCase()] = chunk.elementId;
          citationRegistry[padded.toLowerCase()] = chunk.elementId;
        }
      }
    }

    // Chunk: Overview & Team Members
    const membersDesc = members.map(m => `${m.name} (USN: ${m.usn || 'N/A'}, Role: ${m.role || 'Member'}, Skills: ${m.skills || 'N/A'}, Contribution: ${m.contribution || 'N/A'})`).join('; ');
    registerChunk({
      id: 'team-meta',
      elementId: 'sec-problem',
      type: 'Metadata',
      label: 'Team Overview & Roster',
      citation: `[Team ${teamId} Overview]`,
      text: `Project Title: ${title}. Specialization Theme: ${theme}. Faculty Guide: ${guide}. Academic Year: 2026–27. Team Members: ${membersDesc}.`
    });

    // Chunk: Stage 0 Problem Statement
    if(st0.problem){
      registerChunk({
        id: 'stage0-problem',
        elementId: 'sec-problem',
        type: 'Problem Definition',
        label: 'Problem Statement & Needs',
        citation: '[Stage 0: Problem Statement]',
        text: `Problem Statement: ${st0.problem} Target Stakeholders: ${st0.targetUsers || 'Students, Faculty, and Administrators'}. Baseline Friction: ${st0.baselineFriction || 'Manual ad-hoc coordination'}.`
      });
    }

    // Chunk: Stage 0 Objectives (Fix BUG-2: handle Array vs String)
    if(st0.objectives){
      const objFormatted = Array.isArray(st0.objectives)
        ? st0.objectives.map(o => `• ${o}`).join('\n')
        : String(st0.objectives);
      registerChunk({
        id: 'stage0-objectives',
        elementId: 'sec-objectives',
        type: 'Objectives',
        label: 'Project Objectives & Targets',
        citation: '[Stage 0: Objectives]',
        text: `Project Objectives:\n${objFormatted}\nMeasurable Target 1: ${st0.success1 || 'Zero validation errors'}. Measurable Target 2: ${st0.success2 || 'Optimized runtime performance'}.`
      });
    }

    // Chunk: Table 0.1 Foundation Course Integration
    if(st0.coursesTable && st0.coursesTable.length){
      const coursesLines = st0.coursesTable.map(c => `• ${c.course} (${c.role}): ${c.concepts}`).join('\n');
      registerChunk({
        id: 'table-0-1',
        elementId: 'table-courses',
        type: 'Foundations',
        label: 'Foundation Courses (Table 0.1)',
        citation: '[Table 0.1]',
        text: `Academic Foundation Course Integration:\n${coursesLines}`
      });
    }

    // Chunk: Table 0.2 Conceptual Pipeline Flow (Fix BUG-1: pipe.processing || pipe.assessment)
    if(st0.pipelineTable && st0.pipelineTable.length){
      const pipe = st0.pipelineTable[0];
      const proc = pipe.processing || pipe.assessment || 'Conceptual Stage Flow';
      registerChunk({
        id: 'table-0-2',
        elementId: 'table-pipeline',
        type: 'Pipeline',
        label: 'Conceptual Pipeline Flow (Table 0.2)',
        citation: '[Table 0.2]',
        text: `Input: ${pipe.input || 'N/A'}\nProcessing / Assessment: ${proc}\nUser Action: ${pipe.userAction || 'N/A'}\nOutput: ${pipe.output || 'N/A'}`
      });
    }

    // Chunk: Table 0.3 Conceptual Workflow Engines Summary
    if(st0.enginesTable && st0.enginesTable.length){
      const engineSummary = st0.enginesTable.map(e => `• Engine ${e.id} (${e.name}): ${e.desc}`).join('\n');
      registerChunk({
        id: 'table-0-3',
        elementId: 'table-engines',
        type: 'Engine Summary',
        label: 'Conceptual Workflow Engines (Table 0.3)',
        citation: '[Table 0.3]',
        text: `Conceptual Workflow Engines:\n${engineSummary}`
      });

      // Individual Engine Chunks
      st0.enginesTable.forEach(e => {
        registerChunk({
          id: `engine-${e.id}`.toLowerCase(),
          elementId: `portfolio-engine-${e.id}`,
          type: 'Engine',
          label: `Engine ${e.id}: ${e.name}`,
          citation: `[Engine ${e.id}]`,
          text: `Engine ${e.id} (${e.name}): ${e.desc}`
        });
      });
    }

    // Chunk: Table 0.4 Project Scope (In-Scope & Out-of-Scope)
    const scopeLines = [];
    if(st0.scopeInTable && st0.scopeInTable.length){
      scopeLines.push('In-Scope Deliverables:');
      st0.scopeInTable.forEach(s => scopeLines.push(`• ${s.item}`));
    }
    if(st0.scopeOutTable && st0.scopeOutTable.length){
      if(scopeLines.length) scopeLines.push('');
      scopeLines.push('Out-of-Scope Exclusions:');
      st0.scopeOutTable.forEach(s => scopeLines.push(`• ${s.item} (${s.reason || 'Design Boundary'})`));
    }
    if(scopeLines.length){
      registerChunk({
        id: 'table-0-4',
        elementId: 'table-scope',
        type: 'Scope',
        label: 'Scope Boundaries (Table 0.4)',
        citation: '[Table 0.4]',
        text: scopeLines.join('\n')
      });
    }

    // Chunk: Table 0.5 Feasibility Assessment
    if(st0.feasibilityTable && st0.feasibilityTable.length){
      const feasLines = st0.feasibilityTable.map(f => `• ${f.aspect}: ${f.assessment}`).join('\n');
      registerChunk({
        id: 'table-0-5',
        elementId: 'table-feasibility',
        type: 'Feasibility',
        label: 'Feasibility Assessment (Table 0.5)',
        citation: '[Table 0.5]',
        text: `Feasibility & Resource Assessment:\n${feasLines}`
      });
    }

    // Chunk: Diagrams
    if(st0.useCaseImage){
      registerChunk({
        id: 'diag-usecase',
        elementId: 'portfolio-diagram-usecase',
        type: 'Diagram',
        label: 'Contextual Use Case Diagram (Figure 0.1)',
        citation: '[Figure 0.1: Use Case Diagram]',
        text: `Figure 0.1 illustrates the complete UML Use Case Diagram for ${title}, capturing user actors, system boundaries, and core operational interactions.`
      });
    }
    if(st0.asIsWorkflowImage){
      registerChunk({
        id: 'diag-asis',
        elementId: 'portfolio-diagram-asis',
        type: 'Diagram',
        label: 'AS-IS Swimlane Workflow Diagram (Figure 0.2)',
        citation: '[Figure 0.2: AS-IS Workflow]',
        text: `Figure 0.2 illustrates the AS-IS Process Swimlane Workflow Diagram for current manual baseline processes.`
      });
    }

    // Chunk: Functional Requirements
    (st1.frTable || []).forEach(fr => {
      registerChunk({
        id: `fr-${fr.id}`.toLowerCase(),
        elementId: `portfolio-fr-${fr.id}`,
        type: 'Functional Requirement',
        label: fr.id,
        citation: `[${fr.id}]`,
        text: `${fr.id}: ${fr.desc} Priority: ${fr.priority || 'Mandatory'}. Source Need: ${fr.sourceNeed || 'Gate 0 Need'}.`
      });
    });

    // Chunk: Non-Functional Requirements
    (st1.nfrTable || []).forEach(nfr => {
      registerChunk({
        id: `nfr-${nfr.id}`.toLowerCase(),
        elementId: `portfolio-nfr-${nfr.id}`,
        type: 'Non-Functional Requirement',
        label: nfr.id,
        citation: `[${nfr.id}]`,
        text: `${nfr.id} (${nfr.cat || nfr.category || 'Quality'}): ${nfr.desc} Measurable Target: ${nfr.target || 'Defined benchmark'}.`
      });
    });

    // Chunk: Stage 1 Architecture & Workflow
    if(st1.archDesc || st1.workflowDesc){
      registerChunk({
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
      registerChunk({
        id: 'stage1-techstack',
        elementId: 'sec-techstack',
        type: 'Tech Stack',
        label: 'Technologies & Tools',
        citation: '[Tech Stack]',
        text: `System Tech Stack: ${stackText}`
      });
    }

    // Chunk: Test Suite Matrix (handles st1.testCases or st1.acceptanceTable)
    const testCasesList = (st1.testCases && st1.testCases.length)
      ? st1.testCases
      : (st1.acceptanceTable && st1.acceptanceTable.length)
      ? st1.acceptanceTable.map(a => ({
          id: `TC-${String(a.req).padStart(2, '0')}`,
          req: `FR-${String(a.req).padStart(2, '0')}`,
          desc: `Verification of FR-${a.req}`,
          criteria: a.criteria,
          status: 'Pass'
        }))
      : [];

    if(testCasesList.length){
      const testText = testCasesList.map(tc => `${tc.id} (Maps to ${tc.req}): ${tc.desc} -> Acceptance Criteria: ${tc.criteria} (Status: ${tc.status || 'Pass'})`).join('; ');
      registerChunk({
        id: 'table-testsuite',
        elementId: 'table-testsuite',
        type: 'Testing',
        label: 'Acceptance Test Suite Matrix (Table 1.3)',
        citation: '[Table 1.3: Test Matrix]',
        text: `Acceptance Verification Test Cases: ${testText}`
      });
    }

    // Build Dynamic Hint Index: tokens organically present in active team data
    // No hardcoding: scope tokens extracted strictly from scopeOutTable and scopeInTable
    const dynamicHintIndex = [];
    chunks.forEach(chunk => {
      const words = tokenize(chunk.text + ' ' + chunk.label);
      const stemmedTokens = new Set(words.map(w => stemWord(w)));
      dynamicHintIndex.push({
        chunkId: chunk.id,
        stemmedTokens
      });
    });

    return {
      teamId,
      title,
      theme,
      guide,
      members,
      st0,
      st1,
      chunks,
      citationRegistry,
      dynamicHintIndex
    };
  }

  // ==========================================
  // 3. EXECUTIVE BASE CONTEXT SYNTHESIZER
  // ==========================================
  function generateTeamBaseContext(kb){
    const st0 = kb.st0 || {};
    const st1 = kb.st1 || {};
    const roster = (kb.members || []).map(m => `**${m.name}** (${m.role || 'Member'})`).join(', ') || 'Team Members';

    const objLines = Array.isArray(st0.objectives)
      ? st0.objectives.slice(0, 3).map(o => `• ${o}`).join('\n')
      : (st0.objectives ? `• ${st0.objectives}` : '• Deliver gate requirements with zero friction.');

    const engineList = (st0.enginesTable || []).map(e => `• **Engine ${e.id} (${e.name})**: ${e.desc}`).join('\n');
    const inScopeList = (st0.scopeInTable || []).slice(0, 3).map(s => `• ${s.item}`).join('\n');
    const outScopeList = (st0.scopeOutTable || []).slice(0, 3).map(s => `• ${s.item}`).join('\n');

    const stackText = Array.isArray(st1.techStack)
      ? st1.techStack.map(s => `${s.layer}: ${s.tech}`).join(' | ')
      : (st1.techStack || 'Modern Full-Stack Architecture');

    const testCount = (st1.testCases || []).length;

    const answer = `### 🎓 Team ${kb.teamId} Executive Base Context\n\n` +
      `**Project Title**: ${kb.title}\n` +
      `**Theme**: ${kb.theme} | **Faculty Guide**: ${kb.guide}\n` +
      `**Team Roster**: ${roster} [Team ${kb.teamId} Overview]\n\n` +
      `#### 🎯 Core Problem & Objectives\n` +
      `${st0.problem || 'Standard academic problem statement'} [Stage 0: Problem Statement]\n\n` +
      `**Key Objectives** [Stage 0: Objectives]:\n${objLines}\n\n` +
      `#### ⚙️ Conceptual Pipeline & Engines [Table 0.2]\n` +
      `${engineList || 'Modular multi-engine architecture'} [Table 0.3]\n\n` +
      `#### 🛡️ Scope Boundaries [Table 0.4]\n` +
      `**In-Scope Deliverables**:\n${inScopeList || '• All core gate deliverables'}\n\n` +
      `**Out-of-Scope Exclusions**:\n${outScopeList || '• External physical hardware and third-party commercial deployments'}\n\n` +
      `#### 🏗️ Architecture & Verification\n` +
      `• **Architecture**: ${st1.archDesc ? st1.archDesc.slice(0, 160) + '…' : 'Multi-tier modular architecture'} [Stage 1: Architecture & Workflow]\n` +
      `• **Tech Stack**: ${stackText} [Tech Stack]\n` +
      `• **Verification Matrix**: ${testCount} formal acceptance test cases defined [Table 1.3: Test Matrix]\n\n` +
      `*Tip: Click any citation pill above to jump to that verified deliverable in the portfolio, or click **Viva Quiz** below to practice viva defense questions.*`;

    return {
      answer,
      citations: kb.chunks.slice(0, 6).map(c => ({ citation: c.citation, elementId: c.elementId, label: c.label })),
      provider: 'AI Mentor (Team Executive Base Context)'
    };
  }

  // ==========================================
  // 4. UNIFIED RETRIEVER & CALIBRATED SCORER
  // ==========================================
  function retrieveRelevantChunks(query, kb, topK = 4){
    const rawTokens = tokenize(query);
    if(!rawTokens.length) return [];

    // Stem query tokens and check generic category synonyms
    const queryStemmed = rawTokens.map(t => {
      const syn = CATEGORY_SYNONYMS[t] || t;
      return stemWord(syn);
    });

    const scored = kb.chunks.map((chunk, idx) => {
      let score = 0;
      const cText = chunk.text.toLowerCase();
      const cLabel = chunk.label.toLowerCase();
      const cId = chunk.id.toLowerCase();
      const chunkHints = kb.dynamicHintIndex[idx]?.stemmedTokens || new Set();

      rawTokens.forEach((token, i) => {
        const stemmed = queryStemmed[i];

        // Exact ID word-boundary match (Fix BUG-4: prevent 'is' matching 'diag-asis')
        const idRegex = new RegExp(`(^|-|_)${token}($|-|_)`, 'i');
        if(idRegex.test(cId)) score += 20;

        // Label word-boundary match
        const labelRegex = new RegExp(`\\b${token}\\b`, 'i');
        if(labelRegex.test(cLabel)) score += 8;

        // Dynamic hint stem match (purely from that team's data)
        if(chunkHints.has(stemmed)) score += 12;

        // Body text word-boundary match
        const textRegex = new RegExp(`\\b${token}\\b`, 'i');
        if(textRegex.test(cText)) score += 4;
        else if(cText.includes(token)) score += 1;
      });

      // Semantic domain boosts
      if(/title|theme|who|member|lead|usn|student|contribut|guide|faculty/i.test(query) && chunk.type === 'Metadata') score += 20;
      if(/requirement|fr\b|functional/i.test(query) && chunk.type === 'Functional Requirement') score += 8;
      if(/performance|latency|quality|target|nfr\b|security/i.test(query) && chunk.type === 'Non-Functional Requirement') score += 8;
      if(/engine|module|component/i.test(query) && (chunk.type === 'Engine' || chunk.type === 'Engine Summary')) score += 12;
      if(/out.of.scope|in.scope|scope|boundary|exclusion/i.test(query) && chunk.type === 'Scope') score += 20;
      if(/course|foundation|curriculum/i.test(query) && chunk.type === 'Foundations') score += 15;
      if(/test|criteria|verification|matrix/i.test(query) && chunk.type === 'Testing') score += 14;
      if(/diagram|figure|flowchart|swimlane|usecase/i.test(query) && chunk.type === 'Diagram') score += 15;
      if(/architecture|workflow|pipeline/i.test(query) && chunk.type === 'Architecture & Workflow') score += 18;
      if(/problem|friction|pain|need/i.test(query) && chunk.type === 'Problem Definition') score += 15;

      return { chunk, score };
    });

    scored.sort((a, b) => b.score - a.score);
    // Single calibrated threshold: >= 12
    const valid = scored.filter(s => s.score >= 12);
    if(!valid.length) return [];

    // Overwhelming top match
    if(valid.length > 1 && valid[0].score >= 35 && valid[1].score < 15){
      return [Object.assign({}, valid[0].chunk, { score: valid[0].score })];
    }
    return valid.slice(0, topK).map(s => Object.assign({}, s.chunk, { score: s.score }));
  }

  // ==========================================
  // 5. 5-STAGE INTENT ROUTER
  // ==========================================
  function classifyAndRouteIntent(query, kb){
    const cleanQuery = query.trim();

    // Shortcut A: Quiz Intent
    if(/(?:^|\b)(?:viva\s*quiz|quiz(?:\s*me)?|start\s*quiz|test\s*me|mock\s*viva|practice\s*quiz)\b/i.test(cleanQuery)){
      return { intent: 'QUIZ_TRIGGER' };
    }

    // Shortcut B: Overview / Context Intent
    if(/(?:^|\b)(?:overview|summary|what\s+is\s+this\s+(?:project|team)|explain\s+(?:this\s+)?project|give\s+me\s+context|base\s+context|who\s+are\s+the\s+team\s+members)\b/i.test(cleanQuery)){
      return { intent: 'BASE_CONTEXT' };
    }

    // Stage 1: Explicit ID regex on RAW query (preserves decimal numbers)
    const tableMatch = cleanQuery.match(/\b(?:table)\s*(\d+\.\d+)\b/i);
    if(tableMatch){
      const tNum = tableMatch[1].replace('.', '-');
      const directChunk = kb.chunks.find(c => c.id === `table-${tNum}` || c.label.toLowerCase().includes(`table ${tableMatch[1]}`));
      if(directChunk){
        return { intent: 'EXPLICIT_ENTITY', chunks: [directChunk] };
      }
    }

    const figMatch = cleanQuery.match(/\b(?:figure|fig)\s*(\d+\.\d+)\b/i);
    if(figMatch){
      const directChunk = kb.chunks.find(c => c.label.toLowerCase().includes(`figure ${figMatch[1]}`));
      if(directChunk){
        return { intent: 'EXPLICIT_ENTITY', chunks: [directChunk] };
      }
    }

    const engineMatch = cleanQuery.match(/\b(?:engine\s*(e\d+)|e([1-4]))\b/i);
    if(engineMatch){
      const eId = (engineMatch[1] || `e${engineMatch[2]}`).toLowerCase();
      const directChunk = kb.chunks.find(c => c.id === `engine-${eId}` || c.label.toLowerCase().includes(eId));
      if(directChunk){
        return { intent: 'EXPLICIT_ENTITY', chunks: [directChunk] };
      }
    }

    const frMatch = cleanQuery.match(/\b(fr-\d+)\b/i);
    if(frMatch){
      const frId = frMatch[1].toLowerCase();
      const directChunk = kb.chunks.find(c => c.id === frId || c.label.toLowerCase() === frId);
      if(directChunk){
        return { intent: 'EXPLICIT_ENTITY', chunks: [directChunk] };
      }
    }

    const nfrMatch = cleanQuery.match(/\b(nfr-\d+)\b/i);
    if(nfrMatch){
      const nfrId = nfrMatch[1].toLowerCase();
      const directChunk = kb.chunks.find(c => c.id === nfrId || c.label.toLowerCase() === nfrId);
      if(directChunk){
        return { intent: 'EXPLICIT_ENTITY', chunks: [directChunk] };
      }
    }

    // Stage 2: Active Quiz answer intercept
    // Handled in handleChatSubmit if activeQuizState exists

    // Stage 3: Heuristic Scorer with Dynamic Index & Calibrated Threshold
    const retrieved = retrieveRelevantChunks(cleanQuery, kb, 4);
    if(retrieved.length > 0){
      return { intent: 'RETRIEVAL', chunks: retrieved };
    }

    // Stage 4: Vague / Low-Relevance fallback to Team Executive Base Context
    return { intent: 'BASE_CONTEXT' };
  }

  // ==========================================
  // 6. DETERMINISTIC SEEDED VIVA QUIZ ENGINE
  // ==========================================
  // Seeded PRNG using Linear Congruential Generator
  function createPRNG(seedNum){
    let s = Math.abs(seedNum) % 2147483647;
    if (s <= 0) s += 2147483646;
    return function(){
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  // Token Jaccard overlap to filter out near-duplicate distractors
  function calcTokenOverlap(str1, str2){
    const s1 = new Set(tokenize(str1).map(stemWord));
    const s2 = new Set(tokenize(str2).map(stemWord));
    if(!s1.size || !s2.size) return 0;
    let intersect = 0;
    s1.forEach(tok => { if(s2.has(tok)) intersect++; });
    const union = new Set([...s1, ...s2]).size;
    return intersect / union;
  }

  function generateVivaQuiz(kb, customSeed = null){
    const sessionSeed = customSeed !== null ? customSeed : (Math.floor(Date.now() / 1000) % 100000);
    const rng = createPRNG(sessionSeed + (parseInt(kb.teamId, 10) || 7) * 31);
    const st0 = kb.st0 || {};
    const st1 = kb.st1 || {};
    const questions = [];

    // Helper to sample array items with seed
    function sampleItems(arr, count, excludeItem = null){
      const pool = arr.filter(x => x !== excludeItem);
      for(let i = pool.length - 1; i > 0; i--){
        const j = Math.floor(rng() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return pool.slice(0, count);
    }

    // Question 1: Scope Boundary (Out-of-Scope Exclusion)
    if(st0.scopeOutTable && st0.scopeOutTable.length && st0.scopeInTable && st0.scopeInTable.length){
      const outIdx = Math.floor(rng() * st0.scopeOutTable.length);
      const targetOut = st0.scopeOutTable[outIdx];
      const correctText = targetOut.item;

      // Sample distinct in-scope items as distractors with token overlap check
      const rawInItems = st0.scopeInTable.map(s => s.item);
      const filteredDistractors = [];
      for(const item of rawInItems){
        if(calcTokenOverlap(correctText, item) < 0.6){
          filteredDistractors.push(item);
        }
      }

      const sampledDistractors = sampleItems(filteredDistractors.length >= 2 ? filteredDistractors : rawInItems, 3, correctText);
      if(sampledDistractors.length >= 1){
        questions.push({
          id: 'q1-scope',
          type: 'Scope Boundary',
          prompt: `Which of the following deliverables is explicitly classified as OUT-OF-SCOPE for Team ${kb.teamId}'s ${kb.title} project?`,
          correctAnswer: correctText,
          distractors: sampledDistractors,
          citation: '[Table 0.4]',
          elementId: 'table-scope',
          explanation: `[Table 0.4] explicitly designates "${correctText}" as out-of-scope (${targetOut.reason || 'Design Boundary'}).`,
          defenseTip: `In viva defense, clearly articulate why "${correctText}" was excluded to prove disciplined project scope control without feature creep.`
        });
      }
    }

    // Question 2: Engine Responsibility
    if(st0.enginesTable && st0.enginesTable.length >= 2){
      const engIdx = Math.floor(rng() * st0.enginesTable.length);
      const targetEngine = st0.enginesTable[engIdx];
      const correctName = `Engine ${targetEngine.id}: ${targetEngine.name}`;
      const otherEngineNames = st0.enginesTable.filter(e => e.id !== targetEngine.id).map(e => `Engine ${e.id}: ${e.name}`);
      const sampledEngines = sampleItems(otherEngineNames, 3);

      questions.push({
        id: 'q2-engine',
        type: 'Engine Responsibility',
        prompt: `In the conceptual workflow architecture, which engine is directly responsible for: "${targetEngine.desc}"?`,
        correctAnswer: correctName,
        distractors: sampledEngines,
        citation: `[Engine ${targetEngine.id}]`,
        elementId: `portfolio-engine-${targetEngine.id}`,
        explanation: `[Engine ${targetEngine.id}] (${targetEngine.name}) handles this role in [Table 0.3].`,
        defenseTip: `When faculty ask how modules interact, explain the exact inputs and outputs that flow through Engine ${targetEngine.id}.`
      });
    }

    // Question 3: Requirement Traceability (Test Case -> FR)
    const rawTestList = (st1.testCases && st1.testCases.length)
      ? st1.testCases
      : (st1.acceptanceTable && st1.acceptanceTable.length)
      ? st1.acceptanceTable.map(a => ({
          id: `TC-${String(a.req).padStart(2, '0')}`,
          req: `FR-${String(a.req).padStart(2, '0')}`,
          desc: `Verification of FR-${a.req}`,
          criteria: a.criteria,
          status: 'Pass'
        }))
      : [];

    if(rawTestList.length && st1.frTable && st1.frTable.length){
      const tcIdx = Math.floor(rng() * rawTestList.length);
      const targetTC = rawTestList[tcIdx];
      const correctFR = targetTC.req || (st1.frTable[0] && st1.frTable[0].id) || 'FR-01';

      const allFRs = st1.frTable.map(f => f.id).filter(id => id !== correctFR);
      const sampledFRs = sampleItems(allFRs, 3);

      questions.push({
        id: 'q3-traceability',
        type: 'Traceability Matrix',
        prompt: `According to Acceptance Test Suite Matrix (Table 1.3), verification test case "${targetTC.id}" (${targetTC.desc}) maps directly to which Functional Requirement?`,
        correctAnswer: correctFR,
        distractors: sampledFRs,
        citation: '[Table 1.3: Test Matrix]',
        elementId: 'table-testsuite',
        explanation: `[Table 1.3: Test Matrix] verifies ${correctFR} via ${targetTC.id} with pass criteria: "${targetTC.criteria}".`,
        defenseTip: `Always cite Table 1.3 test criteria when defending how requirements are validated before deployment.`
      });
    }

    // Question 4: Quality Target Benchmark (NFR Target)
    if(st1.nfrTable && st1.nfrTable.length){
      const nfrIdx = Math.floor(rng() * st1.nfrTable.length);
      const targetNFR = st1.nfrTable[nfrIdx];
      const correctTarget = targetNFR.target || 'Sub-second response';

      const otherTargets = st1.nfrTable.filter(n => n.id !== targetNFR.id).map(n => n.target).filter(t => t && t !== correctTarget);
      // If not enough NFR targets, provide plausible benchmarks
      const backupTargets = ['< 100ms latency', 'Zero data conflicts', '99.9% uptime SLA', 'Strict RBAC enforcement'];
      const targetPool = otherTargets.length >= 2 ? otherTargets : [...otherTargets, ...backupTargets];
      const sampledTargets = sampleItems(targetPool, 3, correctTarget);

      questions.push({
        id: 'q4-nfr',
        type: 'Quality Benchmark',
        prompt: `Under ${targetNFR.cat || targetNFR.category || 'Quality Targets'} (${targetNFR.id}), what is the verified measurable benchmark for: "${targetNFR.desc}"?`,
        correctAnswer: correctTarget,
        distractors: sampledTargets,
        citation: `[${targetNFR.id}]`,
        elementId: `portfolio-nfr-${targetNFR.id}`,
        explanation: `[${targetNFR.id}] explicitly mandates the measurable target: "${correctTarget}".`,
        defenseTip: `Avoid subjective words like "fast" or "secure"; quote exact target figures from Table 1.2 to satisfy evaluation committee standards.`
      });
    }

    // Seeded shuffle of options for each question
    const finalQuestions = questions.map((q, qIndex) => {
      const qRng = createPRNG(sessionSeed + qIndex * 79 + 13);
      const allOptions = [q.correctAnswer, ...q.distractors];
      // Shuffle options deterministically
      for(let i = allOptions.length - 1; i > 0; i--){
        const j = Math.floor(qRng() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
      }
      const letters = ['A', 'B', 'C', 'D'];
      const optionsWithKeys = allOptions.slice(0, 4).map((opt, idx) => ({
        key: letters[idx],
        text: opt,
        isCorrect: opt === q.correctAnswer
      }));

      const correctOption = optionsWithKeys.find(o => o.isCorrect);

      return {
        id: q.id,
        index: qIndex,
        type: q.type,
        prompt: q.prompt,
        options: optionsWithKeys,
        correctKey: correctOption ? correctOption.key : 'A',
        correctAnswer: q.correctAnswer,
        citation: q.citation,
        elementId: q.elementId,
        explanation: q.explanation,
        defenseTip: q.defenseTip
      };
    });

    const quizState = {
      teamId: kb.teamId,
      seed: sessionSeed,
      questions: finalQuestions,
      userAnswers: finalQuestions.map(() => null),
      isEvaluated: false
    };

    // Persist in sessionStorage
    try {
      if(typeof sessionStorage !== 'undefined'){
        sessionStorage.setItem('pg_quiz_' + kb.teamId, JSON.stringify(quizState));
      }
    } catch(_) {}

    return quizState;
  }

  function evaluateVivaQuiz(quizState){
    let correctCount = 0;
    const details = quizState.questions.map((q, idx) => {
      const chosenKey = quizState.userAnswers[idx];
      const isCorrect = chosenKey && chosenKey.toUpperCase() === q.correctKey.toUpperCase();
      if(isCorrect) correctCount++;
      const chosenOption = q.options.find(o => o.key.toUpperCase() === (chosenKey || '').toUpperCase());

      return {
        questionId: q.id,
        prompt: q.prompt,
        type: q.type,
        chosenKey: chosenKey || 'Unanswered',
        chosenText: chosenOption ? chosenOption.text : 'No option chosen',
        correctKey: q.correctKey,
        correctText: q.correctAnswer,
        isCorrect: !!isCorrect,
        citation: q.citation,
        elementId: q.elementId,
        explanation: q.explanation,
        defenseTip: q.defenseTip
      };
    });

    const total = quizState.questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    let badge = 'Needs Review';
    if(percentage === 100) badge = 'Viva Defense Master • 100% Prepared';
    else if(percentage >= 75) badge = 'Solid Defense Preparedness • Committee Ready';
    else if(percentage >= 50) badge = 'Satisfactory Grounding • Review Weak Points';

    quizState.isEvaluated = true;
    quizState.evalResult = {
      correctCount,
      total,
      percentage,
      badge,
      details
    };

    try {
      if(typeof sessionStorage !== 'undefined'){
        sessionStorage.setItem('pg_quiz_' + quizState.teamId, JSON.stringify(quizState));
      }
    } catch(_) {}

    return quizState.evalResult;
  }

  // Restore quiz state from sessionStorage if available
  function getActiveQuizState(teamId){
    if(activeQuizState && activeQuizState.teamId === teamId) return activeQuizState;
    try {
      if(typeof sessionStorage !== 'undefined'){
        const saved = sessionStorage.getItem('pg_quiz_' + teamId);
        if(saved){
          activeQuizState = JSON.parse(saved);
          return activeQuizState;
        }
      }
    } catch(_) {}
    return null;
  }

  // ==========================================
  // 7. CITATION FORMATTER & DEEP LINKER
  // ==========================================
  window.scrollToPortfolioCitation = function(elementId){
    if(!elementId) return;
    const el = document.getElementById(elementId);
    if(el){
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('citation-target-pulse');
      setTimeout(() => {
        el.classList.remove('citation-target-pulse');
      }, 2500);
      if(typeof toast === 'function') toast(`Scrolled to ${elementId}`);
    } else {
      console.warn('Portfolio element not found:', elementId);
    }
  };

  // Convert raw text citations into clickable buttons using dynamic registry
  function formatResponseWithClickableCitations(text, kb){
    if(!text) return '';
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const registry = kb?.citationRegistry || {};

    // Match any [tag]
    formatted = formatted.replace(/\[([^\]]+)\]/g, (match, tag) => {
      const norm = match.toLowerCase().trim();
      const elemId = registry[norm] || registry[match];

      if(elemId){
        return `<button type="button" class="citation-pill" onclick="window.scrollToPortfolioCitation('${elemId}')" title="Click to view verified section">${match}</button>`;
      }
      // Flag unverified/hallucinated citation
      return `<span class="citation-pill static flagged" title="Citation not verified in current portfolio">${match}</span>`;
    });

    // Markdown styling
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/### (.*?)\n/g, '<div class="chat-heading-3">$1</div>');
    formatted = formatted.replace(/#### (.*?)\n/g, '<div class="chat-heading-4">$1</div>');
    formatted = formatted.replace(/\*([^\*\n]+)\*/g, '<span class="chat-italic-note">$1</span>');
    formatted = formatted.replace(/\n\n/g, '<div class="chat-spacer"></div>');
    // Fix BUG-7: close sub-bullet div properly
    formatted = formatted.replace(/\n\s{2,}[•\-] ([^\n]+)/g, '<div class="chat-subbullet">◦ $1</div>');
    formatted = formatted.replace(/\n[•\-] /g, '<div class="chat-bullet-break"></div>• ');
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
  }

  // ==========================================
  // 8. CLOUD & LOCAL LLM CLIENTS
  // ==========================================
  async function queryLLM(query, retrievedChunks, kb){
    const settings = getLLMSettings();

    // 0. Smart Extractive RAG if selected
    if(settings.provider === 'extractive'){
      return synthesizeExtractiveAnswer(query, retrievedChunks, kb);
    }

    const systemPrompt = `You are the AI Mentor and faculty viva preparation assistant for the academic project "${kb.title}" (Team ${kb.teamId}) under Theme "${kb.theme}".
Your answers MUST be strictly grounded in the verified context provided below.
Rules:
1. Cite sources with exact tags like [FR-01], [NFR-04], [Engine E1], [Table 0.1], [Table 0.4], [Stage 0: Problem Statement] whenever making statements.
2. If the user asks about something not in the context, clearly state that it is not documented.
3. Keep answers concise, structured (using bullet points), and professional for university evaluation.

VERIFIED CONTEXT FROM PORTFOLIO:
${retrievedChunks.map(c => `Source ${c.citation} (${c.label}):\n${c.text}`).join('\n\n')}`;

    // 1. Try Serverless / Local Proxy `/api/chat` (only if available)
    const isApiOk = await checkApiChatAvailability();
    if(isApiOk && (settings.provider === 'auto' || settings.provider === 'vercel_api' || settings.provider === 'ollama' || settings.provider === 'gemini')){
      try {
        const response = await fetchWithTimeout('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: query,
            systemInstruction: systemPrompt,
            provider: settings.provider,
            geminiKey: settings.geminiKey,
            geminiModel: settings.geminiModel || 'gemini-1.5-flash',
            ollamaToken: settings.ollamaToken,
            ollamaModel: settings.ollamaModel,
            ollamaUrl: settings.ollamaUrl
          })
        }, 6500);

        if(response.ok){
          const data = await response.json();
          if(data && data.text && !data.useFallback){
            return {
              answer: data.text,
              citations: retrievedChunks.map(c => ({ citation: c.citation, elementId: c.elementId, label: c.label })),
              provider: data.provider || 'AI Mentor (via Server Proxy)'
            };
          }
        }
      } catch(_) {}
    }

    // 2. Direct Gemini API if user configured key in browser settings
    if(settings.geminiKey && (settings.provider === 'auto' || settings.provider === 'gemini')){
      const targetModel = (settings.geminiModel || 'gemini-1.5-flash').trim();
      const candidateEndpoints = [
        `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${settings.geminiKey}`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${settings.geminiKey}`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${settings.geminiKey}`
      ];

      for(const endpointUrl of candidateEndpoints){
        try {
          const res = await fetchWithTimeout(endpointUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `${systemPrompt}\n\nUSER QUESTION:\n${query}\n\nStrict Rules: Answer only using verified portfolio facts above. Include citations like [FR-01], [Table 0.1].` }]
              }],
              generationConfig: { temperature: 0.2, maxOutputTokens: 900 }
            })
          }, 4500);

          if(res.ok){
            const data = await res.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if(text){
              return {
                answer: text,
                citations: retrievedChunks.map(c => ({ citation: c.citation, elementId: c.elementId, label: c.label })),
                provider: `Google Gemini (${targetModel})`
              };
            }
          }
        } catch(_) {}
      }
    }

    // 3. Fallback to Smart Extractive RAG
    return synthesizeExtractiveAnswer(query, retrievedChunks, kb);
  }

  function synthesizeExtractiveAnswer(query, retrievedChunks, kb){
    if(!retrievedChunks || !retrievedChunks.length){
      return {
        answer: `I could not find specific documentation in **Team ${kb.teamId}'s** verified portfolio for that query. Try asking about their **Problem Statement**, **Functional Requirements (FRs)**, **Non-Functional Requirements (NFRs)**, **Engines**, or **Scope**!`,
        citations: [],
        provider: 'AI Mentor (Zero-Compute Extractive)'
      };
    }

    const bullets = retrievedChunks.map(c => `• **${c.label}** ${c.citation}:\n${c.text}`).join('\n\n');
    const answer = `Based on the verified portfolio submission for **${kb.title}** (Team ${kb.teamId}):\n\n${bullets}\n\n*Click on any citation pill above to jump directly to that deliverable in the portfolio.*`;

    return {
      answer,
      citations: retrievedChunks.map(c => ({ citation: c.citation, elementId: c.elementId, label: c.label })),
      provider: 'AI Mentor (Zero-Compute Extractive)'
    };
  }

  // ==========================================
  // 9. UI RENDERING & THREAD-ONLY RE-RENDERS
  // ==========================================
  // Only re-renders #portfolio-chat-messages thread (Fix BUG-6: preserves textarea input and settings state)
  function updateChatMessagesThread(){
    const thread = document.getElementById('portfolio-chat-messages');
    if(!thread) return;

    const kb = buildTeamKnowledgeBase(activeChatTeamId);

    if(chatMessages.length === 0){
      thread.innerHTML = `
        <div class="chat-empty-state">
          <div class="chat-empty-icon">🎓</div>
          <strong style="color:var(--ink);font-size:14px;font-weight:700">AI Mentor • Viva Preparation</strong>
          <p style="color:var(--muted);font-size:12px;margin:6px 0 12px;line-height:1.5">
            Your pair-mentor for <strong>Team ${esc(kb.teamId)}</strong> (${esc(kb.title)}). Ask anything about requirements, engines, scope, or click <strong>Viva Quiz</strong> to test defense readiness.
          </p>
          <div class="chat-empty-actions">
            <button type="button" class="prompt-pill active-accent" onclick="window.submitQuickPrompt('Give me an executive overview and base context of this project')">📋 Overview &amp; Context</button>
            <button type="button" class="prompt-pill active-accent" onclick="window.startVivaQuizForActiveTeam()">⚡ Start Viva Quiz</button>
          </div>
        </div>
      `;
      return;
    }

    let html = '';
    chatMessages.forEach(msg => {
      if(msg.type === 'quiz'){
        html += renderQuizCardHtml(msg.quiz, kb);
      } else if(msg.type === 'eval'){
        html += renderEvalCardHtml(msg.eval, kb);
      } else {
        html += `
          <div class="chat-bubble-wrap ${msg.role === 'user' ? 'user' : 'assistant'}">
            <div class="chat-bubble">
              <div class="chat-bubble-content">${msg.html}</div>
              ${msg.provider ? `<div class="chat-bubble-meta"><small>${esc(msg.provider)}</small></div>` : ''}
            </div>
          </div>
        `;
      }
    });

    if(isGenerating){
      html += `
        <div class="chat-bubble-wrap assistant">
          <div class="chat-bubble typing">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      `;
    }

    thread.innerHTML = html;
    thread.scrollTop = thread.scrollHeight;
  }

  function renderQuizCardHtml(quiz, kb){
    const qItems = quiz.questions.map((q, idx) => {
      const chosen = quiz.userAnswers[idx];
      const optionsHtml = q.options.map(opt => {
        const isSelected = chosen && chosen.toUpperCase() === opt.key.toUpperCase();
        return `
          <button type="button" 
            class="quiz-option-btn ${isSelected ? 'selected' : ''}" 
            onclick="window.handleQuizOptionSelect('${quiz.teamId}', ${idx}, '${opt.key}')">
            <span class="quiz-opt-key">${opt.key}</span>
            <span class="quiz-opt-text">${esc(opt.text)}</span>
          </button>
        `;
      }).join('');

      return `
        <div class="quiz-question-card">
          <div class="quiz-q-header">
            <span class="quiz-q-num">Q${idx + 1}</span>
            <span class="quiz-q-type">${esc(q.type)}</span>
          </div>
          <div class="quiz-q-prompt">${esc(q.prompt)}</div>
          <div class="quiz-options-grid">${optionsHtml}</div>
        </div>
      `;
    }).join('');

    const answeredCount = quiz.userAnswers.filter(a => a !== null).length;
    const allAnswered = answeredCount === quiz.questions.length && quiz.questions.length > 0;

    return `
      <div class="chat-bubble-wrap assistant quiz-wrap">
        <div class="quiz-container">
          <div class="quiz-header">
            <div class="quiz-header-badge">VIVA PRACTICE QUIZ</div>
            <div class="quiz-title">Gate 0 &amp; Gate 1 Defense Readiness</div>
            <div class="quiz-meta">Team ${esc(kb.teamId)} • ${quiz.questions.length} Questions • Seed #${quiz.seed}</div>
          </div>
          <div class="quiz-body">${qItems}</div>
          <div class="quiz-footer">
            <div class="quiz-progress-text">${answeredCount} of ${quiz.questions.length} answered</div>
            <div class="quiz-actions">
              <button type="button" class="btn secondary quiz-btn-sm" onclick="window.startVivaQuizForActiveTeam(true)">New Quiz</button>
              <button type="button" class="btn quiz-btn-sm" onclick="window.submitActiveQuizEvaluation('${quiz.teamId}')" ${answeredCount === 0 ? 'disabled' : ''}>
                ${allAnswered ? 'Submit &amp; Grade' : 'Grade Progress'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderEvalCardHtml(ev, kb){
    const detailsHtml = ev.details.map((d, i) => {
      return `
        <div class="quiz-eval-row ${d.isCorrect ? 'correct' : 'incorrect'}">
          <div class="eval-row-top">
            <span class="eval-q-title">Q${i + 1}: ${esc(d.type)}</span>
            <span class="eval-status-pill ${d.isCorrect ? 'correct' : 'incorrect'}">
              ${d.isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </span>
          </div>
          <div class="eval-prompt">${esc(d.prompt)}</div>
          <div class="eval-answer-summary">
            <div><strong>Your Answer:</strong> ${esc(d.chosenKey)} - ${esc(d.chosenText)}</div>
            ${!d.isCorrect ? `<div><strong>Correct Answer:</strong> <span class="eval-correct-highlight">${esc(d.correctKey)} - ${esc(d.correctText)}</span></div>` : ''}
          </div>
          <div class="eval-explanation">
            <strong>Grounded Source:</strong> ${formatResponseWithClickableCitations(d.explanation, kb)}
          </div>
          <div class="viva-tip-card">
            <div class="viva-tip-label">🎓 Panel Defense Coaching:</div>
            <div class="viva-tip-text">${esc(d.defenseTip)}</div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="chat-bubble-wrap assistant eval-wrap">
        <div class="quiz-container eval-container">
          <div class="quiz-header eval-header">
            <div class="quiz-header-badge">EVALUATION REPORT</div>
            <div class="quiz-score-display">Score: ${ev.correctCount} / ${ev.total} (${ev.percentage}%)</div>
            <div class="quiz-badge-name">${esc(ev.badge)}</div>
          </div>
          <div class="quiz-body">${detailsHtml}</div>
          <div class="quiz-footer">
            <button type="button" class="btn secondary quiz-btn-sm" onclick="window.startVivaQuizForActiveTeam(false)">Try Again</button>
            <button type="button" class="btn quiz-btn-sm" onclick="window.startVivaQuizForActiveTeam(true)">Fresh Questions</button>
          </div>
        </div>
      </div>
    `;
  }

  // Render outer chat drawer shell (only once or on team switch)
  function renderChatDrawer(){
    let container = document.getElementById('portfolio-chat-container');
    if(!container){
      container = document.createElement('div');
      container.id = 'portfolio-chat-container';
      document.body.appendChild(container);
    }

    const kb = buildTeamKnowledgeBase(activeChatTeamId);
    const settings = getLLMSettings();

    // Check if drawer shell already exists
    let drawer = document.getElementById('portfolio-chat-drawer');
    if(!drawer){
      container.innerHTML = `
        <!-- Floating Action Button (FAB) -->
        <button id="portfolio-chat-fab" class="portfolio-chat-fab ${isChatOpen ? 'active' : ''}" onclick="window.togglePortfolioChat()" title="Toggle AI Mentor" aria-label="Toggle AI Mentor">
          <span class="chat-fab-text">${isChatOpen ? 'Close Mentor' : 'AI Mentor'}</span>
          <span class="chat-fab-badge">Team ${esc(kb.teamId)} Mentor</span>
        </button>

        <!-- Expandable Chat Drawer -->
        <div id="portfolio-chat-drawer" class="portfolio-chat-drawer ${isChatOpen ? 'open' : ''}" role="dialog" aria-label="Team AI Mentor">
          <header class="portfolio-chat-header">
            <div class="chat-header-info">
              <span class="chat-header-dot"></span>
              <div class="chat-header-titles">
                <div class="chat-header-eyebrow">AI MENTOR • VIVA PREPARATION</div>
                <div class="chat-header-project-name" title="${esc(kb.title)}">${esc(kb.title)} (Team ${esc(kb.teamId)})</div>
              </div>
            </div>
            <div class="chat-header-actions">
              <button type="button" class="chat-btn-action" onclick="window.openChatSettingsModal()" title="AI Settings">Settings</button>
              <button type="button" class="chat-btn-action" onclick="window.clearPortfolioChat()" title="Clear Chat History">Clear</button>
              <button type="button" class="chat-btn-action close" onclick="window.togglePortfolioChat()" title="Close Mentor" aria-label="Close">✕</button>
            </div>
          </header>

          <!-- Quick Suggestions Scroller -->
          <div class="portfolio-chat-suggestions">
            <button type="button" class="prompt-pill" onclick="window.submitQuickPrompt('Give me an executive overview and base context of this project')">📋 Overview</button>
            <button type="button" class="prompt-pill active-accent" onclick="window.startVivaQuizForActiveTeam()">⚡ Viva Quiz</button>
            <button type="button" class="prompt-pill" onclick="window.submitQuickPrompt('What are the core functional requirements?')">Requirements</button>
            <button type="button" class="prompt-pill" onclick="window.submitQuickPrompt('What is in-scope vs out-of-scope for this project?')">Scope</button>
            <button type="button" class="prompt-pill" onclick="window.submitQuickPrompt('Explain the system architecture and workflow pipeline')">Architecture</button>
          </div>

          <!-- Messages Thread -->
          <div id="portfolio-chat-messages" class="portfolio-chat-messages" aria-live="polite"></div>

          <!-- Input Area -->
          <form class="portfolio-chat-input-form" onsubmit="event.preventDefault(); window.handleChatSubmit();">
            <textarea 
              id="portfolio-chat-input" 
              placeholder="Ask about Team ${esc(kb.teamId)}'s requirements, scope, or type A-D for quiz…" 
              rows="1" 
              maxlength="1000"
              onkeydown="if(event.key==='Enter' && !event.shiftKey){ event.preventDefault(); window.handleChatSubmit(); }"
            ></textarea>
            <button type="submit" id="portfolio-chat-send-btn" class="chat-send-btn" aria-label="Send message">
              Send
            </button>
          </form>

          <!-- Slide-in Settings Sidebar -->
          <aside id="portfolio-chat-settings-sidebar" class="chat-settings-sidebar" role="region" aria-label="AI Mentor Settings">
            <header class="chat-settings-header">
              <button type="button" class="chat-btn-action" onclick="window.closeChatSettingsModal()">← Back</button>
              <strong style="font-size:13px;font-weight:700;color:var(--ink)">Mentor Settings</strong>
              <button type="button" class="chat-btn-action close" onclick="window.closeChatSettingsModal()" aria-label="Close">✕</button>
            </header>

            <div class="chat-settings-body">
              <p class="mini" style="margin:0 0 10px;color:var(--muted);line-height:1.45">Configure offline mode or remote LLM endpoints. Stored locally in your browser.</p>

              <div class="chat-settings-group">
                <label for="chat-set-provider">Generation Provider</label>
                <select id="chat-set-provider">
                  <option value="auto" ${settings.provider==='auto'?'selected':''}>Auto (Extractive / Gemini Proxy)</option>
                  <option value="extractive" ${settings.provider==='extractive'?'selected':''}>Smart Extractive RAG (Zero-Compute Offline)</option>
                  <option value="gemini" ${settings.provider==='gemini'?'selected':''}>Google Gemini</option>
                  <option value="ollama" ${settings.provider==='ollama'?'selected':''}>Ollama Cloud (Free Usage Models)</option>
                </select>
              </div>

              <div class="chat-settings-group">
                <label for="chat-set-gemini-key">Google Gemini API Key (Optional)</label>
                <input id="chat-set-gemini-key" type="password" placeholder="AIzaSy... (optional, saves locally)" value="${esc(settings.geminiKey)}">
              </div>

              <div class="chat-settings-group">
                <label for="chat-set-gemini-model">Gemini Model Identifier</label>
                <input id="chat-set-gemini-model" type="text" placeholder="gemini-1.5-flash" value="${esc(settings.geminiModel || 'gemini-1.5-flash')}">
              </div>

              <div class="chat-settings-divider">
                <strong style="font-size:12px;font-weight:700;display:block;margin-bottom:8px;color:var(--brand)">Ollama Cloud (Free Usage Models)</strong>

                <div class="chat-settings-group" style="margin-bottom:8px">
                  <label for="chat-set-ollama-url">Ollama Cloud Endpoint URL</label>
                  <input id="chat-set-ollama-url" type="text" placeholder="https://ollama.com/api" value="${esc(settings.ollamaUrl || 'https://ollama.com/api')}">
                </div>

                <div class="chat-settings-group" style="margin-bottom:8px">
                  <label for="chat-set-ollama-model">Cloud Model</label>
                  <input list="ollama-free-models" id="chat-set-ollama-model" type="text" placeholder="gpt-oss:20b" value="${esc(settings.ollamaModel || 'gpt-oss:20b')}">
                  <datalist id="ollama-free-models">
                    <option value="gpt-oss:20b">gpt-oss:20b (Recommended - Fast, high reasoning)</option>
                    <option value="gemma4:31b">gemma4:31b</option>
                    <option value="gpt-oss:120b">gpt-oss:120b (Heavy reasoning)</option>
                    <option value="nemotron-3-nano:30b">nemotron-3-nano:30b</option>
                    <option value="nemotron-3-super">nemotron-3-super</option>
                    <option value="nemotron-3-ultra">nemotron-3-ultra</option>
                    <option value="beam">beam</option>
                  </datalist>
                </div>

                <div class="chat-settings-group">
                  <label for="chat-set-ollama-token">Ollama API Key / Bearer Token</label>
                  <input id="chat-set-ollama-token" type="password" placeholder="Bearer ... or your Ollama API key" value="${esc(settings.ollamaToken || '')}">
                  <small style="color:var(--muted);display:block;margin-top:4px;font-size:10.5px">Connects to <code>https://ollama.com/api</code> using your free credits.</small>
                </div>
              </div>
            </div>

            <footer class="chat-settings-footer">
              <button type="button" class="btn secondary" style="padding:5px 14px;font-size:12px" onclick="window.closeChatSettingsModal()">Cancel</button>
              <button type="button" class="btn" style="padding:5px 14px;font-size:12px" onclick="window.saveChatSettingsFromModal()">Save Settings</button>
            </footer>
          </aside>
        </div>
      `;
    } else {
      // Just update classes for drawer open state & fab
      const fab = document.getElementById('portfolio-chat-fab');
      if(fab){
        fab.className = `portfolio-chat-fab ${isChatOpen ? 'active' : ''}`;
        const fabText = fab.querySelector('.chat-fab-text');
        if(fabText) fabText.textContent = isChatOpen ? 'Close Mentor' : 'AI Mentor';
      }
      drawer.className = `portfolio-chat-drawer ${isChatOpen ? 'open' : ''}`;
    }

    // Thread-only DOM re-render
    updateChatMessagesThread();
  }

  // ==========================================
  // 10. WINDOW ACTIONS & EVENT HANDLERS
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
    activeQuizState = null;
    try {
      if(typeof sessionStorage !== 'undefined'){
        sessionStorage.removeItem('pg_quiz_' + activeChatTeamId);
      }
    } catch(_) {}
    updateChatMessagesThread();
  };

  window.openChatSettingsModal = function(){
    const sidebar = document.getElementById('portfolio-chat-settings-sidebar');
    if(sidebar) sidebar.classList.add('open');
  };

  window.closeChatSettingsModal = function(){
    const sidebar = document.getElementById('portfolio-chat-settings-sidebar');
    if(sidebar) sidebar.classList.remove('open');
  };

  window.saveChatSettingsFromModal = function(){
    const provider = document.getElementById('chat-set-provider')?.value || 'auto';
    const geminiKey = document.getElementById('chat-set-gemini-key')?.value || '';
    const geminiModel = document.getElementById('chat-set-gemini-model')?.value || 'gemini-1.5-flash';
    const ollamaUrl = document.getElementById('chat-set-ollama-url')?.value || 'https://ollama.com/api';
    const ollamaModel = document.getElementById('chat-set-ollama-model')?.value || 'gpt-oss:20b';
    const ollamaToken = document.getElementById('chat-set-ollama-token')?.value || '';
    saveLLMSettings({ provider, geminiKey, geminiModel, ollamaUrl, ollamaModel, ollamaToken });
    memoryApiAvailable = null; // reset probe cache on save
    window.closeChatSettingsModal();
    if(typeof toast === 'function') toast('Mentor settings saved!');
    renderChatDrawer();
  };

  window.submitQuickPrompt = function(promptText){
    const input = document.getElementById('portfolio-chat-input');
    if(input) input.value = promptText;
    window.handleChatSubmit();
  };

  window.startVivaQuizForActiveTeam = function(forceNewSeed = false){
    const kb = buildTeamKnowledgeBase(activeChatTeamId);
    let seed = null;
    if(forceNewSeed){
      seed = Math.floor(Date.now() / 1000) % 100000;
    }
    const quiz = generateVivaQuiz(kb, seed);
    activeQuizState = quiz;

    isChatOpen = true;
    chatMessages.push({
      role: 'assistant',
      type: 'quiz',
      quiz
    });

    renderChatDrawer();
  };

  window.handleQuizOptionSelect = function(teamId, questionIndex, optionKey){
    const quiz = getActiveQuizState(teamId);
    if(!quiz || !quiz.questions[questionIndex]) return;

    quiz.userAnswers[questionIndex] = optionKey.toUpperCase();
    activeQuizState = quiz;
    try {
      if(typeof sessionStorage !== 'undefined'){
        sessionStorage.setItem('pg_quiz_' + teamId, JSON.stringify(quiz));
      }
    } catch(_) {}

    // Update the message in chatMessages array
    const qMsg = chatMessages.find(m => m.type === 'quiz' && m.quiz.teamId === teamId);
    if(qMsg){
      qMsg.quiz = quiz;
    }

    updateChatMessagesThread();
  };

  window.submitActiveQuizEvaluation = function(teamId){
    const quiz = getActiveQuizState(teamId);
    if(!quiz) return;

    const evalReport = evaluateVivaQuiz(quiz);

    chatMessages.push({
      role: 'assistant',
      type: 'eval',
      eval: evalReport
    });

    updateChatMessagesThread();
  };

  // Main chat submission handler
  window.handleChatSubmit = async function(){
    const input = document.getElementById('portfolio-chat-input');
    if(!input || isGenerating) return;
    const rawQuery = input.value.trim();
    if(!rawQuery) return;

    input.value = '';
    isChatOpen = true;

    // Push User message
    chatMessages.push({
      role: 'user',
      text: rawQuery,
      html: esc(rawQuery)
    });
    isGenerating = true;
    updateChatMessagesThread();

    const kb = buildTeamKnowledgeBase(activeChatTeamId);

    // Stage 2: Active Quiz Input Intercept (e.g. "A", "b", "1:B", "Q2: C")
    const quiz = getActiveQuizState(activeChatTeamId);
    const quizAnsMatch = rawQuery.match(/^(?:(?:q|question\s*)?([1-4])\s*[:.-]?\s*)?([a-d])$/i);

    if(quiz && !quiz.isEvaluated && quizAnsMatch){
      let qIdx = quizAnsMatch[1] ? (parseInt(quizAnsMatch[1], 10) - 1) : null;
      const optKey = quizAnsMatch[2].toUpperCase();

      // If bare letter "A", assign to first unanswered question
      if(qIdx === null){
        qIdx = quiz.userAnswers.findIndex(a => a === null);
        if(qIdx === -1) qIdx = 0; // all answered, update Q1
      }

      if(qIdx >= 0 && qIdx < quiz.questions.length){
        window.handleQuizOptionSelect(activeChatTeamId, qIdx, optKey);
        isGenerating = false;

        const allAnswered = quiz.userAnswers.every(a => a !== null);
        if(allAnswered){
          chatMessages.push({
            role: 'assistant',
            text: `Recorded **${optKey}** for **Q${qIdx + 1}**. All ${quiz.questions.length} questions are answered! Click **Submit & Grade** below to view your score and faculty defense tips.`,
            html: `Recorded <strong>${optKey}</strong> for <strong>Q${qIdx + 1}</strong>. All ${quiz.questions.length} questions are answered! Click <strong>Submit &amp; Grade</strong> on the quiz card above.`
          });
        } else {
          chatMessages.push({
            role: 'assistant',
            text: `Recorded **${optKey}** for **Q${qIdx + 1}**.`,
            html: `Recorded <strong>${optKey}</strong> for <strong>Q${qIdx + 1}</strong>.`
          });
        }
        updateChatMessagesThread();
        return;
      }
    }

    try {
      // 5-Stage Intent Router
      const route = classifyAndRouteIntent(rawQuery, kb);

      if(route.intent === 'QUIZ_TRIGGER'){
        const newQuiz = generateVivaQuiz(kb);
        activeQuizState = newQuiz;
        chatMessages.push({
          role: 'assistant',
          type: 'quiz',
          quiz: newQuiz
        });
      } else if(route.intent === 'BASE_CONTEXT'){
        const baseContext = generateTeamBaseContext(kb);
        const formattedHtml = formatResponseWithClickableCitations(baseContext.answer, kb);
        chatMessages.push({
          role: 'assistant',
          text: baseContext.answer,
          html: formattedHtml,
          provider: baseContext.provider
        });
      } else if(route.intent === 'EXPLICIT_ENTITY'){
        const chunk = route.chunks[0];
        const answer = `Verified deliverable for **${chunk.label}** ${chunk.citation}:\n\n${chunk.text}\n\n*Click on the citation pill above to view this deliverable.*`;
        const formattedHtml = formatResponseWithClickableCitations(answer, kb);
        chatMessages.push({
          role: 'assistant',
          text: answer,
          html: formattedHtml,
          provider: 'AI Mentor (Direct Verified Entity)'
        });
      } else {
        // RETRIEVAL route (Score >= 12)
        const retrieved = route.chunks;
        const result = await queryLLM(rawQuery, retrieved, kb);
        const formattedHtml = formatResponseWithClickableCitations(result.answer, kb);

        chatMessages.push({
          role: 'assistant',
          text: result.answer,
          html: formattedHtml,
          provider: result.provider
        });
      }
    } catch(err) {
      chatMessages.push({
        role: 'assistant',
        text: 'Sorry, I encountered an error processing your mentor request.',
        html: `<strong>Notice:</strong> ${esc(err.message || 'Error executing request.')}`
      });
    } finally {
      isGenerating = false;
      updateChatMessagesThread();
    }
  };

  // Mount / Unmount API for Department router
  window.mountPortfolioChat = function(teamId){
    activeChatTeamId = teamId;
    activeQuizState = getActiveQuizState(teamId);
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
    classifyAndRouteIntent,
    generateTeamBaseContext,
    generateVivaQuiz,
    evaluateVivaQuiz,
    synthesizeExtractiveAnswer,
    formatResponseWithClickableCitations,
    queryLLM,
    stemWord,
    calcTokenOverlap,
    createPRNG,
    getLLMSettings,
    saveLLMSettings,
    checkApiChatAvailability
  };

  // Auto-mount if active team is present on load
  if(typeof window !== 'undefined' && typeof window.addEventListener === 'function'){
    window.addEventListener('DOMContentLoaded', () => {
      const initialTeam = (typeof activeTeam === 'function' ? activeTeam()?.id : null) || '03';
      if(initialTeam){
        window.mountPortfolioChat(initialTeam);
      }
    });
  }

})();
