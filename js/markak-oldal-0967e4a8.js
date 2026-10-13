(function () {
var MINDENKI = true;
var KATEGORIA = '512010';
var KULCS = 'bbMarkak';
var allapot = null;
try {
var m = location.search.match(/[?&]markak=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var gyoker = document.documentElement;
var shop = window.UNAS && window.UNAS.shop;
var kat = shop && shop.category_id ? String(shop.category_id) : '';
if (kat !== KATEGORIA && !/^\/markak\/?$/.test(location.pathname)) return;
if ((gyoker.lang || 'hu').slice(0, 2) !== 'hu') return;

gyoker.setAttribute('data-bb-markak', '2026-10-13 12:47:28');
gyoker.classList.add('bb-markak');
var stilus = document.createElement('style');
stilus.id = 'bb-markak';
stilus.textContent = "html.bb-markak #page_cat_content\u003E#custom-content-top,html.bb-markak #page_cat_content\u003E.categories,html.bb-markak .main__title{display: none !important}.bbm-root{--bbm-green: #2A8511;--bbm-green-dark: #1F6A0B;--bbm-green-tint: #EEF6EA;--bbm-ink: #1B2036;--bbm-muted: #646876;--bbm-line: #ECE6DC;--bbm-tile: #F7F6F2;--bbm-soft: #FAFAFA;--bbm-white: #FFFFFF;--bbm-shadow: 0 2px 10px rgba(27,32,54,.06);--bbm-radius: 10px;--bbm-sticky-top: 0px;container-type: inline-size;container-name: bbm;box-sizing: border-box;padding: 6px 0 56px;font-size: 15px;line-height: 1.55;color: var(--bbm-ink)}.bbm-root *,.bbm-root *::before,.bbm-root *::after{box-sizing: border-box}.bbm-root :focus-visible{outline: 2px solid var(--bbm-green);outline-offset: 2px}.bbm-visually-hidden{position: absolute !important;width: 1px;height: 1px;margin: -1px;padding: 0;overflow: hidden;clip: rect(0 0 0 0);white-space: nowrap;border: 0}.bbm-head{display: grid;grid-template-columns: minmax(0,1fr) auto;gap: 8px 32px;align-items: end;margin-bottom: 14px}.bbm-root .bbm-title{margin: 0 !important;font-size: 34px;line-height: 1.1;font-weight: 800;letter-spacing: -0.01em;text-transform: uppercase;color: var(--bbm-ink)}.bbm-stats{margin: 0;display: flex;gap: 24px}.bbm-stat{display: flex;flex-direction: column}.bbm-stat__value{margin: 0;font-size: 22px;font-weight: 700;line-height: 1.1;font-variant-numeric: tabular-nums}.bbm-stat__label{font-size: 13px;font-weight: 400;color: var(--bbm-muted)}.bbm-intro{max-width: 72ch;margin-bottom: 28px}.bbm-intro__text{color: #3A3F52}.bbm-intro__text p{margin: 0 0 10px}.bbm-intro__text strong{color: var(--bbm-ink);font-weight: 600}.bbm-intro__toggle{display: none;margin-top: 2px;padding: 4px 0;border: 0;background: none;font-family: inherit;font-size: 14px;font-weight: 600;line-height: 1.4;color: var(--bbm-green);cursor: pointer}.bbm-intro__toggle:hover{color: var(--bbm-green-dark);text-decoration: underline}.bbm-tools{display: grid;grid-template-columns: minmax(220px,1fr) auto auto auto;gap: 12px;align-items: center;padding: 14px;background: var(--bbm-white);border: 1px solid var(--bbm-line);border-radius: var(--bbm-radius) var(--bbm-radius) 0 0;box-shadow: var(--bbm-shadow)}.bbm-search{position: relative}.bbm-search__icon{position: absolute;left: 12px;top: 50%;transform: translateY(-50%);width: 18px;height: 18px;color: #999;pointer-events: none}.bbm-root .bbm-search__input{width: 100%;height: 44px;margin: 0;padding: 0 40px 0 40px;font-family: inherit;font-size: 15px;font-weight: 400;color: var(--bbm-ink);background: var(--bbm-white);border: 1px solid var(--bbm-green);border-radius: 8px;-webkit-appearance: none;appearance: none;box-shadow: none}.bbm-search__input::placeholder{color: #8A8E9A}.bbm-root .bbm-search__input:focus{outline: none;box-shadow: 0 0 0 3px rgba(42,133,17,.18)}.bbm-search__input::-webkit-search-cancel-button{display: none}.bbm-search__clear{position: absolute;right: 6px;top: 50%;transform: translateY(-50%);width: 32px;height: 32px;display: none;place-items: center;padding: 0;border: 0;border-radius: 50%;background: transparent;color: var(--bbm-muted);cursor: pointer}.bbm-search__clear:hover{background: #ECECEC;color: var(--bbm-ink)}.bbm-search--filled .bbm-search__clear{display: grid}.bbm-select-wrap{position: relative}.bbm-root .bbm-select{height: 44px;margin: 0;padding: 0 36px 0 12px;min-width: 190px;font-family: inherit;font-size: 14px;font-weight: 500;color: var(--bbm-ink);background: var(--bbm-white);border: 1px solid #DCD6CB;border-radius: 8px;-webkit-appearance: none;appearance: none;cursor: pointer}.bbm-root .bbm-select:focus{border-color: var(--bbm-green);outline: none;box-shadow: 0 0 0 3px rgba(42,133,17,.18)}.bbm-select-wrap::after{content: \"\";position: absolute;right: 14px;top: 50%;width: 7px;height: 7px;border-right: 2px solid var(--bbm-ink);border-bottom: 2px solid var(--bbm-ink);transform: translateY(-70%) rotate(45deg);pointer-events: none}.bbm-check{position: relative;display: inline-flex;align-items: center;gap: 10px;margin: 0;font-size: 14px;font-weight: 500;cursor: pointer;user-select: none;white-space: nowrap}.bbm-check__input{position: absolute;opacity: 0;width: 1px;height: 1px;margin: 0}.bbm-check__box{width: 38px;height: 22px;border-radius: 11px;background: #CED4DA;position: relative;transition: background .15s;flex: none}.bbm-check__box::after{content: \"\";position: absolute;top: 3px;left: 3px;width: 16px;height: 16px;border-radius: 50%;background: #fff;transition: transform .15s;box-shadow: 0 1px 2px rgba(0,0,0,.2)}.bbm-check__input:checked + .bbm-check__box{background: var(--bbm-green)}.bbm-check__input:checked + .bbm-check__box::after{transform: translateX(16px)}.bbm-check__input:focus-visible + .bbm-check__box{outline: 2px solid var(--bbm-green);outline-offset: 2px}.bbm-views{display: inline-flex;border: 1px solid #DCD6CB;border-radius: 8px;overflow: hidden;background: var(--bbm-white)}.bbm-views__btn{width: 44px;height: 42px;display: grid;place-items: center;padding: 0;border: 0;border-radius: 0;background: transparent;color: var(--bbm-muted);cursor: pointer}.bbm-views__btn + .bbm-views__btn{border-left: 1px solid #DCD6CB}.bbm-views__btn:hover{color: var(--bbm-ink)}.bbm-views__btn[aria-pressed=\"true\"]{background: var(--bbm-green-tint);color: var(--bbm-green)}.bbm-views__btn svg{width: 18px;height: 18px}.bbm-az{position: sticky;top: var(--bbm-sticky-top);z-index: 5;display: flex;align-items: center;gap: 4px;padding: 8px 14px;background: var(--bbm-white);border: 1px solid var(--bbm-line);border-top: 1px solid #F3EFE8;border-radius: 0 0 var(--bbm-radius) var(--bbm-radius);box-shadow: var(--bbm-shadow)}.bbm-az--stuck{box-shadow: 0 6px 14px -8px rgba(27,32,54,.22)}.bbm-az__list{display: flex;flex: 1;gap: 2px;margin: 0;padding: 0;list-style: none;justify-content: space-between}.bbm-az__btn{min-width: 30px;height: 34px;padding: 0 6px;font-family: inherit;font-size: 14px;font-weight: 600;color: var(--bbm-ink);background: transparent;border: 0;border-radius: 6px;cursor: pointer}.bbm-az__btn:disabled{color: #C6C8CE;cursor: default}.bbm-az__btn[aria-pressed=\"true\"]{background: var(--bbm-green);color: #fff}.bbm-az__btn:hover:not(:disabled):not([aria-pressed=\"true\"]){background: var(--bbm-green-tint);color: var(--bbm-green)}.bbm-az__all{flex: none;padding: 0 12px;margin-right: 6px;border-right: 1px solid var(--bbm-line);border-radius: 6px 0 0 6px}.bbm-meta{display: flex;flex-wrap: wrap;align-items: center;gap: 8px 16px;margin: 20px 0 14px;min-height: 28px;font-size: 14px;color: var(--bbm-muted)}.bbm-meta strong{color: var(--bbm-ink);font-weight: 600}.bbm-chip{display: inline-flex;align-items: center;gap: 6px;height: 28px;padding: 0 6px 0 12px;font-family: inherit;font-size: 13px;font-weight: 500;color: var(--bbm-ink);background: var(--bbm-green-tint);border: 0;border-radius: 14px;cursor: pointer}.bbm-chip:hover{background: #DCEDD4}.bbm-chip svg{width: 14px;height: 14px}.bbm-reset{border: 0;background: none;padding: 4px 0;font-family: inherit;font-size: 13px;font-weight: 600;color: var(--bbm-green);cursor: pointer}.bbm-reset:hover{text-decoration: underline}.bbm-grid{display: grid;grid-template-columns: repeat(7,minmax(0,1fr));gap: 16px;margin: 0;padding: 0;list-style: none}.bbm-grid\u003Eli{margin: 0;padding: 0}.bbm-root .bbm-card{position: relative;display: flex;flex-direction: column;height: 100%;padding: 8px;text-decoration: none;color: inherit;text-align: center;background: var(--bbm-white);border: 1px solid var(--bbm-line);border-radius: var(--bbm-radius);box-shadow: var(--bbm-shadow);transition: border-color .15s,box-shadow .15s}.bbm-root .bbm-card:hover{border-color: #B9D9AC;box-shadow: 0 6px 18px -6px rgba(42,133,17,.28);text-decoration: none}.bbm-card__logo{position: relative;aspect-ratio: 1 / 1;display: grid;place-items: center;padding: 14%;background: var(--bbm-tile);border-radius: 7px}.bbm-card--haslogo .bbm-card__logo{background: var(--bbm-white)}.bbm-card__img{width: 100%;height: 100%;object-fit: contain;opacity: 0;transition: opacity .2s}.bbm-card__img--loaded{opacity: 1}.bbm-card__fallback{position: absolute;inset: 0;display: grid;place-items: center;padding: 12px;font-size: 15px;font-weight: 700;letter-spacing: .02em;text-align: center;color: #9A9DA8;overflow-wrap: anywhere}.bbm-card--haslogo .bbm-card__fallback{display: none}.bbm-card__body{display: flex;flex-direction: column;align-items: center;gap: 6px;padding: 10px 4px 6px;flex: 1}.bbm-card__name{font-size: 14px;font-weight: 600;line-height: 1.3;overflow-wrap: anywhere}.bbm-card:hover .bbm-card__name{color: var(--bbm-green-dark)}.bbm-card__count{margin-top: auto;padding: 2px 10px;font-size: 12px;font-weight: 600;font-variant-numeric: tabular-nums;color: var(--bbm-green);background: var(--bbm-green-tint);border-radius: 11px}.bbm-card--empty .bbm-card__logo{filter: grayscale(1);opacity: .55}.bbm-card--empty .bbm-card__count{color: #8A8E9A;background: #F1F1F1}.bbm-root mark{background: #D6ECCB;color: inherit;border-radius: 2px;padding: 0 1px}.bbm-groups{display: grid;gap: 28px}.bbm-group{display: grid;grid-template-columns: 64px minmax(0,1fr);gap: 16px;padding-top: 16px;border-top: 2px solid var(--bbm-green)}.bbm-root .bbm-group__letter{margin: 0;font-size: 36px;line-height: 1;font-weight: 700;color: var(--bbm-green)}.bbm-rows{margin: 0;padding: 0;list-style: none;display: grid;grid-template-columns: repeat(3,minmax(0,1fr));gap: 0 24px}.bbm-rows\u003Eli{margin: 0;padding: 0}.bbm-root .bbm-row{display: grid;grid-template-columns: 44px minmax(0,1fr) auto;align-items: center;gap: 12px;min-height: 56px;padding: 6px 4px;border-bottom: 1px solid var(--bbm-line);color: inherit;text-decoration: none}.bbm-row:hover .bbm-row__name{color: var(--bbm-green-dark);text-decoration: underline}.bbm-row__logo{width: 44px;height: 44px;display: grid;place-items: center;border: 1px solid var(--bbm-line);border-radius: 6px;overflow: hidden;background: var(--bbm-tile);position: relative}.bbm-row__logo img{width: 100%;height: 100%;object-fit: contain;padding: 4px;opacity: 0}.bbm-row__logo img.bbm-card__img--loaded{opacity: 1}.bbm-row__logo span{position: absolute;font-size: 13px;font-weight: 700;color: #9A9DA8}.bbm-row__logo.bbm-row__logo--haslogo{background: var(--bbm-white)}.bbm-row__logo.bbm-row__logo--haslogo span{display: none}.bbm-row__name{font-weight: 600;font-size: 15px;overflow-wrap: anywhere}.bbm-row__count{min-width: 36px;padding: 2px 8px;text-align: center;font-size: 13px;font-weight: 600;font-variant-numeric: tabular-nums;background: var(--bbm-green-tint);border-radius: 10px;color: var(--bbm-green)}.bbm-row--empty .bbm-row__count{color: #8A8E9A;background: #F1F1F1}.bbm-empty{padding: 48px 20px;text-align: center;border: 1px dashed #DCD6CB;border-radius: var(--bbm-radius);background: var(--bbm-soft)}.bbm-empty__title{margin: 0 0 6px;font-size: 18px;font-weight: 600}.bbm-empty__text{margin: 0 0 18px;color: var(--bbm-muted)}.bbm-btn{display: inline-flex;align-items: center;justify-content: center;height: 44px;padding: 0 20px;font-family: inherit;font-size: 14px;font-weight: 600;color: #fff;background: var(--bbm-green);border: 0;border-radius: 8px;cursor: pointer}.bbm-btn:hover{background: var(--bbm-green-dark)}@container bbm (max-width: 1280px){.bbm-grid{grid-template-columns: repeat(6,minmax(0,1fr))}}@container bbm (max-width: 1100px){.bbm-grid{grid-template-columns: repeat(5,minmax(0,1fr))}}@container bbm (max-width: 960px){.bbm-tools{grid-template-columns: minmax(0,1fr) auto auto}.bbm-search{grid-column: 1 / -1}.bbm-grid{grid-template-columns: repeat(4,minmax(0,1fr))}.bbm-rows{grid-template-columns: repeat(2,minmax(0,1fr))}.bbm-az__list{justify-content: flex-start}}@container bbm (max-width: 760px){.bbm-root{padding: 4px 0 40px}.bbm-head{grid-template-columns: 1fr}.bbm-root .bbm-title{font-size: 26px}.bbm-stat__value{font-size: 18px}.bbm-grid{grid-template-columns: repeat(3,minmax(0,1fr));gap: 12px}.bbm-intro__text{max-height: 6.2em;overflow: hidden;-webkit-mask-image: linear-gradient(#000 60%,transparent);mask-image: linear-gradient(#000 60%,transparent)}.bbm-intro--open .bbm-intro__text{max-height: none;-webkit-mask-image: none;mask-image: none}.bbm-intro__toggle{display: inline-block}.bbm-az{padding: 6px 8px;overflow-x: auto;scrollbar-width: none;-webkit-overflow-scrolling: touch}.bbm-az::-webkit-scrollbar{display: none}.bbm-az__list{flex: none}.bbm-az__btn{min-width: 36px;height: 38px}.bbm-group{grid-template-columns: 1fr;gap: 6px}.bbm-root .bbm-group__letter{font-size: 28px}.bbm-rows{grid-template-columns: 1fr}}@container bbm (max-width: 520px){.bbm-tools{grid-template-columns: minmax(0,1fr) auto;gap: 10px;padding: 12px}.bbm-select-wrap{grid-column: 1}.bbm-root .bbm-select{width: 100%;min-width: 0}.bbm-views{grid-column: 2;grid-row: 2}.bbm-check{grid-column: 1 / -1;justify-content: space-between}.bbm-grid{grid-template-columns: repeat(2,minmax(0,1fr));gap: 10px}.bbm-card__logo{padding: 16%}.bbm-card__body{padding: 8px 10px 10px}.bbm-stats{gap: 18px}}@media (prefers-reduced-motion: reduce){.bbm-root *{transition: none !important}}";
(document.head || gyoker).appendChild(stilus);

var ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var nf = window.Intl ? new Intl.NumberFormat('hu-HU') : { format: String };
var collator = window.Intl ? new Intl.Collator('hu', { sensitivity: 'base' }) : { compare: function (a, b) { return a < b ? -1 : a > b ? 1 : 0; } };
var NEZET_KULCS = 'bbMarkakNezet';

function norm(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function szoveg(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }

function beolvas(szekcio) {
var lista = [];
szekcio.querySelectorAll('.category-card').forEach(function (k, i) {
var nev = szoveg(k.querySelector('.category-card__name'));
var link = k.querySelector('a.category-card__pic-url') || k.querySelector('a.category-card__link');
if (!nev || !link) return;
var img = k.querySelector('img');
var forras = k.querySelector('picture source');
var db = parseInt(szoveg(k.querySelector('.category-card__qty')).replace(/\D/g, ''), 10);
var kulcs = norm(nev);
var betu = kulcs.charAt(0).toUpperCase();
lista.push({
i: i, name: nev, key: kulcs,
letter: ABC.indexOf(betu) >= 0 ? betu : '#',
href: link.href,
img: img ? (img.getAttribute('src') || '') : '',
srcset: forras ? (forras.getAttribute('srcset') || '') : '',
count: isNaN(db) ? 0 : db
});
});
return lista;
}

function felepit() {
if (document.getElementById('bbmRoot')) return;
var tartalom = document.getElementById('page_cat_content');
var szekcio = tartalom && tartalom.querySelector('.categories');
var MARKAK = szekcio ? beolvas(szekcio) : [];
if (!MARKAK.length) { gyoker.classList.remove('bb-markak'); return; }

var cimsor = document.querySelector('.main__title h1');
var bevezeto = tartalom.querySelector('#custom-content-top .read-more__content') ||
tartalom.querySelector('#custom-content-top .custom-content__content');

var root = document.createElement('section');
root.className = 'bbm-root';
root.id = 'bbmRoot';
root.setAttribute('aria-labelledby', 'bbmTitle');
root.innerHTML =
'<header class="bbm-head"><div class="bbm-head__title"></div>' +
'<dl class="bbm-stats">' +
'<div class="bbm-stat"><dd class="bbm-stat__value" id="bbmStatBrands">–</dd><dt class="bbm-stat__label">márka</dt></div>' +
'<div class="bbm-stat"><dd class="bbm-stat__value" id="bbmStatProducts">–</dd><dt class="bbm-stat__label">termék</dt></div>' +
'</dl></header>' +
(bevezeto ? '<div class="bbm-intro" id="bbmIntro"><div class="bbm-intro__text" id="bbmIntroText"></div>' +
'<button class="bbm-intro__toggle" type="button" id="bbmIntroToggle" aria-expanded="false" aria-controls="bbmIntroText">Tovább olvasom</button></div>' : '') +
'<div class="bbm-tools" role="search">' +
'<div class="bbm-search" id="bbmSearch">' +
'<label class="bbm-visually-hidden" for="bbmQuery">Márka keresése</label>' +
'<svg class="bbm-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
'<input class="bbm-search__input" id="bbmQuery" type="search" placeholder="Márka keresése, pl. Erbslöh" autocomplete="off" spellcheck="false">' +
'<button class="bbm-search__clear" type="button" id="bbmQueryClear" aria-label="Keresés törlése">' +
'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
'</button>' +
'</div>' +
'<div class="bbm-select-wrap">' +
'<label class="bbm-visually-hidden" for="bbmSort">Rendezés</label>' +
'<select class="bbm-select" id="bbmSort">' +
'<option value="default">Alapértelmezett sorrend</option>' +
'<option value="az">Név szerint (A–Z)</option>' +
'<option value="za">Név szerint (Z–A)</option>' +
'<option value="count">Legtöbb termék elöl</option>' +
'</select>' +
'</div>' +
'<label class="bbm-check"><span>Csak termékkel rendelkező</span>' +
'<input class="bbm-check__input" type="checkbox" id="bbmOnlyAvail"><span class="bbm-check__box" aria-hidden="true"></span></label>' +
'<div class="bbm-views" role="group" aria-label="Nézet">' +
'<button class="bbm-views__btn" type="button" data-bbm-view="grid" aria-pressed="true" aria-label="Rács nézet">' +
'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>' +
'</button>' +
'<button class="bbm-views__btn" type="button" data-bbm-view="list" aria-pressed="false" aria-label="ABC lista nézet">' +
'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1" fill="currentColor"/><circle cx="3.5" cy="12" r="1" fill="currentColor"/><circle cx="3.5" cy="18" r="1" fill="currentColor"/></svg>' +
'</button>' +
'</div>' +
'</div>' +
'<nav class="bbm-az" id="bbmAz" aria-label="Szűrés kezdőbetű szerint">' +
'<button class="bbm-az__btn bbm-az__all" type="button" data-bbm-letter="" aria-pressed="true">Mind</button>' +
'<ul class="bbm-az__list" id="bbmAzList"></ul>' +
'</nav>' +
'<div class="bbm-meta" id="bbmMeta" aria-live="polite"></div>' +
'<div id="bbmResults"></div>';

var h1 = cimsor || document.createElement('h1');
if (!cimsor) h1.textContent = 'Márkák';
h1.className = 'bbm-title';
h1.id = 'bbmTitle';
root.querySelector('.bbm-head__title').appendChild(h1);
if (bevezeto) root.querySelector('#bbmIntroText').innerHTML = bevezeto.innerHTML;

var tarolo = document.createElement('div');
tarolo.className = 'container';
tarolo.appendChild(root);
szekcio.parentNode.insertBefore(tarolo, szekcio);

inditas(root, MARKAK);
}

function inditas(root, MARKAK) {
var state = { q: '', letter: '', sort: 'default', onlyAvail: false, view: 'grid' };
try { if (localStorage.getItem(NEZET_KULCS) === 'list') state.view = 'list'; } catch (e) { /* nincs tárhely */ }

var $ = function (id) { return document.getElementById(id); };
var results = $('bbmResults'), meta = $('bbmMeta');
var input = $('bbmQuery'), searchWrap = $('bbmSearch');

$('bbmStatBrands').textContent = nf.format(MARKAK.length);
$('bbmStatProducts').textContent = nf.format(MARKAK.reduce(function (s, b) { return s + b.count; }, 0));

var betuk = ABC.slice();
if (MARKAK.some(function (b) { return b.letter === '#'; })) betuk.push('#');
$('bbmAzList').innerHTML = betuk.map(function (l) {
return '<li><button class="bbm-az__btn" type="button" data-bbm-letter="' + l + '" aria-pressed="false">' + l + '</button></li>';
}).join('');
root.querySelectorAll('[data-bbm-view]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-bbm-view') === state.view)); });

function baseFiltered() {
var q = norm(state.q.trim());
return MARKAK.filter(function (b) {
if (state.onlyAvail && b.count === 0) return false;
if (q && b.key.indexOf(q) === -1) return false;
return true;
});
}
function sorted(list) {
var out = list.slice();
if (state.sort === 'az') out.sort(function (a, b) { return collator.compare(a.name, b.name); });
else if (state.sort === 'za') out.sort(function (a, b) { return collator.compare(b.name, a.name); });
else if (state.sort === 'count') out.sort(function (a, b) { return b.count - a.count || collator.compare(a.name, b.name); });
else out.sort(function (a, b) { return a.i - b.i; });
return out;
}
function highlight(name) {
var q = norm(state.q.trim());
if (!q) return esc(name);
var idx = norm(name).indexOf(q);
if (idx < 0) return esc(name);
return esc(name.slice(0, idx)) + '<mark>' + esc(name.slice(idx, idx + q.length)) + '</mark>' + esc(name.slice(idx + q.length));
}
function countLabel(n) { return n === 0 ? 'Jelenleg nincs termék' : nf.format(n) + ' termék'; }
function initials(name) { return name.replace(/[^A-Za-zÀ-ž0-9 ]/g, '').split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase(); }
function xIcon() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg>'; }

function cardHTML(b, n) {
return '<li><a class="bbm-card' + (b.count === 0 ? ' bbm-card--empty' : '') + '" href="' + esc(b.href) + '">' +
'<span class="bbm-card__logo">' + (b.img ? '<img class="bbm-card__img" src="' + esc(b.img) + '"' + (b.srcset ? ' srcset="' + esc(b.srcset) + '"' : '') +
' alt="" loading="' + (n < 14 ? 'eager' : 'lazy') + '" decoding="async" width="200" height="200">' : '') +
'<span class="bbm-card__fallback" aria-hidden="true">' + esc(b.name) + '</span></span>' +
'<span class="bbm-card__body"><span class="bbm-card__name">' + highlight(b.name) + '</span>' +
'<span class="bbm-card__count">' + countLabel(b.count) + '</span></span></a></li>';
}
function rowHTML(b) {
return '<li><a class="bbm-row' + (b.count === 0 ? ' bbm-row--empty' : '') + '" href="' + esc(b.href) + '">' +
'<span class="bbm-row__logo">' + (b.img ? '<img src="' + esc(b.img) + '" alt="" loading="lazy" decoding="async" width="44" height="44">' : '') +
'<span aria-hidden="true">' + esc(initials(b.name)) + '</span></span>' +
'<span class="bbm-row__name">' + highlight(b.name) + '</span>' +
'<span class="bbm-row__count" aria-label="' + countLabel(b.count) + '">' + b.count + '</span></a></li>';
}

function render() {
var pre = baseFiltered();

var present = {};
pre.forEach(function (b) { present[b.letter] = true; });
if (state.letter && !present[state.letter]) state.letter = '';
root.querySelectorAll('[data-bbm-letter]').forEach(function (btn) {
var l = btn.getAttribute('data-bbm-letter');
btn.setAttribute('aria-pressed', String(l === state.letter));
if (l) btn.disabled = !present[l];
});

var list = sorted(pre.filter(function (b) { return !state.letter || b.letter === state.letter; }));

var chips = [];
if (state.q.trim()) chips.push('<button class="bbm-chip" type="button" data-bbm-clear="q">Keresés: „' + esc(state.q.trim()) + '” ' + xIcon() + '<span class="bbm-visually-hidden">törlése</span></button>');
if (state.letter) chips.push('<button class="bbm-chip" type="button" data-bbm-clear="letter">Kezdőbetű: ' + state.letter + ' ' + xIcon() + '<span class="bbm-visually-hidden">törlése</span></button>');
if (state.onlyAvail) chips.push('<button class="bbm-chip" type="button" data-bbm-clear="avail">Csak termékkel rendelkező ' + xIcon() + '<span class="bbm-visually-hidden">törlése</span></button>');
var total = list.reduce(function (s, b) { return s + b.count; }, 0);
meta.innerHTML = '<span><strong>' + nf.format(list.length) + '</strong> márka, ' + nf.format(total) + ' termék</span>' +
chips.join('') + (chips.length > 1 ? '<button class="bbm-reset" type="button" data-bbm-clear="all">Összes szűrő törlése</button>' : '');

if (!list.length) {
results.innerHTML = '<div class="bbm-empty"><p class="bbm-empty__title">Nincs ilyen márka a kínálatban</p>' +
'<p class="bbm-empty__text">Próbáljon rövidebb keresőszót, vagy nézze meg az összes márkát.</p>' +
'<button class="bbm-btn" type="button" data-bbm-clear="all">Összes márka mutatása</button></div>';
return;
}

if (state.view === 'grid') {
results.innerHTML = '<ul class="bbm-grid">' + list.map(cardHTML).join('') + '</ul>';
} else {
var groups = {};
list.forEach(function (b) { (groups[b.letter] = groups[b.letter] || []).push(b); });
var letters = Object.keys(groups).sort();
if (state.sort === 'za') letters.reverse();
results.innerHTML = '<div class="bbm-groups">' + letters.map(function (l) {
var gid = 'bbm-g-' + (l === '#' ? 'egyeb' : l);
return '<section class="bbm-group" aria-labelledby="' + gid + '"><h2 class="bbm-group__letter" id="' + gid + '">' + l + '</h2>' +
'<ul class="bbm-rows">' + groups[l].map(rowHTML).join('') + '</ul></section>';
}).join('') + '</div>';
}
bindImages();
}

function bindImages() {
results.querySelectorAll('img').forEach(function (img) {
var host = img.parentElement;
var ok = function () {
if (!img.naturalWidth) return;
img.classList.add('bbm-card__img--loaded');
if (host.classList.contains('bbm-row__logo')) host.classList.add('bbm-row__logo--haslogo');
else host.parentElement.classList.add('bbm-card--haslogo');
};
if (img.complete) ok(); else img.addEventListener('load', ok, { once: true });
});
}

var t;
input.addEventListener('input', function () {
searchWrap.classList.toggle('bbm-search--filled', !!input.value);
clearTimeout(t);
t = setTimeout(function () { state.q = input.value; render(); }, 120);
});
function clearQuery() { input.value = ''; state.q = ''; searchWrap.classList.remove('bbm-search--filled'); render(); }
input.addEventListener('keydown', function (e) { if (e.key === 'Escape' && input.value) clearQuery(); });
$('bbmQueryClear').addEventListener('click', function () { clearQuery(); input.focus(); });
$('bbmSort').addEventListener('change', function (e) { state.sort = e.target.value; render(); });
$('bbmOnlyAvail').addEventListener('change', function (e) { state.onlyAvail = e.target.checked; render(); });

root.addEventListener('click', function (e) {
var letterBtn = e.target.closest('[data-bbm-letter]');
if (letterBtn && !letterBtn.disabled) {
var l = letterBtn.getAttribute('data-bbm-letter');
state.letter = (state.letter === l) ? '' : l;
render();
return;
}
var viewBtn = e.target.closest('[data-bbm-view]');
if (viewBtn) {
state.view = viewBtn.getAttribute('data-bbm-view');
try { localStorage.setItem(NEZET_KULCS, state.view); } catch (e2) { /* nincs tárhely */ }
root.querySelectorAll('[data-bbm-view]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === viewBtn)); });
render();
return;
}
var clr = e.target.closest('[data-bbm-clear]');
if (clr) {
var what = clr.getAttribute('data-bbm-clear');
if (what === 'q' || what === 'all') { input.value = ''; state.q = ''; searchWrap.classList.remove('bbm-search--filled'); }
if (what === 'letter' || what === 'all') state.letter = '';
if (what === 'avail' || what === 'all') { state.onlyAvail = false; $('bbmOnlyAvail').checked = false; }
render();
}
});

var intro = $('bbmIntro'), introBtn = $('bbmIntroToggle');
if (intro && introBtn) introBtn.addEventListener('click', function () {
var open = intro.classList.toggle('bbm-intro--open');
introBtn.setAttribute('aria-expanded', String(open));
introBtn.textContent = open ? 'Kevesebb' : 'Tovább olvasom';
});

var az = $('bbmAz');
function fejlecAlja() {
var also = 0;
document.querySelectorAll('.js-header-inner, #nav--mobile-top, header, .header').forEach(function (el) {
var poz = getComputedStyle(el).position;
if (poz !== 'fixed' && poz !== 'sticky') return;
var r = el.getBoundingClientRect();
if (r.height && r.top <= 1 && r.bottom > also) also = r.bottom;
});
return Math.round(also);
}
var utemezve = false;
function frissit() {
utemezve = false;
var top = fejlecAlja();
root.style.setProperty('--bbm-sticky-top', top + 'px');
az.classList.toggle('bbm-az--stuck', az.getBoundingClientRect().top <= top + 0.5 && window.scrollY > 0);
}
function utemez() { if (!utemezve) { utemezve = true; requestAnimationFrame(frissit); } }
window.addEventListener('scroll', utemez, { passive: true });
window.addEventListener('resize', utemez);
frissit();

render();
}

function biztos() {
try { felepit(); } catch (e) {
gyoker.classList.remove('bb-markak');
if (window.console) console.warn('Márkák oldal:', e);
}
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', biztos);
else biztos();
})();
