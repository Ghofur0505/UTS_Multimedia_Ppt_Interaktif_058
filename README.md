# Teori Warna untuk Desain Digital — Presentasi Interaktif

Presentasi web interaktif tentang teori warna, psikologi warna, dan aksesibilitas warna untuk desain digital. Dibuat untuk **UTS Multimedia (Opsi 1: Presentasi Interaktif)** dengan HTML, CSS, dan JavaScript murni.

- **Live presentation:** `ISI_LINK_GITHUB_PAGES_ATAU_VERCEL`
- **Repository:** `ISI_LINK_REPOSITORY_GITHUB`

## Identitas

| | |
|---|---|
| Nama | Muhammad Aiunun Ghofur |
| NPM | 1412240058 |
| Kelas | TIF 2024 C |

## Deskripsi Project

Presentasi ini ditujukan untuk siswa dan mahasiswa bidang desain. Isinya membantu memahami cara warna bekerja: dari roda warna dan model warna digital (RGB, HSL, HEX), harmoni dan psikologi warna, sampai cara memilih warna yang efektif, inklusif, dan sesuai konteks pengguna. Tampilannya memakai tema gelap bergaya neon dengan kartu kaca, latar kisi bergerak, dan aksen warna yang berbeda di setiap slide.

## Topik yang Dibahas (14 Slide)

| No | Slide |
|---|---|
| 1 | Judul dan identitas |
| 2 | Tujuan dan agenda |
| 3 | Roda warna (primer, sekunder, tersier) |
| 4 | **Interaktif:** model warna HSL, HEX, dan RGB |
| 5 | **Interaktif:** harmoni warna |
| 6 | Psikologi warna |
| 7 | Studi kasus 1: Shopee vs Tokopedia |
| 8 | Studi kasus 2: 41 corak biru Google |
| 9 | Studi kasus 3: platform streaming |
| 10 | Aksesibilitas: kontras WCAG dan buta warna |
| 11 | Lakukan dan hindari |
| 12 | Video pembelajaran |
| 13 | **Interaktif:** kuis 7 soal dengan pencapaian |
| 14 | Kesimpulan dan sumber |

## Fitur

- Navigasi dengan tombol, keyboard (← → Spasi, Home, End), dan nomor slide di URL (misalnya `#5`)
- Slider HSL dengan pratinjau warna serta keluaran HEX dan RGB secara langsung
- Pemilih harmoni warna yang dihitung dari sudut hue (komplementer, analogus, triadik, tetradik, monokromatik)
- Kuis 7 soal dengan urutan pilihan diacak, penjelasan jawaban, rekap, rekor terbaik, dan gelar pencapaian
- Slide video pembelajaran (YouTube mode privasi atau file lokal)
- Animasi CSS: kartu warna melayang, roda warna berputar, 41 corak biru berkilau, equalizer, dan latar yang mengikuti kursor
- Tampilan responsif, dukungan fokus keyboard, dan penghormatan terhadap pengaturan "kurangi gerakan"

## Cara Membuka / Menjalankan

**Online:** buka link live di atas.

**Lokal:**

1. Unduh atau clone repository ini.
2. Pastikan `index.html`, `style.css`, dan `script.js` berada dalam satu folder.
3. Buka `index.html` di browser, atau jalankan dengan ekstensi **Live Server** di VS Code.

```bash
git clone ISI_LINK_REPOSITORY_GITHUB
cd NAMA_FOLDER
# lalu buka index.html di browser
```

**Mengisi video:** buka `script.js`, cari objek `VIDEO`, lalu isi `url` dengan link YouTube atau path file (misalnya `video/teori-warna.mp4`).

## Struktur Folder

```
.
├── index.html     # struktur 14 slide
├── style.css      # tema dark neon dan animasi
├── script.js      # navigasi, slider HSL, harmoni, video, kuis, efek tambahan
├── README.md
└── screenshots/   # tangkapan layar slide
```

## Teknologi

HTML5, CSS3, dan JavaScript murni tanpa framework. Sumber daya luar hanya font Google Fonts (Plus Jakarta Sans, dengan cadangan font sistem) dan video YouTube bila link diisi.

## Screenshot

![Slide judul](screenshots/slide-1.png)
![Model warna interaktif](screenshots/slide-4.png)
![Studi kasus Google](screenshots/slide-8.png)
![Kuis](screenshots/slide-13.png)

## Referensi

1. W3C. *Understanding Success Criterion 1.4.3: Contrast (Minimum)*. Web Content Accessibility Guidelines (WCAG). https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html (diakses 23 November 2026)
2. Colour Blind Awareness. *What is colour blindness?* https://www.colourblindawareness.org/colour-blindness/ (diakses 23 November 2026)
3. Elliot, A. J., & Maier, M. A. (2014). Color psychology: Effects of perceiving color on psychological functioning in humans. *Annual Review of Psychology, 65*, 95–120. https://doi.org/10.1146/annurev-psych-010213-115035
4. Elliot, A. J. (2015). Color and psychological functioning: a review of theoretical and empirical work. *Frontiers in Psychology, 6*, 368. https://doi.org/10.3389/fpsyg.2015.00368
5. Fortune. (2009, 21 Maret). *Are Google's nerds destroying design?* https://fortune.com/2009/03/21/are-googles-nerds-destroying-design/
6. MIT Technology Review. (2014, 22 Januari). *Seeking edge, websites turn to experiments.* https://www.technologyreview.com/2014/01/22/174479/seeking-edge-websites-turn-to-experiments/

**Alat bantu yang direkomendasikan:** [Adobe Color](https://color.adobe.com), [Coolors](https://coolors.co), [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/).

## Catatan

- Warna Shopee, Tokopedia, dan Netflix di slide adalah warna identitas merek untuk tujuan edukasi, bukan contoh yang lulus kontras AA.
- Kasus "41 corak biru" mengikuti pengakuan desainer Google; Google menyebut ceritanya tidak sepenuhnya akurat.
- Seluruh kode ditulis sendiri untuk tugas ini.