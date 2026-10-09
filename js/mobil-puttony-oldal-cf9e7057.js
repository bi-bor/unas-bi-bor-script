(function () {
var MINDENKI = true;
var KULCS = 'bbPuttonyOldal';
var allapot = null;
try {
var m = location.search.match(/[?&]ujputtony=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
if (!/\/(puttony|shop_cart\.php)/.test(location.pathname)) return;

var gyoker = document.documentElement;
gyoker.setAttribute('data-bb-puttony', '2026-10-09 11:13:29');
var stilus = document.createElement('style');
stilus.id = 'bb-puttony-oldal';
stilus.textContent = ".bb-po-sav{display: none}#page_cart_content .bb-lep{display: inline-flex;align-items: center}@media (max-width: 575.98px){#page_cart_content.bb-po .custom-content--page_shop_cart .page_txt p{font-size: 14px !important;line-height: 1.45;color: #6b645a}#page_cart_content.bb-po .bb-po-lep .product__qty-buttons,#page_cart_content.bb-po .cart-item__qty-refresh-btn{display: none !important}#page_cart_content.bb-po .bb-po-lep{display: flex !important;flex-flow: row nowrap !important;align-items: center;gap: 8px;width: auto !important;max-width: none !important;border: 0 !important;background: none !important}#page_cart_content.bb-po .bb-lep{display: inline-flex;align-items: center;height: 40px;border: 1px solid #d9d2c5;border-radius: 20px;background: #fff}#page_cart_content.bb-po .bb-lep button{display: inline-flex;align-items: center;justify-content: center;width: 40px;height: 38px;padding: 0;border: 0;border-radius: 19px;background: none;color: #221f1b}#page_cart_content.bb-po .bb-lep button:disabled{color: #c9c2b6}#page_cart_content.bb-po .bb-lep .page_cart_db_input{width: 44px !important;height: 38px !important;padding: 0 !important;border: 0 !important;background: none !important;box-shadow: none !important;text-align: center;font-size: 16px !important;font-weight: 700;color: #221f1b;-moz-appearance: textfield}#page_cart_content.bb-po .bb-lep .page_cart_db_input::-webkit-outer-spin-button,#page_cart_content.bb-po .bb-lep .page_cart_db_input::-webkit-inner-spin-button{-webkit-appearance: none;margin: 0}#page_cart_content.bb-po .bb-po-lep .cart-item__qty-unit{position: static !important;width: auto !important;transform: none !important;font-size: 14px;color: #6b645a}#page_cart_content.bb-po.bb-po-ment .cart-items{opacity: .55;pointer-events: none;transition: opacity .2s}#page_cart_content.bb-po .cart__buttons{gap: 4px 18px;margin: 4px 0 18px !important}#page_cart_content.bb-po .cart__btn-modify{display: none !important}#page_cart_content.bb-po .cart__buttons .btn{margin: 0 !important;padding: 6px 0 !important;border: 0 !important;background: none !important;box-shadow: none !important;font-size: 14px !important;font-weight: 600 !important;color: #1f6a0c !important;text-decoration: underline;text-transform: none !important}#page_cart_content.bb-po .cart__buttons .btn::before,#page_cart_content.bb-po .cart__buttons .btn::after{display: none !important}#page_cart_content.bb-po .cart__buttons .cart__btn-delete-all{color: #6b645a !important}#page_cart_content.bb-po .sum-box__main-title{font-size: 20px !important;text-transform: none !important;letter-spacing: 0 !important}#page_cart_content.bb-po .sum-box__total-price,#page_cart_content.bb-po .sum-box__total-price *{color: #221f1b !important}#page_cart_content.bb-po .sum-box__total-price .sum-box__value{font-size: 24px !important;font-weight: 800 !important}#page_cart_content.bb-po .sum-box__coupon.bb-po-kupon{box-sizing: border-box;width: 100% !important;max-width: 100% !important;margin: 0 0 18px !important;padding: 16px !important;text-align: left !important;border: 1.5px dashed #2a8511 !important;border-radius: 12px !important;background: #f3faf0 !important;background-image: none !important}#page_cart_content.bb-po .bb-po-kupon::before,#page_cart_content.bb-po .bb-po-kupon::after{display: none !important}.bb-po-kupon-cim{display: flex;gap: 10px;align-items: flex-start;margin-bottom: 12px;color: #1f6a0c;font-size: 15px;font-weight: 700;line-height: 1.35}.bb-po-kupon-cim svg{flex: 0 0 20px;margin-top: 1px}.bb-po-kupon-cim small{display: block;margin-top: 2px;color: #4b5563;font-size: 13px;font-weight: 400}#page_cart_content.bb-po .bb-po-kupon .sum-box__coupon-form-wrapper{width: 100% !important;max-width: none !important;margin: 0 !important;padding: 0 !important;background: none !important;border: 0 !important}#page_cart_content.bb-po .bb-po-kupon .sum-box__coupon-form{width: 100% !important;max-width: none !important;display: flex !important;gap: 8px;align-items: stretch;margin: 0 !important}#page_cart_content.bb-po .bb-po-kupon .sum-box__coupon-input{flex: 1;min-width: 0;height: auto !important;min-height: 48px;margin: 0 !important;padding: 10px 14px !important;border: 1px solid #d9d2c5 !important;border-radius: 8px !important;background: #fff !important;box-shadow: none !important;font-size: 16px !important;text-align: left !important}#page_cart_content.bb-po .bb-po-kupon .sum-box__coupon-input:focus{border-color: #2a8511 !important;box-shadow: 0 0 0 3px rgba(42,133,17,.15) !important;outline: 0 !important}#page_cart_content.bb-po .bb-po-kupon .sum-box__coupon-check-btn{flex: 0 0 auto;display: inline-flex !important;align-items: center;justify-content: center;height: auto !important;min-height: 48px;line-height: 1 !important;margin: 0 !important;padding: 0 18px !important;border: 0 !important;border-radius: 8px !important;background: #2a8511 !important;color: #fff !important;font-size: 14px !important;font-weight: 700 !important;text-decoration: none !important;box-shadow: none !important}#page_cart_content.bb-po .bb-po-kupon .sum-box__coupon-check-btn::before,#page_cart_content.bb-po .bb-po-kupon .sum-box__coupon-check-btn::after{display: none !important}#page_cart_content.bb-po .sum-box__cart-next-btn{width: 100% !important;min-height: 54px;border-radius: 10px !important;font-size: 17px !important;font-weight: 700 !important;text-transform: none !important;box-shadow: none !important}#page_cart_content.bb-po .sum-box__cart-next-btn::before,#page_cart_content.bb-po .sum-box__cart-next-btn::after{display: none !important}html.bb-po-van .bb-po-sav{position: fixed;left: 0;right: 0;bottom: 0;z-index: 1000;display: flex;align-items: center;gap: 12px;padding: 10px 16px calc(env(safe-area-inset-bottom,0px) + 10px);background: #fff;box-shadow: 0 -6px 20px rgba(20,18,16,.12);transform: translateY(110%);transition: transform .25s ease}html.bb-po-van .bb-po-sav.lathato{transform: none}html.bb-kp .bb-po-sav{transform: translateY(110%) !important}.bb-po-sav-osszeg{display: flex;flex-direction: column;line-height: 1.2}.bb-po-sav-osszeg span{font-size: 12px;color: #6b645a}.bb-po-sav-osszeg b{font-size: 18px;font-weight: 800;color: #221f1b;white-space: nowrap}.bb-po-sav-gomb{flex: 1;min-height: 48px;border: 0;border-radius: 10px;background: #2a8511;color: #fff;font-size: 16px;font-weight: 700}}";
(document.head || gyoker).appendChild(stilus);

function kisMobil() { return window.matchMedia && window.matchMedia('(max-width: 575.98px)').matches; }
function szoveg(el, uj) { if (el && el.textContent !== uj) el.textContent = uj; }
var LEP_MINUSZ = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
var LEP_PLUSZ = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>';
function puttonyOldal() {
var lap = document.getElementById('page_cart_content');
if (!lap || !kisMobil() || lap.classList.contains('bb-po')) return;
var urlap = document.forms.form_temp;
if (!urlap || typeof window.modify !== 'function') return;
lap.classList.add('bb-po');
var idozito = null;
function mentes() {
clearTimeout(idozito);
idozito = setTimeout(function () { lap.classList.add('bb-po-ment'); window.modify(); }, 800);
}
[].forEach.call(lap.querySelectorAll('.cart-item__input-wrap'), function (w) {
var mezo = w.querySelector('.page_cart_db_input');
if (!mezo || w.querySelector('.bb-lep')) return;
var also = +(mezo.getAttribute('data-min') || mezo.min || 1) || 1;
var felso = +(mezo.getAttribute('data-max') || mezo.max || 999999) || 999999;
var lepes = +(mezo.getAttribute('data-step') || mezo.step || 1) || 1;
var l = document.createElement('div');
l.className = 'bb-lep';
l.innerHTML = '<button type="button" class="bb-lep-minusz" aria-label="Kevesebb">' + LEP_MINUSZ + '</button>' +
'<button type="button" class="bb-lep-plusz" aria-label="Több">' + LEP_PLUSZ + '</button>';
l.insertBefore(mezo, l.lastChild);
mezo.setAttribute('inputmode', 'numeric');
function allapot() { l.querySelector('.bb-lep-minusz').disabled = (+mezo.value || 0) - lepes < also; }
l.addEventListener('click', function (e) {
var g = e.target.closest('button');
if (!g || g.disabled) return;
e.preventDefault();
var uj = (+mezo.value || 0) + (g.classList.contains('bb-lep-plusz') ? lepes : -lepes);
mezo.value = String(Math.min(felso, Math.max(also, uj)));
allapot();
mentes();
});
mezo.addEventListener('change', function () { allapot(); mentes(); });
w.insertBefore(l, w.firstChild);
w.classList.add('bb-po-lep');
allapot();
});
var vissza = lap.querySelector('.cart__btn-back');
if (vissza) vissza.textContent = 'Vásárlás folytatása';
var kupon = lap.querySelector('.sum-box__coupon');
if (kupon && !kupon.querySelector('.bb-po-kupon-cim')) {
var kc = document.createElement('div');
kc.className = 'bb-po-kupon-cim';
kc.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
'<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>' +
'<span>Van kuponkódod? <small>Add meg itt, és levonjuk a kedvezményt.</small></span>';
kupon.insertBefore(kc, kupon.firstChild);
kupon.classList.add('bb-po-kupon');
var ell = kupon.querySelector('.sum-box__coupon-check-btn');
if (ell && !ell.querySelector('*')) ell.textContent = 'Beváltás';
}
var tovabb = lap.querySelector('.sum-box__cart-next-btn');
var vegosszeg = lap.querySelector('.sum-box__total-price .sum-box__value, .js-total-price');
if (!tovabb || !window.IntersectionObserver) return;
var sav = document.createElement('div');
sav.className = 'bb-po-sav';
sav.innerHTML = '<div class="bb-po-sav-osszeg"><span>Összesen</span><b></b></div><button type="button" class="bb-po-sav-gomb">Tovább a pénztárhoz</button>';
function osszeg() { if (vegosszeg) szoveg(sav.querySelector('b'), vegosszeg.textContent.replace(/\s+/g, ' ').trim()); }
osszeg();
if (vegosszeg) new MutationObserver(osszeg).observe(vegosszeg, { childList: true, subtree: true, characterData: true });
sav.querySelector('button').addEventListener('click', function () { tovabb.click(); });
document.body.appendChild(sav);
gyoker.classList.add('bb-po-van');
new IntersectionObserver(function (bejegyzesek) {
sav.classList.toggle('lathato', !bejegyzesek[0].isIntersecting);
}).observe(tovabb);
tovabb.textContent = 'Tovább a pénztárhoz';
}

function indul() {
try { puttonyOldal(); } catch (e) { if (window.console) console.error('[puttony oldal]', e); }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
