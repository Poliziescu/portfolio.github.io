// ---------- Configurazione ----------
// Data di nascita: aggiornala solo se cambia (non dovrebbe mai succedere :)
const BIRTH_DATE = new Date(2004, 8, 5); // mese 0-indicizzato: 8 = settembre

// Data di inizio in Tesisquare: MODIFICA questa data con quella esatta di assunzione.
// Ho impostato una stima ("quasi 3 anni" da oggi) finché non la correggi.
const TESISQUARE_START_DATE = new Date(2023, 9, 1); // 1 ottobre 2023 (stima)

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

document.addEventListener("DOMContentLoaded", () => {
  renderLiveStats();
  renderYear();
});
