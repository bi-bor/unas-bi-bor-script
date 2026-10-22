/* Idegen scriptek a sablonban — a burkoló (sablon-alap ág, TERMEKOLDAL.md › „Termékoldali scriptek a sablonban”,
   MINDENOLDAL.md). A csomagol.sh minden modul-csomag (minden oldali, adatlap, lista, pénztár) elejére teszi, utána a
   sablon/idegen/ fájljait VÁLTOZATLANUL, egyenként így burkolva:  window.bbIdegen('<név>', function () { …a fájl… });
   • Ha a régi UNAS Script még a lapon van (<script src="…/js/<név>-<ujjlenyomat>.js">, a fejrészben), a
     sablonbeli másolat NEM fut — az átmeneti együttfutásnál így semmi sem jelenik meg kétszer, és mindegy,
     melyik töltődik be előbb. A régi script kikapcsolása után a következő oldalbetöltéstől a sablonbeli fut.
     Az ellenőrzés a futás pillanatában van (addigra az egész lap beolvasva), így a csomag a lap elején is állhat.
   • Ugyanakkor fut, mint eddig a „defer” script: az oldal felépítése után (DOMContentLoaded-kor, a fejrész
     többi defer scriptje után; ha a csomag maga defer, rögtön) — így a body_end blokk adatai (pl. a
     BB_SZALL_TILT) is megvannak, és a modulok sorrendje az élővel azonos.
   • Ha a modul maga is a DOMContentLoaded-re iratkozik fel (pl. a nyelvválasztó: feltétel nélkül), de a
     beágyazott csomag miatt már az esemény közben fut, a feliratkozás elveszne (a futó eseményhez utólag
     hozzáadott figyelő nem hívódik meg) — ilyenkor a modul lefutása után rögtön meghívjuk. Defer csomagnál
     (az esemény előtt) nem nyúlunk hozzá.
   • Egy modul hibája nem állítja meg a többit (külön scriptként sem állította): a konzolba írjuk.
   Tilos a tartalomban: dupla kapcsos és dupla szögletes nyitó, kettőskereszt a nyitó kapcsos után. */
if (!window.bbIdegen) (function () {
  var dclVolt = document.readyState === 'complete';
  document.addEventListener('DOMContentLoaded', function () { dclVolt = true; });
  window.bbIdegen = function (nev, kod) {
    function regiAlapon() {
      try { return !!document.querySelector('script[src*="/js/' + nev + '-"]'); } catch (e) { return false; /* régi böngésző: futunk */ }
    }
    function fut() {
      if (regiAlapon()) return;
      var kesobb = [], celok = dclVolt ? [document, window] : [], eredeti = [], sajat = [];
      celok.forEach(function (c, i) {
        eredeti[i] = c.addEventListener;
        sajat[i] = Object.prototype.hasOwnProperty.call(c, 'addEventListener');
        c.addEventListener = function (tipus, fn) {
          if (tipus === 'DOMContentLoaded' && fn) { kesobb.push([c, fn]); return; }
          return eredeti[i].apply(this, arguments);
        };
      });
      try { kod.call(window); } catch (e) { if (window.console) console.error('[sablon] ' + nev + ':', e); }
      finally {
        celok.forEach(function (c, i) {
          try { if (sajat[i]) c.addEventListener = eredeti[i]; else delete c.addEventListener; } catch (e) { /* nem írható */ }
        });
      }
      kesobb.forEach(function (p) {
        try { if (typeof p[1] === 'function') p[1].call(p[0], new Event('DOMContentLoaded')); else if (p[1].handleEvent) p[1].handleEvent(new Event('DOMContentLoaded')); }
        catch (e) { if (window.console) console.error('[sablon] ' + nev + ':', e); }
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fut);
    else fut();
  };
})();

/* ── elallas-urlap (sablon/uj/elallas-urlap.js; eddig a /js/elallasi-urlap-bankszamla-mezok-….js UNAS Script) ── */
window.bbIdegen('elallasi-urlap-bankszamla-mezok', function () {
(function () {
if (!/elallas-bejelentese/.test(location.pathname)) return;
function indul() {
var valaszto = document.querySelectorAll('form input[type="radio"][name$="_radio_Visszateritesmodja"]');
if (!valaszto.length) return;
var urlap = valaszto[0].form;
var mezok = [].filter.call(urlap.querySelectorAll('input[type="text"]'), function (m) {
return /_text_(Bankszamlaszam|Abankszamlatulajdonosa)/.test(m.name);
});
var cim = [].filter.call(urlap.querySelectorAll('.form-element-text-title'), function (e) {
return /kifejezetten hozzájárul/.test(e.textContent);
})[0];
var elemek = mezok.map(function (m) { return m.closest('.form-group') || m.parentNode; });
if (cim) {
cim.classList.remove('h4');
cim.style.cssText = 'font-size:14px;font-weight:400;line-height:1.5;color:#4a443c;margin:4px 0 10px';
elemek.unshift(cim);
var utana = cim.nextElementSibling;
if (utana && utana.classList.contains('form-element-text') && !utana.textContent.trim()) elemek.push(utana);
}
function frissit() {
var banki = [].some.call(valaszto, function (r) { return r.checked && /banki/i.test(r.value); });
elemek.forEach(function (e) { e.style.display = banki ? '' : 'none'; });
mezok.forEach(function (m) { m.required = banki; });
}
[].forEach.call(valaszto, function (r) { r.addEventListener('change', frissit); });
frissit();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul); else indul();
})();

});
