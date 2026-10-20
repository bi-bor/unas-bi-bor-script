/* ════════════════════════════════════════════════════════════════════════
   PUTTONY, FELUGRÓK, FIÓK — a sablon maradék JS-e (sablon-alap ág, PUTTONY lépés, 2026-10-20)
   A csomagol.sh a main.html végére ágyazza (a PUTTONY-maradék helyőrzőjére, a fejléc maradék-JS-e után;
   BB_CDN=1-gyel külső fájl a jsDelivr-ről). Ami itt van, az a design/mobil.js (#173691),
   mobil-kieg.js (#174796), asztali.js (#175476), asztali-2.js (#176061) és zold-gombok.js (#173041)
   olyan része, ami nem tehető a sablonba:
   1. a terméklistán Puttonyba után jobbról beúszó kosárpanel (576 px alatt) a sablon saját
      paneljéből, a régi „Várható beérkezés felugró” (#162856) figyelmeztetésével, „Tovább válogatok”
      gombbal, és a darabszám-léptető a panelben — a panel tartalmát a bolt ajax-szal írja (box_cart,
      nincs sablonfájl a letöltésben), ezért figyelő;
   2. html.bb-puttony-tele / -ures (a fejléc Puttony-ikonja: üres vagy teli) a buborék számából;
   3. a kártyák raktárjelzése röviden a nem listás helyeken (nyitóoldali, adatlapi sávok): „Több mint
      20 db raktáron” → „20+ db raktáron” (a lista saját scriptje csak a listát intézi);
   4. a termék-sávok telefonon: a sáv a kártyák tényleges magasságának maximumát kapja (html.bb-kieg-sav), és
      betöltés, betűtípus és átméretezés után újramér, hogy a gombok egy vonalban legyenek és ne vágódjanak le;
   5. az adatlap értékelés-sora telefonon: „5” → „5,0”, „/ 1 Értékelés” → „1 értékelés”;
   6. a belépés a profil menüben 576 px alatt: alcím, jelszó-szem, „Elfelejtett jelszó” a jelszó alá,
      „vagy” + Google, Regisztráció külön blokkban (a box_login tartalma a boltból jön, nem sablonfájl);
   7. az ÁSZF oldal (/aszf): a saját jogi oldalak sora a fülek alatt / lenyílók után;
   8. telefonon az üres tartalomblokk rejtése és az elérhetőség-lista jelölése (bb-kieg-ures, bb-kieg-eler).
   A magyar szövegeket csak magyar oldalon írja (a régi scriptek nyelvtől függetlenül írták).
   Idempotens: amíg a régi scriptek is élnek, ugyanazt a jelölést használja (bb-kp, bb-lep-van, bb-bl,
   bb-puttony-tele, data-bb), ezért nem épít semmit kétszer.
   Tilos: két szögletes zárójel egymás mellett, dupla kapcsos, a sablon százalékos jelölése, a záró script-tag, emoji.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var gyoker = document.documentElement;
  var HU = (gyoker.lang || 'hu').slice(0, 2) === 'hu';
  function hiba(mi, e) { if (window.console) console.error('[puttony] ' + mi, e); }
  function kisMobil() { return !!(window.matchMedia && window.matchMedia('(max-width: 575.98px)').matches); }
  function mobil() { return !!(window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches); }
  function szoveg(el, uj) { if (el && el.textContent !== uj) el.textContent = uj; }

  /* ── 1. Kosárpanel a terméklistán (576 px alatt) ─────────────────────────
     Puttonyba után (csak listakártyáról) a „Várható beérkezés felugró” (#162856,
     #bb-cart-panel) helyett a sablon saját kosárpanelje nyílik meg jobbról. Ha a
     felugró várható beérkezést vagy készlethiányt írna ki, azt a panel tetején
     mutatjuk. Az adatlap marad. (design/mobil.js 4., 7.) */
  var utolsoListaKatt = 0;
  var toltoGomb = null;
  var FIGY_IKON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  var PUTTONY_IKON = '<span class="bb-puttony-ikon" aria-hidden="true"></span>';

  function kosarGomb() {
    var gombok = document.querySelectorAll('.cart-box__dropdown-btn');
    for (var i = 0; i < gombok.length; i++) if (gombok[i].offsetParent) return gombok[i];
    return null;
  }
  function panel() { return document.getElementById('cart-box__dropdown'); }

  /* a régi felugró szövegéből csak a figyelmeztetés kell (a „Raktáron” nem) */
  function figyelmeztetes(felugro) {
    var sorok = [];
    var allapot = felugro.querySelector('.bb-status--wait, .bb-status--short');
    if (allapot) sorok.push(allapot.textContent.trim());
    [].forEach.call(felugro.querySelectorAll('.bb-note'), function (n) { sorok.push(n.innerHTML); });
    return sorok;
  }
  var figySorok = '';
  function figyKiir(sorok) {
    sorok = sorok.filter(function (t) { return t && t.replace(/<[^>]*>/g, '').trim(); });
    var html = sorok.length ? FIGY_IKON + '<div><p>' + sorok[0].replace(/</g, '&lt;') + '</p>' +
      sorok.slice(1).map(function (h) { return '<p>' + h + '</p>'; }).join('') + '</div>' : '';
    if (html === figySorok) return;
    figySorok = html;
    figyHelyre();
  }
  function figyHelyre() {
    var p = panel();
    if (!p) return;
    var doboz = document.getElementById('bb-kp-figy');
    if (!figySorok) { if (doboz) doboz.parentNode.removeChild(doboz); return; }
    var utana = p.querySelector('.bb-kp-tetel') || p.querySelector('.cart-box__title');
    if (!utana) return;
    if (!doboz) {
      doboz = document.createElement('div');
      doboz.id = 'bb-kp-figy';
      doboz.setAttribute('role', 'status');
    }
    if (doboz.bbTartalom !== figySorok) { doboz.innerHTML = figySorok; doboz.bbTartalom = figySorok; }
    if (utana.nextSibling !== doboz) utana.parentNode.insertBefore(doboz, utana.nextSibling);
  }

  /* A panel szövegei (csak magyarul). A sablon minden frissítéskor újraírja a tartalmat,
     ezért többször is lefut; csak akkor ír a DOM-ba, ha még nincs kész. */
  function tovabbGomb() {
    var p = panel();
    if (!p) return;
    var cim = p.querySelector('.cart-box__title');
    if (cim && !cim.querySelector('.bb-puttony-ikon')) cim.insertAdjacentHTML('afterbegin', PUTTONY_IKON);
    var tetelek = p.querySelectorAll('.cart-box__item:not(.cart-box__item-package-offer-item)').length;
    if (cim && tetelek && HU) {
      var db = p.querySelector('.bb-kp-tetel');
      if (!db) {
        db = document.createElement('div');
        db.className = 'bb-kp-tetel';
        cim.parentNode.insertBefore(db, cim.nextSibling);
      }
      szoveg(db, tetelek + ' tétel');
    }
    figyHelyre();
    if (HU) szoveg(p.querySelector('.cart-box__sum-text'), 'Becsült végösszeg');
    var osszeg = p.querySelector('.cart-box__sum');
    if (HU && osszeg && !(osszeg.nextSibling && osszeg.nextSibling.className === 'bb-kp-megj')) {
      var megj = document.createElement('p');
      megj.className = 'bb-kp-megj';
      megj.textContent = 'Az ár az ÁFÁ-t tartalmazza. A szállítási díjat a pénztárban számoljuk.';
      osszeg.parentNode.insertBefore(megj, osszeg.nextSibling);
    }
    var helye = p.querySelector('.js-cart-box-btns');
    if (!helye) return;
    var fo = helye.querySelector('a, button:not(.bb-kp-tovabb)');
    if (HU && fo && !fo.querySelector('*')) szoveg(fo, 'Tovább a Puttonyhoz');
    else if (HU && fo) { var t = fo.querySelector('span:not([class*="icon"])'); szoveg(t, 'Tovább a Puttonyhoz'); }
    if (helye.querySelector('.bb-kp-tovabb')) return;
    var g = document.createElement('button');
    g.type = 'button';
    g.className = 'bb-kp-tovabb';
    var zarGomb = p.querySelector('.dropdown__btn-close');
    g.textContent = HU ? 'Tovább válogatok' : ((zarGomb && zarGomb.getAttribute('aria-label')) || 'OK');
    g.addEventListener('click', kosarpanelZar);
    helye.appendChild(g);
  }

  var zarasFolyik = false;
  function sablonZar() {
    var p = panel();
    var zar = p && p.querySelector('.dropdown__btn-close');
    zarasFolyik = true;
    if (zar) zar.click(); else { var k = kosarGomb(); if (k) k.click(); }
    zarasFolyik = false;
  }
  /* kiúszik, és csak utána zárja be a sablon */
  function kosarpanelZar() {
    if (!gyoker.classList.contains('bb-kp') || gyoker.classList.contains('bb-kp-zar')) return;
    gyoker.classList.add('bb-kp-zar');
    setTimeout(function () { sablonZar(); gyoker.classList.remove('bb-kp-zar'); }, 290);
  }

  function kosarpanelNyit() {
    var p = panel(), gomb = kosarGomb();
    if (!p || !gomb) return false;
    if (gyoker.classList.contains('bb-kp')) return true; /* már nyitva */
    gyoker.classList.add('bb-kp');
    var hatter = document.createElement('div');
    hatter.className = 'bb-kp-hatter';
    hatter.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); kosarpanelZar(); });
    document.body.appendChild(hatter);
    if (!p.classList.contains('is-active')) gomb.click();
    /* zárásnál (a sablon leveszi az is-active osztályt) visszaállunk */
    var figyelo = new MutationObserver(function () {
      tovabbGomb();
      if (!p.classList.contains('is-active')) {
        figyelo.disconnect();
        gyoker.classList.remove('bb-kp');
        if (hatter.parentNode) hatter.parentNode.removeChild(hatter);
        figySorok = '';
        var d = document.getElementById('bb-kp-figy');
        if (d) d.parentNode.removeChild(d);
      }
    });
    var x = p.querySelector('.dropdown__btn-close');
    if (x && !x.getAttribute('data-bb-kp')) {
      x.setAttribute('data-bb-kp', '1');
      x.addEventListener('click', function (e) {
        if (zarasFolyik || !gyoker.classList.contains('bb-kp')) return;
        e.preventDefault(); e.stopImmediatePropagation();
        kosarpanelZar();
      }, true);
    }
    setTimeout(function () {
      figyelo.observe(p, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
      tovabbGomb();
    }, 50);
    return true;
  }

  function kosarbaTeve() {
    if (!kisMobil() || Date.now() - utolsoListaKatt > 8000) return;
    utolsoListaKatt = 0;
    if (toltoGomb) { toltoGomb.classList.remove('bb-tolt'); toltoGomb = null; }
    if (!kosarpanelNyit()) return;
    /* a régi felugró pár tized másodperc múlva épül fel: elrejtjük, a
       figyelmeztetését átvesszük (a készlethiány később, a lekérdezés után jön) */
    var vege = Date.now() + 4000;
    (function nez() {
      var felugro = document.getElementById('bb-cart-panel');
      if (felugro) {
        felugro.style.setProperty('display', 'none', 'important');
        figyKiir(figyelmeztetes(felugro));
      }
      if (Date.now() < vege && gyoker.classList.contains('bb-kp')) setTimeout(nez, 150);
    })();
  }

  function kosarpanelIndul() {
    /* ha ez a script kétszer kerülne az oldalra, csak egyszer iratkozik fel. (A régi mobil.js #173691 nem
       teszi ki ezt a jelölőt, amíg él, ő is feliratkozik — de a panelt a html.bb-kp őr miatt csak az egyik
       építi, a másik „már nyitva”-ként tér vissza; a figyelmeztető doboz azonosítója közös.) */
    if (gyoker.getAttribute('data-bb-kosarpanel')) return;
    gyoker.setAttribute('data-bb-kosarpanel', 'sablon');
    document.addEventListener('click', function (e) {
      var g = e.target && e.target.closest && e.target.closest('.product__cart-btn');
      if (!g || !g.closest('[id^="page_artlist_"]') || g.closest('#page_artdet_content')) return;
      utolsoListaKatt = Date.now();
      if (kisMobil()) {
        toltoGomb = g;
        g.classList.add('bb-tolt');
        setTimeout(function () { g.classList.remove('bb-tolt'); }, 6000);
      }
      /* tartalék, ha az addToCartSuccess esemény nem jönne */
      var ido = Date.now();
      (function var_() {
        if (!utolsoListaKatt) return;
        if (document.getElementById('bb-cart-panel')) { kosarbaTeve(); return; }
        if (Date.now() - ido < 5000) setTimeout(var_, 200);
      })();
    }, true);
    var jq = window.jQuery;
    if (jq) jq(document).on('addToCartSuccess', function () { setTimeout(kosarbaTeve, 60); });
    /* a fejléc Puttony gombjával (vagy bárhogy) nyitott panel is a beúszó változat legyen */
    var p = panel();
    if (p && window.MutationObserver) new MutationObserver(function () {
      if (p.classList.contains('is-active') && kisMobil() && !gyoker.classList.contains('bb-kp') && !zarasFolyik) kosarpanelNyit();
    }).observe(p, { attributes: true, attributeFilter: ['class'] });
  }

  /* Darabszám-léptető (− 1 +) a kosárpanelben (576 px alatt): a Puttony oldal darabszám-
     módosítását hívja a háttérben (sablon nélküli űrlap, action2=modify), majd frissíti a
     panelt. Ha a panel és a Puttony oldal tételei nem egyeznek, a Puttony oldalra visz. */
  var LEP_MINUSZ = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
  var LEP_PLUSZ = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>';
  var lepIdozito = null, lepFolyik = false;
  function cikkszamok(gy, elotag) {
    return [].map.call(gy.querySelectorAll('[id^="' + elotag + '"]'), function (e) { return e.id.slice(elotag.length); })
      .filter(function (c) { return c.indexOf('box-') !== 0; });
  }
  function lepKuld() {
    var p = panel();
    if (!p || lepFolyik) return;
    var tetelek = [].slice.call(p.querySelectorAll('.cart-box__item'));
    var valtozott = tetelek.some(function (t) { return t.bbUj != null; });
    if (!valtozott) return;
    lepFolyik = true;
    p.classList.add('cart-refreshing', 'bb-lep-folyik');
    function vege(ok) {
      lepFolyik = false;
      p.classList.remove('bb-lep-folyik');
      if (ok && typeof window.cart_refresh === 'function') window.cart_refresh();
      else { p.classList.remove('cart-refreshing'); location.href = '/shop_cart.php'; }
    }
    var cim = '/shop_cart.php?ajax_nodesign=1';
    fetch(cim, { credentials: 'same-origin' }).then(function (v) { return v.text(); }).then(function (html) {
      var d = new DOMParser().parseFromString(html, 'text/html');
      var urlap = d.querySelector('form[name="form_temp"]');
      var mezok = d.querySelectorAll('input[name="db[]"]');
      var itt = cikkszamok(p, 'label-cart-box-'), ott = cikkszamok(d, 'label-cart-');
      if (!urlap || mezok.length !== tetelek.length || itt.join('|') !== ott.join('|')) { vege(false); return; }
      tetelek.forEach(function (t, i) {
        if (t.bbUj == null) return;
        var m = mezok[i];
        var also = +(m.getAttribute('data-min') || m.getAttribute('min') || 1) || 1;
        var felso = +(m.getAttribute('data-max') || m.getAttribute('max') || 999999) || 999999;
        var lepes = +(m.getAttribute('data-step') || m.getAttribute('step') || 1) || 1;
        var uj = (+m.value || 0) + (t.bbUj - t.bbRegi) * lepes;
        m.value = String(Math.min(felso, Math.max(also, uj)));
      });
      var adat = new URLSearchParams();
      [].forEach.call(urlap.elements, function (e) {
        if (!e.name || e.disabled || /^(button|submit|reset|file)$/.test(e.type)) return;
        if (/^(checkbox|radio)$/.test(e.type) && !e.checked) return;
        adat.append(e.name, e.value);
      });
      adat.set('action2', 'modify');
      return fetch(cim, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: adat.toString()
      }).then(function (v) { vege(v.ok); });
    }).catch(function () { vege(false); });
  }
  function lepteto() {
    var p = panel();
    if (!p || p.getAttribute('data-bb-lepteto')) return;
    p.setAttribute('data-bb-lepteto', 'sablon');
    function beepit() {
      if (!kisMobil() || p.querySelector('.cart-box__item-package-offer-item')) return;
      [].forEach.call(p.querySelectorAll('.cart-box__item'), function (t) {
        var hely = t.querySelector('.cart-box__volume');
        var db = hely && hely.querySelector('.cart-box__volume-qty');
        if (!db || hely.querySelector('.bb-lep')) return;
        var n = parseInt(db.textContent, 10);
        if (!(n > 0)) return;
        t.bbRegi = n; t.bbUj = null;
        var l = document.createElement('div');
        l.className = 'bb-lep';
        l.innerHTML = '<button type="button" class="bb-lep-minusz" aria-label="' + (HU ? 'Eggyel kevesebb' : '-') + '">' + LEP_MINUSZ + '</button>' +
          '<span class="bb-lep-db" aria-live="polite"></span>' +
          '<button type="button" class="bb-lep-plusz" aria-label="' + (HU ? 'Eggyel több' : '+') + '">' + LEP_PLUSZ + '</button>';
        function mutat() {
          var most = t.bbUj == null ? t.bbRegi : t.bbUj;
          l.querySelector('.bb-lep-db').textContent = most;
          l.querySelector('.bb-lep-minusz').disabled = most <= 1;
        }
        l.addEventListener('click', function (e) {
          var g = e.target.closest('button');
          e.preventDefault(); e.stopPropagation();
          if (!g || g.disabled || lepFolyik) return;
          var most = t.bbUj == null ? t.bbRegi : t.bbUj;
          most += g.classList.contains('bb-lep-plusz') ? 1 : -1;
          if (most < 1) return;
          t.bbUj = most === t.bbRegi ? null : most;
          mutat();
          clearTimeout(lepIdozito);
          lepIdozito = setTimeout(lepKuld, 700);
        });
        mutat();
        hely.insertBefore(l, hely.firstChild);
        hely.classList.add('bb-lep-van');
      });
    }
    new MutationObserver(beepit).observe(p, { childList: true, subtree: true });
    beepit();
  }

  /* ── 2. Van-e tétel a Puttonyban: html.bb-puttony-tele / -ures (zold-gombok.js) ──
     A darabszám a buborékban van, a felolvasó-szöveg (.sr-only) nélkül. A puttonyt
     a bolt ajax-szal frissíti, ezért figyelő; csak változáskor ír. */
  function puttonyFrissit() {
    var db = 0;
    var buborekok = document.querySelectorAll('.cart-box__bubble');
    if (!buborekok.length) return;
    for (var i = 0; i < buborekok.length; i++) {
      var masolat = buborekok[i].cloneNode(true);
      var rejtett = masolat.querySelectorAll('.sr-only');
      for (var j = 0; j < rejtett.length; j++) rejtett[j].remove();
      db = Math.max(db, parseInt(masolat.textContent.replace(/\D/g, ''), 10) || 0);
    }
    var tele = db > 0;
    if (gyoker.classList.contains('bb-puttony-tele') !== tele) gyoker.classList.toggle('bb-puttony-tele', tele);
    if (gyoker.classList.contains('bb-puttony-ures') !== !tele) gyoker.classList.toggle('bb-puttony-ures', !tele);
  }
  function puttonyIkon() {
    puttonyFrissit();
    var varakozik = false;
    if (window.MutationObserver) new MutationObserver(function () {
      if (varakozik) return;
      varakozik = true;
      setTimeout(function () { varakozik = false; puttonyFrissit(); }, 50);
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ── 3. Raktárjelzés röviden a kártyákon (sávok): „Több mint 20 db raktáron” → „20+ db raktáron” ── */
  function raktarRovid() {
    if (!HU) return;
    [].forEach.call(document.querySelectorAll('.product .product__stock .stock__qty-and-unit.is-text'), function (el) {
      if (el.children.length) return;
      var t = el.textContent.trim(), m = t.match(/^Több mint (.+?) (db|darab|pár|csomag|kg|l|m)? ?raktáron$/i);
      if (m) el.textContent = m[1] + '+ ' + (m[2] ? m[2] + ' ' : '') + 'raktáron';
    });
  }

  /* ── 4. Termék-sávok telefonon (mobil.js karuszelek, mobil-kieg.js savok): a sáv a LÁTHATÓ kártyák tényleges
     (tartalom szerinti) magasságának maximumát kapja, és lapozáskor nem változik (különben az alatta lévő
     tartalom ugrál); betöltéskor, a betűtípusok után és átméretezéskor számol újra. ── */
  function savMagassag(c, f) {
    var max = 0, keret = 0, elso = null;
    c.classList.add('bb-kieg-meres');
    f.cells.forEach(function (cella) {
      var k = cella.element.querySelector('.product__inner');
      if (!k) return;
      if (!elso) { elso = getComputedStyle(cella.element); keret = (parseFloat(elso.paddingTop) || 0) + (parseFloat(elso.paddingBottom) || 0); }
      max = Math.max(max, k.offsetHeight);
    });
    c.classList.remove('bb-kieg-meres');
    var uj = max > 0 ? Math.ceil(max + keret) + 'px' : '';
    if (uj && f.viewport.style.height !== uj) f.viewport.style.height = uj;
  }
  function savok() {
    if (!mobil() || !window.Flickity || !window.Flickity.data) return;
    [].forEach.call(document.querySelectorAll('.carousel.flickity-enabled'), function (c) {
      if (!c.querySelector('.product__inner')) return;
      var f = window.Flickity.data(c);
      if (!f || !f.viewport) return;
      gyoker.classList.add('bb-kieg-sav');
      var fut = function () { c.bbIdozito = 0; savMagassag(c, f); };
      var kesobb = function () { if (!c.bbIdozito) c.bbIdozito = setTimeout(fut, 150); };
      if (!c.bbSav) { c.bbSav = true; f.on('resize', kesobb); }
      kesobb();
    });
  }
  function karuszelek() {
    if (!mobil()) return;
    function meret() {
      if (!window.Flickity || !window.Flickity.data) return;
      [].forEach.call(document.querySelectorAll('.carousel.flickity-enabled'), function (c) {
        if (!c.querySelector('.product__inner')) return;
        var f = window.Flickity.data(c);
        if (f) f.resize();
      });
      savok();
    }
    window.addEventListener('load', function () { meret(); setTimeout(meret, 1600); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(meret, 0); });
  }

  /* ── 5. Az adatlap értékelés-sora telefonon: „5” → „5,0”, „/ 1 Értékelés” → „1 értékelés” ── */
  function ertekelesSor() {
    if (!mobil()) return;
    var n = document.querySelector('.artdet__rating-highlighted-score-num');
    var db = document.querySelector('.artdet__rating-highlighted-reviews-count');
    if (!n || !db || n.getAttribute('data-bb')) return;
    n.setAttribute('data-bb', '1');
    var ertek = parseFloat(n.textContent.replace(',', '.'));
    if (!isNaN(ertek)) n.textContent = HU ? ertek.toFixed(1).replace('.', ',') : ertek.toFixed(1);
    var m = db.textContent.match(/\d+/);
    var felirat = HU && m ? m[0] + ' értékelés' : db.textContent.replace(/^[\s\/ ]+/, '');
    db.innerHTML = '<span class="bb-ert-db"></span>';
    db.firstChild.textContent = felirat;
  }

  /* ── 6. Belépés a profil menüben (576 px alatt, kilépve): nagyobb mezők, jelszó
     megjelenítése, teljes szélességű gomb, „Elfelejtett jelszó” a jelszó alá, a Google-
     belépés „vagy” után, a Regisztráció külön blokkban. Csak átrendez, az űrlapot nem bántja. */
  var SZEM = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var SZEM_KI = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
  function belepes() {
    if (!kisMobil()) return;
    var d = document.getElementById('profile__dropdown');
    var urlap = d && d.querySelector('form[name="form_login"]');
    if (!urlap || d.classList.contains('bb-bl')) return;
    var doboz = d.querySelector('.login-box__loggedout-container') || urlap.parentNode;
    var belso = urlap.querySelector('.login-box__form-inner') || urlap;
    var jelszo = urlap.querySelector('#shop_pass_login');
    var email = urlap.querySelector('#shop_user_login');
    var gombok = urlap.querySelector('.login-box__btns-wrap');
    var reg = urlap.querySelector('.login-box__reg-btn');
    var emlek = urlap.querySelector('.login-box__remind-btn-wrap');
    var google = urlap.querySelector('.login-box__social-group');
    if (!jelszo || !gombok) return;
    d.classList.add('bb-bl');
    var cim = doboz.querySelector('.profile__title-text');
    if (cim && HU) {
      var al = document.createElement('p');
      al.className = 'bb-bl-al';
      al.textContent = 'Lépjen be, és lássa a rendeléseit, kedvezményeit, gyorsabban fizethet.';
      cim.parentNode.parentNode.insertBefore(al, cim.parentNode.nextSibling);
    }
    if (email) email.setAttribute('inputmode', 'email');
    var mezo = jelszo.parentNode;
    mezo.classList.add('bb-bl-jelszo');
    var szem = document.createElement('button');
    szem.type = 'button';
    szem.className = 'bb-bl-szem';
    szem.setAttribute('aria-label', HU ? 'Jelszó megjelenítése' : 'Show password');
    szem.innerHTML = SZEM;
    szem.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var latszik = jelszo.type === 'text';
      jelszo.type = latszik ? 'password' : 'text';
      szem.innerHTML = latszik ? SZEM : SZEM_KI;
      szem.setAttribute('aria-label', HU ? (latszik ? 'Jelszó megjelenítése' : 'Jelszó elrejtése') : (latszik ? 'Show password' : 'Hide password'));
    });
    mezo.appendChild(szem);
    if (emlek) { emlek.classList.add('bb-bl-emlek'); mezo.parentNode.insertBefore(emlek, mezo.nextSibling); }
    if (google) {
      var vagy = document.createElement('div');
      vagy.className = 'bb-bl-vagy';
      vagy.innerHTML = '<span></span>';
      vagy.firstChild.textContent = HU ? 'vagy' : 'or';
      gombok.parentNode.insertBefore(vagy, gombok.nextSibling);
      vagy.parentNode.insertBefore(google, vagy.nextSibling);
    }
    if (reg) {
      var blokk = document.createElement('div');
      blokk.className = 'bb-bl-reg';
      blokk.innerHTML = '<p></p>';
      blokk.firstChild.textContent = HU ? 'Még nincs fiókja?' : '';
      if (!HU) blokk.firstChild.hidden = true;
      if (HU) reg.textContent = 'Regisztráció';
      blokk.appendChild(reg);
      belso.appendChild(blokk);
    }
    var belep = gombok.querySelector('.login-box__login-btn');
    if (belep && HU) belep.textContent = 'Belépés';
  }

  /* ── 7. ÁSZF oldal (/aszf): a saját, menün kívüli jogi oldalak (csak magyarul) ── */
  var JOGI_OLDALAK = [ ['/harmonizalt-ertesites', 'Harmonizált értesítés'], ['/velemenyek-ellenorzese', 'Vélemények ellenőrzése'], ['/kupon-szabalyzat', 'Kupon- és ajándékutalvány-szabályzat'] ];
  function aszfLinkek() {
    if (!HU) return;
    if (mobil()) {
      var panelek = document.querySelector('#page_help_content .tab-panes');
      if (!panelek || panelek.querySelector('.bb-jogi')) return;
      JOGI_OLDALAK.forEach(function (o) {
        var fej = document.createElement('div');
        fej.className = 'pane-header bb-jogi';
        fej.innerHTML = '<a class="pane-header-btn btn"></a>';
        fej.firstChild.href = o[0];
        fej.firstChild.textContent = o[1];
        panelek.appendChild(fej);
      });
    } else {
      var fulek = document.querySelector('ul.help-tabs');
      if (!fulek || document.querySelector('.bb-jogi-sor')) return;
      var sor = document.createElement('div');
      sor.className = 'bb-jogi-sor';
      sor.innerHTML = '<span>További szabályzatok:</span>';
      JOGI_OLDALAK.forEach(function (o) {
        var a = document.createElement('a');
        a.href = o[0];
        a.textContent = o[1];
        sor.appendChild(a);
      });
      fulek.parentNode.insertBefore(sor, fulek.nextSibling);
    }
  }

  /* ── 8. Telefon: üres tartalomblokk rejtése, elérhetőség-lista jelölése ── */
  function aprosagok() {
    if (!mobil()) return;
    [].forEach.call(document.querySelectorAll('main.main .custom-content'), function (b) {
      if (!b.textContent.trim() && !b.querySelector('img, iframe, video')) b.classList.add('bb-kieg-ures');
    });
    [].forEach.call(document.querySelectorAll('main.main .html-text ul'), function (u) {
      if (u.querySelector('a[href^="tel:"], a[href^="mailto:"], a[href*="maps.google"]')) u.classList.add('bb-kieg-eler');
    });
  }

  function indul() {
    try { puttonyIkon(); } catch (e) { hiba('Puttony-ikon', e); }
    try { kosarpanelIndul(); } catch (e) { hiba('kosárpanel', e); }
    try { lepteto(); } catch (e) { hiba('léptető', e); }
    try { raktarRovid(); } catch (e) { hiba('raktárjelzés', e); }
    try { karuszelek(); } catch (e) { hiba('termék-sávok', e); }
    try { ertekelesSor(); } catch (e) { hiba('értékelés', e); }
    try { belepes(); } catch (e) { hiba('belépés', e); }
    try { aszfLinkek(); } catch (e) { hiba('ÁSZF oldal', e); }
    try { aprosagok(); } catch (e) { hiba('apróságok', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
  else indul();
  /* a később betöltődő kártyák (sávok, lapozás) raktárjelzése is rövid legyen */
  window.addEventListener('load', function () { raktarRovid(); setTimeout(raktarRovid, 1600); });
})();
