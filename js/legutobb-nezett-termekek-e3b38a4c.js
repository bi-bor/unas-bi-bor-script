(function () {
var MINDENKI = true;
var KULCS = 'bbLegutobb';
var allapot = null;
try {
var m = location.search.match(/[?&]legutobb=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { return; /* tiltott tárhely: lista sincs */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var gyoker = document.documentElement;
gyoker.classList.add('bb-lnz');
gyoker.setAttribute('data-bb-legutobb', '2026-10-09 11:50:24');
var stilus = document.createElement('style');
stilus.id = 'bb-legutobb';
stilus.textContent = "html.bb-lnz .bb-lnz-gomb[hidden]{display: none !important}html.bb-lnz .bb-lnz-gomb{display: inline-flex;flex-direction: column;align-items: center;justify-content: center;gap: 2px;min-width: 44px;min-height: 40px;padding: 0 8px;margin: 0;border: 0;background: transparent;color: inherit;font: inherit;font-size: 12px;line-height: 1.2;cursor: pointer;box-shadow: none}html.bb-lnz .bb-lnz-ikon{position: relative;display: inline-flex;align-items: center;justify-content: center;width: 34px;height: 34px;border-radius: 50%;border: 1.5px solid #9fcf8a;background: #eaf3e6;color: #1f6a0c}html.bb-lnz .bb-lnz-ikon svg{width: 18px;height: 18px}html.bb-lnz .bb-lnz-gomb:hover .bb-lnz-ikon,html.bb-lnz .bb-lnz-gomb[aria-expanded=\"true\"] .bb-lnz-ikon{border-color: #2a8511;background: #dcedd4}html.bb-lnz .bb-lnz-gomb:focus-visible{outline: 2px solid #2a8511;outline-offset: 2px;border-radius: 10px}html.bb-lnz .bb-lnz-db{position: absolute;top: -5px;right: -7px;min-width: 18px;height: 18px;padding: 0 4px;box-sizing: border-box;border-radius: 9px;border: 2px solid #fff;background: #2a8511;color: #fff;font-size: 10px;font-weight: 800;line-height: 14px;text-align: center}html.bb-lnz .bb-lnz-felirat{white-space: nowrap}html.bb-lnz .bb-lnz-gomb-m{flex: 0 0 36px;width: 36px;min-width: 36px;padding: 0;margin-left: 5px}html.bb-lnz .bb-lnz-gomb-m .bb-lnz-ikon{width: 36px;height: 36px}html.bb-lnz :has(\u003E.bb-lnz-gomb-m:not([hidden]))\u003E.bb-mlogo{flex: 0 1 auto;min-width: 0}html.bb-lnz :has(\u003E.bb-lnz-gomb-m:not([hidden]))\u003E.bb-mlogo img{max-width: 100%;height: auto}html.bb-lnz :has(\u003E.bb-lnz-gomb-m:not([hidden]))\u003E.cart-box__dropdown-btn{margin-left: 6px !important}.bb-lnz-panel[hidden],.bb-lnz-hatter[hidden]{display: none !important}.bb-lnz-panel{position: fixed;z-index: 100050;width: 420px;max-width: calc(100vw - 24px);box-sizing: border-box;display: flex;flex-direction: column;max-height: min(560px,calc(100vh - 140px));background: #fff;border: 1px solid #ece6dc;border-radius: 14px;box-shadow: 0 12px 40px rgba(20,18,16,.16);color: #221f1b;font-size: 14px;text-align: left}.bb-lnz-csucs{position: absolute;top: -7px;left: var(--bb-lnz-csucs,200px);width: 12px;height: 12px;background: #fff;border-left: 1px solid #ece6dc;border-top: 1px solid #ece6dc;transform: rotate(45deg)}.bb-lnz-fogo{display: none}.bb-lnz-fej{display: flex;align-items: center;gap: 4px;padding: 10px 10px 8px 18px}.bb-lnz-cim{flex: 1;margin: 0 !important;font-size: 17px !important;font-weight: 800 !important;line-height: 1.3;color: #221f1b;text-transform: none;letter-spacing: 0}.bb-lnz-torol{min-height: 40px;padding: 0 8px;border: 0;background: none;color: #6b645a;font: inherit;font-size: 13px;font-weight: 600;text-decoration: underline;text-underline-offset: 2px;cursor: pointer}.bb-lnz-torol[hidden]{display: none}.bb-lnz-torol:hover{color: #221f1b}.bb-lnz-bezar{display: inline-flex;align-items: center;justify-content: center;width: 40px;height: 40px;padding: 0;border: 0;border-radius: 50%;background: #f4f1ec;color: #221f1b;cursor: pointer}.bb-lnz-bezar:hover{background: #ece6dc}.bb-lnz-lista{list-style: none;margin: 0;padding: 0 0 6px;overflow-y: auto;overscroll-behavior: contain}.bb-lnz-sor{display: flex;align-items: center;gap: 12px;padding: 10px 14px 10px 18px;border-top: 1px solid #f2eee8}.bb-lnz-kep{flex: 0 0 56px;width: 56px;height: 56px;border-radius: 10px;overflow: hidden;background: #f4f1ec;display: flex;align-items: center;justify-content: center}.bb-lnz-kep img{width: 100%;height: 100%;object-fit: contain;background: #fff}.bb-lnz-adat{flex: 1;min-width: 0;display: flex;flex-direction: column;gap: 3px}.bb-lnz-panel a.bb-lnz-nev{color: #221f1b !important;font-weight: 700;font-size: 14px;line-height: 1.3;text-decoration: none;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden}.bb-lnz-panel a.bb-lnz-nev:hover{color: #1f6a0c !important;text-decoration: underline}.bb-lnz-sor2{display: flex;align-items: center;flex-wrap: wrap;gap: 4px 10px;font-size: 13px}.bb-lnz-ar{font-weight: 800;white-space: nowrap}.bb-lnz-raktar{display: inline-flex;align-items: center;gap: 5px;color: #6b645a;white-space: nowrap}.bb-lnz-raktar::before{content: \"\";width: 7px;height: 7px;border-radius: 50%;background: #2a8511}.bb-lnz-r-o::before{background: #d08a00}.bb-lnz-r-n::before{background: #a9a196}.bb-lnz-putt{flex: 0 0 40px;display: inline-flex;align-items: center;justify-content: center;width: 40px;height: 40px;padding: 0;border: 0;border-radius: 10px;background: #2a8511;color: #fff !important;cursor: pointer;box-shadow: 0 2px 6px rgba(42,133,17,.18);text-decoration: none !important}.bb-lnz-putt:hover{background: #1f6a0c}.bb-lnz-megnez{background: #eaf3e6;color: #1f6a0c !important;border: 1.5px solid #9fcf8a;box-shadow: none;box-sizing: border-box}.bb-lnz-megnez:hover{background: #dcedd4}.bb-lnz-ures{padding: 18px;color: #6b645a;border-top: 1px solid #f2eee8}.bb-lnz-panel :is(button,a):focus-visible{outline: 2px solid #2a8511;outline-offset: 2px}.bb-lnz-hatter{position: fixed;inset: 0;z-index: 100049;background: rgba(28,26,23,.45)}html.bb-lnz-nyitva,html.bb-lnz-nyitva body{overflow: hidden !important}html.bb-lnz-nyitva molin-shop-ai{display: none !important}.bb-lnz-panel.bb-lnz-lap{top: auto !important;left: 0 !important;right: 0;bottom: 0;width: 100%;max-width: none;max-height: 82vh;border-radius: 20px 20px 0 0;border: 0;box-shadow: 0 -8px 30px rgba(20,18,16,.18);padding-bottom: env(safe-area-inset-bottom,0px);animation: bb-lnz-fel .22s ease-out}.bb-lnz-lap .bb-lnz-csucs{display: none}.bb-lnz-lap .bb-lnz-fogo{display: block;width: 40px;height: 5px;margin: 10px auto 0;border-radius: 3px;background: #d8d2c7}.bb-lnz-lap .bb-lnz-fej{padding: 4px 12px 8px 16px}.bb-lnz-lap .bb-lnz-sor{padding: 10px 16px}.bb-lnz-lap .bb-lnz-kep{flex-basis: 60px;width: 60px;height: 60px}.bb-lnz-lap .bb-lnz-putt{flex-basis: 44px;width: 44px;height: 44px}@keyframes bb-lnz-fel{from{transform: translateY(40px);opacity: .4}to{transform: none;opacity: 1}}@media (prefers-reduced-motion: reduce){.bb-lnz-panel.bb-lnz-lap{animation: none}}html.bb-lnz .artdet__img-data-left{position: relative}.bb-lnz-oszt{position: absolute;top: 116px;right: 12px;z-index: 5;display: flex;align-items: center;justify-content: center;width: 44px;height: 44px;margin: 0;padding: 0;border: 1px solid #2a8511;border-radius: 50%;background: #fff;color: #1f6a0c;cursor: pointer;box-shadow: 0 2px 8px rgba(34,31,27,.06)}.bb-lnz-oszt:hover,.bb-lnz-oszt[aria-expanded=\"true\"]{background: #eaf3e6}.bb-lnz-oszt:focus-visible{outline: 2px solid #2a8511;outline-offset: 2px}.artdet__img-data-left:has(.bb-a-3d-gomb) .bb-lnz-oszt{top: 168px}.bb-lnz-oszt-menu{position: absolute;top: 116px;right: 66px;z-index: 30;width: 230px;box-sizing: border-box;padding: 8px;display: flex;flex-direction: column;gap: 2px;background: #fff;border: 1px solid #ece6dc;border-radius: 14px;box-shadow: 0 12px 40px rgba(20,18,16,.16)}.artdet__img-data-left:has(.bb-a-3d-gomb) .bb-lnz-oszt-menu{top: 168px}.bb-lnz-oszt-menu[hidden]{display: none}.bb-lnz-oszt-cim{padding: 6px 10px 4px;color: #6b645a;font-size: 12px;font-weight: 800;text-transform: uppercase;letter-spacing: .4px}.bb-lnz-oszt-menu\u003E:is(button,a){display: flex;align-items: center;gap: 12px;min-height: 44px;padding: 0 10px;margin: 0;border: 0;border-radius: 10px;background: transparent;color: #221f1b !important;font: inherit;font-size: 15px;font-weight: 600;text-align: left;text-decoration: none !important;cursor: pointer}.bb-lnz-oszt-menu\u003E:is(button,a):hover{background: #f4f1ec}.bb-lnz-oszt-menu\u003E.kesz,.bb-lnz-oszt-menu\u003E.kesz:hover{background: #eaf3e6;color: #1f6a0c !important;font-weight: 700}.bb-lnz-oszt-menu\u003E:is(button,a):focus-visible{outline: 2px solid #2a8511;outline-offset: -2px}.bb-lnz-ertesito{position: fixed;left: 16px;right: 16px;bottom: calc(env(safe-area-inset-bottom,0px) + 96px);z-index: 100060;display: flex;align-items: center;gap: 10px;padding: 12px 14px;border-radius: 12px;background: #221f1b;color: #fff;font-size: 14px;font-weight: 700;box-shadow: 0 8px 24px rgba(20,18,16,.25);opacity: 0;transform: translateY(10px);pointer-events: none;transition: opacity .2s,transform .2s}.bb-lnz-ertesito svg{color: #9fcf8a;flex: 0 0 auto}.bb-lnz-ertesito.lathato{opacity: 1;transform: none}@media (min-width: 576px){.bb-lnz-ertesito{left: auto;right: 24px;top: 140px;bottom: auto;max-width: 380px;transform: translateY(-10px)}}@media (min-width: 768px){html.bb-lnz .back_to_top{width: 48px !important;height: 48px !important;min-width: 0 !important;padding: 0 !important;display: inline-flex !important;align-items: center;justify-content: center;border: 1.5px solid #9fcf8a !important;border-radius: 50% !important;background: #fff !important;box-shadow: 0 4px 14px rgba(20,18,16,.12) !important}html.bb-lnz .back_to_top:hover{border-color: #2a8511 !important;background: #eaf3e6 !important}html.bb-lnz .back_to_top::before{content: \"\" !important;display: block !important;width: 20px !important;height: 20px !important;margin: 0 !important;font-size: 0 !important;background: #1f6a0c !important;-webkit-mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 19V5M5 12l7-7 7 7'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 19V5M5 12l7-7 7 7'/%3E%3C/svg%3E\") center / contain no-repeat}html.bb-lnz .back_to_top::after{display: none !important}}html.bb-lnz :is(.product__price-unit,.product-price--unit-price,.artdet__price-unit){color: #6b645a !important}html.bb-lnz :is(.product__price-base-value,.product-price--base .text-line-through,.artdet__price-base-value){color: #6b645a !important}html.bb-lnz :is(.product__price-base-value,.product-price--base,.artdet__price-base) :is(.price-gross,.price-currency){color: #6b645a !important}html.bb-lnz .badge--sale{background-color: #c62828 !important}html.bb-lnz .sticker[data-id=\"16884\"]{background-color: #5e7e3c !important}html.bb-lnz .sticker[data-id=\"35361\"]{background-color: #846d86 !important}html.bb-lnz .sticker[data-id=\"35366\"]{background-color: #577980 !important}html.bb-lnz .sticker[data-id=\"35371\"]{background-color: #9d6666 !important}html.bb-lnz .sticker[data-id=\"35376\"]{background-color: #b35c00 !important}html.bb-lnz .sticker[data-id=\"35381\"]{background-color: #956e22 !important}html.bb-lnz .sticker[data-id=\"35386\"]{background-color: #c62828 !important}html.bb-lnz .sticker[data-id=\"45836\"]{background-color: #8f7016 !important}";
(document.head || gyoker).appendChild(stilus);

var MAX = 12;
var nyelv = (gyoker.lang || 'hu').slice(0, 2);
var magyar = nyelv === 'hu';
var LISTA = 'bbLegutobbLista_' + nyelv;
var T = magyar
? { cim: 'Legutóbb nézett', torol: 'Lista törlése', bezar: 'Bezárás', putt: 'Puttonyba', megnez: 'Megnézem', ures: 'Még nem nézett meg terméket.', oszt: 'Megosztás', masol: 'Link másolása', masolva: 'Link másolva', email: 'E-mail', masolvaUz: 'Link másolva, beillesztheted bárhová', bekerult: 'A Puttonyba került: ' }
: { cim: 'Recently viewed', torol: 'Clear list', bezar: 'Close', putt: 'Add to cart', megnez: 'View', ures: 'No products viewed yet.', oszt: 'Share', masol: 'Copy link', masolva: 'Link copied', email: 'E-mail', masolvaUz: 'Link copied', bekerult: 'Added to cart: ' };

function $(s, gy) { return (gy || document).querySelector(s); }
function kisMobil() { return !!(window.matchMedia && window.matchMedia('(max-width: 575.98px)').matches); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function sajatUrl(u) { try { var x = new URL(u, location.href); return x.origin === location.origin ? x.href : ''; } catch (e) { return ''; } }
function utvonal(u) { try { return new URL(u, location.href).pathname; } catch (e) { return u; } }

function olvas() {
try { var l = JSON.parse(localStorage.getItem(LISTA) || '[]'); return Array.isArray(l) ? l : []; } catch (e) { return []; }
}
function ir(l) { try { localStorage.setItem(LISTA, JSON.stringify(l.slice(0, MAX))); } catch (e) { /* tele a tárhely */ } }

var IKON_ORA = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v4h4"/><path d="M12 7v5l3 2"/></svg>';
var IKON_X = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
var IKON_PUTT = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M12 11v6M9 14h6"/></svg>';
var IKON_NYIL = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
var IKON_OSZT = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/></svg>';
var IKON_LINK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>';
var IKON_PIPA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>';
var IKON_FB = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>';
var IKON_LEVEL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

function arLd() {
var ar = null;
[].some.call(document.querySelectorAll('script[type="application/ld+json"]'), function (s) {
try {
var d = JSON.parse(s.textContent);
var o = d && d['@type'] === 'Product' && d.offers;
if (o && o.price) { ar = { p: +o.price, c: o.priceCurrency || 'HUF' }; return true; }
} catch (e) { /* nem JSON */ }
return false;
});
return ar;
}
function arSzoveg(ar) {
if (!ar || !isFinite(ar.p)) return '';
try {
if (ar.c === 'HUF') return new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 }).format(ar.p) + ' Ft';
return new Intl.NumberFormat(gyoker.lang || 'hu', { style: 'currency', currency: ar.c }).format(ar.p);
} catch (e) { return ar.p + ' ' + ar.c; }
}
function megjegyez() {
var tartalom = document.getElementById('page_artdet_content');
if (!tartalom) return;
var nevEl = $('.artdet__name', tartalom);
var url = sajatUrl(($('link[rel="canonical"]') || {}).href || location.href.split(/[?#]/)[0]);
if (!nevEl || !url) return;
var kepEl = document.getElementById('main_image') || $('.artdet__img-inner img', tartalom);
var gomb = $('.artdet__cart-btn', tartalom);
var cikk = gomb && (gomb.getAttribute('data-cartadd') || gomb.getAttribute('onclick') || '').match(/cart_add\('([^']+)'/);
var db = cikk && document.getElementById('db_' + cikk[1]);
var raktar = $('.artdet__stock', tartalom);
var rSzoveg = raktar ? (($('.stock__qty-and-unit', raktar) || raktar).textContent || '').replace(/\s+/g, ' ').trim() : '';
var rm = rSzoveg.match(/^Több mint (.+?) (db|darab|pár|csomag|kg|l|m)? ?raktáron$/i);
if (rm) rSzoveg = rm[1] + '+ ' + (rm[2] ? rm[2] + ' ' : '') + 'raktáron';
var egyszeru = !!(cikk && db && (db.getAttribute('data-min') || '1') === '1' && (db.getAttribute('data-step') || '1') === '1' &&
!document.getElementById('artdet__type') && !document.querySelector('#page_artdet_content [id^="egyeb_list"], #page_artdet_content [name^="egyeb_list"], #page_artdet_content [id^="cust_input"]') &&
!(raktar && raktar.classList.contains('no-stock')));
var tetel = {
u: url,
n: nevEl.textContent.replace(/\s+/g, ' ').trim(),
k: sajatUrl(kepEl && (kepEl.currentSrc || kepEl.src) || ''),
a: arSzoveg(arLd()),
r: rSzoveg.slice(0, 40),
rs: raktar ? (raktar.classList.contains('no-stock') ? 'n' : raktar.classList.contains('to-order') ? 'o' : 'z') : '',
s: egyszeru ? cikk[1] : '',
t: Date.now()
};
var p = utvonal(url);
ir([tetel].concat(olvas().filter(function (x) { return x && utvonal(x.u) !== p; })));
}

var panel = null, hatter = null, nyitoGomb = null;
function lathatoLista() {
var p = utvonal(location.href);
return olvas().filter(function (x) { return x && x.u && x.n && utvonal(x.u) !== p; });
}
function gombok() {
var db = lathatoLista().length;
[].forEach.call(document.querySelectorAll('.bb-lnz-gomb'), function (g) {
g.hidden = !db;
var j = g.querySelector('.bb-lnz-db');
if (j) j.textContent = db > 9 ? '9+' : String(db);
});
}
function ujGomb(mobil) {
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-lnz-gomb btn' + (mobil ? ' bb-lnz-gomb-m' : '');
g.setAttribute('aria-label', T.cim);
g.setAttribute('aria-haspopup', 'dialog');
g.setAttribute('aria-expanded', 'false');
g.title = T.cim;
g.innerHTML = '<span class="bb-lnz-ikon">' + IKON_ORA + '<span class="bb-lnz-db"></span></span>' +
(mobil ? '' : '<span class="bb-lnz-felirat">' + esc(T.cim) + '</span>');
g.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); panel && !panel.hidden ? zar() : nyit(g); });
return g;
}
function beilleszt() {
var asztali = document.getElementById('profile__dropdown-btn2');
if (asztali && !asztali.parentNode.querySelector('.bb-lnz-gomb')) asztali.parentNode.insertBefore(ujGomb(false), asztali);
var mobil = document.getElementById('profile__dropdown-btn');
if (mobil && !document.querySelector('.bb-lnz-gomb-m')) mobil.parentNode.insertBefore(ujGomb(true), mobil);
gombok();
}

function sorHtml(x, i) {
var kep = x.k ? '<img src="' + esc(x.k) + '" alt="" loading="lazy" decoding="async">' : '';
var raktar = x.r ? '<span class="bb-lnz-raktar bb-lnz-r-' + esc(x.rs || 'z') + '">' + esc(x.r) + '</span>' : '';
var gomb = x.s
? '<button type="button" class="bb-lnz-putt" data-i="' + i + '" aria-label="' + esc(T.putt + ': ' + x.n) + '" title="' + esc(T.putt) + '">' + IKON_PUTT + '</button>'
: '<a class="bb-lnz-putt bb-lnz-megnez" href="' + esc(x.u) + '" aria-label="' + esc(T.megnez + ': ' + x.n) + '" title="' + esc(T.megnez) + '">' + IKON_NYIL + '</a>';
return '<li class="bb-lnz-sor"><a class="bb-lnz-kep" href="' + esc(x.u) + '" tabindex="-1" aria-hidden="true">' + kep + '</a>' +
'<div class="bb-lnz-adat"><a class="bb-lnz-nev" href="' + esc(x.u) + '">' + esc(x.n) + '</a>' +
'<div class="bb-lnz-sor2">' + (x.a ? '<span class="bb-lnz-ar">' + esc(x.a) + '</span>' : '') + raktar + '</div></div>' + gomb + '</li>';
}
function rajzol() {
var l = lathatoLista();
panel.querySelector('.bb-lnz-lista').innerHTML = l.length ? l.map(sorHtml).join('') : '<li class="bb-lnz-ures">' + esc(T.ures) + '</li>';
panel.querySelector('.bb-lnz-torol').hidden = !l.length;
return l;
}
function epit() {
if (panel) return;
hatter = document.createElement('div');
hatter.className = 'bb-lnz-hatter';
hatter.hidden = true;
hatter.addEventListener('click', zar);
panel = document.createElement('section');
panel.className = 'bb-lnz-panel';
panel.setAttribute('role', 'dialog');
panel.setAttribute('aria-label', T.cim);
panel.hidden = true;
panel.innerHTML = '<span class="bb-lnz-csucs" aria-hidden="true"></span><span class="bb-lnz-fogo" aria-hidden="true"></span>' +
'<div class="bb-lnz-fej"><h2 class="bb-lnz-cim">' + esc(T.cim) + '</h2>' +
'<button type="button" class="bb-lnz-torol">' + esc(T.torol) + '</button>' +
'<button type="button" class="bb-lnz-bezar" aria-label="' + esc(T.bezar) + '">' + IKON_X + '</button></div>' +
'<ul class="bb-lnz-lista"></ul>';
panel.addEventListener('click', function (e) {
if (e.target.closest('.bb-lnz-bezar')) { zar(); return; }
if (e.target.closest('.bb-lnz-torol')) { ir([]); rajzol(); gombok(); zar(); return; }
var p = e.target.closest('button.bb-lnz-putt');
if (p) {
var x = lathatoLista()[+p.getAttribute('data-i')];
if (x && x.s && typeof window.cart_add === 'function') {
zar();
try { window.cart_add(x.s, 'bblnz_', 1); ertesit(T.bekerult + x.n); } catch (er) { location.href = x.u; }
} else if (x) location.href = x.u;
}
});
document.body.appendChild(hatter);
document.body.appendChild(panel);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { zar(); nyitoGomb && nyitoGomb.focus(); } });
document.addEventListener('click', function (e) {
if (!panel.hidden && !kisMobil() && !panel.contains(e.target) && !e.target.closest('.bb-lnz-gomb')) zar();
});
window.addEventListener('resize', helyez);
window.addEventListener('scroll', helyez, { passive: true });
}
function helyez() {
if (!panel || panel.hidden || !nyitoGomb) return;
if (kisMobil()) { panel.style.top = panel.style.left = ''; return; }
var r = nyitoGomb.getBoundingClientRect();
if (!r.width) { zar(); return; }
var w = panel.offsetWidth || 420;
var bal = Math.max(12, Math.min(window.innerWidth - w - 12, r.left + r.width / 2 - w / 2));
panel.style.top = Math.round(r.bottom + 10) + 'px';
panel.style.left = Math.round(bal) + 'px';
panel.style.setProperty('--bb-lnz-csucs', Math.round(r.left + r.width / 2 - bal - 7) + 'px');
}
function nyit(g) {
epit();
nyitoGomb = g;
rajzol();
panel.classList.toggle('bb-lnz-lap', kisMobil());
panel.hidden = false;
hatter.hidden = !kisMobil();
gyoker.classList.toggle('bb-lnz-nyitva', kisMobil());
g.setAttribute('aria-expanded', 'true');
helyez();
var elso = panel.querySelector('.bb-lnz-bezar');
elso && elso.focus({ preventScroll: true });
}
function zar() {
if (!panel || panel.hidden) return;
panel.hidden = true;
hatter.hidden = true;
gyoker.classList.remove('bb-lnz-nyitva');
[].forEach.call(document.querySelectorAll('.bb-lnz-gomb'), function (g) { g.setAttribute('aria-expanded', 'false'); });
}

var ertesito = null;
function ertesit(szoveg) {
if (!ertesito) {
ertesito = document.createElement('div');
ertesito.className = 'bb-lnz-ertesito';
ertesito.setAttribute('role', 'status');
document.body.appendChild(ertesito);
}
ertesito.innerHTML = IKON_PIPA + '<span>' + esc(szoveg) + '</span>';
ertesito.classList.add('lathato');
clearTimeout(ertesito.idozito);
ertesito.idozito = setTimeout(function () { ertesito.classList.remove('lathato'); }, 2600);
}
function masol(szoveg, kesz) {
function regi() {
var t = document.createElement('textarea');
t.value = szoveg; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
document.body.appendChild(t); t.select();
try { document.execCommand('copy'); } catch (e) { /* nincs vágólap */ }
t.remove(); kesz();
}
if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(szoveg).then(kesz, regi); else regi();
}
function megosztas() {
var tartalom = document.getElementById('page_artdet_content');
var hely = tartalom && $('.artdet__img-data-left', tartalom);
if (!hely || hely.querySelector('.bb-lnz-oszt')) return;
var url = sajatUrl(($('link[rel="canonical"]') || {}).href || location.href.split(/[?#]/)[0]) || location.href;
var cim = (($('.artdet__name', tartalom) || {}).textContent || document.title).replace(/\s+/g, ' ').trim();
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-lnz-oszt';
g.setAttribute('aria-label', T.oszt);
g.setAttribute('aria-haspopup', 'menu');
g.setAttribute('aria-expanded', 'false');
g.title = T.oszt;
g.innerHTML = IKON_OSZT;
var menu = document.createElement('div');
menu.className = 'bb-lnz-oszt-menu';
menu.setAttribute('role', 'menu');
menu.hidden = true;
var e = encodeURIComponent;
menu.innerHTML = '<div class="bb-lnz-oszt-cim">' + esc(T.oszt) + '</div>' +
'<button type="button" role="menuitem" class="bb-lnz-oszt-masol">' + IKON_LINK + '<span>' + esc(T.masol) + '</span></button>' +
'<a role="menuitem" href="https://www.facebook.com/sharer/sharer.php?u=' + e(url) + '" target="_blank" rel="noopener">' + IKON_FB + '<span>Facebook</span></a>' +
'<a role="menuitem" href="mailto:?subject=' + e(cim) + '&amp;body=' + e(cim + '\n' + url) + '">' + IKON_LEVEL + '<span>' + esc(T.email) + '</span></a>';
function menuZar() { menu.hidden = true; g.setAttribute('aria-expanded', 'false'); }
g.addEventListener('click', function (ev) {
ev.preventDefault(); ev.stopPropagation();
if (navigator.share && (kisMobil() || !(window.matchMedia && window.matchMedia('(pointer: fine)').matches))) {
navigator.share({ title: cim, url: url }).catch(function () { /* bezárta */ });
return;
}
if (kisMobil()) { masol(url, function () { ertesit(T.masolvaUz); }); return; }
var m = menu.querySelector('.bb-lnz-oszt-masol');
m.classList.remove('kesz'); m.innerHTML = IKON_LINK + '<span>' + esc(T.masol) + '</span>';
menu.hidden = !menu.hidden;
g.setAttribute('aria-expanded', String(!menu.hidden));
});
menu.addEventListener('click', function (ev) {
var m = ev.target.closest('.bb-lnz-oszt-masol');
if (m) {
masol(url, function () { m.classList.add('kesz'); m.innerHTML = IKON_PIPA + '<span>' + esc(T.masolva) + '</span>'; setTimeout(menuZar, 1400); });
return;
}
if (ev.target.closest('a')) setTimeout(menuZar, 0);
});
document.addEventListener('click', function (ev) { if (!menu.hidden && !menu.contains(ev.target) && !g.contains(ev.target)) menuZar(); });
document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !menu.hidden) { menuZar(); g.focus(); } });
hely.appendChild(g);
hely.appendChild(menu);
}

function akadalymentes() {
[].forEach.call(document.querySelectorAll('#footer a, footer a'), function (a) {
if (!a.textContent.trim() && !a.querySelector('img, svg, i, [class*="icon"]') && !a.getAttribute('aria-label') && !a.title) a.remove();
});
function keretek() {
[].forEach.call(document.querySelectorAll('iframe:not([title])'), function (f) {
if (/barion\.com/.test(f.src || '')) f.setAttribute('title', 'Barion fizetési szolgáltatás (rejtett)');
});
}
keretek(); setTimeout(keretek, 3000); setTimeout(keretek, 8000);
[].forEach.call(document.querySelectorAll('ul > ul, ul > ol, ol > ul, ol > ol'), function (belso) {
var kulso = belso.parentNode;
while (belso.firstChild) kulso.insertBefore(belso.firstChild, belso);
belso.remove();
});
}

function indul() {
try { megjegyez(); } catch (e) { /* hiányos adatlap */ }
beilleszt();
megosztas();
try { akadalymentes(); } catch (e) { /* nem kritikus */ }
window.addEventListener('storage', function (e) { if (e.key === LISTA) { gombok(); if (panel && !panel.hidden) rajzol(); } });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul); else indul();
})();
