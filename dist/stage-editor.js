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

    if(typeof window !== 'undefined' && typeof window.saveTeamCustomStageDataToCloud === 'function'){
      window.saveTeamCustomStageDataToCloud(teamId, stageKey, existing[stageKey]);
    }
  };

  root.__stagePendingImages = root.__stagePendingImages || {};
  if(typeof window !== 'undefined') window.__stagePendingImages = root.__stagePendingImages;

  root.isMediaVideo = function(url){
    if(!url) return false;
    if(typeof url === 'object') return url.type === 'video' || url.isVideo;
    const str = String(url).toLowerCase();
    return str.startsWith('data:video/') || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(str) || str.includes('youtube.com') || str.includes('youtu.be') || str.includes('drive.google.com/file');
  };
  if(typeof window !== 'undefined') window.isMediaVideo = root.isMediaVideo;

  function updateMediaPreviewUI(key, mediaUrl, isVideo){
    const previewBox = document.getElementById('preview-box-' + key);
    const mediaContainer = document.getElementById('preview-media-container-' + key);
    const titleEl = document.getElementById('preview-title-' + key);
    const subEl = document.getElementById('preview-sub-' + key);

    if(mediaContainer){
      if(isVideo){
        mediaContainer.innerHTML = `<video id="preview-video-${key}" src="${mediaUrl}" controls style="max-height:80px; max-width:140px; border-radius:6px; background:#000;"></video>`;
      } else {
        mediaContainer.innerHTML = `<img id="preview-img-${key}" src="${mediaUrl}" alt="Preview" style="max-height:80px; max-width:140px; border-radius:6px; object-fit:contain; border:1px solid var(--line); background:#fff;">`;
      }
    }
    if(titleEl){
      titleEl.innerHTML = isVideo ? '🎬 Video Attached (Cloud Storage / MP4)' : '🖼️ Image Attached (Cloud Storage / PNG / JPEG)';
    }
    if(subEl){
      subEl.textContent = 'Uploaded to Firebase Cloud Storage · Displayed in Project Portfolio';
    }
    if(previewBox) previewBox.style.display = 'flex';
  }

  root.handleStageImageUpload = async function(event, key){
    const file = event.target.files && event.target.files[0];
    if(!file) return;

    const isVid = file.type ? file.type.startsWith('video/') : /\.(mp4|webm|ogg|mov)$/i.test(file.name);
    const isImg = file.type ? file.type.startsWith('image/') : /\.(png|jpe?g|webp|gif)$/i.test(file.name);

    if(!isVid && !isImg){
      if(typeof toast === 'function') toast('Please select an image (PNG, JPEG, WebP) or video (MP4, WebM) file.');
      return;
    }

    const curTeam = (typeof activeTeam === 'function' ? activeTeam() : (typeof state !== 'undefined' ? state.teams?.[0] : null));
    const teamId = curTeam?.id || '03';
    const stageId = String(window.activePortfolioStage || '0');

    // UI Progress Bar
    const progressBox = document.getElementById('upload-progress-' + key);
    const statusText = document.getElementById('upload-status-text-' + key);
    const percentText = document.getElementById('upload-percent-' + key);
    const progressBar = document.getElementById('upload-bar-' + key);

    if(progressBox){
      progressBox.style.display = 'flex';
      if(statusText) statusText.textContent = 'Uploading to Firebase Cloud Storage…';
      if(progressBar) progressBar.style.width = '15%';
      if(percentText) percentText.textContent = '15%';
    }

    // 1. Try Firebase Cloud Storage Upload
    let cloudResult = null;
    if(typeof window !== 'undefined' && typeof window.uploadMediaToCloudStorage === 'function'){
      try {
        cloudResult = await window.uploadMediaToCloudStorage(teamId, stageId, key, file, (pct) => {
          if(progressBar) progressBar.style.width = pct + '%';
          if(percentText) percentText.textContent = pct + '%';
        });
      } catch(err){
        console.warn("[Upload] Cloud Storage upload notice:", err);
      }
    }

    if(progressBox) progressBox.style.display = 'none';

    if(cloudResult && cloudResult.url){
      root.__stagePendingImages[key] = cloudResult.url;
      updateMediaPreviewUI(key, cloudResult.url, isVid);
      if(typeof toast === 'function') toast('✓ Uploaded to Firebase Cloud Storage! Click "Save Stage Data" to apply.');
      return;
    }

    // 2. Offline / local fallback
    if(isImg){
      const reader = new FileReader();
      reader.onload = function(e){
        const img = new Image();
        img.onload = function(){
          const maxDim = 1400;
          let width = img.width, height = img.height;
          if(width > maxDim || height > maxDim){
            if(width > height){ height = Math.round(height * (maxDim / width)); width = maxDim; }
            else { width = Math.round(width * (maxDim / height)); height = maxDim; }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.88);
          root.__stagePendingImages[key] = dataUrl;
          updateMediaPreviewUI(key, dataUrl, false);
          if(typeof toast === 'function') toast('✓ Image attached locally. Click "Save Stage Data" to apply.');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      const vidUrl = URL.createObjectURL(file);
      root.__stagePendingImages[key] = vidUrl;
      updateMediaPreviewUI(key, vidUrl, true);
      if(typeof toast === 'function') toast('✓ Video attached! Click "Save Stage Data" to apply.');
    }
  };
  if(typeof window !== 'undefined') window.handleStageImageUpload = root.handleStageImageUpload;

  root.removeStageImage = function(key){
    root.__stagePendingImages[key] = '';
    const previewBox = document.getElementById('preview-box-' + key);
    if(previewBox) previewBox.style.display = 'none';
    const fileInput = document.getElementById('input-file-' + key);
    if(fileInput) fileInput.value = '';
    if(typeof toast === 'function') toast('Media removed. Click "Save Stage Data" to apply.');
  };
  if(typeof window !== 'undefined') window.removeStageImage = root.removeStageImage;

  function renderImageUploadField(key, label, helpText, currentImageUrl){
    const rawVal = (root.__stagePendingImages[key] !== undefined) ? root.__stagePendingImages[key] : (currentImageUrl || '');
    const mediaUrl = (typeof rawVal === 'object' && rawVal.url) ? rawVal.url : String(rawVal || '');
    const isVid = root.isMediaVideo(mediaUrl);

    return `
      <div style="border:1.5px dashed var(--line); border-radius:10px; padding:14px 18px; background:var(--bg); display:flex; flex-direction:column; gap:10px; margin-top:6px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <label style="display:block; font-size:12.5px; font-weight:700; color:var(--ink); margin:0 0 2px;">
              ${esc(label)} (Image or Video)
            </label>
            <span style="font-size:11.5px; color:var(--muted);">${esc(helpText)} · Firebase Cloud Storage Sync</span>
          </div>
          <label class="btn secondary" style="cursor:pointer; padding:6px 14px; font-size:12px; font-weight:700; display:inline-flex; align-items:center; gap:6px;">
            <span>📁 Upload Image / Video</span>
            <input type="file" id="input-file-${key}" accept="image/png, image/jpeg, image/jpg, image/webp, video/mp4, video/webm" style="display:none;" onchange="window.handleStageImageUpload(event, '${key}')">
          </label>
        </div>

        <!-- Real-time Cloud Upload Progress -->
        <div id="upload-progress-${key}" style="display:none; flex-direction:column; gap:5px; margin-top:4px;">
          <div style="display:flex; justify-content:space-between; font-size:11.5px; font-weight:700; color:var(--brand,#0284c7);">
            <span id="upload-status-text-${key}">Uploading to Firebase Cloud Storage...</span>
            <span id="upload-percent-${key}">0%</span>
          </div>
          <div style="width:100%; height:6px; background:var(--line); border-radius:3px; overflow:hidden;">
            <div id="upload-bar-${key}" style="width:0%; height:100%; background:var(--brand,#0284c7); transition:width 0.2s;"></div>
          </div>
        </div>

        <!-- Media Preview Box -->
        <div id="preview-box-${key}" style="display:${mediaUrl ? 'flex' : 'none'}; align-items:center; gap:14px; background:var(--surface); padding:10px 14px; border-radius:8px; border:1px solid var(--line);">
          <div id="preview-media-container-${key}" style="max-height:85px; max-width:140px; display:flex; align-items:center; justify-content:center;">
            ${isVid ? `
              <video id="preview-video-${key}" src="${mediaUrl}" controls style="max-height:80px; max-width:140px; border-radius:6px; background:#000;"></video>
            ` : `
              <img id="preview-img-${key}" src="${mediaUrl}" alt="Preview" style="max-height:80px; max-width:140px; border-radius:6px; object-fit:contain; border:1px solid var(--line); background:#fff;">
            `}
          </div>
          <div style="flex:1; font-size:12px; color:var(--ink);">
            <strong id="preview-title-${key}" style="display:block; color:var(--brand,#0284c7);">
              ${isVid ? '🎬 Video Attached (Cloud Storage / MP4)' : '🖼️ Image Attached (Cloud Storage / PNG / JPEG)'}
            </strong>
            <span id="preview-sub-${key}" style="color:var(--muted); font-size:11px;">
              Uploaded to Firebase Cloud Storage · Displayed in Project Portfolio
            </span>
          </div>
          <button type="button" class="btn secondary" style="padding:4px 10px; font-size:11.5px; color:#dc2626;" onclick="window.removeStageImage('${key}')">Remove ✕</button>
        </div>
      </div>
    `;
  }

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

        ${renderImageUploadField('stg0-flow', '6. Conceptual Workflow / Problem Scope Diagram', 'Insert conceptual flow diagram or problem scope illustration.', cur0.conceptualFlowImage)}
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

        ${renderImageUploadField('stg1-uc', '4. Use Case Diagram / User Interaction Flow', 'Insert use case diagram or user interaction flow model.', cur1.useCaseImage)}
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

        ${renderImageUploadField('stgsys-arch', '4. System Architecture Diagram', 'Insert system architecture block diagram or microservices topology.', curSys.architectureImage)}
        ${renderImageUploadField('stgsys-data', '5. Database / Schema / ER Diagram', 'Insert entity relationship diagram, relational schema, or table model.', curSys.dataDesignImage)}
        ${renderImageUploadField('stgsys-algo', '6. Algorithm Logic / Optimization Flowchart', 'Insert algorithmic flow, state machine, or solver flowchart.', curSys.algorithmDesignImage)}
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

        ${renderImageUploadField('stg2-impl', '5. Implementation / Component Evidence Diagram', 'Insert core component diagram, code pipeline, or UI screen implementation screenshot.', cur2.implImage)}
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

        ${renderImageUploadField('stg3-test', '5. Test Execution Results / Verification Benchmark Screenshot', 'Insert test execution terminal log, validation test suite pass screenshot, or performance metric graph.', cur3.testingImage)}
      `;
    }

    if(typeof modal !== 'undefined'){
      const isFacOverview = (typeof state !== 'undefined' && state.role === 'Faculty' && (typeof page === 'undefined' || page === 'Overview'));
      const closeBtnLabel = isFacOverview ? '✕ Back to Faculty Dashboard' : '✕ Close';

      modal = `
        <div class="stage-editor-fullpage" role="dialog" aria-modal="true" style="position:fixed !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;inset:0 !important;width:100vw !important;height:100vh !important;max-width:100vw !important;max-height:100vh !important;margin:0 !important;padding:0 !important;background:var(--bg,#f8fafc) !important;backdrop-filter:none !important;-webkit-backdrop-filter:none !important;z-index:999999 !important;display:flex !important;flex-direction:column !important;overflow:hidden !important;box-sizing:border-box !important;">
          <div style="background:var(--surface,#ffffff) !important;width:100% !important;height:100% !important;max-width:100% !important;max-height:100% !important;margin:0 !important;padding:0 !important;border:none !important;border-radius:0 !important;box-shadow:none !important;display:flex !important;flex-direction:column !important;overflow:hidden !important;box-sizing:border-box !important;">
            
            <!-- Full Page Header Bar -->
            <div style="padding:14px 32px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;background:var(--surface);flex-shrink:0;">
              <div style="display:flex;align-items:center;gap:16px;">
                <img src="assets/kle_tech_logo.png" alt="KLE Tech" style="height:34px;width:auto;object-fit:contain;">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:12px;font-weight:800;background:var(--accent,#2563eb);color:#fff;padding:2px 8px;border-radius:4px;letter-spacing:0.5px;">TEAM ${esc(teamId)}</span>
                    <h2 style="margin:0;font-size:18px;font-weight:800;color:var(--ink);">Edit Project Portfolio &amp; Stage Data</h2>
                  </div>
                  <span style="font-size:12.5px;color:var(--muted);font-weight:600;">${esc(curTeam?.title || 'Mini-Project')} · Department of CSE(AI)</span>
                </div>
              </div>
              <button type="button" class="btn secondary" onclick="closeModal()" style="padding:8px 18px;font-size:13px;font-weight:700;">${closeBtnLabel}</button>
            </div>

            <!-- Full-width Stage Switcher Tabs -->
            <div style="display:flex;gap:8px;padding:12px 32px;background:var(--bg-subtle,#f1f5f9);border-bottom:1px solid var(--line);overflow-x:auto;flex-shrink:0;">
              ${stageTabs.map(st => `
                <button type="button" class="btn ${stageId === st.id ? '' : 'secondary'}" onclick="window.openStageDataEditor('${st.id}')" style="padding:8px 18px;font-size:13px;font-weight:700;white-space:nowrap;border-radius:6px;">
                  ${st.label}
                </button>
              `).join('')}
            </div>

            <!-- Full-width Scrollable Form Body with Clean Container -->
            <div style="flex:1;overflow-y:auto;padding:32px;background:var(--bg,#f8fafc);">
              <div style="max-width:1100px;margin:0 auto;display:flex;flex-direction:column;gap:22px;background:var(--surface);padding:32px 36px;border-radius:12px;border:1px solid var(--line);box-shadow:var(--shadow-sm,0 1px 3px rgba(0,0,0,0.06));">
                ${contentHtml}
              </div>
            </div>

            <!-- Full-width Sticky Footer -->
            <div style="padding:16px 32px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;background:var(--surface);flex-shrink:0;">
              <span style="font-size:12.5px;color:var(--muted);">All inputs are saved directly to the team portfolio and verified across all stage milestones.</span>
              <div style="display:flex;gap:12px;">
                <button type="button" class="btn secondary" onclick="closeModal()" style="padding:10px 22px;font-size:13.5px;font-weight:700;">Cancel</button>
                <button type="button" class="btn" onclick="window.saveStageDataFromModal('${stageId}')" style="padding:10px 26px;font-size:13.5px;font-weight:700;">
                  ✓ Save Stage Data
                </button>
              </div>
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
      if(root.__stagePendingImages && root.__stagePendingImages['stg0-flow'] !== undefined){
        data.conceptualFlowImage = root.__stagePendingImages['stg0-flow'];
      }

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
      if(root.__stagePendingImages && root.__stagePendingImages['stg1-uc'] !== undefined){
        data.useCaseImage = root.__stagePendingImages['stg1-uc'];
      }

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
      if(root.__stagePendingImages && root.__stagePendingImages['stgsys-arch'] !== undefined){
        data.architectureImage = root.__stagePendingImages['stgsys-arch'];
      }
      if(root.__stagePendingImages && root.__stagePendingImages['stgsys-data'] !== undefined){
        data.dataDesignImage = root.__stagePendingImages['stgsys-data'];
      }
      if(root.__stagePendingImages && root.__stagePendingImages['stgsys-algo'] !== undefined){
        data.algorithmDesignImage = root.__stagePendingImages['stgsys-algo'];
      }

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
      if(root.__stagePendingImages && root.__stagePendingImages['stg2-impl'] !== undefined){
        data.implImage = root.__stagePendingImages['stg2-impl'];
      }

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
      if(root.__stagePendingImages && root.__stagePendingImages['stg3-test'] !== undefined){
        data.testingImage = root.__stagePendingImages['stg3-test'];
      }
    }

    root.saveTeamCustomStageData(teamId, stageId, data);
    if(typeof modal !== 'undefined') modal = null;
    if(typeof toast === 'function') toast('✓ Stage data saved successfully! Portfolio updated.');
    if(typeof render === 'function') render();
    if(typeof page !== 'undefined' && page === 'Team Portfolio' && typeof switchPortfolioStage === 'function') switchPortfolioStage(stageId, true);
  };

})(typeof window !== 'undefined' ? window : global);
