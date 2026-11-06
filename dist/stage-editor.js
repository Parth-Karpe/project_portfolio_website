/**
 * ProjectGate AI - Student Stage Data Ingestion & Editor
 * Allows students to enter and customize their stage milestone data
 * for Stage 0 (Problem Scope), Stage 1 (Requirements), Stage 2 (System Design),
 * Stage 3 (Implementation), and Stage 4 (Testing & Validations).
 */
(function(root){
  'use strict';

  const STORAGE_PREFIX = 'pg_team_stage_';

  root.getTeamCustomStageData = function(teamId){
    if(!teamId) return {};
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + teamId);
      if(raw) return JSON.parse(raw);
    } catch(e){}

    if(typeof state !== 'undefined' && state.workspaces && state.workspaces[teamId] && state.workspaces[teamId].customStageData){
      return state.workspaces[teamId].customStageData;
    }
    return {};
  };

  root.saveTeamCustomStageData = function(teamId, stageKey, data){
    if(!teamId) return;
    const existing = root.getTeamCustomStageData(teamId);
    existing[stageKey] = Object.assign({}, existing[stageKey] || {}, data);
    try {
      localStorage.setItem(STORAGE_PREFIX + teamId, JSON.stringify(existing));
    } catch(e){}

    if(typeof state !== 'undefined'){
      if(!state.workspaces) state.workspaces = {};
      if(!state.workspaces[teamId]) state.workspaces[teamId] = {};
      state.workspaces[teamId].customStageData = existing;
      if(typeof save === 'function') save();
    }
  };

  root.openStageDataEditor = function(initialStage){
    const stageId = String(initialStage || window.activePortfolioStage || '0');
    const curTeam = (typeof activeTeam === 'function' ? activeTeam() : (typeof state !== 'undefined' ? state.teams?.[0] : null));
    const teamId = curTeam?.id || '03';
    const customData = root.getTeamCustomStageData(teamId);

    const staticTeam = (typeof window !== 'undefined' && window.STATIC_TEAMS_DATA && (
      window.STATIC_TEAMS_DATA[teamId] ||
      (teamId === 'A-03' ? (window.STATIC_TEAMS_DATA['A-03'] || window.STATIC_TEAMS_DATA['03']) : null)
    )) || null;

    let contentHtml = '';
    const stageTabs = [
      { id: '0', label: 'Stage 0: Problem Scope' },
      { id: '1', label: 'Stage 1: Requirements' },
      { id: 'system-design', label: 'Stage 2: System Design' },
      { id: '2', label: 'Stage 3: Implementation' },
      { id: '3', label: 'Stage 4: Testing & Metrics' }
    ];

    if(stageId === '0'){
      const cur0 = Object.assign({}, staticTeam?.stage0 || {}, customData['0'] || {});
      const objectivesText = Array.isArray(cur0.objectives) ? cur0.objectives.join('\n') : (cur0.objectives || '');
      const inScopeText = (cur0.scopeInTable || []).map(s => s.item || s).join('\n') || (cur0.inScope || '');
      const outScopeText = (cur0.scopeOutTable || []).map(s => `${s.item || s} -- ${s.reason || 'Out of Scope'}`).join('\n') || (cur0.outScope || '');
      const coursesText = (cur0.coursesTable || []).map(c => `${c.course || ''} : ${c.concepts || ''}`).join('\n') || '';

      contentHtml = `
        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. Problem Statement *</label>
          <textarea id="edit-stg0-problem" rows="4" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur0.problem || '')}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">2. Project Objectives (one per line) *</label>
          <textarea id="edit-stg0-objectives" rows="4" placeholder="Objective 1\nObjective 2\nObjective 3" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(objectivesText)}</textarea>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">3. In-Scope Deliverables (one per line)</label>
            <textarea id="edit-stg0-inscope" rows="3" placeholder="In-scope item 1\nIn-scope item 2" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(inScopeText)}</textarea>
          </div>
          <div>
            <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">4. Out-of-Scope (Item -- Reason)</label>
            <textarea id="edit-stg0-outscope" rows="3" placeholder="Feature -- Reason for omission" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(outScopeText)}</textarea>
          </div>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">5. Foundation Course Integration (Course : Concepts Used)</label>
          <textarea id="edit-stg0-courses" rows="3" placeholder="DAA : Constraint Satisfaction & Optimization\nOperating Systems : Multithreading & Concurrency\nSoftware Engineering : Architectural Modeling" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(coursesText)}</textarea>
        </div>
      `;
    } else if(stageId === '1'){
      const cur1 = Object.assign({}, staticTeam?.stage1 || {}, customData['1'] || {});
      const frText = (cur1.frTable || []).map(fr => `${fr.id || 'FR'} : ${fr.desc || ''}`).join('\n') || (cur1.fr || '');
      const nfrText = (cur1.nfrTable || []).map(nfr => `${nfr.id || 'NFR'} [${nfr.cat || nfr.category || 'Quality'}] : ${nfr.desc || ''} (Target: ${nfr.target || ''})`).join('\n') || (cur1.nfr || '');
      const ucText = (cur1.useCases || []).map(u => `${u.id || 'UC'} - ${u.title || u.actor || ''}: ${u.desc || u.flow || ''}`).join('\n') || (cur1.usecases || '');

      contentHtml = `
        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. Functional Requirements (FR-ID : Description, one per line) *</label>
          <textarea id="edit-stg1-fr" rows="5" placeholder="FR-01 : User authentication and RBAC\nFR-02 : Automated timetable generation\nFR-03 : Export schedule to CSV / PDF" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(frText)}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">2. Non-Functional Requirements (NFR-ID [Category] : Description (Target: ...)) *</label>
          <textarea id="edit-stg1-nfr" rows="4" placeholder="NFR-01 [Performance] : Generation latency < 5 seconds\nNFR-02 [Reliability] : 0 hard constraint conflicts" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(nfrText)}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">3. Use Cases / Core Scenarios</label>
          <textarea id="edit-stg1-uc" rows="4" placeholder="UC-01 - Student: Enters team details and stage submissions\nUC-02 - Faculty: Reviews milestone and provides approval" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(ucText)}</textarea>
        </div>
      `;
    } else if(stageId === 'system-design'){
      const curSys = Object.assign({}, staticTeam?.systemDesign || {}, customData['system-design'] || {});
      const archText = Array.isArray(curSys.architecturePoints) ? curSys.architecturePoints.join('\n') : (curSys.architectureOverview || '');
      const dataText = Array.isArray(curSys.dataDesignPoints) ? curSys.dataDesignPoints.join('\n') : (curSys.dataDesign || '');
      const algoText = Array.isArray(curSys.algorithmDesignPoints) ? curSys.algorithmDesignPoints.join('\n') : (curSys.algorithmDesign || '');

      contentHtml = `
        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. System Architecture Overview *</label>
          <textarea id="edit-stgsys-arch" rows="4" placeholder="Describe presentation layer, business logic engine, and database persistence layers…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(archText)}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">2. Data Design &amp; Schemas *</label>
          <textarea id="edit-stgsys-data" rows="4" placeholder="Detail database tables, entity relationships, and persistence structures…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(dataText)}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">3. Algorithm &amp; Logic Design *</label>
          <textarea id="edit-stgsys-algo" rows="4" placeholder="Algorithmic approach, constraints handling, optimization methods…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(algoText)}</textarea>
        </div>
      `;
    } else if(stageId === '2'){
      const cur2 = Object.assign({}, staticTeam?.stage2 || {}, customData['2'] || {});
      const modulesText = (cur2.modules || []).map(m => typeof m === 'object' ? `${m.name || m.module || ''} : ${m.desc || ''}` : String(m)).join('\n') || (cur2.modulesText || '');

      contentHtml = `
        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. Implementation Summary &amp; Tech Stack *</label>
          <textarea id="edit-stg2-summary" rows="3" placeholder="Summary of languages, frameworks, libraries, and integration pipeline…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur2.summary || cur2.implementation || '')}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">2. Core Modules (Module Name : Description, one per line) *</label>
          <textarea id="edit-stg2-modules" rows="4" placeholder="Module 1 - IngestionEngine : Validates user constraint input\nModule 2 - SolverEngine : Executes CSP search algorithm" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(modulesText)}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">3. Project Repository URL (GitHub / GitLab)</label>
          <input id="edit-stg2-repo" type="url" value="${esc(cur2.repo || cur2.repoUrl || curTeam?.repo || 'https://github.com')}" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;">
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">4. Technical Challenges &amp; Mitigations</label>
          <textarea id="edit-stg2-challenges" rows="3" placeholder="Key bottlenecks, bugs encountered, and how they were resolved…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur2.challenges || '')}</textarea>
        </div>
      `;
    } else if(stageId === '3'){
      const cur3 = Object.assign({}, staticTeam?.stage3 || {}, customData['3'] || {});
      const testsText = (cur3.tests || []).map(t => typeof t === 'object' ? `${t.id || 'TC'} : ${t.feature || t.name || ''} -- ${t.result || 'PASS'}` : String(t)).join('\n') || (cur3.testsText || '');

      contentHtml = `
        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. Testing &amp; Validation Strategy *</label>
          <textarea id="edit-stg3-strategy" rows="3" placeholder="Unit testing, integration testing, benchmark test harness…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur3.strategy || cur3.testing || '')}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">2. Test Execution Matrix (TC-ID : Feature -- Result, one per line) *</label>
          <textarea id="edit-stg3-tests" rows="4" placeholder="TC-01 : Faculty non-overlap -- Zero conflicts observed [PASS]\nTC-02 : Room capacity check -- All limits respected [PASS]\nTC-03 : Execution latency -- 4.2 seconds under 120 slot load [PASS]" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(testsText)}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">3. Performance &amp; Accuracy Metrics</label>
          <textarea id="edit-stg3-metrics" rows="2" placeholder="e.g. Generation Latency: 4.2s · Conflict Rate: 0.0% · Memory: 84 MB" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur3.metrics || '')}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">4. Evaluation &amp; Lessons Learned</label>
          <textarea id="edit-stg3-evaluation" rows="3" placeholder="Key insights gained, known limitations, and future directions…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur3.evaluation || '')}</textarea>
        </div>
      `;
    }

    if(typeof modal !== 'undefined'){
      modal = `
        <div class="modal stage-editor-modal" role="dialog" aria-modal="true" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;">
          <div style="background:var(--surface);width:100%;max-width:680px;max-height:90vh;border-radius:16px;border:1px solid var(--line);box-shadow:var(--shadow-lg);display:flex;flex-direction:column;overflow:hidden;">
            
            <!-- Modal Header -->
            <div style="padding:18px 24px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <h2 style="margin:0;font-size:18px;font-weight:800;color:var(--ink);">Insert / Edit Stage Data</h2>
                <span style="font-size:12.5px;color:var(--muted);font-weight:600;">Team ${esc(teamId)} · Enter your project data for milestone evaluation</span>
              </div>
              <button type="button" class="textbtn" onclick="closeModal()" style="font-size:20px;cursor:pointer;padding:4px 8px;line-height:1;">✕</button>
            </div>

            <!-- Stage Switcher Tabs inside Modal -->
            <div style="display:flex;gap:6px;padding:12px 20px;background:var(--bg-subtle);border-bottom:1px solid var(--line);overflow-x:auto;">
              ${stageTabs.map(st => `
                <button type="button" class="btn ${stageId === st.id ? '' : 'secondary'}" onclick="window.openStageDataEditor('${st.id}')" style="padding:6px 12px;font-size:12px;font-weight:700;white-space:nowrap;border-radius:6px;">
                  ${st.label}
                </button>
              `).join('')}
            </div>

            <!-- Modal Body Form -->
            <div style="padding:20px 24px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;flex:1;">
              ${contentHtml}
            </div>

            <!-- Modal Footer -->
            <div style="padding:14px 24px;border-top:1px solid var(--line);display:flex;justify-content:flex-end;gap:10px;background:var(--surface);">
              <button type="button" class="btn secondary" onclick="closeModal()" style="padding:9px 16px;font-size:13px;font-weight:700;">Cancel</button>
              <button type="button" class="btn" onclick="window.saveStageDataFromModal('${stageId}')" style="padding:9px 20px;font-size:13px;font-weight:700;">
                ✓ Save Stage Data
              </button>
            </div>
          </div>
        </div>
      `;
      if(typeof render === 'function') render();
    }
  };

  root.saveStageDataFromModal = function(stageId){
    const curTeam = (typeof activeTeam === 'function' ? activeTeam() : (typeof state !== 'undefined' ? state.teams?.[0] : null));
    const teamId = curTeam?.id || '03';
    let data = {};

    if(stageId === '0'){
      const problem = (document.getElementById('edit-stg0-problem')?.value || '').trim();
      const objectivesRaw = (document.getElementById('edit-stg0-objectives')?.value || '').trim();
      const inscopeRaw = (document.getElementById('edit-stg0-inscope')?.value || '').trim();
      const outscopeRaw = (document.getElementById('edit-stg0-outscope')?.value || '').trim();
      const coursesRaw = (document.getElementById('edit-stg0-courses')?.value || '').trim();

      const objectives = objectivesRaw.split('\n').map(s => s.trim()).filter(Boolean);
      const scopeInTable = inscopeRaw.split('\n').map((s, i) => ({ num: String(i+1).padStart(2,'0'), item: s.trim() })).filter(x => x.item);
      const scopeOutTable = outscopeRaw.split('\n').map((s, i) => {
        const parts = s.split('--');
        return { num: String(i+1).padStart(2,'0'), item: (parts[0] || '').trim(), reason: (parts[1] || 'Out of Scope boundary').trim() };
      }).filter(x => x.item);

      const coursesTable = coursesRaw.split('\n').map((s, i) => {
        const parts = s.split(':');
        return { sl: String(i+1).padStart(2,'0'), course: (parts[0] || '').trim(), concepts: (parts[1] || '').trim(), role: 'Foundation' };
      }).filter(x => x.course);

      data = { problem, objectives, scopeInTable, scopeOutTable, coursesTable };

    } else if(stageId === '1'){
      const frRaw = (document.getElementById('edit-stg1-fr')?.value || '').trim();
      const nfrRaw = (document.getElementById('edit-stg1-nfr')?.value || '').trim();
      const ucRaw = (document.getElementById('edit-stg1-uc')?.value || '').trim();

      const frTable = frRaw.split('\n').map((line, i) => {
        const parts = line.split(':');
        const id = (parts[0] || '').trim() || ('FR-' + String(i+1).padStart(2, '0'));
        const desc = (parts[1] || parts[0] || '').trim();
        return { id, desc, priority: 'Mandatory', sourceNeed: 'Stakeholder Requirement' };
      }).filter(x => x.desc);

      const nfrTable = nfrRaw.split('\n').map((line, i) => {
        const idMatch = line.match(/^([A-Za-z0-9_-]+)/);
        const id = idMatch ? idMatch[1] : ('NFR-' + String(i+1).padStart(2, '0'));
        return { id, desc: line.trim(), cat: 'Quality', target: 'Verified in Test Suite' };
      }).filter(x => x.desc);

      data = { fr: frRaw, nfr: nfrRaw, frTable, nfrTable, usecases: ucRaw };

    } else if(stageId === 'system-design'){
      const arch = (document.getElementById('edit-stgsys-arch')?.value || '').trim();
      const dataDesign = (document.getElementById('edit-stgsys-data')?.value || '').trim();
      const algo = (document.getElementById('edit-stgsys-algo')?.value || '').trim();

      const architecturePoints = arch.split('\n').map(s => s.trim()).filter(Boolean);
      const dataDesignPoints = dataDesign.split('\n').map(s => s.trim()).filter(Boolean);
      const algorithmDesignPoints = algo.split('\n').map(s => s.trim()).filter(Boolean);

      data = {
        architectureOverview: arch,
        architecturePoints: architecturePoints.length ? architecturePoints : [arch],
        dataDesign,
        dataDesignPoints: dataDesignPoints.length ? dataDesignPoints : [dataDesign],
        algorithmDesign: algo,
        algorithmDesignPoints: algorithmDesignPoints.length ? algorithmDesignPoints : [algo]
      };

    } else if(stageId === '2'){
      const summary = (document.getElementById('edit-stg2-summary')?.value || '').trim();
      const modulesRaw = (document.getElementById('edit-stg2-modules')?.value || '').trim();
      const repo = (document.getElementById('edit-stg2-repo')?.value || '').trim();
      const challenges = (document.getElementById('edit-stg2-challenges')?.value || '').trim();

      const modules = modulesRaw.split('\n').map(line => {
        const parts = line.split(':');
        return { name: (parts[0] || '').trim(), desc: (parts[1] || '').trim() };
      }).filter(m => m.name);

      data = { summary, modules, repo, challenges, modulesText: modulesRaw };

    } else if(stageId === '3'){
      const strategy = (document.getElementById('edit-stg3-strategy')?.value || '').trim();
      const testsRaw = (document.getElementById('edit-stg3-tests')?.value || '').trim();
      const metrics = (document.getElementById('edit-stg3-metrics')?.value || '').trim();
      const evaluation = (document.getElementById('edit-stg3-evaluation')?.value || '').trim();

      const tests = testsRaw.split('\n').map((line, i) => {
        const parts = line.split('--');
        const left = (parts[0] || '').split(':');
        const id = (left[0] || '').trim() || ('TC-' + String(i+1).padStart(2,'0'));
        const feature = (left[1] || left[0] || '').trim();
        const result = (parts[1] || 'PASS').trim();
        return { id, feature, result, status: result.toLowerCase().includes('fail') ? 'FAIL' : 'PASS' };
      }).filter(t => t.feature);

      data = { strategy, tests, metrics, evaluation, testsText: testsRaw };
    }

    root.saveTeamCustomStageData(teamId, stageId, data);
    if(typeof modal !== 'undefined') modal = null;
    if(typeof toast === 'function') toast('✓ Stage data saved successfully! Portfolio updated.');
    if(typeof render === 'function') render();
    if(typeof switchPortfolioStage === 'function') switchPortfolioStage(stageId, true);
  };

})(typeof window !== 'undefined' ? window : global);
