(function () {
  var ADAT = {"tol":"2026-11-20","ig":"2026-12-31","link":"/akciok/reszletek/karacsonyi-ajanlatok-12","felso":"Ünnepi kínálat","cim":"Karácsonyi ajánlatok","al":"Díszdobozok, poharak, csomagolás","gomb":"Megnézem"};
  var KULCS = 'bbKarSav';
  var kenyszer = null;
  try {
    var m = location.search.match(/[?&]karacsonysav=([01])/);
    if (m) localStorage.setItem(KULCS, m[1]);
    kenyszer = localStorage.getItem(KULCS);
  } catch (e) { /* tiltott tárhely */ }
  if (kenyszer === '0') return;
  var gyoker = document.documentElement;
  if ((gyoker.lang || 'hu').slice(0, 2) !== 'hu') return;
  /* budapesti nap (YYYY-MM-DD) */
  var ma;
  try { ma = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Budapest' }).format(new Date()); }
  catch (e) { ma = new Date().toISOString().slice(0, 10); }
  if (kenyszer !== '1' && (ma < ADAT.tol || ma > ADAT.ig)) return;

  var stilus = document.createElement('style');
  stilus.id = 'bb-karacsony-sav';
  stilus.textContent = ".bb-kar{--bb-kar-arany: #d7b56a;position: relative;display: flex;align-items: center;gap: 16px;flex: 0 1 470px;min-width: 0;margin: 0 auto;padding: 14px 16px 14px 18px;border-radius: 14px;overflow: hidden;isolation: isolate;background: radial-gradient(140% 120% at 15% 0%,#23661a 0%,#18500f 55%,#123d0b 100%);color: #fff !important;text-decoration: none !important;line-height: 1.25;box-shadow: 0 1px 2px rgba(18,40,10,.14),0 8px 22px -12px rgba(18,60,10,.55);transition: box-shadow .3s ease}.bb-kar::before{content: \"\";position: absolute;inset: 0;border-radius: inherit;pointer-events: none;z-index: 2;box-shadow: inset 0 0 0 1px rgba(215,181,106,.42)}.bb-kar:hover,.bb-kar:focus-visible{box-shadow: 0 1px 2px rgba(18,40,10,.14),0 12px 28px -12px rgba(18,60,10,.65)}.bb-kar:focus-visible{outline: 2px solid var(--bb-kar-arany);outline-offset: 3px}.bb-kar__ho{position: absolute;inset: 0;pointer-events: none;z-index: 0}.bb-kar__pehely{position: absolute;top: -6px;left: var(--x);width: var(--m);height: var(--m);border-radius: 50%;background: #fff;opacity: 0;filter: blur(var(--b));animation: bb-kar-ho var(--t) linear var(--k) infinite}@keyframes bb-kar-ho{0%{transform: translate3d(0,0,0);opacity: 0}15%{opacity: var(--o)}50%{transform: translate3d(calc(var(--d) * -.6),50px,0)}85%{opacity: var(--o)}100%{transform: translate3d(var(--d),100px,0);opacity: 0} }.bb-kar__ikon{position: relative;z-index: 1;flex: 0 0 auto;display: block}.bb-kar__ikon svg{width: 34px;height: 42px;display: block;overflow: visible}.bb-kar__csillag{transform-box: fill-box;transform-origin: center;animation: bb-kar-csillog 5s ease-in-out infinite}@keyframes bb-kar-csillog{0%,100%{opacity: 1}50%{opacity: .55} }.bb-kar__szoveg{position: relative;z-index: 1;display: flex;flex-direction: column;gap: 3px;min-width: 0;flex: 1 1 auto}.bb-kar__felso{font-size: 10.5px;font-weight: 600;letter-spacing: .2em;text-transform: uppercase;color: var(--bb-kar-arany)}.bb-kar__cim{font-size: 18px;font-weight: 700;letter-spacing: -.01em;color: #fff;white-space: nowrap}.bb-kar__al{font-size: 12.5px;color: rgba(255,255,255,.68);white-space: nowrap;overflow: hidden;text-overflow: ellipsis}.bb-kar__gomb{position: relative;z-index: 1;flex: 0 0 auto;display: inline-flex;align-items: center;gap: 7px;padding: 8px 15px;border-radius: 999px;box-shadow: inset 0 0 0 1px rgba(215,181,106,.75);color: var(--bb-kar-arany);font-size: 13px;font-weight: 600;letter-spacing: .01em;white-space: nowrap;transition: background .25s ease,color .25s ease}.bb-kar__gomb svg{width: 14px;height: 14px;transition: transform .25s ease}.bb-kar:hover .bb-kar__gomb,.bb-kar:focus-visible .bb-kar__gomb{background: var(--bb-kar-arany);color: #123d0b}.bb-kar:hover .bb-kar__gomb svg{transform: translateX(2px)}.bb-infoblokk.bb-kar-sav{position: relative;overflow: hidden}.bb-kar-mano{position: absolute;bottom: 0;left: 0;width: 58px;height: 66px;z-index: 3;pointer-events: none;transform: translateY(100%);transition: transform 1.4s cubic-bezier(.22,.8,.2,1)}.bb-kar-mano svg{display: block;width: 100%;height: 100%;overflow: visible}.bb-kar-mano.bb-kar-mano--kint{transform: translateY(30%)}.bb-kar-mano__fej{transform-box: fill-box;transform-origin: 50% 90%;transition: transform .7s ease 1.1s}.bb-kar-mano--kint .bb-kar-mano__fej{transform: rotate(-8deg)}.bb-kar-mano__szem{transform-box: fill-box;transform-origin: center;animation: bb-kar-pislog 4.2s infinite}@keyframes bb-kar-pislog{0%,93%,100%{transform: scaleY(1)}96%{transform: scaleY(.12)} }.bb-infoblokk__belso.bb-kar-van{flex-wrap: wrap}.bb-kar-tores{display: none}.bb-kar-van .bb-infoblokk__kep{margin-left: 0}@media (min-width: 1200px){.bb-infoblokk__belso.bb-kar-van{flex-wrap: nowrap}.bb-kar-van .bb-infoblokk__szoveg{flex: 0 1 auto;max-width: 330px}.bb-kar{flex: 0 1 440px} }@media (max-width: 1199.98px){.bb-kar-van .bb-infoblokk__kep{margin-left: auto}.bb-kar-tores{display: block;order: 4;flex: 0 0 100%;height: 0}.bb-kar{order: 5;flex: 0 0 auto;width: 440px;max-width: 100%;margin: 0 0 12px auto}.bb-kar-mano{display: none} }@media (max-width: 575.98px){.bb-kar-van .bb-infoblokk__kep{margin: 0 auto}.bb-infoblokk__belso.bb-kar-van{row-gap: 0}.bb-kar{width: 100%;margin: 0 0 10px;padding: 11px 12px 11px 14px;gap: 12px}.bb-kar__ikon svg{width: 26px;height: 32px}.bb-kar__felso{display: none}.bb-kar__cim{font-size: 16px}.bb-kar__al{font-size: 12px}.bb-kar__gomb{padding: 7px 12px;font-size: 12px} }@media (max-width: 359.98px){.bb-kar__al{display: none} }@media (prefers-reduced-motion: reduce){.bb-kar__ho,.bb-kar-mano{display: none}.bb-kar__csillag,.bb-kar-mano__szem{animation: none}.bb-kar,.bb-kar__gomb,.bb-kar__gomb svg{transition: none} }";
  (document.head || gyoker).appendChild(stilus);

  /* vonalas arany fenyő, csillaggal */
  var IKON = '<svg viewBox="0 0 34 42" aria-hidden="true" fill="none" stroke="#d7b56a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M17 8 L24 18 H20 L28 29 H22.5 L31 38 H3 L11.5 29 H6 L14 18 H10 Z"/>'
    + '<path d="M17 38 V41.5"/>'
    + '<path d="M12.5 24.5 Q17 26.5 21.5 23.5 M9.5 33.5 Q17 36 24.5 32.5" stroke-width="1" opacity=".75"/>'
    + '<path class="bb-kar__csillag" d="M17 .8 L18.3 4 L21.6 4.2 L19 6.3 L19.9 9.5 L17 7.7 L14.1 9.5 L15 6.3 L12.4 4.2 L15.7 4 Z" fill="#d7b56a" stroke="none"/>'
    + '</svg>';
  var NYIL = '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8 H13 M9 4 L13 8 L9 12"/></svg>';
  /* manó: csak a feje és a két keze látszik ki a slider mögül */
  var MANO = '<svg viewBox="0 0 58 66" aria-hidden="true">'
    + '<g class="bb-kar-mano__fej">'
    + '<path d="M8.5 41 L17 36.5 L17.5 47 Z M49.5 41 L41 36.5 L40.5 47 Z" fill="#efc9a6"/>'
    + '<ellipse cx="29" cy="44.5" rx="13" ry="12.5" fill="#f3d3b4"/>'
    + '<circle cx="21" cy="49" r="2.8" fill="#e59c93" opacity=".55"/><circle cx="37" cy="49" r="2.8" fill="#e59c93" opacity=".55"/>'
    + '<ellipse class="bb-kar-mano__szem" cx="24" cy="43" rx="1.5" ry="1.9" fill="#2b2420"/>'
    + '<ellipse class="bb-kar-mano__szem" cx="34" cy="43" rx="1.5" ry="1.9" fill="#2b2420"/>'
    + '<path d="M25.5 50.5 Q29 53 32.5 50.5" fill="none" stroke="#9a5a45" stroke-width="1.3" stroke-linecap="round"/>'
    + '<path d="M15 33 C17 17 28 6 44 3.5 C39.5 10 40.5 21 43 33 Z" fill="#1f6416"/>'
    + '<path d="M44 3.5 C39.5 10 40.5 21 43 33" fill="none" stroke="#174e10" stroke-width="1.2" opacity=".6"/>'
    + '<rect x="13.5" y="30.5" width="31" height="7" rx="3.5" fill="#f5f0e6"/>'
    + '<circle cx="44.5" cy="4" r="3.6" fill="#d7b56a"/>'
    + '</g>'
    + '<ellipse cx="13" cy="63" rx="6" ry="4.2" fill="#1f6416"/><ellipse cx="45" cy="63" rx="6" ry="4.2" fill="#1f6416"/>'
    + '<path d="M8.5 61 Q13 59 17.5 61 M40.5 61 Q45 59 49.5 61" stroke="#f5f0e6" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
    + '</svg>';

  function ho() {
    var h = document.createElement('span');
    h.className = 'bb-kar__ho';
    for (var i = 0; i < 18; i++) {
      var p = document.createElement('i');
      var kozel = Math.random() < .3;
      p.className = 'bb-kar__pehely';
      p.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%');
      p.style.setProperty('--m', (kozel ? 2.6 + Math.random() * 1.4 : 1.2 + Math.random() * 1.2).toFixed(1) + 'px');
      p.style.setProperty('--b', kozel ? '.2px' : '.6px');
      p.style.setProperty('--o', (kozel ? .75 : .4 + Math.random() * .25).toFixed(2));
      p.style.setProperty('--t', ((kozel ? 6 : 9) + Math.random() * 5).toFixed(1) + 's');
      p.style.setProperty('--k', (-Math.random() * 14).toFixed(1) + 's');
      p.style.setProperty('--d', ((Math.random() - .5) * 26).toFixed(0) + 'px');
      h.appendChild(p);
    }
    return h;
  }

  function kartya() {
    var a = document.createElement('a');
    a.className = 'bb-kar';
    a.href = ADAT.link;
    a.setAttribute('aria-label', ADAT.cim + ' – ' + ADAT.al);
    a.appendChild(ho());
    a.insertAdjacentHTML('beforeend', '<span class="bb-kar__ikon">' + IKON + '</span>'
      + '<span class="bb-kar__szoveg"><span class="bb-kar__felso">' + ADAT.felso + '</span>'
      + '<span class="bb-kar__cim">' + ADAT.cim + '</span>'
      + '<span class="bb-kar__al">' + ADAT.al + '</span></span>'
      + '<span class="bb-kar__gomb">' + ADAT.gomb + NYIL + '</span>');
    return a;
  }

  /* a manó: az első látható sávba, a kártya bal oldala mellé; betöltés után egyszer
     kikukucskál, utána ritkán (legfeljebb 4-szer), és ha a kártyára áll az egér */
  var manoKesz = false;
  function mano() {
    if (manoKesz || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var kar = null, savok = document.querySelectorAll('.bb-infoblokk');
    for (var i = 0; i < savok.length; i++) if (savok[i].offsetParent !== null && savok[i].querySelector('.bb-kar')) { kar = savok[i]; break; }
    if (!kar) return;
    manoKesz = true;
    kar.className += ' bb-kar-sav';
    var m = document.createElement('span');
    m.className = 'bb-kar-mano';
    m.innerHTML = MANO;
    kar.appendChild(m);
    var kartyaEl = kar.querySelector('.bb-kar');
    function hely() {
      var s = kar.getBoundingClientRect(), k = kartyaEl.getBoundingClientRect();
      m.style.left = Math.round(k.left - s.left - 74) + 'px';
    }
    hely();
    window.addEventListener('resize', hely);
    var kint = false, szam = 0;
    function kukucs() {
      if (kint || innerWidth < 1200 || document.hidden) return;
      kint = true; szam++;
      hely();
      m.className = 'bb-kar-mano bb-kar-mano--kint';
      setTimeout(function () { m.className = 'bb-kar-mano'; setTimeout(function () { kint = false; }, 1500); }, 4800);
    }
    setTimeout(kukucs, 2200);
    var idozito = setInterval(function () { if (szam >= 4) clearInterval(idozito); else kukucs(); }, 26000);
    kartyaEl.addEventListener('mouseenter', kukucs);
  }

  function beilleszt() {
    var savok = document.querySelectorAll('.bb-infoblokk__belso');
    for (var i = 0; i < savok.length; i++) {
      var s = savok[i];
      if (s.querySelector('.bb-kar')) continue;
      var kep = s.querySelector('.bb-infoblokk__kep');
      /* 1200 px alatt sortörés a kártya előtt: a kötelező infoblokk-kép a helyén marad */
      var tores = document.createElement('span');
      tores.className = 'bb-kar-tores';
      s.insertBefore(tores, kep || null);
      s.insertBefore(kartya(), kep || null);
      s.className += ' bb-kar-van';
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', beilleszt);
  else beilleszt();
  /* a régi infoblokk-script (#179651) a saját sávját később teszi ki */
  window.addEventListener('load', function () { beilleszt(); mano(); });
})();