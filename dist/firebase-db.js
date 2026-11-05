// Firebase Firestore Database Integration for ProjectGate AI
const firebaseConfig = {
  apiKey: "AIzaSyCH6f0HJxbS8eL7ud82K9peEjnZGhHkV34",
  authDomain: "projectgate-4fabb.firebaseapp.com",
  projectId: "projectgate-4fabb",
  storageBucket: "projectgate-4fabb.firebasestorage.app",
  messagingSenderId: "1045564825252",
  appId: "1:1045564825252:web:3efa11dc98f88ee31a9031",
  measurementId: "G-JE9QGYSCD3"
};

let db = null;
let currentTeamUnsubscribe = null;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    window.db = db;
    console.log("[Firebase] Firestore initialized successfully for project:", firebaseConfig.projectId);
  } else {
    console.warn("[Firebase] Firebase SDK not detected. Operating in local mode.");
  }
} catch (e) {
  console.error("[Firebase] Initialization error:", e);
}

// Save active team submission / forms / reviews state to Cloud Firestore
async function saveTeamStateToCloud(teamId, stateData) {
  if (!db) return false;
  try {
    const tid = String(teamId || (window.state && window.state.activeTeamId) || 'A-03');
    const docRef = db.collection("teams").doc(tid);
    const payload = {
      teamId: tid,
      forms: stateData.forms || {},
      status0: stateData.status0 || 'Draft',
      status1: stateData.status1 || 'Draft',
      status2: stateData.status2 || 'Draft',
      status3: stateData.status3 || 'Draft',
      reviews: stateData.reviews || {},
      score: stateData.score ?? 0,
      feedback: stateData.feedback || '',
      unlocked: Boolean(stateData.unlocked),
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdatedBy: (stateData && stateData.role) || 'Unknown'
    };
    await docRef.set(payload, { merge: true });
    console.log(`[Firebase] Team ${tid} synced to Firestore.`);
    return true;
  } catch (err) {
    console.error("[Firebase] Error syncing team state:", err);
    return false;
  }
}

// Save a specific stage's form data to Cloud Firestore
async function saveStageToCloud(teamId, stageNum, formData) {
  if (!db) return false;
  try {
    const tid = String(teamId || (window.state && window.state.activeTeamId) || 'A-03');
    const docRef = db.collection("teams").doc(tid);
    await docRef.set({
      [`forms.${stageNum}`]: formData,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdatedBy: (window.state && window.state.role) || 'Unknown'
    }, { merge: true });
    console.log(`[Firebase] Stage ${stageNum} saved to Firestore for ${tid}`);
    return true;
  } catch (err) {
    console.error("[Firebase] Error saving stage to Firestore:", err);
    return false;
  }
}

// Fetch team data from Cloud Firestore on initial load or team switch
async function syncTeamFromCloud(teamId) {
  if (!db) return false;
  try {
    const tid = String(teamId || (window.state && window.state.activeTeamId) || 'A-03');
    const doc = await db.collection("teams").doc(tid).get();
    if (doc.exists) {
      const data = doc.data();
      if (data && window.state) {
        if (data.forms) {
          window.state.forms = window.state.forms || {};
          Object.assign(window.state.forms, data.forms);
        }
        ['status0','status1','status2','status3'].forEach(s => {
          if (data[s] !== undefined) window.state[s] = data[s];
        });
        if (data.reviews) {
          window.state.reviews = Object.assign(window.state.reviews || {}, data.reviews);
        }
        if (data.score !== undefined) window.state.score = data.score;
        if (data.feedback !== undefined) window.state.feedback = data.feedback;
        if (data.unlocked !== undefined) window.state.unlocked = data.unlocked;
        if (typeof render === 'function') render();
      }
      console.log(`[Firebase] Team ${tid} data loaded from Firestore.`);
      return true;
    }
  } catch (err) {
    console.warn(`[Firebase] Could not fetch team ${teamId} from cloud:`, err);
  }
  return false;
}

// Subscribe to real-time changes for the currently active team
function subscribeToTeamCloud(teamId) {
  if (!db) return;
  if (currentTeamUnsubscribe) {
    try { currentTeamUnsubscribe(); } catch(e){}
    currentTeamUnsubscribe = null;
  }
  try {
    const tid = String(teamId || (window.state && window.state.activeTeamId) || 'A-03');
    const docRef = db.collection("teams").doc(tid);
    currentTeamUnsubscribe = docRef.onSnapshot((doc) => {
      if (!doc.exists) return;
      const data = doc.data();
      if (!data || !window.state) return;
      
      let changed = false;
      if (data.forms) {
        window.state.forms = window.state.forms || {};
        for (let k in data.forms) {
          if (JSON.stringify(window.state.forms[k]) !== JSON.stringify(data.forms[k])) {
            window.state.forms[k] = Object.assign(window.state.forms[k] || {}, data.forms[k]);
            changed = true;
          }
        }
      }
      ['status0','status1','status2','status3'].forEach(s => {
        if (data[s] && window.state[s] !== data[s]) {
          window.state[s] = data[s];
          changed = true;
        }
      });
      if (data.reviews && JSON.stringify(window.state.reviews) !== JSON.stringify(data.reviews)) {
        window.state.reviews = Object.assign(window.state.reviews || {}, data.reviews);
        changed = true;
      }
      if (data.score !== undefined && window.state.score !== data.score) {
        window.state.score = data.score;
        changed = true;
      }
      if (data.feedback !== undefined && window.state.feedback !== data.feedback) {
        window.state.feedback = data.feedback;
        changed = true;
      }
      if (data.unlocked !== undefined && window.state.unlocked !== data.unlocked) {
        window.state.unlocked = data.unlocked;
        changed = true;
      }
      if (changed && typeof render === 'function') {
        console.log(`[Firebase] Real-time cloud sync applied for ${tid}.`);
        render();
      }
    }, (err) => {
      console.warn("[Firebase] Real-time listener notice:", err);
    });
  } catch (err) {
    console.error("[Firebase] Listener attach error:", err);
  }
}

// One-time helper to upload all 33 department teams to Cloud Firestore
async function uploadAllTeamsToCloud() {
  if (!db) {
    console.error("[Firebase] Firestore is not connected.");
    alert("Firebase Firestore is not connected yet. Please check console.");
    return false;
  }
  let teams = (window.state && window.state.teams) || [];
  if ((!teams || !teams.length) && typeof seedTeams === 'function') {
    teams = seedTeams();
  }
  if (!teams || !teams.length) {
    console.warn("[Firebase] No teams found in state or seedTeams to upload.");
    alert("Teams are still initializing. Please wait 1 second and run uploadAllTeamsToCloud() again.");
    return false;
  }
  console.log(`[Firebase] Uploading ${teams.length} teams to Firestore...`);
  try {
    const batch = db.batch();
    for (const t of teams) {
      const staticTeam = (typeof window !== 'undefined' && window.STATIC_TEAMS_DATA && (
        window.STATIC_TEAMS_DATA[t.id] ||
        (t.id === 'A-03' ? (window.STATIC_TEAMS_DATA['A-03'] || window.STATIC_TEAMS_DATA['03']) : null) ||
        Object.values(window.STATIC_TEAMS_DATA).find(st => st && (st.id === t.id || (st.title && t.title && st.title.toLowerCase().trim() === t.title.toLowerCase().trim())))
      )) || null;

      const docRef = db.collection("teams").doc(String(t.id));
      const payload = {
        id: t.id,
        title: t.title || '',
        theme_no: t.theme_no || 1,
        topic: t.topic || '',
        faculty: t.faculty || '',
        members: t.members || [],
        stage0: staticTeam?.stage0 || {},
        stage1: staticTeam?.stage1 || {},
        systemDesign: staticTeam?.systemDesign || {},
        status0: 'Draft',
        status1: 'Draft',
        status2: 'Draft',
        status3: 'Draft',
        lastSynced: firebase.firestore.FieldValue.serverTimestamp()
      };
      batch.set(docRef, payload, { merge: true });
    }
    await batch.commit();
    console.log(`[Firebase] Successfully uploaded all ${teams.length} teams to Firestore!`);
    if (typeof toast === 'function') toast(`Successfully synced ${teams.length} teams to Firebase Firestore! Refresh your Firebase console.`);
    else if (typeof alert === 'function') alert(`Successfully synced ${teams.length} teams to Firebase Firestore! Refresh your Firebase console.`);
    return true;
  } catch (err) {
    console.error("[Firebase] Error batch uploading teams:", err);
    if (typeof toast === 'function') toast("Error uploading to Firebase: " + (err.message || err));
    else if (typeof alert === 'function') alert("Error uploading to Firebase: " + (err.message || err));
    return false;
  }
}

// Expose globals
window.saveTeamStateToCloud = saveTeamStateToCloud;
window.saveStageToCloud = saveStageToCloud;
window.syncTeamFromCloud = syncTeamFromCloud;
window.subscribeToTeamCloud = subscribeToTeamCloud;
window.uploadAllTeamsToCloud = uploadAllTeamsToCloud;

// Auto-subscribe when window loads
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const activeId = (window.state && window.state.activeTeamId) || 'A-03';
    subscribeToTeamCloud(activeId);
  }, 500);
});
