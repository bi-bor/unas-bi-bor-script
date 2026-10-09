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
if (kapcsolo('osszhang', 'bbOsszhang') !== '0') gyoker.classList.add('bb-osszhang');
if (kapcsolo('raktar', 'bbRaktar') !== '0') gyoker.classList.add('bb-raktar');
gyoker.setAttribute('data-bb-asztali', '2026-10-09 08:35:45');
var stilus = document.createElement('style');
stilus.id = 'bb-asztali';
stilus.textContent = "@media (min-width: 768px){html.bb-asztal .product__prices.has-price-sale{display: flex !important;flex-wrap: wrap;align-items: center;gap: 4px 8px !important;margin-bottom: 10px !important}html.bb-asztal .product__prices.has-price-sale\u003E.col{display: contents}html.bb-asztal .product__prices.has-price-sale\u003E.col-auto{order: 1;flex: 0 0 auto;max-width: none;padding: 0 !important}html.bb-asztal .product__prices.has-price-sale .product__badge-sale{display: inline-flex !important;align-items: center;height: auto !important;padding: 3px 8px !important;margin: 0 !important;border: 0 !important;border-radius: 6px !important;background: #e53935 !important;color: #fff !important;font-size: 13px !important;font-weight: 800 !important;line-height: 1.2 !important}html.bb-asztal .product__prices.has-price-sale .product__badge-sale span{color: #fff !important}html.bb-asztal .product__prices.has-price-sale .product__badge-sale [data-percent]::before{content: \"-\"}html.bb-asztal .product__prices.has-price-sale .product__badge-sale [data-percent]::after{font-size: inherit !important}html.bb-asztal .product__prices.has-price-sale .product__price-base{order: 2;flex: 0 1 auto;min-width: 0;margin: 0 !important;font-size: 14px !important;line-height: 1.2}html.bb-asztal .product__prices.has-price-sale .product__price-base-value,html.bb-asztal .product__prices.has-price-sale .product__price-base-value *{color: #8a8276 !important;font-size: 14px !important;font-weight: 500 !important}html.bb-asztal .product__prices.has-price-sale .product__price-base-value\u003Ebr,html.bb-asztal .product__prices.has-price-sale .product__price-base-value\u003Espan[style],html.bb-asztal .product__prices.has-price-sale .product__price-base .icon--info{display: none !important}html.bb-asztal .product__prices.has-price-sale .product__price-sale{order: 3;flex: 0 0 100%;margin: 0 !important;line-height: 1.25}html.bb-asztal .product__prices.has-price-sale .product__price-sale .price-gross-format,html.bb-asztal .product__prices.has-price-sale .product__price-sale .price-gross-format *{color: #d32f2f !important;font-size: 22px !important;font-weight: 800 !important}html.bb-asztal .product__prices.has-price-sale .product__price-sale\u003Espan[style]{display: inline-block;margin-top: 2px}html.bb-asztal .product__prices.has-price-sale .product__price-unit-wrap{order: 4;flex: 0 0 100%}html.bb-asztal .product .stickers{display: flex !important;flex-wrap: wrap;align-items: center;gap: 4px}html.bb-asztal .product .sticker.has-img{max-width: 140px !important;margin: 0 !important}html.bb-asztal .product .sticker.has-img img{display: block;max-height: 44px;width: auto;max-width: 100%}html.bb-asztal .product :is(.stock--warning,.stock--critical) .stock__content{min-width: 0;max-width: 100%}html.bb-asztal .product :is(.stock--warning,.stock--critical) .stock__content::before{display: none !important}html.bb-asztal .product :is(.stock--warning,.stock--critical) .stock__qty-and-unit{transform: none !important;min-width: 0 !important;max-width: 100%;box-sizing: border-box;flex-shrink: 1;padding: 4px 10px !important;font-size: 12.5px !important;line-height: 1.3}html.bb-asztal .sticker[data-id=\"38406\"]{display: inline-flex !important;align-items: center;gap: 5px;max-width: 100% !important;box-sizing: border-box;padding: 3px 8px !important;border: 1.5px solid #9fcf8a !important;border-radius: 6px;background: #eaf3e6 !important;color: #1f6a0c;font-size: 12px;font-weight: 700;line-height: 1.2}html.bb-asztal .sticker[data-id=\"38406\"] img,html.bb-asztal .sticker[data-id=\"38406\"] .sticker-caption{display: none !important}html.bb-asztal .sticker[data-id=\"38406\"]::before{content: \"\";flex: 0 0 15px;width: 15px;height: 15px;background: #1f6a0c;-webkit-mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 6h11v10H3zM14 9h4l3 3v4h-7'/%3E%3Ccircle cx='7' cy='17.5' r='1.8'/%3E%3Ccircle cx='17' cy='17.5' r='1.8'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 6h11v10H3zM14 9h4l3 3v4h-7'/%3E%3Ccircle cx='7' cy='17.5' r='1.8'/%3E%3Ccircle cx='17' cy='17.5' r='1.8'/%3E%3C/svg%3E\") center / contain no-repeat}html.bb-asztal .artdet__img-inner .sticker[data-id=\"38406\"]{font-size: 14px;padding: 5px 10px !important}html.bb-asztal .artdet__img-inner\u003E.stickers{display: flex !important;flex-wrap: wrap;gap: 4px;padding-right: 56px;box-sizing: border-box}html.bb-asztal .sticker[data-id=\"38406\"]::after{content: \"Szállítás 990\\00a0 Ft\\2011 tól\"}html.bb-asztal.bb-osszhang .header-inner{box-shadow: 0 1px 0 #ece6dc,0 4px 14px rgba(20,18,16,.06) !important}html.bb-asztal.bb-osszhang .product__inner{border: 1px solid #ece6dc;border-radius: 14px !important;box-shadow: 0 2px 10px rgba(20,18,16,.05) !important;transition: box-shadow .2s ease}html.bb-asztal.bb-osszhang .product__inner:hover{box-shadow: 0 6px 20px rgba(20,18,16,.1) !important}html.bb-asztal.bb-osszhang .artdet__pic-data-container{box-shadow: 0 2px 10px rgba(20,18,16,.05) !important}html.bb-asztal.bb-osszhang :is(.product__main-btn,.artdet__cart-btn,.orderflow-main-btn,.fixed-cart__btn,.btn-primary){border-radius: 10px !important;box-shadow: 0 2px 6px rgba(42,133,17,.18) !important}html.bb-asztal.bb-osszhang .star.star--full,html.bb-asztal.bb-osszhang .star.star--full::before{color: #f2b01e !important;border-color: #f2b01e !important}html.bb-asztal.bb-osszhang .page_cart_to_products_link{color: #1f6a0c !important;border-color: #1f6a0c !important}html.bb-asztal.bb-osszhang main :is(p,div,li)[style*=\"justify\"]{text-align: left !important}html.bb-asztal.bb-raktar .artdet__stock.stock{display: inline-flex !important;align-items: center;gap: 8px;width: auto;max-width: 100%;padding: 6px 12px 6px 10px !important;border-radius: 999px !important;border: 1px solid #9fcf8a !important;background: #eaf3e6 !important;color: #1f6a0c !important;font-size: 14px;line-height: 1.25;box-shadow: none !important}html.bb-asztal.bb-raktar .artdet__stock .stock__content{display: inline-flex;align-items: center;gap: 8px;color: inherit !important;font-size: 14px;font-weight: 600}html.bb-asztal.bb-raktar .artdet__stock .stock__content::before{content: \"\" !important;flex: 0 0 8px;width: 8px;height: 8px;border-radius: 50%;background: currentColor;box-shadow: 0 0 0 3px rgba(31,106,12,.15);font-size: 0 !important;margin: 0 !important}html.bb-asztal.bb-raktar .artdet__stock .stock__qty-and-unit{color: inherit !important}html.bb-asztal.bb-raktar .artdet__stock.stock::after{content: \"\" !important;width: 6px;height: 6px;margin: 0 2px 3px 2px !important;border: 0 !important;border-right: 2px solid currentColor !important;border-bottom: 2px solid currentColor !important;transform: rotate(45deg) !important;opacity: .7;position: static !important;align-self: center !important;top: auto !important;right: auto !important;flex: 0 0 6px}html.bb-asztal.bb-raktar .artdet__stock.stock.to-order{background: #fdf3e1 !important;border-color: #ecc98a !important;color: #8a5a00 !important}html.bb-asztal.bb-raktar .artdet__stock.stock.to-order .stock__content::before{box-shadow: 0 0 0 3px rgba(138,90,0,.15)}html.bb-asztal.bb-raktar .artdet__stock.stock.no-stock{background: #f3f1ee !important;border-color: #ddd6cc !important;color: #6b645a !important}html.bb-asztal.bb-raktar .artdet__stock.stock.no-stock .stock__content::before{box-shadow: 0 0 0 3px rgba(107,100,90,.15)}html.bb-asztal.bb-raktar .artdet__stock.stock.stock--critical{background: #fdecea !important;border-color: #f2b8b2 !important;color: #b3261e !important}html.bb-asztal.bb-raktar .artdet__stock.stock.stock--warning{background: #fff1e0 !important;border-color: #f3c68c !important;color: #9a5200 !important}html.bb-asztal.bb-raktar .artdet__stock.stock:is(.stock--critical,.stock--warning) .stock__qty-and-unit{display: inline-flex !important;align-items: center;gap: 6px;padding: 0 !important;margin: 0 !important;background: none !important;border-radius: 0 !important;transform: none !important;overflow: visible !important;color: inherit !important;font-weight: 700 !important}html.bb-asztal.bb-raktar .artdet__stock.stock:is(.stock--critical,.stock--warning) .stock__qty-and-unit::before,html.bb-asztal.bb-raktar .artdet__stock.stock:is(.stock--critical,.stock--warning) .stock__qty-and-unit::after{display: none !important;content: none !important}html.bb-asztal.bb-raktar .artdet__stock.stock.stock--critical .stock__content::before{box-shadow: 0 0 0 3px rgba(179,38,30,.18);animation: bbPotty 1.4s ease-in-out infinite}html.bb-asztal.bb-raktar .artdet__stock.stock.stock--warning .stock__content::before{display: none !important}html.bb-asztal.bb-raktar .artdet__stock.stock.stock--warning .stock__qty-and-unit svg{color: #e8590c}@keyframes bbPotty{0%,100%{opacity: 1;transform: scale(1)}50%{opacity: .45;transform: scale(.75)}}html.bb-asztal.bb-raktar .product .product__stock.stock{max-width: 100%;min-width: 0}html.bb-asztal.bb-raktar .product .product__stock.stock:not(.stock--warning):not(.stock--critical) .stock__content{display: inline-flex !important;align-items: center;gap: 6px;max-width: 100%;box-sizing: border-box;color: #4a453e !important;font-size: 13px;font-weight: 600;line-height: 1.3}html.bb-asztal.bb-raktar .product .product__stock.stock:not(.stock--warning):not(.stock--critical) .stock__content::before{content: \"\" !important;flex: 0 0 7px;width: 7px;height: 7px;border-radius: 50%;margin: 0 !important;background: #2a8511;box-shadow: 0 0 0 2.5px rgba(42,133,17,.16);font-size: 0 !important}html.bb-asztal.bb-raktar .product .product__stock.stock .stock__qty-and-unit{color: inherit;font-size: 13px !important;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;min-width: 0}html.bb-asztal.bb-raktar .product .product__stock.stock--warning .stock__qty-and-unit{font-size: 0 !important}html.bb-asztal.bb-raktar .product .product__stock.stock--warning .stock__qty-and-unit::before{content: \"Utolsó darabok!\";order: 1;font-size: 12.5px}html.bb-asztal.bb-raktar .product .product__stock.stock.to-order:not(.stock--warning):not(.stock--critical) .stock__content::before{background: #d08a00;box-shadow: 0 0 0 2.5px rgba(208,138,0,.18)}html.bb-asztal.bb-raktar .product .product__stock.stock.no-stock:not(.stock--warning):not(.stock--critical) .stock__content::before{background: #9a9288;box-shadow: none}html.bb-asztal.bb-raktar .product .product__img-outer{position: relative}html.bb-asztal.bb-raktar .product .product__img-outer .sticker[data-id=\"38406\"]{position: absolute !important;left: 0;bottom: 4px;z-index: 2;margin: 0 !important;box-shadow: 0 1px 4px rgba(20,18,16,.08);max-width: calc(100% - 4px) !important;padding: 2px 7px !important;font-size: 11.5px;white-space: nowrap;gap: 4px;border: 1px solid #e2dbcf !important;background: rgba(255,255,255,.94) !important;color: #3d3a35}html.bb-asztal.bb-hl-van #footer .footer__nav-4{display: none !important}html.bb-asztal .bb-hl-sav{position: relative;overflow: hidden;padding: 40px 24px;color: #fff;background: linear-gradient(135deg,#2f8f14 0%,#1f6a0c 100%)}html.bb-asztal .bb-hl-sav::after{content: \"\";position: absolute;right: -60px;top: -80px;width: 280px;height: 280px;border-radius: 50%;background: rgba(255,255,255,.07);pointer-events: none}html.bb-asztal .bb-hl-belso{position: relative;z-index: 1;max-width: 1200px;margin: 0 auto;display: grid;grid-template-columns: minmax(0,5fr) minmax(0,7fr);gap: 8px 40px;align-items: center}html.bb-asztal .bb-hl-cim{grid-column: 1;margin: 0 !important;font-size: 26px !important;font-weight: 800 !important;line-height: 1.2 !important;color: #fff !important;text-transform: none !important}html.bb-asztal .bb-hl-al{grid-column: 1;margin: 0 !important;font-size: 15px;line-height: 1.5;color: rgba(255,255,255,.88)}html.bb-asztal .bb-hl{grid-column: 2;grid-row: 1 / span 2;margin: 0;display: flex;flex-wrap: wrap;gap: 8px}html.bb-asztal .bb-hl .bb-hl-email{flex: 4 1 240px}html.bb-asztal .bb-hl .bb-hl-sor{flex: 5 1 300px;display: flex;gap: 8px}html.bb-asztal .bb-hl-mezo{flex: 1;min-width: 0;height: 50px;padding: 0 14px;border: 0;border-radius: 10px;background: #fff;color: #221f1b;font-size: 16px}html.bb-asztal .bb-hl-mezo:focus{outline: 0;box-shadow: 0 0 0 3px rgba(255,255,255,.45)}html.bb-asztal .bb-hl-gomb{flex: 0 0 auto;height: 50px;padding: 0 22px;border: 0;border-radius: 10px;cursor: pointer;background: #1c1a17;color: #fff;font-size: 14px;font-weight: 800;letter-spacing: .06em;text-transform: uppercase}html.bb-asztal .bb-hl-gomb:hover{background: #000}html.bb-asztal .bb-hl-gomb:disabled{opacity: .7}html.bb-asztal .bb-hl-hozza{flex: 0 0 100%;display: flex;gap: 10px;align-items: flex-start;margin: 6px 0 0;font-size: 13.5px;line-height: 1.45;color: #fff;cursor: pointer}html.bb-asztal .bb-hl-hozza input{flex: 0 0 18px;width: 18px;height: 18px;margin: 1px 0 0;accent-color: #1c1a17}html.bb-asztal .bb-hl-hozza a{color: #fff !important;text-decoration: underline !important}html.bb-asztal .bb-hl-reszlet{padding: 0;border: 0;background: none;color: rgba(255,255,255,.8);font-size: 13px;text-decoration: underline;cursor: pointer}html.bb-asztal .bb-hl-teljes{flex: 0 0 100%;margin: 0 0 0 28px !important;font-size: 12px;line-height: 1.45;color: rgba(255,255,255,.8)}html.bb-asztal .bb-hl-uzenet{flex: 0 0 100%;margin: 4px 0 0 !important;padding: 8px 12px;border-radius: 8px;background: rgba(0,0,0,.25);color: #fff;font-size: 14px}html.bb-asztal .bb-hl-recaptcha:empty{display: none}html.bb-asztal .social-reviews-sku-wrap .social-medias{display: none !important}html.bb-asztal body .artdet__img-data-left\u003E:is(#page_artdet_func_favourites,#page_artdet_func_compare){border: 1.5px solid #2a8511 !important;color: #1f6a0c !important;background: #fff !important;box-shadow: 0 2px 8px rgba(42,133,17,.14) !important}html.bb-asztal body .artdet__img-data-left\u003E:is(#page_artdet_func_favourites,#page_artdet_func_compare)::before{color: #1f6a0c !important}html.bb-asztal #filter-dropdown .product_filter_num.ui-slider{height: 6px !important;margin: 16px 11px 24px !important;border: 0 !important;border-radius: 3px;background: #e6e0d5 !important}html.bb-asztal #filter-dropdown .product_filter_num.ui-slider::before{display: none !important}html.bb-asztal #filter-dropdown .ui-slider-range{top: 0 !important;height: 6px !important;background: #2a8511 !important}html.bb-asztal #filter-dropdown .ui-slider-handle{top: 50% !important;width: 22px !important;height: 22px !important;padding: 0 !important;cursor: grab;border: 3px solid #2a8511 !important;border-radius: 50% !important;background: #fff !important;box-shadow: 0 2px 6px rgba(20,18,16,.2) !important;transform: translate(-50%,-50%) !important}html.bb-asztal #filter-dropdown .ui-slider-handle::after{display: none !important}html.bb-asztal #filter-dropdown .ui-slider-handle:focus{outline: 0;box-shadow: 0 0 0 4px rgba(42,133,17,.2) !important}html.bb-asztal #filter-dropdown .custom-control-input:checked ~ .custom-control-label::before{background-color: #2a8511 !important;border-color: #2a8511 !important}html.bb-asztal #filter-dropdown .custom-control-input:focus ~ .custom-control-label::before{box-shadow: 0 0 0 3px rgba(42,133,17,.2) !important}html.bb-asztal #filter-dropdown .product_filter_title__icon{color: #6b645a !important}html.bb-asztal #filter-dropdown input.form-control:focus{border-color: #2a8511 !important;box-shadow: 0 0 0 3px rgba(42,133,17,.15) !important}html.bb-asztal .bb-biz-van .start_banners__elements,html.bb-asztal #product_usp_element.bb-biz-van\u003E:not(.bb-biz){display: none !important}html.bb-asztal #product_usp_element.bb-biz-van{display: block !important}html.bb-asztal .bb-biz{display: grid;grid-template-columns: repeat(auto-fit,minmax(220px,1fr));gap: 14px;margin: 8px 0 24px}html.bb-asztal .bb-biz-kartya{display: flex;align-items: center;gap: 14px;padding: 14px 16px;border: 1px solid #ece6dc;border-radius: 14px;background: #fff;box-shadow: 0 2px 10px rgba(20,18,16,.05);color: #221f1b !important;text-decoration: none !important;transition: box-shadow .2s ease}html.bb-asztal a.bb-biz-kartya:hover{box-shadow: 0 6px 20px rgba(20,18,16,.1)}html.bb-asztal .bb-biz-ikon{flex: 0 0 44px;width: 44px;height: 44px;display: inline-flex;align-items: center;justify-content: center}html.bb-asztal .bb-biz-ikon img{width: 44px;height: 44px;object-fit: contain}html.bb-asztal .bb-biz-szoveg{display: flex;flex-direction: column;min-width: 0;line-height: 1.3}html.bb-asztal .bb-biz-szoveg b{font-size: 15px;font-weight: 700}html.bb-asztal .bb-biz-szoveg span{margin-top: 2px;font-size: 13.5px;color: #6b645a}html.bb-asztal #footer,html.bb-asztal #footer .footer{background: #1c1a17 !important;color: #d8d2c7 !important}html.bb-asztal #footer .footer{padding: 48px 0 24px !important}html.bb-asztal #footer .footer__header{margin: 0 0 14px !important;padding: 0 !important;font-size: 13px !important;font-weight: 700 !important;letter-spacing: .09em;text-transform: uppercase;color: #fff !important}html.bb-asztal #footer .footer__html ul{margin: 0 !important;padding: 0 !important;list-style: none !important}html.bb-asztal #footer .footer__html li{margin: 0 !important;padding: 0 !important}html.bb-asztal #footer .footer__html a{display: inline-block;padding: 5px 0 !important;font-size: 14.5px !important;line-height: 1.35 !important;color: #cfc8bc !important;text-decoration: none !important;transition: color .15s}html.bb-asztal #footer .footer__html a:hover{color: #fff !important}html.bb-asztal #footer .footer__html p:empty,html.bb-asztal #footer .footer__html p:has(\u003Ebr:only-child){display: none}html.bb-asztal #footer .footer_contact li:nth-child(-n+3) a{color: #fff !important;font-weight: 600}html.bb-asztal #footer .footer_contact a::before{color: #7cc35c !important}html.bb-asztal #footer .footer_contact li:nth-child(4){margin-top: 12px !important;padding-top: 12px !important;border-top: 1px solid rgba(255,255,255,.12)}html.bb-asztal #footer .footer_contact li:nth-child(n+4) a{padding: 3px 0 !important;font-size: 13.5px !important;color: #a9a196 !important}html.bb-asztal #footer .footer_contact li:nth-child(n+4) a:hover{color: #fff !important}html.bb-asztal #footer .bb-alab\u003E.footer__nav-3{order: 1}html.bb-asztal #footer .bb-alab\u003E.footer__nav-1{order: 2}html.bb-asztal #footer .bb-alab\u003E.footer__nav-2{order: 3}html.bb-asztal #footer .bb-alab\u003E.bb-alab-kov{order: 4}html.bb-asztal #footer .bb-alab\u003E.footer__nav-4{order: 5}html.bb-asztal #footer .footer_social{margin: 0 !important;padding: 0 !important}html.bb-asztal #footer .footer_social .footer__list{gap: 10px;flex-wrap: wrap;margin: 0 !important;padding: 0 !important}html.bb-asztal #footer .footer_social li{margin: 0 !important}html.bb-asztal #footer .footer_social li p{margin: 0 !important}html.bb-asztal #footer .footer_social a,html.bb-asztal #footer .footer_social .btn{display: inline-flex !important;align-items: center;justify-content: center;width: 42px !important;height: 42px !important;padding: 0 !important;border: 0 !important;border-radius: 50% !important;background: rgba(255,255,255,.08) !important;color: #fff !important;box-shadow: none !important;transition: background .15s}html.bb-asztal #footer .footer_social a:hover{background: #2a8511 !important}html.bb-asztal #footer .footer_social a::before,html.bb-asztal #footer .footer_social .btn::before{color: #fff !important;margin: 0 !important}html.bb-asztal #footer .bb-alab-nyelv-cim{margin-top: 26px !important}html.bb-asztal #footer .bb-lab-nyelvek{display: flex;flex-wrap: wrap;gap: 8px}html.bb-asztal #footer .bb-lab-nyelvek a{display: inline-flex !important;padding: 3px !important;border-radius: 6px;border: 1.5px solid transparent;line-height: 0 !important}html.bb-asztal #footer .bb-lab-nyelvek a:hover{border-color: rgba(255,255,255,.3)}html.bb-asztal #footer .bb-lab-nyelvek a.aktiv{border-color: #7cc35c}html.bb-asztal #footer .bb-lab-nyelvek img{width: 28px;height: 20px;border-radius: 3px;object-fit: cover}html.bb-asztal .partners{margin: 0 !important;padding: 0 0 22px !important;background: #1c1a17 !important}html.bb-asztal .partners .partners__container{padding-top: 18px !important;border-top: 1px solid rgba(255,255,255,.12)}html.bb-asztal .partners .partners__container::before{content: \"Biztonságos fizetés\";display: block;margin: 0 0 10px;text-align: center;font-size: 12px;font-weight: 700;letter-spacing: .09em;text-transform: uppercase;color: #a9a196}html.bb-asztal .partners .parnters__inner{gap: 8px !important}html.bb-asztal .partners .checkout__item{padding: 5px 8px;border-radius: 8px;background: #fff}html.bb-asztal .partners .checkout__img{max-height: 26px;width: auto}html.bb-asztal .carousel__prev-next-btn{position: relative}html.bb-asztal .carousel__prev-next-btn,html.bb-asztal .flickity-prev-next-button{width: 44px !important;height: 44px !important;min-width: 0 !important;padding: 0 !important;border: 1.5px solid #e2dbcf !important;border-radius: 50% !important;background: #fff !important;box-shadow: 0 2px 8px rgba(20,18,16,.08) !important;color: #221f1b !important;transition: box-shadow .15s,border-color .15s}html.bb-asztal .carousel__prev-next-btn:hover,html.bb-asztal .flickity-prev-next-button:hover{border-color: #2a8511 !important;box-shadow: 0 4px 14px rgba(20,18,16,.14) !important}html.bb-asztal .flickity-prev-next-button .flickity-button-icon{display: none !important}html.bb-asztal .carousel__prev-next-btn::before,html.bb-asztal .flickity-prev-next-button::before{content: \"\" !important;display: block !important;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 18px !important;height: 18px !important;margin: 0 !important;font-size: 0 !important;background: #221f1b !important;-webkit-mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 5l7 7-7 7'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 5l7 7-7 7'/%3E%3C/svg%3E\") center / contain no-repeat}html.bb-asztal .carousel__prev-btn::before,html.bb-asztal .flickity-prev-next-button.previous::before{transform: translate(-50%,-50%) scaleX(-1)}html.bb-asztal .carousel__prev-next-btn::after,html.bb-asztal .flickity-prev-next-button::after{display: none !important}html.bb-asztal .carousel__prev-next-btn:disabled,html.bb-asztal .carousel__prev-next-btn.disabled,html.bb-asztal .flickity-prev-next-button:disabled{opacity: .35 !important}html.bb-asztal .carousel__buttons{gap: 10px}html.bb-asztal .flickity-page-dots .flickity-page-dot{width: 9px !important;height: 9px !important;min-width: 0 !important;margin: 0 4px !important;padding: 0 !important;border: 0 !important;border-radius: 5px !important;background: rgba(255,255,255,.7) !important;box-shadow: 0 0 0 1px rgba(20,18,16,.25) !important;opacity: 1 !important;transition: width .2s}html.bb-asztal .flickity-page-dots .flickity-page-dot.is-selected{width: 26px !important;background: #fff !important}html.bb-asztal .flickity-page-dots .flickity-page-dot::before,html.bb-asztal .flickity-page-dots .flickity-page-dot::after{display: none !important}html.bb-asztal .banner_start_1__slide-inner{display: flex !important;flex-direction: column;height: 100%;overflow: hidden;border: 1px solid #ece6dc;border-radius: 14px;background: #fff;box-shadow: 0 2px 10px rgba(20,18,16,.05);transition: box-shadow .15s,border-color .15s}html.bb-asztal .banner_start_1__slide-inner:hover{border-color: #cfe3c4;box-shadow: 0 6px 18px rgba(20,18,16,.1)}html.bb-asztal .banner_start_1__img-outer{padding: 14px 14px 0}html.bb-asztal .banner_start_1__title{position: static !important;inset: auto !important;transform: none !important;margin: 0 !important;padding: 10px 10px 14px !important;background: none !important;border-radius: 0 !important;text-align: center;box-shadow: none !important}html.bb-asztal .banner_start_1__title a{display: block;padding: 0 !important;background: none !important;color: #221f1b !important;font-size: 16px !important;font-weight: 700 !important;line-height: 1.25 !important;text-transform: none !important;text-decoration: none !important}html.bb-asztal main.main ul:has(\u003Eli\u003Ea[href^=\"tel:\"],\u003Eli\u003Ea[href^=\"mailto:\"],\u003Eli\u003Ea[href*=\"maps.google\"]){margin: 0 !important;padding-left: 0 !important;list-style: none !important}html.bb-asztal main.main ul:has(\u003Eli\u003Ea[href^=\"tel:\"],\u003Eli\u003Ea[href^=\"mailto:\"],\u003Eli\u003Ea[href*=\"maps.google\"])\u003Eli{list-style: none !important;margin: 0 0 8px}html.bb-asztal main.main ul:has(\u003Eli\u003Ea[href^=\"tel:\"],\u003Eli\u003Ea[href^=\"mailto:\"],\u003Eli\u003Ea[href*=\"maps.google\"])\u003Eli::marker{content: none}html.bb-asztal main.main ul:has(\u003Eli\u003Ea[href^=\"tel:\"],\u003Eli\u003Ea[href^=\"mailto:\"],\u003Eli\u003Ea[href*=\"maps.google\"]) a{color: #1d1b18 !important;font-weight: 700;text-decoration: none !important}html.bb-asztal main.main ul:has(\u003Eli\u003Ea[href^=\"tel:\"],\u003Eli\u003Ea[href^=\"mailto:\"],\u003Eli\u003Ea[href*=\"maps.google\"]) a::before{color: #1f6a0c !important}html.bb-asztal .product__main-btn.product__inquire-btn::before,html.bb-asztal .product__main-btn.product__details-btn::before{display: none !important}html.bb-asztal .product__main-btn.product__inquire-btn,html.bb-asztal .product__main-btn.product__details-btn{justify-content: center}html.bb-asztal .product__main-btn.product__inquire-btn::after,html.bb-asztal .product__main-btn.product__details-btn::after{margin: 0 !important;font-size: 14px !important;font-weight: 700 !important;text-transform: uppercase;letter-spacing: .06em}}";
(document.head || gyoker).appendChild(stilus);

function asztalon() { return !!(window.matchMedia && window.matchMedia('(min-width: 768px)').matches); }

function raktarRovid() {
if (!gyoker.classList.contains('bb-raktar')) return;
[].forEach.call(document.querySelectorAll('.product .product__stock .stock__qty-and-unit.is-text'), function (el) {
if (el.children.length) return;
var t = el.textContent.trim(), m = t.match(/^Több mint (.+?) (db|darab|pár|csomag|kg|l|m)? ?raktáron$/i);
if (m) el.textContent = m[1] + '+ ' + (m[2] ? m[2] + ' ' : '') + 'raktáron';
});
}

var HL_KULCS = '6LfG450rAAAAALmKO5xSb6edd6cVgxx57xvrF9k1';
var HL_HOZZA = 'Hozzájárulok, hogy a Bí-Bor-Ász Kft. e-mailben tájékoztasson borászati, szőlészeti, kertészeti és mezőgazdasági termékekről, újdonságokról, akciókról, kedvezményekről, szakmai tartalmakról és kapcsolódó szolgáltatásokról. A hozzájárulásomat bármikor visszavonhatom. Az adatkezelés részleteit az <a href="/shop_help.php?tab=privacy_policy" target="_blank">Adatkezelési tájékoztató</a> tartalmazza. Tudomásul veszem, hogy a hozzájárulásomat bármikor, ingyenesen visszavonhatom a hírlevelekben található leiratkozási linken keresztül, vagy az info@bi-bor.hu e-mail címen.';
function hirlevel() {
if (kapcsolo('ujhirlevel', 'bbHirlevel') === '0') return;
if (/^\/hirlevel\/?$/.test(location.pathname)) return;
var lablec = document.getElementById('footer');
var vissza = location.pathname + location.search.replace(/([?&])overlay=[^&]*&?/, '$1').replace(/[?&]$/, '');
if (!lablec || document.querySelector('.bb-hl-sav') || typeof window.recaptcha_load !== 'function') return;
var sav = document.createElement('section');
sav.className = 'bb-hl-sav';
sav.setAttribute('aria-label', 'Hírlevél-feliratkozás');
sav.innerHTML = '<div class="bb-hl-belso"><h2 class="bb-hl-cim">Ne maradjon le az akciókról és újdonságokról!</h2>' +
'<p class="bb-hl-al">Különleges kedvezmények, új termékek és hasznos tippek minden hónapban.</p>' +
'<form class="bb-hl" name="bb_hirlevel" action="/hirlevel" method="post" novalidate>' +
'<input type="hidden" name="action" value="subscribe"><input type="hidden" name="file_back" value="">' +
'<input type="hidden" name="spec_back_url" value="">' +
'<input class="bb-hl-mezo bb-hl-email" name="news_emai" type="email" maxlength="200" placeholder="E-mail cím" autocomplete="email" aria-label="E-mail cím">' +
'<div class="bb-hl-sor"><input class="bb-hl-mezo" name="news_name" type="text" maxlength="200" placeholder="Név" autocomplete="name" aria-label="Név">' +
'<button type="submit" class="bb-hl-gomb">Feliratkozom</button></div>' +
'<label class="bb-hl-hozza"><input type="checkbox" name="news_privacy_policy" value="1"><span>Hozzájárulok a hírlevél küldéséhez, és elfogadom az <a href="/shop_help.php?tab=privacy_policy" target="_blank">adatkezelési tájékoztatót</a>. <button type="button" class="bb-hl-reszlet">Részletek</button></span></label>' +
'<p class="bb-hl-teljes" hidden>' + HL_HOZZA + '</p>' +
'<p class="bb-hl-uzenet" role="alert" hidden></p><div class="bb-hl-recaptcha"></div></form></div>';
sav.querySelector('input[name="file_back"]').value = vissza;
sav.querySelector('input[name="spec_back_url"]').value = location.origin + vissza;
var f = sav.querySelector('form'), uzenet = f.querySelector('.bb-hl-uzenet'), gomb = f.querySelector('.bb-hl-gomb');
sav.querySelector('.bb-hl-reszlet').addEventListener('click', function (e) {
e.preventDefault(); e.stopPropagation();
var t = f.querySelector('.bb-hl-teljes'); t.hidden = !t.hidden;
this.textContent = t.hidden ? 'Részletek' : 'Bezár';
});
function hiba(t) { uzenet.textContent = t; uzenet.hidden = false; }
f.addEventListener('submit', function (e) {
e.preventDefault();
uzenet.hidden = true;
var email = f.news_emai.value.trim();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { hiba('Kérjük, adjon meg egy érvényes e-mail címet.'); f.news_emai.focus(); return; }
if (!f.news_name.value.trim()) { hiba('Kérjük, adja meg a nevét.'); f.news_name.focus(); return; }
if (!f.news_privacy_policy.checked) { hiba('A feliratkozáshoz kérjük, fogadja el a hozzájárulást.'); return; }
gomb.disabled = true;
gomb.textContent = 'Küldés…';
window.recaptcha_load();
var vege = Date.now() + 10000, azon = null;
(function var_() {
var g = window.grecaptcha;
if (g && typeof g.render === 'function') {
try {
if (azon === null) azon = g.render(f.querySelector('.bb-hl-recaptcha'), { sitekey: HL_KULCS, size: 'invisible', badge: 'inline', callback: function () { HTMLFormElement.prototype.submit.call(f); } });
g.execute(azon);
} catch (x) { location.href = '/hirlevel'; }
return;
}
if (Date.now() < vege) setTimeout(var_, 300);
else location.href = '/hirlevel';
})();
});
lablec.parentNode.insertBefore(sav, lablec);
gyoker.classList.add('bb-hl-van');
}

function kepCim(img) {
if (!img) return '';
var src = img.getAttribute('data-src') || '';
if (!src) {
var forras = img.parentNode && img.parentNode.querySelector('source[data-srcset]');
if (forras) src = forras.getAttribute('data-srcset').trim().split(/\s+/)[0];
}
if (!src && img.currentSrc && img.currentSrc.indexOf('space.gif') < 0) src = img.currentSrc;
return src;
}
function bizalom() {
if (kapcsolo('bizalom', 'bbBizalom') === '0') return;
var forrasok = [
{ hely: document.getElementById('banner_start_small'), elem: '.carousel-cell', cim: '.start_banners__element-title', szoveg: '.start_banners__element-text', rejt: '.start_banners__elements' },
{ hely: document.getElementById('product_usp_element'), elem: '.product_usp-item', cim: '.product_usp-content-title', szoveg: '.product_usp-content-text', rejt: null }
];
forrasok.forEach(function (f) {
if (!f.hely || f.hely.querySelector('.bb-biz')) return;
var elemek = [].map.call(f.hely.querySelectorAll(f.elem), function (e) {
var c = e.querySelector(f.cim), t = e.querySelector(f.szoveg), a = e.querySelector('a[href]');
return { kep: kepCim(e.querySelector('img')), cim: c ? c.textContent.trim() : '', szoveg: t ? t.textContent.trim() : '', link: a ? a.getAttribute('href') : '' };
}).filter(function (x) { return x.cim; });
if (elemek.length < 2) return;
var sav = document.createElement('div');
sav.className = 'bb-biz';
sav.setAttribute('role', 'list');
elemek.forEach(function (x) {
var k = document.createElement(x.link ? 'a' : 'div');
k.className = 'bb-biz-kartya';
k.setAttribute('role', 'listitem');
if (x.link) k.href = x.link;
k.innerHTML = '<span class="bb-biz-ikon">' + (x.kep ? '<img alt="" loading="lazy">' : '') + '</span><span class="bb-biz-szoveg"><b></b><span></span></span>';
if (x.kep) k.querySelector('img').src = x.kep;
k.querySelector('b').textContent = x.cim;
k.querySelector('.bb-biz-szoveg span').textContent = x.szoveg;
sav.appendChild(k);
});
var rejt = f.rejt && f.hely.querySelector(f.rejt);
if (f.rejt && !rejt) return;
f.hely.classList.add('bb-biz-van');
(rejt ? rejt.parentNode : f.hely).appendChild(sav);
});
}

var NYELVEK = [ ['hu', '/', 'Magyar'], ['gb', '/en/', 'English'], ['de', '/de/', 'Deutsch'], ['hr', '/hr/', 'Hrvatski'], ['ro', '/ro/', 'Română'] ];
function lablecLinkek() {
var forditott = new RegExp('^' + String.fromCharCode(92, 92) + '+');
[].forEach.call(document.querySelectorAll('#footer a[href]'), function (a) {
var h = a.getAttribute('href'), u = h.replace(forditott, '/').replace(/^(?:www\.)?bi-bor\.hu\//i, '/');
if (u !== h) a.setAttribute('href', u);
});
var harm = document.querySelector('#footer a[href$="/harmonizalt-ertesites"]');
if (harm && !document.querySelector('#footer a[href$="/velemenyek-ellenorzese"]')) {
var li = document.createElement('li');
li.innerHTML = '<a href="/velemenyek-ellenorzese">Vélemények ellenőrzése</a>';
var regiLi = harm.closest('li');
if (regiLi) regiLi.parentNode.insertBefore(li, regiLi.nextSibling);
}
}
function lablec() {
var sor = document.querySelector('#footer .footer__navigation > .row');
var n3 = sor && sor.querySelector('.footer__nav-3');
if (!n3 || sor.classList.contains('bb-alab') || sor.classList.contains('bb-lab')) return;
sor.classList.add('bb-alab');
var kov = document.createElement('div');
kov.className = 'footer__nav col-xs-6 col-lg-3 mb-5 mb-lg-3 bb-alab-kov';
var kozossegi = n3.querySelector('.footer_social');
if (kozossegi) {
var c1 = document.createElement('div');
c1.className = 'footer__header h6';
c1.textContent = 'Kövessen minket';
kov.appendChild(c1);
kov.appendChild(kozossegi);
}
var c2 = document.createElement('div');
c2.className = 'footer__header h6' + (kozossegi ? ' bb-alab-nyelv-cim' : '');
c2.textContent = 'Nyelv';
kov.appendChild(c2);
var akt = location.pathname.match(/^\/(en|de|hr|ro)\//);
var nyelvek = document.createElement('div');
nyelvek.className = 'bb-lab-nyelvek';
nyelvek.setAttribute('aria-label', 'Nyelv');
nyelvek.innerHTML = NYELVEK.map(function (n) {
var ez = akt ? akt[1] === n[1].replace(/\//g, '') : n[0] === 'hu';
return '<a href="' + n[1] + '" hreflang="' + (n[0] === 'gb' ? 'en' : n[0]) + '" title="' + n[2] + '"' + (ez ? ' class="aktiv" aria-current="true"' : '') + '>' +
'<img src="https://flagcdn.com/w40/' + n[0] + '.png" width="28" height="20" alt="' + n[2] + '" loading="lazy"></a>';
}).join('');
kov.appendChild(nyelvek);
sor.appendChild(kov);
}

function indul() {
if (!asztalon()) return;
try { raktarRovid(); } catch (e) { if (window.console) console.error('[asztali] raktárjelzés', e); }
try { hirlevel(); } catch (e) { if (window.console) console.error('[asztali] hírlevél', e); }
try { bizalom(); } catch (e) { if (window.console) console.error('[asztali] bizalmi sáv', e); }
try { lablec(); } catch (e) { if (window.console) console.error('[asztali] lábléc', e); }
try { lablecLinkek(); } catch (e) { if (window.console) console.error('[asztali] lábléc linkek', e); }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
window.addEventListener('load', function () { if (asztalon()) { raktarRovid(); setTimeout(raktarRovid, 1600); } });
})();
