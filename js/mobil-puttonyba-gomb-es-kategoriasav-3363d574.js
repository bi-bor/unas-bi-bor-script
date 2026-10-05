(function () {
var MINDENKI = true;
var KULCS = 'bbMobilLista';
var allapot = null;
try {
var m = location.search.match(/[?&]mobillista=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var gyoker = document.documentElement;
gyoker.classList.add('bb-mobil');
gyoker.setAttribute('data-bb-mobil', '2026-10-03 00:35:55');
var stilus = document.createElement('style');
stilus.id = 'bb-mobil';
stilus.textContent = "@media (max-width: 767.98px){html.bb-mobil .product__main-btn::before,html.bb-mobil .product__variants-btn::before,html.bb-mobil .fixed-cart__btn.icon--b-cart::before,html.bb-mobil .artdet__cart-btn-icon{display: none !important}html.bb-mobil .product__main-btn,html.bb-mobil .product__variants-btn,html.bb-mobil .artdet__cart-btn,html.bb-mobil .fixed-cart__btn{display: inline-flex !important;align-items: center;justify-content: center;text-transform: uppercase;letter-spacing: .06em;font-weight: 700 !important;line-height: 1 !important;white-space: nowrap}html.bb-mobil .product__main-btn,html.bb-mobil .product__variants-btn{width: 100% !important;max-width: none !important;min-width: 0 !important;height: 44px !important;padding: 0 10px !important;font-size: 14px !important}html.bb-mobil .product__main-btn::after,html.bb-mobil .product__variants-btn::after{content: attr(data-text) !important;margin: 0 !important;font: inherit !important;overflow: hidden;text-overflow: ellipsis}html.bb-mobil .artdet__cart-btn{font-size: 16px !important}html.bb-mobil .artdet__cart-btn-text{margin: 0 !important}html.bb-mobil .fixed-cart__btn{font-size: 15px !important;padding: 0 20px !important}html.bb-mobil .product__params,html.bb-mobil .product__price-unit-wrap,html.bb-mobil .product__cart-input-col{display: none !important}html.bb-mobil .product__main-btn-col{flex: 1 1 100% !important;max-width: 100% !important}html.bb-mobil .artdet__img-data-left .has-img:focus-visible::before,html.bb-mobil .artdet__img-data-left .has-fv:focus-visible::before,html.bb-mobil .artdet__img-data-left .artdet__alts.has-image:focus-visible,html.bb-mobil .artdet__img-data-left :focus-visible{outline: 0 !important;box-shadow: none !important}html.bb-mobil #page_PopupContainer:not(.shop_popup_artdet_print) #page_PopupContainer_inner{overflow-x: hidden !important;overflow-y: auto !important;-webkit-overflow-scrolling: touch;overscroll-behavior: contain}html.bb-mobil section.categories{margin: 4px 0 20px}html.bb-mobil section.categories\u003E.container{position: relative}html.bb-mobil section.categories .row{display: flex !important;flex-wrap: nowrap !important;gap: 10px;margin: 0 !important;padding: 0 0 2px;overflow-x: auto;scroll-snap-type: x mandatory;scroll-behavior: smooth;-webkit-overflow-scrolling: touch;scrollbar-width: none}html.bb-mobil section.categories .row::-webkit-scrollbar{display: none}html.bb-mobil section.categories .category-card{flex: 0 0 calc((100% - 20px) / 3) !important;max-width: calc((100% - 20px) / 3) !important;padding: 0 !important;margin: 0 !important;scroll-snap-align: start}html.bb-mobil .category-card__inner{display: flex;flex-direction: column;height: 100%;background: none !important;border: 0 !important;box-shadow: none !important;padding: 0 !important}html.bb-mobil .category-card__img-wrap{order: 1;aspect-ratio: 1 / 1;margin: 0 !important;background: #f1efeb;border-radius: 6px;overflow: hidden}html.bb-mobil .category-card__pic-url{display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;padding: 6px}html.bb-mobil .category-card__pic{width: 100%;height: 100%;object-fit: contain;mix-blend-mode: multiply}html.bb-mobil .category-card__data-wrapper{order: 2;position: static !important;padding: 8px 2px 0 !important;background: none !important}html.bb-mobil .category-card__data{display: block !important;flex: 1 1 100%;width: 100%;margin: 0 !important;padding: 0 !important;text-align: center}html.bb-mobil section.categories .category-card__data-wrapper *,html.bb-mobil section.categories .category-card__data{background: none !important;box-shadow: none !important}html.bb-mobil .category-card__link{display: block;width: 100%;text-align: center;text-decoration: none}html.bb-mobil .category-card__name{font-size: 13px !important;font-weight: 400 !important;line-height: 1.3 !important;color: #221f1b;display: block;max-height: 2.6em;overflow: hidden;white-space: normal !important;text-align: center}html.bb-mobil section.categories .category-card__qty-wrap,html.bb-mobil section.categories .sub-cat-toggle-btn-wrapper,html.bb-mobil section.categories .sub-cats{display: none !important}.bb-ksav-nyil{position: absolute;z-index: 3;top: 30px;display: flex;align-items: center;justify-content: center;width: 40px;height: 40px;padding: 0;border: 1.5px solid #c8281e;border-radius: 50%;background: rgba(255,255,255,.95);color: #221f1b;box-shadow: 0 2px 8px rgba(34,31,27,.12);cursor: pointer}.bb-ksav-nyil[hidden]{display: none}.bb-ksav-nyil--bal{left: 4px}.bb-ksav-nyil--jobb{right: 4px}}@media (max-width: 575.98px){html.bb-mobil.bb-kp #cart-box__dropdown{top: 0 !important;bottom: 0;left: auto !important;right: 0 !important;width: 88% !important;max-width: 420px !important;height: 100% !important;max-height: none !important;z-index: 2147483100 !important;box-shadow: -12px 0 32px rgba(20,18,16,.22);transition: none !important}html.bb-mobil.bb-kp #cart-box__dropdown.is-active{animation: bb-kp-be .34s cubic-bezier(.2,.8,.2,1) both !important}html.bb-mobil.bb-kp.bb-kp-zar #cart-box__dropdown.is-active{animation: bb-kp-ki .26s ease-in both !important}html.bb-mobil.bb-kp #cart-box__dropdown .dropdown__caret{display: none !important}.bb-kp-hatter{position: fixed;inset: 0;z-index: 2147483099;background: rgba(20,18,16,.45);animation: bb-kp-hatter-be .3s ease both}html.bb-kp-zar .bb-kp-hatter{animation: bb-kp-hatter-ki .26s ease both}html.bb-mobil .product__main-btn.bb-tolt{position: relative;pointer-events: none}html.bb-mobil .product__main-btn.bb-tolt::after{visibility: hidden}html.bb-mobil .product__main-btn.bb-tolt::before{display: block !important;content: \"\" !important;position: absolute;top: 50%;left: 50%;width: 22px !important;height: 22px !important;margin: -11px 0 0 -11px !important;padding: 0 !important;background: none !important;filter: none !important;border: 2.5px solid rgba(255,255,255,.35);border-top-color: #fff;border-radius: 50%;animation: bb-forog .7s linear infinite}html.bb-mobil.bb-kp body{overflow: hidden}#bb-kp-figy{display: flex;gap: 10px;align-items: flex-start;margin: 4px 20px 8px;padding: 12px 14px;background: #fff6d6;border: 1px solid #f0d36b;border-radius: 10px;font-size: 14px;line-height: 1.45;color: #4a3b00}#bb-kp-figy svg{flex: 0 0 18px;margin-top: 2px;color: #b07a00}#bb-kp-figy p{margin: 0;font-size: 14px;color: #4a3b00 !important}#bb-kp-figy p + p{margin-top: 4px;font-size: 13px}#bb-kp-figy a{color: inherit;text-decoration: underline}html.bb-kp #cart-box__dropdown{padding: 18px 0 14px !important}html.bb-kp .cart-box__title,html.bb-kp .cart-box__sum-and-btns{width: auto !important;max-width: none !important;padding: 0 20px !important}html.bb-kp .cart-box__title{margin: 0 !important;text-transform: none !important;font-size: 24px !important;font-weight: 800 !important;line-height: 1.2;color: #221f1b}html.bb-kp .cart-box__title-icon{display: none !important}html.bb-kp .cart-box__title{display: flex !important;align-items: center;gap: 10px}html.bb-kp .cart-box__title .bb-puttony-ikon{width: 34px;height: 34px;background: #2a8511}.bb-kp-tetel{padding: 2px 20px 10px;font-size: 15px;color: #6b645a}html.bb-kp .cart-box__items{padding: 0 20px !important}html.bb-kp .cart-box__item{max-width: none !important;margin: 0 !important;padding: 16px 0 !important;border-bottom: 1px solid #ece7de !important}html.bb-kp .cart-box__item:last-child{border-bottom: 0 !important}html.bb-kp .cart-box__name{font-size: 15px !important;line-height: 1.3 !important;font-weight: 700;color: #221f1b}html.bb-kp .cart-box__item-price--full{font-size: 16px !important;font-weight: 600 !important;color: #221f1b}html.bb-kp .cart-box__variants{font-size: 13px !important}html.bb-kp .cart-box__del-btn{top: 10px !important;color: #857d70 !important}html.bb-kp .cart-box__sum{display: flex !important;justify-content: space-between;align-items: baseline;margin: 0 !important;padding: 16px 0 6px !important;background: none !important;border-top: 2px solid #e6e0d5;color: #221f1b !important}html.bb-kp .cart-box__sum *:has(\u003E.cart-box__sum-text){display: flex !important;justify-content: space-between;align-items: baseline;gap: 12px;width: 100%}html.bb-kp .cart-box__sum-text{margin-right: auto !important;padding-right: 12px;font-size: 17px !important;font-weight: 800 !important}html.bb-kp .cart-box__sum-price{margin-left: auto !important;padding: 0 !important;font-size: 19px !important;font-weight: 500 !important;white-space: nowrap}.bb-kp-megj{margin: 0 0 14px;font-size: 13px;line-height: 1.45;color: #6b645a}html.bb-kp .js-cart-box-btns\u003E:not(.bb-kp-tovabb),html.bb-kp .js-cart-box-btns .btn:not(.bb-kp-tovabb){display: flex !important;align-items: center;justify-content: center;width: 100% !important;height: 50px !important;margin: 0 !important;padding: 0 16px !important;background: #2a8511 !important;color: #fff !important;border: 0 !important;border-radius: 6px !important;box-shadow: none !important;font-size: 15px !important;font-weight: 700 !important;letter-spacing: .08em;text-transform: uppercase}html.bb-kp .js-cart-box-btns .btn:not(.bb-kp-tovabb)::before,html.bb-kp .js-cart-box-btns .btn:not(.bb-kp-tovabb)::after{display: none !important}.bb-kp-tovabb{display: block;width: 100%;margin-top: 10px;height: 50px;padding: 0 16px;border: 1.5px solid #221f1b;border-radius: 6px;background: #fff;font: 700 15px/1 inherit;letter-spacing: .08em;text-transform: uppercase;color: #221f1b}}@keyframes bb-kp-be{from{transform: translateX(100%)}to{transform: translateX(0)}}@keyframes bb-kp-ki{from{transform: translateX(0)}to{transform: translateX(100%)}}@keyframes bb-kp-hatter-be{from{opacity: 0}to{opacity: 1}}@keyframes bb-kp-hatter-ki{from{opacity: 1}to{opacity: 0}}@keyframes bb-forog{to{transform: rotate(360deg)}}.bb-szuro-gomb{display: none}@media (max-width: 575.98px){html.bb-mobil .bb-szuro-gomb{display: inline-flex;align-items: center;gap: 6px;height: 40px;padding: 0 12px;border: 0;border-radius: 8px;background: #221f1b;color: #fff;font: 700 14px/1 inherit;letter-spacing: .08em;text-transform: uppercase;white-space: nowrap}html.bb-mobil .bb-szuro-gomb .bb-szuro-db{min-width: 20px;height: 20px;padding: 0 6px;border-radius: 10px;background: #2a8511;font-size: 12px;line-height: 20px;letter-spacing: 0;text-align: center}html.bb-mobil .bb-szuro-gomb .bb-szuro-db:empty{display: none}html.bb-mobil .paging-sorting-ordering--top .view--top{display: none !important}html.bb-mobil .paging-sorting-ordering--top .row{flex-wrap: nowrap;column-gap: 8px}html.bb-mobil .paging-sorting-ordering--top .viewing-sorting--top{min-width: 0}html.bb-mobil .paging-sorting-ordering--top .order__select-outer select{max-width: 120px;font-size: 13px;text-overflow: ellipsis}html.bb-mobil #filter-dropdown{top: auto !important;bottom: 0 !important;left: 0 !important;right: 0 !important;width: 100% !important;max-width: none !important;height: auto !important;max-height: 85vh !important;padding: 30px 0 0 !important;border-radius: 18px 18px 0 0;box-shadow: 0 -12px 32px rgba(20,18,16,.22);z-index: 2147483100 !important}html.bb-mobil #filter-dropdown.is-active{animation: bb-lap-fel .32s cubic-bezier(.2,.8,.2,1) both !important}html.bb-mobil #filter-dropdown::before{content: \"\";position: absolute;top: 10px;left: 50%;width: 44px;height: 5px;border-radius: 3px;background: #d9d2c5;transform: translateX(-50%)}html.bb-mobil #filter-dropdown .dropdown__caret{display: none !important}html.bb-mobil #filter-dropdown .filter-dropdown__btn-close{top: 12px !important;right: 12px !important}html.bb-mobil #filter-dropdown .filter-dropdown__inner{overflow-y: auto;max-height: calc(85vh - 30px);padding-bottom: 84px !important}html.bb-mobil #filter-dropdown .show-filtered-products-btn-wrap{position: fixed;left: 0;right: 0;bottom: 0;z-index: 3;display: block !important;margin: 0 !important;padding: 12px 16px calc(env(safe-area-inset-bottom,0px) + 12px) !important;border: 0 !important;background: #fff;box-shadow: 0 -6px 18px rgba(20,18,16,.08)}html.bb-mobil #filter-dropdown .show-filtered-products-btn-wrap:not(.bb-szuro-also){display: none !important}html.bb-mobil #filter-dropdown .show-filtered-products-btn{position: static !important;display: block;margin: 0 !important;width: 100%;height: 50px;border-radius: 8px;font-size: 15px !important;font-weight: 700 !important;letter-spacing: .08em;text-transform: uppercase}.bb-szuro-hatter{position: fixed;inset: 0;z-index: 2147483099;background: rgba(20,18,16,.45);animation: bb-kp-hatter-be .3s ease both}html.bb-szuro body{overflow: hidden}html.bb-mobil #filter-dropdown .product_filter_num.ui-slider{height: 6px !important;margin: 14px 14px 22px !important;border: 0 !important;border-radius: 3px;background: #e6e0d5 !important}html.bb-mobil #filter-dropdown .product_filter_num.ui-slider::before{display: none !important}html.bb-mobil #filter-dropdown .ui-slider-range{top: 0 !important;height: 6px !important;background: #2a8511 !important}html.bb-mobil #filter-dropdown .ui-slider-handle{top: 50% !important;width: 28px !important;height: 28px !important;padding: 0 !important;border: 3px solid #2a8511 !important;border-radius: 50% !important;background: #fff !important;box-shadow: 0 2px 6px rgba(20,18,16,.2) !important;transform: translate(-50%,-50%) !important}html.bb-mobil #filter-dropdown .ui-slider-handle::after{display: none !important}}@keyframes bb-lap-fel{from{transform: translateY(100%)}to{transform: translateY(0)}}.bb-sav{display: none}@media (max-width: 575.98px){html.bb-mobil .bb-sav{position: fixed;left: 50%;bottom: calc(env(safe-area-inset-bottom,0px) + 14px);z-index: 1001;display: inline-flex;align-items: center;gap: 9px;height: 48px;max-width: 200px;padding: 0 16px 0 14px;border: 0;border-radius: 24px;background: #2a8511;color: #fff;white-space: nowrap;font: 700 14px/1 inherit;letter-spacing: .06em;text-transform: uppercase;box-shadow: 0 8px 22px rgba(20,18,16,.28);transform: translate(-50%,160%);transition: transform .3s cubic-bezier(.2,.8,.2,1)}html.bb-mobil .bb-sav.lathato{transform: translate(-50%,0)}html.bb-kp .bb-sav,html.bb-szuro .bb-sav{transform: translate(-50%,160%) !important}html.bb-mobil .bb-sav .bb-puttony-ikon{width: 26px;height: 26px;background: #fff}html.bb-mobil .bb-sav-db{min-width: 22px;height: 22px;padding: 0 6px;border-radius: 11px;background: #fff;color: #1f6a0c;font-size: 12px;line-height: 22px;letter-spacing: 0;text-align: center}@media (prefers-reduced-motion: reduce){html.bb-mobil .bb-sav{transition: none}}}.bb-puttony-ikon{display: inline-block;flex: 0 0 auto;-webkit-mask: url('/shop_ordered/63361/pic/puttony_tele.png') center / contain no-repeat;mask: url('/shop_ordered/63361/pic/puttony_tele.png') center / contain no-repeat}.bb-lep{display: none}@media (max-width: 575.98px){html.bb-mobil .cart-box__volume.bb-lep-van{display: flex;align-items: center;gap: 8px;margin: 2px 0 6px}html.bb-mobil .cart-box__volume.bb-lep-van .cart-box__volume-qty{display: none !important}html.bb-mobil .bb-lep{display: inline-flex;align-items: center;height: 36px;border: 1px solid #d9d2c5;border-radius: 18px;background: #fff}html.bb-mobil .bb-lep button{display: inline-flex;align-items: center;justify-content: center;width: 38px;height: 34px;padding: 0;border: 0;border-radius: 17px;background: none;color: #221f1b;cursor: pointer}html.bb-mobil .bb-lep button:disabled{color: #c9c2b6;cursor: default}html.bb-mobil .bb-lep-db{min-width: 26px;font-size: 15px;font-weight: 700;text-align: center;color: #221f1b}html.bb-mobil .cart-box__volume.bb-lep-van .cart-box__volume-unit{font-size: 14px;color: #6b645a}html.bb-mobil .bb-lep-folyik .bb-lep{opacity: .5;pointer-events: none}}@media (max-width: 575.98px){html.bb-mobil #overlay_cookie_alert{top: auto !important;bottom: 0 !important;left: 0 !important;right: 0 !important;width: 100% !important;max-width: none !important;margin: 0 !important;max-height: 88vh;overflow-y: auto;overscroll-behavior: contain;border-radius: 20px 20px 0 0 !important;box-shadow: 0 -10px 36px rgba(20,18,16,.22) !important;padding-bottom: env(safe-area-inset-bottom,0px);transform: none !important;animation: bb-suti-fel .38s cubic-bezier(.2,.8,.2,1) both !important}html.bb-mobil #overlay_cookie_alert::before{content: \"\";display: block;width: 40px;height: 4px;margin: 10px auto 0;border-radius: 2px;background: #d9d2c5}html.bb-mobil #overlay_cookie_alert\u003E.close{display: none !important}html.bb-mobil #overlay_cookie_alert .cookie-alert__inner{padding: 14px 0 12px !important}html.bb-mobil #overlay_cookie_alert .container{padding: 0 20px !important}html.bb-mobil #overlay_cookie_alert .cookie-alert__title{margin-bottom: 6px;font-size: 18px !important;font-weight: 800 !important;color: #221f1b}html.bb-mobil #overlay_cookie_alert .cookie-alert__text{font-size: 14px !important;line-height: 1.5;color: #4f4a42}html.bb-mobil #overlay_cookie_alert .cookie-alert__text a{color: inherit;text-decoration: underline}html.bb-mobil #overlay_cookie_alert .cookie-alert__text a b{font-weight: 600}html.bb-mobil #overlay_cookie_alert .py-3.px-md-4{padding: 0 !important}html.bb-mobil #overlay_cookie_alert .cookie-alert__checkboxes{padding-top: 14px}html.bb-mobil #overlay_cookie_alert .custom-control{margin-bottom: 12px !important}html.bb-mobil #overlay_cookie_alert .custom-control-label{font-size: 15px !important;color: #221f1b}html.bb-mobil #overlay_cookie_alert .custom-control .font-s{margin-top: 2px;font-size: 13px !important;line-height: 1.45;color: #6b645a}html.bb-mobil #overlay_cookie_alert .custom-control-input:checked ~ .custom-control-label::before{background-color: #2a8511 !important;border-color: #2a8511 !important}html.bb-mobil #overlay_cookie_alert .cookie-alert__btn-set-wrap{display: grid !important;grid-template-columns: 1fr 1fr;gap: 10px;margin-top: 16px;text-align: center}html.bb-mobil #overlay_cookie_alert .cookie-alert__btn-set-wrap .btn{margin: 0 !important;min-height: 48px;padding: 8px 10px !important;border-radius: 10px !important;font-size: 15px !important;font-weight: 700 !important;line-height: 1.2;box-shadow: none !important}html.bb-mobil #overlay_cookie_alert .btn::before,html.bb-mobil #overlay_cookie_alert .btn::after{display: none !important}html.bb-mobil #overlay_cookie_alert .cookie-alert__btn-allow{background: #2a8511 !important;border: 2px solid #2a8511 !important;color: #fff !important}html.bb-mobil #overlay_cookie_alert .cookie-alert__btn-decline{background: #fff !important;border: 2px solid #2a8511 !important;color: #1f6a0c !important}html.bb-mobil #overlay_cookie_alert .cookie-alert__btn-set-wrap .cookie-alert__btn-config{grid-column: 1 / -1;min-height: 36px;padding: 4px !important;border: 0 !important;background: none !important;font-size: 14px !important;font-weight: 400 !important;color: #6b645a !important;text-decoration: underline}@keyframes bb-suti-fel{from{translate: 0 100%}to{translate: 0 0}}html.bb-mobil #overlay_cookie_alert .cookie-alert__btn-set{width: 100%;min-height: 48px;border-radius: 10px !important;box-shadow: none !important}}@media (max-width: 575.98px){#profile__dropdown.bb-pm .bb-pm-hely{margin: 0 !important;padding: 0 !important}#profile__dropdown.bb-pm .bb-pm-sor{display: flex !important;align-items: center;gap: 14px;width: 100% !important;min-height: 56px;margin: 0 !important;padding: 12px 2px !important;background: none !important;border: 0 !important;border-bottom: 1px solid #ece6dc !important;border-radius: 0 !important;box-shadow: none !important;text-align: left !important;text-transform: none !important;letter-spacing: 0 !important;font-size: 16px !important;font-weight: 600 !important;line-height: 1.3 !important;color: #221f1b !important}#profile__dropdown.bb-pm .bb-pm-sor::before,#profile__dropdown.bb-pm .bb-pm-sor::after{display: none !important}#profile__dropdown.bb-pm .bb-pm-sor:active{background: #f6f2ea !important}#profile__dropdown.bb-pm .bb-pm-ikon{display: inline-flex;flex: 0 0 22px;color: #2a8511}#profile__dropdown.bb-pm .bb-pm-cimke{flex: 1 1 auto}#profile__dropdown.bb-pm .bb-pm-nyil{display: inline-flex;color: #b3ab9e}#profile__dropdown.bb-pm .bb-pm-kilep{margin-top: 10px !important;border-bottom: 0 !important;font-weight: 500 !important;color: #c62828 !important}#profile__dropdown.bb-pm .bb-pm-kilep .bb-pm-ikon{color: #c62828}}.bb-rk{display: none}@media (max-width: 575.98px){html.bb-mobil .order-track__order.bb-rk-sor{padding: 0 !important;margin: 0 0 12px;background: none !important}html.bb-mobil .order-track__order.bb-rk-sor\u003E:not(.bb-rk){display: none !important}html.bb-mobil .bb-rk{display: block;padding: 16px;background: #fff;border: 1px solid #ece6dc;border-radius: 14px;box-shadow: 0 2px 10px rgba(20,18,16,.05)}html.bb-mobil .bb-rk-fej{display: flex;justify-content: space-between;align-items: baseline;gap: 12px}html.bb-mobil .bb-rk-azon{font-size: 16px;font-weight: 700;color: #221f1b}html.bb-mobil .bb-rk-osszeg{font-size: 18px;font-weight: 800;color: #221f1b;white-space: nowrap}html.bb-mobil .bb-rk-datum{margin-top: 2px;font-size: 14px;color: #6b645a}html.bb-mobil .bb-rk-cimkek{display: flex;flex-wrap: wrap;gap: 6px;margin-top: 10px}html.bb-mobil .bb-rk-cimke{padding: 3px 10px;border-radius: 999px;font-size: 13px;font-weight: 600;line-height: 1.4}html.bb-mobil .bb-rk-zold{background: #eaf3e6;color: #1f6a0c}html.bb-mobil .bb-rk-szurke{background: #efebe4;color: #6b645a}html.bb-mobil .bb-rk-narancs{background: #fff1dc;color: #9a5800}html.bb-mobil .bb-rk-gombok{display: grid;grid-auto-flow: column;grid-auto-columns: 1fr;gap: 10px;margin-top: 14px}html.bb-mobil .bb-rk-reszlet,html.bb-mobil .bb-rk-ujra{display: flex;align-items: center;justify-content: center;min-height: 44px;padding: 0 12px;border-radius: 10px;font-size: 15px;font-weight: 700;text-decoration: none !important}html.bb-mobil .bb-rk-reszlet{border: 2px solid #2a8511;background: #fff;color: #1f6a0c}html.bb-mobil .bb-rk-ujra{border: 2px solid #2a8511;background: #2a8511;color: #fff !important}html.bb-mobil .bb-ujra-gomb{width: 100% !important;justify-content: center}}@media (max-width: 575.98px){html.bb-mobil .overlay_common:is(.overlay_warning,.overlay_error,.overlay_info,.overlay_ok,.overlay_dialog){top: auto !important;bottom: 0 !important;left: 0 !important;right: 0 !important;width: 100% !important;max-width: none !important;margin: 0 !important;max-height: 88vh;overflow-y: auto;overscroll-behavior: contain;padding: 6px 20px calc(env(safe-area-inset-bottom,0px) + 18px) !important;background: #fff !important;border: 0 !important;border-radius: 20px 20px 0 0 !important;box-shadow: 0 -10px 36px rgba(20,18,16,.22) !important;text-align: center;transform: none !important;animation: bb-ablak-fel .34s cubic-bezier(.2,.8,.2,1) both !important}@keyframes bb-ablak-fel{from{translate: 0 100%}to{translate: 0 0}}html.bb-mobil .overlay_common:is(.overlay_warning,.overlay_error,.overlay_info,.overlay_ok,.overlay_dialog)::before{content: \"\";display: block;width: 40px;height: 4px;margin: 4px auto 0;border-radius: 2px;background: #d9d2c5}html.bb-mobil .overlay_common .overlay_close{position: absolute;top: 10px;right: 10px;z-index: 2}html.bb-mobil .overlay_common .overlay_close-btn{width: 36px !important;height: 36px !important;padding: 0 !important;border: 0 !important;border-radius: 50% !important;background: #f3efe8 !important;color: #6b645a !important;box-shadow: none !important}html.bb-mobil .overlay_common .overlay__title-wrap{margin: 0 !important;padding: 16px 30px 4px !important;background: none !important;border: 0 !important}html.bb-mobil .overlay_common .overlay-icon{width: 52px;height: 52px;margin: 0 auto 10px !important;border-radius: 50%;align-items: center;justify-content: center;font-size: 24px !important;line-height: 1}html.bb-mobil .overlay_info .overlay-info__icon,html.bb-mobil .overlay_ok .overlay-ok__icon,html.bb-mobil .overlay_dialog .overlay-dialog__icon{display: flex !important;background: #eaf3e6;color: #2a8511 !important}html.bb-mobil .overlay_warning .overlay-warning__icon{display: flex !important;background: #fff6d6;color: #b07a00 !important}html.bb-mobil .overlay_error .overlay-error__icon{display: flex !important;background: #fdecec;color: #c62828 !important}html.bb-mobil .overlay_common .overlay_title{margin: 0 !important;padding: 0 !important;font-size: 19px !important;font-weight: 800 !important;line-height: 1.3 !important;color: #221f1b !important}html.bb-mobil .overlay_common .overlay_text{margin: 0 !important;padding: 6px 4px 0 !important;font-size: 15px !important;line-height: 1.5;color: #4f4a42 !important;background: none !important}html.bb-mobil .overlay_common .overlay-buttons{display: grid !important;grid-auto-flow: column;grid-auto-columns: 1fr;gap: 10px;padding: 18px 0 0 !important;margin: 0 !important}html.bb-mobil .overlay_common .overlay-buttons .btn{display: flex !important;align-items: center;justify-content: center;width: 100%;min-height: 48px;margin: 0 !important;padding: 8px 10px !important;border: 2px solid #2a8511 !important;border-radius: 10px !important;background: #2a8511 !important;color: #fff !important;font-size: 15px !important;font-weight: 700 !important;line-height: 1.2 !important;box-shadow: none !important;text-transform: none !important}html.bb-mobil .overlay_common .overlay-buttons .btn::before,html.bb-mobil .overlay_common .overlay-buttons .btn::after{display: none !important}html.bb-mobil .overlay_common .overlay-buttons .btn.overlay_button_close:not(:only-child){background: #fff !important;color: #1f6a0c !important}}@media (max-width: 767.98px){html.bb-mobil .carousel .product.carousel-cell{height: auto !important}html.bb-mobil .carousel .product__inner{height: auto !important;min-height: 100%}}@media (max-width: 575.98px){#profile__dropdown.bb-bl .profile__title{margin-bottom: 2px !important}#profile__dropdown.bb-bl .profile__title-text{font-size: 24px !important;font-weight: 800 !important;text-transform: none !important;letter-spacing: 0 !important;color: #221f1b !important}#profile__dropdown.bb-bl .bb-bl-al{margin: 0 0 18px;font-size: 14px;line-height: 1.45;color: #6b645a}#profile__dropdown.bb-bl .login-box__input-field{margin-bottom: 14px !important}#profile__dropdown.bb-bl .login-box__input-field label{margin-bottom: 6px;font-size: 14px !important;font-weight: 600 !important;color: #221f1b}#profile__dropdown.bb-bl .login-box__input-field .form-control{height: 52px !important;padding: 0 14px !important;border: 1.5px solid #d9d2c5 !important;border-radius: 10px !important;font-size: 16px !important;background: #fff !important;box-shadow: none !important}#profile__dropdown.bb-bl .login-box__input-field .form-control:focus{border-color: #2a8511 !important;box-shadow: 0 0 0 3px rgba(42,133,17,.15) !important;outline: 0 !important}#profile__dropdown.bb-bl .login-box__input-field .form-control::placeholder{color: transparent}#profile__dropdown.bb-bl .bb-bl-jelszo{position: relative;margin-bottom: 6px !important}#profile__dropdown.bb-bl .bb-bl-jelszo .form-control{padding-right: 50px !important}#profile__dropdown.bb-bl .bb-bl-szem{position: absolute;right: 4px;bottom: 4px;width: 44px;height: 44px;padding: 0;border: 0;background: none;display: inline-flex;align-items: center;justify-content: center;color: #6b645a;cursor: pointer}#profile__dropdown.bb-bl .bb-bl-emlek{margin: 0 0 18px !important;text-align: right}#profile__dropdown.bb-bl .bb-bl-emlek .btn{padding: 6px 0 !important;font-size: 14px !important;font-weight: 500 !important;color: #1f6a0c !important;text-decoration: underline;text-transform: none !important;background: none !important;box-shadow: none !important}#profile__dropdown.bb-bl .bb-bl-emlek .btn::before,#profile__dropdown.bb-bl .bb-bl-emlek .btn::after{display: none !important}#profile__dropdown.bb-bl .login-box__btns-wrap{display: block !important;margin: 0 !important}#profile__dropdown.bb-bl .login-box__login-btn{display: flex !important;align-items: center;justify-content: center;width: 100% !important;min-height: 52px;margin: 0 !important;border: 0 !important;border-radius: 10px !important;background: #2a8511 !important;color: #fff !important;box-shadow: none !important;font-size: 16px !important;font-weight: 700 !important;text-transform: none !important}#profile__dropdown.bb-bl .login-box__login-btn::before,#profile__dropdown.bb-bl .login-box__login-btn::after{display: none !important}#profile__dropdown.bb-bl .bb-bl-vagy{display: flex;align-items: center;gap: 12px;margin: 18px 0 14px;font-size: 13px;color: #8a8276}#profile__dropdown.bb-bl .bb-bl-vagy::before,#profile__dropdown.bb-bl .bb-bl-vagy::after{content: \"\";flex: 1;height: 1px;background: #e6e0d5}#profile__dropdown.bb-bl .login-box__social-group{margin: 0 !important}#profile__dropdown.bb-bl .bb-bl-reg{margin-top: 24px;padding-top: 18px;border-top: 1px solid #ece6dc;text-align: center}#profile__dropdown.bb-bl .bb-bl-reg p{margin: 0 0 10px;font-size: 15px;color: #4f4a42}#profile__dropdown.bb-bl .bb-bl-reg .login-box__reg-btn{display: flex !important;align-items: center;justify-content: center;width: 100% !important;min-height: 48px;margin: 0 !important;border: 2px solid #2a8511 !important;border-radius: 10px !important;background: #fff !important;color: #1f6a0c !important;box-shadow: none !important;font-size: 16px !important;font-weight: 700 !important;text-transform: none !important}#profile__dropdown.bb-bl .bb-bl-reg .login-box__reg-btn::before,#profile__dropdown.bb-bl .bb-bl-reg .login-box__reg-btn::after{display: none !important}}";
(document.head || gyoker).appendChild(stilus);

var NYIL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

function mobil() { return window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches; }

function leirasLegalulra() {
if (!mobil()) return;
var leiras = document.getElementById('custom-content-top');
var lista = document.querySelector('section.category-product-list, section.products-container');
if (!leiras || !lista || leiras.getAttribute('data-bb-lent')) return;
if (!(leiras.compareDocumentPosition(lista) & Node.DOCUMENT_POSITION_FOLLOWING)) return;
leiras.setAttribute('data-bb-lent', '1');
lista.parentNode.insertBefore(leiras, lista.nextSibling);
}

function kategoriasav() {
if (!mobil()) return;
var szekcio = document.querySelector('section.categories');
var sor = szekcio && szekcio.querySelector('.row');
if (!sor || szekcio.getAttribute('data-bb-ksav')) return;
szekcio.setAttribute('data-bb-ksav', '1');


var tarto = sor.parentNode;
function nyil(irany) {
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-ksav-nyil bb-ksav-nyil--' + (irany < 0 ? 'bal' : 'jobb');
g.setAttribute('aria-label', irany < 0 ? 'Előző kategóriák' : 'További kategóriák');
g.innerHTML = irany < 0 ? NYIL.replace('<svg ', '<svg style="transform:rotate(180deg)" ') : NYIL;
g.addEventListener('click', function () { sor.scrollBy({ left: irany * sor.clientWidth, behavior: 'smooth' }); });
tarto.appendChild(g);
return g;
}
var bal = nyil(-1), jobb = nyil(1);
var kep = sor.querySelector('.category-card__img-wrap');
function frissit() {
if (kep && kep.offsetHeight) bal.style.top = jobb.style.top = (kep.offsetHeight / 2 - 20) + 'px';
bal.hidden = sor.scrollLeft < 8;
jobb.hidden = sor.scrollLeft + sor.clientWidth > sor.scrollWidth - 8;
}
sor.addEventListener('scroll', frissit, { passive: true });
window.addEventListener('resize', frissit);
frissit();
}


var utolsoListaKatt = 0;
var toltoGomb = null;
var FIGY_IKON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

function kisMobil() { return window.matchMedia && window.matchMedia('(max-width: 575.98px)').matches; }
function kosarGomb() {
var gombok = document.querySelectorAll('.cart-box__dropdown-btn');
for (var i = 0; i < gombok.length; i++) if (gombok[i].offsetParent) return gombok[i];
return null;
}
function panel() { return document.getElementById('cart-box__dropdown'); }

function figyelmeztetes(felugro) {
var sorok = [];
var allapot = felugro.querySelector('.bb-status--wait, .bb-status--short');
if (allapot) sorok.push(allapot.textContent.trim());
[].forEach.call(felugro.querySelectorAll('.bb-note'), function (n) { sorok.push(n.innerHTML); });
return sorok;
}
var figySorok = '';
function figyKiir(sorok) {
sorok = sorok.filter(function (t) { return t && t.replace(/<[^>]*>/g, '').trim(); });
var html = sorok.length ? FIGY_IKON + '<div><p>' + sorok[0].replace(/</g, '&lt;') + '</p>' +
sorok.slice(1).map(function (h) { return '<p>' + h + '</p>'; }).join('') + '</div>' : '';
if (html === figySorok) return;
figySorok = html;
figyHelyre();
}
function figyHelyre() {
var p = panel();
if (!p) return;
var doboz = document.getElementById('bb-kp-figy');
if (!figySorok) { if (doboz) doboz.parentNode.removeChild(doboz); return; }
var utana = p.querySelector('.bb-kp-tetel') || p.querySelector('.cart-box__title');
if (!utana) return;
if (!doboz) {
doboz = document.createElement('div');
doboz.id = 'bb-kp-figy';
doboz.setAttribute('role', 'status');
}
if (doboz.bbTartalom !== figySorok) { doboz.innerHTML = figySorok; doboz.bbTartalom = figySorok; }
if (utana.nextSibling !== doboz) utana.parentNode.insertBefore(doboz, utana.nextSibling);
}

function szoveg(el, uj) { if (el && el.textContent !== uj) el.textContent = uj; }
function tovabbGomb() {
var p = panel();
if (!p) return;
var cim = p.querySelector('.cart-box__title');
if (cim && !cim.querySelector('.bb-puttony-ikon')) cim.insertAdjacentHTML('afterbegin', PUTTONY_IKON);
var tetelek = p.querySelectorAll('.cart-box__item:not(.cart-box__item-package-offer-item)').length;
if (cim && tetelek) {
var db = p.querySelector('.bb-kp-tetel');
if (!db) {
db = document.createElement('div');
db.className = 'bb-kp-tetel';
cim.parentNode.insertBefore(db, cim.nextSibling);
}
szoveg(db, tetelek + ' tétel');
}
figyHelyre();
szoveg(p.querySelector('.cart-box__sum-text'), 'Becsült végösszeg');
var osszeg = p.querySelector('.cart-box__sum');
if (osszeg && !(osszeg.nextSibling && osszeg.nextSibling.className === 'bb-kp-megj')) {
var megj = document.createElement('p');
megj.className = 'bb-kp-megj';
megj.textContent = 'Az ár az ÁFÁ-t tartalmazza. A szállítási díjat a pénztárban számoljuk.';
osszeg.parentNode.insertBefore(megj, osszeg.nextSibling);
}
var helye = p.querySelector('.js-cart-box-btns');
if (!helye) return;
var fo = helye.querySelector('a, button:not(.bb-kp-tovabb)');
if (fo && !fo.querySelector('*')) szoveg(fo, 'Tovább a Puttonyhoz');
else if (fo) { var t = fo.querySelector('span:not([class*="icon"])'); szoveg(t, 'Tovább a Puttonyhoz'); }
if (helye.querySelector('.bb-kp-tovabb')) return;
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-kp-tovabb';
g.textContent = 'Tovább válogatok';
g.addEventListener('click', kosarpanelZar);
helye.appendChild(g);
}

var zarasFolyik = false;
function sablonZar() {
var p = panel();
var zar = p && p.querySelector('.dropdown__btn-close');
zarasFolyik = true;
if (zar) zar.click(); else { var k = kosarGomb(); if (k) k.click(); }
zarasFolyik = false;
}
function kosarpanelZar() {
if (!gyoker.classList.contains('bb-kp') || gyoker.classList.contains('bb-kp-zar')) return;
gyoker.classList.add('bb-kp-zar');
setTimeout(function () { sablonZar(); gyoker.classList.remove('bb-kp-zar'); }, 290);
}

function kosarpanelNyit() {
var p = panel(), gomb = kosarGomb();
if (!p || !gomb) return false;
if (gyoker.classList.contains('bb-kp')) return true; /* már nyitva */
gyoker.classList.add('bb-kp');
var hatter = document.createElement('div');
hatter.className = 'bb-kp-hatter';
hatter.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); kosarpanelZar(); });
document.body.appendChild(hatter);
if (!p.classList.contains('is-active')) gomb.click();
var figyelo = new MutationObserver(function () {
tovabbGomb();
if (!p.classList.contains('is-active')) {
figyelo.disconnect();
gyoker.classList.remove('bb-kp');
if (hatter.parentNode) hatter.parentNode.removeChild(hatter);
figySorok = '';
var d = document.getElementById('bb-kp-figy');
if (d) d.parentNode.removeChild(d);
}
});
var x = p.querySelector('.dropdown__btn-close');
if (x && !x.getAttribute('data-bb-kp')) {
x.setAttribute('data-bb-kp', '1');
x.addEventListener('click', function (e) {
if (zarasFolyik || !gyoker.classList.contains('bb-kp')) return;
e.preventDefault(); e.stopImmediatePropagation();
kosarpanelZar();
}, true);
}
setTimeout(function () {
figyelo.observe(p, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
tovabbGomb();
}, 50);
return true;
}

function kosarbaTeve() {
if (!kisMobil() || Date.now() - utolsoListaKatt > 8000) return;
utolsoListaKatt = 0;
if (toltoGomb) { toltoGomb.classList.remove('bb-tolt'); toltoGomb = null; }
if (!kosarpanelNyit()) return;
var vege = Date.now() + 4000;
(function nez() {
var felugro = document.getElementById('bb-cart-panel');
if (felugro) {
felugro.style.setProperty('display', 'none', 'important');
figyKiir(figyelmeztetes(felugro));
}
if (Date.now() < vege && gyoker.classList.contains('bb-kp')) setTimeout(nez, 150);
})();
}

function kosarpanelIndul() {
document.addEventListener('click', function (e) {
var g = e.target && e.target.closest && e.target.closest('.product__cart-btn');
if (!g || !g.closest('[id^="page_artlist_"]') || g.closest('#page_artdet_content')) return;
utolsoListaKatt = Date.now();
if (kisMobil()) {
toltoGomb = g;
g.classList.add('bb-tolt');
setTimeout(function () { g.classList.remove('bb-tolt'); }, 6000);
}
var ido = Date.now();
(function var_() {
if (!utolsoListaKatt) return;
if (document.getElementById('bb-cart-panel')) { kosarbaTeve(); return; }
if (Date.now() - ido < 5000) setTimeout(var_, 200);
})();
}, true);
var jq = window.jQuery;
if (jq) jq(document).on('addToCartSuccess', function () { setTimeout(kosarbaTeve, 60); });
var p = panel();
if (p && window.MutationObserver) new MutationObserver(function () {
if (p.classList.contains('is-active') && kisMobil() && !gyoker.classList.contains('bb-kp') && !zarasFolyik) kosarpanelNyit();
}).observe(p, { attributes: true, attributeFilter: ['class'] });
}


var TOLCSER = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h18l-7 8.5V19l-4 2v-7.5z"/></svg>';
function szuro() {
var panel = document.getElementById('filter-dropdown');
var sablonGomb = [].filter.call(document.querySelectorAll('.filter-box__dropdown-btn'), function (x) { return x.offsetParent; })[0] ||
document.querySelector('.filter-box__dropdown-btn');
var sor = document.querySelector('.paging-sorting-ordering--top .row');
if (!panel || !sablonGomb || !sor || sor.querySelector('.bb-szuro-gomb')) return;
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-szuro-gomb';
g.innerHTML = TOLCSER + '<span>Szűrés</span><span class="bb-szuro-db"></span>';
g.addEventListener('click', function (e) {
e.preventDefault(); e.stopPropagation();
setTimeout(function () { sablonGomb.click(); }, 0);
setTimeout(function () { if (!panel.classList.contains('is-active')) sablonGomb.click(); }, 400);
});
var hely = document.createElement('div');
hely.className = 'col-auto';
hely.appendChild(g);
var szam = sor.querySelector('.product-num-col');
sor.insertBefore(hely, szam ? szam.nextSibling : sor.firstChild);

function darab() {
var n = document.querySelectorAll('.js-selected-filters .filtered-tags__item, .js-selected-filters .product_filter_link, .js-selected-filters [data-filter], .js-selected-filters a').length;
var d = g.querySelector('.bb-szuro-db');
var uj = n ? String(n) : '';
if (d.textContent !== uj) d.textContent = uj;
}
darab();

var hatter = null;
function allapot() {
var nyitva = panel.classList.contains('is-active') && kisMobil();
gyoker.classList.toggle('bb-szuro', nyitva);
var alsok = panel.querySelectorAll('.show-filtered-products-btn-wrap');
[].forEach.call(alsok, function (w, i) { w.classList.toggle('bb-szuro-also', i === alsok.length - 1); });
if (nyitva && !hatter) {
hatter = document.createElement('div');
hatter.className = 'bb-szuro-hatter';
hatter.addEventListener('click', function (e) {
e.preventDefault(); e.stopPropagation();
var zar = panel.querySelector('.filter-dropdown__btn-close');
if (zar) zar.click();
});
document.body.appendChild(hatter);
} else if (!nyitva && hatter) {
hatter.parentNode.removeChild(hatter);
hatter = null;
}
darab();
}
new MutationObserver(allapot).observe(panel, { attributes: true, attributeFilter: ['class'] });
var szuroTartalom = document.querySelector('.js-selected-filters');
if (szuroTartalom) new MutationObserver(darab).observe(szuroTartalom, { childList: true, subtree: true });
}


var PUTTONY_IKON = '<span class="bb-puttony-ikon" aria-hidden="true"></span>';
function alsoSav() {
if (!document.querySelector('[id^="page_artlist_"]') || document.getElementById('page_artdet_content')) return;
if (document.querySelector('.bb-sav')) return;
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-sav';
g.setAttribute('aria-label', 'Puttony megnyitása');
g.innerHTML = PUTTONY_IKON + '<span>Puttony</span><span class="bb-sav-db"></span>';
g.addEventListener('click', function (e) {
e.preventDefault(); e.stopPropagation();
if (!kosarpanelNyit()) location.href = '/shop_cart.php';
});
document.body.appendChild(g);
function darab() {
var b = document.querySelector('#nav--mobile-top .cart-box__bubble') || document.querySelector('.cart-box__bubble');
var m = b && b.textContent.match(/(\d+)\s*$/);
return m ? +m[1] : 0;
}
function frissit() {
var n = darab();
var d = g.querySelector('.bb-sav-db');
var uj = n ? String(n) : '';
if (d.textContent !== uj) d.textContent = uj;
g.classList.toggle('lathato', n > 0 && window.scrollY > 300 && kisMobil());
}
var utemezve = false;
window.addEventListener('scroll', function () {
if (utemezve) return;
utemezve = true;
requestAnimationFrame(function () { utemezve = false; frissit(); });
}, { passive: true });
[].forEach.call(document.querySelectorAll('.cart-box__bubble'), function (b) {
new MutationObserver(frissit).observe(b, { childList: true, subtree: true, characterData: true });
});
frissit();
}

var LEP_MINUSZ = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
var LEP_PLUSZ = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>';
var lepIdozito = null, lepFolyik = false;
function cikkszamok(gyoker, elotag) {
return [].map.call(gyoker.querySelectorAll('[id^="' + elotag + '"]'), function (e) { return e.id.slice(elotag.length); })
.filter(function (c) { return c.indexOf('box-') !== 0; });
}
function lepKuld() {
var p = panel();
if (!p || lepFolyik) return;
var tetelek = [].slice.call(p.querySelectorAll('.cart-box__item'));
var valtozott = tetelek.some(function (t) { return t.bbUj != null; });
if (!valtozott) return;
lepFolyik = true;
p.classList.add('cart-refreshing', 'bb-lep-folyik');
function vege(ok) {
lepFolyik = false;
p.classList.remove('bb-lep-folyik');
if (ok && typeof window.cart_refresh === 'function') window.cart_refresh();
else { p.classList.remove('cart-refreshing'); location.href = '/puttony'; }
}
var cim = '/shop_cart.php?ajax_nodesign=1';
fetch(cim, { credentials: 'same-origin' }).then(function (v) { return v.text(); }).then(function (html) {
var d = new DOMParser().parseFromString(html, 'text/html');
var urlap = d.querySelector('form[name="form_temp"]');
var mezok = d.querySelectorAll('input[name="db[]"]');
var itt = cikkszamok(p, 'label-cart-box-'), ott = cikkszamok(d, 'label-cart-');
if (!urlap || mezok.length !== tetelek.length || itt.join('|') !== ott.join('|')) { vege(false); return; }
tetelek.forEach(function (t, i) {
if (t.bbUj == null) return;
var m = mezok[i];
var also = +(m.getAttribute('data-min') || m.getAttribute('min') || 1) || 1;
var felso = +(m.getAttribute('data-max') || m.getAttribute('max') || 999999) || 999999;
var lepes = +(m.getAttribute('data-step') || m.getAttribute('step') || 1) || 1;
var uj = (+m.value || 0) + (t.bbUj - t.bbRegi) * lepes;
m.value = String(Math.min(felso, Math.max(also, uj)));
});
var adat = new URLSearchParams();
[].forEach.call(urlap.elements, function (e) {
if (!e.name || e.disabled || /^(button|submit|reset|file)$/.test(e.type)) return;
if (/^(checkbox|radio)$/.test(e.type) && !e.checked) return;
adat.append(e.name, e.value);
});
adat.set('action2', 'modify');
return fetch(cim, {
method: 'POST', credentials: 'same-origin',
headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: adat.toString()
}).then(function (v) { vege(v.ok); });
}).catch(function () { vege(false); });
}
function lepteto() {
var p = panel();
if (!p) return;
function beepit() {
if (!kisMobil() || p.querySelector('.cart-box__item-package-offer-item')) return;
[].forEach.call(p.querySelectorAll('.cart-box__item'), function (t) {
var hely = t.querySelector('.cart-box__volume');
var db = hely && hely.querySelector('.cart-box__volume-qty');
if (!db || hely.querySelector('.bb-lep')) return;
var n = parseInt(db.textContent, 10);
if (!(n > 0)) return;
t.bbRegi = n; t.bbUj = null;
var l = document.createElement('div');
l.className = 'bb-lep';
l.innerHTML = '<button type="button" class="bb-lep-minusz" aria-label="Eggyel kevesebb">' + LEP_MINUSZ + '</button>' +
'<span class="bb-lep-db" aria-live="polite"></span>' +
'<button type="button" class="bb-lep-plusz" aria-label="Eggyel több">' + LEP_PLUSZ + '</button>';
function mutat() {
var most = t.bbUj == null ? t.bbRegi : t.bbUj;
l.querySelector('.bb-lep-db').textContent = most;
l.querySelector('.bb-lep-minusz').disabled = most <= 1;
}
l.addEventListener('click', function (e) {
var g = e.target.closest('button');
e.preventDefault(); e.stopPropagation();
if (!g || g.disabled || lepFolyik) return;
var most = t.bbUj == null ? t.bbRegi : t.bbUj;
most += g.classList.contains('bb-lep-plusz') ? 1 : -1;
if (most < 1) return;
t.bbUj = most === t.bbRegi ? null : most;
mutat();
clearTimeout(lepIdozito);
lepIdozito = setTimeout(lepKuld, 700);
});
mutat();
hely.insertBefore(l, hely.firstChild);
hely.classList.add('bb-lep-van');
});
}
new MutationObserver(beepit).observe(p, { childList: true, subtree: true });
beepit();
}

function sutiAblak() {
var a = document.getElementById('overlay_cookie_alert');
if (!a || !kisMobil() || a.getAttribute('data-bb')) return;
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

var PM_IKON = {
'megrendelések': '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
'kedvezmények': '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
'kedvencek': '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
'címek': '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',
'csomagpontok': '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
'adatmódosítás': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
'kilép': '<path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4"/><path d="M15 17l5-5-5-5M20 12H9"/>'
};
function pmSvg(d) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; }
function profilMenu() {
var be = null;
try {
var m = location.search.match(/[?&]profilmenu=([01])/);
if (m) localStorage.setItem('bbProfilMenu', m[1]);
be = localStorage.getItem('bbProfilMenu');
} catch (e) { /* tiltott tárhely */ }
if (be === '0') return;
var d = document.getElementById('profile__dropdown');
if (!d || d.querySelector('form[name="form_login"]') || d.classList.contains('bb-pm')) return;
var belso = d.querySelector('.dropdown__content-inner') || d;
var db = 0;
[].forEach.call(belso.querySelectorAll('a, button:not(.dropdown__btn-close)'), function (a) {
var kulcs = a.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
var ikon = PM_IKON[kulcs];
if (!ikon) return;
db++;
a.classList.add('bb-pm-sor');
if (kulcs === 'kilép') a.classList.add('bb-pm-kilep');
var cimke = a.textContent.trim();
a.innerHTML = '<span class="bb-pm-ikon">' + pmSvg(ikon) + '</span><span class="bb-pm-cimke"></span>' +
(kulcs === 'kilép' ? '' : '<span class="bb-pm-nyil">' + NYIL + '</span>');
a.querySelector('.bb-pm-cimke').textContent = cimke;
var szulo = a.parentNode;
if (szulo && szulo !== belso && szulo.children.length === 1) szulo.classList.add('bb-pm-hely');
});
if (db >= 3) d.classList.add('bb-pm');
}

var UJRA_JEL = '#bb-ujrarendeles';
function rendelesekBe() {
var be = null;
try {
var m = location.search.match(/[?&]rendelesek=([01])/);
if (m) localStorage.setItem('bbRendelesek', m[1]);
be = localStorage.getItem('bbRendelesek');
} catch (e) { /* tiltott tárhely */ }
return be !== '0';
}
function rendelesErtek(sor, osztaly, cimke) {
var col = sor.querySelector('.order-track__order-' + osztaly + '-col');
var ertek = col && col.querySelector('.order-track__value');
if (!ertek) {
[].some.call(sor.querySelectorAll('.order-track__title'), function (t) {
if (t.textContent.trim().toLowerCase().indexOf(cimke) !== 0) return false;
ertek = t.parentNode.querySelector('.order-track__value');
return !!ertek;
});
}
return ertek ? ertek.textContent.replace(/\s+/g, ' ').trim() : '';
}
function rendelesek() {
if (!kisMobil() || !rendelesekBe()) return;
[].forEach.call(document.querySelectorAll('.order-track__order'), function (sor) {
if (sor.querySelector('.bb-rk') || sor.closest('.order-track__orders-header')) return;
var azon = rendelesErtek(sor, 'key', 'azonosító');
var datum = rendelesErtek(sor, 'date', 'dátum');
var osszeg = rendelesErtek(sor, 'price', 'fizetendő');
var fizetes = rendelesErtek(sor, 'payment-status', 'fizetés');
var allapot = rendelesErtek(sor, 'status', 'megrendelés állapota');
var reszlet = sor.querySelector('.order-track__order-details-btn');
if (!azon || !reszlet) return;
var k = document.createElement('div');
k.className = 'bb-rk';
k.innerHTML = '<div class="bb-rk-fej"><span class="bb-rk-azon"></span><span class="bb-rk-osszeg"></span></div>' +
'<div class="bb-rk-datum"></div><div class="bb-rk-cimkek"></div>' +
'<div class="bb-rk-gombok"><button type="button" class="bb-rk-reszlet">Részletek</button></div>';
k.querySelector('.bb-rk-azon').textContent = azon;
k.querySelector('.bb-rk-osszeg').textContent = osszeg;
k.querySelector('.bb-rk-datum').textContent = datum;
var cimkek = k.querySelector('.bb-rk-cimkek');
function cimke(szoveg, fajta) {
if (!szoveg) return;
var c = document.createElement('span');
c.className = 'bb-rk-cimke bb-rk-' + fajta;
c.textContent = szoveg;
cimkek.appendChild(c);
}
cimke(allapot, /törölve|sztornó|elutasít/i.test(allapot) ? 'szurke' : 'zold');
cimke(fizetes, /nincs|függő|várakoz/i.test(fizetes) ? 'narancs' : 'zold');
k.querySelector('.bb-rk-reszlet').addEventListener('click', function () { reszlet.click(); });
var cel = reszlet.getAttribute('href');
if (cel && cel.charAt(0) !== '#' && !/^javascript:/i.test(cel)) {
var u = document.createElement('a');
u.className = 'bb-rk-ujra';
u.href = cel.split('#')[0] + UJRA_JEL;
u.textContent = 'Újrarendelem';
k.querySelector('.bb-rk-gombok').appendChild(u);
}
sor.classList.add('bb-rk-sor');
sor.insertBefore(k, sor.firstChild);
});
}
function ujrarendeles() {
if (!kisMobil() || !rendelesekBe()) return;
var g = [].filter.call(document.querySelectorAll('button, a, input[type="button"], input[type="submit"]'), function (x) {
return /Puttony feltöltése/i.test(x.textContent || x.value || '');
})[0];
if (!g) return;
g.classList.add('bb-ujra-gomb');
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

function karuszelek() {
if (!mobil()) return;
function meret() {
if (!window.Flickity || !window.Flickity.data) return;
[].forEach.call(document.querySelectorAll('.carousel.flickity-enabled'), function (c) {
if (!c.querySelector('.product__inner')) return;
var f = window.Flickity.data(c);
if (f) f.resize();
});
}
window.addEventListener('load', function () { meret(); setTimeout(meret, 1500); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(meret);
}

var SZEM = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
var SZEM_KI = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
function belepes() {
if (!kisMobil()) return;
try { if (localStorage.getItem('bbProfilMenu') === '0') return; } catch (e) { /* tiltott tárhely */ }
var d = document.getElementById('profile__dropdown');
var urlap = d && d.querySelector('form[name="form_login"]');
if (!urlap || d.classList.contains('bb-bl')) return;
var doboz = d.querySelector('.login-box__loggedout-container') || urlap.parentNode;
var belso = urlap.querySelector('.login-box__form-inner') || urlap;
var jelszo = urlap.querySelector('#shop_pass_login');
var email = urlap.querySelector('#shop_user_login');
var gombok = urlap.querySelector('.login-box__btns-wrap');
var reg = urlap.querySelector('.login-box__reg-btn');
var emlek = urlap.querySelector('.login-box__remind-btn-wrap');
var google = urlap.querySelector('.login-box__social-group');
if (!jelszo || !gombok) return;
d.classList.add('bb-bl');
var cim = doboz.querySelector('.profile__title-text');
if (cim) {
var al = document.createElement('p');
al.className = 'bb-bl-al';
al.textContent = 'Lépjen be, és lássa a rendeléseit, kedvezményeit, gyorsabban fizethet.';
cim.parentNode.parentNode.insertBefore(al, cim.parentNode.nextSibling);
}
if (email) email.setAttribute('inputmode', 'email');
var mezo = jelszo.parentNode;
mezo.classList.add('bb-bl-jelszo');
var szem = document.createElement('button');
szem.type = 'button';
szem.className = 'bb-bl-szem';
szem.setAttribute('aria-label', 'Jelszó megjelenítése');
szem.innerHTML = SZEM;
szem.addEventListener('click', function (e) {
e.preventDefault(); e.stopPropagation();
var latszik = jelszo.type === 'text';
jelszo.type = latszik ? 'password' : 'text';
szem.innerHTML = latszik ? SZEM : SZEM_KI;
szem.setAttribute('aria-label', latszik ? 'Jelszó megjelenítése' : 'Jelszó elrejtése');
});
mezo.appendChild(szem);
if (emlek) { emlek.classList.add('bb-bl-emlek'); mezo.parentNode.insertBefore(emlek, mezo.nextSibling); }
if (google) {
var vagy = document.createElement('div');
vagy.className = 'bb-bl-vagy';
vagy.innerHTML = '<span>vagy</span>';
gombok.parentNode.insertBefore(vagy, gombok.nextSibling);
vagy.parentNode.insertBefore(google, vagy.nextSibling);
}
if (reg) {
var blokk = document.createElement('div');
blokk.className = 'bb-bl-reg';
blokk.innerHTML = '<p>Még nincs fiókja?</p>';
reg.textContent = 'Regisztráció';
blokk.appendChild(reg);
belso.appendChild(blokk);
}
var belep = gombok.querySelector('.login-box__login-btn');
if (belep) belep.textContent = 'Belépés';
}

function indul() {
try { leirasLegalulra(); } catch (e) { if (window.console) console.error('[mobil] leírás', e); }
try { kategoriasav(); } catch (e) { if (window.console) console.error('[mobil] kategóriasáv', e); }
try { kosarpanelIndul(); } catch (e) { if (window.console) console.error('[mobil] kosárpanel', e); }
try { szuro(); } catch (e) { if (window.console) console.error('[mobil] szűrő', e); }
try { alsoSav(); } catch (e) { if (window.console) console.error('[mobil] alsó sáv', e); }
try { lepteto(); } catch (e) { if (window.console) console.error('[mobil] léptető', e); }
try { sutiAblak(); } catch (e) { if (window.console) console.error('[mobil] süti-ablak', e); }
try { profilMenu(); } catch (e) { if (window.console) console.error('[mobil] profil menü', e); }
try { rendelesek(); } catch (e) { if (window.console) console.error('[mobil] megrendelések', e); }
try { ujrarendeles(); } catch (e) { if (window.console) console.error('[mobil] újrarendelés', e); }
try { karuszelek(); } catch (e) { if (window.console) console.error('[mobil] termék-sávok', e); }
try { belepes(); } catch (e) { if (window.console) console.error('[mobil] belépés', e); }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
