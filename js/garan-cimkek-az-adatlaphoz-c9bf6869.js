(function () {
var MINDENKI = true;
var allapot = null;
try {
var m = location.search.match(/[?&]garancia=([01])/);
if (m) localStorage.setItem('bbGarancia', m[1]);
allapot = localStorage.getItem('bbGarancia');
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var CIMKEK = {"26168":["DED7099.png",3,"DED7099"],"28357":["DED8819.png",3,"DED8819"],"28358":["DED8821.png",3,"DED8821"],"28359":["DED8822.png",3,"DED8822"],"28892":["DED7034.png",3,"DED7034"],"28903":["DED7038.png",3,"DED7038"],"28905":["DED7090.png",3,"DED7090"],"29303":["MC0901.png",3,"MC0901"],"29482":["DED7976.png",3,"DED7976"],"29483":["DED7978.png",3,"DED7978"],"29895":["DED7540.png",3,"DED7540"],"29896":["DED7535.png",3,"DED7535"],"29930":["DED7874.png",3,"DED7874"],"31171":["DED8824.png",3,"DED8824"],"31847":["MC0920.png",3,"MC0920"],"31849":["DED7192V.png",3,"DED7192V"],"31905":["DED7146.png",3,"DED7146"],"31906":["DED7035.png",3,"DED7035"],"31907":["DED7039V.png",3,"DED7039V"],"31987":["DED7151.png",3,"DED7151"],"33276":["DED7040.png",3,"DED7040"],"33380":["DED7142.png",3,"DED7142"],"34019":["DED7551.png",3,"DED7551"],"35385":["DED7016.png",3,"DED7016"],"35424":["DED7079.png",3,"DED7079"],"35619":["DED7149.png",3,"DED7149"],"35858":["DED7093.png",3,"DED7093"],"36512":["DED7032.png",3,"DED7032"],"36513":["DED7198.png",3,"DED7198"],"36514":["DED7024.png",3,"DED7024"],"36517":["DED7048.png",3,"DED7048"],"36518":["DED7045.png",3,"DED7045"],"36519":["DED7051.png",3,"DED7051"],"36520":["DED7038V.png",3,"DED7038V"],"36521":["DED7061.png",3,"DED7061"],"36523":["DED7041.png",3,"DED7041"],"36524":["DED7064.png",3,"DED7064"],"36525":["DED7047.png",3,"DED7047"],"36526":["DED6905.png",3,"DED6905"],"36527":["DED7059.png",3,"DED7059"],"36528":["DED7039.png",3,"DED7039"],"36529":["DED7076V.png",3,"DED7076V"],"36530":["DED7063.png",3,"DED7063"],"36531":["DED6936.png",3,"DED6936"],"36537":["DED7034.png",3,"DED7034"],"36538":["DED7032.png",3,"DED7032"],"36707":["DED7191.png",3,"DED7191"]};
var ALAP = "https://cdn.jsdelivr.net/gh/bi-bor/unas-bi-bor-script@2f370d43ff75ca75a758c3236b319dd18c8c7801/garancia/";
var JELVENY = {"garan":"data:image/png;base64,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","pajzs":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABiBAMAAAAB9IgkAAAAMFBMVEX////7/P3q8Pfe31P+8AGqwcy8xSp8n4VRgos+d7YwbrE4cH4hYJcKU54DTqEDTqAX1IpNAAAELElEQVR42u2XXWgcVRSAv5ndTdLiw9qiSajGbWJoIgorIlby4KKCohASIS2b+JC3RiLpkkp+DCwhSklANFkJVItplTaptIkxUG0xhq1UYrE/Cy2kEhNmQ6FpYiajaGuzmxkfZnZnZnc2DeKDiOdp7uXbe37uOeeeFRiqYWNJPiiyCfkHoTrvvRHhm7J7Udpl4d/o3f/QfwlSNgGp45uAElLWljtjLVxMzF3KTHvrSRKgXXj/7ns+QM0BHQFo8tGuAGvOkDZrbAQALsecbLp+VO2oaES9EYr6We9SxdF3sk8qV9V4CLSDzwKuEmm+zEGdK8QzCrh8gh/YR36jk03jPkusk2LS0fAbvZrFi479jsFsE0PmorBA8yoOJ3m531z8iqBkqrvinCPrNmjMGfrRCgmzztCUYhq+2K92FOveJE9+e9X/ci0Aa+H53ryeFFSoEu8F4OsuCWZPTQ4C5FX3S4fS6oRudgEw0rAQ/PjzwUdGqgB4inyvGadYaRzgWEt5XwCoaxqrOu0FrSxuMXy673HQjrVUng0AuA9HZl5SQGpPhX1IlmVVXpXlCJVyWiI8YGzLS4Y6BQ2mKr83nX+dA8Z2Rvo+bQ3RXuf0DdgD6dtEmXsuZEC6Zm/MgZXS0FLm+aaMpqFRL8BOI4FWddFXvxgRX/tgpdPTCsKqDr2gN4P7FmDpyFxfUQNucK9I0ivWFCsFUFVg+yWu9IIbxEh1QSPgMurgIgCfDQGu/lClL4mIGdikzWQ/gOLTDMOVzocA3OtWJhoA+K5dNaDbT74L4CmJWurunB9g9/aQAZXi0hVYGuGfv/t0ndsyrqV20vxecedoYi8um9/huhxQwY60vsSXNTkgIdSV+jzrDmRDepnX3TL8S4aDAGy1QScB2FJtHHVioVuvYCukzeurwZn9AHfCDXonn5JMaHGvumcAYMvA8SiozX8MAKztibWF01CRn3y9woIlzTA88REAeT24Iqa6boxW6z59s+VmS73h/07yFBOKPh83vC2ODL9aHEld4KMJS8+cPuBJxaR+auJU6jt+8Cc9gFlDVuKtgY2GLD31PTqj5biWT62/z/FKGcltyJzi1Ozl1cS8mCpQVRovqCnNPmmtU31bATQJ4FDsh6MO6ooC7PKnXnOx1Qh2dusRABIKwDaHZwNgohUQesPXOxVQK0rShYObaCqYhbvzQGtsweOF33q23jZTlifO2QPctnDGPojc2SHyc8b0IJVkNLNJRO5G7TdV+aF9gy8Q4LHztsFaQPHatSHCzJs2dWBjks3gAq4uVBXkasLLoXEd4trwwxXOzEgwpp8OINZHnGb6Jv3ZdRnmOqlcfm4aKwTXviq3N3LtRHDRdCZ9jYdrran+hvMLLwTN9+64L+dAWT6mIyuDG/2Z8Xwiy7J8q3bj4VQIbqgqrfI1/pb8BXxEfe3FJxp2AAAAAElFTkSuQmCC","naptar":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA6BAMAAAAafvdhAAAAGFBMVEX////t7e20s7OGhYVTUVEwLS0kISEiHx+Ang+FAAACJklEQVR42r2VwW7TQBCGv127XKBkXZ84UNmhcDZpciaNeIM0fYL2FXiYiidAghdoWvWOlVbigkTjGHEAibpeAhKplGQ5xHUcpRZILZ2LV/vpH8+MZmbh1sxxsoNwVH4p8tPTgO/HALKN6eoleQtaANgetnd1K3NegUykMSzz6+2m3AbqPsAY3A4AB9BoACaMscF+2AVoQhICWMBZDIhmjA3eUe4tBbAfQJoCfAAJldKfxwpJIdm/xa+uj39mX16yCoCpI94v857HBQCTCKOX+TS6OkW3WN9/qL/cLBV/wgaTlnELbDBRGV+5/9/jv4v+BNxapX8CuC0TxlhbAKHOubWt8NMYaxe811psAoRz/3UFcgvqgBUs+RcBB8O2i2wS2kHtWBDqbBpnXI17AoFkfGgFAkhOi3qzDwbDGhGTfZAgKnqen0lTXAwO6car5ymKnzt7XjF/0dk2h8CvtmgEQN2T7YX6VFU/RvGkr2mhWO9lO+SKD9hoAY+7b5GcH3YPjvEK9TNv3N0NpUm0QJAk0Gsu6ElOhYI0n0aDk3Or0wZQAxwEhkbHw2Ewz7869YcBeoKrbAzD6vhzrVA/E3s7MIlF7O0NibjgWcefns7rcwTQx/SQanpCEuOT6KzFH33l96XP2dGI9NKfdj9ivq2p83cjrHsjoFZcztlqFg7AisrnO1385jN1B/39oxQqkDD0yvi6xobkhXs9Fquz92dNleijm796fwAo7bCltZPIwwAAAABJRU5ErkJggg=="};
var EU_LINK = 'https://europa.eu/youreurope/commercial-guarantee-durability/';

var magyar = (document.documentElement.lang || 'hu').slice(0, 2) === 'hu';
var SZ = magyar ? {
jotallas: 'Gyártói jótállás', ev: 'év', nyit: 'a GARAN-címke megnyitása', cim: 'Gyártói tartóssági jótállás',
szoveg: function (ev, tipus) { return 'A gyártó ' + ev + ' év jótállást vállal erre a termékre (' + tipus + ').'; },
link: 'Bővebben a gyártói jótállásról és a jogszabályi szavatosságról', bezar: 'Bezárás'
} : {
jotallas: 'Producer guarantee', ev: 'years', nyit: 'open the GARAN label', cim: 'Commercial guarantee of durability',
szoveg: function (ev, tipus) { return 'The producer guarantees this product for ' + ev + ' years (' + tipus + ').'; },
link: 'More about the producer guarantee and the legal guarantee', bezar: 'Close'
};

function el(tag, osztaly, szoveg) {
var e = document.createElement(tag);
if (osztaly) e.className = osztaly;
if (szoveg) e.textContent = szoveg;
return e;
}
function kep(src, osztaly) {
var k = el('img', osztaly);
k.src = src;
k.alt = '';
return k;
}

var stilus = el('style');
stilus.id = 'bb-garan-stilus';
stilus.textContent = ".bb-garan-doboz{margin: -4px 0 20px}.bb-garan{display: inline-flex;align-items: center;gap: 6px;margin: 0;padding: 6px 12px 6px 10px;border: 1px solid #e6e0d5;border-radius: 10px;background: #fff;font: inherit;color: #221f1b;cursor: pointer;transition: border-color .15s,box-shadow .15s}.bb-garan:hover{border-color: #2a8511;box-shadow: 0 2px 8px rgba(34,31,27,.08)}.bb-garan:focus-visible{outline: 2px solid #2a8511;outline-offset: 2px}.bb-garan-ev{font-size: 30px;font-weight: 500;line-height: 1;letter-spacing: -.02em}.bb-garan-naptar{width: 15px;height: auto;margin-top: 10px}.bb-garan-elvalaszto{width: 1px;height: 26px;margin: 0 4px;background: #b9b2a6}.bb-garan-logo{width: 104px;height: auto}.bb-garan-pajzs{width: 18px;height: auto;margin-left: 2px}.bb-garan img{display: block;max-width: none;border: 0}html.bb-garan-nyitott{overflow: hidden}#bb-garan-panel{position: fixed;inset: 0;z-index: 2147483647;background: rgba(34,31,27,0);transition: background .25s}#bb-garan-panel[hidden]{display: none}#bb-garan-panel.bb-garan-nyitva{background: rgba(34,31,27,.45)}.bb-garan-belso{position: absolute;top: 0;right: 0;bottom: 0;width: min(500px,100%);overflow-y: auto;box-sizing: border-box;padding: 64px 40px 40px;background: #fff;color: #221f1b;box-shadow: -8px 0 30px rgba(0,0,0,.15);transform: translateX(100%);transition: transform .25s ease}.bb-garan-nyitva .bb-garan-belso{transform: none}.bb-garan-bezar{position: absolute;top: 14px;right: 14px;width: 44px;height: 44px;display: flex;align-items: center;justify-content: center;padding: 0;border: 0;border-radius: 50%;background: #fff;color: #221f1b;cursor: pointer}.bb-garan-bezar:hover{background: #f6f3ee}.bb-garan-cim{margin: 0 0 6px;font-size: 20px;font-weight: 700;line-height: 1.3;color: #221f1b}.bb-garan-szoveg{margin: 0 0 20px;font-size: 14px;line-height: 1.5;color: #6b645a}.bb-garan-cimke{display: block;width: 100%;height: auto;aspect-ratio: 808 / 851;margin: 0 0 28px;border: 0;background: #f6f3ee}.bb-garan-link{display: flex;align-items: center;justify-content: space-between;gap: 12px;font-size: 15px;line-height: 1.4;color: #221f1b !important;text-decoration: underline}.bb-garan-link:hover{color: #1f6a0c !important}.bb-garan-link svg{flex: none}@media (max-width: 575.98px){.bb-garan-belso{top: auto;left: 0;width: 100%;max-height: 92vh;padding: 56px 20px 28px;border-radius: 18px 18px 0 0;transform: translateY(100%)}.bb-garan-bezar{top: 8px;right: 8px}}@media (prefers-reduced-motion: reduce){#bb-garan-panel,.bb-garan-belso{transition: none}}";

function panel(c) {
var ablak = document.getElementById('bb-garan-panel');
if (ablak) return ablak;
ablak = el('div');
ablak.id = 'bb-garan-panel';
ablak.hidden = true;
ablak.setAttribute('role', 'dialog');
ablak.setAttribute('aria-modal', 'true');
ablak.setAttribute('aria-labelledby', 'bb-garan-cim');
var belso = el('div', 'bb-garan-belso');
var bezar = el('button', 'bb-garan-bezar');
bezar.type = 'button';
bezar.setAttribute('aria-label', SZ.bezar);
bezar.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
var cim = el('h2', 'bb-garan-cim', SZ.cim);
cim.id = 'bb-garan-cim';
var cimke = el('img', 'bb-garan-cimke');
cimke.width = 808;
cimke.height = 851;
cimke.alt = 'GARAN – ' + SZ.jotallas + ': ' + c[1] + ' ' + SZ.ev + ' – ' + c[2];
cimke.setAttribute('data-src', ALAP + encodeURIComponent(c[0]));
var link = el('a', 'bb-garan-link', SZ.link);
link.href = EU_LINK;
link.target = '_blank';
link.rel = 'noopener';
link.insertAdjacentHTML('beforeend', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>');
belso.appendChild(bezar);
belso.appendChild(cim);
belso.appendChild(el('p', 'bb-garan-szoveg', SZ.szoveg(c[1], c[2])));
belso.appendChild(cimke);
belso.appendChild(link);
ablak.appendChild(belso);
document.body.appendChild(ablak);

function csuk() {
ablak.classList.remove('bb-garan-nyitva');
document.documentElement.classList.remove('bb-garan-nyitott');
setTimeout(function () { ablak.hidden = true; }, 250);
var g = document.getElementById('bb-garan');
if (g) g.focus();
}
bezar.addEventListener('click', csuk);
ablak.addEventListener('click', function (e) { if (e.target === ablak) csuk(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !ablak.hidden) csuk(); });
return ablak;
}

function nyit(c) {
var ablak = panel(c);
var cimke = ablak.querySelector('.bb-garan-cimke');
if (!cimke.src) cimke.src = cimke.getAttribute('data-src');
ablak.hidden = false;
document.documentElement.classList.add('bb-garan-nyitott');
requestAnimationFrame(function () { requestAnimationFrame(function () { ablak.classList.add('bb-garan-nyitva'); }); });
ablak.querySelector('.bb-garan-bezar').focus();
}

function futtat() {
if (document.getElementById('bb-garan')) return true;
var tartalom = document.getElementById('page_artdet_content');
var sku = tartalom && tartalom.querySelector('.artdet__sku-value');
if (!sku) return false;
var c = CIMKEK[sku.textContent.trim()];
if (!c) return true;
var leiras = document.getElementById('artdet__short-descrition');
var parameter = document.getElementById('artdet__param-spec');
var nev = tartalom.querySelector('.artdet__name');
var hely = leiras || parameter || nev;
if (!hely || !hely.parentNode) return false;
if (!stilus.parentNode) (document.head || document.documentElement).appendChild(stilus);

var jelveny = el('button', 'bb-garan');
jelveny.type = 'button';
jelveny.id = 'bb-garan';
jelveny.setAttribute('aria-haspopup', 'dialog');
jelveny.setAttribute('aria-label', SZ.jotallas + ': ' + c[1] + ' ' + SZ.ev + ' – ' + SZ.nyit);
jelveny.title = SZ.jotallas + ': ' + c[1] + ' ' + SZ.ev;
jelveny.appendChild(el('span', 'bb-garan-ev', String(c[1])));
jelveny.appendChild(kep(JELVENY.naptar, 'bb-garan-naptar'));
jelveny.appendChild(el('span', 'bb-garan-elvalaszto'));
jelveny.appendChild(kep(JELVENY.garan, 'bb-garan-logo'));
jelveny.appendChild(kep(JELVENY.pajzs, 'bb-garan-pajzs'));
jelveny.addEventListener('click', function () { nyit(c); });

var doboz = el('div', 'bb-garan-doboz');
doboz.appendChild(jelveny);
hely.parentNode.insertBefore(doboz, hely === leiras ? hely.nextSibling : hely === nev ? hely.nextSibling : hely);
return true;
}

function indul() {
if (futtat()) return;
var probak = [300, 1000, 2500, 5000];
probak.forEach(function (ms) { setTimeout(futtat, ms); });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
