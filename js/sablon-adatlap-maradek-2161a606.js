/* Saját termékadatlap — a sablonszintű elrendezés mellett megmaradó kis JS.
   A csomagol.sh a content_product_details_1.html végére teszi (script-tagben),
   csak a termékoldalon fut. A szerkezetet a sablon adja; itt csak az marad,
   ami adatfüggő vagy csak a böngészőben dönthető el:
     • címkék a morzsamenü kategóriáiból (a sablonban nincs kategória-útvonal)
     • egységár elrejtése, ha ugyanaz, mint az ár
     • álló bélyegképek → a sablon Flickity-lapozója
     • szállítási módok és díjak (window.BB_SZALL_TILT: tiltások, felárak, és
       a d kulcsban a díjtábla — a muveletek/szallitas_tiltasok.php adja naponta);
       „Érdeklődjön” terméknél díjtábla helyett egyedi ajánlat (eddig a #184966)
     • a Villányi üzlet átvételi sora és az irányítószám-ellenőrző a szállítási dobozba
     • 3D-nézet felugró ablak (model-viewer, csak kattintásra töltődik)
     • Google-véleménysáv (Trustindex) a Vélemények fölé, ha megjelent
     • BorLabor-nyilatkozat jelölőnégyzete → a rejtett legördülő
     • ragadós alsó sáv, mobil ragadós kép, asztalon ragadós kép- és jobb oszlop,
       látogatók sora, szekcióra görgetés
   Tilos a tartalomban: dupla kapcsos nyitó, dupla szögletes nyitó (sablonjelölés). */
(function () {
  var gyoker = document.documentElement;
  var magyar = (gyoker.lang || 'hu').slice(0, 2) === 'hu';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  var MODEL_VIEWER = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js';

  /* ── Címkék: a morzsamenü kategóriái a cím alá ── */
  function cimkek() {
    var doboz = document.getElementById('bb-a-fej');
    if (!doboz || $('.bb-a-cimkek', doboz)) return;
    var linkek = $$('.breadcrumb--desktop .breadcrumb-item a:not(.breadcrumb--home)');
    if (!linkek.length) return;
    var tarto = document.createElement('div');
    tarto.className = 'bb-a-cimkek';
    linkek.forEach(function (a) {
      var uj = document.createElement('a');
      uj.href = a.href;
      uj.textContent = a.textContent.trim();
      tarto.appendChild(uj);
    });
    var sor = $('.bb-a-sor', doboz);
    doboz.insertBefore(tarto, sor ? sor.nextSibling : null);
  }

  /* ── Egységár: darabos terméknél ugyanaz, mint az ár → rejtve ── */
  function egysegar(tartalom) {
    var ar = $('.artdet__price-and-countdown', tartalom);
    if (!ar) return;
    var egyseg = $('.artdet__price-unit', ar);
    var fo = $('.product-price--sale .price-gross, .artdet__price-sale .price-gross', ar) || $('.artdet__price-base .price-gross', ar);
    var egysegAr = egyseg && $('.price-gross', egyseg);
    if (egyseg && fo && egysegAr) egyseg.classList.toggle('bb-a-rejt', egysegAr.textContent.trim() === fo.textContent.trim());
  }

  /* ── Álló bélyegképek (a sablon rajzolja): a Flickity-lapozót vezérlik ── */
  function belyegkepek(tartalom) {
    var keret = $('.bb-a-bkep-keret', tartalom);
    var fo = $('.js-alts', tartalom);
    if (!keret || !fo || keret.getAttribute('data-bb-kesz')) return;
    var flick = window.Flickity && window.Flickity.data ? window.Flickity.data(fo) : null;
    if (!flick) return; /* a lapozó még nem indult el: a következő körben újra */
    keret.setAttribute('data-bb-kesz', '1');
    var lista = $('.bb-a-bkepek', keret);
    var gombok = $$('button[data-bb-kep]', lista);
    gombok.forEach(function (g) {
      g.addEventListener('click', function () { flick.select(+g.getAttribute('data-bb-kep')); });
    });
    var fel = $('.bb-a-bkep-nyil--fel', keret), le = $('.bb-a-bkep-nyil--le', keret);
    function nyilak() {
      fel.hidden = lista.scrollTop <= 2;
      le.hidden = lista.scrollTop + lista.clientHeight >= lista.scrollHeight - 2;
    }
    [fel, le].forEach(function (g, i) {
      g.addEventListener('click', function () {
        lista.scrollBy({ top: (i ? 1 : -1) * (lista.clientHeight - 60), behavior: 'smooth' });
      });
    });
    lista.addEventListener('scroll', nyilak, { passive: true });
    window.addEventListener('resize', nyilak);
    function jelol() {
      gombok.forEach(function (g, i) {
        var aktiv = i === flick.selectedIndex;
        g.setAttribute('aria-current', aktiv ? 'true' : 'false');
        if (aktiv && (g.offsetTop < lista.scrollTop || g.offsetTop + g.offsetHeight > lista.scrollTop + lista.clientHeight)) {
          lista.scrollTo({ top: g.offsetTop - 8, behavior: 'smooth' });
        }
      });
    }
    flick.on('select', jelol);
    jelol();
    nyilak();
    flick.resize();
  }

  /* ── Szállítási módok és díjak a vásárlódoboz alatt ── */
  /* A díjtábla: n = név, c = csoport (bolt | pont | haz), i = mód-azonosító,
     s = súlysávok (tól kg, ig kg, Ft), t = nem a súlytól függ. A tiltások
     scriptje adja (BB_SZALL_TILT.d); tartalék: window.BB_SZALL_DIJAK. */
  function dijtabla() {
    var adat = window.BB_SZALL_TILT;
    if (adat && adat.d && adat.d.length) return adat.d;
    var tartalek = window.BB_SZALL_DIJAK;
    if (tartalek && tartalek.d) tartalek = tartalek.d;
    return (tartalek && tartalek.length) ? tartalek : [];
  }
  function suly(tartalom) {
    var ertek = $('.data__item-weight .data__item-value', tartalom);
    var cimke = '';
    if (!ertek) {
      $$('.artdet__spec-param, .data__item-param', tartalom).some(function (sor) {
        var c = $('.artdet__spec-param-title, .artdet__param-title', sor);
        if (!c || !/súly|tömeg/i.test(c.textContent)) return false;
        ertek = $('.artdet__spec-param-value, .artdet__param-value', sor);
        cimke = c.textContent;
        return !!ertek;
      });
    }
    if (!ertek) return null;
    var t = ertek.textContent.replace(/\s/g, '').replace(',', '.');
    var m = t.match(/([\d.]+)(kg|g|gramm)?/i);
    if (!m) return null;
    var szam = parseFloat(m[1]);
    var egyseg = (m[2] || (/kg/i.test(cimke) ? 'kg' : /gramm|\(g\)/i.test(cimke) ? 'g' : '')).toLowerCase();
    if (!egyseg) return null;
    return egyseg === 'kg' ? szam : szam / 1000;
  }
  /* A rövid leírásban megadott egyedi futáros díj („… kiszállítás díja br. 8 000 Ft/db”) */
  function egyediFutarDij(tartalom) {
    var leiras = $('#artdet__short-descrition', tartalom);
    if (!leiras) return null;
    var m = leiras.textContent.replace(/\s+/g, ' ')
      .match(/szállítás(?:i)?\s+díja[^0-9]{0,40}?(?:br\.?|bruttó)?\s*([0-9][0-9 .  ]*)\s*Ft(\s*\/\s*db)?/i);
    if (!m) return null;
    var ft = parseInt(m[1].replace(/[^0-9]/g, ''), 10);
    return ft > 0 ? forint(ft) + (m[2] ? '/db' : '') : null;
  }
  function forint(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft'; }
  /* A díj egy darab súlyára; ha nem ismert, „-tól”. null: a súlya kívül esik a mód határain. */
  function dij(mod, kg, plusz) {
    if (!mod.s.length) return { szoveg: magyar ? 'Ingyenes' : 'Free', ingyen: true, ft: 0 };
    function kiir(ft, tol) {
      ft += plusz || 0;
      if (ft === 0) return { szoveg: magyar ? 'Ingyenes' : 'Free', ingyen: true, ft: 0 };
      return { szoveg: forint(ft) + (tol ? (magyar ? '-tól' : '+') : ''), ft: ft };
    }
    if (kg === null || mod.t) {
      var min = Math.min.apply(null, mod.s.map(function (s) { return s[2]; }));
      if (kg !== null && (kg < mod.s[0][0] || kg > mod.s[mod.s.length - 1][1])) return null;
      return kiir(min, min > 0);
    }
    for (var i = 0; i < mod.s.length; i++) {
      if (kg >= mod.s[i][0] && kg <= mod.s[i][1]) return kiir(mod.s[i][2], false);
      if (kg < mod.s[i][0]) return i ? kiir(mod.s[i][2], false) : null;
    }
    return null;
  }
  var IKON = {
    bolt: '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',
    pont: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v6M15 4v6"/>',
    haz: '<path d="M1 4h14v12H1zM15 9h4l3 3v4h-7z"/><circle cx="6" cy="18.5" r="2"/><circle cx="18" cy="18.5" r="2"/>'
  };
  var CSOPORT = [
    { k: 'bolt', cim: 'Személyes átvétel' },
    { k: 'pont', cim: 'Csomagpont, automata' },
    { k: 'haz', cim: 'Házhozszállítás' }
  ];
  function cikkszam(tartalom) {
    var elem = $('.artdet__sku-value', tartalom);
    return elem ? elem.textContent.trim() : '';
  }
  /* Cikkszám-lista a BB_SZALL_TILT-ben (x: csak átvétel, n: nincs saját kiszállítás, l: labor) */
  function listaban(kulcs, tartalom) {
    var adat = window.BB_SZALL_TILT;
    if (!adat || typeof adat[kulcs] !== 'string') return null;
    return ('|' + adat[kulcs] + '|').indexOf('|' + cikkszam(tartalom) + '|') > -1;
  }
  function tiltottak(tartalom) {
    var adat = window.BB_SZALL_TILT;
    if (!adat || !adat.t) return null;
    var sku = cikkszam(tartalom), ki = {};
    Object.keys(adat.t).forEach(function (kulcs) {
      if (('|' + adat.t[kulcs] + '|').indexOf('|' + sku + '|') === -1) return;
      kulcs.split('.').forEach(function (azon) { ki[azon] = true; });
    });
    return ki;
  }
  /* Termékenkénti többletdíj módonként (BB_SZALL_TILT.c: "id:ft.id:ft" → cikkszámok) */
  function felarak(tartalom) {
    var adat = window.BB_SZALL_TILT, ki = {};
    if (!adat || !adat.c) return ki;
    var sku = cikkszam(tartalom);
    Object.keys(adat.c).forEach(function (kulcs) {
      if (('|' + adat.c[kulcs] + '|').indexOf('|' + sku + '|') === -1) return;
      kulcs.split('.').forEach(function (par) {
        var r = par.split(':');
        var azon = r[0];
        ki[azon] = +r[1] || 0;
      });
    });
    return ki;
  }

  /* ── „Érdeklődjön” termékek (raklapos palack, tartály, gép…; 2026-10-27 óta itt, eddig a #184966 UNAS Script,
     a main-en design/erdeklodjon.js). Nem tehetők a puttonyba, a szállítást egyedi ajánlatban adjuk meg — a díjtábla
     és az aktivált módok félrevezetnének. Helyettük rövid tájékoztató és „Ajánlatot kérek” gomb (a bolt saját
     Érdeklődjön ablakát nyitja). A doboz egyszer, rögtön ezzel a tartalommal készül (eddig a script a már kirajzolt
     díjtáblát cserélte le: ugrás). Egy böngészőben ki: ?erdszall=0 (vissza: ?erdszall=1) — mint eddig. A régi script,
     amíg aktív, a data-erd="1" jelölőt látja, és nem nyúl hozzá. Stílus: adatlap.scss. ── */
  function erdeklodo() {
    if (!$('#artdet__inquire .artdet__inquire-btn')) return false;
    try {
      var m = location.search.match(/[?&]erdszall=([01])/);
      if (m) localStorage.setItem('bbErdSzall', m[1]);
      if (localStorage.getItem('bbErdSzall') === '0') return false;
    } catch (e) { /* privát mód: az alapbeállítás */ }
    return true;
  }
  function erdeklodoDoboz(racs) {
    var doboz = document.createElement('div');
    doboz.id = 'bb-a-szall';
    doboz.setAttribute('data-adat', '1'); /* ne rajzoljuk újra az adat érkezésekor */
    doboz.setAttribute('data-erd', '1');
    doboz.innerHTML = '<div class="bb-a-szcsop bb-a-szcsop--ajanlat"><h2 class="bb-a-szcim">'
      + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + IKON.haz + '</svg>Szállítás egyedi ajánlattal</h2>'
      + '<p class="bb-a-ajanlat">Ennél a terméknél a szállítás módját és díját személyre szabott ajánlatban adjuk meg, a mennyiség és a szállítási cím alapján, a lehető legkedvezőbben.</p>'
      + '<p class="bb-a-ajanlat bb-a-ajanlat--kicsi">Írjon nekünk, és hamarosan jelentkezünk a részletekkel.</p>'
      + '<button type="button" class="bb-a-sajat-gomb bb-a-ajanlat-gomb">Ajánlatot kérek</button></div>';
    doboz.querySelector('.bb-a-ajanlat-gomb').addEventListener('click', function () {
      var g = $('#artdet__inquire .artdet__inquire-btn');
      if (g) g.click();
    });
    (document.getElementById('bb-a-jobb') || racs).appendChild(doboz);
    gyoker.classList.add('bb-a-van-szall', 'bb-a-erdeklodo');
  }

  var INDULAS = Date.now();
  function szallitas(tartalom) {
    var meglevo = document.getElementById('bb-a-szall');
    /* adat nélkül rajzolt doboz: ha közben megjött az adat, újrarajzoljuk */
    if (meglevo && meglevo.getAttribute('data-adat') === '0' && window.BB_SZALL_TILT) {
      var zipDoboz = document.getElementById('bb-zip-artdet');
      if (zipDoboz && meglevo.contains(zipDoboz)) meglevo.parentNode.insertBefore(zipDoboz, meglevo);
      meglevo.parentNode.removeChild(meglevo);
      meglevo = null;
    }
    var SZALLITAS = dijtabla();
    if (!magyar || !SZALLITAS.length || meglevo) return;
    /* „Érdeklődjön” termék: a díjtábla helyett egyedi ajánlat — rögtön, a tiltási adatra nem kell várni */
    if (erdeklodo()) {
      var racsE = $('.artdet__pic-data-row', tartalom);
      if (racsE && !listaban('l', tartalom)) erdeklodoDoboz(racsE);
      return;
    }
    /* A tiltások scriptje (defer) utánunk jöhet: 2 mp-ig kivárjuk az adatát */
    if (!window.BB_SZALL_TILT && Date.now() - INDULAS < 2000) return;
    var racs = $('.artdet__pic-data-row', tartalom);
    if (!racs) return;
    if (listaban('l', tartalom)) return; /* labor-szolgáltatás: nincs mit kiszállítani */
    var csakAtvetel = !!listaban('x', tartalom);
    var sajatNincs = csakAtvetel || !!listaban('n', tartalom);
    var kg = suly(tartalom);
    var tiltas = tiltottak(tartalom);
    var felar = felarak(tartalom);
    var doboz = document.createElement('div');
    doboz.id = 'bb-a-szall';
    doboz.setAttribute('data-adat', tiltas ? '1' : '0');
    CSOPORT.forEach(function (cs) {
      var sorok = '';
      var valaszthato = [];
      SZALLITAS.forEach(function (mod) {
        if (mod.c !== cs.k || (csakAtvetel && cs.k !== 'bolt')) return;
        if (tiltas ? tiltas[mod.i] : mod.c !== 'bolt') return;
        var d = dij(mod, kg, felar[mod.i]);
        if (d) valaszthato.push({ mod: mod, d: d });
      });
      var egyedi = cs.k === 'haz' && !csakAtvetel && egyediFutarDij(tartalom);
      if (egyedi) valaszthato = [ { mod: { n: 'Futárszolgálat' }, d: { szoveg: egyedi, ft: 0 } } ];
      /* Házhozszállításból csak a legolcsóbb — a saját autós sor mellette mindig ott van */
      if (cs.k === 'haz' && valaszthato.length > 1) {
        valaszthato.sort(function (a, b) { return a.d.ft - b.d.ft; });
        valaszthato = valaszthato.slice(0, 1);
      }
      valaszthato.forEach(function (v) {
        sorok += '<dt>' + v.mod.n.replace(/[<&]/g, '') + '</dt><dd' + (v.d.ingyen ? ' class="bb-a-ingyen"' : '') + '>' + v.d.szoveg + '</dd>';
      });
      if (cs.k === 'haz' && !sajatNincs) {
        sorok += '<dt>Saját autónkkal, szállítási területünkön</dt>' +
          '<dd><button type="button" class="bb-a-sajat-gomb" aria-expanded="false">Kivisszük?</button></dd>';
      }
      if (!sorok) return;
      doboz.insertAdjacentHTML('beforeend',
        '<div class="bb-a-szcsop bb-a-szcsop--' + cs.k + '"><h2 class="bb-a-szcim"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        IKON[cs.k] + '</svg>' + cs.cim +
        (cs.k !== 'bolt' ? '<a href="/shop_contact.php?tab=shipping">Részletek</a>' : '') +
        '</h2><dl class="bb-a-szlista">' + sorok + '</dl>' +
        (cs.k === 'bolt' ? '<p class="bb-a-atvet" hidden></p>' : '') +
        (cs.k === 'haz' ? '<div class="bb-a-sajat" hidden></div>' : '') +
        '</div>');
    });
    if (!doboz.children.length) return;
    var megjegyzes = csakAtvetel ? 'Ez a termék csak személyesen vehető át, kiszállítani nem tudjuk.'
      : !tiltas ? 'A választható szállítási módokat és díjukat a pénztárban látja.'
      : egyediFutarDij(tartalom) ? ''
      : kg === null ? 'A pontos díj a puttony súlyától függ.' : 'Egy darab díja; több darabnál a puttony össztömege számít.';
    if (megjegyzes) doboz.insertAdjacentHTML('beforeend', '<p class="bb-a-szmegj">' + megjegyzes + '</p>');
    var gomb = $('.bb-a-sajat-gomb', doboz);
    if (gomb) gomb.addEventListener('click', function () {
      var tarto = $('.bb-a-sajat', doboz);
      var nyitva = tarto.hidden;
      tarto.hidden = !nyitva;
      gomb.setAttribute('aria-expanded', nyitva ? 'true' : 'false');
      gomb.textContent = nyitva ? 'Bezár' : 'Kivisszük?';
      var mezo = nyitva && $('.bb-zip__input', tarto);
      if (mezo) mezo.focus();
    });
    /* a jobb oszlop burkolójába (a sablon adja; asztalon a vásárlódobozzal együtt ragad) */
    (document.getElementById('bb-a-jobb') || racs).appendChild(doboz);
    gyoker.classList.add('bb-a-van-szall');
  }
  /* A Villányi üzlet dobozát a Termékoldal reform tartja karban; a szövegét ide tükrözzük */
  function atvetel() {
    var sor = $('#bb-a-szall .bb-a-atvet');
    var uzlet = document.getElementById('artdet__warehouses');
    if (!sor || !uzlet) return;
    var atveheto = $('.bba-pickup', uzlet);
    var keszlet = $('.artdet__warehouse-quantity', uzlet);
    var szoveg = atveheto ? atveheto.textContent.trim() : '';
    var ok = !!szoveg;
    if (!szoveg && keszlet) szoveg = 'Villányi üzlet: ' + keszlet.textContent.trim();
    if (sor.textContent !== szoveg) sor.textContent = szoveg;
    sor.hidden = !szoveg;
    sor.classList.toggle('bb-a-atvet--ok', ok);
  }
  /* Az irányítószám-ellenőrző (ghost script) a saját autós sor alá, lenyithatóan */
  function sajatAuto() {
    var tarto = $('#bb-a-szall .bb-a-sajat');
    var zip = document.getElementById('bb-zip-artdet');
    if (tarto && zip && zip.parentNode !== tarto) tarto.appendChild(zip);
  }

  /* ── „Választható szolgáltatásaink” helye (#bb-szolg-hely, a sablon teszi a Puttonyba gomb elé, CLS):
     ha a valódi doboz (#bb-szolg, UNAS Script, DOMContentLoaded) megjött, kivesszük (a CSS addigra már rejti);
     ha 1 mp-cel a DOMContentLoaded után sincs (a termék mégis kizárt), az üres helyet is ── */
  var DCL_IDO = 0;
  function szolgHely() {
    var hely = document.getElementById('bb-szolg-hely');
    if (!hely) return;
    if (document.getElementById('bb-szolg') || (DCL_IDO && Date.now() - DCL_IDO >= 900)) hely.parentNode.removeChild(hely);
  }

  /* ── 3D-nézet: a gombot a sablon adja, az ablak kattintásra épül ── */
  function haromD(tartalom) {
    var gomb = document.getElementById('bb-a-3d-gomb');
    if (!gomb || gomb.getAttribute('data-bb-kesz')) return;
    gomb.setAttribute('data-bb-kesz', '1');
    if (gomb.getAttribute('data-bb-proba')) {
      var kapcsolo = null;
      try {
        var m = location.search.match(/[?&]uj3d=([01])/);
        if (m) localStorage.setItem('bbUj3d', m[1]);
        kapcsolo = localStorage.getItem('bbUj3d');
      } catch (e) { /* tiltott tárhely: a próbamodell nem látszik */ }
      if (kapcsolo === '1') gomb.hidden = false;
    }
    gomb.addEventListener('click', function () {
      nyit3D({ u: gomb.getAttribute('data-bb-3d'), a: gomb.getAttribute('data-bb-forras') },
        (($('.artdet__name', tartalom) || {}).textContent || '').trim());
    });
  }
  function nyit3D(modell, nev) {
    if (!document.getElementById('bb-a-mv')) {
      var betolto = document.createElement('script');
      betolto.type = 'module';
      betolto.id = 'bb-a-mv';
      betolto.src = MODEL_VIEWER;
      document.head.appendChild(betolto);
    }
    var ablak = document.getElementById('bb-a-3d');
    if (!ablak) {
      ablak = document.createElement('div');
      ablak.id = 'bb-a-3d';
      ablak.setAttribute('role', 'dialog');
      ablak.setAttribute('aria-modal', 'true');
      ablak.setAttribute('aria-label', (magyar ? '3D nézet: ' : '3D view: ') + nev);
      var belso = document.createElement('div');
      belso.className = 'bb-a-3d-belso';
      var mv = document.createElement('model-viewer');
      mv.setAttribute('src', modell.u);
      mv.setAttribute('alt', nev);
      ['camera-controls', 'auto-rotate', 'ar', 'touch-action'].forEach(function (a) { mv.setAttribute(a, a === 'touch-action' ? 'pan-y' : ''); });
      mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
      mv.setAttribute('shadow-intensity', '1');
      mv.setAttribute('environment-image', 'neutral');
      var ar = document.createElement('button');
      ar.type = 'button';
      ar.setAttribute('slot', 'ar-button');
      ar.className = 'bb-a-3d-ar';
      ar.textContent = magyar ? 'Nézze meg otthon' : 'View in your space';
      mv.appendChild(ar);
      var bezar = document.createElement('button');
      bezar.type = 'button';
      bezar.className = 'bb-a-3d-bezar';
      bezar.setAttribute('aria-label', magyar ? 'Bezárás' : 'Close');
      bezar.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      var teljes = document.createElement('button');
      teljes.type = 'button';
      teljes.className = 'bb-a-3d-teljes';
      teljes.textContent = magyar ? 'Teljes képernyő' : 'Full screen';
      teljes.addEventListener('click', function () {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (belso.requestFullscreen) belso.requestFullscreen();
      });
      var sugo = document.createElement('p');
      sugo.className = 'bb-a-3d-sugo';
      sugo.textContent = (magyar ? 'Forgatás: húzással · Nagyítás: görgővel vagy két ujjal' : 'Drag to rotate · Scroll or pinch to zoom') +
        (modell.a ? ' · ' + modell.a : '');
      belso.appendChild(mv);
      belso.appendChild(bezar);
      belso.appendChild(teljes);
      belso.appendChild(sugo);
      ablak.appendChild(belso);
      document.body.appendChild(ablak);
      function csuk() {
        if (document.fullscreenElement) document.exitFullscreen();
        ablak.hidden = true;
        gyoker.classList.remove('bb-a-3d-nyitva');
        var g = document.getElementById('bb-a-3d-gomb');
        if (g) g.focus();
      }
      bezar.addEventListener('click', csuk);
      ablak.addEventListener('click', function (e) { if (e.target === ablak) csuk(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !ablak.hidden) csuk(); });
    }
    ablak.hidden = false;
    gyoker.classList.add('bb-a-3d-nyitva');
    $('.bb-a-3d-bezar', ablak).focus();
  }

  /* ── Google-vélemények (Trustindex): a leírásból a Vélemények fölé (#bb-a-google a sablonban) ── */
  function velemenysav() {
    var reszletek = $('#pane-details .tab-pane__container');
    var doboz = document.getElementById('bb-a-google');
    if (!reszletek || !doboz) return true; /* nincs hova: nem figyelünk tovább */
    if (!doboz.hidden) return true;
    var sav = $('.ti-widget, [class*="ti-widget"]', reszletek);
    if (!sav) return false;
    /* a legkülső olyan burkolója, amiben rajta kívül nincs más szöveg */
    var mozgo = sav;
    var hossz = sav.textContent.trim().length;
    while (mozgo.parentNode && mozgo.parentNode !== reszletek && mozgo.parentNode.textContent.trim().length === hossz) mozgo = mozgo.parentNode;
    doboz.appendChild(mozgo);
    doboz.hidden = false;
    return true;
  }
  /* A „Véleményt írok” linkek mellé a tájékoztató, ha a sablon (vagy a bolt beágyazása) nem tette oda */
  function velemenyTajekoztato() {
    $$('a[href*="shop_artforum.php"]').forEach(function (a) {
      if (a.parentNode.querySelector('.bb-a-vel-info')) return;
      var l = document.createElement('a');
      l.className = 'bb-a-vel-info';
      l.href = '/velemenyek-ellenorzese';
      l.textContent = magyar ? 'Hogyan ellenőrizzük a véleményeket?' : 'How are reviews checked?';
      a.parentNode.insertBefore(l, a.nextSibling);
    });
  }

  /* ── BorLabor-nyilatkozat: a jelölőnégyzet a rejtett legördülőt állítja ── */
  /* Induláskor (és a böngésző „vissza” gombja után, pageshow) a négyzet a legördülő értékét követi */
  function nyilatkozat() {
    $$('input[data-bb-jelolo-select]').forEach(function (negyzet) {
      var sel = document.getElementById(negyzet.getAttribute('data-bb-jelolo-select'));
      if (sel) negyzet.checked = !!sel.value;
    });
  }
  window.addEventListener('pageshow', function () { lepes('nyilatkozat', nyilatkozat); });
  document.addEventListener('change', function (e) {
    var negyzet = e.target;
    if (!negyzet || !negyzet.getAttribute || !negyzet.getAttribute('data-bb-jelolo-select')) return;
    var sel = document.getElementById(negyzet.getAttribute('data-bb-jelolo-select'));
    if (!sel) return;
    var ertek = '';
    for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value) { ertek = sel.options[i].value; break; }
    sel.value = negyzet.checked ? ertek : '';
    if (negyzet.checked) sel.classList.remove('is-invalid');
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ── Ragadós alsó sáv: akkor látszik, ha a fő Puttonyba gomb már nem ── */
  function sav(tartalom) {
    var sav = document.getElementById('artdet__fixed-cart');
    var kosar = $('#artdet__cart', tartalom);
    if (!sav || !kosar || sav.getAttribute('data-bb-a') || typeof IntersectionObserver !== 'function') return;
    sav.setAttribute('data-bb-a', '1');
    new IntersectionObserver(function (bejegyzesek) {
      var e = bejegyzesek[0];
      sav.classList.toggle('bb-a-lathato', !e.isIntersecting && e.boundingClientRect.top < 0);
    }).observe(kosar);
  }

  /* ── Látogatók sora (idegen script szúrja be később): a cikkszám mellé ── */
  function latogatok() {
    var jel = document.getElementById('bb-live-viewers');
    var sor = $('#bb-a-fej .bb-a-sor');
    if (jel && sor && jel.parentNode !== sor) sor.appendChild(jel);
  }

  /* ── Mobil: a kép a helyén marad, a tartalom görgetéskor rácsúszik ── */
  function mobilKep(tartalom) {
    if (gyoker.getAttribute('data-bb-mkep')) return;
    var kapcsolo = null;
    try {
      var m = location.search.match(/[?&]mobilkep=([01])/);
      if (m) localStorage.setItem('bbMobilKep', m[1]);
      kapcsolo = localStorage.getItem('bbMobilKep');
    } catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
    if (kapcsolo === '0') return;
    var oszlop = $('.artdet__img-data-left-col', tartalom);
    var fejresz = document.getElementById('bb-a-fej');
    if (!oszlop || !fejresz || !window.matchMedia) return;
    gyoker.setAttribute('data-bb-mkep', '1');
    var mobil = window.matchMedia('(max-width: 767.98px)');
    var fejlec = document.getElementById('nav--mobile-top');
    function hatter() {
      var el = oszlop.parentNode;
      while (el && el.nodeType === 1) {
        var h = getComputedStyle(el).backgroundColor;
        if (h && h !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(h)) { gyoker.style.setProperty('--bb-a-lap', h); return; }
        el = el.parentNode;
      }
    }
    function teteje() {
      if (!fejlec) return 0;
      var poz = getComputedStyle(fejlec).position;
      if (poz !== 'fixed' && poz !== 'sticky') return 0;
      return Math.max(0, Math.round(fejlec.getBoundingClientRect().bottom));
    }
    var utemezve = false;
    function frissit() {
      utemezve = false;
      var t = teteje();
      var be = mobil.matches && oszlop.offsetHeight <= (window.innerHeight - t) * 0.85;
      gyoker.classList.toggle('bb-a-mkep', be);
      if (!be) { oszlop.style.opacity = ''; return; }
      gyoker.style.setProperty('--bb-a-mkep-teteje', t + 'px');
      var takar = (t + oszlop.offsetHeight - fejresz.getBoundingClientRect().top) / oszlop.offsetHeight;
      takar = Math.min(1, Math.max(0, takar));
      oszlop.style.opacity = (1 - takar * 0.85).toFixed(3);
    }
    function utemez() { if (!utemezve) { utemezve = true; requestAnimationFrame(frissit); } }
    hatter();
    frissit();
    window.addEventListener('scroll', utemez, { passive: true });
    window.addEventListener('resize', utemez);
    [500, 1500, 3000].forEach(function (ms) { setTimeout(utemez, ms); });
  }

  /* ── Asztal (≥1200 px): ragadós kép- és jobb oszlop (a CSS position: sticky-je mellé a teteje) ──
     Ami befér a fejléc alá, a fejléc alatt ragad; ami magasabb a képernyőnél, az alja ragad
     (negatív top: lefelé görgetve előbb végigér, utána az alja marad látható), így sosem vágódik le.
     A leghosszabb oszlop (a rács magassága) magától nem mozdul. A rácsból (a Részletek előtt) nem lóg ki. */
  function ragados(tartalom) {
    if (gyoker.getAttribute('data-bb-ragad') || !window.matchMedia) return;
    var oszlopok = [$('.artdet__img-data-left-col', tartalom), document.getElementById('bb-a-jobb')].filter(Boolean);
    if (!oszlopok.length) return;
    gyoker.setAttribute('data-bb-ragad', '1');
    var asztal = window.matchMedia('(min-width: 1200px)');
    var RES = 16;
    var kicsi = 120; /* az összehúzott asztali fejléc magassága (v18); az első összehúzáskor mérjük */
    function fejlec() {
      var fej = document.getElementById('header--desktop');
      var belso = fej && $('.js-header-inner', fej);
      if (belso && fej.classList.contains('is-shrinked') && belso.offsetHeight) kicsi = belso.offsetHeight;
      /* a sablon --header-height--small-ja az összehúzás előtt az alap 60 px — arra nem építünk */
      return kicsi;
    }
    function alul() {
      /* alul ragadó oszlopnál a ragadós alsó kosársáv (ha van) ne takarja az oszlop alját */
      var s = document.getElementById('artdet__fixed-cart');
      return RES + (s && s.offsetHeight && getComputedStyle(s).display !== 'none' ? s.offsetHeight : 0);
    }
    var utemezve = false;
    function frissit() {
      utemezve = false;
      if (!asztal.matches) {
        oszlopok.forEach(function (o) { if (o.style.getPropertyValue('--bb-a-ragad')) o.style.removeProperty('--bb-a-ragad'); });
        return;
      }
      var fent = fejlec() + RES;
      var lent = alul();
      oszlopok.forEach(function (o) {
        var h = o.offsetHeight;
        var t = h <= window.innerHeight - fent - RES ? fent : Math.min(fent, Math.round(window.innerHeight - h - lent));
        if (o.style.getPropertyValue('--bb-a-ragad') !== t + 'px') o.style.setProperty('--bb-a-ragad', t + 'px');
      });
    }
    function utemez() { if (!utemezve) { utemezve = true; requestAnimationFrame(frissit); } }
    frissit();
    window.addEventListener('resize', utemez);
    window.addEventListener('scroll', utemez, { passive: true });
    var fej = document.getElementById('header--desktop');
    if (fej) fej.addEventListener('transitionend', utemez); /* az összehúzás animációja után újramérünk */
    if (typeof ResizeObserver === 'function') {
      var ro = new ResizeObserver(utemez);
      oszlopok.forEach(function (o) { ro.observe(o); });
    }
  }

  /* A „Részletek” és „További adatok” gomb (a sablon .js-scroll-to-btn-je) a fülhöz görgetne,
     ami nincs: helyette a szekció elejére, a sablon kezelője nem fut le. */
  function szekcioGomb(e) {
    var gomb = e.target && e.target.closest && e.target.closest('.js-scroll-to-btn');
    if (!gomb) return;
    var cel = (gomb.getAttribute('data-click-acc') || gomb.getAttribute('data-click-tab') || '').replace(/^#(accordion-btn-|tab-)/, '');
    var panel = cel && document.getElementById('pane-' + cel);
    if (!panel || !panel.offsetHeight) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var fejlec = document.getElementById('nav--mobile-top') || document.querySelector('.header--fixed, #header');
    var fent = 10;
    if (fejlec) {
      var poz = getComputedStyle(fejlec).position;
      if (poz === 'fixed' || poz === 'sticky') fent += Math.max(0, fejlec.getBoundingClientRect().bottom);
    }
    window.scrollTo({ top: panel.getBoundingClientRect().top + window.pageYOffset - fent, behavior: 'smooth' });
  }

  function lepes(nev, fv, tartalom) {
    try { fv(tartalom); } catch (e) { if (window.console) console.error('[adatlap] hiba: ' + nev, e); }
  }
  function futtat() {
    var tartalom = document.getElementById('page_artdet_content');
    if (!tartalom) return false;
    lepes('címkék', cimkek, tartalom);
    lepes('egységár', egysegar, tartalom);
    lepes('szállítás', szallitas, tartalom);
    lepes('átvétel', atvetel, tartalom);
    lepes('saját autó', sajatAuto, tartalom);
    lepes('sáv', sav, tartalom);
    lepes('bélyegképek', belyegkepek, tartalom);
    lepes('látogatók', latogatok, tartalom);
    lepes('vélemény-tájékoztató', velemenyTajekoztato, tartalom);
    lepes('3D', haromD, tartalom);
    lepes('mobil kép', mobilKep, tartalom);
    lepes('ragadós oszlopok', ragados, tartalom);
    lepes('nyilatkozat', nyilatkozat, tartalom);
    lepes('szolgáltatás-hely', szolgHely, tartalom);
    return true;
  }
  /* „Kérdés a termékről” ablak (embed_question_1.html, 2026-10-19): a termék kis kártyája a lapról
     (fő kép, név, cikkszám). Az ablak tartalma ajax-szal jön, ezért a megjelenését figyeljük. */
  function kerdesKartya() {
    var hely = document.querySelector('.bb-kerdes__termek');
    if (!hely || !hely.hidden || hely.getAttribute('data-kesz')) return;
    hely.setAttribute('data-kesz', '1');
    var tartalom = document.getElementById('page_artdet_content');
    if (!tartalom) return;
    var nevEl = tartalom.querySelector('h1');
    var nev = nevEl ? nevEl.textContent.replace(/\s+/g, ' ').trim() : '';
    if (!nev) return;
    /* a termék főképe: az og:image (mindig a valódi termékfotó); a képterület első képe matrica is lehet
       (pl. „Szállítás 990 Ft-tól”) — 2026-10-19 így került a matrica a kártyára */
    var og = document.querySelector('meta[property="og:image"]');
    var kepUrl = og && og.getAttribute('content');
    if (!kepUrl) {
      var fo = tartalom.querySelector('.artdet__img-main img:not([class*="sticker"]), .js-alts .carousel-cell:first-child img');
      kepUrl = fo && (fo.currentSrc || fo.src);
    }
    var sku = cikkszam(tartalom);
    if (kepUrl) {
      var k = document.createElement('img');
      k.src = kepUrl; k.alt = ''; k.width = 52; k.height = 52;
      hely.appendChild(k);
    }
    var szoveg = document.createElement('div');
    var n = document.createElement('div'); n.className = 'bb-kerdes__termek-nev'; n.textContent = nev; szoveg.appendChild(n);
    if (sku) { var s = document.createElement('div'); s.className = 'bb-kerdes__termek-sku'; s.textContent = (magyar ? 'Cikkszám: ' : 'SKU: ') + sku; szoveg.appendChild(s); }
    hely.appendChild(szoveg);
    hely.hidden = false;
  }
  function kerdesFigyelo() {
    if (typeof MutationObserver !== 'function') return;
    var utemezve = false;
    new MutationObserver(function () {
      if (utemezve) return;
      utemezve = true;
      requestAnimationFrame(function () { utemezve = false; try { kerdesKartya(); } catch (e) { /* nem kritikus */ } });
    }).observe(document.body, { childList: true, subtree: true });
  }
  function indul() {
    DCL_IDO = Date.now();
    try { kerdesFigyelo(); } catch (e) { /* nem kritikus */ }
    if (!futtat()) return;
    document.addEventListener('click', szekcioGomb, true);
    /* a többi adatlap-script és a képlapozó később épül fel: néhány ismétlés kivárja őket */
    [300, 1000, 2500, 5000, 9000].forEach(function (ms) { setTimeout(futtat, ms); });
    var t = $('#page_artdet_content .artdet__data-right-inner');
    if (t && typeof MutationObserver === 'function') {
      var utemezve = false;
      new MutationObserver(function () {
        if (utemezve) return;
        utemezve = true;
        requestAnimationFrame(function () {
          utemezve = false;
          latogatok();
          lepes('átvétel', atvetel);
          lepes('saját autó', sajatAuto);
          lepes('szolgáltatás-hely', szolgHely);
        });
      }).observe(t, { childList: true, subtree: true, characterData: true });
    }
    document.addEventListener('bbZipRendered', function () { lepes('saját autó', sajatAuto); });
    /* A Google-véleménysáv a süti-hozzájárulás után bármikor megjelenhet */
    var reszletek = document.getElementById('pane-details');
    if (reszletek && typeof MutationObserver === 'function') {
      var figyelo = new MutationObserver(function () {
        var kesz = false;
        try { kesz = velemenysav(); } catch (e) { /* a következő változásnál újra */ }
        if (kesz) figyelo.disconnect();
      });
      var kesz = true;
      try { kesz = velemenysav(); } catch (e) { kesz = false; if (window.console) console.error('[adatlap] hiba: vélemények', e); }
      if (!kesz) figyelo.observe(reszletek, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
  else indul();
})();
