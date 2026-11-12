const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = path.join(__dirname, '..', 'google_sites_apps_script');

// Reuse SeedCohort data directly by executing Code.gs + SeedCohort.gs
const e2eCode = fs.readFileSync(path.join(__dirname, 'verify_gas_e2e.js'), 'utf8')
  .replace("console.log('ALL E2E GAS BACKEND + TEMPLATE ASSERTIONS PASSED!');", 'module.exports = { boot, ov, renderedHtml, sandbox };');
fs.writeFileSync(path.join(__dirname, '_tmp_e2e_export.js'), e2eCode);
const { boot, ov, renderedHtml, sandbox } = require('./_tmp_e2e_export.js');
fs.unlinkSync(path.join(__dirname, '_tmp_e2e_export.js'));

const elements = {};
function mkEl(id) {
  return {
    id, value: '', innerHTML: '', textContent: '', style: {},
    classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } },
    addEventListener() {},
    querySelectorAll() { return []; },
    querySelector() { return null; },
    scrollIntoView() {},
    getBoundingClientRect() { return { left: 0, width: 1000 }; }
  };
}
[
  'login-screen', 'login-identifier', 'login-passcode', 'login-submit-btn',
  'app-shell', 'sidebar-nav', 'role-switcher', 'sidebar-identity', 'topbar-page-title',
  'topbar-sync-status', 'topbar-team-select', 'main-view', 'mentor-split-handle',
  'mentor-split-pane', 'mentor-cfg-model', 'mentor-cfg-mode', 'mentor-cfg-scope', 'mentor-cfg-key', 'mentor-gemini-prompt',
  'workspace-split-root', 'diagram-lightbox', 'lightbox-img',
  'lightbox-caption', 'rag-floating-root', 'rag-messages', 'rag-input', 'toast', 'theme-toggle-btn'
].forEach(id => { elements[id] = mkEl(id); });

let domReadyCb = [];
const clientCtx = {
  console, JSON, Math, Date, Number, String, Boolean, Array, Object, Set, Map, RegExp, Error, Promise,
  setTimeout: (fn) => { return 0; },
  clearTimeout: () => {},
  scrollTo: () => {},
  encodeURIComponent,
  Blob: class { constructor(parts) { this.parts = parts; } },
  URL: { createObjectURL: () => 'blob:mock' },
  localStorage: { _m: {}, getItem(k) { return this._m[k] || null; }, setItem(k, v) { this._m[k] = String(v); }, removeItem(k) { delete this._m[k]; } },
  sessionStorage: { _m: {}, getItem(k) { return this._m[k] || null; }, setItem(k, v) { this._m[k] = String(v); }, removeItem(k) { delete this._m[k]; } },
  document: {
    documentElement: { setAttribute() {} },
    getElementById: id => elements[id] || (elements[id] = mkEl(id)),
    createElement: () => mkEl('dyn'),
    addEventListener: (ev, cb) => { if (ev === 'DOMContentLoaded') domReadyCb.push(cb); }
  },
  window: {},
  google: {
    script: {
      run: {
        withSuccessHandler(ok) {
          return {
            withFailureHandler(fail) {
              return new Proxy({}, {
                get(_, fn) {
                  return (arg) => {
                    try {
                      if (fn === 'getAppBootstrap') ok(boot);
                      else if (fn === 'getDepartmentOverview') ok(ov);
                      else if (typeof sandbox[fn] === 'function') ok(sandbox[fn](arg));
                      else ok({ success: true, message: 'OK' });
                    } catch (err) {
                      if (typeof fail === 'function') fail(err);
                    }
                  };
                }
              });
            }
          };
        }
      }
    }
  }
};
clientCtx.window = clientCtx;
clientCtx.INITIAL_ROUTE = { page: 'department', team: 'A-03' };
vm.createContext(clientCtx);

function extractScripts(html) {
  return [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).join('\n');
}
vm.runInContext(extractScripts(fs.readFileSync(path.join(DIR, 'app_client.html'), 'utf8')), clientCtx, { filename: 'app_client.html' });
vm.runInContext(extractScripts(fs.readFileSync(path.join(DIR, 'rag_mentor.html'), 'utf8')), clientCtx, { filename: 'rag_mentor.html' });

// Trigger DOMContentLoaded handlers
domReadyCb.forEach(fn => fn());

setTimeout(async () => {
  await Promise.resolve();
  await Promise.resolve();
  try {
    // 0. Login screen renders FIRST while workspace-split-root & rag stay hidden; NO Guest login allowed
    assert.strictEqual(elements['login-screen'].style.display, 'flex', 'Login screen visible first');
    assert.strictEqual(elements['workspace-split-root'].style.display, 'none', 'Workspace hidden before login');
    assert.strictEqual(elements['rag-floating-root'].style.display, 'none', 'RAG hidden before login');
    assert(elements['login-screen'].innerHTML.includes('Sign In to ProjectGate AI'), 'Login UI rendered');
    assert(!elements['login-screen'].innerHTML.includes('loginAsGuest'), 'No Guest bypass in login UI');

    // Verify unauthenticated switchPage does not unlock workspace
    clientCtx.switchPage('edit');
    assert.strictEqual(elements['workspace-split-root'].style.display, 'none', 'Workspace stays hidden before auth');

    // Sign in as Student with wrong password -> must remain on login screen
    clientCtx.setLoginRole('Team Lead');
    elements['login-identifier'].value = '01FE24BCI029';
    elements['login-passcode'].value = 'WRONG_USN';
    await clientCtx.submitLoginForm();
    assert.strictEqual(elements['workspace-split-root'].style.display, 'none', 'Wrong password keeps workspace hidden');

    // Sign in as Student (Username = USN, Password = USN) -> lands on Portfolio Display
    elements['login-identifier'].value = '01FE24BCI029';
    elements['login-passcode'].value = '01FE24BCI029';
    await clientCtx.submitLoginForm();
    assert.strictEqual(elements['login-screen'].style.display, 'none', 'Login screen hidden after Student login');
    assert.strictEqual(elements['workspace-split-root'].style.display, 'block', 'Workspace visible after Student login');
    assert.strictEqual(elements['rag-floating-root'].style.display, 'block', 'RAG visible after Student login');

    // 1. Separate Portfolio Display vs Edit Portfolio pages
    assert(elements['main-view'].innerHTML.includes('Portfolio Display (Read-Only)'), 'Student lands on Portfolio Display page');
    assert(!elements['main-view'].innerHTML.includes('id="journey-stage-form"'), 'Portfolio Display has no edit form');
    assert(elements['main-view'].innerHTML.includes('Open Edit Portfolio Page'), 'Portfolio Display links to Edit Portfolio page');
    clientCtx.switchPortfolioStage(1);
    assert(elements['main-view'].innerHTML.includes('Functional Requirements'), 'Portfolio Stage 1 FR table rendered');
    clientCtx.switchPortfolioStage(2);
    assert(elements['main-view'].innerHTML.includes('Stage 2 – System Design'), 'Portfolio Stage 2 rendered');

    clientCtx.switchPage('edit');
    assert(elements['main-view'].innerHTML.includes('Portfolio Editor'), 'Dedicated Edit Portfolio page rendered');
    assert(elements['main-view'].innerHTML.includes('id="journey-stage-form"'), 'Edit Portfolio page contains stage editor form');
    clientCtx.switchPage('evidence');
    assert(elements['main-view'].innerHTML.includes('Evidence Library'), 'Evidence page rendered');
    clientCtx.switchPage('discussion');
    assert(elements['main-view'].innerHTML.includes('Project Discussions'), 'Discussion page rendered');

    // Verify free role switching without logout is blocked & Faculty pages are denied to Student
    clientCtx.switchPage('admin');
    assert(!elements['main-view'].innerHTML.includes('Atomic Excel / CSV Roster Import'), 'Student blocked from Admin page');

    // 2. Sign Out -> Sign in as Faculty -> Faculty Review Queue
    clientCtx.logoutUser();
    assert.strictEqual(elements['login-screen'].style.display, 'flex', 'Login screen shown after logout');
    clientCtx.setLoginRole('Faculty');
    elements['login-identifier'].value = 'FAC-09';
    elements['login-passcode'].value = 'FAC-09';
    await clientCtx.submitLoginForm();
    assert(elements['main-view'].innerHTML.includes('Faculty Review Queue'), 'Faculty Review page rendered');

    // 3. Sign Out -> Sign in as HOD -> Department 6 Themes + Portfolio Display + RAG + Split Mentor
    clientCtx.logoutUser();
    clientCtx.setLoginRole('HOD');
    elements['login-identifier'].value = 'Dr. HOD';
    elements['login-passcode'].value = 'HOD2026';
    await clientCtx.submitLoginForm();
    assert(elements['main-view'].innerHTML.includes('Theme 1'), 'Department Themes rendered for HOD');
    assert(elements['main-view'].innerHTML.includes('A-03'), 'Team A-03 listed for HOD');

    clientCtx.openTeamPortfolio('PRJ-A03');
    assert(elements['main-view'].innerHTML.includes('Stage 0 – Problem Identification'), 'Portfolio Stage 0 rendered for HOD');
    assert(!elements['main-view'].innerHTML.includes('Open Edit Portfolio Page'), 'HOD cannot see Student Edit button on Display page');

    // 4. Sign Out -> Faculty Admin Allocation -> Admin Roster Import
    clientCtx.logoutUser();
    clientCtx.setLoginRole('Faculty Admin');
    elements['login-identifier'].value = 'Faculty Admin';
    elements['login-passcode'].value = 'FADMIN2026';
    await clientCtx.submitLoginForm();
    assert(elements['main-view'].innerHTML.includes('Faculty Guide Allocation'), 'Allocation page rendered');

    clientCtx.logoutUser();
    clientCtx.setLoginRole('Admin');
    elements['login-identifier'].value = 'Admin';
    elements['login-passcode'].value = 'ADMIN2026';
    await clientCtx.submitLoginForm();
    assert(elements['main-view'].innerHTML.includes('Atomic Excel / CSV Roster Import'), 'Admin page rendered');

    // 5. RAG Assistant & Split-Screen Mentor
    clientCtx.toggleRagDrawer();
    assert(elements['rag-floating-root'].innerHTML.includes('AI Viva &amp; Portfolio Assistant'), 'RAG drawer rendered');
    elements['rag-input'].value = 'What are the functional requirements?';
    await clientCtx.submitRagQuestion();
    console.log('RAG citations rendered:', elements['rag-floating-root'].innerHTML.match(/\[[^\]]+\]/g));
    assert(elements['rag-floating-root'].innerHTML.includes('Functional Requirement') || elements['rag-floating-root'].innerHTML.includes('FR'), 'RAG returned cited FR match');

    clientCtx.openMentorSplit('PRJ-A03');
    assert(elements['mentor-split-pane'].innerHTML.includes('AI Mentor Studio'), 'Split mentor pane opened');
    clientCtx.answerMentorMcq('q1', 0);
    assert(elements['mentor-split-pane'].innerHTML.includes('Correct!'), 'Mentor MCQ graded');
    clientCtx.setMentorMode('revise');
    clientCtx.runSddAlignmentCheck();
    assert(elements['mentor-split-pane'].innerHTML.includes('IEEE 1016'), 'SDD Alignment check ran');

    // 5b. AI Mentor Settings: select Gemini model + enter key + save to Sheets + query Gemini AI Mentor
    clientCtx.toggleMentorSettings();
    assert(elements['mentor-split-pane'].innerHTML.includes('Gemini AI Model &amp; Google Sheets Key Settings'), 'Mentor AI settings panel rendered');
    elements['mentor-cfg-model'].value = 'gemini-3.8-flash';
    elements['mentor-cfg-mode'].value = 'auto';
    elements['mentor-cfg-scope'].value = 'workspace';
    elements['mentor-cfg-key'].value = 'AIzaSyDomTestKey5678';
    await clientCtx.saveMentorSheetsSettings('mentor');
    assert(elements['mentor-split-pane'].innerHTML.includes('Key in Sheets:'), 'Saved Gemini key badge shown in Mentor UI');
    assert(elements['mentor-split-pane'].innerHTML.includes('gemini-3.8-flash'), 'Selected Gemini 3.8 Flash model badge shown');

    clientCtx.setMentorMode('gemini');
    elements['mentor-gemini-prompt'].value = 'Audit FR traceability';
    await clientCtx.askGeminiMentorStudio();
    assert(elements['mentor-split-pane'].innerHTML.includes('READY [FR ID-04] Grounded Gemini reply.'), 'Gemini AI Mentor rendered response using Sheets key');

    clientCtx.toggleRagSettings();
    assert(elements['rag-floating-root'].innerHTML.includes('Gemini AI Model &amp; Google Sheets Key Settings'), 'Floating RAG drawer shares Sheets Gemini settings');

    // 6. Sign Out returns to login screen first
    clientCtx.logoutUser();
    assert.strictEqual(elements['login-screen'].style.display, 'flex', 'Login screen shown again after Sign Out');
    assert.strictEqual(elements['workspace-split-root'].style.display, 'none', 'Workspace hidden again after Sign Out');

    console.log('ALL CLIENT UI + LOGIN + RAG + MENTOR DOM SMOKE TESTS PASSED!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}, 50);
