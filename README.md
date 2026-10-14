# Alfan — Interactive Portfolio

Portfolio satu halaman berbasis React + Vite dengan scene interaktif, background shape, object langit tunggal, dan transisi horizontal antar-komponen.

## Fitur

- Fixed viewport tanpa page scroll vertikal.
- Delapan scene: profile, education, experience, systems, work, skills, certifications, dan contact.
- Scroll/keyboard untuk mengganti scene.
- Background crossfade seperti perubahan waktu: pagi, sore, siang, malam.
- Konten scene masuk/keluar secara horizontal.
- Layout mobile compact tanpa crop pada informasi utama.
- Data portfolio terpusat di `src/data/portfolio.json`.

Lihat dokumentasi lengkap di [DOCUMENTATION.md](DOCUMENTATION.md).

## Menjalankan

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Data resume

Resume sumber berada di [resume.txt](resume.txt). Data yang digunakan aplikasi berada di [src/data/portfolio.json](src/data/portfolio.json).
