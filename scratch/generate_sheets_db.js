const fs = require("fs");
const path = require("path");

// 1. Load static rich team portfolios from dist/data/team_*.js
global.window = { STATIC_TEAMS_DATA: {} };
const dataDir = path.join(__dirname, "..", "dist", "data");
fs.readdirSync(dataDir)
  .filter(f => f.startsWith("team_") && f.endsWith(".js"))
  .sort()
  .forEach(f => {
    eval(fs.readFileSync(path.join(dataDir, f), "utf8"));
  });

const staticByTitle = new Map();
const staticById = new Map();
for (const [k, v] of Object.entries(window.STATIC_TEAMS_DATA)) {
  if (!v || !v.title) continue;
  staticByTitle.set(v.title.trim().toLowerCase(), v);
  staticById.set(String(v.id || k).trim().toUpperCase(), v);
}

// 2. Load full 31-team cohort from dist/department.js seedTeams()
const deptCode = fs.readFileSync(path.join(__dirname, "..", "dist", "department.js"), "utf8");
const seedMatch = deptCode.match(/function seedTeams\(\)\{[\s\S]*?\n\}/);
if (!seedMatch) throw new Error("Could not extract seedTeams() from dist/department.js");
eval(seedMatch[0]);
const cohortTeams = seedTeams();

// Also apply ensureDepartment overrides for A-06, B-12, B-13, A-01, B-05, B-10, A-03
const THEME_NAMES = {
  1: "Theme 1: Data Storage and Retrieval Systems",
  2: "Theme 2: Data Processing and Analytics Systems",
  3: "Theme 3: System Software and Development Tools",
  4: "Theme 4: Networked Systems and Tools",
  5: "Theme 5: Algorithmic and Optimization Systems",
  6: "Theme 6: Concurrent and Transactional Systems"
};

const now = new Date().toISOString();
const facultyMap = new Map();
const facultyRows = [];
const studentMap = new Map();
const studentRows = [];
const teamRows = [];
const memberRows = [];
const projectRows = [];
const stageRows = [];

function getFacultyId(name) {
  const clean = String(name || "Faculty Guide").replace(/\s+/g, " ").trim();
  // Normalize "Ms.Jyothi" -> "Ms. Jyothi" matching
  const key = clean.toLowerCase().replace(/\./g, ". ").replace(/\s+/g, " ").trim();
  if (!facultyMap.has(key)) {
    const id = "FAC-" + String(facultyMap.size + 1).padStart(2, "0");
    const emailSlug = clean.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "");
    facultyMap.set(key, id);
    facultyRows.push({
      faculty_id: id,
      full_name: clean.replace(/^(Ms|Mr|Dr)\.(?=[A-Za-z])/i, "$1. "),
      email: emailSlug + "@kletech.ac.in",
      department: "CS (AI)",
      designation: "Faculty Guide",
      status: "active"
    });
  }
  return facultyMap.get(key);
}

cohortTeams.forEach((team) => {
  const teamId = String(team.id || "").trim();
  const rich =
    staticById.get(teamId.toUpperCase()) ||
    (teamId === "A-03" ? staticById.get("03") : null) ||
    staticByTitle.get(String(team.title || "").trim().toLowerCase()) ||
    null;

  const title = (rich && rich.title) || team.title;
  const guide = (rich && rich.guide) || team.faculty;
  const facultyId = getFacultyId(guide);
  const projectId = "PRJ-" + teamId.replace(/[^A-Z0-9]/gi, "");
  const themeTopic = team.topic || THEME_NAMES[team.theme_no] || "Theme 1: Data Storage and Retrieval Systems";
  const membersSource = (rich && rich.members && rich.members.length) ? rich.members : (team.members || []);

  let leaderStudentId = "";
  membersSource.forEach((m, mIdx) => {
    const usn = String(m.usn || ("DEMO-" + teamId + "-" + (mIdx + 1))).trim().toUpperCase();
    let stuId = studentMap.get(usn);
    if (!stuId) {
      stuId = "STU-" + usn;
      studentMap.set(usn, stuId);
      studentRows.push({
        student_id: stuId,
        usn: usn,
        full_name: m.name,
        email: usn.toLowerCase() + "@kletech.ac.in",
        department: "CS (AI)",
        semester: "5",
        academic_year: "2026-27",
        status: "active"
      });
    }
    if (mIdx === 0) leaderStudentId = stuId;

    memberRows.push({
      membership_id: "MEM-" + teamId.replace(/[^A-Z0-9]/gi, "") + "-" + (mIdx + 1),
      team_id: teamId,
      student_id: stuId,
      role: m.role || (mIdx === 0 ? "Team Lead" : "Team Member")
    });
  });

  teamRows.push({
    team_id: teamId,
    team_name: `Team ${teamId}`,
    department: "CS (AI)",
    leader_student_id: leaderStudentId,
    faculty_id: facultyId,
    topic: themeTopic,
    academic_year: "2026-27",
    status: "active"
  });

  const s0 = (rich && rich.stage0) || {};
  const s1 = (rich && rich.stage1) || {};
  const sd = (rich && rich.systemDesign) || {};

  // Determine showcase workflow statuses matching demo-cases
  let s0Status = "Approved";
  let s1Status = "Approved";
  let s2Status = "Draft";
  let s3Status = "Locked";
  let s4Status = "Locked";
  let projStatus = "STAGE 2 DRAFT";

  if (teamId === "A-03" || teamId === "A-01") {
    s0Status = "Approved";
    s1Status = "Approved";
    s2Status = "Approved";
    s3Status = "Approved";
    s4Status = "Approved";
    projStatus = "COMPLETED";
  } else if (teamId === "A-08" || teamId === "B-04") {
    s0Status = "Approved";
    s1Status = "Revision requested";
    s2Status = "Locked";
    projStatus = "STAGE 1 REVISION";
  } else if (teamId === "B-05" || teamId === "A-07") {
    s0Status = "Approved";
    s1Status = "Submitted";
    s2Status = "Locked";
    projStatus = "STAGE 1 SUBMITTED";
  } else if (!rich) {
    s0Status = "Draft";
    s1Status = "Draft";
    s2Status = "Locked";
    projStatus = "STAGE 0 DRAFT";
  }

  const coursesStr = (s0.coursesTable || []).map(c => `${c.course}: ${c.concepts}`).join("; ");
  const objectivesArr = Array.isArray(s0.objectives) ? s0.objectives : (s0.objectives ? [String(s0.objectives)] : []);

  projectRows.push({
    project_id: projectId,
    owner_type: "TEAM",
    owner_id: teamId,
    project_title: title,
    abstract: s0.conceptualFlowCaption || `${themeTopic} — ${title}`,
    problem_statement: s0.problem || "",
    objectives: objectivesArr.join("\n"),
    technologies: coursesStr || themeTopic,
    github_url: (rich && rich.repo) || "",
    demo_url: "",
    status: projStatus,
    created_at: now
  });

  // Stage 0: Problem Identification (structured)
  stageRows.push({
    submission_id: "SUB-" + teamId.replace(/[^A-Z0-9]/gi, "") + "-0",
    project_id: projectId,
    stage_number: 0,
    status: s0Status,
    fields_json: JSON.stringify({
      title: title,
      problem: s0.problem || "",
      objectives: objectivesArr,
      coursesTable: s0.coursesTable || [],
      pipelineTable: s0.pipelineTable || [],
      enginesTable: s0.enginesTable || [],
      scopeInTable: s0.scopeInTable || [],
      scopeOutTable: s0.scopeOutTable || [],
      feasibilityTable: s0.feasibilityTable || [],
      conceptualFlowCaption: s0.conceptualFlowCaption || "",
      conceptualFlowImage: s0.conceptualFlowImage || ""
    }),
    faculty_feedback: s0Status === "Approved" ? "Stage 0 problem definition, scope, and feasibility approved." : "",
    score: s0Status === "Approved" ? 9 : "",
    inline_comments_json: "{}",
    reviewed_by: s0Status === "Approved" ? guide : "",
    updated_at: now
  });

  // Stage 1: Requirement Analysis (structured)
  stageRows.push({
    submission_id: "SUB-" + teamId.replace(/[^A-Z0-9]/gi, "") + "-1",
    project_id: projectId,
    stage_number: 1,
    status: s1Status,
    fields_json: JSON.stringify({
      frTable: s1.frTable || [],
      nfrTable: s1.nfrTable || [],
      userStoryTable: s1.userStoryTable || [],
      acceptanceTable: s1.acceptanceTable || [],
      useCaseCaption: s1.useCaseCaption || "",
      useCaseImage: s1.useCaseImage || ""
    }),
    faculty_feedback: s1Status === "Approved"
      ? "Requirements specification, user stories, and acceptance criteria approved."
      : s1Status === "Revision requested"
      ? "Clarify measurable NFR thresholds and link each acceptance criterion to an FR ID."
      : "",
    score: s1Status === "Approved" ? 9 : (s1Status === "Revision requested" ? 6 : ""),
    inline_comments_json: s1Status === "Revision requested"
      ? JSON.stringify({ nfrTable: "Specify latency and throughput targets numerically." })
      : "{}",
    reviewed_by: ["Approved", "Revision requested"].includes(s1Status) ? guide : "",
    updated_at: now
  });

  // Stage 2: System Design (structured)
  stageRows.push({
    submission_id: "SUB-" + teamId.replace(/[^A-Z0-9]/gi, "") + "-2",
    project_id: projectId,
    stage_number: 2,
    status: s2Status,
    fields_json: JSON.stringify({
      architecturePoints: sd.architecturePoints || [],
      architectureCaption: sd.architectureCaption || "",
      architectureImage: sd.architectureImage || "",
      dataDesignPoints: sd.dataDesignPoints || [],
      dataDesignCaption: sd.dataDesignCaption || "",
      dataDesignImage: sd.dataDesignImage || "",
      algorithmDesignPoints: sd.algorithmDesignPoints || [],
      algorithmDesignCaption: sd.algorithmDesignCaption || "",
      algorithmDesignImage: sd.algorithmDesignImage || "",
      securityDesignPoints: sd.securityDesignPoints || []
    }),
    faculty_feedback: s2Status === "Approved" ? "Architecture, data design, and algorithmic modeling approved." : "",
    score: s2Status === "Approved" ? 9 : "",
    inline_comments_json: "{}",
    reviewed_by: s2Status === "Approved" ? guide : "",
    updated_at: now
  });

  // Stage 3: Implementation & Integration
  stageRows.push({
    submission_id: "SUB-" + teamId.replace(/[^A-Z0-9]/gi, "") + "-3",
    project_id: projectId,
    stage_number: 3,
    status: s3Status,
    fields_json: JSON.stringify({
      implementation: s3Status === "Approved" ? "Modular engine pipeline implemented following System Design boundaries." : "",
      modules: s3Status === "Approved" ? (s0.enginesTable || []).map(e => `${e.id}: ${e.name}`).join("; ") : "",
      repo: (rich && rich.repo) || "",
      challenges: s3Status === "Approved" ? "Handled concurrency and edge-case validation across module boundaries." : ""
    }),
    faculty_feedback: s3Status === "Approved" ? "Core implementation modules verified." : "",
    score: s3Status === "Approved" ? 9 : "",
    inline_comments_json: "{}",
    reviewed_by: s3Status === "Approved" ? guide : "",
    updated_at: now
  });

  // Stage 4: Testing & Validations
  stageRows.push({
    submission_id: "SUB-" + teamId.replace(/[^A-Z0-9]/gi, "") + "-4",
    project_id: projectId,
    stage_number: 4,
    status: s4Status,
    fields_json: JSON.stringify({
      testing: s4Status === "Approved" ? "Acceptance test suite covering all FR and NFR targets." : "",
      test_results: s4Status === "Approved" ? "All acceptance verification checks passed." : "",
      metrics: s4Status === "Approved" ? "Zero hard-constraint conflicts; target response latency met." : "",
      evaluation: s4Status === "Approved" ? "Ready for final viva examination." : ""
    }),
    faculty_feedback: s4Status === "Approved" ? "Final validation and acceptance evidence approved." : "",
    score: s4Status === "Approved" ? 9 : "",
    inline_comments_json: "{}",
    reviewed_by: s4Status === "Approved" ? guide : "",
    updated_at: now
  });
});

// Write CSVs
const csvDir = path.join(__dirname, "..", "google_sites_apps_script", "sheets_seed_csv");
fs.mkdirSync(csvDir, { recursive: true });

function toCsvCell(val) {
  const str = String(val ?? "");
  const safe = /^[=+\-@]/.test(str) ? "'" + str : str;
  return '"' + safe.replace(/"/g, '""') + '"';
}

function writeCsv(fileName, headers, rows) {
  const lines = [headers.map(toCsvCell).join(",")];
  rows.forEach(r => lines.push(headers.map(h => toCsvCell(r[h])).join(",")));
  fs.writeFileSync(path.join(csvDir, fileName), lines.join("\r\n"), "utf8");
}

const SCHEMAS = {
  Faculty: ["faculty_id", "full_name", "email", "department", "designation", "status"],
  Students: ["student_id", "usn", "full_name", "email", "department", "semester", "academic_year", "status"],
  Teams: ["team_id", "team_name", "department", "leader_student_id", "faculty_id", "topic", "academic_year", "status"],
  TeamMembers: ["membership_id", "team_id", "student_id", "role"],
  Projects: ["project_id", "owner_type", "owner_id", "project_title", "abstract", "problem_statement", "objectives", "technologies", "github_url", "demo_url", "status", "created_at"],
  StageSubmissions: ["submission_id", "project_id", "stage_number", "status", "fields_json", "faculty_feedback", "score", "inline_comments_json", "reviewed_by", "updated_at"]
};

writeCsv("Faculty.csv", SCHEMAS.Faculty, facultyRows);
writeCsv("Students.csv", SCHEMAS.Students, studentRows);
writeCsv("Teams.csv", SCHEMAS.Teams, teamRows);
writeCsv("TeamMembers.csv", SCHEMAS.TeamMembers, memberRows);
writeCsv("Projects.csv", SCHEMAS.Projects, projectRows);
writeCsv("StageSubmissions.csv", SCHEMAS.StageSubmissions, stageRows);

const payload = {
  Faculty: facultyRows.map(r => SCHEMAS.Faculty.map(h => r[h] ?? "")),
  Students: studentRows.map(r => SCHEMAS.Students.map(h => r[h] ?? "")),
  Teams: teamRows.map(r => SCHEMAS.Teams.map(h => r[h] ?? "")),
  TeamMembers: memberRows.map(r => SCHEMAS.TeamMembers.map(h => r[h] ?? "")),
  Projects: projectRows.map(r => SCHEMAS.Projects.map(h => r[h] ?? "")),
  StageSubmissions: stageRows.map(r => SCHEMAS.StageSubmissions.map(h => r[h] ?? ""))
};

const gsContent = `/*************************************************
 * PROJECTGATE AI — FULL COHORT DATABASE SEEDER
 * Populates Google Sheets with all ${teamRows.length} teams across Themes 1–6,
 * ${studentRows.length} students, ${facultyRows.length} faculty guides, and structured Stages 0–4.
 * Add this file as SeedCohort.gs in Apps Script.
 *************************************************/

function seedFullCohortFromRepo(overwriteExisting) {
  setupProjectGate();
  const db = getDatabase();
  const data = ${JSON.stringify(payload)};

  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    const summary = {};
    Object.keys(data).forEach(function(sheetName) {
      const sheet = resolveSheet(sheetName, true);
      const rows = data[sheetName];
      if (!sheet || !rows || !rows.length) return;

      const lastRow = sheet.getLastRow();
      if (lastRow > 1 && !overwriteExisting) {
        summary[sheetName] = "Skipped (" + (lastRow - 1) + " rows exist)";
        return;
      }

      if (lastRow > 1 && overwriteExisting) {
        sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
      }

      sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
      summary[sheetName] = rows.length + " rows written";
    });

    return {
      success: true,
      summary: summary,
      spreadsheetUrl: db.getUrl(),
      message: "Google Sheets database populated with ${teamRows.length} teams and ${studentRows.length} students across 6 themes!"
    };
  } finally {
    lock.releaseLock();
  }
}

function resetAndFillGoogleSheetsDB() {
  return seedFullCohortFromRepo(true);
}
`;

fs.writeFileSync(
  path.join(__dirname, "..", "google_sites_apps_script", "SeedCohort.gs"),
  gsContent,
  "utf8"
);

console.log("Regenerated Full Cohort:");
console.log("  Faculty:", facultyRows.length);
console.log("  Students:", studentRows.length);
console.log("  Teams:", teamRows.length);
console.log("  TeamMembers:", memberRows.length);
console.log("  Projects:", projectRows.length);
console.log("  StageSubmissions:", stageRows.length);
