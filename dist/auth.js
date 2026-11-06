/**
 * ProjectGate AI - Authentication & RBAC System (Student, Faculty, HOD)
 * Manages user registration, login sessions, and role permissions.
 */

(function(root){
  const SESSION_KEY = 'pg_auth_session';
  const USERS_KEY = 'pg_registered_users';

  // Pre-seeded university directory accounts
  const DEFAULT_USERS = [
    {
      id: 'usr_hod_01',
      identifier: 'EMP_HOD_01',
      email: 'hod.cseai@kletech.ac.in',
      name: 'Dr. Narayan D G',
      role: 'HOD',
      password: 'password123',
      department: 'Department of CSE(AI)'
    },
    {
      id: 'usr_fac_01',
      identifier: 'EMP_FAC_01',
      email: 'amit.k@kletech.ac.in',
      name: 'Mr. Amit Kachavimath',
      role: 'Faculty',
      password: 'password123',
      department: 'Department of CSE(AI)'
    },
    {
      id: 'usr_fac_02',
      identifier: 'EMP_FAC_02',
      email: 'jyothi.p@kletech.ac.in',
      name: 'Ms. Jyothi Patil',
      role: 'Faculty',
      password: 'password123',
      department: 'Department of CSE(AI)'
    },
    {
      id: 'usr_stu_01',
      identifier: '01FE24BCI028',
      email: 'vedant.k@kletech.ac.in',
      name: 'Vedant Khot',
      role: 'Student',
      teamId: 'A-03',
      password: 'password123',
      department: 'Department of CSE(AI)'
    },
    {
      id: 'usr_stu_02',
      identifier: '01FE24BCI044',
      email: 'bhoomi.b@kletech.ac.in',
      name: 'Bhoomi Bankapur',
      role: 'Student',
      teamId: 'A-01',
      password: 'password123',
      department: 'Department of CSE(AI)'
    },
    {
      id: 'usr_stu_03',
      identifier: '01FE24BCI029',
      email: 'nupur.b@kletech.ac.in',
      name: 'Nupur Bagave',
      role: 'Student',
      teamId: 'A-03',
      password: 'password123',
      department: 'Department of CSE(AI)'
    }
  ];

  function getStoredUsers(){
    try {
      const stored = localStorage.getItem(USERS_KEY);
      if(stored) return JSON.parse(stored);
    } catch(e) {}
    return DEFAULT_USERS.slice();
  }

  function saveStoredUsers(users){
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch(e) {}
  }

  function getAuthSession(){
    try {
      const s = localStorage.getItem(SESSION_KEY);
      if(s) return JSON.parse(s);
    } catch(e) {}
    return null;
  }

  function setAuthSession(user){
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch(e) {}
  }

  function clearAuthSession(){
    try {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    } catch(e) {}
  }

  // Always reset to login screen on initial page load / refresh:
  // "after refreshing i should get the login page...then student/faculty/hod dashboard"
  clearAuthSession();
  try { sessionStorage.removeItem('pg_current_page'); } catch(e){}

  // Active UI state for auth screens
  let authMode = 'login'; // 'login' | 'register'
  let authRoleTab = 'Student'; // 'Student' | 'Faculty' | 'HOD'
  let authErrorMsg = '';

  root.isUserAuthenticated = function(){
    return !!getAuthSession();
  };

  root.getAuthUser = function(){
    return getAuthSession();
  };

  root.signOutUser = function(){
    clearAuthSession();
    try { sessionStorage.removeItem('pg_current_page'); } catch(e){}
    authErrorMsg = '';
    authMode = 'login';
    if(typeof state !== 'undefined'){
      state.currentUser = null;
    }
    if(typeof toast === 'function') toast('Signed out successfully.');
    if(typeof render === 'function') render();
  };

  function clearAuthInputs(){
    const inputs = document.querySelectorAll('#login-username, #login-password, #reg-name, #reg-id, #reg-email, #reg-password, #reg-confirm, input[id^="login-"], input[id^="reg-"]');
    inputs.forEach(inp => {
      inp.value = '';
    });
  }

  root.switchAuthMode = function(mode){
    authMode = mode;
    authErrorMsg = '';
    if(typeof render === 'function') render();
    clearAuthInputs();
    setTimeout(clearAuthInputs, 20);
    setTimeout(clearAuthInputs, 80);
  };

  root.switchAuthRoleTab = function(role){
    authRoleTab = role;
    authErrorMsg = '';
    if(typeof render === 'function') render();
    clearAuthInputs();
    setTimeout(clearAuthInputs, 20);
    setTimeout(clearAuthInputs, 80);
  };

  root.quickDemoLogin = function(role, identifier){
    const users = getStoredUsers();
    let target = null;
    if(role === 'Student'){
      target = users.find(u => u.role === 'Student' && (u.teamId === identifier || u.identifier === identifier)) || users.find(u => u.role === 'Student');
    } else if(role === 'Faculty'){
      target = users.find(u => u.role === 'Faculty' && (u.name.includes(identifier) || u.identifier === identifier)) || users.find(u => u.role === 'Faculty');
    } else if(role === 'HOD'){
      target = users.find(u => u.role === 'HOD') || DEFAULT_USERS[0];
    }

    if(target){
      applyUserLogin(target);
    }
  };

  root.handleAuthLogin = function(e){
    if(e && e.preventDefault) e.preventDefault();
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const username = (usernameInput && usernameInput.value || '').trim();
    const password = (passwordInput && passwordInput.value || '').trim();

    if(!username || !password){
      authErrorMsg = 'Please enter both your identifier/email and password.';
      if(typeof render === 'function') render();
      return;
    }

    const users = getStoredUsers();
    const matched = users.find(u => {
      const matchId = (u.identifier && u.identifier.toLowerCase() === username.toLowerCase()) ||
                      (u.email && u.email.toLowerCase() === username.toLowerCase());
      const matchRole = u.role === authRoleTab || (authRoleTab === 'Student' && u.role === 'Team Lead');
      return matchId && matchRole;
    });

    if(!matched || matched.password !== password){
      // Allow flexible demo access if password matches default
      if(matched && password === 'password123'){
        applyUserLogin(matched);
        return;
      }
      authErrorMsg = 'Invalid credentials for ' + authRoleTab + '. Please check your identifier and password.';
      if(typeof render === 'function') render();
      return;
    }

    applyUserLogin(matched);
  };

  root.handleAuthRegister = function(e){
    if(e && e.preventDefault) e.preventDefault();
    const name = (document.getElementById('reg-name')?.value || '').trim();
    const identifier = (document.getElementById('reg-id')?.value || '').trim();
    const email = (document.getElementById('reg-email')?.value || '').trim();
    const password = (document.getElementById('reg-password')?.value || '').trim();
    const confirm = (document.getElementById('reg-confirm')?.value || '').trim();

    if(!name){
      authErrorMsg = 'Please enter your full name.';
      if(typeof render === 'function') render();
      return;
    }

    if(authRoleTab === 'Student' && !identifier){
      authErrorMsg = 'Please enter your University Seat Number (USN).';
      if(typeof render === 'function') render();
      return;
    }

    if(!email){
      authErrorMsg = 'Please enter your college email address.';
      if(typeof render === 'function') render();
      return;
    }

    if(!password){
      authErrorMsg = 'Please enter a password.';
      if(typeof render === 'function') render();
      return;
    }

    if(password !== confirm){
      authErrorMsg = 'Passwords do not match. Please verify.';
      if(typeof render === 'function') render();
      return;
    }

    const finalIdentifier = authRoleTab === 'Student' ? identifier : email;

    const users = getStoredUsers();
    if(users.some(u => (u.identifier && u.identifier.toLowerCase() === finalIdentifier.toLowerCase()) || (u.email && u.email.toLowerCase() === email.toLowerCase()))){
      authErrorMsg = 'An account with this ' + (authRoleTab === 'Student' ? 'USN or Email' : 'Email') + ' already exists. Please sign in.';
      if(typeof render === 'function') render();
      return;
    }

    let teamId = '03';
    if(authRoleTab === 'Student'){
      const allTeams = (typeof state !== 'undefined' && state.teams) || (typeof seedTeams === 'function' ? seedTeams() : []);
      const matchedTeam = allTeams.find(t => t.members && t.members.some(m => m.usn && m.usn.toLowerCase() === finalIdentifier.toLowerCase()));
      if(matchedTeam) teamId = matchedTeam.id;
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      identifier: finalIdentifier,
      email,
      name,
      role: authRoleTab,
      teamId: authRoleTab === 'Student' ? teamId : null,
      password,
      department: 'Department of CSE(AI)'
    };

    users.push(newUser);
    saveStoredUsers(users);
    if(typeof toast === 'function') toast('Account created successfully! Welcome to ProjectGate.');
    applyUserLogin(newUser);
  };

  function applyUserLogin(user){
    setAuthSession(user);
    authErrorMsg = '';

    if(typeof state !== 'undefined'){
      state.currentUser = user;
      state.role = user.role;

      if(user.role === 'Student'){
        let tid = user.teamId || state.activeTeamId || 'A-03';
        if(tid === '03') tid = 'A-03';
        const allTeams = (typeof state !== 'undefined' && state.teams) || (typeof seedTeams === 'function' ? seedTeams() : []);
        if(user.identifier){
          const m = allTeams.find(t => t.members && t.members.some(mem => mem.usn && mem.usn.toLowerCase() === user.identifier.toLowerCase()));
          if(m) tid = m.id;
        }
        if(typeof switchTeam === 'function') switchTeam(tid);
        else state.activeTeamId = tid;

        if(state.members && state.members.length){
          const sIdx = state.members.findIndex(m =>
            (user.identifier && m.usn && m.usn.toLowerCase() === user.identifier.toLowerCase()) ||
            (user.name && m.name && m.name.toLowerCase() === user.name.toLowerCase())
          );
          if(sIdx >= 0) state.student = sIdx;
        }

        try { sessionStorage.setItem('pg_current_page', 'Team Portfolio'); } catch(e){}
        if(typeof go === 'function') go('Team Portfolio');
      } else if(user.role === 'Faculty'){
        state.facultyAccount = user.name;
        if(typeof selectFaculty === 'function') selectFaculty(user.name);
        try { sessionStorage.setItem('pg_current_page', 'Overview'); } catch(e){}
        if(typeof go === 'function') go('Overview');
      } else if(user.role === 'HOD'){
        try { sessionStorage.setItem('pg_current_page', 'Department'); } catch(e){}
        if(typeof go === 'function') go('Department');
      }
    }

    if(typeof toast === 'function') toast('Welcome, ' + user.name + ' (' + user.role + ')');
    if(typeof render === 'function') render();
  }

  function restoreAuthSession(){
    const user = getAuthSession();
    if(!user || typeof state === 'undefined') return;
    state.currentUser = user;
    state.role = user.role;

    if(user.role === 'Student'){
      let tid = user.teamId || state.activeTeamId || 'A-03';
      if(tid === '03') tid = 'A-03';
      const allTeams = (state.teams || (typeof seedTeams === 'function' ? seedTeams() : []));
      if(user.identifier){
        const m = allTeams.find(t => t.members && t.members.some(mem => mem.usn && mem.usn.toLowerCase() === user.identifier.toLowerCase()));
        if(m) tid = m.id;
      }
      if(typeof switchTeam === 'function'){
        if(state.activeTeamId !== tid) switchTeam(tid);
      } else {
        state.activeTeamId = tid;
      }

      if(state.members && state.members.length){
        const sIdx = state.members.findIndex(m =>
          (user.identifier && m.usn && m.usn.toLowerCase() === user.identifier.toLowerCase()) ||
          (user.name && m.name && m.name.toLowerCase() === user.name.toLowerCase())
        );
        if(sIdx >= 0) state.student = sIdx;
      }

      let savedPage = null;
      try { savedPage = sessionStorage.getItem('pg_current_page'); } catch(e){}
      if(savedPage && typeof rolePages !== 'undefined' && rolePages.Student && rolePages.Student.includes(savedPage)){
        page = savedPage;
      } else {
        page = 'Team Portfolio';
        try { sessionStorage.setItem('pg_current_page', 'Team Portfolio'); } catch(e){}
      }
    } else if(user.role === 'Faculty'){
      state.facultyAccount = user.name;
      let savedPage = null;
      try { savedPage = sessionStorage.getItem('pg_current_page'); } catch(e){}
      if(savedPage && typeof rolePages !== 'undefined' && rolePages.Faculty && rolePages.Faculty.includes(savedPage)){
        page = savedPage;
      } else {
        page = 'Overview';
        try { sessionStorage.setItem('pg_current_page', 'Overview'); } catch(e){}
      }
    } else if(user.role === 'HOD'){
      let savedPage = null;
      try { savedPage = sessionStorage.getItem('pg_current_page'); } catch(e){}
      if(savedPage && typeof rolePages !== 'undefined' && rolePages.HOD && rolePages.HOD.includes(savedPage)){
        page = savedPage;
      } else {
        page = 'Department';
        try { sessionStorage.setItem('pg_current_page', 'Department'); } catch(e){}
      }
    }
  }
  root.restoreAuthSession = restoreAuthSession;

  root.renderAuthScreen = function(){
    const isDark = typeof getTheme === 'function' && getTheme() === 'dark';
    const allTeams = (typeof state !== 'undefined' && state.teams) || (typeof seedTeams === 'function' ? seedTeams() : []);

    const errorBg = isDark ? '#450a0a' : '#fef2f2';
    const errorBorder = isDark ? '#ef4444' : '#dc2626';
    const errorTitle = isDark ? '#fecaca' : '#991b1b';
    const errorText = isDark ? '#fee2e2' : '#7f1d1d';

    const errorHtml = authErrorMsg
      ? `<div role="alert" style="background:${errorBg} !important; border:1.5px solid ${errorBorder} !important; border-radius:8px; padding:12px 14px; margin-bottom:16px; display:flex; align-items:flex-start; gap:10px; box-shadow:0 1px 3px rgba(220,38,38,0.12); box-sizing:border-box;">
          <span style="font-size:16px; line-height:1.2; flex-shrink:0;">⚠️</span>
          <div style="flex:1;">
            <div style="color:${errorTitle} !important; font-weight:800; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:2px;">Error Notice</div>
            <div style="color:${errorText} !important; font-weight:700; font-size:13.5px; line-height:1.4;">${esc(authErrorMsg)}</div>
          </div>
        </div>`
      : '';

    let contentHtml = '';

    if(authMode === 'login'){
      contentHtml = `
        <div class="auth-role-tabs" style="display:flex; gap:8px; margin-bottom:20px;">
          <button type="button" class="btn ${authRoleTab==='Student'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700; ${authRoleTab==='Student'?'background:#38bdf8 !important; color:#082f49 !important; border:1.5px solid #0284c7 !important;':''}" onclick="window.switchAuthRoleTab('Student')">
            Student
          </button>
          <button type="button" class="btn ${authRoleTab==='Faculty'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700; ${authRoleTab==='Faculty'?'background:#38bdf8 !important; color:#082f49 !important; border:1.5px solid #0284c7 !important;':''}" onclick="window.switchAuthRoleTab('Faculty')">
            Faculty
          </button>
          <button type="button" class="btn ${authRoleTab==='HOD'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700; ${authRoleTab==='HOD'?'background:#38bdf8 !important; color:#082f49 !important; border:1.5px solid #0284c7 !important;':''}" onclick="window.switchAuthRoleTab('HOD')">
            HOD
          </button>
        </div>

        ${errorHtml}

        <form onsubmit="window.handleAuthLogin(event)" autocomplete="off" style="display:flex; flex-direction:column; gap:14px;">
          <div>
            <label for="login-username" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:6px; color:var(--ink);">
              ${authRoleTab === 'Student' ? 'University Seat Number (USN) or College Email' : authRoleTab === 'Faculty' ? 'Faculty College Email' : 'HOD College Email'}
            </label>
            <input id="login-username" name="${authRoleTab.toLowerCase()}_user_identifier" type="text" autocomplete="off" required placeholder="${authRoleTab === 'Student' ? 'Enter USN or Email' : authRoleTab === 'Faculty' ? 'Enter college email' : 'Enter HOD email'}" style="width:100%; box-sizing:border-box; padding:11px 14px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
          </div>

          <div>
            <label for="login-password" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:6px; color:var(--ink);">Password</label>
            <input id="login-password" name="${authRoleTab.toLowerCase()}_user_secret" type="password" autocomplete="new-password" required placeholder="Enter password" style="width:100%; box-sizing:border-box; padding:11px 14px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
          </div>

          <button type="submit" class="btn" style="width:100%; justify-content:center; padding:12px; font-size:14px; font-weight:800; margin-top:6px; background:#38bdf8 !important; color:#082f49 !important; border:1.5px solid #0284c7 !important;">
            Sign In as ${authRoleTab}
          </button>
        </form>



        <div style="text-align:center; margin-top:20px; font-size:13px; color:var(--muted);">
          Don't have an account? 
          <a href="javascript:void(0)" onclick="window.switchAuthMode('register')" style="color:var(--brand); font-weight:700; text-decoration:none;">Create account here</a>
        </div>
      `;
    } else {
      // Registration screen
      contentHtml = `
        <div class="auth-role-tabs" style="display:flex; gap:8px; margin-bottom:20px;">
          <button type="button" class="btn ${authRoleTab==='Student'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700; ${authRoleTab==='Student'?'background:#38bdf8 !important; color:#082f49 !important; border:1.5px solid #0284c7 !important;':''}" onclick="window.switchAuthRoleTab('Student')">
            Student Registration
          </button>
          <button type="button" class="btn ${authRoleTab==='Faculty'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700; ${authRoleTab==='Faculty'?'background:#38bdf8 !important; color:#082f49 !important; border:1.5px solid #0284c7 !important;':''}" onclick="window.switchAuthRoleTab('Faculty')">
            Faculty Registration
          </button>
        </div>

        ${errorHtml}

        <form onsubmit="window.handleAuthRegister(event)" autocomplete="off" style="display:flex; flex-direction:column; gap:13px;">
          <div>
            <label for="reg-name" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:5px; color:var(--ink);">Full Name</label>
            <input id="reg-name" name="${authRoleTab.toLowerCase()}_reg_fullname" type="text" autocomplete="off" required placeholder="Enter full name" style="width:100%; box-sizing:border-box; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
          </div>

          ${authRoleTab === 'Student' ? `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; align-items:end;">
              <div style="display:flex; flex-direction:column; justify-content:flex-end;">
                <label for="reg-id" style="display:flex; align-items:flex-end; font-size:12.5px; font-weight:700; margin-bottom:6px; color:var(--ink); height:34px; line-height:1.25;">University Seat Number (USN)</label>
                <input id="reg-id" name="student_reg_usn" type="text" autocomplete="off" required placeholder="Enter USN" style="width:100%; box-sizing:border-box; height:42px; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
              </div>
              <div style="display:flex; flex-direction:column; justify-content:flex-end;">
                <label for="reg-email" style="display:flex; align-items:flex-end; font-size:12.5px; font-weight:700; margin-bottom:6px; color:var(--ink); height:34px; line-height:1.25;">College Email</label>
                <input id="reg-email" name="student_reg_email" type="email" autocomplete="off" required placeholder="Enter college email" style="width:100%; box-sizing:border-box; height:42px; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
              </div>
            </div>
          ` : `
            <div>
              <label for="reg-email" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:6px; color:var(--ink);">College Email</label>
              <input id="reg-email" name="faculty_reg_email" type="email" autocomplete="off" required placeholder="Enter faculty email" style="width:100%; box-sizing:border-box; height:42px; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
            </div>
          `}

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; align-items:end;">
            <div style="display:flex; flex-direction:column; justify-content:flex-end;">
              <label for="reg-password" style="display:flex; align-items:flex-end; font-size:12.5px; font-weight:700; margin-bottom:6px; color:var(--ink); height:20px; line-height:1.25;">Password</label>
              <input id="reg-password" name="${authRoleTab.toLowerCase()}_reg_pass" type="password" autocomplete="new-password" required placeholder="Enter password" style="width:100%; box-sizing:border-box; height:42px; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
            </div>
            <div style="display:flex; flex-direction:column; justify-content:flex-end;">
              <label for="reg-confirm" style="display:flex; align-items:flex-end; font-size:12.5px; font-weight:700; margin-bottom:6px; color:var(--ink); height:20px; line-height:1.25;">Confirm Password</label>
              <input id="reg-confirm" name="${authRoleTab.toLowerCase()}_reg_confirm" type="password" autocomplete="new-password" required placeholder="Confirm password" style="width:100%; box-sizing:border-box; height:42px; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
            </div>
          </div>

          <button type="submit" class="btn" style="width:100%; justify-content:center; padding:12px; font-size:14px; font-weight:800; margin-top:8px; background:#38bdf8 !important; color:#082f49 !important; border:1.5px solid #0284c7 !important;">
            Create ${authRoleTab} Account
          </button>
        </form>



        <div style="text-align:center; margin-top:20px; font-size:13px; color:var(--muted);">
          Already have an account? 
          <a href="javascript:void(0)" onclick="window.switchAuthMode('login')" style="color:var(--brand); font-weight:700; text-decoration:none;">Sign in here</a>
        </div>
      `;
    }

    return `
      <div style="min-height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:24px 16px; background:var(--bg); box-sizing:border-box;">
        
        <!-- Header Branding -->
        <div style="text-align:center; margin-bottom:24px;">
          <div style="display:inline-flex; align-items:center; gap:10px; margin-bottom:12px;">
            <img src="assets/kle_tech_logo.png" alt="KLE Technological University" style="height:36px; object-fit:contain;">
            <span style="font-size:13.5px; font-weight:800; color:var(--ink); letter-spacing:0.3px;">Department of CSE(AI)</span>
          </div>
          <h1 style="font-size:26px; font-weight:800; color:var(--ink); margin:0; letter-spacing:-0.02em;">
            ProjectGate <span style="color:var(--brand);">AI</span>
          </h1>
        </div>

        <!-- Auth Card -->
        <div style="width:100%; max-width:480px; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:28px 26px; box-shadow:var(--shadow-lg); box-sizing:border-box;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--line); padding-bottom:14px; margin-bottom:20px;">
            <h2 style="font-size:18px; font-weight:800; color:var(--ink); margin:0;">
              ${authMode === 'login' ? 'Sign In to Portal' : 'Create Account'}
            </h2>
            <div style="display:flex; gap:6px;">
              <button type="button" class="btn ${authMode==='login'?'':'secondary'}" style="padding:5px 12px; font-size:12px; font-weight:700; ${authMode==='login'?'background:#38bdf8 !important; color:#082f49 !important; border:1px solid #0284c7 !important;':''}" onclick="window.switchAuthMode('login')">Sign In</button>
              <button type="button" class="btn ${authMode==='register'?'':'secondary'}" style="padding:5px 12px; font-size:12px; font-weight:700; ${authMode==='register'?'background:#38bdf8 !important; color:#082f49 !important; border:1px solid #0284c7 !important;':''}" onclick="window.switchAuthMode('register')">Register</button>
            </div>
          </div>

          ${contentHtml}
        </div>

        <!-- Footer -->
        <div style="margin-top:24px; text-align:center; font-size:12px; color:var(--muted);">
          KLE Technological University &middot; Mini-Project Mentoring Cohort 2026&ndash;27
        </div>
      </div>
    `;
  };
})(typeof window !== 'undefined' ? window : global);
