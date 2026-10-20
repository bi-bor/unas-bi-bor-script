(function () {
var MINDENKI = true;
var KULCS = 'bbUjPenztar';
var KLASSZIKUS = 'bbPenztarKlasszikus';
if (window.top !== window.self) return;
var ELONEZET = {
emai: 'penztar.elonezet@bi-bor.hu', kap_nev: 'Vásárló Előnézet', szam_nev: 'Vásárló Előnézet',
szall_nev: 'Vásárló Előnézet', kap_mobile_sub: '300000000', szam_varos: 'Előnézet', szall_varos: 'Előnézet',
szam_utca: 'Előnézet utca 1.', szall_utca: 'Előnézet utca 1.'
};
var ELONEZET_JEL = /penztar\.elonezet@bi-bor\.hu|Vásárló Előnézet|Előnézet utca 1\./;
function lapSzoveg(d) {
if (!d || !d.body) return '';
var b = d.body.cloneNode(true);
Array.prototype.forEach.call(b.querySelectorAll('script,style,noscript,template,textarea'), function (e) { e.remove(); });
return b.textContent;
}
function elonezetes(f) {
return Object.keys(ELONEZET).some(function (n) { return f.elements[n] && String(f.elements[n].value || '').trim() === ELONEZET[n]; });
}
function elonezetVedelem() {
var ut = location.pathname;
if (ut === '/shop_reg.php' && document.forms.form_reg) {
var f = document.forms.form_reg;
Object.keys(ELONEZET).forEach(function (n) {
var e = f.elements[n];
if (e && String(e.value || '').trim() === ELONEZET[n]) e.value = '';
});
return;
}
if (ut !== '/shop_order_mods.php' && ut !== '/shop_order_control.php') return;
var rendben = false;
document.addEventListener('click', function (e) {
if (!rendben && e.target.closest && e.target.closest('#button_next')) { e.preventDefault(); e.stopImmediatePropagation(); }
}, true);
var vissza = function () {
try { sessionStorage.removeItem(KLASSZIKUS); sessionStorage.setItem('bbPenztarAdatHiany', '1'); } catch (e) {  }
location.replace('/shop_reg.php?no_reg=1');
};
if (ELONEZET_JEL.test(lapSzoveg(document))) { vissza(); return; }
fetch('/shop_reg.php?no_reg=1', { credentials: 'same-origin', cache: 'no-store' })
.then(function (r) { return r.text(); })
.then(function (h) {
var f = new DOMParser().parseFromString(h, 'text/html').forms.form_reg;
if (f && elonezetes(f)) vissza(); else rendben = true;
})
.catch(function () { rendben = true; });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', elonezetVedelem);
else elonezetVedelem();
var allapot = null;
try {
var m = location.search.match(/[?&]ujpenztar=([01])/);
if (m) {
localStorage.setItem(KULCS, m[1]);
sessionStorage.removeItem(KLASSZIKUS);
}
allapot = localStorage.getItem(KULCS);
if (sessionStorage.getItem(KLASSZIKUS) === '1') return;
} catch (e) {  }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
if (/^\/(en|de|hr|ro)(\/|$)/.test(location.pathname)) return;
var ALAP = location.protocol + '//' + location.host;
var OSSZEG = true;
try {
var mo = location.search.match(/[?&]osszeg=([01])/);
if (mo) localStorage.setItem('bbPenztarOsszeg', mo[1]);
OSSZEG = localStorage.getItem('bbPenztarOsszeg') !== '0';
} catch (e) {  }
var FIZ_ELONEZET = [
{ nev: 'Előre fizetés bankkártyával', jel: 'CIB · Visa · Mastercard', alap: true, minta: /bankkárty/i,
leiras: 'A megrendelés elküldése után a CIB Bank biztonságos fizetőoldalán fizethet.' },
{ nev: 'Banki előre utalás', jel: '', minta: /előre utal/i,
leiras: 'A rendelés után e-mailben küldjük a banki adatokat; a csomagot az összeg beérkezése után adjuk fel.' },
{ nev: 'Utánvét', jel: '+ 400 Ft-tól', minta: /utánvét/i,
leiras: 'Fizetés átvételkor. Csomagpontos szállításnál nem választható.' }
];
function kesz(fn) {
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
else fn();
}
function belepett() {
var c = window.UNAS && UNAS.customer;
return !!(c && c.id > 0 && Number(c.without_registration) !== 1);
}
kesz(function () {
if (location.pathname === '/shop_order_mods.php' && document.forms.form_order && document.querySelector('.order-left-content')) {
try { penztarBelepett(); } catch (e) { klasszikus('A pénztár nem töltődött be: ' + e.message); }
return;
}
if (belepett()) {
if (/^\/(puttony|shop_cart\.php)/.test(location.pathname)) fiokAdatElotolt();
return;
}
if (/^\/(puttony|shop_cart\.php)/.test(location.pathname)) kosarGomb();
else if (location.pathname === '/shop_reg.php' && /[?&]no_reg=1/.test(location.search) && document.form_reg) {
try { penztar(); } catch (e) { klasszikus('A pénztár nem töltődött be: ' + e.message); }
}
});
function kosarGomb() {
if (typeof window.cart_order !== 'function') return;
window.cart_order = function () {
if (window.jQuery) jQuery(document).trigger('clickOrderButton', { id: 'initiate', page: 'cart' });
location.href = ALAP + '/shop_reg.php?no_reg=1';
};
window.order = window.cart_order;
}
var A = {
form: null,
kosar: null,          // {tetelek, osszeg}
adatLenyomat: '',     // az utoljára elküldött adatok lenyomata
fut: null,            // folyamatban lévő adatküldés (Promise)
recaptchaVar: null,
keret: null,          // az UNAS szállítás/fizetés lapja (iframe)
keretLap: '',         // '', 'mods', 'control', 'hiba'
keretVar: null,       // a keret következő betöltésére váró ígéret
osszegek: null,       // {szallitas, kezeles, vegosszeg} a keretből
vezerlo: null,        // az összegző lap adatai, ha a vevőnek még jóvá kell hagynia
idozito: null
};
function $(sel, gyoker) { return (gyoker || document).querySelector(sel); }
function $$(sel, gyoker) { return Array.prototype.slice.call((gyoker || document).querySelectorAll(sel)); }
function szoveg(e) { return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; }
function vedett(s) {
return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
}
function ft(n) {
return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
}
function szam(s) {
var m = String(s || '').replace(/\s| /g, '').match(/-?\d+(?:[.,]\d+)?/);
return m ? parseFloat(m[0].replace(',', '.')) : null;
}
function mezo(nev) { return A.form.elements[nev]; }
function ertek(nev) { var e = mezo(nev); return e ? String(e.value || '').trim() : ''; }
function ceges() { var c = A.form.querySelector('input[name=choose_company]:checked'); return !!c && c.value === '1'; }
function nevMasol() {
var szamNev = mezo('szam_nev');
if (!ceges() && szamNev) szamNev.value = ertek('kap_nev');
}
function ZARO_HTML() {
return '<section class="bb-p-szakasz bb-p-zaro">' +
'<label class="bb-p-aszf"><input type="checkbox" id="bb-p-aszf"> <span>Elfogadom az ' +
'<a href="' + ALAP + '/aszf" target="_blank">Általános szerződési feltételeket</a> és az ' +
'<a href="' + ALAP + '/shop_help.php?tab=privacy_policy" target="_blank">Adatkezelési tájékoztatót</a>. ' +
'Tudomásul veszem, hogy a megrendelés elküldése fizetési kötelezettséggel jár.</span></label>' +
'<div class="bb-p-uzenet" id="bb-p-uzenet" hidden></div>' +
'<button type="button" class="bb-p-gomb" id="bb-p-kuld">Megrendelés elküldése<small class="bb-p-gomb-fiz">(fizetési kötelezettséggel)</small></button>' +
'<div class="bb-p-also"><a href="' + ALAP + '/puttony">← Vissza a puttonyba</a></div>' +
'</section>';
}
function kozosResz(racs, gombFv) {
var jobb = document.createElement('aside');
jobb.id = 'bb-p-osszesito';
jobb.innerHTML = '<div class="bb-p-ossz-belso">' +
'<h2 class="bb-p-ossz-cim">A puttony tartalma</h2>' +
'<div class="bb-p-tetelek"><div class="bb-p-info">Betöltés…</div></div>' +
'<div class="bb-p-kupon-doboz">' +
'<div class="bb-p-kupon-cim"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>' +
'<span>Van kuponkódja? <small>Adja meg itt, és levonjuk a kedvezményt.</small></span></div>' +
'<form class="bb-p-kupon" id="bb-p-kupon" autocomplete="off">' +
'<input type="text" id="bb-p-kupon-kod" placeholder="Kuponkód" aria-label="Kuponkód">' +
'<button type="submit">Beváltás</button></form>' +
'<div class="bb-p-kupon-uzenet" id="bb-p-kupon-uzenet" hidden></div>' +
'<a class="bb-kupon-felt" href="/kupon-szabalyzat" target="_blank" rel="noopener">Kuponfeltételek</a>' +
'</div>' +
'<dl class="bb-p-sorok"></dl>' +
'<div id="bb-p-megj-doboz"><label class="bb-p-megj-cim" for="bb-p-megjegyzes">Megjegyzés</label>' +
'<textarea id="bb-p-megjegyzes" rows="4" placeholder="Egyedi kérések a rendeléshez (nem kötelező)"></textarea></div>' +
'</div>';
racs.appendChild(jobb);
var szeles = window.matchMedia('(min-width: 992px)');
var megjHelyez = function () {
var doboz = $('#bb-p-megj-doboz');
if (szeles.matches) $('.bb-p-ossz-belso', jobb).appendChild(doboz);
else $('.bb-p-zaro').parentNode.insertBefore(doboz, $('.bb-p-zaro'));
};
megjHelyez();
if (szeles.addEventListener) szeles.addEventListener('change', megjHelyez);
if (OSSZEG) {
document.documentElement.classList.add('bb-p-osszeg-mod');
var zaro = $('.bb-p-zaro');
var mob = document.createElement('div');
mob.id = 'bb-p-mobilossz';
mob.className = 'bb-p-mobilossz';
mob.setAttribute('aria-live', 'polite');
zaro.insertBefore(mob, zaro.firstChild);
var rc = document.createElement('p');
rc.className = 'bb-p-recaptcha';
rc.innerHTML = 'Az oldalt a reCAPTCHA védi; érvényes a Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">adatvédelmi irányelve</a> és <a href="https://policies.google.com/terms" target="_blank" rel="noopener">szolgáltatási feltételei</a>.';
zaro.appendChild(rc);
}
$('#bb-p-kuld').addEventListener('click', gombFv);
document.addEventListener('click', function (e) {
var a = e.target.closest && e.target.closest('.bb-p-kl');
if (a) { e.preventDefault(); klasszikus(); }
});
$('#bb-p-kupon').addEventListener('submit', function (e) { e.preventDefault(); kuponBevalt(); });
}
function penztar() {
A.form = document.form_reg;
var racs = A.form.parentElement;
document.documentElement.classList.add('bb-penztar');
racs.classList.add('bb-p-racs');
var cim = $('#page_reg_content .main-title');
if (cim) cim.textContent = 'Pénztár';
urlapRendez();
function cegValt() {
var szamNev = mezo('szam_nev');
document.documentElement.classList.toggle('bb-p-ceg', ceges());
var l = $('label[for=default_nev]');
if (l) l.textContent = ceges() ? 'Cégnév' : 'Név';
if (!ceges()) nevMasol();
else if (szamNev && szamNev.value === ertek('kap_nev')) szamNev.value = '';
}
if (mezo('kap_nev')) {
mezo('kap_nev').addEventListener('input', nevMasol);
mezo('kap_nev').addEventListener('change', nevMasol);
mezo('kap_nev').addEventListener('blur', function () { nevJelol(false); });
mezo('kap_nev').addEventListener('input', function () { if (nevJo(ertek('kap_nev'))) nevJelol(false); });
}
$$('input[name=choose_company]', A.form).forEach(function (r) { r.addEventListener('change', cegValt); });
cegValt();
var bal = document.createElement('div');
bal.id = 'bb-p-bal';
bal.innerHTML =
'<section class="bb-p-szakasz" id="bb-p-szall">' +
'<div class="bb-p-info" id="bb-p-szall-info" hidden></div>' +
'<div id="bb-p-elonezet">' +
'<h2>Szállítási mód</h2>' +
'<div class="bb-p-info">A választható szállítási módok megtekintéséhez adja meg a címét.</div>' +
'<h2>Fizetés</h2>' +
'<div class="bb-p-lista bb-p-lista--elo" role="radiogroup" aria-label="Fizetési mód">' + FIZ_ELONEZET.map(function (f, i) {
return '<label class="bb-p-mod' + (f.alap ? ' bb-p-valasztott' : '') + '">' +
'<input type="radio" name="bb_fiz_elo" value="' + i + '"' + (f.alap ? ' checked' : '') + '>' +
'<div class="bb-p-mod-fej">' +
'<span class="bb-p-mod-nev">' + vedett(f.nev) + '</span>' +
(f.jel ? '<span class="bb-p-mod-jel">' + vedett(f.jel) + '</span>' : '') + '</div>' +
(f.leiras ? '<div class="bb-p-mod-leiras">' + vedett(f.leiras) + '</div>' : '') + '</label>';
}).join('') + '</div>' +
'<p class="bb-p-megj-kicsi">A választásod a cím megadása után is megmarad. Nem minden szállítási módhoz érhető el mindegyik fizetés.</p>' +
'</div>' +
'<div class="bb-p-keret-hely"></div></section>' + ZARO_HTML();
A.form.parentNode.insertBefore(bal, A.form.nextSibling);
kozosResz(racs, kuldes);
A.tokenVarok = [];
A.form.submit = function () {
if (A.tokenFut) {
A.tokenFut = false;
var v = '';
try { v = grecaptcha.getResponse(recaptcha_id_reg); } catch (e) {  }
A.token = { v: v, t: Date.now() };
var varok = A.tokenVarok; A.tokenVarok = [];
varok.forEach(function (f) { f(); });
} else HTMLFormElement.prototype.submit.call(A.form);
};
A.form.addEventListener('focusin', tokenKer);
A.form.addEventListener('input', adatValtozott);
A.form.addEventListener('focusout', function (ev) {
if (JELOLT.indexOf(ev.target.name) < 0) return;
ev.target.setAttribute('data-bb-erintett', '1');
mezokJelol();
});
A.form.addEventListener('input', function (ev) { if (JELOLT.indexOf(ev.target.name) > -1) mezokJelol(); });
setTimeout(mezokJelol, 800);
A.form.addEventListener('change', adatValtozott);
A.form.addEventListener('focusout', adatValtozott);
mobilFigyel();
irszFigyel();
A.fizElore = FIZ_ELONEZET.filter(function (f) { return f.alap; })[0];
$$('input[name=bb_fiz_elo]').forEach(function (r) {
r.addEventListener('change', function () {
A.fizElore = FIZ_ELONEZET[+r.value];
$$('.bb-p-lista--elo .bb-p-mod').forEach(function (l) { l.classList.toggle('bb-p-valasztott', l.contains(r) ); });
});
});
kosarBetolt();
try {
if (sessionStorage.getItem('bbPenztarAdatHiany') === '1') {
sessionStorage.removeItem('bbPenztarAdatHiany');
uzenet('Kérjük, adja meg újra az adatait (e-mail, név, telefonszám) — a rendeléshez ezek szükségesek.', 'figyel');
}
} catch (e) {  }
window.addEventListener('bbKosarValtozott', kosarBetolt);
}
function kuponBevalt() {
var kod = $('#bb-p-kupon-kod').value.trim();
var gombK = $('#bb-p-kupon button');
if (!kod) { kuponUzenet('Írja be a kuponkódot.', 'hiba'); return; }
gombK.disabled = true;
kuponUzenet('<span class="bb-p-tolto"></span> Ellenőrzés…');
fetch(ALAP + '/shop_cart.php?action=coupon_check&coupon_id=' + encodeURIComponent(kod), { credentials: 'same-origin' })
.then(function (r) { return r.text(); })
.then(function (valasz) {
valasz = valasz.trim();
if (valasz === '' || valasz === 'ok') {
kuponUzenet('A kupont beváltottuk: <b>' + vedett(kod) + '</b>', 'ok');
A.vezerlo = null;
kosarBetolt();
if (A.mod === 'belepett') { setTimeout(function () { location.reload(); }, 600); return; }
if (A.keretLap) keretBetolt(ALAP + '/shop_order_mods.php' + (A.keretLap === 'control' ? '?back=1' : '')).catch(function () {});
return;
}
return kuponHibaSzoveg(valasz).then(function (t) { kuponUzenet(vedett(t), 'hiba'); });
})
.catch(function () { kuponUzenet('A kupon ellenőrzése nem sikerült. Próbálja újra.', 'hiba'); })
.then(function () { gombK.disabled = false; });
}
function hibaDoboz(d) {
var o = d.getElementById('overlay_error');
if (!o) return '';
var cim = szoveg(o.querySelector('.overlay_title'));
var m = o.cloneNode(true);
$$('.overlay-buttons, .overlay_close, .overlay__title-wrap, button', m).forEach(function (e) { e.remove(); });
var tobbi = szoveg(m);
return [cim, tobbi].filter(Boolean).join(' ');
}
function kuponUzenet(html, tipus) {
var u = $('#bb-p-kupon-uzenet');
u.hidden = !html;
u.className = 'bb-p-kupon-uzenet' + (tipus ? ' bb-p-kupon-uzenet--' + tipus : '');
u.innerHTML = html || '';
}
function kuponHibaSzoveg(kod) {
var alap = 'Ez a kupon nem váltható be.';
if (!/^[\w-]{1,40}$/.test(kod)) return Promise.resolve(alap);
return fetch(ALAP + '/shop_cart.php?overlay=order_coupon_error_' + kod, { credentials: 'same-origin' })
.then(function (r) { return r.text(); })
.then(function (html) {
return hibaDoboz(new DOMParser().parseFromString(html, 'text/html')) || alap;
})
.catch(function () { return alap; });
}
function urlapRendez() {
$$('.new-cust__section-title-inner', A.form).forEach(function (c) {
var t = szoveg(c);
var szakasz = c.closest('.new-cust__section-title');
if (/^Kapcsolattartó/i.test(t)) {
c.textContent = 'Kapcsolattartási adatok';
var a = document.createElement('a');
a.className = 'bb-p-belep-link';
a.href = 'javascript:overlay_login();';
a.textContent = 'Bejelentkezés';
szakasz.appendChild(a);
} else if (/^Számlázási/i.test(t)) c.textContent = 'Cím';
else if (/^Szállítási adatok/i.test(t)) szakasz.classList.add('bb-p-rejtett');
else if (/^Egyéb vásárló/i.test(t)) szakasz.classList.add('bb-p-rejtett');
});
var ugyanaz = $('label[for=shipping_same]');
if (ugyanaz) ugyanaz.textContent = 'A szállítási cím megegyezik a fenti címmel';
$$('.form-group', A.form).forEach(function (g) {
var l = g.querySelector(':scope > label');
var inp = g.querySelector(':scope > input.form-control, :scope > textarea.form-control');
if (!l || !inp || inp.type === 'hidden') return;
g.classList.add('bb-p-uszo');
inp.setAttribute('aria-label', szoveg(l));
inp.placeholder = ' ';
});
var szul = mezo('cust_param_6378881');
if (szul) szul.setAttribute('inputmode', 'numeric');
}
function mobilHiba() {
var e = mezo('kap_mobile_sub');
if (!e) return '';
var orszag = ertek('kap_mobile_country') || '36';
var v = String(e.value || '').replace(/\D/g, '');
if (orszag === '36' && v.length === 11 && /^(06|36)/.test(v)) { v = v.slice(2); e.value = v; }
if (!v) return 'Kötelező!';
if (orszag !== '36') return v.length >= 6 && v.length <= 13 ? '' : 'Hibás formátum!';
if (/^(20|30|31|50|70)/.test(v)) return v.length === 9 ? '' : 'A mobilszám 9 számjegy (pl. 30 123 4567).';
return v.length === 8 ? '' : 'Hibás formátum! (pl. 30 123 4567)';
}
function nevJo(v) { return /\S+\s+\S+/.test(String(v || '').trim()); }
function nevJelol(uresIs) {
['kap_nev', 'szall_nev'].forEach(function (n) {
var e = mezo(n);
if (!e || e.offsetParent === null) return;
var fb = e.closest('.form-group') && e.closest('.form-group').querySelector('.invalid-feedback');
var hibas = !nevJo(e.value) && (uresIs || !!e.value.trim());
e.classList.toggle('is-invalid', hibas);
if (!fb) return;
fb.textContent = e.value.trim() ? 'Adja meg a teljes nevét (vezeték- és keresztnév).' : 'Kötelező!';
fb.style.display = hibas ? 'block' : '';
});
}
function mobilFigyel() {
var e = mezo('kap_mobile_sub');
if (!e) return;
e.addEventListener('change', function () {
var v = String(e.value || '').replace(/\D/g, '');
if ((ertek('kap_mobile_country') || '36') === '36' && v.length === 11 && /^(06|36)/.test(v)) e.value = v.slice(2);
mobilJelol(false);
});
e.addEventListener('blur', function () { mobilJelol(true); });
}
function mobilJelol(mutat) {
var e = mezo('kap_mobile_sub');
var h = mobilHiba();
var fb = e.closest('.form-group') && e.closest('.form-group').querySelector('.invalid-feedback');
if (h && mutat) {
e.classList.add('is-invalid');
if (fb) { fb.setAttribute('data-bb-eredeti', fb.getAttribute('data-bb-eredeti') || fb.innerHTML); fb.textContent = h; fb.style.display = 'block'; }
} else if (!h) {
e.classList.remove('is-invalid');
if (fb && fb.getAttribute('data-bb-eredeti')) { fb.innerHTML = fb.getAttribute('data-bb-eredeti'); fb.style.display = ''; }
}
return h;
}
function penztarBelepett() {
A.mod = 'belepett';
var f = document.forms.form_order;
document.documentElement.classList.add('bb-penztar', 'bb-p-belepett');
var st = document.createElement('style');
st.textContent = MODOK_CSS;
document.head.appendChild(st);
var cim = $('#page_order_mods_content .main-title') || $('.main__title h1 .main-title');
if (cim) cim.textContent = 'Pénztár';
var racs = document.createElement('div');
racs.className = 'bb-p-racs';
f.parentNode.insertBefore(racs, f);
var fiok = document.createElement('section');
fiok.id = 'bb-p-fiok';
fiok.innerHTML = '<h2>Kapcsolattartási adatok <a class="bb-p-belep-link" href="' + ALAP + '/profil">Fiókom</a></h2>' +
'<div class="bb-p-fiok-adat"><span class="bb-p-halvany">Betöltés…</span></div>';
racs.appendChild(fiok);
racs.appendChild(f);
var bal = document.createElement('div');
bal.id = 'bb-p-bal';
bal.innerHTML = ZARO_HTML();
racs.appendChild(bal);
kozosResz(racs, kuldesBelepett);
A.fizElore = FIZ_ELONEZET.filter(function (x) { return x.alap; })[0];
fizAlap(document);
osszegFigyel(window, document);
kosarBetolt();
window.addEventListener('bbKosarValtozott', kosarBetolt);
fiokAdatok();
f.submit = function () {
if (A.modsVar) { var v = A.modsVar; A.modsVar = null; v(); }
else HTMLFormElement.prototype.submit.call(f);
};
}
var FIOK_KULCS = 'bbPenztarFiokAdat';
function fiokUjMod() {
var uj = false;
try {
var m = location.search.match(/[?&]fiokadat=([01])/);
if (m) localStorage.setItem('bbPenztarFiokadat', m[1]);
uj = localStorage.getItem('bbPenztarFiokadat') === '1';
} catch (e) {  }
return uj;
}
function fiokUrlap(ut) {
return fetch(ut.charAt(0) === '/' ? ALAP + ut : ut, { credentials: 'same-origin' })
.then(function (r) { return r.text(); })
.then(function (html) {
var f = new DOMParser().parseFromString(html, 'text/html').forms.form_reg;
return f && f.elements.emai && f.elements.emai.value ? { f: f, ut: ut } : null;
})
.catch(function () { return null; });
}
function fiokOlvas(utak) {
var sorban = function (i) {
if (i >= utak.length) return Promise.resolve(null);
return fiokUrlap(utak[i]).then(function (x) { return x || sorban(i + 1); });
};
return sorban(0).then(function (x) {
if (!x) return null;
var f = x.f;
var e = function (n) { return f.elements[n] ? String(f.elements[n].value || '').trim() : ''; };
return {
nev: e('kap_nev'), email: e('emai'),
tel: e('kap_mobile_sub') ? '+' + (e('kap_mobile_country') || '36') + ' ' + e('kap_mobile_sub') : '',
cim: [e('szam_nev'), [e('szam_irany'), e('szam_varos')].join(' '), e('szam_utca')].filter(function (y) { return y.trim(); }).join(', '),
mod: x.ut.charAt(0) === '/' ? ALAP + x.ut : x.ut, ut: x.ut
};
});
}
function fiokAdatElotolt() {
if (!fiokUjMod()) return;
var mod = document.querySelector('a.login-box__btn-reg[href], #profile__dropdown a[href*="reg"]');
var modUt = mod && mod.getAttribute('href');
fiokOlvas((modUt ? [modUt] : []).concat(['/shop_reg.php', '/regisztracio'])).then(function (a) {
try { if (a) sessionStorage.setItem(FIOK_KULCS, JSON.stringify(a)); else sessionStorage.removeItem(FIOK_KULCS); } catch (e) {  }
});
}
function fiokMutat(a, uj) {
var fl = $('#bb-p-fiok .bb-p-belep-link');
if (fl && (uj || a.ut !== '/regisztracio')) { fl.textContent = 'Módosítás'; fl.href = a.mod; }
$('#bb-p-fiok .bb-p-fiok-adat').innerHTML =
'<b>' + vedett(a.nev) + '</b>' +
[a.email, a.tel].filter(Boolean).map(function (y) { return '<span>' + vedett(y) + '</span>'; }).join('') +
(uj && !a.tel ? '<div class="bb-p-megj-kicsi">Nincs megadva telefonszám — <a href="' + a.mod + '">adja meg</a> a gyorsabb kiszállításhoz.</div>' : '') +
'<div class="bb-p-fiok-cim"><b>Számlázási cím</b> <a href="' + a.mod + '">Módosítás</a><br>' + vedett(a.cim) + '</div>' +
(uj ? '' : '<p class="bb-p-megj-kicsi">A szállítási címet a szállítási módnál választhatja ki.</p>');
}
function fiokAdatok() {
var uj = fiokUjMod();
if (uj) {
var a = null;
try { a = JSON.parse(sessionStorage.getItem(FIOK_KULCS) || 'null'); } catch (e) { a = null; }
if (a && a.email) { fiokMutat(a, true); return; }
$('#bb-p-fiok .bb-p-fiok-adat').innerHTML = 'Az adatait (név, e-mail, telefon, számlázási cím) a fiókjában találja: ' +
'<a href="' + ALAP + '/profil">Fiókom</a>.';
return;
}
fiokOlvas(['/regisztracio', '/shop_reg.php?no_reg=1']).then(function (a) {
if (!a) { $('#bb-p-fiok').hidden = true; return; }
fiokMutat(a, false);
});
}
function kuldesBelepett() {
uzenet('');
if (!aszfRendben()) return;
if (A.vezerlo) { gomb('Továbbítás…', true); elkuldes(A.vezerlo); return; }
var f = document.forms.form_order;
var gombK = document.getElementById('button_next');
var mutatott = null;
gomb('Rendelés rögzítése…', true);
kartonVar(window).then(function () {
mutatott = A.osszegek ? A.osszegek.vegosszeg : null;
}).then(function () { return new Promise(function (ok, nem) {
var kesz = false;
var hiba = function (uz) { if (kesz) return; kesz = true; A.modsVar = null; nem(new Error(uz)); };
A.modsVar = function () { if (!kesz) { kesz = true; ok(); } };
if (window.jQuery) jQuery(document).one('errorOnOrderMethods clickOrderButtonError', function () {
hiba('Kérjük, egészítse ki a szállítás/fizetés adatait (pirossal jelölve).');
});
if (!gombK) { hiba('A szállítás/fizetés lap nem teljes.'); return; }
gombK.disabled = false;
gombK.click();
setTimeout(function () { hiba('Kérjük, egészítse ki a szállítás/fizetés adatait.'); }, 6000);
}); })
.then(function () {
return fetch(new URL(f.getAttribute('action') || 'shop_order_control.php', ALAP + '/').href,
{ method: 'POST', body: new FormData(f), credentials: 'same-origin' });
})
.then(function (r) { return r.text().then(function (html) { return { url: r.url, html: html }; }); })
.then(function (v) {
var d = new DOMParser().parseFromString(v.html, 'text/html');
if (!/shop_order_control\.php/.test(v.url) || !d.forms.form_szf || !d.forms.form_megj) {
throw new Error(/shop_cart|puttony/.test(v.url) ? 'A Puttonya időközben kiürült vagy lejárt.' : 'A bolt nem fogadta el a szállítás/fizetés adatait.');
}
vegEgyeztet(vezerloOlvas(d), mutatott, function () {  });
})
.catch(function (e) {
gomb('Megrendelés elküldése');
if (gombK) gombK.disabled = false;
uzenet((e.html ? e.message : vedett(e.message)) + ' <a href="#" class="bb-p-kl">Folytatás a régi pénztárban</a>', 'hiba');
});
}
function kosarBetolt() {
fetch(ALAP + '/puttony', { credentials: 'same-origin' })
.then(function (r) { return r.text(); })
.then(function (html) {
var d = new DOMParser().parseFromString(html, 'text/html');
var inp = d.querySelector('form[name=form_cart_print] input[name=cart_print_data]');
if (!inp) throw new Error('nincs kosár');
var j = JSON.parse(inp.value);
if (!j.products || !j.products.length) { location.href = ALAP + '/puttony'; return; }
var kepek = {};
$$('.cart-item[data-sku]', d).forEach(function (sor) {
var img = sor.querySelector('img.cart-item__pic, img');
var src = img && (img.getAttribute('data-src') || img.getAttribute('src'));
if (src && !/space\.gif/.test(src)) (kepek[sor.getAttribute('data-sku')] = kepek[sor.getAttribute('data-sku')] || []).push(src);
});
j.products.forEach(function (p) { var l = kepek[p.sku]; p.kep = l && l.length ? l.shift() : ''; });
A.kosar = { tetelek: j.products, osszeg: Number(j.total_price_gross) || 0 };
osszesito();
})
.catch(function () {
$('#bb-p-osszesito .bb-p-tetelek').innerHTML = '<div class="bb-p-info">A puttony tartalma nem tölthető be. <a href="' + ALAP + '/puttony">Megnyitás</a></div>';
});
}
function osszesito() {
var t = $('#bb-p-osszesito .bb-p-tetelek');
if (A.kosar) {
t.innerHTML = A.kosar.tetelek.map(function (p) {
var valt = (p.variants || []).map(function (v) { return v.name ? v.name + ': ' + v.value : ''; }).filter(Boolean).join(', ');
return '<div class="bb-p-tetel"><span class="bb-p-kep">' +
(p.kep ? '<img src="' + vedett(p.kep) + '" alt="" loading="lazy">' : '') +
'<span class="bb-p-db">' + vedett(p.qty) + '</span></span>' +
'<span class="bb-p-nev">' + vedett(p.name) + (valt ? '<small>' + vedett(valt) + '</small>' : '') + '</span>' +
'<span class="bb-p-ar">' + ft(p.total_price_gross) + '</span></div>';
}).join('');
}
var o = A.osszegek;
var db = A.kosar ? A.kosar.tetelek.length : 0;
var sorok = '<dt>Részösszeg' + (db ? ' · ' + db + ' tétel' : '') + '</dt><dd>' + (A.kosar ? ft(A.kosar.osszeg) : '–') + '</dd>' +
'<dt>Szállítás</dt><dd>' + (o && o.szallitas ? vedett(o.szallitas) : '<span class="bb-p-halvany">' + (A.keretLap === 'mods' ? 'válasszon szállítási módot' : 'adja meg a címét') + '</span>') + '</dd>';
if (o && o.kezeles) sorok += '<dt>Kezelési költség</dt><dd>' + vedett(o.kezeles) + '</dd>';
(o && o.egyeb || []).forEach(function (s) { sorok += '<dt>' + vedett(s.cim) + '</dt><dd>' + vedett(s.ertek) + '</dd>'; });
var vegso = A.vezerlo ? A.vezerlo.vegosszeg : (o && o.vegosszeg != null ? o.vegosszeg : (A.kosar ? A.kosar.osszeg : null));
sorok += '<dt class="bb-p-vegso">Végösszeg</dt><dd class="bb-p-vegso">' + (vegso != null ? ft(vegso) : '–') + '</dd>';
$('#bb-p-osszesito .bb-p-sorok').innerHTML = sorok + '<p class="bb-p-afa">Az árak az ÁFÁ-t tartalmazzák.</p>';
A.vegso = vegso;
mobilOssz(o, vegso);
}
function mobilOssz(o, vegso) {
var m = $('#bb-p-mobilossz');
if (!m) return;
var termek = 0, db = 0, dijak = {}, karton = false;
(A.kosar ? A.kosar.tetelek : []).forEach(function (p) {
var ar = Number(p.total_price_gross) || 0;
if (p.sku_type === 'service_plus') {
dijak[p.name] = (dijak[p.name] || 0) + ar;
if (/csomagolási/i.test(p.name)) karton = true;
} else { termek += ar; db++; }
});
var s = '';
var sor = function (cim, ertek, osztaly) {
s += '<div class="bb-p-mo-sor' + (osztaly ? ' ' + osztaly : '') + '"><span>' + cim + '</span><span>' + ertek + '</span></div>';
};
if (A.kosar) sor('Termékek' + (db ? ' (' + db + ' tétel)' : ''), ft(termek));
Object.keys(dijak).forEach(function (n) { if (dijak[n]) sor(vedett(n), ft(dijak[n])); });
(o && o.egyeb || []).forEach(function (e) { sor(vedett(e.cim), vedett(e.ertek), /^[-−]/.test(e.ertek) ? 'bb-p-mo-kedv' : ''); });
sor('Szállítás', o && o.szallitas ? vedett(o.szallitas)
: '<em>' + (A.keretLap === 'mods' ? 'válasszon szállítási módot' : 'adja meg a címét') + '</em>');
if (o && o.kezeles) sor('Fizetési mód díja', vedett(o.kezeles));
sor('Fizetendő', vegso != null ? ft(vegso) : '–', 'bb-p-mo-vegso');
m.innerHTML = '<div class="bb-p-mo-cim">Összesítés</div>' + s +
(karton ? '<div class="bb-p-mo-meg">A csomagolási és kezelési költség személyes átvételnél és Bí-Bor futárnál nem jár.</div>' : '') +
'<div class="bb-p-mo-meg">Az árak az ÁFÁ-t tartalmazzák.</div>';
gombOssz();
}
function gombOssz() {
var g = $('#bb-p-kuld');
if (!OSSZEG || !g || g.disabled || g.textContent.indexOf('Megrendelés elküldése') !== 0) return;
var e = g.querySelector('.bb-p-gomb-ossz');
if (A.vegso == null) { if (e) e.remove(); return; }
if (!e) {
e = document.createElement('span');
e.className = 'bb-p-gomb-ossz';
g.insertBefore(e, g.querySelector('.bb-p-gomb-fiz'));
}
e.textContent = '· ' + ft(A.vegso);
}
function szallInfo(html) {
var i = $('#bb-p-szall-info');
i.hidden = !html;
i.innerHTML = html || '';
}
function kotelezo(e) {
var fb = e.parentElement && e.parentElement.querySelector('.invalid-feedback');
return !!fb && /Kötelező/.test(fb.textContent);
}
function hianyzoAdatok() {
var hiany = [];
function kell(nev, jo) {
var e = mezo(nev);
if (!e || e.disabled) return;
var v = String(e.value || '').trim();
if (jo ? !jo(v) : !v) hiany.push(e);
}
kell('emai', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); });
kell('kap_nev', nevJo);
if (mobilHiba()) hiany.push(mezo('kap_mobile_sub'));
if (ceges()) { kell('szam_nev'); kell('szam_ado'); }
kell('szam_irany'); kell('szam_varos');
kell('szam_utca', function (v) { return v.length >= 7 && /\d/.test(v) && /[a-záéíóöőúüű]/i.test(v); });
var ugyanaz = mezo('shipping_same');
if (ugyanaz && !ugyanaz.checked) { kell('szall_nev', nevJo); kell('szall_irany'); kell('szall_varos'); kell('szall_utca'); }
$$('[name^=cust_param_]', A.form).filter(kotelezo).forEach(function (e) {
if (e.offsetParent !== null && !String(e.value || '').trim()) hiany.push(e);
});
return hiany;
}
var JELOLT = ['emai', 'kap_nev', 'kap_mobile_sub', 'szam_nev', 'szam_ado', 'szam_irany', 'szam_varos', 'szam_utca',
'szall_nev', 'szall_irany', 'szall_varos', 'szall_utca'];
function mezokJelol() {
var hibas = hianyzoAdatok();
JELOLT.forEach(function (n) {
var e = mezo(n);
if (!e || e.offsetParent === null) return;
var rossz = hibas.indexOf(e) > -1, ures = !String(e.value || '').trim();
e.classList.toggle('bb-p-ok', !rossz && !ures);
e.classList.toggle('bb-p-rossz', rossz && e.hasAttribute('data-bb-erintett'));
});
}
function lenyomat() {
var r = [];
$$('input,select,textarea', A.form).forEach(function (e) {
if (!e.name || /recaptcha/.test(e.name)) return;
if ((e.type === 'radio' || e.type === 'checkbox') && !e.checked) return;
r.push(e.name + '=' + e.value);
});
return r.join('&');
}
function cimElotag() { var u = mezo('shipping_same'); return u && !u.checked ? 'szall' : 'szam'; }
function cimMegvan() {
var e = cimElotag();
return /^\d{4,}$/.test(ertek(e + '_irany').replace(/\s/g, ''));
}
function cimLenyomat() {
var e = cimElotag();
return [e, ertek(e + '_orszag'), ertek(e + '_irany').replace(/\s/g, '')].join('|');
}
function adatValtozott() {
clearTimeout(A.idozito);
var azonnal = cimMegvan() && cimLenyomat() !== A.cimKuldve && hianyzoAdatok().length > 0;
A.idozito = setTimeout(function () {
if (!hianyzoAdatok().length) {
if (lenyomat() !== A.adatLenyomat || A.elonezet) adatKuldes(false).catch(function () {  });
} else if (cimMegvan() && cimLenyomat() !== A.cimKuldve) {
adatKuldes(true).catch(function () {  });
}
}, azonnal ? 0 : 450);
}
function irszKeres(e, mindenkepp) {
var m = mezo(e + '_irany');
if (!m) return Promise.resolve();
var v = String(m.value || '').replace(/\D/g, '');
var orszag = ertek(e + '_orszag') || 'hu';
if (orszag !== 'hu' || v.length !== 4 || (!mindenkepp && v === m.getAttribute('data-bb-irsz'))) return Promise.resolve();
m.setAttribute('data-bb-irsz', v);
return fetch(ALAP + '/shop_reg.php?action=check_zip&zip=' + v + '&country=' + encodeURIComponent(orszag), { credentials: 'same-origin' })
.then(function (r) { return r.json(); })
.then(function (j) {
if (!j || j.status !== 'ok' || String(m.value).replace(/\D/g, '') !== v) return;
var varos = mezo(e + '_varos'), megye = mezo(e + '_megye');
if (megye && j.county) megye.value = j.county;
if (varos && (!varos.value || varos.getAttribute('data-bb-auto') === '1')) {
varos.value = j.city || '';
if (j.city) varos.setAttribute('data-bb-auto', '1'); else varos.removeAttribute('data-bb-auto');
varos.classList.remove('is-invalid');
}
})
.catch(function () {  });
}
function megyePotol() {
var elotagok = cimElotag() === 'szall' ? ['szam', 'szall'] : ['szam'];
return Promise.all(elotagok.map(function (e) { return ertek(e + '_megye') ? null : irszKeres(e, true); }));
}
function irszFigyel() {
['szam', 'szall'].forEach(function (e) {
var m = mezo(e + '_irany');
if (!m) return;
m.addEventListener('input', function () { irszKeres(e).then(adatValtozott); });
var varos = mezo(e + '_varos');
if (varos) varos.addEventListener('input', function () { varos.removeAttribute('data-bb-auto'); });
});
setTimeout(function () { megyePotol().then(function () { if (cimMegvan()) adatValtozott(); }); }, 600);
}
var IDEIGLENES = {
emai: 'penztar.elonezet@bi-bor.hu',
kap_nev: 'Vásárló Előnézet', szam_nev: 'Vásárló Előnézet', szall_nev: 'Vásárló Előnézet',
kap_mobile_sub: '300000000',
szam_varos: 'Előnézet', szall_varos: 'Előnézet',
szam_utca: 'Előnézet utca 1.', szall_utca: 'Előnézet utca 1.'
};
function ideiglenesKitolt(fd) {
var szall = cimElotag() === 'szall';
Object.keys(IDEIGLENES).forEach(function (n) {
if (/^szall_/.test(n) && !szall) return;
var jo = n === 'kap_mobile_sub' ? !mobilHiba()
: /_utca$/.test(n) ? /\d/.test(ertek(n)) && ertek(n).length >= 7
: /_nev$/.test(n) ? nevJo(ertek(n))
: n === 'emai' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ertek(n)) : !!ertek(n);
if (!jo) fd.set(n, IDEIGLENES[n]);
});
if (ceges() && !ertek('szam_ado')) fd.set('choose_company', '0');
}
var KOD_ERVENYES = 100000;
function recaptchaVan() { return typeof window.grecaptcha !== 'undefined' && typeof window.recaptcha_id_reg !== 'undefined'; }
function tokenKer() {
if (!recaptchaVan() || A.tokenFut || (A.token && Date.now() - A.token.t < KOD_ERVENYES)) return;
A.tokenFut = true;
try { grecaptcha.reset(recaptcha_id_reg); } catch (e) {  }
try { grecaptcha.execute(recaptcha_id_reg); } catch (e) { A.tokenFut = false; }
}
function recaptchaKod() {
return new Promise(function (ok, nem) {
if (!recaptchaVan()) { nem(new Error('A biztonsági ellenőrzés (reCAPTCHA) nem töltődött be.')); return; }
var kesz = false;
var elvesz = function () {
if (kesz) return;
kesz = true;
var t = A.token; A.token = null;
ok(t ? t.v : '');
setTimeout(tokenKer, 300);   // a következő küldéshez előre
};
if (A.token && !A.tokenFut && Date.now() - A.token.t < KOD_ERVENYES) { elvesz(); return; }
A.token = null;
A.tokenVarok.push(elvesz);
tokenKer();
setTimeout(function () {
if (!kesz) { kesz = true; nem(new Error('A biztonsági ellenőrzés nem fejeződött be.')); }
}, 180000);
});
}
function adatKuldes(elonezet) {
if (A.fut) return A.fut;
nevMasol();
var ceg = ceges() && (!elonezet || !!ertek('szam_ado')) ? 'ceg' : 'magan';
var l = lenyomat(), cim = cimLenyomat() + '|' + ceg;
var ujKeret = A.keretLap !== 'mods' || cim !== A.keretCim;
if (ujKeret) szallInfo('<span class="bb-p-tolto"></span> Szállítási módok betöltése…');
A.vezerlo = null;
A.cimKuldve = cimLenyomat();
A.fut = megyePotol().then(recaptchaKod)
.then(function (kod) {
var fd = new FormData(A.form);
fd.set('g-recaptcha-response', kod);
if (elonezet) ideiglenesKitolt(fd);
var siker = function () { A.adatLenyomat = elonezet ? '' : l; A.elonezet = elonezet; };
if (ujKeret) {
return keretPost(fd).then(function (lap) {
if (lap !== 'mods') {
var w = A.keret.contentWindow;
throw new Error(unasHiba(w.location.href, w.document.documentElement.outerHTML, elonezet));
}
siker();
A.keretCim = cim;
return 'uj';
});
}
return fetch(A.form.action, { method: 'POST', body: fd, credentials: 'same-origin' }).then(function (r) {
if (!/shop_order_mods\.php/.test(r.url)) {
return r.text().then(function (html) { throw new Error(unasHiba(r.url, html, elonezet)); });
}
siker();
return 'marad';
});
})
.then(function (x) {
szallInfo('');
if (!elonezet && A.keret) telefonParam(A.keret.contentWindow.document);
return x;
})
.catch(function (e) {
A.cimKuldve = '';
if (elonezet) { if (A.keretLap !== 'mods') szallInfo(''); throw e; }
szallInfo('<span class="bb-p-hiba">' + vedett(e.message) + '</span> <a href="#" class="bb-p-ujra">Újrapróbálom</a> · <a href="#" class="bb-p-kl">Régi pénztár</a>');
var u = $('#bb-p-szall .bb-p-ujra');
if (u) u.addEventListener('click', function (ev) { ev.preventDefault(); A.adatLenyomat = ''; adatKuldes(false).catch(function () {}); });
throw e;
})
.then(function (x) { A.fut = null; setTimeout(adatValtozott, 0); return x; },
function (e) { A.fut = null; throw e; });
return A.fut;
}
function unasHiba(url, html, csendes) {
var m = String(url).match(/[?&]overlay=([a-z_]+)/);
var ismert = {
recaptcha_error: 'A biztonsági ellenőrzés (reCAPTCHA) nem sikerült. Kérjük, próbálja újra.',
cust_error: 'A bolt hiányosnak találta az adatokat. Kérjük, ellenőrizze a mezőket.'
};
if (/shop_cart\.php|\/puttony/.test(url)) return 'A Puttonya időközben kiürült vagy lejárt. Kérjük, töltse be újra.';
var uzenetek = [], mezok = [];
if (html) {
var d = new DOMParser().parseFromString(html, 'text/html');
var js = $$('script', d).map(function (s) { return s.textContent; })
.filter(function (s) { return s.indexOf('bbUjPenztar') < 0; }).join('\n');
var re = /overlay_load\(\s*["']error["']\s*,\s*(["'`])((?:(?!\1).){1,300})\1(?:\s*,\s*(["'`])((?:(?!\3).){0,300})\3)?/g, t;
while ((t = re.exec(js))) {
[t[2], t[4] ].forEach(function (s) {
s = String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
if (s && uzenetek.indexOf(s) < 0) uzenetek.push(s);
});
}
var doboz = hibaDoboz(d);
if (doboz && uzenetek.indexOf(doboz) < 0) uzenetek.push(doboz);
var f = d.forms.form_reg;
if (f && !csendes) {
$$('.is-invalid, .has-fault input, .has-fault select, .has-invalid-input input', f).forEach(function (e) {
if (!e.name) return;
var sajat = mezo(e.name);
if (!sajat || mezok.indexOf(sajat) > -1) return;
mezok.push(sajat);
sajat.classList.add('is-invalid');
});
}
}
var cimkek = mezok.map(function (e) {
var l = e.id && $('label[for="' + e.id + '"]');
return l ? szoveg(l).replace(/\s*\(?kötelező\)?$/i, '') : e.name;
});
var kod = m ? m[1] : '';
var alap = kod && ismert[kod] ? ismert[kod] : 'A bolt nem fogadta el az adatokat.';
if (uzenetek.length) alap += ' A bolt üzenete: „' + uzenetek.join(' – ') + '”.';
if (cimkek.length) alap += ' Ellenőrizze: ' + cimkek.join(', ') + '.';
if (!uzenetek.length && !cimkek.length) alap += ' Ellenőrizze a telefonszámot, az irányítószámot és a címet.';
if (window.console) console.warn('Egyoldalas pénztár — az adatlapot a bolt visszadobta:', url.replace(/\?.*/, ''), uzenetek, mezok.map(function (e) { return e.name; }));
return alap;
}
function keretLetrehoz() {
if (A.keret) return;
A.keret = document.createElement('iframe');
A.keret.id = 'bb-p-keret';
A.keret.name = 'bb-p-keret';
A.keret.title = 'Szállítás és fizetés';
A.keret.setAttribute('scrolling', 'no');
A.keret.addEventListener('load', keretBetoltott);
$('#bb-p-szall .bb-p-keret-hely').appendChild(A.keret);
}
function keretBetolt(cim) {
keretLetrehoz();
A.keret.classList.add('bb-p-keret-tolt');
var ig = keretVar(30000);
A.keret.src = cim;
return ig;
}
function keretPost(fd) {
keretLetrehoz();
A.keret.classList.add('bb-p-keret-tolt');
var ig = keretVar(30000);
var f = document.createElement('form');
f.method = 'post';
f.action = A.form.action;
f.target = 'bb-p-keret';
f.style.display = 'none';
fd.forEach(function (v, k) {
if (typeof v !== 'string') return;
var i = document.createElement('input');
i.type = 'hidden'; i.name = k; i.value = v;
f.appendChild(i);
});
document.body.appendChild(f);
HTMLFormElement.prototype.submit.call(f);
setTimeout(function () { f.remove(); }, 2000);
return ig;
}
function kartonVar(w) {
var ig = null;
try { ig = w && w.bbKartondij; } catch (e) {  }
if (!ig) return Promise.resolve();
return Promise.race([Promise.resolve(ig), new Promise(function (ok) { setTimeout(ok, 15000); })]);
}
function keretVar(ms) {
if (A.keretVar) A.keretVar.nem(new Error('megszakítva'));
return new Promise(function (ok, nem) {
var v = A.keretVar = { ok: ok, nem: nem };
v.ido = setTimeout(function () {
if (A.keretVar === v) { A.keretVar = null; nem(new Error('A bolt nem válaszolt időben.')); }
}, ms);
});
}
function keretValasz(hiba, lap) {
var v = A.keretVar;
if (!v) return;
A.keretVar = null;
clearTimeout(v.ido);
if (hiba) v.nem(hiba); else v.ok(lap);
}
function keretBetoltott() {
var w, d;
try { w = A.keret.contentWindow; d = w.document; } catch (e) { A.keretLap = 'hiba'; keretValasz(null, 'hiba'); return; }
var ut = w.location.pathname;
if (ut === '/shop_order_mods.php' && d.forms.form_order && d.querySelector('.order-left-content')) {
A.keretLap = 'mods';
$('#bb-p-elonezet').hidden = true;
beagyaz(w, d);
A.keret.classList.remove('bb-p-keret-tolt');
keretValasz(null, 'mods');
} else if (ut === '/shop_order_control.php' && d.forms.form_szf && d.forms.form_megj) {
A.keretLap = 'control';
keretValasz(null, 'control');
} else {
A.keretLap = 'hiba';
A.keret.classList.add('bb-p-keret-tolt');
keretValasz(null, /shop_cart|puttony/.test(ut) ? 'kosar' : 'hiba');
}
}
function telefonParam(d) {
if (mobilHiba()) return;
$$('.js-order-methods-order-param', d).forEach(function (p) {
var inp = p.querySelector('input[type=text]');
if (inp && !inp.value && /telefon/i.test(szoveg(p.querySelector('label')))) {
inp.value = '+' + (ertek('kap_mobile_country') || '36') + ' ' + ertek('kap_mobile_sub');
}
});
}
var MODOK_CSS =
'.order-left-content{flex:0 0 100%!important;max-width:100%!important;width:100%!important;padding:0!important}' +
'.order-left-content .order-mods-section__col{flex:0 0 100%!important;max-width:100%!important}' +
'.order-mods-section__outer{background:transparent!important;padding:0!important;margin:0 0 28px!important;border:0!important;box-shadow:none!important}' +
'.order-mods__main-title{margin:0 0 14px!important;padding:0!important;background:none!important;border:0!important;color:#1a1d21!important;font-size:20px!important;font-weight:700!important;text-transform:none!important;letter-spacing:0!important}' +
'.order-mods__item{margin:0 0 8px!important;padding:15px 18px!important;border:1px solid #d9dde2;border-radius:10px;background:#fff;transition:border-color .15s,background .15s}' +
'.order-mods__item:has(input:checked){border-color:#36a317;background:#f3faf0;box-shadow:inset 0 0 0 1px #36a317}' +
'.order-mods__name{color:#1a1d21!important;font-weight:600!important;font-size:15px!important}' +
'.order-left-content .custom-control-input:checked~.custom-control-label::before{background-color:#36a317!important;border-color:#36a317!important}' +
'.order-mods__details{font-size:13px;color:#4b5563}' +
'.order-mods__params .form-control,.order-left-content select.form-control{min-height:48px;border:1px solid #d9dde2;border-radius:8px;font-size:15px}' +
'.js-order-mods-item:not(:has(input:checked)) .js-order-mods-details{display:none!important}';
function beagyaz(w, d) {
var cel = d.querySelector('.order-left-content');
var st = d.createElement('style');
st.textContent =
'html,body{background:transparent!important;min-height:0!important;height:auto!important;margin:0!important;padding:0!important;overflow:hidden!important}' +
'#exposeMask,[id^="overlay_"],.grecaptcha-badge,#cookie_alert,.cookie-alert{display:none!important}' +
MODOK_CSS;
d.head.appendChild(st);
var e = cel;
while (e && e !== d.body) {
var p = e.parentElement;
Array.prototype.forEach.call(p.children, function (s) {
if (s === e || /^(SCRIPT|STYLE|INPUT|LINK|NOSCRIPT)$/.test(s.tagName)) return;
s.style.setProperty('display', 'none', 'important');
});
if (e !== cel) {
['margin', 'padding'].forEach(function (k) { e.style.setProperty(k, '0', 'important'); });
e.style.setProperty('max-width', 'none', 'important');
e.style.setProperty('width', '100%', 'important');
}
e = p;
}
telefonParam(d);
var meretez = function () { A.keret.style.height = Math.ceil(cel.getBoundingClientRect().height + 4) + 'px'; };
meretez();
if (w.ResizeObserver) new w.ResizeObserver(meretez).observe(cel);
fizAlap(d);
osszegFigyel(w, d);
A.lapValt = false;
w.addEventListener('beforeunload', function () { A.lapValt = true; });
w.addEventListener('pagehide', function () { A.lapValt = true; A.keret.classList.add('bb-p-keret-tolt'); });
}
function fizAlap(d) {
var fizRadiok = $$('.fiz_radio', d);
if (!A.fizKezi && A.fizElore) {
var kert = fizRadiok.filter(function (r) { return A.fizElore.minta.test(r.value); })[0];
if (kert && !kert.disabled && !kert.checked) { A.fizAuto = true; kert.click(); A.fizAuto = false; }
}
fizRadiok.forEach(function (r) {
r.addEventListener('change', function () { if (!A.fizAuto) A.fizKezi = true; });
});
}
function osszegFigyel(w, d) {
var jobb = d.querySelector('.order-right-content');
var olvas = function () {
var kez = d.querySelector('.js-handling-cost-wrap');
var egyeb = $$('.sum-box-item', jobb || d).filter(function (s) {
return !/sum-box__(gross|net|shipping-cost|handling_price)/.test(s.className) && !s.classList.contains('d-none');
}).map(function (s) {
return { cim: szoveg(s.querySelector('.sum-box__title')).replace(/:$/, ''), ertek: szoveg(s.querySelector('.sum-box__value')) };
}).filter(function (s) { return s.cim && s.ertek && !/végösszeg|összesen|nettó/i.test(s.cim); });
A.osszegek = {
szallitas: szoveg(d.querySelector('.js-shipping-cost')).replace(/^-$/, ''),
kezeles: kez && !kez.classList.contains('d-none') ? szoveg(d.querySelector('.js-handling-cost')) : '',
egyeb: egyeb,
vegosszeg: szam(szoveg(d.querySelector('.js-total-price')))
};
A.vezerlo = null;
osszesito();
};
olvas();
if (jobb && w.MutationObserver) new w.MutationObserver(olvas).observe(jobb, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class'] });
d.addEventListener('change', function () { A.vezerlo = null; uzenet(''); });
}
function uzenet(html, tipus) {
var u = $('#bb-p-uzenet');
u.hidden = !html;
u.className = 'bb-p-uzenet' + (tipus ? ' bb-p-uzenet--' + tipus : '');
u.innerHTML = html || '';
}
function gomb(felirat, tilt) {
var g = $('#bb-p-kuld');
g.disabled = !!tilt;
g.innerHTML = tilt ? '<span class="bb-p-tolto"></span> ' + vedett(felirat) : vedett(felirat);
if (!tilt && felirat.indexOf('Megrendelés elküldése') === 0) g.innerHTML += '<small class="bb-p-gomb-fiz">(fizetési kötelezettséggel)</small>';
if (!tilt) gombOssz();
}
function kuldes() {
uzenet('');
$$('.bb-p-hibas').forEach(function (e) { e.classList.remove('bb-p-hibas'); });
$$('.is-invalid', A.form).forEach(function (e) { e.classList.remove('is-invalid'); });
if (A.vezerlo && A.keretLap === 'control' && !A.elonezet && lenyomat() === A.adatLenyomat) {
if (!aszfRendben()) return;
gomb('Továbbítás…', true);
elkuldes(A.vezerlo);
return;
}
var hiany = hianyzoAdatok();
if (hiany.length) {
hiany.forEach(function (e) { e.classList.add('is-invalid'); });
mobilJelol(true);
nevJelol(true);
hiany[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
uzenet('Kérjük, töltse ki a pirossal jelölt mezőket.', 'hiba');
return;
}
if (!aszfRendben()) return;
var mutatott;
gomb('Adatok mentése…', true);
veglegesit()
.then(function (eredmeny) {
if (eredmeny === 'uj') {
var h = new Error('Ellenőrizze a szállítási és fizetési módot, majd kattintson újra a gombra.');
h.figyel = true;
throw h;
}
gomb('Rendelés rögzítése…', true);
return kartonVar(A.keret.contentWindow).then(function () {
mutatott = A.osszegek ? A.osszegek.vegosszeg : null;
return keretTovabb();
});
})
.then(function (lap) {
if (lap !== 'control') throw new Error(lap === 'kosar' ? 'A Puttonya időközben kiürült vagy lejárt.' : 'A bolt nem fogadta el a szállítás/fizetés adatait.');
vegEgyeztet(vezerloOlvas(A.keret.contentWindow.document), mutatott, function () {
keretBetolt(ALAP + '/shop_order_mods.php?back=1');
});
})
.catch(function (e) {
gomb('Megrendelés elküldése');
if (e.figyel) {
uzenet(vedett(e.message), 'figyel');
$('#bb-p-szall').scrollIntoView({ behavior: 'smooth', block: 'start' });
return;
}
uzenet((e.html ? e.message : vedett(e.message)) + ' <a href="#" class="bb-p-kl">Folytatás a régi pénztárban</a>', 'hiba');
});
}
function veglegesit() {
return (A.fut || Promise.resolve()).catch(function () {}).then(function () {
if (lenyomat() !== A.adatLenyomat || A.elonezet || A.keretLap !== 'mods') return adatKuldes(false);
return 'marad';
});
}
function vegEgyeztet(v, mutatott, modosit) {
if (v.vegosszeg == null) {
var h = new Error('A végösszeg nem olvasható ki. A biztonság kedvéért a régi pénztárban fejezd be: <a href="' + ALAP + '/shop_order_control.php">Tovább az összesítéshez</a>.');
h.html = true;
throw h;
}
if (mutatott == null || Math.round(v.vegosszeg) !== Math.round(mutatott)) {
A.vezerlo = v;
osszesito();
gomb('Megrendelés elküldése · ' + ft(v.vegosszeg));
uzenet('A végösszeg a bolt számítása szerint <b>' + ft(v.vegosszeg) + '</b>. Kérjük, ellenőrizze, és kattintson újra a gombra. ' +
'<a href="#" class="bb-p-modosit">Módosítom a szállítást</a>', 'figyel');
var mo = $('#bb-p-uzenet .bb-p-modosit');
if (mo) mo.addEventListener('click', function (e) {
e.preventDefault(); A.vezerlo = null; uzenet(''); gomb('Megrendelés elküldése');
modosit();
});
return;
}
gomb('Továbbítás…', true);
elkuldes(v);
}
function aszfRendben() {
if ($('#bb-p-aszf').checked) return true;
$('.bb-p-aszf').classList.add('bb-p-hibas');
uzenet('A rendeléshez fogadja el az ÁSZF-et és az Adatkezelési tájékoztatót.', 'hiba');
return false;
}
function keretTovabb() {
var w = A.keret.contentWindow, d = w.document;
var gombK = d.getElementById('button_next');
if (!gombK) return Promise.reject(new Error('A szállítás/fizetés lap nem teljes.'));
var ig = keretVar(30000);
function hibaJott(uz) {
if (!A.keretVar) return;
A.keret.scrollIntoView({ behavior: 'smooth', block: 'center' });
keretValasz(new Error(uz));
}
if (w.jQuery) {
w.jQuery(d).one('errorOnOrderMethods clickOrderButtonError', function () {
hibaJott('Kérjük, egészítse ki a szállítás/fizetés adatait (pirossal jelölve).');
});
}
gombK.disabled = false;
gombK.click();
setTimeout(function () {
if (A.keretVar && !gombK.disabled && !A.lapValt && A.keret.contentWindow.document === d) {
hibaJott('Kérjük, egészítse ki a szállítás/fizetés adatait.');
}
}, 4000);
return ig;
}
function vezerloOlvas(d) {
var szf = d.forms.form_szf, megj = d.forms.form_megj;
var rejtett = {};
$$('input', szf).forEach(function (i) { if (i.name) rejtett[i.name] = i.value; });
$$('input', megj).forEach(function (i) { if (i.name && i.name in rejtett) rejtett[i.name] = i.value; });
var hossz = megj.elements.megj ? parseInt(megj.elements.megj.getAttribute('maxlength'), 10) : 0;
return { rejtett: rejtett, vegosszeg: vegosszegOlvas(d), megjHossz: hossz || 0,
elonezet: ELONEZET_JEL.test(lapSzoveg(d)) };
}
function vegosszegOlvas(d) {
var cimkek = $$('div,span,p,dt,th,td,strong,b', d).filter(function (e) {
return e.children.length === 0 && /^\s*Végösszeg:?\s*$/.test(e.textContent);
});
for (var i = 0; i < cimkek.length; i++) {
var s = cimkek[i].parentElement;
for (var j = 0; j < 3 && s; j++, s = s.parentElement) {
var m = s.textContent.replace(/\s+/g, ' ').match(/Végösszeg:?\s*([\d .]+?)\s*Ft/);
if (m) return parseInt(m[1].replace(/[ .]/g, ''), 10);
}
}
return null;
}
function elkuldes(v) {
if (v.elonezet) {
A.adatLenyomat = ''; A.elonezet = true; A.vezerlo = null;
gomb('Megrendelés elküldése');
if (!A.form) { location.replace(ALAP + '/shop_reg.php?no_reg=1'); return; }
uzenet('Az adatai még nem mentek be. Kérjük, ellenőrizze őket, és kattintson újra a gombra.', 'figyel');
return;
}
if (A.form && (A.elonezet || lenyomat() !== A.adatLenyomat)) {
gomb('Megrendelés elküldése');
uzenet('Az adatai még nem mentek be. Kérjük, kattintson újra a gombra.', 'figyel');
return;
}
var r = {};
Object.keys(v.rejtett).forEach(function (k) { r[k] = v.rejtett[k]; });
var megjegyzes = $('#bb-p-megjegyzes').value.trim();
if (v.megjHossz) megjegyzes = megjegyzes.slice(0, v.megjHossz);
r.megj = megjegyzes;
var f = document.createElement('form');
f.method = 'post';
f.action = ALAP + '/shop_order_send.php';
f.style.display = 'none';
Object.keys(r).forEach(function (k) {
var i = document.createElement('input');
i.type = 'hidden'; i.name = k; i.value = r[k];
f.appendChild(i);
});
document.body.appendChild(f);
if (window.jQuery) jQuery(document).trigger('clickOrderButton', { id: 'send', page: 'control' });
HTMLFormElement.prototype.submit.call(f);
}
function klasszikus(miert) {
try { sessionStorage.setItem(KLASSZIKUS, '1'); } catch (e) {  }
if (A.mod === 'belepett') { location.reload(); return; }
if (A.keretLap && A.form && !A.elonezet && A.adatLenyomat && lenyomat() === A.adatLenyomat) {
location.href = ALAP + '/shop_order_mods.php?back=1'; return;
}
document.documentElement.classList.remove('bb-penztar', 'bb-p-ceg');
['#bb-p-bal', '#bb-p-osszesito', '.bb-p-belepes'].forEach(function (s) { var e = $(s); if (e) e.remove(); });
if (A.form) {
A.form.parentElement.classList.remove('bb-p-racs');
delete A.form.submit;
}
var cim = $('#page_reg_content .main-title');
if (cim) cim.textContent = 'Adatok megadása';
if (miert && window.console) console.warn('Egyoldalas pénztár: ' + miert);
}
})();