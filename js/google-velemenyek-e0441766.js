(function () {
var MINDENKI = false;
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
gyoker.setAttribute('data-bb-velemeny', '2026-10-17 20:17:32');
var stilus = document.createElement('style');
stilus.id = 'bb-velemeny';
stilus.textContent = ".bbv-tarto{background: transparent !important;padding: 0 !important}.trustindex-section.bbv-kesz\u003Eh2,.trustindex-section.bbv-kesz\u003E.trustindex-widget{display: none !important}.bbv{color: #221f1b;font-family: inherit}.bbv-fej{display: flex;flex-wrap: wrap;align-items: baseline;gap: 6px 18px;margin: 0 0 16px}.bbv-cim{margin: 0 !important;font-size: 26px !important;line-height: 1.2;font-weight: 700;text-align: left !important}.bbv-osszeg{display: flex;align-items: center;flex-wrap: wrap;gap: 4px 8px;margin: 0;font-size: 15px;color: #5f5a52}.bbv-osszeg strong{color: #221f1b;font-weight: 600}.bbv-mind{margin-left: auto;font-size: 14px;font-weight: 600;color: #2a8511 !important;text-decoration: underline;text-underline-offset: 3px}.bbv-csillagok{display: inline-flex;gap: 1px}.bbv-cs{width: 17px;height: 17px;fill: #f2b400}.bbv-cs--ures{fill: #ddd6cb}.bbv-sor{position: relative}.bbv-lista{display: flex;gap: 16px;margin: 0;padding: 4px 2px 12px;list-style: none;overflow-x: auto;scroll-snap-type: x mandatory;scrollbar-width: none;-webkit-overflow-scrolling: touch}.bbv-lista::-webkit-scrollbar{display: none}.bbv-k{flex: 0 0 calc((100% - 48px) / 4);min-width: 0;scroll-snap-align: start;display: flex;flex-direction: column;gap: 10px;padding: 18px 18px 16px;border: 1px solid #ece6dc;border-radius: 16px;background: #fff;box-shadow: 0 2px 10px rgba(20,18,16,.05)}.bbv-k__fej{display: flex;align-items: center;gap: 10px}.bbv-arc{flex: 0 0 auto;width: 40px;height: 40px;border-radius: 50%;object-fit: cover}.bbv-arc--betu{display: inline-flex;align-items: center;justify-content: center;background: #e3efda;color: #2a6b14;font-weight: 700;font-size: 15px}.bbv-k__ki{display: flex;flex-direction: column;min-width: 0;flex: 1 1 auto}.bbv-k__ki strong{font-size: 15px;font-weight: 600;white-space: nowrap;overflow: hidden;text-overflow: ellipsis}.bbv-k__ki span{font-size: 13px;color: #8a847a}.bbv-g{flex: 0 0 auto;width: 18px;height: 18px}.bbv-k__szoveg{margin: 0;font-size: 15px;line-height: 1.5;color: #3a362f;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden}.bbv-k__szoveg--nyitva{display: block;-webkit-line-clamp: unset}.bbv-k__tovabb{align-self: flex-start;margin-top: -4px;padding: 0;border: 0;background: none;font-size: 14px;font-weight: 600;color: #2a8511;cursor: pointer}.bbv-nyil{position: absolute;top: 50%;z-index: 2;width: 40px;height: 40px;margin-top: -26px;border: 1px solid #ece6dc;border-radius: 50%;background: #fff;color: #221f1b;box-shadow: 0 2px 10px rgba(20,18,16,.1);font-size: 24px;line-height: 1;cursor: pointer;display: flex;align-items: center;justify-content: center;transition: opacity .2s}.bbv-nyil:hover{border-color: #2a8511;color: #2a8511}.bbv-nyil--bal{left: -18px}.bbv-nyil--jobb{right: -18px}.bbv--elejen .bbv-nyil--bal,.bbv--vegen .bbv-nyil--jobb{opacity: 0;pointer-events: none}@media (hover: none){.bbv-nyil{display: none}}@media (max-width: 1199.98px){.bbv-k{flex-basis: calc((100% - 32px) / 3)}}@media (max-width: 767.98px){.bbv-fej{gap: 4px 12px}.bbv-cim{font-size: 22px !important}.bbv-mind{margin-left: 0;flex-basis: 100%}.bbv-lista{gap: 12px;margin: 0 -10px;padding: 4px 10px 12px;scroll-padding-left: 10px}.bbv-k{flex-basis: 82%}}";
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

function epit(szekcio) {
var tetelek = szekcio.querySelectorAll('.ti-review-item');
if (!tetelek.length || szekcio.querySelector('.bbv')) return !!szekcio.querySelector('.bbv');
var kartyak = '', link = '';
Array.prototype.forEach.call(tetelek, function (t) {
var nev = (t.querySelector('.ti-name') || {}).textContent || '';
var szoveg = (t.querySelector('.ti-review-content') || {}).textContent || '';
var kep = t.querySelector('.ti-profile-img img');
var kepSrc = kep ? kep.getAttribute('src') : '';
var pont = Math.round(parseFloat(t.getAttribute('data-rating')) || 5);
if (!link) link = t.getAttribute('data-platform-page-url') || '';
nev = nev.trim(); szoveg = szoveg.trim();
if (!nev) return;
var monogram = nev.split(/\s+/).map(function (r) { return r.charAt(0); }).join('').slice(0, 2).toUpperCase();
var arc = kepSrc && !/noprofile|default-avatar/.test(kepSrc)
? '<img class="bbv-arc" src="' + esc(kepSrc) + '" alt="" loading="lazy" referrerpolicy="no-referrer" data-betu="' + esc(monogram) + '">'
: '<span class="bbv-arc bbv-arc--betu" aria-hidden="true">' + esc(monogram) + '</span>';
kartyak += '<li class="bbv-k"><div class="bbv-k__fej">' + arc +
'<div class="bbv-k__ki"><strong>' + esc(nev) + '</strong><span>' + esc(datum(+t.getAttribute('data-time'), (t.querySelector('.ti-date') || {}).textContent)) + '</span></div>' +
GOOGLE + '</div>' + csillagok(pont) +
(szoveg ? '<p class="bbv-k__szoveg">' + esc(szoveg) + '</p><button type="button" class="bbv-k__tovabb" hidden>Tovább</button>' : '') +
'</li>';
});
if (!kartyak) return false;
var szamEl = szekcio.querySelector('.ti-footer .ti-rating-text a, .ti-rating-text a');
var szam = szamEl ? (szamEl.textContent.match(/[\d\s.]+/) || [''])[0].replace(/\D/g, '') : '';
var minosites = ((szekcio.querySelector('.ti-rating-large') || {}).textContent || '').trim();
minosites = minosites ? minosites.charAt(0) + minosites.slice(1).toLowerCase() : '';
var doboz = document.createElement('div');
doboz.className = 'bbv';
doboz.innerHTML =
'<div class="bbv-fej"><h2 class="bbv-cim">Google-vélemények</h2>' +
'<p class="bbv-osszeg">' + csillagok(5) + (minosites ? '<strong>' + esc(minosites) + '</strong>' : '') +
(szam ? '<span>' + Number(szam).toLocaleString('hu-HU') + ' vélemény alapján</span>' : '') + '</p>' +
(link ? '<a class="bbv-mind" href="' + esc(link) + '" target="_blank" rel="noopener">Összes vélemény a Google-on</a>' : '') +
'</div>' +
'<div class="bbv-sor"><button type="button" class="bbv-nyil bbv-nyil--bal" aria-label="Előző vélemények">‹</button>' +
'<ul class="bbv-lista">' + kartyak + '</ul>' +
'<button type="button" class="bbv-nyil bbv-nyil--jobb" aria-label="Következő vélemények">›</button></div>';
szekcio.appendChild(doboz);
var tarto = szekcio.closest('.custom-content__container-inner');
if (tarto) tarto.classList.add('bbv-tarto');
szekcio.classList.add('bbv-kesz');

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
function lapoz(irany) {
var k = lista.querySelector('.bbv-k');
lista.scrollBy({ left: irany * (k ? k.offsetWidth + 16 : 300) * 2, behavior: 'smooth' });
}
doboz.querySelector('.bbv-nyil--bal').addEventListener('click', function () { lapoz(-1); });
doboz.querySelector('.bbv-nyil--jobb').addEventListener('click', function () { lapoz(1); });
function nyilak() {
doboz.classList.toggle('bbv--elejen', lista.scrollLeft < 8);
doboz.classList.toggle('bbv--vegen', lista.scrollLeft + lista.clientWidth > lista.scrollWidth - 8);
}
lista.addEventListener('scroll', nyilak, { passive: true });
nyilak();
return true;
}

function indul() {
var szekcio = document.querySelector('.trustindex-section');
if (!szekcio) return;
if (epit(szekcio)) return;
var figyelo = new MutationObserver(function () { if (epit(szekcio)) figyelo.disconnect(); });
figyelo.observe(szekcio, { childList: true, subtree: true });
setTimeout(function () { figyelo.disconnect(); }, 30000);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
