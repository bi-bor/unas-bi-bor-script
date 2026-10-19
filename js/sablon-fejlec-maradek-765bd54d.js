/* Fejléc és lábléc — a sablonszintű szerkezet mellett megmaradó kis JS.
   A csomagol.sh a main.html végére teszi (script-tagben), minden oldalon fut.
   A szerkezetet és a stílust a sablon adja (main.html, css/fejlec.scss); itt
   csak az marad, ami adatfüggő vagy csak a böngészőben dönthető el:
     • a főkategóriák teljes neve a title-be és data-bb-nev-be (a rövid név CSS)
     • nagy, képes kategóriamenü (.bb-mega) a kategóriaadatból (window.bbKategoriak,
       vagy a külön adat-script címe: window.bbKatAdatUrl) — adat nélkül a sablon
       saját lenyílója marad, gyorsítva (előtöltés, azonnali nyitás)
     • telefonon: a kereső találati paneljének nyitása-zárása, az okos kereső
       (kereso.bi-bor.hu) átvétele; a fejléc felcsúszása lefelé görgetve;
       beúszó, képes menü (csak magyarul); a Profil felirat → a gomb
     • hírlevél-sáv: visszatérési cím, ellenőrzés, láthatatlan reCAPTCHA
     • lábléc: a lenyílók nyitása telefonon; tartalék: hibás admin-linkek
       javítása, a saját jogi oldalak a jogi listába, „Kínálat és tudás” blokk
       nem magyar oldalon a bolt menüjéből
     • üres Puttony a lenyíló panelben (a bolt ajax-szal írja újra → figyelő)
     • nyelv és pénznem panel telefonon: zászló + név, a nyelvvel együtt a pénznem
   A régi UNAS Scriptek (#172616 fejléc, #181711 nyelv, a mobil/asztali scriptek
   fejléc- és lábléc-része) ugyanazokat a jelölő osztályokat keresik, amiket a
   sablon már kiad (.bb-mlogo, .bb-mkereso, .bb-mf-kedv, .bb-alab/.bb-lab,
   .bb-hl-sav, .bb-lab-kinalat, .bb-pu, data-bb-nv…), ezért amíg élnek, nem
   csinálnak másodszor semmit.
   Tilos a tartalomban: dupla kapcsos nyitó, dupla szögletes nyitó, szögletes-százalék
   pár (sablonjelölés), script-tag. */
(function () {
  var gyoker = document.documentElement;
  var magyar = (gyoker.lang || 'hu').slice(0, 2) === 'hu';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function uj(tag, osztaly, szoveg) {
    var e = document.createElement(tag);
    if (osztaly) e.className = osztaly;
    if (szoveg != null) e.textContent = szoveg;
    return e;
  }
  function kisMobil() { return window.innerWidth < 576; }
  function telefon() { return !!(window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches); }
  function hiba(hol, e) { if (window.console) console.error('[fejléc] ' + hol, e); }

  /* a régi scriptek és stílusok jelölői (amíg élnek, ezekre néznek; a fejrész
     inline scriptje már a kirajzolás előtt beteszi őket — itt csak biztonságból);
     a bb-hl-van csak ott, ahol tényleg van hírlevél-sáv (magyarul): nélküle az
     asztali script CSS-e más nyelven a bolt hírlevél-oszlopát is elrejtené */
  gyoker.classList.add('bb-fejlec-c', 'bb-kesz', 'bb-mf2', 'bb-mkereso-van');
  if ($('.bb-hl-sav')) gyoker.classList.add('bb-hl-van');
  function belepett() {
    var c = window.UNAS && UNAS.customer;
    if (c && c.id > 0 && Number(c.without_registration) !== 1) gyoker.classList.add('bb-belepett');
  }

  /* ── Főkategóriák: a teljes név a title-be és a data-bb-nev-be (a rövid
     nevet a CSS adja); a lenyíló címsorában mindig a teljes név ── */
  var ROVID = {
    907727: 1, 474127: 1, 992645: 1, 944009: 1, 108837: 1, 437489: 1,
    170958: 1, 511412: 1, 754892: 1, 945468: 1, 744751: 1
  };
  function rovidNevek() {
    if (!magyar) return;
    $$('#dropdown-cat .nav-list--0 > li').forEach(function (li) {
      var a = li.querySelector('.nav-link');
      if (!ROVID[li.id.replace('nav-item-', '')] || !a || li.hasAttribute('data-bb-nev')) return;
      var szoveg = a.querySelector('.nav-link__text');
      if (szoveg && szoveg.firstChild) {
        a.title = szoveg.firstChild.textContent.trim();
        li.setAttribute('data-bb-nev', a.title);
      }
    });
    var panel = document.getElementById('dropdown-cat');
    if (!panel || typeof MutationObserver !== 'function') return;
    function cimTisztit() {
      $$('.megasubmenu__parent-title', panel).forEach(function (c) {
        var szulo = c.closest('.nav-list--0 > li');
        var teljes = szulo && szulo.getAttribute('data-bb-nev');
        if (teljes && c.textContent.trim() !== teljes) c.textContent = teljes;
      });
    }
    new MutationObserver(cimTisztit).observe(panel, { childList: true, subtree: true, characterData: true });
    cimTisztit();
  }

  /* ── Nyitási késleltetés: a menü csak akkor nyílik, ha az egér ennyi ideig a
     kategórián marad; ha egy menü már nyitva van, a váltás azonnali.
     Próbához: ?menukesl=300 (ms; a böngésző megjegyzi). ── */
  var KESLELTETES = 180;
  try {
    var mk = location.search.match(/[?&]menukesl=(\d{1,4})/);
    if (mk) localStorage.setItem('bbMenuKesl', mk[1]);
    var tarolt = parseInt(localStorage.getItem('bbMenuKesl'), 10);
    if (tarolt >= 0 && tarolt <= 2000) KESLELTETES = tarolt;
  } catch (e) { /* marad az alapérték */ }

  /* ── A sablon saját lenyílója gyorsítva (ha nincs kategóriaadat): az almenüket
     a fejlécbe érve a háttérben betöltjük, ráálláskor azonnal nyitunk ── */
  function gyorsLenyilo() {
    var fejlec = document.getElementById('header--desktop');
    var elemek = $$('#dropdown-cat .nav-list--0 > li');
    if (!fejlec || !elemek.length || typeof window.jQuery !== 'function') return;
    function betolt(li) {
      if (typeof window.catSubLoad !== 'function') return;
      if (li.classList.contains('ajax-loaded') || li.classList.contains('ajax-loading')) return;
      var a = li.querySelector('.nav-link');
      var m = a && (a.getAttribute('data-mouseover') || '').match(/handleSub\('(\d+)'\s*,\s*'([^']+)'\)/);
      if (m) window.catSubLoad(m[1], m[2].replace(/&amp;/g, '&'));
    }
    function mindetBetolt() {
      fejlec.removeEventListener('pointerenter', mindetBetolt);
      elemek.forEach(function (li, i) { setTimeout(function () { betolt(li); }, i * 60); });
    }
    fejlec.addEventListener('pointerenter', mindetBetolt);
    var varakozas = null;
    elemek.forEach(function (li) {
      li.addEventListener('mouseenter', function () {
        if (window.innerWidth < 1200 || li.classList.contains('show')) return;
        betolt(li);
        clearTimeout(varakozas);
        var marNyitva = $('#dropdown-cat .nav-list--0 > li.show');
        varakozas = setTimeout(function () { window.jQuery(li).trigger('focusin'); }, marNyitva ? 0 : KESLELTETES);
      });
      li.addEventListener('mouseleave', function () { clearTimeout(varakozas); });
    });
  }

  /* ── Kategóriaadat a nagy menühöz és a mobilmenühöz: window.bbKategoriak /
     window.bbFokepek (a csomagoló ágyazhatja be: sablon/uj-adat/kategoriak.json),
     vagy a külön adat-script címe (window.bbKatAdatUrl, a #173356 betöltő adja);
     az oldal betöltése után üresjáratban, vagy a menü első érintésekor kérjük ── */
  var KATEGORIAK = {}, FOKEPEK = {};
  var adatVarok = [], adatFut = false;
  function vanAdatForras() { return !!(window.bbKategoriak || window.bbKatAdatUrl); }
  function katAdat(kesz) {
    if (window.bbKategoriak) {
      KATEGORIAK = window.bbKategoriak; FOKEPEK = window.bbFokepek || {};
      if (kesz) kesz();
      return;
    }
    if (kesz) adatVarok.push(kesz);
    if (adatFut || !window.bbKatAdatUrl) return;
    adatFut = true;
    var s = document.createElement('script');
    s.src = window.bbKatAdatUrl;
    s.async = true;
    s.onload = function () {
      KATEGORIAK = window.bbKategoriak || {}; FOKEPEK = window.bbFokepek || {};
      var v = adatVarok; adatVarok = [];
      v.forEach(function (f) { try { f(); } catch (e) { hiba('adat-várakozó', e); } });
    };
    s.onerror = function () { adatFut = false; };
    (document.head || gyoker).appendChild(s);
  }
  /* a kitételkor „~”-re rövidített „/termekek/” visszaírása */
  function teljesCim(u) { return u.charAt(0) === '~' ? '/termekek/' + u.slice(1) : u; }
  function kepCim(i, t) { return '/img/63361/catpic_' + i + '/200x200,r/' + i + '.webp' + (t ? '?time=' + t : ''); }

  /* ── Nagy, képes kategóriamenü (1200 px felett, csak magyarul): balra a
     főkategória alkategóriái, jobbra a kiválasztott alkategória kártyái ── */
  function nagyMenu() {
    var sor = $('#header--desktop .header__bottom > .container');
    var elemek = $$('#dropdown-cat .nav-list--0 > li');
    if (!sor || !elemek.length) return false;
    var panel = $('.bb-mega', sor);
    if (!panel) { panel = uj('div', 'bb-mega'); panel.hidden = true; sor.appendChild(panel); }
    gyoker.classList.add('bb-mega-van');
    var aktiv = null, zarIdo = null;
    /* amíg a régi fejléc-script (#172616) is fut, a saját .bb-mega panelját is ide
       teszi (nincs benne guard): két panel nyílna egymáson. A többletet levesszük —
       a régi script a leválasztott elemet nyitogatja, az nem látszik. */
    function idegenPanelek() {
      Array.prototype.slice.call(sor.children).forEach(function (p) {
        if (p !== panel && p.classList.contains('bb-mega')) sor.removeChild(p);
      });
    }
    idegenPanelek();
    if (typeof MutationObserver === 'function') new MutationObserver(idegenPanelek).observe(sor, { childList: true });

    function kartyak(lista, cel) {
      cel.textContent = '';
      lista.forEach(function (k) {
        var a = uj('a', 'bb-kartya');
        a.href = teljesCim(k.u);
        var keret = uj('span', 'bb-kartya__kep');
        var kep = uj('img');
        kep.src = kepCim(k.i, k.t);
        kep.alt = '';
        kep.width = 120;
        kep.height = 120;
        kep.loading = 'lazy';
        keret.appendChild(kep);
        a.appendChild(keret);
        a.appendChild(uj('span', 'bb-kartya__nev', k.n));
        cel.appendChild(a);
      });
    }
    function zar() {
      panel.hidden = true;
      if (aktiv) aktiv.classList.remove('bb-aktiv');
      aktiv = null;
    }
    function zarKesleltetve() { clearTimeout(zarIdo); zarIdo = setTimeout(zar, 180); }
    function nyit(li) {
      clearTimeout(zarIdo);
      if (window.innerWidth < 1200) return;
      if (aktiv === li && !panel.hidden) return;
      if (!window.bbKategoriak && window.bbKatAdatUrl) {
        katAdat(function () { if (li.matches(':hover') || li.contains(document.activeElement)) nyit(li); });
        return;
      }
      var adat = KATEGORIAK[li.id.replace('nav-item-', '')];
      if (!adat || !adat.length) { zar(); return; }
      if (aktiv) aktiv.classList.remove('bb-aktiv');
      aktiv = li;
      li.classList.add('bb-aktiv');
      panel.textContent = '';

      var fo = li.querySelector('.nav-link');
      var jobb = uj('div', 'bb-mega__jobb');
      var cim = uj('a', 'bb-mega__cim');
      var racs = uj('div', 'bb-mega__kartyak');
      jobb.appendChild(cim);
      jobb.appendChild(racs);

      var vanMelyebb = adat.some(function (k) { return k.c && k.c.length; });
      if (!vanMelyebb) {
        cim.textContent = (li.getAttribute('data-bb-nev') || fo.textContent.trim()) + ' – összes ›';
        cim.href = fo.getAttribute('href');
        kartyak(adat, racs);
        panel.appendChild(jobb);
      } else {
        var lista = uj('ul', 'bb-mega__lista');
        var elso = null;
        adat.forEach(function (k) {
          var li2 = uj('li');
          var a = uj('a', k.c && k.c.length ? 'van-al' : null, k.n);
          a.href = teljesCim(k.u);
          function mutat() {
            var regi = lista.querySelector('a.aktiv');
            if (regi) regi.classList.remove('aktiv');
            a.classList.add('aktiv');
            cim.textContent = k.n + ' – összes ›';
            cim.href = teljesCim(k.u);
            kartyak(k.c && k.c.length ? k.c : [k], racs);
          }
          a.addEventListener('mouseenter', mutat);
          a.addEventListener('focus', mutat);
          li2.appendChild(a);
          lista.appendChild(li2);
          if (!elso) elso = mutat;
        });
        panel.appendChild(lista);
        panel.appendChild(jobb);
        elso();
      }
      panel.hidden = false;
    }

    var nyitIdo = null;
    elemek.forEach(function (li) {
      li.addEventListener('mouseenter', function () {
        katAdat();
        clearTimeout(nyitIdo);
        clearTimeout(zarIdo);
        if (!panel.hidden) { nyit(li); return; }
        nyitIdo = setTimeout(function () { nyit(li); }, KESLELTETES);
      });
      li.addEventListener('mouseleave', function () { clearTimeout(nyitIdo); zarKesleltetve(); });
      li.addEventListener('focusin', function () { nyit(li); });
    });
    panel.addEventListener('mouseenter', function () { clearTimeout(zarIdo); });
    panel.addEventListener('mouseleave', zarKesleltetve);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zar(); });
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !(aktiv && aktiv.contains(e.target))) zar();
    });
    return true;
  }

  /* ── Telefonon a kereső a fejléc második sorában van (a sablonból). Itt a
     találati panel nyitása (érintés, gépelés) és zárása (a mező elhagyása,
     Escape, keresés); nyitva a lap elsötétül; az okos kereső (bbkOpen) átveszi ── */
  function mobilKereso() {
    var sor = $('#nav--mobile-top .bb-mkereso');
    var doboz = sor && $('#box_search_content', sor);
    var mezo = doboz && doboz.querySelector('.search-box__input');
    if (!sor || !doboz || !mezo || sor.getAttribute('data-bb')) return;
    sor.setAttribute('data-bb', '1');
    /* a sablon a mezőt az első kattintásig csak olvashatónak tartja (lenyílóhoz) — itt nem kell */
    mezo.removeAttribute('readonly');
    var hatter = $('.bb-mk-hatter') || uj('div', 'bb-mk-hatter');
    if (!hatter.parentNode) document.body.appendChild(hatter);
    var sablonZar = $('#search-box__dropdown .dropdown__btn-close');

    function okosKereso() { return kisMobil() && typeof window.bbkOpen === 'function'; }
    function okosPanel() { return okosKereso() && (window.bbkMode === 'panel' || window.bbkMode === 'sav'); }
    var figyelo = null;
    function okosFigyel() {
      var atfedo = document.getElementById('bbk-overlay');
      if (!atfedo || figyelo || !window.MutationObserver) return;
      figyelo = new MutationObserver(function () { if (!atfedo.classList.contains('open')) takarit(); });
      figyelo.observe(atfedo, { attributes: true, attributeFilter: ['class'] });
    }
    function takarit() {
      zar();
      if (document.body.classList.contains('scroll-lock') && sablonZar) sablonZar.click();
      if (document.getElementById('exposeMask') && window.jQuery && jQuery.mask && jQuery.mask.close) jQuery.mask.close();
      if (document.activeElement === mezo) mezo.blur();
    }
    function okosNyit(e) {
      if (!okosKereso()) return;
      if (okosPanel()) { okosFigyel(); return; }
      e.preventDefault();
      takarit();
      try { window.bbkOpen(mezo.value, mezo); } catch (err) { return; }
      okosFigyel();
    }
    mezo.addEventListener('touchstart', okosNyit, { passive: false });
    mezo.addEventListener('pointerdown', okosNyit);
    function nyit() {
      if (okosKereso() || !kisMobil() || sor.classList.contains('nyitva')) return;
      sor.classList.add('nyitva');
      gyoker.classList.add('bb-mk-nyitva');
    }
    function zar(kereses) {
      if (!sor.classList.contains('nyitva')) return;
      sor.classList.remove('nyitva');
      gyoker.classList.remove('bb-mk-nyitva');
      if (sablonZar && kereses !== true) sablonZar.click();
      if (window.jQuery && jQuery.mask && jQuery.mask.close) jQuery.mask.close();
      if (kereses !== true) setTimeout(function () { mezo.blur(); }, 0);
    }
    mezo.addEventListener('pointerdown', nyit);
    mezo.addEventListener('input', nyit);
    var belul = 0;
    sor.addEventListener('pointerdown', function () { belul = Date.now(); }, true);
    mezo.addEventListener('blur', function () {
      setTimeout(function () {
        if (document.activeElement === mezo) return;
        if (sor.classList.contains('nyitva')) { if (Date.now() - belul > 700) zar(); }
        else if (document.body.classList.contains('scroll-lock') && sablonZar) sablonZar.click();
      }, 300);
    });
    hatter.addEventListener('click', function () { zar(); });
    document.addEventListener('click', function (e) {
      if (sor.classList.contains('nyitva') && !sor.contains(e.target)) zar();
    }, true);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sor.classList.contains('nyitva')) zar();
    });
    var urlap = doboz.querySelector('form');
    if (urlap) urlap.addEventListener('submit', function () { zar(true); });
  }

  /* ── Telefonon a ragadós fejléc lefelé görgetésre felcsúszik, felfelé
     visszajön; a lap tetején és nyitott menü/kereső mellett mindig látszik.
     Egy böngészőben ki: ?mrejt=0 (vissza: ?mrejt=1). ── */
  function fejlecRejtes() {
    try {
      var mr = location.search.match(/[?&]mrejt=([01])/);
      if (mr) localStorage.setItem('bbMrejt', mr[1]);
      if (localStorage.getItem('bbMrejt') === '0') return;
    } catch (e) { /* tiltott tárhely */ }
    var nav = document.getElementById('nav--mobile-top');
    var belso = nav && nav.querySelector('.header-inner');
    if (!belso) return;
    var elozo = window.pageYOffset, utemezve = false;
    function nyitvaVanValami() {
      return gyoker.classList.contains('bb-mm-nyitva') || gyoker.classList.contains('bb-mk-nyitva') ||
        gyoker.classList.contains('bbk-lock') || document.body.classList.contains('scroll-lock') ||
        !!nav.querySelector('.dropdown__btn[aria-expanded="true"]');
    }
    function frissit() {
      utemezve = false;
      var y = window.pageYOffset, d = y - elozo;
      if (!kisMobil() || y <= belso.offsetHeight || nyitvaVanValami()) {
        gyoker.classList.remove('bb-fej-rejt');
        elozo = y;
        return;
      }
      if (Math.abs(d) < 10) return;
      gyoker.classList.toggle('bb-fej-rejt', d > 0);
      elozo = y;
    }
    window.addEventListener('scroll', function () {
      if (!utemezve) { utemezve = true; requestAnimationFrame(frissit); }
    }, { passive: true });
    belso.addEventListener('transitionend', function (e) {
      if (e.target === belso && e.propertyName === 'transform') window.dispatchEvent(new Event('scroll'));
    });
  }

  /* ── A Profil gomb kerete (bb-mf-profil): a feliratra koppintás is a gombot nyomja ── */
  function profilFelirat() {
    var keret = $('#nav--mobile-top .bb-mf-profil');
    var gomb = keret && keret.querySelector('.profile__dropdown-btn');
    if (!keret || !gomb) return;
    keret.addEventListener('click', function (e) {
      if (gomb.contains(e.target) || e.target.closest('.bb-lnz-gomb')) return;
      gomb.click();
    });
  }

  /* ── Beúszó, képes menü telefonon (csak magyarul): főkategóriák képpel,
     alkategóriák lapozva, hasznos linkek, elérhetőség, Legutóbb nézett, nyelv ── */
  var MOBIL_LINKEK = [305810, 912325, 103546, 657820, 385767, 927735, 727970, 199414];
  function mobilMenu() {
    var gomb = $('#nav--mobile-top .hamburger-box__dropdown-btn-mobile');
    var fok = $$('#dropdown-cat .nav-list--0 > li');
    if (!gomb || !fok.length || $('.bb-mm-hatter')) return;

    var hatter = uj('div', 'bb-mm-hatter');
    hatter.hidden = true;
    var fiok = uj('aside', 'bb-mm');
    fiok.setAttribute('role', 'dialog');
    fiok.setAttribute('aria-modal', 'true');
    fiok.setAttribute('aria-label', 'Menü');
    var fej = uj('div', 'bb-mm__fej');
    fej.appendChild(uj('span', 'bb-mm__cim', 'Menü'));
    var zarGomb = uj('button', 'bb-mm__zar');
    zarGomb.type = 'button';
    zarGomb.setAttribute('aria-label', 'Menü bezárása');
    zarGomb.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    fej.appendChild(zarGomb);
    var lapok = uj('div', 'bb-mm__lapok');
    fiok.appendChild(fej);
    fiok.appendChild(lapok);
    hatter.appendChild(fiok);
    document.body.appendChild(hatter);

    var verem = [];
    function sor(nev, href, kepUrl, tovabb) {
      var el = uj(tovabb ? 'button' : 'a', 'bb-mm__sor');
      if (tovabb) { el.type = 'button'; el.addEventListener('click', tovabb); } else el.href = href;
      var keret = uj('span', 'bb-mm__kep');
      if (kepUrl) { var k = uj('img'); k.src = kepUrl; k.alt = ''; k.loading = 'lazy'; keret.appendChild(k); }
      el.appendChild(keret);
      el.appendChild(uj('span', 'bb-mm__nev', nev));
      if (tovabb) el.appendChild(uj('span', 'bb-mm__nyil'));
      var li = uj('li');
      li.appendChild(el);
      return li;
    }
    function lap(cim, osszes, gyerekek, gyokerLap) {
      var l = uj('div', 'bb-mm__lap');
      if (!gyokerLap) {
        var vissza = uj('button', 'bb-mm__vissza', '‹ ' + cim);
        vissza.type = 'button';
        vissza.addEventListener('click', hatra);
        l.appendChild(vissza);
        var o = uj('a', 'bb-mm__osszes', 'Összes termék ›');
        o.href = osszes;
        l.appendChild(o);
      }
      var lista = uj('ul', 'bb-mm__lista');
      gyerekek.forEach(function (g) { lista.appendChild(g); });
      l.appendChild(lista);
      return l;
    }
    function elore(l) {
      var elozo = verem[verem.length - 1];
      lapok.appendChild(l);
      verem.push(l);
      l.getBoundingClientRect();
      l.classList.add('aktiv');
      if (elozo) elozo.classList.add('hatul');
      var f = l.querySelector('button, a');
      if (f) f.focus();
    }
    function hatra() {
      if (verem.length < 2) return;
      var l = verem.pop();
      l.classList.remove('aktiv');
      verem[verem.length - 1].classList.remove('hatul');
      setTimeout(function () { l.remove(); }, 260);
    }
    function alLap(cim, osszes, lista) {
      return lap(cim, osszes, lista.map(function (k) {
        var cimk = teljesCim(k.u);
        return sor(k.n, cimk, kepCim(k.i, k.t), k.c && k.c.length ? function () { elore(alLap(k.n, cimk, k.c)); } : null);
      }));
    }

    var sorok = [], kepHelyek = [];
    fok.forEach(function (li) {
      var id = li.id.replace('nav-item-', '');
      var a = li.querySelector('.nav-link');
      var nev = li.getAttribute('data-bb-nev') || (a ? a.textContent.trim() : '');
      var href = a ? a.getAttribute('href') : '#';
      var s = sor(nev, href, null, function () {
        katAdat(function () {
          var adat = KATEGORIAK[id];
          if (adat && adat.length) elore(alLap(nev, href, adat));
          else location.href = href;
        });
        if (!vanAdatForras()) location.href = href;
      });
      kepHelyek.push({ id: id, hely: s.querySelector('.bb-mm__kep') });
      sorok.push(s);
    });
    function kepekBe() {
      kepHelyek.forEach(function (h) {
        var kp = FOKEPEK[h.id];
        if (!kp || !h.hely || h.hely.firstChild) return;
        var k = uj('img'); k.src = kepCim(kp.i, kp.t); k.alt = ''; k.loading = 'lazy';
        h.hely.appendChild(k);
      });
    }
    var gyokerLap = lap('', '', sorok, true);

    gyokerLap.appendChild(uj('div', 'bb-mm__szekcio', 'Hasznos linkek'));
    var linkek = uj('div', 'bb-mm__linkek');
    MOBIL_LINKEK.forEach(function (id) {
      var a = $('.js-nav-item-' + id + ' > a');
      if (!a) return;
      var l = uj('a', null, a.textContent.trim());
      l.href = a.getAttribute('href');
      linkek.appendChild(l);
    });
    ['/blog', '/allas', '/palyazat'].forEach(function (h) {
      var a = $('.top-info-bar a[href="' + h + '"]');
      if (!a) return;
      var l = uj('a', null, a.textContent.trim());
      l.href = h;
      linkek.appendChild(l);
    });
    gyokerLap.appendChild(linkek);

    var kapcs = uj('div', 'bb-mm__kapcsolat');
    var tel = $('.top-info-bar a[href^="tel:"]');
    $$('.top-info-bar__left .top-info-bar__item').forEach(function (i) { kapcs.appendChild(uj('div', null, i.textContent.replace(/\s+/g, ' ').trim())); });
    if (tel) { var t = uj('a', null, tel.textContent.trim()); t.href = tel.getAttribute('href'); kapcs.appendChild(t); }
    gyokerLap.appendChild(kapcs);

    /* a Legutóbb nézett (#177011) óra-gombja nem fér a sorba: innen nyílik */
    var legutobb = uj('button', 'bb-mm__nyelv bb-mm__legutobb', 'Legutóbb nézett termékek');
    legutobb.type = 'button';
    legutobb.hidden = true;
    legutobb.addEventListener('click', function () {
      var g = $('#nav--mobile-top .bb-lnz-gomb-m');
      zar();
      if (g) setTimeout(function () { g.click(); }, 280);
    });
    gyokerLap.appendChild(legutobb);

    var nyelvGomb = $('#nav--mobile-top .lang-and-money__dropdown-btn');
    if (nyelvGomb) {
      var ny = uj('button', 'bb-mm__nyelv', 'Nyelv és pénznem');
      ny.type = 'button';
      ny.addEventListener('click', function () { zar(); setTimeout(function () { nyelvGomb.click(); }, 280); });
      gyokerLap.appendChild(ny);
    }

    function nyit() {
      katAdat(kepekBe);
      var lg = $('#nav--mobile-top .bb-lnz-gomb-m');
      var db = lg && lg.querySelector('.bb-lnz-db');
      legutobb.hidden = !lg || lg.hidden;
      legutobb.textContent = 'Legutóbb nézett termékek' + (db && db.textContent ? ' (' + db.textContent + ')' : '');
      while (verem.length > 1) verem.pop().remove();
      if (!verem.length) elore(gyokerLap);
      verem[0].classList.remove('hatul');
      hatter.hidden = false;
      hatter.getBoundingClientRect();
      hatter.classList.add('nyitva');
      gyoker.classList.add('bb-mm-nyitva');
      zarGomb.focus();
    }
    function zar() {
      hatter.classList.remove('nyitva');
      gyoker.classList.remove('bb-mm-nyitva');
      setTimeout(function () { hatter.hidden = true; }, 260);
      gomb.focus();
    }
    gomb.addEventListener('touchstart', function () { katAdat(); }, { passive: true });
    /* a sablon saját menüje helyett a miénk nyílik (csak 576 px alatt) */
    gomb.addEventListener('click', function (e) {
      if (!kisMobil()) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      nyit();
    }, true);
    zarGomb.addEventListener('click', zar);
    hatter.addEventListener('click', function (e) { if (e.target === hatter) zar(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !hatter.hidden) { if (verem.length > 1) hatra(); else zar(); }
    });
  }

  /* ── Hírlevél-sáv: visszatérési cím, ellenőrzés, láthatatlan reCAPTCHA
     (a bolt recaptcha_load()-ja és hírlevél-kulcsa); ha nem töltődik be, a
     hírlevél-oldalra visz ── */
  var HL_KULCS = '6LfG450rAAAAALmKO5xSb6edd6cVgxx57xvrF9k1';
  function hirlevel() {
    var sav = $('.bb-hl-sav');
    var f = sav && sav.querySelector('form.bb-hl');
    if (!f || f.getAttribute('data-bb')) return;
    f.setAttribute('data-bb', '1');
    var vissza = location.pathname + location.search.replace(/([?&])overlay=[^&]*&?/, '$1').replace(/[?&]$/, '');
    f.querySelector('input[name="file_back"]').value = vissza;
    f.querySelector('input[name="spec_back_url"]').value = location.origin + vissza;
    var uzenet = f.querySelector('.bb-hl-uzenet'), gomb = f.querySelector('.bb-hl-gomb');
    f.querySelector('.bb-hl-reszlet').addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var t = f.querySelector('.bb-hl-teljes'); t.hidden = !t.hidden;
      this.textContent = t.hidden ? 'Részletek' : 'Bezár';
    });
    function hibaUzenet(t) { uzenet.textContent = t; uzenet.hidden = false; }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      uzenet.hidden = true;
      var email = f.news_emai.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { hibaUzenet('Kérjük, adjon meg egy érvényes e-mail címet.'); f.news_emai.focus(); return; }
      if (!f.news_name.value.trim()) { hibaUzenet('Kérjük, adja meg a nevét.'); f.news_name.focus(); return; }
      if (!f.news_privacy_policy.checked) { hibaUzenet('A feliratkozáshoz kérjük, fogadja el a hozzájárulást.'); return; }
      if (typeof window.recaptcha_load !== 'function') { location.href = '/hirlevel'; return; }
      gomb.disabled = true;
      gomb.textContent = 'Küldés…';
      window.recaptcha_load();
      var vege = Date.now() + 10000, azon = null;
      (function var_() {
        var g = window.grecaptcha;
        if (g && typeof g.render === 'function') {
          try {
            if (azon === null) azon = g.render(f.querySelector('.bb-hl-recaptcha'), { sitekey: HL_KULCS, size: 'invisible', badge: 'inline', callback: function () { HTMLFormElement.prototype.submit.call(f); } });
            g.execute(azon);
          } catch (x) { location.href = '/hirlevel'; }
          return;
        }
        if (Date.now() < vege) setTimeout(var_, 300);
        else location.href = '/hirlevel';
      })();
    });
  }

  /* ── Lábléc: a lenyílók nyitása telefonon (a fejgomb a sablonból) ── */
  function lablecLenyilo() {
    $$('#footer .bb-lab-le > .bb-lab-fej').forEach(function (g) {
      if (g.getAttribute('data-bb')) return;
      g.setAttribute('data-bb', '1');
      g.addEventListener('click', function () {
        var nyitva = g.parentNode.classList.toggle('bb-lab-nyitva');
        g.setAttribute('aria-expanded', nyitva ? 'true' : 'false');
      });
    });
  }

  /* ── Lábléc, tartalék: az adminban hibásan beírt belső linkek („\rolunk”,
     „bi-bor.hu/…” protokoll nélkül) javítása; a saját, menün kívüli jogi oldalak
     a jogi listába az Elállás után, ha az adminban nincsenek ott (csak magyarul) ── */
  var JOGI_OLDALAK = [ ['/harmonizalt-ertesites', 'Harmonizált értesítés'], ['/velemenyek-ellenorzese', 'Vélemények ellenőrzése'], ['/kupon-szabalyzat', 'Kupon- és ajándékutalvány-szabályzat'] ];
  function lablecLinkek() {
    var forditott = new RegExp('^' + String.fromCharCode(92, 92) + '+');
    $$('#footer a[href]').forEach(function (a) {
      var h = a.getAttribute('href'), u = h.replace(forditott, '/').replace(/^(?:www\.)?bi-bor\.hu\//i, '/');
      if (u !== h) a.setAttribute('href', u);
    });
    if (!magyar) return;
    $$('#footer .footer_contact ul').forEach(function (lista) {
      var elozo = lista.querySelector('a[href$="/elallas-bejelentese"]') || lista.querySelector('a[href$="/aszf"]');
      elozo = elozo && elozo.closest('li');
      if (!elozo) return;
      JOGI_OLDALAK.forEach(function (o) {
        var a = lista.querySelector('a[href$="' + o[0] + '"]'), li = a && a.closest('li');
        if (!li) {
          li = uj('li');
          var l = uj('a', null, o[1]);
          l.href = o[0];
          li.appendChild(l);
        }
        if (li !== elozo.nextElementSibling) lista.insertBefore(li, elozo.nextSibling);
        elozo = li;
      });
    });
    /* a Harmonizált értesítés az Információk alól (ha az adminban még ott van) ne legyen kétszer */
    var info = $('#footer .footer__nav-2 .footer__html a[href$="/harmonizalt-ertesites"]');
    if (info && info.closest('li')) info.closest('li').remove();
  }
  /* ── Lábléc, tartalék nem magyar oldalon: „Kínálat és tudás” blokk a bolt
     menüjéből (magyarul a sablon adja) ── */
  var INFO_MENU = [305810, 387169, 103546, 912325, 657820];
  var KINALAT_CIM = { hu: 'Kínálat és tudás', en: 'Products & know-how', de: 'Sortiment & Wissen', hr: 'Ponuda i znanje', ro: 'Ofertă și sfaturi' };
  function lablecInfo() {
    var nav = $('#footer .footer__nav-2');
    var lista = nav && nav.querySelector('.footer__html ul');
    if (!lista || $('.bb-lab-kinalat', nav)) return;
    var ul = uj('ul', 'bb-lab-kinalat');
    INFO_MENU.forEach(function (id) {
      var m = $('.js-nav-item-' + id + ' > a');
      var href = m && m.getAttribute('href');
      if (!href) return;
      var ut = href.replace(/^https?:\/\/[^\/]+/i, '');
      if (lista.querySelector('a[href$="' + ut + '"]')) return;
      var li = uj('li');
      var a = uj('a', null, m.textContent.replace(/\s+/g, ' ').trim());
      a.href = href;
      li.appendChild(a);
      ul.appendChild(li);
    });
    var blog = lista.querySelector('a[href$="/blog"]');
    if (blog && blog.closest('li')) ul.appendChild(blog.closest('li'));
    if (!ul.children.length) return;
    nav.appendChild(uj('div', 'bb-lab-al', KINALAT_CIM[(gyoker.lang || 'hu').slice(0, 2)] || KINALAT_CIM.hu));
    nav.appendChild(ul);
  }

  /* ── Üres Puttony a lenyíló panelben: a bolt kék doboza és piros linkje
     helyett barátságos üres állapot; a bolt a panelt minden frissítéskor
     újraírja, ezért figyelő ── */
  function uresPuttony() {
    var panel = document.getElementById('cart-box__dropdown');
    if (!panel || panel.getAttribute('data-bb-pu')) return;
    panel.setAttribute('data-bb-pu', '1');
    var SZ = {
      hu: ['A Puttonya még üres', 'Nézzen körül a kínálatban, vagy csapjon le a szezonális akciókra!', 'Irány a kínálat', 'Akciós termékek'],
      en: ['Your basket is still empty', 'Browse our products or grab the seasonal offers!', 'Browse products', 'Special offers'],
      de: ['Ihr Warenkorb ist noch leer', 'Stöbern Sie im Sortiment oder greifen Sie bei den Saisonangeboten zu!', 'Zum Sortiment', 'Angebote'],
      hr: ['Vaša košarica je još prazna', 'Pogledajte ponudu ili iskoristite sezonske akcije!', 'Pogledaj ponudu', 'Akcijski proizvodi'],
      ro: ['Coșul dumneavoastră este încă gol', 'Răsfoiți oferta sau profitați de promoțiile sezoniere!', 'Vezi oferta', 'Produse la ofertă']
    }[(gyoker.lang || 'hu').slice(0, 2)] || null;
    if (!SZ) return;
    function alakit() {
      var c = panel.querySelector('.cart-box__empty-container');
      if (!c || c.querySelector('.bb-pu')) return;
      var link = c.querySelector('.cart-box__jump-to-products-btn');
      var akcio = $('a[href*="/akciok-es-szezonalis-termekek"]');
      var d = uj('div', 'bb-pu');
      var kor = uj('span', 'bb-pu-kor');
      kor.setAttribute('aria-hidden', 'true');
      kor.appendChild(uj('span', 'bb-puttony-ikon'));
      d.appendChild(kor);
      var cim = uj('p', 'bb-pu-cim', SZ[0]);
      cim.setAttribute('role', 'status');
      d.appendChild(cim);
      d.appendChild(uj('p', 'bb-pu-szoveg', SZ[1]));
      var g1 = uj('a', 'bb-pu-gomb', SZ[2]);
      g1.href = link ? link.href : '/kategoria';
      d.appendChild(g1);
      if (akcio) { var g2 = uj('a', 'bb-pu-gomb2', SZ[3]); g2.href = akcio.href; d.appendChild(g2); }
      c.appendChild(d);
      c.classList.add('bb-pu-kesz');
    }
    alakit();
    if (window.MutationObserver) new MutationObserver(alakit).observe(panel, { childList: true, subtree: true });
  }

  /* ── Nyelv és pénznem panel telefonon: a sablon linkjeibe zászló + név +
     pénznem; a nyelvvel együtt a pénznem is átáll (hu → Ft, en/de/hr → EUR,
     ro → RON: előbb POST a shop_moneychange.php-ra, utána nyelvváltás);
     külön pénznem a „Más pénznem” lenyitással ── */
  function nyelvPanel() {
    var p = document.getElementById('lang-and-money__dropdown');
    if (!p || p.getAttribute('data-bb-nv') || !telefon()) return;
    p.setAttribute('data-bb-nv', '1');
    var NYELV = (gyoker.lang || 'hu').slice(0, 2);
    var PENZ = { hu: 'HUF', en: 'EUR', de: 'EUR', hr: 'EUR', ro: 'RON' };
    var ZASZLO = { hu: 'hu', en: 'gb', de: 'de', hr: 'hr', ro: 'ro' };
    var SZ = {
      hu: ['Nyelv és pénznem', 'Más pénznem'], en: ['Language & currency', 'Other currency'],
      de: ['Sprache & Währung', 'Andere Währung'], hr: ['Jezik i valuta', 'Druga valuta'],
      ro: ['Limbă și monedă', 'Altă monedă']
    }[NYELV] || ['Language & currency', 'Other currency'];
    function zaszlo(kod) {
      var img = uj('img', 'bb-nv-zaszlo');
      img.src = 'https://flagcdn.com/w40/' + (ZASZLO[kod] || kod) + '.png';
      img.width = 24; img.height = 17; img.alt = '';
      return img;
    }
    function penzRadio(kod) {
      return $$('.currency__radio', p).filter(function (x) {
        var l = p.querySelector('label[for="' + x.id + '"]');
        return l && l.textContent.indexOf(kod) > -1;
      })[0] || null;
    }
    function valt(a) {
      var kod = a.getAttribute('data-langcode');
      var uri = a.getAttribute('data-uri') || '/';
      var cel = location.protocol + '//' + location.host + uri;
      var megy = false;
      var tovabb = function () { if (!megy) { megy = true; location.href = cel; } };
      var r = penzRadio(PENZ[kod]);
      if (!r || r.checked) { tovabb(); return; }
      a.classList.add('bb-nv-tolt');
      var adat = new URLSearchParams();
      adat.append('file_back', uri);
      adat.append('session_money_select', r.value);
      fetch(location.protocol + '//' + location.host + '/shop_moneychange.php', { method: 'POST', body: adat, credentials: 'same-origin' })
        .then(tovabb, tovabb);
      setTimeout(tovabb, 4000);
    }
    var cim = p.querySelector('.lang-box__title');
    if (cim) cim.textContent = SZ[0];
    $$('#box_lang_content a', p).forEach(function (a) {
      var kod = a.getAttribute('data-langcode') || '';
      var r = penzRadio(PENZ[kod]);
      var l = r && p.querySelector('label[for="' + r.id + '"]');
      var penz = l ? (PENZ[kod] === 'HUF' ? 'Ft' : PENZ[kod]) : '';
      a.textContent = '';
      a.appendChild(zaszlo(kod));
      a.appendChild(uj('span', 'bb-nv-nev', a.getAttribute('aria-label') || kod.toUpperCase()));
      if (penz) a.appendChild(uj('span', 'bb-nv-penz', penz));
    });
    p.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('#box_lang_content a');
      if (!a) return;
      e.preventDefault();
      e.stopPropagation();
      valt(a);
    }, true);
    var pb = p.querySelector('.currency-box');
    var pc = pb && pb.querySelector('.currency-box__title');
    if (pc) {
      pb.classList.add('bb-nv-zart');
      pc.textContent = SZ[1];
      pc.setAttribute('role', 'button');
      pc.setAttribute('aria-expanded', 'false');
      pc.tabIndex = 0;
      var nyit = function () {
        var ny = pb.classList.toggle('bb-nv-nyitva');
        pb.classList.toggle('bb-nv-zart', !ny);
        pc.setAttribute('aria-expanded', ny ? 'true' : 'false');
      };
      pc.addEventListener('click', nyit);
      pc.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nyit(); } });
    }
  }

  /* ── Profil menü (belépve): a zöld gombok helyett ikon + felirat + nyíl sorok, minden méretben.
     Eddig a mobil.js profilMenu()-je csinálta, de az 2026-10-15 óta csak telefonon töltődik be
     (eszköz szerinti betöltés), így asztalon a bolt nagy zöld gombjai látszottak (2026-10-19).
     Ugyanaz a jelölés (#profile__dropdown.bb-pm), így a mobil.js nem építi újra; a stílus:
     a mobil.css (576 px alatt) és a fejlec.scss (fölötte). Kikapcsolás egy böngészőben: ?profilmenu=0. ── */
  var PM_NYIL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  var PM_IKON = {
    'megrendelések': '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
    'kedvezmények': '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    'kedvencek': '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
    'címek': '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',
    'csomagpontok': '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    'adatmódosítás': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    'kilép': '<path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4"/><path d="M15 17l5-5-5-5M20 12H9"/>'
  };
  function pmSvg(d) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; }
  function profilMenu() {
    var be = null;
    try {
      var m = location.search.match(/[?&]profilmenu=([01])/);
      if (m) localStorage.setItem('bbProfilMenu', m[1]);
      be = localStorage.getItem('bbProfilMenu');
    } catch (e) { /* tiltott tárhely */ }
    if (be === '0') return;
    var d = document.getElementById('profile__dropdown');
    if (!d || d.querySelector('form[name="form_login"]') || d.classList.contains('bb-pm')) return;
    var belso = d.querySelector('.dropdown__content-inner') || d;
    var db = 0;
    $$('a, button:not(.dropdown__btn-close)', belso).forEach(function (a) {
      var kulcs = a.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
      var ikon = PM_IKON[kulcs];
      if (!ikon) return;
      db++;
      a.classList.add('bb-pm-sor');
      if (kulcs === 'kilép') a.classList.add('bb-pm-kilep');
      var cimke = a.textContent.trim();
      a.innerHTML = '<span class="bb-pm-ikon">' + pmSvg(ikon) + '</span><span class="bb-pm-cimke"></span>' +
        (kulcs === 'kilép' ? '' : '<span class="bb-pm-nyil">' + PM_NYIL + '</span>');
      a.querySelector('.bb-pm-cimke').textContent = cimke;
      var szulo = a.parentNode;
      if (szulo && szulo !== belso && szulo.children.length === 1) szulo.classList.add('bb-pm-hely');
    });
    if (db >= 3) d.classList.add('bb-pm');
  }

  function indul() {
    try { belepett(); } catch (e) { hiba('belépett', e); }
    try { profilMenu(); } catch (e) { hiba('profil menü', e); }
    try { rovidNevek(); } catch (e) { hiba('rövid nevek', e); }
    try {
      /* az oldal betöltése után üresjáratban előre lekérjük a kategóriaadatot */
      if (!window.bbKategoriak && window.bbKatAdatUrl) {
        var elokeres = function () { setTimeout(function () { (window.requestIdleCallback || setTimeout)(function () { katAdat(); }); }, 1500); };
        if (document.readyState === 'complete') elokeres(); else window.addEventListener('load', elokeres);
      }
      if (!(magyar && vanAdatForras() && nagyMenu())) gyorsLenyilo();
    } catch (e) { hiba('kategóriamenü', e); }
    try { mobilKereso(); } catch (e) { hiba('mobil kereső', e); }
    try { fejlecRejtes(); } catch (e) { hiba('fejléc rejtés', e); }
    try { profilFelirat(); } catch (e) { hiba('profil felirat', e); }
    try { if (magyar) mobilMenu(); } catch (e) { hiba('mobil menü', e); }
    try { hirlevel(); } catch (e) { hiba('hírlevél', e); }
    try { lablecLenyilo(); } catch (e) { hiba('lábléc lenyílók', e); }
    try { lablecLinkek(); } catch (e) { hiba('lábléc linkek', e); }
    try { lablecInfo(); } catch (e) { hiba('lábléc Információk', e); }
    try { uresPuttony(); } catch (e) { hiba('üres Puttony', e); }
    try { nyelvPanel(); } catch (e) { hiba('nyelv panel', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
  else indul();
})();
