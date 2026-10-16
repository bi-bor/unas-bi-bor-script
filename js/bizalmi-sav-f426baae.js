(function () {
var MINDENKI = false;
var KULCS = 'bbUjBizalom';
var allapot = null;
try {
var m = location.search.match(/[?&]ujbizalom=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { allapot = null; }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
var gyoker = document.documentElement;
if ((gyoker.lang || 'hu').slice(0, 2) !== 'hu') return;
gyoker.setAttribute('data-bb-bizalom', '2026-10-16 12:11:05');
var stilus = document.createElement('style');
stilus.id = 'bb-bizalom';
stilus.textContent = ".bb-biz-ikon .bbz-svg{width: 40px;height: 40px;display: block}.bbz-forras-ikon{display: flex;align-items: center;justify-content: center}.bbz-forras-ikon .bbz-svg{width: 44px;height: 44px}a.bb-biz-kartya{color: inherit;text-decoration: none;transition: box-shadow .15s,transform .15s,border-color .15s}a.bb-biz-kartya:hover{transform: translateY(-1px);border-color: rgba(42,133,17,.35)}a.bb-biz-kartya:hover b{color: #2a8511}a.bb-biz-kartya:focus-visible{outline: 2px solid #2a8511;outline-offset: 2px}";
(document.head || gyoker).appendChild(stilus);

function svg(d) {
return '<svg class="bbz-svg" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#2a8511" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
}
var ELEMEK = [
{ minta: /^(25 év|1999)/i, cim: '1999 óta', szoveg: 'Szaktanácsadó kollégáinkkal a borászok mellett', href: '/rolunk',
ikon: '<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 13.6c.5-.1 1-.1 1.5-.1 2.8 0 5 2.2 5 5"/>' },
{ minta: /(elállás|szakértői tanács)/i, cim: 'Ingyenes szakértői tanács', szoveg: 'Kérdezzen bátran — szakértőnk válaszol', href: '/muszaki-kerdes-egy-termekrol',
ikon: '<path d="M3 4h13v10H8l-5 4z"/><path d="M9 17h7l5 4V9h-2"/><path d="M7.6 7.6a1.9 1.9 0 1 1 2.7 1.7c-.5.2-.8.6-.8 1.1v.3M9.5 12.4h.01"/>' },
{ minta: /kézbesítés/i, cim: 'Gyors és gondos kézbesítés', szoveg: 'Rendelése biztonságosan és pontosan érkezik', href: '/shop_contact.php?tab=shipping',
ikon: '<path d="M2 6h11v10H2z"/><path d="M13 9h4l3 3v4h-7z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>' },
{ minta: /^100\s*% magyar/i, cim: '100% magyar', szoveg: 'Családi tulajdonú cég Villányból', href: '/rolunk',
ikon: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="m9.5 11 1.8 1.8 3.4-3.6"/>' }
];
function keres(szoveg) {
for (var i = 0; i < ELEMEK.length; i++) if (ELEMEK[i].minta.test(szoveg)) return ELEMEK[i];
return null;
}

var FORRASOK = [
{ elem: '#banner_start_small .carousel-cell', cim: '.start_banners__element-title', szoveg: '.start_banners__element-text', ikon: '.start_banners__element-img-wrap' },
{ elem: '#product_usp_element .product_usp-item', cim: '.product_usp-content-title', szoveg: '.product_usp-content-text', ikon: '.product_usp-icon, .product_usp-img, picture' }
];
function forrasAtir() {
FORRASOK.forEach(function (f) {
document.querySelectorAll(f.elem).forEach(function (e) {
if (e.getAttribute('data-bbz')) return;
var c = e.querySelector(f.cim), t = e.querySelector(f.szoveg);
var x = c && keres(c.textContent.trim());
if (!x) return;
c.textContent = x.cim;
if (t) t.textContent = x.szoveg;
var ik = e.querySelector(f.ikon);
if (ik) { ik.innerHTML = svg(x.ikon); ik.classList.add('bbz-forras-ikon'); }
e.setAttribute('data-bbz', '1');
});
});
}
function kartyaAtir() {
document.querySelectorAll('.bb-biz-kartya').forEach(function (k) {
if (k.getAttribute('data-bbz')) return;
var b = k.querySelector('b');
var x = b && keres(b.textContent.trim());
if (!x) return;
var a = k;
if (k.tagName !== 'A') {
a = document.createElement('a');
a.className = k.className;
a.setAttribute('role', 'listitem');
a.innerHTML = k.innerHTML;
k.parentNode.replaceChild(a, k);
}
a.href = x.href;
a.querySelector('b').textContent = x.cim;
var sz = a.querySelector('.bb-biz-szoveg span');
if (sz) sz.textContent = x.szoveg;
var ik = a.querySelector('.bb-biz-ikon');
if (ik) ik.innerHTML = svg(x.ikon);
a.setAttribute('data-bbz', '1');
});
}
function atir() {
try { forrasAtir(); kartyaAtir(); } catch (e) { if (window.console) console.error('[bizalmi sáv] ', e); }
}
function indul() {
atir();
setTimeout(atir, 0);
setTimeout(atir, 800);
window.addEventListener('load', atir);
if (window.MutationObserver) {
var fig = new MutationObserver(function () { if (document.querySelector('.bb-biz-kartya:not([data-bbz])')) atir(); });
fig.observe(document.body, { childList: true, subtree: true });
setTimeout(function () { fig.disconnect(); }, 15000);
}
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
