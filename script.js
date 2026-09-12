// ---------- Configurazione ----------
// Data di nascita: aggiornala solo se cambia (non dovrebbe mai succedere :)
const BIRTH_DATE = new Date(2004, 8, 5); // mese 0-indicizzato: 8 = settembre

// Data di inizio in Tesisquare: uso l'inizio dello stage (continuità lavorativa reale).
// Se preferisci calcolare l'anzianità solo dall'apprendistato, cambia questa data in new Date(2023, 11, 18).
const TESISQUARE_START_DATE = new Date(2023, 8, 18); // 18 settembre 2023 (inizio stage)

// ---------- Utility ----------
function durationSince(fromDate, toDate = new Date()) {
  let years = toDate.getFullYear() - fromDate.getFullYear();
  let months = toDate.getMonth() - fromDate.getMonth();

  if (toDate.getDate() < fromDate.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months };
}

function formatDuration({ years, months }) {
  const y = `${years} ${years === 1 ? "anno" : "anni"}`;
  if (months === 0) return y;
  const m = `${months} ${months === 1 ? "mese" : "mesi"}`;
  return `${y}, ${m}`;
}

// ---------- Render ----------
function renderLiveStats() {
  const ageEl = document.getElementById("age-value");
  const tenureEl = document.getElementById("tenure-value");

  if (ageEl) {
    ageEl.textContent = formatDuration(durationSince(BIRTH_DATE));
  }
  if (tenureEl) {
    tenureEl.textContent = formatDuration(durationSince(TESISQUARE_START_DATE));
  }
}

function renderYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ---------- Tema chiaro/scuro ----------
function setupThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const icon = toggle.querySelector("span");

  const getTheme = () => document.documentElement.getAttribute("data-theme") || "light";

  const updateIcon = (theme) => {
    if (icon) icon.textContent = theme === "dark" ? "☀" : "☾";
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro"
    );
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    updateIcon(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  };

  updateIcon(getTheme());

  toggle.addEventListener("click", () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderLiveStats();
  renderYear();
  setupThemeToggle();
  setupClientFlipCards();
});

// ---------- Flip card clienti ----------
function setupClientFlipCards() {
  const cards = document.querySelectorAll(".client-card");

  const toggleFlip = (card) => {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", flipped ? "true" : "false");
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => toggleFlip(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFlip(card);
      }
    });
  });
}