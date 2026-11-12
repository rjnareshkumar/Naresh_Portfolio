/* ===================== EDITABLE CONTENT (update here) ===================== */
const education = [
  { title: "CITS – Trade: CSA", place: "NSTI Kanpur", note: "Session 2026–27 · Currently pursuing" },
  { title: "ITI – COPA", place: "Govt. ITI Kotra, Udaipur, Rajasthan", note: "2024 · 69.66%" },
  { title: "Class 12 (Arts), RBSE", place: "Balicha Griwa, Udaipur, Rajasthan", note: "2022 · 75%" },
  { title: "Class 10, RBSE", place: "Balicha Griwa, Udaipur, Rajasthan", note: "2020 · 51%" }
];

const skills = [
  { group: "Core Skills", icon: "fa-computer", items: ["Computer Fundamentals", "MS Office (Word, Excel, PowerPoint)", "Internet", "Hindi Typing", "English Typing"] },
  { group: "Software & Tools", icon: "fa-code", items: ["HTML", "MySQL", "Python"] },
  { group: "Soft Skills", icon: "fa-people-group", items: ["Communication", "Problem Solving", "Teamwork", "Willingness to learn"] }
];

const projects = [
  {
    name: "SmartDoc AI – Intelligent PDF Summarizer & Personalized Study Assistant",
    image: "assets/images/smartdoc.jpg", // TODO: add a screenshot with this name
    description: "An AI-powered educational web application that converts PDF documents into study materials. It generates summaries, important questions, MCQs, bilingual notes and AI-based explanations. It also helps students analyse their performance, identify weak topics and receive personalised study recommendations.",
    tech: ["HTML5", "CSS3", "JavaScript", "Python", "Flask", "Google Gemini API", "PyMuPDF", "Tesseract OCR", "SQLite", "Chart.js"],
    contribution: "Project planning, UI/UX design, frontend development, backend development, PDF processing, Gemini AI integration, bilingual content generation, MCQ system, chatbot functionality, student performance analysis.",
    docs: "assets/documents/SMARTDOC_AI_Project_Documentation.pdf", // TODO: add this PDF, or set to "" to hide the button
    code: "" // TODO: paste your GitHub repo link here. Empty = button hidden
  }
];

const certificates = [
  { name: "AI Literacy", issuer: "IBM SkillsBuild", year: "2026", date: "Issued 29 Oct 2026",
    verify: "https://www.credly.com/go/Q6Fu73GX", file: "assets/documents/AI_Literacy_Certificate.pdf" }
];

/* ===================== HELPERS ===================== */
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const tags = (arr) => `<ul class="tags">${arr.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
const ext = 'target="_blank" rel="noopener noreferrer"';

/* ===================== RENDER SECTIONS ===================== */
function renderAll() {
  $("#edu-list").innerHTML = education.map((e) => `<li><h3>${esc(e.title)}</h3><p>${esc(e.place)}</p><p>${esc(e.note)}</p></li>`).join("");

  $("#skill-list").innerHTML = skills.map((s) => `<div class="card"><h3><i class="fa-solid ${s.icon}"></i> ${esc(s.group)}</h3>${tags(s.items)}</div>`).join("");

  $("#project-list").innerHTML = projects.map((p) => `
    <article class="card project">
      <div class="thumb"><img src="${esc(p.image)}" alt="Screenshot of ${esc(p.name)}" loading="lazy" onerror="this.parentNode.textContent='SmartDoc AI'"></div>
      <div class="pbody">
        <h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>
        ${tags(p.tech)}
        <h4>My contribution</h4><p>${esc(p.contribution)}</p>
        <div class="row">
          ${p.docs ? `<a class="btn primary" href="${esc(p.docs)}" ${ext}>View Documentation</a>` : ""}
          ${p.code ? `<a class="btn" href="${esc(p.code)}" ${ext}>Source Code</a>` : ""}
        </div>
      </div>
    </article>`).join("");

  $("#cert-list").innerHTML = certificates.map((c) => `
    <article class="card cert">
      <h3><i class="fa-solid fa-award"></i> ${esc(c.name)}</h3>
      <p class="muted">${esc(c.issuer)} · ${esc(c.date || c.year)}</p>
      <div class="row">
        ${c.verify ? `<a class="btn primary" href="${esc(c.verify)}" ${ext}>Verify Certificate</a>` : ""}
        ${c.file ? `<a class="btn" href="${esc(c.file)}" ${ext}>View PDF</a>` : ""}
      </div>
    </article>`).join("");
  // Hide the whole section if there is nothing to show
  if (!certificates.length) $("#certifications").hidden = true;
}

/* ===================== THEME ===================== */
function initTheme() {
  const saved = localStorage.getItem("theme");
  const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(dark ? "dark" : "light");
  $("#theme").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true));
}
function setTheme(t, save) {
  document.documentElement.dataset.theme = t;
  $("#theme i").className = t === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  if (save) localStorage.setItem("theme", t);
}

/* ===================== NAV, SCROLL, REVEAL ===================== */
function initNav() {
  const menu = $("#menu"), burger = $("#burger");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", (e) => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

  const links = [...menu.querySelectorAll("a")];
  const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.hash === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

  const reveal = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("show"); reveal.unobserve(en.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

  const top = $("#top");
  addEventListener("scroll", () => (top.hidden = scrollY < 500), { passive: true });
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

/* ===================== COPY EMAIL ===================== */
function initCopy() {
  const b = $("#copy");
  b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText("rjnareshkumar124@gmail.com"); b.textContent = "Copied"; }
    catch { b.textContent = "Copy failed"; }
    setTimeout(() => (b.textContent = "Copy email"), 2000);
  });
}

/* ===================== START ===================== */
$("#year").textContent = new Date().getFullYear();
renderAll(); initTheme(); initNav(); initCopy();
