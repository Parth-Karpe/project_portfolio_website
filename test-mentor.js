/**
 * Automated Verification Test Suite for AI Mentor
 * Tests all 11 core architectural requirements across Team 03 and Team 08.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Mock Browser Environment in Node
global.window = {
  addEventListener: () => {}
};
global.document = {
  getElementById: () => null,
  createElement: () => ({ id: '', innerHTML: '', appendChild: () => {} }),
  body: { appendChild: () => {} }
};

const mockLocalStorage = {};
global.localStorage = {
  getItem: (k) => mockLocalStorage[k] || null,
  setItem: (k, v) => { mockLocalStorage[k] = String(v); },
  removeItem: (k) => { delete mockLocalStorage[k]; }
};

const mockSessionStorage = {};
global.sessionStorage = {
  getItem: (k) => mockSessionStorage[k] || null,
  setItem: (k, v) => { mockSessionStorage[k] = String(v); },
  removeItem: (k) => { delete mockSessionStorage[k]; }
};

// 2. Load Team Data
eval(fs.readFileSync(path.join(__dirname, 'dist', 'data', 'team_03.js'), 'utf8'));
eval(fs.readFileSync(path.join(__dirname, 'dist', 'data', 'team_08.js'), 'utf8'));

// 3. Load Portfolio RAG / AI Mentor
eval(fs.readFileSync(path.join(__dirname, 'dist', 'portfolio-rag.js'), 'utf8'));

const {
  buildTeamKnowledgeBase,
  retrieveRelevantChunks,
  classifyAndRouteIntent,
  generateTeamBaseContext,
  generateVivaQuiz,
  evaluateVivaQuiz,
  formatResponseWithClickableCitations,
  calcTokenOverlap,
  createPRNG
} = global.window.PortfolioRAG;

console.log('=== RUNNING AI MENTOR VERIFICATION TEST SUITE ===\n');

let passedTests = 0;
let totalTests = 0;

function test(description, fn){
  totalTests++;
  try {
    fn();
    console.log(`✓ [PASS] ${description}`);
    passedTests++;
  } catch(err) {
    console.error(`✗ [FAIL] ${description}`);
    console.error(err);
    process.exit(1);
  }
}

// ----------------------------------------------------
// TEST 1: Stage 1 Raw Regex Routing (Table 0.4, Engine E2)
// ----------------------------------------------------
test('Stage 1 raw regex routes "Table 0.4" directly without decimal split', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const route = classifyAndRouteIntent('Can you show me Table 0.4?', kb03);
  assert.strictEqual(route.intent, 'EXPLICIT_ENTITY', 'Expected EXPLICIT_ENTITY route');
  assert.strictEqual(route.chunks[0].id, 'table-0-4', 'Expected Table 0.4 chunk');
});

test('Stage 1 raw regex routes "engine e2" directly', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const route = classifyAndRouteIntent('Tell me about engine e2', kb03);
  assert.strictEqual(route.intent, 'EXPLICIT_ENTITY', 'Expected EXPLICIT_ENTITY route');
  assert.strictEqual(route.chunks[0].id, 'engine-e2', 'Expected engine-e2 chunk');
});

// ----------------------------------------------------
// TEST 2: Dynamic Citation Registry
// ----------------------------------------------------
test('Dynamic citation registry resolves all verified chunk citations', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  assert(Object.keys(kb03.citationRegistry).length >= 10, 'Registry should index at least 10 citation anchors');
  
  // Format text containing verified citations
  const html = formatResponseWithClickableCitations('Check [Table 0.4] and [Engine E2] and [Table 1.3: Test Matrix]', kb03);
  assert(html.includes('table-scope'), 'Should link to table-scope for Table 0.4');
  assert(html.includes('portfolio-engine-E2'), 'Should link to portfolio-engine-E2');
  assert(html.includes('table-testsuite'), 'Should link to table-testsuite');
  assert(!html.includes('flagged'), 'Verified citations should not be flagged');
});

test('Unverified / hallucinated citation [FR-99] renders as flagged static pill', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const html = formatResponseWithClickableCitations('Requirement [FR-99] specifies this feature', kb03);
  assert(html.includes('citation-pill static flagged'), 'Expected flagged static pill for [FR-99]');
  assert(html.includes('[FR-99]'), 'Should contain tag text');
});

// ----------------------------------------------------
// TEST 3: Stopword Filter (No diag-asis false matches)
// ----------------------------------------------------
test('Query "what is this project about" routes to Base Context, NOT diag-asis', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const route = classifyAndRouteIntent('what is this project about', kb03);
  assert.strictEqual(route.intent, 'BASE_CONTEXT', 'Expected BASE_CONTEXT route for generic inquiry');
  if(route.chunks){
    const hasDiag = route.chunks.some(c => c.id === 'diag-asis');
    assert.strictEqual(hasDiag, false, 'Should not match diag-asis');
  }
});

// ----------------------------------------------------
// TEST 4 & 5: Dynamic Hint Indexer (No Domain Hardcoding)
// ----------------------------------------------------
test('"the camera part" on Team 03 matches Table 0.4 (because camera is in scopeOutTable)', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  // Team 03 scopeOutTable has: "Physical smart parking hardware (ultrasonic/camera sensors..."
  const route = classifyAndRouteIntent('the camera part', kb03);
  assert.strictEqual(route.intent, 'RETRIEVAL', 'Expected RETRIEVAL route');
  assert.strictEqual(route.chunks[0].id, 'table-0-4', 'Expected top match to be Table 0.4');
});

test('"the camera part" on Team 08 falls through to Base Context (camera is NOT in Team 08 data)', () => {
  const kb08 = buildTeamKnowledgeBase('08');
  // Team 08 is Data Profiling Engine; camera is nowhere in its deliverables
  const route = classifyAndRouteIntent('the camera part', kb08);
  assert.strictEqual(route.intent, 'BASE_CONTEXT', 'Expected BASE_CONTEXT fallback because camera is absent');
});

// ----------------------------------------------------
// TEST 6: Seeded Shuffle Determinism
// ----------------------------------------------------
test('The same seed produces identical quiz option orders; different seed produces different order', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const quiz1 = generateVivaQuiz(kb03, 12345);
  const quiz2 = generateVivaQuiz(kb03, 12345);
  const quiz3 = generateVivaQuiz(kb03, 99999);

  // Compare Q1 options in quiz1 and quiz2
  const q1Opts = quiz1.questions[0].options.map(o => o.text);
  const q2Opts = quiz2.questions[0].options.map(o => o.text);
  assert.deepStrictEqual(q1Opts, q2Opts, 'Same seed must produce identical options');
  assert.strictEqual(quiz1.questions[0].correctKey, quiz2.questions[0].correctKey, 'Same seed must produce same correct key');

  // Compare with quiz3 (different seed)
  const q3Opts = quiz3.questions[0].options.map(o => o.text);
  // Either option ordering or keys should differ
  const isIdentical = JSON.stringify(q1Opts) === JSON.stringify(q3Opts) && quiz1.questions[0].correctKey === quiz3.questions[0].correctKey;
  assert.strictEqual(isIdentical, false, 'Different seeds should vary option ordering or seed presentation');
});

// ----------------------------------------------------
// TEST 7: Quiz Option Constraints & Deduplication
// ----------------------------------------------------
test('Quiz questions have at most 4 options and exactly 1 correct answer', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const quiz = generateVivaQuiz(kb03, 42);
  assert(quiz.questions.length >= 3, 'Quiz should generate at least 3 verified questions');

  quiz.questions.forEach((q, i) => {
    assert(q.options.length <= 4, `Question ${i + 1} has ${q.options.length} options (max allowed: 4)`);
    assert(q.options.length >= 2, `Question ${i + 1} has too few options (${q.options.length})`);
    const correctOpts = q.options.filter(o => o.isCorrect);
    assert.strictEqual(correctOpts.length, 1, `Question ${i + 1} must have exactly 1 correct option`);
  });
});

// ----------------------------------------------------
// TEST 8: Evaluation & Scoring Engine
// ----------------------------------------------------
test('Grading all correct answers yields 100% and Master badge', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const quiz = generateVivaQuiz(kb03, 777);
  // Answer all questions correctly
  quiz.questions.forEach((q, idx) => {
    quiz.userAnswers[idx] = q.correctKey;
  });

  const report = evaluateVivaQuiz(quiz);
  assert.strictEqual(report.correctCount, quiz.questions.length);
  assert.strictEqual(report.percentage, 100);
  assert(report.badge.includes('Master'), 'Expected Master badge for 100%');
  assert(report.details.every(d => d.isCorrect), 'All question details should be marked isCorrect: true');
});

// ----------------------------------------------------
// TEST 9: sessionStorage Serialization & State Restoration
// ----------------------------------------------------
test('Quiz state serializes and restores from sessionStorage', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const quiz = generateVivaQuiz(kb03, 888);
  quiz.userAnswers[0] = 'B';
  global.sessionStorage.setItem('pg_quiz_03', JSON.stringify(quiz));

  const restoredJson = global.sessionStorage.getItem('pg_quiz_03');
  assert(restoredJson, 'Should read serialized JSON');
  const restored = JSON.parse(restoredJson);
  assert.strictEqual(restored.seed, 888);
  assert.strictEqual(restored.userAnswers[0], 'B');
});

// ----------------------------------------------------
// TEST 10: Bug Fixes Verification (BUG-1 and BUG-2)
// ----------------------------------------------------
test('BUG-1: Table 0.2 displays processing or assessment, not undefined', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const pipeChunk = kb03.chunks.find(c => c.id === 'table-0-2');
  assert(pipeChunk, 'Table 0.2 chunk must exist');
  assert(!pipeChunk.text.includes('undefined'), 'Table 0.2 chunk must not contain "undefined"');

  const kb08 = buildTeamKnowledgeBase('08');
  const pipe08 = kb08.chunks.find(c => c.id === 'table-0-2');
  assert(pipe08, 'Table 0.2 for Team 08 must exist');
  assert(!pipe08.text.includes('undefined'), 'Team 08 Table 0.2 must not contain "undefined"');
});

test('BUG-2: Objectives chunk handles arrays cleanly as bullet lists', () => {
  const kb03 = buildTeamKnowledgeBase('03');
  const objChunk = kb03.chunks.find(c => c.id === 'stage0-objectives');
  assert(objChunk, 'Objectives chunk must exist');
  assert(objChunk.text.includes('• '), 'Array objectives should be formatted with bullets');
  assert(!objChunk.text.includes('undefined'), 'Objectives must not contain "undefined"');
});

// ----------------------------------------------------
// TEST 11: Team 08 Verification
// ----------------------------------------------------
test('Team 08 (Data Profiling Engine) passes full KB build, quiz generation, and Base Context', () => {
  const kb08 = buildTeamKnowledgeBase('08');
  assert.strictEqual(kb08.teamId, '08');
  assert(kb08.chunks.length >= 10, 'Team 08 should have >= 10 chunks');

  // Base Context
  const baseCtx = generateTeamBaseContext(kb08);
  assert(baseCtx.answer.includes('Team 08'), 'Base context should mention Team 08');
  assert(baseCtx.answer.includes('Anupriya Savant'), 'Should include Team 08 roster');

  // Quiz
  const quiz08 = generateVivaQuiz(kb08, 101);
  assert(quiz08.questions.length >= 3, 'Team 08 should have >= 3 quiz questions');
});

console.log(`\n====================================================`);
console.log(`ALL TESTS PASSED: ${passedTests} / ${totalTests} (100% SUCCESS)`);
console.log(`====================================================`);
