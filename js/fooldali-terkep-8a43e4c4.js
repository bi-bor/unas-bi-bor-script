(function () {
var MINDENKI = false;
var KULCS = 'bbTerkep';
var allapot = null;
try {
var m = location.search.match(/[?&]terkep=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { allapot = null; }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
if ((document.documentElement.lang || 'hu').slice(0, 2) !== 'hu') return;

var ALAP = 'https://cdn.jsdelivr.net/gh/bi-bor/unas-bi-bor-script@3a6b0db272159d2aeaf62ee678a2007231a6f720/terkep/';
var GOMBOK = [ {"nev":"Pécs","honnan":"Pécsről","km":34,"perc":40,"ut":"s|b\u005bc`cJB_Aj@GSkC\u007dBqJdDcEpDoCfEMxEnA`Fq@bDkCn@iBrBm@UgHlCqAtL\u007dL`XeR|ImA~V\u007dPh@gInB_@j@\u007bAXqJlAeFO_D|AcBD\u007d@"},{"nev":"Mohács","honnan":"Mohácsról","km":29,"perc":33,"ut":"\u007dha\u005bozkJo@RqA`c@dAzDI~BpCvS|@tVxCvDvAhD?bAjB_@`@o@vAlDfN`Qv@|GbBq@fCj@dFqArB?`F\u007bBfIwAzBjIFnBD\u007d@"},{"nev":"Siklós","honnan":"Siklósról","km":14,"perc":15,"ut":"sp~ZqkdJBqLxAgp@QkJsBmHgFcI\u007dBmG"},{"nev":"Balaton","honnan":"A Balatontól (Siófok)","km":143,"perc":152,"ut":"eds\u005bur_JbBzBvj@mb@jLiTjZiD`FqI|Fr@fa@yPhGlDrj@uOtDbDrGmDw@~DjOpSlL\u007bBxZnGpZc@h\u005d~DvWtNh`@\u007bBbUlP`Ks@|@cGjSoAdCch@x\u005dkO|AePpm@mT~\u005d`AtIkHUgHbQoO~z@qf@`K\u007di@"},{"nev":"Zala","honnan":"Zalából (Zalaegerszeg)","km":237,"perc":211,"ut":"_zq\u005bg~gIiB\u007dGxEkRiGwRnK_Fc@kWdGaHQwHyJ_T|PmVjBs_@tGiEmE\u007dJnGqMxLqF^iOzPyErQ\u007bOfGyPo@cZbMsNuGqNuJq~@\\ym@a`@ko@sF_o@kOy^hc@_LzUfD~kBa^j^bIzMjSd`@\u007bCaBeKdK\u007bJhEad@`_@cK`BkMjKwHn@\u007bQdMsKZgx@nJsZrSwAbC_h@t\u005diONoMzVgMdX\u007bHb_@f@pHqGUgHbQoO~z@qf@`K\u007di@"},{"nev":"Budapest","honnan":"Budapestről","km":213,"perc":150,"ut":"eu~\u005b\u007dzrJfk@zVjH`ZvMcFhQrf@pW~Sx\u007bAzi@rSqCnbAky@neCvZ`~@kH`X~c@~r@Ebv@d\u005dz\\ze@pf@_\u005d~_@y@~TtTteApQhr@f`A`hA|DbBdZt^bj@pb@kHhC|J"} ];
var EMBLEMA = 'https://shop.unas.hu/shop_ordered/63361/pic/kepek/bba_logo.png';
var ML = 'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/';
var UZLET = [18.4620957, 45.8721203];  /* a Google pontja a címre (a MOL kút előtt) */
var CIM = 'Bí-Bor-Ász, 7773 Villány, Szent István u. 35.';
var KORNYEK = [ [18.21, 45.83], [18.71, 46.09] ];
var lassan = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
function mobil() { return !!(window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches); }
function ido(p) {
if (p < 60) return p + ' perc';
var o = Math.floor(p / 60), r = Math.round(p - o * 60);
return r ? o + ' ó ' + r + ' p' : o + ' óra';
}
function utLink(nev) {
return 'https://www.google.com/maps/dir/?api=1' + (nev ? '&origin=' + encodeURIComponent(nev + ', Magyarország') : '')
+ '&destination=' + encodeURIComponent(CIM);
}

function dekodol(s) {
var pts = [], i = 0, lat = 0, lon = 0;
while (i < s.length) {
for (var k = 0; k < 2; k++) {
var b, sh = 0, v = 0;
do { b = s.charCodeAt(i++) - 63; v |= (b & 31) << sh; sh += 5; } while (b >= 32);
var d = (v & 1) ? ~(v >> 1) : (v >> 1);
if (k === 0) lat += d; else lon += d;
}
pts.push([lon / 1e4, lat / 1e4]);
}
return pts;
}

function nyitvatartas() {
var REND = [null, [450, 990], [450, 990], [450, 990], [450, 990], [450, 990], [480, 720] ];
var NAP = ['vasárnap', 'hétfőn', 'kedden', 'szerdán', 'csütörtökön', 'pénteken', 'szombaton'];
var most;
try { most = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Budapest' })); } catch (e) { most = new Date(); }
var nap = most.getDay(), perc = most.getHours() * 60 + most.getMinutes(), r = REND[nap];
function hhmm(x) { return Math.floor(x / 60) + ':' + ('0' + (x % 60)).slice(-2); }
if (r && perc >= r[0] && perc < r[1]) return '<span class="bbt-nyitva">Nyitva ' + hhmm(r[1]) + '-ig</span>';
if (r && perc < r[0]) return '<span class="bbt-zarva">Zárva</span> · ma ' + hhmm(r[0]) + '-kor nyitunk';
for (var i = 1; i <= 7; i++) {
var n = (nap + i) % 7;
if (REND[n]) return '<span class="bbt-zarva">Zárva</span> · ' + (i === 1 ? 'holnap' : NAP[n]) + ' ' + hhmm(REND[n][0]) + '-kor nyitunk';
}
return '';
}

var iframe = document.querySelector('iframe[data-src*="maps.google"], iframe[src*="maps.google"]');
if (!iframe) return;
var hely = iframe.closest('.html-text') || iframe.parentNode;
var blokk = iframe.closest('.banner_start_6__slide');
if (blokk) blokk.classList.add('bbt-blokk');

var stilus = document.createElement('style');
stilus.id = 'bb-terkep';
stilus.textContent = ".banner_start_6--slide-3.bbt-blokk{flex:0 0 100%;max-width:100%}.bbt{font-family:inherit;color:#221f1b}.bbt *{box-sizing:border-box}.bbt-fej{display:flex;align-items:flex-end;justify-content:space-between;gap:8px 24px;flex-wrap:wrap;margin-bottom:18px}.bbt-fej .h1{margin:0}.bbt-alcim{margin:0 0 6px;font-size:15px;color:#6b645a}.bbt-sor{position:relative;z-index:5;display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px}.bbt-kerdes{font-size:14px;font-weight:600;color:#6b645a;margin-right:4px}.bbt-gombok{display:flex;gap:8px;flex-wrap:wrap}.bbt-chip{display:inline-flex;align-items:center;gap:7px;height:44px;padding:0 16px;border-radius:999px;border:1px solid #e2dbcf;background:#fff;color:#221f1b;font:600 14px/1 inherit;font-family:inherit;cursor:pointer;white-space:nowrap;transition:background-color .2s,border-color .2s,color .2s}.bbt-chip:hover{border-color:#2a8511}.bbt-chip span{font-weight:500;color:#6b645a}.bbt-chip.bbt-on{background:#2a8511;border-color:#2a8511;color:#fff}.bbt-chip.bbt-on span{color:#dff0d6}.bbt-kereso{position:relative;flex:1 1 240px;min-width:220px}.bbt-kereso svg{position:absolute;left:14px;top:13px;pointer-events:none}.bbt-kereso input{width:100%;height:44px;padding:0 14px 0 40px;border-radius:999px;border:1px solid #e2dbcf;background:#fff;font-size:14px;font-family:inherit;color:#221f1b;outline:none;margin:0;box-shadow:none}.bbt-kereso input:focus{border-color:#2a8511;box-shadow:0 0 0 3px rgba(42,133,17,.15)}.bbt-lista{position:absolute;left:0;right:0;top:50px;margin:0;padding:0;list-style:none;border-radius:14px;background:#fff;box-shadow:0 12px 30px rgba(34,31,27,.16);border:1px solid #ece6dc;overflow:hidden;display:none}.bbt-lista.bbt-nyitva{display:block}.bbt-lista button{display:flex;justify-content:space-between;gap:12px;width:100%;padding:11px 14px;border:0;background:#fff;font-size:14px;font-family:inherit;color:#221f1b;text-align:left;cursor:pointer}.bbt-lista button:hover,.bbt-lista button.bbt-akt{background:#f3f8f0}.bbt-lista b{font-weight:600}.bbt-lista span{color:#6b645a;white-space:nowrap}.bbt-lista p{margin:0;padding:12px 14px;font-size:13px;color:#6b645a}.bbt-terkep{position:relative;height:560px;border-radius:20px;overflow:hidden;background:#f1f0ed;box-shadow:0 1px 0 #e2dbcf,0 12px 40px rgba(34,31,27,.08)}.bbt .bbt-vaszon{position:absolute!important;left:0;top:0;width:100%;height:100%}.bbt-kartya{position:absolute;left:24px;top:24px;z-index:3;width:330px;padding:22px;border-radius:18px;background:#fff;box-shadow:0 10px 30px rgba(34,31,27,.14);display:flex;flex-direction:column;gap:14px}.bbt-kfej{display:flex;align-items:center;gap:12px}.bbt-kfej img{width:48px;height:48px;display:block}.bbt-nev{font-size:18px;font-weight:800;color:#8e1b21;line-height:1.2}.bbt-kicsi{font-size:12px;color:#6b645a}.bbt-adat{display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.4}.bbt-adat div{display:flex;gap:10px;align-items:flex-start}.bbt-adat svg{flex:none;margin-top:1px}.bbt-adat a{color:#221f1b;text-decoration:none;font-weight:600}.bbt-nyitva{color:#1f6a0c;font-weight:700}.bbt-zarva{color:#9a3412;font-weight:700}.bbt-gombsor{display:flex;gap:8px}.bbt-gomb{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:44px;padding:0 18px;border-radius:12px;font-size:14px;font-weight:700;text-decoration:none!important;text-transform:uppercase;letter-spacing:.3px;white-space:nowrap}.bbt-zold{background:#2a8511;color:#fff!important;flex:1 1 auto}.bbt-zold:hover{background:#1f6a0c}.bbt-vonal{background:#fff;color:#221f1b!important;border:1px solid #e2dbcf}.bbt-vonal:hover{border-color:#2a8511;color:#1f6a0c!important}.bbt-sav{position:absolute;left:24px;bottom:24px;z-index:3;display:flex;align-items:center;gap:16px;padding:10px 10px 10px 22px;border-radius:999px;background:#fff;box-shadow:0 10px 30px rgba(34,31,27,.16);white-space:nowrap;opacity:0;transform:translateY(14px);pointer-events:none;transition:opacity .4s,transform .4s}.bbt-sav.bbt-latszik{opacity:1;transform:none;pointer-events:auto}.bbt-szoveg{display:flex;align-items:center;gap:16px}.bbt-sav b{font-size:15px}.bbt-sav .bbt-ido{font-size:14px;color:#6b645a}.bbt-sav .bbt-haz{font-size:14px;color:#1f6a0c;font-weight:600}.bbt-sav .bbt-gomb{height:40px;border-radius:999px}.bbt-rovid{display:none}.bbt-jelolo{position:relative;width:56px;height:56px;cursor:default}.bbt-jelolo::before{content:\"\";position:absolute;inset:-10px;border-radius:50%;background:rgba(42,133,17,.16);animation:bbt-pulzus 3s ease-out infinite}.bbt-jelolo i{position:absolute;inset:0;border-radius:50%;background:#fff;box-shadow:0 5px 12px rgba(34,31,27,.28);padding:4px}.bbt-jelolo img{width:48px;height:48px;display:block}.bbt-jelolo em{position:absolute;left:64px;top:14px;padding:6px 12px;border-radius:999px;background:#fff;box-shadow:0 3px 10px rgba(34,31,27,.16);font-style:normal;font-size:13px;font-weight:700;color:#8e1b21;white-space:nowrap}@keyframes bbt-pulzus{0%{transform:scale(.75);opacity:.8}100%{transform:scale(1.6);opacity:0}}.bbt-traktor{width:34px;height:28px}.bbt-traktor svg{display:block;transform-origin:50% 50%;transition:opacity .25s}.bbt-traktor.bbt-tunik svg{opacity:0}.bbt-traktor.bbt-bal svg{transform:scaleX(-1)}.bbt-kerek{transform-box:fill-box;transform-origin:center;animation:bbt-forog .6s linear infinite}@keyframes bbt-forog{to{transform:rotate(360deg)}}.bbt .maplibregl-ctrl-group{border-radius:10px;box-shadow:0 4px 14px rgba(34,31,27,.16)}.bbt .maplibregl-ctrl-attrib{font-size:10px;background:rgba(255,255,255,.7)}.bbt .maplibregl-cooperative-gesture-screen{font-family:inherit;font-size:16px}@media (max-width:767.98px){.bbt-sor{display:block}.bbt-kerdes{display:block;margin:0 0 8px;font-size:13px}.bbt-gombok{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin:0 -15px 10px;padding:0 15px}.bbt-gombok::-webkit-scrollbar{display:none}.bbt-chip{flex:none}.bbt-terkep{height:400px;border-radius:18px}.bbt-kartya{position:static;width:auto;margin-top:16px;padding:18px}.bbt-sav{left:12px;right:12px;bottom:28px;border-radius:16px;padding:10px 10px 10px 16px;white-space:normal;gap:10px}.bbt-sav .bbt-szoveg{flex:1 1 auto;display:flex;flex-direction:column;gap:2px;min-width:0}.bbt-sav .bbt-gomb{height:40px;padding:0 14px;font-size:13px}.bbt-sav b{font-size:14px}.bbt-sav .bbt-ido,.bbt-sav .bbt-haz{font-size:12px}.bbt-hosszu{display:none}.bbt-rovid{display:inline}.bbt .maplibregl-ctrl-bottom-right .maplibregl-ctrl-group{display:none}.bbt-jelolo em{display:none}}@media (prefers-reduced-motion:reduce){.bbt-jelolo::before,.bbt-kerek{animation:none}.bbt-chip,.bbt-sav{transition:none}}.bbt a::before,.bbt a::after{content:none!important;display:none!important}.bbt .bbt-gomb{align-items:center!important;line-height:1!important}.bbt .bbt-gomb svg{flex:none}.bbt .bbt-adat a{color:#221f1b!important}.bbt .bbt-lista li{list-style:none!important;margin:0!important;padding:0!important;line-height:1.3!important}.bbt .bbt-lista li::marker{content:none}.bbt .bbt-lista li::before{content:none!important;display:none!important}";
(document.head || document.documentElement).appendChild(stilus);
document.documentElement.setAttribute('data-bb-terkep', '2026-10-09 12:59:53');

var IKON = {
hely: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b645a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
ora: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b645a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
tel: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
nyil: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-8-8 18-2-8-8-2z"/></svg>',
keres: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8f877b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>'
};
var TRAKTOR = '<svg width="34" height="28" viewBox="0 0 34 28"><rect x="4" y="9" width="26" height="9" rx="2" fill="#2a8511"/><rect x="6" y="1" width="12" height="11" rx="1.5" fill="#2a8511"/>'
+ '<rect x="8.5" y="3" width="7" height="5.5" rx="1" fill="#e3f1db"/><rect x="24" y="2" width="2.2" height="8" fill="#45423e"/>'
+ '<circle class="bbt-kerek" cx="10" cy="19.5" r="7.5" fill="#2b2724" stroke="#45423e" stroke-width="2" stroke-dasharray="2.5 1.8"/><circle cx="10" cy="19.5" r="2.8" fill="#f2b01e"/>'
+ '<circle class="bbt-kerek" cx="26" cy="22" r="5" fill="#2b2724" stroke="#45423e" stroke-width="2" stroke-dasharray="2 1.5"/><circle cx="26" cy="22" r="1.8" fill="#f2b01e"/></svg>';

var cim = hely.querySelector('.h1');
var cimHtml = cim ? cim.outerHTML : '<p class="h1"><strong>Ahol megtalálsz bennünket</strong></p>';
var gombHtml = GOMBOK.map(function (g, i) {
return '<button type="button" class="bbt-chip" data-i="' + i + '">' + esc(g.nev) + ' <span>' + esc(ido(g.perc)) + '</span></button>';
}).join('');
var gyoker = document.createElement('div');
gyoker.className = 'bbt';
gyoker.innerHTML =
'<div class="bbt-fej">' + cimHtml + '<p class="bbt-alcim">Minden, amire egy borásznak szüksége lehet.</p></div>'
+ '<div class="bbt-sor"><span class="bbt-kerdes">Honnan jössz?</span><div class="bbt-gombok">' + gombHtml + '</div>'
+ '<div class="bbt-kereso">' + IKON.keres
+ '<input type="text" autocomplete="off" placeholder="Vagy írd be a településed…" aria-label="Település" role="combobox" aria-expanded="false" aria-controls="bbt-lista">'
+ '<ul class="bbt-lista" id="bbt-lista" role="listbox"></ul></div></div>'
+ '<div class="bbt-terkep"><div class="bbt-vaszon"></div>'
+ '<div class="bbt-sav" aria-live="polite"><div class="bbt-szoveg"><b></b><span class="bbt-ido"></span><span class="bbt-haz"><span class="bbt-hosszu">vagy rendeld meg, házhoz visszük</span><span class="bbt-rovid">vagy házhoz visszük</span></span></div>'
+ '<a class="bbt-gomb bbt-zold" target="_blank" rel="noopener" href="#"><span class="bbt-hosszu">Útvonal indítása</span><span class="bbt-rovid">Indítás</span></a></div></div>'
+ '<div class="bbt-kartya"><div class="bbt-kfej"><img src="' + EMBLEMA + '" alt="" width="48" height="48">'
+ '<div><div class="bbt-nev">Bí-Bor-Ász</div><div class="bbt-kicsi">Borászati szaküzlet és webáruház</div></div></div>'
+ '<div class="bbt-adat"><div>' + IKON.hely + '<span>7773 Villány, Szent István u. 35.</span></div>'
+ '<div>' + IKON.ora + '<span>' + nyitvatartas() + '<br>H–P 7:30–16:30 · Szo 8:00–12:00</span></div>'
+ '<div>' + IKON.tel.replace('currentColor', '#6b645a') + '<a href="tel:+36306637381">+36 30 663 7381</a></div></div>'
+ '<div class="bbt-gombsor"><a class="bbt-gomb bbt-zold" target="_blank" rel="noopener" href="' + esc(utLink('')) + '">' + IKON.nyil + 'Útvonaltervezés</a>'
+ '<a class="bbt-gomb bbt-vonal" href="tel:+36306637381" aria-label="Hívás">' + IKON.tel + '</a></div></div>';
hely.innerHTML = '';
hely.appendChild(gyoker);

var dobozT = gyoker.querySelector('.bbt-terkep');
var vaszon = gyoker.querySelector('.bbt-vaszon');
var kartya = gyoker.querySelector('.bbt-kartya');
var sav = gyoker.querySelector('.bbt-sav');
var input = gyoker.querySelector('.bbt-kereso input');
var lista = gyoker.querySelector('.bbt-lista');
function kartyaHelye() { (mobil() ? dobozT.parentNode : dobozT).appendChild(kartya); }
if (!mobil()) dobozT.appendChild(kartya);
window.addEventListener('resize', kartyaHelye);

var terkep = null, kesz = false, varo = null, betoltes = false;
function betolt() {
if (betoltes) return;
betoltes = true;
var l = document.createElement('link');
l.rel = 'stylesheet'; l.href = ML + 'maplibre-gl.css';
document.head.appendChild(l);
var s = document.createElement('script');
s.src = ML + 'maplibre-gl.js'; s.async = true;
s.onload = indit;
document.head.appendChild(s);
}
function parna() {
return mobil() ? { top: 40, bottom: 130, left: 30, right: 30 } : { top: 50, bottom: 110, left: 390, right: 70 };
}
function indit() {
var ml = window.maplibregl;
if (!ml) return;
terkep = new ml.Map({
container: vaszon, style: ALAP + 'stilus.json', bounds: KORNYEK, fitBoundsOptions: { padding: parna() },
cooperativeGestures: true, dragRotate: false, pitchWithRotate: false, touchPitch: false,
attributionControl: { compact: true },
locale: {
'CooperativeGesturesHandler.WindowsHelpText': 'Nagyításhoz görgetés közben tartsd lenyomva a Ctrl billentyűt',
'CooperativeGesturesHandler.MacHelpText': 'Nagyításhoz görgetés közben tartsd lenyomva a ⌘ billentyűt',
'CooperativeGesturesHandler.MobileHelpText': 'Két ujjal mozgasd a térképet',
'NavigationControl.ZoomIn': 'Nagyítás', 'NavigationControl.ZoomOut': 'Kicsinyítés'
}
});
terkep.touchZoomRotate.disableRotation();
terkep.addControl(new ml.NavigationControl({ showCompass: false }), 'bottom-right');
var j = document.createElement('div');
j.className = 'bbt-jelolo';
j.innerHTML = '<i><img src="' + EMBLEMA + '" alt="Bí-Bor-Ász"></i><em>Bí-Bor-Ász · Villány</em>';
new ml.Marker({ element: j, anchor: 'center' }).setLngLat(UZLET).addTo(terkep);
terkep.on('load', function () {
var ures = { type: 'FeatureCollection', features: [] };
terkep.addSource('bbt-ut', { type: 'geojson', data: ures });
terkep.addSource('bbt-start', { type: 'geojson', data: ures });
var vonal = { 'line-join': 'round', 'line-cap': 'round' };
terkep.addLayer({ id: 'bbt-ut-k', type: 'line', source: 'bbt-ut', layout: vonal, paint: { 'line-color': '#ffffff', 'line-width': 9 } });
terkep.addLayer({ id: 'bbt-ut', type: 'line', source: 'bbt-ut', layout: vonal, paint: { 'line-color': '#2a8511', 'line-width': 5 } });
terkep.addLayer({ id: 'bbt-start', type: 'circle', source: 'bbt-start', paint: { 'circle-radius': 7, 'circle-color': '#2a8511', 'circle-stroke-color': '#ffffff', 'circle-stroke-width': 3 } });
var at = vaszon.querySelector('.maplibregl-ctrl-attrib');
if (at) at.classList.remove('maplibregl-compact-show');
kesz = true;
if (varo) { var v = varo; varo = null; mutat(v); }
});
}
if ('IntersectionObserver' in window) {
var figyelo = new IntersectionObserver(function (e) {
if (e.some(function (x) { return x.isIntersecting; })) { figyelo.disconnect(); betolt(); }
}, { rootMargin: '400px' });
figyelo.observe(dobozT);
} else betolt();

var anim = 0, traktor = null;
function vonalAdat(c) { return { type: 'Feature', geometry: { type: 'LineString', coordinates: c } }; }
function rajzol(pts, km) {
cancelAnimationFrame(anim);
var ut = terkep.getSource('bbt-ut');
var hossz = [0];
for (var i = 1; i < pts.length; i++) {
var dx = (pts[i][0] - pts[i - 1][0]) * Math.cos(pts[i][1] * Math.PI / 180), dy = pts[i][1] - pts[i - 1][1];
hossz.push(hossz[i - 1] + Math.sqrt(dx * dx + dy * dy));
}
var osszes = hossz[hossz.length - 1] || 1;
if (lassan) { ut.setData(vonalAdat(pts)); return; }
if (!traktor) {
var el = document.createElement('div');
el.className = 'bbt-traktor';
el.innerHTML = TRAKTOR;
traktor = new window.maplibregl.Marker({ element: el, anchor: 'bottom', offset: [0, 6] });
}
var tel = traktor.getElement();
tel.classList.remove('bbt-tunik');
traktor.setLngLat(pts[0]).addTo(terkep);
var hosszMs = Math.max(1200, Math.min(2800, 1000 + km * 6)), kezd = 0, j = 1;
function lepes(t) {
if (!kezd) kezd = t;
var x = Math.min(1, (t - kezd) / hosszMs);
var e = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
var d = e * osszes;
while (j < pts.length - 1 && hossz[j] < d) j++;
var a = pts[j - 1], b = pts[j], h = (hossz[j] - hossz[j - 1]) || 1, f = Math.max(0, Math.min(1, (d - hossz[j - 1]) / h));
var p = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
ut.setData(vonalAdat(pts.slice(0, j).concat([p])));
traktor.setLngLat(p);
if (Math.abs(b[0] - a[0]) > 1e-5) tel.classList.toggle('bbt-bal', b[0] < a[0]);
if (x > 0.9) tel.classList.add('bbt-tunik');
if (x < 1) anim = requestAnimationFrame(lepes);
else setTimeout(function () { if (tel.classList.contains('bbt-tunik')) traktor.remove(); }, 400);
}
anim = requestAnimationFrame(lepes);
}

function mutat(v) {
if (!kesz) { varo = v; betolt(); return; }
sav.classList.remove('bbt-latszik');
terkep.getSource('bbt-ut').setData({ type: 'FeatureCollection', features: [] });
terkep.getSource('bbt-start').setData({ type: 'Feature', geometry: { type: 'Point', coordinates: v.pts[0] } });
var minx = UZLET[0], maxx = UZLET[0], miny = UZLET[1], maxy = UZLET[1];
v.pts.forEach(function (p) { minx = Math.min(minx, p[0]); maxx = Math.max(maxx, p[0]); miny = Math.min(miny, p[1]); maxy = Math.max(maxy, p[1]); });
var ind = function () { rajzol(v.pts, v.km); };
terkep.once('moveend', function () { setTimeout(ind, 80); });
terkep.fitBounds([ [minx, miny], [maxx, maxy] ], { padding: parna(), maxZoom: 11.5, duration: lassan ? 0 : 1200 });
sav.querySelector('b').textContent = v.cim;
sav.querySelector('.bbt-ido').textContent = 'kb. ' + v.km + ' km · ' + ido(v.perc) + ' autóval';
sav.querySelector('.bbt-haz').style.display = v.km >= 100 ? '' : 'none';
sav.querySelector('a').href = utLink(v.nev);
setTimeout(function () { sav.classList.add('bbt-latszik'); }, lassan ? 0 : 1400);
}

function jelol(gomb) {
gyoker.querySelectorAll('.bbt-chip').forEach(function (c) { c.classList.toggle('bbt-on', c === gomb); });
}
gyoker.querySelector('.bbt-gombok').addEventListener('click', function (e) {
var b = e.target.closest('.bbt-chip');
if (!b) return;
var g = GOMBOK[+b.getAttribute('data-i')];
jelol(b);
input.value = '';
lista.classList.remove('bbt-nyitva');
mutat({ nev: g.nev, cim: g.honnan, km: g.km, perc: g.perc, pts: dekodol(g.ut) });
});

var index = null, indexKer = null, darabok = {}, talalat = [], akt = -1;
function indexBetolt() {
if (!indexKer) indexKer = fetch(ALAP + 'index.json').then(function (r) { return r.json(); }).then(function (d) {
index = d.map(function (t) { return { id: t[0], nev: t[1], km: t[2], perc: t[3], s: t[4] || 1, n: norm(t[1]) }; });
return index;
});
return indexKer;
}
function listaRajz() {
var q = norm(input.value.trim());
if (!q) { lista.classList.remove('bbt-nyitva'); input.setAttribute('aria-expanded', 'false'); return; }
var eleje = [], kozepe = [];
(index || []).forEach(function (t) {
var h = t.n.indexOf(q);
if (h === 0) eleje.push(t); else if (h > 0 && q.length > 2) kozepe.push(t);
});
var sorrend = function (a, b) { return (b.s - a.s) || (a.n.length - b.n.length); };
eleje.sort(sorrend);
kozepe.sort(sorrend);
talalat = eleje.concat(kozepe).slice(0, 6);
akt = talalat.length ? 0 : -1;
lista.innerHTML = index && !talalat.length
? '<p>Nem találjuk ezt a települést.</p>'
: talalat.map(function (t, i) {
return '<li role="option"><button type="button" data-i="' + i + '"' + (i === akt ? ' class="bbt-akt"' : '') + '><b>' + esc(t.nev) + '</b><span>' + ido(t.perc) + '</span></button></li>';
}).join('');
lista.classList.add('bbt-nyitva');
input.setAttribute('aria-expanded', 'true');
}
function valaszt(t) {
input.value = t.nev;
lista.classList.remove('bbt-nyitva');
input.setAttribute('aria-expanded', 'false');
jelol(null);
var betu = t.id.charAt(0);
var ker = darabok[betu] || (darabok[betu] = fetch(ALAP + 'ut-' + betu + '.json').then(function (r) { return r.json(); }));
ker.then(function (d) {
if (d && d[t.id]) mutat({ nev: t.nev, cim: t.nev + ' → Villány', km: t.km, perc: t.perc, pts: dekodol(d[t.id]) });
});
}
input.addEventListener('focus', function () { betolt(); indexBetolt().then(listaRajz); });
input.addEventListener('input', function () { indexBetolt().then(listaRajz); });
input.addEventListener('keydown', function (e) {
if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
if (!talalat.length) return;
e.preventDefault();
akt = (akt + (e.key === 'ArrowDown' ? 1 : talalat.length - 1)) % talalat.length;
lista.querySelectorAll('button').forEach(function (b, i) { b.classList.toggle('bbt-akt', i === akt); });
} else if (e.key === 'Enter') {
e.preventDefault();
if (akt >= 0 && talalat[akt]) valaszt(talalat[akt]);
} else if (e.key === 'Escape') {
lista.classList.remove('bbt-nyitva');
}
});
lista.addEventListener('mousedown', function (e) { e.preventDefault(); });
lista.addEventListener('click', function (e) {
var b = e.target.closest('button');
if (b) valaszt(talalat[+b.getAttribute('data-i')]);
});
input.addEventListener('blur', function () { setTimeout(function () { lista.classList.remove('bbt-nyitva'); }, 150); });
})();
