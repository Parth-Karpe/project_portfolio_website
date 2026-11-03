/**
 * Static Data File for Team 08
 * Source documents: Team_08_Gate_0.docx & Team_08_Gate_1_Requirements.docx
 *
 * HOW TO EDIT OR PROVIDE NEW CONTENT:
 * 1. Modify the fields or table arrays below.
 * 2. To change or add images, place your image file in `dist/assets/` and set the path in `useCaseImage` or `archImage`.
 * 3. All tables below match the exact columns and rows from the official Word documents.
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

window.STATIC_TEAMS_DATA['08'] = {
  id: '08',
  theme: 'Data Engineering & Quality Engines',
  title: 'Large-Scale Dataset Profiling & Data Quality Engine',
  guide: 'Mrs. Sneha Varur',
  academicYear: '2026–27',
  repo: 'https://github.com/topics/data-quality-engine',
  members: [
    {
      name: 'Anupriya Savant',
      usn: '01FE24BCI046',
      role: 'Team Lead · Full-stack & Profiling Engine',
      skills: 'Full-Stack · Schema Profiling',
      contribution: 'Lead architecture modeling, ingestion pipeline, and full-stack integration.',
      github: 'https://github.com'
    },
    {
      name: 'Pavitra Jalibenchi',
      usn: '01FE24BCI049',
      role: 'Core Member · Anomaly & Duplicate Detection',
      skills: 'DAA · Hash Deduplication',
      contribution: 'Duplicate row detection algorithms and data consistency constraint rules.',
      github: 'https://github.com'
    },
    {
      name: 'Anushree Angadi',
      usn: '01FE24BCI050',
      role: 'Core Member · Statistical Analysis & Outliers',
      skills: 'Probability & Stats · IQR Outliers',
      contribution: 'Descriptive statistics, distribution modeling, and IQR outlier screening.',
      github: 'https://github.com'
    },
    {
      name: 'Sahana Awaradi',
      usn: '01FE24BCI030',
      role: 'Core Member · Revalidation & Reporting',
      skills: 'Data Integrity · PDF/Excel Export',
      contribution: 'Copy-on-write remediation, revalidation pipeline, and multi-format report exports.',
      github: 'https://github.com'
    }
  ],

  // ==========================================
  // STAGE 0: PROBLEM IDENTIFICATION (Gate 0)
  // ==========================================
  stage0: {
    problem: 'Structured datasets frequently suffer from missing values, duplicate records, inconsistent types, invalid formats, and statistically extreme observations. Manual inspection and ad-hoc scripting are error-prone and fail to scale across large tabular files and databases. The proposed project unifies dataset profiling and data-quality assessment into an automated, interactive workflow that preserves the original dataset while applying user-selected corrections strictly to an isolated copy.',
    targetUsers: 'Data Analysts, Database Engineers, ML Practitioners, and Academic Researchers.',
    baselineFriction: 'Manual data profiling and cleansing consumes up to 60% of data science workflow time with high risk of silent corruption in the original dataset.',
    objectives: 'Accept structured tabular datasets and generate structural profiles; detect missing values, duplicates, and type inconsistencies; compute descriptive statistics and flag IQR-based outliers; provide user-guided remediation on decoupled copies; revalidate corrected data and output quality scores and reports.',
    success1: 'Completeness & Accuracy: >= 95% detection rate for missing, duplicate, and invalid entries across benchmark test datasets.',
    success2: 'Immutability Guarantee: 0 unintended modifications to original input files (100% verified via SHA-256 hash validation).',

    // Image for Stage 0 (Use Case Diagram from Gate 0/Gate 1)
    useCaseImage: 'assets/team08_usecase_diagram.jpg',
    useCaseCaption: 'Figure 0.1: Contextual Use Case Diagram for Large-Scale Dataset Profiling & Data Quality Engine (Gate 0 / Gate 1).',

    // Word Table 2: Foundation Course Integration
    coursesTable: [
      { sl: '1', course: 'Database Management Systems', concepts: 'Dataset structure, schema, data types, consistency, storage and retrieval', role: 'Dominant (inferred from presentation emphasis)' },
      { sl: '2', course: 'Data Structures & Algorithm Analysis', concepts: 'Scanning, comparison/hashing for duplicate detection, efficient data processing', role: 'Dominant (inferred)' },
      { sl: '3', course: 'Probability & Statistics', concepts: 'Descriptive statistics, distributions, missing-value rates, IQR-based outlier screening', role: 'Dominant (inferred)' },
      { sl: '4', course: 'Machine Learning', concepts: 'Anomaly-analysis concepts and interpretation of unusual observations', role: 'Supporting (inferred)' },
      { sl: '5', course: 'Operating Systems', concepts: 'Files, memory, processing and resource limits', role: 'Supporting (inferred)' },
      { sl: '6', course: 'Web Technologies', concepts: 'Dataset upload, dashboard, user interactions and reporting', role: 'Supporting (inferred)' }
    ],

    // Word Table 3: Conceptual Pipeline Flow
    pipelineTable: [
      { input: 'Upload structured dataset', assessment: 'Profile → detect issues → analyze statistical patterns', userAction: 'Select issues → apply supported corrections → revalidate', output: 'Quality score and report' }
    ],

    // Word Table 4: Conceptual Engines
    enginesTable: [
      { id: 'E1', engine: 'E1 – Dataset Profiling', desc: 'Summarize rows, columns, types and basic characteristics' },
      { id: 'E2', engine: 'E2 – Completeness & Duplicate Detection', desc: 'Identify missing values and exact duplicate rows' },
      { id: 'E3', engine: 'E3 – Data Validation & Consistency', desc: 'Check configured formats, allowed values and constraints' },
      { id: 'E4', engine: 'E4 – Statistical & Anomaly Analysis', desc: 'Summarize numeric distributions and flag potential outliers' }
    ],

    // Word Table 5: Broad In-Scope Items
    scopeInTable: [
      { num: '1', item: 'Upload and inspect supported structured/tabular datasets.' },
      { num: '2', item: 'Profile datasets and detect missing, duplicate, inconsistent and invalid values.' },
      { num: '3', item: 'Perform basic statistical analysis and flag possible outliers.' },
      { num: '4', item: 'Display findings, allow selected supported corrections, revalidate, and produce quality results.' }
    ],

    // Word Table 6: Out-of-Scope Items
    scopeOutTable: [
      { num: '1', item: 'Enterprise-scale deployment', reason: 'Beyond initial student project and resource scope' },
      { num: '2', item: 'Real-time enterprise monitoring', reason: 'Excluded from initial integration scope' },
      { num: '3', item: 'Support for every database/cloud platform or input format', reason: 'Limited supported structured/tabular formats and integrations' }
    ],

    // Word Table 7: Feasibility Assessment
    feasibilityTable: [
      { aspect: 'Feasibility within 3-credit scope', assessment: 'A 15-week semester and limited student development resources are identified; a formal 3-credit feasibility conclusion is not provided.' },
      { aspect: 'Required computing / resources', assessment: 'Dataset processing requires local file handling, memory and storage; exact equipment specifications are not stated.' },
      { aspect: 'Prerequisite knowledge', assessment: 'DBMS, DAA, Probability & Statistics, Machine Learning concepts, OS and Web Technologies.' },
      { aspect: 'Major constraints / limitations', assessment: 'Limited supported input formats; memory/storage demands for larger datasets; supported corrections only; original data must remain unchanged.' },
      { aspect: 'Use of existing libraries / tools', assessment: 'Not explicitly specified in the slides.' },
      { aspect: 'Overall feasibility', assessment: 'Not explicitly assessed in the slides; requires faculty confirmation.' }
    ],

    // Word Table 4 (from Gate 1 Doc): Primary Actors & User Stories
    userStoryTable: [
      { id: '01', actor: 'User', desc: 'User wants to upload a supported dataset for quality analysis.', mainFlow: 'Select file → Upload → System validates file → Dataset accepted.', exceptionFlow: 'Unsupported/corrupted/empty file → System displays error and rejects the file.' },
      { id: '02', actor: 'User', desc: 'User wants to view the structure and basic characteristics of the uploaded dataset', mainFlow: 'System reads dataset → identifies rows, columns, data types and basic statistics → Displays profile.', exceptionFlow: 'Parsing/type problem → System flags the affected data and continues where possible.' },
      { id: '03', actor: 'User', desc: 'User wants to identify problems in the dataset.', mainFlow: 'System checks missing values, duplicates, invalid values, data-type inconsistencies and outliers → Displays detected issues.', exceptionFlow: 'A rule cannot be applied → System marks the issue for review.' },
      { id: '04', actor: 'User', desc: 'User wants to choose which detected problems should be corrected.', mainFlow: 'User reviews issues → Selects corrections → Confirms → System applies selected corrections to a separate copy.', exceptionFlow: 'Correction is not applicable/fails → System reports the problem and keeps the affected data unchanged' },
      { id: '05', actor: 'User', desc: 'User wants to check the corrected dataset again.', mainFlow: 'System re-profiles corrected dataset → Runs quality checks → Displays updated results.', exceptionFlow: 'New or remaining problems found → System shows them for another correction round.' },
      { id: '06', actor: 'User', desc: 'User wants the final quality of the corrected dataset.', mainFlow: 'User chooses finish → System performs final analysis → Calculates quality score → Generates dashboard and downloadable report.', exceptionFlow: 'Report generation fails → System displays error and allows retry.' },
      { id: '07', actor: 'Admin', desc: 'Admin wants to manage the rules used for quality checking.', mainFlow: 'Admin adds/updates/deactivates rules → System validates the rule → Saves the updated rule set.', exceptionFlow: 'Invalid/conflicting rule → System rejects the rule and shows the reason.' },
      { id: '08', actor: 'Admin', desc: 'Admin wants to control which file formats can be uploaded', mainFlow: 'Admin adds/enables/disables supported formats → System updates the allowed format list.', exceptionFlow: 'Unsupported or invalid configuration → System rejects the change.' },
      { id: '09', actor: 'Admin', desc: 'Admin wants to monitor processing and system activity.', mainFlow: 'Admin views processing status, errors and activity information → System displays monitoring information.', exceptionFlow: 'Monitoring data unavailable → System shows an appropriate error/status message.' }
    ]
  },

  // ==========================================
  // STAGE 1: REQUIREMENT ENGINEERING (Gate 1)
  // ==========================================
  stage1: {
    // Word Table 2: Functional Requirements (Complete 9 FRs from Table 2 in Word)
    frTable: [
      { id: 'FR-01', desc: 'The system shall allow users to upload datasets in supported structured/tabular formats and ingest the data for analysis.', prio: 'Mandatory', source: 'Automated profiling' },
      { id: 'FR-02', desc: 'The system shall profile the uploaded dataset and provide its structure, dimensions, columns, data types and basic characteristics.', prio: 'Mandatory', source: 'Automated profiling' },
      { id: 'FR-03', desc: 'The system shall detect and report common data-quality issues including missing values, duplicate records, data-type inconsistencies, null values and basic invalid values.', prio: 'Mandatory', source: 'Automated detection of common data-quality issues' },
      { id: 'FR-04', desc: 'The system shall analyze the dataset using basic statistics, such as average, minimum, maximum, and distribution, and identify unusual values (outliers).', prio: 'Mandatory', source: 'Unified quality analysis' },
      { id: 'FR-05', desc: 'The system shall display the detected issues and allow the user to select which issues should be corrected.', prio: 'Mandatory', source: 'Automated detection of common data-quality issues' },
      { id: 'FR-06', desc: 'The system shall automatically apply the user-selected corrections, such as correcting supported data types and removing duplicate records, without modifying the original dataset.', prio: 'Mandatory', source: 'Basic recommendations for detected issues' },
      { id: 'FR-07', desc: 'The system shall recheck the corrected dataset and allow the user to perform additional correction rounds until the user chooses to finish and allow to generate quality report.', prio: 'Mandatory', source: 'Unified quality analysis' },
      { id: 'FR-08', desc: 'The system shall provide basic recommendations for suitable corrective actions for detected quality issues.', prio: 'Challenge', source: 'Basic recommendations for detected issues' },
      { id: 'FR-09', desc: 'The system shall support efficient processing of larger datasets within the defined system resource limits.', prio: 'Challenge', source: 'Scalability of large datasets' }
    ],

    // Word Table 3: Non-Functional Requirements (Complete 7 NFRs from Table 3 in Word)
    nfrTable: [
      { id: 'NFR-01', desc: 'The system shall process datasets within the supported size limit without failure under the defined test environment.', cat: 'Performance', target: 'Successfully process ≥95% of defined test datasets within the supported size limit' },
      { id: 'NFR-02', desc: 'The system should quickly show the user the progress or result while the dataset is being uploaded and analyzed.', cat: 'Performance', target: 'Display processing status within 2 seconds of starting a long-running operation' },
      { id: 'NFR-03', desc: 'The system shall preserve the original uploaded dataset without modifying it during quality analysis.', cat: 'Reliability / Data Integrity', target: '0 unintended modifications to original input files in test cases' },
      { id: 'NFR-04', desc: 'The system shall provide understandable quality results to users through the dashboard.', cat: 'Usability', target: 'A user shall be able to identify the overall score and major detected issues within 1 minute of viewing the results' },
      { id: 'NFR-05', desc: 'The system shall provide consistent results when the same dataset and rules are processed repeatedly.', cat: 'Reliability', target: 'Identical input and configuration shall produce identical results in repeated tests' },
      { id: 'NFR-06', desc: 'The system shall prevent unauthorized access to uploaded datasets and generated results.', cat: 'Security', target: 'Unauthorized access attempts are rejected in all security tests' },
      { id: 'NFR-07', desc: 'The system shall maintain correction results so that users can distinguish the original and corrected datasets.', cat: 'Reliability', target: '100% of correction sessions preserve original/corrected distinction' }
    ],

    // Architecture & Workflow
    archDesc: 'Decoupled 6-phase pipeline connecting multi-source ingestion to statistical profiling, rule-based quality assessment, metric calculation, and web visualization, backed by isolated Metadata Store and Results Database.',
    archImage: 'assets/team08_architecture_workflow.png',
    archCaption: 'Figure 1.1: 6-Phase Pipeline Architecture & Dual Data Store for Large-Scale Dataset Profiling & Data Quality Engine (Gate 1).',

    workflow: [
      'Phase 01: Data Input & Ingestion',
      'Phase 02: Ingestion & Schema Discovery',
      'Phase 03: Data Profiling & Statistics',
      'Phase 04: Quality Assessment & Rules',
      'Phase 05: Metrics & Health Scoring',
      'Phase 06: Dashboard & Report Export'
    ],
    workflowDesc: [
      'Accepts CSV files and relational database connections (MySQL, PostgreSQL, SQLite) with user configuration for sample size and thresholds.',
      'Reads connection stream, discovers tables/columns/datatypes, and populates Metadata Store with constraints and keys.',
      'Extracts column records, calculates null counts, distinct cardinality, and descriptive summary statistics (min, max, mean, spread).',
      'Runs completeness, uniqueness, validity, and consistency checks; flags duplicate rows, invalid formats, and IQR outliers.',
      'Computes dimension-wise quality percentages and synthesizes composite Data Quality Score (0–100%).',
      'Renders interactive visual dashboard (donut charts, issue frequency bars) and exports downloadable PDF, Excel, and CSV reports.'
    ],

    techStack: 'Frontend: HTML5 Semantic, Vanilla JavaScript ES2022, CSS3 Design Tokens, Chart.js & SVG Visualizers.\nBackend/Engine: Python 3.11, FastAPI, Pandas 2.x (Arrow backend), NumPy / SciPy, NumExpr.\nStorage: SQLite Metadata Store, Results Database, Browser IndexedDB, LocalStorage JSON State, Git Versioning.\nReporting & Verification: Local Ollama LLM daemon (Qwen 3:4b / Mistral), WeasyPrint PDF generator, SheetJS / openpyxl.',
    constraints: 'Hardware: Standard commodity workstation with min 8GB RAM and quad-core CPU. Software: Modern browser with ES2022 & IndexedDB support; Python 3.10+ runtime. Operational: Zero external cloud reliance for data processing to maintain strict privacy compliance.'
  }
};
