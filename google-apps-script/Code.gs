// =========================================================================
// 🕷️ KODE GOOGLE APPS SCRIPT - STICKY NOTES SPIDER-MAN PORTOFOLIO
// =========================================================================
// CARA PAKAI:
// 1. Tekan CTRL + A lalu CTRL + C (Salin Semua Kode di Notepad ini).
// 2. Buka tab Google Apps Script di browser Anda:
//    https://script.google.com/u/0/home/projects/1oGuZHIkWTOknyq-8mkdkq_0QBX6ZPA3SiZYljcw9godRVYbtHrCeJzk4/edit
// 3. Hapus teks lama di Apps Script, lalu CTRL + V (Paste).
// 4. Tekan CTRL + S untuk Simpan.
// 5. Klik Deploy (Terapkan) -> Manage deployments (Kelola penerapan).
// 6. Klik ikon Pensil (Edit) -> Pada "Version" pilih "New version" (Versi baru).
// 7. Klik Deploy (Terapkan)!
// =========================================================================

const SHEET_NAME = "SpiderNotes";
const CACHE_KEY = "spider_notes_v2";
const CACHE_TTL_SECONDS = 120; // 2 Menit RAM Cache (Sangat Cepat & Bebas Batasan Simultan)

const INITIAL_SEEDED_NOTES = [
  {
    id: "spidey-note-1",
    author: "Miles Morales",
    aliasBadge: "🕷️ Brooklyn Visionary (Earth-1610)",
    category: "lore",
    colorId: "crimson",
    title: "Crazy Good Spider-Sense UI!",
    message: "That Sunflower vinyl player and the precision coordinate HUD are straight out of the Spider-Verse! Keep swinging high, Haikel! 🕷️⚡",
    timestamp: "2 hours ago",
    reactions: JSON.stringify({ web: 24, love: 18, zap: 31, fire: 42 }),
    rotation: -1.8,
    isPinned: true,
    status: "active"
  },
  {
    id: "spidey-note-2",
    author: "Gwen Stacy",
    aliasBadge: "🕷️ Ghost-Spider (Earth-65)",
    category: "collab",
    colorId: "gwen-teal",
    title: "Awesome Audio & Tech Skills",
    message: "Love the rhythm and smooth 60fps kinetic animations on mobile. Let's collaborate on a drum & synth web visualizer soon! 🥁✨",
    timestamp: "5 hours ago",
    reactions: JSON.stringify({ web: 19, love: 28, zap: 14, fire: 22 }),
    rotation: 1.5,
    isPinned: false,
    status: "active"
  },
  {
    id: "spidey-note-3",
    author: "Peter Parker",
    aliasBadge: "🕷️ Friendly Neighborhood (Earth-616)",
    category: "feedback",
    colorId: "cyan-2099",
    title: "Clean Architecture & Great Responsibility",
    message: "With great coding skills comes great responsibility. The BNSP Certified Network & Software stack is rock-solid. Proud of you! 🕸️",
    timestamp: "1 day ago",
    reactions: JSON.stringify({ web: 45, love: 36, zap: 29, fire: 50 }),
    rotation: -2.2,
    isPinned: false,
    status: "active"
  },
  {
    id: "spidey-note-4",
    author: "Miguel O'Hara",
    aliasBadge: "🕷️ Spider-Man 2099 (Earth-928)",
    category: "mission",
    colorId: "symbiote-purple",
    title: "Multiverse Protocol Verified",
    message: "Telemetry scan complete. Zero layout shifts, high-speed Vite build, and flawless responsive viewport. Protocol approved. 🛡️",
    timestamp: "2 days ago",
    reactions: JSON.stringify({ web: 32, love: 15, zap: 41, fire: 27 }),
    rotation: 2.0,
    isPinned: false,
    status: "active"
  },
  {
    id: "spidey-note-5",
    author: "Ned Leeds",
    aliasBadge: "🕷️ Guy In The Chair",
    category: "cheer",
    colorId: "electric-yellow",
    title: "The Terminal Boot is LEGENDARY!",
    message: "Dude, that BIOS terminal boot sequence at the start blew my mind! You're officially the guy in the chair for our tech squad! 💻🔥",
    timestamp: "3 days ago",
    reactions: JSON.stringify({ web: 52, love: 44, zap: 38, fire: 63 }),
    rotation: -1.2,
    isPinned: false,
    status: "active"
  }
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      "ID", "Author", "AliasBadge", "Category", "ColorId", "Title", "Message",
      "Timestamp", "ReactionsJson", "Rotation", "IsPinned", "Status", "CreatedAt"
    ];
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#e50914");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    
    INITIAL_SEEDED_NOTES.forEach(function(note) {
      sheet.appendRow([
        note.id, note.author, note.aliasBadge, note.category, note.colorId,
        note.title, note.message, note.timestamp, note.reactions, note.rotation,
        note.isPinned ? "TRUE" : "FALSE", note.status, new Date().toISOString()
      ]);
    });
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

function readNotesFromSheet() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return [];
  }
  const rows = data.slice(1);
  const notes = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const id = String(row[0] || "");
    const author = String(row[1] || "Anonymous");
    const aliasBadge = String(row[2] || "🕷️ Web Visitor");
    const category = String(row[3] || "feedback");
    const colorId = String(row[4] || "crimson");
    const title = String(row[5] || "");
    const message = String(row[6] || "");
    const timestamp = String(row[7] || "Recently");
    let reactions = { web: 1, love: 1, zap: 1, fire: 1 };
    try {
      if (row[8]) reactions = typeof row[8] === "string" ? JSON.parse(row[8]) : row[8];
    } catch (err) {
      reactions = { web: 1, love: 1, zap: 1, fire: 1 };
    }
    const rotation = Number(row[9]) || 0;
    const isPinned = String(row[10]).toUpperCase() === "TRUE";
    const status = String(row[11] || "active").toLowerCase();
    if (status !== "deleted" && id.trim() !== "") {
      notes.push({
        id, author, aliasBadge, category, colorId, title, message,
        timestamp, reactions, rotation, isPinned, isUserCreated: !id.startsWith("spidey-note-")
      });
    }
  }
  notes.sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));
  return notes;
}

function doGet(e) {
  try {
    const cache = CacheService.getScriptCache();
    const cachedData = cache.get(CACHE_KEY);
    
    if (cachedData) {
      return ContentService.createTextOutput(cachedData)
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const notes = readNotesFromSheet();
    const responsePayload = JSON.stringify({
      success: true,
      count: notes.length,
      notes: notes,
      timestamp: new Date().toISOString()
    });
    
    try {
      cache.put(CACHE_KEY, responsePayload, CACHE_TTL_SECONDS);
    } catch (e) {}
    
    return ContentService.createTextOutput(responsePayload)
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message,
      notes: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let hasLock = false;
  try {
    hasLock = lock.tryLock(5000);
  } catch (err) {}

  try {
    const sheet = getOrCreateSheet();
    let body = {};
    if (e && e.postData && e.postData.contents) {
      try { body = JSON.parse(e.postData.contents); } catch (err) { body = e.parameter || {}; }
    } else if (e && e.parameter) {
      body = e.parameter;
    }
    const action = body.action || "create";
    
    if (action === "create" || action === "createNote") {
      const note = body.note || body;
      const noteId = note.id || "user-note-" + new Date().getTime();
      sheet.insertRowBefore(2);
      sheet.getRange(2, 1, 1, 13).setValues([[
        noteId, note.author || "Anonymous", note.aliasBadge || "🕷️ Web Visitor",
        note.category || "feedback", note.colorId || "crimson", note.title || "Spider Message",
        note.message || "", note.timestamp || "Just now", JSON.stringify(note.reactions || { web: 1, love: 1, zap: 1, fire: 1 }),
        Number(note.rotation) || 0, note.isPinned ? "TRUE" : "FALSE", "active", new Date().toISOString()
      ]]);
      
      try {
        CacheService.getScriptCache().remove(CACHE_KEY);
      } catch (e) {}
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Saved",
        noteId
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === "react" || action === "reaction") {
      const noteId = body.noteId;
      const reactionKey = body.reactionKey;
      const isAdding = body.isAdding !== false;
      const data = sheet.getDataRange().getValues();
      let foundRow = -1;
      let updatedReactions = null;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(noteId)) {
          foundRow = i + 1;
          let rx = { web: 1, love: 1, zap: 1, fire: 1 };
          try { if (data[i][8]) rx = typeof data[i][8] === "string" ? JSON.parse(data[i][8]) : data[i][8]; } catch (e) {}
          rx[reactionKey] = isAdding ? (Number(rx[reactionKey]) || 0) + 1 : Math.max(0, (Number(rx[reactionKey]) || 0) - 1);
          updatedReactions = rx;
          sheet.getRange(foundRow, 9).setValue(JSON.stringify(rx));
          break;
        }
      }
      
      try {
        CacheService.getScriptCache().remove(CACHE_KEY);
      } catch (e) {}
      
      return ContentService.createTextOutput(JSON.stringify({
        success: foundRow !== -1,
        reactions: updatedReactions
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Unknown action" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (hasLock) {
      try { lock.releaseLock(); } catch (e) {}
    }
  }
}
