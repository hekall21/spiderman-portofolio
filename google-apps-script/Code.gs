/**
 * =========================================================================
 * 🕷️ SPIDER-MAN PORTFOLIO - COMMUNITY STICKY NOTES GOOGLE APPS SCRIPT BACKEND
 * =========================================================================
 * Database: Google Sheets (Gratis, Live, Realtime Multi-User & Multi-Device)
 * 
 * Fitur:
 * 1. Otomatis membuat Sheet "SpiderNotes" + Headers + Data default jika belum ada.
 * 2. doGet: Mengambil seluruh sticky notes komunitas dari Google Sheets ke JSON.
 * 3. doPost: Menyimpan sticky note baru dan update reaksi (Web, Love, Zap, Fire)
 *    dengan LockService agar bebas dari race condition / tabrakan data.
 * 4. Moderator-friendly: Anda bisa buka Google Spreadsheet kapan saja untuk
 *    mengedit atau menghapus komentar langsung dari HP atau Laptop!
 * =========================================================================
 */

const SHEET_NAME = "SpiderNotes";

// Catatan awal Spider-Verse jika sheet baru dibuat
const INITIAL_SEEDED_NOTES = [
  {
    id: "spidey-note-1",
    author: "Miles Morales",
    aliasBadge: "⚡ Brooklyn Visionary (Earth-1610)",
    category: "lore",
    colorId: "crimson",
    title: "Crazy Good Spider-Sense UI!",
    message: "That Sunflower vinyl player and the precision coordinate HUD are straight out of the Spider-Verse! Keep swinging high, Haikel! 🕷️🔥",
    timestamp: "2 hours ago",
    reactions: JSON.stringify({ web: 24, love: 18, zap: 31, fire: 42 }),
    rotation: -1.8,
    isPinned: true,
    status: "active"
  },
  {
    id: "spidey-note-2",
    author: "Gwen Stacy",
    aliasBadge: "🥁 Ghost-Spider (Earth-65)",
    category: "collab",
    colorId: "gwen-teal",
    title: "Awesome Audio & Tech Skills",
    message: "Love the rhythm and smooth 60fps kinetic animations on mobile. Let's collaborate on a drum & synth web visualizer soon! 🎸✨",
    timestamp: "5 hours ago",
    reactions: JSON.stringify({ web: 19, love: 28, zap: 14, fire: 22 }),
    rotation: 1.5,
    isPinned: false,
    status: "active"
  },
  {
    id: "spidey-note-3",
    author: "Peter Parker",
    aliasBadge: "🕸️ Friendly Neighborhood (Earth-616)",
    category: "feedback",
    colorId: "cyan-2099",
    title: "Clean Architecture & Great Responsibility",
    message: "With great coding skills comes great responsibility. The BNSP Certified Network & Software stack is rock-solid. Proud of you!",
    timestamp: "1 day ago",
    reactions: JSON.stringify({ web: 45, love: 36, zap: 29, fire: 50 }),
    rotation: -2.2,
    isPinned: false,
    status: "active"
  },
  {
    id: "spidey-note-4",
    author: "Miguel O'Hara",
    aliasBadge: "🛡️ Spider-Man 2099 (Earth-928)",
    category: "mission",
    colorId: "symbiote-purple",
    title: "Multiverse Protocol Verified",
    message: "Telemetry scan complete. Zero layout shifts, high-speed Vite build, and flawless responsive viewport. Protocol approved. 🌐",
    timestamp: "2 days ago",
    reactions: JSON.stringify({ web: 32, love: 15, zap: 41, fire: 27 }),
    rotation: 2.0,
    isPinned: false,
    status: "active"
  },
  {
    id: "spidey-note-5",
    author: "Ned Leeds",
    aliasBadge: "💻 Guy In The Chair",
    category: "cheer",
    colorId: "electric-yellow",
    title: "The Terminal Boot is LEGENDARY!",
    message: "Dude, that BIOS terminal boot sequence at the start blew my mind! You're officially the guy in the chair for our tech squad! 🚀",
    timestamp: "3 days ago",
    reactions: JSON.stringify({ web: 52, love: 44, zap: 38, fire: 63 }),
    rotation: -1.2,
    isPinned: false,
    status: "active"
  }
];

/**
 * Mendapatkan sheet "SpiderNotes", atau membuatnya otomatis jika belum ada
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      "ID",
      "Author",
      "AliasBadge",
      "Category",
      "ColorId",
      "Title",
      "Message",
      "Timestamp",
      "ReactionsJson",
      "Rotation",
      "IsPinned",
      "Status",
      "CreatedAt"
    ];
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    
    // Format Header Baris Pertama
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#e50914");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    
    // Seed initial notes
    INITIAL_SEEDED_NOTES.forEach(function(note) {
      sheet.appendRow([
        note.id,
        note.author,
        note.aliasBadge,
        note.category,
        note.colorId,
        note.title,
        note.message,
        note.timestamp,
        note.reactions,
        note.rotation,
        note.isPinned ? "TRUE" : "FALSE",
        note.status,
        new Date().toISOString()
      ]);
    });
    
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

/**
 * GET Handler - Mengambil seluruh sticky notes untuk ditampilkan ke semua pengunjung
 */
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        count: 0,
        notes: []
      })).setMimeType(ContentService.MimeType.JSON);
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
      let reactions = { web: 0, love: 0, zap: 0, fire: 0 };
      
      try {
        if (row[8]) {
          reactions = typeof row[8] === "string" ? JSON.parse(row[8]) : row[8];
        }
      } catch (err) {
        reactions = { web: 1, love: 1, zap: 1, fire: 1 };
      }
      
      const rotation = Number(row[9]) || 0;
      const isPinned = String(row[10]).toUpperCase() === "TRUE";
      const status = String(row[11] || "active").toLowerCase();
      
      if (status !== "deleted" && id.trim() !== "") {
        notes.push({
          id: id,
          author: author,
          aliasBadge: aliasBadge,
          category: category,
          colorId: colorId,
          title: title,
          message: message,
          timestamp: timestamp,
          reactions: reactions,
          rotation: rotation,
          isPinned: isPinned,
          isUserCreated: !id.startsWith("spidey-note-")
        });
      }
    }
    
    // Sort: Catatan yang dipin di atas, kemudian catatan terbaru
    notes.sort(function(a, b) {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      count: notes.length,
      notes: notes
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message,
      notes: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST Handler - Menerima pembuatan sticky note baru dan update reaksi
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.tryLock(15000); // Kunci 15 detik agar tidak ada race condition saat banyak user submit bersamaan
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Server lock busy, silakan coba beberapa detik lagi."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const sheet = getOrCreateSheet();
    let body = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (err) {
        body = e.parameter || {};
      }
    } else if (e && e.parameter) {
      body = e.parameter;
    }
    
    const action = body.action || "create";
    
    // ACTION 1: BUAT CATATAN BARU
    if (action === "create" || action === "createNote") {
      const note = body.note || body;
      const noteId = note.id || "user-note-" + new Date().getTime();
      const author = note.author || "Anonymous Visitor";
      const aliasBadge = note.aliasBadge || "🕷️ Web Visitor";
      const category = note.category || "feedback";
      const colorId = note.colorId || "crimson";
      const title = note.title || "Spider Message";
      const message = note.message || "";
      const timestamp = note.timestamp || "Just now";
      const reactions = JSON.stringify(note.reactions || { web: 1, love: 1, zap: 1, fire: 1 });
      const rotation = Number(note.rotation) || ((Math.random() - 0.5) * 4);
      const isPinned = note.isPinned ? "TRUE" : "FALSE";
      const status = "active";
      const createdAt = new Date().toISOString();
      
      // Sisipkan di baris ke-2 (tepat setelah header) agar catatan terbaru selalu di atas
      sheet.insertRowBefore(2);
      sheet.getRange(2, 1, 1, 13).setValues([[
        noteId,
        author,
        aliasBadge,
        category,
        colorId,
        title,
        message,
        timestamp,
        reactions,
        rotation,
        isPinned,
        status,
        createdAt
      ]]);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Sticky note berhasil disimpan ke Google Sheets!",
        noteId: noteId
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ACTION 2: UPDATE REAKSI (Web, Love, Zap, Fire)
    if (action === "react" || action === "reaction") {
      const noteId = body.noteId;
      const reactionKey = body.reactionKey; // "web", "love", "zap", "fire"
      const isAdding = body.isAdding !== false;
      
      if (!noteId || !reactionKey) {
        throw new Error("Missing noteId or reactionKey");
      }
      
      const data = sheet.getDataRange().getValues();
      let foundRowIndex = -1;
      let updatedReactions = null;
      
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(noteId)) {
          foundRowIndex = i + 1; // Row 1-indexed di Google Sheets
          let currentReactions = { web: 0, love: 0, zap: 0, fire: 0 };
          try {
            if (data[i][8]) {
              currentReactions = typeof data[i][8] === "string" ? JSON.parse(data[i][8]) : data[i][8];
            }
          } catch (err) {}
          
          const currentCount = Number(currentReactions[reactionKey]) || 0;
          currentReactions[reactionKey] = isAdding ? currentCount + 1 : Math.max(0, currentCount - 1);
          updatedReactions = currentReactions;
          
          sheet.getRange(foundRowIndex, 9).setValue(JSON.stringify(currentReactions));
          break;
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: foundRowIndex !== -1,
        message: foundRowIndex !== -1 ? "Reaksi berhasil diperbarui" : "Note ID tidak ditemukan",
        reactions: updatedReactions
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ACTION 3: HAPUS CATATAN (Soft Delete)
    if (action === "delete" || action === "deleteNote") {
      const noteId = body.noteId;
      const data = sheet.getDataRange().getValues();
      let deleted = false;
      
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(noteId)) {
          sheet.getRange(i + 1, 12).setValue("deleted"); // Kolom 12: Status
          deleted = true;
          break;
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: deleted,
        message: deleted ? "Sticky note berhasil dihapus" : "Note ID tidak ditemukan"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Aksi tidak dikenali"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
