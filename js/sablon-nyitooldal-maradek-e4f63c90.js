/* ══════════════════════════════════════════════════════════════════════════
   NYITÓOLDAL — a sablonba költözött blokkok maradék JS-e (sablon-alap ág, 2026-10-19).
   A csomagoló (sablon/csomagol.sh) a main_start.html végére ágyazza (a NYITOOLDAL_MARADEK helyőrzőre), BB_CDN=1
   esetén külső fájlként. A blokkok maguk (infoblokk, bizalmi sáv, TOP kategóriák, csapat-blokk) a sablonból
   jönnek, ide csak az került, ami a Flickity futása után dönthető el:
   - a nagy banner (banner_start_big) lapozó nyilai: a sablon a nyilakat kikapcsolja (main.cfg ›
     element_flickity_1 › custom_carousel_arrows: 0), ezért a Flickity saját osztályaival tesszük ki
     (a kerek nyílstílus a nyitooldal.scss-ből); asztalon a pár a pöttysor közepe fölé igazítva.
     Ugyanaz a kód, mint a design/asztali.js és design/mobil-kieg.js bannerNyilak()-ja; a .bb-banner-nyil
     guard mindkét irányban véd: aki előbb fut, az teszi ki, a másik nem.
   Tiltott: két szögletes vagy kapcsos zárójel egymás mellett, sablonjelölés, 4 bájtos karakter.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  function asztalon() { return !(window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches); }

  function bannerNyilak() {
    var el = document.querySelector('.carousel-banner_start_big');
    if (!el || el.querySelector('.bb-banner-nyil')) return;
    var probak = 0;
    (function probal() {
      var f = window.Flickity && window.Flickity.data ? window.Flickity.data(el) : null;
      if (!f) { if (++probak < 40) setTimeout(probal, 250); return; }
      if (!f.slides || f.slides.length < 2 || el.querySelector('.bb-banner-nyil')) return;
      [ ['previous', 'Előző kép'], ['next', 'Következő kép'] ].forEach(function (g) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'flickity-button flickity-prev-next-button ' + g[0] + ' bb-banner-nyil';
        b.setAttribute('aria-label', g[1]);
        /* a Flickity húzás-figyelője ne vegye át a kattintást */
        b.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
        b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); var irany = g[0]; f[irany](true); });
        el.appendChild(b);
      });
      /* asztalon a pár vízszintesen a pöttysor közepe fölé (a sablon a pöttyöket jobbra
         igazítja, a sor szélessége a képek számától függ); telefonon a két szélen marad (CSS) */
      function igazit() {
        var gombok = el.querySelectorAll('.bb-banner-nyil'), pottyok = el.querySelectorAll('.flickity-page-dot');
        if (gombok.length < 2) return;
        if (!pottyok.length || !asztalon()) {
          for (var i = 0; i < gombok.length; i++) { gombok[i].style.removeProperty('left'); gombok[i].style.removeProperty('right'); }
          return;
        }
        var alap = el.getBoundingClientRect();
        var elso = pottyok[0].getBoundingClientRect(), utolso = pottyok[pottyok.length - 1].getBoundingClientRect();
        var kozep = (elso.left + utolso.right) / 2 - alap.left, sz = gombok[0].offsetWidth || 44, koz = 10;
        gombok[0].style.setProperty('left', Math.round(kozep - sz - koz / 2) + 'px', 'important');
        gombok[1].style.setProperty('left', Math.round(kozep + koz / 2) + 'px', 'important');
        gombok[0].style.setProperty('right', 'auto', 'important');
        gombok[1].style.setProperty('right', 'auto', 'important');
      }
      igazit();
      setTimeout(igazit, 600);
      if (f.on) f.on('resize', igazit);
      window.addEventListener('resize', igazit);
      window.addEventListener('load', igazit);
    })();
  }

  function indul() {
    try { bannerNyilak(); } catch (e) { if (window.console) console.error('[nyitóoldal] banner nyilak', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
  else indul();
})();
