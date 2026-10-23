(function () {
var MINDENKI = true;
var OLDAL = 912325;
var KULCS = 'bbUjLabor';
var shop = window.UNAS && window.UNAS.shop;
var oldal = shop && shop.page_id ? Number(shop.page_id) : 0;
if (oldal !== OLDAL && !/^\/laborszolgaltatasok\/?$/.test(location.pathname)) return;
var allapot = null;
try {
var m = location.search.match(/[?&]ujlabor=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { allapot = null; }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
var gyoker = document.documentElement;
if ((gyoker.lang || 'hu').slice(0, 2) !== 'hu') return;

gyoker.classList.add('bb-ujlabor');
gyoker.setAttribute('data-bb-ujlabor', '2026-10-23 12:33:13');
var stilus = document.createElement('style');
stilus.id = 'bb-ujlabor';
stilus.textContent = "html.bb-ujlabor #page_content_2927186,html.bb-ujlabor #page_content_2424094{display: none !important}html.bb-ujlabor.bb-ujlabor-kesz .main__title{display: none}.bbl{--bbl-sotet: #1E4A14;--bbl-zold: #2a8511;--bbl-zold-s: #226d0e;--bbl-szoveg: #1B2036;--bbl-halk: #4A4E5E;--bbl-keret: rgba(30,74,20,.12);--bbl-halvany: #EAF4E6;color: var(--bbl-szoveg);margin: 8px 0 48px;display: flex;flex-direction: column;gap: 44px;width: 100%}.bbl *,.bbl *::before,.bbl *::after{box-sizing: border-box}.bbl h1,.bbl h2,.bbl h3,.bbl p,.bbl ul,.bbl ol,.bbl dl,.bbl dd,.bbl figure{margin: 0}.bbl ul,.bbl ol{padding: 0;list-style: none}.bbl a{text-decoration: none}.bbl a:focus-visible,.bbl summary:focus-visible{outline: 2px solid var(--bbl-zold);outline-offset: 2px}.bbl-felcim{font-size: 13px;font-weight: 700;letter-spacing: .08em;text-transform: uppercase;color: var(--bbl-zold)}.bbl-h2{font-size: 28px;font-weight: 800;color: var(--bbl-sotet);letter-spacing: -.01em;line-height: 1.2}.bbl-fejsor{display: flex;flex-direction: column;gap: 6px;margin-bottom: 20px}.bbl-fejsor p{font-size: 16px;line-height: 1.5;color: var(--bbl-halk)}.bbl-kartya{background: #fff;border: 1px solid var(--bbl-keret);border-radius: 20px}.bbl-gomb{display: inline-flex;align-items: center;justify-content: center;gap: 8px;min-height: 46px;padding: 0 18px;border-radius: 12px;background: var(--bbl-zold);color: #fff !important;font-weight: 700;font-size: 15px;border: 0;cursor: pointer}a.bbl-gomb:hover,.bbl-kiemelt:hover .bbl-gomb{background: var(--bbl-zold-s)}.bbl-gomb2{display: inline-flex;align-items: center;justify-content: center;gap: 8px;min-height: 46px;padding: 0 16px;border-radius: 12px;border: 1px solid rgba(30,74,20,.25);color: var(--bbl-sotet) !important;font-weight: 700;font-size: 15px;background: #fff}.bbl-gomb2:hover{background: var(--bbl-halvany)}.bbl-fej{display: flex;flex-wrap: wrap;gap: 28px;align-items: center;padding: 32px;border-radius: 24px;background: linear-gradient(135deg,#fff 55%,var(--bbl-halvany))}.bbl-fo{flex: 999 1 520px;min-width: 0;display: flex;flex-direction: column;gap: 16px}.bbl-cim{font-size: clamp(30px,4vw,44px);line-height: 1.08;font-weight: 800;letter-spacing: -.02em;color: var(--bbl-sotet)}.bbl-bev{font-size: 17px;line-height: 1.55;color: var(--bbl-halk);max-width: 640px}.bbl-gombok{display: flex;flex-wrap: wrap;gap: 10px}.bbl-szamok{display: grid;grid-template-columns: repeat(3,minmax(0,1fr));gap: 12px;margin-top: 6px !important}.bbl-szamok li{display: flex;flex-direction: column;gap: 2px;padding: 12px 14px;border-radius: 14px;background: #fff;border: 1px solid var(--bbl-keret)}.bbl-szamok b{font-size: 22px;font-weight: 800;color: var(--bbl-zold);line-height: 1.1}.bbl-szamok span{font-size: 13px;line-height: 1.35;color: var(--bbl-halk)}.bbl-kep{flex: 1 1 220px;max-width: 280px;margin: 0 auto !important;text-align: center}.bbl-kep img{width: 100%;height: auto;max-width: 250px;mix-blend-mode: multiply}.bbl-kep figcaption{font-size: 13px;color: var(--bbl-halk);margin-top: 4px}.bbl-elony ul{display: grid;grid-template-columns: repeat(3,minmax(0,1fr));gap: 16px}.bbl-elony li{padding: 22px;display: flex;flex-direction: column;gap: 8px}.bbl-elony h2{font-size: 18px;font-weight: 800;color: var(--bbl-sotet)}.bbl-elony p{font-size: 15px;line-height: 1.5;color: var(--bbl-halk)}.bbl-kiemelt{display: flex;flex-wrap: wrap;gap: 20px 32px;align-items: center;justify-content: space-between;padding: 26px 28px;border-radius: 20px;background: var(--bbl-sotet);color: #fff !important;margin-bottom: 18px}.bbl-kiemelt-sz{flex: 999 1 420px;min-width: 0;display: flex;flex-direction: column;gap: 8px}.bbl-cimke{align-self: flex-start;font-size: 12px;font-weight: 700;letter-spacing: .06em;text-transform: uppercase;padding: 4px 10px;border-radius: 999px;background: rgba(255,255,255,.14);color: #dff1d8}.bbl-kiemelt h3{font-size: 26px;font-weight: 800;color: #fff}.bbl-kiemelt p{font-size: 15px;line-height: 1.5;color: rgba(255,255,255,.82);max-width: 720px}.bbl-kiemelt-ar{flex: 1 1 200px;display: flex;flex-direction: column;align-items: flex-start;gap: 4px}.bbl-kiemelt-ar b{font-size: 30px;font-weight: 800;color: #fff;line-height: 1.1}.bbl-kiemelt-ar small{font-size: 13px;color: rgba(255,255,255,.75);margin-bottom: 10px}.bbl-csoportok{display: grid;grid-template-columns: repeat(auto-fill,minmax(320px,1fr));gap: 16px;align-items: start}.bbl-csoport{padding: 18px 18px 8px}.bbl-csoport h3{font-size: 13px;font-weight: 700;letter-spacing: .08em;text-transform: uppercase;color: var(--bbl-zold);margin-bottom: 4px !important}.bbl-csoport li + li{border-top: 1px solid var(--bbl-keret)}.bbl-v{display: flex;align-items: center;gap: 12px;padding: 12px 0;color: var(--bbl-szoveg) !important}.bbl-v-ikon{flex-shrink: 0;width: 40px;height: 40px;border-radius: 12px;display: inline-flex;align-items: center;justify-content: center;background: var(--bbl-halvany);color: var(--bbl-sotet)}.bbl-kiemelt-ikon{flex: 0 0 64px;height: 64px;border-radius: 18px;display: inline-flex;align-items: center;justify-content: center;background: rgba(255,255,255,.12);color: #fff}.bbl-v-nev{flex: 1;min-width: 0;font-size: 16px;font-weight: 700;line-height: 1.3}.bbl-v-ar{display: flex;flex-direction: column;align-items: flex-end;text-align: right}.bbl-v-ar b{font-size: 16px;font-weight: 800;white-space: nowrap}.bbl-v-ar small{font-size: 12px;color: var(--bbl-halk);white-space: nowrap}.bbl-v-nyil{flex-shrink: 0;width: 34px;height: 34px;border-radius: 50%;display: inline-flex;align-items: center;justify-content: center;background: var(--bbl-halvany);color: var(--bbl-sotet);transition: background .15s,color .15s}.bbl-v:hover .bbl-v-nev{color: var(--bbl-zold)}.bbl-v:hover .bbl-v-nyil{background: var(--bbl-zold);color: #fff}.bbl-minta-racs{display: grid;grid-template-columns: minmax(0,3fr) minmax(0,2fr);gap: 16px;align-items: start}.bbl-lepesek{padding: 10px 22px;counter-reset: bbl-l}.bbl-lepesek li{counter-increment: bbl-l;position: relative;padding: 14px 0 14px 50px;display: flex;flex-direction: column;gap: 3px}.bbl-lepesek li + li{border-top: 1px solid var(--bbl-keret)}.bbl-lepesek li::before{content: counter(bbl-l);position: absolute;left: 0;top: 13px;width: 34px;height: 34px;border-radius: 50%;background: var(--bbl-halvany);color: var(--bbl-sotet);font-weight: 800;display: flex;align-items: center;justify-content: center}.bbl-lepesek b{font-size: 16px;color: var(--bbl-sotet)}.bbl-lepesek span{font-size: 15px;line-height: 1.5;color: var(--bbl-halk)}.bbl-lepesek a{color: var(--bbl-zold) !important;font-weight: 700}.bbl-oldal{display: flex;flex-direction: column;gap: 12px}.bbl-figyel{display: flex;gap: 10px;align-items: center;padding: 14px 16px;border-radius: 14px;background: #fff4e0;border: 1px solid #f3d9a6}.bbl-figyel svg{flex-shrink: 0}.bbl-figyel p{font-size: 15px;color: #6b4000}.bbl-mod{display: flex;gap: 14px;align-items: flex-start;padding: 16px 18px}.bbl-mod svg{flex-shrink: 0;margin-top: 2px}.bbl-mod div{display: flex;flex-direction: column;gap: 2px}.bbl-mod b{font-size: 16px;color: var(--bbl-sotet)}.bbl-mod span{font-size: 15px;color: var(--bbl-halk)}.bbl-mod a{display: inline-flex;align-items: center;gap: 4px;margin-top: 4px;font-size: 14px;font-weight: 700;color: var(--bbl-zold) !important}.bbl-menny{padding: 16px 18px}.bbl-menny h3{font-size: 16px;font-weight: 800;color: var(--bbl-sotet);margin-bottom: 6px !important}.bbl-menny dl\u003Ediv{display: flex;justify-content: space-between;gap: 12px;padding: 8px 0;font-size: 15px}.bbl-menny dl\u003Ediv + div{border-top: 1px solid var(--bbl-keret)}.bbl-menny dt{color: var(--bbl-halk)}.bbl-menny dd{font-weight: 700;text-align: right}.bbl-tobb{display: flex;flex-direction: column;gap: 12px}.bbl-tobb details{padding: 0 22px}.bbl-tobb summary{cursor: pointer;list-style: none;padding: 18px 30px 18px 0;position: relative;font-size: 17px;font-weight: 800;color: var(--bbl-sotet)}.bbl-tobb summary::-webkit-details-marker{display: none}.bbl-tobb summary::after{content: '';position: absolute;right: 4px;top: 50%;width: 9px;height: 9px;margin-top: -7px;border-right: 2px solid currentColor;border-bottom: 2px solid currentColor;transform: rotate(45deg);transition: transform .2s}.bbl-tobb details[open] summary::after{transform: rotate(225deg);margin-top: -2px}.bbl-reszl{display: flex;flex-direction: column;gap: 12px;padding-bottom: 20px;font-size: 15px;line-height: 1.6;color: var(--bbl-halk)}.bbl-kerdes{display: flex;gap: 12px;align-items: center;padding: 16px 20px}.bbl-kerdes svg{flex-shrink: 0}.bbl-kerdes p{font-size: 15px;line-height: 1.5}.bbl-kerdes a{font-weight: 800;color: var(--bbl-zold) !important;white-space: nowrap}.bbl-kerdes span{color: var(--bbl-halk)}@media (max-width: 767.98px){.bbl{gap: 32px;margin-top: 0}.bbl-fej{padding: 22px 18px;border-radius: 20px;gap: 18px}.bbl-kep{display: none}.bbl-bev{font-size: 16px}.bbl-gombok a{flex: 1 1 100%}.bbl-szamok{grid-template-columns: 1fr;gap: 8px}.bbl-szamok li{flex-direction: row;align-items: baseline;gap: 10px;padding: 10px 12px}.bbl-szamok b{font-size: 18px;white-space: nowrap}.bbl-elony ul{grid-template-columns: 1fr;gap: 10px}.bbl-elony li{padding: 16px 18px}.bbl-h2{font-size: 24px}.bbl-kiemelt{padding: 20px 18px}.bbl-kiemelt h3{font-size: 22px}.bbl-kiemelt-ikon{flex-basis: 52px;height: 52px;border-radius: 14px}.bbl-v-ikon{width: 36px;height: 36px;border-radius: 10px}.bbl-kiemelt p{display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;overflow: hidden;max-height: 6em}.bbl-kiemelt-ar{flex-direction: row;flex-wrap: wrap;align-items: baseline;gap: 4px 10px}.bbl-kiemelt-ar small{margin: 0}.bbl-kiemelt-ar .bbl-gomb{flex: 1 1 100%;margin-top: 8px}.bbl-csoportok{grid-template-columns: 1fr;gap: 12px}.bbl-csoport{padding: 14px 16px 4px}.bbl-v-nev{font-size: 15px}.bbl-minta-racs{grid-template-columns: 1fr}.bbl-lepesek{padding: 4px 16px}.bbl-tobb details{padding: 0 16px}}@media (prefers-reduced-motion: reduce){.bbl *{transition: none !important}}";
(document.head || gyoker).appendChild(stilus);
setTimeout(function () { if (!document.getElementById('bbl')) gyoker.classList.remove('bb-ujlabor'); }, 4000);

var SZOVEG_ID = 'page_content_2927186';
var LISTA_ID = 'page_content_2424094';
var JEGYZOKONYV = 'https://www.bi-bor.hu/shop_ordered/63361/pic/documents/HasznalatiUtmutato/minta_atveteli_jegyzokonyv.pdf';
var CIM = '7773 Villány, Szent István u. 35.';
var TEL = { szam: '+36 30 663 7382', nev: 'Értékesítés (BorLabor)' };
var KIEMELT = '15534'; /* Teljes analízis */

var TEMAK = [
{ nev: 'Kén', minta: /kén|so2/ },
{ nev: 'Stabilitás', minta: /stabil/ },
{ nev: 'Erjedés és kezelés', minta: /nitrogén|derítés|szűrhető/ },
{ nev: 'Ionok és fémek', minta: /\bca\b|\bk\b|ion|réz|vas/ },
{ nev: 'Borhibák', minta: /brett|tca/ }
];
var MENNYISEG = [
['Teljes vizsgálat', '0,5 liter'],
['Részvizsgálatok', '1–1,5 liter, a kért vizsgálattól függően'],
['Próbaderítés', '2 liter'],
['Stabilitás', '2 liter']
];

function svg(d, szin, meret) {
return '<svg aria-hidden="true" width="' + (meret || 22) + '" height="' + (meret || 22) + '" viewBox="0 0 24 24" fill="none" stroke="'
+ (szin || '#2a8511') + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
}
var IKON = {
lombik: '<path d="M9 3h6M10 3v6.5L4.6 18.2A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.8L14 9.5V3"/><path d="M7.5 15h9"/>',
cel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
ora: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
lakat: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
letolt: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 21h16"/>',
nyil: '<path d="M5 12h14M13 6l6 6-6 6"/>',
bolt: '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9h18M9 20v-6h6v6"/>',
posta: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
figyel: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'
};
function elem(jel) {
return '<rect x="3" y="3" width="18" height="18" rx="3"/><text x="12" y="15.6" text-anchor="middle" font-size="' + (jel.length > 1 ? 8.5 : 10)
+ '" font-weight="800" font-family="inherit" fill="currentColor" stroke="none">' + jel + '</text>';
}
var VIZSG_IKON = [
{ minta: /szabad|so2|kén/, d: '<circle cx="12" cy="8" r="3"/><circle cx="5.5" cy="17" r="2.5"/><circle cx="18.5" cy="17" r="2.5"/><path d="M10.2 10.4 7 15M13.8 10.4 17 15"/>' },
{ minta: /fehérje/, d: '<path d="M10 2h4v4l1.5 3v12a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V9L10 6z"/><circle cx="12.6" cy="12" r=".9"/><circle cx="11" cy="15.5" r=".9"/><circle cx="13" cy="18.6" r=".9"/>' },
{ minta: /borkő/, d: '<path d="M12 3l7 4v10l-7 4-7-4V7z"/><path d="M5 7l7 4 7-4M12 11v10"/>' },
{ minta: /derítés/, d: '<path d="M5 3v14a2 2 0 0 0 4 0V3M10 3v14a2 2 0 0 0 4 0V3M15 3v14a2 2 0 0 0 4 0V3"/><path d="M5 10h4M10 12.5h4M15 15h4"/>' },
{ minta: /szűrhető/, d: '<path d="M3 4h18l-7 8v6l-4 2v-8z"/>' },
{ minta: /nitrogén/, d: elem('N') },
{ minta: /\bca\b/, d: elem('Ca') },
{ minta: /\bk\b/, d: elem('K') },
{ minta: /réz/, d: elem('Cu') },
{ minta: /vas/, d: elem('Fe') },
{ minta: /brett/, d: '<ellipse cx="12" cy="12" rx="8" ry="5.5"/><circle cx="9" cy="11" r="1.3"/><circle cx="14.5" cy="13" r="1.3"/><path d="M2 12h2M20 12h2"/>' },
{ minta: /tca/, d: '<path d="M7 4h10l-1.2 16H8.2z"/><path d="M8 9h8M8.6 14.5h6.8"/>' }
];
function vizsgIkon(nev) {
var n = nev.toLowerCase();
for (var i = 0; i < VIZSG_IKON.length; i++) if (VIZSG_IKON[i].minta.test(n)) return svg(VIZSG_IKON[i].d, 'currentColor', 22);
return svg(IKON.lombik, 'currentColor', 22);
}
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function szoveg(el) { return el ? (el.textContent || '').replace(/\s+/g, ' ').trim() : ''; }

function vizsgalatok(lista) {
var ki = [];
var kartyak = lista.querySelectorAll('.js-product');
for (var i = 0; i < kartyak.length; i++) {
var k = kartyak[i];
var link = k.querySelector('.product__name-link');
if (!link) continue;
var nev = szoveg(link);
var brutto = szoveg(k.querySelector('.price-gross'));
var netto = szoveg(k.querySelector('.price-net'));
var leiras = szoveg(k.querySelector('.read-more__content'));
var sku = link.getAttribute('data-sku') || '';
ki.push({ sku: sku, nev: nev, rovid: nev.replace(/^Labormérés\s+/i, ''), url: link.getAttribute('href'), brutto: brutto, netto: netto, leiras: leiras });
}
return ki;
}
function tema(v) {
var n = v.rovid.toLowerCase();
for (var i = 0; i < TEMAK.length; i++) if (TEMAK[i].minta.test(n)) return TEMAK[i].nev;
return 'Egyéb vizsgálatok';
}
function ar(v) { return v.brutto ? v.brutto + ' Ft' : ''; }
function kartya(v) {
return '<li><a class="bbl-v" href="' + esc(v.url) + '">'
+ '<span class="bbl-v-ikon">' + vizsgIkon(v.rovid) + '</span>'
+ '<span class="bbl-v-nev">' + esc(v.rovid.charAt(0).toUpperCase() + v.rovid.slice(1)) + '</span>'
+ '<span class="bbl-v-ar"><b>' + esc(ar(v)) + '</b>' + (v.netto ? '<small>nettó ' + esc(v.netto) + ' Ft + ÁFA</small>' : '') + '</span>'
+ '<span class="bbl-v-nyil">' + svg(IKON.nyil, 'currentColor', 18) + '</span></a></li>';
}

function regiResz(regi) {
var ki = { winescan: '', elallas: '', kep: '' };
var img = regi.querySelector('img');
if (img) ki.kep = img.getAttribute('src') || '';
var h3k = regi.querySelectorAll('h3');
var pontossag = null, elallas = null;
for (var i = 0; i < h3k.length; i++) {
var t = szoveg(h3k[i]);
if (!pontossag && /^Pontosság/.test(t)) pontossag = h3k[i];
if (!elallas && /elállási jog/i.test(t)) elallas = h3k[i];
}
var ps = regi.querySelectorAll('p');
var w = [];
for (var j = 0; j < ps.length; j++) {
if (pontossag && (ps[j].compareDocumentPosition(pontossag) & 4) && szoveg(ps[j]).length > 40) w.push('<p>' + esc(szoveg(ps[j])) + '</p>');
}
ki.winescan = w.join('');
if (elallas) {
var e = [], n = elallas.nextElementSibling;
while (n && !/^H[1-3]$/.test(n.tagName)) {
var tx = szoveg(n);
if (tx) e.push('<p>' + esc(tx) + '</p>');
n = n.nextElementSibling;
}
if (!e.length) {
var b = elallas.parentNode.querySelectorAll('p');
for (var x = 0; x < b.length; x++) if (b[x].compareDocumentPosition(elallas) & 2) e.push('<p>' + esc(szoveg(b[x])) + '</p>');
}
ki.elallas = e.join('');
}
return ki;
}

function html(v, r) {
var kiemelt = null, csoport = {}, sorrend = [];
v.forEach(function (x) {
if (x.sku === KIEMELT) { kiemelt = x; return; }
var t = tema(x);
if (!csoport[t]) { csoport[t] = []; sorrend.push(t); }
csoport[t].push(x);
});
sorrend.sort(function (a, b) {
var ia = TEMAK.map(function (t) { return t.nev; }).indexOf(a), ib = TEMAK.map(function (t) { return t.nev; }).indexOf(b);
return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
});

var h = '<div class="bbl" id="bbl">';

h += '<section class="bbl-fej bbl-kartya" aria-labelledby="bbl-cim"><div class="bbl-fo">'
+ '<div class="bbl-felcim">BorLabor · Villány</div>'
+ '<h1 class="bbl-cim" id="bbl-cim">Borvizsgálat gyorsan, pontosan</h1>'
+ '<p class="bbl-bev">WineScan FT 120 műszerrel mérünk. A reggel 9 óráig beérkezett minta eredményét még aznap 14 óráig elküldjük, így Ön még aznap megteheti a szükséges lépéseket.</p>'
+ '<div class="bbl-gombok"><a class="bbl-gomb" href="#bbl-vizsgalatok">' + svg(IKON.lombik, '#fff', 18) + 'Vizsgálatot választok</a>'
+ '<a class="bbl-gomb2" href="' + JEGYZOKONYV + '" target="_blank" rel="noopener">' + svg(IKON.letolt, '#1E4A14', 18) + 'Mintaleadási jegyzőkönyv (PDF)</a></div>'
+ '<ul class="bbl-szamok">'
+ '<li><b>30 mp</b><span>mérési idő a WineScan műszeren</span></li>'
+ '<li><b>9 → 14 óra</b><span>reggel 9-ig hozott minta: eredmény még aznap</span></li>'
+ '<li><b>3 óra</b><span>sürgősségi vizsgálat</span></li></ul></div>'
+ (r.kep ? '<figure class="bbl-kep"><img src="' + esc(r.kep) + '" alt="FOSS WineScan FT 120 borelemző műszer" width="250" height="250" loading="lazy"><figcaption>FOSS WineScan FT 120</figcaption></figure>' : '')
+ '</section>';

h += '<section class="bbl-elony" aria-label="Miért a BorLabor?"><ul>'
+ '<li class="bbl-kartya">' + svg(IKON.cel) + '<h2>Pontosság</h2><p>Infravörös (FTIR) mérés, és minden mintát kétszer mérünk meg egymás után, majd összevetjük az eredményeket.</p></li>'
+ '<li class="bbl-kartya">' + svg(IKON.ora) + '<h2>Gyorsaság</h2><p>Reggel 9-ig beérkezett minta: eredmény 14 óráig. Később érkezett: másnap reggel 9-ig. Sürgősségi vizsgálat: 3 órán belül.</p></li>'
+ '<li class="bbl-kartya">' + svg(IKON.lakat) + '<h2>Bizalmasan</h2><p>Az adatokat bizalmasan kezeljük és hosszú távon megőrizzük, így adatvesztés esetén is visszakereshetők.</p></li>'
+ '</ul></section>';

h += '<section class="bbl-vizsg" id="bbl-vizsgalatok" aria-labelledby="bbl-v-cim"><div class="bbl-fejsor">'
+ '<div class="bbl-felcim">Árak bruttó, ÁFA-val</div><h2 class="bbl-h2" id="bbl-v-cim">Választható vizsgálatok</h2>'
+ '<p>Válassza ki a vizsgálatot, a termékoldalon rendelheti meg. A mintát utána hozza be, vagy küldje el postán.</p></div>';
if (kiemelt) {
h += '<a class="bbl-kiemelt" href="' + esc(kiemelt.url) + '"><span class="bbl-kiemelt-ikon">' + svg(IKON.lombik, 'currentColor', 34) + '</span><div class="bbl-kiemelt-sz">'
+ '<span class="bbl-cimke">Átfogó kép a borról</span>'
+ '<h3>' + esc(kiemelt.rovid) + '</h3>'
+ (kiemelt.leiras ? '<p>' + esc(kiemelt.leiras) + '</p>' : '')
+ '</div><div class="bbl-kiemelt-ar"><b>' + esc(ar(kiemelt)) + '</b>'
+ (kiemelt.netto ? '<small>nettó ' + esc(kiemelt.netto) + ' Ft + ÁFA</small>' : '')
+ '<span class="bbl-gomb">Megrendelem' + svg(IKON.nyil, '#fff', 18) + '</span></div></a>';
}
h += '<div class="bbl-csoportok">';
sorrend.forEach(function (t) {
h += '<div class="bbl-csoport bbl-kartya"><h3>' + esc(t) + '</h3><ul>' + csoport[t].map(kartya).join('') + '</ul></div>';
});
h += '</div></section>';

h += '<section class="bbl-minta" aria-labelledby="bbl-m-cim"><div class="bbl-fejsor">'
+ '<div class="bbl-felcim">Mintaleadás</div><h2 class="bbl-h2" id="bbl-m-cim">Így juttassa el hozzánk a mintát</h2></div>'
+ '<div class="bbl-minta-racs"><ol class="bbl-lepesek bbl-kartya">'
+ '<li><b>Új, steril edény</b><span>Öntse át a mintát egy új, steril edénybe, lehetőleg PET palackba (szállítás közben kevésbé sérül).</span></li>'
+ '<li><b>Felirat</b><span>Az edényt lássa el névvel, sorszámmal, megnevezéssel és elérhetőséggel.</span></li>'
+ '<li><b>Jegyzőkönyv</b><span>Csatolja a kitöltött mintaleadási jegyzőkönyvet. <a href="' + JEGYZOKONYV + '" target="_blank" rel="noopener">Letöltés (PDF)</a></span></li>'
+ '<li><b>Leadás</b><span>Hozza be villányi üzletünkbe, vagy küldje el postán, csomagként.</span></li>'
+ '<li><b>Eredmény</b><span>Az eredményről a megadott elérhetőségen értesítjük.</span></li></ol>'
+ '<div class="bbl-oldal">'
+ '<div class="bbl-figyel">' + svg(IKON.figyel, '#9a5b00', 20) + '<p><b>Erjedő mintát ne küldjön futárszolgálattal!</b></p></div>'
+ '<div class="bbl-mod bbl-kartya">' + svg(IKON.bolt) + '<div><b>Személyesen</b><span>villányi üzletünkben</span><a href="/kapcsolat">Nyitvatartás' + svg(IKON.nyil, 'currentColor', 16) + '</a></div></div>'
+ '<div class="bbl-mod bbl-kartya">' + svg(IKON.posta) + '<div><b>Postán, csomagként</b><span>' + esc(CIM) + '</span></div></div>'
+ '<div class="bbl-menny bbl-kartya"><h3>Szükséges mintamennyiség</h3><dl>'
+ MENNYISEG.map(function (m) { return '<div><dt>' + esc(m[0]) + '</dt><dd>' + esc(m[1]) + '</dd></div>'; }).join('')
+ '</dl></div></div></div></section>';

h += '<section class="bbl-tobb" aria-label="További információk">';
if (r.winescan) h += '<details class="bbl-kartya"><summary>Hogyan mér a WineScan?</summary><div class="bbl-reszl">' + r.winescan + '</div></details>';
if (r.elallas) h += '<details class="bbl-kartya"><summary>Tájékoztató az elállási jogról</summary><div class="bbl-reszl">' + r.elallas + '</div></details>';
h += '</section>';

h += '<aside class="bbl-kerdes bbl-kartya">' + svg(IKON.tel) + '<p>Kérdése van a vizsgálatokról? Hívja kollégánkat: '
+ '<a href="tel:' + TEL.szam.replace(/[^\d+]/g, '') + '">' + esc(TEL.szam) + '</a> <span>(' + esc(TEL.nev) + ')</span></p></aside>';

return h + '</div>';
}

function epit() {
var regi = document.getElementById(SZOVEG_ID), lista = document.getElementById(LISTA_ID);
if (!regi || !lista || document.getElementById('bbl')) { if (!document.getElementById('bbl')) gyoker.classList.remove('bb-ujlabor'); return; }
var v = vizsgalatok(lista);
if (!v.length) { gyoker.classList.remove('bb-ujlabor'); return; }
var r = regiResz(regi);
var doboz = document.createElement('div');
doboz.innerHTML = html(v, r);
var uj = doboz.firstChild;
var hely = regi.closest('section.page_content') || regi.parentNode;
hely.parentNode.insertBefore(uj, hely);
regi.parentNode.removeChild(regi);
lista.parentNode.removeChild(lista);
gyoker.classList.add('bb-ujlabor-kesz');
}
function indul() {
try { epit(); } catch (e) {
gyoker.classList.remove('bb-ujlabor', 'bb-ujlabor-kesz');
var u = document.getElementById('bbl');
if (u) u.parentNode.removeChild(u);
if (window.console) console.error('[borlabor] ', e);
}
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
