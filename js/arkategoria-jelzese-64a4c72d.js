(function () {
var MINDENKI = true;
var CSOPORTOK = {"1333066":{"nev":"A1 rendszeres","ar":"A1 rendszeres ár","en":"A1 regular"},"1338021":{"nev":"A1 rendszeres","ar":"A1 rendszeres ár","en":"A1 regular"},"1333076":{"nev":"B1 nagyvásárló","ar":"B1 nagyvásárlói ár","en":"B1 wholesale"},"1338026":{"nev":"B1 nagyvásárló","ar":"B1 nagyvásárlói ár","en":"B1 wholesale"},"1333081":{"nev":"C1 kiemelt","ar":"C1 kiemelt ár","en":"C1 premium"},"1338031":{"nev":"C1 kiemelt","ar":"C1 kiemelt ár","en":"C1 premium"},"1314314":{"nev":"Viszonteladó","ar":"Viszonteladói ár","en":"Reseller"},"1338036":{"nev":"Viszonteladó","ar":"Viszonteladói ár","en":"Reseller"}};
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
gyoker.setAttribute('data-bb-arkategoria', '2026-10-13 12:42:58');
var stilus = document.createElement('style');
stilus.id = 'bb-arkategoria';
stilus.textContent = ".bb-ak-ar{display: inline-flex;align-items: center;gap: 6px;margin: 0 0 8px;padding: 4px 11px 4px 9px;border-radius: 999px;background: #eaf4e4;color: #1f6b14;font-size: 14px;font-weight: 700;line-height: 1.3}.bb-ak-ar svg{flex: none}.bb-ak-kartya{display: flex;align-items: flex-start;gap: 10px;padding: 12px 14px;border-radius: 12px;background: #f3f8ef;border: 1px solid #cfe3c2;color: #3d3831;text-align: left}.bb-ak-ikon{flex: none;display: inline-flex;align-items: center;justify-content: center;width: 32px;height: 32px;border-radius: 50%;background: #fff;color: #2b8a1d;border: 1px solid #cfe3c2}.bb-ak-szoveg{display: flex;flex-direction: column;gap: 1px;min-width: 0}.bb-ak-kat{font-size: 12px;color: #6b645a}.bb-ak-kartya strong{font-size: 16px;color: #1f6b14;line-height: 1.25}.bb-ak-le{font-size: 12px;color: #6b645a;line-height: 1.35;margin-top: 2px}.bb-ak-menu{margin: 8px 0 10px}.bb-ak-oldal{margin: 12px 0 20px;max-width: 560px}";
(document.head || gyoker).appendChild(stilus);

var magyar = (gyoker.lang || 'hu').slice(0, 2) === 'hu';
var T = magyar
? { ar: cs.ar, kat: 'Árkategóriája', le: 'A termékeknél az Ön partnerárát látja; az áthúzott ár a bolti listaár.' }
: { ar: cs.en + ' price', kat: 'Your price category', le: 'Prices shown are your partner prices; the crossed-out price is the list price.' };

var IKON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>';

function $(s, gy) { return (gy || document).querySelector(s); }
function elem(cls, html) { var d = document.createElement('div'); d.className = cls; d.innerHTML = html; return d; }
function szoveg(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

function adatlap() {
var ar = $('.artdet__price-and-countdown');
if (!ar || $('.bb-ak-ar', ar)) return;
if (!$('.artdet__price-sale, .product-price--sale, .bb-a-arsor', ar) && !proba) return;
var arak = $('.artdet__prices', ar);
var c = elem('bb-ak-ar', IKON + '<span>' + szoveg(T.ar) + '</span>');
if (arak) arak.parentNode.insertBefore(c, arak); else ar.insertBefore(c, ar.firstChild);
}

function kartya(osztaly) {
return elem('bb-ak-kartya ' + osztaly,
'<span class="bb-ak-ikon">' + IKON + '</span><span class="bb-ak-szoveg"><span class="bb-ak-kat">' + szoveg(T.kat) +
'</span><strong>' + szoveg(magyar ? cs.nev : cs.en) + '</strong><span class="bb-ak-le">' + szoveg(T.le) + '</span></span>');
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

function fut() {
try { adatlap(); } catch (e) { /* hiányos adatlap */ }
try { profilMenu(); } catch (e) { /* nincs profil menü */ }
try { fiokOldal(); } catch (e) { /* más oldal */ }
}
function indul() { fut(); setTimeout(fut, 1500); setTimeout(fut, 5000); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul); else indul();
})();
