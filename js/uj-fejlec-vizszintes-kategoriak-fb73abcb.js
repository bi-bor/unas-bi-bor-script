(function () {
var MINDENKI = true;
var ALAP = "c";
var KULCS = 'bbUjFejlec';
var allapot = null;
try {
var m = location.search.match(/[?&]ujfejlec=([01abc])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
var valtozat = /^[abc]$/.test(allapot || '') ? allapot : ALAP;

var KERESO_MINDENKI = true;
var keresoSor = KERESO_MINDENKI;
try {
var mk0 = location.search.match(/[?&]mkereso=([01])/);
if (mk0) localStorage.setItem('bbMkereso', mk0[1]);
var mkt = localStorage.getItem('bbMkereso');
if (mkt) keresoSor = mkt === '1';
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (keresoSor) document.documentElement.classList.add('bb-mkereso-jon');

var MF2_MINDENKI = true;
var mf2 = MF2_MINDENKI;
try {
var mf0 = location.search.match(/[?&]mfejlec=([12])/);
if (mf0) localStorage.setItem('bbMfejlec', mf0[1]);
var mft = localStorage.getItem('bbMfejlec');
if (mft) mf2 = mft === '2';
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }

var stilus = document.createElement('style');
stilus.id = 'bb-uj-fejlec';
var magyar = (document.documentElement.lang || '').slice(0, 2) === 'hu';
stilus.textContent = ":root{--bb-fo: #2a8511;--bb-fo-sotet: #1f6a0c;--bb-akcio: var(--bb-fo);--bb-akcio-sotet: var(--bb-fo-sotet);--bb-tinta: #221f1b;--bb-vonal: #e6e0d5}html body ::selection,html body footer ::selection,html body .footer ::selection{background: var(--bb-fo);color: #fff}@media (min-width: 576px){html .header .dropdown__btn:not(.cart-box__dropdown-btn):hover,html .header .dropdown__btn:not(.cart-box__dropdown-btn).is-active{color: var(--bb-fo)}}html body .profile__dropdown-btn .profile__bubble{background: var(--bb-fo);color: #fff;border: 1.6px solid #fff;width: 19px;height: 19px;font-size: 11px;box-shadow: none}.top-info-bar{background: var(--bb-fo);border-bottom: 0;padding: 0;color: #fff;font-size: 1.3rem}.top-info-bar__inner{min-height: 36px;justify-content: space-between;gap: 24px}.top-info-bar__left,.top-info-bar__right{white-space: nowrap}.top-info-bar__label,.top-info-bar__value,.top-info-bar__link,.top-info-bar__link:hover{color: #fff !important}.top-info-bar__label{font-weight: 600}.top-info-bar__icon{color: #fff !important;opacity: .75}.top-info-bar__divider{color: rgba(255,255,255,.35)}.top-info-bar__link:hover{text-decoration: underline}.top-info-bar__right{gap: 16px}html[class*=\"bb-fejlec-\"]:not(.bb-kesz) .top-info-bar__right{visibility: hidden}.top-info-bar__right .top-info-bar__icon,.top-info-bar__right .top-info-bar__divider{display: none}.top-info-bar #nav--menu{display: flex;flex-wrap: nowrap;align-items: center;gap: 16px;margin: 0;padding: 0;list-style: none}.top-info-bar #nav--menu .nav-item{margin: 0}.top-info-bar #nav--menu .nav-link img,.top-info-bar #nav--menu .nav-link svg:not(.bb-sav-ikon),.top-info-bar #nav--menu .nav-link [class*=\"icon\"],.top-info-bar .nav-link::before{display: none !important}.top-info-bar #nav--menu .nav-link{padding: 0;color: #fff;background: none;font-size: 1.3rem;font-weight: 500;line-height: 36px;white-space: nowrap}.top-info-bar #nav--menu .nav-link:hover,.top-info-bar #nav--menu .nav-link:focus-visible{text-decoration: underline}.top-info-bar__left .top-info-bar__link[href^=\"mailto:\"],.top-info-bar__left .top-info-bar__divider:has(+ .top-info-bar__link[href^=\"mailto:\"]){display: none}.top-info-bar .bb-sav-rejt{display: none !important}.top-info-bar #nav--menu .bb-sav-lat{display: flex;align-items: center}.top-info-bar #nav--menu .bb-sav-lat + .bb-sav-lat::before{content: '';width: 1px;height: 14px;margin-right: 16px;background: rgba(255,255,255,.35)}.top-info-bar #nav--menu .bb-sav-lat \u003E .nav-link{display: inline-flex;align-items: center;gap: 6px}.top-info-bar .bb-sav-ikon{flex: 0 0 14px;width: 14px;height: 14px;opacity: .85;fill: none;stroke: currentColor;stroke-width: 2;stroke-linecap: round;stroke-linejoin: round}@media (max-width: 1199.98px){.top-info-bar__left{display: none}.top-info-bar__inner{justify-content: flex-start;overflow-x: auto;scrollbar-width: none}}@media (min-width: 1200px){html.products-dropdown-opened::before,html.cat-megasubmenu-opened::before{visibility: hidden !important;opacity: 0 !important;pointer-events: none !important}html.products-dropdown-opened .main,html.products-dropdown-opened .footer,html.products-dropdown-opened .partners,html.cat-megasubmenu-opened .main{filter: none !important}}.header--desktop .header__top{background: #fff !important}.header--desktop .header_logo img{max-height: 60px;width: auto}.header_logo img{content: url(\"https://cdn.jsdelivr.net/gh/bi-bor/unas-bi-bor-script@f7c1cefe4e673f305c89dde1c1fd1bd36e142460/kepek/logo-f4902386.png\");object-fit: contain}.header--desktop.is-shrinked .logo img{filter: none;mix-blend-mode: normal}.header--desktop #form_include_search2{border: 1px solid var(--bb-fo) !important;border-radius: 8px !important;box-shadow: none !important}.header--desktop #form_include_search2:focus-within{box-shadow: 0 0 0 3px rgba(42,133,17,.18) !important}.header--desktop #form_include_search2{border-width: 1.5px !important;box-shadow: 0 2px 10px rgba(42,133,17,.12) !important}.header--desktop #form_include_search2:focus-within{box-shadow: 0 0 0 3px rgba(42,133,17,.2),0 2px 10px rgba(42,133,17,.12) !important}.header--desktop #form_include_search2 .box-search-group{width: 100%;max-width: none;flex: 1 1 auto}.header--desktop #form_include_search2 .search-box__input{width: 100%}.header--desktop #form_include_search2 .search-box__search-btn-outer{right: 4px}.header--desktop #form_include_search2 .search-box__search-btn::before{display: none !important}.header--desktop #form_include_search2 .search-box__search-btn-icon{display: none !important}.header--desktop #form_include_search2 .search-box__search-btn{display: flex;align-items: center;justify-content: center;width: 38px;height: 38px;padding: 0;background: transparent !important;border: 0 !important;box-shadow: none !important}.header--desktop #form_include_search2 .search-box__search-btn::after{content: \"\";display: block;width: 20px;height: 20px;background: var(--bb-fo);-webkit-mask: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M20 20l-3.5-3.5'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M20 20l-3.5-3.5'/%3E%3C/svg%3E\") center / contain no-repeat}.header--desktop #form_include_search2 .search-box__search-btn:hover::after{background: var(--bb-fo-sotet)}.header--desktop .cart-box__dropdown-btn{background: var(--bb-akcio);color: #fff;border-radius: 8px;box-shadow: none}.header--desktop .cart-box__dropdown-btn:hover,.header--desktop .cart-box__dropdown-btn.is-active{background: var(--bb-akcio-sotet);color: #fff}.header--desktop .cart-box__bubble{background: #fff;color: var(--bb-akcio);border: 1.5px solid var(--bb-akcio)}@media (min-width: 1200px){.header--desktop .header__bottom{background: #fff;border-top: 1px solid var(--bb-vonal);border-bottom: 1px solid var(--bb-vonal);box-shadow: 0 4px 12px rgba(34,31,27,.04)}.header--desktop .header__bottom \u003E .container{position: relative}.header--desktop .header__bottom .navbar{padding: 0;min-height: 0}.header--desktop .header__bottom #nav--cat{width: 100%}.header--desktop .header__bottom .nav-item--products{position: static;width: 100%}.header--desktop .header__bottom .nav-link--products,.header--desktop .nav-link--products-placeholder-on-fixed-header{display: none !important}.header--desktop .header__bottom #dropdown-cat{display: block !important;visibility: visible !important;opacity: 1 !important;transform: none !important;z-index: auto !important;position: static;width: 100%;height: auto !important;min-height: 0 !important;max-height: none !important;margin: 0;padding: 0;border: 0;box-shadow: none;background: transparent;overflow: visible}.header--desktop .header__bottom #dropdown-cat .nav-list--0{display: flex;justify-content: space-between;align-items: stretch;width: 100%;margin: 0;padding: 0}.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li{position: relative;width: auto;border: 0}.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li \u003E .nav-link{display: flex;align-items: center;gap: 5px;height: 52px;padding: 0;border: 0;background: transparent;color: var(--bb-tinta);font-size: 1.3rem;font-weight: 500;white-space: nowrap;transition: color .08s,box-shadow .08s}.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li \u003E .nav-link::before,.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li \u003E .nav-link::after{display: none}.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li \u003E .nav-link:hover,.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li.show \u003E .nav-link{color: var(--bb-fo);box-shadow: inset 0 -2px 0 var(--bb-fo)}.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li \u003E .nav-link,.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li \u003E .nav-link:hover,.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li.show \u003E .nav-link,.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li.bb-aktiv \u003E .nav-link{font-weight: 500 !important}.header--desktop .header__bottom #dropdown-cat .nav-link__icon{width: 20px;height: 20px;margin: 0;flex-shrink: 0}.header--desktop .header__bottom #dropdown-cat .nav-link__icon img{width: 20px;height: 20px}.header--desktop .header__bottom #dropdown-cat .nav-item__count{display: none}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li \u003E .nav-link .nav-link__text{display: none}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li \u003E .nav-link::after{display: inline;position: static;width: auto;height: auto;border: 0;background: none;transform: none;content: \"\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-907727 \u003E .nav-link::after{content: \"Akció,szezon\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-474127 \u003E .nav-link::after{content: \"Szőlészet\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-992645 \u003E .nav-link::after{content: \"Palackok\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-944009 \u003E .nav-link::after{content: \"Palackozás\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-108837 \u003E .nav-link::after{content: \"Tartályok\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-437489 \u003E .nav-link::after{content: \"Kezelőanyagok\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-170958 \u003E .nav-link::after{content: \"Szőlőfeldolgozás\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-511412 \u003E .nav-link::after{content: \"Eszközök\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-754892 \u003E .nav-link::after{content: \"Mezőgazdaság\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-945468 \u003E .nav-link::after{content: \"Borászat gépei\"}html[lang^=\"hu\"] .header--desktop .header__bottom #dropdown-cat #nav-item-744751 \u003E .nav-link::after{content: \"Csomagolás\"}.header--desktop .header__bottom #nav--menu{display: none}html:not([lang^=\"hu\"]) .header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li \u003E .nav-link .nav-link__text{max-width: 110px;font-size: 1.25rem;line-height: 1.15;white-space: normal}.header--desktop .header__bottom #dropdown-cat #nav-item-907727 \u003E .nav-link{color: #b3261e;font-weight: 700 !important}.header--desktop .header__bottom #dropdown-cat .megasubmenu{top: 100%;left: 0;right: auto;width: max-content !important;min-width: 100%;max-width: min(900px,90vw) !important;height: auto !important;min-height: 0 !important;max-height: calc(100vh - 220px);overflow-y: auto;border: 1px solid var(--bb-vonal);border-radius: 0 0 8px 8px;box-shadow: 0 12px 24px rgba(34,31,27,.12)}.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li:nth-last-child(-n+3) \u003E .megasubmenu{left: auto;right: 0}.header--desktop .header__bottom #dropdown-cat .megasubmenu .nav-link__short,.header--desktop .header__bottom #dropdown-cat .megasubmenu .nav-item__count{display: none !important}.header--desktop .header__bottom #dropdown-cat .megasubmenu__banner-col{display: none !important}.header--desktop .header__bottom #dropdown-cat .megasubmenu__cats-col{padding: 16px 24px}.header--desktop .header__bottom #dropdown-cat .nav-list--1{display: grid;grid-template-columns: auto;column-gap: 32px;width: auto;columns: auto}.header--desktop .header__bottom #dropdown-cat .nav-list--1:has(\u003E li:nth-child(9)){grid-template-columns: repeat(2,auto)}.header--desktop .header__bottom #dropdown-cat .nav-list--1:has(\u003E li:nth-child(17)){grid-template-columns: repeat(3,auto)}.header--desktop .header__bottom #dropdown-cat .nav-list--1:has(\u003E li:nth-child(25)){grid-template-columns: repeat(4,auto)}.header--desktop .header__bottom #dropdown-cat .nav-list--1 \u003E li{max-width: 260px;width: auto}.header--desktop .header__bottom #dropdown-cat .megasubmenu__sticky-content{height: auto !important;position: static}}@media (min-width: 1200px){#ud_shop_start .slideshow-sidebar{display: none !important}}.nav-link__short{display: none}@media (max-width: 575.98px){#nav--mobile-top,#nav--mobile-top .header-inner{background: #fff !important;border-bottom: 1px solid var(--bb-vonal);box-shadow: 0 2px 8px rgba(34,31,27,.05)}#nav--mobile-top .header-inner \u003E div{justify-content: flex-start !important;align-items: center;gap: 2px;padding: 0 6px;height: 56px}#nav--mobile-top .btn{color: var(--bb-tinta) !important;background: transparent}#nav--mobile-top .lang-and-money__dropdown-btn{display: none !important}.bb-mlogo{flex: 1 1 auto;min-width: 0;display: flex;align-items: center;justify-content: center}.bb-mlogo img{max-height: 38px;max-width: 100%;width: auto}html:not(.bb-kesz) #nav--mobile-top .profile__dropdown-btn{margin-left: auto}#nav--mobile-top .header-inner{transition: transform .2s ease}html.bb-fej-rejt body #nav--mobile-top.is-fixed .header-inner{transform: translateY(calc(-100% - 12px)) !important}html[class*=\"bb-fejlec-\"] .header--mobile{display: none !important}#nav--mobile-top .cart-box__dropdown-btn{width: 44px;height: 44px;margin-right: 10px;background: var(--bb-akcio) !important;color: #fff !important;border-radius: 8px}html.bb-mkereso-jon:not(.bb-kesz) #nav--mobile-top .header-inner{padding-bottom: 67px}html.bb-mkereso-van #nav--mobile-top .search-box__dropdown-btn{display: none !important}html.bb-mkereso-van #nav--mobile-top .hamburger-box__dropdown-btn-mobile{margin-right: 46px}#nav--mobile-top .header-inner \u003E .bb-mkereso{display: block !important;height: auto;padding: 4px 16px 12px;background: #fff}.bb-mkereso #box_search_content{padding: 0 !important}.bb-mkereso #form_include_search{border: 0 !important;box-shadow: none !important;background: none !important}.bb-mkereso .box-search-group{position: relative;width: 100%;max-width: none;height: auto !important;border: 1.5px solid var(--bb-fo);border-radius: 22px;background: #fff;box-shadow: 0 2px 10px rgba(42,133,17,.12)}.bb-mkereso .box-search-group:focus-within{box-shadow: 0 0 0 3px rgba(42,133,17,.2),0 2px 10px rgba(42,133,17,.12)}.bb-mkereso .search-box__input,.bb-mkereso .search-box__input:focus{width: 100%;height: 44px !important;padding: 0 48px 0 18px !important;border: 0 !important;border-radius: 22px !important;outline: 0 !important;background: transparent !important;box-shadow: none !important;font-size: 16px !important;color: var(--bb-tinta)}.bb-mkereso .search-box__input::placeholder{color: #8a8378;opacity: 1}.bb-mkereso:not(.nyitva) .js-search-smart-autocomplete,.bb-mkereso:not(.nyitva) .ac_results{display: none !important}.bb-mkereso.nyitva .js-search-smart-autocomplete{max-height: calc(100vh - 130px);max-height: calc(100dvh - 130px);overflow-y: auto;-webkit-overflow-scrolling: touch;overscroll-behavior: contain}html.bb-mk-nyitva body.scroll-lock,html.bb-mkereso-van body.scroll-lock:has(#box_search_input:focus){position: static !important;top: auto !important;width: auto !important;overflow: visible !important}html.bb-mk-nyitva body.scroll-lock :is(.main,.footer,.partners),html.bb-mkereso-van body.scroll-lock:has(#box_search_input:focus) :is(.main,.footer,.partners){filter: none !important}html.bb-mk-nyitva{overflow: hidden}html.bb-mkereso-van #exposeMask{display: none !important}html.bb-mk-nyitva .bb-mk-hatter{display: block}.bb-mkereso .search-box__search-btn-outer{position: absolute;top: 0 !important;right: 6px;bottom: 0;height: auto !important;margin: 0 !important;transform: none !important;display: flex;align-items: center}.bb-mkereso .search-box__search-btn::before,.bb-mkereso .search-box__search-btn-icon{display: none !important}.bb-mkereso .search-box__search-btn{display: flex;align-items: center;justify-content: center;width: 40px;height: 44px;padding: 0;background: transparent !important;border: 0 !important;box-shadow: none !important}.bb-mkereso .search-box__search-btn::after{content: \"\";display: block;width: 20px;height: 20px;background: var(--bb-fo);-webkit-mask: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M20 20l-3.5-3.5'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M20 20l-3.5-3.5'/%3E%3C/svg%3E\") center / contain no-repeat}}.bb-mk-hatter{display: none;position: fixed;inset: 0;z-index: 1039;background: rgba(34,31,27,.45)}@media (max-width: 575.98px){html.bb-mf2 #nav--mobile-top .header-inner \u003E div:not(.bb-mkereso){gap: 0;padding: 0 8px 0 3px}html.bb-mf2 #nav--mobile-top .hamburger-box__dropdown-btn-mobile,html.bb-mf2 #nav--mobile-top #hamburger-box__dropdown-btn{width: 44px;height: 44px;margin: 0 !important;background: transparent !important;color: var(--bb-tinta) !important;border-radius: 8px !important}html.bb-mf2 .bb-mlogo{flex: 0 1 auto;justify-content: flex-start;margin-right: auto;padding-left: 2px}html.bb-mf2 .bb-mlogo img{max-height: 36px}@media (min-width: 390px){html.bb-mf2 .bb-mlogo img{max-height: 40px}}html.bb-mf2 #nav--mobile-top .bb-mf-gomb{display: flex !important;flex-direction: column;align-items: center;justify-content: center;gap: 3px;flex: 0 0 auto;width: 56px !important;min-width: 0 !important;height: 52px !important;padding: 0 !important;margin: 0 !important;border: 0 !important;border-radius: 8px !important;background: transparent !important;box-shadow: none !important;color: var(--bb-tinta) !important;text-decoration: none !important;position: relative}html.bb-mf2 #nav--mobile-top .bb-mf-gomb:active{background: #eef6ea !important}html.bb-mf2 #nav--mobile-top .bb-mf-gomb .dropdown__btn-icon,html.bb-mf2 #nav--mobile-top .bb-mf-gomb \u003E svg{width: 24px !important;height: 24px !important;font-size: 22px !important;margin: 0 !important}html.bb-mf2 #nav--mobile-top .bb-mf-gomb .dropdown__btn-text{display: none !important}html.bb-mf2 #nav--mobile-top .bb-mf-gomb .profile__dropdown-btn-icon{height: 23px !important;line-height: 23px}html.bb-mf2 #nav--mobile-top .bb-mf-gomb .cart-box__dropdown-btn-icon,html.bb-mf2 #nav--mobile-top .bb-mf-kedv \u003E svg{width: 23px !important;height: 23px !important}html.bb-mf2 #nav--mobile-top .bb-mf-gomb .cart-box__dropdown-btn-icon{width: 29px !important;height: 29px !important;margin: -3px 0 -3px !important}html.bb-mf2 #nav--mobile-top .bb-lnz-gomb-m{display: none !important}html.bb-mf2 #nav--mobile-top .bb-mf-kedv{order: 1}html.bb-mf2 #nav--mobile-top .bb-mf-gomb .cart-box{position: static}html.bb-mf2 body #nav--mobile-top .bb-mf-gomb .bubble,html.bb-mf2 body #nav--mobile-top .bb-mf-gomb .profile__bubble{position: absolute !important;top: 2px !important;left: calc(50% + 5px) !important;right: auto !important;width: 19px !important;height: 19px !important;margin: 0 !important;padding: 0 !important;transform: none !important;display: flex;align-items: center;justify-content: center;border: 2px solid #fff !important;border-radius: 50% !important;box-sizing: content-box;background: var(--bb-fo) !important;color: #fff !important;box-shadow: none !important;font-size: 11px !important;font-weight: 700 !important;line-height: 1 !important}html.bb-mf2 #nav--mobile-top .bb-mf-gomb .profile__bubble *{color: #fff !important}.bb-mf-cimke{display: block;font-size: 10.5px;font-weight: 600;line-height: 1;letter-spacing: 0;text-transform: none;color: var(--bb-tinta);white-space: nowrap}@media (max-width: 359.98px){html.bb-mf2 #nav--mobile-top .bb-mf-gomb{width: 48px !important}html.bb-mf2 .bb-mlogo img{max-height: 30px}.bb-mf-cimke{font-size: 9.5px}}html.bb-mf2 .bb-mlogo{min-width: 0;margin-right: auto !important;padding-right: 4px}html.bb-mf2 .bb-mlogo img{max-width: 100%}html.bb-mf2 .bb-mkereso .box-search-group{border: 1px solid #c5d6ba;background: #f9f8f4;box-shadow: none}html.bb-mf2 .bb-mkereso .box-search-group:focus-within{border-color: var(--bb-fo);background: #fff;box-shadow: 0 0 0 3px rgba(42,133,17,.15)}}.bb-mm__legutobb[hidden]{display: none}.bb-mm-hatter{position: fixed;inset: 0;z-index: 2147483000;background: rgba(34,31,27,0);transition: background .25s}.bb-mm-hatter[hidden]{display: none}.bb-mm-hatter.nyitva{background: rgba(34,31,27,.45)}html.bb-mm-nyitva{overflow: hidden}html.bb-mm-nyitva molin-shop-ai{display: none !important}.bb-mm{position: absolute;top: 0;bottom: 0;left: 0;width: min(88vw,380px);display: flex;flex-direction: column;background: #fff;box-shadow: 4px 0 24px rgba(0,0,0,.15);transform: translateX(-100%);transition: transform .25s ease}.bb-mm-hatter.nyitva .bb-mm{transform: none}.bb-mm__fej{flex-shrink: 0;height: 56px;display: flex;align-items: center;justify-content: space-between;padding: 0 6px 0 18px;border-bottom: 1px solid var(--bb-vonal)}.bb-mm__cim{font-size: 1.6rem;font-weight: 700;letter-spacing: .04em;text-transform: uppercase;color: var(--bb-tinta)}.bb-mm__zar{width: 44px;height: 44px;padding: 0;display: flex;align-items: center;justify-content: center;border: 0;background: none;color: var(--bb-tinta)}.bb-mm__lapok{position: relative;flex: 1;overflow: hidden}.bb-mm__lap{position: absolute;inset: 0;overflow-y: auto;-webkit-overflow-scrolling: touch;background: #fff;transform: translateX(100%);transition: transform .25s ease}.bb-mm__lap.aktiv{transform: none}.bb-mm__lap.hatul{transform: translateX(-30%)}.bb-mm__vissza{width: 100%;padding: 14px 18px;border: 0;border-bottom: 1px solid var(--bb-vonal);background: #f7f6f2;font: inherit;font-size: 1.5rem;font-weight: 700;color: var(--bb-tinta);text-align: left}.bb-mm__osszes{display: block;padding: 12px 18px;border-bottom: 1px solid var(--bb-vonal);color: var(--bb-fo);font-size: 1.45rem;font-weight: 700;text-decoration: none}.bb-mm__lista{margin: 0;padding: 0;list-style: none}.bb-mm__sor{width: 100%;min-height: 64px;display: flex;align-items: center;gap: 14px;padding: 8px 14px 8px 12px;border: 0;border-bottom: 1px solid #f0ece4;background: none;font: inherit;font-size: 1.5rem;font-weight: 600;line-height: 1.25;color: var(--bb-tinta);text-align: left;text-decoration: none}.bb-mm__sor:active{background: #eef6ea}.bb-mm__kep{width: 52px;height: 52px;flex-shrink: 0;display: flex;align-items: center;justify-content: center;border-radius: 8px;background: #f7f6f2;overflow: hidden}.bb-mm__kep img{max-width: 100%;max-height: 100%;object-fit: contain;mix-blend-mode: multiply}.bb-mm__nev{flex: 1;min-width: 0}.bb-mm__nyil{flex-shrink: 0;width: 9px;height: 9px;margin-right: 6px;border-right: 2px solid currentColor;border-bottom: 2px solid currentColor;transform: rotate(-45deg);opacity: .5}.bb-mm__szekcio{padding: 20px 18px 6px;font-size: 1.2rem;font-weight: 700;letter-spacing: .06em;text-transform: uppercase;color: #6b655b}.bb-mm__linkek{display: grid;grid-template-columns: 1fr 1fr;gap: 0 12px;padding: 0 18px 8px}.bb-mm__linkek a{padding: 10px 0;color: var(--bb-tinta);font-size: 1.4rem;text-decoration: none}.bb-mm__kapcsolat{margin: 8px 18px 12px;padding: 14px;border-radius: 10px;background: #eef6ea;font-size: 1.35rem;line-height: 1.6;color: var(--bb-tinta)}.bb-mm__kapcsolat a{color: var(--bb-fo);font-weight: 700;text-decoration: none}.bb-mm__nyelv{display: block;margin: 0 18px 28px;padding: 12px 14px;width: calc(100% - 36px);border: 1px solid var(--bb-vonal);border-radius: 8px;background: #fff;font: inherit;font-size: 1.4rem;font-weight: 600;color: var(--bb-tinta);text-align: left}" + (valtozat === 'b' ? "" : '') + (valtozat === 'c' && magyar ? "@media (min-width: 1200px){.header--desktop .header__bottom #dropdown-cat .megasubmenu{display: none !important}.header--desktop .header__bottom #dropdown-cat .nav-list--0 \u003E li.bb-aktiv \u003E .nav-link{color: var(--bb-fo);box-shadow: inset 0 -2px 0 var(--bb-fo)}.bb-mega{position: absolute;top: 100%;left: 0;right: 0;z-index: 1045;display: flex;gap: 24px;max-height: calc(100vh - 200px);overflow-y: auto;padding: 16px;background: #fff;border: 1px solid var(--bb-vonal);border-top: 0;border-radius: 0 0 10px 10px;box-shadow: 0 16px 32px rgba(34,31,27,.14)}.bb-mega[hidden]{display: none}.bb-mega__lista{flex: 0 0 270px;margin: 0;padding: 0 12px 0 0;list-style: none;border-right: 1px solid var(--bb-vonal)}.bb-mega__lista a{display: flex;align-items: center;justify-content: space-between;gap: 8px;padding: 10px 12px;border-radius: 6px;color: var(--bb-tinta);font-size: 1.45rem;font-weight: 600;line-height: 1.25;text-decoration: none;transition: color .08s,background-color .08s}.bb-mega__lista a.van-al::after{content: \"\";flex-shrink: 0;width: 7px;height: 7px;border-right: 2px solid currentColor;border-bottom: 2px solid currentColor;transform: rotate(-45deg);opacity: .55}.bb-mega__lista a.aktiv,.bb-mega__lista a:hover,.bb-mega__lista a:focus-visible{background: #eef6ea;color: var(--bb-fo)}.bb-mega__jobb{flex: 1;min-width: 0;display: flex;flex-direction: column;gap: 12px}.bb-mega__cim{align-self: flex-start;color: var(--bb-fo);font-size: 1.5rem;font-weight: 700;text-decoration: none}.bb-mega__cim:hover{text-decoration: underline}.bb-mega__kartyak{display: grid;grid-template-columns: repeat(auto-fill,minmax(160px,1fr));gap: 12px}.bb-kartya{display: flex;flex-direction: column;align-items: center;gap: 8px;padding: 12px 10px;border-radius: 8px;background: #f7f6f2;color: var(--bb-tinta);font-size: 1.35rem;line-height: 1.25;text-align: center;text-decoration: none;transition: color .08s,background-color .08s}.bb-kartya:hover,.bb-kartya:focus-visible{background: #eef6ea;color: var(--bb-fo)}.bb-kartya__kep{display: flex;align-items: center;justify-content: center;width: 120px;height: 120px}.bb-kartya__kep img{max-width: 100%;max-height: 100%;object-fit: contain;mix-blend-mode: multiply}}" : '');
(document.head || document.documentElement).appendChild(stilus);
document.documentElement.classList.add('bb-fejlec-' + valtozat);

var ROVID = {
907727: 'Akció, szezon', 474127: 'Szőlészet', 992645: 'Palackok', 944009: 'Palackozás',
108837: 'Tartályok', 437489: 'Kezelőanyagok', 170958: 'Szőlőfeldolgozás',
511412: 'Eszközök', 754892: 'Mezőgazdaság', 945468: 'Borászat gépei', 744751: 'Csomagolás'
};

function rovidNevek() {
if ((document.documentElement.lang || '').slice(0, 2) !== 'hu') return;
var elemek = document.querySelectorAll('#dropdown-cat .nav-list--0 > li');
for (var i = 0; i < elemek.length; i++) {
var li = elemek[i];
var a = li.querySelector('.nav-link');
if (!ROVID[li.id.replace('nav-item-', '')] || !a || li.hasAttribute('data-bb-nev')) continue;
var szoveg = a.querySelector('.nav-link__text');
if (szoveg && szoveg.firstChild) {
a.title = szoveg.firstChild.textContent.trim();
li.setAttribute('data-bb-nev', a.title);
}
}

var panel = document.getElementById('dropdown-cat');
if (!panel || typeof MutationObserver !== 'function') return;
function cimTisztit() {
var cimek = panel.querySelectorAll('.megasubmenu__parent-title');
for (var k = 0; k < cimek.length; k++) {
var szulo = cimek[k].closest('.nav-list--0 > li');
var teljes = szulo && szulo.getAttribute('data-bb-nev');
if (teljes && cimek[k].textContent.trim() !== teljes) cimek[k].textContent = teljes;
}
}
new MutationObserver(cimTisztit).observe(panel, { childList: true, subtree: true, characterData: true });
cimTisztit();
}

var FELSO_SAV = [927735, 385767, 727970, 199414, '/palyazat'];
var SAV_IKON = {
927735: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20M9 10l2 2 4-4"/>',
385767: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
727970: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6 6 0 0 1 3.5 5.5"/>',
199414: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
'/palyazat': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>'
};
function savIkon(a, kulcs) {
if (!a || !SAV_IKON[kulcs] || a.querySelector('.bb-sav-ikon')) return;
var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
s.setAttribute('class', 'bb-sav-ikon');
s.setAttribute('viewBox', '0 0 24 24');
s.setAttribute('aria-hidden', 'true');
s.innerHTML = SAV_IKON[kulcs];
a.insertBefore(s, a.firstChild);
}

function valtozatA() {
var menu = document.getElementById('nav--menu');
var jobb = document.querySelector('.top-info-bar__right');
if (!menu || !jobb || menu.parentNode === jobb) return;
jobb.insertBefore(menu, jobb.firstChild);

var maradnak = [];
for (var i = 0; i < FELSO_SAV.length; i++) {
var elem = null;
if (typeof FELSO_SAV[i] === 'number') elem = menu.querySelector('.js-nav-item-' + FELSO_SAV[i]);
else {
var link = jobb.querySelector('a[href="' + FELSO_SAV[i] + '"]');
if (link) {
elem = document.createElement('li');
elem.className = 'nav-item bb-sav-pont';
var a = document.createElement('a');
a.className = 'nav-link';
a.href = FELSO_SAV[i];
a.textContent = link.textContent.trim();
elem.appendChild(a);
}
}
if (!elem) continue;
elem.classList.add('bb-sav-lat');
savIkon(elem.querySelector('a'), FELSO_SAV[i]);
menu.appendChild(elem);
maradnak.push(elem);
}
var pontok = menu.children;
for (var j = 0; j < pontok.length; j++) {
if (maradnak.indexOf(pontok[j]) < 0) pontok[j].classList.add('bb-sav-rejt');
}
var sajat = jobb.querySelectorAll('a[href^="/"]');
for (var k = 0; k < sajat.length; k++) {
if (!menu.contains(sajat[k])) sajat[k].classList.add('bb-sav-rejt');
}
}

function valtozatB() {}

var KESLELTETES = 180;
try {
var mk = location.search.match(/[?&]menukesl=(\d{1,4})/);
if (mk) localStorage.setItem('bbMenuKesl', mk[1]);
var tarolt = parseInt(localStorage.getItem('bbMenuKesl'), 10);
if (tarolt >= 0 && tarolt <= 2000) KESLELTETES = tarolt;
} catch (e) { /* marad az alapérték */ }

function gyorsLenyilo() {
var fejlec = document.getElementById('header--desktop');
var elemek = document.querySelectorAll('#dropdown-cat .nav-list--0 > li');
if (!fejlec || !elemek.length || typeof window.jQuery !== 'function') return;

function betolt(li) {
if (typeof window.catSubLoad !== 'function') return;
if (li.classList.contains('ajax-loaded') || li.classList.contains('ajax-loading')) return;
var a = li.querySelector('.nav-link');
var m = a && (a.getAttribute('data-mouseover') || '').match(/handleSub\('(\d+)'\s*,\s*'([^']+)'\)/);
if (m) window.catSubLoad(m[1], m[2].replace(/&amp;/g, '&'));
}
function mindetBetolt() {
fejlec.removeEventListener('pointerenter', mindetBetolt);
for (var i = 0; i < elemek.length; i++) {
(function (li, kesleltetes) { setTimeout(function () { betolt(li); }, kesleltetes); })(elemek[i], i * 60);
}
}
fejlec.addEventListener('pointerenter', mindetBetolt);

var varakozas = null;
for (var j = 0; j < elemek.length; j++) {
elemek[j].addEventListener('mouseenter', function () {
var li = this;
if (window.innerWidth < 1200 || li.classList.contains('show')) return;
betolt(li);
clearTimeout(varakozas);
var marNyitva = document.querySelector('#dropdown-cat .nav-list--0 > li.show');
varakozas = setTimeout(function () { window.jQuery(li).trigger('focusin'); }, marNyitva ? 0 : KESLELTETES);
});
elemek[j].addEventListener('mouseleave', function () { clearTimeout(varakozas); });
}
}

var KATEGORIAK = {};
var adatVarok = [], adatFut = false;
function katAdat(kesz) {
if (window.bbKategoriak) {
KATEGORIAK = window.bbKategoriak; FOKEPEK = window.bbFokepek || {};
if (kesz) kesz();
return;
}
if (kesz) adatVarok.push(kesz);
if (adatFut || !window.bbKatAdatUrl) return;
adatFut = true;
var s = document.createElement('script');
s.src = window.bbKatAdatUrl;
s.async = true;
s.onload = function () {
KATEGORIAK = window.bbKategoriak || {}; FOKEPEK = window.bbFokepek || {};
var v = adatVarok; adatVarok = [];
v.forEach(function (f) { try { f(); } catch (e) { /* egy hibás várakozó ne állítsa meg a többit */ } });
};
s.onerror = function () { adatFut = false; };
(document.head || document.documentElement).appendChild(s);
}
function teljesCim(u) { return u.charAt(0) === '~' ? '/termekek/' + u.slice(1) : u; }

function nagyMenu() {
var sor = document.querySelector('#header--desktop .header__bottom > .container');
var elemek = document.querySelectorAll('#dropdown-cat .nav-list--0 > li');
if (!sor || !elemek.length) return false;

var panel = document.createElement('div');
panel.className = 'bb-mega';
panel.hidden = true;
sor.appendChild(panel);
var aktiv = null, zarIdo = null;

function elem(tag, osztaly, szoveg) {
var e = document.createElement(tag);
if (osztaly) e.className = osztaly;
if (szoveg != null) e.textContent = szoveg;
return e;
}
function kartyak(lista, cel) {
cel.textContent = '';
for (var i = 0; i < lista.length; i++) {
var k = lista[i];
var a = elem('a', 'bb-kartya');
a.href = teljesCim(k.u);
var keret = elem('span', 'bb-kartya__kep');
var kep = document.createElement('img');
kep.src = '/img/63361/catpic_' + k.i + '/200x200,r/' + k.i + '.webp' + (k.t ? '?time=' + k.t : '');
kep.alt = '';
kep.width = 120;
kep.height = 120;
kep.loading = 'lazy';
keret.appendChild(kep);
a.appendChild(keret);
a.appendChild(elem('span', 'bb-kartya__nev', k.n));
cel.appendChild(a);
}
}
function zar() {
panel.hidden = true;
if (aktiv) aktiv.classList.remove('bb-aktiv');
aktiv = null;
}
function zarKesleltetve() { clearTimeout(zarIdo); zarIdo = setTimeout(zar, 180); }
function nyit(li) {
clearTimeout(zarIdo);
if (window.innerWidth < 1200) return;
if (aktiv === li && !panel.hidden) return;
if (!window.bbKategoriak && window.bbKatAdatUrl) {
katAdat(function () { if (li.matches(':hover') || li.contains(document.activeElement)) nyit(li); });
return;
}
var adat = KATEGORIAK[li.id.replace('nav-item-', '')];
if (!adat || !adat.length) { zar(); return; }
if (aktiv) aktiv.classList.remove('bb-aktiv');
aktiv = li;
li.classList.add('bb-aktiv');
panel.textContent = '';

var fo = li.querySelector('.nav-link');
var jobb = elem('div', 'bb-mega__jobb');
var cim = elem('a', 'bb-mega__cim');
var racs = elem('div', 'bb-mega__kartyak');
jobb.appendChild(cim);
jobb.appendChild(racs);

var vanMelyebb = false;
for (var i = 0; i < adat.length; i++) if (adat[i].c && adat[i].c.length) vanMelyebb = true;

if (!vanMelyebb) {
cim.textContent = (li.getAttribute('data-bb-nev') || fo.textContent.trim()) + ' – összes ›';
cim.href = fo.getAttribute('href');
kartyak(adat, racs);
panel.appendChild(jobb);
} else {
var lista = elem('ul', 'bb-mega__lista');
var elso = null;
adat.forEach(function (k) {
var sor = elem('li');
var a = elem('a', k.c && k.c.length ? 'van-al' : null, k.n);
a.href = teljesCim(k.u);
function mutat() {
var regi = lista.querySelector('a.aktiv');
if (regi) regi.classList.remove('aktiv');
a.classList.add('aktiv');
cim.textContent = k.n + ' – összes ›';
cim.href = teljesCim(k.u);
kartyak(k.c && k.c.length ? k.c : [k], racs);
}
a.addEventListener('mouseenter', mutat);
a.addEventListener('focus', mutat);
sor.appendChild(a);
lista.appendChild(sor);
if (!elso) elso = mutat;
});
panel.appendChild(lista);
panel.appendChild(jobb);
elso();
}
panel.hidden = false;
}

var nyitIdo = null;
for (var j = 0; j < elemek.length; j++) {
elemek[j].addEventListener('mouseenter', function () {
var li = this;
katAdat(); /* előre, amíg a késleltetés tart */
clearTimeout(nyitIdo);
clearTimeout(zarIdo);
if (!panel.hidden) { nyit(li); return; }
nyitIdo = setTimeout(function () { nyit(li); }, KESLELTETES);
});
elemek[j].addEventListener('mouseleave', function () { clearTimeout(nyitIdo); zarKesleltetve(); });
elemek[j].addEventListener('focusin', function () { nyit(this); });
}
panel.addEventListener('mouseenter', function () { clearTimeout(zarIdo); });
panel.addEventListener('mouseleave', zarKesleltetve);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zar(); });
document.addEventListener('click', function (e) {
if (!panel.hidden && !panel.contains(e.target) && !(aktiv && aktiv.contains(e.target))) zar();
});
return true;
}

var LOGO = 'https://cdn.jsdelivr.net/gh/bi-bor/unas-bi-bor-script@f7c1cefe4e673f305c89dde1c1fd1bd36e142460/kepek/logo-f4902386.png';
function logoCsere() {
var kepek = document.querySelectorAll('.header_logo img');
for (var i = 0; i < kepek.length; i++) {
var kep = kepek[i];
var kep_forrasok = kep.parentNode && kep.parentNode.tagName === 'PICTURE' ? kep.parentNode.querySelectorAll('source') : [];
for (var j = 0; j < kep_forrasok.length; j++) kep_forrasok[j].srcset = LOGO;
kep.removeAttribute('srcset');
kep.src = LOGO;
}
}

var FOKEPEK = {};
var MOBIL_LINKEK = [305810, 912325, 103546, 657820, 385767, 927735, 727970, 199414];

function kepCim(i, t) { return '/img/63361/catpic_' + i + '/200x200,r/' + i + '.webp' + (t ? '?time=' + t : ''); }
function uj(tag, osztaly, szoveg) {
var e = document.createElement(tag);
if (osztaly) e.className = osztaly;
if (szoveg != null) e.textContent = szoveg;
return e;
}

function mobilFejlec() {
var sor = document.querySelector('#nav--mobile-top .header-inner > div');
if (!sor || sor.querySelector('.bb-mlogo')) return;
var regi = document.querySelector('.header--mobile .header_logo a');
var a = uj('a', 'bb-mlogo');
a.href = (regi && regi.getAttribute('href')) || '/';
a.setAttribute('aria-label', 'Bí-Bor-Ász főoldal');
var kep = uj('img');
kep.src = LOGO;
kep.alt = 'Bí-Bor-Ász';
a.appendChild(kep);
sor.insertBefore(a, sor.querySelector('.profile__dropdown-btn'));
}

function mobilKereso() {
var belso = document.querySelector('#nav--mobile-top .header-inner');
var doboz = document.getElementById('box_search_content');
if (!belso || !doboz || belso.querySelector('.bb-mkereso')) return;
var sor = uj('div', 'bb-mkereso');
sor.appendChild(doboz);
belso.appendChild(sor);
document.documentElement.classList.add('bb-mkereso-van');
var nav = document.getElementById('nav--mobile-top');
if (nav && nav.style.height && parseInt(nav.style.height, 10) !== belso.offsetHeight) window.dispatchEvent(new Event('resize'));

var mezo = doboz.querySelector('.search-box__input');
if (!mezo) return;
mezo.removeAttribute('readonly');
var hatter = uj('div', 'bb-mk-hatter');
document.body.appendChild(hatter);
function okosKereso() { return window.innerWidth < 576 && typeof window.bbkOpen === 'function'; }
function okosPanel() { return okosKereso() && (window.bbkMode === 'panel' || window.bbkMode === 'sav'); }
function okosNyit(e) {
if (!okosKereso()) return;
if (okosPanel()) { okosFigyel(); return; }
e.preventDefault();
takarit();
try { window.bbkOpen(mezo.value, mezo); } catch (err) { return; }
okosFigyel();
}
var figyelo = null;
function okosFigyel() {
var atfedo = document.getElementById('bbk-overlay');
if (!atfedo || figyelo || !window.MutationObserver) return;
figyelo = new MutationObserver(function () {
if (!atfedo.classList.contains('open')) takarit();
});
figyelo.observe(atfedo, { attributes: true, attributeFilter: ['class'] });
}
function takarit() {
zar();
if (document.body.classList.contains('scroll-lock') && sablonZar) sablonZar.click();
if (document.getElementById('exposeMask') && window.jQuery && jQuery.mask && jQuery.mask.close) jQuery.mask.close();
if (document.activeElement === mezo) mezo.blur();
}
mezo.addEventListener('touchstart', okosNyit, { passive: false });
mezo.addEventListener('pointerdown', okosNyit);
function nyit() {
if (okosKereso() || window.innerWidth >= 576 || sor.classList.contains('nyitva')) return;
sor.classList.add('nyitva');
document.documentElement.classList.add('bb-mk-nyitva');
}
var sablonZar = document.querySelector('#search-box__dropdown .dropdown__btn-close');
function zar(kereses) {
if (!sor.classList.contains('nyitva')) return;
sor.classList.remove('nyitva');
document.documentElement.classList.remove('bb-mk-nyitva');
if (sablonZar && kereses !== true) sablonZar.click();
if (window.jQuery && jQuery.mask && jQuery.mask.close) jQuery.mask.close();
if (kereses !== true) setTimeout(function () { mezo.blur(); }, 0);
}
mezo.addEventListener('pointerdown', nyit);
mezo.addEventListener('input', nyit);
var belul = 0;
sor.addEventListener('pointerdown', function () { belul = Date.now(); }, true);
mezo.addEventListener('blur', function () {
setTimeout(function () {
if (document.activeElement === mezo) return;
if (sor.classList.contains('nyitva')) { if (Date.now() - belul > 700) zar(); }
else if (document.body.classList.contains('scroll-lock') && sablonZar) sablonZar.click();
}, 300);
});
hatter.addEventListener('click', function () { zar(); });
document.addEventListener('click', function (e) {
if (sor.classList.contains('nyitva') && !sor.contains(e.target)) zar();
}, true);
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape' && sor.classList.contains('nyitva')) zar();
});
doboz.querySelector('form').addEventListener('submit', function () { zar(true); });
}

function fejlecRejtes() {
try {
var mr = location.search.match(/[?&]mrejt=([01])/);
if (mr) localStorage.setItem('bbMrejt', mr[1]);
if (localStorage.getItem('bbMrejt') === '0') return;
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
var nav = document.getElementById('nav--mobile-top');
var belso = nav && nav.querySelector('.header-inner');
if (!belso) return;
var gyoker = document.documentElement;
var elozo = window.pageYOffset, utemezve = false;
function nyitvaVanValami() {
return gyoker.classList.contains('bb-mm-nyitva') || gyoker.classList.contains('bb-mk-nyitva') ||
gyoker.classList.contains('bbk-lock') || document.body.classList.contains('scroll-lock') ||
!!nav.querySelector('.dropdown__btn[aria-expanded="true"]');
}
function frissit() {
utemezve = false;
var y = window.pageYOffset, d = y - elozo;
if (window.innerWidth >= 576 || y <= belso.offsetHeight || nyitvaVanValami()) {
gyoker.classList.remove('bb-fej-rejt');
elozo = y;
return;
}
if (Math.abs(d) < 10) return;
gyoker.classList.toggle('bb-fej-rejt', d > 0);
elozo = y;
}
window.addEventListener('scroll', function () {
if (!utemezve) { utemezve = true; requestAnimationFrame(frissit); }
}, { passive: true });
belso.addEventListener('transitionend', function (e) {
if (e.target === belso && e.propertyName === 'transform') window.dispatchEvent(new Event('scroll'));
});
}

function mobilFejlec2() {
var sor = document.querySelector('#nav--mobile-top .header-inner > div');
if (!sor || sor.querySelector('.bb-mf-kedv')) return;
var profil = sor.querySelector('.profile__dropdown-btn');
var kosar = sor.querySelector('.cart-box__dropdown-btn');
if (!profil || !kosar) return;
var kedv = uj('a', 'bb-mf-kedv bb-mf-gomb');
kedv.href = '/shop_order_track.php?tab=favourites';
kedv.setAttribute('aria-label', 'Kedvencek');
kedv.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.9 3.9 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.8 1.1-1.7 2.7-2.8 4.7-2.8 3.4 0 5.6 3.4 4.5 6.6-1.7 4.8-9.2 9.4-9.2 9.4z"/></svg>';
kedv.appendChild(uj('span', 'bb-mf-cimke', 'Kedvencek'));
sor.insertBefore(kedv, profil);
var c = window.UNAS && UNAS.customer;
var belepett = !!(c && c.id > 0 && Number(c.without_registration) !== 1);
profil.classList.add('bb-mf-gomb');
profil.appendChild(uj('span', 'bb-mf-cimke', belepett ? 'Fiókom' : 'Belépés'));
kosar.classList.add('bb-mf-gomb');
kosar.appendChild(uj('span', 'bb-mf-cimke', 'Puttony'));
document.documentElement.classList.add('bb-mf2');
}

function mobilMenu() {
var gomb = document.querySelector('#nav--mobile-top .hamburger-box__dropdown-btn-mobile');
var fok = document.querySelectorAll('#dropdown-cat .nav-list--0 > li');
if (!gomb || !fok.length) return;

var hatter = uj('div', 'bb-mm-hatter');
hatter.hidden = true;
var fiok = uj('aside', 'bb-mm');
fiok.setAttribute('role', 'dialog');
fiok.setAttribute('aria-modal', 'true');
fiok.setAttribute('aria-label', 'Menü');
var fej = uj('div', 'bb-mm__fej');
fej.appendChild(uj('span', 'bb-mm__cim', 'Menü'));
var zarGomb = uj('button', 'bb-mm__zar');
zarGomb.type = 'button';
zarGomb.setAttribute('aria-label', 'Menü bezárása');
zarGomb.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
fej.appendChild(zarGomb);
var lapok = uj('div', 'bb-mm__lapok');
fiok.appendChild(fej);
fiok.appendChild(lapok);
hatter.appendChild(fiok);
document.body.appendChild(hatter);

var verem = [];
function sor(nev, href, kepUrl, tovabb) {
var el = uj(tovabb ? 'button' : 'a', 'bb-mm__sor');
if (tovabb) { el.type = 'button'; el.addEventListener('click', tovabb); } else el.href = href;
var keret = uj('span', 'bb-mm__kep');
if (kepUrl) { var k = uj('img'); k.src = kepUrl; k.alt = ''; k.loading = 'lazy'; keret.appendChild(k); }
el.appendChild(keret);
el.appendChild(uj('span', 'bb-mm__nev', nev));
if (tovabb) el.appendChild(uj('span', 'bb-mm__nyil'));
var li = uj('li');
li.appendChild(el);
return li;
}
function lap(cim, osszes, gyerekek, gyoker) {
var l = uj('div', 'bb-mm__lap');
if (!gyoker) {
var vissza = uj('button', 'bb-mm__vissza', '‹ ' + cim);
vissza.type = 'button';
vissza.addEventListener('click', hatra);
l.appendChild(vissza);
var o = uj('a', 'bb-mm__osszes', 'Összes termék ›');
o.href = osszes;
l.appendChild(o);
}
var lista = uj('ul', 'bb-mm__lista');
gyerekek.forEach(function (g) { lista.appendChild(g); });
l.appendChild(lista);
return l;
}
function elore(l) {
var elozo = verem[verem.length - 1];
lapok.appendChild(l);
verem.push(l);
l.getBoundingClientRect();
l.classList.add('aktiv');
if (elozo) elozo.classList.add('hatul');
var f = l.querySelector('button, a');
if (f) f.focus();
}
function hatra() {
if (verem.length < 2) return;
var l = verem.pop();
l.classList.remove('aktiv');
verem[verem.length - 1].classList.remove('hatul');
setTimeout(function () { l.remove(); }, 260);
}
function alLap(cim, osszes, lista) {
return lap(cim, osszes, lista.map(function (k) {
var cimk = teljesCim(k.u);
return sor(k.n, cimk, kepCim(k.i, k.t), k.c && k.c.length ? function () { elore(alLap(k.n, cimk, k.c)); } : null);
}));
}

var sorok = [], kepHelyek = [];
for (var i = 0; i < fok.length; i++) {
(function (li) {
var id = li.id.replace('nav-item-', '');
var a = li.querySelector('.nav-link');
var nev = li.getAttribute('data-bb-nev') || (a ? a.textContent.trim() : '');
var href = a ? a.getAttribute('href') : '#';
var s = sor(nev, href, null, function () {
katAdat(function () {
var adat = KATEGORIAK[id];
if (adat && adat.length) elore(alLap(nev, href, adat));
else location.href = href;
});
});
kepHelyek.push({ id: id, hely: s.querySelector('.bb-mm__kep') });
sorok.push(s);
})(fok[i]);
}
function kepekBe() {
kepHelyek.forEach(function (h) {
var kod = h.id, hely = h.hely, kp = FOKEPEK[kod];
if (!kp || !hely || hely.firstChild) return;
var k = uj('img'); k.src = kepCim(kp.i, kp.t); k.alt = ''; k.loading = 'lazy';
hely.appendChild(k);
});
}
var gyoker = lap('', '', sorok, true);

gyoker.appendChild(uj('div', 'bb-mm__szekcio', 'Hasznos linkek'));
var linkek = uj('div', 'bb-mm__linkek');
MOBIL_LINKEK.forEach(function (id) {
var a = document.querySelector('.js-nav-item-' + id + ' > a');
if (!a) return;
var l = uj('a', null, a.textContent.trim());
l.href = a.getAttribute('href');
linkek.appendChild(l);
});
['/blog', '/allas', '/palyazat'].forEach(function (h) {
var a = document.querySelector('.top-info-bar a[href="' + h + '"]');
if (!a) return;
var l = uj('a', null, a.textContent.trim());
l.href = h;
linkek.appendChild(l);
});
gyoker.appendChild(linkek);

var kapcs = uj('div', 'bb-mm__kapcsolat');
var tel = document.querySelector('.top-info-bar a[href^="tel:"]');
var idok = document.querySelectorAll('.top-info-bar__left .top-info-bar__item');
for (var j = 0; j < idok.length; j++) kapcs.appendChild(uj('div', null, idok[j].textContent.replace(/\s+/g, ' ').trim()));
if (tel) { var t = uj('a', null, tel.textContent.trim()); t.href = tel.getAttribute('href'); kapcs.appendChild(t); }
gyoker.appendChild(kapcs);

var legutobb = null;
if (mf2) {
legutobb = uj('button', 'bb-mm__nyelv bb-mm__legutobb', 'Legutóbb nézett termékek');
legutobb.type = 'button';
legutobb.hidden = true;
legutobb.addEventListener('click', function () {
var g = document.querySelector('#nav--mobile-top .bb-lnz-gomb-m');
zar();
if (g) setTimeout(function () { g.click(); }, 280);
});
gyoker.appendChild(legutobb);
}

var nyelvGomb = document.querySelector('#nav--mobile-top .lang-and-money__dropdown-btn');
if (nyelvGomb) {
var ny = uj('button', 'bb-mm__nyelv', 'Nyelv és pénznem');
ny.type = 'button';
ny.addEventListener('click', function () { zar(); setTimeout(function () { nyelvGomb.click(); }, 280); });
gyoker.appendChild(ny);
}

function nyit() {
katAdat(kepekBe);
if (legutobb) {
var lg = document.querySelector('#nav--mobile-top .bb-lnz-gomb-m');
var db = lg && lg.querySelector('.bb-lnz-db');
legutobb.hidden = !lg || lg.hidden;
legutobb.textContent = 'Legutóbb nézett termékek' + (db && db.textContent ? ' (' + db.textContent + ')' : '');
}
while (verem.length > 1) verem.pop().remove();
if (!verem.length) elore(gyoker);
verem[0].classList.remove('hatul');
hatter.hidden = false;
hatter.getBoundingClientRect();
hatter.classList.add('nyitva');
document.documentElement.classList.add('bb-mm-nyitva');
zarGomb.focus();
}
function zar() {
hatter.classList.remove('nyitva');
document.documentElement.classList.remove('bb-mm-nyitva');
setTimeout(function () { hatter.hidden = true; }, 260);
gomb.focus();
}
gomb.addEventListener('touchstart', function () { katAdat(); }, { passive: true });
gomb.addEventListener('click', function (e) {
if (window.innerWidth >= 576) return;
e.preventDefault();
e.stopImmediatePropagation();
nyit();
}, true);
zarGomb.addEventListener('click', zar);
hatter.addEventListener('click', function (e) { if (e.target === hatter) zar(); });
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape' && !hatter.hidden) { if (verem.length > 1) hatra(); else zar(); }
});
}

function rendez() {
try { rendezBelso(); }
finally { document.documentElement.classList.add('bb-kesz'); }
}
function rendezBelso() {
KATEGORIAK = window.bbKategoriak || {};
FOKEPEK = window.bbFokepek || {};
if (!window.bbKategoriak && window.bbKatAdatUrl) {
var elokeres = function () { setTimeout(function () { (window.requestIdleCallback || setTimeout)(function () { katAdat(); }); }, 1500); };
if (document.readyState === 'complete') elokeres(); else window.addEventListener('load', elokeres);
}
logoCsere();
if (valtozat === 'b') valtozatB(); else valtozatA();
rovidNevek();
if (!(valtozat === 'c' && magyar && nagyMenu())) gyorsLenyilo();
mobilFejlec();
if (keresoSor) mobilKereso();
if (mf2 && magyar) mobilFejlec2();
fejlecRejtes();
if (magyar) mobilMenu();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rendez);
else rendez();
})();
