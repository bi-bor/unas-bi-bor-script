(function () {
var MINDENKI = true;
var ADAT = {"01242_828o":{"01417":1},"02253_1350o":{"01417":1,"01222":6},"19682_1218o":{"01417":1,"01222":6},"31271_900o":{"01417":1,"01222":6},"32990_588o":{"01417":1,"01222":3},"32990_784o":{"01417":1,"01222":4},"33807_489o":{"01417":1,"01222":3},"33963_1050o":{"01417":1,"01222":6},"33983_1002o":{"01417":1,"01222":6},"34924_1092o":{"01417":1,"01222":6},"34926_1002o":{"01417":1,"01222":6},"34927_1372o":{"01417":1,"01222":7},"35343_1176o":{"01417":1,"01222":6},"35394_1176o":{"01417":1,"01222":6},"35701_1125o":{"01417":1,"01222":5},"61926_864o":{"01417":1,"01222":6},"62027_726o":{"01417":1,"01222":6}};     /* raklapos cikkszám → { göngyöleg-cikkszám: db / raklap } */
var NEVEK = {"01417":"Rakodólap (IND)","01222":"Elválasztó műanyaglap (IND)"};   /* göngyöleg-cikkszám → név (a leírásból) */
var KULCS = 'bbGongyoleg', SZAMLALO = 'bbGongyolegUjra';
var ALAP = location.protocol + '//' + location.host;
var GONGY = Object.keys(NEVEK);

var teszt = false;
try {
var m = location.search.match(/[?&]gongyoleg=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
teszt = localStorage.getItem(KULCS) === '1';
} catch (e) { /* tiltott tárhely */ }
if (!(MINDENKI || teszt) || !GONGY.length) return;
var ut = location.pathname;
var lap = /^\/(puttony|shop_cart\.php)/.test(ut) ? 'puttony'
: ut === '/shop_order_mods.php' ? 'mods'
: ut === '/shop_order_control.php' ? 'control'
: ut === '/shop_reg.php' ? 'adatlap'
: document.getElementById('page_artdet_content') ? 'termek' : '';
if (!lap) return;
var keretben = window.top !== window.self;

function naplo() {
if (teszt && window.console) console.log.apply(console, ['[Göngyöleg]'].concat([].slice.call(arguments)));
}
function kesz(fn) {
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
else fn();
}
function post(cim, adat) {
var p = new URLSearchParams();
adat.forEach(function (kv) { p.append(kv[0], kv[1]); });
return fetch(ALAP + cim, { method: 'POST', credentials: 'same-origin', body: p, cache: 'no-store' });
}

function kosarBol(h) {
var d = typeof h === 'string' ? new DOMParser().parseFromString(h, 'text/html') : h;
var f = d.forms.form_temp;
if (!f) return { dbk: [], sorok: [] };   /* üres puttony */
var dbk = [].slice.call(f.querySelectorAll('input[name="db[]"]'));
var sorok = [].slice.call(d.querySelectorAll('.cart-item.cart-product-item[data-sku]')).map(function (s) {
var db = s.querySelector('input[name="db[]"]');
var torol = s.querySelector('[onclick*="delete_artm"]');
var tm = torol ? /delete_artm\('(\d+)'\)/.exec(torol.getAttribute('onclick')) : null;
return { sku: s.getAttribute('data-sku'), i: dbk.indexOf(db), db: db ? Number(db.value) : 0, tetel: tm ? tm[1] : '' };
}).filter(function (s) { return s.i > -1; });
return { dbk: dbk.map(function (i) { return i.value; }), sorok: sorok };
}
function kosarOlvas() {
return fetch(ALAP + '/puttony', { credentials: 'same-origin', cache: 'no-store' })
.then(function (r) { return r.text(); }).then(kosarBol);
}
function kell(k) {
var n = {};
k.sorok.forEach(function (s) {
var g = ADAT[s.sku];
if (g) Object.keys(g).forEach(function (c) { n[c] = (n[c] || 0) + g[c] * s.db; });
});
return n;
}
function sorai(k, c) { return k.sorok.filter(function (s) { return s.sku === c; }); }
function van(k, c) { return sorai(k, c).reduce(function (n, s) { return n + s.db; }, 0); }
function elteresek(k) {
var n = kell(k);
return GONGY.filter(function (c) { return van(k, c) !== (n[c] || 0) || sorai(k, c).length > 1; });
}

function hozzaad(sku, db) {
return post('/shop_ajax/ajax_cart.php', [ ['get_ajax', '1'], ['result_type', 'json'],
['lang_master', (document.documentElement.lang || 'hu').slice(0, 2)], ['action', 'add'],
['sku', sku], ['qty', String(db)] ])
.then(function (r) { return r.json(); })
.then(function (j) { if (!(j && j.cart_success)) throw new Error('a bolt nem tette a puttonyba: ' + sku); });
}
function urlap(k, muvelet, tetel, sor, uj) {
var adat = [ ['action2', muvelet], ['item', tetel], ['package_offer_cart_id', ''] ];
k.dbk.forEach(function (v, i) { adat.push(['db[]', sor && i === sor.i ? String(uj) : v]); });
return post('/puttony', adat).then(function (r) { return r.text(); }).then(kosarBol);
}

function lepes(k, c) {
var s = sorai(k, c), n = kell(k)[c] || 0;
naplo('igazítás:', c, van(k, c), '→', n);
if (s.length > 1) return urlap(k, 'delete', s[1].tetel);
if (!s.length) return hozzaad(c, n).then(kosarOlvas);
if (!n) return urlap(k, 'delete', s[0].tetel);
return urlap(k, 'modify', '', s[0], n);
}
function szinkron(k) {
var kor = 0;
function tovabb(akt) {
var e = elteresek(akt);
if (!e.length) return { valtozott: kor > 0, utana: akt };
if (++kor > 8) throw new Error('túl sok lépés');
return lepes(akt, e[0]).then(tovabb);
}
return Promise.resolve(k).then(tovabb);
}

function ujratoltheto() {
try {
var s = JSON.parse(sessionStorage.getItem(SZAMLALO) || '{"t":0,"n":0}');
if (Date.now() - s.t > 60000) s = { t: Date.now(), n: 0 };
s.n++;
sessionStorage.setItem(SZAMLALO, JSON.stringify(s));
return s.n <= 3;
} catch (e) { return false; }
}
function valtozott() {
try { window.top.dispatchEvent(new Event('bbKosarValtozott')); } catch (x) { /* más ablak */ }
}

function puttony() {
var k = kosarBol(document);
jeloles(k);
if (!elteresek(k).length) return;
szinkron(k).then(function (e) {
if (e.valtozott && ujratoltheto()) location.replace(ALAP + '/puttony');
}).catch(function (e) { naplo('hiba:', e && e.message); });
}
function jeloles(k) {
var rak = k.sorok.filter(function (s) { return ADAT[s.sku]; }).reduce(function (n, s) { return n + s.db; }, 0);
if (!rak || (document.documentElement.lang || 'hu').slice(0, 2) !== 'hu') return;
[].forEach.call(document.querySelectorAll('.cart-item.cart-product-item[data-sku]'), function (s) {
if (GONGY.indexOf(s.getAttribute('data-sku')) < 0 || s.querySelector('.bb-gongy-info')) return;
var nev = s.querySelector('.cart-item__name-link') || s.querySelector('.cart-item__name');
var t = document.createElement('div');
t.className = 'bb-gongy-info';
t.setAttribute('style', 'margin:4px 0 0;font-size:13px;line-height:1.4;color:#4b5563');
t.textContent = 'Göngyöleg a raklapos palackokhoz (' + rak + ' raklap). Használat után villányi telephelyünkön visszavesszük, és az árát jóváírjuk.';
if (nev && nev.parentNode) nev.parentNode.insertBefore(t, nev.nextSibling);
});
}

function adatlap() {
kosarOlvas().then(function (k) {
if (!elteresek(k).length) return;
return szinkron(k).then(function (e) { if (e.valtozott) valtozott(); });
}).catch(function (e) { naplo('hiba:', e && e.message); });
}

function rendeles() {
var ellenorizve = false;
document.addEventListener('click', function (e) {
if (!ellenorizve && e.target.closest && e.target.closest('#button_next')) {
e.preventDefault(); e.stopImmediatePropagation();
}
}, true);
var fek = setTimeout(function () { ellenorizve = true; }, 8000);
function enged() { clearTimeout(fek); ellenorizve = true; }
kosarOlvas().then(function (k) {
if (!elteresek(k).length) { enged(); return; }
return szinkron(k).then(function (e) {
if (!e.valtozott) { enged(); return; }
if (keretben) { valtozott(); enged(); return; }
if (!ujratoltheto()) { enged(); return; }
location.replace(location.href);
});
}).catch(function (e) { enged(); naplo('hiba:', e && e.message); });
}

function termek() {
var skuE = document.querySelector('#page_artdet_content .artdet__sku-value');
var g = skuE && ADAT[skuE.textContent.trim()];
var hely = document.querySelector('#page_artdet_content .artdet__cart');
if (!g || !hely || document.getElementById('bb-gongy-termek') || (document.documentElement.lang || 'hu').slice(0, 2) !== 'hu') return;
var lista = Object.keys(g).map(function (c) { return g[c] + ' db ' + NEVEK[c].replace(/\s*\(.*\)$/, '').toLowerCase(); }).join(', ');
var t = document.createElement('div');
t.id = 'bb-gongy-termek';
t.setAttribute('style', 'display:flex;gap:10px;align-items:flex-start;margin:10px 0 14px;padding:10px 14px;border:1px solid #e3e6ea;border-radius:10px;background:#f7f8f9;font-size:13.5px;line-height:1.45;color:#374151');
t.innerHTML = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.8" stroke-linejoin="round" style="flex:0 0 20px;margin-top:1px"><path d="M3 17h18M5 17v3M12 17v3M19 17v3M4 6h16v11H4z"/></svg>' +
'<span><b>Göngyöleg:</b> raklaponként ' + lista + '. Az ára nincs benne a termék árában; a puttonyba magától bekerül. Használat után villányi telephelyünkön visszavesszük, és az árát jóváírjuk.</span>';
hely.parentNode.insertBefore(t, hely.nextSibling);
}

kesz(lap === 'puttony' ? puttony : lap === 'adatlap' ? adatlap : lap === 'termek' ? termek : rendeles);
})();
