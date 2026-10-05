document.addEventListener('DOMContentLoaded', function () {
  // Rejtsük el az eredeti UNAS selecteket
  ['#box_lang_select_desktop', '#box_lang_select_mobile'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(
      'style',
      'position:absolute!important;left:-9999px!important;top:auto!important;opacity:0!important;width:0;height:0;margin:0;padding:0;pointer-events:none!important;display:none!important;'
    );
  });

  // Ha nincs nyelvválasztó, nem csinál semmit
  const native = document.querySelector('#box_lang_select_desktop');
  if (!native) return;

  // === Konfiguráció ===
  const displayName = {
    hu: "Magyar",
    en: "English",
    hr: "Hrvatski",
    ro: "Română",
    de: "Deutsch",
  };

  // Zászló URL hozzárendelés
  const flag = (code) => {
    const c = code.toLowerCase();
    if (c === 'en') return 'https://flagcdn.com/w20/gb.png'; // brit zászló az angolhoz
    return `https://flagcdn.com/w20/${c}.png`;
  };

  // Aktuális nyelv felismerése (html lang vagy URL alapján)
  const detectLang = () => {
    const al = (document.documentElement.lang || '').toLowerCase().slice(0,2);
    if (['hu','en','hr','ro','de'].includes(al)) return al;
    const m = location.pathname.toLowerCase().match(/\/(hu|en|hr|ro|de)(\/|$)/);
    return m ? m[1] : 'hu';
  };
  const currentLang = detectLang();

  // Opciók a natív selectből
  const options = [...native.querySelectorAll('option')].filter(o => o.value);
  if (!options.length) return;

  // Hova rakjuk
  const mountPoint = native.closest('.lang-select-group, .lang-and-money__wrapper') || native.parentNode;

  // Wrapper létrehozása
  const wrap = document.createElement('div');
  wrap.className = 'lang-dropdown';
  mountPoint.insertBefore(wrap, native);

  // Aktuális opció beállítása
  const currentOpt =
    options.find(o => o.value.toLowerCase().includes(`/${currentLang}/`)) ||
    options[0];

  const getCode = (opt) => {
    const url = (opt.value || '').toLowerCase();
    const byUrl = (url.match(/\/(hu|en|hr|ro|de)(\/|$)/) || [])[1];
    if (byUrl) return byUrl;
    const t = (opt.textContent || '').trim().toLowerCase();
    if (t.startsWith('magyar') || t.startsWith('hu')) return 'hu';
    if (t.startsWith('english') || t.startsWith('en')) return 'en';
    if (t.startsWith('hrv') || t.startsWith('hr')) return 'hr';
    if (t.startsWith('rom') || t.startsWith('ro')) return 'ro';
    return 'en';
  };

  // === Fejléc ===
  const header = document.createElement('div');
  header.className = 'lang-current';
  const currentCode = getCode(currentOpt);
  header.innerHTML = `<img src="${flag(currentCode)}" alt="${currentCode.toUpperCase()}"><span>${currentCode.toUpperCase()}</span>`;
  wrap.appendChild(header);

  // === Lista ===
  const ul = document.createElement('ul');
  ul.className = 'lang-options';
  options.forEach(opt => {
    const code = getCode(opt);
    const name = displayName[code] || (opt.textContent || code.toUpperCase()).trim();
    const li = document.createElement('li');
    li.dataset.value = opt.value;
    if (opt === currentOpt) li.setAttribute('aria-current','true');
    li.innerHTML = `<img src="${flag(code)}" alt="${code.toUpperCase()}"><span>${name}</span>`;
    ul.appendChild(li);
  });
  wrap.appendChild(ul);

  // === Működés ===
  const close = () => ul.classList.remove('show');
  header.addEventListener('click', () => ul.classList.toggle('show'));
  ul.addEventListener('click', e => {
    const li = e.target.closest('li'); if (!li) return;
    ul.querySelectorAll('li[aria-current="true"]').forEach(x => x.removeAttribute('aria-current'));
    li.setAttribute('aria-current','true');
    const img = li.querySelector('img').src;
    const codeTxt = (li.querySelector('img').alt || 'EN').toUpperCase();
    header.innerHTML = `<img src="${img}" alt="${codeTxt}"><span>${codeTxt}</span>`;
    window.location.href = li.dataset.value;
  });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  window.addEventListener('scroll', close, { passive: true });
});
