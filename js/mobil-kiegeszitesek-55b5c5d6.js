(function () {
var MINDENKI = true;
var KULCS = 'bbMobilKieg';
var allapot = null;
try {
var m = location.search.match(/[?&]mobilkieg=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
var gyoker = document.documentElement;
gyoker.classList.add('bb-kieg');
try {
var oh = location.search.match(/[?&]osszhang=([01])/);
if (oh) localStorage.setItem('bbOsszhang', oh[1]);
if (localStorage.getItem('bbOsszhang') !== '0') gyoker.classList.add('bb-osszhang');
} catch (e) { /* tiltott tárhely */ }
try {
var rk = location.search.match(/[?&]raktar=([01])/);
if (rk) localStorage.setItem('bbRaktar', rk[1]);
if (localStorage.getItem('bbRaktar') !== '0') gyoker.classList.add('bb-raktar');
} catch (e) { /* tiltott tárhely */ }
gyoker.setAttribute('data-bb-kieg', '2026-10-15 15:24:29');
var stilus = document.createElement('style');
stilus.id = 'bb-mobil-kieg';
stilus.textContent = "@media (max-width: 767.98px){html.bb-kieg .carousel__prev-next-btn{position: relative;width: 42px !important;height: 42px !important;min-width: 0 !important;padding: 0 !important;border: 1.5px solid #e2dbcf !important;border-radius: 50% !important;background: #fff !important;box-shadow: 0 2px 8px rgba(20,18,16,.08) !important;color: #221f1b !important}html.bb-kieg .carousel__prev-next-btn::before{content: \"\" !important;display: block !important;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 18px !important;height: 18px !important;margin: 0 !important;font-size: 0 !important;background: #221f1b !important;-webkit-mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 5l7 7-7 7'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 5l7 7-7 7'/%3E%3C/svg%3E\") center / contain no-repeat}html.bb-kieg .carousel__prev-btn::before{transform: translate(-50%,-50%) scaleX(-1)}html.bb-kieg .carousel__prev-next-btn::after{display: none !important}html.bb-kieg .carousel__prev-next-btn:disabled,html.bb-kieg .carousel__prev-next-btn.disabled{opacity: .35 !important}html.bb-kieg .carousel__buttons{gap: 8px}html.bb-kieg .flickity-prev-next-button{width: 42px !important;height: 42px !important;min-width: 0 !important;padding: 0 !important;border: 1.5px solid #e2dbcf !important;border-radius: 50% !important;background: #fff !important;box-shadow: 0 2px 8px rgba(20,18,16,.08) !important}html.bb-kieg .flickity-prev-next-button .flickity-button-icon{display: none !important}html.bb-kieg .flickity-prev-next-button::before{content: \"\" !important;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 18px;height: 18px;background: #221f1b;-webkit-mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 5l7 7-7 7'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 5l7 7-7 7'/%3E%3C/svg%3E\") center / contain no-repeat}html.bb-kieg .flickity-prev-next-button.previous::before{transform: translate(-50%,-50%) scaleX(-1)}html.bb-kieg .flickity-prev-next-button::after{display: none !important}html.bb-kieg .flickity-prev-next-button:disabled{opacity: .35 !important}html.bb-kieg .back_to_top{bottom: calc(env(safe-area-inset-bottom,0px) + 140px) !important;right: 18px !important;width: 44px !important;height: 44px !important;min-width: 0 !important;padding: 0 !important;display: inline-flex !important;align-items: center;justify-content: center;border: 0 !important;border-radius: 50% !important;background: #fff !important;box-shadow: 0 4px 14px rgba(20,18,16,.18) !important}html.bb-kieg .back_to_top::before{content: \"\" !important;display: block !important;width: 18px !important;height: 18px !important;margin: 0 !important;font-size: 0 !important;background: #221f1b !important;-webkit-mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 15l7-7 7 7'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 15l7-7 7 7'/%3E%3C/svg%3E\") center / contain no-repeat}html.bb-kieg .back_to_top::after{display: none !important}html.bb-kieg .flickity-page-dots .flickity-page-dot{width: 8px !important;height: 8px !important;min-width: 0 !important;margin: 0 4px !important;padding: 0 !important;border: 0 !important;border-radius: 4px !important;background: rgba(255,255,255,.7) !important;box-shadow: 0 0 0 1px rgba(20,18,16,.25) !important;opacity: 1 !important;transition: width .2s}html.bb-kieg .flickity-page-dots .flickity-page-dot.is-selected{width: 22px !important;background: #fff !important}html.bb-kieg .flickity-page-dots .flickity-page-dot::before,html.bb-kieg .flickity-page-dots .flickity-page-dot::after{display: none !important}html.bb-kieg .banner_start_1__slides .row{row-gap: 12px !important;margin-left: -6px !important;margin-right: -6px !important}html.bb-kieg .banner_start_1__slide{padding-left: 6px !important;padding-right: 6px !important}html.bb-kieg .banner_start_1__slide-inner{display: flex !important;flex-direction: column;height: 100%;overflow: hidden;border: 1px solid #ece6dc;border-radius: 14px;background: #fff;box-shadow: 0 2px 10px rgba(20,18,16,.05)}html.bb-kieg .banner_start_1__img-outer{padding: 12px 12px 0}html.bb-kieg .banner_start_1__title{position: static !important;inset: auto !important;transform: none !important;margin: 0 !important;padding: 10px 10px 14px !important;background: none !important;border-radius: 0 !important;text-align: center;box-shadow: none !important}html.bb-kieg .banner_start_1__title a{display: block;padding: 0 !important;background: none !important;color: #221f1b !important;font-size: 15px !important;font-weight: 700 !important;line-height: 1.25 !important;text-transform: none !important;text-decoration: none !important}html.bb-kieg main.main\u003E*{margin-bottom: 18px !important}html.bb-kieg main.main .custom-content__container-inner{padding-top: 20px !important;padding-bottom: 20px !important}html.bb-kieg .bb-kieg-ures{display: none !important}html.bb-kieg main.main ul.bb-kieg-eler{margin: 0 !important;padding-left: 0 !important;list-style: none !important}html.bb-kieg main.main ul.bb-kieg-eler li{list-style: none !important;margin: 0 0 8px}html.bb-kieg main.main ul.bb-kieg-eler li::marker{content: none}html.bb-kieg main.main ul.bb-kieg-eler a{color: #1d1b18 !important;font-weight: 700;text-decoration: none !important}html.bb-kieg main.main ul.bb-kieg-eler a::before{color: #1f6a0c !important}html.bb-kieg #footer,html.bb-kieg #footer .footer{background: #1c1a17 !important;color: #d8d2c7 !important}html.bb-kieg #footer .footer{padding: 36px 0 28px !important}html.bb-kieg #footer .footer-container{padding-left: 20px !important;padding-right: 20px !important}html.bb-kieg #footer .footer__nav{margin-bottom: 26px !important}html.bb-kieg #footer .footer__nav-1,html.bb-kieg #footer .footer__nav-2{flex: 0 0 50% !important;max-width: 50% !important}html.bb-kieg #footer .footer__nav-3,html.bb-kieg #footer .footer__nav-4{flex: 0 0 100% !important;max-width: 100% !important}html.bb-kieg #footer .footer__header{margin: 0 0 12px !important;padding: 0 !important;font-size: 13px !important;font-weight: 700 !important;letter-spacing: .09em;text-transform: uppercase;color: #fff !important}html.bb-kieg #footer .footer__html ul{margin: 0 !important;padding: 0 !important;list-style: none !important}html.bb-kieg #footer .bb-lab-al{margin: 14px 0 4px;font-size: 12px;font-weight: 700;letter-spacing: .09em;text-transform: uppercase;color: #a9a196}html.bb-kieg #footer .footer__html li{margin: 0 !important;padding: 0 !important}html.bb-kieg #footer .footer__html a{display: inline-block;padding: 6px 0 !important;font-size: 15px !important;line-height: 1.35 !important;color: #cfc8bc !important;text-decoration: none !important}html.bb-kieg #footer .footer__html a:active{color: #fff !important}html.bb-kieg #footer .footer__html p:empty,html.bb-kieg #footer .footer__html p:has(\u003Ebr:only-child){display: none}html.bb-kieg #footer .footer_contact li:nth-child(-n+3) a{color: #fff !important;font-weight: 600}html.bb-kieg #footer .footer_contact a::before{color: #7cc35c !important}html.bb-kieg #footer .footer_contact li:nth-child(4){margin-top: 14px !important;padding-top: 14px !important;border-top: 1px solid rgba(255,255,255,.12)}html.bb-kieg #footer .footer_contact li:nth-child(n+4) a{padding: 4px 0 !important;font-size: 13.5px !important;color: #a9a196 !important}html.bb-kieg #footer .footer_social{margin: 18px 0 0 !important;padding: 0 !important}html.bb-kieg #footer .footer_social .footer__list{gap: 10px;flex-wrap: wrap;margin: 0 !important;padding: 0 !important}html.bb-kieg #footer .footer_social li{margin: 0 !important}html.bb-kieg #footer .footer_social li p{margin: 0 !important}html.bb-kieg #footer .footer_social a,html.bb-kieg #footer .footer_social .btn{display: inline-flex !important;align-items: center;justify-content: center;width: 42px !important;height: 42px !important;padding: 0 !important;border: 0 !important;border-radius: 50% !important;background: rgba(255,255,255,.08) !important;color: #fff !important;box-shadow: none !important}html.bb-kieg #footer .footer_social a::before,html.bb-kieg #footer .footer_social .btn::before{color: #fff !important;margin: 0 !important}html.bb-kieg #footer .footer__nav-4{padding: 18px !important;border-radius: 14px;background: rgba(255,255,255,.06)}html.bb-kieg #footer .footer__nav-4 .footer__html h1{display: none !important}html.bb-kieg #footer .footer__nav-4 .footer__html p{margin: 0 !important;text-align: left !important;color: #d8d2c7 !important;font-size: 14px !important;line-height: 1.5 !important}html.bb-kieg #footer .footer__nav-4 .btn{width: 100%;min-height: 48px;margin-top: 12px !important;border: 0 !important;border-radius: 10px !important;background: #2a8511 !important;color: #fff !important;font-weight: 700 !important;box-shadow: none !important}html.bb-kieg #footer .footer__nav-4 .btn::before,html.bb-kieg #footer .footer__nav-4 .btn::after{display: none !important}html.bb-kieg-sav .carousel.flickity-enabled .product.carousel-cell,html.bb-kieg-sav .carousel.flickity-enabled .product__inner{min-height: 0 !important;height: 100% !important}html.bb-kieg-sav .carousel.flickity-enabled.bb-kieg-meres .product.carousel-cell,html.bb-kieg-sav .carousel.flickity-enabled.bb-kieg-meres .product__inner{height: auto !important}html.bb-kieg .partners{margin: 0 !important;padding: 4px 0 18px !important;background: #1c1a17 !important}html.bb-kieg .partners .partners__container{padding: 16px 20px 0 !important;border-top: 1px solid rgba(255,255,255,.12)}html.bb-kieg .partners .partners__container::before{content: \"Biztonságos fizetés\";display: block;margin: 0 0 10px;text-align: center;font-size: 12px;font-weight: 700;letter-spacing: .09em;text-transform: uppercase;color: #a9a196}html.bb-kieg .partners .parnters__inner{gap: 8px !important}html.bb-kieg .partners .checkout__item{padding: 5px 8px;border-radius: 8px;background: #fff}html.bb-kieg .partners .checkout__img{max-height: 26px;width: auto}html.bb-hl-van #footer .footer__nav-4{display: none !important}.bb-hl-sav{position: relative;overflow: hidden;padding: 28px 20px 24px;color: #fff;background: linear-gradient(135deg,#2f8f14 0%,#1f6a0c 100%)}.bb-hl-sav::after{content: \"\";position: absolute;right: -40px;top: -40px;width: 180px;height: 180px;border-radius: 50%;background: rgba(255,255,255,.07);pointer-events: none}.bb-hl-belso{position: relative;z-index: 1}.bb-hl-cim{margin: 0 0 6px !important;font-size: 22px !important;font-weight: 800 !important;line-height: 1.2 !important;color: #fff !important;text-transform: none !important}.bb-hl-al{margin: 0 0 16px !important;font-size: 15px;line-height: 1.45;color: rgba(255,255,255,.88)}.bb-hl{margin: 0}.bb-hl-sor{display: flex;gap: 8px}.bb-hl-mezo{flex: 1;min-width: 0;height: 50px;padding: 0 14px;border: 0;border-radius: 10px;background: #fff;color: #221f1b;font-size: 16px}.bb-hl-mezo:focus{outline: 0;box-shadow: 0 0 0 3px rgba(255,255,255,.45)}.bb-hl-email{display: block;width: 100%;margin-bottom: 8px}.bb-hl-gomb{flex: 0 0 auto;height: 50px;padding: 0 16px;border: 0;border-radius: 10px;background: #1c1a17;color: #fff;font-size: 14px;font-weight: 800;letter-spacing: .06em;text-transform: uppercase}.bb-hl-gomb:disabled{opacity: .7}.bb-hl-hozza{display: flex;gap: 10px;align-items: flex-start;margin: 14px 0 0;font-size: 13.5px;line-height: 1.45;color: #fff;cursor: pointer}.bb-hl-hozza input{flex: 0 0 20px;width: 20px;height: 20px;margin: 1px 0 0;accent-color: #1c1a17}.bb-hl-hozza a{color: #fff !important;text-decoration: underline !important}.bb-hl-reszlet{padding: 0;border: 0;background: none;color: rgba(255,255,255,.8);font-size: 13px;text-decoration: underline}.bb-hl-teljes{margin: 8px 0 0 30px !important;font-size: 12px;line-height: 1.45;color: rgba(255,255,255,.8)}.bb-hl-uzenet{margin: 12px 0 0 !important;padding: 8px 12px;border-radius: 8px;background: rgba(0,0,0,.25);color: #fff;font-size: 14px}.bb-hl-recaptcha:empty{display: none}html.bb-kieg #footer .bb-lab\u003E.footer__nav{flex: 0 0 100% !important;max-width: 100% !important;margin: 0 !important}html.bb-kieg #footer .bb-lab .footer__nav-3{order: 1;margin-bottom: 18px !important}html.bb-kieg #footer .bb-lab .footer__nav-1{order: 2}html.bb-kieg #footer .bb-lab .footer__nav-2{order: 3}html.bb-kieg #footer .bb-lab .bb-lab-jogi{order: 4}html.bb-kieg #footer .bb-lab .footer__nav-4{order: 5;margin-top: 18px !important}html.bb-kieg #footer .bb-lab .bb-lab-also{order: 6;margin-top: 22px !important}html.bb-kieg #footer .bb-lab-le{border-bottom: 1px solid rgba(255,255,255,.12)}html.bb-kieg #footer .bb-lab .footer__nav-1{border-top: 1px solid rgba(255,255,255,.12)}html.bb-kieg #footer .bb-lab-le .footer__header{display: none !important}html.bb-kieg #footer .bb-lab-fej{display: flex;align-items: center;justify-content: space-between;width: 100%;min-height: 54px;padding: 0;border: 0;background: none;color: #fff;font-size: 13px;font-weight: 700;letter-spacing: .09em;text-transform: uppercase;text-align: left}html.bb-kieg #footer .bb-lab-fej svg{flex: 0 0 18px;color: #a9a196;transition: transform .2s}html.bb-kieg #footer .bb-lab-nyitva .bb-lab-fej svg{transform: rotate(180deg)}html.bb-kieg #footer .bb-lab-le .bb-lab-tart{display: none;padding: 0 0 12px}html.bb-kieg #footer .bb-lab-nyitva .bb-lab-tart{display: block}html.bb-kieg #footer .bb-lab-jogi a{font-size: 14.5px !important;color: #cfc8bc !important}html.bb-kieg #footer .bb-lab-also .footer_social{margin: 0 !important}html.bb-kieg #footer .bb-lab-nyelvek{display: flex;flex-wrap: wrap;gap: 10px;margin-top: 18px}html.bb-kieg #footer .bb-lab-nyelvek a{display: inline-flex !important;padding: 3px !important;border-radius: 6px;border: 1.5px solid transparent;line-height: 0 !important}html.bb-kieg #footer .bb-lab-nyelvek a.aktiv{border-color: #7cc35c}html.bb-kieg #footer .bb-lab-nyelvek img{width: 28px;height: 20px;border-radius: 3px;object-fit: cover}html.bb-kieg .product__prices.has-price-sale{display: flex !important;flex-wrap: wrap;align-items: center;gap: 4px 8px !important;margin-bottom: 10px !important}html.bb-kieg .product__prices.has-price-sale\u003E.col{display: contents}html.bb-kieg .product__prices.has-price-sale\u003E.col-auto{order: 1;flex: 0 0 auto;max-width: none;padding: 0 !important}html.bb-kieg .product__prices.has-price-sale .product__badge-sale{display: inline-flex !important;align-items: center;height: auto !important;padding: 3px 8px !important;margin: 0 !important;border: 0 !important;border-radius: 6px !important;background: #c62828 !important;color: #fff !important;font-size: 13px !important;font-weight: 800 !important;line-height: 1.2 !important}html.bb-kieg .product__prices.has-price-sale .product__badge-sale span{color: #fff !important}html.bb-kieg .product__prices.has-price-sale .product__badge-sale [data-percent]::before{content: \"-\"}html.bb-kieg .product__prices.has-price-sale .product__badge-sale [data-percent]::after{font-size: inherit !important}html.bb-kieg .product__prices.has-price-sale .product__price-base{order: 2;flex: 0 1 auto;min-width: 0;margin: 0 !important;font-size: 14px !important;line-height: 1.2}html.bb-kieg .product__prices.has-price-sale .product__price-base-value,html.bb-kieg .product__prices.has-price-sale .product__price-base-value *{color: #6b645a !important;font-size: 14px !important;font-weight: 500 !important}html.bb-kieg .product__prices.has-price-sale .product__price-base-value\u003Ebr,html.bb-kieg .product__prices.has-price-sale .product__price-base-value\u003Espan[style],html.bb-kieg .product__prices.has-price-sale .product__price-base .icon--info{display: none !important}html.bb-kieg .product__prices.has-price-sale .product__price-sale{order: 3;flex: 0 0 100%;margin: 0 !important;line-height: 1.25}html.bb-kieg .product__prices.has-price-sale .product__price-sale .price-gross-format,html.bb-kieg .product__prices.has-price-sale .product__price-sale .price-gross-format *{color: #d32f2f !important;font-size: 21px !important;font-weight: 800 !important}html.bb-kieg .product__prices.has-price-sale .product__price-sale\u003Espan[style]{display: inline-block;margin-top: 2px}html.bb-kieg .product__prices.has-price-sale .product__price-unit-wrap{order: 4;flex: 0 0 100%}html.bb-kieg .product .stickers{display: flex !important;flex-wrap: wrap;align-items: center;gap: 4px}html.bb-kieg .product .sticker.has-img{max-width: 120px !important;margin: 0 !important}html.bb-kieg .product .sticker.has-img img{display: block;max-height: 40px;width: auto;max-width: 100%}html.bb-kieg .product :is(.stock--warning,.stock--critical) .stock__content{min-width: 0;max-width: 100%}html.bb-kieg .product :is(.stock--warning,.stock--critical) .stock__content::before{display: none !important}html.bb-kieg .product :is(.stock--warning,.stock--critical) .stock__qty-and-unit{transform: none !important;min-width: 0 !important;max-width: 100%;box-sizing: border-box;flex-shrink: 1;padding: 4px 10px !important;font-size: 12.5px !important;line-height: 1.3}html.bb-kieg .sticker[data-id=\"38406\"]{display: inline-flex !important;align-items: center;gap: 5px;max-width: 100% !important;box-sizing: border-box;padding: 3px 8px !important;border: 1.5px solid #9fcf8a !important;border-radius: 6px;background: #eaf3e6 !important;color: #1f6a0c;font-size: 12px;font-weight: 700;line-height: 1.2}html.bb-kieg .sticker[data-id=\"38406\"] img,html.bb-kieg .sticker[data-id=\"38406\"] .sticker-caption{display: none !important}html.bb-kieg .sticker[data-id=\"38406\"]::before{content: \"\";flex: 0 0 15px;width: 15px;height: 15px;background: #1f6a0c;-webkit-mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 6h11v10H3zM14 9h4l3 3v4h-7'/%3E%3Ccircle cx='7' cy='17.5' r='1.8'/%3E%3Ccircle cx='17' cy='17.5' r='1.8'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 6h11v10H3zM14 9h4l3 3v4h-7'/%3E%3Ccircle cx='7' cy='17.5' r='1.8'/%3E%3Ccircle cx='17' cy='17.5' r='1.8'/%3E%3C/svg%3E\") center / contain no-repeat}html.bb-kieg .artdet__img-inner .sticker[data-id=\"38406\"]{font-size: 13.5px;padding: 5px 10px !important}html.bb-kieg .sticker[data-id=\"38406\"]::after{content: \"Szállítás 990\\00a0 Ft\\2011 tól\"}html.bb-kieg .bb-biz-van .start_banners__elements,html.bb-kieg #product_usp_element.bb-biz-van\u003E:not(.bb-biz){display: none !important}html.bb-kieg #product_usp_element.bb-biz-van{padding: 0 20px !important;margin-bottom: 24px !important}html.bb-kieg .bb-biz{display: flex;gap: 10px;margin: 0 -20px;padding: 4px 20px 8px;overflow-x: auto;scroll-snap-type: x mandatory;scroll-padding: 0 20px;-webkit-overflow-scrolling: touch;scrollbar-width: none}html.bb-kieg .bb-biz::-webkit-scrollbar{display: none}html.bb-kieg .bb-biz-kartya{flex: 0 0 72%;max-width: 270px;scroll-snap-align: start;display: flex;align-items: center;gap: 12px;padding: 12px 14px;border: 1px solid #ece6dc;border-radius: 14px;background: #fff;box-shadow: 0 2px 10px rgba(20,18,16,.05);color: #221f1b !important;text-decoration: none !important}html.bb-kieg .bb-biz-ikon{flex: 0 0 44px;width: 44px;height: 44px;border-radius: 50%;background: #eaf3e6;display: inline-flex;align-items: center;justify-content: center}html.bb-kieg .bb-biz-ikon img{width: 28px;height: 28px;object-fit: contain}html.bb-kieg .bb-biz-szoveg{display: flex;flex-direction: column;min-width: 0;line-height: 1.3}html.bb-kieg .bb-biz-szoveg b{font-size: 14.5px;font-weight: 700}html.bb-kieg .bb-biz-szoveg span{margin-top: 2px;font-size: 13px;color: #6b645a}html.bb-osszhang .header-inner{box-shadow: 0 1px 0 #ece6dc,0 4px 14px rgba(20,18,16,.06) !important}html.bb-osszhang .product__inner{border: 1px solid #ece6dc;border-radius: 14px !important;box-shadow: 0 2px 10px rgba(20,18,16,.05) !important}html.bb-osszhang .product__function-btns{box-shadow: 0 -4px 8px -6px rgba(20,18,16,.1) !important;border-radius: 12px 12px 0 0}html.bb-osszhang .artdet__pic-data-container{box-shadow: 0 2px 10px rgba(20,18,16,.05) !important}html.bb-osszhang :is(.product__main-btn,.artdet__cart-btn,.orderflow-main-btn,.fixed-cart__btn,.btn-primary){border-radius: 10px !important;box-shadow: 0 2px 6px rgba(42,133,17,.18) !important}html.bb-osszhang .star.star--full,html.bb-osszhang .star.star--full::before{color: #f2b01e !important;border-color: #f2b01e !important}html.bb-osszhang .page_cart_to_products_link{color: #1f6a0c !important;border-color: #1f6a0c !important}html.bb-osszhang main :is(p,div,li)[style*=\"justify\"]{text-align: left !important}html.bb-raktar .artdet__stock.stock{display: inline-flex !important;align-items: center;gap: 8px;width: auto;max-width: 100%;padding: 6px 12px 6px 10px !important;border-radius: 999px !important;border: 1px solid #9fcf8a !important;background: #eaf3e6 !important;color: #1f6a0c !important;font-size: 14px;line-height: 1.25;box-shadow: none !important}html.bb-raktar .artdet__stock .stock__content{display: inline-flex;align-items: center;gap: 8px;color: inherit !important;font-size: 14px;font-weight: 600}html.bb-raktar .artdet__stock .stock__content::before{content: \"\" !important;flex: 0 0 8px;width: 8px;height: 8px;border-radius: 50%;background: currentColor;box-shadow: 0 0 0 3px rgba(31,106,12,.15);font-size: 0 !important;margin: 0 !important}html.bb-raktar .artdet__stock .stock__qty-and-unit{color: inherit !important}html.bb-raktar .artdet__stock.stock::after{content: \"\" !important;width: 6px;height: 6px;margin: 0 2px 3px 2px !important;border: 0 !important;border-right: 2px solid currentColor !important;border-bottom: 2px solid currentColor !important;transform: rotate(45deg) !important;opacity: .7;position: static !important;align-self: center !important;top: auto !important;right: auto !important;flex: 0 0 6px}html.bb-raktar .artdet__stock.stock.to-order{background: #fdf3e1 !important;border-color: #ecc98a !important;color: #8a5a00 !important}html.bb-raktar .artdet__stock.stock.to-order .stock__content::before{box-shadow: 0 0 0 3px rgba(138,90,0,.15)}html.bb-raktar .artdet__stock.stock.no-stock{background: #f3f1ee !important;border-color: #ddd6cc !important;color: #6b645a !important}html.bb-raktar .artdet__stock.stock.no-stock .stock__content::before{box-shadow: 0 0 0 3px rgba(107,100,90,.15)}html.bb-raktar .artdet__stock.stock.stock--critical{background: #fdecea !important;border-color: #f2b8b2 !important;color: #b3261e !important}html.bb-raktar .artdet__stock.stock.stock--warning{background: #fff1e0 !important;border-color: #f3c68c !important;color: #9a5200 !important}html.bb-raktar .artdet__stock.stock:is(.stock--critical,.stock--warning) .stock__qty-and-unit{display: inline-flex !important;align-items: center;gap: 6px;padding: 0 !important;margin: 0 !important;background: none !important;border-radius: 0 !important;transform: none !important;overflow: visible !important;color: inherit !important;font-weight: 700 !important}html.bb-raktar .artdet__stock.stock:is(.stock--critical,.stock--warning) .stock__qty-and-unit::before,html.bb-raktar .artdet__stock.stock:is(.stock--critical,.stock--warning) .stock__qty-and-unit::after{display: none !important;content: none !important}html.bb-raktar .artdet__stock.stock.stock--critical .stock__content::before{box-shadow: 0 0 0 3px rgba(179,38,30,.18);animation: bbPotty 1.4s ease-in-out infinite}html.bb-raktar .artdet__stock.stock.stock--warning .stock__content::before{display: none !important}html.bb-raktar .artdet__stock.stock.stock--warning .stock__qty-and-unit svg{color: #e8590c}@keyframes bbPotty{0%,100%{opacity: 1;transform: scale(1)}50%{opacity: .45;transform: scale(.75)}}html.bb-raktar .product .product__stock.stock{max-width: 100%;min-width: 0}html.bb-raktar .product .product__stock.stock:not(.stock--warning):not(.stock--critical) .stock__content{display: inline-flex !important;align-items: center;gap: 6px;max-width: 100%;box-sizing: border-box;color: #4a453e !important;font-size: 12.5px;font-weight: 600;line-height: 1.3}html.bb-raktar .product .product__stock.stock:not(.stock--warning):not(.stock--critical) .stock__content::before{content: \"\" !important;flex: 0 0 7px;width: 7px;height: 7px;border-radius: 50%;margin: 0 !important;background: #2a8511;box-shadow: 0 0 0 2.5px rgba(42,133,17,.16);font-size: 0 !important}html.bb-raktar .product .product__stock.stock .stock__qty-and-unit{color: inherit;font-size: 12.5px !important;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;min-width: 0}html.bb-raktar .product .product__stock.stock--warning .stock__qty-and-unit{font-size: 0 !important}html.bb-raktar .product .product__stock.stock--warning .stock__qty-and-unit::before{content: \"Utolsó darabok!\";order: 1;font-size: 12px}html.bb-raktar .product .product__stock.stock.to-order:not(.stock--warning):not(.stock--critical) .stock__content::before{background: #d08a00;box-shadow: 0 0 0 2.5px rgba(208,138,0,.18)}html.bb-raktar .product .product__stock.stock.no-stock:not(.stock--warning):not(.stock--critical) .stock__content::before{background: #9a9288;box-shadow: none}html.bb-raktar .product .product__img-outer{position: relative}html.bb-raktar .product .product__img-outer .sticker[data-id=\"38406\"]{position: absolute !important;left: 0;bottom: 4px;z-index: 2;margin: 0 !important;box-shadow: 0 1px 4px rgba(20,18,16,.08);max-width: calc(100% - 4px) !important;padding: 2px 7px !important;font-size: 11px;white-space: nowrap;gap: 4px;border: 1px solid #e2dbcf !important;background: rgba(255,255,255,.94) !important;color: #3d3a35}html.bb-kieg .social-reviews-sku-wrap .social-medias{display: none !important}html.bb-kieg body .artdet__img-data-left\u003E:is(#page_artdet_func_favourites,#page_artdet_func_compare){border: 1.5px solid #2a8511 !important;color: #1f6a0c !important;background: #fff !important;box-shadow: 0 2px 8px rgba(42,133,17,.14) !important}html.bb-kieg body .artdet__img-data-left\u003E:is(#page_artdet_func_favourites,#page_artdet_func_compare)::before{color: #1f6a0c !important}html.bb-kieg .bb-jogi .pane-header-btn{white-space: normal !important;text-align: left}html.bb-kieg #toast-container{top: 12px !important;left: 50% !important;right: auto !important;transform: translateX(-50%);width: calc(100vw - 24px) !important;max-width: 420px;padding: 0 !important;pointer-events: none}html.bb-kieg #toast-container\u003E.toast{position: relative;width: 100% !important;margin: 0 0 10px !important;padding: 15px 46px 15px 62px !important;overflow: hidden;background: #fff !important;background-image: none !important;color: #1f2a1f !important;opacity: 1 !important;border: 1px solid #e6e8e4 !important;border-radius: 16px !important;box-shadow: 0 14px 40px rgba(20,18,16,.18) !important;pointer-events: auto;animation: bbToastBe .32s cubic-bezier(.2,.8,.2,1)}html.bb-kieg #toast-container\u003E.toast::before{content: \"\\2713\";position: absolute;left: 16px;top: 50%;width: 32px;height: 32px;margin-top: -16px;border-radius: 50%;background: #eaf5e6;color: #2a8511;font: 800 17px/32px Inter,sans-serif;text-align: center}html.bb-kieg #toast-container\u003E.toast-error::before{content: \"!\";background: #fdecea;color: #c62828}html.bb-kieg #toast-container\u003E.toast-warning::before{content: \"!\";background: #fff4e0;color: #b26a00}html.bb-kieg #toast-container\u003E.toast-info::before{content: \"i\";background: #e8f1fb;color: #1565c0}html.bb-kieg #toast-container .toast-message::before{display: none !important}html.bb-kieg #toast-container .toast-message{font-size: 15px !important;font-weight: 600;line-height: 1.4;color: #1f2a1f !important}html.bb-kieg #toast-container .toast-message a{color: #2a8511 !important;text-decoration: underline}html.bb-kieg #toast-container .toast-close-button{position: absolute !important;top: 50% !important;right: 10px !important;width: 30px;height: 30px;margin-top: -15px;padding: 0 !important;border-radius: 50%;color: #6b736b !important;opacity: 1 !important;text-shadow: none !important;font-size: 0 !important;text-align: center}html.bb-kieg #toast-container .toast-close-button::before{font-size: 18px !important;line-height: 30px}html.bb-kieg #toast-container .toast-close-button:hover{background: #f2f3f1;color: #1f2a1f !important}html.bb-kieg #toast-container .toast-progress{position: absolute;left: 0;bottom: 0;height: 3px !important;background: #2a8511 !important;opacity: .55 !important}html.bb-kieg #toast-container\u003E.toast-error .toast-progress{background: #c62828 !important}html.bb-kieg #toast-container\u003E.toast-warning .toast-progress{background: #b26a00 !important}html.bb-kieg #toast-container\u003E.toast-info .toast-progress{background: #1565c0 !important}html.bb-kieg .banner_start_big[data-aos]{opacity: 1 !important;transform: none !important;transition: none !important}}@keyframes bbToastBe{from{opacity: 0;transform: translateY(-12px) scale(.97)}to{opacity: 1;transform: none}}@media (max-width: 767.98px){html.bb-kieg .dropdown__btn:focus:not(:focus-visible){outline: 0 !important;box-shadow: none !important}html.bb-kieg .dropdown__btn:focus-visible{outline: 2px solid #2a8511 !important;outline-offset: 2px}html.bb-kieg #hamburger-box__dropdown-btn{border-radius: 50% !important;border-color: transparent !important;background: #e2efdb !important;color: #1f6a0c !important;transition: background-color .2s,color .2s}html.bb-kieg #hamburger-box__dropdown-btn[aria-expanded=\"true\"]{background: #2a8511 !important;color: #fff !important}}@media (max-width: 575.98px){html.bb-kieg .bb-szuro-gomb{background: #2a8511 !important}html.bb-kieg .bb-szuro-gomb:active{background: #1f6a0c !important}html.bb-kieg .bb-szuro-gomb .bb-szuro-db{background: #fff !important;color: #1f6a0c !important}html.bb-kieg:has(.bb-szuro-gomb) .filter-box__dropdown-btn{visibility: hidden !important;width: 0 !important;min-width: 0 !important;padding: 0 !important;margin: 0 !important;border: 0 !important;overflow: hidden !important}html.bb-kieg .paging-sorting-ordering--top .product-num__start,html.bb-kieg .paging-sorting-ordering--top .product-num__end{display: none !important}html.bb-kieg .bb-szuro-gomb{padding: 0 11px !important}html.bb-kieg .paging-sorting-ordering--top .order__select-outer select{max-width: 146px !important;padding-left: 11px !important;padding-right: 26px !important}}@media (max-width: 767.98px){html.bb-kieg .bb-pu-kesz .car-box__empty,html.bb-kieg .bb-pu-kesz .cart-box__to-purchase-btn-wrap{display: none !important}html.bb-kieg .bb-pu{display: flex;flex-direction: column;align-items: center;padding: 28px 24px 8px;text-align: center}html.bb-kieg .bb-pu-kor{display: flex;align-items: center;justify-content: center;width: 96px;height: 96px;margin-bottom: 16px;border-radius: 50%;background: #eef6ea}html.bb-kieg .bb-pu-kor .bb-puttony-ikon{width: 52px;height: 52px;background: #2a8511}html.bb-kieg .bb-pu-cim{margin: 0 0 6px;font-size: 19px;font-weight: 800;line-height: 1.25;color: #221f1b}html.bb-kieg .bb-pu-szoveg{max-width: 280px;margin: 0 0 20px;font-size: 15px;line-height: 1.45;color: #6b645a}html.bb-kieg .bb-pu-gomb,html.bb-kieg .bb-pu-gomb2{display: block;width: 100%;max-width: 320px;padding: 13px 16px;border-radius: 10px;font-size: 15px;font-weight: 700;line-height: 1.2;text-align: center;text-decoration: none !important}html.bb-kieg .bb-pu-gomb{background: #2a8511;color: #fff !important}html.bb-kieg .bb-pu-gomb:active{background: #1f6a0c}html.bb-kieg .bb-pu-gomb2{margin-top: 10px;border: 1.5px solid #2a8511;background: #fff;color: #1f6a0c !important}html.bb-kieg .cart-box__dropdown-btn-close{border: 0 !important;border-radius: 50% !important;background-color: #f3f2ef !important}html.bb-kieg .dropdown__btn-close:focus:not(:focus-visible){outline: 0 !important;box-shadow: none !important}html.bb-kieg .dropdown__btn-close:focus-visible{outline: 2px solid #2a8511 !important;outline-offset: 2px}}@media (max-width: 767.98px){html.bb-kieg #lang-and-money__dropdown .lang-and-money__wrapper{flex-direction: column !important;align-items: stretch !important;gap: 24px;width: 100% !important;max-width: none !important;margin: 0 !important;padding: 8px 10px 24px !important}html.bb-kieg #lang-and-money__dropdown .lang-box,html.bb-kieg #lang-and-money__dropdown .currency-box{width: 100% !important;max-width: none !important;margin: 0 !important;padding: 0 !important;border: 0 !important}html.bb-kieg #lang-and-money__dropdown .lang-box__title,html.bb-kieg #lang-and-money__dropdown .currency-box__title{margin: 0 0 10px !important;padding: 0 !important;text-align: left !important;font-size: 13px !important;font-weight: 700 !important;letter-spacing: .06em;text-transform: uppercase;color: #6b645a !important}html.bb-kieg #lang-and-money__dropdown .lang-box__list,html.bb-kieg #lang-and-money__dropdown .currency-box__list{display: grid !important;grid-template-columns: 1fr 1fr;gap: 8px;margin: 0 !important;padding: 0 !important;border: 0 !important;list-style: none}html.bb-kieg #lang-and-money__dropdown .lang-box__list li,html.bb-kieg #lang-and-money__dropdown .currency-box__list li{margin: 0 !important;padding: 0 !important;min-height: 0 !important;border: 0 !important}html.bb-kieg #lang-and-money__dropdown .lang-box__list a,html.bb-kieg #lang-and-money__dropdown .currency__label{position: relative;display: flex !important;align-items: center;gap: 8px;width: 100%;min-height: 50px;margin: 0 !important;padding: 10px 40px 10px 14px !important;border: 1.5px solid #e3e0da !important;border-radius: 10px !important;background: #fff !important;color: #221f1b !important;font-size: 15px !important;font-weight: 500;line-height: 1.2;text-align: left !important;text-decoration: none !important;text-transform: none !important;cursor: pointer}html.bb-kieg #lang-and-money__dropdown .bb-nv-kod{margin-left: auto;font-size: 12px;font-weight: 600;color: #8a8276}html.bb-kieg #lang-and-money__dropdown .lang-box__list a::before,html.bb-kieg #lang-and-money__dropdown .currency__label::before{content: none !important;display: none !important}html.bb-kieg #lang-and-money__dropdown .lang-box__list a::after,html.bb-kieg #lang-and-money__dropdown .currency__label::after{content: '' !important;display: block !important;position: absolute !important;top: 50% !important;left: auto !important;right: 12px !important;width: 18px !important;height: 18px !important;margin: 0 !important;transform: translateY(-50%) !important;border: 1.5px solid #d3cfc7 !important;border-radius: 50% !important;background: #fff none !important}html.bb-kieg #lang-and-money__dropdown .lang-box__list a.is-selected,html.bb-kieg #lang-and-money__dropdown .currency__radio:checked + .currency__label{border-color: #2a8511 !important;background: #eef6ea !important;color: #1f6a0c !important;font-weight: 700}html.bb-kieg #lang-and-money__dropdown .lang-box__list a.is-selected .bb-nv-kod{color: #1f6a0c}html.bb-kieg #lang-and-money__dropdown .lang-box__list a.is-selected::after,html.bb-kieg #lang-and-money__dropdown .currency__radio:checked + .currency__label::after{border-color: #2a8511 !important;background: #2a8511 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E\") center / 12px no-repeat !important}html.bb-kieg #lang-and-money__dropdown .lang-and-money__dropdown-btn-close{border: 0 !important;border-radius: 50% !important;background-color: #f3f2ef !important}}";
(document.head || gyoker).appendChild(stilus);

function indul() {
if (!(window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches)) return;
[].forEach.call(document.querySelectorAll('main.main .custom-content'), function (b) {
if (!b.textContent.trim() && !b.querySelector('img, iframe, video')) b.classList.add('bb-kieg-ures');
});
var tartaly = document.getElementById('container'), csik = document.querySelector('.partners');
if (tartaly && csik) {
var alul = parseFloat(getComputedStyle(tartaly).paddingBottom) || 0;
if (alul > 0) {
tartaly.style.setProperty('padding-bottom', '0px', 'important');
csik.style.setProperty('padding-bottom', (alul + 18) + 'px', 'important');
}
}
try { raktarRovid(); } catch (e) { if (window.console) console.error('[mobil-kieg] raktárjelzés', e); }
try { hirlevel(); } catch (e) { if (window.console) console.error('[mobil-kieg] hírlevél', e); }
try { lablec(); } catch (e) { if (window.console) console.error('[mobil-kieg] lábléc', e); }
try { lablecLinkek(); } catch (e) { if (window.console) console.error('[mobil-kieg] lábléc linkek', e); }
try { lablecInfo(); } catch (e) { if (window.console) console.error('[mobil-kieg] lábléc Információk', e); }
try { aszfLinkek(); } catch (e) { if (window.console) console.error('[mobil-kieg] ÁSZF oldal linkek', e); }
try { bizalom(); } catch (e) { if (window.console) console.error('[mobil-kieg] bizalmi sáv', e); }
try { rendezesRovid(); } catch (e) { if (window.console) console.error('[mobil-kieg] rendezés', e); }
try { uresPuttony(); } catch (e) { if (window.console) console.error('[mobil-kieg] üres Puttony', e); }
try { nyelvPenznem(); } catch (e) { if (window.console) console.error('[mobil-kieg] nyelv és pénznem', e); }
[].forEach.call(document.querySelectorAll('main.main .html-text ul'), function (u) {
if (u.querySelector('a[href^="tel:"], a[href^="mailto:"], a[href*="maps.google"]')) u.classList.add('bb-kieg-eler');
});
}
function uresPuttony() {
var panel = document.getElementById('cart-box__dropdown');
if (!panel) return;
var alakit = function () {
var c = panel.querySelector('.cart-box__empty-container');
if (!c || c.querySelector('.bb-pu')) return;
var link = c.querySelector('.cart-box__jump-to-products-btn');
var akcio = document.querySelector('a[href*="/akciok-es-szezonalis-termekek"]');
var d = document.createElement('div');
d.className = 'bb-pu';
d.innerHTML = '<span class="bb-pu-kor" aria-hidden="true"><span class="bb-puttony-ikon"></span></span>' +
'<p class="bb-pu-cim" role="status">A Puttonyod még üres</p>' +
'<p class="bb-pu-szoveg">Nézz körül a kínálatban, vagy csapj le a szezonális akciókra!</p>' +
'<a class="bb-pu-gomb" href="' + (link ? link.href : '/kategoria') + '">Irány a kínálat</a>' +
(akcio ? '<a class="bb-pu-gomb2" href="' + akcio.href + '">Akciós termékek</a>' : '');
c.appendChild(d);
c.classList.add('bb-pu-kesz');
};
alakit();
if (window.MutationObserver) new MutationObserver(alakit).observe(panel, { childList: true, subtree: true });
}

function nyelvPenznem() {
[].forEach.call(document.querySelectorAll('#lang-and-money__dropdown #box_lang_content a'), function (a) {
if (a.querySelector('.bb-nv-nev')) return;
var kod = (a.getAttribute('data-langcode') || a.textContent).trim().toUpperCase();
a.innerHTML = '<span class="bb-nv-nev">' + (a.getAttribute('aria-label') || kod) + '</span><span class="bb-nv-kod">' + kod + '</span>';
});
}

var RENDEZES_ROVID = {
'Népszerűség szerint': 'Népszerűség', 'Név szerint (A-Z)': 'Név (A–Z)', 'Név szerint (Z-A)': 'Név (Z–A)',
'Ár szerint növekvő': 'Ár: növekvő', 'Ár szerint csökkenő': 'Ár: csökkenő',
'Felvitel szerint (legutolsó az első)': 'Legújabb elöl', 'Felvitel szerint (legkorábbi az első)': 'Legrégebbi elöl'
};
function rendezesRovid() {
[].forEach.call(document.querySelectorAll('select[name="new_art_order"] option'), function (o) {
var t = o.textContent.trim();
if (RENDEZES_ROVID[t]) o.textContent = RENDEZES_ROVID[t];
});
}
var HL_KULCS = '6LfG450rAAAAALmKO5xSb6edd6cVgxx57xvrF9k1';
var HL_HOZZA = 'Hozzájárulok, hogy a Bí-Bor-Ász Kft. e-mailben tájékoztasson borászati, szőlészeti, kertészeti és mezőgazdasági termékekről, újdonságokról, akciókról, kedvezményekről, szakmai tartalmakról és kapcsolódó szolgáltatásokról. A hozzájárulásomat bármikor visszavonhatom. Az adatkezelés részleteit az <a href="/shop_help.php?tab=privacy_policy" target="_blank">Adatkezelési tájékoztató</a> tartalmazza. Tudomásul veszem, hogy a hozzájárulásomat bármikor, ingyenesen visszavonhatom a hírlevelekben található leiratkozási linken keresztül, vagy az info@bi-bor.hu e-mail címen.';
function hirlevel() {
var be = null;
try {
var m = location.search.match(/[?&]ujhirlevel=([01])/);
if (m) localStorage.setItem('bbHirlevel', m[1]);
be = localStorage.getItem('bbHirlevel');
} catch (e) { /* tiltott tárhely */ }
if (be === '0') return;
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
'<input class="bb-hl-mezo bb-hl-email" name="news_emai" type="email" maxlength="200" placeholder="E-mail cím" autocomplete="email" inputmode="email" aria-label="E-mail cím">' +
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
if (!f.news_name.value.trim()) { hiba('Kérjük, adja meg a nevét.'); f.news_name.focus(); return; }
var email = f.news_emai.value.trim();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { hiba('Kérjük, adjon meg egy érvényes e-mail címet.'); f.news_emai.focus(); return; }
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
var NYELVEK = [ ['hu', '/', 'Magyar'], ['gb', '/en/', 'English'], ['de', '/de/', 'Deutsch'], ['hr', '/hr/', 'Hrvatski'], ['ro', '/ro/', 'Română'] ];
var LE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
function lenyilo(nav, cim, tartalom) {
nav.classList.add('bb-lab-le');
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-lab-fej';
g.setAttribute('aria-expanded', 'false');
g.innerHTML = '<span></span>' + LE;
g.firstChild.textContent = cim;
g.addEventListener('click', function () {
var nyitva = nav.classList.toggle('bb-lab-nyitva');
g.setAttribute('aria-expanded', nyitva ? 'true' : 'false');
});
tartalom.classList.add('bb-lab-tart');
nav.insertBefore(g, nav.firstChild);
}
var JOGI_OLDALAK = [ ['/harmonizalt-ertesites', 'Harmonizált értesítés'], ['/velemenyek-ellenorzese', 'Vélemények ellenőrzése'], ['/kupon-szabalyzat', 'Kupon- és ajándékutalvány-szabályzat'] ];
var INFO_MENU = [ 305810, 387169, 103546, 912325, 657820 ]; /* Újdonságok, Akciók, Márkáink, BorLabor, A szakértő válaszol */
var KINALAT_CIM = { hu: 'Kínálat és tudás', en: 'Products & know-how', de: 'Sortiment & Wissen', hr: 'Ponuda i znanje', ro: 'Ofertă și sfaturi' };
function lablecInfo() {
var lista = document.querySelector('#footer .footer__nav-2 .footer__html ul');
if (!lista || document.querySelector('#footer .bb-lab-kinalat')) return;
var ul = document.createElement('ul');
ul.className = 'bb-lab-kinalat';
INFO_MENU.forEach(function (id) {
var m = document.querySelector('.js-nav-item-' + id + ' > a');
var href = m && m.getAttribute('href');
if (!href) return;
var ut = href.replace(/^https?:\/\/[^\/]+/i, '');
if (lista.querySelector('a[href$="' + ut + '"]')) return;
var li = document.createElement('li');
var a = document.createElement('a');
a.href = href;
a.textContent = m.textContent.replace(/\s+/g, ' ').trim();
li.appendChild(a);
ul.appendChild(li);
});
var blog = lista.querySelector('a[href$="/blog"]');
if (blog && blog.closest('li')) ul.appendChild(blog.closest('li'));
if (!ul.children.length) return;
var cim = document.createElement('div');
cim.className = 'bb-lab-al';
cim.textContent = KINALAT_CIM[(document.documentElement.lang || 'hu').slice(0, 2)] || KINALAT_CIM.hu;
lista.parentNode.insertBefore(cim, lista.nextSibling);
lista.parentNode.insertBefore(ul, cim.nextSibling);
}
function lablecLinkek() {
var forditott = new RegExp('^' + String.fromCharCode(92, 92) + '+');
[].forEach.call(document.querySelectorAll('#footer a[href]'), function (a) {
var h = a.getAttribute('href'), u = h.replace(forditott, '/').replace(/^(?:www\.)?bi-bor\.hu\//i, '/');
if (u !== h) a.setAttribute('href', u);
});
var aszf = document.querySelector('#footer a[href$="/aszf"]');
var lista = aszf && aszf.closest('ul');
if (!lista || !document.querySelector('#footer a[href$="/harmonizalt-ertesites"]')) return;
var elozo = lista.querySelector('a[href$="/elallas-bejelentese"]');
elozo = elozo ? elozo.closest('li') : aszf.closest('li');
JOGI_OLDALAK.forEach(function (o) {
var a = document.querySelector('#footer a[href$="' + o[0] + '"]'), li = a && a.closest('li');
if (!li) {
li = document.createElement('li');
li.innerHTML = '<a href="' + o[0] + '"></a>';
li.firstChild.textContent = o[1];
}
li.style.textAlign = 'left';
lista.insertBefore(li, elozo.nextSibling);
elozo = li;
});
}
function aszfLinkek() {
var panelek = document.querySelector('#page_help_content .tab-panes');
if (!panelek || panelek.querySelector('.bb-jogi') || !/^hu/i.test(document.documentElement.lang || '')) return;
JOGI_OLDALAK.forEach(function (o) {
var fej = document.createElement('div');
fej.className = 'pane-header bb-jogi';
fej.innerHTML = '<a class="pane-header-btn btn"></a>';
fej.firstChild.href = o[0];
fej.firstChild.textContent = o[1];
panelek.appendChild(fej);
});
}
function lablec() {
var sor = document.querySelector('#footer .footer__navigation > .row');
var n1 = sor && sor.querySelector('.footer__nav-1'), n2 = sor && sor.querySelector('.footer__nav-2'), n3 = sor && sor.querySelector('.footer__nav-3');
if (!n1 || !n2 || !n3 || sor.classList.contains('bb-lab')) return;
sor.classList.add('bb-lab');
[ [n1, 'Vásárlói fiók'], [n2, 'Információk'] ].forEach(function (x) {
var fej = x[0].querySelector('.footer__header'), t = x[0].querySelector('.footer__html');
if (!t) return;
lenyilo(x[0], fej ? fej.textContent.trim() : x[1], t);
});
var lista = n3.querySelector('.footer__html ul'), elemek = lista ? [].slice.call(lista.children, 3) : [];
if (elemek.length) {
var jogi = document.createElement('nav');
jogi.className = 'footer__nav col-12 bb-lab-jogi';
jogi.setAttribute('aria-label', 'Jogi információk');
var ul = document.createElement('ul');
elemek.forEach(function (li) { ul.appendChild(li); });
var t = document.createElement('div');
t.className = 'footer__html';
t.appendChild(ul);
jogi.appendChild(t);
lenyilo(jogi, 'Jogi információk', t);
sor.appendChild(jogi);
}
var also = document.createElement('div');
also.className = 'footer__nav col-12 bb-lab-also';
var kozossegi = n3.querySelector('.footer_social');
if (kozossegi) also.appendChild(kozossegi);
var akt = location.pathname.match(/^\/(en|de|hr|ro)\//);
var nyelvek = document.createElement('div');
nyelvek.className = 'bb-lab-nyelvek';
nyelvek.setAttribute('aria-label', 'Nyelv');
nyelvek.innerHTML = NYELVEK.map(function (n) {
var ez = akt ? akt[1] === n[1].replace(/\//g, '') : n[0] === 'hu';
return '<a href="' + n[1] + '" hreflang="' + (n[0] === 'gb' ? 'en' : n[0]) + '" title="' + n[2] + '"' + (ez ? ' class="aktiv" aria-current="true"' : '') + '>' +
'<img src="https://flagcdn.com/w40/' + n[0] + '.png" width="28" height="20" alt="' + n[2] + '" loading="lazy"></a>';
}).join('');
also.appendChild(nyelvek);
sor.appendChild(also);
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
var be = null;
try {
var m = location.search.match(/[?&]bizalom=([01])/);
if (m) localStorage.setItem('bbBizalom', m[1]);
be = localStorage.getItem('bbBizalom');
} catch (e) { /* tiltott tárhely */ }
if (be === '0') return;
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
f.hely.classList.add('bb-biz-van');
(f.rejt ? f.hely.querySelector(f.rejt).parentNode : f.hely).appendChild(sav);
});
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();

function savMagassag(c, f) {
var max = 0, keret = 0, elso = null;
c.classList.add('bb-kieg-meres');
f.cells.forEach(function (cella) {
var k = cella.element.querySelector('.product__inner');
if (!k) return;
if (!elso) { elso = getComputedStyle(cella.element); keret = (parseFloat(elso.paddingTop) || 0) + (parseFloat(elso.paddingBottom) || 0); }
max = Math.max(max, k.offsetHeight);
});
c.classList.remove('bb-kieg-meres');
var uj = max > 0 ? Math.ceil(max + keret) + 'px' : '';
if (uj && f.viewport.style.height !== uj) f.viewport.style.height = uj;
}
function raktarRovid() {
if (!gyoker.classList.contains('bb-raktar')) return;
[].forEach.call(document.querySelectorAll('.product .product__stock .stock__qty-and-unit.is-text'), function (el) {
if (el.children.length) return;
var t = el.textContent.trim(), m = t.match(/^Több mint (.+?) (db|darab|pár|csomag|kg|l|m)? ?raktáron$/i);
if (m) el.textContent = m[1] + '+ ' + (m[2] ? m[2] + ' ' : '') + 'raktáron';
});
}
function savok() {
if (!(window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches)) return;
try { raktarRovid(); } catch (e) { /* nem akadályozza a mérést */ }
if (!window.Flickity || !window.Flickity.data) return;
[].forEach.call(document.querySelectorAll('.carousel.flickity-enabled'), function (c) {
if (!c.querySelector('.product__inner')) return;
var f = window.Flickity.data(c);
if (!f || !f.viewport) return;
gyoker.classList.add('bb-kieg-sav');
var fut = function () { c.bbIdozito = 0; savMagassag(c, f); };
var kesobb = function () { if (!c.bbIdozito) c.bbIdozito = setTimeout(fut, 150); };
if (!c.bbSav) { c.bbSav = true; f.on('resize', kesobb); }
kesobb();
});
}
window.addEventListener('load', function () { savok(); setTimeout(savok, 1600); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(savok, 0); });
})();
