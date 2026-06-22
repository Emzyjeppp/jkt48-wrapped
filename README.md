# 🔴 JKT48 Wrapped — Your Year as Wota

Aplikasi web interaktif fanmade bergaya **Spotify Wrapped** bagi para penggemar JKT48 (Wota) untuk merangkum dan memvisualisasikan perjalanan ng-oshi mereka sepanjang tahun (riwayat apply teater, winrate teater, tiket video call, event, dan 2-shot).

Dibangun secara premium menggunakan **React 19 + TypeScript + Vite + Tailwind CSS v4** dan diiringi musik instrumental piano ceria khas lagu JKT48 yang dihasilkan dinamis menggunakan **Web Audio API**!

---

## ✨ Fitur Utama

- 📝 **Dual Mode Input**:
  - **Isian Mandiri (Form Kuesioner)**: Masukkan nama, nama oshi, tanggal jadi wota, winrate teater, dan data tiket secara manual.
  - **JSON Data Parser**: Tempel/unggah data JSON hasil riwayat transaksi dari ekstensi browser JKT48 Wrapped untuk pengisian data otomatis secara instan.
- 🎭 **5 Slide Interaktif Wrapped**:
  - **Slide 1: Intro** – Sambutan fans dengan status ng-oshi Anda.
  - **Slide 2: Pejuang Teater** – Menampilkan winrate apply teater, jumlah menang/kalah tiket teater, dan setlist teratas.
  - **Slide 3: Teman Bicara** – Peringkat member yang paling banyak diajak video call / handshake beserta jumlah tiketnya.
  - **Slide 4: Event & Top-up** – Catatan event terbaru yang dihadiri dan jumlah top-up poin.
  - **Slide 5: Wota Persona** – Penentuan gelar kepribadian fans secara otomatis (e.g. *Theater Legend*, *DD/Daredemo Daisuki*, *Layar Kaca Warrior*, *Lucky Fan*).
- 💾 **Download Poster HD (No Black Borders)**: Rangkuman Wrapped dibungkus dalam frame poster bertema JKT48 padat dan bersih. Unduh dalam resolusi tinggi (3x pixel ratio) yang siap dibagikan ke media sosial.
- 🎵 **Interactive JKT48 Synth Bells**: Dilengkapi dengan instrumen intro lagu ceria JKT48 yang dimainkan secara lo-fi menggunakan Web Audio API.

---

## 🛠️ Stack Teknologi

- **Framework**: React 19 & TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (merah-pink neon panggung konser)
- **Ekspor Gambar**: `html-to-image` (pixelRatio: 3 untuk kualitas HD)
- **Audio**: Web Audio API (Synthesizer Oscillator internal chord F - G - Em - Am)

---

## 🚀 Memulai Proyek

### Jalankan secara Lokal
1. Klon repositori ini atau masuk ke folder proyek:
   ```bash
   cd jkt48-wrapped
   ```
2. Instal semua dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembang lokal:
   ```bash
   npm run dev
   ```
4. Buka tautan lokal di browser Anda (biasanya `http://localhost:5173`).

### Build untuk Produksi
Gunakan perintah berikut untuk mengompilasi aplikasi:
```bash
npm run build
```

---

## 🌐 Deploy ke GitHub Pages

Proyek ini telah dikonfigurasi menggunakan relative paths (`base: "./"`), sehingga siap dihosting di subfolder repositori GitHub Anda.

1. Buat repositori baru di GitHub dengan nama: `jkt48-wrapped`.
2. Hubungkan git lokal dan push kode Anda ke GitHub:
   ```bash
   git remote add origin https://github.com/username/jkt48-wrapped.git
   git push -u origin main
   ```
3. Aktifkan **GitHub Pages** di tab `Settings -> Pages` repositori Anda. Ubah **Source** ke **GitHub Actions** untuk membiarkan script CI/CD otomatis membangun dan merilis situs web Anda.
