(function () {
var MINDENKI = true;
var SKUK = ["34920_20","34921_20","04883_50","34924_20","19625_25","31271_20","33963_20","33983_12","35348_25","20732_25","21626_20","29917_25","36456_20","34930_20","35349_25","36424_12","22716_25","22716_50","28154_40","35414_12","34090_20","29711_20","21240_30","34929_20","36457_20","60406_20","62085_25","19722_25","22196_12","04622_25","61903_25","20733_12","35268_20","62021_999","34003_20","34977","61809_12","34979","51654","26565_12","35591","51655","22030","34976_12","34082","35618","34915","22540","22752","26708","21672_25","62021_25","26228_25","35726_25","22343_25","36633_25","04883_25","21840_25","36653_25","28261_25","35086_25","19721_25","21558_12","15819_25","33875_20","61928_20","01000_25","01242_12","35184_12","34942_20","18724_25","27272_20","33807_12","21924_25","21926_25","33526_20","31160_12","29917_25-nehasz","31274_16","21657_12","21603_12","15911_20","35701_25","16821_20","36562_20","32125_20_ne_hasz"];
var SZOLG = '27819';
var DIJ = "400 Ft";   /* a #27819 ára a boltból, pl. „400 Ft” */
var DIJ_NEV = 'Csomagolási és kezelési költség';
var MENTES = /személyes átvétel|bí-?bor futár/i;
var KULCS = 'bbKartondij', SZAMLALO = 'bbKartondijUjra';
var ALAP = location.protocol + '//' + location.host;

var teszt = false;
try {
var m = location.search.match(/[?&]kartondij=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
teszt = localStorage.getItem(KULCS) === '1';
} catch (e) { /* tiltott tárhely */ }
var aktiv = MINDENKI || teszt;
var lap = location.pathname === '/shop_order_mods.php' ? 'mods'
: location.pathname === '/shop_order_control.php' ? 'control'
: /^\/termek-reszletek\//.test(location.pathname) || document.getElementById('page_artdet_content') ? 'termek' : '';
if (!lap || !SKUK.length) return;
var keretben = window.top !== window.self;

function naplo() {
if (teszt && window.console) console.log.apply(console, ['[Kartondíj]'].concat([].slice.call(arguments)));
}
function kesz(fn) {
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
else fn();
}
function szoveg(e) { return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; }
function kellDij(szallNev) { return !aktiv || !MENTES.test(szallNev); }
function post(cim, adat) {
var p = new URLSearchParams();
adat.forEach(function (kv) { p.append(kv[0], kv[1]); });
return fetch(ALAP + cim, { method: 'POST', credentials: 'same-origin', body: p, cache: 'no-store' });
}

function kosarBol(h) {
var d = new DOMParser().parseFromString(h, 'text/html');
var f = d.forms.form_temp;
if (!f) return null;   /* üres vagy lejárt puttony */
var dbk = [].slice.call(f.querySelectorAll('input[name="db[]"]'));
var sorok = [].slice.call(d.querySelectorAll('.cart-item.cart-product-item[data-sku]')).map(function (s) {
var db = s.querySelector('input[name="db[]"]');
var torol = s.querySelector('[onclick*="delete_artm"]');
var tm = torol ? /delete_artm\('(\d+)'\)/.exec(torol.getAttribute('onclick')) : null;
var dij = [].some.call(s.querySelectorAll('.cart-plus-item'), function (p) { return szoveg(p).indexOf(DIJ_NEV) > -1; });
return { sku: s.getAttribute('data-sku'), i: dbk.indexOf(db), db: db ? Number(db.value) : 0, tetel: tm ? tm[1] : '', dij: dij };
});
var o = d.querySelector('.total-price-raw');
return { dbk: dbk.map(function (i) { return i.value; }), sorok: sorok, osszeg: o ? parseFloat(o.textContent) : NaN };
}
function kosarOlvas() {
return fetch(ALAP + '/puttony', { credentials: 'same-origin', cache: 'no-store' })
.then(function (r) { return r.text(); }).then(kosarBol);
}
function kartonosok(k) {
return k ? k.sorok.filter(function (s) { return SKUK.indexOf(s.sku) > -1 && s.i > -1; }) : [];
}
function sorKeres(k, sku) { return kartonosok(k).filter(function (s) { return s.sku === sku; })[0] || null; }
function osszDb(k, sku) { return kartonosok(k).reduce(function (n, s) { return n + (s.sku === sku ? s.db : 0); }, 0); }
function rosszak(k, kell) { return kartonosok(k).filter(function (s) { return s.dij !== kell; }); }

function hozzaad(sku, kell, db) {
return post('/shop_ajax/ajax_cart.php', [ ['get_ajax', '1'], ['result_type', 'json'],
['lang_master', (document.documentElement.lang || 'hu').slice(0, 2)], ['action', 'add'],
['sku', sku], ['qty', String(db || 1)], ['service_plus', kell ? SZOLG : ''] ])
.then(function (r) { return r.json(); })
.then(function (j) { return !!(j && j.cart_success); });
}
function mennyiseg(k, sor, uj) {
var adat = [ ['action2', 'modify'], ['item', ''], ['package_offer_cart_id', ''] ];
k.dbk.forEach(function (v, i) { adat.push(['db[]', i === sor.i ? String(uj) : v]); });
return post('/puttony', adat).then(function (r) { return r.text(); }).then(kosarBol);
}

function sorValt(k, sor, kell) {
naplo('átállítás:', sor.sku, sor.db + ' db', kell ? 'díjjal' : 'díj nélkül');
function potol(k2) {
var hiany = sor.db - osszDb(k2, sor.sku);
naplo('a bolt nem fogadta el, pótlás:', hiany);
return (hiany > 0 ? hozzaad(sor.sku, sor.dij, hiany) : Promise.resolve())
.then(function () {
var h = new Error('a bolt nem fogadta el: ' + sor.sku);
h.csendes = true;
throw h;
});
}
return hozzaad(sor.sku, kell, 1).then(function (ok) {
if (!ok) return kosarOlvas().then(potol);
return mennyiseg(k, sor, sor.db).then(function (k2) {
var s2 = sorKeres(k2, sor.sku);
return s2 && s2.dij === kell && osszDb(k2, sor.sku) === sor.db ? k2 : potol(k2);
});
});
}

function szinkron(kell, k) {
var eredeti = {};
kartonosok(k).forEach(function (s) { eredeti[s.sku] = { db: osszDb(k, s.sku), dij: s.dij }; });
var kor = 0;
function lepes(akt) {
var r = rosszak(akt, kell);
if (!r.length) return akt;
if (++kor > 8) throw new Error('túl sok lépés');
return sorValt(akt, r[0], kell).then(lepes);
}
function potol() {
return kosarOlvas().then(function (most) {
return Object.keys(eredeti).reduce(function (p, sku) {
var hiany = eredeti[sku].db - osszDb(most, sku);
return hiany > 0 ? p.then(function () { naplo('pótlás:', sku, hiany); return hozzaad(sku, eredeti[sku].dij, hiany); }) : p;
}, Promise.resolve());
});
}
return Promise.resolve().then(function () { return lepes(k); }).then(function (vege) {
var hibas = Object.keys(eredeti).filter(function (sku) { return osszDb(vege, sku) !== eredeti[sku].db; });
if (hibas.length) return potol().then(function () { throw new Error('eltért a mennyiség: ' + hibas.join(', ')); });
return { valtozott: vege !== k, elotte: k, utana: vege };
}, function (e) {
return potol().then(function () { throw e; });
});
}

function jelzes(hely, html, tipus) {
var e = document.getElementById('bb-kartondij');
if (!html) { if (e) e.remove(); return; }
if (!hely) return;
if (!e) {
e = document.createElement('div');
e.id = 'bb-kartondij';
hely.insertBefore(e, hely.firstChild);
}
var szin = tipus === 'hiba' ? '#fdecea;border-color:#f5c2bd;color:#8a1f11' : tipus === 'tolt' ? '#f3f4f6;border-color:#d9dde2;color:#374151' : '#f3faf0;border-color:#b9e0a8;color:#24721a';
e.setAttribute('style', 'margin:0 0 14px;padding:10px 14px;border:1px solid;border-radius:10px;font-size:14px;line-height:1.45;background:' + szin);
e.innerHTML = html;
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

function mods() {
var hely = document.querySelector('.order-left-content');
var f = document.forms.form_order;
if (!hely || !f) return;
var fut = false, ujra = false, ido = null, feloldo = null;

document.addEventListener('click', function (e) {
if (feloldo && e.target.closest && e.target.closest('#button_next')) {
e.preventDefault(); e.stopImmediatePropagation();
}
}, true);

function kivalasztott() {
var r = f.querySelector('.szall_radio:checked');
if (!r) return null;
var doboz = document.getElementById('szall_mod_' + r.id.replace('szall_id_', ''));
return r.value + ' ' + szoveg(doboz && doboz.querySelector('.order-mods__name'));
}

function vege() {
fut = false;
if (ujra) { ujra = false; ellenoriz(); return; }
var v = feloldo; feloldo = null;
if (v) v();
}

function osszegJavit(e) {
var raw = document.querySelector('.total-price-raw');
var kul = e.utana.osszeg - e.elotte.osszeg;
if (!raw || isNaN(kul) || typeof window.calculate_summary !== 'function') return false;
raw.textContent = String(Math.round((parseFloat(raw.textContent) + kul) * 100) / 100);
window.calculate_summary();
return true;
}

function ellenoriz() {
if (fut) { ujra = true; return; }
var nev = kivalasztott();
if (!nev) { vege(); return; }
var kell = kellDij(nev);
fut = true;
kosarOlvas().then(function (k) {
if (!rosszak(k, kell).length) {
if (kell) jelzes(null, '');
return;
}
jelzes(hely, kell ? 'Csomagolási díj hozzáadása…' : 'Csomagolási díj levétele…', 'tolt');
return szinkron(kell, k).then(function (e) {
naplo('kész', e.elotte.osszeg, '→', e.utana.osszeg);
if (!osszegJavit(e)) {
location.replace(ALAP + '/shop_order_mods.php' + location.search);
return;
}
try { window.top.dispatchEvent(new Event('bbKosarValtozott')); } catch (x) { /* más ablak */ }
jelzes(hely, kell ? '' : '✓ ' + (/személyes/i.test(nev) ? 'Személyes átvételnél' : 'Saját futárunkkal') +
' nem számolunk csomagolási (karton) díjat — levettük a puttonyból.');
});
}).catch(function (e) {
naplo('hiba:', e && e.message);
if (e && e.csendes) { jelzes(null, ''); return; }
jelzes(hely, 'A csomagolási díjat nem sikerült a szállítási módhoz igazítani. Kérjük, ellenőrizze a <a href="' + ALAP + '/puttony" target="_top">puttonyt</a>.', 'hiba');
try { window.top.dispatchEvent(new Event('bbKosarValtozott')); } catch (x) { /* más ablak */ }
}).then(vege, vege);
}

function indit() {
if (!feloldo) window.bbKartondij = new Promise(function (ok) { feloldo = ok; });
clearTimeout(ido);
ido = setTimeout(ellenoriz, 120);
}
f.addEventListener('change', function (e) {
if (e.target.classList && e.target.classList.contains('szall_radio')) indit();
});
if (window.jQuery) window.jQuery(document).on('changeShippingMethod', function () { indit(); });
if (teszt) setTimeout(function () {
var bb = document.getElementById('szall_mod_5630939'), zip = '';
try { zip = localStorage.getItem('bb_zip') || ''; } catch (e) { /* nincs */ }
naplo('indul', aktiv ? 'teszt: aktív' : 'nem aktív', '| választott:', kivalasztott() || '-',
'| Bí-Bor Futárszolgálat:', bb ? (bb.hasAttribute('data-bb-hidden') ? 'a lapon van, a „Szállítási mód ghost” script rejti' : 'a lapon van, látszik') : 'nincs a lapon (az UNAS nem kínálja)',
'| bb_zip:', zip || '-');
}, 1500);
indit();
}

function control() {
var nevE = document.querySelector('.order-control__shipping-name');
if (!nevE || keretben) return;
var kell = kellDij(szoveg(nevE));
var ellenorizve = false;
document.addEventListener('click', function (e) {
if (!ellenorizve && e.target.closest && e.target.closest('#button_next')) {
e.preventDefault(); e.stopImmediatePropagation();
}
}, true);
var fek = setTimeout(function () { ellenorizve = true; }, 8000);
var hely = nevE.closest('.order-control__box, .card, section') || nevE.parentElement;
kosarOlvas().then(function (k) {
if (!rosszak(k, kell).length) { clearTimeout(fek); ellenorizve = true; return; }
jelzes(hely, 'A csomagolási díj igazítása a szállítási módhoz…', 'tolt');
return szinkron(kell, k).then(function () {
if (!ujratoltheto()) throw new Error('túl sok újratöltés');
location.replace(ALAP + '/shop_order_control.php');
});
}).catch(function (e) {
clearTimeout(fek); ellenorizve = true;
naplo('hiba:', e && e.message);
});
}

function termek() {
var blokk = document.getElementById('artdet__service-plus');
var r = blokk && blokk.querySelector('input[name="service_plus"][value="' + SZOLG + '"]');
if (!r) return;
if (!r.checked) r.checked = true;
if (!aktiv || (document.documentElement.lang || 'hu').slice(0, 2) !== 'hu' || document.getElementById('bb-kartondij-info')) return;
var masik = [].some.call(blokk.querySelectorAll('input[name="service_plus"]'), function (i) {
return i.value && i.value !== SZOLG && !/none|^0$/.test(i.value) && !i.classList.contains('plus-service--none');
});
var sor = r.closest('.plus-service__item') || r.parentElement;
if (masik) sor.style.display = 'none'; else blokk.style.display = 'none';
var t = document.createElement('div');
t.id = 'bb-kartondij-info';
t.setAttribute('style', 'display:flex;gap:10px;align-items:flex-start;margin:10px 0 14px;padding:10px 14px;border:1px solid #e3e6ea;border-radius:10px;background:#f7f8f9;font-size:13.5px;line-height:1.45;color:#374151');
t.innerHTML = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.8" stroke-linejoin="round" style="flex:0 0 20px;margin-top:1px"><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/></svg><span><b>Csomagolás:</b> futárszállításnál +' + DIJ + ' / csomag. ' +
'<b>Személyes átvételnél és saját futárunkkal (Bí-Bor Futárszolgálat) díjmentes</b> — a pénztárban a szállítási mód szerint számoljuk.</span>';
blokk.parentNode.insertBefore(t, blokk.nextSibling);
}

kesz(lap === 'mods' ? mods : lap === 'control' ? control : termek);
})();
