/**
 * Static Data File for Team A-08
 * Project: Large-Scale Dataset Profiling & Data Quality Engine
 * Source documents: Team_08_Gate_0 & Team_08_Gate_1_Requirements
 * Faculty Mentor: Ms. Sneha Varur
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team08Data = {
  "id": "A-08",
  "theme": "Data Processing and Analytics Systems",
  "title": "Large-Scale Dataset Profiling & Data Quality Engine",
  "guide": "Ms. Sneha Varur",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/data-quality-engine",
  "members": [
    {
      "name": "Anupriya Savant",
      "usn": "01FE24BCI046",
      "role": "Team Member",
      "skills": "Data Quality • Schema Profiling • Deduplication",
      "contribution": "Profiling algorithms, quality metric assessment, and dataset cleaning pipelines.",
      "github": "https://github.com"
    },
    {
      "name": "Pavitra Jalibenchi",
      "usn": "01FE24BCI049",
      "role": "Team Member",
      "skills": "Data Quality • Schema Profiling • Deduplication",
      "contribution": "Profiling algorithms, quality metric assessment, and dataset cleaning pipelines.",
      "github": "https://github.com"
    },
    {
      "name": "Anushree Angadi",
      "usn": "01FE24BCI050",
      "role": "Team Member",
      "skills": "Data Quality • Schema Profiling • Deduplication",
      "contribution": "Profiling algorithms, quality metric assessment, and dataset cleaning pipelines.",
      "github": "https://github.com"
    },
    {
      "name": "Sahana Awaradi",
      "usn": "01FE24BCI030",
      "role": "Team Member",
      "skills": "Data Quality • Schema Profiling • Deduplication",
      "contribution": "Profiling algorithms, quality metric assessment, and dataset cleaning pipelines.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "Structured datasets can contain missing values, duplicate records, inconsistent types, invalid values, and statistically unusual observations. The proposed project brings dataset profiling and data-quality assessment into a single workflow so users can inspect a dataset, identify quality issues, select supported corrections, and revalidate the results. The presentations describe an upload-to-report workflow and emphasize preserving the original dataset while applying corrections to a separate copy.\n\nThe project draws on DBMS, Data Structures and Algorithm Analysis, Probability and Statistics, Machine Learning concepts, Operating Systems, and Web Technologies.",
    "objectives": [
      "To accept supported structured/tabular datasets and generate a structural profile.",
      "To identify missing values, duplicate rows, data-type inconsistencies, and rule violations.",
      "To compute descriptive statistics and flag potentially unusual observations.",
      "To allow users to review detected issues and apply selected supported corrections without changing the original dataset.",
      "To revalidate corrected data and present data-quality results and reports."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Database Management Systems",
        "concepts": "Dataset structure, schema, data types, consistency, storage and retrieval",
        "role": "Dominant (inferred from presentation emphasis)"
      },
      {
        "sl": "2",
        "course": "Data Structures & Algorithm Analysis",
        "concepts": "Scanning, comparison/hashing for duplicate detection, efficient data processing",
        "role": "Dominant (inferred)"
      },
      {
        "sl": "3",
        "course": "Probability & Statistics",
        "concepts": "Descriptive statistics, distributions, missing-value rates, IQR-based outlier screening",
        "role": "Dominant (inferred)"
      },
      {
        "sl": "4",
        "course": "Machine Learning",
        "concepts": "Anomaly-analysis concepts and interpretation of unusual observations",
        "role": "Supporting (inferred)"
      },
      {
        "sl": "5",
        "course": "Operating Systems",
        "concepts": "Files, memory, processing and resource limits",
        "role": "Supporting (inferred)"
      },
      {
        "sl": "6",
        "course": "Web Technologies",
        "concepts": "Dataset upload, dashboard, user interactions and reporting",
        "role": "Supporting (inferred)"
      }
    ],
    "conceptualFlowImage": "assets/team08_conceptual_workflow.png",
    "conceptualFlowCaption": "Fig 1. Conceptual Workflow of Large-Scale Dataset Profiling & Data Quality Engine",
    "scopeInTable": [
      {
        "num": "1",
        "item": "Upload and inspect supported structured/tabular datasets."
      },
      {
        "num": "2",
        "item": "Profile datasets and detect missing, duplicate, inconsistent and invalid values."
      },
      {
        "num": "3",
        "item": "Perform basic statistical analysis and flag possible outliers."
      },
      {
        "num": "4",
        "item": "Display findings, allow selected supported corrections, revalidate, and produce quality results."
      }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "Enterprise-scale deployment",
        "reason": "Beyond initial student project and resource scope"
      },
      {
        "num": "2",
        "item": "Real-time enterprise monitoring",
        "reason": "Excluded from initial integration scope"
      },
      {
        "num": "3",
        "item": "Support for every database/cloud platform or input format",
        "reason": "Limited supported structured/tabular formats and integrations"
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Feasibility within 3-credit scope",
        "assessment": "A 15-week semester and limited student development resources are identified; a formal 3-credit feasibility conclusion is not provided."
      },
      {
        "aspect": "Required computing / resources",
        "assessment": "Dataset processing requires local file handling, memory and storage; exact equipment specifications are not stated."
      },
      {
        "aspect": "Prerequisite knowledge",
        "assessment": "DBMS, DAA, Probability & Statistics, Machine Learning concepts, OS and Web Technologies."
      },
      {
        "aspect": "Major constraints / limitations",
        "assessment": "Limited supported input formats; memory/storage demands for larger datasets; supported corrections only; original data must remain unchanged."
      },
      {
        "aspect": "Use of existing libraries / tools",
        "assessment": "Not explicitly specified in the slides."
      },
      {
        "aspect": "Overall feasibility",
        "assessment": "Not explicitly assessed in the slides; requires faculty confirmation."
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR-01",
        "desc": "The system shall allow users to upload datasets in supported structured/tabular formats and ingest the data for analysis.",
        "priority": "Mandatory",
        "sourceNeed": "Automated profiling"
      },
      {
        "id": "FR-03",
        "desc": "The system shall detect and report common data-quality issues including missing values, duplicate records, data-type inconsistencies, null values and basic invalid values.",
        "priority": "Mandatory",
        "sourceNeed": "Automated detection of common data-quality issues"
      },
      {
        "id": "FR-04",
        "desc": "The system shall analyze the dataset using basic statistics, such as average, minimum, maximum, and distribution, and identify unusual values (outliers).",
        "priority": "Mandatory",
        "sourceNeed": "Unified quality analysis"
      },
      {
        "id": "FR-05",
        "desc": "The system shall display the detected issues and allow the user to select which issues should be corrected.",
        "priority": "Mandatory",
        "sourceNeed": "Automated detection of common data-quality issues"
      },
      {
        "id": "FR-06",
        "desc": "The system shall automatically apply the user-selected corrections, such as correcting supported data types and removing duplicate records, without modifying the original dataset.",
        "priority": "Mandatory",
        "sourceNeed": "Basic recommendations for detected issues"
      },
      {
        "id": "FR-07",
        "desc": "The system shall recheck the corrected dataset and allow the user to perform additional correction rounds until the user chooses to finish and allow to generate quality report.",
        "priority": "Mandatory",
        "sourceNeed": "Unified quality analysis"
      },
      {
        "id": "FR-08",
        "desc": "The system shall provide basic recommendations for suitable corrective actions for detected quality issues.",
        "priority": "Challenge",
        "sourceNeed": "Basic recommendations for detected issues"
      },
      {
        "id": "FR-09",
        "desc": "The system shall support efficient processing of larger datasets within the defined system resource limits.",
        "priority": "Challenge",
        "sourceNeed": "Scalable processing of large datasets"
      }
    ],
    "nfrTable": [
      {
        "id": "NFR-01",
        "desc": "The system shall process datasets within the supported size limit without failure under the defined test environment.",
        "cat": "Performance",
        "target": "Successfully process ≥95% of defined test datasets within the supported size limit"
      },
      {
        "id": "NFR-02",
        "desc": "The system should quickly show the user the progress or result while the dataset is being uploaded and analyzed.",
        "cat": "Performance",
        "target": "Display processing status within 2 seconds of starting a long-running operation"
      },
      {
        "id": "NFR-03",
        "desc": "The system shall preserve the original uploaded dataset without modifying it during quality analysis.",
        "cat": "Reliability / Data Integrity",
        "target": "0 unintended modifications to original input files in test cases"
      },
      {
        "id": "NFR-04",
        "desc": "The system shall provide understandable quality results to users through the dashboard.",
        "cat": "Usability",
        "target": "A user shall be able to identify the overall score and major detected issues within 1 minute of viewing the results"
      },
      {
        "id": "NFR-05",
        "desc": "The system shall provide consistent results when the same dataset and rules are processed repeatedly.",
        "cat": "Reliability",
        "target": "Identical input and configuration shall produce identical results in repeated tests"
      },
      {
        "id": "NFR-06",
        "desc": "The system shall prevent unauthorized access to uploaded datasets and generated results.",
        "cat": "Security",
        "target": "Unauthorized access attempts are rejected in all security tests"
      },
      {
        "id": "NFR-07",
        "desc": "The system shall maintain correction results so that users can distinguish the original and corrected datasets.",
        "cat": "Reliability",
        "target": "100% of correction sessions preserve original/corrected distinction"
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "User",
        "desc": "User wants to upload a supported dataset for quality analysis.",
        "mainFlow": "Select file → Upload → System validates file → Dataset accepted.",
        "exceptionFlow": "Unsupported/corrupted/empty file → System displays error and rejects the file."
      },
      {
        "id": "UC-02",
        "actor": "User",
        "desc": "User wants to view the structure and basic characteristics of the uploaded dataset",
        "mainFlow": "System reads dataset → identifies rows, columns, data types and basic statistics → Displays profile.",
        "exceptionFlow": "Parsing/type problem → System flags the affected data and continues where possible."
      },
      {
        "id": "UC-03",
        "actor": "User",
        "desc": "User wants to identify problems in the dataset.",
        "mainFlow": "System checks missing values, duplicates, invalid values, data-type inconsistencies and outliers → Displays detected issues.",
        "exceptionFlow": "A rule cannot be applied → System marks the issue for review."
      },
      {
        "id": "UC-04",
        "actor": "User",
        "desc": "User wants to choose which detected problems should be corrected.",
        "mainFlow": "User reviews issues → Selects corrections → Confirms → System applies selected corrections to a separate copy.",
        "exceptionFlow": "Correction is not applicable/fails → System reports the problem and keeps the affected data unchanged"
      },
      {
        "id": "UC-05",
        "actor": "User",
        "desc": "User wants to check the corrected dataset again.",
        "mainFlow": "System re-profiles corrected dataset → Runs quality checks → Displays updated results.",
        "exceptionFlow": "New or remaining problems found → System shows them for another correction round."
      },
      {
        "id": "UC-06",
        "actor": "User",
        "desc": "User wants the final quality of the corrected dataset.",
        "mainFlow": "User chooses finish → System performs final analysis → Calculates quality score → Generates dashboard and downloadable report.",
        "exceptionFlow": "Report generation fails → System displays error and allows retry."
      },
      {
        "id": "UC-07",
        "actor": "Admin",
        "desc": "Admin wants to manage the rules used for quality checking.",
        "mainFlow": "Admin adds/updates/deactivates rules → System validates the rule → Saves the updated rule set.",
        "exceptionFlow": "Invalid/conflicting rule → System rejects the rule and shows the reason."
      },
      {
        "id": "UC-08",
        "actor": "Admin",
        "desc": "Admin wants to control which file formats can be uploaded",
        "mainFlow": "Admin adds/enables/disables supported formats → System updates the allowed format list.",
        "exceptionFlow": "Unsupported or invalid configuration → System rejects the change."
      },
      {
        "id": "UC-09",
        "actor": "Admin",
        "desc": "Admin wants to monitor processing and system activity.",
        "mainFlow": "Admin views processing status, errors and activity information → System displays monitoring information.",
        "exceptionFlow": "Monitoring data unavailable → System shows an appropriate error/status message."
      }
    ],
    "useCaseImage": "assets/team08_use_case_diagram.png",
    "useCaseCaption": "Fig 2. System Use Case Diagram",
    "acceptanceTable": [
      {
        "req": "FR-01",
        "criteria": "The system accepts supported dataset files and successfully loads valid files for processing. Unsupported, empty, or corrupted files are rejected with an error message.",
        "method": "Upload valid and invalid test files and verify the result."
      },
      {
        "req": "FR-02",
        "criteria": "The system displays the dataset row count, column count, column names, data types, and basic profile information correctly.",
        "method": "Compare displayed profile results with the known dataset values."
      },
      {
        "req": "FR-03",
        "criteria": "The system correctly detects and reports missing values, duplicate records, data-type inconsistencies, and defined invalid values.",
        "method": "Test datasets containing known quality issues and compare detected results with expected results."
      },
      {
        "req": "FR-04",
        "criteria": "The system calculates the defined statistical measures, identifies applicable outliers, and displays the results correctly.",
        "method": "Run the system on test datasets and compare results with independently calculated values."
      },
      {
        "req": "FR-05",
        "criteria": "The system generates a quality score based on the defined scoring rules and displays the score correctly.",
        "method": "Use datasets with known quality issues and verify the calculated score against the defined formula."
      },
      {
        "req": "FR-06",
        "criteria": "The system displays the detected quality results, final quality score and analysis through the dashboard and generates a downloadable quality report.",
        "method": "Complete the analysis and verify dashboard values and downloaded report values."
      },
      {
        "req": "FR-07",
        "criteria": "The system provides a correction recommendation for supported detected quality issues and the recommendation is relevant to the detected issue.",
        "method": "Create datasets with supported issues and verify the displayed recommendations."
      },
      {
        "req": "FR-08",
        "criteria": "The system processes datasets within the defined supported size/resource limit without failure and completes the quality-analysis workflow.",
        "method": "Test datasets of increasing sizes and measure successful completion and processing time."
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['A-08'] = team08Data;
window.STATIC_TEAMS_DATA['08'] = team08Data;
window.STATIC_TEAMS_DATA['8'] = team08Data;
