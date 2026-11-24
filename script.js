/* =============================================
   COLOR THEORY PRESENTATION — SCRIPT
   ============================================= */

// ===== Helper =====
const $ = (id) => document.getElementById(id);
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// ===== Slide Navigation =====
const slides = [...document.querySelectorAll(".slide")];
const total = slides.length;
const prevBtn = $("prevBtn");
const nextBtn = $("nextBtn");
const counter = $("counter");
const progress = $("progress");
let current = 0; // index 0-based

counter.setAttribute("aria-live", "polite");
progress.setAttribute("role", "progressbar");
progress.setAttribute("aria-label", "Kemajuan presentasi");
progress.setAttribute("aria-valuemin", "1");
progress.setAttribute("aria-valuemax", String(total));

function showSlide(index) {
  current = clamp(index, 0, total - 1);
  const atStart = current === 0;
  const atEnd = current === total - 1;

  slides.forEach((slide, i) => {
    const active = i === current;
    slide.classList.toggle("active", active);
    slide.inert = !active;
  });

  syncVideo(slides[current].id === "slideVideo");

  if (atStart && document.activeElement === prevBtn) nextBtn.focus();
  if (atEnd && document.activeElement === nextBtn) prevBtn.focus();
  prevBtn.disabled = atStart;
  nextBtn.disabled = atEnd;

  counter.textContent = `${current + 1} / ${total}`;
  progress.style.width = `${((current + 1) / total) * 100}%`;
  progress.setAttribute("aria-valuenow", String(current + 1));

  location.replace("#" + (current + 1));
}

const go = (dir) => showSlide(current + dir);

prevBtn.addEventListener("click", () => go(-1));
nextBtn.addEventListener("click", () => go(1));

document.addEventListener("keydown", (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
  if (e.target.closest("input, textarea, select, video")) return;

  switch (e.key) {
    case "ArrowRight":
    case "PageDown":
      e.preventDefault();
      go(1);
      break;
    case "ArrowLeft":
    case "PageUp":
      e.preventDefault();
      go(-1);
      break;
    case "Home":
      e.preventDefault();
      showSlide(0);
      break;
    case "End":
      e.preventDefault();
      showSlide(total - 1);
      break;
    case " ":
      if (e.target.closest("button, a")) return;
      e.preventDefault();
      go(e.shiftKey ? -1 : 1);
      break;
  }
});

// ===== Slide 4: HSL Color Picker =====
const hSlider = $("hSlider");
const sSlider = $("sSlider");
const lSlider = $("lSlider");
const hVal = $("hVal");
const sVal = $("sVal");
const lVal = $("lVal");
const colorPreview = $("colorPreview");
const hexOutput = $("hexOutput");
const rgbOutput = $("rgbOutput");

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  };
  return [f(0), f(8), f(4)];
}

const toHex = (rgb) =>
  "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");

function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

const textOn = (rgb) => (luminance(rgb) > 0.179 ? "#000" : "#fff");

function updateColor() {
  const h = hSlider.valueAsNumber;
  const s = sSlider.valueAsNumber;
  const l = lSlider.valueAsNumber;
  const rgb = hslToRgb(h, s, l);

  hVal.textContent = h;
  sVal.textContent = s;
  lVal.textContent = l;
  colorPreview.style.background = `hsl(${h}, ${s}%, ${l}%)`;
  colorPreview.style.color = textOn(rgb);
  hexOutput.textContent = "HEX: " + toHex(rgb);
  if (rgbOutput) rgbOutput.textContent = `RGB: rgb(${rgb.join(", ")})`;
}

[hSlider, sSlider, lSlider].forEach((el) =>
  el.addEventListener("input", updateColor),
);
updateColor();

// ===== Slide 5: Harmoni Warna =====
const BASE_HUE = 220;
const toHsl = (offset, s = 70, l = 55) =>
  `hsl(${(BASE_HUE + offset + 360) % 360} ${s}% ${l}%)`;

const harmonies = [
  {
    name: "Komplementer",
    swatches: [[0], [180]],
    desc: "Dua warna berseberangan (180°) pada roda warna. Kontras tinggi, cocok untuk CTA.",
  },
  {
    name: "Analogus",
    swatches: [[-30], [0], [30]],
    desc: "Warna yang bersebelahan (±30°). Harmonis dan lembut, cocok untuk identitas merek.",
  },
  {
    name: "Triadik",
    swatches: [[0], [120], [240]],
    desc: "Tiga warna berjarak 120°. Hidup dan seimbang.",
  },
  {
    name: "Tetradik",
    swatches: [[0], [90], [180], [270]],
    desc: "Empat warna berjarak 90° membentuk persegi. Kaya warna, butuh keseimbangan.",
  },
  {
    name: "Monokromatik",
    swatches: [
      [0, 70, 20],
      [0, 70, 40],
      [0, 70, 60],
      [0, 70, 90],
    ],
    desc: "Satu hue dengan variasi kecerahan. Elegan dan minimalis.",
  },
];

const harmonyPanel = $("harmonyPanel");
const harmonyDesc = $("harmonyDesc");
harmonyDesc.setAttribute("aria-live", "polite");

function selectHarmony(index) {
  [...harmonyPanel.children].forEach((el, i) =>
    el.setAttribute("aria-pressed", String(i === index)),
  );
  const { name, desc } = harmonies[index];
  harmonyDesc.textContent = `${name}: ${desc}`;
}

harmonies.forEach((h, i) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "pickable";
  btn.setAttribute("aria-pressed", "false");

  const row = document.createElement("div");
  row.className = "swatch-row";
  h.swatches.forEach(([offset, s, l]) => {
    const sw = document.createElement("div");
    sw.className = "swatch big";
    sw.style.background = toHsl(offset, s, l);
    sw.setAttribute("aria-hidden", "true");
    row.appendChild(sw);
  });

  const label = document.createElement("span");
  label.className = "harmony-name";
  label.textContent = h.name;

  btn.append(row, label);
  btn.addEventListener("click", () => selectHarmony(i));
  harmonyPanel.appendChild(btn);
});

selectHarmony(0);

const VIDEO = {
  url: "videos/teori-warna.mp4",
  title: "Video Pembelajaran Teori Warna",
  credit: "", // contoh: 'Sumber: Envato Tuts+ (YouTube)'
};

function youtubeId(url) {
  try {
    const u = new URL(url);
    let id = null;
    if (u.hostname === "youtu.be") id = u.pathname.slice(1);
    else if (/(^|\.)youtube\.com$/.test(u.hostname)) {
      id =
        u.pathname === "/watch"
          ? u.searchParams.get("v")
          : (u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{11})/) ||
              [])[1];
    }
    return /^[\w-]{11}$/.test(id || "") ? id : null;
  } catch {
    return null;
  }
}

const videoFrame = $("videoFrame");
const videoCaption = $("videoCaption");
const ytId = youtubeId(VIDEO.url);
const isFile = !ytId && /\.(mp4|webm|ogg)(\?.*)?$/i.test(VIDEO.url);

function renderVideo() {
  videoFrame.replaceChildren();

  if (ytId) {
    const poster = document.createElement("button");
    poster.type = "button";
    poster.className = "video-poster";
    poster.setAttribute("aria-label", `Putar video: ${VIDEO.title}`);
    const img = document.createElement("img");
    img.src = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    img.alt = "";
    const play = document.createElement("span");
    play.className = "video-play";
    play.setAttribute("aria-hidden", "true");
    play.textContent = "▶";
    poster.append(img, play);
    poster.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&autoplay=1`;
      iframe.title = VIDEO.title;
      iframe.allow =
        "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      videoFrame.replaceChildren(iframe);
      iframe.focus();
    });
    videoFrame.appendChild(poster);
  } else if (isFile) {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.src = VIDEO.url;
    video.setAttribute("aria-label", VIDEO.title);
    videoFrame.appendChild(video);
  } else {
    const empty = document.createElement("div");
    empty.className = "video-empty";
    empty.textContent =
      "Video belum diatur. Isi VIDEO.url di script.js dengan link YouTube atau file mp4.";
    videoFrame.appendChild(empty);
  }

  videoCaption.replaceChildren(document.createTextNode(VIDEO.title));
  if (ytId) {
    const link = document.createElement("a");
    link.href = `https://www.youtube.com/watch?v=${ytId}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Buka di YouTube ↗";
    videoCaption.append(" · ", link);
  }
  if (VIDEO.credit) videoCaption.append(` · ${VIDEO.credit}`);
}

function syncVideo(active) {
  if (!active && videoFrame.querySelector("iframe, video")) renderVideo();
}

renderVideo();

// ===== Kuis (7 soal, 1 slide) =====
const QUESTIONS = [
  {
    q: "Warna apa yang paling cocok untuk tombol CTA di latar biru gelap?",
    options: ["Biru terang", "Oranye / Kuning", "Hijau tua", "Hitam"],
    answer: 1,
    why: "Oranye/kuning adalah komplementer biru, jadi kontrasnya tinggi dan menarik perhatian.",
  },
  {
    q: "Manakah yang termasuk warna primer?",
    options: [
      "Hijau, Oranye, Ungu",
      "Merah, Biru, Kuning",
      "Merah, Hijau, Ungu",
      "Hitam, Putih, Abu-abu",
    ],
    answer: 1,
    why: "Merah, biru, dan kuning tidak bisa dibuat dari campuran warna lain.",
  },
  {
    q: "Berapa rasio kontras minimal WCAG AA untuk teks normal?",
    options: ["2:1", "3:1", "4.5:1", "21:1"],
    answer: 2,
    why: "Teks normal minimal 4.5:1. Teks besar cukup 3:1. Angka 21:1 adalah rasio maksimum (hitam di putih).",
  },
  {
    q: "HSL adalah singkatan dari…",
    options: [
      "Hue, Saturation, Lightness",
      "High, Soft, Light",
      "Hex, Shade, Luminance",
      "Hue, Shadow, Lightness",
    ],
    answer: 0,
    why: "Hue (rona), Saturation (saturasi), Lightness (kecerahan), seperti pada slider di slide 4.",
  },
  {
    q: "Harmoni warna yang memakai tiga warna berjarak 120° pada roda warna disebut…",
    options: ["Komplementer", "Analogus", "Triadik", "Monokromatik"],
    answer: 2,
    why: "Triadik: tiga warna berjarak sama (120°), hasilnya hidup dan seimbang.",
  },
  {
    q: "Mengapa status berhasil/gagal tidak boleh hanya dibedakan dengan warna?",
    options: [
      "Karena warna sulit dibuat di CSS",
      "Karena sebagian pengguna mengalami buta warna",
      "Karena warna membuat halaman lambat",
      "Karena layar tidak bisa menampilkan merah-hijau",
    ],
    answer: 1,
    why: "Sekitar 8% pria buta warna. Tambahkan ikon dan label teks di samping warna.",
  },
  {
    q: "Warna apa yang identik dengan kepercayaan dan profesionalitas (contoh: LinkedIn, bank)?",
    options: ["Merah", "Kuning", "Biru", "Oranye"],
    answer: 2,
    why: "Biru diasosiasikan dengan kepercayaan, profesional, dan teknologi.",
  },
];

const RANKS = [
  {
    min: 7,
    emoji: "🏆",
    title: "Master Warna",
    msg: "Sempurna! Kamu menguasai teori warna dengan sangat baik.",
  },
  {
    min: 5,
    emoji: "🎨",
    title: "Desainer Handal",
    msg: "Bagus sekali! Tinggal sedikit lagi menuju sempurna.",
  },
  {
    min: 3,
    emoji: "🌱",
    title: "Pemula Berbakat",
    msg: "Fondasi sudah ada. Coba ulangi slide yang masih terasa asing.",
  },
  {
    min: 0,
    emoji: "📚",
    title: "Ayo Belajar Lagi",
    msg: "Tidak apa-apa! Ulangi slide sebelumnya lalu coba kuis lagi.",
  },
];

const BEST_KEY = "colorQuizBest";
const LETTERS = ["A", "B", "C", "D"];

const quizStep = $("quizStep");
const quizScore = $("quizScore");
const quizBarFill = $("quizBarFill");
const quizQuestion = $("quizQuestion");
const quizQ = $("quizQ");
const quizOptions = $("quizOptions");
const quizNext = $("quizNext");
const quizResult = $("quizResult");
const feedback = $("feedback");

let qIndex = 0;
let score = 0;
let answers = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderQuestion() {
  const { q, options, answer, why } = QUESTIONS[qIndex];
  quizStep.textContent = `Soal ${qIndex + 1} / ${QUESTIONS.length}`;
  quizScore.textContent = `Skor: ${score}`;
  quizBarFill.style.width = `${(qIndex / QUESTIONS.length) * 100}%`;
  quizQ.textContent = q;
  feedback.textContent = "";
  quizNext.hidden = true;
  quizOptions.replaceChildren();

  const items = shuffle(
    options.map((text, i) => ({ text, correct: i === answer })),
  );
  items.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-opt";
    btn.textContent = `${LETTERS[i]}. ${item.text}`;
    btn.addEventListener("click", () =>
      answerQuestion(btn, item.correct, items, why),
    );
    quizOptions.appendChild(btn);
  });
}

function answerQuestion(btn, isCorrect, items, why) {
  const buttons = [...quizOptions.children];
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (items[i].correct) b.classList.add("correct");
  });
  if (!isCorrect) btn.classList.add("wrong");

  answers.push(isCorrect);
  if (isCorrect) score++;
  quizScore.textContent = `Skor: ${score}`;
  feedback.textContent = (isCorrect ? "✅ Benar! " : "❌ Kurang tepat. ") + why;

  quizNext.textContent =
    qIndex === QUESTIONS.length - 1 ? "Lihat hasil 🏁" : "Soal berikutnya →";
  quizNext.hidden = false;
  quizNext.focus();
}

function readBest() {
  try {
    return parseInt(localStorage.getItem(BEST_KEY), 10);
  } catch {
    return NaN;
  }
}
function saveBest(value) {
  try {
    localStorage.setItem(BEST_KEY, String(value));
  } catch {
    /* abaikan */
  }
}

function showResult() {
  const totalQ = QUESTIONS.length;
  const rank = RANKS.find((r) => score >= r.min);

  quizBarFill.style.width = "100%";
  quizStep.textContent = "Selesai";
  quizQuestion.hidden = true;
  quizResult.hidden = false;

  $("resEmoji").textContent = rank.emoji;
  $("resTitle").textContent = rank.title;
  $("resScore").textContent = `${score} / ${totalQ} benar`;
  $("resMsg").textContent = rank.msg;

  $("resTrail").replaceChildren(
    ...answers.map((ok, i) => {
      const li = document.createElement("li");
      li.className = ok ? "ok" : "no";
      li.textContent = ok ? "✓" : "✕";
      li.setAttribute("aria-label", `Soal ${i + 1}: ${ok ? "benar" : "salah"}`);
      return li;
    }),
  );

  const best = readBest();
  const isNewBest = Number.isNaN(best) || score > best;
  if (isNewBest) saveBest(score);
  $("resBest").textContent = isNewBest
    ? "🎉 Rekor terbaik baru!"
    : `Rekor terbaikmu: ${best} / ${totalQ}`;

  $("resTitle").focus();
}

function restartQuiz() {
  qIndex = 0;
  score = 0;
  answers = [];
  quizResult.hidden = true;
  quizQuestion.hidden = false;
  renderQuestion();
  quizOptions.firstElementChild.focus();
}

quizNext.addEventListener("click", () => {
  if (qIndex === QUESTIONS.length - 1) {
    showResult();
  } else {
    qIndex++;
    renderQuestion();
    quizOptions.firstElementChild.focus();
  }
});
$("quizRestart").addEventListener("click", restartQuiz);

renderQuestion();

// Tombol Back/Forward browser atau mengubah #nomor di URL ikut memindahkan slide
window.addEventListener("hashchange", () => {
  const n = parseInt(location.hash.slice(1), 10);
  if (!Number.isNaN(n) && n - 1 !== current) showSlide(n - 1);
});

// ===== Inisialisasi =====
const fromHash = parseInt(location.hash.slice(1), 10);
showSlide(Number.isNaN(fromHash) ? 0 : fromHash - 1);

// Efek tambahan: parallax orb mengikuti kursor + strip 41 corak biru
document.addEventListener("pointermove", (e) => {
  const r = document.documentElement.style;
  r.setProperty("--mx", (e.clientX / innerWidth - 0.5).toFixed(2));
  r.setProperty("--my", (e.clientY / innerHeight - 0.5).toFixed(2));
});
const shades = document.getElementById("shades");
if (shades)
  shades.innerHTML = Array.from(
    { length: 41 },
    (_, i) => `<i style="--i:${i}"></i>`,
  ).join("");
const marquee = document.querySelector(".marquee div");
if (marquee) {
  const cs = [
    "#ef4444",
    "#f97316",
    "#facc15",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ];
  marquee.innerHTML = [...cs, ...cs, ...cs, ...cs]
    .map((c) => `<i style="background:${c}"></i>`)
    .join("");
}
