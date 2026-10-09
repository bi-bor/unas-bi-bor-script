(function () {
var MINDENKI = true;
var KULCS = 'bbUjAdatlap';
var allapot = null;
try {
var m = location.search.match(/[?&]ujadatlap=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var SZALLITAS = [{"i":6099151,"n":"MPL Csomagautomata","c":"pont","s":[ [0,15,990] ]},{"i":6099256,"n":"MPL Postán maradó","c":"pont","s":[ [0,15,990] ]},{"i":6099276,"n":"MPL Postapont (MOL kutak és COOP üzletek)","c":"pont","s":[ [0,15,1090] ]},{"i":6620166,"n":"PannonXP házhozszállítás","c":"haz","s":[ [0,5,1990],[5,10,2790],[10,20,3390],[20,30,4490],[30,40,6490],[40,50,7990],[50,60,8990],[60,80,12990],[80,100,15990] ]},{"i":5978638,"n":"MyGLS csomagpont","c":"pont","s":[ [0,5,1690],[5,10,1890],[10,20,2290] ]},{"i":5629089,"n":"Villányi üzletünkben","c":"bolt","s":[]}];

var MODELLEK = {"33963_20":{"u":"/shop_ordered/63361/pic/3d/teszt-pezsgosuveg.glb","t":1,"a":"Modell: „Bottle of Champagne”, Jarlan Perez (poly.pizza), CC BY 3.0"}};

var BIOCID = ["61028","20421","32070","60508","61584","60901","27240","27275","27276","30536","26849","26851","31959","31960","26675","21250","30179","20145","60975","21254","36662","61916","26850","01652","29112","25948","28050","25384","25383","35552","27110","61585","36736","27111","25252","50897","25253","25254","30537","16165","35777","29728","50833","29692","35712","35531","20034","19906","25014","35910"];
var MODEL_VIEWER = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js';

var gyoker = document.documentElement;
gyoker.classList.add('bb-adatlap');
var stilus = document.createElement('style');
stilus.id = 'bb-uj-adatlap';
stilus.textContent = "html.bb-adatlap{--bb-fo: #2a8511;--bb-fo-sotet: #1f6a0c;--bb-tinta: #221f1b;--bb-szurke: #6b645a;--bb-vonal: #e6e0d5;--bb-hatter: #f6f3ee;--bb-akcios: #c8281e}html.bb-adatlap:not(.bb-a-kesz) .artdet__pic-data{opacity: 0}html.bb-adatlap .artdet__pic-data{transition: opacity .15s}html.bb-a-kesz .artdet__name-outer .artdet__name-wrap .order-lg-1{display: none}html.bb-a-kesz .artdet__name-outer{margin-bottom: 8px !important}html.bb-a-kesz .artdet__name-outer .social-reviews-sku-wrap{justify-content: flex-end}html.bb-a-kesz .artdet__name-outer .social-reviews-sku-wrap \u003E .col:empty{display: none}html.bb-a-kesz .artdet__pic-data{position: relative}html.bb-a-kesz .artdet__pic-data-row{display: grid !important;grid-template-columns: minmax(0,1fr);grid-template-areas: \"kep\" \"fej\" \"jobb\" \"bal\";gap: 20px}html.bb-a-kesz .artdet__data-right-col,html.bb-a-kesz .artdet__data-right,html.bb-a-kesz .artdet__data-right-inner,html.bb-a-kesz .artdet__data-right-inner \u003E .row{display: contents}html.bb-a-kesz .artdet__img-data-left-col,html.bb-a-kesz .artdet__block-left,html.bb-a-kesz .artdet__block-right{flex: none;width: auto;max-width: none;min-width: 0;padding: 0;margin: 0}html.bb-a-kesz .artdet__img-data-left-col{grid-area: kep}html.bb-a-kesz #bb-a-fej{grid-area: fej}html.bb-a-kesz .artdet__block-left{grid-area: bal}html.bb-a-kesz .artdet__block-right{grid-area: jobb}html.bb-a-kesz #bb-a-szall{grid-area: szall}html.bb-a-kesz .artdet__pic-data-row \u003E *,html.bb-a-kesz .artdet__data-right-inner \u003E *,html.bb-a-kesz .artdet__data-right-inner \u003E .row \u003E *{align-self: start}html.bb-a-kesz .artdet__badges2.bb-a-ures{display: none !important}html.bb-a-kesz .artdet__pic-data-row{grid-template-areas: \"kep\" \"fej\" \"jobb\" \"szall\" \"bal\"}@media (min-width: 768px){html.bb-a-kesz .artdet__pic-data-row{grid-template-columns: minmax(0,1fr) minmax(320px,1fr);grid-template-rows: auto auto auto 1fr;grid-template-areas: \"fej fej\" \"kep jobb\" \"kep szall\" \"bal szall\";column-gap: 32px}}@media (min-width: 1200px){html.bb-a-kesz .artdet__breadcrumb \u003E .container,html.bb-a-kesz .artdet__name-outer \u003E .container,html.bb-a-kesz .artdet__pic-data-container,html.bb-a-kesz .artdet__sections \u003E section \u003E .container,html.bb-a-kesz #product_usp_element{max-width: 1560px;width: 100%}html.bb-a-kesz .artdet__pic-data-row{grid-template-columns: minmax(0,1.1fr) minmax(0,1fr) minmax(360px,1fr);grid-template-rows: auto auto 1fr;grid-template-areas: \"kep fej jobb\" \"kep bal jobb\" \"kep bal szall\";column-gap: 40px;row-gap: 18px}}html.bb-a-kesz .artdet__img-data-left{position: relative;background: #fff;border-radius: 16px;padding: 12px}html.bb-a-kesz .artdet__img-data-left \u003E #page_artdet_func_favourites{position: absolute;top: 12px;right: 12px;left: auto;bottom: auto;z-index: 5;transform: none !important;display: flex;align-items: center;justify-content: center;width: 44px;height: 44px;margin: 0 !important;padding: 0 !important;border: 1px solid var(--bb-vonal) !important;border-radius: 50%;background: #fff;font-size: 0 !important;color: var(--bb-tinta);box-shadow: 0 2px 8px rgba(34,31,27,.06)}html.bb-a-kesz .artdet__img-data-left \u003E #page_artdet_func_favourites::before,html.bb-a-kesz .artdet__img-data-left \u003E #page_artdet_func_favourites::after{margin: 0 !important;font-size: 18px}html.bb-a-kesz .artdet__img-data-left \u003E #page_artdet_func_favourites:hover{border-color: var(--bb-akcios) !important;color: var(--bb-akcios)}html.bb-a-kesz .artdet__img-data-left \u003E #page_artdet_func_compare{position: absolute;top: 64px;right: 12px;z-index: 5;display: flex;align-items: center;justify-content: center;width: 44px;height: 44px;margin: 0 !important;padding: 0 !important;border: 1px solid var(--bb-vonal) !important;border-radius: 50%;background: #fff;font-size: 0 !important;color: var(--bb-tinta);box-shadow: 0 2px 8px rgba(34,31,27,.06)}html.bb-a-kesz .artdet__img-data-left \u003E #page_artdet_func_compare::after{margin: 0 !important;font-size: 18px}html.bb-a-kesz .artdet__img-data-left \u003E #page_artdet_func_compare:hover{border-color: var(--bb-fo) !important;color: var(--bb-fo-sotet)}.bb-a-3d-gomb{position: absolute;top: 116px;right: 12px;z-index: 5;display: flex;align-items: center;justify-content: center;width: 44px;height: 44px;margin: 0;padding: 0;border: 1px solid var(--bb-vonal);border-radius: 50%;background: #fff;color: var(--bb-tinta);cursor: pointer;box-shadow: 0 2px 8px rgba(34,31,27,.06)}.bb-a-3d-gomb:hover{border-color: var(--bb-fo);color: var(--bb-fo-sotet)}html.bb-a-3d-nyitva{overflow: hidden}#bb-a-3d{position: fixed;inset: 0;z-index: 100000;display: flex;align-items: center;justify-content: center;padding: 24px;background: rgba(20,18,16,.55)}#bb-a-3d[hidden]{display: none}.bb-a-3d-belso{position: relative;width: min(1100px,100%);height: min(760px,100%);background: #f6f5f3;border-radius: 18px;overflow: hidden}.bb-a-3d-belso model-viewer{width: 100%;height: 100%;--poster-color: transparent}.bb-a-3d-bezar,.bb-a-3d-teljes,.bb-a-3d-ar{position: absolute;display: flex;align-items: center;justify-content: center;border: 0;background: #fff;color: var(--bb-tinta);cursor: pointer;box-shadow: 0 2px 10px rgba(0,0,0,.12)}.bb-a-3d-bezar{top: 14px;right: 14px;width: 44px;height: 44px;border-radius: 50%}.bb-a-3d-teljes,.bb-a-3d-ar{right: 14px;height: 40px;padding: 0 16px;border-radius: 999px;font: 600 14px/1 inherit}.bb-a-3d-teljes{bottom: 44px}.bb-a-3d-ar{bottom: 92px;background: var(--bb-fo);color: #fff}.bb-a-3d-sugo{position: absolute;left: 16px;bottom: 12px;right: 180px;margin: 0;font-size: 12px;color: var(--bb-szurke)}@media (max-width: 767.98px){#bb-a-3d{padding: 0}.bb-a-3d-belso{width: 100%;height: 100%;border-radius: 0}.bb-a-3d-sugo{right: 16px;bottom: 90px}.bb-a-3d-teljes{display: none}.bb-a-3d-ar{left: 16px;right: 16px;bottom: 24px;height: 48px}}html.bb-a-kesz .artdet__img-data-left \u003E #artdet__video{order: 3;flex: 0 0 100%;width: 100%;margin-top: 12px;padding-top: 14px;border-top: 1px solid var(--bb-vonal)}html.bb-a-kesz #artdet__video .custom-section,html.bb-a-kesz #artdet__video .custom-section__content{margin: 0 !important;padding: 0 !important;border: 0 !important;background: none !important;box-shadow: none !important}html.bb-a-kesz #artdet__video .custom-section__content \u003E div{display: flex;flex-wrap: wrap;align-items: stretch;gap: 8px;max-width: none !important;font-family: inherit !important}html.bb-a-kesz #artdet__video h3{flex: 0 0 100%;margin: 0 0 2px !important;font-size: 12px !important;font-weight: 700;letter-spacing: .04em;text-transform: uppercase;color: var(--bb-szurke) !important}html.bb-a-kesz #artdet__video table,html.bb-a-kesz #artdet__video tbody{display: contents}html.bb-a-kesz #artdet__video tr{position: relative;display: inline-flex;align-items: center;gap: 8px;padding: 8px 14px 8px 10px;border: 1px solid var(--bb-vonal) !important;border-radius: 10px;background: #fff;transition: border-color .15s,background-color .15s}html.bb-a-kesz #artdet__video tr:hover{border-color: var(--bb-fo) !important;background: #f4f9f1}html.bb-a-kesz #artdet__video td{padding: 0 !important;width: auto !important;border: 0 !important}html.bb-a-kesz #artdet__video td img{width: 16px !important;height: 16px !important;display: block;opacity: .75}html.bb-a-kesz #artdet__video a{font-size: 13px;font-weight: 600;color: var(--bb-tinta);text-decoration: none}html.bb-a-kesz #artdet__video a::after{content: \"\";position: absolute;inset: 0}html.bb-a-kesz #artdet__video tr:hover a{color: var(--bb-fo-sotet)}.bb-a-bkep-keret{display: none}@media (min-width: 1200px){html.bb-a-kesz .artdet__img-data-left.bb-a-van-bkep{display: flex;flex-direction: row;flex-wrap: wrap;gap: 12px;align-items: flex-start}html.bb-a-kesz .bb-a-van-bkep \u003E .artdet__img-inner{flex: 1 1 calc(100% - 84px);min-width: 0;order: 2}html.bb-a-kesz .bb-a-van-bkep \u003E .js-thumbs{display: none !important}html.bb-a-kesz .bb-a-van-bkep \u003E .bb-a-bkep-keret{display: block;position: relative;order: 1;width: 72px;flex: 0 0 72px}.bb-a-bkepek{display: flex;flex-direction: column;gap: 10px;max-height: 520px;overflow-y: auto;scrollbar-width: none}.bb-a-bkepek::-webkit-scrollbar{display: none}.bb-a-bkep-nyil{position: absolute;left: 50%;z-index: 2;transform: translateX(-50%);display: flex;align-items: center;justify-content: center;width: 36px;height: 36px;padding: 0;border: 1px solid var(--bb-vonal);border-radius: 50%;background: #fff;color: var(--bb-tinta);box-shadow: 0 2px 10px rgba(34,31,27,.15);cursor: pointer}.bb-a-bkep-nyil:hover{border-color: var(--bb-fo);color: var(--bb-fo-sotet)}.bb-a-bkep-nyil[hidden]{display: none}.bb-a-bkep-nyil--fel{top: -6px}.bb-a-bkep-nyil--fel svg{transform: rotate(180deg)}.bb-a-bkep-nyil--le{bottom: -6px}.bb-a-bkepek button{width: 72px;height: 72px;padding: 4px;flex: 0 0 72px;border: 1px solid var(--bb-vonal);border-radius: 10px;background: #fff;cursor: pointer;transition: border-color .15s}.bb-a-bkepek button:hover{border-color: #bdb5a6}.bb-a-bkepek button[aria-current=\"true\"]{border: 2px solid var(--bb-fo);padding: 3px}.bb-a-bkepek img{width: 100%;height: 100%;object-fit: contain;display: block}}#bb-a-fej{display: flex;flex-direction: column;gap: 10px}#bb-a-fej .artdet__name{margin: 0 !important;font-size: 26px;line-height: 1.25;font-weight: 800;letter-spacing: -.01em;color: var(--bb-tinta)}@media (max-width: 767.98px){#bb-a-fej .artdet__name{font-size: 22px;line-height: 1.25}}.bb-a-sor{display: flex;flex-wrap: wrap;align-items: center;gap: 6px 16px;font-size: 13px;color: var(--bb-szurke)}#bb-a-fej .artdet__sku{font-size: 13px;color: var(--bb-szurke) !important;margin: 0}#bb-a-fej #bb-live-viewers{margin: 0 !important}#bb-a-fej .artdet__badges2{margin: 0 !important}.bb-a-cimkek{display: flex;flex-wrap: wrap;gap: 8px;margin-top: 2px}.bb-a-cimkek a{font-size: 12px;line-height: 1.3;color: var(--bb-tinta);text-decoration: none;background: #fff;border: 1px solid #d9d2c5;border-radius: 8px;padding: 5px 10px}.bb-a-cimkek a:hover{border-color: var(--bb-fo);color: var(--bb-fo-sotet)}#bb-a-fej #artdet__type{margin: 8px 0 0 !important;padding: 16px 0 0 !important;border-top: 1px solid var(--bb-vonal)}#bb-a-fej .product-type__item + .product-type__item{margin-top: 16px}#bb-a-fej .product-type__title{font-size: 15px;font-weight: 700;margin-bottom: 8px;color: var(--bb-tinta)}html.bb-a-kesz .artdet__block-left-inner{display: flex;flex-direction: column}html.bb-a-kesz .artdet__block-left-inner \u003E #artdet__param-spec{order: 1;margin-bottom: 20px !important}html.bb-a-kesz .artdet__block-left-inner \u003E #artdet__short-descrition{order: 2}html.bb-a-kesz .artdet__block-left-inner \u003E *{order: 3}html.bb-a-kesz #artdet__param-spec{border-top: 1px solid var(--bb-vonal)}html.bb-a-kesz #artdet__param-spec .artdet__spec-params{display: block;margin: 0 !important}html.bb-a-kesz #artdet__param-spec .artdet__spec-params \u003E div{max-width: none;width: auto;flex: none;padding: 0}html.bb-a-kesz #artdet__param-spec .artdet__spec-param{padding: 9px 0 !important;border-bottom: 1px solid var(--bb-vonal);font-size: 15px}html.bb-a-kesz #artdet__param-spec .artdet__spec-param \u003E .row{flex-wrap: nowrap}html.bb-a-kesz #artdet__param-spec .artdet__spec-param-title{color: var(--bb-szurke);font-weight: 400}html.bb-a-kesz #artdet__param-spec .artdet__spec-param-value{color: var(--bb-tinta);font-weight: 600}html.bb-a-kesz #artdet__param-spec .scroll-to-btn-wrap{margin-top: 10px}html.bb-a-kesz #artdet__param-spec .scroll-to-btn,html.bb-a-kesz #artdet__short-descrition .scroll-to-btn{padding: 0;font-size: 14px;font-weight: 600;color: var(--bb-tinta);text-decoration: underline;background: none;border: 0;min-height: 0}html.bb-a-kesz #artdet__short-descrition{font-size: 15px;line-height: 1.55}html.bb-a-kesz #artdet__functions{order: 9;display: flex;flex-wrap: wrap;gap: 8px;margin: 20px 0 0 !important;padding: 16px 0 0 !important;border: 0;border-top: 1px solid var(--bb-vonal)}html.bb-a-kesz #artdet__functions .product__func-btn{display: inline-flex;align-items: center;gap: 8px;margin: 0 !important;width: auto !important;height: auto !important;min-height: 40px;padding: 8px 14px !important;white-space: nowrap;border: 1px solid var(--bb-vonal) !important;border-radius: 10px;background: #fff;font-size: 13px;line-height: 1.2;color: #3d3831;transition: border-color .15s,color .15s}html.bb-a-kesz #artdet__functions .product__func-btn:hover{border-color: var(--bb-fo) !important;color: var(--bb-fo-sotet)}html.bb-a-kesz #artdet__functions .product__func-btn::after{margin: 0 !important;font-size: 16px}html.bb-a-kesz .artdet__block-right-inner{position: static !important;display: flex;flex-direction: column;background: #fff;border: 1px solid var(--bb-vonal);border-radius: 16px;padding: 22px}html.bb-a-kesz .artdet__block-right-inner \u003E *{margin-top: 0 !important;margin-bottom: 14px !important}html.bb-a-kesz .artdet__block-right-inner \u003E :last-child{margin-bottom: 0 !important}html.bb-a-kesz .artdet__block-right-inner \u003E .artdet__price-and-countdown{margin-left: 0;margin-right: 0}html.bb-a-kesz .artdet__block-right .artdet__price-base-value,html.bb-a-kesz .artdet__block-right .artdet__price-sale-value{display: flex;flex-wrap: wrap;align-items: baseline;column-gap: 12px}html.bb-a-kesz .artdet__block-right .artdet__prices br{display: none}html.bb-a-kesz .artdet__block-right .artdet__prices .price-gross-format{order: 1}html.bb-a-kesz .artdet__block-right .artdet__prices .price-gross-format .price-gross,html.bb-a-kesz .artdet__block-right .artdet__prices .price-gross-format .price-currency{font-size: 36px;font-weight: 800;letter-spacing: -.02em;line-height: 1.1;color: var(--bb-tinta)}html.bb-a-kesz .artdet__block-right .artdet__price-base-value \u003E span:first-child,html.bb-a-kesz .artdet__block-right .artdet__price-sale-value \u003E span:first-child{order: 0;flex-basis: 100%}html.bb-a-kesz .artdet__block-right .artdet__price-base-value \u003E span:nth-of-type(2),html.bb-a-kesz .artdet__block-right .artdet__price-sale-value \u003E span:nth-of-type(2){order: 2;flex-basis: 100%;font-size: 13px !important;color: var(--bb-szurke);margin-top: 4px}html.bb-a-kesz .artdet__block-right .artdet__price-sale .price-gross-format .price-gross,html.bb-a-kesz .artdet__block-right .artdet__price-sale .price-gross-format .price-currency{color: var(--bb-akcios)}html.bb-a-kesz .artdet__block-right .artdet__price-base.has-sale .price-gross-format .price-gross,html.bb-a-kesz .artdet__block-right .artdet__price-base.has-sale .price-gross-format .price-currency,html.bb-a-kesz .artdet__block-right .product-price--base.has-sale .price-gross,html.bb-a-kesz .artdet__block-right .product-price--base.has-sale .price-currency{font-size: 17px;font-weight: 400;color: #6b645a}html.bb-a-kesz .bb-a-pirula .artdet__prices{display: flex;flex-direction: column;align-items: flex-start;gap: 2px}html.bb-a-kesz .bb-a-pirula .artdet__prices \u003E .col-auto{display: none}html.bb-a-kesz .bb-a-pirula .artdet__prices \u003E .col{padding: 0;flex: none;max-width: none;width: 100%}html.bb-a-kesz .bb-a-pirula .bb-a-arsor{display: flex;align-items: center;flex-wrap: wrap;gap: 8px}html.bb-a-kesz .bb-a-pirula .bb-a-arsor .artdet__price-base{display: inline-flex;align-items: center;gap: 6px;margin: 0}html.bb-a-kesz .bb-a-pirula .bb-a-arsor .artdet__price-base-value{display: inline-flex}html.bb-a-kesz .bb-a-pirula .bb-a-arsor .artdet__price-base-value \u003E span[style*=\"color\"]{display: none}html.bb-a-kesz .bb-a-pirula .bb-a-arsor .artdet__price-base .price-gross,html.bb-a-kesz .bb-a-pirula .bb-a-arsor .artdet__price-base .price-currency{font-size: 16px !important;font-weight: 400 !important;color: #6b645a !important}html.bb-a-kesz .bb-a-pirula .bb-a-arsor .icon--info{color: #6b645a;font-size: 15px;cursor: help}html.bb-a-kesz .bb-a-pirula .bb-a-arsor .badge--sale{display: inline-flex;align-items: center;width: auto !important;height: auto !important;min-width: 0;margin: 0 !important;padding: 3px 10px !important;border: 0 !important;border-radius: 999px !important;background: var(--bb-akcios) !important;color: #fff !important;font-size: 14px !important;font-weight: 800;line-height: 1.2}html.bb-a-kesz .bb-a-pirula .bb-a-arsor .badge--sale *{color: #fff !important;font-size: 14px !important}html.bb-a-kesz .bb-a-pirula .artdet__price-discount{display: flex;flex-direction: column;align-items: flex-start;margin-top: 2px}html.bb-a-kesz .bb-a-pirula .artdet__price-discount br{display: none}html.bb-a-kesz .bb-a-pirula .artdet__price-discount .price-gross-format .price-gross,html.bb-a-kesz .bb-a-pirula .artdet__price-discount .price-gross-format .price-currency{font-size: 36px;font-weight: 800;letter-spacing: -.02em;line-height: 1.1;color: var(--bb-tinta) !important}html.bb-a-kesz .bb-a-pirula .artdet__price-discount .price-gross-format{order: 0}html.bb-a-kesz .bb-a-pirula .artdet__price-discount \u003E span[style*=\"color\"]{order: 2;font-size: 13px !important;color: var(--bb-szurke) !important;margin-top: 4px}html.bb-a-kesz .bb-a-pirula .artdet__discount-texts{margin-top: 10px}html.bb-a-kesz .bb-a-pirula .artdet__discount-saving{display: inline-flex;gap: 6px;padding: 5px 12px;border-radius: 8px;background: #fdecec;color: #a32d2d;font-size: 14px}html.bb-a-kesz .bb-a-pirula .artdet__discount-saving *{color: #a32d2d !important;font-size: 14px !important}html.bb-a-kesz .bb-a-pirula .artdet__discount-saving__value{font-weight: 800}html.bb-a-kesz .bb-a-pirula .artdet__price-discount-period{font-size: 12px;color: var(--bb-szurke);margin-top: 6px}html.bb-a-kesz .artdet__block-right .artdet__price-unit{font-size: 13px;color: var(--bb-szurke);margin-top: 4px}html.bb-a-kesz .artdet__block-right .artdet__price-unit br,html.bb-a-kesz .artdet__block-right .artdet__price-unit \u003E span[style*=\"color\"]{display: none}html.bb-a-kesz .artdet__block-right .artdet__price-unit span{font-size: 13px !important;font-weight: 400 !important}html.bb-a-kesz .artdet__block-right .artdet__price-unit.bb-a-rejt{display: none}html.bb-a-kesz .artdet__block-right-inner .artdet__stock{align-self: flex-start}html.bb-a-kesz .artdet__block-right-inner #artdet__cart{margin-left: 0;margin-right: 0;flex-wrap: nowrap}html.bb-a-kesz .artdet__block-right-inner .artdet__cart-btn-col{min-width: 0;flex: 1 1 0}html.bb-a-kesz .artdet__block-right-inner .artdet__cart-btn{width: 100%;min-width: 0}html.bb-a-kesz .artdet__block-right-inner .artdet__virtual-point-highlighted{font-size: 13px;color: var(--bb-szurke)}html.bb-a-kesz .artdet__block-right-inner .artdet__virtual-point-highlighted__content{color: var(--bb-tinta);font-weight: 700}html.bb-a-kesz .artdet__block-right-inner .artdet__subscribe-btn{padding: 0;min-height: 0;border: 0;background: none;font-size: 13px;color: var(--bb-tinta);text-decoration: underline;box-shadow: none}html.bb-a-kesz .artdet__block-right-inner .bba-buybox{margin-top: 4px !important}#bb-a-szall{background: #fff;border: 1px solid var(--bb-vonal);border-radius: 16px;padding: 6px 22px;font-size: 14px;color: #3d3831}.bb-a-szcsop{padding: 14px 0}.bb-a-szcsop + .bb-a-szcsop{border-top: 1px solid var(--bb-vonal)}.bb-a-szcim{display: flex;align-items: center;gap: 10px;margin: 0 0 8px;font-size: 15px;font-weight: 700;color: var(--bb-tinta)}.bb-a-szcim svg{flex: 0 0 20px;color: var(--bb-fo)}.bb-a-szcim a{margin-left: auto;font-size: 13px;font-weight: 400;color: var(--bb-fo-sotet);text-decoration: underline}.bb-a-szlista{display: grid;grid-template-columns: minmax(0,1fr) auto;gap: 6px 12px;margin: 0}.bb-a-szlista dt{font-weight: 400;margin: 0}.bb-a-szlista dd{margin: 0;font-weight: 700;color: var(--bb-tinta);text-align: right;white-space: nowrap}.bb-a-szlista dd.bb-a-ingyen{color: var(--bb-fo-sotet)}.bb-a-szmegj{margin: 8px 0 0;font-size: 12px;color: var(--bb-szurke)}html.bb-a-van-szall #artdet__warehouses{display: none !important}.bb-a-atvet{display: flex;align-items: center;gap: 8px;margin: 8px 0 0;font-weight: 600;color: var(--bb-szurke)}.bb-a-atvet--ok{color: var(--bb-fo-sotet)}.bb-a-atvet--ok::before{content: \"\";flex: 0 0 14px;width: 14px;height: 8px;margin-top: -4px;border-left: 2.5px solid currentColor;border-bottom: 2.5px solid currentColor;transform: rotate(-45deg)}.bb-a-sajat-gomb{padding: 5px 12px;border: 1px solid var(--bb-fo);border-radius: 8px;background: #fff;font: 600 13px/1.2 inherit;color: var(--bb-fo-sotet);cursor: pointer}.bb-a-sajat-gomb:hover,.bb-a-sajat-gomb[aria-expanded=\"true\"]{background: var(--bb-fo);color: #fff}.bb-a-sajat{margin-top: 12px}.bb-a-sajat[hidden]{display: none}.bb-a-sajat #bb-zip-artdet{margin: 0 !important;padding: 14px !important;background: #f6f3ee;border-radius: 12px;border: 0 !important}.bb-a-sajat .bb-zip__logo,.bb-a-sajat #bb-zip-artdet::before{display: none !important}.bb-a-sajat .bb-zip__head{padding-left: 0 !important;gap: 0 !important}html.bb-a-kesz .artdet-tabs,html.bb-a-kesz .nav-tabs-accordion .pane-header{display: none !important}html.bb-a-kesz .nav-tabs-accordion .tab-panes{display: block}html.bb-a-kesz .nav-tabs-accordion .tab-pane{display: grid !important;opacity: 1 !important;position: static !important;visibility: visible !important;height: auto !important;transform: none !important;grid-template-columns: minmax(0,1fr);gap: 16px;border-top: 1px solid #ddd5c7;padding: 28px 0;margin: 0}html.bb-a-kesz .nav-tabs-accordion .tab-pane::before{content: attr(data-bb-cim);font-size: 22px;font-weight: 800;line-height: 1.2;color: var(--bb-tinta)}html.bb-a-kesz .nav-tabs-accordion .tab-pane \u003E .tab-pane__container{max-width: 880px;width: auto;padding: 0;margin: 0}html.bb-a-kesz #pane-data .data__item{flex: 0 0 100%;max-width: 100%}@media (min-width: 768px){html.bb-a-kesz #pane-data .data__item{flex: 0 0 50%;max-width: 50%}}html.bb-a-kesz #pane-data .data__item-param-inner \u003E .row{border-bottom: 1px solid var(--bb-vonal)}html.bb-a-kesz #pane-data .data__item-title{color: var(--bb-szurke)}html.bb-a-kesz #pane-data .data__item-value{font-weight: 600}html.bb-a-kesz #pane-reviews .text-center{text-align: left !important}#bb-a-google{border-top: 1px solid #ddd5c7;padding: 28px 0}#bb-a-google \u003E *{max-width: 1120px;margin: 0 auto !important}@media (min-width: 992px){html.bb-a-kesz .nav-tabs-accordion .tab-pane{grid-template-columns: 240px minmax(0,1fr);gap: 40px;padding: 36px 0}html.bb-a-kesz .nav-tabs-accordion .tab-pane::before{font-size: 26px}}html.bb-a-kesz #artdet__fixed-cart{background: #fff;border-top: 1px solid var(--bb-vonal);box-shadow: 0 -6px 20px rgba(34,31,27,.08)}html.bb-a-kesz #artdet__fixed-cart.bb-a-lathato{transform: none !important}html.bb-a-kesz #artdet__fixed-cart .fixed-cart__price-base-value br,html.bb-a-kesz #artdet__fixed-cart .fixed-cart__price-base-value \u003E span:not(.price-gross-format){display: none}html.bb-a-kesz #artdet__fixed-cart .price-gross,html.bb-a-kesz #artdet__fixed-cart .price-gross-format .price-currency{font-size: 17px;font-weight: 800;color: var(--bb-tinta)}html.bb-a-kesz #artdet__fixed-cart .fixed-cart__name{font-weight: 600}html.bb-a-kesz #artdet__fixed-cart .fixed-cart__btn{min-height: 48px;padding: 0 28px;border-radius: 10px;font-weight: 700}@media (max-width: 767.98px){html.bb-a-mkep .artdet__img-data-left-col{position: sticky;top: var(--bb-a-mkep-teteje,0px);z-index: 0;will-change: opacity}html.bb-a-mkep #bb-a-fej,html.bb-a-mkep .artdet__block-right,html.bb-a-mkep #bb-a-szall,html.bb-a-mkep .artdet__block-left{position: relative;z-index: 1}html.bb-a-mkep #bb-a-fej{background: var(--bb-a-lap,#fff);border-radius: 18px 18px 0 0;padding-top: 16px;margin-top: -8px;box-shadow: 0 -10px 18px -12px rgba(34,31,27,.25)}html.bb-a-mkep .artdet__block-right,html.bb-a-mkep .artdet__block-left{background: var(--bb-a-lap,#fff)}html.bb-a-mkep .artdet__block-right,html.bb-a-mkep #bb-a-szall,html.bb-a-mkep .artdet__block-left{box-shadow: 0 -20px 0 0 var(--bb-a-lap,#fff)}}";
(document.head || gyoker).appendChild(stilus);

var magyar = (gyoker.lang || 'hu').slice(0, 2) === 'hu';
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function kesz() { gyoker.classList.add('bb-a-kesz'); }
setTimeout(kesz, 3000);

function fej(tartalom) {
var belso = $('.artdet__data-right-inner', tartalom);
var cim = $('.artdet__name', tartalom);
if (!belso || !cim) return;
var doboz = document.getElementById('bb-a-fej');
if (!doboz) {
doboz = document.createElement('div');
doboz.id = 'bb-a-fej';
belso.insertBefore(doboz, belso.firstChild);
}
if (cim.parentNode !== doboz) doboz.insertBefore(cim, doboz.firstChild);

var sor = $('.bb-a-sor', doboz);
if (!sor) {
sor = document.createElement('div');
sor.className = 'bb-a-sor';
doboz.appendChild(sor);
}
var cikkszam = $('.artdet__sku', tartalom);
if (cikkszam && cikkszam.parentNode !== sor) sor.insertBefore(cikkszam, sor.firstChild);

var jelvenyek = $('.artdet__badges2', tartalom);
if (jelvenyek) {
jelvenyek.classList.toggle('bb-a-ures', !jelvenyek.children.length);
if (jelvenyek.parentNode !== doboz) doboz.insertBefore(jelvenyek, doboz.firstChild);
}

if (!$('.bb-a-cimkek', doboz)) {
var linkek = $$('.breadcrumb--desktop .breadcrumb-item a:not(.breadcrumb--home)');
if (linkek.length) {
var cimkek = document.createElement('div');
cimkek.className = 'bb-a-cimkek';
linkek.forEach(function (a) {
var uj = document.createElement('a');
uj.href = a.href;
uj.textContent = a.textContent.trim();
cimkek.appendChild(uj);
});
doboz.appendChild(cimkek);
}
}
}

function valtozatok(tartalom) {
var tipus = document.getElementById('artdet__type');
var doboz = document.getElementById('bb-a-fej');
if (tipus && doboz && tipus.parentNode !== doboz) doboz.appendChild(tipus);
}

function funkciok(tartalom) {
var gombok = document.getElementById('artdet__functions');
var bal = $('.artdet__block-left-inner', tartalom);
if (gombok && bal && gombok.parentNode !== bal) bal.appendChild(gombok);
}

function latogatok() {
var jel = document.getElementById('bb-live-viewers');
var sor = $('#bb-a-fej .bb-a-sor');
if (jel && sor && jel.parentNode !== sor) sor.appendChild(jel);
return !!jel;
}

function ar(tartalom) {
var ar = $('.artdet__price-and-countdown', tartalom);
var doboz = $('.artdet__block-right-inner', tartalom);
if (!ar || !doboz) return;
if (ar.parentNode !== doboz) doboz.insertBefore(ar, doboz.firstChild);

var alap = $('.artdet__price-base', ar);
if (alap && $('.artdet__price-sale, .product-price--sale', ar)) alap.classList.add('has-sale');

var egyseg = $('.artdet__price-unit', ar);
var fo = $('.product-price--sale .price-gross, .artdet__price-sale .price-gross', ar) || $('.artdet__price-base .price-gross', ar);
var egysegAr = egyseg && $('.price-gross', egyseg);
if (egyseg && fo && egysegAr) {
egyseg.classList.toggle('bb-a-rejt', egysegAr.textContent.trim() === fo.textContent.trim());
}
if (alap && alap.classList.contains('has-sale')) akciosAr(ar, alap);
}

var UJAR_MINDENKI = true;
function akciosAr(ar, alap) {
var kapcsolo = null;
try {
var m = location.search.match(/[?&]ujar=([01])/);
if (m) localStorage.setItem('bbUjAr', m[1]);
kapcsolo = localStorage.getItem('bbUjAr');
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (kapcsolo === '0' || (kapcsolo !== '1' && !UJAR_MINDENKI)) return;
var arak = $('.artdet__prices', ar);
if (!arak || $('.bb-a-arsor', arak)) return;
var sor = document.createElement('div');
sor.className = 'bb-a-arsor';
arak.insertBefore(sor, arak.firstChild);
sor.appendChild(alap);
var jelveny = $('.badge--sale', arak);
if (jelveny) sor.appendChild(jelveny);
ar.classList.add('bb-a-pirula');
}

function kedvenc(tartalom) {
var kep = $('.artdet__img-data-left', tartalom);
if (!kep) return;
['#page_artdet_func_favourites', '#page_artdet_func_compare'].forEach(function (s) {
var gomb = $(s, tartalom);
if (gomb && gomb.parentNode !== kep) kep.appendChild(gomb);
});
}

function belyegkepek(tartalom) {
var bal = $('.artdet__img-data-left', tartalom);
var fo = $('.js-alts', tartalom);
if (!bal || !fo || $('.bb-a-bkepek', bal)) return;
var kepek = $$('.js-thumbs img', bal);
if (kepek.length < 2) return;
var flick = window.Flickity && window.Flickity.data ? window.Flickity.data(fo) : null;
if (!flick) return; /* a lapozó még nem indult el: a következő körben újra */

var lista = document.createElement('div');
lista.className = 'bb-a-bkepek';
kepek.forEach(function (kep, i) {
var gomb = document.createElement('button');
gomb.type = 'button';
gomb.setAttribute('aria-label', (magyar ? 'Kép ' : 'Image ') + (i + 1));
var uj = document.createElement('img');
uj.src = kep.currentSrc || kep.getAttribute('data-src') || kep.src;
uj.alt = '';
gomb.appendChild(uj);
gomb.addEventListener('click', function () { flick.select(i); });
lista.appendChild(gomb);
});
var keret = document.createElement('div');
keret.className = 'bb-a-bkep-keret';
var NYIL = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
function nyil(irany) {
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-a-bkep-nyil bb-a-bkep-nyil--' + irany;
g.setAttribute('aria-label', irany === 'fel' ? (magyar ? 'Előző képek' : 'Previous images') : (magyar ? 'További képek' : 'More images'));
g.innerHTML = NYIL;
g.addEventListener('click', function () {
lista.scrollBy({ top: (irany === 'fel' ? -1 : 1) * (lista.clientHeight - 60), behavior: 'smooth' });
});
return g;
}
var fel = nyil('fel'), le = nyil('le');
function nyilak() {
fel.hidden = lista.scrollTop <= 2;
le.hidden = lista.scrollTop + lista.clientHeight >= lista.scrollHeight - 2;
}
lista.addEventListener('scroll', nyilak, { passive: true });
window.addEventListener('resize', nyilak);
keret.appendChild(fel);
keret.appendChild(lista);
keret.appendChild(le);

function jelol() {
$$('button', lista).forEach(function (g, i) {
var aktiv = i === flick.selectedIndex;
g.setAttribute('aria-current', aktiv ? 'true' : 'false');
if (aktiv && (g.offsetTop < lista.scrollTop || g.offsetTop + g.offsetHeight > lista.scrollTop + lista.clientHeight)) {
lista.scrollTo({ top: g.offsetTop - 8, behavior: 'smooth' });
}
});
}
flick.on('select', jelol);
bal.appendChild(keret);
bal.classList.add('bb-a-van-bkep');
jelol();
nyilak();
flick.resize();
}

function suly(tartalom) {
var ertek = $('.data__item-weight .data__item-value', tartalom);
var cimke = '';
if (!ertek) {
$$('.artdet__spec-param, .data__item-param', tartalom).some(function (sor) {
var c = $('.artdet__spec-param-title, .artdet__param-title', sor);
if (!c || !/súly|tömeg/i.test(c.textContent)) return false;
ertek = $('.artdet__spec-param-value, .artdet__param-value', sor);
cimke = c.textContent;
return !!ertek;
});
}
if (!ertek) return null;
var t = ertek.textContent.replace(/\s/g, '').replace(',', '.');
var m = t.match(/([\d.]+)(kg|g|gramm)?/i);
if (!m) return null;
var szam = parseFloat(m[1]);
var egyseg = (m[2] || (/kg/i.test(cimke) ? 'kg' : /gramm|\(g\)/i.test(cimke) ? 'g' : '')).toLowerCase();
if (!egyseg) return null;
return egyseg === 'kg' ? szam : szam / 1000;
}
function egyediFutarDij(tartalom) {
var leiras = $('#artdet__short-descrition', tartalom);
if (!leiras) return null;
var m = leiras.textContent.replace(/\s+/g, ' ')
.match(/szállítás(?:i)?\s+díja[^0-9]{0,40}?(?:br\.?|bruttó)?\s*([0-9][0-9 .  ]*)\s*Ft(\s*\/\s*db)?/i);
if (!m) return null;
var ft = parseInt(m[1].replace(/[^0-9]/g, ''), 10);
return ft > 0 ? forint(ft) + (m[2] ? '/db' : '') : null;
}
function forint(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft'; }
function dij(mod, kg) {
if (!mod.s.length) return { szoveg: magyar ? 'Ingyenes' : 'Free', ingyen: true, ft: 0 };
function kiir(ft, tol) {
if (ft === 0) return { szoveg: magyar ? 'Ingyenes' : 'Free', ingyen: true, ft: 0 };
return { szoveg: forint(ft) + (tol ? (magyar ? '-tól' : '+') : ''), ft: ft };
}
if (kg === null || mod.t) {
var min = Math.min.apply(null, mod.s.map(function (s) { return s[2]; }));
if (kg !== null && (kg < mod.s[0][0] || kg > mod.s[mod.s.length - 1][1])) return null;
return kiir(min, min > 0);
}
for (var i = 0; i < mod.s.length; i++) {
if (kg >= mod.s[i][0] && kg <= mod.s[i][1]) return kiir(mod.s[i][2], false);
if (kg < mod.s[i][0]) return i ? kiir(mod.s[i][2], false) : null;
}
return null;
}
var IKON = {
bolt: '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',
pont: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v6M15 4v6"/>',
haz: '<path d="M1 4h14v12H1zM15 9h4l3 3v4h-7z"/><circle cx="6" cy="18.5" r="2"/><circle cx="18" cy="18.5" r="2"/>'
};
var CSOPORT = [
{ k: 'bolt', cim: 'Személyes átvétel' },
{ k: 'pont', cim: 'Csomagpont, automata' },
{ k: 'haz', cim: 'Házhozszállítás' }
];
function tiltottak(tartalom) {
var adat = window.BB_SZALL_TILT;
if (!adat || !adat.t) return null;
var elem = $('.artdet__sku-value', tartalom);
var sku = elem ? elem.textContent.trim() : '';
var ki = {};
Object.keys(adat.t).forEach(function (kulcs) {
if (('|' + adat.t[kulcs] + '|').indexOf('|' + sku + '|') === -1) return;
kulcs.split('.').forEach(function (azon) { ki[azon] = true; });
});
return ki;
}

function szallitas(tartalom) {
if (!magyar || !SZALLITAS.length || document.getElementById('bb-a-szall')) return;
var racs = $('.artdet__pic-data-row', tartalom);
if (!racs) return;
var kg = suly(tartalom);
var tiltas = tiltottak(tartalom);
var doboz = document.createElement('div');
doboz.id = 'bb-a-szall';
CSOPORT.forEach(function (cs) {
var sorok = '';
var valaszthato = [];
SZALLITAS.forEach(function (mod) {
if (mod.c !== cs.k) return;
if (tiltas ? tiltas[mod.i] : mod.c !== 'bolt') return;
var d = dij(mod, kg);
if (d) valaszthato.push({ mod: mod, d: d });
});
var egyedi = cs.k === 'haz' && egyediFutarDij(tartalom);
if (egyedi) {
valaszthato = [{ mod: { n: 'Futárszolgálat' }, d: { szoveg: egyedi, ft: 0 } }];
}
if (cs.k === 'haz' && valaszthato.length > 1) {
valaszthato.sort(function (a, b) { return a.d.ft - b.d.ft; });
valaszthato = valaszthato.slice(0, 1);
}
valaszthato.forEach(function (v) {
sorok += '<dt>' + v.mod.n.replace(/[<&]/g, '') + '</dt><dd' + (v.d.ingyen ? ' class="bb-a-ingyen"' : '') + '>' + v.d.szoveg + '</dd>';
});
if (cs.k === 'haz') {
sorok += '<dt>Saját autónkkal, szállítási területünkön</dt>' +
'<dd><button type="button" class="bb-a-sajat-gomb" aria-expanded="false">Kivisszük?</button></dd>';
}
if (!sorok) return;
doboz.insertAdjacentHTML('beforeend',
'<div class="bb-a-szcsop bb-a-szcsop--' + cs.k + '"><h2 class="bb-a-szcim"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
IKON[cs.k] + '</svg>' + cs.cim +
(cs.k !== 'bolt' ? '<a href="/shop_contact.php?tab=shipping">Részletek</a>' : '') +
'</h2><dl class="bb-a-szlista">' + sorok + '</dl>' +
(cs.k === 'bolt' ? '<p class="bb-a-atvet" hidden></p>' : '') +
(cs.k === 'haz' ? '<div class="bb-a-sajat" hidden></div>' : '') +
'</div>');
});
if (!doboz.children.length) return;
var megjegyzes = !tiltas ? 'A választható szállítási módokat és díjukat a pénztárban látja.'
: egyediFutarDij(tartalom) ? ''
: kg === null ? 'A pontos díj a puttony súlyától függ.' : 'Egy darab díja; több darabnál a puttony össztömege számít.';
if (megjegyzes) doboz.insertAdjacentHTML('beforeend', '<p class="bb-a-szmegj">' + megjegyzes + '</p>');
var gomb = $('.bb-a-sajat-gomb', doboz);
if (gomb) gomb.addEventListener('click', function () {
var tarto = $('.bb-a-sajat', doboz);
var nyitva = tarto.hidden;
tarto.hidden = !nyitva;
gomb.setAttribute('aria-expanded', nyitva ? 'true' : 'false');
gomb.textContent = nyitva ? 'Bezár' : 'Kivisszük?';
var mezo = nyitva && $('.bb-zip__input', tarto);
if (mezo) mezo.focus();
});
racs.appendChild(doboz);
document.documentElement.classList.add('bb-a-van-szall');
}

function atvetel() {
var sor = $('#bb-a-szall .bb-a-atvet');
var uzlet = document.getElementById('artdet__warehouses');
if (!sor || !uzlet) return;
var atveheto = $('.bba-pickup', uzlet);
var keszlet = $('.artdet__warehouse-quantity', uzlet);
var szoveg = atveheto ? atveheto.textContent.trim() : '';
var ok = !!szoveg;
if (!szoveg && keszlet) szoveg = 'Villányi üzlet: ' + keszlet.textContent.trim();
if (sor.textContent !== szoveg) sor.textContent = szoveg;
sor.hidden = !szoveg;
sor.classList.toggle('bb-a-atvet--ok', ok);
}

function sajatAuto() {
var tarto = $('#bb-a-szall .bb-a-sajat');
var zip = document.getElementById('bb-zip-artdet');
if (tarto && zip && zip.parentNode !== tarto) tarto.appendChild(zip);
}

function haromD(tartalom) {
if (document.getElementById('bb-a-3d-gomb')) return;
var elem = $('.artdet__sku-value', tartalom);
var modell = elem && MODELLEK[elem.textContent.trim()];
if (!modell || !modell.u) return;
if (modell.t) {
var kapcsolo = null;
try {
var m = location.search.match(/[?&]uj3d=([01])/);
if (m) localStorage.setItem('bbUj3d', m[1]);
kapcsolo = localStorage.getItem('bbUj3d');
} catch (e) { /* tiltott tárhely: tesztmodell nem látszik */ }
if (kapcsolo !== '1') return;
}
var kep = $('.artdet__img-data-left', tartalom);
if (!kep) return;
var gomb = document.createElement('button');
gomb.type = 'button';
gomb.id = 'bb-a-3d-gomb';
gomb.className = 'bb-a-3d-gomb';
var felirat = magyar ? '3D nézet' : '3D view';
gomb.setAttribute('aria-label', felirat);
gomb.title = felirat;
gomb.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 22V12M21 7l-9 5-9-5"/></svg>';
gomb.addEventListener('click', function () { nyit3D(modell, (($('.artdet__name', tartalom) || {}).textContent || '').trim()); });
kep.appendChild(gomb);
}

function nyit3D(modell, nev) {
if (!document.getElementById('bb-a-mv')) {
var betolto = document.createElement('script');
betolto.type = 'module';
betolto.id = 'bb-a-mv';
betolto.src = MODEL_VIEWER;
document.head.appendChild(betolto);
}
var ablak = document.getElementById('bb-a-3d');
if (!ablak) {
ablak = document.createElement('div');
ablak.id = 'bb-a-3d';
ablak.setAttribute('role', 'dialog');
ablak.setAttribute('aria-modal', 'true');
ablak.setAttribute('aria-label', (magyar ? '3D nézet: ' : '3D view: ') + nev);
var belso = document.createElement('div');
belso.className = 'bb-a-3d-belso';
var mv = document.createElement('model-viewer');
mv.setAttribute('src', modell.u);
mv.setAttribute('alt', nev);
['camera-controls', 'auto-rotate', 'ar', 'touch-action'].forEach(function (a) { mv.setAttribute(a, a === 'touch-action' ? 'pan-y' : ''); });
mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
mv.setAttribute('shadow-intensity', '1');
mv.setAttribute('environment-image', 'neutral');
var ar = document.createElement('button');
ar.type = 'button';
ar.setAttribute('slot', 'ar-button');
ar.className = 'bb-a-3d-ar';
ar.textContent = magyar ? 'Nézd meg otthon' : 'View in your space';
mv.appendChild(ar);
var bezar = document.createElement('button');
bezar.type = 'button';
bezar.className = 'bb-a-3d-bezar';
bezar.setAttribute('aria-label', magyar ? 'Bezárás' : 'Close');
bezar.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
var teljes = document.createElement('button');
teljes.type = 'button';
teljes.className = 'bb-a-3d-teljes';
teljes.textContent = magyar ? 'Teljes képernyő' : 'Full screen';
teljes.addEventListener('click', function () {
if (document.fullscreenElement) document.exitFullscreen();
else if (belso.requestFullscreen) belso.requestFullscreen();
});
var sugo = document.createElement('p');
sugo.className = 'bb-a-3d-sugo';
sugo.textContent = (magyar ? 'Forgatás: húzással · Nagyítás: görgővel vagy két ujjal' : 'Drag to rotate · Scroll or pinch to zoom') +
(modell.a ? ' · ' + modell.a : '');
belso.appendChild(mv);
belso.appendChild(bezar);
belso.appendChild(teljes);
belso.appendChild(sugo);
ablak.appendChild(belso);
document.body.appendChild(ablak);
function csuk() {
if (document.fullscreenElement) document.exitFullscreen();
ablak.hidden = true;
document.documentElement.classList.remove('bb-a-3d-nyitva');
var g = document.getElementById('bb-a-3d-gomb');
if (g) g.focus();
}
bezar.addEventListener('click', csuk);
ablak.addEventListener('click', function (e) { if (e.target === ablak) csuk(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !ablak.hidden) csuk(); });
}
ablak.hidden = false;
document.documentElement.classList.add('bb-a-3d-nyitva');
$('.bb-a-3d-bezar', ablak).focus();
}

function biocidMondat(tartalom) {
var sku = $('.artdet__sku-value', tartalom);
if (!sku || BIOCID.indexOf(sku.textContent.trim()) < 0 || $('.bb-a-biocid', tartalom)) return;
var hely = $('#artdet__short-descrition', tartalom) || $('.artdet__name', tartalom);
if (!hely) return;
var d = document.createElement('p');
d.className = 'bb-a-biocid';
d.textContent = magyar
? 'Biocid termékeket biztonságosan kell használni. Használat előtt mindig olvassa el a címkét és a termékismertetőt.'
: 'Use biocides safely. Always read the label and product information before use.';
d.style.cssText = 'margin:10px 0 0;padding:8px 12px;border-radius:8px;background:#fdf3e1;border:1px solid #ecc98a;color:#6b4a00;font-size:13px;font-weight:600;line-height:1.45';
hely.parentNode.insertBefore(d, hely.nextSibling);
}

function arfigyelo(tartalom) {
var g = document.getElementById('subscribe_to_cheaper');
var felirat = g && $('.artdet__function-text', g);
if (!felirat) return;
var uj = magyar ? 'Szóljon, ha olcsóbb lesz' : 'Notify me of a price drop';
if (felirat.textContent.trim() !== uj) felirat.textContent = uj;
g.setAttribute('aria-label', uj);
g.title = magyar ? 'Értesítést küldünk, ha a termék ára csökken' : 'We will notify you if the price drops';
}

function velemenyTajekoztato(tartalom) {
[].forEach.call(document.querySelectorAll('a[href*="shop_artforum.php"]'), function (a) {
if (a.parentNode.querySelector('.bb-a-vel-info')) return;
var l = document.createElement('a');
l.className = 'bb-a-vel-info';
l.href = '/velemenyek-ellenorzese';
l.textContent = magyar ? 'Hogyan ellenőrizzük a véleményeket?' : 'How are reviews checked?';
l.style.cssText = 'display:inline-block;margin:8px 12px;font-size:13px;color:#6b645a;text-decoration:underline';
a.parentNode.insertBefore(l, a.nextSibling);
});
}
function velemenysav() {
var reszletek = $('#pane-details .tab-pane__container');
var velemenyek = document.getElementById('pane-reviews');
if (!reszletek || !velemenyek || document.getElementById('bb-a-google')) return !!document.getElementById('bb-a-google');
var sav = $('.ti-widget, [class*="ti-widget"]', reszletek);
if (!sav) return false;
var mozgo = sav;
var hossz = sav.textContent.trim().length;
while (mozgo.parentNode && mozgo.parentNode !== reszletek && mozgo.parentNode.textContent.trim().length === hossz) {
mozgo = mozgo.parentNode;
}
var doboz = document.createElement('div');
doboz.id = 'bb-a-google';
velemenyek.parentNode.insertBefore(doboz, velemenyek);
doboz.appendChild(mozgo);
return true;
}

function szekciok(tartalom) {
$$('.nav-tabs-accordion .tab-pane').forEach(function (panel) {
if (panel.getAttribute('data-bb-cim')) return;
var nev = panel.id.replace(/^pane-/, '');
var ful = document.getElementById('tab-' + nev) || document.getElementById('accordion-btn-' + nev);
if (ful) panel.setAttribute('data-bb-cim', ful.textContent.trim());
});
}

function sav(tartalom) {
var sav = document.getElementById('artdet__fixed-cart');
var kosar = $('#artdet__cart', tartalom);
if (!sav || !kosar || sav.getAttribute('data-bb-a') || typeof IntersectionObserver !== 'function') return;
sav.setAttribute('data-bb-a', '1');
new IntersectionObserver(function (bejegyzesek) {
var e = bejegyzesek[0];
sav.classList.toggle('bb-a-lathato', !e.isIntersecting && e.boundingClientRect.top < 0);
}).observe(kosar);
}

var MOBILKEP_MINDENKI = true;
function mobilKep(tartalom) {
if (gyoker.getAttribute('data-bb-mkep')) return;
var kapcsolo = null;
try {
var m = location.search.match(/[?&]mobilkep=([01])/);
if (m) localStorage.setItem('bbMobilKep', m[1]);
kapcsolo = localStorage.getItem('bbMobilKep');
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (kapcsolo === '0' || (kapcsolo !== '1' && !MOBILKEP_MINDENKI)) return;
var oszlop = $('.artdet__img-data-left-col', tartalom);
var fejresz = document.getElementById('bb-a-fej');
if (!oszlop || !fejresz || !window.matchMedia) return;
gyoker.setAttribute('data-bb-mkep', '1');
var mobil = window.matchMedia('(max-width: 767.98px)');
var fejlec = document.getElementById('nav--mobile-top');

function hatter() {
var el = oszlop.parentNode;
while (el && el.nodeType === 1) {
var h = getComputedStyle(el).backgroundColor;
if (h && h !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(h)) { gyoker.style.setProperty('--bb-a-lap', h); return; }
el = el.parentNode;
}
}
function teteje() {
if (!fejlec) return 0;
var poz = getComputedStyle(fejlec).position;
if (poz !== 'fixed' && poz !== 'sticky') return 0;
return Math.max(0, Math.round(fejlec.getBoundingClientRect().bottom));
}
var utemezve = false;
function frissit() {
utemezve = false;
var t = teteje();
var be = mobil.matches && oszlop.offsetHeight <= (window.innerHeight - t) * 0.85;
gyoker.classList.toggle('bb-a-mkep', be);
if (!be) { oszlop.style.opacity = ''; return; }
gyoker.style.setProperty('--bb-a-mkep-teteje', t + 'px');
var takar = (t + oszlop.offsetHeight - fejresz.getBoundingClientRect().top) / oszlop.offsetHeight;
takar = Math.min(1, Math.max(0, takar));
oszlop.style.opacity = (1 - takar * 0.85).toFixed(3);
}
function utemez() { if (!utemezve) { utemezve = true; requestAnimationFrame(frissit); } }
hatter();
frissit();
window.addEventListener('scroll', utemez, { passive: true });
window.addEventListener('resize', utemez);
[500, 1500, 3000].forEach(function (ms) { setTimeout(utemez, ms); });
}

function lepes(nev, fv, tartalom) {
try { fv(tartalom); } catch (e) { if (window.console) console.error('[új adatlap] hiba: ' + nev, e); }
}
function futtat() {
var tartalom = document.getElementById('page_artdet_content');
if (!tartalom) { kesz(); return false; }
lepes('fej', fej, tartalom);
lepes('ár', ar, tartalom);
lepes('változatok', valtozatok, tartalom);
lepes('funkciók', funkciok, tartalom);
lepes('árfigyelő', arfigyelo, tartalom);
lepes('kedvenc', kedvenc, tartalom);
lepes('szállítás', szallitas, tartalom);
lepes('átvétel', atvetel, tartalom);
lepes('saját autó', sajatAuto, tartalom);
lepes('szekciók', szekciok, tartalom);
lepes('sáv', sav, tartalom);
lepes('bélyegképek', belyegkepek, tartalom);
lepes('látogatók', latogatok, tartalom);
lepes('vélemények', velemenysav, tartalom);
lepes('vélemény-tájékoztató', velemenyTajekoztato, tartalom);
lepes('biocid', biocidMondat, tartalom);
lepes('3D', haromD, tartalom);
lepes('mobil kép', mobilKep, tartalom);
kesz();
return true;
}

function indul() {
if (!futtat()) return;
[300, 1000, 2500, 5000, 9000].forEach(function (ms) { setTimeout(futtat, ms); });
var t = $('#page_artdet_content .artdet__data-right-inner');
if (t && typeof MutationObserver === 'function') {
var utemezve = false;
new MutationObserver(function () {
if (utemezve) return;
utemezve = true;
requestAnimationFrame(function () {
utemezve = false;
latogatok();
lepes('átvétel', atvetel);
lepes('saját autó', sajatAuto);
});
}).observe(t, { childList: true, subtree: true, characterData: true });
}
document.addEventListener('bbZipRendered', function () { lepes('saját autó', sajatAuto); });

var reszletek = document.getElementById('pane-details');
if (reszletek && typeof MutationObserver === 'function' && !document.getElementById('bb-a-google')) {
var sav = new MutationObserver(function () {
var kesz = false;
try { kesz = velemenysav(); } catch (e) { /* a következő változásnál újra */ }
if (kesz) sav.disconnect();
});
sav.observe(reszletek, { childList: true, subtree: true });
}
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
