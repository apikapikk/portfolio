# Dokumentasi Portfolio Alfan

Portfolio ini adalah single-page presentation berbasis React + Vite dengan viewport tetap. Halaman tidak berpindah secara vertikal; scroll mouse, trackpad, keyboard, atau tombol indikator digunakan untuk mengganti scene.

## Konsep visual

- Satu viewport penuh menggunakan `100svh` dan `overflow-hidden`.
- Desain berbasis shape: gelombang laut, siluet gunung, city grid, skyline, orbit, path SVG, dan objek langit.
- Setiap scene memiliki suasana warna berbeda: laut/pagi, gunung/sore, city/siang, dan malam/neon.
- Background melakukan crossfade antar-suasana, bukan ikut bergeser.
- Satu objek langit global berpindah posisi antar-scene sehingga tidak muncul bulan/matahari ganda.
- Komponen portfolio masuk dan keluar secara horizontal seperti panel yang melintas.
- Teks heading memakai `mix-blend-difference` agar tetap kontras terhadap background.

## Scene yang tersedia

Portfolio memiliki delapan scene:

1. **Tide** — profil, bio, lokasi, dan fokus teknologi.
2. **Foundation** — pendidikan, GPA, fakultas, dan area relevan.
3. **Altitude** — pengalaman internship DISKOMINFO dan teaching practicum.
4. **Summit** — C Systems Programming, low-level learning, dan eksplorasi Go/Linux.
5. **Orbit** — AMARTA, Scriptoria, C Learning, Linux Dotfiles, dan Recipe App.
6. **Toolkit** — seluruh kelompok skill programming, web/mobile, data/tools, dan people skills.
7. **Signal** — seluruh sertifikasi beserta issuer, tanggal, dan credential ID.
8. **Night line** — email, GitHub, LinkedIn, dan ajakan kolaborasi.

## Kontrol transisi

- Scroll ke bawah / `ArrowDown` / `PageDown` / `ArrowRight`: scene berikutnya.
- Scroll ke atas / `ArrowUp` / `PageUp` / `ArrowLeft`: scene sebelumnya.
- Tombol indikator di footer: melompat ke scene tertentu.
- Tombol `Next` berubah menjadi `Restart` pada scene terakhir.
- Scroll halaman dikunci agar viewport tidak bergerak.
- Transisi diberi lock singkat untuk mencegah satu gesture trackpad melewati banyak scene.

## Sumber data portfolio

Seluruh konten resume berada di [src/data/portfolio.json](src/data/portfolio.json), bukan ditulis ulang di komponen visual. Isinya mencakup:

- Profil, kontak, lokasi, role, bio, phone, GitHub, dan LinkedIn.
- Pendidikan UNESA, periode, GPA, fakultas, dan relevant areas.
- Pengalaman Full Stack Developer Intern di DISKOMINFO Kota Blitar.
- Teaching Practicum di program Computer and Network Engineering.
- Semua project: AMARTA, Scriptoria, C Systems Programming Learning, Linux Dotfiles & Hyprland, dan Recipe App.
- Teknologi dan detail kontribusi setiap project.
- Skill programming, web/mobile, database/tools, design, dan soft skills.
- Sertifikasi Hacktiv8, IBM SkillsBuild, IBM, dan AWS beserta credential ID.

Resume sumber disimpan sebagai [resume.txt](resume.txt). Jika resume berubah, perbarui JSON lalu sesuaikan scene bila ada field baru yang perlu ditampilkan.

## Struktur file penting

```text
portfolio/
├── resume.txt
├── src/
│   ├── app/
│   │   └── App.tsx              # scene, transisi, backdrop, dan rendering data
│   ├── data/
│   │   └── portfolio.json       # sumber data portfolio
│   ├── styles/
│   │   ├── fonts.css            # font Google
│   │   ├── index.css             # entry stylesheet
│   │   ├── tailwind.css          # Tailwind v4
│   │   └── theme.css             # token warna dan global viewport rules
│   └── main.tsx
├── DOCUMENTATION.md
└── README.md
```

## Responsif dan performa mobile

- Konten mobile dimulai sedikit dari atas dengan bias center agar tidak menabrak footer.
- Education, experience, work, skills, dan certification menggunakan grid compact di layar kecil.
- Card memakai background gelap semi-solid dan backdrop blur untuk memisahkan teks dari visual background.
- Path SVG dekoratif disembunyikan di mobile untuk mengurangi beban animasi.
- Durasi transisi mobile lebih singkat.
- Objek langit tetap berada di layer background dan tidak menimpa teks.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
```

Build terakhir tervalidasi berhasil menggunakan Vite tanpa error.
