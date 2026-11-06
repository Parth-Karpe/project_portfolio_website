-- ==============================================================================
-- ProjectGate AI - Oracle Database Initialization Schema
-- Compatible with Oracle Database 23ai Free / 21c XE / Autonomous Database (ATP)
-- ==============================================================================

-- 1. APP USERS & ROLES TABLE (Student, Faculty, HOD)
CREATE TABLE app_users (
    user_id          VARCHAR2(64) PRIMARY KEY,
    usn_or_emp_id    VARCHAR2(32) UNIQUE NOT NULL,
    full_name        VARCHAR2(128) NOT NULL,
    email            VARCHAR2(128) UNIQUE NOT NULL,
    password_hash    VARCHAR2(256) NOT NULL,
    role             VARCHAR2(16) NOT NULL CHECK (role IN ('STUDENT', 'FACULTY', 'HOD', 'ADMIN')),
    team_id          VARCHAR2(16),
    department       VARCHAR2(64) DEFAULT 'Department of CSE(AI)',
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROJECT TEAMS REGISTRY
CREATE TABLE project_teams (
    team_id          VARCHAR2(16) PRIMARY KEY,
    theme_no         NUMBER(2) NOT NULL,
    theme_name       VARCHAR2(128) NOT NULL,
    project_title    VARCHAR2(255) NOT NULL,
    faculty_mentor   VARCHAR2(128) NOT NULL,
    academic_year    VARCHAR2(16) DEFAULT '2026-27',
    current_stage    VARCHAR2(16) DEFAULT '0',
    status           VARCHAR2(16) DEFAULT 'ACTIVE'
);

-- 3. TEAM MEMBERS
CREATE TABLE team_members (
    member_id        VARCHAR2(64) PRIMARY KEY,
    team_id          VARCHAR2(16) NOT NULL,
    name             VARCHAR2(128) NOT NULL,
    usn              VARCHAR2(32) NOT NULL,
    role_in_team     VARCHAR2(64) DEFAULT 'Team Member',
    github_url       VARCHAR2(255),
    linkedin_url     VARCHAR2(255),
    skills           VARCHAR2(255),
    contribution     VARCHAR2(1000),
    CONSTRAINT fk_member_team FOREIGN KEY (team_id) REFERENCES project_teams(team_id) ON DELETE CASCADE
);

-- 4. PORTFOLIO STAGE CONTENT (Stages 0 to 4)
CREATE TABLE portfolio_stage_data (
    record_id        VARCHAR2(64) PRIMARY KEY,
    team_id          VARCHAR2(16) NOT NULL,
    stage_id         VARCHAR2(16) NOT NULL,      -- '0', '1', 'system-design', '2', '3'
    section_key      VARCHAR2(64) NOT NULL,      -- e.g. 'problem_statement', 'objectives', 'fr_table'
    content_json     CLOB NOT NULL,
    review_status    VARCHAR2(32) DEFAULT 'Draft' CHECK (review_status IN ('Draft', 'Submitted', 'Approved', 'Revision requested')),
    faculty_feedback CLOB,
    faculty_score    NUMBER(4,2),
    updated_by       VARCHAR2(64) NOT NULL,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_team_stage_section UNIQUE (team_id, stage_id, section_key),
    CONSTRAINT fk_stage_team FOREIGN KEY (team_id) REFERENCES project_teams(team_id) ON DELETE CASCADE
);

-- 5. PORTFOLIO MEDIA & EVIDENCE (Hybrid Storage: Files/URLs referenced)
CREATE TABLE portfolio_media_assets (
    asset_id         VARCHAR2(64) PRIMARY KEY,
    team_id          VARCHAR2(16) NOT NULL,
    stage_id         VARCHAR2(16) NOT NULL,
    section_key      VARCHAR2(64) NOT NULL,
    media_type       VARCHAR2(16) NOT NULL CHECK (media_type IN ('IMAGE', 'VIDEO', 'DOCUMENT', 'LINK')),
    file_name        VARCHAR2(255) NOT NULL,
    mime_type        VARCHAR2(64),
    file_size_bytes  NUMBER,
    file_path_or_url VARCHAR2(1000) NOT NULL,
    caption          VARCHAR2(500),
    uploaded_by      VARCHAR2(64) NOT NULL,
    uploaded_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_media_team FOREIGN KEY (team_id) REFERENCES project_teams(team_id) ON DELETE CASCADE
);

-- 6. AI MENTOR ASSESSMENTS (MCQ & Viva Defense)
CREATE TABLE mentor_assessments (
    assessment_id    VARCHAR2(64) PRIMARY KEY,
    team_id          VARCHAR2(16) NOT NULL,
    dimension        VARCHAR2(64) NOT NULL,      -- 'Systems Thinking', 'Foundational CS Knowledge', 'Engineering Standards'
    stage_id         VARCHAR2(16) NOT NULL,
    kind             VARCHAR2(16) DEFAULT 'mcq',
    score            NUMBER NOT NULL,
    total            NUMBER NOT NULL,
    percentage       NUMBER NOT NULL,
    eval_badge       VARCHAR2(128),
    quiz_payload     CLOB NOT NULL,              -- Full JSON of questions, answers, and explanations
    completed_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_eval_team FOREIGN KEY (team_id) REFERENCES project_teams(team_id) ON DELETE CASCADE
);

-- 7. INITIAL SAMPLE RBAC USERS
INSERT INTO app_users (user_id, usn_or_emp_id, full_name, email, password_hash, role, team_id)
VALUES ('usr_hod_01', 'EMP_HOD_01', 'Dr. Narayan D G', 'hod.cseai@kletech.ac.in', 'hashed_pw_hod', 'HOD', NULL);

INSERT INTO app_users (user_id, usn_or_emp_id, full_name, email, password_hash, role, team_id)
VALUES ('usr_fac_01', 'EMP_FAC_01', 'Mr. Amit Kachavimath', 'amit.k@kletech.ac.in', 'hashed_pw_fac1', 'FACULTY', NULL);

INSERT INTO app_users (user_id, usn_or_emp_id, full_name, email, password_hash, role, team_id)
VALUES ('usr_stu_01', '01FE23BCS103', 'Vedant Khot', 'vedant.k@kletech.ac.in', 'hashed_pw_stu1', 'STUDENT', '03');

INSERT INTO app_users (user_id, usn_or_emp_id, full_name, email, password_hash, role, team_id)
VALUES ('usr_stu_02', '01FE24BCI044', 'Bhoomi Bankapur', 'bhoomi.b@kletech.ac.in', 'hashed_pw_stu2', 'STUDENT', 'A-01');

COMMIT;
