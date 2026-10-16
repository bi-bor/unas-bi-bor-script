(function () {
var MINDENKI = false;
var ADAT = {"/termekek/kupakok-93":{"k":["03056","03068","03066"],"n":225,"x":1},"/termekek/palinkas-palack-88":{"k":["36633_972","26907","22343_960"],"n":23},"/termekek/bag-in-box-zacskok-292":{"k":["33098","62013","62011"],"n":26},"/termekek/szureti-kellekek-34":{"k":["16207","20454","31927"],"n":172},"/termekek/szureti-anyagok-33":{"k":["30612","20905","30647"],"n":234},"/termekek/boraszati-tarolo-edenyek-tartalyok-259":{"k":["15649_1","20777","33961"],"n":551},"/termekek/boraszat-gepei-337":{"k":["03027","15802"],"n":286},"/termekek/uvegballonok-55":{"k":["25969","29916"],"n":14},"/termekek/kotozogepek-53":{"k":["32131","32139"],"n":13},"/termekek/keziszerszamok-273":{"k":["23061","16261","28390"],"n":72},"/termekek/permetezogepek-es-alkatreszek-16":{"k":["16620","50173","28900"],"n":133},"/termekek/telepites-tamrendszer-10":{"k":["https://cdn.jsdelivr.net/gh/bi-bor/unas-bi-bor-script@263a7c90f0a4686cdebd663d9cca4e504fa93c81/top-kategoriak/oszlop-horganyzott.webp","18532"],"n":144}};
var KULCS = 'bbTopkat';
var allapot = null;
try {
var m = location.search.match(/[?&]topkat=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var gyoker = document.documentElement;
if ((gyoker.lang || 'hu').slice(0, 2) !== 'hu') return;

gyoker.setAttribute('data-bb-topkat', '2026-10-16 08:59:50');
gyoker.classList.add('bb-topkat');
var stilus = document.createElement('style');
stilus.id = 'bb-topkat';
stilus.textContent = "html.bb-topkat #banner_start_1 .banner_start_1__slides\u003E.row{visibility: hidden;animation: bbTkVissza 0s 3s forwards}html.bb-topkat #banner_start_1.bb-tk-kesz .banner_start_1__slides\u003E.row{display: none !important}@keyframes bbTkVissza{to{visibility: visible}}.bb-tk{display: grid;grid-template-columns: repeat(6,minmax(0,1fr));gap: 18px;margin: 0;padding: 0;list-style: none}.bb-tk__k{position: relative;display: flex;flex-direction: column;min-width: 0;overflow: hidden;border: 1px solid #ece6dc;border-radius: 16px;background: #fff;box-shadow: 0 2px 10px rgba(20,18,16,.05);color: #221f1b !important;text-decoration: none !important;transition: border-color .2s,box-shadow .2s,transform .2s}.bb-tk__k:focus-visible{outline: 2px solid #1f8a3b;outline-offset: 2px}.bb-tk__szin{position: relative;display: block;aspect-ratio: 5 / 4;overflow: hidden;isolation: isolate;background: radial-gradient(120% 75% at 50% 100%,#ebe3d6 0,#f3eee6 55%,#f8f5f0 100%)}.bb-tk__szin::after{content: \"\";position: absolute;z-index: 0;left: 12%;right: 12%;bottom: 3%;height: 9%;background: radial-gradient(closest-side,rgba(60,45,30,.16),rgba(60,45,30,0))}.bb-tk__szin img{position: absolute;bottom: 6%;height: auto;max-width: none;object-fit: contain;transition: transform .45s cubic-bezier(.2,.7,.2,1)}.bb-tk__szin .bb-tk__kiv{filter: drop-shadow(0 5px 5px rgba(50,38,25,.14))}.bb-tk__szin img:not(.bb-tk__kiv){mix-blend-mode: multiply}.bb-tk__szin .bb-tk__f1{left: 19%;width: 62%;z-index: 3;bottom: 3%}.bb-tk__szin .bb-tk__f2{left: 0;width: 44%;z-index: 1;bottom: 11%}.bb-tk__szin .bb-tk__f3{right: 0;width: 44%;z-index: 2;bottom: 11%}.bb-tk__szin--2 .bb-tk__f1{left: 4%;width: 60%}.bb-tk__szin--2 .bb-tk__f2{left: auto;right: 2%;width: 46%;bottom: 8%}.bb-tk__szin--kiemelt .bb-tk__f1{left: 14%;width: 72%;bottom: 1%}.bb-tk__szin--kiemelt .bb-tk__f2,.bb-tk__szin--kiemelt .bb-tk__f3{width: 36%;bottom: 14%}.bb-tk__szin .bb-tk__f0{left: 10%;width: 80%;bottom: 4%}.bb-tk__szoveg{display: flex;flex-direction: column;align-items: center;gap: 3px;padding: 10px 10px 14px;text-align: center}.bb-tk__nev{font-size: 15px;font-weight: 700;line-height: 1.25}.bb-tk__db{display: inline-flex;align-items: center;gap: 4px;font-size: 12.5px;color: #6b655b}.bb-tk__db svg{width: 14px;height: 14px;opacity: 0;transform: translateX(-4px);transition: opacity .2s,transform .2s;color: #1f8a3b}@media (hover: hover){.bb-tk__k:hover{border-color: #cfe3c4;box-shadow: 0 10px 24px rgba(20,18,16,.1);transform: translateY(-2px)}.bb-tk__k:hover .bb-tk__f1{transform: translateY(-5px) scale(1.05)}.bb-tk__k:hover .bb-tk__f2{transform: translateX(-7%)}.bb-tk__k:hover .bb-tk__f3,.bb-tk__k:hover .bb-tk__szin--2 .bb-tk__f2{transform: translateX(7%)}.bb-tk__k:hover .bb-tk__f0{transform: scale(1.05)}.bb-tk__k:hover .bb-tk__db{color: #1f8a3b}.bb-tk__k:hover .bb-tk__db svg{opacity: 1;transform: none}}@media (prefers-reduced-motion: reduce){.bb-tk__k,.bb-tk__szin img,.bb-tk__db svg{transition: none !important}}@media (max-width: 1199px){.bb-tk{grid-template-columns: repeat(4,minmax(0,1fr));gap: 14px}}@media (max-width: 767px){.bb-tk{grid-template-columns: repeat(3,minmax(0,1fr));gap: 8px}.bb-tk__k{border-radius: 14px}.bb-tk__szoveg{gap: 2px;padding: 7px 4px 10px}.bb-tk__nev{font-size: 12.5px;hyphens: auto}.bb-tk__db{font-size: 11px}.bb-tk__db svg{display: none}}";
(document.head || gyoker).appendChild(stilus);

var KEP = 'https://www.bi-bor.hu/img/63361/';
var NYIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
var nf = window.Intl ? new Intl.NumberFormat('hu-HU') : { format: String };

function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function szoveg(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
function utvonal(href) { try { return new URL(href, location.href).pathname.replace(/\/+$/, ''); } catch (e) { return ''; } }

function fotok(d, sablonKep) {
if (d && d.k && d.k.length) {
return d.k.slice(0, 3).map(function (sku, i) {
if (/^https:/.test(sku)) {
return '<img class="bb-tk__f' + (i + 1) + ' bb-tk__kiv" src="' + esc(sku) + '" width="400" height="400" alt="" loading="lazy" decoding="async">';
}
var s = encodeURIComponent(sku);
return '<img class="bb-tk__f' + (i + 1) + '" src="' + KEP + s + '/300x300,r/' + s + '.webp"'
+ ' srcset="' + KEP + s + '/300x300,r/' + s + '.webp 1x, ' + KEP + s + '/600x600,r/' + s + '.webp 2x"'
+ ' width="300" height="300" alt="" loading="lazy" decoding="async">';
}).join('');
}
return sablonKep ? '<img class="bb-tk__f0" src="' + esc(sablonKep) + '" alt="" loading="lazy" decoding="async">' : '';
}

function epit() {
var blokk = document.getElementById('banner_start_1');
if (!blokk || blokk.classList.contains('bb-tk-kesz')) return;
var hely = blokk.querySelector('.banner_start_1__slides');
if (!hely) return;
var html = '';
blokk.querySelectorAll('.banner_start_1__slide').forEach(function (sl) {
var a = sl.querySelector('.banner_start_1__title a') || sl.querySelector('a[href]');
var nev = szoveg(sl.querySelector('.banner_start_1__title'));
if (!a || !nev) return;
var d = ADAT[utvonal(a.href)];
var img = sl.querySelector('img');
var db = d && d.n ? nf.format(d.n) + ' termék' : '';
html += '<a class="bb-tk__k" role="listitem" href="' + esc(a.href) + '" aria-label="' + esc(nev + (db ? ', ' + db : '')) + '">'
+ '<span class="bb-tk__szin' + (d && d.k && d.k.length === 2 ? ' bb-tk__szin--2' : '') + (d && d.x ? ' bb-tk__szin--kiemelt' : '') + '">' + fotok(d, img && (img.currentSrc || img.getAttribute('src'))) + '</span>'
+ '<span class="bb-tk__szoveg"><span class="bb-tk__nev">' + esc(nev) + '</span>'
+ (db ? '<span class="bb-tk__db">' + db + NYIL + '</span>' : '')
+ '</span></a>';
});
if (!html) return;
var racs = document.createElement('div');
racs.className = 'bb-tk';
racs.setAttribute('role', 'list');
racs.innerHTML = html;
hely.appendChild(racs);
blokk.classList.add('bb-tk-kesz');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', epit);
else epit();
})();
