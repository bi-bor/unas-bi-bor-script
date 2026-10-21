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

/* ── kapcsolat (sablon/uj/kapcsolat.js + kapcsolat.css; eddig a /js/kapcsolat-oldal-….js UNAS Script) ── */
window.bbIdegen('kapcsolat-oldal', function () {
(function () {
var MINDENKI = true;
var OLDAL = 199414;
var KULCS = 'bbUjKapcsolat';
var shop = window.UNAS && window.UNAS.shop;
var oldal = shop && shop.page_id ? Number(shop.page_id) : 0;
if (oldal !== OLDAL && !/^\/kapcsolat\/?$/.test(location.pathname)) return;
var allapot = null;
try {
var m = location.search.match(/[?&]ujkapcsolat=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { allapot = null; }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
var gyoker = document.documentElement;
if ((gyoker.lang || 'hu').slice(0, 2) !== 'hu') return;

gyoker.classList.add('bb-ujkapcs');
gyoker.setAttribute('data-bb-ujkapcs', 'sablon');
var stilus = document.createElement('style');
stilus.id = 'bb-ujkapcs';
stilus.textContent = "html.bb-ujkapcs #page_content_2869418{display: none !important}html.bb-ujkapcs.bb-ujkapcs-kesz .main__title{display: none}.bbk{--bbk-sotet: #1E4A14;--bbk-zold: #2a8511;--bbk-zold-s: #226d0e;--bbk-szoveg: #1B2036;--bbk-halk: #4A4E5E;--bbk-halk2: #5B5F70;--bbk-keret: rgba(30,74,20,.12);--bbk-halvany: #EAF4E6;color: var(--bbk-szoveg);margin: 8px 0 48px;display: flex;flex-direction: column;gap: 48px}.bbk *,.bbk *::before,.bbk *::after{box-sizing: border-box}.bbk h1,.bbk h2,.bbk h3,.bbk p,.bbk ul,.bbk dl,.bbk dd{margin: 0}.bbk ul{padding: 0;list-style: none}.bbk a{text-decoration: none}.bbk a:focus-visible,.bbk button:focus-visible{outline: 2px solid var(--bbk-zold);outline-offset: 2px}.bbk-felcim{font-size: 13px;font-weight: 700;letter-spacing: .08em;text-transform: uppercase;color: var(--bbk-zold)}.bbk-h2{font-size: 28px;font-weight: 800;color: var(--bbk-sotet);letter-spacing: -.01em;line-height: 1.2}.bbk-fejsor{display: flex;flex-direction: column;gap: 6px;margin-bottom: 22px}.bbk-fejsor p{font-size: 16px;line-height: 1.5;color: var(--bbk-halk)}.bbk-kartya{background: #fff;border: 1px solid var(--bbk-keret);border-radius: 20px}.bbk-gomb{display: inline-flex;align-items: center;justify-content: center;gap: 8px;min-height: 46px;padding: 0 18px;border-radius: 12px;background: var(--bbk-zold);color: #fff !important;font-weight: 700;font-size: 15px;border: 0;cursor: pointer}.bbk-gomb:hover{background: var(--bbk-zold-s)}.bbk-gomb2{display: inline-flex;align-items: center;justify-content: center;gap: 8px;min-height: 46px;padding: 0 16px;border-radius: 12px;border: 1px solid rgba(30,74,20,.25);color: var(--bbk-sotet) !important;font-weight: 700;font-size: 15px;background: #fff}.bbk-gomb2:hover{background: var(--bbk-halvany)}.bbk-fej{display: flex;flex-wrap: wrap;gap: 28px;align-items: stretch;padding: 32px;border-radius: 24px}.bbk-fo{flex: 999 1 520px;min-width: 0;display: flex;flex-direction: column;gap: 18px}.bbk-cim{font-size: clamp(30px,4vw,44px);line-height: 1.08;font-weight: 800;letter-spacing: -.02em;margin-top: 6px !important}.bbk-bev{font-size: 17px;line-height: 1.5;color: var(--bbk-halk);max-width: 620px;margin-top: 8px !important}.bbk-gombok{display: flex;flex-wrap: wrap;gap: 10px}.bbk-tipp{display: flex;flex-wrap: wrap;gap: 6px 12px;align-items: center;font-size: 15px;color: var(--bbk-halk);background: var(--bbk-halvany);border-radius: 14px;padding: 12px 16px}.bbk-tipp a{color: var(--bbk-sotet);font-weight: 700;display: inline-flex;align-items: center;gap: 6px}.bbk-tipp a:hover{color: var(--bbk-zold)}.bbk-oldal{flex: 1 1 280px;min-width: 0;display: flex;flex-direction: column;gap: 14px;background: #F5FAF3;border: 1px solid var(--bbk-keret);border-radius: 20px;padding: 20px}.bbk-all{display: flex;flex-direction: column;gap: 2px;font-size: 13px;color: var(--bbk-halk2)}.bbk-all b{display: flex;align-items: center;gap: 10px;font-size: 15px;color: var(--bbk-szoveg)}.bbk-pont{width: 10px;height: 10px;border-radius: 50%;flex: 0 0 auto;background: #8A5A00;box-shadow: 0 0 0 4px rgba(138,90,0,.15)}.bbk-pont.bbk-be{background: var(--bbk-zold);box-shadow: 0 0 0 4px rgba(42,133,17,.18)}.bbk-all span{padding-left: 20px}.bbk-vonal{height: 1px;background: var(--bbk-keret)}.bbk-mail{font-size: 22px;font-weight: 800;color: var(--bbk-sotet) !important;letter-spacing: -.01em;word-break: break-word}.bbk-mail:hover{color: var(--bbk-zold) !important}.bbk-telek{display: grid;grid-template-columns: repeat(auto-fit,minmax(260px,1fr));gap: 18px}.bbk-tel{display: flex;flex-direction: column;gap: 14px;padding: 22px}.bbk-tel-fej{display: flex;align-items: center;gap: 12px}.bbk-ikon{flex: 0 0 auto;width: 44px;height: 44px;border-radius: 12px;background: var(--bbk-halvany);display: flex;align-items: center;justify-content: center}.bbk-tel-fej b{font-size: 17px;font-weight: 800}.bbk-tel-fej small{display: block;font-size: 13px;color: var(--bbk-halk2)}.bbk-szam{font-size: 26px;font-weight: 800;color: var(--bbk-sotet) !important;letter-spacing: -.01em;white-space: nowrap}.bbk-szam:hover{color: var(--bbk-zold) !important}.bbk-jel{align-self: flex-start;display: inline-flex;align-items: center;gap: 8px;font-size: 13px;font-weight: 600;border-radius: 999px;padding: 5px 12px;background: #F6F1E6;color: #6A4A00}.bbk-jel.bbk-be{background: var(--bbk-halvany);color: var(--bbk-sotet)}.bbk-jel i{width: 8px;height: 8px;border-radius: 50%;background: currentColor}.bbk-temak{display: flex;flex-direction: column;gap: 7px;font-size: 14px;color: #3A3E4E;border-top: 1px solid var(--bbk-keret);padding-top: 14px}.bbk-temak li{display: flex;gap: 8px;align-items: flex-start;line-height: 1.4}.bbk-temak svg{flex: 0 0 auto;margin-top: 2px}.bbk-megj{margin-top: 16px !important;font-size: 14px;line-height: 1.55;color: var(--bbk-halk)}.bbk-megj a{color: var(--bbk-sotet);font-weight: 700}.bbk-bolt{display: flex;flex-wrap: wrap;overflow: hidden;border-radius: 24px}.bbk-bolt-kep{flex: 1 1 360px;min-height: 260px;position: relative;background: #E6EFE3;margin: 0}.bbk-bolt-kep img{position: absolute;inset: 0;width: 100%;height: 100%;object-fit: cover}.bbk-bolt-sz{flex: 999 1 440px;min-width: 0;display: flex;flex-direction: column;gap: 18px;padding: 28px}.bbk-cimsor{display: flex;gap: 10px;align-items: flex-start;font-size: 16px;color: #3A3E4E}.bbk-cimsor svg{flex: 0 0 auto;margin-top: 2px}.bbk-idok{display: grid;grid-template-columns: repeat(auto-fit,minmax(220px,1fr));gap: 18px 28px}.bbk-het{display: flex;flex-direction: column;font-size: 15px}.bbk-het div{display: flex;justify-content: space-between;gap: 12px;padding: 7px 10px;border-radius: 8px}.bbk-het div.bbk-ma{background: var(--bbk-halvany);font-weight: 700;color: var(--bbk-sotet)}.bbk-het span:last-child{font-variant-numeric: tabular-nums}.bbk-kis{display: flex;flex-direction: column;gap: 12px;font-size: 14px;color: var(--bbk-halk)}.bbk-kis b{display: block;font-size: 14px;color: var(--bbk-szoveg)}.bbk-also{display: flex;flex-wrap: wrap;gap: 24px;align-items: flex-start}.bbk-urlap{flex: 999 1 480px;min-width: 0;padding: 28px}.bbk-urlap .bbk-fejsor{margin-bottom: 12px}.bbk-urlap section.page_content_item{padding: 0 !important;margin: 0 !important;max-width: none !important;flex: none !important;width: 100% !important}.bbk-urlap .page_content__form-inner,.bbk-urlap .page_content_with_form_type{padding: 0 !important;margin: 0 !important;max-width: none !important}.bbk-urlap form{display: grid;grid-template-columns: repeat(auto-fit,minmax(220px,1fr));gap: 0 16px}.bbk-urlap form\u003E.form-group:has(textarea),.bbk-urlap form\u003Efieldset,.bbk-urlap form\u003E.page-form-item__btn-wrap,.bbk-urlap form\u003Ediv[id^=\"recaptcha\"]{grid-column: 1 / -1}.bbk-urlap .form-group{margin-bottom: 14px}.bbk-urlap label{font-size: 14px;font-weight: 600;color: var(--bbk-szoveg);margin-bottom: 6px}.bbk-urlap .form-control{min-height: 48px;border-radius: 12px !important;border: 1px solid rgba(30,74,20,.22) !important;background: #fff;font-size: 16px;box-shadow: none !important}.bbk-urlap textarea.form-control{min-height: 140px}.bbk-urlap .form-control:focus{border-color: var(--bbk-zold) !important;box-shadow: 0 0 0 4px rgba(42,133,17,.15) !important}.bbk-urlap legend{font-size: 14px;font-weight: 600}.bbk-urlap .custom-control-label{font-size: 14px;line-height: 1.45;color: var(--bbk-halk)}.bbk-urlap .custom-control-input:checked ~ .custom-control-label::before{background-color: var(--bbk-zold) !important;border-color: var(--bbk-zold) !important}.bbk-urlap .page-form-item__btn-wrap{text-align: left !important}.bbk-urlap .page-form-item__btn-wrap .btn{margin-top: 6px !important;min-height: 48px;padding: 0 28px;border-radius: 12px;background: var(--bbk-zold) !important;border-color: var(--bbk-zold) !important;color: #fff !important;font-weight: 700;font-size: 16px;text-transform: none}.bbk-urlap .page-form-item__btn-wrap .btn:hover{background: var(--bbk-zold-s) !important}.bbk-ceg{flex: 1 1 320px;min-width: 0;padding: 28px;display: flex;flex-direction: column;gap: 12px}.bbk-ceg dl{display: flex;flex-direction: column}.bbk-ceg dl\u003Ediv{display: flex;flex-wrap: wrap;justify-content: space-between;align-items: center;gap: 2px 12px;padding: 10px 0;border-bottom: 1px solid var(--bbk-keret)}.bbk-ceg dl\u003Ediv:last-child{border-bottom: 0}.bbk-ceg dt{font-size: 13px;color: var(--bbk-halk2);font-weight: 500;flex: 1 1 100%}.bbk-ceg dd{font-size: 15px;font-weight: 700;color: var(--bbk-szoveg);font-variant-numeric: tabular-nums;word-break: break-word}.bbk-masol{flex: 0 0 auto;min-height: 32px;padding: 0 10px;border-radius: 8px;border: 1px solid rgba(30,74,20,.2);background: #fff;color: var(--bbk-sotet);font: inherit;font-size: 13px;font-weight: 600;cursor: pointer}.bbk-masol:hover{background: var(--bbk-halvany)}.bbk-masol.bbk-ok{background: var(--bbk-zold);border-color: var(--bbk-zold);color: #fff}@media (max-width: 575px){.bbk{gap: 36px}.bbk-fej,.bbk-urlap,.bbk-ceg{padding: 20px 16px}.bbk-bolt-sz{padding: 20px 16px}.bbk-h2{font-size: 24px}.bbk-szam{font-size: 24px}.bbk-gombok\u003Ea{flex: 1 1 100%}}";
(document.head || gyoker).appendChild(stilus);

var BOLTKEP = "https://cdn.jsdelivr.net/gh/bi-bor/unas-bi-bor-script@6332b7a86955c707bd45f69d8aa33180b4334105/kapcsolat/uzlet.webp";
var EMAIL = 'info@bi-bor.hu';
var CIM = '7773 Villány, Szent István utca 35.';
var UTVONAL = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Bí-Bor-Ász, 7773 Villány, Szent István u. 35.');
var TERKEP = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Bí-Bor-Ász Kft., 7773 Villány, Szent István u. 35.');

var NYITVA = { 1: { t: 450, v: 990 }, 2: { t: 450, v: 990 }, 3: { t: 450, v: 990 }, 4: { t: 450, v: 990 }, 5: { t: 450, v: 990 }, 6: { t: 480, v: 720 } };
var EBED = { t: 720, v: 750 };
var TELIDO = { t: 540, v: 720 }; /* a telefonok H–P 9:00–12:00 */
var NAPOK = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

var TELEFONOK = [
{ nev: 'Értékesítés', al: 'termékek, készlet, BorLabor', szam: '+36 30 663 7382', ikon: 'bolt',
temak: ['Tájékoztatás termékről és raktárkészletről', 'BorLabor szolgáltatással kapcsolatos információk'] },
{ nev: 'Webáruház', al: 'online rendelések, fiók', szam: '+36 30 663 7381', ikon: 'kosar',
temak: ['A webshopban leadott rendelés állapota', 'Rendelés módosítása, lemondása', 'Webshopos hibák, technikai problémák', 'Regisztrációval, fiókkal kapcsolatos kérdés'] },
{ nev: 'Pénzügy', al: 'számlák, fizetés', szam: '+36 30 680 7022', ikon: 'szamla',
temak: ['Számlával, számlázással kapcsolatos kérdés', 'Fizetési határidők, kifizetések', 'Számlamásolat, helyesbítés kérése'] }
];
var CEG = [
{ k: 'Cégnév', v: 'Bí-Bor-Ász Kft.' },
{ k: 'Székhely', v: CIM },
{ k: 'Adószám', v: '13442659-2-02', masol: true },
{ k: 'EU adószám', v: 'HU13442659', masol: true },
{ k: 'Cégjegyzékszám', v: '02-09-069934', masol: true },
{ k: 'Bankszámlaszám', v: '10701214-68938462-51100005', masol: true },
{ k: 'Webáruház', v: 'bi-bor.hu' }
];

function svg(d, szin, meret) {
return '<svg aria-hidden="true" width="' + (meret || 22) + '" height="' + (meret || 22) + '" viewBox="0 0 24 24" fill="none" stroke="'
+ (szin || '#2a8511') + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
}
var IKON = {
tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
level: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
hely: '<path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
bolt: '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9h18M9 20v-6h6v6"/>',
kosar: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/>',
szamla: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
pipa: '<path d="m5 12 5 5L20 7"/>',
nyil: '<path d="M5 12h14M13 6l6 6-6 6"/>',
kulso: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>'
};

function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function ido(p) { return Math.floor(p / 60) + ':' + ('0' + p % 60).slice(-2); }
function telLink(szam) { return 'tel:' + szam.replace(/[^\d+]/g, ''); }

function most() {
var nap = 1, perc = 600;
try {
var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Budapest', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
var g = function (t) { for (var i = 0; i < p.length; i++) if (p[i].type === t) return p[i].value; return ''; };
nap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday'));
perc = parseInt(g('hour'), 10) % 24 * 60 + parseInt(g('minute'), 10);
} catch (e) { /* régi böngésző: munkaidőt feltételezünk */ }
return { nap: nap, perc: perc };
}
function kovetkezoNyitas(nap, perc) {
for (var i = 0; i < 8; i++) {
var n = (nap + i) % 7, r = NYITVA[n];
if (!r) continue;
if (i === 0 && perc >= r.t) continue;
return (i === 0 ? 'ma ' : i === 1 ? 'holnap ' : NAPOK[(n + 6) % 7].toLowerCase() + ' ') + ido(r.t) + '-kor';
}
return '';
}
function uzletAllapot(t) {
var r = NYITVA[t.nap];
if (r && t.perc >= r.t && t.perc < r.v) {
if (t.nap <= 5 && t.perc >= EBED.t && t.perc < EBED.v) return { be: false, cim: 'Ebédszünet', al: ido(EBED.v) + '-kor nyitunk újra' };
return { be: true, cim: 'Most nyitva', al: ido(r.v) + '-ig várjuk villányi üzletünkben' };
}
return { be: false, cim: 'Most zárva', al: 'Nyitunk ' + kovetkezoNyitas(t.nap, t.perc) };
}
function telAllapot(t) {
var hetkoz = t.nap >= 1 && t.nap <= 5;
if (hetkoz && t.perc >= TELIDO.t && t.perc < TELIDO.v) return { be: true, cim: 'Most hívható, ' + ido(TELIDO.v) + '-ig' };
if (hetkoz && t.perc < TELIDO.t) return { be: false, cim: 'Ma ' + ido(TELIDO.t) + '-tól hívható' };
return { be: false, cim: 'Hívható H–P 9:00–12:00' };
}

function html() {
var t = most(), u = uzletAllapot(t), te = telAllapot(t);
var pipa = svg(IKON.pipa, '#2a8511', 16);
var h = '<div class="bbk" id="bbk">';

h += '<section class="bbk-fej bbk-kartya" aria-labelledby="bbk-cim"><div class="bbk-fo"><div>'
+ '<div class="bbk-felcim">Kapcsolat · Bí-Bor-Ász Kft.</div>'
+ '<h1 class="bbk-cim" id="bbk-cim">Lépjen kapcsolatba velünk</h1>'
+ '<p class="bbk-bev">Hívjon, írjon, vagy jöjjön be villányi üzletünkbe — a megfelelő kolléga segít.</p></div>'
+ '<div class="bbk-gombok"><a class="bbk-gomb" href="#bbk-telefon">' + svg(IKON.tel, '#fff', 18) + 'Telefonszámok</a>'
+ '<a class="bbk-gomb2" href="mailto:' + EMAIL + '">' + svg(IKON.level, '#1E4A14', 18) + 'E-mail küldése</a>'
+ '<a class="bbk-gomb2" href="' + UTVONAL + '" target="_blank" rel="noopener">' + svg(IKON.hely, '#1E4A14', 18) + 'Útvonaltervezés</a></div>'
+ '<div class="bbk-tipp">Rendeléssel, elállással, garanciával kapcsolatos ügye van? '
+ '<a href="/online-ugyintezes">Online ügyintézés' + svg(IKON.nyil, 'currentColor', 16) + '</a></div></div>'
+ '<aside class="bbk-oldal">'
+ '<div class="bbk-all"><b><i class="bbk-pont' + (u.be ? ' bbk-be' : '') + '"></i>Üzlet: ' + esc(u.cim) + '</b><span>' + esc(u.al) + '</span></div>'
+ '<div class="bbk-all"><b><i class="bbk-pont' + (te.be ? ' bbk-be' : '') + '"></i>Telefon: ' + esc(te.cim) + '</b><span>e-mailre munkanapokon válaszolunk</span></div>'
+ '<div class="bbk-vonal"></div>'
+ '<div class="bbk-all">Írjon nekünk bármikor<a class="bbk-mail" href="mailto:' + EMAIL + '">' + EMAIL + '</a></div>'
+ '<div class="bbk-vonal"></div>'
+ '<div class="bbk-all">Címünk<b style="font-weight:600">' + esc(CIM) + '</b></div>'
+ '</aside></section>';

h += '<section id="bbk-telefon" aria-labelledby="bbk-tel-cim"><div class="bbk-fejsor">'
+ '<h2 class="bbk-h2" id="bbk-tel-cim">Hívja közvetlenül a megfelelő részleget</h2>'
+ '<p>Telefonközpontunk megszűnt — az alábbi számokon közvetlenül a kollégáinkat éri el.</p></div><div class="bbk-telek">';
TELEFONOK.forEach(function (x) {
h += '<div class="bbk-tel bbk-kartya"><div class="bbk-tel-fej"><span class="bbk-ikon">' + svg(IKON[x.ikon]) + '</span>'
+ '<span><b>' + esc(x.nev) + '</b><small>' + esc(x.al) + '</small></span></div>'
+ '<a class="bbk-szam" href="' + telLink(x.szam) + '">' + esc(x.szam) + '</a>'
+ '<span class="bbk-jel' + (te.be ? ' bbk-be' : '') + '"><i></i>' + esc(te.cim) + '</span>'
+ '<ul class="bbk-temak">' + x.temak.map(function (s) { return '<li>' + pipa + '<span>' + esc(s) + '</span></li>'; }).join('') + '</ul></div>';
});
h += '</div><p class="bbk-megj">A számok hétfőtől péntekig 9:00 és 12:00 között hívhatók. Ha ezen kívül hív, lehetőségeinkhez mérten legkésőbb a következő munkanapon visszahívjuk. '
+ 'Szakmai kérdéssel írjon az <a href="mailto:' + EMAIL + '">' + EMAIL + '</a> címre, hogy az illetékes kolléga válaszolhasson.</p></section>';

var het = '';
for (var i = 0; i < 7; i++) {
var n = (i + 1) % 7, r = NYITVA[n];
het += '<div' + (n === t.nap ? ' class="bbk-ma"' : '') + '><span>' + NAPOK[i] + (n === t.nap ? ' (ma)' : '') + '</span><span>'
+ (r ? ido(r.t) + ' – ' + ido(r.v) : 'Zárva') + '</span></div>';
}
h += '<section class="bbk-bolt bbk-kartya" aria-labelledby="bbk-bolt"><figure class="bbk-bolt-kep"><img src="' + BOLTKEP + '" alt="A Bí-Bor-Ász Gazdabolt épülete Villányban" width="1200" height="1024" loading="lazy" decoding="async"></figure>'
+ '<div class="bbk-bolt-sz"><div><div class="bbk-felcim">Személyesen is szívesen segítünk</div>'
+ '<h2 class="bbk-h2" id="bbk-bolt">Üzletünk Villányban</h2></div>'
+ '<div class="bbk-cimsor">' + svg(IKON.hely, '#2a8511', 20) + '<span><b>Bí-Bor-Ász Kft.</b><br>' + esc(CIM) + '</span></div>'
+ '<div class="bbk-idok"><div class="bbk-het" aria-label="Nyitvatartás">' + het + '</div>'
+ '<div class="bbk-kis"><div><b>Ebédszünet</b>hétköznap 12:00–12:30</div>'
+ '<div><b>Raktári árukiadás</b>hétköznap 16:00-ig, szombaton 11:30-ig</div>'
+ '<div><b class="bbk-all" style="display:flex;flex-direction:row;gap:10px;align-items:center"><i class="bbk-pont' + (u.be ? ' bbk-be' : '') + '"></i>' + esc(u.cim) + '</b>' + esc(u.al) + '</div></div></div>'
+ '<div class="bbk-gombok"><a class="bbk-gomb" href="' + UTVONAL + '" target="_blank" rel="noopener">Útvonaltervezés</a>'
+ '<a class="bbk-gomb2" href="' + TERKEP + '" target="_blank" rel="noopener">Megnyitás a Google Térképen' + svg(IKON.kulso, '#1E4A14', 16) + '</a></div></div></section>';

h += '<section class="bbk-also"><div class="bbk-urlap bbk-kartya"><div class="bbk-fejsor">'
+ '<h2 class="bbk-h2" id="bbk-urlap">Írjon nekünk</h2><p>Kérdése van? Töltse ki az űrlapot, és munkanapokon válaszolunk.</p></div>'
+ '<div class="bbk-urlap-hely"></div></div>'
+ '<div class="bbk-ceg bbk-kartya"><h2 class="bbk-h2" id="bbk-ceg">Cégadatok</h2><dl>'
+ CEG.map(function (c) {
return '<div><dt>' + esc(c.k) + '</dt><dd>' + esc(c.v) + '</dd>'
+ (c.masol ? '<button type="button" class="bbk-masol" data-masol="' + esc(c.v) + '" aria-label="' + esc(c.k) + ' másolása">Másolás</button>' : '') + '</div>';
}).join('') + '</dl></div></section>';
return h + '</div>';
}

function epit() {
var regi = document.getElementById('page_content_2869418');
if (!regi || document.getElementById('bbk')) { if (!regi) gyoker.classList.remove('bb-ujkapcs'); return; }
var doboz = document.createElement('div');
doboz.innerHTML = html();
var uj = doboz.firstChild;
regi.parentNode.insertBefore(uj, regi);
var urlap = document.getElementById('page_content_2868588');
var hely = uj.querySelector('.bbk-urlap-hely');
if (urlap && urlap.querySelector('form')) hely.appendChild(urlap);
else hely.innerHTML = '<a class="bbk-gomb" href="mailto:' + EMAIL + '">' + EMAIL + '</a>';
regi.parentNode.removeChild(regi);
gyoker.classList.add('bb-ujkapcs-kesz');

uj.addEventListener('click', function (e) {
var b = e.target.closest('.bbk-masol');
if (!b) return;
var szoveg = b.getAttribute('data-masol');
var kesz = function () {
b.textContent = 'Másolva';
b.classList.add('bbk-ok');
setTimeout(function () { b.textContent = 'Másolás'; b.classList.remove('bbk-ok'); }, 1600);
};
if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(szoveg).then(kesz, function () {});
else {
var ta = document.createElement('textarea');
ta.value = szoveg; ta.style.position = 'fixed'; ta.style.opacity = '0';
document.body.appendChild(ta); ta.select();
try { document.execCommand('copy'); kesz(); } catch (er) { /* nem másolható */ }
document.body.removeChild(ta);
}
});
}
function indul() {
try { epit(); } catch (e) {
gyoker.classList.remove('bb-ujkapcs', 'bb-ujkapcs-kesz');
if (window.console) console.error('[kapcsolat] ', e);
}
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();

});
