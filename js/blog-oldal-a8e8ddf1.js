(function () {
var MINDENKI = false;
var OLDAL = 930300;
var KULCS = 'bbUjBlog';
var shop = window.UNAS && window.UNAS.shop;
var oldal = shop && shop.page_id ? Number(shop.page_id) : 0;
if (oldal !== OLDAL && !/^\/blog\/?$/.test(location.pathname)) return;
var allapot = null;
try {
var m = location.search.match(/[?&]ujblog=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { allapot = null; }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
var gyoker = document.documentElement;
if ((gyoker.lang || 'hu').slice(0, 2) !== 'hu') return;

gyoker.classList.add('bb-ujblog');
gyoker.setAttribute('data-bb-ujblog', '2026-10-23 12:29:27');
var stilus = document.createElement('style');
stilus.id = 'bb-ujblog';
stilus.textContent = "html.bb-ujblog .page_content--blog{display: none !important}html.bb-ujblog.bb-ujblog-kesz .main__title{display: none}.bbb{--bbb-sotet: #1E4A14;--bbb-zold: #2a8511;--bbb-zold-s: #226d0e;--bbb-szoveg: #1B2036;--bbb-halk: #4A4E5E;--bbb-keret: rgba(30,74,20,.12);--bbb-halvany: #EAF4E6;color: var(--bbb-szoveg);margin: 8px 0 48px;display: flex;flex-direction: column;gap: 44px;width: 100%}.bbb *,.bbb *::before,.bbb *::after{box-sizing: border-box}.bbb h1,.bbb h2,.bbb p,.bbb ul{margin: 0}.bbb ul{padding: 0;list-style: none}.bbb a{text-decoration: none;color: inherit}.bbb a:focus-visible,.bbb button:focus-visible,.bbb input:focus-visible{outline: 2px solid var(--bbb-zold);outline-offset: 2px}.bbb [hidden]{display: none !important}.bbb-felcim{font-size: 13px;font-weight: 700;letter-spacing: .08em;text-transform: uppercase;color: var(--bbb-zold)}.bbb-h2{font-size: 28px;font-weight: 800;color: var(--bbb-sotet);letter-spacing: -.01em;line-height: 1.2}.bbb-fejsor{display: flex;flex-direction: column;gap: 6px;margin-bottom: 20px}.bbb-kartya{background: #fff;border: 1px solid var(--bbb-keret);border-radius: 20px}.bbb-gomb2{display: inline-flex;align-items: center;justify-content: center;gap: 8px;min-height: 46px;padding: 0 22px;border-radius: 12px;border: 1px solid rgba(30,74,20,.25);color: var(--bbb-sotet);font: inherit;font-weight: 700;font-size: 15px;background: #fff;cursor: pointer}.bbb-gomb2:hover{background: var(--bbb-halvany)}.bbb-fej{padding: 32px;border-radius: 24px;display: flex;flex-direction: column;gap: 14px;background: linear-gradient(135deg,#fff 55%,var(--bbb-halvany))}.bbb-cim{font-size: clamp(30px,4vw,44px);line-height: 1.08;font-weight: 800;letter-spacing: -.02em;color: var(--bbb-sotet)}.bbb-bev{font-size: 17px;line-height: 1.55;color: var(--bbb-halk);max-width: 720px}.bbb-kereso{display: flex;align-items: center;gap: 10px;max-width: 620px;min-height: 52px;padding: 0 16px;margin: 4px 0 0;border: 1px solid rgba(30,74,20,.22);border-radius: 14px;background: #fff;cursor: text}.bbb-kereso:focus-within{border-color: var(--bbb-zold);box-shadow: 0 0 0 3px rgba(42,133,17,.12)}.bbb-kereso input{flex: 1;min-width: 0;border: 0 !important;outline: 0;background: none;font: inherit;font-size: 16px;color: var(--bbb-szoveg);padding: 0;height: 50px;box-shadow: none !important}.bbb-szurok{display: flex;flex-wrap: wrap;gap: 8px}.bbb-sz{display: inline-flex;align-items: center;gap: 6px;min-height: 38px;padding: 0 14px;border-radius: 999px;cursor: pointer;border: 1px solid rgba(30,74,20,.2);background: #fff;color: var(--bbb-sotet);font: inherit;font-size: 14px;font-weight: 700}.bbb-sz span{font-weight: 600;color: var(--bbb-halk);font-size: 13px}.bbb-sz:hover{background: var(--bbb-halvany)}.bbb-sz.bbb-aktiv{background: var(--bbb-zold);border-color: var(--bbb-zold);color: #fff}.bbb-sz.bbb-aktiv span{color: rgba(255,255,255,.85)}.bbb-t-meres{--bbb-t: #2a8511;--bbb-th: #EAF4E6}.bbb-t-kezeles{--bbb-t: #7a1f24;--bbb-th: #f6e8e9}.bbb-t-palack{--bbb-t: #1E4A14;--bbb-th: #e3efe0}.bbb-t-tarolas{--bbb-t: #3d5a73;--bbb-th: #e7eef4}.bbb-t-csomag{--bbb-t: #8a5a14;--bbb-th: #f6eedf}.bbb-t-szolo{--bbb-t: #5b2a6e;--bbb-th: #f0e8f3}.bbb-t-gep{--bbb-t: #4A4E5E;--bbb-th: #eeeff2}.bbb-t-ruha{--bbb-t: #9a5b00;--bbb-th: #fbefdc}.bbb-t-egyeb{--bbb-t: #2a8511;--bbb-th: #EAF4E6}.bbb-uj-racs{display: grid;grid-template-columns: repeat(auto-fit,minmax(210px,1fr));gap: 16px}.bbb-ujk{height: 100%;display: flex;flex-direction: column;gap: 8px;padding: 22px;border-radius: 20px;background: #fff;border: 1px solid var(--bbb-keret);transition: box-shadow .15s,transform .15s}.bbb-ujk:hover{box-shadow: 0 10px 28px rgba(30,74,20,.12);transform: translateY(-2px)}.bbb-ujk-ikon{width: 48px;height: 48px;border-radius: 14px;display: inline-flex;align-items: center;justify-content: center;background: var(--bbb-th,#EAF4E6);color: var(--bbb-t,#2a8511);margin-bottom: 4px}.bbb-ujk-cim{font-size: 19px;font-weight: 800;line-height: 1.25;color: var(--bbb-sotet)}.bbb-tema{font-size: 12px;font-weight: 700;letter-spacing: .06em;text-transform: uppercase;color: var(--bbb-zold)}.bbb-k-kiv{font-size: 14.5px;line-height: 1.5;color: var(--bbb-halk);display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;max-height: 4.5em;flex-shrink: 0}.bbb-tovabb{margin-top: auto;padding-top: 6px;display: inline-flex;align-items: center;gap: 6px;font-size: 14px;font-weight: 700;color: var(--bbb-zold)}.bbb-racs{display: grid;grid-template-columns: repeat(auto-fill,minmax(250px,1fr));gap: 18px}.bbb-k a{height: 100%;display: flex;flex-direction: column;border-radius: 18px;overflow: hidden;background: #fff;border: 1px solid var(--bbb-keret);transition: box-shadow .15s,transform .15s}.bbb-k a:hover{box-shadow: 0 10px 28px rgba(30,74,20,.12);transform: translateY(-2px)}.bbb-k a:hover .bbb-k-cim{color: var(--bbb-zold)}.bbb-kep{display: block;aspect-ratio: 16 / 10;background: #fff;border-bottom: 1px solid var(--bbb-keret);overflow: hidden}.bbb-kep img{width: 100%;height: 100%;object-fit: contain;padding: 10px;display: block}.bbb-kep--ikon{display: flex;align-items: center;justify-content: center;background: var(--bbb-th,#EAF4E6);color: var(--bbb-t,#2a8511)}.bbb-k-sz{flex: 1;display: flex;flex-direction: column;gap: 6px;padding: 16px 18px 18px}.bbb-k-cim{font-size: 17px;font-weight: 800;line-height: 1.3;color: var(--bbb-sotet);transition: color .15s;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;max-height: 3.9em;flex-shrink: 0}.bbb-nincs{padding: 24px;text-align: center;color: var(--bbb-halk);font-size: 16px}.bbb-link{border: 0;background: none;padding: 0;font: inherit;color: var(--bbb-zold);font-weight: 700;cursor: pointer;text-decoration: underline}.bbb-tovabb-wrap{display: flex;justify-content: center;margin-top: 24px}@media (max-width: 767.98px){.bbb{gap: 32px;margin-top: 0}.bbb-fej{padding: 22px 18px;border-radius: 20px}.bbb-bev{font-size: 16px}.bbb-szurok{flex-wrap: nowrap;overflow-x: auto;margin: 0 -18px;padding: 2px 18px 6px;scrollbar-width: none}.bbb-szurok::-webkit-scrollbar{display: none}.bbb-sz{flex-shrink: 0}.bbb-h2{font-size: 24px}.bbb-uj-racs{grid-template-columns: 1fr;gap: 10px}.bbb-ujk{padding: 16px 18px;flex-direction: row;flex-wrap: wrap;align-items: center;column-gap: 12px}.bbb-ujk-ikon{width: 40px;height: 40px;margin: 0}.bbb-ujk .bbb-tema{flex: 1}.bbb-ujk-cim,.bbb-ujk .bbb-k-kiv,.bbb-ujk .bbb-tovabb{flex: 1 1 100%}.bbb-ujk .bbb-k-kiv{-webkit-line-clamp: 2;max-height: 3em}.bbb-racs{grid-template-columns: 1fr;gap: 10px}.bbb-k a{flex-direction: row;align-items: stretch}.bbb-kep{flex: 0 0 104px;aspect-ratio: auto;border-bottom: 0;border-right: 1px solid var(--bbb-keret)}.bbb-kep img{padding: 6px}.bbb-k-sz{padding: 12px 14px;gap: 4px}.bbb-k-cim{font-size: 15.5px}.bbb-k .bbb-k-kiv{-webkit-line-clamp: 2;max-height: 3em;font-size: 13.5px}.bbb-k .bbb-tovabb{display: none}}@media (prefers-reduced-motion: reduce){.bbb *{transition: none !important}}";
(document.head || gyoker).appendChild(stilus);
setTimeout(function () { if (!document.getElementById('bbb')) gyoker.classList.remove('bb-ujblog'); }, 4000);

var LAP = 12;
var TEMAK = [
{ k: 'meres', nev: 'Mérés és labor', minta: /mér(je|és|ni|ő)|cukorfok|refrakto|labor|analí/ },
{ k: 'kezeles', nev: 'Borkezelés', minta: /derít|bentonit|kén|élesztő|tápsó|almasav|kezelőanyag|erbsl|minőségi borok/ },
{ k: 'palack', nev: 'Palackozás és zárás', minta: /palack|dugó|kupak|címkéz|parafa/ },
{ k: 'tarolas', nev: 'Tárolás', minta: /tartály|hordó|tárol/ },
{ k: 'csomag', nev: 'Csomagolás és ajándék', minta: /bag in box|karton|csomagol|díszdoboz|díszüveg|pohar|pohár|zacskó/ },
{ k: 'szolo', nev: 'Szőlő és kert', minta: /szőlő|metsz|kötöz|raff|rafia|permet|trágy|vetőmag|magv|növény|gripple|oltó|szüret|kert|hecht|támrendszer/ },
{ k: 'gep', nev: 'Gépek', minta: /gép/ },
{ k: 'ruha', nev: 'Munkaruha', minta: /kapriol|munkaruha/ }
];
var EGYEB = { k: 'egyeb', nev: 'Általános' };

function svg(d, szin, meret) {
return '<svg aria-hidden="true" width="' + (meret || 22) + '" height="' + (meret || 22) + '" viewBox="0 0 24 24" fill="none" stroke="'
+ (szin || '#2a8511') + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
}
var IKON = {
keres: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
nyil: '<path d="M5 12h14M13 6l6 6-6 6"/>',
konyv: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7"/>',
meres: '<path d="M9 3h6M10 3v6.5L4.6 18.2A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.8L14 9.5V3"/><path d="M7.5 15h9"/>',
kezeles: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/>',
palack: '<path d="M10 2h4v4l1.5 3v12a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V9L10 6z"/><path d="M8.5 13h7"/>',
tarolas: '<path d="M6 4h12v16H6z"/><path d="M6 9h12M6 15h12"/>',
csomag: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
szolo: '<circle cx="9" cy="10" r="2.2"/><circle cx="14" cy="10" r="2.2"/><circle cx="11.5" cy="14" r="2.2"/><circle cx="11.5" cy="18.2" r="2"/><path d="M12 3c0 2 1 3 3 4"/>',
gep: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
ruha: '<path d="M8 3 3 6l2 5 2-1v11h10V10l2 1 2-5-5-3a4 4 0 0 1-8 0z"/>',
egyeb: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7"/>'
};
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function egyszeru(s) { return String(s || '').toLowerCase().normalize ? String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') : String(s || '').toLowerCase(); }
function tema(c) {
var n = (c.cim + ' ' + c.kivonat).toLowerCase();
var cn = c.cim.toLowerCase();
for (var i = 0; i < TEMAK.length; i++) if (TEMAK[i].minta.test(cn)) return TEMAK[i];
for (var j = 0; j < TEMAK.length; j++) if (TEMAK[j].minta.test(n)) return TEMAK[j];
return EGYEB;
}

function cikkek(elemek) {
var ki = [], volt = {};
for (var i = 0; i < elemek.length; i++) {
var e = elemek[i];
var a = e.querySelector('.blog-item__title a');
if (!a) continue;
var cim = (a.textContent || '').replace(/\s+/g, ' ').trim();
var kulcs = cim.toLowerCase();
if (!cim || volt[kulcs]) continue;
volt[kulcs] = true;
var img = e.querySelector('.blog-item__img');
var kep = img ? (img.getAttribute('data-src') || '') : '';
if (/space\.gif$/.test(kep)) kep = '';
var datum = e.querySelector('.blog-item__date');
var bev = e.querySelector('.blog-item__intro-text');
var utmutato = !!(bev && bev.querySelector('.bba-blog'));
var txt = '';
if (bev) {
var m = bev.cloneNode(true);
var ki2 = m.querySelectorAll('style, script, h1, h2');
for (var x = 0; x < ki2.length; x++) ki2[x].parentNode.removeChild(ki2[x]);
txt = (m.textContent || '').replace(/\s+/g, ' ').trim();
}
if (txt.length > 220) txt = txt.slice(0, 220).replace(/\s+\S*$/, '') + '…';
var c = { cim: cim, url: a.getAttribute('href'), kep: kep, datum: datum ? datum.textContent.trim() : '', kivonat: txt,
utmutato: utmutato, lejart: /lejárt/i.test(cim), sorsz: ki.length };
c.tema = tema(c);
c.kereso = egyszeru(cim + ' ' + txt + ' ' + c.tema.nev);
ki.push(c);
}
ki.sort(function (p, q) { return (p.lejart - q.lejart) || (p.sorsz - q.sorsz); });
return ki;
}

function kepHely(c, nagy) {
if (c.kep) return '<span class="bbb-kep"><img src="' + esc(c.kep) + '" alt="" loading="lazy" width="400" height="400"></span>';
return '<span class="bbb-kep bbb-kep--ikon bbb-t-' + c.tema.k + '">' + svg(IKON[c.tema.k] || IKON.egyeb, 'currentColor', nagy ? 44 : 36) + '</span>';
}
function kartya(c) {
return '<li class="bbb-k" data-tema="' + c.tema.k + '"><a href="' + esc(c.url) + '">' + kepHely(c)
+ '<span class="bbb-k-sz"><span class="bbb-tema">' + esc(c.tema.nev) + (c.lejart ? ' · lejárt akció' : '') + (c.datum ? ' · ' + esc(c.datum) : '') + '</span>'
+ '<span class="bbb-k-cim">' + esc(c.cim.replace(/\s*-\s*LEJÁRT\s*$/i, '')) + '</span>'
+ (c.kivonat ? '<span class="bbb-k-kiv">' + esc(c.kivonat) + '</span>' : '')
+ '<span class="bbb-tovabb">Elolvasom' + svg(IKON.nyil, 'currentColor', 16) + '</span></span></a></li>';
}

function html(lista) {
var uj = lista.filter(function (c) { return c.utmutato; });
var tobbi = lista.filter(function (c) { return !c.utmutato; });
var db = {};
tobbi.forEach(function (c) { db[c.tema.k] = (db[c.tema.k] || 0) + 1; });
var h = '<div class="bbb" id="bbb">';
h += '<section class="bbb-fej bbb-kartya" aria-labelledby="bbb-cim"><div class="bbb-felcim">Blog · Tudástár</div>'
+ '<h1 class="bbb-cim" id="bbb-cim">Borászati tudástár</h1>'
+ '<p class="bbb-bev">Gyakorlati útmutatók borászoknak és szőlészeknek: mérés, borkezelés, palackozás, tárolás és a szőlő körüli munkák.</p>'
+ '<label class="bbb-kereso">' + svg(IKON.keres, '#5B5F70', 20)
+ '<input type="search" id="bbb-q" placeholder="Keresés a cikkekben, pl. kén, metszés, bag in box" autocomplete="off" aria-label="Keresés a cikkekben"></label>'
+ '<div class="bbb-szurok" role="group" aria-label="Témák"><button type="button" class="bbb-sz bbb-aktiv" data-tema="">Összes <span>' + tobbi.length + '</span></button>';
TEMAK.concat([EGYEB]).forEach(function (t) {
if (db[t.k]) h += '<button type="button" class="bbb-sz" data-tema="' + t.k + '">' + esc(t.nev) + ' <span>' + db[t.k] + '</span></button>';
});
h += '</div></section>';

if (uj.length) {
h += '<section class="bbb-uj" aria-labelledby="bbb-uj-cim"><div class="bbb-fejsor"><div class="bbb-felcim">Friss útmutatók</div>'
+ '<h2 class="bbb-h2" id="bbb-uj-cim">Kérdések, amiket a legtöbben feltesznek</h2></div><ul class="bbb-uj-racs">';
uj.forEach(function (c) {
h += '<li><a class="bbb-ujk bbb-t-' + c.tema.k + '" href="' + esc(c.url) + '"><span class="bbb-ujk-ikon">' + svg(IKON[c.tema.k] || IKON.egyeb, 'currentColor', 26) + '</span>'
+ '<span class="bbb-tema">' + esc(c.tema.nev) + '</span><span class="bbb-ujk-cim">' + esc(c.cim) + '</span>'
+ (c.kivonat ? '<span class="bbb-k-kiv">' + esc(c.kivonat) + '</span>' : '')
+ '<span class="bbb-tovabb">Elolvasom' + svg(IKON.nyil, 'currentColor', 16) + '</span></a></li>';
});
h += '</ul></section>';
}

h += '<section class="bbb-lista" aria-labelledby="bbb-l-cim"><div class="bbb-fejsor"><div class="bbb-felcim">Cikkek</div>'
+ '<h2 class="bbb-h2" id="bbb-l-cim">Minden cikk</h2></div>'
+ '<ul class="bbb-racs" id="bbb-racs">' + tobbi.map(kartya).join('') + '</ul>'
+ '<p class="bbb-nincs" id="bbb-nincs" hidden>Nincs találat. Próbálja más szóval, vagy <button type="button" class="bbb-link" id="bbb-torol">nézze meg az összes cikket</button>.</p>'
+ '<div class="bbb-tovabb-wrap"><button type="button" class="bbb-gomb2" id="bbb-tobb">További cikkek</button></div></section>';
return h + '</div>';
}

function vezerles(gy) {
var q = gy.querySelector('#bbb-q'), racs = gy.querySelector('#bbb-racs'), tobb = gy.querySelector('#bbb-tobb'), nincs = gy.querySelector('#bbb-nincs');
var kartyak = Array.prototype.slice.call(racs.children);
var temak = gy.querySelectorAll('.bbb-sz');
var szur = '', lathato = LAP;
function frissit() {
var kifejezes = egyszeru(q.value).trim().split(/\s+/).filter(Boolean);
var talalat = 0, mutat = 0;
kartyak.forEach(function (k, i) {
var c = k.getAttribute('data-kereso');
var ok = (!szur || k.getAttribute('data-tema') === szur) && kifejezes.every(function (s) { return c.indexOf(s) >= 0; });
if (ok) talalat++;
var latszik = ok && (kifejezes.length || talalat <= lathato);
k.hidden = !latszik;
if (latszik) mutat++;
});
nincs.hidden = talalat > 0;
var maradt = talalat - mutat;
tobb.hidden = maradt <= 0;
if (maradt > 0) tobb.textContent = 'További cikkek (' + maradt + ')';
}
temak.forEach(function (b) {
b.addEventListener('click', function () {
temak.forEach(function (x) { x.classList.toggle('bbb-aktiv', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
szur = b.getAttribute('data-tema');
lathato = LAP;
frissit();
});
});
q.addEventListener('input', function () { lathato = LAP; frissit(); });
tobb.addEventListener('click', function () { lathato += LAP; frissit(); });
gy.querySelector('#bbb-torol').addEventListener('click', function () { q.value = ''; temak[0].click(); });
frissit();
}

function epit() {
if (document.getElementById('bbb')) return;
var elemek = document.querySelectorAll('.page_content--blog');
if (!elemek.length) { gyoker.classList.remove('bb-ujblog'); return; }
var lista = cikkek(elemek);
if (lista.length < 3) { gyoker.classList.remove('bb-ujblog'); return; }
var doboz = document.createElement('div');
doboz.innerHTML = html(lista);
var uj = doboz.firstChild;
var kk = uj.querySelectorAll('#bbb-racs > li');
var tobbi = lista.filter(function (c) { return !c.utmutato; });
for (var i = 0; i < kk.length; i++) kk[i].setAttribute('data-kereso', tobbi[i].kereso);
var hely = elemek[0].closest('section.page_content') || elemek[0].parentNode;
hely.parentNode.insertBefore(uj, hely);
for (var j = 0; j < elemek.length; j++) if (elemek[j].parentNode) elemek[j].parentNode.removeChild(elemek[j]);
if (hely.parentNode && !hely.querySelector('*')) hely.parentNode.removeChild(hely);
vezerles(uj);
gyoker.classList.add('bb-ujblog-kesz');
}
function indul() {
try { epit(); } catch (e) {
gyoker.classList.remove('bb-ujblog', 'bb-ujblog-kesz');
var u = document.getElementById('bbb');
if (u) u.parentNode.removeChild(u);
if (window.console) console.error('[blog] ', e);
}
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
