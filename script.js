// Preferencias persistentes de tema y tamaño de texto; si localStorage no está disponible, se conserva el uso normal.
(() => {
  const entryScreen = document.querySelector("#entry-screen");
  const enterButton = document.querySelector("#enter-site");
  const pageRegions = [document.querySelector(".skip-link"), document.querySelector(".site-header"), document.querySelector(".accessibility-controls"), document.querySelector("main"), document.querySelector(".site-footer")];

  document.body.classList.add("entry-pending");
  pageRegions.forEach((region) => { region.inert = true; });
  enterButton.focus();

  enterButton.addEventListener("click", () => {
    entryScreen.hidden = true;
    document.body.classList.remove("entry-pending");
    pageRegions.forEach((region) => { region.inert = false; });
    window.scrollTo({ top: 0, behavior: "instant" });
    document.querySelector("main").focus({ preventScroll: true });
  });
})();

(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector("#theme-toggle");
  const themeIcon = themeButton.querySelector(".theme-icon");
  const textScaleKey = "epdodev-text-scale";
  const themeKey = "epdodev-theme";
  const allowedScales = [0.9, 1, 1.1, 1.2];
  let savedTheme = null;
  let savedScale = 1;

  try {
    savedTheme = localStorage.getItem(themeKey);
    const parsedScale = Number(localStorage.getItem(textScaleKey));
    if (allowedScales.includes(parsedScale)) savedScale = parsedScale;
  } catch (_) { /* La página sigue siendo usable sin almacenamiento local. */ }

  const initialTheme = savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const darkIsActive = theme === "dark";
    themeButton.setAttribute("aria-pressed", String(darkIsActive));
    themeButton.setAttribute("aria-label", darkIsActive ? "Activar tema claro" : "Activar tema oscuro");
    themeIcon.textContent = darkIsActive ? "☼" : "◐";
    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor.setAttribute("content", darkIsActive ? "#101915" : "#eef4f0");
  }

  function applyScale(scale) {
    savedScale = scale;
    root.style.setProperty("--base-size", `${scale}rem`);
    try { localStorage.setItem(textScaleKey, String(scale)); } catch (_) { /* Sin persistencia disponible. */ }
  }

  applyTheme(initialTheme);
  applyScale(savedScale);
  themeButton.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try { localStorage.setItem(themeKey, nextTheme); } catch (_) { /* El cambio sigue activo durante esta visita. */ }
  });

  document.querySelector("#increase-text").addEventListener("click", () => {
    const next = allowedScales.find((scale) => scale > savedScale);
    if (next !== undefined) applyScale(next);
  });
  document.querySelector("#decrease-text").addEventListener("click", () => {
    const next = [...allowedScales].reverse().find((scale) => scale < savedScale);
    if (next !== undefined) applyScale(next);
  });

  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
})();
