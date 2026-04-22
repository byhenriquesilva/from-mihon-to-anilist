// ── i18n engine ──
// To add a new language:
//   1. Create js/i18n/xx.js following the same structure as pt.js
//   2. Import it here and add it to the LOCALES map
//   3. Add a <button class="lang-option" data-lang="xx"> in index.html

import pt from './i18n/pt.js';
import en from './i18n/en.js';
import es from './i18n/es.js';
import ja from './i18n/ja.js';

const LOCALES = { pt, en, es, ja };

let currentLang = 'pt';

// Apply a language to the entire page
export function applyLang(lang) {
  const t = LOCALES[lang];
  if (!t) return console.warn(`[i18n] Unknown locale: "${lang}"`);

  currentLang = lang;

  // Translate innerHTML elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key in t) el.innerHTML = t[key];
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key in t) el.placeholder = t[key];
  });

  // Update nav button label
  const label = document.getElementById('langBtnLabel');
  if (label) label.textContent = t.label;

  // Update active state in dropdown
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update <html lang> attribute
  document.documentElement.lang = lang;
}

// Wire up the dropdown toggle and option clicks
export function initLangSwitcher() {
  const langBtn      = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');

  if (!langBtn || !langDropdown) return;

  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => langDropdown.classList.remove('open'));
  langDropdown.addEventListener('click', e => e.stopPropagation());

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.dataset.lang);
      langDropdown.classList.remove('open');
    });
  });
}
