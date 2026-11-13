/**
 * ProjectGate AI - Student Stage Data Ingestion & Editor
 * Allows students to enter and customize their stage milestone data
 * for Stage 0 (Problem Scope), Stage 1 (Requirements), Stage 2 (System Design),
 * Stage 3 (Implementation), and Stage 4 (Testing & Validations).
 */
(function(root){
  'use strict';

  function esc(str){
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

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
      const str = String(mediaUrl || '');
      const ytMatch = str.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
      const driveMatch = str.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
      if(ytMatch){
        mediaContainer.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${ytMatch[1]}" style="width:140px; height:80px; border:0; border-radius:6px;" allowfullscreen></iframe>`;
      } else if(driveMatch){
        mediaContainer.innerHTML = `<iframe src="https://drive.google.com/file/d/${driveMatch[1]}/preview" style="width:140px; height:80px; border:0; border-radius:6px;"></iframe>`;
      } else if(isVideo){
        mediaContainer.innerHTML = `<video id="preview-video-${key}" src="${mediaUrl}" controls style="max-height:80px; max-width:140px; border-radius:6px; background:#000;"></video>`;
      } else {
        mediaContainer.innerHTML = `<img id="preview-img-${key}" src="${mediaUrl}" alt="Preview" style="max-height:80px; max-width:140px; border-radius:6px; object-fit:contain; border:1px solid var(--line); background:#fff;">`;
      }
    }
    if(titleEl){
      titleEl.innerHTML = isVideo ? '🎬 Video Attached (Cloud Firestore Ready)' : '🖼️ Diagram Attached (Cloud Firestore Ready)';
    }
    if(subEl){
      subEl.textContent = 'Attached to your project portfolio · Click "Save Stage Data" to apply';
    }
    if(previewBox) previewBox.style.display = 'flex';
  }

  root.promptMediaUrl = function(key){
    const val = prompt('Enter Image or Video URL (e.g. YouTube video, Google Drive view link, or direct image link):', '');
    if(!val || !val.trim()) return;
    const url = val.trim();
    root.__stagePendingImages[key] = url;
    const isVid = root.isMediaVideo(url);
    updateMediaPreviewUI(key, url, isVid, false);
    if(typeof toast === 'function') toast('✓ Media link attached! Click "Save Stage Data" to apply.');
  };
  if(typeof window !== 'undefined') window.promptMediaUrl = root.promptMediaUrl;

    root.handleStageImageUpload = async function(event, key){
    const file = event.target.files && event.target.files[0];
    if(!file) return;

    const isVid = file.type ? file.type.startsWith('video/') : /\.(mp4|webm|ogg|mov)$/i.test(file.name);
    const isImg = file.type ? file.type.startsWith('image/') : /\.(png|jpe?g|webp|gif)$/i.test(file.name);

    if(!isVid && !isImg){
      if(typeof toast === 'function') toast('Please select an image (PNG, JPEG, WebP) or video (MP4, WebM) file.');
      return;
    }

    if(isImg){
      const reader = new FileReader();
      reader.onload = function(e){
        const img = new Image();
        img.onload = function(){
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;
          if(width > maxDim || height > maxDim){
            if(width > height){
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.85);
          root.__stagePendingImages[key] = dataUrl;
          updateMediaPreviewUI(key, dataUrl, false);
          if(typeof toast === 'function') toast('✓ Diagram attached! Click "Save Stage Data" to apply.');
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
            <span style="font-size:11.5px; color:var(--muted);">${esc(helpText)} · Cloud Firestore Sync (100% Free)</span>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <label class="btn secondary" style="cursor:pointer; padding:6px 14px; font-size:12px; font-weight:700; display:inline-flex; align-items:center; gap:6px;">
              <span>📁 Upload Image / Video</span>
              <input type="file" id="input-file-${key}" accept="image/png, image/jpeg, image/jpg, image/webp, video/mp4, video/webm" style="display:none;" onchange="window.handleStageImageUpload(event, '${key}')">
            </label>
            <button type="button" class="btn secondary" style="padding:6px 12px; font-size:12px; font-weight:700;" onclick="window.promptMediaUrl('${key}')">
              <span>🔗 Paste Link</span>
            </button>
          </div>
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


  // Helper functions for dynamic table row insertion
  root.addScopeRow = function(item, type, reason){
    const tbody = document.querySelector('#table-edit-scope tbody');
    if(!tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="tbl-input col-scope-item" placeholder="e.g. Live multi-point packet capture" value="${esc(item || '')}"></td>
      <td>
        <select class="tbl-input col-scope-type">
          <option value="in" ${type === 'in' || !type ? 'selected' : ''}>In-Scope</option>
          <option value="out" ${type === 'out' ? 'selected' : ''}>Out-of-Scope</option>
        </select>
      </td>
      <td><input type="text" class="tbl-input col-scope-reason" placeholder="e.g. Core MVP deliverable" value="${esc(reason || '')}"></td>
    `;
    tbody.appendChild(tr);
  };

  root.addCourseRow = function(course, concepts, role){
    const tbody = document.querySelector('#table-edit-courses tbody');
    if(!tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="tbl-input col-course-name" placeholder="e.g. Computer Networks" value="${esc(course || '')}"></td>
      <td><input type="text" class="tbl-input col-course-concepts" placeholder="e.g. Packet encapsulation, TCP/UDP headers, Transit delay" value="${esc(concepts || '')}"></td>
      <td>
        <select class="tbl-input col-course-role">
          <option value="Dominant" ${role !== 'Supporting' ? 'selected' : ''}>Dominant</option>
          <option value="Supporting" ${role === 'Supporting' ? 'selected' : ''}>Supporting</option>
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  };

  root.addFrRow = function(id, desc, priority){
    const tbody = document.querySelector('#table-edit-fr tbody');
    if(!tbody) return;
    const count = tbody.querySelectorAll('tr').length + 1;
    const defaultId = id || ('FR-' + String(count).padStart(2, '0'));
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="tbl-input col-fr-id" placeholder="FR-01" value="${esc(defaultId)}"></td>
      <td><input type="text" class="tbl-input col-fr-desc" placeholder="The system shall capture live packets at both probe interfaces..." value="${esc(desc || '')}"></td>
      <td>
        <select class="tbl-input col-fr-priority">
          <option value="Mandatory" ${priority === 'Mandatory' || !priority ? 'selected' : ''}>Mandatory</option>
          <option value="High" ${priority === 'High' ? 'selected' : ''}>High</option>
          <option value="Medium" ${priority === 'Medium' ? 'selected' : ''}>Medium</option>
          <option value="Low" ${priority === 'Low' ? 'selected' : ''}>Low</option>
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  };

  root.addNfrRow = function(id, cat, desc, target){
    const tbody = document.querySelector('#table-edit-nfr tbody');
    if(!tbody) return;
    const count = tbody.querySelectorAll('tr').length + 1;
    const defaultId = id || ('NFR-' + String(count).padStart(2, '0'));
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="tbl-input col-nfr-id" placeholder="NFR-01" value="${esc(defaultId)}"></td>
      <td>
        <select class="tbl-input col-nfr-cat">
          <option value="Performance" ${cat === 'Performance' || !cat ? 'selected' : ''}>Performance</option>
          <option value="Reliability" ${cat === 'Reliability' ? 'selected' : ''}>Reliability</option>
          <option value="Security" ${cat === 'Security' ? 'selected' : ''}>Security</option>
          <option value="Scalability" ${cat === 'Scalability' ? 'selected' : ''}>Scalability</option>
          <option value="Maintainability" ${cat === 'Maintainability' ? 'selected' : ''}>Maintainability</option>
          <option value="Usability" ${cat === 'Usability' ? 'selected' : ''}>Usability</option>
        </select>
      </td>
      <td><input type="text" class="tbl-input col-nfr-desc" placeholder="Low-latency live packet streaming without dropping socket frames..." value="${esc(desc || '')}"></td>
      <td><input type="text" class="tbl-input col-nfr-target" placeholder="e.g. < 200 ms latency under 10k pkts/sec" value="${esc(target || '')}"></td>
    `;
    tbody.appendChild(tr);
  };

  root.addUcRow = function(id, actor, title, desc){
    const tbody = document.querySelector('#table-edit-uc tbody');
    if(!tbody) return;
    const count = tbody.querySelectorAll('tr').length + 1;
    const defaultId = id || ('UC-' + String(count).padStart(2, '0'));
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="tbl-input col-uc-id" placeholder="UC-01" value="${esc(defaultId)}"></td>
      <td><input type="text" class="tbl-input col-uc-actor" placeholder="e.g. Administrator" value="${esc(actor || 'User')}"></td>
      <td><input type="text" class="tbl-input col-uc-title" placeholder="e.g. Configure Packet Capture" value="${esc(title || '')}"></td>
      <td><input type="text" class="tbl-input col-uc-desc" placeholder="e.g. Select interface → start capture → stream telemetry" value="${esc(desc || '')}"></td>
    `;
    tbody.appendChild(tr);
  };

  root.addModuleRow = function(name, desc){
    const tbody = document.querySelector('#table-edit-modules tbody');
    if(!tbody) return;
    const count = tbody.querySelectorAll('tr').length + 1;
    const defaultName = name || ('Module ' + count);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="tbl-input col-mod-name" placeholder="e.g. IngestionEngine" value="${esc(defaultName)}"></td>
      <td><input type="text" class="tbl-input col-mod-desc" placeholder="e.g. Captures raw socket frames and parses IP/TCP headers" value="${esc(desc || '')}"></td>
    `;
    tbody.appendChild(tr);
  };

  root.addTestRow = function(id, feature, result, status){
    const tbody = document.querySelector('#table-edit-tests tbody');
    if(!tbody) return;
    const count = tbody.querySelectorAll('tr').length + 1;
    const defaultId = id || ('TC-' + String(count).padStart(2, '0'));
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="tbl-input col-test-id" placeholder="TC-01" value="${esc(defaultId)}"></td>
      <td><input type="text" class="tbl-input col-test-feature" placeholder="e.g. Multi-probe packet capture verification" value="${esc(feature || '')}"></td>
      <td><input type="text" class="tbl-input col-test-result" placeholder="e.g. 100% packets captured without drop" value="${esc(result || '')}"></td>
      <td>
        <select class="tbl-input col-test-status">
          <option value="PASS" ${status !== 'FAIL' ? 'selected' : ''}>PASS</option>
          <option value="FAIL" ${status === 'FAIL' ? 'selected' : ''}>FAIL</option>
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  };

  if(typeof window !== 'undefined'){
    window.addScopeRow = root.addScopeRow;
    window.addCourseRow = root.addCourseRow;
    window.addFrRow = root.addFrRow;
    window.addNfrRow = root.addNfrRow;
    window.addUcRow = root.addUcRow;
    window.addModuleRow = root.addModuleRow;
    window.addTestRow = root.addTestRow;
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

      // Combine existing scope items into rows
      const scopeRows = [];
      (cur0.scopeInTable || []).forEach(s => scopeRows.push({ item: s.item || s, type: 'in', reason: s.reason || 'In-Scope deliverable' }));
      (cur0.scopeOutTable || []).forEach(s => scopeRows.push({ item: s.item || s, type: 'out', reason: s.reason || 'Out of Scope boundary' }));
      if(!scopeRows.length && cur0.inScope){
        cur0.inScope.split('\n').map(s => s.trim()).filter(Boolean).forEach(s => scopeRows.push({ item: s, type: 'in', reason: 'In-Scope deliverable' }));
      }
      if(!scopeRows.length && cur0.outScope){
        cur0.outScope.split('\n').map(s => s.trim()).filter(Boolean).forEach(s => {
          const parts = s.split('--');
          scopeRows.push({ item: (parts[0] || '').trim(), type: 'out', reason: (parts[1] || 'Out of Scope').trim() });
        });
      }
      if(scopeRows.length === 0){
        scopeRows.push({ item: '', type: 'in', reason: '' }, { item: '', type: 'out', reason: '' });
      }

      // Course mapping rows
      const courseRows = (cur0.coursesTable || []).map(c => ({
        course: c.course || '',
        concepts: c.concepts || '',
        role: c.role || 'Dominant'
      }));
      if(courseRows.length === 0){
        courseRows.push({ course: '', concepts: '', role: 'Dominant' }, { course: '', concepts: '', role: 'Dominant' });
      }

      contentHtml = `
        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. Problem Statement *</label>
          <textarea id="edit-stg0-problem" rows="4" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur0.problem || '')}</textarea>
        </div>

        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">2. Project Objectives (one per line) *</label>
          <textarea id="edit-stg0-objectives" rows="4" placeholder="Objective 1\nObjective 2\nObjective 3" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(objectivesText)}</textarea>
        </div>

        <div style="margin-top:4px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">3. Scope Boundaries &amp; Exclusions (Table 0.3) *</label>
          <span style="display:block;font-size:11.5px;color:var(--muted);margin-bottom:8px;">Define in-scope core features and out-of-scope boundaries with engineering justifications.</span>
          <div class="tbl-builder-wrap">
            <table class="tbl-builder" id="table-edit-scope">
              <thead>
                <tr>
                  <th style="width:40%;">Feature / Component / Subsystem</th>
                  <th style="width:20%;">Scope Status</th>
                  <th style="width:40%;">Engineering Justification / Details</th>
                </tr>
              </thead>
              <tbody>
                ${scopeRows.map(s => `
                  <tr>
                    <td><input type="text" class="tbl-input col-scope-item" placeholder="e.g. Live multi-point packet capture" value="${esc(s.item || '')}"></td>
                    <td>
                      <select class="tbl-input col-scope-type">
                        <option value="in" ${s.type === 'in' ? 'selected' : ''}>In-Scope</option>
                        <option value="out" ${s.type === 'out' ? 'selected' : ''}>Out-of-Scope</option>
                      </select>
                    </td>
                    <td><input type="text" class="tbl-input col-scope-reason" placeholder="e.g. Core MVP deliverable" value="${esc(s.reason || '')}"></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <button type="button" class="btn-tbl-add" onclick="window.addScopeRow()">+ Add Scope Item</button>
        </div>

        <div style="margin-top:4px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">4. Foundation Course Integration (Table 0.4) *</label>
          <span style="display:block;font-size:11.5px;color:var(--muted);margin-bottom:8px;">Map core computer science curriculum courses (DAA, OS, CN, DBMS) to theoretical concepts used.</span>
          <div class="tbl-builder-wrap">
            <table class="tbl-builder" id="table-edit-courses">
              <thead>
                <tr>
                  <th style="width:30%;">Course Name</th>
                  <th style="width:50%;">Theoretical Concepts &amp; Techniques Applied</th>
                  <th style="width:20%;">Curriculum Role</th>
                </tr>
              </thead>
              <tbody>
                ${courseRows.map(c => `
                  <tr>
                    <td><input type="text" class="tbl-input col-course-name" placeholder="e.g. Computer Networks" value="${esc(c.course || '')}"></td>
                    <td><input type="text" class="tbl-input col-course-concepts" placeholder="e.g. Packet encapsulation, TCP/UDP headers, Transit delay" value="${esc(c.concepts || '')}"></td>
                    <td>
                      <select class="tbl-input col-course-role">
                        <option value="Dominant" ${c.role !== 'Supporting' ? 'selected' : ''}>Dominant</option>
                        <option value="Supporting" ${c.role === 'Supporting' ? 'selected' : ''}>Supporting</option>
                      </select>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <button type="button" class="btn-tbl-add" onclick="window.addCourseRow()">+ Add Course Row</button>
        </div>

        ${renderImageUploadField('stg0-flow', '5. Conceptual Workflow / Problem Scope Diagram', 'Insert conceptual flow diagram or problem scope illustration.', cur0.conceptualFlowImage)}
      `;
    } else if(stageId === '1'){
      const cur1 = Object.assign({}, staticTeam?.stage1 || {}, customData['1'] || {});

      // FR rows
      let frRows = (cur1.frTable || []).map(f => ({
        id: f.id || 'FR-01',
        desc: f.desc || '',
        priority: f.priority || 'Mandatory'
      }));
      if(!frRows.length && cur1.fr){
        cur1.fr.split('\n').map(l => l.trim()).filter(Boolean).forEach((line, i) => {
          const parts = line.split(':');
          frRows.push({
            id: (parts[0] || '').trim() || ('FR-' + String(i + 1).padStart(2, '0')),
            desc: (parts[1] || parts[0] || '').trim(),
            priority: 'Mandatory'
          });
        });
      }
      if(frRows.length === 0){
        frRows.push({ id: 'FR-01', desc: '', priority: 'Mandatory' }, { id: 'FR-02', desc: '', priority: 'Mandatory' });
      }

      // NFR rows
      let nfrRows = (cur1.nfrTable || []).map(n => ({
        id: n.id || 'NFR-01',
        cat: n.cat || n.category || 'Performance',
        desc: n.desc || '',
        target: n.target || ''
      }));
      if(!nfrRows.length && cur1.nfr){
        cur1.nfr.split('\n').map(l => l.trim()).filter(Boolean).forEach((line, i) => {
          const idMatch = line.match(/^([A-Za-z0-9_-]+)/);
          nfrRows.push({
            id: idMatch ? idMatch[1] : ('NFR-' + String(i + 1).padStart(2, '0')),
            cat: 'Performance',
            desc: line,
            target: 'Measured in testing'
          });
        });
      }
      if(nfrRows.length === 0){
        nfrRows.push({ id: 'NFR-01', cat: 'Performance', desc: '', target: '' }, { id: 'NFR-02', cat: 'Reliability', desc: '', target: '' });
      }

      // Use Case rows
      let ucRows = (cur1.useCases || []).map(u => ({
        id: u.id || 'UC-01',
        actor: u.actor || 'User',
        title: u.title || '',
        desc: u.desc || u.mainFlow || ''
      }));
      if(!ucRows.length && cur1.usecases){
        cur1.usecases.split('\n').map(l => l.trim()).filter(Boolean).forEach((line, i) => {
          const parts = line.split(':');
          ucRows.push({
            id: 'UC-' + String(i + 1).padStart(2, '0'),
            actor: 'User',
            title: (parts[0] || '').trim(),
            desc: (parts[1] || parts[0] || '').trim()
          });
        });
      }
      if(ucRows.length === 0){
        ucRows.push({ id: 'UC-01', actor: 'Administrator', title: '', desc: '' }, { id: 'UC-02', actor: 'Client User', title: '', desc: '' });
      }

      contentHtml = `
        <div style="margin-top:4px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. Functional Requirements (Table 1.1) *</label>
          <span style="display:block;font-size:11.5px;color:var(--muted);margin-bottom:8px;">Define functional capabilities with unique identifiers and requirement descriptions.</span>
          <div class="tbl-builder-wrap">
            <table class="tbl-builder" id="table-edit-fr">
              <thead>
                <tr>
                  <th style="width:16%;">FR ID</th>
                  <th style="width:68%;">Requirement Description</th>
                  <th style="width:16%;">Priority</th>
                </tr>
              </thead>
              <tbody>
                ${frRows.map(f => `
                  <tr>
                    <td><input type="text" class="tbl-input col-fr-id" placeholder="FR-01" value="${esc(f.id || '')}"></td>
                    <td><input type="text" class="tbl-input col-fr-desc" placeholder="The system shall capture live packet observations..." value="${esc(f.desc || '')}"></td>
                    <td>
                      <select class="tbl-input col-fr-priority">
                        <option value="Mandatory" ${f.priority === 'Mandatory' || !f.priority ? 'selected' : ''}>Mandatory</option>
                        <option value="High" ${f.priority === 'High' ? 'selected' : ''}>High</option>
                        <option value="Medium" ${f.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                        <option value="Low" ${f.priority === 'Low' ? 'selected' : ''}>Low</option>
                      </select>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <button type="button" class="btn-tbl-add" onclick="window.addFrRow()">+ Add Functional Requirement</button>
        </div>

        <div style="margin-top:14px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">2. Non-Functional Requirements (Table 1.2) *</label>
          <span style="display:block;font-size:11.5px;color:var(--muted);margin-bottom:8px;">Specify quantitative quality criteria (Performance latency, Reliability, Security SLA).</span>
          <div class="tbl-builder-wrap">
            <table class="tbl-builder" id="table-edit-nfr">
              <thead>
                <tr>
                  <th style="width:14%;">NFR ID</th>
                  <th style="width:20%;">Category</th>
                  <th style="width:44%;">Quality Requirement Statement</th>
                  <th style="width:22%;">Target Metric / SLA</th>
                </tr>
              </thead>
              <tbody>
                ${nfrRows.map(n => `
                  <tr>
                    <td><input type="text" class="tbl-input col-nfr-id" placeholder="NFR-01" value="${esc(n.id || '')}"></td>
                    <td>
                      <select class="tbl-input col-nfr-cat">
                        <option value="Performance" ${n.cat === 'Performance' || !n.cat ? 'selected' : ''}>Performance</option>
                        <option value="Reliability" ${n.cat === 'Reliability' ? 'selected' : ''}>Reliability</option>
                        <option value="Security" ${n.cat === 'Security' ? 'selected' : ''}>Security</option>
                        <option value="Scalability" ${n.cat === 'Scalability' ? 'selected' : ''}>Scalability</option>
                        <option value="Maintainability" ${n.cat === 'Maintainability' ? 'selected' : ''}>Maintainability</option>
                        <option value="Usability" ${n.cat === 'Usability' ? 'selected' : ''}>Usability</option>
                      </select>
                    </td>
                    <td><input type="text" class="tbl-input col-nfr-desc" placeholder="Low-latency live packet streaming without dropping frames" value="${esc(n.desc || '')}"></td>
                    <td><input type="text" class="tbl-input col-nfr-target" placeholder="e.g. < 200 ms latency" value="${esc(n.target || '')}"></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <button type="button" class="btn-tbl-add" onclick="window.addNfrRow()">+ Add Non-Functional Requirement</button>
        </div>

        <div style="margin-top:14px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">3. Use Cases / Core Scenarios (Table 1.3) *</label>
          <span style="display:block;font-size:11.5px;color:var(--muted);margin-bottom:8px;">Define core actor interactions, workflow scenarios, and system responsibilities.</span>
          <div class="tbl-builder-wrap">
            <table class="tbl-builder" id="table-edit-uc">
              <thead>
                <tr>
                  <th style="width:14%;">UC ID</th>
                  <th style="width:20%;">Primary Actor</th>
                  <th style="width:28%;">Use Case Title / Goal</th>
                  <th style="width:38%;">Main Workflow Steps</th>
                </tr>
              </thead>
              <tbody>
                ${ucRows.map(u => `
                  <tr>
                    <td><input type="text" class="tbl-input col-uc-id" placeholder="UC-01" value="${esc(u.id || '')}"></td>
                    <td><input type="text" class="tbl-input col-uc-actor" placeholder="e.g. Administrator" value="${esc(u.actor || 'User')}"></td>
                    <td><input type="text" class="tbl-input col-uc-title" placeholder="e.g. Live Traffic Capture" value="${esc(u.title || '')}"></td>
                    <td><input type="text" class="tbl-input col-uc-desc" placeholder="e.g. Select interface → start capture" value="${esc(u.desc || '')}"></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <button type="button" class="btn-tbl-add" onclick="window.addUcRow()">+ Add Use Case</button>
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
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. System Architecture Overview &amp; Component Points *</label>
          <textarea id="edit-stgsys-arch" rows="4" placeholder="Detail high-level system layers, services, IPC / REST contracts…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(archText)}</textarea>
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
      
      // Module rows
      let modRows = (cur2.modules || []).map(m => typeof m === 'object' ? { name: m.name || m.module || '', desc: m.desc || m.description || '' } : { name: String(m), desc: '' });
      if(!modRows.length && cur2.modulesText){
        cur2.modulesText.split('\n').map(l => l.trim()).filter(Boolean).forEach(line => {
          const parts = line.split(':');
          modRows.push({ name: (parts[0] || '').trim(), desc: (parts[1] || '').trim() });
        });
      }
      if(modRows.length === 0){
        modRows.push({ name: 'Core Engine Module', desc: '' }, { name: 'Data Pipeline Service', desc: '' });
      }

      contentHtml = `
        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. Implementation Summary &amp; Tech Stack *</label>
          <textarea id="edit-stg2-summary" rows="3" placeholder="Summary of languages, frameworks, libraries, and integration pipeline…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur2.summary || cur2.implementation || '')}</textarea>
        </div>

        <div style="margin-top:4px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">2. Core Modules &amp; Component Responsibilities *</label>
          <span style="display:block;font-size:11.5px;color:var(--muted);margin-bottom:8px;">Define core software modules, exported API boundaries, and system integration roles.</span>
          <div class="tbl-builder-wrap">
            <table class="tbl-builder" id="table-edit-modules">
              <thead>
                <tr>
                  <th style="width:34%;">Module / Component Name</th>
                  <th style="width:66%;">Description &amp; Integration Responsibility</th>
                </tr>
              </thead>
              <tbody>
                ${modRows.map(m => `
                  <tr>
                    <td><input type="text" class="tbl-input col-mod-name" placeholder="e.g. IngestionEngine" value="${esc(m.name || '')}"></td>
                    <td><input type="text" class="tbl-input col-mod-desc" placeholder="e.g. Captures raw socket frames and parses IP/TCP headers" value="${esc(m.desc || '')}"></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <button type="button" class="btn-tbl-add" onclick="window.addModuleRow()">+ Add Module</button>
        </div>

        <div style="margin-top:14px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">3. Project Repository URL (GitHub / GitLab)</label>
          <input id="edit-stg2-repo" type="url" value="${esc(cur2.repo || cur2.repoUrl || curTeam?.repo || 'https://github.com')}" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;">
        </div>

        <div style="margin-top:14px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">4. Technical Challenges &amp; Mitigations</label>
          <textarea id="edit-stg2-challenges" rows="3" placeholder="Key bottlenecks, bugs encountered, and how they were resolved…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur2.challenges || '')}</textarea>
        </div>

        ${renderImageUploadField('stg2-impl', '5. Implementation / Component Evidence Diagram', 'Insert core component diagram, code pipeline, or UI screen implementation screenshot.', cur2.implImage)}
      `;
    } else if(stageId === '3'){
      const cur3 = Object.assign({}, staticTeam?.stage3 || {}, customData['3'] || {});
      
      // Test rows
      let testRows = (cur3.tests || []).map(t => typeof t === 'object' ? { id: t.id || 'TC-01', feature: t.feature || t.name || '', result: t.result || 'PASS', status: t.status || 'PASS' } : { id: 'TC-01', feature: String(t), result: 'PASS', status: 'PASS' });
      if(!testRows.length && cur3.testsText){
        cur3.testsText.split('\n').map(l => l.trim()).filter(Boolean).forEach((line, i) => {
          const parts = line.split('--');
          const left = (parts[0] || '').split(':');
          testRows.push({
            id: (left[0] || '').trim() || ('TC-' + String(i + 1).padStart(2, '0')),
            feature: (left[1] || left[0] || '').trim(),
            result: (parts[1] || 'PASS').trim(),
            status: (parts[1] || '').toLowerCase().includes('fail') ? 'FAIL' : 'PASS'
          });
        });
      }
      if(testRows.length === 0){
        testRows.push({ id: 'TC-01', feature: '', result: '100% tests passing', status: 'PASS' }, { id: 'TC-02', feature: '', result: 'Verified without conflict', status: 'PASS' });
      }

      contentHtml = `
        <div>
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">1. Testing &amp; Validation Strategy *</label>
          <textarea id="edit-stg3-strategy" rows="3" placeholder="Unit testing, integration testing, benchmark test harness…" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur3.strategy || cur3.testing || '')}</textarea>
        </div>

        <div style="margin-top:4px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">2. Test Execution &amp; Verification Matrix *</label>
          <span style="display:block;font-size:11.5px;color:var(--muted);margin-bottom:8px;">Document automated test cases, targeted functional features, and observed verification results.</span>
          <div class="tbl-builder-wrap">
            <table class="tbl-builder" id="table-edit-tests">
              <thead>
                <tr>
                  <th style="width:14%;">Test ID</th>
                  <th style="width:48%;">Target Feature / Requirement Verified</th>
                  <th style="width:26%;">Expected Result &amp; Metric Output</th>
                  <th style="width:12%;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${testRows.map(t => `
                  <tr>
                    <td><input type="text" class="tbl-input col-test-id" placeholder="TC-01" value="${esc(t.id || '')}"></td>
                    <td><input type="text" class="tbl-input col-test-feature" placeholder="e.g. Live packet capture" value="${esc(t.feature || '')}"></td>
                    <td><input type="text" class="tbl-input col-test-result" placeholder="e.g. 100% capture pass" value="${esc(t.result || '')}"></td>
                    <td>
                      <select class="tbl-input col-test-status">
                        <option value="PASS" ${t.status !== 'FAIL' ? 'selected' : ''}>PASS</option>
                        <option value="FAIL" ${t.status === 'FAIL' ? 'selected' : ''}>FAIL</option>
                      </select>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <button type="button" class="btn-tbl-add" onclick="window.addTestRow()">+ Add Test Case</button>
        </div>

        <div style="margin-top:14px;">
          <label style="display:block;font-size:12.5px;font-weight:700;margin-bottom:5px;color:var(--ink);">3. Performance &amp; Accuracy Metrics</label>
          <textarea id="edit-stg3-metrics" rows="2" placeholder="e.g. Generation Latency: 4.2s · Conflict Rate: 0.0% · Memory: 84 MB" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:13px;line-height:1.5;">${esc(cur3.metrics || '')}</textarea>
        </div>

        <div style="margin-top:14px;">
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
          <style>
            .tbl-builder-wrap { width:100%; overflow-x:auto; border:1px solid var(--line); border-radius:8px; background:var(--surface); margin-top:6px; box-shadow:0 1px 2px rgba(0,0,0,0.03); }
            .tbl-builder { width:100%; border-collapse:collapse; font-size:13px; min-width:640px; }
            .tbl-builder th { background:#f1f5f9; color:var(--ink); font-size:11.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; padding:10px 12px; border-bottom:1px solid var(--line); border-right:1px solid var(--line); text-align:left; }
            .tbl-builder td { padding:7px 8px; border-bottom:1px solid var(--line); border-right:1px solid var(--line); vertical-align:middle; background:#fff; }
            .tbl-builder tr:last-child td { border-bottom:none; }
            .tbl-builder td:last-child, .tbl-builder th:last-child { border-right:none; }
            .tbl-input { width:100%; box-sizing:border-box; padding:7px 10px; border-radius:6px; border:1px solid var(--line); background:#fff; color:var(--ink); font-size:12.5px; outline:none; transition:border-color 0.15s, box-shadow 0.15s; }
            .tbl-input:focus { border-color:#2563eb; box-shadow:0 0 0 2px rgba(37,99,235,0.12); }
            .btn-tbl-add { display:inline-flex; align-items:center; gap:6px; margin-top:8px; padding:7px 16px; font-size:12px; font-weight:700; border-radius:6px; border:1px solid var(--line); background:#f8fafc; color:var(--ink); cursor:pointer; transition:all 0.15s; }
            .btn-tbl-add:hover { background:#e2e8f0; border-color:#cbd5e1; }
          </style>
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
      const objectives = objectivesRaw.split('\n').map(s => s.trim()).filter(Boolean);

      // Read Scope Table
      const scopeRows = document.querySelectorAll('#table-edit-scope tbody tr');
      const scopeInTable = [];
      const scopeOutTable = [];
      scopeRows.forEach(row => {
        const item = (row.querySelector('.col-scope-item')?.value || '').trim();
        const type = (row.querySelector('.col-scope-type')?.value || 'in').trim();
        const reason = (row.querySelector('.col-scope-reason')?.value || '').trim();
        if(item){
          if(type === 'in'){
            scopeInTable.push({
              num: String(scopeInTable.length + 1).padStart(2, '0'),
              item,
              reason: reason || 'In-Scope deliverable'
            });
          } else {
            scopeOutTable.push({
              num: String(scopeOutTable.length + 1).padStart(2, '0'),
              item,
              reason: reason || 'Out of Scope boundary'
            });
          }
        }
      });

      // Read Courses Table
      const courseRows = document.querySelectorAll('#table-edit-courses tbody tr');
      const coursesTable = [];
      courseRows.forEach(row => {
        const course = (row.querySelector('.col-course-name')?.value || '').trim();
        const concepts = (row.querySelector('.col-course-concepts')?.value || '').trim();
        const role = (row.querySelector('.col-course-role')?.value || 'Dominant').trim();
        if(course){
          coursesTable.push({
            sl: String(coursesTable.length + 1).padStart(2, '0'),
            course,
            concepts: concepts || 'Theoretical foundation',
            role
          });
        }
      });

      data = {
        problem,
        objectives,
        scopeInTable,
        scopeOutTable,
        coursesTable,
        inScope: scopeInTable.map(s => s.item).join('\n'),
        outScope: scopeOutTable.map(s => `${s.item} -- ${s.reason}`).join('\n')
      };
      if(root.__stagePendingImages && root.__stagePendingImages['stg0-flow'] !== undefined){
        data.conceptualFlowImage = root.__stagePendingImages['stg0-flow'];
      }

    } else if(stageId === '1'){
      // Read FR Table
      const frRows = document.querySelectorAll('#table-edit-fr tbody tr');
      const frTable = [];
      frRows.forEach((row, i) => {
        const id = (row.querySelector('.col-fr-id')?.value || '').trim() || ('FR-' + String(i + 1).padStart(2, '0'));
        const desc = (row.querySelector('.col-fr-desc')?.value || '').trim();
        const priority = (row.querySelector('.col-fr-priority')?.value || 'Mandatory').trim();
        if(desc){
          frTable.push({ id, desc, priority, sourceNeed: 'Stakeholder Requirement' });
        }
      });

      // Read NFR Table
      const nfrRows = document.querySelectorAll('#table-edit-nfr tbody tr');
      const nfrTable = [];
      nfrRows.forEach((row, i) => {
        const id = (row.querySelector('.col-nfr-id')?.value || '').trim() || ('NFR-' + String(i + 1).padStart(2, '0'));
        const cat = (row.querySelector('.col-nfr-cat')?.value || 'Performance').trim();
        const desc = (row.querySelector('.col-nfr-desc')?.value || '').trim();
        const target = (row.querySelector('.col-nfr-target')?.value || '').trim();
        if(desc || target){
          nfrTable.push({ id, cat, desc: desc || target, target: target || desc });
        }
      });

      // Read Use Cases Table
      const ucRows = document.querySelectorAll('#table-edit-uc tbody tr');
      const useCases = [];
      ucRows.forEach((row, i) => {
        const id = (row.querySelector('.col-uc-id')?.value || '').trim() || ('UC-' + String(i + 1).padStart(2, '0'));
        const actor = (row.querySelector('.col-uc-actor')?.value || 'User').trim();
        const title = (row.querySelector('.col-uc-title')?.value || '').trim();
        const desc = (row.querySelector('.col-uc-desc')?.value || '').trim();
        if(title || desc){
          useCases.push({
            id,
            actor,
            title: title || desc.slice(0, 40),
            desc: desc || title,
            mainFlow: desc || title,
            exceptionFlow: 'Validation failure or service unavailable.'
          });
        }
      });

      data = {
        frTable,
        nfrTable,
        useCases,
        fr: frTable.map(f => `${f.id} : ${f.desc}`).join('\n'),
        nfr: nfrTable.map(n => `${n.id} [${n.cat}] : ${n.desc} (Target: ${n.target})`).join('\n'),
        usecases: useCases.map(u => `${u.id} - ${u.actor}: ${u.title} - ${u.desc}`).join('\n')
      };
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
        architecturePoints: architecturePoints.length ? architecturePoints : (arch ? [arch] : []),
        dataDesign,
        dataDesignPoints: dataDesignPoints.length ? dataDesignPoints : (dataDesign ? [dataDesign] : []),
        algorithmDesign: algo,
        algorithmDesignPoints: algorithmDesignPoints.length ? algorithmDesignPoints : (algo ? [algo] : [])
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
      const repo = (document.getElementById('edit-stg2-repo')?.value || '').trim();
      const challenges = (document.getElementById('edit-stg2-challenges')?.value || '').trim();

      // Read Modules Table
      const modRows = document.querySelectorAll('#table-edit-modules tbody tr');
      const modules = [];
      modRows.forEach((row, i) => {
        const name = (row.querySelector('.col-mod-name')?.value || '').trim();
        const desc = (row.querySelector('.col-mod-desc')?.value || '').trim();
        if(name){
          modules.push({ name, desc: desc || ('Implementation module ' + (i + 1)) });
        }
      });

      data = {
        summary,
        modules,
        repo,
        challenges,
        modulesText: modules.map(m => `${m.name} : ${m.desc}`).join('\n')
      };
      if(root.__stagePendingImages && root.__stagePendingImages['stg2-impl'] !== undefined){
        data.implImage = root.__stagePendingImages['stg2-impl'];
      }

    } else if(stageId === '3'){
      const strategy = (document.getElementById('edit-stg3-strategy')?.value || '').trim();
      const metrics = (document.getElementById('edit-stg3-metrics')?.value || '').trim();
      const evaluation = (document.getElementById('edit-stg3-evaluation')?.value || '').trim();

      // Read Tests Table
      const testRows = document.querySelectorAll('#table-edit-tests tbody tr');
      const tests = [];
      testRows.forEach((row, i) => {
        const id = (row.querySelector('.col-test-id')?.value || '').trim() || ('TC-' + String(i + 1).padStart(2, '0'));
        const feature = (row.querySelector('.col-test-feature')?.value || '').trim();
        const result = (row.querySelector('.col-test-result')?.value || 'PASS').trim();
        const status = (row.querySelector('.col-test-status')?.value || 'PASS').trim();
        if(feature){
          tests.push({
            id,
            feature,
            result: `${result} [${status}]`,
            status
          });
        }
      });

      data = {
        strategy,
        tests,
        metrics,
        evaluation,
        testsText: tests.map(t => `${t.id} : ${t.feature} -- ${t.result}`).join('\n')
      };
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


})(typeof window !== "undefined" ? window : global);
