# 🕷️ Master Guide: Google Sheets + Google Apps Script Serverless Database

> **Dokumentasi Lengkap, Arsitektur, Template Kode, dan SOP Deployment.**  
> Panduan standar untuk membangun database *real-time*, gratis selamanya (*no-cost*), tanpa server backend, menggunakan Google Sheets yang tersimpan aman di Google Drive pribadi Anda.

---

## 📑 Daftar Isi
1. [🌟 1. Arsitektur & Cara Kerja](#-1-arsitektur--cara-kerja)
2. [⚡ 2. Master Kode Google Apps Script (`Code.gs`)](#-2-master-kode-google-apps-script-codegs)
3. [💻 3. Master Frontend Service (`stickyNotesService.js` / `databaseService.js`)](#-3-master-frontend-service-stickynotesservicejs--databaseservicejs)
4. [🚀 4. SOP Step-by-Step Deployment Google Apps Script](#-4-sop-step-by-step-deployment-google-apps-script)
5. [🔄 5. SOP Cara Update Kode ke Versi Baru](#-5-sop-cara-update-kode-ke-versi-baru)
6. [🛠️ 6. Troubleshooting & Solusi 5 Masalah Klasik Google Apps Script](#️-6-troubleshooting--solusi-5-masalah-klasik-google-apps-script)

---

## 🌟 1. Arsitektur & Cara Kerja

Sistem ini mengubah **Google Sheets** menjadi **REST API NoSQL/Tabular Database** berkecepatan tinggi dengan memanfaatkan **RAM Cache (`CacheService`)** internal Google.

```mermaid
graph TD
    UserClient[📱 Pengunjung Web / HP / Laptop] -->|1. GET / POST Request| GAS[⚡ Google Apps Script Web App Endpoint]
    
    subgraph Google Cloud Architecture
        GAS -->|Cek Memori RAM 5s| Cache[🚀 CacheService RAM Cache]
        Cache -->|Jika Cache Tersedia (~50ms)| InstantReturn[⚡ Respon JSON Instan]
        
        GAS -->|Jika Data Baru / Cache Miss| Lock[🔒 LockService Anti-Tabrakan]
        Lock -->|Tulis / Baca Baris| GS[📊 Google Spreadsheet]
        GS -->|Tersimpan Otomatis di| GDrive[📁 Google Drive Pribadi Anda]
    end
    
    InstantReturn --> UserClient
```

### Keunggulan Utama:
- 💰 **100% Gratis Selamanya:** Tidak membutuhkan sewa VPS, database server, atau langganan cloud berbayar.
- 📁 **Data Milik Anda Sendiri:** File tersimpan rapi di Google Drive akun Anda, dapat diedit, difilter, atau diekspor ke Excel kapan saja.
- ⚡ **Ultra Fast (~50ms):** Dengan **Micro-Cache 5 Detik**, web tidak akan pernah terkena error batasan simultan Google (*"Terlalu banyak penjalanan skrip simultan"*).

---

## ⚡ 2. Master Kode Google Apps Script (`Code.gs`)

Salin dan gunakan template kode ini di editor Google Apps Script:

```javascript
// =========================================================================
// 🚀 MASTER GOOGLE APPS SCRIPT - SERVERLESS DATABASE & REST API
// =========================================================================

const SHEET_NAME = "SpiderNotes"; // Ganti dengan nama Sheet tab Anda
const CACHE_KEY = "app_db_cache_v1";
const CACHE_TTL_SECONDS = 5; // 5 Detik Micro-Cache (Ultra Real-Time + Anti Limit)

/**
 * Otomatis mengambil sheet atau membuatnya jika belum ada
 */
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
    
    // Styling Header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#e50914");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

/**
 * Membaca data langsung dari Spreadsheet ke format Array JSON
 */
function readNotesFromSheet() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

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

/**
 * GET Handler - Dilengkapi CacheService RAM (Super Cepat)
 */
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

/**
 * POST Handler - Menulis data baru ke Spreadsheet
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  let hasLock = false;
  try {
    hasLock = lock.tryLock(5000); // 5 Detik Max Lock
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
    
    // 1. TAMBAH DATA BARU
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
      
      // Invalidate Cache Segera
      try { CacheService.getScriptCache().remove(CACHE_KEY); } catch (e) {}
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Saved",
        noteId
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 2. UPDATE REAKSI
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
      
      try { CacheService.getScriptCache().remove(CACHE_KEY); } catch (e) {}
      
      return ContentService.createTextOutput(JSON.stringify({
        success: foundRow !== -1,
        reactions: updatedReactions
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 3. SOFT DELETE
    if (action === "delete" || action === "deleteNote") {
      const noteId = body.noteId;
      const data = sheet.getDataRange().getValues();
      let deleted = false;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(noteId)) {
          sheet.getRange(i + 1, 12).setValue("deleted");
          deleted = true;
          break;
        }
      }
      try { CacheService.getScriptCache().remove(CACHE_KEY); } catch (e) {}
      return ContentService.createTextOutput(JSON.stringify({ success: deleted })).setMimeType(ContentService.MimeType.JSON);
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
```

---

## 💻 3. Master Frontend Service (`stickyNotesService.js` / `databaseService.js`)

Implementasi di sisi client (React / Next.js / Vite / Vanilla JS):

```javascript
/**
 * 🕷️ Client Service untuk Sinkronisasi Multi-Device & Mobile
 */

const GOOGLE_APPSCRIPT_URL = "https://script.google.com/macros/s/<YOUR_DEPLOYMENT_ID>/exec";
const STORAGE_KEY = "app_database_cache_v1";

// Listener untuk broadcast update realtime antar komponen
const listeners = new Set();

export function notifyListeners(data) {
  listeners.forEach((cb) => {
    try { cb(data); } catch (e) {}
  });
}

/**
 * 1. Mengambil data dari Google Sheets (GET)
 */
export async function fetchCloudData() {
  if (!GOOGLE_APPSCRIPT_URL) return getLocalFallback();

  try {
    const response = await fetch(`${GOOGLE_APPSCRIPT_URL}?t=${Date.now()}`, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();

    if (result && result.success && Array.isArray(result.notes)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result.notes));
      } catch (e) {}
      return result.notes;
    }
    return getLocalFallback();
  } catch (err) {
    console.info("Fallback ke data lokal:", err.message);
    return getLocalFallback();
  }
}

/**
 * 2. Mengirim data baru ke Google Sheets (POST) dengan Auto-Retry Mobile
 */
export async function createCloudData(newItem) {
  saveLocally(newItem);

  const payload = JSON.stringify({
    action: "createNote",
    note: newItem,
  });

  const sendPost = async () => {
    return await fetch(GOOGLE_APPSCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      cache: "no-cache",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: payload,
    });
  };

  try {
    await sendPost();
    setTimeout(async () => {
      const fresh = await fetchCloudData();
      if (Array.isArray(fresh)) notifyListeners(fresh);
    }, 600);
    return true;
  } catch (err) {
    console.warn("Retrying kirim data...", err.message);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      await sendPost();
      setTimeout(async () => {
        const fresh = await fetchCloudData();
        if (Array.isArray(fresh)) notifyListeners(fresh);
      }, 600);
      return true;
    } catch (retryErr) {
      return false;
    }
  }
}

/**
 * 3. Polling Realtime Pintar (Hemat Baterai HP)
 */
export function subscribeToData(onUpdate, intervalMs = 6000) {
  let isMounted = true;
  let lastHash = "";
  let isSyncing = false;

  listeners.add(onUpdate);

  const sync = async () => {
    if (!isMounted || isSyncing || document.hidden) return;
    isSyncing = true;
    try {
      const data = await fetchCloudData();
      if (!isMounted || !Array.isArray(data)) return;

      const currentHash = JSON.stringify(data.map((d) => `${d.id}_${JSON.stringify(d.reactions)}`));
      if (currentHash !== lastHash) {
        lastHash = currentHash;
        onUpdate(data);
      }
    } finally {
      isSyncing = false;
    }
  };

  sync(); // Panggilan pertama
  const intervalId = setInterval(sync, intervalMs);

  const onWakeup = () => { if (!document.hidden) sync(); };
  window.addEventListener("focus", onWakeup);
  window.addEventListener("visibilitychange", onWakeup);
  window.addEventListener("online", onWakeup);

  return () => {
    isMounted = false;
    listeners.delete(onUpdate);
    clearInterval(intervalId);
    window.removeEventListener("focus", onWakeup);
    window.removeEventListener("visibilitychange", onWakeup);
    window.removeEventListener("online", onWakeup);
  };
}

function getLocalFallback() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function saveLocally(item) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...parsed.filter((p) => p.id !== item.id)]));
  } catch (e) {}
}
```

---

## 🚀 4. SOP Step-by-Step Deployment Google Apps Script

Ikuti langkah-langkah ini setiap kali membuat web app baru:

1. **Buat Spreadsheet Baru:**
   - Buka [Google Sheets](https://sheets.google.com) $\rightarrow$ Buat spreadsheet kosong baru.
   - Beri nama spreadsheet (misal: *Spider-Man Database*).
2. **Buka Editor Script:**
   - Di menu atas Google Sheets, klik **Ekstensi (*Extensions*)** $\rightarrow$ **Apps Script**.
3. **Tempel Kode Backend:**
   - Hapus fungsi default di file `Code.gs`.
   - Tempel kode dari Bagian 2 di atas $\rightarrow$ Tekan **`CTRL + S`** (Simpan).
4. **Lakukan Deployment Pertama:**
   - Klik tombol biru **Deploy (Terapkan)** di pojok kanan atas $\rightarrow$ Pilih **New deployment (Penerapan baru)**.
   - Klik ikon gerigi (Settings) di kiri atas $\rightarrow$ Pilih **Web app (Aplikasi web)**.
   - **Wajib Atur:**
     - **Execute as (Jalankan sebagai):** `Me / Saya (email@gmail.com)`
     - **Who has access (Yang memiliki akses):** `Anyone / Siapa saja` *(PENTING: Jangan pilih "Only myself" agar pengunjung web bisa kirim data!)*
   - Klik **Deploy** $\rightarrow$ Berikan izin akses Google (*Authorize Access*).
5. **Salin Web App URL:**
   - Salin URL Web App yang berakhiran `/exec`:  
     `https://script.google.com/macros/s/AKfycb.../exec`
   - Masukkan URL ini ke file `.env` atau service frontend website Anda!

---

## 🔄 5. SOP Cara Update Kode ke Versi Baru

> ⚠️ **ATURAN MUTLAK GOOGLE APPS SCRIPT:**  
> Jika Anda mengubah kode di Apps Script, URL Web App **TIDAK AKAN BERUBAH** asalkan Anda melakukan langkah ini dengan benar:

1. Edit/Perbarui kode di tab Google Apps Script $\rightarrow$ Tekan **`CTRL + S`** (Simpan).
2. Klik tombol **Deploy (Terapkan)** di kanan atas $\rightarrow$ Pilih **Manage deployments (Kelola penerapan)**.
3. Klik ikon **Pensil (Edit)** pada deployment yang aktif.
4. Pada dropdown **Version (Versi)**, pilih **New version (Versi baru)**.
5. Klik tombol **Deploy (Terapkan)**.

---

## 🛠️ 6. Troubleshooting & Solusi 5 Masalah Klasik Google Apps Script

### 1. Error: *"Terlalu banyak penjalanan skrip simultan: Spreadsheet"*
- **Penyebab:** Banyak request `GET` membuka spreadsheet bersamaan tanpa cache.
- **Solusi:** Gunakan `CacheService.getScriptCache()` dengan micro-cache 5 detik seperti pada template di atas.

### 2. Error: *CORS Policy / Preflight Failed*
- **Penyebab:** Frontend mengirim `headers: { 'Content-Type': 'application/json' }` yang memicu preflight `OPTIONS` HTTP request (Google Apps Script tidak mendukung `OPTIONS`).
- **Solusi:** Gunakan `headers: { 'Content-Type': 'text/plain;charset=utf-8' }` dan body `JSON.stringify(data)`. Apps Script otomatis membaca JSON tersebut via `e.postData.contents`.

### 3. Error: *Data di HP tidak sinkron dengan Laptop*
- **Penyebab:** Form submit di HP tertutup sebelum Promise `fetch` selesai.
- **Solusi:** Pasang `await createCloudData(item)` dan tambahkan status tombol `"MENYIMPAN KE SERVER..."` yang di-disable selama proses kirim.

### 4. Masalah: *Catatan baru butuh waktu lama untuk muncul*
- **Penyebab:** TTL RAM Cache terlalu lama (misal 2 menit).
- **Solusi:** Gunakan micro-cache 5 detik (`CACHE_TTL_SECONDS = 5`) dan panggil `CacheService.getScriptCache().remove(CACHE_KEY)` di dalam fungsi `doPost`.

### 5. Masalah: *Baterai HP cepat habis / Kuota boros saat web dibuka lama*
- **Penyebab:** Polling berjalan terus menerus di latar belakang meskipun tab HP di-minimize.
- **Solusi:** Gunakan event listener `visibilitychange` dan `document.hidden` untuk menghentikan polling saat tab tidak aktif.

---

*Dokumentasi ini dibuat oleh Vinss Dev / Antigravity Engineering Protocol untuk ekosistem web modern.*
