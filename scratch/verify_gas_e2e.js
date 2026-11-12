const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = path.join(__dirname, '..', 'google_sites_apps_script');

// 1. Check JS syntax inside HTML partials
function extractScripts(html) {
  const matches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
  return matches.map(m => m[1]).join('\n');
}

['app_client.html', 'rag_mentor.html'].forEach(file => {
  const code = extractScripts(fs.readFileSync(path.join(DIR, file), 'utf8'));
  new vm.Script(code, { filename: file });
  console.log('Syntax OK:', file);
});

// 2. Execute Code.gs + SeedCohort.gs against in-memory SpreadsheetApp/DriveApp mocks
const propsStore = { DB_ID: 'MOCK_SHEET_123', ROOT_FOLDER_ID: 'MOCK_DRIVE_ROOT' };
const sheets = new Map();

function makeRange(sheetObj, r, c, numRows, numCols) {
  return {
    getValues() {
      const out = [];
      for (let i = 0; i < numRows; i++) {
        const row = sheetObj.data[r - 1 + i] || [];
        const slice = [];
        for (let j = 0; j < numCols; j++) slice.push(row[c - 1 + j] !== undefined ? row[c - 1 + j] : '');
        out.push(slice);
      }
      return out;
    },
    getDisplayValues() { return this.getValues().map(row => row.map(String)); },
    setValues(vals) {
      for (let i = 0; i < vals.length; i++) {
        const rowIdx = r - 1 + i;
        while (sheetObj.data.length <= rowIdx) sheetObj.data.push([]);
        for (let j = 0; j < vals[i].length; j++) {
          sheetObj.data[rowIdx][c - 1 + j] = vals[i][j];
        }
      }
      return this;
    },
    clearContent() {
      for (let i = 0; i < numRows; i++) {
        const rowIdx = r - 1 + i;
        if (sheetObj.data[rowIdx]) {
          for (let j = 0; j < numCols; j++) sheetObj.data[rowIdx][c - 1 + j] = '';
        }
      }
      return this;
    },
    setBackground() { return this; },
    setFontColor() { return this; },
    setFontWeight() { return this; }
  };
}

function makeSheet(name) {
  const obj = {
    name,
    data: [],
    getName() { return obj.name; },
    getLastRow() { return obj.data.length; },
    getLastColumn() { return obj.data.reduce((m, r) => Math.max(m, r.length), 0); },
    appendRow(row) { obj.data.push(row.slice()); },
    setFrozenRows() {},
    getRange(r, c, nr, nc) { return makeRange(obj, r, c, nr || 1, nc || 1); },
    getDataRange() {
      const lr = Math.max(1, obj.getLastRow());
      const lc = Math.max(1, obj.getLastColumn());
      return makeRange(obj, 1, 1, lr, lc);
    },
    deleteRow(rowNum) { obj.data.splice(rowNum - 1, 1); }
  };
  return obj;
}

const mockDb = {
  getId() { return 'MOCK_SHEET_123'; },
  getUrl() { return 'https://docs.google.com/spreadsheets/d/MOCK_SHEET_123/edit'; },
  getSheets() { return [...sheets.values()]; },
  getSheetByName(n) { return sheets.get(n) || null; },
  insertSheet(n) { const s = makeSheet(n); sheets.set(n, s); return s; },
  deleteSheet(s) { sheets.delete(s.getName()); }
};

function makeDriveFolder(name) {
  const files = new Map();
  const subs = new Map();
  return {
    getId() { return 'FLD_' + name; },
    getFoldersByName(n) {
      const hit = subs.get(n);
      let used = false;
      return { hasNext: () => Boolean(hit && !used), next: () => { used = true; return hit; } };
    },
    createFolder(n) { const f = makeDriveFolder(n); subs.set(n, f); return f; },
    createFile(blob) {
      const fid = 'DRV_' + Math.random().toString(36).slice(2, 10);
      const f = {
        getId: () => fid,
        getUrl: () => 'https://drive.google.com/file/d/' + fid + '/view',
        setSharing: () => {}
      };
      files.set(fid, { file: f, blob });
      return f;
    }
  };
}
const rootDrive = makeDriveFolder('ProjectGate_Drive');

const sandbox = {
  console, JSON, Math, Date, Number, String, Boolean, Array, Object, Set, Map, RegExp, Error, encodeURIComponent,
  PropertiesService: {
    getScriptProperties: () => ({
      getProperty: k => propsStore[k] || null,
      setProperty: (k, v) => { propsStore[k] = String(v); }
    })
  },
  SpreadsheetApp: {
    openById: () => mockDb,
    create: () => mockDb,
    getActiveSpreadsheet: () => mockDb
  },
  DriveApp: {
    getFolderById: () => rootDrive,
    createFolder: () => rootDrive,
    getFileById: () => ({ setTrashed: () => {} }),
    Access: { ANYONE_WITH_LINK: 'ANYONE_WITH_LINK' },
    Permission: { VIEW: 'VIEW' }
  },
  LockService: {
    getScriptLock: () => ({ waitLock: () => {}, releaseLock: () => {} })
  },
  UrlFetchApp: {
    _calls: [],
    fetch: (url, opts) => {
      sandbox.UrlFetchApp._calls.push({ url, opts });
      return {
        getResponseCode: () => 200,
        getContentText: () => JSON.stringify({
          candidates: [{ content: { parts: [{ text: 'READY [FR ID-04] Grounded Gemini reply.' }] } }]
        })
      };
    }
  },
  Utilities: {
    getUuid: () => require('crypto').randomUUID(),
    base64Decode: b => Buffer.from(b, 'base64'),
    newBlob: (bytes, mime, name) => ({ bytes, mime, name })
  },
  Logger: { log: () => {} },
  HtmlService: {
    XFrameOptionsMode: { ALLOWALL: 'ALLOWALL' },
    createHtmlOutputFromFile: (fname) => ({
      getContent: () => fs.readFileSync(path.join(DIR, fname.endsWith('.html') ? fname : fname + '.html'), 'utf8')
    }),
    createTemplateFromFile: (fname) => {
      const tpl = {
        initialRoute: {},
        evaluate() {
          let html = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');
          html = html.replace(/<\?!=\s*include\('([^']+)'\);\s*\?>/g, (_, inc) =>
            fs.readFileSync(path.join(DIR, inc + '.html'), 'utf8')
          );
          html = html.replace(/<\?!=\s*JSON\.stringify\([^)]+\)\s*\?>/g, JSON.stringify(tpl.initialRoute));
          return {
            getContent: () => html,
            setTitle() { return this; },
            setXFrameOptionsMode() { return this; },
            addMetaTag() { return this; }
          };
        }
      };
      return tpl;
    }
  },
  ContentService: {
    MimeType: { JSON: 'application/json' },
    createTextOutput: (txt) => ({ getContent: () => txt, setMimeType() { return this; } })
  }
};

vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(DIR, 'Code.gs'), 'utf8'), sandbox, { filename: 'Code.gs' });
vm.runInContext(fs.readFileSync(path.join(DIR, 'SeedCohort.gs'), 'utf8'), sandbox, { filename: 'SeedCohort.gs' });

// Run seedFullCohortFromRepo
const seedRes = sandbox.seedFullCohortFromRepo(true);
assert.strictEqual(seedRes.success, true);
console.log('Seed summary:', seedRes.summary);

// Verify bootstrap & overview (no Date instances)
const boot = sandbox.getAppBootstrap();
assert.strictEqual(boot.initialized, true);
assert.strictEqual(boot.counts.teams, 31, 'Expected 31 teams');
assert.strictEqual(boot.counts.students, 119, 'Expected 119 students');
assert.strictEqual(boot.counts.faculty, 15, 'Expected 15 faculty');
assert.strictEqual(boot.counts.projects, 31, 'Expected 31 projects');

const ov = sandbox.getDepartmentOverview();
assert.strictEqual(ov.projects.length, 31);
const a03 = ov.projects.find(p => p.team && p.team.team_id === 'A-03');
assert(a03, 'Team A-03 should exist');
assert(a03.stages.length === 5, 'Team A-03 should have 5 stages (0..4)');
assert(Array.isArray(a03.stages[0].fields.coursesTable) && a03.stages[0].fields.coursesTable.length > 0, 'A-03 Stage 0 coursesTable populated');
assert(Array.isArray(a03.stages[1].fields.frTable) && a03.stages[1].fields.frTable.length > 0, 'A-03 Stage 1 frTable populated');

// Verify doGet template rendering + script tag injection
const renderedHtml = sandbox.doGet({ parameter: { page: 'portfolio', team: 'A-03' } }).getContent();
assert(renderedHtml.includes('window.INITIAL_ROUTE = {"page":"portfolio","team":"A-03"'), 'INITIAL_ROUTE injected');
assert(renderedHtml.includes('ProjectGate AI'), 'Rendered shell title present');
assert(renderedHtml.includes('openMentorSplit'), 'RAG mentor script included');

// Verify strict gating + faculty isolation on a freshly registered project
const created = sandbox.createProject({
  usn: '01FE24BCI029',
  project_title: 'Verification Test Engine',
  owner_type: 'STUDENT',
  problem_statement: 'Test bottleneck'
});
assert.strictEqual(created.success, true);
assert.throws(() => {
  sandbox.saveStageSubmission({ usn: '01FE24BCI029', project_id: created.project_id, stage_number: 1, submit: false, fields: { frTable: [{ id: 'FR-1', desc: 'x' }] } });
}, /locked until Faculty approves Stage 0/i, 'Stage 1 should block before Stage 0 approval');

// Submit Stage 0 -> Faculty Approve -> Stage 1 unlocks!
const s0Sub = sandbox.saveStageSubmission({
  usn: '01FE24BCI029', project_id: created.project_id, stage_number: 0, submit: true,
  fields: { abstractTitle: 'Verification Test Engine', problem: 'Measured queue delay', objectives: ['Zero drop'] }
});
assert.strictEqual(s0Sub.status, 'Submitted');

const rev = sandbox.submitFacultyReview({
  faculty_id: 'FAC-09', project_id: created.project_id, stage_number: 0, approve: true, score: 9, feedback: 'Well scoped!'
});
assert.strictEqual(rev.status, 'Approved');

// Now Stage 1 draft should succeed!
const s1Draft = sandbox.saveStageSubmission({
  usn: '01FE24BCI029', project_id: created.project_id, stage_number: 1, submit: false,
  fields: { frTable: [{ id: 'FR-01', desc: 'Handle concurrent bursts', priority: 'Mandatory', sourceNeed: 'O1' }] }
});
assert.strictEqual(s1Draft.status, 'Draft');

// Upload document & verify Drive thumbnail URL
const up = sandbox.uploadDocument({
  usn: '01FE24BCI029', project_id: created.project_id, file_name: 'arch.png', mime_type: 'image/png',
  base64: Buffer.from('fakepng').toString('base64'), document_type: 'IMAGE', stage: 2, caption: 'Arch'
});
assert.strictEqual(up.success, true);
assert(up.thumbnail_url.includes('drive.google.com/thumbnail?id='), 'Drive thumbnail URL generated');

// Verify atomic Excel roster import
const imp = sandbox.adminImportRosterRows({
  rows: [{ teamId: 'Z-99', usn: '01FE24BCI999', name: 'Test Student', theme: 'Theme 1: Data Storage and Retrieval Systems', guide: 'Prof. New Guide', title: 'New Imported Project' }]
});
assert.strictEqual(imp.addedTeams, 1);
assert.strictEqual(imp.addedStudents, 1);
assert.strictEqual(imp.addedFaculty, 1);

// Verify Login / authenticateUser for Student (USN=USN), Faculty (FacultyID), HOD/Admin + strict rejections
const authStu = sandbox.authenticateUser({ role: 'Team Lead', identifier: '01fe24bci029', passcode: '01FE24BCI029' });
assert.strictEqual(authStu.success, true);
assert.strictEqual(authStu.session.usn, '01FE24BCI029');
assert.strictEqual(authStu.session.landingPage, 'portfolio');

assert.throws(() => {
  sandbox.authenticateUser({ role: 'Team Lead', identifier: '01FE24BCI029', passcode: 'WRONG_PASS' });
}, /Use your USN as both username and password/i);

assert.throws(() => {
  sandbox.authenticateUser({ role: 'Guest', identifier: 'guest', passcode: 'guest' });
}, /Unsupported login role/i);

const authFac = sandbox.authenticateUser({ role: 'Faculty', identifier: 'FAC-09', passcode: 'FAC-09' });
assert.strictEqual(authFac.success, true);
assert.strictEqual(authFac.session.facultyId, 'FAC-09');

assert.throws(() => {
  sandbox.authenticateUser({ role: 'Faculty', identifier: 'FAC-09', passcode: 'WRONG' });
}, /Incorrect password for faculty account/i);

const authHod = sandbox.authenticateUser({ role: 'HOD', identifier: 'Dr. HOD', passcode: 'HOD2026' });
assert.strictEqual(authHod.success, true);

assert.throws(() => {
  sandbox.authenticateUser({ role: 'Admin', identifier: 'Admin', passcode: 'WRONG' });
}, /Invalid password for Admin/i);

// Verify Gemini AI Model & API Key storage in Google Sheets `Settings` tab (plus secret masking)
const savedWs = sandbox.saveAiMentorSettings({
  scope: 'workspace',
  model: 'gemini-3.8-flash',
  mode: 'auto',
  apiKey: 'AIzaSyMockWorkspaceKey9876'
});
assert.strictEqual(savedWs.success, true);
assert.strictEqual(savedWs.aiSettings.effective.model, 'gemini-3.8-flash');
assert.strictEqual(savedWs.aiSettings.workspace.hasKey, true);
assert(!savedWs.aiSettings.workspace.maskedKey.includes('MockWorkspaceKey'), 'Raw workspace API key must be masked');

// Verify raw key was written into Settings Google Sheet tab
const rawSettingsRows = sandbox.getRows('Settings');
assert(rawSettingsRows.some(r => r.key === 'gemini_api_key' && r.value === 'AIzaSyMockWorkspaceKey9876'), 'Workspace Gemini key saved to Settings sheet');
assert(rawSettingsRows.some(r => r.key === 'gemini_model' && r.value === 'gemini-3.8-flash'), 'Gemini 3.8 Flash model saved to Settings sheet');

// Verify getAppBootstrap & getDepartmentOverview NEVER expose raw gemini_api_key
const bootSafe = sandbox.getAppBootstrap();
assert.strictEqual(bootSafe.settings.gemini_api_key, undefined, 'Bootstrap must not leak raw Gemini key');
assert.strictEqual(bootSafe.settings.gemini_model, 'gemini-3.8-flash');
assert.strictEqual(bootSafe.settings.gemini_key_configured, 'true');

// Save personal per-user Gemini key & verify askMentorChat hits personal key + gemini-3.8-flash
const savedPersonal = sandbox.saveAiMentorSettings({
  userId: '01FE24BCI029',
  scope: 'personal',
  model: 'gemini-3.8-flash',
  apiKey: 'AIzaSyMockPersonalKey1234'
});
assert.strictEqual(savedPersonal.aiSettings.personal.hasKey, true);

const testConn = sandbox.testGeminiConnection({ userId: '01FE24BCI029' });
assert.strictEqual(testConn.ok, true);
assert.strictEqual(testConn.model, 'gemini-3.8-flash');

const chatRes = sandbox.askMentorChat({ userId: '01FE24BCI029', prompt: 'Audit Stage 1 FRs' });
assert.strictEqual(chatRes.ok, true);
assert(chatRes.provider.includes('gemini-3.8-flash'), 'Uses personal Gemini 3.8 Flash model from Sheets');
assert(sandbox.UrlFetchApp._calls.some(c => c.url.includes('gemini-3.8-flash:generateContent?key=AIzaSyMockPersonalKey1234')), 'Hits Gemini 3.8 Flash endpoint with personal Sheets key');

// Clear personal & workspace keys so default DOM state stays clean
sandbox.saveAiMentorSettings({ userId: '01FE24BCI029', scope: 'personal', clearKey: true });
sandbox.saveAiMentorSettings({ scope: 'workspace', clearKey: true, model: 'gemini-3.8-flash' });

console.log('ALL E2E GAS BACKEND + TEMPLATE ASSERTIONS PASSED!');
