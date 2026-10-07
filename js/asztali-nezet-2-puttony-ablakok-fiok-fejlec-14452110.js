(function () {
var MINDENKI = true;
var gyoker = document.documentElement;
function kapcsolo(nev, kulcs) {
try {
var m = location.search.match(new RegExp('[?&]' + nev + '=([01])'));
if (m) localStorage.setItem(kulcs, m[1]);
return localStorage.getItem(kulcs);
} catch (e) { return null; /* tiltott tárhely: marad az alapértelmezés */ }
}
var allapot = kapcsolo('asztali', 'bbAsztali');
if (allapot === '0' || (!allapot && !MINDENKI)) return;
gyoker.classList.add('bb-asztal');
gyoker.setAttribute('data-bb-asztali2', '2026-10-07 13:47:49');
var stilus = document.createElement('style');
stilus.id = 'bb-asztali-2';
stilus.textContent = "@media (min-width: 768px){#page_cart_content.bb-apo .bb-apo-lep .product__qty-buttons,#page_cart_content.bb-apo .cart-item__qty-refresh-btn{display: none !important}#page_cart_content.bb-apo .bb-apo-lep{display: flex !important;flex-flow: column nowrap !important;align-items: center;gap: 2px;width: auto !important;max-width: none !important;height: auto !important;padding: 0 !important;border: 0 !important;background: none !important;box-shadow: none !important}#page_cart_content.bb-apo .bb-lep{display: inline-flex;align-items: center;height: 40px;border: 1px solid #d9d2c5;border-radius: 20px;background: #fff}#page_cart_content.bb-apo .bb-lep button{display: inline-flex;align-items: center;justify-content: center;width: 36px;height: 38px;padding: 0;cursor: pointer;border: 0;border-radius: 19px;background: none;color: #221f1b}#page_cart_content.bb-apo .bb-lep button:hover:not(:disabled){background: #f3efe8}#page_cart_content.bb-apo .bb-lep button:disabled{color: #c9c2b6;cursor: default}#page_cart_content.bb-apo .bb-lep .page_cart_db_input{width: 48px !important;height: 38px !important;padding: 0 !important;border: 0 !important;background: none !important;box-shadow: none !important;text-align: center;font-size: 16px !important;font-weight: 700;color: #221f1b;-moz-appearance: textfield}#page_cart_content.bb-apo .bb-lep .page_cart_db_input::-webkit-outer-spin-button,#page_cart_content.bb-apo .bb-lep .page_cart_db_input::-webkit-inner-spin-button{-webkit-appearance: none;margin: 0}#page_cart_content.bb-apo .bb-apo-lep .cart-item__qty-unit{position: static !important;width: auto !important;transform: none !important;font-size: 13px;color: #6b645a}#page_cart_content.bb-apo.bb-apo-ment .cart-items{opacity: .55;pointer-events: none;transition: opacity .2s}#page_cart_content.bb-apo .cart__buttons{gap: 4px 22px}#page_cart_content.bb-apo .cart__btn-modify{display: none !important}#page_cart_content.bb-apo .cart__buttons .btn{margin: 0 !important;padding: 6px 0 !important;border: 0 !important;background: none !important;box-shadow: none !important;font-size: 14px !important;font-weight: 600 !important;color: #1f6a0c !important;text-decoration: underline;text-transform: none !important}#page_cart_content.bb-apo .cart__buttons .btn::before,#page_cart_content.bb-apo .cart__buttons .btn::after{display: none !important}#page_cart_content.bb-apo .cart__buttons .cart__btn-delete-all{color: #8a8276 !important}#page_cart_content.bb-apo .sum-box__total-price .sum-box__value{font-size: 24px !important;font-weight: 800 !important}#page_cart_content.bb-apo .sum-box__coupon.bb-po-kupon{box-sizing: border-box;width: 100% !important;max-width: 100% !important;margin: 0 0 18px !important;padding: 16px !important;text-align: left !important;border: 1.5px dashed #2a8511 !important;border-radius: 12px !important;background: #f3faf0 !important;background-image: none !important}#page_cart_content.bb-apo .bb-po-kupon::before,#page_cart_content.bb-apo .bb-po-kupon::after{display: none !important}#page_cart_content.bb-apo .bb-po-kupon-cim{display: flex;gap: 10px;align-items: flex-start;margin-bottom: 12px;color: #1f6a0c;font-size: 15px;font-weight: 700;line-height: 1.35}#page_cart_content.bb-apo .bb-po-kupon-cim svg{flex: 0 0 20px;margin-top: 1px}#page_cart_content.bb-apo .bb-po-kupon-cim small{display: block;margin-top: 2px;color: #4b5563;font-size: 13px;font-weight: 400}#page_cart_content.bb-apo .bb-po-kupon .sum-box__coupon-form-wrapper{width: 100% !important;max-width: none !important;margin: 0 !important;padding: 0 !important;background: none !important;border: 0 !important}#page_cart_content.bb-apo .bb-po-kupon .sum-box__coupon-form{width: 100% !important;max-width: none !important;display: flex !important;gap: 8px;align-items: stretch;margin: 0 !important}#page_cart_content.bb-apo .bb-po-kupon .sum-box__coupon-input{flex: 1;min-width: 0;height: auto !important;min-height: 46px;margin: 0 !important;padding: 10px 14px !important;border: 1px solid #d9d2c5 !important;border-radius: 8px !important;background: #fff !important;box-shadow: none !important;font-size: 15px !important;text-align: left !important}#page_cart_content.bb-apo .bb-po-kupon .sum-box__coupon-input:focus{border-color: #2a8511 !important;box-shadow: 0 0 0 3px rgba(42,133,17,.15) !important;outline: 0 !important}#page_cart_content.bb-apo .bb-po-kupon .sum-box__coupon-check-btn{flex: 0 0 auto;display: inline-flex !important;align-items: center;justify-content: center;height: auto !important;min-height: 46px;line-height: 1 !important;margin: 0 !important;padding: 0 18px !important;border: 0 !important;border-radius: 8px !important;background: #2a8511 !important;color: #fff !important;font-size: 14px !important;font-weight: 700 !important;text-decoration: none !important;box-shadow: none !important}#page_cart_content.bb-apo .bb-po-kupon .sum-box__coupon-check-btn::before,#page_cart_content.bb-apo .bb-po-kupon .sum-box__coupon-check-btn::after{display: none !important}#page_cart_content.bb-apo .sum-box__cart-next-btn{width: 100% !important;max-width: none !important;white-space: nowrap;border-radius: 10px !important;font-size: 17px !important;font-weight: 700 !important;text-transform: none !important}#page_cart_content.bb-apo .sum-box__cart-next-btn::before,#page_cart_content.bb-apo .sum-box__cart-next-btn::after{display: none !important}.bb-apo-tovabb{position: fixed;left: 50%;bottom: 16px;z-index: 60;box-sizing: border-box;width: min(760px,calc(100% - 32px));display: flex;align-items: center;justify-content: flex-end;gap: 20px;margin: 0;padding: 14px 18px;border: 1px solid #ece6dc;border-radius: 16px;background: #fff;box-shadow: 0 10px 30px rgba(20,18,16,.16);transform: translate(-50%,calc(100% + 24px));opacity: 0;pointer-events: none;transition: transform .28s ease,opacity .28s ease}.bb-apo-tovabb.bb-lathato{transform: translate(-50%,0);opacity: 1;pointer-events: auto}.bb-apo-tovabb-osszeg{display: flex;flex-direction: column;line-height: 1.2;margin-right: auto}.bb-apo-tovabb-osszeg span{font-size: 13px;color: #6b645a}.bb-apo-tovabb-osszeg b{font-size: 22px;font-weight: 800;color: #221f1b;white-space: nowrap}.bb-apo-tovabb button{min-height: 50px;padding: 0 28px;border: 0;border-radius: 10px;cursor: pointer;background: #2a8511;color: #fff;font-size: 16px;font-weight: 700;box-shadow: 0 2px 6px rgba(42,133,17,.18)}.bb-apo-tovabb button:hover{background: #237010}html.bb-asztal .overlay_common:is(.overlay_warning,.overlay_error,.overlay_info,.overlay_ok,.overlay_dialog){padding: 8px 28px 24px !important;background: #fff !important;border: 0 !important;border-radius: 18px !important;box-shadow: 0 20px 60px rgba(20,18,16,.25) !important;text-align: center}html.bb-asztal .overlay_common .overlay_close{position: absolute;top: 12px;right: 12px;z-index: 2}html.bb-asztal .overlay_common .overlay_close-btn{width: 36px !important;height: 36px !important;padding: 0 !important;border: 0 !important;border-radius: 50% !important;background: #f3efe8 !important;color: #6b645a !important;box-shadow: none !important}html.bb-asztal .overlay_common .overlay__title-wrap{margin: 0 !important;padding: 20px 30px 4px !important;background: none !important;border: 0 !important}html.bb-asztal .overlay_common .overlay-icon{width: 56px;height: 56px;margin: 0 auto 12px !important;border-radius: 50%;align-items: center;justify-content: center;font-size: 26px !important;line-height: 1}html.bb-asztal .overlay_info .overlay-info__icon,html.bb-asztal .overlay_ok .overlay-ok__icon,html.bb-asztal .overlay_dialog .overlay-dialog__icon{display: flex !important;background: #eaf3e6;color: #2a8511 !important}html.bb-asztal .overlay_warning .overlay-warning__icon{display: flex !important;background: #fff6d6;color: #b07a00 !important}html.bb-asztal .overlay_error .overlay-error__icon{display: flex !important;background: #fdecec;color: #c62828 !important}html.bb-asztal .overlay_common .overlay_title{margin: 0 !important;padding: 0 !important;font-size: 20px !important;font-weight: 800 !important;line-height: 1.3 !important;color: #221f1b !important}html.bb-asztal .overlay_common .overlay_text{margin: 0 !important;padding: 8px 4px 0 !important;font-size: 15px !important;line-height: 1.5;color: #4f4a42 !important;background: none !important}html.bb-asztal .overlay_common .overlay-buttons{display: flex !important;justify-content: center;flex-wrap: wrap;gap: 10px;padding: 20px 0 0 !important;margin: 0 !important}html.bb-asztal .overlay_common .overlay-buttons .btn{display: inline-flex !important;align-items: center;justify-content: center;min-width: 140px;min-height: 46px;margin: 0 !important;padding: 8px 20px !important;border: 2px solid #2a8511 !important;border-radius: 10px !important;background: #2a8511 !important;color: #fff !important;font-size: 15px !important;font-weight: 700 !important;line-height: 1.2 !important;box-shadow: none !important;text-transform: none !important}html.bb-asztal .overlay_common .overlay-buttons .btn::before,html.bb-asztal .overlay_common .overlay-buttons .btn::after{display: none !important}html.bb-asztal .overlay_common .overlay-buttons .btn.overlay_button_close:not(:only-child){background: #fff !important;color: #1f6a0c !important}html.bb-asztal #profile__dropdown.bb-pm .bb-pm-hely{margin: 0 !important;padding: 0 !important}html.bb-asztal #profile__dropdown.bb-pm .bb-pm-sor{display: flex !important;align-items: center;gap: 12px;width: 100% !important;min-height: 48px;margin: 0 !important;padding: 10px 6px !important;box-sizing: border-box;background: none !important;border: 0 !important;border-bottom: 1px solid #ece6dc !important;border-radius: 0 !important;box-shadow: none !important;text-align: left !important;text-transform: none !important;letter-spacing: 0 !important;font-size: 15px !important;font-weight: 600 !important;line-height: 1.3 !important;color: #221f1b !important;transition: background .15s}html.bb-asztal #profile__dropdown.bb-pm .bb-pm-sor::before,html.bb-asztal #profile__dropdown.bb-pm .bb-pm-sor::after{display: none !important}html.bb-asztal #profile__dropdown.bb-pm .bb-pm-sor:hover{background: #f6f2ea !important}html.bb-asztal #profile__dropdown.bb-pm .bb-pm-ikon{display: inline-flex;flex: 0 0 22px;color: #2a8511}html.bb-asztal #profile__dropdown.bb-pm .bb-pm-cimke{flex: 1 1 auto}html.bb-asztal #profile__dropdown.bb-pm .bb-pm-nyil{display: inline-flex;color: #b3ab9e}html.bb-asztal #profile__dropdown.bb-pm .bb-pm-kilep{margin-top: 8px !important;border-bottom: 0 !important;font-weight: 500 !important;color: #c62828 !important}html.bb-asztal #profile__dropdown.bb-pm .bb-pm-kilep .bb-pm-ikon{color: #c62828}html.bb-asztal #cookieConsent{display: none !important}html.bb-asztal #overlay_cookie_alert{top: auto !important;bottom: 20px !important;left: 20px !important;right: auto !important;width: 400px !important;max-width: calc(100% - 40px) !important;margin: 0 !important;max-height: calc(100vh - 40px);overflow-y: auto;overscroll-behavior: contain;background: #fff !important;border: 1px solid #ece6dc !important;border-radius: 16px !important;box-shadow: 0 12px 40px rgba(20,18,16,.22) !important;transform: none !important;animation: bb-asuti-be .35s cubic-bezier(.2,.8,.2,1) both !important}@keyframes bb-asuti-be{from{opacity: 0;translate: 0 24px}to{opacity: 1;translate: 0 0}}html.bb-asztal #overlay_cookie_alert\u003E.close{display: none !important}html.bb-asztal #overlay_cookie_alert .cookie-alert__inner{padding: 18px 0 14px !important}html.bb-asztal #overlay_cookie_alert .container{max-width: none !important;padding: 0 20px !important}html.bb-asztal #overlay_cookie_alert .cookie-alert__title{margin-bottom: 6px;font-size: 17px !important;font-weight: 800 !important;color: #221f1b}html.bb-asztal #overlay_cookie_alert .cookie-alert__text{font-size: 13.5px !important;line-height: 1.5;color: #4f4a42}html.bb-asztal #overlay_cookie_alert .cookie-alert__text a{color: inherit;text-decoration: underline}html.bb-asztal #overlay_cookie_alert .cookie-alert__text a b{font-weight: 600}html.bb-asztal #overlay_cookie_alert .py-3.px-md-4{padding: 0 !important}html.bb-asztal #overlay_cookie_alert .cookie-alert__checkboxes{padding-top: 14px}html.bb-asztal #overlay_cookie_alert .custom-control{margin-bottom: 10px !important}html.bb-asztal #overlay_cookie_alert .custom-control-label{font-size: 14px !important;color: #221f1b}html.bb-asztal #overlay_cookie_alert .custom-control .font-s{margin-top: 2px;font-size: 12.5px !important;line-height: 1.45;color: #6b645a}html.bb-asztal #overlay_cookie_alert .custom-control-input:checked ~ .custom-control-label::before{background-color: #2a8511 !important;border-color: #2a8511 !important}html.bb-asztal #overlay_cookie_alert .cookie-alert__btn-set-wrap{display: grid !important;grid-template-columns: 1fr 1fr;gap: 8px;margin-top: 14px;text-align: center}html.bb-asztal #overlay_cookie_alert .cookie-alert__btn-set-wrap .btn{margin: 0 !important;min-height: 44px;padding: 8px 10px !important;border-radius: 10px !important;font-size: 14px !important;font-weight: 700 !important;line-height: 1.2;box-shadow: none !important;text-transform: none !important}html.bb-asztal #overlay_cookie_alert .btn::before,html.bb-asztal #overlay_cookie_alert .btn::after{display: none !important}html.bb-asztal #overlay_cookie_alert .cookie-alert__btn-allow{background: #2a8511 !important;border: 2px solid #2a8511 !important;color: #fff !important}html.bb-asztal #overlay_cookie_alert .cookie-alert__btn-decline{background: #fff !important;border: 2px solid #2a8511 !important;color: #1f6a0c !important}html.bb-asztal #overlay_cookie_alert .cookie-alert__btn-set-wrap .cookie-alert__btn-config{grid-column: 1 / -1;min-height: 30px;padding: 2px !important;border: 0 !important;background: none !important;font-size: 13px !important;font-weight: 400 !important;color: #6b645a !important;text-decoration: underline}html.bb-asztal #overlay_cookie_alert .cookie-alert__btn-set{width: 100%;min-height: 44px;border-radius: 10px !important;box-shadow: none !important}html.bb-asztal .bb-ark-ujra{display: inline-flex;align-items: center;justify-content: center;min-height: 38px;margin: 6px 0 0 8px;padding: 0 16px;border: 2px solid #2a8511;border-radius: 10px;background: #2a8511;color: #fff !important;font-size: 14px;font-weight: 700;text-decoration: none !important;white-space: nowrap}html.bb-asztal .bb-ark-ujra:hover{background: #237010;border-color: #237010}html.bb-asztal .nav-item .nav-link .nav-link__icon{display: inline-flex !important;align-items: center;justify-content: center;flex: 0 0 30px !important;width: 30px !important;height: 30px !important;min-width: 30px !important;min-height: 30px !important;max-width: none !important;max-height: none !important;margin-right: 4px !important;border-radius: 50% !important;background: #f2efea !important;transition: background-color .22s ease,transform .22s ease,box-shadow .22s ease}html.bb-asztal .nav-item .nav-link .nav-link__icon img{width: 17px !important;height: 17px !important;object-fit: contain;filter: brightness(0) opacity(.86);transition: filter .22s ease}html.bb-asztal .nav-item + .nav-item\u003E.nav-link{padding-left: 12px !important}html.bb-asztal .nav-item:hover\u003E.nav-link .nav-link__icon,html.bb-asztal .nav-item\u003E.nav-link:focus-visible .nav-link__icon{background: #eaf5e4 !important;transform: translateY(-1px);box-shadow: 0 2px 8px rgba(42,133,17,.12)}html.bb-asztal .nav-item:hover\u003E.nav-link .nav-link__icon img{filter: brightness(0) saturate(100%) invert(38%) sepia(86%) saturate(590%) hue-rotate(69deg) brightness(91%) contrast(95%)}html.bb-asztal .nav-item:hover\u003E.nav-link .nav-link__text{color: #1f6a0c !important}html.bb-asztal #nav-item-907727\u003E.nav-link .nav-link__icon{background: #fdecea !important}html.bb-asztal #nav-item-907727\u003E.nav-link .nav-link__icon img{filter: none}html.bb-asztal #nav-item-907727:hover\u003E.nav-link .nav-link__icon{background: #fbd9d5 !important;box-shadow: 0 2px 8px rgba(229,57,53,.14)}@media (max-width: 1599.98px){html.bb-asztal .nav-item .nav-link .nav-link__icon{flex-basis: 24px !important;width: 24px !important;height: 24px !important;min-width: 24px !important;min-height: 24px !important;margin-right: 2px !important}html.bb-asztal .nav-item .nav-link .nav-link__icon img{width: 14px !important;height: 14px !important}html.bb-asztal .nav-item + .nav-item\u003E.nav-link{padding-left: 2px !important}}html.bb-asztal .lang-dropdown .lang-current,html.bb-asztal select.money-select{display: inline-flex !important;align-items: center;gap: 8px;height: 40px !important;padding: 0 34px 0 12px !important;box-sizing: border-box;border: 1.5px solid #e2dbcf !important;border-radius: 999px !important;background-color: #fff !important;color: #221f1b !important;font-size: 14px !important;font-weight: 600 !important;line-height: 1 !important;box-shadow: none !important;cursor: pointer;transition: border-color .2s ease,box-shadow .2s ease;background-image: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23221f1b' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\") !important;background-repeat: no-repeat !important;background-position: right 12px center !important;background-size: 14px 14px !important}html.bb-asztal select.money-select{-webkit-appearance: none !important;appearance: none !important;width: auto !important;min-width: 0 !important}html.bb-asztal .lang-dropdown .lang-current:hover,html.bb-asztal select.money-select:hover,html.bb-asztal select.money-select:focus{border-color: #2a8511 !important;box-shadow: 0 0 0 3px rgba(42,133,17,.12) !important;outline: 0 !important}html.bb-asztal .lang-dropdown .lang-current::after{display: none !important}html.bb-asztal .lang-dropdown img{width: 20px !important;height: 20px !important;flex: 0 0 20px;border-radius: 50% !important;object-fit: cover;box-shadow: 0 0 0 1px rgba(20,18,16,.12)}html.bb-asztal .lang-dropdown .lang-options{min-width: 170px;margin-top: 8px !important;padding: 6px !important;list-style: none !important;border: 1px solid #ece6dc !important;border-radius: 14px !important;background: #fff !important;box-shadow: 0 12px 32px rgba(20,18,16,.14) !important}html.bb-asztal .lang-dropdown .lang-options li{display: flex !important;align-items: center;gap: 10px;margin: 0 !important;padding: 9px 10px !important;border-radius: 10px;color: #221f1b;font-size: 14px;font-weight: 500;cursor: pointer;transition: background-color .15s ease}html.bb-asztal .lang-dropdown .lang-options li:hover{background: #f1f7ed !important}html.bb-asztal .lang-dropdown .lang-options li[aria-current=\"true\"]{font-weight: 700;color: #1f6a0c;background: #f6faf3}html.bb-asztal .currency-select-group,html.bb-asztal .lang-select-group{margin-right: 6px !important}html.bb-asztal .currency-select-group::before,html.bb-asztal .currency-select-group::after,html.bb-asztal .lang-select-group::before,html.bb-asztal .lang-select-group::after{display: none !important}}";
(document.head || gyoker).appendChild(stilus);

function asztalon() { return !!(window.matchMedia && window.matchMedia('(min-width: 768px)').matches); }


var LEP_MINUSZ = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
var LEP_PLUSZ = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>';
function puttonyOldal() {
if (kapcsolo('ujputtony', 'bbPuttonyOldal') === '0') return;
var lap = document.getElementById('page_cart_content');
if (!lap || lap.classList.contains('bb-apo') || lap.classList.contains('bb-po')) return;
if (!document.forms.form_temp || typeof window.modify !== 'function') return;
lap.classList.add('bb-apo');
var idozito = null;
function mentes() {
clearTimeout(idozito);
idozito = setTimeout(function () { lap.classList.add('bb-apo-ment'); window.modify(); }, 800);
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
w.classList.add('bb-apo-lep');
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
var gombsor = lap.querySelector('.cart__buttons');
if (!tovabb || !gombsor) return;
tovabb.textContent = 'Tovább a pénztárhoz';
var sav = document.createElement('div');
sav.className = 'bb-apo-tovabb';
sav.innerHTML = '<div class="bb-apo-tovabb-osszeg"><span>Összesen</span><b></b></div><button type="button">Tovább a pénztárhoz</button>';
function osszeg() {
var t = vegosszeg ? vegosszeg.textContent.replace(/\s+/g, ' ').trim() : '';
sav.querySelector('.bb-apo-tovabb-osszeg').style.display = t ? '' : 'none';
if (sav.querySelector('b').textContent !== t) sav.querySelector('b').textContent = t;
}
osszeg();
if (vegosszeg) new MutationObserver(osszeg).observe(vegosszeg, { childList: true, subtree: true, characterData: true });
sav.querySelector('button').addEventListener('click', function () { tovabb.click(); });
document.body.appendChild(sav);
if (window.IntersectionObserver) {
new IntersectionObserver(function (e) { sav.classList.toggle('bb-lathato', !e[0].isIntersecting); }).observe(tovabb);
}
}

var UJRA_JEL = '#bb-ujrarendeles';
function rendelesek() {
if (kapcsolo('rendelesek', 'bbRendelesek') === '0') return;
[].forEach.call(document.querySelectorAll('.order-track__order'), function (sor) {
if (sor.querySelector('.bb-ark-ujra') || sor.closest('.order-track__orders-header')) return;
var reszlet = sor.querySelector('.order-track__order-details-btn');
var cel = reszlet && reszlet.getAttribute('href');
if (!cel || cel.charAt(0) === '#' || /^javascript:/i.test(cel)) return;
var u = document.createElement('a');
u.className = 'bb-ark-ujra';
u.href = cel.split('#')[0] + UJRA_JEL;
u.textContent = 'Újrarendelem';
reszlet.parentNode.insertBefore(u, reszlet.nextSibling);
});
}
function ujrarendeles() {
if (kapcsolo('rendelesek', 'bbRendelesek') === '0') return;
var g = [].filter.call(document.querySelectorAll('button, a, input[type="button"], input[type="submit"]'), function (x) {
return /Puttony feltöltése/i.test(x.textContent || x.value || '');
})[0];
if (!g) return;
if (g.tagName === 'INPUT') g.value = 'Újrarendelem – mind a Puttonyba';
else {
var t = [].filter.call(g.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); })[0];
if (t) t.textContent = ' Újrarendelem – mind a Puttonyba';
}
if (location.hash === UJRA_JEL) {
try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* régi böngésző */ }
g.scrollIntoView({ block: 'center' });
setTimeout(function () { g.click(); }, 400);
}
}

function sutiAblak() {
var a = document.getElementById('overlay_cookie_alert');
if (!a || a.getAttribute('data-bb')) return;
a.setAttribute('data-bb', '1');
var cim = a.querySelector('.cookie-alert__title');
if (cim) cim.textContent = 'Sütik a boltban';
var szoveg = a.querySelector('.cookie-alert__text');
var link = szoveg && szoveg.querySelector('a');
if (szoveg && link) {
link.textContent = 'Adatkezelési tájékoztató';
szoveg.textContent = 'A bolt működéséhez szükséges sütiket használunk. Engedélyével statisztikai, marketing- és személyre szabási sütiket is. Részletek: ';
szoveg.appendChild(link);
szoveg.appendChild(document.createTextNode('.'));
}
var nem = a.querySelector('.cookie-alert__btn-decline');
if (nem) nem.textContent = 'Csak a szükségesek';
}

function indul() {
if (!asztalon()) return;
try { sutiAblak(); } catch (e) { if (window.console) console.error('[asztali 2] süti-ablak', e); }
try { puttonyOldal(); } catch (e) { if (window.console) console.error('[asztali 2] puttony oldal', e); }
try { rendelesek(); ujrarendeles(); } catch (e) { if (window.console) console.error('[asztali 2] megrendelések', e); }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
