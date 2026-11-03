/* One CS AI department; local roster import and isolated per-team workspaces. */
const workspaceKeys=['members','guide','forms','repo','stage','unlocked','status0','status1','status2','status3','feedback','score','reviews','questions','answers','activities','messages','mentorMessages','media','questionStage','questionSnapshot','vivaSubmissions'];
const clone=x=>JSON.parse(JSON.stringify(x));
function newTeamWorkspace(team){
  const w=initial();
  Object.assign(w,{media:[],messages:[],mentorMessages:[],reviews:{},vivaRecords:[]});
  w.members=team.members.map((m,i)=>({...m,role:i===0?'Team Lead':'Team Member',github:'https://github.com',skills:'Add skills',contribution:'Add individual responsibilities'}));
  w.guide=team.faculty;
  w.forms={
    0:{title:team.title,problem:'',objectives:'',users:'',baseline:'',scope:'',courses:'',engines:''},
    1:{functional:'',nonfunctional:'',architecture:'',workflow:'',techstack:'',constraints:''},
    2:{implementation:'',modules:'',repo:'',challenges:''},
    3:{testing:'',test_results:'',metrics:'',evaluation:''}
  };
  w.activities=[{text:'CS AI team workspace created',time:new Date().toLocaleString()}];
  const result={};
  workspaceKeys.forEach(k=>{if(w[k]!==undefined)result[k]=w[k]});
  return result;
}
function seedTeams(){return [
  // Theme 1: Intelligent Systems & Optimization (3 teams)
  {id:'01',faculty:'Amit K',topic:'Intelligent Systems & Optimization',title:'Multi-Agent Warehouse Routing & Logistics System',members:[{name:'Kunal Sharma',usn:'01FE23BCS011'},{name:'Meera Joshi',usn:'01FE23BCS012'},{name:'Rahul Verma',usn:'01FE23BCS013'},{name:'Ananya Sen',usn:'01FE23BCS014'}],sample:true},
  {id:'02',faculty:'Amit K',topic:'Intelligent Systems & Optimization',title:'Dynamic Traffic Flow Optimization with Reinforcement Learning',members:[{name:'Rohan Kulkarni',usn:'01FE23BCS021'},{name:'Pooja Hegde',usn:'01FE23BCS022'},{name:'Aditya Deshmukh',usn:'01FE23BCS023'},{name:'Neha Patil',usn:'01FE23BCS024'}],sample:true},
  {id:'03',faculty:'Amit K',topic:'Intelligent Systems & Optimization',title:state.forms?.[0]?.title||state.forms?.[1]?.title||'Adaptive Academic Timetable Optimization',members:state.members.map(m=>({name:m.name,usn:m.usn})),sample:false},

  // Theme 2: Computer Vision & Healthcare (3 teams)
  {id:'04',faculty:'Dr. Priya Rao',topic:'Computer Vision & Healthcare',title:'Real-Time Surgical Instrument Segmentation in Laparoscopy',members:[{name:'Vikram Rao',usn:'01FE23BCS041'},{name:'Shruti Pai',usn:'01FE23BCS042'},{name:'Gaurav Bhat',usn:'01FE23BCS043'},{name:'Divya Kamath',usn:'01FE23BCS044'}],sample:true},
  {id:'05',faculty:'Dr. Priya Rao',topic:'Computer Vision & Healthcare',title:'Diabetic Retinopathy Screening with Vision Transformers',members:[{name:'Siddharth Shenoy',usn:'01FE23BCS051'},{name:'Kavita Nair',usn:'01FE23BCS052'},{name:'Abhay Nayak',usn:'01FE23BCS053'},{name:'Priyanka Prabhu',usn:'01FE23BCS054'}],sample:true},
  {id:'07',faculty:'Dr. Priya Rao',topic:'Computer Vision & Healthcare',title:'Plant Disease Detection with Explainable AI',members:[{name:'Aarav Patil',usn:'DEMO-CSAI-201'},{name:'Diya Shetty',usn:'DEMO-CSAI-202'},{name:'Ishaan Naik',usn:'DEMO-CSAI-203'},{name:'Kavya Joshi',usn:'DEMO-CSAI-204'}],sample:true},

  // Theme 3: Data Engineering & Quality Engines (3 teams)
  {id:'08',faculty:'Mrs. Sneha Varur',topic:'Data Engineering & Quality Engines',title:'Large-Scale Dataset Profiling & Data Quality Engine',members:[{name:'Anupriya Savant',usn:'01FE24BCI046',role:'Team Lead · Full-stack & Profiling Engine',skills:'Full-Stack · Schema Profiling',contribution:'Lead architecture modeling, ingestion pipeline, and full-stack integration.'},{name:'Pavitra Jalibenchi',usn:'01FE24BCI049',role:'Core Member · Anomaly & Duplicate Detection',skills:'DAA · Hash Deduplication',contribution:'Duplicate row detection algorithms and data consistency constraint rules.'},{name:'Anushree Angadi',usn:'01FE24BCI050',role:'Core Member · Statistical Analysis & Outliers',skills:'Probability & Stats · IQR Outliers',contribution:'Descriptive statistics, distribution modeling, and IQR outlier screening.'},{name:'Sahana Awaradi',usn:'01FE24BCI030',role:'Core Member · Revalidation & Reporting',skills:'Data Integrity · PDF/Excel Export',contribution:'Copy-on-write remediation, revalidation pipeline, and multi-format report exports.'}],sample:true},
  {id:'10',faculty:'Mrs. Sneha Varur',topic:'Data Engineering & Quality Engines',title:'Automated Feature Drift & Schema Migration Validator',members:[{name:'Harsh Vardhan',usn:'01FE23BCS105'},{name:'Isha Roy',usn:'01FE23BCS106'},{name:'Naveen Reddy',usn:'01FE23BCS107'},{name:'Deepa Menon',usn:'01FE23BCS108'}],sample:true},
  {id:'12',faculty:'Mrs. Sneha Varur',topic:'Data Engineering & Quality Engines',title:'Distributed Pipeline Anomaly & Inconsistency Sentinel',members:[{name:'Neel Desai',usn:'DEMO-CSAI-301'},{name:'Riya Bhat',usn:'DEMO-CSAI-302'},{name:'Aditya Hegde',usn:'DEMO-CSAI-303'},{name:'Tanvi Rao',usn:'DEMO-CSAI-304'}],sample:true},

  // Theme 4: Responsible AI & Security (3 teams)
  {id:'14',faculty:'Dr. Priya Rao',topic:'Responsible AI & Security',title:'Adversarial Robustness Benchmark for Autonomous Driving',members:[{name:'Arjun Saxena',usn:'01FE23BCS141'},{name:'Rhea Dsouza',usn:'01FE23BCS142'},{name:'Karan Malhotra',usn:'01FE23BCS143'},{name:'Bhavna Iyer',usn:'01FE23BCS144'}],sample:true},
  {id:'16',faculty:'Dr. Sneha Kulkarni',topic:'Responsible AI & Security',title:'Privacy-Preserving Federated Learning for Multi-Hospital Scans',members:[{name:'Mohit Agrawal',usn:'01FE23BCS161'},{name:'Alisha Khan',usn:'01FE23BCS162'},{name:'Pranav Gupta',usn:'01FE23BCS163'},{name:'Simran Kaur',usn:'01FE23BCS164'}],sample:true},
  {id:'18',faculty:'Dr. Priya Rao',topic:'Responsible AI & Security',title:'Bias Audit Toolkit for Student Recommendation Systems',members:[{name:'Om Kulkarni',usn:'DEMO-CSAI-401'},{name:'Anvi Kamat',usn:'DEMO-CSAI-402'},{name:'Yash More',usn:'DEMO-CSAI-403'},{name:'Sara Patil',usn:'DEMO-CSAI-404'}],sample:true}
];}
function ensureDepartment(){
  if(!state.department){state.department={name:'CS AI',hod:'CS AI HOD (demo)',facultyAdmin:'CS AI Faculty Admin (demo)'}}
  const seeds=seedTeams();
  if(!state.teams||state.teams.length<12){
    state.members[3].name='Sachi Aarati';state.members.forEach(m=>delete m.share);state.guide='Amit K';
    if(!state.teams)state.teams=seeds;
    else seeds.forEach(s=>{if(!state.teams.some(t=>t.id===s.id))state.teams.push(s)});
    state.activeTeamId=state.activeTeamId||'03';state.workspaces=state.workspaces||{};state.facultyAccount=state.facultyAccount||'Amit K';
    state.teams.forEach(t=>{
      t.department='CS AI';t.hod=state.department.hod;t.facultyAdmin=state.department.facultyAdmin;
      if(t.id!=='03'&&!state.workspaces[t.id])state.workspaces[t.id]=newTeamWorkspace(t);
    });
  }
  state.version=3;state.members.forEach(m=>delete m.share);
  state.teams.forEach(t=>{t.members.forEach(m=>delete m.share);if(t.members.every(m=>m.usn.startsWith('DEMO-')||m.usn.startsWith('01FE')))t.sample=t.id!=='03'});
  state.facultyDirectory=state.facultyDirectory||[];

  const t08Forms={
    0:{
      title:'Large-Scale Dataset Profiling & Data Quality Engine',
      problem:'Modern data engineering pipelines ingest multi-gigabyte semi-structured datasets (CSV, JSON, Parquet) from heterogeneous sources, leading to critical downstream ML model failures and dashboard inaccuracies caused by schema divergence, silent type casting, duplicate records, missing values, and undetected statistical outliers. Traditional profiling libraries (such as pandas-profiling) consume >4x dataset size in RAM and lack automated, reproducible quality remediation reports with verifiable audit trails.',
      objectives:'1. Build high-throughput streaming and chunked dataset ingestion supporting CSV, JSON, and Parquet with automated schema inference.\n2. Implement algorithmic profiling for data completeness, statistical distributions (mean, median, IQR), duplicate row detection, and outlier identification.\n3. Enforce deterministic data quality constraint validation rules with severity classifications (Critical, Warning, Info).\n4. Provide an interactive visual dashboard for dataset health scoring and generate verifiable multi-format compliance reports (HTML, PDF, JSON).',
      users:'Data Engineers, ML Practitioners, Data Quality Analysts, Academic Project Guides, and Governance Auditors.',
      baseline:'Benchmarked against pandas-profiling / ydata-profiling and Great Expectations. Heavy Python runtime overhead (>4x RAM), high duplicate detection latency on 1M+ records, and complex setup were identified as key limitations. Our approach introduces lightweight streaming chunk passes, hash-based deduplication, and single-pass summary statistics with copy-on-write memory safety.',
      scope:'In-Scope: Ingestion of structured & tabular datasets up to 10GB; automated schema profiling; rule-based quality constraint checks; statistical anomaly detection; interactive visual health scoring; PDF/Excel report export.\nOut-of-Scope: Distributed Spark cluster management; live real-time video/audio stream processing; automatic destructive database schema alteration.',
      courses:'• DAA (CSAI 301): Hash-based deduplication & streaming quantile algorithms\n• OS (CSAI 302): Memory-mapped chunked I/O & asynchronous concurrency\n• Software Engineering (CSAI 303): Modularity, REST API contract design, test coverage\n• Probability & Statistics (CSAI 304): Descriptive statistics, distribution fitting, IQR outlier detection\n• Database Systems (CSAI 305): Schema validation, ACID copy-on-write consistency\n• Machine Learning (CSAI 306): Feature distribution drift detection & anomaly screening',
      engines:'• E1: Stream Ingestion & Schema Profiler Engine\n• E2: Statistical & Distribution Analysis Engine\n• E3: Deterministic Data Quality Rules Engine\n• E4: Remediation, Revalidation & Audit Reporting Engine'
    },
    1:{
      functional:'FR-01: Ingestion & Format Parsing (CSV, JSON, Parquet streaming chunks)\nFR-02: Automated Schema Profiling (column types, nullability, uniqueness)\nFR-03: Statistical Distribution Metrics (mean, median, variance, skewness, quantiles)\nFR-04: Outlier Detection (Tukey IQR method & modified Z-score)\nFR-05: Duplicate Record Identification (multi-column hash-based deduplication)\nFR-06: Custom Rule Engine (user-defined assertions, regex patterns, range checks)\nFR-07: Dataset Health Scoring (0–100 weighted quality index across 6 dimensions)\nFR-08: Copy-on-Write Remediation (immutable source with rollback safety)\nFR-09: Multi-Format Report Generation (interactive HTML dashboard, PDF, Excel summary)',
      nonfunctional:'NFR-01 (Latency): Profile 1M rows (100MB CSV) in < 15 seconds on consumer hardware\nNFR-02 (Memory Bound): Peak RAM usage bounded within 2.5x chunk buffer (streaming memory ceiling < 500MB)\nNFR-03 (Deduplication Accuracy): 100% precision & recall on exact duplicate detection\nNFR-04 (Rule Throughput): Evaluate 50 constraint rules on 100k rows in < 1.2 seconds\nNFR-05 (Security & Isolation): Zero unauthorized data leakage; zero telemetry of customer data rows\nNFR-06 (Portability): Cross-platform execution across Linux, Windows, and macOS without native dependencies\nNFR-07 (Reliability): Graceful handling of malformed records with quarantine logging without pipeline crash',
      architecture:'Modular local-first architecture: Presentation Tier (Semantic HTML5, CSS design tokens, Chart.js visualizers) → API Gateway / Coordinator (FastAPI asynchronous router with schema validation) → Core Execution Engine (Python 3.11 streaming chunk processor, NumExpr, DAA hash index) → Local-First Persistence Tier (Browser IndexedDB for media/binary evidence, LocalStorage for state, and immutable GitHub repository versioning).',
      workflow:'Phase 01: Dataset Ingestion & Chunk Buffering → Phase 02: Schema Inference & Completeness Analysis → Phase 03: Statistical Distribution & Outlier Screening → Phase 04: Duplicate Detection & Constraint Checking → Phase 05: Aggregate Health Scoring & Copy-on-Write Remediation → Phase 06: Multi-Format Audit Report Generation & Export.',
      techstack:'Frontend: HTML5 Semantic, Vanilla JavaScript ES2022, CSS3 Design Tokens, Chart.js & SVG Visualizers.\nBackend/Engine: Python 3.11, FastAPI, Pandas 2.x (Arrow backend), NumPy / SciPy, NumExpr.\nStorage: Browser IndexedDB (Media & binary evidence), LocalStorage JSON state, Git & GitHub version control.\nReporting & Verification: Local Ollama LLM daemon (Qwen 3:4b / Mistral), WeasyPrint PDF generator, SheetJS / openpyxl.',
      constraints:'Hardware: Standard commodity workstation with min 8GB RAM and quad-core CPU. Software: Modern browser with ES2022 & IndexedDB support; Python 3.10+ runtime. Operational: Zero external cloud reliance for data processing to maintain strict privacy compliance.'
    },
    2:{
      implementation:'The core engine utilizes chunked streaming with PyArrow memory mapping to prevent OOM errors on large files. Outlier screening implements Tukey\'s IQR rule: Q1 - 1.5*IQR to Q3 + 1.5*IQR computed in a single pass. Duplicate detection employs 64-bit MurmurHash3 streaming fingerprints across composite key sets for O(N) duplicate discovery. All data remediation operations adhere strictly to Copy-on-Write (CoW) semantics, producing clean derived datasets while keeping raw input records completely immutable.',
      modules:'1. ProfilerModule (chunk ingestion, null counting, optimistic type inference)\n2. StatsEngine (mean, median, standard deviation, quartiles, skewness)\n3. AnomalyDetector (IQR outlier filter, regex pattern validator)\n4. Deduplicator (hash index bucket, duplicate identifier)\n5. RemediationPipeline (copy-on-write transform, quarantine log generator)\n6. ExportEngine (PDF audit trail, Excel workbook builder)',
      repo:'https://github.com/topics/data-quality-engine',
      challenges:'Challenge 1: High memory footprint when computing exact medians across millions of rows without loading all data into RAM. Resolved by using t-digest approximate streaming quantiles with < 0.5% relative error.\nChallenge 2: Mixed-type columns causing parser failure. Resolved by implementing two-phase optimistic type inference with fallback to string quarantine.'
    },
    3:{
      testing:'Comprehensive acceptance test suite covering REQ-01 through REQ-08. Testing methodology includes unit tests for individual engine functions, integration tests on synthetic 100k, 500k, and 1M row benchmarks, and edge-case fuzzing with null-heavy, corrupt, and wide datasets (100+ columns).',
      test_results:'REQ-01 (Ingestion): PASS on 100MB CSV and JSON lines in 8.4s.\nREQ-02 (Schema Inference): PASS with 100% correct type assignment across 24 mixed columns.\nREQ-03 (IQR Outliers): PASS; verified against R boxplot baseline with 0 error.\nREQ-04 (Deduplication): PASS; accurately identified 14,200 duplicate rows in 1M row dataset in 3.1s.\nREQ-05 (Rule Engine): PASS; all 50 custom assertions evaluated within 820ms.\nREQ-06 (Copy-on-Write): PASS; original raw file hash preserved identically (SHA-256 verified).\nREQ-07 (Health Score): PASS; score accurately reflected weighted penalty deductions.\nREQ-08 (PDF Export): PASS; generated 12-page comprehensive audit PDF in 1.4s.',
      metrics:'• Ingestion & Profiling Latency: 8.4s for 100MB (Target: < 15s) - PASSED\n• Peak Memory Usage: 312MB on 100MB dataset (Target: < 500MB) - PASSED\n• Duplicate Detection Precision/Recall: 100% / 100% - PASSED\n• Rule Evaluation Throughput: 122,000 rows/second (Target: > 80,000 rows/s) - PASSED',
      evaluation:'The engine successfully achieves sub-15s profiling on 100MB datasets with zero OOM crashes. Current limitation is single-node throughput limit on >10GB files. Future enhancements include multi-threaded chunk processing via Rust/Polars native bindings and automated drift detection across chronological dataset snapshots.'
    }
  };

  const t08=state.teams?.find(t=>t.id==='08');
  if(t08){
    t08.faculty='Mrs. Sneha Varur';t08.topic='Data Engineering & Quality Engines';t08.title='Large-Scale Dataset Profiling & Data Quality Engine';
    t08.members=[{name:'Anupriya Savant',usn:'01FE24BCI046',role:'Team Lead · Full-stack & Profiling Engine',skills:'Full-Stack · Schema Profiling',contribution:'Lead architecture modeling, ingestion pipeline, and full-stack integration.'},{name:'Pavitra Jalibenchi',usn:'01FE24BCI049',role:'Core Member · Anomaly & Duplicate Detection',skills:'DAA · Hash Deduplication',contribution:'Duplicate row detection algorithms and data consistency constraint rules.'},{name:'Anushree Angadi',usn:'01FE24BCI050',role:'Core Member · Statistical Analysis & Outliers',skills:'Probability & Stats · IQR Outliers',contribution:'Descriptive statistics, distribution modeling, and IQR outlier screening.'},{name:'Sahana Awaradi',usn:'01FE24BCI030',role:'Core Member · Revalidation & Reporting',skills:'Data Integrity · PDF/Excel Export',contribution:'Copy-on-write remediation, revalidation pipeline, and multi-format report exports.'}];
    state.workspaces=state.workspaces||{};
    if(!state.workspaces['08'])state.workspaces['08']=newTeamWorkspace(t08);
    state.workspaces['08'].guide='Mrs. Sneha Varur';
    state.workspaces['08'].members=t08.members;
    state.workspaces['08'].forms=clone(t08Forms);
    if(state.activeTeamId==='08'){
      state.guide='Mrs. Sneha Varur';
      state.members=t08.members;
      state.forms=clone(t08Forms);
    }
  }

  [state,...Object.values(state.workspaces||{})].forEach(w=>{
    w.media=w.media||[];w.messages=w.messages||[];w.mentorMessages=w.mentorMessages||[];w.reviews=w.reviews||{};w.questions=w.questions||[];w.answers=w.answers||{};w.activities=w.activities||[];
    w.forms=w.forms||{};
    [0,1,2,3].forEach(s=>{w.forms[s]=w.forms[s]||{}});
  });
}
ensureDepartment();
function activeTeam(){return state.teams.find(t=>t.id===state.activeTeamId)}
function syncTeam(){const team=activeTeam();if(!team)return;team.members=state.members.map(m=>({name:m.name,usn:m.usn}));team.title=state.forms[1].title;team.faculty=state.guide;const w={};workspaceKeys.forEach(k=>{if(state[k]!==undefined)w[k]=clone(state[k])});state.workspaces[team.id]=w}
const saveLocalState=save;
save=function(){ensureDepartment();syncTeam();return saveLocalState()};
function facultyNames(){return [...new Set([...state.teams.map(t=>t.faculty),...state.facultyDirectory.map(f=>f.name)])].sort()}
function visibleTeams(){return state.role==='Faculty'?state.teams.filter(t=>t.faculty===state.facultyAccount):state.role==='Team Lead'?state.teams.filter(t=>t.id===state.activeTeamId):state.teams}
function switchTeam(id){const next=state.teams.find(t=>t.id===id);if(!next||state.role==='Faculty'&&next.faculty!==state.facultyAccount)return toast('This team is not assigned to the selected faculty account.');save();const w=state.workspaces[id]||newTeamWorkspace(next);workspaceKeys.forEach(k=>delete state[k]);Object.assign(state,clone(w));state.activeTeamId=id;state.guide=next.faculty;state.members=state.members.map((m,i)=>({...m,name:next.members[i].name,usn:next.members[i].usn}));state.forms[1].title=next.title;selectedSection='';modal=null;save();render();window.scrollTo(0,0)}
rolePages['Faculty Admin']=['Overview','Department','Team Portfolio','Design Journey','Faculty Review','Discussion'];
iconFor['Faculty Admin']='♙';
currentIdentity=function(){if(state.role==='Faculty Admin')return state.department.facultyAdmin;if(state.role==='Faculty')return state.facultyAccount;if(state.role==='HOD')return state.department.hod;if(state.role==='Admin')return 'CS AI Administrator';return state.members[0].name};
const changeRole=switchRole;
switchRole=function(role){changeRole(role);if(role==='Faculty'){if(!facultyNames().includes(state.facultyAccount))state.facultyAccount=facultyNames()[0];const t=state.teams.find(t=>t.faculty===state.facultyAccount);if(t&&t.id!==state.activeTeamId)switchTeam(t.id)}save();render()};
function selectFaculty(name){if(state.role!=='Faculty'||!facultyNames().includes(name))return;state.facultyAccount=name;const t=state.teams.find(t=>t.faculty===name);if(t)switchTeam(t.id);else{page='Overview';save();render()}}
const actualDecide=decide;
decide=function(approve){if(state.role!=='Faculty'||activeTeam()?.faculty!==state.facultyAccount)return toast('Only the assigned faculty guide can review this team.');actualDecide(approve)};
const decideSend=sendDiscussion;
sendDiscussion=function(){if(state.role==='Faculty'&&activeTeam()?.faculty!==state.facultyAccount)return;decideSend()};
function accountStrip(){const available=state.role==='Faculty'?visibleTeams():state.teams;return `<div class="account-strip"><div><span class="tag">CS AI</span> <span class="mini">HOD: <strong>${esc(state.department.hod)}</strong> &nbsp;·&nbsp; Faculty Admin: <strong>${esc(state.department.facultyAdmin)}</strong></span></div><div class="account-controls">${state.role==='Faculty'?`<label for="faculty-account">Demo faculty account</label><select id="faculty-account" onchange="selectFaculty(this.value)">${facultyNames().map(n=>`<option ${n===state.facultyAccount?'selected':''}>${esc(n)}</option>`).join('')}</select>`:''}<label for="team-account">${state.role==='Team Lead'?'Demo team account':'Active team'}</label><select id="team-account" onchange="switchTeam(this.value)">${available.map(t=>`<option value="${esc(t.id)}" ${t.id===state.activeTeamId?'selected':''}>Team ${esc(t.id)} · ${esc(t.members[0].name)}</option>`).join('')}</select></div></div>`}
const renderWorkspace=render;
render=function(){ensureDepartment();if(page==='Faculty Admin')page='Overview';renderWorkspace();const main=$('.main');if(state.role==='Faculty'&&!visibleTeams().length){main.innerHTML=accountStrip()+heading('No teams assigned','This faculty account has no team allocation. Ask Admin or Faculty Admin to allocate a guide.');return}let html=main.innerHTML;if(['Design Journey','Faculty Review','Discussion'].includes(page)||page==='Overview'&&['Team Lead','Faculty'].includes(state.role))html=html.replaceAll('Team 03','Team '+esc(state.activeTeamId)).replaceAll('TEAM 03','TEAM '+esc(state.activeTeamId));html=html.replace('Intelligent Systems & Optimization · Faculty guide:',esc(activeTeam().topic)+' · Faculty guide:').replace('INTELLIGENT SYSTEMS & OPTIMIZATION',esc(activeTeam().topic.toUpperCase()));main.innerHTML=html;main.insertAdjacentHTML('afterbegin',accountStrip());const f=$('#stageform');if(f){f.onsubmit=e=>{e.preventDefault();saveStage(true)};f.oninput=()=>{if(editableStage()){state.forms[state.stage]=state.forms[state.stage]||{};for(const[k,v]of new FormData(f))state.forms[state.stage][k]=v;if(save())$('#savehint').textContent='✓ Draft saved locally · '+new Date().toLocaleTimeString()}}}if(['Team Portfolio','Design Journey','Evidence Library','Faculty Review'].includes(page))hydrateMedia()};
const teamOverview=overview;
overview=function(){if(state.role==='Faculty Admin')return facultyAdminPanel();return teamOverview()};
function getDomainKnowledge(t){
  const topic=(t.topic||'').toLowerCase(),title=(t.title||'').toLowerCase();
  if(t.id==='08'||title.includes('profiling')||title.includes('data quality')||topic.includes('data engineering')){
    return {
      problem:'Structured datasets frequently suffer from missing values, duplicate records, inconsistent types, invalid formats, and statistically extreme observations. Manual inspection and ad-hoc scripting are error-prone and fail to scale across large tabular files and databases. The proposed project unifies dataset profiling and data-quality assessment into an automated, interactive workflow that preserves the original dataset while applying user-selected corrections strictly to an isolated copy.',
      targetUsers:'Data Analysts, Database Engineers, ML Practitioners, and Academic Researchers.',
      baselineFriction:'Manual data profiling and cleansing consumes up to 60% of data science workflow time with high risk of silent corruption in the original dataset.',
      objectives:'Accept structured tabular datasets and generate structural profiles; detect missing values, duplicates, and type inconsistencies; compute descriptive statistics and flag IQR-based outliers; provide user-guided remediation on decoupled copies; revalidate corrected data and output quality scores and reports.',
      success1:'Completeness & Accuracy: >= 95% detection rate for missing, duplicate, and invalid entries across benchmark test datasets.',
      success2:'Immutability Guarantee: 0 unintended modifications to original input files (100% verified via SHA-256 hash validation).',
      courseIntegration:[
        {course:'Database Management Systems (DBMS)',role:'Dominant',concepts:'Dataset structure, schema discovery, data types, consistency constraints, storage and retrieval.'},
        {course:'Data Structures & Algorithm Analysis (DAA)',role:'Dominant',concepts:'Scanning algorithms, hash-based comparison for duplicate detection, and streaming buffer processing.'},
        {course:'Probability & Statistics',role:'Dominant',concepts:'Descriptive statistics, distributions, missing-value rates, and IQR-based outlier screening.'},
        {course:'Machine Learning',role:'Supporting',concepts:'Anomaly-analysis concepts and interpretation of statistically unusual observations.'},
        {course:'Operating Systems',role:'Supporting',concepts:'File handling, memory buffers, process resource limits, and chunked I/O.'},
        {course:'Web Technologies',role:'Supporting',concepts:'Interactive web dashboard, client-side data visualization, and downloadable report generation.'}
      ],
      conceptualEngines:[
        {id:'E1',name:'Dataset Profiling Engine',desc:'Summarizes rows, columns, data types, null counts, and structural characteristics.'},
        {id:'E2',name:'Completeness & Duplicate Detection',desc:'Identifies missing values, empty strings, and exact duplicate records via hashing.'},
        {id:'E3',name:'Data Validation & Consistency',desc:'Validates configured formats, allowed domain values, type consistency, and constraints.'},
        {id:'E4',name:'Statistical & Anomaly Analysis',desc:'Computes descriptive statistics (mean, min, max, spread) and flags IQR-based outliers.'}
      ],
      scopeIn:[
        'Upload and inspect supported structured/tabular datasets (CSV, tabular files).',
        'Profile datasets and detect missing, duplicate, inconsistent, and invalid values.',
        'Perform basic statistical analysis and flag potential outliers using IQR thresholds.',
        'Display findings on an interactive dashboard, apply user-selected corrections on an isolated copy, revalidate, and produce quality score reports.'
      ],
      scopeOut:[
        'Enterprise-scale multi-cluster distributed deployment (beyond student 3-credit academic scope).',
        'Real-time streaming pipeline integration (excluded from initial batch-analysis scope).',
        'Support for proprietary legacy or unstructured data formats (restricted to structured/tabular data).'
      ],
      feasibilityNotes:'Designed within the 15-week academic semester (3-credit scope). Operates with local file handling, memory management, and zero cloud API cost. Preserves original data via copy-on-write isolation.',
      useCaseImg:'assets/team08_usecase_diagram.jpg',
      ucActor:'User (Data Analyst / End User) & System Administrator',
      ucList:[
        'Upload Dataset (supported structured/tabular formats)',
        'View Dataset Profile (dimensions, columns, types, basic statistics)',
        'View Data Quality Issues (missing, duplicates, invalid, outliers)',
        'Select Issues for Correction (user decision review loop)',
        'Apply Corrections (type casting, duplicate pruning on decoupled copy)',
        'Revalidate Corrected Dataset (iterative quality checks)',
        'View Statistical Analysis & Visualizations (distributions, box plots)',
        'Calculate Quality Score & Export Reports (PDF, Excel, CSV)'
      ],
      uc1:'Upload Dataset & Discover Schema',uc2:'Execute Automated Quality Profiling',uc3:'Select & Apply Guided Corrections',uc4:'Revalidate & Export Quality Report',
      frList:[
        {id:'FR-01',desc:'The system shall allow users to upload datasets in supported structured/tabular formats and ingest data for analysis.',prio:'Mandatory',source:'Automated Ingestion'},
        {id:'FR-02',desc:'The system shall profile the uploaded dataset and provide its structure, dimensions, columns, data types and basic characteristics.',prio:'Mandatory',source:'Automated Profiling'},
        {id:'FR-03',desc:'The system shall detect and report common data-quality issues including missing values, duplicate records, data-type inconsistencies, null values and basic invalid values.',prio:'Mandatory',source:'Quality Anomaly Detection'},
        {id:'FR-04',desc:'The system shall analyze the dataset using basic statistics, such as average, minimum, maximum, and distribution, and identify unusual values (outliers).',prio:'Mandatory',source:'Unified Quality Analysis'},
        {id:'FR-05',desc:'The system shall display the detected issues and allow the user to select which issues should be corrected.',prio:'Mandatory',source:'User Decision Loop'},
        {id:'FR-06',desc:'The system shall automatically apply user-selected corrections, such as correcting supported data types and removing duplicate records, without modifying the original dataset.',prio:'Mandatory',source:'Safe Remediation'},
        {id:'FR-07',desc:'The system shall recheck the corrected dataset and allow the user to perform additional correction rounds until the user chooses to finish and generate the quality report.',prio:'Mandatory',source:'Revalidation'},
        {id:'FR-08',desc:'The system shall provide basic recommendations for suitable corrective actions for detected quality issues.',prio:'Challenge',source:'Recommendation Engine'},
        {id:'FR-09',desc:'The system shall support efficient processing of larger datasets within the defined system resource limits.',prio:'Challenge',source:'Scalability & Performance'}
      ],
      fr1:'FR-01: Multi-Source Dataset Ingestion (CSV, MySQL, PostgreSQL, SQLite) with automatic schema discovery.',
      fr2:'FR-02: Structural Profiling & Completeness Engine scanning missing, null, duplicate, and invalid entries.',
      fr3:'FR-03: Statistical & IQR Anomaly Analysis with user-guided copy-on-write remediation.',
      fr4:'FR-04: Multi-Dimensional Quality Scoring and Export (PDF Report, Excel Sheet, CSV Audit).',
      nfrList:[
        {id:'NFR-01',desc:'The system shall process datasets within the supported size limit without failure under the defined test environment.',cat:'Performance',target:'Successfully process >= 95% of defined test datasets within size limits'},
        {id:'NFR-02',desc:'The system should quickly show the user the progress or result while the dataset is being uploaded and analyzed.',cat:'Performance',target:'Display processing status within 2 seconds of starting long-running operations'},
        {id:'NFR-03',desc:'The system shall preserve the original uploaded dataset without modifying it during quality analysis.',cat:'Reliability / Data Integrity',target:'0 unintended modifications to original input files in test cases'},
        {id:'NFR-04',desc:'The system shall provide understandable quality results to users through the dashboard.',cat:'Usability',target:'User identifies overall score and major issues within 1 minute of viewing'},
        {id:'NFR-05',desc:'The system shall provide consistent results when the same dataset and rules are processed repeatedly.',cat:'Reliability',target:'100% identical results produced on identical input and rules'},
        {id:'NFR-06',desc:'The system shall prevent unauthorized access to uploaded datasets and generated results.',cat:'Security',target:'Unauthorized access attempts are rejected in 100% of security tests'},
        {id:'NFR-07',desc:'The system shall maintain correction results so that users can distinguish the original and corrected datasets.',cat:'Auditability / Reliability',target:'100% of correction sessions preserve original vs. corrected distinction'}
      ],
      nfr1:'NFR-01: Processing Scalability: Complete profiling of 1M row datasets in < 30s.',
      nfr2:'NFR-02: Zero Modification Immutability: 0 unintended changes to source datasets.',
      nfr3:'NFR-03: Deterministic Reliability: 100% repeatable results given identical rules.',
      nfr4:'NFR-04: Usability: Instant visual quality score and major issue breakdown in < 1 min.',
      archImg:'assets/team08_architecture_workflow.png',
      archDesc:'Decoupled 6-phase pipeline connecting multi-source ingestion to statistical profiling, rule-based quality assessment, metric calculation, and web visualization, backed by isolated Metadata Store and Results Database.',
      workflow:['1. Data Input','2. Ingestion & Schema','3. Data Profiling','4. Quality Assessment','5. Metrics & Scoring','6. Dashboard & Output'],
      workflowDesc:[
        'Accepts CSV files and relational database connections (MySQL, PostgreSQL, SQLite) with user configuration for sample size and thresholds.',
        'Reads connection stream, discovers tables/columns/datatypes, and populates Metadata Store with constraints and keys.',
        'Extracts column records, calculates null counts, distinct cardinality, and descriptive summary statistics (min, max, mean, spread).',
        'Runs completeness, uniqueness, validity, and consistency checks; flags duplicate rows, invalid formats, and IQR outliers.',
        'Computes dimension-wise quality percentages and synthesizes composite Data Quality Score (0–100%).',
        'Renders interactive visual dashboard (donut charts, issue frequency bars) and exports downloadable PDF, Excel, and CSV reports.'
      ],
      techGroup2:['Python 3.11','Pandas & Polars (Chunked Processing)','NumPy & SciPy (IQR Outliers)','SQLAlchemy / SQLite Engine'],
      techStorage:['SQLite Metadata Store','Results Database (Anomalies & Scores)','Browser LocalStorage State','Browser IndexedDB (Binary Files)'],
      techReporting:['ReportLab PDF Engine','openpyxl (Excel Report)','CSV Stream Exporter','Chart.js / SVG Visualizer'],
      implDesc:'Chunked stream ingestion reads large files without memory exhaustion. Duplicate rows are detected using MurmurHash3 / MD5 row hashing. Outliers are filtered using the Interquartile Range method (Q1 - 1.5*IQR to Q3 + 1.5*IQR). All remediation transformations write exclusively to a newly allocated dataset instance (Copy-on-Write) while the source file remains strictly read-only.',
      hard1Name:'Dataset Immutability Enforcement (Zero Modification)',
      hard1Desc:'The original dataset file is mounted with read-only permissions and verified with a pre/post SHA-256 hash. Zero byte changes to the original file are tolerated.',
      hard2Name:'Memory Cap & Chunked Stream Bound',
      hard2Desc:'File ingestion allocates a maximum memory buffer of 256 MB by processing in streaming chunks of 10,000 records, preventing out-of-memory errors on large CSV files.',
      testSuite:[
        {req:'REQ-01 · File Ingestion',criteria:'Accepts valid tabular files; rejects unsupported, empty or corrupted files with explicit error.',method:'Upload valid and corrupted CSV test cases; verify clean error response.',obs:'Invalid and empty files rejected in 0.08s with descriptive validation message.'},
        {req:'REQ-02 · Structural Profiling',criteria:'Accurately extracts row count, column count, column names, and data types.',method:'Compare extracted profile metrics with known ground-truth dataset schemas.',obs:'100% schema match across 12 benchmark test datasets.'},
        {req:'REQ-03 · Issue Detection',criteria:'Correctly detects missing values, duplicate rows, type inconsistencies, and nulls.',method:'Execute on synthetic datasets with injected anomalies; compare detected vs ground truth.',obs:'Detected 100% of injected duplicates and 99.4% of missing values.'},
        {req:'REQ-04 · Statistical Analysis & Outliers',criteria:'Computes descriptive stats and accurately identifies values outside IQR fences.',method:'Verify statistical metrics against independently computed SciPy values.',obs:'IQR outlier screening matched independent SciPy benchmark with 100% precision.'},
        {req:'REQ-05 · Quality Scoring',criteria:'Generates multi-dimensional quality score based on defined scoring rules.',method:'Process datasets with known error ratios; verify score against formula.',obs:'Quality score calculated deterministically: 93.5% on department benchmark.'},
        {req:'REQ-06 · Dashboard & Export',criteria:'Renders interactive dashboard and generates downloadable PDF and Excel reports.',method:'Trigger export and verify file readability, schema integrity, and score consistency.',obs:'PDF and Excel reports generated with complete audit trail and charts.'},
        {req:'REQ-07 · Correction Guidance',criteria:'Recommends appropriate remediation actions for detected issues.',method:'Evaluate recommendation relevancy for type casting and deduplication.',obs:'Generated contextual fix suggestions for duplicate records and invalid dates.'},
        {req:'REQ-08 · Scalability & Performance',criteria:'Processes datasets up to 1,000,000 records within defined memory and time limits.',method:'Run stress benchmark on increasing dataset sizes (10k, 100k, 500k, 1M rows).',obs:'1M row dataset profiled in 18.2 seconds within 185 MB RAM footprint.'}
      ],
      tc1Name:'Corrupted & Non-Tabular File Rejection',tc1Obs:'Invalid syntax flagged at byte 0; rejected with 0.04s latency',
      tc2Name:'Hash-Based Duplicate Row Screening',tc2Obs:'1,240 duplicate records flagged with exact line pointers',
      tc3Name:'1,000,000-Row Full Dataset Profiling Stress Run',tc3Obs:'Full structural and statistical profiling completed in 18.2s',
      tc4Name:'Copy-on-Write Immutability SHA-256 Audit',tc4Obs:'Original file SHA-256 hash identical before and after correction rounds',
      metric1Val:'93.5%',metric1Lbl:'Overall Quality Score',
      metric2Val:'0 Changes',metric2Lbl:'Original File Integrity',
      metric3Val:'< 1.8 s',metric3Lbl:'Progress Feedback',
      metric4Val:'100%',metric4Lbl:'Deterministic Output'
    };
  }
  if(topic.includes('vision')||topic.includes('health')||title.includes('disease')||title.includes('retinopathy')||title.includes('surgical')){
    return {
      problem:'Early clinical disease detection and surgical feature identification suffer from diagnostic subjectivity, inter-observer variability, and significant processing delays in resource-constrained medical environments.',
      targetUsers:'Consulting Radiologists, Agricultural Extension Officers, and Clinical Surgeons.',
      baselineFriction:'Manual visual inspection requires 15+ minutes per case with up to 18% false-negative diagnostic rates.',
      objectives:'Build an automated vision inference model achieving >= 90% macro F1; generate real-time Grad-CAM saliency heatmaps; deliver edge inference in under 800ms.',
      success1:'Diagnostic Accuracy: >= 90% Macro F1 on held-out multi-class test sets.',
      success2:'Inference Latency: Sub-800ms per high-resolution frame on edge hardware.',
      uc1:'Upload Clinical Scans & Field Images',uc2:'Execute Vision Transformer / CNN Pipeline',uc3:'Generate Explainable Grad-CAM Heatmap',uc4:'Review & Verify Diagnostic Predictions',
      fr1:'FR-01: Multi-Format Image Ingestion (DICOM, JPG, PNG) with automatic normalization and artifact reduction.',
      fr2:'FR-02: Deep Neural Network Classifier (Vision Transformer / Compact CNN) with multi-label confidence scores.',
      fr3:'FR-03: Saliency Heatmap Generation via Grad-CAM to highlight localized pathological regions.',
      fr4:'FR-04: Automated Diagnostic PDF and Structured JSON Report Generation for clinician validation.',
      nfr1:'NFR-01: Inference Speed < 800ms on edge GPU accelerators.',
      nfr2:'NFR-02: Generalization: >= 88% accuracy across unseen acquisition devices.',
      nfr3:'NFR-03: Privacy: HIPAA/GDPR-compliant zero-cloud client-side execution.',
      nfr4:'NFR-04: Resilience: Rejection of corrupted, over-exposed or blurry inputs.',
      archDesc:'Client Image Uploader → Preprocessing Engine → Vision Transformer Backbone → Saliency Visualizer → Local Diagnostic Database.',
      workflow:['Image Upload','Preprocessing','Neural Inference','Heatmap Generation','Diagnostic Report'],
      techGroup2:['PyTorch 2.2','Vision Transformers (ViT)','MobileNetV3','OpenCV / Albumentations'],
      implDesc:'Transfer learning on pre-trained ViT-B/16 with cross-entropy loss and focal loss for class imbalance. Grad-CAM layers hooked to final convolutional block.',
      hard1Name:'Loss Convergence Bound',hard1Desc:'Focal loss penalty ensures minority pathological classes achieve minimum recall >= 85%.',
      hard2Name:'Confidence Thresholding',hard2Desc:'Predictions with confidence < 75% are automatically flagged as uncertain for mandatory human clinician review.',
      tc1Name:'Extreme Low-Contrast Scan Ingestion',tc1Obs:'Contrast normalization applied; diagnosis predicted with 92% confidence',
      tc2Name:'Corrupted File / Invalid Header Rejection',tc2Obs:'Immediate validation exception triggered; clean error shown',
      tc3Name:'500-Image Batch Inference Stress Test',tc3Obs:'Batch completed in 14.2s (avg 28.4ms per image)',
      tc4Name:'Grad-CAM Pathological Region Localization',tc4Obs:'Heatmap bounding box overlaps manual ground truth with 0.84 IoU',
      metric1Val:'92.4% F1',metric1Lbl:'Macro Test Accuracy',metric2Val:'28.4 ms',metric2Lbl:'Avg Frame Latency',metric3Val:'0.84 IoU',metric3Lbl:'Localization Score',metric4Val:'100%',metric4Lbl:'Corrupted File Rejection'
    };
  }
  if(topic.includes('nlp')||topic.includes('language')||title.includes('helpdesk')||title.includes('translation')||title.includes('contract')){
    return {
      problem:'Campus and institutional stakeholders struggle to find verifiable answers to policy, academic, and administrative queries across regional languages with high hallucination risks in standard chatbots.',
      targetUsers:'Students, Faculty Advisors, and Institutional Administrative Officers.',
      baselineFriction:'Over 60+ repeated query tickets per day requiring 48-hour administrative turnaround times.',
      objectives:'Deliver bilingual semantic passage retrieval; ground every answer in approved institutional documents with verbatim citations; maintain sub-4s response latency.',
      success1:'Retrieval Quality: >= 90% Recall@5 over benchmark campus policy query test sets.',
      success2:'Zero Hallucinations: 100% of factual project claims traceable to exact institutional quotes.',
      uc1:'Ingest Approved Bilingual Policy Documents',uc2:'Perform Dense Passage Semantic Retrieval',uc3:'Generate Citation-Grounded Responses',uc4:'Audit & Flag Unsupported Claims',
      fr1:'FR-01: Multi-Document Ingestion (PDF, Markdown, HTML) with semantic paragraph chunking.',
      fr2:'FR-02: Bilingual Dense Vector Embedding & Retrieval supporting English and regional languages.',
      fr3:'FR-03: Grounded Answer Synthesis using local Ollama model with verbatim quote extraction.',
      fr4:'FR-04: Citation Verification Audit rejecting any response containing unverified claims.',
      nfr1:'NFR-01: End-to-End Latency < 4 seconds on local evaluation hardware.',
      nfr2:'NFR-02: Verifiability: 100% of generated claims must match an exact substring in source documents.',
      nfr3:'NFR-03: Security: Restricted document update permissions for authorized department staff only.',
      nfr4:'NFR-04: Offline Operation: Zero reliance on external paid cloud APIs.',
      archDesc:'Student Web Interface → Multilingual Retrieval API → Document Vector Index → Local Ollama Model → Cited Answer Output.',
      workflow:['Doc Ingestion','Vector Chunking','Dense Retrieval','Local LLM Prompt','Cited Output'],
      techGroup2:['Python 3.11','FastAPI','FAISS / SentenceTransformers','Local Ollama (Qwen 3:4b)'],
      implDesc:'Hybrid BM25 keyword matching combined with MiniLM bilingual dense embeddings. Quantized Qwen 3:4b instructed to answer exclusively using retrieved passages.',
      hard1Name:'Citation Verification Check',hard1Desc:'Responses failing verbatim string verification against source chunks are rejected automatically.',
      hard2Name:'Out-of-Scope Refusal Guardrail',hard2Desc:'Queries lacking relevant corpus context trigger an explicit refusal rather than generating speculative answers.',
      tc1Name:'Bilingual Policy Query (English & Kannada)',tc1Obs:'Relevant policy retrieved; correct bilingual answer synthesized with quotes',
      tc2Name:'Unsupported Factual Query Injection',tc2Obs:'Model correctly refused to speculate; cited absence of source documents',
      tc3Name:'100-Query Latency Benchmark',tc3Obs:'Average end-to-end response time measured at 2.64s',
      tc4Name:'Manual Citation Correctness Audit',tc4Obs:'40/40 citation links accurately opened matching approved policy clause',
      metric1Val:'94.2%',metric1Lbl:'Retrieval Recall@5',metric2Val:'2.64 s',metric2Lbl:'Avg Query Latency',metric3Val:'100%',metric3Lbl:'Verifiable Citations',metric4Val:'0%',metric4Lbl:'Hallucination Rate'
    };
  }
  if(topic.includes('responsible')||topic.includes('security')||title.includes('bias')||title.includes('adversarial')||title.includes('federated')){
    return {
      problem:'Black-box student recommendation and automated evaluation algorithms systematically propagate demographic bias, lack reproducible fairness metrics, and remain vulnerable to data-poisoning attacks.',
      targetUsers:'Department Academic Committees, Accreditation Auditors, and Admissions Officers.',
      baselineFriction:'No existing automated tooling to audit disparate impact across protected student demographics before deployment.',
      objectives:'Implement quantifiable fairness audits across demographic parity and equal opportunity; evaluate adversarial noise resilience; output audit compliance scorecards.',
      success1:'Fairness Certification: Achieve Disparate Impact Ratio >= 0.85 across all protected cohorts.',
      success2:'Adversarial Resilience: Retain >= 85% model accuracy under epsilon=0.03 FGSM perturbations.',
      uc1:'Upload Student Cohort & Feature Datasets',uc2:'Calculate Demographic Parity & Disparate Impact',uc3:'Execute Adversarial Noise Injection Test',uc4:'Generate Institutional Fairness Scorecard',
      fr1:'FR-01: Dataset Ingestion with protected demographic attribute tagging (gender, domicile, socioeconomic tier).',
      fr2:'FR-02: Algorithmic Fairness Metric Calculator (Demographic Parity, Equalized Odds, Disparate Impact).',
      fr3:'FR-03: Adversarial Perturbation Testing (FGSM, PGD) to evaluate classification boundary stability.',
      fr4:'FR-04: Export of Accredited Fairness Compliance Scorecard in CSV, PDF, and interactive visual dashboard.',
      nfr1:'NFR-01: Full audit suite completion in < 15 seconds for cohorts up to 10,000 records.',
      nfr2:'NFR-02: Zero Parameter Leakage: Differential privacy guarantee (epsilon <= 0.5).',
      nfr3:'NFR-03: Reproducibility: Deterministic audit logs with cryptographic hash signatures.',
      nfr4:'NFR-04: Usability: Interactive fairness-accuracy trade-off Pareto frontiers.',
      archDesc:'Compliance Dashboard → Audit API Controller → FairLearn & Adversarial Engine → Differential Privacy Store.',
      workflow:['Data Intake','Protected Tagging','Fairness Metric Run','Adversarial Test','Audit Scorecard'],
      techGroup2:['Python 3.11','FairLearn Toolkit','Adversarial Robustness Toolbox (ART)','Scikit-Learn'],
      implDesc:'Fairness-constrained optimization via exponentiated gradient reduction. Differential privacy perturbations added to gradient updates during model validation.',
      hard1Name:'Four-Fifths Rule Threshold',hard1Desc:'Any recommendation rule with Disparate Impact < 0.80 fails audit and cannot be published.',
      hard2Name:'Privacy Epsilon Bound',hard2Desc:'Strict differential privacy guarantee ensuring individual student records cannot be reconstructed.',
      tc1Name:'Protected Attribute Imbalance Stress Test',tc1Obs:'Disparate impact improved from 0.68 to 0.89 after fair re-weighting',
      tc2Name:'Adversarial Noise Perturbation (FGSM)',tc2Obs:'Model accuracy remained stable at 86.4% under epsilon=0.03 noise',
      tc3Name:'5,000-Student Roster Full Audit Run',tc3Obs:'Complete fairness analysis generated in 4.8 seconds',
      tc4Name:'Cryptographic Audit Log Verification',tc4Obs:'SHA-256 signature verified against exported scorecard',
      metric1Val:'0.89 DIR',metric1Lbl:'Disparate Impact Ratio',metric2Val:'4.8 s',metric2Lbl:'Cohort Audit Time',metric3Val:'86.4%',metric3Lbl:'Robust Accuracy',metric4Val:'100%',metric4Lbl:'Accreditation Pass'
    };
  }
  return {
    problem:'Manual academic timetable preparation is labor-intensive, error-prone, and leads to widespread faculty clashes, overlapping room bookings, and uncoordinated student elective slots across the department.',
    targetUsers:'Department coordinators, faculty mentors, and enrolled semester students.',
    baselineFriction:'Over 40+ manual coordination hours per semester with unavoidable human scheduling conflicts.',
    objectives:'Automate conflict-free timetable generation; reduce scheduling coordination time by 80%; guarantee 100% adherence to hard room and faculty capacity constraints; provide coordinator manual override capabilities.',
    success1:'Zero Hard Conflicts: Strict constraint satisfaction with zero double-booked rooms or faculty slots.',
    success2:'Runtime Optimization: Generate verifiable cohort timetables in under 30 seconds on standard compute.',
    uc1:'Upload Constraints & Capacities',uc2:'Execute Constraint Solver Engine',uc3:'Review & Approve Milestones',uc4:'View & Export Timetable / Portfolio',
    fr1:'FR-01: Ingestion of faculty availability matrices, room capacities, course lists, and student cohort rosters.',
    fr2:'FR-02: Constraint-based solver modeling hard limits and optimizing preferred morning time slots.',
    fr3:'FR-03: Interactive conflict resolution and manual slot overrides with real-time clash validation.',
    fr4:'FR-04: Multi-format publication exporting finalized timetables in PDF, Excel, and Web formats.',
    nfr1:'NFR-01: Sub-30s solver runtime on benchmark department dataset.',
    nfr2:'NFR-02: 100% hard constraint enforcement with zero simultaneous clashes.',
    nfr3:'NFR-03: Role-based authorization: Coordinator edits, Faculty reviews, Students view.',
    nfr4:'NFR-04: Zero-build offline architecture operable in standard university computer labs.',
    archDesc:'Web Dashboard → Scheduling API Gateway → Google OR-Tools Constraint Solver → Timetable Repository.',
    workflow:['Data Ingestion','Constraint Setup','Solver Run','Clash Check','Final Export'],
    techGroup2:['Python 3.11','Google OR-Tools (CP-SAT)','FastAPI Framework','Constraint Satisfaction (CSP)'],
    implDesc:'Model faculty availability and room capacities as hard boolean constraint matrices. Maximize preferred faculty time slots and minimize student gaps as weighted soft objectives via CP-SAT solver.',
    hard1Name:'Faculty No-Clash Condition',hard1Desc:'For every instructor and timeslot, total assigned lecture/lab sessions must never exceed 1: sum X(f,r,s,t) <= 1.',
    hard2Name:'Room Capacity Strict Bounds',hard2Desc:'For every scheduled section, RoomCapacity(r) >= CohortEnrollment(s). Overflows are mathematically rejected.',
    tc1Name:'Simultaneous Faculty Double-Booking Test',tc1Obs:'Conflict detected in 0.04s; rejected by solver',
    tc2Name:'Room Capacity Overflow Boundary Check',tc2Obs:'Auto-reroutes to larger lecture theater or splits lab batch',
    tc3Name:'40-Course Full Department Timetable Run',tc3Obs:'Complete timetable generated in 18.4 seconds',
    tc4Name:'Coordinator Manual Override Conflict Audit',tc4Obs:'Clash warning triggered; invalid slot swap blocked',
    metric1Val:'0 Clashes',metric1Lbl:'Hard Constraints',metric2Val:'82% Saved',metric2Lbl:'Coordination Time',metric3Val:'18.4 s',metric3Lbl:'Solver Latency',metric4Val:'91.5%',metric4Lbl:'Preference Fit'
  };
}

portfolio=function(){
  const t=activeTeam()||state.teams[0],
        f0=state.forms?.[0]||{},
        f1=state.forms?.[1]||{},
        f2=state.forms?.[2]||{},
        f3=state.forms?.[3]||{},
        topic=t.topic||'Specialization Theme',
        title=f0.title||f1.title||t.title||'Project Portfolio',
        guide=state.guide||t.faculty||'Faculty Guide',
        repoUrl=safe(state.repo||t.repo||'https://github.com'),
        dk=getDomainKnowledge(t);

  return heading('Project Portfolio', 'Comprehensive One-Page Technical Showcase · CS AI AY 2026–27')+`
<div class="portfolio-container">
  <!-- Top Section: Theme, Title, Meta and Team Members -->
  <header class="portfolio-hero-banner">
    <div>
      <span class="portfolio-theme-pill">Theme: ${esc(topic)}</span>
      <h1 class="portfolio-hero-title">${esc(title)}</h1>
      <div class="portfolio-hero-meta">
        <span>Team: <strong>Team ${esc(t.id)}</strong></span>
        <span>Faculty Guide: <strong>${esc(guide)}</strong></span>
        <span>Academic Year: <strong>2026–27</strong></span>
        <a href="${repoUrl}" target="_blank" rel="noopener" class="btn secondary" style="margin-left:auto">GitHub Repository ↗</a>
      </div>
    </div>

    <!-- Team Members Details (No inputs/textboxes) -->
    <div class="portfolio-members-grid">
      ${t.members.map((m,i)=>`
        <article class="portfolio-member-card">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            ${avatar(m)}
            <div>
              <strong style="display:block;font-size:13.5px;color:var(--ink)">${esc(m.name)}</strong>
              <span class="tag ${i===0?'':'gray'}" style="font-size:10.5px;padding:2px 7px">${i===0?'Team Lead':esc(m.role||'Team Member')}</span>
            </div>
          </div>
          <div style="font-size:11.5px;color:var(--muted);margin-bottom:8px">
            <b>USN:</b> ${esc(m.usn)}
          </div>
          <p style="font-size:12px;color:var(--ink-secondary);margin:0 0 8px;line-height:1.45;flex-grow:1">
            ${esc(m.contribution||(i===0?'Lead architecture modeling, design, and integration.':i===1?'Core algorithm formulation and optimization.':i===2?'API backend validation and data modeling.':'Testing, benchmarking, and evidence documentation.'))}
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:auto">
            <span class="req-tag" style="font-size:10px">${esc(m.skills||(i===0?'Full-stack':i===1?'Algorithms':i===2?'Backend & DB':'Testing & QA'))}</span>
            <a href="${safe(m.github||'https://github.com')}" target="_blank" rel="noopener" class="textbtn" style="font-size:11px">GitHub ↗</a>
          </div>
        </article>
      `).join('')}
    </div>
  </header>

  <!-- 2-Column Layout: Main Content + Sticky Right Navigator -->
  <div class="portfolio-layout">
    <main class="portfolio-content">

      <!-- STAGE 0: Problem Identification -->
      <section class="portfolio-section" id="stage-0">
        <div class="portfolio-section-title">
          <span class="portfolio-stage-badge">STAGE 0</span>
          <h2>Problem Identification</h2>
        </div>

        <article class="portfolio-subblock" id="sec-problem">
          <h3>${ICONS['Evidence Library']} Problem Statement</h3>
          <p class="portfolio-prose">${esc(f0.problem || f1.problem || dk.problem)}</p>
          <div class="req-grid" style="margin-top:4px">
            <div class="req-card">
              <span class="req-tag">Target Users</span>
              <strong>Key Stakeholders</strong>
              <p>${esc(f0.users || f1.users || dk.targetUsers)}</p>
            </div>
            <div class="req-card">
              <span class="req-tag">Baseline Friction</span>
              <strong>Industry &amp; Academic Pain Points</strong>
              <p>${esc(f0.baseline || dk.baselineFriction)}</p>
            </div>
          </div>
          ${f0.courses ? `
            <div style="margin-top:14px">
              <h4 style="font-size:13px;color:var(--ink);margin:0 0 8px;font-weight:700">Foundation Course Integration &amp; Academic Role</h4>
              <div style="background:var(--bg-subtle);border:1px solid var(--line);border-radius:9px;padding:12px 16px">
                <p class="portfolio-prose" style="white-space:pre-line;margin:0;font-size:12.5px">${esc(f0.courses)}</p>
              </div>
            </div>
          ` : dk.courseIntegration ? `
            <div style="margin-top:14px">
              <h4 style="font-size:13px;color:var(--ink);margin:0 0 8px;font-weight:700">Foundation Course Integration &amp; Academic Role</h4>
              <div class="req-grid" style="grid-template-columns:repeat(auto-fit, minmax(280px, 1fr))">
                ${dk.courseIntegration.map(c=>`
                  <div class="req-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                      <strong style="color:var(--ink);font-size:12.5px">${esc(c.course)}</strong>
                      <span class="tag ${c.role==='Dominant'?'':'gray'}" style="font-size:10px;padding:1px 6px">${esc(c.role)}</span>
                    </div>
                    <p style="margin:0;font-size:12px;color:var(--ink-secondary)">${esc(c.concepts)}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `:''}
          ${f0.engines ? `
            <div style="margin-top:14px">
              <h4 style="font-size:13px;color:var(--ink);margin:0 0 8px;font-weight:700">Conceptual System Workflow Engines</h4>
              <div style="background:var(--bg-subtle);border:1px solid var(--line);border-radius:9px;padding:12px 16px">
                <p class="portfolio-prose" style="white-space:pre-line;margin:0;font-size:12.5px">${esc(f0.engines)}</p>
              </div>
            </div>
          ` : dk.conceptualEngines ? `
            <div style="margin-top:14px">
              <h4 style="font-size:13px;color:var(--ink);margin:0 0 8px;font-weight:700">Conceptual System Workflow Engines</h4>
              <div class="req-grid" style="grid-template-columns:repeat(auto-fit, minmax(260px, 1fr))">
                ${dk.conceptualEngines.map(e=>`
                  <div class="req-card">
                    <span class="req-tag">${esc(e.id)}</span>
                    <strong style="color:var(--ink);font-size:12.5px;display:block;margin:3px 0">${esc(e.name)}</strong>
                    <p style="margin:0;font-size:12px;color:var(--ink-secondary)">${esc(e.desc)}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `:''}
          ${f0.scope ? `
            <div style="margin-top:14px">
              <h4 style="font-size:13px;color:var(--ink);margin:0 0 8px;font-weight:700">Broad Project Scope &amp; Boundaries</h4>
              <div style="background:var(--bg-subtle);border:1px solid var(--line);border-radius:9px;padding:12px 16px">
                <p class="portfolio-prose" style="white-space:pre-line;margin:0;font-size:12.5px">${esc(f0.scope)}</p>
              </div>
            </div>
          ` : dk.scopeIn ? `
            <div style="margin-top:14px">
              <h4 style="font-size:13px;color:var(--ink);margin:0 0 8px;font-weight:700">Broad Project Scope &amp; Boundaries</h4>
              <div class="req-grid" style="grid-template-columns:repeat(auto-fit, minmax(320px, 1fr))">
                <div class="req-card" style="border-left:3px solid var(--brand)">
                  <span class="req-tag" style="color:var(--brand);background:var(--brand-subtle)">Broadly In-Scope</span>
                  <ul style="margin:6px 0 0 16px;padding:0;font-size:12px;color:var(--ink-secondary);line-height:1.5">
                    ${dk.scopeIn.map(s=>`<li>${esc(s)}</li>`).join('')}
                  </ul>
                </div>
                <div class="req-card" style="border-left:3px solid var(--muted)">
                  <span class="req-tag" style="color:var(--muted);background:var(--bg-subtle)">Out-of-Scope (3-Credit Bound)</span>
                  <ul style="margin:6px 0 0 16px;padding:0;font-size:12px;color:var(--ink-secondary);line-height:1.5">
                    ${dk.scopeOut.map(s=>`<li>${esc(s)}</li>`).join('')}
                  </ul>
                </div>
              </div>
              ${dk.feasibilityNotes?`<p class="mini" style="margin-top:8px;color:var(--muted)"><b>Feasibility &amp; Hardware Constraints:</b> ${esc(dk.feasibilityNotes)}</p>`:''}
            </div>
          `:''}
        </article>

        <article class="portfolio-subblock" id="sec-objectives">
          <h3>${ICONS.check} Objectives</h3>
          <p class="portfolio-prose">${esc(f0.objectives || f1.objectives || dk.objectives)}</p>
          <div class="req-grid" style="margin-top:4px">
            <div class="req-card">
              <span class="req-tag">Measurable Target 1</span>
              <strong>Validation Accuracy &amp; Integrity</strong>
              <p>${esc(f1.success || dk.success1)}</p>
            </div>
            <div class="req-card">
              <span class="req-tag">Measurable Target 2</span>
              <strong>Operational Performance</strong>
              <p>${esc(dk.success2)}</p>
            </div>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-usecase">
          <h3>${ICONS.Overview} Use Case Diagram</h3>
          <div class="diagram-frame">
            ${(()=>{
              const customImg0=getStageImage(0);
              if(customImg0){
                return `<img data-media="${customImg0.id}" alt="${esc(customImg0.caption)}" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.06);background:#fff;display:block;margin:0 auto">
                <p class="diagram-caption">${esc(customImg0.caption||('Figure 0.1: Contextual Use Case Diagram for '+t.title))}</p>`;
              }
              if(dk.useCaseImg){
                return `<img src="${dk.useCaseImg}" alt="Use Case Diagram" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.06);background:#fff;display:block;margin:0 auto">
                <p class="diagram-caption">Figure 0.1: Formal Use Case Diagram for ${esc(t.title)} (Gate 0 / Gate 1 Source Document).</p>`;
              }
              return `<svg viewBox="0 0 740 320" xmlns="http://www.w3.org/2000/svg">
                <rect x="220" y="20" width="340" height="280" rx="14" fill="var(--surface)" stroke="var(--line-strong)" stroke-width="1.5" stroke-dasharray="4 4"/>
                <text x="240" y="44" font-size="12" font-weight="700" fill="var(--muted)">«System Boundary: ${esc(t.title)}»</text>
                <circle cx="80" cy="120" r="16" fill="var(--brand-subtle)" stroke="var(--brand)" stroke-width="2"/>
                <line x1="80" y1="136" x2="80" y2="180" stroke="var(--brand)" stroke-width="2"/>
                <line x1="60" y1="150" x2="100" y2="150" stroke="var(--brand)" stroke-width="2"/>
                <line x1="80" y1="180" x2="62" y2="215" stroke="var(--brand)" stroke-width="2"/>
                <line x1="80" y1="180" x2="98" y2="215" stroke="var(--brand)" stroke-width="2"/>
                <text x="80" y="235" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Primary Operator</text>
                <circle cx="660" cy="90" r="14" fill="var(--brand-subtle)" stroke="var(--brand)" stroke-width="2"/>
                <line x1="660" y1="104" x2="660" y2="140" stroke="var(--brand)" stroke-width="2"/>
                <line x1="644" y1="116" x2="676" y2="116" stroke="var(--brand)" stroke-width="2"/>
                <line x1="660" y1="140" x2="646" y2="170" stroke="var(--brand)" stroke-width="2"/>
                <line x1="660" y1="140" x2="674" y2="170" stroke="var(--brand)" stroke-width="2"/>
                <text x="660" y="190" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">Faculty Guide</text>
                <circle cx="660" cy="220" r="14" fill="var(--brand-subtle)" stroke="var(--brand)" stroke-width="2"/>
                <line x1="660" y1="234" x2="660" y2="265" stroke="var(--brand)" stroke-width="2"/>
                <line x1="644" y1="246" x2="676" y2="246" stroke="var(--brand)" stroke-width="2"/>
                <line x1="660" y1="265" x2="646" y2="295" stroke="var(--brand)" stroke-width="2"/>
                <line x1="660" y1="265" x2="674" y2="295" stroke="var(--brand)" stroke-width="2"/>
                <text x="660" y="312" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">Student Cohort</text>
                <g transform="translate(390, 75)"><ellipse cx="0" cy="0" rx="125" ry="19" fill="var(--bg-subtle)" stroke="var(--brand)" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">${esc(dk.uc1)}</text></g>
                <g transform="translate(390, 130)"><ellipse cx="0" cy="0" rx="125" ry="19" fill="var(--bg-subtle)" stroke="var(--brand)" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">${esc(dk.uc2)}</text></g>
                <g transform="translate(390, 185)"><ellipse cx="0" cy="0" rx="125" ry="19" fill="var(--bg-subtle)" stroke="var(--brand)" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">${esc(dk.uc3)}</text></g>
                <g transform="translate(390, 240)"><ellipse cx="0" cy="0" rx="125" ry="19" fill="var(--bg-subtle)" stroke="var(--brand)" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">${esc(dk.uc4)}</text></g>
                <line x1="100" y1="150" x2="270" y2="80" stroke="var(--line-strong)" stroke-width="1.2"/>
                <line x1="100" y1="150" x2="265" y2="130" stroke="var(--line-strong)" stroke-width="1.2"/>
                <line x1="100" y1="150" x2="270" y2="235" stroke="var(--line-strong)" stroke-width="1.2"/>
                <line x1="640" y1="120" x2="515" y2="85" stroke="var(--line-strong)" stroke-width="1.2"/>
                <line x1="640" y1="120" x2="515" y2="185" stroke="var(--line-strong)" stroke-width="1.2"/>
                <line x1="640" y1="245" x2="515" y2="240" stroke="var(--line-strong)" stroke-width="1.2"/>
              </svg>
              <p class="diagram-caption">Figure 0.1: Contextual Use Case Diagram for ${esc(t.title)}.</p>`;
            })()}
          </div>
          ${dk.ucList ? `
            <div style="margin-top:14px">
              <h4 style="font-size:13px;color:var(--ink);margin:0 0 8px;font-weight:700">Primary Actors &amp; Use Cases</h4>
              <p class="mini" style="margin-bottom:8px"><b>Primary Actor:</b> ${esc(dk.ucActor||'User (Data Analyst / End User)')}</p>
              <div class="req-grid" style="grid-template-columns:repeat(auto-fit, minmax(260px, 1fr))">
                ${dk.ucList.map((uc, i)=>`
                  <div class="req-card" style="padding:10px 14px">
                    <span class="req-tag">UC-0${i+1}</span>
                    <strong style="display:block;font-size:12px;color:var(--ink);margin-top:2px">${esc(uc)}</strong>
                  </div>
                `).join('')}
              </div>
            </div>
          `:''}
        </article>
      </section>

      <!-- STAGE 1: Requirement Engineering -->
      <section class="portfolio-section" id="stage-1">
        <div class="portfolio-section-title">
          <span class="portfolio-stage-badge">STAGE 1</span>
          <h2>Requirement Engineering</h2>
        </div>

        <article class="portfolio-subblock" id="sec-fr">
          <h3>${ICONS['Design Journey']} Functional Requirements</h3>
          ${f1.functional ? `
            <div style="background:var(--bg-subtle);border:1px solid var(--line);border-radius:10px;padding:16px;margin-top:6px">
              <p class="portfolio-prose" style="white-space:pre-line;margin:0;line-height:1.65;font-size:13px">${esc(f1.functional)}</p>
            </div>
          ` : dk.frList ? `
            <div class="tablewrap" style="margin-top:6px">
              <table class="test-suite-table">
                <thead>
                  <tr>
                    <th style="width:75px">FR ID</th>
                    <th>Requirement Description</th>
                    <th style="width:110px">Priority</th>
                    <th style="width:170px">Source Need (Gate 0)</th>
                  </tr>
                </thead>
                <tbody>
                  ${dk.frList.map(fr=>`
                    <tr>
                      <td><span class="req-tag">${esc(fr.id)}</span></td>
                      <td style="font-size:12.5px;color:var(--ink)">${esc(fr.desc)}</td>
                      <td><span class="tag ${fr.prio==='Mandatory'?'':'amber'}" style="font-size:11px">${esc(fr.prio)}</span></td>
                      <td style="font-size:11.5px;color:var(--muted)">${esc(fr.source)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <div class="req-grid">
              <div class="req-card"><span class="req-tag">FR-01</span><strong>Ingestion &amp; Parsing</strong><p>${esc(dk.fr1)}</p></div>
              <div class="req-card"><span class="req-tag">FR-02</span><strong>Core Algorithmic Engine</strong><p>${esc(dk.fr2)}</p></div>
              <div class="req-card"><span class="req-tag">FR-03</span><strong>Interactive Verification</strong><p>${esc(dk.fr3)}</p></div>
              <div class="req-card"><span class="req-tag">FR-04</span><strong>Multi-Format Reporting</strong><p>${esc(dk.fr4)}</p></div>
            </div>
          `}
        </article>

        <article class="portfolio-subblock" id="sec-nfr">
          <h3>${ICONS.lock} Non-Functional Requirements</h3>
          ${f1.nonfunctional ? `
            <div style="background:var(--bg-subtle);border:1px solid var(--line);border-radius:10px;padding:16px;margin-top:6px">
              <p class="portfolio-prose" style="white-space:pre-line;margin:0;line-height:1.65;font-size:13px">${esc(f1.nonfunctional)}</p>
            </div>
          ` : dk.nfrList ? `
            <div class="tablewrap" style="margin-top:6px">
              <table class="test-suite-table">
                <thead>
                  <tr>
                    <th style="width:85px">NFR ID</th>
                    <th>Requirement Description</th>
                    <th style="width:160px">Category</th>
                    <th style="width:230px">Measurable Target</th>
                  </tr>
                </thead>
                <tbody>
                  ${dk.nfrList.map(nfr=>`
                    <tr>
                      <td><span class="req-tag">${esc(nfr.id)}</span></td>
                      <td style="font-size:12.5px;color:var(--ink)">${esc(nfr.desc)}</td>
                      <td><span class="tag gray" style="font-size:11px">${esc(nfr.cat)}</span></td>
                      <td style="font-size:12px;color:var(--brand);font-weight:600">${esc(nfr.target)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <div class="req-grid">
              <div class="req-card"><span class="req-tag">NFR-01 · Latency</span><strong>Performance Target</strong><p>${esc(dk.nfr1)}</p></div>
              <div class="req-card"><span class="req-tag">NFR-02 · Integrity</span><strong>Accuracy &amp; Resilience</strong><p>${esc(dk.nfr2)}</p></div>
              <div class="req-card"><span class="req-tag">NFR-03 · Privacy</span><strong>Security &amp; Boundaries</strong><p>${esc(dk.nfr3)}</p></div>
              <div class="req-card"><span class="req-tag">NFR-04 · Usability</span><strong>Operational Efficiency</strong><p>${esc(dk.nfr4)}</p></div>
            </div>
          `}
        </article>

        <article class="portfolio-subblock" id="sec-arch">
          <h3>${ICONS['Admin Panel']} Architecture</h3>
          <p class="portfolio-prose">${esc(f1.architecture || f2.architecture || dk.archDesc)}</p>
          <div class="diagram-frame">
            ${(()=>{
              const customImg1=getStageImage(1);
              if(customImg1){
                return `<img data-media="${customImg1.id}" alt="${esc(customImg1.caption)}" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.06);background:#fff;display:block;margin:0 auto">
                <p class="diagram-caption">${esc(customImg1.caption||('Figure 1.1: System Architecture & Workflow Pipeline for '+t.title))}</p>`;
              }
              if(dk.archImg){
                return `<img src="${dk.archImg}" alt="Architecture Diagram" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.06);background:#fff;display:block;margin:0 auto">
                <p class="diagram-caption">Figure 1.1: 6-Phase Pipeline Architecture &amp; Dual Data Store for ${esc(t.title)} (Gate 0 / Gate 1 Source Document).</p>`;
              }
              return `<svg viewBox="0 0 740 190" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(15, 15)">
                  <rect width="155" height="155" rx="10" fill="var(--surface)" stroke="var(--brand)" stroke-width="1.5"/>
                  <rect width="155" height="32" rx="10" fill="var(--brand-subtle)"/>
                  <text x="77" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="var(--brand)">PRESENTATION</text>
                  <text x="77" y="60" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">Web Dashboard</text>
                  <text x="77" y="82" text-anchor="middle" font-size="11" fill="var(--muted)">Interactive Visualizer</text>
                  <text x="77" y="104" text-anchor="middle" font-size="11" fill="var(--muted)">SheetJS File Engine</text>
                  <text x="77" y="136" text-anchor="middle" font-size="10" font-weight="700" fill="var(--brand)">HTML5 / CSS / ES2022</text>
                </g>
                <line x1="175" y1="92" x2="200" y2="92" stroke="var(--brand)" stroke-width="2"/>
                <g transform="translate(205, 15)">
                  <rect width="155" height="155" rx="10" fill="var(--surface)" stroke="var(--line-strong)" stroke-width="1.5"/>
                  <rect width="155" height="32" rx="10" fill="var(--bg-subtle)"/>
                  <text x="77" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="var(--ink)">API GATEWAY</text>
                  <text x="77" y="60" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">REST Endpoints</text>
                  <text x="77" y="82" text-anchor="middle" font-size="11" fill="var(--muted)">Input Sanitizer</text>
                  <text x="77" y="104" text-anchor="middle" font-size="11" fill="var(--muted)">State Synchronizer</text>
                  <text x="77" y="136" text-anchor="middle" font-size="10" font-weight="700" fill="var(--muted)">FastAPI Router</text>
                </g>
                <line x1="365" y1="92" x2="390" y2="92" stroke="var(--brand)" stroke-width="2"/>
                <g transform="translate(395, 15)">
                  <rect width="155" height="155" rx="10" fill="var(--surface)" stroke="var(--brand)" stroke-width="1.5"/>
                  <rect width="155" height="32" rx="10" fill="var(--brand-subtle)"/>
                  <text x="77" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="var(--brand)">CORE ENGINE</text>
                  <text x="77" y="60" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">Specialized Model</text>
                  <text x="77" y="82" text-anchor="middle" font-size="11" fill="var(--muted)">Optimization / Inference</text>
                  <text x="77" y="104" text-anchor="middle" font-size="11" fill="var(--muted)">Validation Hooks</text>
                  <text x="77" y="136" text-anchor="middle" font-size="10" font-weight="700" fill="var(--brand)">Python 3.11</text>
                </g>
                <line x1="555" y1="92" x2="580" y2="92" stroke="var(--brand)" stroke-width="2"/>
                <g transform="translate(585, 15)">
                  <rect width="140" height="155" rx="10" fill="var(--surface)" stroke="var(--line-strong)" stroke-width="1.5"/>
                  <rect width="140" height="32" rx="10" fill="var(--bg-subtle)"/>
                  <text x="70" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="var(--ink)">STORAGE TIER</text>
                  <text x="70" y="60" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">Browser IndexedDB</text>
                  <text x="70" y="82" text-anchor="middle" font-size="11" fill="var(--muted)">LocalStorage State</text>
                  <text x="70" y="104" text-anchor="middle" font-size="11" fill="var(--muted)">GitHub Repository</text>
                  <text x="70" y="136" text-anchor="middle" font-size="10" font-weight="700" fill="var(--muted)">Local-First DB</text>
                </g>
              </svg>
              <p class="diagram-caption">Figure 1.1: Multi-Tier Modular Architecture for ${esc(t.title)}.</p>`;
            })()}
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-workflow">
          <h3>${ICONS['Faculty Admin']} System Workflow</h3>
          <div class="req-grid" style="grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px">
            ${dk.workflow.map((w,i)=>`
              <div class="req-card" style="text-align:left">
                <span class="req-tag">Phase 0${i+1}</span>
                <strong style="display:block;font-size:13px;color:var(--ink);margin:4px 0">${esc(w)}</strong>
                <p style="font-size:11.5px;color:var(--ink-secondary);line-height:1.45">${esc(dk.workflowDesc?.[i] || ('Pipeline Stage '+(i+1)))}</p>
              </div>
            `).join('')}
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-techstack">
          <h3>${ICONS.Discussion} Tech Stack</h3>
          <div class="techstack-container">
            <div class="techstack-group">
              <span class="techstack-group-title">Frontend &amp; UI Architecture</span>
              <div class="techstack-pills">
                <span class="tech-pill"><span class="tech-pill-dot"></span>HTML5 Semantic</span>
                <span class="tech-pill"><span class="tech-pill-dot"></span>Vanilla JavaScript ES2022</span>
                <span class="tech-pill"><span class="tech-pill-dot"></span>CSS3 Design Tokens</span>
                <span class="tech-pill"><span class="tech-pill-dot"></span>Chart.js &amp; SVG Visualizers</span>
              </div>
            </div>
            <div class="techstack-group">
              <span class="techstack-group-title">Core Engine &amp; Modeling</span>
              <div class="techstack-pills">
                ${dk.techGroup2.map(tech=>`<span class="tech-pill"><span class="tech-pill-dot" style="background:#10b981"></span>${esc(tech)}</span>`).join('')}
              </div>
            </div>
            <div class="techstack-group">
              <span class="techstack-group-title">Storage &amp; Persistence</span>
              <div class="techstack-pills">
                ${(dk.techStorage||['Browser IndexedDB (Media)','LocalStorage JSON State','Git & GitHub Versioning','UTF-8 CSV Roster Exporter']).map(tech=>`<span class="tech-pill"><span class="tech-pill-dot" style="background:#f59e0b"></span>${esc(tech)}</span>`).join('')}
              </div>
            </div>
            <div class="techstack-group">
              <span class="techstack-group-title">Reporting &amp; Verification</span>
              <div class="techstack-pills">
                ${(dk.techReporting||['Local Ollama Daemon','Qwen 3:4b / Mistral','Heuristic Submission Coach','Verifiable Citation Engine']).map(tech=>`<span class="tech-pill"><span class="tech-pill-dot" style="background:#8b5cf6"></span>${esc(tech)}</span>`).join('')}
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- STAGE 2: Implementation -->
      <section class="portfolio-section" id="stage-2">
        <div class="portfolio-section-title">
          <span class="portfolio-stage-badge">STAGE 2</span>
          <h2>Implementation</h2>
        </div>

        <article class="portfolio-subblock">
          <h3>${ICONS['Admin Panel']} Algorithmic Modeling &amp; Constraint Formulation</h3>
          <p class="portfolio-prose">${esc(f2.implementation || dk.implDesc)}</p>
          ${(()=>{
            const customImg2=getStageImage(2);
            if(customImg2){
              return `<div class="diagram-frame" style="margin-top:10px">
                <img data-media="${customImg2.id}" alt="${esc(customImg2.caption)}" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.06);background:#fff;display:block;margin:0 auto">
                <p class="diagram-caption">${esc(customImg2.caption||('Figure 2.1: Implementation Diagram for '+t.title))}</p>
              </div>`;
            }
            return '';
          })()}
          <div class="req-grid" style="margin-top:4px">
            <div class="req-card">
              <span class="req-tag">System Condition 1</span>
              <strong>${esc(dk.hard1Name)}</strong>
              <p>${esc(dk.hard1Desc)}</p>
            </div>
            <div class="req-card">
              <span class="req-tag">System Condition 2</span>
              <strong>${esc(dk.hard2Name)}</strong>
              <p>${esc(dk.hard2Desc)}</p>
            </div>
          </div>
          <div style="background:var(--bg-subtle);border:1px solid var(--line);border-radius:10px;padding:18px 20px;display:flex;justify-content:space-between;align-items:center;margin-top:10px">
            <div>
              <strong style="color:var(--ink);font-size:14px">Implementation Repository &amp; Commit History</strong>
              <p style="margin:2px 0 0;font-size:12px;color:var(--muted)">Source code, module implementations, and validation tests.</p>
            </div>
            <a class="btn" href="${repoUrl}" target="_blank" rel="noopener">Explore Code on GitHub ↗</a>
          </div>
        </article>
      </section>

      <!-- STAGE 3: Testing and Validations -->
      <section class="portfolio-section" id="stage-3">
        <div class="portfolio-section-title">
          <span class="portfolio-stage-badge">STAGE 3</span>
          <h2>Testing and Validations</h2>
        </div>

        <article class="portfolio-subblock">
          <h3>${ICONS.check} Automated Test Suite Matrix</h3>
          <p class="portfolio-prose">${esc(f3.testing || f2.testing || 'Unit testing and validation assertions executed against test splits and synthetic edge cases.')}</p>
          ${(()=>{
            const customImg3=getStageImage(3);
            if(customImg3){
              return `<div class="diagram-frame" style="margin-top:10px">
                <img data-media="${customImg3.id}" alt="${esc(customImg3.caption)}" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.06);background:#fff;display:block;margin:0 auto">
                <p class="diagram-caption">${esc(customImg3.caption||('Figure 3.1: Automated Validation Results & Performance Metrics for '+t.title))}</p>
              </div>`;
            }
            return '';
          })()}

          <div class="tablewrap" style="margin-top:8px">
            <table class="test-suite-table">
              <thead>
                <tr>
                  <th style="width:140px">Requirement / Test ID</th>
                  <th>Acceptance Criteria &amp; Scenario</th>
                  <th>Verification Method</th>
                  <th>Observed Result</th>
                  <th style="width:80px">Status</th>
                </tr>
              </thead>
              <tbody>
                ${(dk.testSuite || [
                  {req:'TC-01',criteria:dk.tc1Name,method:'Automated Test Input',obs:dk.tc1Obs},
                  {req:'TC-02',criteria:dk.tc2Name,method:'Boundary Check',obs:dk.tc2Obs},
                  {req:'TC-03',criteria:dk.tc3Name,method:'Stress Benchmark',obs:dk.tc3Obs},
                  {req:'TC-04',criteria:dk.tc4Name,method:'Audit Check',obs:dk.tc4Obs}
                ]).map(tc=>`
                  <tr>
                    <td><strong>${esc(tc.req)}</strong></td>
                    <td style="font-size:12px;color:var(--ink)">${esc(tc.criteria)}</td>
                    <td style="font-size:11.5px;color:var(--muted)">${esc(tc.method)}</td>
                    <td style="font-size:12px;color:var(--ink-secondary)">${esc(tc.obs)}</td>
                    <td><span class="badge-pass">PASSED</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="margin-top:16px">
            <h4 style="font-size:14px;font-weight:700;color:var(--ink);margin:0 0 10px">Measured Evaluation Metrics</h4>
            <div class="req-grid" style="grid-template-columns:repeat(4,1fr);gap:12px">
              <div class="req-card" style="text-align:center"><span class="req-tag" style="margin:0 auto">${esc(dk.metric1Lbl)}</span><strong style="font-size:18px;color:var(--brand)">${esc(dk.metric1Val)}</strong><p>Primary Quality Benchmark</p></div>
              <div class="req-card" style="text-align:center"><span class="req-tag" style="margin:0 auto">${esc(dk.metric2Lbl)}</span><strong style="font-size:18px;color:var(--success)">${esc(dk.metric2Val)}</strong><p>Measured Runtime Target</p></div>
              <div class="req-card" style="text-align:center"><span class="req-tag" style="margin:0 auto">${esc(dk.metric3Lbl)}</span><strong style="font-size:18px;color:var(--brand)">${esc(dk.metric3Val)}</strong><p>Integrity Metric</p></div>
              <div class="req-card" style="text-align:center"><span class="req-tag" style="margin:0 auto">${esc(dk.metric4Lbl)}</span><strong style="font-size:18px;color:var(--success)">${esc(dk.metric4Val)}</strong><p>Reliability Verification</p></div>
            </div>
          </div>
        </article>
      </section>

    </main>

    <!-- Sticky Right Navigation Rail -->
    <aside class="portfolio-nav-rail" aria-label="Portfolio sections navigation">
      <div class="portfolio-nav-rail-head">
        <h3>Portfolio Index</h3>
        <span class="tag gray" style="font-size:10px">One-Page</span>
      </div>
      <nav class="portfolio-nav-list">
        <div class="portfolio-nav-group">
          <button class="portfolio-nav-item" onclick="document.getElementById('stage-0').scrollIntoView({behavior:'smooth'})">
            1. Stage 0 : Problem identification
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-problem').scrollIntoView({behavior:'smooth'})">
            • Problem Statement
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-objectives').scrollIntoView({behavior:'smooth'})">
            • Objectives
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-usecase').scrollIntoView({behavior:'smooth'})">
            • Use Case Diagram
          </button>
        </div>

        <div class="portfolio-nav-group">
          <button class="portfolio-nav-item" onclick="document.getElementById('stage-1').scrollIntoView({behavior:'smooth'})">
            2. Stage 1 : Requirement Engineering
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-fr').scrollIntoView({behavior:'smooth'})">
            • Functional Requirements
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-nfr').scrollIntoView({behavior:'smooth'})">
            • Non Functional requirements
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-arch').scrollIntoView({behavior:'smooth'})">
            • Architecture
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-workflow').scrollIntoView({behavior:'smooth'})">
            • System Workflow
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-techstack').scrollIntoView({behavior:'smooth'})">
            • Tech Stack
          </button>
        </div>

        <div class="portfolio-nav-group">
          <button class="portfolio-nav-item" onclick="document.getElementById('stage-2').scrollIntoView({behavior:'smooth'})">
            3. Stage 2 : Implementation
          </button>
        </div>

        <div class="portfolio-nav-group">
          <button class="portfolio-nav-item" onclick="document.getElementById('stage-3').scrollIntoView({behavior:'smooth'})">
            4. Stage 3 : Testing and Validations
          </button>
        </div>
      </nav>
      <button class="textbtn" style="margin-top:6px;justify-content:center" onclick="window.scrollTo({top:0,behavior:'smooth'})">
        ↑ Back to top
      </button>
    </aside>
  </div>
</div>
`;};

function openTeamPortfolio(id){
  switchTeam(id);
  go('Team Portfolio');
}

function hodProjectRows(filter){
  const term=(filter||'').toLowerCase();
  const filtered=state.teams.filter(t=>
    (t.topic||'').toLowerCase().includes(term)||
    (t.title||'').toLowerCase().includes(term)||
    (t.id||'').toLowerCase().includes(term)||
    (t.faculty||'').toLowerCase().includes(term)||
    t.members.some(m=>(m.name+' '+m.usn).toLowerCase().includes(term))
  );

  if(!filtered.length){
    return '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">No matching projects found.</td></tr>';
  }

  return filtered.map(t=>`
    <tr>
      <td>
        <span class="portfolio-theme-pill" style="font-size:11px;padding:3px 9px;color:var(--brand);background:var(--brand-subtle);border-color:var(--brand-light)">
          ${esc(t.topic)}
        </span>
      </td>
      <td>
        <strong style="color:var(--ink);font-size:13.5px;display:block;line-height:1.4">${esc(t.title)}</strong>
      </td>
      <td>
        <span class="req-tag">Team ${esc(t.id)}</span>
      </td>
      <td>
        <div style="display:flex;flex-direction:column;gap:3px">
          ${t.members.map((m,i)=>`
            <div style="font-size:12px;color:var(--ink);line-height:1.35">
              <strong>${esc(m.name)}</strong> <small style="color:var(--muted)">(${esc(m.usn)})</small>
            </div>
          `).join('')}
        </div>
      </td>
      <td>
        <strong style="font-size:13px;color:var(--ink)">${esc(t.faculty)}</strong>
        <span class="mini" style="display:block">Faculty Guide</span>
      </td>
      <td style="text-align:center">
        <button class="btn" style="padding:7px 14px;font-size:12px;white-space:nowrap" onclick="openTeamPortfolio('${esc(t.id)}')">
          Project Portfolio →
        </button>
      </td>
    </tr>
  `).join('');
}

function filterHODProjects(q){
  const tbody=document.getElementById('hod-project-rows');
  if(tbody)tbody.innerHTML=hodProjectRows(q);
}

function downloadHODProjectCSVTemplate(){
  const headers=['Theme','Project Title','Team No','Member 1 Name','Member 1 USN','Member 2 Name','Member 2 USN','Member 3 Name','Member 3 USN','Member 4 Name','Member 4 USN','Guide Name'];
  const rows=state.teams.map(t=>[
    t.topic,
    t.title,
    t.id,
    t.members[0]?.name||'',t.members[0]?.usn||'',
    t.members[1]?.name||'',t.members[1]?.usn||'',
    t.members[2]?.name||'',t.members[2]?.usn||'',
    t.members[3]?.name||'',t.members[3]?.usn||'',
    t.faculty
  ]);
  const csv=[headers,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));
  const a=document.createElement('a');
  a.href=url;a.download='CS-AI-Project-List.csv';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

async function importHODProjectCSV(input){
  const file=input.files?.[0];
  if(!file)return;
  try{
    const text=await file.text();
    const lines=text.split(/\r?\n/).filter(line=>line.trim());
    if(lines.length<2)return toast('CSV file is empty or missing headers.');
    
    const parseCSVRow=(r)=>{
      let inQuote=false,cur='',res=[];
      for(let i=0;i<r.length;i++){
        const c=r[i];
        if(c==='"'){inQuote=!inQuote;}
        else if(c===','&&!inQuote){res.push(cur.trim());cur='';}
        else{cur+=c;}
      }
      res.push(cur.trim());
      return res.map(v=>v.replace(/^"|"$/g,'').trim());
    };

    const headers=parseCSVRow(lines[0]).map(normalHeader);
    const themeIdx=headers.findIndex(h=>/theme|topic/i.test(h));
    const titleIdx=headers.findIndex(h=>/title|project/i.test(h));
    const teamIdx=headers.findIndex(h=>/team/i.test(h));
    const guideIdx=headers.findIndex(h=>/guide|faculty/i.test(h));
    
    let count=0;
    for(let i=1;i<lines.length;i++){
      const cols=parseCSVRow(lines[i]);
      if(cols.length<4||!cols.some(Boolean))continue;
      
      const topic=(themeIdx>=0?cols[themeIdx]:cols[0])||'Specialization Theme';
      const title=(titleIdx>=0?cols[titleIdx]:cols[1])||'Project Title';
      let id=(teamIdx>=0?cols[teamIdx]:cols[2])||String(i).padStart(2,'0');
      id=id.replace(/^team[\s-]*/i,'').trim();
      if(/^\d+$/.test(id))id=id.padStart(2,'0');
      const faculty=(guideIdx>=0?cols[guideIdx]:cols[11])||'Amit K';
      
      const m1Name=cols[3]||'Member 1',m1Usn=cols[4]||'USN1';
      const m2Name=cols[5]||'Member 2',m2Usn=cols[6]||'USN2';
      const m3Name=cols[7]||'Member 3',m3Usn=cols[8]||'USN3';
      const m4Name=cols[9]||'Member 4',m4Usn=cols[10]||'USN4';
      
      const members=[
        {name:m1Name,usn:m1Usn.toUpperCase()},
        {name:m2Name,usn:m2Usn.toUpperCase()},
        {name:m3Name,usn:m3Usn.toUpperCase()},
        {name:m4Name,usn:m4Usn.toUpperCase()}
      ];
      
      let existing=state.teams.find(t=>t.id.toLowerCase()===id.toLowerCase());
      if(existing){
        existing.topic=topic;
        existing.title=title;
        existing.faculty=faculty;
        existing.members=members;
      }else{
        const newTeam={
          id,
          department:'CS AI',
          hod:state.department?.hod||'CS AI HOD',
          facultyAdmin:state.department?.facultyAdmin||'CS AI Faculty Admin',
          faculty,
          topic,
          title,
          members,
          sample:false
        };
        state.teams.push(newTeam);
        state.workspaces[id]=newTeamWorkspace(newTeam);
      }
      count++;
    }
    save();
    render();
    toast(`✓ Successfully imported ${count} projects into the HOD Project List.`);
  }catch(err){
    toast('Error reading CSV: '+err.message);
  }finally{
    input.value='';
  }
}

function department(){
  const all=state.teams;
  const uniqueThemes=[...new Set(all.map(t=>t.topic))].filter(Boolean);
  const facultyList=facultyNames();

  return heading('HOD Academic Dashboard','Department of Computer Science & AI · Academic Year 2026–27')+`
    <!-- Top 3 Stat Cards: No. of teams, No. of faculty mentors, No. of themes -->
    <div class="stats" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
      <div class="stat">
        <div class="stat-top">No. of Teams ${ICONS.users}</div>
        <strong style="color:var(--brand)">${String(all.length).padStart(2,'0')}</strong>
        <small>Enrolled student project teams</small>
      </div>
      <div class="stat">
        <div class="stat-top">No. of Faculty Mentors ${ICONS['Faculty Review']}</div>
        <strong style="color:var(--brand)">${String(facultyList.length).padStart(2,'0')}</strong>
        <small>CS AI faculty guide directory</small>
      </div>
      <div class="stat">
        <div class="stat-top">No. of Themes ${ICONS['Design Journey']}</div>
        <strong style="color:var(--brand)">${String(uniqueThemes.length).padStart(2,'0')}</strong>
        <small>Active specialization &amp; research domains</small>
      </div>
    </div>

    <!-- DEMO_CASES -->

    <!-- Project List in Tabular Form with CSV Input -->
    <section class="card">
      <div class="card-head" style="flex-wrap:wrap;gap:14px">
        <div>
          <h2>Department Project List</h2>
          <p>Grouped by Specialization Themes (3 Project Titles per Theme) · Direct Portfolio Redirection</p>
        </div>
        <div class="actions" style="margin:0">
          <label class="btn" for="hod-csv-input" style="cursor:pointer">
            📥 Import Project List (CSV)
          </label>
          <input id="hod-csv-input" type="file" accept=".csv" style="display:none" onchange="importHODProjectCSV(this)">
          <button class="btn secondary" onclick="downloadHODProjectCSVTemplate()">↓ Download CSV Template</button>
        </div>
      </div>

      <div style="margin: 14px 0 16px;">
        <label for="hod-project-search" style="margin:0 0 6px">Search Projects</label>
        <input id="hod-project-search" placeholder="Search by Theme, Project Title, Team No., Guide, or Student USN..." oninput="filterHODProjects(this.value)">
      </div>

      <div class="tablewrap">
        <table class="roster" id="hod-projects-table">
          <thead>
            <tr>
              <th style="width:190px">Theme</th>
              <th>Project Title</th>
              <th style="width:90px">Team No.</th>
              <th>Team Members (Four)</th>
              <th style="width:160px">Guide Name</th>
              <th style="width:160px;text-align:center">Project Portfolio</th>
            </tr>
          </thead>
          <tbody id="hod-project-rows">
            ${hodProjectRows('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}
function openRosterTeam(id){openTeamPortfolio(id)}
function saveTeamDetails(){if(!isAdmin())return;const topic=$('#team-topic')?.value?.trim()||activeTeam().topic;state.repo=$('#repo')?.value?.trim()||state.repo;activeTeam().topic=topic;save();toast('Project details saved.');}
function teamStatus(t){return t.id===state.activeTeamId?state:state.workspaces[t.id]||{status1:'Draft',status2:'Locked'}}
function facultyCards(){return facultyNames().map(name=>{const teams=state.teams.filter(t=>t.faculty===name);return `<div class="faculty-card">${avatar({name})}<div><h3>${esc(name)}</h3><p class="mini">Faculty guide · CS AI · ${teams.length} team${teams.length===1?'':'s'}</p><p class="mini">${teams.map(t=>'Team '+esc(t.id)).join(' · ')||'No teams assigned'}</p></div></div>`}).join('')}
function allocationForm(){return `<section class="card"><h2>Team guide allocation</h2><p>Faculty Admin coordinates guide assignments under the CS AI HOD.</p><label for="allocate-team">Team</label><select id="allocate-team">${state.teams.map(t=>`<option value="${esc(t.id)}">Team ${esc(t.id)} · ${esc(t.title)}</option>`).join('')}</select><label for="allocate-guide">Faculty guide</label><select id="allocate-guide">${facultyNames().map(n=>`<option>${esc(n)}</option>`).join('')}</select><button class="btn" style="margin-top:16px" onclick="allocateGuide()">Save allocation</button></section>`}
function facultyAdminPanel(){return heading('Coordinate faculty. Support every team.','CS AI Faculty Admin · under '+esc(state.department.hod))+`<div class="grid"><div>${allocationForm()}<section class="card"><h2>Faculty directory</h2>${facultyCards()}</section></div><section class="card"><h2>Department ownership</h2><p><strong>Department:</strong> CS AI</p><p><strong>HOD:</strong> ${esc(state.department.hod)}</p><p><strong>Faculty Admin:</strong> ${esc(state.department.facultyAdmin)}</p><div class="notice">Faculty Admin manages guide allocations. The assigned Faculty guide reviews and approves submissions. Admin imports the complete Excel roster.</div><button class="btn secondary" onclick="go('Department')">View all CS AI teams →</button></section></div>`}
function allocateGuide(){if(!['Admin','Faculty Admin'].includes(state.role))return;const t=state.teams.find(t=>t.id===$('#allocate-team').value),name=$('#allocate-guide').value;if(!t||!facultyNames().includes(name))return;save();t.faculty=name;if(t.id===state.activeTeamId)state.guide=name;if(state.workspaces[t.id])state.workspaces[t.id].guide=name;save();render();toast('CS AI guide allocation saved.')}
let importPreview=null;
function adminPanel(){return heading('CS AI · Administration','Import the department roster, assign guides and manage department ownership.',`<span class="tag">ADMIN PANEL</span>`)+`<div class="grid"><div><section class="card"><h2>Import complete Excel roster</h2><p>One row per team, with four member names and USNs, faculty, topic and project title.</p><div class="actions"><a class="btn secondary" href="CS-AI-Roster-Template.xlsx" download>↓ Excel template with dummy teams</a><button class="btn secondary" onclick="exportRoster()">Export current roster (CSV)</button></div><label for="roster-file">Excel / CSV file</label><input id="roster-file" type="file" accept=".xlsx,.xls,.csv"><p class="mini">Files stay in this browser. Up to 10 MB and 2,000 team rows. Macros and formulas are never executed.</p><button class="btn" onclick="readRosterFile()">Read & validate file →</button><div id="import-result" role="status">${importPreview?previewHTML():''}</div><details style="margin-top:18px"><summary>Required columns and import rules</summary><p class="mini">Team ID, Faculty Name, Topic, Project Title, Member 1 Name, Member 1 USN … Member 4 Name, Member 4 USN. Member 1 is Team Lead. Department, HOD and Faculty Admin are optional columns; blank values use the current CS AI settings. Non-CS-AI departments are rejected. Only sheets with recognized team columns are read. Existing Team IDs are updated; new IDs are added. Other teams and their saved work are preserved.</p></details></section>${allocationForm()}</div><div><section class="card"><h2>One department. One HOD.</h2><label for="department-name">Department</label><input id="department-name" value="CS AI" disabled><label for="hod-name">CS AI HOD name</label><input id="hod-name" value="${esc(state.department.hod)}"><label for="faculty-admin-name">Faculty Admin name</label><input id="faculty-admin-name" value="${esc(state.department.facultyAdmin)}"><button class="btn secondary" style="margin-top:16px" onclick="saveDepartmentOwner()">Save department ownership</button><p class="mini">HOD and Faculty Admin names are placeholders until you enter the real names or import them.</p></section><section class="card"><h2>Faculty directory</h2>${facultyCards()}</section><section class="card"><h2>Department records</h2><p>${state.teams.length} teams · ${state.teams.length*4} students · CS AI</p><button class="btn secondary" onclick="go('Department')">Open complete roster →</button></section></div></div>`}
function saveDepartmentOwner(){if(state.role!=='Admin')return;const hod=$('#hod-name').value.trim(),facultyAdmin=$('#faculty-admin-name').value.trim();if(!hod||!facultyAdmin)return toast('Enter both the HOD and Faculty Admin names.');state.department={name:'CS AI',hod,facultyAdmin};state.teams.forEach(t=>{t.hod=hod;t.facultyAdmin=facultyAdmin});save();render();toast('All CS AI teams now report to the saved department owners.')}
const normalHeader=s=>String(s??'').toLowerCase().replace(/[^a-z0-9]/g,'');
function headerKey(label){const k=normalHeader(label),aliases={teamid:'id',teamno:'id',teamnumber:'id',team:'id',department:'department',dept:'department',hod:'hod',hodname:'hod',facultyadmin:'facultyAdmin',facultyadminname:'facultyAdmin',facultyadministrator:'facultyAdmin',facultyname:'faculty',faculty:'faculty',guide:'faculty',guidename:'faculty',facultyguide:'faculty',topic:'topic',theme:'topic',projecttopic:'topic',projecttitle:'title',title:'title',projectname:'title'};if(aliases[k])return aliases[k];const m=k.match(/^(?:member|student|teammember)([1-4])(name|usn)$/)||k.match(/^(name|usn)([1-4])$/);if(m)return /^\d$/.test(m[1])?'member'+m[1]+m[2]:'member'+m[2]+m[1];return null}
const isCSAI=s=>['csai','computerscienceai','computerscienceandartificialintelligence','computerscienceartificialintelligence','cseai','csaidepartment'].includes(normalHeader(s));
function parseRoster(workbook){
 const errors=[],teams=[],skipped=[];let found=false;
 for(const name of workbook.SheetNames){const sheet=workbook.Sheets[name];if(sheet['!ref']){const r=XLSX.utils.decode_range(sheet['!ref']);if(r.e.r>10000||r.e.c>200){errors.push(`Sheet ${name}: too large; limit 10,001 worksheet rows and 201 columns.`);continue}}
 const rows=XLSX.utils.sheet_to_json(sheet,{header:1,defval:'',raw:false,blankrows:true});let head=-1,keys=[];
 for(let i=0;i<Math.min(rows.length,30);i++){const candidate=rows[i].map(headerKey);if(candidate.includes('id')&&candidate.includes('title')){head=i;keys=candidate;break}}
 if(head<0){skipped.push(name);continue}found=true;
 const needed=['id','faculty','topic','title',...Array.from({length:4},(_,i)=>['member'+(i+1)+'name','member'+(i+1)+'usn']).flat()];const missing=needed.filter(k=>!keys.includes(k));if(missing.length){errors.push(`Sheet ${name}: missing columns ${missing.join(', ')}.`);continue}
 const duplicateKeys=keys.filter((k,i)=>k&&keys.indexOf(k)!==i);if(duplicateKeys.length){errors.push(`Sheet ${name}: duplicate recognized column(s): ${[...new Set(duplicateKeys)].join(', ')}.`);continue}
 for(let i=head+1;i<rows.length;i++){const row=rows[i];if(!row.some(v=>String(v).trim()))continue;const obj={};keys.forEach((key,j)=>{if(key)obj[key]=String(row[j]??'').trim()});if(!Object.values(obj).some(v=>v.trim()))continue;const at=`${name}, row ${i+1}`;if(needed.some(k=>!obj[k])){errors.push(`${at}: complete all four names/USNs, team ID, faculty, topic and title.`);continue}if(obj.department&&!isCSAI(obj.department)){errors.push(`${at}: department must be CS AI.`);continue}let id=obj.id.replace(/^team[\s-]*/i,'').trim();if(/^\d+$/.test(id))id=String(Number(id)).padStart(2,'0');if(!/^[A-Za-z0-9_-]{1,30}$/.test(id)){errors.push(`${at}: Team ID must contain only letters, digits, hyphens or underscores (max 30).`);continue}const team={id,department:'CS AI',hod:obj.hod||state.department.hod,facultyAdmin:obj.facultyAdmin||state.department.facultyAdmin,faculty:obj.faculty,topic:obj.topic,title:obj.title,members:Array.from({length:4},(_,j)=>({name:obj['member'+(j+1)+'name'],usn:obj['member'+(j+1)+'usn'].toUpperCase()})),sample:false,source:at};if(Object.values(obj).some(v=>v.length>3000)){errors.push(`${at}: one or more fields exceed 3,000 characters.`);continue}team.sample=team.members.every(m=>m.usn.startsWith('DEMO-'));teams.push(team)}
 }
 if(!found)errors.push('No team sheet found. Use the downloadable template with Team ID and Project Title headers.');if(teams.length>2000)errors.push('Maximum 2,000 teams per import.');
 const ids=new Set();teams.forEach(t=>{const key=t.id.toLowerCase();if(ids.has(key))errors.push(`${t.source}: duplicate Team ID ${t.id}.`);ids.add(key)});
 const incomingIds=new Set(teams.map(t=>t.id.toLowerCase())),merged=[...state.teams.filter(t=>!incomingIds.has(t.id.toLowerCase())),...teams],usns=new Map();merged.forEach(t=>t.members.forEach(m=>{const key=m.usn.toUpperCase();if(usns.has(key))errors.push(`Duplicate USN ${m.usn}: teams ${usns.get(key)} and ${t.id}.`);else usns.set(key,t.id)}));
 const hods=[...new Set(teams.map(t=>t.hod))],admins=[...new Set(teams.map(t=>t.facultyAdmin))];if(hods.length>1)errors.push('All rows must have the same CS AI HOD.');if(admins.length>1)errors.push('All rows must have the same CS AI Faculty Admin.');
 if(!teams.length&&!errors.length)errors.push('No populated team records found.');return {teams,errors,skipped,hod:hods[0],facultyAdmin:admins[0]};
}
async function readRosterFile(){if(state.role!=='Admin')return;const file=$('#roster-file').files[0];if(!file)return toast('Choose an Excel or CSV file first.');if(!/\.(xlsx|xls|csv)$/i.test(file.name)||file.size>10*1024*1024)return toast('Choose .xlsx, .xls or .csv under 10 MB.');try{if(typeof XLSX==='undefined')throw Error('Excel library unavailable. Reload the page.');const wb=XLSX.read(await file.arrayBuffer(),{type:'array',cellFormula:false,cellHTML:false,cellStyles:false,bookVBA:false});importPreview=parseRoster(wb);importPreview.filename=file.name;$('#import-result').innerHTML=previewHTML()}catch(e){importPreview=null;$('#import-result').textContent='Could not read this file: '+e.message}}
function previewHTML(){if(!importPreview)return '';const p=importPreview;return `<div class="notice" style="margin-top:18px"><strong>${esc(p.filename||'Workbook')} · ${p.teams.length} team rows · ${p.errors.length} validation errors</strong><p class="mini">${p.skipped.length?'Skipped sheets without team headers: '+esc(p.skipped.join(', ')):''}</p>${p.errors.length?`<ul>${p.errors.slice(0,30).map(e=>`<li>${esc(e)}</li>`).join('')}</ul>${p.errors.length>30?'<p>Only the first 30 errors are shown.</p>':''}<p>No changes saved. Correct the file and read it again.</p>`:`<p>Ready to add ${p.teams.filter(t=>!state.teams.some(x=>x.id.toLowerCase()===t.id.toLowerCase())).length} teams and update ${p.teams.filter(t=>state.teams.some(x=>x.id.toLowerCase()===t.id.toLowerCase())).length} existing teams. Department: CS AI · HOD: ${esc(p.hod)} · Faculty Admin: ${esc(p.facultyAdmin)}</p><div class="tablewrap"><table><thead><tr><th>Team</th><th>Faculty</th><th>Project title / Topic</th><th>Four members / USN</th></tr></thead><tbody>${p.teams.slice(0,10).map(t=>`<tr><td>${esc(t.id)}</td><td>${esc(t.faculty)}</td><td>${esc(t.title)}<p class="mini">${esc(t.topic)}</p></td><td>${t.members.map(m=>esc(m.name)+' · '+esc(m.usn)).join('<br>')}</td></tr>`).join('')}</tbody></table></div>${p.teams.length>10?'<p>Preview shows the first 10 teams; all validated records will import.</p>':''}<button class="btn" onclick="commitRosterImport()">Import ${p.teams.length} validated teams</button>`}</div>`}
function commitRosterImport(){if(state.role!=='Admin'||!importPreview||importPreview.errors.length)return;syncTeam();const backup=clone(state);try{const p=importPreview;state.department={name:'CS AI',hod:p.hod,facultyAdmin:p.facultyAdmin};p.teams.forEach(incoming=>{const old=state.teams.find(t=>t.id.toLowerCase()===incoming.id.toLowerCase()),t=clone(incoming);delete t.source;if(old){t.id=old.id;const w=state.workspaces[old.id];if(w){w.members=t.members.map((m,i)=>({...w.members[i],...m}));w.guide=t.faculty;w.forms[1].title=t.title}Object.assign(old,t)}else{state.teams.push(t);state.workspaces[t.id]=newTeamWorkspace(t)}});state.teams.forEach(t=>{t.hod=p.hod;t.facultyAdmin=p.facultyAdmin});const active=state.teams.find(t=>t.id===state.activeTeamId),w=state.workspaces[active.id];workspaceKeys.forEach(k=>delete state[k]);Object.assign(state,clone(w));state.guide=active.faculty;state.members=state.members.map((m,i)=>({...m,...active.members[i]}));state.forms[1].title=active.title;if(!save()){state=backup;return}const count=p.teams.length;importPreview=null;render();toast(`Imported ${count} teams. CS AI roster saved in this browser.`)}catch(e){state=backup;toast('Import was not saved: '+e.message)}}
function rosterMatrix(){const h=['Department','HOD','Faculty Admin','Team ID','Faculty Name','Topic','Project Title',...Array.from({length:4},(_,i)=>['Member '+(i+1)+' Name','Member '+(i+1)+' USN']).flat()];return [h,...state.teams.map(t=>['CS AI',state.department.hod,state.department.facultyAdmin,t.id,t.faculty,t.topic,t.title,...t.members.flatMap(m=>[m.name,m.usn])])]}
function exportRoster(){if(!['Admin','Faculty Admin'].includes(state.role))return;save();const matrix=rosterMatrix(),csv=matrix.map(r=>r.map(v=>'"'+String(v).replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"').join(',')).join('\r\n'),url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='CS-AI-Complete-Roster.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
save();render();
