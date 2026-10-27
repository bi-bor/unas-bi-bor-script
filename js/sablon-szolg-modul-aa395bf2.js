/* Idegen scriptek a sablonban — a burkoló (sablon-alap ág, TERMEKOLDAL.md › „Termékoldali scriptek a sablonban”,
   MINDENOLDAL.md). A csomagol.sh minden modul-csomag (minden oldali, adatlap, lista, pénztár) elejére teszi, utána a
   sablon/idegen/ fájljait VÁLTOZATLANUL, egyenként így burkolva:  window.bbIdegen('<név>', function () { …a fájl… });
   • Ha a régi UNAS Script még a lapon van (<script src="…/js/<név>-<ujjlenyomat>.js">, a fejrészben), a
     sablonbeli másolat NEM fut — az átmeneti együttfutásnál így semmi sem jelenik meg kétszer, és mindegy,
     melyik töltődik be előbb. A régi script kikapcsolása után a következő oldalbetöltéstől a sablonbeli fut.
     Az ellenőrzés a futás pillanatában van (addigra az egész lap beolvasva), így a csomag a lap elején is állhat.
   • Ugyanakkor fut, mint eddig a „defer” script: az oldal felépítése után (DOMContentLoaded-kor, a fejrész
     többi defer scriptje után; ha a csomag maga defer, rögtön) — így a body_end blokk adatai (pl. a
     BB_SZALL_TILT) is megvannak, és a modulok sorrendje az élővel azonos.
   • Ha a modul maga is a DOMContentLoaded-re iratkozik fel (pl. a nyelvválasztó: feltétel nélkül), de a
     beágyazott csomag miatt már az esemény közben fut, a feliratkozás elveszne (a futó eseményhez utólag
     hozzáadott figyelő nem hívódik meg) — ilyenkor a modul lefutása után rögtön meghívjuk. Defer csomagnál
     (az esemény előtt) nem nyúlunk hozzá.
   • Egy modul hibája nem állítja meg a többit (külön scriptként sem állította): a konzolba írjuk.
   Tilos a tartalomban: dupla kapcsos és dupla szögletes nyitó, kettőskereszt a nyitó kapcsos után. */
if (!window.bbIdegen) (function () {
  var dclVolt = document.readyState === 'complete';
  document.addEventListener('DOMContentLoaded', function () { dclVolt = true; });
  window.bbIdegen = function (nev, kod) {
    function regiAlapon() {
      try { return !!document.querySelector('script[src*="/js/' + nev + '-"]'); } catch (e) { return false; /* régi böngésző: futunk */ }
    }
    function fut() {
      if (regiAlapon()) return;
      var kesobb = [], celok = dclVolt ? [document, window] : [], eredeti = [], sajat = [];
      celok.forEach(function (c, i) {
        eredeti[i] = c.addEventListener;
        sajat[i] = Object.prototype.hasOwnProperty.call(c, 'addEventListener');
        c.addEventListener = function (tipus, fn) {
          if (tipus === 'DOMContentLoaded' && fn) { kesobb.push([c, fn]); return; }
          return eredeti[i].apply(this, arguments);
        };
      });
      try { kod.call(window); } catch (e) { if (window.console) console.error('[sablon] ' + nev + ':', e); }
      finally {
        celok.forEach(function (c, i) {
          try { if (sajat[i]) c.addEventListener = eredeti[i]; else delete c.addEventListener; } catch (e) { /* nem írható */ }
        });
      }
      kesobb.forEach(function (p) {
        try { if (typeof p[1] === 'function') p[1].call(p[0], new Event('DOMContentLoaded')); else if (p[1].handleEvent) p[1].handleEvent(new Event('DOMContentLoaded')); }
        catch (e) { if (window.console) console.error('[sablon] ' + nev + ':', e); }
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fut);
    else fut();
  };
})();

/* ── szolgaltatasok (sablon/uj/szolgaltatasok.js; eddig a /js/valaszthato-szolgaltatasok-….js UNAS Script) ── */
window.bbIdegen('valaszthato-szolgaltatasok', function () {
(function () {
var MINDENKI = true;
var SZOLG = {"nap60":{"sku":"SZ-60NAP","nev":"60 napos visszaküldés","ar":490,"cim":"60 napos visszaküldés","alcim":"14 helyett 60 napig visszaküldheti, indoklás nélkül","szoveg":"\u003Cp\u003E\u003Cb\u003EMeggondolta magát? Semmi gond.\u003C/b\u003E A törvényes 14 nap helyett \u003Cb\u003E60 napig\u003C/b\u003E visszaküldheti nekünk a terméket, indoklás nélkül, és visszatérítjük a vételárát.\u003C/p\u003E\u003Cul\u003E\u003Cli\u003EA termék legyen sértetlen, használatlan, hiánytalan, és az eredeti gyári csomagolásában érkezzen vissza; ezt beérkezéskor ellenőrizzük.\u003C/li\u003E\u003Cli\u003EA visszaküldés költsége Önt terheli.\u003C/li\u003E\u003Cli\u003EA termék minden darabjára vonatkozik, amelyre megvásárolta.\u003C/li\u003E\u003C/ul\u003E"}};
var KIZART = ["01000_2317","01116_1234","01222","01242_828","01242_828o","01254","01257","01417","02253_1350","02253_1350o","02398","02399","03027","03074","03085","04121","04122","04145","04147","04148","04149","04175","04176","04177","04179","04195","04196","04197","04198","04199","04204","04205","04207","04208","04212","04228","04230","04253","04294","04338","04344","04404","04412","04415","04452","04454","04462","04484","04507_150","04692","04737","04883_2317","04942","15802","15803","15845","15848","15849","16200","16201","16401","16416_320","16417_192","16427","16529","16638","16933","16934","16936","17075","17169","17170","17171","17172","17201","17202","17483","17576","17596","17626","17959","18080","18087","18365","18611","18724_1398","18746","18748","18786","18836","18943","18944","19152","19164","19246","19249","19312","19390","19444","19502","19504","19670","19677","19679","19682_1218","19682_1218o","19707","19716","19755","19880","19881","19882","19885","19886","19887","19888","19889","19891","19892","19937","19946","19949","19950","19952","20091","20140","20149","20168","20415","20494","20495","20519","20565","20609_1218","20734","20774_762","20832_100","20842","20852_762","20952","21004","21039","21100","21101","21102","21104","21105","21114","21148","21153","21193_100","21196_100","21240_1050","21314","21319","21408","21421","21422","21541","21550","21551","21555","21556","21631_1620","21769","21770","21782","21783","21785","21813","21834","21835","21924_1398","21971","22052","22053","22055","22113","22114","22198","22204","22343_960","22384","22385","22386","22387","22388","22389","22408","22409","22410","22701","22888","22889","22891","23862","23863","23864","23865","23867","24052_726","24052_726o","24719","24742","24813","24816","24817","24819","24820","24863","25101","25111","25377","25378","25379","25380","25418","25436","25437","25475","26607","26683","26684","26685","26734","26736","26784","26785","26789","26816","27056","27057","27147","27174","27211","27417","27437","27438","27439","27440","27457","27524","27567","27569","27570","27571","27572","27670","27671","28003","28004","28082_100","28142","28143","28144","28145","28192","28397","28413","28414","28418","28419","28421","28439","28830","28871_1176","29053","29054","29055","29056","29185","29341","29415_1","29416_1","29417_1","29419","29420_1","29421_1","29422_1","29424_1","29425_1","29426","29427_1","29429","29430_1","29431","29432","29433","29434","29435","29436","29437","29438","29439","29488","29489","29490","29491","29492","29493","29494","29495","29496","29997","30111","30112","30113","30114","30115","30116","30117","30118","30119","30120","30121","30122","30123","30124","30125","30126","30165","30166","30343","30556","30575","30709","30710","30711","31147","31148","31149","31150","31271_900","31433","31434","31435","31435_60","31481","31500","31501","31502","31503","31504","31505","31506","31507","31508","31509","31510","31511","31512","31513","31514","31515","31516","31517","31518","31519","31520","31521","31522","31523","31524","31526","31527","31528","31529","31530","31531","31532","31533","31535","31536","31537","31538","31539","31540","31541","31542","31543","31544","31545","31546","31547","31548","31549","31550","31551","31552","31553","31554","31555","31557","31589","31750","31900_100","31901_100","31975","32071_588","32071_784","32113","32969","32990_588","32990_588o","32990_784o","33098_500","33099_500","33133","33231_500","33233_500","33514","33807_489","33807_489o","33874_1169","33945","33946","33947","33963_1050","33963_1050o","33982_1050","33983_1002","34003_1360","34920_2100","34921_1020","34922_952","34923_609","34924_1092","34924_1092o","34926_1002","34927_1372","34927_1372o","34930_1232","34942_1350","34971","35207_726","35207_726o","35241_3246","35242_1056","35251_792","35277_1372","35338_1408","35339_792","35340_3246","35343_1176","35343_1176o","35362","35685","35726_980","35916","35928","35929","35930","35931","35933","35939_4158","36424_1092","36456_1176","36457_1176","36461_1056","36534_400","36562_1176","36602_1398","36612_1176","36615_1440","36617","36633_972","36653_1026","36663_1232","36664_1183","36673_1176","36681_1631","36695_1176","36696_699","36701_140","36793_1050","36794_1631","36807_1176","36817_1372","36823_1176","36837_1056","36838_1631","61024","61025","61591","61887_1176","61899_1624","61900_1624","61903_1631","61918_1440","61919_1440","61923_1631","61924_1631","61926_864","61926_864o","61927_1056","61928_700","61929_1002","61930_1350","61933","61934_1176","61975_1200","62021_999","62027_726o","62085_1350","62102_350","62138","62139","62140","62141","62142","62143","62145","62146","62147","62148","62149","62151","62152","62153","62155","62156","62157","62158","62159","62160","62161","62162","62163","62164","62165","62166","62173","64689","64690","64691","64692","64693","SZ-60NAP"];
var TOREKENY = [];
var MEZO = "9124156";
var PARAM = "Ehhez a termékhez";
var OLDAL = "/plusz-szolgaltatasok";
var KULCS = 'bbSzolg', SZAMLALO = 'bbSzolgUjra';
var SZEMELYES = /személyes átvétel/i;
var ALAP = location.protocol + '//' + location.host;

var teszt = false;
try {
var m = location.search.match(/[?&]szolgaltatas=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
teszt = localStorage.getItem(KULCS) === '1';
} catch (e) { /* tiltott tárhely */ }
if (!(MINDENKI || teszt)) return;
if ((document.documentElement.lang || 'hu').slice(0, 2) !== 'hu') return;
var ut = location.pathname;
var lap = /^\/(puttony|shop_cart\.php)/.test(ut) ? 'puttony'
: ut === '/shop_order_mods.php' ? 'mods'
: ut === '/shop_order_control.php' ? 'control'
: ut === '/shop_reg.php' ? 'adatlap'
: document.getElementById('page_artdet_content') ? 'termek' : '';
if (!lap) return;
var keretben = window.top !== window.self;
var kizart = {}, torekeny = {}, szolgSku = {};
KIZART.forEach(function (s) { kizart[s] = 1; });
TOREKENY.forEach(function (s) { torekeny[s] = 1; });
Object.keys(SZOLG).forEach(function (k) { szolgSku[SZOLG[k].sku] = k; });

function naplo() {
if (teszt && window.console) console.log.apply(console, ['[Szolgáltatások]'].concat([].slice.call(arguments)));
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
function ft(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft'; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

function valaszthato(sku) {
if (!sku || kizart[sku] || szolgSku[sku]) return [];
return Object.keys(SZOLG).filter(function (k) { return !SZOLG[k].csak_torekeny || torekeny[sku]; });
}

var CSS = '#bb-szolg{margin:12px 0 14px;padding:12px 14px 6px;border:1px solid #e3e6ea;border-radius:12px;background:#fff;color:#374151;font-size:14px;line-height:1.45}' +
'#bb-szolg .bb-szolg-cim{margin:0 0 6px;font-size:15px;font-weight:700;color:#1f2937}' +
'#bb-szolg .bb-szolg-sor{border-top:1px solid #f0f1f3;padding:8px 0}' +
'#bb-szolg .bb-szolg-sor:first-of-type{border-top:0}' +
'#bb-szolg label{display:flex;gap:10px;align-items:flex-start;margin:0;cursor:pointer;font-weight:400}' +
'#bb-szolg input{flex:0 0 18px;width:18px;height:18px;margin:2px 0 0;accent-color:#24721a;cursor:pointer}' +
'#bb-szolg .bb-szolg-nev{display:block;font-weight:600;color:#1f2937}' +
'#bb-szolg .bb-szolg-al{display:block;font-size:13px;color:#6b7280}' +
'#bb-szolg .bb-szolg-ar{margin-left:auto;white-space:nowrap;font-weight:600;color:#1f2937}' +
'#bb-szolg .bb-szolg-ar small{display:block;font-weight:400;font-size:12px;color:#6b7280;text-align:right}' +
'#bb-szolg .bb-szolg-i{flex:0 0 22px;width:22px;height:22px;margin:0 0 0 2px;padding:0;border:1px solid #cfd4da;border-radius:50%;background:#fff;color:#4b5563;font:600 13px/20px Georgia,serif;cursor:pointer}' +
'#bb-szolg .bb-szolg-i[aria-expanded="true"]{background:#24721a;border-color:#24721a;color:#fff}' +
'#bb-szolg .bb-szolg-info{margin:8px 0 2px 28px;padding:10px 12px;border-radius:10px;background:#f3faf0;font-size:13.5px}' +
'#bb-szolg .bb-szolg-info p{margin:0 0 6px}#bb-szolg .bb-szolg-info ul{margin:0 0 6px;padding-left:18px}#bb-szolg .bb-szolg-info li{margin:2px 0}' +
'#bb-szolg .bb-szolg-info a{color:#24721a;text-decoration:underline}' +
'#bb-szolg .bb-szolg-uzenet{margin:4px 0 6px;font-size:13px;color:#24721a}' +
'#bb-szolg .bb-szolg-uzenet.hiba{color:#8a1f11}';

function termek() {
var skuE = document.querySelector('#page_artdet_content .artdet__sku-value');
var sku = skuE && skuE.textContent.trim();
var lista = valaszthato(sku);
var hely = document.querySelector('#page_artdet_content .artdet__cart');
if (!lista.length || !hely || document.getElementById('bb-szolg')) return;
var nevE = document.querySelector('#page_artdet_content h1, .artdet__name');
var termekNev = nevE ? nevE.textContent.replace(/\s+/g, ' ').trim() : '';
var egysegE = document.querySelector('#page_artdet_content .artdet__cart-unit');
var egyseg = egysegE ? egysegE.textContent.trim() : '';
var per = egyseg && egyseg !== 'db' ? '/ ' + esc(egyseg) : 'darabonként';
var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

var doboz = document.createElement('div');
doboz.id = 'bb-szolg';
doboz.innerHTML = '<p class="bb-szolg-cim">Választható szolgáltatásaink</p>' + lista.map(function (k) {
var s = SZOLG[k];
return '<div class="bb-szolg-sor"><div style="display:flex;gap:8px;align-items:flex-start">' +
'<label><input type="checkbox" data-szolg="' + k + '"><span><span class="bb-szolg-nev">' + esc(s.cim) + '</span>' +
'<span class="bb-szolg-al">' + esc(s.alcim) + '</span></span></label>' +
'<span class="bb-szolg-ar">+' + ft(s.ar) + '<small>' + per + '</small></span>' +
'<button type="button" class="bb-szolg-i" aria-expanded="false" aria-controls="bb-szolg-' + k + '" aria-label="Mit tartalmaz: ' + esc(s.cim) + '">i</button></div>' +
'<div class="bb-szolg-info" id="bb-szolg-' + k + '" hidden>' + s.szoveg +
'<p><a href="' + OLDAL + '" target="_blank" rel="noopener">A részletes feltételek</a></p></div></div>';
}).join('') + '<div class="bb-szolg-uzenet" role="status" aria-live="polite"></div>';
hely.parentNode.insertBefore(doboz, hely);
[].forEach.call(doboz.querySelectorAll('.bb-szolg-i'), function (b) {
b.addEventListener('click', function () {
var nyitva = b.getAttribute('aria-expanded') === 'true';
b.setAttribute('aria-expanded', nyitva ? 'false' : 'true');
document.getElementById(b.getAttribute('aria-controls')).hidden = nyitva;
});
});
var uzenet = doboz.querySelector('.bb-szolg-uzenet');

var jq = window.jQuery;
if (!jq) return;
jq(document).on('addToCart', function (e, adat) {
var hiba = adat && adat.error;
if (!adat || (hiba && (!Array.isArray(hiba) || hiba.length)) || String(adat.sku) !== sku) return;
var jelolt = [].filter.call(doboz.querySelectorAll('input[data-szolg]'), function (i) { return i.checked; });
if (!jelolt.length) return;
var db = Math.max(1, Math.round(Number(adat.qty) || 1));
var mezo = sku + ' – ' + (termekNev || adat.name || '');
Promise.all(jelolt.map(function (i) {
var s = SZOLG[i.getAttribute('data-szolg')];
return hozzaad(s.sku, db, mezo).then(function () { return s.cim; });
})).then(function (nevek) {
uzenet.className = 'bb-szolg-uzenet';
uzenet.textContent = '✓ A Puttonyba került: ' + nevek.join(', ') + ' (' + db + ' db).';
jelolt.forEach(function (i) { i.checked = false; });
if (typeof window.cart_refresh === 'function') try { window.cart_refresh(); } catch (x) { /* nem baj */ }
}).catch(function (x) {
naplo('hiba:', x && x.message);
uzenet.className = 'bb-szolg-uzenet hiba';
uzenet.textContent = 'A szolgáltatást nem sikerült a Puttonyba tenni. Kérjük, próbálja újra, vagy jelezze nekünk a rendelés megjegyzésében.';
});
});
}

function hozzaad(sku, db, mezo) {
var adat = [ ['get_ajax', '1'], ['result_type', 'json'], ['lang_master', 'hu'], ['action', 'add'],
['sku', sku], ['qty', String(db)] ];
if (mezo) adat.push(['product_param', MEZO + '¤' + mezo.slice(0, 200)]);
return post('/shop_ajax/ajax_cart.php', adat)
.then(function (r) { return r.json(); })
.then(function (j) { if (!(j && j.cart_success)) throw new Error('a bolt nem tette a puttonyba: ' + sku); });
}

function kosarBol(h) {
var d = typeof h === 'string' ? new DOMParser().parseFromString(h, 'text/html') : h;
var f = d.forms.form_temp;
if (!f) return { dbk: [], sorok: [] };
var dbk = [].slice.call(f.querySelectorAll('input[name="db[]"]'));
var sorok = [].slice.call(d.querySelectorAll('.cart-item.cart-product-item[data-sku]')).map(function (s) {
var db = s.querySelector('input[name="db[]"]');
var torol = s.querySelector('[onclick*="delete_artm"]');
var tm = torol ? /delete_artm\('(\d+)'\)/.exec(torol.getAttribute('onclick')) : null;
var sku = s.getAttribute('data-sku'), cel = '';
if (szolgSku[sku]) {
var szoveg = s.textContent.replace(/\s+/g, ' ');
var i = szoveg.indexOf(PARAM);
var mt = i > -1 ? /^[:\s]*([A-Za-z0-9_\-]+) – /.exec(szoveg.slice(i + PARAM.length)) : null;
cel = mt ? mt[1] : '';
}
return { sku: sku, cel: cel, i: dbk.indexOf(db), db: db ? Number(db.value) : 0, tetel: tm ? tm[1] : '' };
}).filter(function (s) { return s.i > -1; });
return { dbk: dbk.map(function (i) { return i.value; }), sorok: sorok };
}
function kosarOlvas() {
return fetch(ALAP + '/puttony', { credentials: 'same-origin', cache: 'no-store' })
.then(function (r) { return r.text(); }).then(kosarBol);
}
function termekDb(k, sku) {
return k.sorok.filter(function (s) { return s.sku === sku; }).reduce(function (n, s) { return n + s.db; }, 0);
}
function elteres(k, szem) {
for (var i = 0; i < k.sorok.length; i++) {
var s = k.sorok[i];
var kulcs = szolgSku[s.sku];
if (szem && kulcs && SZOLG[kulcs].csak_szallitas && s.db > 0) return { sor: s, uj: 0 };
if (!szolgSku[s.sku] || !s.cel) continue;
var n = termekDb(k, s.cel);
var tobbi = k.sorok.filter(function (t) { return t !== s && t.sku === s.sku && t.cel === s.cel; })
.reduce(function (x, t) { return x + t.db; }, 0);
var max = Math.max(0, n - tobbi);
if (s.db > max) return { sor: s, uj: max };
}
return null;
}
function urlap(k, muvelet, tetel, sor, uj) {
var adat = [ ['action2', muvelet], ['item', tetel], ['package_offer_cart_id', ''] ];
k.dbk.forEach(function (v, i) { adat.push(['db[]', sor && i === sor.i ? String(uj) : v]); });
return post('/puttony', adat).then(function (r) { return r.text(); }).then(kosarBol);
}
function lepes(k, e) {
naplo('igazítás:', e.sor.sku, e.sor.cel, e.sor.db, '→', e.uj);
return e.uj ? urlap(k, 'modify', '', e.sor, e.uj) : urlap(k, 'delete', e.sor.tetel);
}
function szinkron(k, szem) {
var kor = 0;
function tovabb(akt) {
var e = elteres(akt, szem);
if (!e) return { valtozott: kor > 0, utana: akt };
if (++kor > 8) throw new Error('túl sok lépés');
return lepes(akt, e).then(tovabb);
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
jeloles();
if (!elteres(k)) return;
szinkron(k).then(function (e) {
if (e.valtozott && ujratoltheto()) location.replace(ALAP + '/puttony');
}).catch(function (e) { naplo('hiba:', e && e.message); });
}
function jeloles() {
[].forEach.call(document.querySelectorAll('.cart-item.cart-product-item[data-sku]'), function (s) {
var kulcs = szolgSku[s.getAttribute('data-sku')];
if (!kulcs || s.querySelector('.bb-szolg-sorinfo')) return;
var nev = s.querySelector('.cart-item__name-link') || s.querySelector('.cart-item__name');
var t = document.createElement('div');
t.className = 'bb-szolg-sorinfo';
t.setAttribute('style', 'margin:4px 0 0;font-size:13px;line-height:1.4;color:#4b5563');
t.innerHTML = esc(SZOLG[kulcs].alcim) + '. <a href="' + OLDAL + '" target="_blank" rel="noopener" style="color:#24721a;text-decoration:underline">Feltételek</a>';
if (nev && nev.parentNode) nev.parentNode.insertBefore(t, nev.nextSibling);
});
}

function adatlap() {
kosarOlvas().then(function (k) {
if (!elteres(k)) return;
return szinkron(k).then(function (e) { if (e.valtozott) valtozott(); });
}).catch(function (e) { naplo('hiba:', e && e.message); });
}
function szolgOsszeg(k) {
return k.sorok.reduce(function (n, s) { var kulcs = szolgSku[s.sku];
return n + (kulcs ? SZOLG[kulcs].ar * s.db : 0); }, 0);
}
function szemelyesNev(nev) { return SZEMELYES.test(nev || ''); }

function mods() {
var f = document.forms.form_order;
var hely = document.querySelector('.order-left-content');
if (!f) { rendeles(); return; }
var fut = false, ujra = false, ido = null, ellenorizve = false;
document.addEventListener('click', function (e) {
if (!ellenorizve && e.target.closest && e.target.closest('#button_next')) {
e.preventDefault(); e.stopImmediatePropagation();
}
}, true);
var fek = setTimeout(function () { ellenorizve = true; }, 8000);
function kivalasztott() {
var r = f.querySelector('.szall_radio:checked');
if (!r) return '';
var doboz = document.getElementById('szall_mod_' + r.id.replace('szall_id_', ''));
var n = doboz && doboz.querySelector('.order-mods__name');
return n ? n.textContent.replace(/\s+/g, ' ').trim() : '';
}
function jelzes(szoveg) {
var j = document.getElementById('bb-szolg-jelzes');
if (!szoveg) { if (j) j.remove(); return; }
if (!hely) return;
if (!j) {
j = document.createElement('div');
j.id = 'bb-szolg-jelzes';
j.setAttribute('style', 'margin:10px 0;padding:10px 14px;border:1px solid #b9e0a8;border-radius:10px;background:#f3faf0;color:#24721a;font-size:14px;line-height:1.45');
hely.insertBefore(j, hely.firstChild);
}
j.textContent = szoveg;
}
function vege() {
fut = false;
if (ujra) { ujra = false; ellenoriz(); return; }
clearTimeout(fek); ellenorizve = true;
}
function ellenoriz() {
if (fut) { ujra = true; return; }
fut = true;
var szem = szemelyesNev(kivalasztott());
Promise.resolve(window.bbKartondij).catch(function () { /* nem baj */ }).then(kosarOlvas).then(function (k) {
if (!elteres(k, szem)) return;
var elotte = szolgOsszeg(k);
return szinkron(k, szem).then(function (e) {
var kul = szolgOsszeg(e.utana) - elotte;
var raw = document.querySelector('.total-price-raw');
if (raw && kul && typeof window.calculate_summary === 'function') {
raw.textContent = String(Math.round((parseFloat(raw.textContent) + kul) * 100) / 100);
window.calculate_summary();
} else if (kul && !keretben && ujratoltheto()) {
location.replace(ALAP + '/shop_order_mods.php' + location.search);
return;
}
valtozott();
if (szem) jelzes('✓ Személyes átvételnél nincs szállítás, ezért a szállítási törésgaranciát levettük a puttonyból.');
});
}).catch(function (e) { naplo('hiba:', e && e.message); }).then(vege, vege);
}
function indit() {
ellenorizve = false;
clearTimeout(ido);
ido = setTimeout(ellenoriz, 400);
}
f.addEventListener('change', function (e) {
if (e.target.classList && e.target.classList.contains('szall_radio')) indit();
});
if (window.jQuery) window.jQuery(document).on('changeShippingMethod', indit);
indit();
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
var nevE = document.querySelector('.order-control__shipping-name');
var szem = lap === 'control' && nevE && szemelyesNev(nevE.textContent);
kosarOlvas().then(function (k) {
if (!elteres(k, szem)) { enged(); return; }
return szinkron(k, szem).then(function (e) {
if (!e.valtozott) { enged(); return; }
if (keretben) { valtozott(); enged(); return; }
if (!ujratoltheto()) { enged(); return; }
location.replace(location.href);
});
}).catch(function (e) { enged(); naplo('hiba:', e && e.message); });
}

kesz(lap === 'termek' ? termek : lap === 'puttony' ? puttony : lap === 'adatlap' ? adatlap : lap === 'mods' ? mods : rendeles);
})();

});
