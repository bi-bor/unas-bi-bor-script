(function () {
var MINDENKI = true;
var allapot = null;
try {
var m = location.search.match(/[?&]nyelvvalaszto=([01])/);
if (m) localStorage.setItem('bbNyelvValaszto', m[1]);
allapot = localStorage.getItem('bbNyelvValaszto');
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
if (!(window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches)) return;

var gyoker = document.documentElement;
gyoker.classList.add('bb-nv');
gyoker.setAttribute('data-bb-nv', '2026-10-15 15:35:58');
var stilus = document.createElement('style');
stilus.id = 'bb-nyelv';
stilus.textContent = "html.bb-nv #lang-and-money__dropdown .lang-and-money__wrapper{flex-direction: column !important;align-items: stretch !important;gap: 18px;width: 100% !important;max-width: none !important;margin: 0 !important;padding: 8px 10px 24px !important}html.bb-nv #lang-and-money__dropdown .lang-box,html.bb-nv #lang-and-money__dropdown .currency-box{width: 100% !important;max-width: none !important;margin: 0 !important;padding: 0 !important;border: 0 !important}html.bb-nv #lang-and-money__dropdown .lang-box__title,html.bb-nv #lang-and-money__dropdown .currency-box__title{margin: 0 0 10px !important;padding: 0 !important;text-align: left !important;font-size: 13px !important;font-weight: 700 !important;letter-spacing: .06em;text-transform: uppercase;color: #6b645a !important}html.bb-nv #lang-and-money__dropdown .lang-box__list,html.bb-nv #lang-and-money__dropdown .currency-box__list{display: grid !important;grid-template-columns: 1fr;gap: 8px;margin: 0 !important;padding: 0 !important;border: 0 !important;list-style: none}html.bb-nv #lang-and-money__dropdown .currency-box__list{grid-template-columns: 1fr 1fr}html.bb-nv #lang-and-money__dropdown .lang-box__list li,html.bb-nv #lang-and-money__dropdown .currency-box__list li{margin: 0 !important;padding: 0 !important;min-height: 0 !important;border: 0 !important}html.bb-nv #lang-and-money__dropdown .lang-box__list a,html.bb-nv #lang-and-money__dropdown .currency__label{position: relative;display: flex !important;align-items: center;gap: 12px;width: 100%;min-height: 52px;margin: 0 !important;padding: 10px 46px 10px 14px !important;border: 1.5px solid #e3e0da !important;border-radius: 10px !important;background: #fff !important;color: #221f1b !important;font-size: 16px !important;font-weight: 500;line-height: 1.2;text-align: left !important;text-decoration: none !important;text-transform: none !important;cursor: pointer}html.bb-nv #lang-and-money__dropdown .bb-nv-zaszlo{flex: none;width: 24px;height: 17px;border-radius: 3px;box-shadow: 0 0 0 1px rgba(0,0,0,.08);object-fit: cover}html.bb-nv #lang-and-money__dropdown .bb-nv-penz{margin-left: auto;font-size: 13px;font-weight: 600;color: #8a8276}html.bb-nv #lang-and-money__dropdown .bb-nv-tolt{opacity: .6}html.bb-nv #lang-and-money__dropdown .lang-box__list a::before,html.bb-nv #lang-and-money__dropdown .currency__label::before{content: none !important;display: none !important}html.bb-nv #lang-and-money__dropdown .lang-box__list a::after,html.bb-nv #lang-and-money__dropdown .currency__label::after{content: '' !important;display: block !important;position: absolute !important;top: 50% !important;left: auto !important;right: 14px !important;width: 20px !important;height: 20px !important;margin: 0 !important;transform: translateY(-50%) !important;border: 1.5px solid #d3cfc7 !important;border-radius: 50% !important;background: #fff none !important}html.bb-nv #lang-and-money__dropdown .lang-box__list a.is-selected,html.bb-nv #lang-and-money__dropdown .currency__radio:checked + .currency__label{border-color: #2a8511 !important;background: #eef6ea !important;color: #1f6a0c !important;font-weight: 700}html.bb-nv #lang-and-money__dropdown .lang-box__list a.is-selected .bb-nv-penz{color: #1f6a0c}html.bb-nv #lang-and-money__dropdown .lang-box__list a.is-selected::after,html.bb-nv #lang-and-money__dropdown .currency__radio:checked + .currency__label::after{border-color: #2a8511 !important;background: #2a8511 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E\") center / 12px no-repeat !important}html.bb-nv #lang-and-money__dropdown .currency-box__title{display: flex;align-items: center;gap: 6px;cursor: pointer}html.bb-nv #lang-and-money__dropdown .currency-box__title::after{content: '';width: 8px;height: 8px;margin-top: -3px;border-right: 2px solid currentColor;border-bottom: 2px solid currentColor;transform: rotate(45deg);transition: transform .2s,margin .2s}html.bb-nv #lang-and-money__dropdown .currency-box.bb-nv-nyitva .currency-box__title::after{margin-top: 3px;transform: rotate(-135deg)}html.bb-nv #lang-and-money__dropdown .currency-box:not(.bb-nv-nyitva) .currency-box__list{display: none !important}html.bb-nv #lang-and-money__dropdown .lang-and-money__dropdown-btn-close{border: 0 !important;border-radius: 50% !important;background-color: #f3f2ef !important}html.bb-nv .bb-nv-gomb{display: inline-flex;align-items: center;justify-content: center;width: 40px;height: 40px;margin: 0;padding: 0;border: 0;border-radius: 50%;background: none}html.bb-nv .bb-nv-gomb img{width: 24px;height: 17px;border-radius: 3px;box-shadow: 0 0 0 1px rgba(0,0,0,.1);object-fit: cover}";
(document.head || gyoker).appendChild(stilus);

var NYELV = (gyoker.lang || 'hu').slice(0, 2);
var PENZ = { hu: 'HUF', en: 'EUR', de: 'EUR', hr: 'EUR', ro: 'RON' };
var ZASZLO = { hu: 'hu', en: 'gb', de: 'de', hr: 'hr', ro: 'ro' };
var SZ = {
hu: ['Nyelv és pénznem', 'Más pénznem'], en: ['Language & currency', 'Other currency'],
de: ['Sprache & Währung', 'Andere Währung'], hr: ['Jezik i valuta', 'Druga valuta'],
ro: ['Limbă și monedă', 'Altă monedă']
}[NYELV] || ['Language & currency', 'Other currency'];

function zaszlo(kod) {
return '<img class="bb-nv-zaszlo" src="https://flagcdn.com/w40/' + (ZASZLO[kod] || kod) + '.png" width="24" height="17" alt="">';
}
function penzRadio(p, kod) {
var r = [].filter.call(p.querySelectorAll('.currency__radio'), function (x) {
var l = p.querySelector('label[for="' + x.id + '"]');
return l && l.textContent.indexOf(kod) > -1;
});
return r[0] || null;
}

function valt(p, a) {
var kod = a.getAttribute('data-langcode');
var uri = a.getAttribute('data-uri') || '/';
var cel = location.protocol + '//' + location.host + uri;
var megy = false;
var tovabb = function () { if (!megy) { megy = true; location.href = cel; } };
var r = penzRadio(p, PENZ[kod]);
if (!r || r.checked) { tovabb(); return; }
a.classList.add('bb-nv-tolt');
var adat = new URLSearchParams();
adat.append('file_back', uri);
adat.append('session_money_select', r.value);
fetch(location.protocol + '//' + location.host + '/shop_moneychange.php', { method: 'POST', body: adat, credentials: 'same-origin' })
.then(tovabb, tovabb);
setTimeout(tovabb, 4000);
}

function panel() {
var p = document.getElementById('lang-and-money__dropdown');
if (!p || p.getAttribute('data-bb-nv')) return;
p.setAttribute('data-bb-nv', '1');
var cim = p.querySelector('.lang-box__title');
if (cim) cim.textContent = SZ[0];
[].forEach.call(p.querySelectorAll('#box_lang_content a'), function (a) {
var kod = a.getAttribute('data-langcode') || '';
var r = penzRadio(p, PENZ[kod]);
var l = r && p.querySelector('label[for="' + r.id + '"]');
var penz = l ? (PENZ[kod] === 'HUF' ? 'Ft' : PENZ[kod]) : '';
a.innerHTML = zaszlo(kod) + '<span class="bb-nv-nev">' + (a.getAttribute('aria-label') || kod.toUpperCase()) + '</span>' +
(penz ? '<span class="bb-nv-penz">' + penz + '</span>' : '');
});
p.addEventListener('click', function (e) {
var a = e.target.closest && e.target.closest('#box_lang_content a');
if (!a) return;
e.preventDefault();
e.stopPropagation();
valt(p, a);
}, true);
var pb = p.querySelector('.currency-box');
var pc = pb && pb.querySelector('.currency-box__title');
if (pc) {
pc.textContent = SZ[1];
pc.setAttribute('role', 'button');
pc.setAttribute('aria-expanded', 'false');
pc.tabIndex = 0;
var nyit = function () { var ny = pb.classList.toggle('bb-nv-nyitva'); pc.setAttribute('aria-expanded', ny ? 'true' : 'false'); };
pc.addEventListener('click', nyit);
pc.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nyit(); } });
}
}

function fejlecGomb() {
if (NYELV === 'hu' || document.querySelector('.bb-nv-gomb')) return;
var prof = document.getElementById('profile__dropdown-btn');
var nyito = [].slice.call(document.querySelectorAll('.lang-and-money__dropdown-btn')).pop();
if (!prof || !nyito) return;
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-nv-gomb';
g.setAttribute('aria-label', SZ[0]);
g.innerHTML = zaszlo(NYELV);
g.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); setTimeout(function () { nyito.click(); }, 0); });
prof.parentNode.insertBefore(g, prof);
}

function indul() {
try { panel(); } catch (e) { if (window.console) console.error('[nyelv] panel', e); }
try { fejlecGomb(); } catch (e) { if (window.console) console.error('[nyelv] fejléc', e); }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
