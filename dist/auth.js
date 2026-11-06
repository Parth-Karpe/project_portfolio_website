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
      identifier: '01FE23BCS103',
      email: 'vedant.k@kletech.ac.in',
      name: 'Vedant Khot',
      role: 'Student',
      teamId: '03',
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
      identifier: '01FE23BCS102',
      email: 'nupur.b@kletech.ac.in',
      name: 'Nupur Bagave',
      role: 'Student',
      teamId: '03',
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
    } catch(e) {}
  }

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
    authErrorMsg = '';
    authMode = 'login';
    if(typeof state !== 'undefined'){
      state.currentUser = null;
    }
    if(typeof toast === 'function') toast('Signed out successfully.');
    if(typeof render === 'function') render();
  };

  root.switchAuthMode = function(mode){
    authMode = mode;
    authErrorMsg = '';
    if(typeof render === 'function') render();
  };

  root.switchAuthRoleTab = function(role){
    authRoleTab = role;
    authErrorMsg = '';
    if(typeof render === 'function') render();
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
      authErrorMsg = 'Invalid credentials for ' + authRoleTab + '. Check your input or use the 1-click demo login below.';
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
    const teamSel = document.getElementById('reg-team');
    const teamId = teamSel ? teamSel.value : '03';

    if(!name || !identifier || !email || !password){
      authErrorMsg = 'All fields are required to register.';
      if(typeof render === 'function') render();
      return;
    }

    if(password !== confirm){
      authErrorMsg = 'Passwords do not match. Please verify.';
      if(typeof render === 'function') render();
      return;
    }

    const users = getStoredUsers();
    if(users.some(u => u.identifier.toLowerCase() === identifier.toLowerCase() || u.email.toLowerCase() === email.toLowerCase())){
      authErrorMsg = 'An account with this USN / Email already exists. Please sign in.';
      if(typeof render === 'function') render();
      return;
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      identifier,
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
        const tid = user.teamId || state.activeTeamId || '03';
        if(typeof switchTeam === 'function') switchTeam(tid);
        if(typeof go === 'function') go('Team Portfolio');
      } else if(user.role === 'Faculty'){
        state.facultyAccount = user.name;
        if(typeof selectFaculty === 'function') selectFaculty(user.name);
        if(typeof go === 'function') go('Overview');
      } else if(user.role === 'HOD'){
        if(typeof go === 'function') go('Department');
      }
    }

    if(typeof toast === 'function') toast('Welcome, ' + user.name + ' (' + user.role + ')');
    if(typeof render === 'function') render();
  }

  root.renderAuthScreen = function(){
    const isDark = typeof getTheme === 'function' && getTheme() === 'dark';
    const allTeams = (typeof state !== 'undefined' && state.teams) || (typeof seedTeams === 'function' ? seedTeams() : []);

    const errorHtml = authErrorMsg
      ? `<div style="background:rgba(239, 68, 68, 0.12); border:1px solid #ef4444; color:#ef4444; border-radius:8px; padding:10px 14px; font-size:13px; font-weight:600; margin-bottom:16px;">
          ⚠️ ${authErrorMsg}
        </div>`
      : '';

    let contentHtml = '';

    if(authMode === 'login'){
      contentHtml = `
        <div class="auth-role-tabs" style="display:flex; gap:8px; margin-bottom:20px;">
          <button type="button" class="btn ${authRoleTab==='Student'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700;" onclick="window.switchAuthRoleTab('Student')">
            🎓 Student
          </button>
          <button type="button" class="btn ${authRoleTab==='Faculty'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700;" onclick="window.switchAuthRoleTab('Faculty')">
            👨‍🏫 Faculty
          </button>
          <button type="button" class="btn ${authRoleTab==='HOD'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700;" onclick="window.switchAuthRoleTab('HOD')">
            🏛️ HOD
          </button>
        </div>

        ${errorHtml}

        <form onsubmit="window.handleAuthLogin(event)" style="display:flex; flex-direction:column; gap:14px;">
          <div>
            <label for="login-username" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:6px; color:var(--ink);">
              ${authRoleTab === 'Student' ? 'University Seat Number (USN) or College Email' : authRoleTab === 'Faculty' ? 'Faculty Email or Employee ID' : 'HOD Email or Admin ID'}
            </label>
            <input id="login-username" type="text" required placeholder="${authRoleTab === 'Student' ? 'e.g. 01FE23BCS103 or vedant.k@kletech.ac.in' : authRoleTab === 'Faculty' ? 'e.g. amit.k@kletech.ac.in' : 'e.g. hod.cseai@kletech.ac.in'}" style="width:100%; box-sizing:border-box; padding:11px 14px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label for="login-password" style="font-size:12.5px; font-weight:700; color:var(--ink);">Password</label>
              <span class="mini" style="color:var(--muted);">Default: password123</span>
            </div>
            <input id="login-password" type="password" required value="password123" placeholder="••••••••" style="width:100%; box-sizing:border-box; padding:11px 14px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
          </div>

          <button type="submit" class="btn" style="width:100%; justify-content:center; padding:12px; font-size:14px; font-weight:700; margin-top:6px;">
            Sign In as ${authRoleTab}
          </button>
        </form>

        <div style="margin-top:22px; padding-top:16px; border-top:1px solid var(--line);">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
            <span class="mini" style="font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:0.5px;">⚡ Quick 1-Click Demo Login</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">
            <button type="button" class="btn secondary" style="font-size:11.5px; padding:7px 4px; justify-content:center; font-weight:700;" onclick="window.quickDemoLogin('Student', '03')">
              🎓 Student (T-03)
            </button>
            <button type="button" class="btn secondary" style="font-size:11.5px; padding:7px 4px; justify-content:center; font-weight:700;" onclick="window.quickDemoLogin('Faculty', 'Amit')">
              👨‍🏫 Faculty (Amit K)
            </button>
            <button type="button" class="btn secondary" style="font-size:11.5px; padding:7px 4px; justify-content:center; font-weight:700;" onclick="window.quickDemoLogin('HOD')">
              🏛️ HOD (Narayan)
            </button>
          </div>
        </div>

        <div style="text-align:center; margin-top:20px; font-size:13px; color:var(--muted);">
          Don't have an account? 
          <a href="javascript:void(0)" onclick="window.switchAuthMode('register')" style="color:var(--brand); font-weight:700; text-decoration:none;">Create account here</a>
        </div>
      `;
    } else {
      // Registration screen
      contentHtml = `
        <div class="auth-role-tabs" style="display:flex; gap:8px; margin-bottom:20px;">
          <button type="button" class="btn ${authRoleTab==='Student'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700;" onclick="window.switchAuthRoleTab('Student')">
            🎓 Student Registration
          </button>
          <button type="button" class="btn ${authRoleTab==='Faculty'?'':'secondary'}" style="flex:1; justify-content:center; padding:10px 6px; font-size:13px; font-weight:700;" onclick="window.switchAuthRoleTab('Faculty')">
            👨‍🏫 Faculty Registration
          </button>
        </div>

        ${errorHtml}

        <form onsubmit="window.handleAuthRegister(event)" style="display:flex; flex-direction:column; gap:13px;">
          <div>
            <label for="reg-name" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:5px; color:var(--ink);">Full Name</label>
            <input id="reg-name" type="text" required placeholder="e.g. Nupur Bagave" style="width:100%; box-sizing:border-box; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label for="reg-id" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:5px; color:var(--ink);">
                ${authRoleTab === 'Student' ? 'USN' : 'Faculty ID'}
              </label>
              <input id="reg-id" type="text" required placeholder="${authRoleTab === 'Student' ? 'e.g. 01FE23BCS102' : 'e.g. EMP_FAC_15'}" style="width:100%; box-sizing:border-box; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
            </div>
            <div>
              <label for="reg-email" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:5px; color:var(--ink);">College Email</label>
              <input id="reg-email" type="email" required placeholder="name@kletech.ac.in" style="width:100%; box-sizing:border-box; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
            </div>
          </div>

          ${authRoleTab === 'Student' ? `
            <div>
              <label for="reg-team" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:5px; color:var(--ink);">Select Project Team</label>
              <select id="reg-team" style="width:100%; box-sizing:border-box; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13px; font-weight:600;">
                ${allTeams.map(t => `<option value="${t.id}">Team ${t.id} · ${t.title.slice(0, 42)}</option>`).join('')}
              </select>
            </div>
          ` : `
            <div>
              <label style="display:block; font-size:12.5px; font-weight:700; margin-bottom:5px; color:var(--ink);">Department</label>
              <input type="text" readonly value="Department of CSE(AI)" style="width:100%; box-sizing:border-box; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface-sunken, rgba(0,0,0,0.02)); color:var(--muted); font-size:13.5px;">
            </div>
          `}

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label for="reg-password" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:5px; color:var(--ink);">Password</label>
              <input id="reg-password" type="password" required placeholder="••••••••" style="width:100%; box-sizing:border-box; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
            </div>
            <div>
              <label for="reg-confirm" style="display:block; font-size:12.5px; font-weight:700; margin-bottom:5px; color:var(--ink);">Confirm Password</label>
              <input id="reg-confirm" type="password" required placeholder="••••••••" style="width:100%; box-sizing:border-box; padding:10px 12px; border-radius:8px; border:1px solid var(--line); background:var(--surface); color:var(--ink); font-size:13.5px;">
            </div>
          </div>

          <button type="submit" class="btn" style="width:100%; justify-content:center; padding:12px; font-size:14px; font-weight:700; margin-top:8px;">
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
          <h1 style="font-size:26px; font-weight:800; color:var(--ink); margin:0 0 6px; letter-spacing:-0.02em;">
            ProjectGate <span style="color:var(--brand);">AI</span>
          </h1>
          <p style="font-size:14px; color:var(--muted); margin:0;">
            Mini-Project Mentoring & Viva Defense Platform
          </p>
        </div>

        <!-- Auth Card -->
        <div style="width:100%; max-width:480px; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:28px 26px; box-shadow:var(--shadow-lg); box-sizing:border-box;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--line); padding-bottom:14px; margin-bottom:20px;">
            <h2 style="font-size:18px; font-weight:800; color:var(--ink); margin:0;">
              ${authMode === 'login' ? 'Sign In to Portal' : 'Create Account'}
            </h2>
            <div style="display:flex; gap:6px;">
              <button type="button" class="btn ${authMode==='login'?'':'secondary'}" style="padding:5px 12px; font-size:12px; font-weight:700;" onclick="window.switchAuthMode('login')">Sign In</button>
              <button type="button" class="btn ${authMode==='register'?'':'secondary'}" style="padding:5px 12px; font-size:12px; font-weight:700;" onclick="window.switchAuthMode('register')">Register</button>
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
