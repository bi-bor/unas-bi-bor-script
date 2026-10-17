(function () {
var MINDENKI = true;
var KULCS = 'bbUjVelemeny';
var allapot = null;
try {
var m = location.search.match(/[?&]ujvelemeny=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { allapot = null; }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
var gyoker = document.documentElement;
if ((gyoker.lang || 'hu').slice(0, 2) !== 'hu') return;
gyoker.setAttribute('data-bb-velemeny', '2026-10-17 21:18:48');
var stilus = document.createElement('style');
stilus.id = 'bb-velemeny';
stilus.textContent = ".bbv-tarto{background: transparent !important;padding: 0 !important}.trustindex-section.bbv-kesz\u003Eh2,.trustindex-section.bbv-kesz\u003E.trustindex-widget{display: none !important}.ti-widget[data-bbv]{display: none !important}.bbv--termek{margin: 8px 0 24px}.bbv{display: grid;grid-template-columns: 320px minmax(0,1fr);gap: 24px;align-items: stretch;color: #221f1b;font-family: inherit;text-align: left}.bbv *,.bbv *::before,.bbv *::after{box-sizing: border-box}.bbv p{margin: 0 !important;padding: 0 !important}.bbv-fej{position: relative;overflow: hidden;display: flex;flex-direction: column;gap: 14px;padding: 26px 24px 24px;border-radius: 22px;color: #f6f2ea;background: #1f5f12;background-image: radial-gradient(circle at 110% -10%,rgba(255,255,255,.12),rgba(255,255,255,0) 55%),linear-gradient(160deg,#2a7a17 0%,#1d5a10 100%);box-shadow: 0 10px 30px rgba(34,31,27,.18)}.bbv-fej::after{content: '';position: absolute;right: -40px;top: -40px;width: 170px;height: 170px;border-radius: 50%;border: 1px solid rgba(255,255,255,.08);pointer-events: none}.bbv-cimke{display: inline-flex;align-items: center;gap: 10px;font-size: 14px;font-weight: 600;letter-spacing: .02em;color: #d9d2c5}.bbv-cimke .bbv-g{width: 22px;height: 22px;padding: 0}.bbv-glog{display: inline-flex;align-items: center;justify-content: center;width: 34px;height: 34px;border-radius: 50%;background: #fff}.bbv-glog .bbv-g{width: 20px;height: 20px}.bbv-cim{margin: 4px 0 0 !important;padding: 0 !important;font-size: 46px !important;line-height: 1 !important;font-weight: 800 !important;letter-spacing: -.01em;color: #fff !important;text-align: left !important}.bbv-atlag{display: inline-flex;align-items: baseline;margin-right: 14px;color: #ffd45c}.bbv-atlag__max{margin-left: 2px;font-size: .42em;font-weight: 600;color: rgba(255,255,255,.7)}.bbv-cim small{display: block;margin-top: 6px;font-size: 14px;font-weight: 500;letter-spacing: 0;color: #b9b2a6}.bbv-fej .bbv-csillagok{gap: 3px}.bbv-fej .bbv-cs{width: 28px;height: 28px;filter: drop-shadow(0 2px 4px rgba(0,0,0,.35))}.bbv-db{font-size: 15px;color: #d9d2c5}.bbv-db strong{font-size: 22px;font-weight: 700;color: #fff;margin-right: 6px}.bbv-hiteles{display: inline-flex;align-items: center;gap: 8px;align-self: flex-start;padding: 7px 13px 7px 9px;border-radius: 999px;font-size: 13px;font-weight: 600;color: #e9f5e2;background: rgba(255,255,255,.07);border: 1px solid rgba(255,255,255,.14)}.bbv-pipa{width: 18px;height: 18px;flex: 0 0 auto}.bbv-mind{display: inline-flex !important;align-items: center;justify-content: center;gap: 8px;margin-top: auto;padding: 12px 16px;border-radius: 999px;background: #fff;white-space: nowrap;color: #1f5f12 !important;font-size: 14px;font-weight: 700;text-decoration: none !important;transition: background .2s,transform .2s}.bbv-iras{display: block;margin-top: 12px;text-align: center;font-size: 14px;font-weight: 600;color: #e9f5e2 !important;text-decoration: underline;text-underline-offset: 3px}.bbv-mind:hover{background: #f1f7ec;color: #1f5f12 !important}.bbv-mind svg{width: 16px;height: 16px;fill: none;stroke: currentColor;stroke-width: 2.4;stroke-linecap: round;stroke-linejoin: round}.bbv-csillagok{display: inline-flex;gap: 1px}.bbv-cs{width: 17px;height: 17px;fill: #f2b400}.bbv-cs--ures{fill: #ddd6cb}.bbv-sor{position: relative;min-width: 0;display: flex;flex-direction: column}.bbv-lista{display: flex;gap: 16px;flex: 1 1 auto;margin: 0;padding: 6px 2px 10px;list-style: none;overflow-x: auto;scroll-snap-type: x mandatory;scrollbar-width: none;-webkit-overflow-scrolling: touch}.bbv-lista::-webkit-scrollbar{display: none}.bbv-k{position: relative;flex: 0 0 calc((100% - 32px) / 3);min-width: 0;scroll-snap-align: start;display: flex;flex-direction: column;gap: 10px;padding: 18px 18px 16px !important;margin: 0 !important;border: 1px solid #ece6dc;border-radius: 18px;background: #fff;box-shadow: 0 2px 10px rgba(20,18,16,.05);transition: transform .25s,box-shadow .25s,border-color .25s}@media (hover: hover){.bbv-k:hover{transform: translateY(-3px);border-color: #bfdcb1;box-shadow: 0 10px 24px rgba(20,18,16,.09)}}.bbv-k__teteje{display: flex;align-items: flex-start;justify-content: space-between;gap: 8px}.bbv-idez{width: 30px;height: 30px;fill: #2a8511;opacity: .35;flex: 0 0 auto}.bbv-k__google{display: inline-flex;align-items: center;gap: 5px;padding: 4px 9px 4px 6px;border-radius: 999px;background: #f6f2ea;border: 1px solid #ece6dc;font-size: 12px;font-weight: 600;color: #5f5a52;white-space: nowrap}.bbv-k__google .bbv-g{width: 14px;height: 14px}.bbv-k__google .bbv-pipa{width: 14px;height: 14px}.bbv-k__szoveg{font-size: 15.5px;line-height: 1.55;color: #2d2a25;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden}.bbv-k__szoveg--nyitva{display: block;-webkit-line-clamp: unset}.bbv-k--rovid .bbv-k__szoveg{font-size: 20px;line-height: 1.35;font-weight: 600;color: #221f1b}.bbv-k--rovid .bbv-k__szoveg,.bbv-k--kozep .bbv-k__szoveg{margin: auto 0 !important}.bbv-k--kozep .bbv-k__szoveg{font-size: 17px;line-height: 1.45;color: #221f1b}.bbv-k__tovabb{align-self: flex-start;margin-top: -4px;padding: 0;border: 0;background: none;font-size: 14px;font-weight: 600;color: #2a8511;cursor: pointer;text-decoration: underline;text-underline-offset: 3px}.bbv-k__lab{display: flex;align-items: center;gap: 10px;margin-top: auto;padding-top: 12px;border-top: 1px solid #f1ece3}.bbv-arc{flex: 0 0 auto;width: 38px;height: 38px;border-radius: 50%;object-fit: cover}.bbv-arc--betu{display: inline-flex;align-items: center;justify-content: center;background: #e3efda;color: #2a6b14;font-weight: 700;font-size: 14px}.bbv-k__ki{display: flex;flex-direction: column;min-width: 0;flex: 1 1 auto}.bbv-k__ki strong{font-size: 14.5px;font-weight: 700;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color: #221f1b}.bbv-k__ki span{font-size: 12.5px;color: #8a847a}.bbv-g{flex: 0 0 auto;width: 18px;height: 18px}.bbv-nyil{position: absolute;top: 50%;z-index: 2;width: 40px;height: 40px;margin-top: -26px;padding: 0;border: 1px solid #ece6dc;border-radius: 50%;background: #fff;color: #221f1b;box-shadow: 0 2px 10px rgba(20,18,16,.12);cursor: pointer;display: flex;align-items: center;justify-content: center;transition: opacity .2s,border-color .2s,color .2s}.bbv-nyil svg{width: 18px;height: 18px;fill: none;stroke: currentColor;stroke-width: 2.2;stroke-linecap: round;stroke-linejoin: round}.bbv-nyil:hover{border-color: #2a8511;color: #2a8511}.bbv-nyil--bal{left: -18px}.bbv-nyil--jobb{right: -18px}.bbv--elejen .bbv-nyil--bal,.bbv--vegen .bbv-nyil--jobb{opacity: 0;pointer-events: none}@media (hover: none){.bbv-nyil{display: none}}.bbv-pottyok{display: flex;justify-content: center;gap: 6px;margin-top: 4px}.bbv-potty{width: 7px;height: 7px;padding: 0;border: 0;border-radius: 50%;background: #d9d2c5;cursor: pointer;transition: background .2s,width .2s}.bbv-potty--aktiv{width: 20px;border-radius: 4px;background: #2a8511}.bbv-nyil:focus-visible,.bbv-mind:focus-visible,.bbv-k__tovabb:focus-visible,.bbv-potty:focus-visible{outline: 2px solid #2a8511;outline-offset: 3px}.bbv-mind:focus-visible{outline-color: #fff}@media (max-width: 1199.98px){.bbv{grid-template-columns: 280px minmax(0,1fr);gap: 18px}.bbv-k{flex-basis: calc((100% - 16px) / 2)}.bbv-cim{font-size: 40px !important}}@media (max-width: 767.98px){.bbv{display: block}.bbv-fej{padding: 22px 20px 20px;border-radius: 18px;gap: 10px;margin-bottom: 14px}.bbv-fej::after{width: 120px;height: 120px;right: -30px;top: -30px}.bbv-cim{font-size: 38px !important}.bbv-fej .bbv-cs{width: 24px;height: 24px}.bbv-fej__sor{display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;gap: 10px}.bbv-mind{margin-top: 6px;width: 100%}.bbv-lista{gap: 12px;margin: 0 -10px;padding: 6px 10px 10px;scroll-padding-left: 10px}.bbv-k{flex-basis: 84%}.bbv-pottyok{margin-top: 2px}}";
(document.head || gyoker).appendChild(stilus);

var HONAP = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function csillagok(n) {
var s = '';
for (var i = 1; i <= 5; i++) s += '<svg class="bbv-cs' + (i <= n ? '' : ' bbv-cs--ures') + '" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>';
return '<span class="bbv-csillagok" role="img" aria-label="' + n + ' csillag az 5-ből">' + s + '</span>';
}
function datum(mp, szoveg) {
var d = mp ? new Date(mp * 1000) : null;
if (!d || isNaN(d)) return szoveg || '';
return d.getFullYear() + '. ' + HONAP[d.getMonth()] + ' ' + d.getDate() + '.';
}
var GOOGLE = '<svg class="bbv-g" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9c-.3 1.4-1 2.5-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.1z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9C3.9 20.6 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.8 14.1c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1V7H2.1C1.4 8.5 1 10.2 1 12s.4 3.5 1.1 5l3.7-2.9z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2C17.5 2.1 15 1 12 1 7.7 1 3.9 3.4 2.1 7l3.7 2.9c.9-2.6 3.3-4.5 6.2-4.5z"/></svg>';
var PIPA = '<svg class="bbv-pipa" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#2a8511"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var IDEZ = '<svg class="bbv-idez" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 5C6.9 5.6 4.5 8.6 4.5 12.6V19h7v-7H8c0-2.3 1.2-3.9 3.3-4.6L10.5 5zm9 0c-3.6.6-6 3.6-6 7.6V19h7v-7h-3.5c0-2.3 1.2-3.9 3.3-4.6L19.5 5z"/></svg>';
function nyil(jobbra) {
return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + (jobbra ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7') + '"/></svg>';
}

var ATLAG_FORRAS = 'https://cdn.trustindex.io/widgets/fd/fdb92be5095b602d8956ed3e9f6/content.html';
function atlagBeir(doboz, ertek) {
var cim = doboz.querySelector('.bbv-cim');
if (!cim || !(ertek >= 4 && ertek <= 5) || cim.querySelector('.bbv-atlag')) return;
var span = document.createElement('span');
span.className = 'bbv-atlag';
span.setAttribute('aria-label', String(ertek).replace('.', ',') + ' az 5-ből');
span.innerHTML = String(ertek.toFixed(1)).replace('.', ',') + '<span class="bbv-atlag__max">/5</span>';
cim.insertBefore(span, cim.firstChild);
}
function atlag(doboz, forras) {
var kesz = forras.querySelector('.ti-header-rating');
var helyben = kesz ? parseFloat(kesz.textContent.replace(',', '.')) : 0;
if (helyben) { atlagBeir(doboz, helyben); return; }
if (!window.fetch) return;
fetch(ATLAG_FORRAS).then(function (v) { return v.ok ? v.text() : ''; }).then(function (html) {
var m = /class="ti-rating"[^>]*>\s*([0-9]+[.,][0-9])\s*</.exec(html || '');
atlagBeir(doboz, m ? parseFloat(m[1].replace(',', '.')) : 0);
}).catch(function () { /* szám nélkül marad */ });
}

function epit(szekcio, beilleszt) {
var tetelek = szekcio.querySelectorAll('.ti-review-item');
if (!tetelek.length) return null;
var kartyak = '', link = '', db = 0;
Array.prototype.forEach.call(tetelek, function (t) {
var nev = (t.querySelector('.ti-name') || {}).textContent || '';
var szoveg = (t.querySelector('.ti-review-content') || {}).textContent || '';
var kep = t.querySelector('.ti-profile-img img');
var kepSrc = kep ? kep.getAttribute('src') : '';
var pont = Math.round(parseFloat(t.getAttribute('data-rating')) || 5);
if (!link) link = t.getAttribute('data-platform-page-url') || '';
nev = nev.trim(); szoveg = szoveg.replace(/\s+/g, ' ').trim();
if (!nev) return;
var monogram = nev.split(/\s+/).map(function (r) { return r.charAt(0); }).join('').slice(0, 2).toUpperCase();
var arc = kepSrc && !/noprofile|default-avatar/.test(kepSrc)
? '<img class="bbv-arc" src="' + esc(kepSrc) + '" alt="" loading="lazy" referrerpolicy="no-referrer" data-betu="' + esc(monogram) + '">'
: '<span class="bbv-arc bbv-arc--betu" aria-hidden="true">' + esc(monogram) + '</span>';
db++;
var hossz = szoveg.length < 60 ? ' bbv-k--rovid' : szoveg.length < 110 ? ' bbv-k--kozep' : '';
kartyak += '<article class="bbv-k' + hossz + '" aria-label="' + esc(nev) + ' véleménye">' +
'<div class="bbv-k__teteje">' + IDEZ +
'<span class="bbv-k__google" title="A Trustindex hitelesíti, hogy a vélemény eredeti forrása a Google">' + GOOGLE + 'Google' + PIPA + '</span></div>' +
csillagok(pont) +
(szoveg ? '<p class="bbv-k__szoveg">' + esc(szoveg) + '</p><button type="button" class="bbv-k__tovabb" hidden>Tovább</button>' : '') +
'<div class="bbv-k__lab">' + arc +
'<div class="bbv-k__ki"><strong>' + esc(nev) + '</strong><span>' + esc(datum(+t.getAttribute('data-time'), (t.querySelector('.ti-date') || {}).textContent)) + '</span></div>' +
'</div></article>';
});
if (!kartyak) return false;
var szamEl = szekcio.querySelector('.ti-header-rating-reviews, .ti-footer .ti-rating-text a, .ti-rating-text a');
var szam = szamEl ? (szamEl.textContent.match(/[\d\s.]+/) || [''])[0].replace(/\D/g, '') : '';
var minosites = ((szekcio.querySelector('.ti-rating-large, .ti-header-rating-text .ti-rating-text') || {}).textContent || '').trim();
minosites = minosites ? minosites.charAt(0) + minosites.slice(1).toLowerCase() : '';
var irasLink = '';
Array.prototype.some.call(szekcio.querySelectorAll('a[href]'), function (a) {
if (/rt[eé]kel[eé]s [ií]r[aá]sa|write a review/i.test(a.textContent)) { irasLink = a.href; return true; }
return false;
});
var pottyok = '';
for (var i = 0; i < db; i++) pottyok += '<button type="button" class="bbv-potty' + (i ? '' : ' bbv-potty--aktiv') + '" aria-label="' + (i + 1) + '. vélemény"></button>';
var doboz = document.createElement('div');
doboz.className = 'bbv';
doboz.innerHTML =
'<div class="bbv-fej">' +
'<p class="bbv-cimke"><span class="bbv-glog">' + GOOGLE + '</span>Google-vélemények</p>' +
'<h2 class="bbv-cim">' + (minosites ? esc(minosites) : 'Vásárlóink szerint') + '<small>vásárlóink értékelése szerint</small></h2>' +
'<div class="bbv-fej__sor">' + csillagok(5) +
(szam ? '<p class="bbv-db"><strong>' + szam.replace(/\B(?=(\d{3})+$)/g, '\u00a0') + '</strong>vélemény alapján</p>' : '') + '</div>' +
'<p class="bbv-hiteles">' + PIPA + 'Hitelesített Google-vélemények</p>' +
(link ? '<a class="bbv-mind" href="' + esc(link) + '" target="_blank" rel="noopener">Összes vélemény a Google-on' + nyil(true) + '</a>' : '') +
(irasLink ? '<a class="bbv-iras" href="' + esc(irasLink) + '" target="_blank" rel="noopener">Értékelés írása</a>' : '') +
'</div>' +
'<div class="bbv-sor"><button type="button" class="bbv-nyil bbv-nyil--bal" aria-label="Előző vélemények">' + nyil(false) + '</button>' +
'<div class="bbv-lista" role="list">' + kartyak + '</div>' +
'<button type="button" class="bbv-nyil bbv-nyil--jobb" aria-label="Következő vélemények">' + nyil(true) + '</button>' +
'<div class="bbv-pottyok">' + pottyok + '</div></div>';
beilleszt(doboz);
atlag(doboz, szekcio);

doboz.querySelectorAll('img.bbv-arc').forEach(function (k) {
function csere() {
var s = document.createElement('span');
s.className = 'bbv-arc bbv-arc--betu'; s.setAttribute('aria-hidden', 'true');
s.textContent = k.getAttribute('data-betu');
if (k.parentNode) k.parentNode.replaceChild(s, k);
}
if (k.complete && !k.naturalWidth) csere(); else k.addEventListener('error', csere);
});
doboz.querySelectorAll('.bbv-k__szoveg').forEach(function (p) {
if (p.scrollHeight > p.clientHeight + 2) {
var g = p.nextElementSibling;
g.hidden = false;
g.addEventListener('click', function () {
var nyitva = p.classList.toggle('bbv-k__szoveg--nyitva');
g.textContent = nyitva ? 'Kevesebb' : 'Tovább';
});
}
});

var lista = doboz.querySelector('.bbv-lista');
var kartyaElemek = lista.querySelectorAll('.bbv-k');
var pottyElemek = doboz.querySelectorAll('.bbv-potty');
function lepes() {
var k = kartyaElemek[0];
return k ? k.offsetWidth + (parseFloat(getComputedStyle(lista).columnGap) || 16) : 300;
}
function ugras(index, sima) {
lista.scrollTo({ left: Math.max(0, index) * lepes(), behavior: sima === false ? 'auto' : 'smooth' });
}
function aktualis() { return Math.round(lista.scrollLeft / lepes()); }
function lapoz(irany) {
var lathato = Math.max(1, Math.round(lista.clientWidth / lepes()));
ugras(aktualis() + irany * lathato);
}
doboz.querySelector('.bbv-nyil--bal').addEventListener('click', function () { megall(); lapoz(-1); });
doboz.querySelector('.bbv-nyil--jobb').addEventListener('click', function () { megall(); lapoz(1); });
pottyElemek.forEach(function (p, i) { p.addEventListener('click', function () { megall(); ugras(i); }); });
function allapotFrissit() {
doboz.classList.toggle('bbv--elejen', lista.scrollLeft < 8);
doboz.classList.toggle('bbv--vegen', lista.scrollLeft + lista.clientWidth > lista.scrollWidth - 8);
var a = aktualis();
pottyElemek.forEach(function (p, i) { p.classList.toggle('bbv-potty--aktiv', i === a); });
}
lista.addEventListener('scroll', allapotFrissit, { passive: true });
allapotFrissit();

var csokkentett = false;
try { csokkentett = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
var szunet = false, varakoztat = false, lathato = true, idozito = null;
function megall() {
szunet = true;
if (idozito) { clearInterval(idozito); idozito = null; }
}
function lep() {
if (szunet || varakoztat || !lathato || document.hidden) return;
if (lista.scrollLeft + lista.clientWidth > lista.scrollWidth - 8) ugras(0);
else ugras(aktualis() + 1);
}
if (!csokkentett && kartyaElemek.length > 1) {
idozito = setInterval(lep, 5000);
doboz.addEventListener('mouseenter', function () { varakoztat = true; });
doboz.addEventListener('mouseleave', function () { varakoztat = false; });
doboz.addEventListener('focusin', function () { varakoztat = true; });
doboz.addEventListener('focusout', function () { varakoztat = false; });
lista.addEventListener('touchstart', megall, { passive: true });
lista.addEventListener('pointerdown', megall, { passive: true });
lista.addEventListener('wheel', megall, { passive: true });
if ('IntersectionObserver' in window) {
new IntersectionObserver(function (b) { lathato = b[0].isIntersecting; }, { threshold: .5 }).observe(lista);
}
}
return doboz;
}

function nyitooldal() {
var szekcio = document.querySelector('.trustindex-section');
if (!szekcio || szekcio.querySelector('.bbv')) return true;
return !!epit(szekcio, function (doboz) {
szekcio.appendChild(doboz);
var tarto = szekcio.closest('.custom-content__container-inner');
if (tarto) tarto.classList.add('bbv-tarto');
szekcio.classList.add('bbv-kesz');
});
}
var parok = [];
function egyebek() {
document.querySelectorAll('.ti-widget').forEach(function (w) {
if (w.getAttribute('data-bbv') || w.closest('.trustindex-section') || !w.querySelector('.ti-review-item')) return;
var doboz = epit(w, function (d) { w.parentNode.insertBefore(d, w); });
if (!doboz) return;
w.setAttribute('data-bbv', '1');
doboz.classList.add('bbv--termek');
parok.push([doboz, w]);
});
parok.forEach(function (p) {
if (p[1].parentNode && p[1].previousElementSibling !== p[0]) p[1].parentNode.insertBefore(p[0], p[1]);
});
}

function indul() {
var kesz = nyitooldal();
egyebek();
var utemezve = false;
var figyelo = new MutationObserver(function () {
if (utemezve) return;
utemezve = true;
setTimeout(function () { utemezve = false; if (!kesz) kesz = nyitooldal(); egyebek(); }, 150);
});
figyelo.observe(document.body, { childList: true, subtree: true });
setTimeout(function () { figyelo.disconnect(); }, 60000);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
