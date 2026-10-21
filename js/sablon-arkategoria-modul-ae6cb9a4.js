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

/* ── vevocsoport (sablon/uj/vevocsoport.js + vevocsoport.css; eddig a /js/arkategoria-jelzese-….js UNAS Script) ── */
window.bbIdegen('arkategoria-jelzese', function () {
(function () {
var MINDENKI = true;
var CSOPORTOK = {"1333066":{"nev":"A1 rendszeres vevő","en":"A1 regular customer","kod":"A1"},"1338021":{"nev":"A1 rendszeres vevő","en":"A1 regular customer","kod":"A1"},"1333076":{"nev":"B1 nagyvásárló","en":"B1 wholesale customer","kod":"B1"},"1338026":{"nev":"B1 nagyvásárló","en":"B1 wholesale customer","kod":"B1"},"1333081":{"nev":"C1 kiemelt partner","en":"C1 key partner","kod":"C1"},"1338031":{"nev":"C1 kiemelt partner","en":"C1 key partner","kod":"C1"},"1314314":{"nev":"Viszonteladó","en":"Reseller","kod":"Viszonteladó"},"1338036":{"nev":"Viszonteladó","en":"Reseller","kod":"Viszonteladó"}};
var allapot = null, proba = null;
try {
var m = location.search.match(/[?&]arkategoria=([01])/);
if (m) localStorage.setItem('bbArkategoria', m[1]);
allapot = localStorage.getItem('bbArkategoria');
var p = location.search.match(/[?&]arkategoria_proba=(\d+)/);
if (p) sessionStorage.setItem('bbArkatProba', p[1]);
proba = sessionStorage.getItem('bbArkatProba');
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (allapot !== '1' && !MINDENKI)) return;

var vevo = window.UNAS && UNAS.customer;
var csoportId = String(proba || (vevo && vevo.group_id) || '');
var cs = CSOPORTOK[csoportId];
if (!cs) return;

var gyoker = document.documentElement;
gyoker.setAttribute('data-bb-arkategoria', 'sablon');
var stilus = document.createElement('style');
stilus.id = 'bb-arkategoria';
stilus.textContent = ".bb-ak-ar{position: relative;display: inline-block;margin: 0 0 8px;max-width: 100%}.bb-ak-gomb{display: inline-flex;align-items: center;gap: 6px;padding: 5px 10px 5px 9px;border: 1px solid #cfe3c2;border-radius: 999px;background: #eaf4e4;color: #1f6b14;font: inherit;font-size: 14px;font-weight: 500;line-height: 1.3;text-align: left;cursor: help}.bb-ak-gomb b{font-weight: 700}.bb-ak-gomb svg{flex: none}.bb-ak-i{display: inline-flex;color: #2b8a1d;opacity: .8}.bb-ak-gomb:focus-visible{outline: 2px solid #2b8a1d;outline-offset: 2px}.bb-ak-sugo{position: absolute;left: 0;top: calc(100% + 8px);z-index: 30;width: 300px;max-width: calc(100vw - 32px);padding: 11px 13px;border-radius: 10px;background: #2f2b26;color: #fff;font-size: 13px;font-weight: 400;line-height: 1.45;box-shadow: 0 6px 20px rgba(0,0,0,.18);opacity: 0;visibility: hidden;transform: translateY(-4px);transition: opacity .15s,transform .15s,visibility .15s;pointer-events: none}.bb-ak-sugo::before{content: \"\";position: absolute;left: 18px;top: -6px;border: 6px solid transparent;border-top: 0;border-bottom-color: #2f2b26}.bb-ak-nyitva .bb-ak-sugo,.bb-ak-gomb:focus-visible + .bb-ak-sugo{opacity: 1;visibility: visible;transform: none}@media (hover: hover){.bb-ak-ar:hover .bb-ak-sugo{opacity: 1;visibility: visible;transform: none}}.bb-ak-kartya{display: flex;align-items: flex-start;gap: 10px;padding: 12px 14px;border-radius: 12px;background: #f3f8ef;border: 1px solid #cfe3c2;color: #3d3831;text-align: left}.bb-ak-ikon{flex: none;display: inline-flex;align-items: center;justify-content: center;width: 32px;height: 32px;border-radius: 50%;background: #fff;color: #2b8a1d;border: 1px solid #cfe3c2}.bb-ak-szoveg{display: flex;flex-direction: column;gap: 1px;min-width: 0}.bb-ak-kat{font-size: 12px;color: #6b645a}.bb-ak-kartya strong{font-size: 16px;color: #1f6b14;line-height: 1.25}.bb-ak-le{font-size: 12px;color: #6b645a;line-height: 1.35;margin-top: 2px}.bb-ak-menu{margin: 8px 0 10px}.bb-ak-oldal{margin: 12px 0 20px;max-width: 560px}.bb-ak-kis{display: inline-flex;align-items: center;gap: 5px;margin: 0 0 6px;padding: 2px 9px 2px 7px;border-radius: 999px;background: #eaf4e4;color: #1f6b14;font-size: 12.5px;font-weight: 500;line-height: 1.35;cursor: help;max-width: 100%}.bb-ak-kis b{font-weight: 700}.bb-ak-kis svg{flex: none;width: 13px;height: 13px}";
(document.head || gyoker).appendChild(stilus);

var magyar = (gyoker.lang || 'hu').slice(0, 2) === 'hu';
var nev = magyar ? cs.nev : cs.en;
var T = magyar
? { ar: 'Partnerár', kat: 'Partnerár-kategóriája', le: 'A termékeknél az Ön partnerárát látja; az áthúzott ár a bolti listaár.',
mi: 'Mit jelent ez?',
sugo: 'Az Ön partnerkategóriája: ' + nev + '. Ezért ezt a terméket a saját partnerárán látja. Az áthúzott ár a bolti listaár; a százalék és a megtakarítás ehhez képest értendő. Ez nem időszakos akció, hanem az Ön állandó partnerára.' }
: { ar: 'Partner price', kat: 'Your partner category', le: 'Prices shown are your partner prices; the crossed-out price is the list price.',
mi: 'What does this mean?',
sugo: 'Your partner category: ' + nev + '. This product is shown at your partner price. The crossed-out price is the list price; the percentage and saving are relative to it. This is not a time-limited sale but your standing partner price.' };

var IKON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>';

function $(s, gy) { return (gy || document).querySelector(s); }
function elem(cls, html) { var d = document.createElement('div'); d.className = cls; d.innerHTML = html; return d; }
function szoveg(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

var INFO = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>';

function adatlap() {
var ar = $('.artdet__price-and-countdown');
if (!ar || $('.bb-ak-ar', ar)) return;
if (!$('.artdet__price-sale, .product-price--sale, .has-price-sale, .product-price--base.has-sale', ar) && !proba) return;
var arak = $('.artdet__prices', ar);
var c = elem('bb-ak-ar',
'<button type="button" class="bb-ak-gomb" aria-expanded="false" aria-describedby="bb-ak-sugo">' + IKON +
'<span><b>' + szoveg(T.ar) + '</b> · ' + szoveg(nev) + '</span><span class="bb-ak-i" title="' + szoveg(T.mi) + '">' + INFO + '</span></button>' +
'<span class="bb-ak-sugo" id="bb-ak-sugo" role="tooltip">' + szoveg(T.sugo) + '</span>');
var gomb = $('.bb-ak-gomb', c);
gomb.addEventListener('click', function (e) {
e.preventDefault();
var nyit = !c.classList.contains('bb-ak-nyitva');
c.classList.toggle('bb-ak-nyitva', nyit);
gomb.setAttribute('aria-expanded', nyit ? 'true' : 'false');
});
document.addEventListener('click', function (e) {
if (!c.contains(e.target)) { c.classList.remove('bb-ak-nyitva'); gomb.setAttribute('aria-expanded', 'false'); }
});
if (arak) arak.parentNode.insertBefore(c, arak); else ar.insertBefore(c, ar.firstChild);
}

function kartya(osztaly) {
return elem('bb-ak-kartya ' + osztaly,
'<span class="bb-ak-ikon">' + IKON + '</span><span class="bb-ak-szoveg"><span class="bb-ak-kat">' + szoveg(T.kat) +
'</span><strong>' + szoveg(nev) + '</strong><span class="bb-ak-le">' + szoveg(T.le) + '</span></span>');
}
function profilMenu() {
var d = document.getElementById('profile__dropdown');
if (!d || d.querySelector('form[name="form_login"]') || $('.bb-ak-kartya', d)) return;
var belso = d.querySelector('.dropdown__content-inner') || d;
var cim = belso.querySelector('.profile__title, .dropdown__title');
var k = kartya('bb-ak-menu');
if (cim && cim.parentNode === belso) belso.insertBefore(k, cim.nextSibling); else belso.insertBefore(k, belso.firstChild);
}

function fiokOldal() {
var oldal = window.UNAS && UNAS.design && UNAS.design.page;
var fiok = /^\/(profil|shop_reg\.php|shop_order_track\.php)/.test(location.pathname) && !/[?&]no_reg=1/.test(location.search);
if (!fiok && !/^(profile|reg|order_track|customer)/.test(oldal || '')) return;
var fo = $('main.main');
if (!fo || $('.bb-ak-oldal', fo)) return;
var hely = $('.container', fo) || fo;
var cim = $('h1', hely);
var k = kartya('bb-ak-oldal');
if (cim && cim.parentNode) cim.parentNode.insertBefore(k, cim.nextSibling); else hely.insertBefore(k, hely.firstChild);
}

var rovid = cs.kod === cs.nev ? nev : cs.kod;
function kartyak() {
[].forEach.call(document.querySelectorAll('.product__prices.has-price-sale'), function (arak) {
var hely = arak.parentNode;
if (!hely || $('.bb-ak-kis', hely)) return;
var c = elem('bb-ak-kis', IKON + '<span><b>' + szoveg(T.ar) + '</b> · ' + szoveg(rovid) + '</span>');
c.title = T.sugo;
hely.insertBefore(c, arak);
});
}
var kesleltet = null;
function figyel() {
if (!window.MutationObserver || !document.body) return;
new MutationObserver(function () {
if (kesleltet) return;
kesleltet = setTimeout(function () { kesleltet = null; try { kartyak(); } catch (e) { /* nem kritikus */ } }, 300);
}).observe(document.body, { childList: true, subtree: true });
}

function fut() {
try { kartyak(); } catch (e) { /* nincs kártya */ }
try { adatlap(); } catch (e) { /* hiányos adatlap */ }
try { profilMenu(); } catch (e) { /* nincs profil menü */ }
try { fiokOldal(); } catch (e) { /* más oldal */ }
}
function indul() { fut(); figyel(); setTimeout(fut, 1500); setTimeout(fut, 5000); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul); else indul();
})();

});
