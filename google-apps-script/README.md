# 🕷️ Panduan Pasang Google Apps Script untuk Sticky Notes Spider-Man

Dengan panduan ini, Sticky Notes di web portofolio Spider-Man Anda akan **terkoneksi langsung ke Google Sheets secara gratis, realtime, dan bisa dilihat oleh semua orang dari seluruh dunia (HP, Laptop, PC)**!

---

## 🚀 Langkah 1: Buka Google Sheets Baru
1. Buka [Google Sheets (sheets.new)](https://sheets.new) di browser Anda.
2. Beri nama spreadsheet, misalnya: **`Spider-Man Community Notes DB`**.

---

## 📝 Langkah 2: Buka Apps Script & Tempel Kode
1. Di menu Google Sheets, klik **Ekstensi (*Extensions*)** $\rightarrow$ pilih **Apps Script**.
2. Hapus semua kode default di dalam `Code.gs`.
3. Buka file [`google-apps-script/Code.gs`](./Code.gs) di project ini, salin (**Copy**) seluruh isinya dan tempel (**Paste**) ke editor Apps Script.
4. Klik ikon **Simpan (*Save*)** 💾 (atau tekan `Ctrl + S`).

---

## 🌐 Langkah 3: Deploy sebagai Web App
1. Di pojok kanan atas Apps Script, klik tombol biru **Deploy (Terapkan)** $\rightarrow$ pilih **New deployment (Penerapan baru)**.
2. Klik ikon gear ⚙️ di samping *Select type* $\rightarrow$ pilih **Web app**.
3. Isi konfigurasinya seperti berikut (**PENTING!**):
   - **Description:** `Spider-Man Sticky Notes API v1`
   - **Execute as (Jalankan sebagai):** `Me (email-anda@gmail.com)`
   - **Who has access (Siapa yang memiliki akses):** `Anyone (Siapa saja)`  *(Wajib 'Anyone' agar pengunjung web bisa baca & tulis catatan tanpa harus login Google)*.
4. Klik **Deploy**.
5. Jika muncul permintaan izin (*Authorize access*), klik **Authorize access** $\rightarrow$ pilih akun Google Anda $\rightarrow$ klik **Advanced** $\rightarrow$ klik **Go to Spider-Man (unsafe)** $\rightarrow$ klik **Allow**.
6. Salin **Web App URL** yang diberikan (berformat `https://script.google.com/macros/s/AKfycb.../exec`).

---

## ⚡ Langkah 4: Masukkan URL ke Portofolio
1. Buka file `.env` di root folder portofolio (atau buat file `.env` baru).
2. Tambahkan baris berikut:
   ```env
   VITE_APPSCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
   *(Ganti dengan URL Web App milik Anda yang disalin pada Langkah 3).*
3. Jalankan `npm run dev` atau deploy ulang ke Vercel / Netlify / GitHub Pages.

---

## 🎉 Selesai!
- Buka website portofolio Anda.
- Tulis sticky note baru dari HP atau Laptop lain $\rightarrow$ Catatan akan langsung muncul di web dan tersimpan rapi di Google Sheets Anda!
- Anda bisa membuka Google Sheets kapan saja untuk melihat, memoderasi, atau menghapus pesan spam secara langsung.
