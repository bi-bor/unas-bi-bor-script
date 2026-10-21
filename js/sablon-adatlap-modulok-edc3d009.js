/* Idegen scriptek a sablonban — a burkoló (sablon-alap ág, TERMEKOLDAL.md › „Termékoldali scriptek a sablonban”).
   A csomagol.sh minden modul-csomag (adatlap, lista, pénztár) elejére teszi, utána a sablon/idegen/ fájljait
   VÁLTOZATLANUL, egyenként így burkolva:  window.bbIdegen('<név>', function () { …a fájl… });
   • Ha a régi UNAS Script még a lapon van (<script src="…/js/<név>-<ujjlenyomat>.js">, a fejrészben), a
     sablonbeli másolat NEM fut — az átmeneti együttfutásnál így semmi sem jelenik meg kétszer, és mindegy,
     melyik töltődik be előbb. A régi script kikapcsolása után a következő oldalbetöltéstől a sablonbeli fut.
   • Ugyanakkor fut, mint eddig a „defer” script: az oldal felépítése után (DOMContentLoaded-kor, a fejrész
     többi defer scriptje után; ha a csomag maga defer, rögtön) — így a body_end blokk adatai (pl. a
     BB_SZALL_TILT) is megvannak, és a modulok sorrendje az élővel azonos.
   • Egy modul hibája nem állítja meg a többit (külön scriptként sem állította): a konzolba írjuk.
   Tilos a tartalomban: dupla kapcsos és dupla szögletes nyitó, kettőskereszt a nyitó kapcsos után. */
if (!window.bbIdegen) window.bbIdegen = function (nev, kod) {
  try {
    if (document.querySelector('script[src*="/js/' + nev + '-"]')) return;
  } catch (e) { /* régi böngésző: futunk */ }
  function fut() {
    try { kod.call(window); } catch (e) { if (window.console) console.error('[sablon] ' + nev + ':', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fut);
  else fut();
};

/* ── latogato-figyelo-b0007b11.js (sablon/idegen/, a régi UNAS Script fájlja változatlanul) ── */
window.bbIdegen('latogato-figyelo', function () {
(function () {
  'use strict';

  /*
   * Megakadályozza, hogy ugyanaz a script kétszer induljon el.
   */
  if (window.__bbLiveViewerStarted) {
    return;
  }

  window.__bbLiveViewerStarted = true;

  var API_BASE = 'https://www.bibor.bi-bor.hu/visit';

  /*
   * Teszteléskor legyen 1.
   * Éles használatnál állítsd vissza 2-re.
   */
  var MIN_VIEWERS_TO_SHOW = 2;

  var HEARTBEAT_INTERVAL = 15000;
  var BADGE_ID = 'bb-live-viewers';

  /*
   * Termékazonosító meghatározása.
   *
   * Elsődlegesen a termékoldal URL-jének végéről olvassa ki:
   * /termek-reszletek/termek-neve-6858
   */
  function getProductId() {
    var pathname = window.location.pathname.replace(/\/+$/, '');

    /*
     * Csak termékoldalon fusson.
     */
    if (pathname.indexOf('/termek-reszletek/') === -1) {
      return null;
    }

    /*
     * URL végén lévő számsor.
     */
    var urlMatch = pathname.match(/-(\d+)$/);

    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }

    /*
     * Tartalék: canonical URL.
     */
    var canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (canonical && canonical.href) {
      var canonicalMatch = canonical.href.match(
        /-(\d+)\/?(?:\?.*)?$/
      );

      if (canonicalMatch && canonicalMatch[1]) {
        return canonicalMatch[1];
      }
    }

    /*
     * Tartalék: strukturált termékadatok.
     */
    var jsonScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    for (var i = 0; i < jsonScripts.length; i++) {
      try {
        var jsonData = JSON.parse(
          jsonScripts[i].textContent
        );

        var products = Array.isArray(jsonData)
          ? jsonData
          : [jsonData];

        for (var j = 0; j < products.length; j++) {
          var item = products[j];

          if (
            item &&
            (
              item['@type'] === 'Product' ||
              (
                Array.isArray(item['@type']) &&
                item['@type'].indexOf('Product') !== -1
              )
            )
          ) {
            if (item.productID) {
              return String(item.productID);
            }

            if (item.sku) {
              return String(item.sku);
            }
          }
        }
      } catch (error) {
        /*
         * Hibás vagy nem termékhez tartozó JSON-LD kihagyása.
         */
      }
    }

    /*
     * Tartalék: data attribútumok.
     */
    var productElement = document.querySelector(
      '[data-product-id], [data-sku], [itemprop="sku"]'
    );

    if (productElement) {
      return (
        productElement.getAttribute('data-product-id') ||
        productElement.getAttribute('data-sku') ||
        productElement.getAttribute('content') ||
        productElement.textContent.trim()
      );
    }

    return null;
  }

  function getSessionToken() {
    var key = 'bb_view_session';
    var token = sessionStorage.getItem(key);

    if (!token) {
      if (
        window.crypto &&
        typeof window.crypto.randomUUID === 'function'
      ) {
        token = window.crypto.randomUUID();
      } else {
        token =
          Date.now() +
          '-' +
          Math.random()
            .toString(36)
            .substring(2, 12);
      }

      sessionStorage.setItem(key, token);
    }

    return token;
  }

  function sendHeartbeat(productId, token) {
    return fetch(API_BASE + '/heartbeat.php', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        session_token: token,
        product_id: productId
      }),

      cache: 'no-store'
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            'HTTP ' + response.status
          );
        }

        return response;
      })
      .catch(function (error) {
        console.error(
          '[Látogatófigyelő] Heartbeat hiba:',
          error
        );

        throw error;
      });
  }

  function fetchCount(productId) {
    var url =
      API_BASE +
      '/get_count.php?product_id=' +
      encodeURIComponent(productId) +
      '&_=' +
      Date.now();

    return fetch(url, {
      method: 'GET',
      cache: 'no-store'
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            'HTTP ' + response.status
          );
        }

        return response.json();
      })
      .then(function (data) {
        console.log(
          '[Látogatófigyelő] API-válasz:',
          data
        );

        var count = parseInt(
          data.viewers !== undefined
            ? data.viewers
            : data.count,
          10
        );

        if (isNaN(count)) {
          count = 0;
        }

        return count;
      })
      .catch(function (error) {
        console.error(
          '[Látogatófigyelő] Nézőszám-lekérdezési hiba:',
          error
        );

        return 0;
      });
  }

  /*
   * Megkeresi, hova kerüljön a látogatószám.
   */
  function findBadgeTarget() {
    var selectors = [
      '.artdet__stock',
      '.product__stock',
      '.artdet-stock',
      '.stock-status',
      '.stock_status',
      '[class*="stock-status"]',
      '[class*="artdet__stock"]',
      '.artdet__price',
      '.product__price',
      '.product-price',
      '[class*="artdet__price"]',
      '[class*="product-price"]',
      '.artdet__name',
      '.product-name',
      'main h1',
      'h1'
    ];

    for (var i = 0; i < selectors.length; i++) {
      var element = document.querySelector(
        selectors[i]
      );

      if (element) {
        return element;
      }
    }

    return null;
  }

  function removeBadge() {
    var badge = document.getElementById(BADGE_ID);

    if (badge) {
      badge.remove();
    }
  }

  function renderBadge(count) {
    var existing = document.getElementById(BADGE_ID);

    if (count < MIN_VIEWERS_TO_SHOW) {
      removeBadge();
      return;
    }

    var text =
      count === 1
        ? '1 ember nézi most ezt a terméket'
        : count +
          ' ember nézi most ezt a terméket';

    if (existing) {
      var existingText =
        existing.querySelector('.bb-live-text');

      if (existingText) {
        existingText.textContent = text;
      }

      return;
    }

    var target = findBadgeTarget();

    if (!target) {
      console.warn(
        '[Látogatófigyelő] A termékazonosító megvan, de a badge helye nem található.'
      );

      return;
    }

    var badge = document.createElement('div');

    badge.id = BADGE_ID;

    var dot = document.createElement('span');
    dot.className = 'bb-live-dot';

    var textElement = document.createElement('span');
    textElement.className = 'bb-live-text';
    textElement.textContent = text;

    badge.appendChild(dot);
    badge.appendChild(textElement);

    target.insertAdjacentElement(
      'afterend',
      badge
    );

    console.log(
      '[Látogatófigyelő] Badge megjelenítve:',
      count
    );
  }

  function addStyles() {
    if (
      document.getElementById(
        'bb-live-viewers-style'
      )
    ) {
      return;
    }

    var style = document.createElement('style');

    style.id = 'bb-live-viewers-style';

    style.textContent =
      '#bb-live-viewers {' +
        'display:flex;' +
        'align-items:center;' +
        'gap:7px;' +
        'width:fit-content;' +
        'margin-top:8px;' +
        'margin-bottom:8px;' +
        'font-size:13px;' +
        'line-height:1.4;' +
        'color:#5f5e5a;' +
      '}' +

      '#bb-live-viewers .bb-live-dot {' +
        'display:inline-block;' +
        'width:8px;' +
        'height:8px;' +
        'flex-shrink:0;' +
        'border-radius:50%;' +
        'background:#2a9d3f;' +
        'animation:bbLiveDotPulse 1.6s ease-in-out infinite;' +
      '}' +

      '@keyframes bbLiveDotPulse {' +
        '0%,100%{opacity:1;transform:scale(1);}' +
        '50%{opacity:.35;transform:scale(.85);}' +
      '}';

    document.head.appendChild(style);
  }

  function updateViewerData(
    productId,
    token
  ) {
    /*
     * Először elküldi a heartbeatet,
     * utána kéri le a nézőszámot.
     */
    sendHeartbeat(productId, token)
      .then(function () {
        return fetchCount(productId);
      })
      .then(function (count) {
        renderBadge(count);
      })
      .catch(function () {
        /*
         * A részletes hiba fent már kiírásra került.
         */
      });
  }

  function init() {
    addStyles();

    var productId = getProductId();

    if (!productId) {
      console.log(
        '[Látogatófigyelő] Ez nem termékoldal, vagy az URL-ből nem olvasható ki az azonosító.'
      );

      return;
    }

    var token = getSessionToken();

    console.log(
      '[Látogatófigyelő] Elindítva. Termékazonosító:',
      productId
    );

    console.log(
      '[Látogatófigyelő] Munkamenet:',
      token
    );

    updateViewerData(productId, token);

    window.setInterval(function () {
      updateViewerData(productId, token);
    }, HEARTBEAT_INTERVAL);
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
});

/* ── szallitasi-mod-ghost-34e99729.js (sablon/idegen/, a régi UNAS Script fájlja változatlanul) ── */
window.bbIdegen('szallitasi-mod-ghost', function () {
/* Szállítási mód – ghost | v4.16 – 2026-10-16: csak személyes átvételes (BB_SZALL_TILT.x) és labor-termék (l) mellett nincs doboz; saját kiszállítás nélkül (n) „Futárral szállítjuk”; csomagpont-/postatiltott terméknél nem ígér postát | v4.15 – 2026-10-15: „ingyen kivisszük” csak a termékre aktivált ingyenes Bí-Bor módnál (BB_SZALL_TILT.i, a szállítási tiltások adatából), terjedelmes: BB_SZALL_TILT.b; a matrica-keresés a hasonló/kiegészítő sáv matricáit nem nézi | v4.14 – 2026-09-30 | az ingyenes FÁMA mód új neve: Ingyenes házhozszállítás - PannonXP Futárszolgálat | MPL házhoz (termékszinten engedélyezve) elsőbbséget kap a PannonXP-vel szemben | PannonXP (6620166) + Fáma: fizetős Bí-Bor mellett is látszanak, ingyenes mód mellett rejtve; ha Fáma elérhető, PannonXP és a csomagpontok rejtve */
!function(){"use strict";var e="https://shop.unas.hu/shop_ordered/63361/pic/documents/bibor_irsz_v2.txt",t=null;function n(e){var t={};return String(e||"").split(";").forEach(function(e){var n=e.indexOf(":");n>0&&(t[e.slice(0,n).trim()]=e.slice(n+1).trim())}),t}function r(){if(!t)if(window.BB_ZIP_NAMES)t=n(window.BB_ZIP_NAMES);else{0,t={};var r=document.createElement("script");r.src=e,r.async=!0,r.onload=function(){window.BB_ZIP_NAMES&&(t=n(window.BB_ZIP_NAMES),document.dispatchEvent(new CustomEvent("bbZipChanged")))},document.head.appendChild(r)}}function a(e){return r(),t&&t[String(e).trim()]||""}function i(){for(var e in r(),t)if(Object.prototype.hasOwnProperty.call(t,e))return!0;return!1}function o(e){return!i()||!!t[String(e).trim()]}var l=null;function s(){if(!l)if(window.BB_FREE_COURIER)l=n(window.BB_FREE_COURIER);else{l={};var e=document.createElement("script");e.src="https://shop.unas.hu/shop_ordered/63361/pic/documents/bibor_ingyenes_futar.txt",e.async=!0,e.onload=function(){window.BB_FREE_COURIER&&(l=n(window.BB_FREE_COURIER),document.dispatchEvent(new CustomEvent("bbZipChanged")))},document.head.appendChild(e)}}function d(){var e=document.querySelector('[class*="page_artdet_func_favourites_"]');if(e){var t=String(e.className).match(/page_artdet_func_favourites_([A-Za-z0-9_\-]+)/);if(t)return t[1].replace(/__unas__/g,"-")}var n=document.querySelector('#page_artdet_content .artdet__sku, #page_artdet_content [class*="sku"]');if(n){var r=(n.textContent||"").match(/([A-Za-z0-9_\-]{3,})\s*$/);if(r)return r[1]}return""}var c,p="bb_zip",u=(c={},"10:41,42,43,44,45,46,47,48,95,96,97,98;11:01,02,03,04,05,06,07,08,31,35,38,39,41,42,43,44,45,47,48,49,51,52,53,54,55,56,57,58,61,62,63,64,65,71,72,73,74,81,82,83,84,85,86,88,91,92,93,94,95,96;12:01,02,03,04,05,11,12,13,14,15,21,22,23,24,25,37,38,39;20:30,38,39,40,49,51,53,60,63,64,65,66,71,72,73,89,91,93;21:00,11,17,19,41,42,43,44,45,51;22:00,09,11,12,13,16,17,20,25,30,33,34,35,41,44,51;23:00,10,14,21,30,36,37,38,40,44,45,51,60,63,64,70,71,73,75,76,77,81;24:00,07,21,22,23,24,25,26,27,28,31,32,33,34,35,40,51,53,54,55,56,57,58,59,61,62,63,64,65,71,72,73,75,76,77,81,83,84,85,90;25:25,26;27:00,12,13,21,30,35,36,37,38,50;28:00,21,22,23,24,31,32,33,34,35,36,37,40,51,52,53,54,55,56,58,59,61,62,70,79,81,82,83,84,85,86,87,88,89,90,98;29:41,42,43,44,45,46,47;60:00,08,31,32,33,34,35,41,42,43,44,45,50,55,60,62,64,65,66,67,70,75,76,77,78,80,85,86,87,88,90,96,97,98;61:00,11,12,13,14,15,16,20,31,32,33,34,35,36;62:00,11,21,22,23,24,30,35,36,37,38,39;63:00,11,20,21,23,25,26,27,28,31,32,33,34,35,36,37,41,42,43,44,45,46,47,48,51,52,53;64:00,11,12,13,14,21,22,23,24,25,30,35,40,44,45,46,47,48,49,51,52,53,54,55,56;65:00,03,11,12,13,21,22,23,24,25,27,28;66:46;67:00,10,20,21,22,23,24,25,26,27,28,29,53,54,56,57,58,60,62,63,64,65,66,67,68,69,71,81,82,83,84,85,86,87,91,92,93,94,95;70:00,03,11,12,13,14,15,16,17,18,19,20,25,26,27,30,38,39,41,42,43,44,45,47,51,52,54,56,57,61,62,63,64,65,66,67,68,71,72,81,82,83,84,85,86,87,90,91,92,93,94,95,97,98,99;71:00,21,22,30,31,32,33,34,35,36,40,42,43,44,45,46,47,48,49,50,58,59,61,62,63,64,65,71,72,73,74,75,76,81,82,83,84,85,86,87,88,91,92,93,94,95;72:00,11,12,13,14,15,24,25,26,27,28,51,52,53,55,56,57,58,61,71,72,73,74,75,76,79,81,82,83,84,85;73:00,04,05,31,32,33,34,41,42,43,44,45,46,47,48,49,51,52,53,54,55,56,57,61,62,70,81,83,84,85,86,91,93,94,96;74:00,31,32,34,35,36,39,41,42,43,44,51,52,53,54,55,56,57,58,61,63,64,65,71,72,73,74,75,76,77,78,79;75:00,11,12,13,14,15,16,17,21,22,23,24,25,26,27,30,32,33,35,36,37,38,39,41,42,43,44,45,51,52,53,55,56,57,61,62,63,64,70,82,84,85,86,87,88,89;76:00,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,39,61,63,64,66,68,71,72,73,75,77,78,81,82,83,91,93,94,95,96;77:00,11,12,14,15,16,17,18,20,23,24,25,26,27,28,31,32,33,35,37,41,42,43,44,45,47,51,52,53,54,55,56,57,59,61,62,63,66,68,71,72,73,74,75,81,82,83,84,85;78:00,11,12,13,14,15,17,22,23,24,25,26,27,31,33,34,36,37,38,39,41,43,46,47,49,50,51,53,54;79:00,12,13,14,15,18,21,22,23,24,25,26,32,34,35,36,37,40,51,53,54,57,58,60,64,66,67,68,71,72,73,75,76,77,79,80,81,85,87,88;80:00,19,41,42,43,44,45,46,51,52,53,54,55,56,60,65,66,71,72,73,74,80,81,82,83,85,86,87,88,89,92,93,95,96,97;81:00,05,09,11,12,21,22,23,24,25,26,27,30,31,32,33,34,35,36,37,38,39,42,43,44,45,46,51,52,54,56,57,61,62,63,64,71,72,74,75,81,82,83,84,91,92,93,94,95,96;82:00,20,25,26,27,28,29,30,33,37,41,42,43,44,45,46,47,48,51,52,53,54,55,56,57,58,61,63,64,65,71,72,73,74,75,81,82,83,84,86,91,92,94,95,96,97;83:00,08,11,12,13,14,15,16,17,18,19,21,30,41,42,44,45,46,47,48,49,51,52,53,54,55,56,57,60,71,72,73,80,91,92,93,94,95;84:00,09,11,12,13,14,15,16,17,18,19,20,22,23,24,25,26,27,28,29,30,35,38,39,40,41,42,43,44,45,46,47,48,49,51,52,54,55,56,57,58,60,68,69,71,73,74,75,76,77,78,79,81,82,83,84,85,91,92,93,94,95,96,97;85:00,11,12,13,14,15,16,17,18,21,22,23,31,32,33,41,42,43,51,52,53,54,55,56,57,58,61,62,63,64,65,71,72,81,82,91,92,93,94,95,96,97,98;86:00,12,13,14,17,18,19,21,22,23,24,25,26,27,28,30,35,36,37,38,40,46,47,48,49,51,52,53,54,55,56,58,60,66,67,68,69,71,72,73,74,75,76,81,83,84,85,91,92,93,94,95,96,97,98,99;87:00,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,28,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,49,51,52,53,54,56,61,62,64,65,67,71,72,73,74,76,77,78,82,84,85,88,89,90,92,93,95,96,97,98,99;88:00,08,09,21,22,24,25,27,31,32,34,35,40,49,51,52,53,54,55,56,57,58,61,62,63,64,65,66,68,72,73,74,76,77,78,79,81,82,83,85,86,87,88,91,93,95,96,97;89:00,04,11,12,13,14,15,17,18,19,21,23,24,25,26,28,29,31,32,34,35,36,43,44,45,46,47,48,49,51,53,54,56,57,58,60,66,69,71,73,75,76,77,78,81,83,84,85,86,88,89,90,91,92,94,95,96,97,98,99;90:00,11,12,19,21,22,23,24,25,26,27,28,29,30,73,74,81,82,83,84,85,86,88,89,90,91,92,93,94,95,96,97,98,99;91:11,12,13,21,22,23,24,25,27,31,32,33,34,35;93:12,13,14,15,16,17,24,25,26,27,41,42,43,44,45,46,62,63,64,65,72,73,74,75;94:61,62,63,64,71,72,73,74,75,76;95:00,11,12,13,14,15,16,17,21,22,23,31,32,33,34,41,42,44,45,47,49,51,52,53,54,55,56,61;96:00,08,09,11,12,21,22,23,24,25,32,33,34,35,36,41,43,51,52,53,54,61,62,63,64,65,71,72,73,74,75,76,81,82,83,84,85;97:00,07,21,22,23,24,25,26,27,30,33,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,51,52,54,56,57,61,62,63,64,66,71,72,73,74,75,76,77,81,82,83,84,89,91,92,93,94,95,96,97,98;98:00,11,12,13,14,21,23,24,25,26,31,32,33,34,35,36,41;99:00,09,12,13,14,15,21".split(";").forEach(function(e){var t=e.split(":");t[1].split(",").forEach(function(e){c[t[0]+e]=1})}),c);function m(e){return 1===u[String(e).trim()]}function b(){try{return localStorage.getItem(p)||""}catch(e){return""}}function f(e){try{e?(localStorage.setItem(p,e),localStorage.setItem(p+"_src","kezi")):(localStorage.removeItem(p),localStorage.removeItem(p+"_src"))}catch(e){}document.dispatchEvent(new CustomEvent("bbZipChanged",{detail:{zip:e}}))}var BBX={"01229":1,"01230":1,"29383":1,"32082":1,"35058":1,"32004":1,"36701_140":1,"32005":1,"32006":1,"32007":1,"32009":1,"40055":1,"04507_150":1,"33280":1,"32000":1,"32001":1,"31467":1,"32003":1,"32008":1,"04091":1,"24571":1,"24572":1,"24645":1,"24573":1,"20169":1,"20170":1,"20859":1,"26329":1,"33430":1},g={askSmall:"Szállítási területünkön a 10 kg feletti rendelést nem futárszolgálattal küldjük, hanem a saját munkatársunk viszi ki. Adja meg az irányítószámát, és megmutatjuk, mi vonatkozik Önre.",inSmall:"Saját szállítás 10 kg felett – {city} ({zip})",inSmallText:"{city} a saját szállítási területünkön van. A 10 kg feletti rendelést mi magunk visszük ki, a kisebb csomagot futárral vagy postával küldjük.",inSmallList:["10 kg feletti rendelésnél saját munkatársunk viszi ki","Előre egyeztetett időpontban érkezünk","!10 kg alatt futárral vagy postával küldjük","!A pontos díjat a kosárban látja"],cartZoneSmall:"Erre a címre 10 kg feletti rendelést viszünk ki saját autóval – ezt a kosarat futárral vagy postával küldjük.",ask:"Kiszállítjuk saját autónkkal?",askText:"Szállítási területünkön nem futárszolgálattal küldjük a rendelést, hanem a saját munkatársunk viszi ki. Adja meg az irányítószámát, és megmutatjuk, mi vonatkozik Önre.",placeholder:"Irányítószám",button:"Ellenőrzés",change:"Másik irányítószám",fromProfile:"A fiókjában mentett szállítási cím alapján.",badZip:"Négyjegyű irányítószámot adjon meg.",checking:"Ellenőrzés…",noSuchZip:"Ilyen irányítószám nincs Magyarországon. Kérjük, ellenőrizze.",inFree:"Ingyenes házhozszállítás – {city} ({zip})",inFreeText:"Jó hírünk van: {city} a saját szállítási területünkön van, ezt a terméket ingyen kivisszük.",inPaid:"Saját szállítás – {city} ({zip})",inPaidText:"{city} a saját szállítási területünkön van, ezt a terméket mi magunk visszük ki.",cartTitle:"Szállítás ellenőrizve: {zip} – {city}",cartZoneOk:"Saját futárszolgálatunk elérhető erre a címre.",cartZoneNo:"Erre a címre futárszolgálattal vagy raklapos kiszállítással szállítunk.",cartCourier:"Futárszolgálattal küldjük, az irányítószámtól függetlenül.",cartFree:"A jelenlegi kosár ingyenesen szállítható.",cartPaid:"A szállítási díjat az alábbi módoknál látja.",cartRecalc:"A kosár módosítása esetén a szállítási jogosultságot automatikusan újraellenőrizzük.",inFreeList:["Saját munkatársunk viszi ki, nem futárszolgálat","Előre egyeztetett időpontban érkezünk","A helyszínen lepakoljuk","Használat, beüzemelés: ott helyben megbeszéljük"],inPaidList:["Mi magunk szállítjuk ki, nem futárszolgálattal","Előre egyeztetett időpontban érkezünk","A törékeny és nagyméretű árut is biztonságban tudhatja","!A pontos díjat a kosárban látja"],outList:["!Futárszolgálattal vagy raklapos kiszállítással küldjük","!A választható módokat és a díjat a kosárban látja","Villányi üzletünkben személyesen is átveheti","Nagyobb gépek beüzemeléséről telefonon egyeztetünk"],courierTitle:"Ingyenes szállítás egész Magyarországra",courierText:"Ezt a terméket díjmentesen kiszállítjuk, bárhová az országban – az irányítószámtól függetlenül.",courierList:["{carrier} futárszolgálattal küldjük, díjmentesen","A csomag útját nyomon követheti","Villányi üzletünkben személyesen is átveheti","!Ha mást is rendel mellé, annak a súlya után lehet szállítási díj"],carrierD:"DPD",carrierF:"PannonXP",nbTitle:"Futárral szállítjuk – {city} ({zip})",nbText:"Ezt a terméket futárszolgálattal küldjük, saját autónkkal nem szállítjuk.",out:"Futárral szállítunk – {city} ({zip})",outText:"{city} kívül esik a saját szállítási területünkön."};function z(){if(!document.getElementById("bb-zip-style")){var e=document.createElement("style");e.id="bb-zip-style",e.textContent='.bb-zip{position:relative;z-index:1;clear:both;width:100%;box-sizing:border-box;border:1px solid #cfe0c8;background:#f4f9f1;border-radius:6px;padding:16px 18px;margin:18px 0;font-size:1.3rem;line-height:1.55;color:#1B2036;}.bb-zip--in{border-color:#8DBC5A;background:#f1f8e8;}.bb-zip--out{border-color:#e2ddc9;background:#faf8f0;}.bb-zip__head{display:flex;align-items:center;gap:12px;margin-bottom:8px;}.bb-zip__logo{width:76px;height:auto;flex:0 0 auto;border-radius:4px;background:#fff;padding:3px;}@media (max-width:575px){.bb-zip__logo{width:56px;}}.bb-zip__title{display:block;font-weight:700;font-size:1.45rem;margin-bottom:5px;color:#3d6b2a;}.bb-zip__head .bb-zip__title{margin-bottom:0;}.bb-zip--out .bb-zip__title{color:#7a6a3a;}.bb-zip__text{display:block;text-align:justify;hyphens:auto;}.bb-zip__form{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:center;}.bb-zip__input{width:120px;padding:7px 10px;border:1px solid #c4cdbb;border-radius:4px;font-size:1.4rem;background:#fff;color:#1B2036;}.bb-zip__btn{padding:7px 16px;border:0;border-radius:4px;background:#8DBC5A;color:#fff;font-weight:700;font-size:1.3rem;cursor:pointer;}.bb-zip__btn:hover{background:#7aa84b;}.bb-zip__link{background:none;border:0;padding:0;margin-top:8px;color:#3d6b2a;text-decoration:underline;cursor:pointer;font-size:1.2rem;display:inline-block;}.bb-zip__err{color:#c0392b;font-size:1.2rem;display:block;margin-top:6px;}.bb-zip__list{list-style:none;margin:6px 0 0;padding:0;}.bb-zip__list li{position:relative;padding-left:20px;margin:3px 0;}.bb-zip__list li:before{content:"\\2713";position:absolute;left:0;color:#5d9b2e;font-weight:700;}.bb-zip__list li.is-info:before{content:"\\2139";color:#7a6a3a;}.bb-zip__note{display:block;margin-top:8px;font-size:1.2rem;color:#5a6472;}#bb-zip-artdet.bb-zip--sticky{position:sticky;top:var(--bb-zip-top,0px);box-shadow:0 2px 6px rgba(0,0,0,.06);}@media (max-width:767px){\u0023bb-zip-artdet.bb-zip--sticky{position:static;box-shadow:none;}}',document.head.appendChild(e)}}function bbTilt(e){var t=window.BB_SZALL_TILT,n={};return t&&t.t&&Object.keys(t.t).forEach(function(r){("|"+t.t[r]+"|").indexOf("|"+e+"|")>-1&&r.split(".").forEach(function(e){n[e]=1})}),n}function bbNoPost(e){var t=bbTilt(e);return!!(t[5978638]&&t[6099151]&&t[6099256]&&t[6099276])}function bbSzall(e,t){var n=window.BB_SZALL_TILT;return n&&"string"==typeof n[e]?("|"+n[e]+"|").indexOf("|"+t+"|")>-1:null}function h(t){var n=bbSzall("i",t);if(null!==n)return n;for(var e=document.querySelectorAll("#page_artdet_content .stickers .sticker, #page_artdet_content .sticker.badge"),r=0;r<e.length;r++)if(!(e[r].closest&&e[r].closest("#artdet__similar-products,#artdet__additional-products,#artdet__gift-products,#artdet__package-offers,.js-related-products"))&&/ngyenes/i.test(e[r].textContent||""))return!0;return!1}function k(e,t,n){return e.replace(/\{zip\}/g,t).replace(/\{city\}/g,n||"a(z) "+t)}function _(e,t){if(t.freeCourier){e.className="bb-zip bb-zip--in",e.innerHTML="";var n=document.createElement("strong");n.className="bb-zip__title",n.textContent=g.courierTitle,e.appendChild(n);var r=document.createElement("span");r.className="bb-zip__text",r.textContent=g.courierText,e.appendChild(r);var l=document.createElement("ul");l.className="bb-zip__list";var s="F"===t.freeCourier?g.carrierF:g.carrierD;return g.courierList.forEach(function(e){var t=document.createElement("li");"!"===e.charAt(0)&&(t.className="is-info",e=e.slice(1)),t.textContent=e.replace("{carrier}",s),l.appendChild(t)}),void e.appendChild(l)}var d=b();e.className="bb-zip",e.innerHTML="";var c=document.createElement("strong");c.className="bb-zip__title";var p=document.createElement("span");if(p.className="bb-zip__text",!d){c.textContent=g.ask,p.textContent=t.askText||g.askText,e.appendChild(c),e.appendChild(p);var u=document.createElement("div");u.className="bb-zip__form";var z=document.createElement("input");z.type="text",z.inputMode="numeric",z.maxLength=4,z.className="bb-zip__input",z.placeholder=g.placeholder,z.setAttribute("aria-label",g.placeholder);var h=document.createElement("button");h.type="button",h.className="bb-zip__btn",h.textContent=g.button;var v=document.createElement("span");function F(e){if(!o(e))return v.textContent=g.noSuchZip,z.focus(),void z.select();v.textContent="",f(e)}function Z(){var e=(z.value||"").replace(/\D/g,"");if(4===e.length)if(v.textContent="",i())F(e);else{var t=!1,n=h.textContent;h.disabled=!0,h.textContent=g.checking,document.addEventListener("bbNamesLoaded",r),setTimeout(r,2500)}else v.textContent=g.badZip;function r(){t||(t=!0,document.removeEventListener("bbNamesLoaded",r),h.disabled=!1,h.textContent=n,F(e))}}return v.className="bb-zip__err",h.addEventListener("click",Z),z.addEventListener("keydown",function(e){"Enter"===e.key&&(e.preventDefault(),Z())}),u.appendChild(z),u.appendChild(h),e.appendChild(u),void e.appendChild(v)}if(!o(d))return f(""),_(e,t);var y=m(d),C=a(d);if(t.cart){e.className="bb-zip "+(y?"bb-zip--in":"bb-zip--out"),c.textContent=k(g.cartTitle,d,C),e.appendChild(c);var E=document.createElement("ul");function P(e,t){var n=document.createElement("li");t&&(n.className="is-info"),n.textContent=e,E.appendChild(n)}E.className="bb-zip__list","courier"===t.freeKind?P(g.cartCourier,!1):y&&!t.bibor?P(g.cartZoneSmall,!0):P(y?g.cartZoneOk:g.cartZoneNo,!y),P(t.free?g.cartFree:g.cartPaid,!t.free),e.appendChild(E);var w=document.createElement("span");w.className="bb-zip__note",w.textContent=g.cartRecalc,e.appendChild(w);var j=document.createElement("button");return j.type="button",j.className="bb-zip__link",j.textContent=g.change,j.addEventListener("click",function(){f("")}),void e.appendChild(j)}t.nb&&(y=!1),e.className="bb-zip "+(y?"bb-zip--in":"bb-zip--out"),y&&t.free?(c.textContent=k(g.inFree,d,C),p.textContent=k(g.inFreeText,d,C)):y&&t.small?(c.textContent=k(g.inSmall,d,C),p.textContent=k(g.inSmallText,d,C)):y?(c.textContent=k(g.inPaid,d,C),p.textContent=k(g.inPaidText,d,C)):(c.textContent=k(t.nb?g.nbTitle:g.out,d,C),p.textContent=k(t.nb?g.nbText:g.outText,d,C));var S=y?t.free?g.inFreeList:t.small?g.inSmallList:g.inPaidList:g.outList;t.nopost&&(p.textContent=p.textContent.replace(" vagy postával",""),S=S.map(function(e){return e.replace(" vagy postával","")}));if(y){var N=document.createElement("div");N.className="bb-zip__head";var A=document.createElement("img");A.className="bb-zip__logo",A.src="https://shop.unas.hu/shop_ordered/63361/pic/icon/shipping_5630939.png",A.alt="Bí-Bor Futárszolgálat",A.loading="lazy",A.onerror=function(){this.style.display="none"},N.appendChild(A),N.appendChild(c),e.appendChild(N)}else e.appendChild(c);e.appendChild(p);var B=document.createElement("ul");if(B.className="bb-zip__list",S.forEach(function(e){var t=document.createElement("li");"!"===e.charAt(0)&&(t.className="is-info",e=e.slice(1)),t.textContent=e,B.appendChild(t)}),e.appendChild(B),"profil"===x()){var I=document.createElement("span");I.className="bb-zip__note",I.textContent=g.fromProfile,e.appendChild(I)}var L=document.createElement("button");L.type="button",L.className="bb-zip__link",L.textContent=g.change,L.addEventListener("click",function(){f("")}),e.appendChild(L)}function v(){var e=document.getElementById("bb-zip-artdet");e&&e.classList.remove("bb-zip--sticky")}var y=["/cimek"];function x(){try{return localStorage.getItem(p+"_src")||"kezi"}catch(e){return"kezi"}}function C(){return!!document.querySelector(".logged-in, #container.logged-in, body.logged-in")}function E(){r(),s(),function(){if(!C()&&"profil"===x())try{localStorage.removeItem(p),localStorage.removeItem(p+"_src"),sessionStorage.removeItem("bb_zip_tried")}catch(e){}}(),function(){if(document.getElementById("page_order_mods_shipping")||document.getElementById("ud_shop_order_mods")||document.querySelector(".page_shop_order_mods")){var e="",t=document.querySelector('select.js-address-select[data-type="shipping"]')||document.querySelector('select[id^="shipping_address"]')||document.querySelector("select.js-address-select")||document.querySelector('select[name*="address"], select[id*="address"], select[name*="cim"]');if(t&&t.options&&t.selectedIndex>=0&&(e=t.options[t.selectedIndex].text||""),!e){var n=document.querySelector('input[name*="zip"], input[name*="irsz"], input[id*="zip"]');n&&(e=n.value||"")}var r=String(e).match(/(?:^|[^0-9])(\d{4})(?:[^0-9]|$)/);if(r){var a=r[1];if(a!==b())try{localStorage.setItem(p,a),localStorage.setItem(p+"_src","profil")}catch(e){}}}}(),function(){if(C()&&!b()&&window.fetch){try{if(sessionStorage.getItem("bb_zip_tried"))return;sessionStorage.setItem("bb_zip_tried","1")}catch(e){}var e=0;!function t(){e>=y.length||fetch(y[e++],{credentials:"same-origin"}).then(function(e){return e.ok?e.text():""}).then(function(e){for(var n=(new DOMParser).parseFromString(e,"text/html"),r="",i=n.querySelectorAll("*"),o=[],l=0;l<i.length;l++){var s=i[l];if(!s.children.length&&/alap[eé]rtelmezett sz[aá]ll[ií]t[aá]si c[ií]m/i.test(s.textContent||"")){var d=s.closest("[class]")||s,c=(d.className||"")+" "+(d.parentNode&&d.parentNode.className||""),u=/active|selected|current|primary|danger|is-default|--default/i.test(String(c)),m=s.closest('li, .card, [class*="address"], [class*="cim"]')||s.parentNode;o.push({card:m,active:u})}}function b(e){for(var t,n=(e&&e.textContent||"").replace(/\s+/g," "),r=/(\d{4})[\s,;]*([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ.\- ]{2,30})/g;null!==(t=r.exec(n));){var i=a(t[1]);if(i&&0===t[2].toLowerCase().indexOf(i.toLowerCase()))return t[1]}return""}for(var f=0;f<o.length&&!r;f++)o[f].active&&(r=b(o[f].card));if(!r)for(var g=0;g<o.length&&!r;g++)r=b(o[g].card);if(r||(r=b(n.body)),r){try{localStorage.setItem(p,r),localStorage.setItem(p+"_src","profil")}catch(e){}document.dispatchEvent(new CustomEvent("bbZipChanged"))}else t()}).catch(function(){t()})}()}}(),function(){var e=document.getElementById("page_artdet_content");if(e){var t,n=document.getElementById("bb-zip-artdet");if(!n){z(),(n=document.createElement("div")).id="bb-zip-artdet";var r=e.querySelector(".artdet__block-right")||e.querySelector(".artdet__data-right-inner");if(!r)return;r.appendChild(n)}var O={nincs:!(!bbSzall("x",t=d())&&!bbSzall("l",t)),nb:!!bbSzall("n",t),nopost:bbNoPost(t),free:h(t),freeCourier:(s(),l&&l[t]||""),small:!(BBX[t]||bbSzall("b",t)),askText:BBX[t]||bbSzall("b",t)?"":g.askSmall},K=[b(),x(),a(b()),O.free,O.freeCourier,O.small,O.nincs,O.nb,O.nopost].join("|");if(O.nincs){n.style.display="none",n.setAttribute("data-bb-key",K);return}n.style.display="";n.getAttribute("data-bb-key")===K&&n.firstChild||(_(n,O),n.setAttribute("data-bb-key",K),document.dispatchEvent(new CustomEvent("bbZipRendered"))),v()}}(),function(){var e=document.querySelector(".cart__only-shipping-modes");if(e)if(!C()||b()){var t=document.getElementById("bb-zip-cart");t||(z(),(t=document.createElement("div")).id="bb-zip-cart",e.parentNode.insertBefore(t,e)),"function"==typeof window.bbApplyFilterNow&&window.bbApplyFilterNow();for(var n=e.querySelectorAll(".cart__shipping-mode-name"),r=!1,a=null,q=!1,i=0;i<n.length;i++)if("none"!==n[i].style.display){for(var o=n[i].cloneNode(!0),l=o.querySelectorAll("span"),s=0;s<l.length;s++)l[s].parentNode.removeChild(l[s]);var d=(o.textContent||"").replace(/\s*-\s*$/,"").trim();/^b[ií]-?bor fut[aá]rszolg[aá]lat/i.test(d)&&(q=!0);if(!r&&/^ingyenes h[aá]zhozsz[aá]ll[ií]t[aá]s/i.test(d)){r=!0,a=/b[ií]-?bor/i.test(d)?(q=!0,"bibor"):"courier"}}_(t,{cart:!0,free:r,freeKind:a,bibor:q,askText:"Adja meg az irányítószámát, és csak az Önnél ténylegesen elérhető szállítási módokat mutatjuk."}),document.dispatchEvent(new CustomEvent("bbShippingRefilter"))}else{var c=document.getElementById("bb-zip-cart");c&&c.parentNode.removeChild(c)}}()}window.bbZone={inZone:m,savedZip:b};var w=null;window.addEventListener("scroll",function(){w||(w=setTimeout(function(){w=null,v()},120))},{passive:!0}),window.addEventListener("resize",function(){v()}),document.addEventListener("bbZipChanged",E),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",E):E(),new MutationObserver(function(){E()}).observe(document.body,{childList:!0,subtree:!1})}(),function(){"use strict";var e={6592211:{name:"Ingyenes házhozszállítás - Bí-Bor Futárszolgálat",kind:"bibor_free"},6592216:{name:"Ingyenes házhozszállítás - Bí-Bor Futárszolgálat, terjedelmes",kind:"bibor_free"},5630939:{name:"Bí-Bor Futárszolgálat",kind:"bibor_paid"},6602986:{name:"Bí-Bor Futárszolgálat - terjedelmes",kind:"bibor_paidx"},5979223:{name:"MPL Házhozszállítás",kind:"courier_mpl"},5978658:{name:"Fáma Futárszolgálat",kind:"courier"},6620166:{name:"PannonXP házhozszállítás",kind:"courier_pxp"},6592191:{name:"Ingyenes házhozszállítás - DPD Futárszolgálat",kind:"free_other"},6592206:{name:"Ingyenes házhozszállítás - PannonXP Futárszolgálat",kind:"free_other"},6592531:{name:"MyGLS XXL",kind:"home"},5978633:{name:"MyGLS házhozszállítás",kind:"home"},5978888:{name:"DPD futárszolgálat",kind:"home"},5655069:{name:"Raklapos kiszállítás",kind:"home"},5982901:{name:"Raklapos Kiszállítás -",kind:"home"},6593441:{name:"Terjedelmes áru szállítása – raklapos",kind:"home"},6593571:{name:"Terjedelmes áru szállítása – kisméretű",kind:"home"},6593586:{name:"Terjedelmes áru szállítása – közepes",kind:"home"},6593646:{name:"Terjedelmes áru szállítása – nagyméretű",kind:"home"},5980781:{name:"Futárszolgálat",kind:"home"},5979318:{name:"Ingyenes házhozszállítás",kind:"home"},5629089:{name:"Személyes átvétel Villányi üzletünkben",kind:"keep"},5978638:{name:"MyGLS csomagpont",kind:"point"},6099151:{name:"MPL Csomagautomata",kind:"point"},6099256:{name:"MPL Postán maradó",kind:"point"},6099266:{name:"MPL Postán maradó (terjedelmes)",kind:"point"},6099276:{name:"MPL Postapont (MOL kutak és COOP üzletek)",kind:"point"},5979228:{name:"MPL postapont",kind:"point"},5978903:{name:"DPD csomagpontok",kind:"point"},6127046:{name:"Borminta beküldése (vevő által fizetett szállítás)",kind:"keep"}},t="data-bb-hidden",n="bb-shipping-notice",r="bb-mods-notice",a="bb-shipping-style";function i(){if(!document.getElementById(a)){var e=document.createElement("style");e.id=a,e.textContent=".bb-notice{border:1px solid #cfe0c8;background:#f4f9f1;border-radius:6px;padding:12px 14px;margin:0 0 16px;color:#1B2036;font-size:1.3rem;line-height:1.5;text-align:justify;text-justify:inter-word;hyphens:auto;}.bb-notice__title{font-weight:700;display:block;margin-bottom:4px;color:#3d6b2a;}.bb-notice__text{display:block;color:#1B2036;text-align:justify;hyphens:auto;}",document.head.appendChild(e)}}function o(e,t,n){var r=document.createElement("div");r.id=e,r.className="bb-notice";var a=document.createElement("strong");a.className="bb-notice__title",a.textContent=t;var i=document.createElement("span");return i.className="bb-notice__text",i.textContent=n,r.appendChild(a),r.appendChild(i),r}function l(e){return String(e||"").replace(/[\u2013\u2014]/g,"-").replace(/\s+/g," ").trim().toLowerCase()}var s={};function d(t){return(e[t]||{}).kind||"unknown"}function c(e){var t={},n=!!!document.querySelector(".logged-in, #container.logged-in, body.logged-in")&&window.bbZone&&window.bbZone.savedZip()||"";n&&!window.bbZone.inZone(n)&&(t.bibor_free=!0,t.bibor_paid=!0,t.bibor_paidx=!0);var r=!1,a=!1,i=!1,x=!1,fm=!1,mp=!1;return e.forEach(function(e){var n=d(e);t[n]||("bibor_free"===n&&(r=!0),"free_other"===n&&(a=!0),"bibor_paid"===n&&(i=!0),"bibor_paidx"===n&&(x=!0),"courier"===n&&(fm=!0),"courier_mpl"===n&&(mp=!0))}),r?(t.home=!0,t.courier=!0,t.courier_pxp=!0,t.courier_mpl=!0,t.bibor_paid=!0,t.bibor_paidx=!0,t.free_other=!0):a?(t.home=!0,t.courier=!0,t.courier_pxp=!0,t.courier_mpl=!0,t.bibor_paid=!0,t.bibor_paidx=!0):i?(t.home=!0,t.bibor_paidx=!0):x&&(t.home=!0),fm&&!t.courier&&(t.courier_pxp=!0,t.point=!0),mp&&!t.courier_mpl&&(t.courier_pxp=!0),t}function p(e){e.hasAttribute(t)&&(e.style.display=e.getAttribute(t)||"",e.removeAttribute(t))}function u(e){e.hasAttribute(t)||(e.setAttribute(t,e.style.display||""),e.style.display="none")}function m(e){for(var t=e.cloneNode(!0),n=t.querySelectorAll("span"),r=0;r<n.length;r++)n[r].parentNode.removeChild(n[r]);var a=l(t.textContent).replace(/\s*-\s*$/,"");if(s[a])return s[a];var i=null,o=0;return Object.keys(s).forEach(function(e){0===a.indexOf(e)&&e.length>o&&(i=s[e],o=e.length)}),i}function b(){var e=document.querySelectorAll(".cart__only-shipping-modes");e.length&&Array.prototype.forEach.call(e,function(e){var t=Array.prototype.slice.call(e.querySelectorAll(".cart__shipping-mode-name"));t.forEach(p);var r=t.map(m),a=c(r.filter(Boolean));t.forEach(function(e,t){var n=r[t];n&&a[d(n)]&&u(e)});var l=!!document.querySelector(".logged-in, #container.logged-in, body.logged-in")||!(!window.bbZone||!window.bbZone.savedZip()),s=document.getElementById(n);l?s&&s.parentNode.removeChild(s):s||(i(),e.parentNode.insertBefore(o(n,"Melyik szállítás érvényes Önre?","Az itt látható módok és díjak tájékoztató jellegűek, mert a szállítási címet még nem ismerjük. Adja meg az irányítószámát, és megmutatjuk, kiszállítjuk-e saját autónkkal – ingyenes házhozszállításunk ugyanis csak meghatározott irányítószámokon érhető el."),e))})}function f(){var e=document.getElementById("page_order_mods_shipping");if(e){var n=Array.prototype.slice.call(e.querySelectorAll('.js-order-mods-item[id^="szall_mod_"]'));if(n.length){n.forEach(p);var a=n.map(function(e){return e.id.replace("szall_mod_","")}),l=c(a);var vk=a.filter(function(e){return!l[d(e)]}).map(d),vb=vk.some(function(e){return"bibor_free"===e||"bibor_paid"===e||"bibor_paidx"===e}),vc=vk.indexOf("courier")>-1||vk.indexOf("courier_pxp")>-1||vk.indexOf("courier_mpl")>-1,vt=vb&&vc?"A megadott irányítószámon saját autónkkal is kiszállítjuk a rendelést, de ha inkább futárszolgálatot választana, azt is megteheti. Ha személyesen venné át, azt is választhatja.":vb?"A megadott irányítószámon saját futárszolgálatunkkal szállítunk, ezért a futárszolgálatos módok nem jelennek meg. Ha személyesen venné át, azt is választhatja.":"A lista a kosár tartalma és a szállítási cím alapján áll össze. Terjedelmes vagy raklapos árunál csak az arra alkalmas módok választhatók.",vn=document.getElementById(r);if(vn){var vs=vn.querySelector(".bb-notice__text");vs&&vs.textContent!==vt&&(vs.textContent=vt)}else{i();var m=o(r,"Az Ön címére ezek a szállítási módok érhetők el",vt),b=e.querySelector(".order-mods__main-title");b&&b.nextSibling?b.parentNode.insertBefore(m,b.nextSibling):e.insertBefore(m,e.firstChild)}var f=!1;if(n.forEach(function(e,t){l[d(a[t])]&&(u(e),f=!0)}),f){var g=Array.prototype.slice.call(e.querySelectorAll('input[type="radio"]'));if(!g.some(function(e){return e.checked&&!e.closest("["+t+"]")})){var z=g.filter(function(e){return!e.closest("["+t+"]")})[0];z&&!z.checked&&z.click()}}}}}Object.keys(e).forEach(function(t){s[l(e[t].name)]=t});var g=null;function z(){g||(g=setTimeout(function(){g=null;try{b(),f()}catch(e){}},60))}function h(){z(),document.addEventListener("bbShippingRefilter",z),document.addEventListener("bbZipChanged",z),new MutationObserver(function(e){for(var n=0;n<e.length;n++){var r=e[n].target;if(!("attributes"===e[n].type&&r&&r.hasAttribute&&r.hasAttribute(t)))return void z()}}).observe(document.body,{childList:!0,subtree:!0})}window.bbApplyFilterNow=function(){try{b(),f()}catch(e){}},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",h):h()}();
});

/* ── varhato-beerkezes-felugro-a349bae0.js (sablon/idegen/, a régi UNAS Script fájlja változatlanul) ── */
window.bbIdegen('varhato-beerkezes-felugro', function () {
(function(){"use strict"
var CONFIG={toastContainers:["#toast-container","#overlay_cart_add"],toastItemSelector:".toast, .toast-success, .toast-message",paramId:"8812851",paramLabel:"Várható beérkezés",title:"A terméket a Puttonyba tettük",waitText:"Várhatóan raktárunkba érkezik: {date}",waitNote:"Ezt követően adjuk fel a csomagot.",inStockText:"Raktáron, azonnal szállítható",orderableText:"Jelenleg nincs készleten, megrendeljük",orderableNote:"{lead}",orderableNoteFallback:"A beszerzés után azonnal feladjuk a csomagot.",cartButtonText:"Tovább a kosárba",continueButtonText:"Vásárlás folytatása",stockUrl:"https:"+"//bibor."+"bi-bor"+".hu/keszlet-ellenorzes.php",shortText:"Raktáron, de nem a teljes mennyiség",shortNote:"A kért mennyiség jelenleg nincs teljes egészében raktáron. "+"Pontos készletinformációért írjon nekünk, kollégáink szívesen segítenek: ",shortEmailUser:"info",shortEmailDomain:"bi-bor"+".hu",autoCloseMs:2000,keepOpenWhenWaiting:true,closeOnOutsideClick:true,cardDetection:true,skipOnCards:false,cardHeuristic:false,mainCartSelector:".js-main-product-cart-btn, .js-main-cart-btn, #artdet__cart",cardSelector:"[id^='page_artlist_'], .carousel-cell.product, "+".product-box, .product-card, .artlist__item",showImage:true,cartUrl:"/shop_cart.php",debug:false}
var VERSION="2026.10.12"
var DATE_RE=/(\d{4}[.\-/]\s?\d{1,2}[.\-/]\s?\d{1,2}\.?)/
var PANEL_ID="bb-cart-panel"
var STYLE_ID="bb-cart-style"
var closeTimer=null
function log(){if(CONFIG.debug&&window.console){console.log.apply(console,["[cart-panel]"].concat([].slice.call(arguments)))}}var lastClick=null
var lastClickAt=0
function textLen(el){return(el.textContent||"").trim().length}function looksLikeCard(el){if(!el||el.nodeType!==1)return false
var pageH1=document.querySelector("h1")
if(pageH1&&el.contains(pageH1))return false
if(textLen(el)>4000||textLen(el)<5)return false
if(el.querySelector('h2, h3, h4, h5, .product-name, [class*="product-title"], '+'[class*="item-title"], [class*="artlist"] a'))return true
var links=el.querySelectorAll("a[href]")
for(var i=0;i<links.length;i++){if((links[i].textContent||"").trim().length>=6)return true}return false}function findCard(el){var pageH1=document.querySelector("h1")
if(CONFIG.cardSelector&&el.closest){var explicit=null
try{explicit=el.closest(CONFIG.cardSelector)}catch(e){explicit=null}if(explicit&&!(pageH1&&explicit.contains(pageH1))){log("kartya szelektor alapjan:",explicit.className)
return explicit}}if(CONFIG.cardHeuristic){var node=el
for(var i=0;i<14&&node&&node!==document.body;i++){if(looksLikeCard(node)){log("kartya heurisztikaval:",node.className)
return node}node=node.parentElement}}return null}function skuFromCardAttrs(card){var hay=(card.className||"")+" "+(card.id||"")
var m=hay.match(/(?:sku|artlist_additional|artlist_related)[_-]([A-Za-z0-9_\-\.]+)/)
return m?m[1]:null}function resolveContext(){if(!CONFIG.cardDetection)return{root:document,isCard:false}
if(!lastClick||Date.now()-lastClickAt>=8000){return{root:document,isCard:false}}try{if(lastClick.closest&&lastClick.closest(CONFIG.mainCartSelector)){log("fo termek gombja")
return{root:document,isCard:false}}}catch(e){}var card=findCard(lastClick)
if(card){log("kattintott termekkartya:",card.tagName,card.className)
return{root:card,isCard:true}}return{root:document,isCard:false}}function scopedQuery(root,selector){try{return root===document?document.querySelectorAll(selector):root.querySelectorAll(selector)}catch(e){return[]}}function looksLikeLogo(src){if(!src)return true
if(/^data:/i.test(src))return true
return/logo|favicon|placeholder|no[-_]?image|sprite|icon|badge|banner|sticker|matrica|szallitas|blank|spacer|loading/i.test(src)}function imgSrc(img){if(!img)return null
var cands=[img.currentSrc,img.getAttribute("src"),img.getAttribute("data-src"),img.getAttribute("data-original"),img.getAttribute("data-lazy"),img.getAttribute("data-echo")]
var ss=img.getAttribute("srcset")||img.getAttribute("data-srcset")
if(ss)cands.push(ss.split(",")[0].trim().split(/\s+/)[0])
for(var i=0;i<cands.length;i++){if(cands[i]&&!looksLikeLogo(cands[i]))return cands[i]}return null}function bestImageIn(root){var imgs=root.querySelectorAll("img")
var best=null,bestArea=-1
for(var i=0;i<imgs.length;i++){var src=imgSrc(imgs[i])
if(!src)continue
var w=imgs[i].naturalWidth||imgs[i].width||0
var h=imgs[i].naturalHeight||imgs[i].height||0
var area=w*h
if(area===0)area=1
if(area>bestArea){bestArea=area
best=src}}return best}function absUrl(src){if(!src)return null
try{return new URL(src,document.baseURI).href}catch(e){return src}}function findProductImage(fromJsonLd){var og=document.querySelector('meta[property="og:image"], meta[name="og:image"]')
if(og){var ogSrc=og.getAttribute("content")
if(ogSrc&&!looksLikeLogo(ogSrc)){log("kep: og:image")
return absUrl(ogSrc)}}if(fromJsonLd&&!looksLikeLogo(fromJsonLd)){log("kep: JSON-LD")
return absUrl(fromJsonLd)}var skipInside="header, nav, footer, #toast-container, #"+PANEL_ID+", .carousel, [class*='additional'], [class*='related'], [class*='artlist']"+(CONFIG.cardSelector?", "+CONFIG.cardSelector:"")
var imgs=document.querySelectorAll("img")
var best=null,bestArea=0
for(var i=0;i<imgs.length;i++){var img=imgs[i]
var inSkipped=false
try{inSkipped=!!img.closest(skipInside)}catch(e){inSkipped=false}if(inSkipped)continue
var src=imgSrc(img)
if(!src)continue
var w=img.naturalWidth||img.width||0
var h=img.naturalHeight||img.height||0
if(w<100||h<100)continue
var area=w*h
if(area>bestArea){bestArea=area
best=src}}if(best){log("kep: legnagyobb tartalmi kep")
return absUrl(best)}log("nem talaltam termekképet")
return null}function readProduct(ctx){var out={name:null,sku:null,image:null}
if(ctx.isCard){var card=ctx.root
var titleEl=card.querySelector('h2, h3, h4, .product-name, [class*="product-title"], [class*="item-title"]')
if(!titleEl){var links=card.querySelectorAll("a[href]")
var best=null
for(var i=0;i<links.length;i++){var t=(links[i].textContent||"").trim()
if(t.length>3&&(!best||t.length>best.length))best=t}if(best)out.name=best}else{out.name=(titleEl.textContent||"").trim()}out.sku=skuFromCardAttrs(card)
if(!out.sku){var m=(card.textContent||"").match(/Cikksz[\u00e1a]m:?\s*([A-Za-z0-9_\-\.]+)/)
if(m)out.sku=m[1]}if(CONFIG.showImage){var src=bestImageIn(card)
if(src)out.image=absUrl(src)
log("kartya kep:",out.image)}return out}var jsonLdImage=null
var h1=document.querySelector("h1")
if(h1)out.name=h1.textContent.trim()
var blocks=document.querySelectorAll('script[type="application/ld+json"]')
for(var b=0;b<blocks.length;b++){var data
try{data=JSON.parse(blocks[b].textContent)}catch(e){continue}var list=Array.isArray(data)?data:[data]
if(data&&data["@graph"])list=list.concat(data["@graph"])
for(var j=0;j<list.length;j++){var node=list[j]
if(!node||typeof node!=="object")continue
if([].concat(node["@type"]||[]).indexOf("Product")===-1)continue
if(node.sku)out.sku=node.sku
else if(node.mpn&&!out.sku)out.sku=node.mpn
if(!jsonLdImage&&node.image){var im=Array.isArray(node.image)?node.image[0]:node.image
jsonLdImage=im&&typeof im==="object"?im.url||im.contentUrl:im}if(!out.name&&(node.sku||node.offers))out.name=node.name||null}}if(!out.sku){var mm=document.body.textContent.match(/Cikksz[\u00e1a]m:?\s*([A-Za-z0-9_\-\.]+)/)
if(mm)out.sku=mm[1]}if(CONFIG.showImage)out.image=findProductImage(jsonLdImage)
return out}function cleanDate(m){return m?m[1].replace(/\s/g,""):null}var MAX_CONTEXT_LEN=200
function dateFrom(el){if(!el)return null
var txt=(el.textContent||"").trim()
if(!txt||txt.length>MAX_CONTEXT_LEN)return null
return cleanDate(txt.match(DATE_RE))}function inOtherCard(el,ctx){if(ctx&&ctx.isCard||!CONFIG.cardSelector||!el||!el.closest)return false
try{return!!el.closest(CONFIG.cardSelector)}catch(e){return false}}function readDateById(ctx){var root=ctx&&ctx.root?ctx.root:document
var id=CONFIG.paramId
if(!id)return null
var exact=["#page_artdet_product_param_spec_"+id,'[id$="_param_spec_'+id+'"]',"#page_artdet_product_param_value_"+id,'[id$="_param_value_'+id+'"]','[id$="_value_'+id+'"]','[id$="_param_'+id+'"]','[id*="product_param"][id*="'+id+'"]','[data-param-id="'+id+'"]','[data-parameter-id="'+id+'"]',"#param_"+id,"#parameter_"+id,"#param"+id,".param_"+id,".parameter_"+id,'[id="param-'+id+'"]','[class~="param-'+id+'"]']
for(var i=0;i<exact.length;i++){var nodes
nodes=scopedQuery(root,exact[i])
for(var j=0;j<nodes.length;j++){var el=nodes[j]
if(el.closest("#"+PANEL_ID)||inOtherCard(el,ctx))continue
var d=dateFrom(el)
if(d){log("datum: pontos ID minta",exact[i])
return d}d=dateFrom(el.nextElementSibling)
if(d){log("datum: pontos ID + szomszed",exact[i])
return d}}}var loose=['[id*="'+id+'"]','[class*="'+id+'"]','[data-id*="'+id+'"]','[name*="'+id+'"]']
for(var k=0;k<loose.length;k++){var ln
ln=scopedQuery(root,loose[k])
for(var m2=0;m2<ln.length;m2++){var le=ln[m2]
if(le.closest("#"+PANEL_ID)||inOtherCard(le,ctx))continue
var ld=dateFrom(le)
if(ld){log("datum: laza ID minta",loose[k],le.tagName,le.className)
return ld}}}return null}function readDateByLabel(ctx){var root=ctx&&ctx.root&&ctx.root!==document?ctx.root:document.body
var label=CONFIG.paramLabel.toLowerCase()
var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null)
var node
while(node=walker.nextNode()){var parent=node.parentElement
if(!parent||parent.closest("#"+PANEL_ID)||inOtherCard(parent,ctx))continue
var text=node.nodeValue.trim()
if(!text||text.length>MAX_CONTEXT_LEN)continue
if(text.toLowerCase().indexOf(label)===-1)continue
var d=cleanDate(text.match(DATE_RE))
if(d){log("datum: felirat + ertek egy szovegben")
return d}d=dateFrom(parent.nextElementSibling)
if(d){log("datum: felirat szomszedja")
return d}if(parent.parentElement&&parent.parentElement.children.length===1){d=dateFrom(parent.parentElement.nextElementSibling)
if(d){log("datum: szulo szomszedja")
return d}}var sib=parent.nextElementSibling
while(sib){d=dateFrom(sib)
if(d){log("datum: feliratot koveto elem")
return d}sib=sib.nextElementSibling}log("felirat ertek nelkul, keressuk tovabb")}return null}function readDateByValueClass(ctx){var root=ctx&&ctx.root?ctx.root:document
var label=CONFIG.paramLabel.toLowerCase()
var sels=".artdet__spec-param-value, .artdet__param-value, "+".data__item-value, .product__param-value, "+'[class*="param-value"], [class*="item-value"]'
var nodes=scopedQuery(root,sels)
for(var i=0;i<nodes.length;i++){var el=nodes[i]
if(el.closest&&el.closest("#"+PANEL_ID))continue
if(inOtherCard(el,ctx))continue
var block=null
try{block=el.closest('[id*="'+CONFIG.paramId+'"]')||el.closest(".artdet__spec-param, .data__item, .data__item-param, "+".product__param, .row, tr, li, dl")}catch(e){block=null}if(!block)continue
var btxt=(block.textContent||"").trim()
if(btxt.length>300)continue
if(btxt.toLowerCase().indexOf(label)===-1)continue
var d=dateFrom(el)
if(d){log("datum: ertek-elem alapjan",el.className)
return d}}return null}function readExpectedDate(ctx){var d=readDateById(ctx)||readDateByValueClass(ctx)||readDateByLabel(ctx)
if(!d)log("nincs varhato beerkezes ehhez a termekhez")
return d}function classToStatus(el){if(!el||!el.classList)return null
if(el.classList.contains("on-stock"))return"instock"
if(el.classList.contains("to-order"))return"orderable"
if(el.classList.contains("no-stock"))return"nostock"
return null}function inWarehouseBox(el){try{return!!el.closest('#artdet__warehouses, [class*="warehouse"], '+'[class*="uzlet"], [class*="store"], [id*="warehouse"]')}catch(e){return false}}function readStockStatus(ctx){var root=ctx.root===document?document:ctx.root
var main=root.querySelector(".artdet__stock, .product__stock")
var st=classToStatus(main)
if(st){log("keszlet: fo allapotjelzo ->",st)
return st}var all=root.querySelectorAll(".on-stock, .to-order, .no-stock")
for(var k=0;k<all.length;k++){if(inWarehouseBox(all[k])||inOtherCard(all[k],ctx))continue
st=classToStatus(all[k])
if(st){log("keszlet: osztaly alapjan ->",st)
return st}}var scope=root===document?document.body:root
var els=scope.querySelectorAll("*")
for(var i=0;i<els.length;i++){var el=els[i]
if(el.children.length>0)continue
if(el.closest("#"+PANEL_ID)||inOtherCard(el,ctx))continue
var t=(el.textContent||"").trim()
if(!t||t.length>60)continue
if(inWarehouseBox(el))continue
var around=el.parentElement&&el.parentElement.textContent||""
if(/[u\u00fc]zlet|bolt|szem[e\u00e9]lyes [a\u00e1]tv/i.test(around))continue
if(/rakt[a\u00e1]ron/i.test(t))return"instock"
if(/rendelhet[o\u0151]/i.test(t))return"orderable"
if(/nincs k[e\u00e9]szlet/i.test(t))return"nostock"}return"unknown"}function readLeadTime(ctx){var root=ctx.root===document?document:ctx.root
var walker=document.createTreeWalker(root===document?document.body:root,NodeFilter.SHOW_TEXT,null)
var node
while(node=walker.nextNode()){if(node.parentElement&&(node.parentElement.closest("#"+PANEL_ID)||inOtherCard(node.parentElement,ctx)))continue
var t=(node.nodeValue||"").trim()
if(!t||t.length>200)continue
if(/munkanap/i.test(t)&&/beszerz/i.test(t))return t}return null}function readStockHint(ctx){if(!ctx.isCard)return"instock"
var txt=ctx.root.textContent||""
if(/rakt[\u00e1a]ron/i.test(txt))return"instock"
if(/rendelhet[\u0151o]|nincs rakt|el[\u0151o]rendel/i.test(txt))return"unknown"
return"unknown"}function readQuantity(ctx){var root=ctx&&ctx.root?ctx.root:document
var input=(root.querySelector||document.querySelector).call(root,'input[name="db"], input[name="quantity"], .product-quantity input, input.quantity')
if(input){var n=parseInt(input.value,10)
if(!isNaN(n)&&n>0)return n}return 1}function cartUrl(){if(CONFIG.cartUrl)return CONFIG.cartUrl
var a=document.querySelector('a[href*="shop_cart.php"]')
return a?a.getAttribute("href"):"/shop_cart.php"}function checkStock(sku,qty,done){if(!CONFIG.stockUrl||!sku||!window.fetch)return
var L=String.fromCharCode(91),R=String.fromCharCode(93)
var url=CONFIG.stockUrl+"?"+"items="+encodeURIComponent(L+JSON.stringify([String(sku),qty])+R)
fetch(url,{credentials:"omit"}).then((function(r){return r.json()})).then((function(j){var v=j&&j.ok&&j.items?j.items[String(sku)]:null
log("keszlet valasz:",sku,qty,"->",v)
done(v)})).catch((function(e){log("keszlet hiba:",e&&e.message)}))}function markShort(panel){if(!panel||!panel.parentNode||panel.getAttribute("data-short"))return
panel.setAttribute("data-short","1")
if(closeTimer){clearTimeout(closeTimer)
closeTimer=null}var status=panel.querySelector(".bb-status")
if(status){status.className="bb-status bb-status--short"
while(status.firstChild)status.removeChild(status.firstChild)
status.appendChild(svgIcon("wait",17))
var st=document.createElement("span")
st.textContent=CONFIG.shortText
status.appendChild(st)}var info=panel.querySelector(".bb-info")
if(info){var email=CONFIG.shortEmailUser+String.fromCharCode(64)+CONFIG.shortEmailDomain
var note=document.createElement("p")
note.className="bb-note bb-note--short"
note.appendChild(document.createTextNode(CONFIG.shortNote))
var a=document.createElement("a")
a.href="mai"+"lto:"+email
a.textContent=email
note.appendChild(a)
info.appendChild(note)}}function injectStyle(){if(document.getElementById(STYLE_ID))return
var css=["#"+PANEL_ID+"{position:fixed;top:24px;left:50%;transform:translateX(-50%) translateY(-12px);","  z-index:2147483000;width:calc(100% - 32px);max-width:460px;box-sizing:border-box;","  background:#fff;border:1px solid #e3e8e3;border-radius:16px;","  box-shadow:0 18px 48px rgba(20,40,20,.18),0 2px 6px rgba(20,40,20,.06);","  font-family:inherit;color:#1b2a1b;opacity:0;","  transition:opacity .22s ease,transform .22s ease;overflow:hidden;}","#"+PANEL_ID+".is-open{opacity:1;transform:translateX(-50%) translateY(0);}","#"+PANEL_ID+" .bb-head{display:flex;align-items:center;gap:10px;","  padding:14px 48px 14px 18px;background:#f2f9f2;border-bottom:1px solid #e6efe6;}","#"+PANEL_ID+" .bb-head-text{font-weight:650;font-size:15px;color:#256b2b;}","#"+PANEL_ID+" .bb-close{position:absolute;top:10px;right:10px;width:32px;height:32px;","  display:flex;align-items:center;justify-content:center;border:0;background:transparent;","  border-radius:8px;cursor:pointer;color:#6b7a6b;padding:0;line-height:1;}","#"+PANEL_ID+" .bb-close:hover{background:rgba(0,0,0,.06);color:#1b2a1b;}","#"+PANEL_ID+" .bb-body{display:flex;gap:14px;padding:16px 18px 4px;}","#"+PANEL_ID+" .bb-thumb{flex:0 0 auto;width:56px;height:56px;border-radius:10px;","  object-fit:contain;background:#f6f8f6;border:1px solid #eef2ee;}","#"+PANEL_ID+" .bb-info{flex:1 1 auto;min-width:0;}","#"+PANEL_ID+" .bb-name{font-weight:650;font-size:15.5px;line-height:1.35;","  margin:0 0 8px;color:#12210f;}","#"+PANEL_ID+" .bb-meta{display:flex;align-items:center;gap:8px 12px;flex-wrap:wrap;}","#"+PANEL_ID+" .bb-qty{font-size:14px;color:#5c6a5c;background:#f2f4f2;","  padding:2px 9px;border-radius:999px;}","#"+PANEL_ID+" .bb-status{display:inline-flex;align-items:center;gap:6px;","  font-weight:650;font-size:14.5px;}","#"+PANEL_ID+" .bb-status--wait{color:#c0392b;}","#"+PANEL_ID+" .bb-status--stock{color:#2e7d32;}","#"+PANEL_ID+" .bb-status--short{color:#b26a00;}","#"+PANEL_ID+" .bb-note{margin:8px 0 0;font-size:13px;color:#6b7a6b;line-height:1.45;}","#"+PANEL_ID+" .bb-note--short{color:#5a4200;background:#fff8ec;border:1px solid #f0d9a8;","  border-radius:10px;padding:9px 11px;font-size:13.5px;}","#"+PANEL_ID+" .bb-note--short a{color:#b3261e;font-weight:700;text-decoration:underline;}","#"+PANEL_ID+" .bb-actions{display:flex;gap:10px;flex-wrap:wrap;padding:16px 18px 18px;}","#"+PANEL_ID+" .bb-btn{display:inline-block;padding:11px 20px;border-radius:999px;","  font-weight:700;font-size:14.5px;line-height:1.2;text-decoration:none !important;","  cursor:pointer;border:1px solid transparent;transition:background .15s ease;}","#"+PANEL_ID+" .bb-btn--primary{background:#e03127;color:#fff !important;}","#"+PANEL_ID+" .bb-btn--primary:hover{background:#c02219;}","#"+PANEL_ID+" .bb-btn--ghost{background:#fff;color:#3d4a3d !important;border-color:#d8e0d8;}","#"+PANEL_ID+" .bb-btn--ghost:hover{background:#f4f7f4;}","@media (max-width:520px){","  #"+PANEL_ID+"{top:12px;border-radius:14px;}","  #"+PANEL_ID+" .bb-actions .bb-btn{flex:1 1 100%;text-align:center;}","}"].join("\n")
var el=document.createElement("style")
el.id=STYLE_ID
el.textContent=css
document.head.appendChild(el)}function svgIcon(kind,size){var ns="http://www.w3.org/2000/svg"
var svg=document.createElementNS(ns,"svg")
svg.setAttribute("width",size||18)
svg.setAttribute("height",size||18)
svg.setAttribute("viewBox","0 0 24 24")
svg.setAttribute("fill","none")
svg.setAttribute("aria-hidden","true")
if(kind==="x"){var p=document.createElementNS(ns,"path")
p.setAttribute("stroke","currentColor")
p.setAttribute("stroke-width","2")
p.setAttribute("stroke-linecap","round")
p.setAttribute("d","M6 6l12 12M18 6L6 18")
svg.appendChild(p)
return svg}var c=document.createElementNS(ns,"circle")
c.setAttribute("cx","12")
c.setAttribute("cy","12")
c.setAttribute("r","10")
c.setAttribute("stroke","currentColor")
c.setAttribute("stroke-width","2")
svg.appendChild(c)
var path=document.createElementNS(ns,"path")
path.setAttribute("stroke","currentColor")
path.setAttribute("stroke-width","2")
path.setAttribute("stroke-linecap","round")
path.setAttribute("stroke-linejoin","round")
path.setAttribute("d",kind==="wait"?"M12 7v5l3 2":"M8 12.5l2.5 2.5L16 9")
svg.appendChild(path)
return svg}function closePanel(){var p=document.getElementById(PANEL_ID)
if(!p)return
if(closeTimer){clearTimeout(closeTimer)
closeTimer=null}document.removeEventListener("click",outsideClick,true)
p.classList.remove("is-open")
setTimeout((function(){if(p.parentNode)p.parentNode.removeChild(p)}),240)}function buildPanel(product,qty,date,stockHint,leadTime){injectStyle()
var signature=[product.name,qty,date||"",stockHint||"",leadTime||""].join("|")
var existing=document.getElementById(PANEL_ID)
if(existing){var sameContent=existing.getAttribute("data-signature")===signature
var age=Date.now()-(+existing.getAttribute("data-built-at")||0)
if(sameContent||age<1000){log("panel mar nyitva (azonos:",sameContent,", kora:",age,"ms) - nem epitjuk ujra")
return existing}}if(existing&&existing.parentNode)existing.parentNode.removeChild(existing)
if(closeTimer){clearTimeout(closeTimer)
closeTimer=null}var panel=document.createElement("div")
panel.id=PANEL_ID
panel.setAttribute("data-signature",signature)
panel.setAttribute("data-built-at",String(Date.now()))
panel.setAttribute("role","dialog")
panel.setAttribute("aria-live","polite")
var head=document.createElement("div")
head.className="bb-head"
var okIcon=svgIcon("ok",20)
okIcon.style.color="#2e7d32"
head.appendChild(okIcon)
var headText=document.createElement("span")
headText.className="bb-head-text"
headText.textContent=CONFIG.title
head.appendChild(headText)
panel.appendChild(head)
var close=document.createElement("button")
close.className="bb-close"
close.type="button"
close.setAttribute("aria-label","Bezárás")
close.appendChild(svgIcon("x",18))
close.addEventListener("click",closePanel)
panel.appendChild(close)
var body=document.createElement("div")
body.className="bb-body"
if(product.image){var thumb=document.createElement("img")
thumb.className="bb-thumb"
thumb.src=product.image
thumb.alt=""
thumb.onerror=function(){if(this.parentNode)this.parentNode.removeChild(this)}
body.appendChild(thumb)}var info=document.createElement("div")
info.className="bb-info"
var name=document.createElement("p")
name.className="bb-name"
name.textContent=product.name
info.appendChild(name)
var meta=document.createElement("div")
meta.className="bb-meta"
var qtyEl=document.createElement("span")
qtyEl.className="bb-qty"
qtyEl.textContent=qty+" darab"
meta.appendChild(qtyEl)
var mode=null
if(date)mode="wait"
else if(stockHint==="instock")mode="stock"
else if(stockHint==="orderable"||stockHint==="nostock")mode="order"
if(mode){var status=document.createElement("span")
status.className="bb-status bb-status--"+(mode==="stock"?"stock":"wait")
status.appendChild(svgIcon(mode==="stock"?"ok":"wait",17))
var statusText=document.createElement("span")
statusText.textContent=mode==="wait"?CONFIG.waitText.replace("{date}",date):mode==="stock"?CONFIG.inStockText:CONFIG.orderableText
status.appendChild(statusText)
meta.appendChild(status)}info.appendChild(meta)
var noteText=null
if(mode==="wait"&&CONFIG.waitNote){noteText=CONFIG.waitNote}else if(mode==="order"){noteText=leadTime?CONFIG.orderableNote.replace("{lead}",leadTime):CONFIG.orderableNoteFallback}if(noteText){var note=document.createElement("p")
note.className="bb-note"
note.textContent=noteText
info.appendChild(note)}body.appendChild(info)
panel.appendChild(body)
var actions=document.createElement("div")
actions.className="bb-actions"
var cta=document.createElement("a")
cta.className="bb-btn bb-btn--primary"
cta.href=cartUrl()
cta.textContent=CONFIG.cartButtonText
actions.appendChild(cta)
var cont=document.createElement("button")
cont.className="bb-btn bb-btn--ghost"
cont.type="button"
cont.textContent=CONFIG.continueButtonText
cont.addEventListener("click",closePanel)
actions.appendChild(cont)
panel.appendChild(actions)
document.body.appendChild(panel)
requestAnimationFrame((function(){panel.classList.add("is-open")}))
var keepOpen=date&&CONFIG.keepOpenWhenWaiting
if(!keepOpen&&CONFIG.autoCloseMs>0){closeTimer=setTimeout((function(){log("automatikus zaras")
closePanel()}),CONFIG.autoCloseMs)
panel.addEventListener("mouseenter",(function(){if(closeTimer){clearTimeout(closeTimer)
closeTimer=null
log("idozito szunetel")}}))
panel.addEventListener("mouseleave",(function(){if(panel.getAttribute("data-short"))return
if(!closeTimer)closeTimer=setTimeout(closePanel,CONFIG.autoCloseMs)}))}if(CONFIG.closeOnOutsideClick){setTimeout((function(){document.addEventListener("click",outsideClick,true)}),50)}log(keepOpen?"panel nyitva marad (van datum)":"panel "+CONFIG.autoCloseMs+" ms mulva zarul")
return panel}function outsideClick(e){var panel=document.getElementById(PANEL_ID)
if(!panel){document.removeEventListener("click",outsideClick,true)
return}if(panel.contains(e.target))return
closePanel()}function hideOriginal(el){try{el.style.setProperty("display","none","important")
el.setAttribute("data-bb-hidden","1")}catch(e){}}function isCartMessage(el){return isMessageText((el.textContent||"").trim())}function handle(node){try{handleInner(node)}catch(err){log("HIBA a feldolgozasban:",err&&err.message)
if(window.console&&console.error)console.error("[cart-panel]",err)}}function handleInner(node){if(!node||node.nodeType!==1)return
if(node.id===PANEL_ID||node.closest&&node.closest("#"+PANEL_ID))return
if(node.getAttribute&&node.getAttribute("data-bb-hidden"))return
if(!isCartMessage(node))return
var ctx
try{ctx=resolveContext()}catch(e){log("kartyafelismeres hiba, oldalszintre esunk vissza")
ctx={root:document,isCard:false}}if(ctx.isCard&&CONFIG.skipOnCards){log("kartyarol jott - meghagyjuk az alap felugrot")
return}var product=readProduct(ctx)
if(!product.name){log("nincs termeknev, hagyjuk az eredeti uzenetet")
return}var qty=readQuantity(ctx)
var date=readExpectedDate(ctx)
var stockHint=readStockStatus(ctx)
var leadTime=stockHint==="orderable"||stockHint==="nostock"?readLeadTime(ctx):null
log("termek:",product.name,"| cikkszam:",product.sku,"| db:",qty,"| datum:",date,"| keszlet:",stockHint,"| kartya:",ctx.isCard)
hideMessageAndWrappers(node)
var inner=node.querySelectorAll?node.querySelectorAll(CONFIG.toastItemSelector):[];[].forEach.call(inner,hideOriginal)
var panel=buildPanel(product,qty,date,stockHint,leadTime)
if(!date&&stockHint==="instock"&&product.sku){checkStock(product.sku,qty,(function(enough){if(enough===false&&document.getElementById(PANEL_ID)===panel)markShort(panel)}))}}function isVisible(el){if(!el||el.nodeType!==1)return false
var node=el
for(var i=0;i<20&&node&&node.nodeType===1;i++){if(node.hasAttribute&&(node.hasAttribute("hidden")||node.getAttribute("aria-hidden")==="true"))return false
if(node.style&&(node.style.display==="none"||node.style.visibility==="hidden"))return false
var st=null
try{st=window.getComputedStyle(node)}catch(e){st=null}if(st&&(st.display==="none"||st.visibility==="hidden"))return false
node=node.parentElement}return true}function looksLikeCartButton(el){var node=el
for(var i=0;i<5&&node&&node!==document.body;i++){var cls=""
if(typeof node.className==="string")cls=node.className
cls+=" "+(node.id||"")
if(/cart|kosar|puttony|basket/i.test(cls))return true
var txt=(node.textContent||"").trim()
if(txt&&txt.length<40&&/puttony|kos[a\u00e1]rba/i.test(txt))return true
node=node.parentElement}return false}var MESSAGE_CANDIDATES=['[id*="cart"]','[class*="cart"]','[class*="overlay"]','[id*="overlay"]','[class*="toast"]','[id*="toast"]','[class*="popup"]','[class*="modal"]','[class*="notification"]','[class*="alert"]','[role="alert"]','[role="status"]'].join(", ")
var MESSAGE_RE=/(puttony|kos[a\u00e1]r)/i
var MESSAGE_VERB_RE=/(ker[u\u00fc]lt|tett[u\u00fc]k|hozz[a\u00e1]ad|siker|beker[u\u00fc]lt)/i
function isMessageText(txt){return MESSAGE_RE.test(txt)&&MESSAGE_VERB_RE.test(txt)}function isControl(el){var tag=el.tagName
if(tag==="BUTTON"||tag==="A"||tag==="INPUT"||tag==="SELECT")return true
if(el.closest&&el.closest("button, a, input, select, form")){return true}return false}function findVisibleCartMessage(){var nodes
try{nodes=document.querySelectorAll(MESSAGE_CANDIDATES)}catch(e){return null}var best=null,bestLen=Infinity
for(var i=0;i<nodes.length;i++){var el=nodes[i]
if(el.id===PANEL_ID)continue
if(el.closest&&el.closest("#"+PANEL_ID))continue
if(el.getAttribute&&el.getAttribute("data-bb-hidden"))continue
if(isControl(el))continue
var txt=(el.textContent||"").trim()
if(!txt||txt.length>400)continue
if(!isMessageText(txt))continue
if(!isVisible(el))continue
if(txt.length<bestLen){bestLen=txt.length
best=el}}return best}function hideMessageAndWrappers(el){hideOriginal(el)
var node=el.parentElement
for(var i=0;i<4&&node&&node!==document.body;i++){var txt=(node.textContent||"").trim()
if(txt.length>400||!isMessageText(txt))break
hideOriginal(node)
node=node.parentElement}}var scanScheduled=false
function scheduleScan(){if(scanScheduled)return
scanScheduled=true
setTimeout((function(){scanScheduled=false
scan()}),60)}function scan(){if(document.getElementById(PANEL_ID))return
var msg=findVisibleCartMessage()
if(!msg)return
log("uzenet megtalalva:",msg.tagName,"id="+(msg.id||"-"),"class="+(msg.className||"-"))
handle(msg)}function scheduleSweeps(){var tries=0
var iv=setInterval((function(){tries++
scan()
if(document.getElementById(PANEL_ID)||tries>20)clearInterval(iv)}),150)
scan()}function init(){log("verzio:",VERSION)
document.addEventListener("click",(function(e){lastClick=e.target
lastClickAt=Date.now()
if(looksLikeCartButton(e.target)){log("kosargomb kattintas eszlelve")
scheduleSweeps()}}),true)
var jq=window.jQuery||window.$
if(jq&&jq(document)&&jq(document).on){try{jq(document).on("addToCartSuccess",(function(){log("addToCartSuccess esemeny")
scheduleSweeps()}))}catch(e){log("addToCartSuccess felkotes nem sikerult")}}new MutationObserver(scheduleScan).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["style","class","hidden","aria-hidden"]})
scan()
document.addEventListener("keydown",(function(e){if(e.key==="Escape")closePanel()}))}window.cartPanelDebug=function(){var id=CONFIG.paramId
console.log("=== cart-panel diagnosztika ===")
console.log("SCRIPT VERZIO:",VERSION)
console.log("Utolso kattintas:",lastClick?"<"+lastClick.tagName.toLowerCase()+" class='"+lastClick.className+"'>":"(nem volt)")
var ctx=resolveContext()
console.log("Hatokor:",ctx.isCard?"TERMEKKARTYA":"fo termek oldal")
if(ctx.isCard){console.log("  kartya: <"+ctx.root.tagName.toLowerCase()+" class='"+ctx.root.className+"'>")}else if(lastClick){console.log("  Nem talaltam kartyat. A kattintas feletti DOM-lanc:")
var n=lastClick,lvl=0
while(n&&n!==document.body&&lvl<14){var h1=document.querySelector("h1")
console.log("   ["+lvl+"] <"+n.tagName.toLowerCase()+" class='"+(n.className||"")+"' id='"+(n.id||"")+"'>"+" szoveg="+textLen(n)+(h1&&n.contains(h1)?" (tartalmazza a H1-et)":""))
n=n.parentElement
lvl++}console.log("  Masold be nekem ezt a listat, vagy allitsd be a "+"CONFIG.cardSelector erteket.")}console.log("Termek:",readProduct(ctx))
console.log("Mennyiseg:",readQuantity(ctx))
var hits=[]
try{hits=[].slice.call(document.querySelectorAll('[id*="'+id+'"], [class*="'+id+'"]'))}catch(e){}console.log("A(z) "+id+" azonositot tartalmazo elemek:",hits.length)
hits.slice(0,8).forEach((function(el){console.log("   id='"+el.id+"' class='"+el.className+"' szoveg='"+(el.textContent||"").trim().slice(0,60)+"'")}))
console.log("Datum (ID alapjan)     :",readDateById(ctx))
console.log("Datum (ertek-elem)      :",readDateByValueClass(ctx))
console.log("Datum (felirat alapjan):",readDateByLabel(ctx))
console.log("Keszletallapot:",readStockStatus(ctx))
console.log("Beszerzesi ido:",readLeadTime(ctx))
console.log("Kosar URL:",cartUrl())
var msg=findVisibleCartMessage()
console.log("Lathato kosar-uzenet most:",msg?"<"+msg.tagName.toLowerCase()+" id='"+msg.id+"' class='"+msg.className+"'> "+(msg.textContent||"").trim().slice(0,60):"(nincs)")
console.log("=== vege ===")}
window.cartPanelPreview=function(date){var ctx=resolveContext()
var sh=readStockStatus(ctx)
buildPanel(readProduct(ctx),readQuantity(ctx),typeof date==="undefined"?readExpectedDate(ctx):date,sh,readLeadTime(ctx))}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init)}else{init()}})()


});

/* ── termekoldal-reform-e79a40f2.js (sablon/idegen/, a régi UNAS Script fájlja változatlanul) ── */
window.bbIdegen('termekoldal-reform', function () {
(function(){"use strict"
var DEBUG=false
var MOVE_STOCK=true
var SHOW_STOCK_BADGE=false
var COLLAPSE_ZIP=false
var PICKUP={enabled:true,weekday:"16:00",saturday:"11:30",sunday:null}
var ETA={enabled:true,label:"Várható szállítás",inStockDays:4,orderableDays:9,cutoff:"16:00",saturdayCounts:false,override:{}}
var DAY_NAMES=["vasárnap","hétfőn","kedden","szerdán","csütörtökön","pénteken","szombaton"]
var DAY_PLAIN=["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"]
var MONTHS=["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"]
var FEE_ROW=true
var FEES=[{re:"Csomagolási\\s+(?:díj|költség)",title:"Csomagolási költség"},{re:"Logisztikai\\s+díj",title:"Logisztikai díj"}]
var FEE_NOTES={unknown:"csak futáros és raklapos szállításnál",out:"futáros és raklapos szállításnál",courier:"futáros szállításnál",small:"futáros szállításnál",own:null}
var FEE_ALL={note:"minden kiszállítási módnál, személyes átvételnél nincs",skus:["32082","35058","32004","36701_140","04507_150","32005","32006","32007","32009","40055","18813"]}
var FEE_OFF=["01229","29383","01230","30577","24574","16266","04092","24578","24580"]
var ZONE_TEXT={courier:/futárszolgálattal küldjük/i,small:/10\s*kg/i}
var FEE_ID="bba-fee"
var WRAP_ID="bba-buybox"
var MOVE_IDS=["artdet__warehouses","bb-zip-artdet","artdet__service-plus",FEE_ID]
var BADGES=[{re:/Nincs raktáron/,cls:"bba-stock-badge--no-stock"},{re:/Elfogyott/,cls:"bba-stock-badge--no-stock"},{re:/Rendelhető/,cls:"bba-stock-badge--to-order"},{re:/Raktáron/,cls:"bba-stock-badge--in-stock"},{re:/Készleten/,cls:"bba-stock-badge--in-stock"}]
var MAX_RUNS=25
var runs=0
var zipOpen=false
function log(){if(!DEBUG||!window.console)return
var args=Array.prototype.slice.call(arguments)
args.unshift("[bba]")
console.log.apply(console,args)}function scope(){return document.querySelector("#page_artdet_content .artdet__data-right-inner")}function pick(id){var root=scope()
if(!root)return null
var el=document.getElementById(id)
return el&&root.contains(el)?el:null}function toMinutes(hhmm){var p=String(hhmm).split(":")
return parseInt(p[0],10)*60+parseInt(p[1],10)}function isInStock(){var s=scope()
if(s&&s.querySelector(".artdet__stock.on-stock"))return true
var wh=pick("artdet__warehouses")
var t=wh?wh.textContent||"":""
if(/Nincs raktáron|Elfogyott/i.test(t))return false
return/Raktáron|Készleten/.test(t)}function buildWrap(){var inner=document.querySelector("#page_artdet_content .artdet__block-right-inner")
if(!inner)return
var wrap=document.getElementById(WRAP_ID)
if(!wrap){wrap=document.createElement("div")
wrap.id=WRAP_ID
wrap.className="bba-buybox"
inner.appendChild(wrap)
log("keret letrehozva")}var want=[]
MOVE_IDS.forEach((function(id){var el=pick(id)
if(el)want.push(el)}))
var kids=[]
for(var k=0;k<wrap.children.length;k++){if(wrap.children[k].className.indexOf("bba-eta")===-1){kids.push(wrap.children[k])}}var same=kids.length===want.length
if(same){for(var i=0;i<want.length;i++){if(kids[i]!==want[i]){same=false
break}}}if(!same){want.forEach((function(el){wrap.appendChild(el)}))
log("dobozok berendezve:",want.length)}wrap.style.display=want.length?"":"none"}function moveStock(){if(!MOVE_STOCK)return
var inner=document.querySelector("#page_artdet_content .artdet__block-right-inner")
var cart=pick("artdet__cart")
var root=scope()
if(!inner||!cart||!root)return
var stock=root.querySelector(".artdet__stock")
if(!stock||stock.parentNode===inner)return
inner.insertBefore(stock,cart)
log("keszletjelzes athelyezve")}function markWarehouseMode(){var root=pick("artdet__warehouses")
if(!root)return
root.classList.toggle("bba-wh--lead",!isInStock())}function decorateStock(){if(!SHOW_STOCK_BADGE)return
var root=pick("artdet__warehouses")
if(!root)return
var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null)
var hits=[]
var node
while(node=walker.nextNode()){if(!node.nodeValue||!node.nodeValue.trim())continue
var parent=node.parentNode
var pcls=parent&&parent.className?String(parent.className):""
if(pcls.indexOf("bba-stock-badge")!==-1)continue
for(var i=0;i<BADGES.length;i++){var m=node.nodeValue.match(BADGES[i].re)
if(m){hits.push({node:node,at:m.index,text:m[0],cls:BADGES[i].cls})
break}}}if(!hits.length)return
hits.forEach((function(hit){var rest=hit.node.splitText(hit.at)
rest.splitText(hit.text.length)
var span=document.createElement("span")
span.className=hit.cls
span.textContent=hit.text
rest.parentNode.replaceChild(span,rest)}))
log("badge:",hits.length)}function cutoffFor(day){if(day===0)return PICKUP.sunday
if(day===6)return PICKUP.saturday
return PICKUP.weekday}function closedDay(d){return!!holidays(d.getFullYear())[dayKey(d)]}function pickupText(){var now=new Date
var day=now.getDay()
var mins=now.getHours()*60+now.getMinutes()
var today=cutoffFor(day)
if(today&&mins<toMinutes(today)&&!closedDay(now)){return"Személyesen ma "+today+"-ig átvehető"}for(var i=1;i<=8;i++){var next=(day+i)%7
var cut=cutoffFor(next)
var date=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i)
if(cut&&!closedDay(date)){return"Személyesen "+DAY_NAMES[next]+" "+cut+"-ig átvehető"}}return null}function addPickup(){if(!PICKUP.enabled)return
var root=pick("artdet__warehouses")
if(!root)return
var line=root.querySelector(".bba-pickup")
if(!isInStock()){if(line&&line.parentNode)line.parentNode.removeChild(line)
return}var text=pickupText()
if(!text)return
if(line&&line.textContent===text)return
if(!line){line=document.createElement("div")
line.className="bba-pickup"
root.appendChild(line)}line.textContent=text
log("atveteli sor:",text)}function applyZipState(box,btn){if(zipOpen){box.classList.remove("bba-zip-collapsed")
btn.textContent="Kevesebb"}else{box.classList.add("bba-zip-collapsed")
btn.textContent="Szállítási részletek"}}function collapseZip(){var box=pick("bb-zip-artdet")
if(!box)return
if(!COLLAPSE_ZIP){box.classList.remove("bba-zip-collapsed")
var old=box.querySelectorAll(".bba-more")
for(var k=0;k<old.length;k++)old[k].parentNode.removeChild(old[k])
var l=box.querySelector(".bb-zip__list")
if(l)l.removeAttribute("data-bba-collapsed")
return}var list=box.querySelector(".bb-zip__list")
if(!list)return
if(list.children.length<3)return
var btn=box.querySelector(".bba-more")
if(btn&&list.getAttribute("data-bba-collapsed")==="1"){applyZipState(box,btn)
return}list.setAttribute("data-bba-collapsed","1")
if(btn&&btn.parentNode)btn.parentNode.removeChild(btn)
btn=document.createElement("button")
btn.type="button"
btn.className="bba-more"
btn.addEventListener("click",(function(e){e.preventDefault()
e.stopPropagation()
zipOpen=!zipOpen
applyZipState(box,btn)}))
list.parentNode.insertBefore(btn,list.nextSibling)
applyZipState(box,btn)
log("lenyilo felepitve")}function easter(y){var a=y%19,b=Math.floor(y/100),c=y%100
var d=Math.floor(b/4),e=b%4
var f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3)
var h=(19*a+b-d-g+15)%30
var i=Math.floor(c/4),k=c%4
var l=(32+2*e+2*i-h-k)%7
var m=Math.floor((a+11*h+22*l)/451)
var month=Math.floor((h+l-7*m+114)/31)
var day=(h+l-7*m+114)%31+1
return new Date(y,month-1,day)}function dayKey(d){return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}var holidayCache={}
function holidays(year){if(holidayCache[year])return holidayCache[year]
var set={}
var fixed=[ [0,1],[2,15],[4,1],[7,20],[9,23],[10,1],[11,24],[11,25],[11,26] ]
for(var i=0;i<fixed.length;i++){set[dayKey(new Date(year,fixed[i][0],fixed[i][1]))]=true}var e=easter(year)
var offsets=[-2,1,50]
for(var j=0;j<offsets.length;j++){var d=new Date(e.getTime())
d.setDate(d.getDate()+offsets[j])
set[dayKey(d)]=true}holidayCache[year]=set
return set}function isWorkday(d){var wd=d.getDay()
if(wd===0)return false
if(wd===6&&!ETA.saturdayCounts)return false
return!holidays(d.getFullYear())[dayKey(d)]}function addWorkdays(from,n){var d=new Date(from.getTime())
var left=n
var guard=0
while(left>0&&guard<400){guard++
d.setDate(d.getDate()+1)
if(isWorkday(d))left--}return d}function formatDate(d){return d.getFullYear()+". "+MONTHS[d.getMonth()]+" "+d.getDate()+". ("+DAY_PLAIN[d.getDay()]+")"}function sku(){var el=document.querySelector("#page_artdet_content .artdet__sku")
if(el){var m=(el.textContent||"").match(/([A-Za-z0-9_\-]{3,})\s*$/)
if(m)return m[1]}var fav=document.querySelector('[class*="page_artdet_func_favourites_"]')
if(fav){var f=String(fav.className).match(/page_artdet_func_favourites_([A-Za-z0-9_\-]+)/)
if(f)return f[1].replace(/__unas__/g,"-")}return null}function leadDays(){var code=sku()
if(code&&ETA.override[code])return ETA.override[code]
var wh=pick("artdet__warehouses")
var text=wh?wh.textContent||"":""
if(text.indexOf("érdeklőd")!==-1)return null
return isInStock()?ETA.inStockDays:ETA.orderableDays}function noShipping(){var adat=window.BB_SZALL_TILT,code=sku()
if(!adat||!code)return false
return["x","l"].some((function(k){return typeof adat[k]==="string"&&("|"+adat[k]+"|").indexOf("|"+code+"|")!==-1}))}function addEta(){if(!ETA.enabled)return
var wrap=document.getElementById(WRAP_ID)
if(!wrap)return
var row=wrap.querySelector(".bba-eta")
var days=noShipping()?0:leadDays()
if(!days){if(row&&row.parentNode)row.parentNode.removeChild(row)
return}var now=new Date
var mins=now.getHours()*60+now.getMinutes()
var base=new Date(now.getFullYear(),now.getMonth(),now.getDate())
if(mins>=toMinutes(ETA.cutoff))base.setDate(base.getDate()+1)
var text=formatDate(addWorkdays(base,days))
if(row&&row.getAttribute("data-bba-eta")===text)return
if(!row){row=document.createElement("div")
row.className="bba-eta"}if(row.parentNode!==wrap||wrap.firstChild!==row){wrap.insertBefore(row,wrap.firstChild)}row.setAttribute("data-bba-eta",text)
while(row.firstChild)row.removeChild(row.firstChild)
var lab=document.createElement("span")
lab.className="bba-eta__label"
lab.textContent=ETA.label
var val=document.createElement("span")
val.className="bba-eta__value"
val.textContent=text
row.appendChild(lab)
row.appendChild(val)
log("varhato szallitas:",text,"("+days+" munkanap)")}var FEE_SKIP="#"+WRAP_ID+", #"+FEE_ID+", #artdet__service-plus, .bb-lapozo, script, style, noscript"
var feesFound=null
function feeSkipped(el){while(el&&el.nodeType===1){if(el.matches&&el.matches(FEE_SKIP))return true
el=el.parentNode}return false}function formatFt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")}function findFees(){if(feesFound)return feesFound
var root=document.getElementById("page_artdet_content")
if(!root)return[]
var labels=FEES.map((function(f){return new RegExp(f.re,"i")}))
var full=FEES.map((function(f){return new RegExp(f.re+"\\s*:?[^0-9]{0,90}?(?:br\\.?|bruttó)?\\s*([0-9][0-9 .\\u00a0\\u202f]*)\\s*Ft","i")}))
var hits=[]
var done={}
var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null)
var node
while(node=walker.nextNode()){var v=node.nodeValue
if(!v||v.length<8)continue
for(var i=0;i<FEES.length;i++){if(done[i]||!labels[i].test(v))continue
if(feeSkipped(node.parentNode))break
var el=node.parentNode
for(var up=0;up<4&&el&&el!==root;up++){var text=(el.textContent||"").replace(/\s+/g," ")
if(text.length>600)break
var m=text.match(full[i])
if(m){var amount=parseInt(m[1].replace(/[^0-9]/g,""),10)
if(amount>0){done[i]=true
hits.push({fee:FEES[i],amount:amount})
log("dij megtalalva:",FEES[i].title,amount)}break}el=el.parentNode}}}if(hits.length)feesFound=hits
return hits}function zoneState(){var box=pick("bb-zip-artdet")
if(!box)return"unknown"
var cls=" "+(box.className||"")+" "
if(cls.indexOf(" bb-zip--out ")!==-1)return"out"
if(cls.indexOf(" bb-zip--in ")===-1)return"unknown"
var t=box.textContent||""
if(ZONE_TEXT.courier.test(t))return"courier"
if(ZONE_TEXT.small.test(t))return"small"
return"own"}function feeOnAllModes(){var code=sku()
return!!code&&FEE_ALL.skus.indexOf(code)!==-1}function feeStyle(){if(document.getElementById("bba-fee-style"))return
var icon="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' "+"viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='1.8' stroke-linecap='round' "+"stroke-linejoin='round'><path d='M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z'/><path d='M12 12l8-4.5'/>"+"<path d='M12 12v9'/><path d='M12 12L4 7.5'/></svg>"
var st=document.createElement("style")
st.id="bba-fee-style"
st.textContent="#bba-fee{margin:0;border-top:1px solid #e5e7eb;}"+"#bba-buybox>#bba-fee:first-child{border-top:0;}"+"#bba-fee .bba-fee__item{position:relative;padding:16px 0 16px 34px;font-size:14px;"+"line-height:1.5;color:#1f2433;}"+"#bba-fee .bba-fee__item+.bba-fee__item{padding-top:0;}"+"#bba-fee .bba-fee__item::before{content:'';position:absolute;left:0;top:17px;width:20px;"+'height:20px;background:url("'+icon+'") no-repeat center/contain;}'+"#bba-fee .bba-fee__item+.bba-fee__item::before{top:1px;}"+"#bba-fee .bba-fee__title{display:block;font-weight:600;line-height:1.4;}"+"#bba-fee .bba-fee__price{display:block;margin-top:2px;color:#4b5563;font-size:13px;}"+"#bba-fee .bba-fee__note{display:block;color:#6b7280;font-size:12px;line-height:1.4;}"
document.head.appendChild(st)}function renderFees(){if(!FEE_ROW)return
var code=sku()
if(code&&FEE_OFF.indexOf(code)!==-1){var old=pick(FEE_ID)||document.getElementById(FEE_ID)
if(old&&old.parentNode)old.parentNode.removeChild(old)
return}var fees=findFees()
if(!fees.length)return
var row=pick(FEE_ID)
if(!row){var inner=document.querySelector("#page_artdet_content .artdet__block-right-inner")
if(!inner)return
feeStyle()
row=document.createElement("div")
row.id=FEE_ID
fees.forEach((function(f){var item=document.createElement("div")
item.className="bba-fee__item"
var title=document.createElement("span")
title.className="bba-fee__title"
title.textContent=f.fee.title
var price=document.createElement("span")
price.className="bba-fee__price"
price.textContent="+"+formatFt(f.amount)+" Ft / db"
var note=document.createElement("span")
note.className="bba-fee__note"
item.appendChild(title)
item.appendChild(price)
item.appendChild(note)
row.appendChild(item)}))
inner.appendChild(row)
log("dij sor letrehozva:",fees.length)}var state=zoneState()
var noteText=feeOnAllModes()?FEE_ALL.note:FEE_NOTES.hasOwnProperty(state)?FEE_NOTES[state]:FEE_NOTES.unknown
var hide=noteText===null
var disp=hide?"none":""
if(row.style.display!==disp)row.style.display=disp
if(!hide){var notes=row.querySelectorAll(".bba-fee__note")
for(var i=0;i<notes.length;i++){if(notes[i].textContent!==noteText)notes[i].textContent=noteText}}log("dij allapot:",state,hide?"(rejtve)":noteText)}function run(why){if(!document.getElementById("page_artdet_content"))return
if(runs>=MAX_RUNS){log("elerte a futaskorlatot, leall")
return}runs++
log("futas #"+runs,why||"")
var steps=[ ["renderFees",renderFees],["buildWrap",buildWrap],["moveStock",moveStock],["markWarehouseMode",markWarehouseMode],["decorateStock",decorateStock],["addPickup",addPickup],["addEta",addEta],["collapseZip",collapseZip] ]
for(var i=0;i<steps.length;i++){try{steps[i][1]()}catch(err){if(window.console){console.error("[bba] hiba a(z) "+steps[i][0]+" lepesben:",err)}}}}function zipRefresh(){var steps=[renderFees,buildWrap,collapseZip]
for(var i=0;i<steps.length;i++){try{steps[i]()}catch(err){if(window.console)console.error("[bba] hiba (zipRefresh):",err)}}}function init(){run("init");[200,600,1200,2500,4000].forEach((function(ms){setTimeout((function(){run("idozitett "+ms)}),ms)}))
document.addEventListener("bbZipChanged",(function(){setTimeout((function(){run("bbZipChanged")
zipRefresh()}),250)}))
document.addEventListener("bbZipRendered",zipRefresh)}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init)}else{init()}})()


});

/* ── uvegallon-csomagolas-00b111f2.js (sablon/idegen/, a régi UNAS Script fájlja változatlanul) ── */
window.bbIdegen('uvegallon-csomagolas', function () {
/* =========================================================================
   BB LAPOZO  (bb_lapozo.js)
   -------------------------------------------------------------------------
   Uj, KULON bejegyzeskent a Szkript beszurasba (ne a bba_buybox melle).

   MIT CSINAL:
   A termekleirasban levo ".bb-lapozo" blokkhoz elozo/kovetkezo gombot
   es "1–2. lépés (összesen 8)" feliratot rajzol, es elrejti a vizszintes
   gorgetosavot. Egyszerre 2 lepes latszik: 1–2, 3–4, 5–6, 7–8.

   Ha a script nem fut, a blokk akkor is hasznalhato: mobilon ujjal
   huzhato, gepen gorgetosavval lapozhato. Ahol nincs ".bb-lapozo"
   blokk, ott a script semmit nem csinal.

   Nincs benne MutationObserver es nincs folyamatos figyeles, csak
   gorgetes- es atmeretezes-esemeny, ezert nem tud lassitani.
   ========================================================================= */
(function () {
  "use strict";

  var PER_PAGE = 2;   /* ennyi lepes latszik egyszerre */
  var GAP = 16;       /* egyezzen a .bb-lapozo__sav "gap" ertekevel */
  var ACCENT = "#2e5e4e";
  var MUTED = "#56645e";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function injectStyle() {
    if (document.getElementById("bb-lapozo-style")) return;
    var s = document.createElement("style");
    s.id = "bb-lapozo-style";
    s.textContent =
      ".bb-lapozo--js .bb-lapozo__sav{scrollbar-width:none;-ms-overflow-style:none;padding-bottom:0!important}" +
      ".bb-lapozo--js .bb-lapozo__sav::-webkit-scrollbar{display:none}" +
      ".bb-lapozo--js .bb-lapozo__tipp{display:none}" +
      ".bb-lapozo__gomb:focus-visible{outline:3px solid #8fb8a8;outline-offset:2px}" +
      ".bb-lapozo__gomb:not([disabled]):hover{background:" + ACCENT + "!important;color:#fff!important}" +
      ".bb-lapozo__gomb[disabled]{opacity:.35;cursor:default!important}";
    document.head.appendChild(s);
  }

  function makeButton(label, path) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "bb-lapozo__gomb";
    b.setAttribute("aria-label", label);
    b.style.cssText =
      "display:inline-flex;align-items:center;justify-content:center;" +
      "width:34px;height:34px;padding:0;margin:0;border-radius:17px;" +
      "border:1px solid " + ACCENT + ";background:#fff;color:" + ACCENT + ";" +
      "cursor:pointer;transition:background .15s,color .15s;";
    b.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="' + path + '"/></svg>';
    return b;
  }

  function setup(root) {
    if (root.getAttribute("data-bb-kesz")) return;
    var sav = root.querySelector(".bb-lapozo__sav");
    if (!sav) return;

    var total = sav.children.length;
    var pages = Math.ceil(total / PER_PAGE);
    if (pages < 2) return;

    root.setAttribute("data-bb-kesz", "1");
    root.className += " bb-lapozo--js";

    /* Vezerlosor: felirat balra, gombok jobbra */
    var bar = document.createElement("div");
    bar.style.cssText =
      "display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;";

    var label = document.createElement("p");
    label.setAttribute("aria-live", "polite");
    label.style.cssText = "margin:0;font-size:13px;line-height:1.4;color:" + MUTED + ";";

    var btns = document.createElement("div");
    btns.style.cssText = "display:flex;gap:8px;flex:none;";
    var prev = makeButton("Előző lépések", "M15 18l-6-6 6-6");
    var next = makeButton("Következő lépések", "M9 18l6-6-6-6");
    btns.appendChild(prev);
    btns.appendChild(next);
    bar.appendChild(label);
    bar.appendChild(btns);
    sav.parentNode.insertBefore(bar, sav.nextSibling);

    function pageWidth() {
      return sav.clientWidth + GAP;
    }

    function currentPage() {
      var w = pageWidth();
      if (w <= GAP) return 0; /* rejtett fulon meg nincs szelessege */
      return Math.max(0, Math.min(pages - 1, Math.round(sav.scrollLeft / w)));
    }

    function render(p) {
      var from = p * PER_PAGE + 1;
      var to = Math.min(total, from + PER_PAGE - 1);
      label.textContent =
        (from === to ? from : from + "–" + to) + ". lépés (összesen " + total + ")";
      prev.disabled = p === 0;
      next.disabled = p === pages - 1;
    }

    function go(p) {
      p = Math.max(0, Math.min(pages - 1, p));
      var left = p * pageWidth();
      if (sav.scrollTo && "scrollBehavior" in document.documentElement.style) {
        sav.scrollTo({ left: left, behavior: reduceMotion ? "auto" : "smooth" });
      } else {
        sav.scrollLeft = left;
      }
      render(p);
    }

    prev.addEventListener("click", function () { go(currentPage() - 1); });
    next.addEventListener("click", function () { go(currentPage() + 1); });

    /* Ujjal huzas utan is frissuljon a felirat */
    var ticking = false;
    sav.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        render(currentPage());
      });
    }, { passive: true });

    /* Atmeretezeskor maradjon a lap szelen */
    var lastPage = 0;
    window.addEventListener("resize", function () {
      lastPage = currentPage();
      requestAnimationFrame(function () {
        sav.scrollLeft = lastPage * pageWidth();
      });
    });

    render(0);
  }

  function init() {
    var roots = document.querySelectorAll(".bb-lapozo");
    if (!roots.length) return;
    injectStyle();
    for (var i = 0; i < roots.length; i++) setup(roots[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
});

/* Saját termékadatlap — a rövid leírás alá és a paraméterek közé kerülő modulok (sablon-alap ág, 2026-10-21).
   Eddig négy külön UNAS Script volt (body_end, külső fájl): GARAN-címke #176566, veszélyjelek #178781,
   gyártói információk (GPSR) #178951, dokumentumok #180116. A KÓD most itt van, a csomagol.sh a termékoldal
   modul-csomagjába teszi (a sablon/idegen/ fájljai után); a stílus: css/adatlap-modulok.scss.
   Az ADAT nincs a sablonban (változik: új termék, gyártó, címke): az „Adatlap adatmutató” UNAS Script
   (lib/adatlap_adat.php) adja a címeket —
     window.bbAdatlapAdat = { garancia: <JSON>, veszelyjel: <JSON>, gyarto: <JSON>, dokumentumok: <Webstat API> }
   — a JSON-ok a jsDelivr-ről jönnek (commitra kötött cím, a kitevők teszik ki: garancia_script.php,
   veszelyjel_script.php, gyarto_script.php, dokumentumok_script.php). Ha egy kulcs hiányzik, az a modul nem fut.
   Átmenet: amíg a régi UNAS Script a lapon van, a modul itt nem fut (nincs dupla) — ugyanaz a jel, mint az
   idegen scripteknél (idegen-betolto.js). A régi DOM-őrök (#bb-garan, .bb-veszely, .bb-gyarto, .bb-doksi) is megmaradtak.
   A rövid leírás alatti sorrend az élővel azonos, akármelyik adat jön meg előbb:
     (biocid-mondat) · veszélyjel · dokumentumok · GARAN — lásd hatra().
   Egy böngészőben kikapcsolható: ?garancia=0, ?veszelyjel=0, ?gyarto=0, ?dokumentumok=0 (vissza: =1).
   Tilos a tartalomban: dupla kapcsos és dupla szögletes nyitó, kettőskereszt a nyitó kapcsos után, 4 bájtos karakter. */
(function () {
  var ADAT = window.bbAdatlapAdat || {};
  var magyar = (document.documentElement.lang || 'hu').slice(0, 2) === 'hu';

  /* a régi UNAS Script még a lapon van-e (a fejrészben, defer) */
  function regi(nev) {
    try { return !!document.querySelector('script[src*="/js/' + nev + '-"]'); } catch (e) { return false; }
  }
  /* ?<param>=0|1 → localStorage; csak a „0” kapcsol ki (mint eddig, „mindenki” módban) */
  function bekapcsolva(param, kulcs) {
    try {
      var m = location.search.match(new RegExp('[?&]' + param + '=([01])'));
      if (m) localStorage.setItem(kulcs, m[1]);
      return localStorage.getItem(kulcs) !== '0';
    } catch (e) { return true; }
  }
  function domKesz(f) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', f);
    else f();
  }
  /* az adatfájl (JSON) a mutató címéről; hiba vagy hiányzó cím: nincs modul */
  function adat(kulcs, kesz) {
    var url = ADAT[kulcs];
    if (!url || !window.fetch) return;
    fetch(url).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j) domKesz(function () { kesz(j); }); })
      .catch(function () { /* a CDN nem érhető el: nincs blokk */ });
  }
  function cikkszam() {
    var t = document.getElementById('page_artdet_content');
    var e = t && t.querySelector('.artdet__sku-value');
    return e ? e.textContent.trim() : '';
  }
  function el(tag, osztaly, szoveg) {
    var e = document.createElement(tag);
    if (osztaly) e.className = osztaly;
    if (szoveg) e.textContent = szoveg;
    return e;
  }
  /* „hely” után szúr be, de a már bent lévő, kisebb rangú modul-blokkok mögé: a végső sorrend így
     a rangot követi (veszélyjel 1 · dokumentumok 2 · GARAN 3), bármelyik adat jön meg előbb. Az élő
     oldalon ugyanez a sorrend állt elő (a GARAN a defer-futáskor, a másik kettő később, előtte). */
  function hatra(blokk, hely, rang) {
    blokk.setAttribute('data-bb-sor', String(rang));
    var p = hely, r;
    while (p.nextElementSibling && (r = p.nextElementSibling.getAttribute('data-bb-sor')) && +r < rang) p = p.nextElementSibling;
    p.parentNode.insertBefore(blokk, p.nextSibling);
  }
  /* néhányszor újrapróbál (mint a régi scriptek), amíg a próba igazat nem ad */
  function ujra(proba, db, ms) {
    var n = 0;
    (function fut() { if (!proba() && ++n < db) setTimeout(fut, ms); })();
  }

  /* ── GARAN-címke (EU gyártói tartóssági jótállás): kis jelvény a rövid leírás alatt, kattintásra panel ──
     adat: {alap: a címkeképek mappája, jelveny: {garan, pajzs, naptar}, c: {cikkszám: [kép, év, típus]}} */
  function garancia(D) {
    var EU_LINK = 'https://europa.eu/youreurope/commercial-guarantee-durability/';
    var SZ = magyar ? {
      jotallas: 'Gyártói jótállás', ev: 'év', nyit: 'a GARAN-címke megnyitása', cim: 'Gyártói tartóssági jótállás',
      szoveg: function (ev, tipus) { return 'A gyártó ' + ev + ' év jótállást vállal erre a termékre (' + tipus + ').'; },
      link: 'Bővebben a gyártói jótállásról és a jogszabályi szavatosságról', bezar: 'Bezárás'
    } : {
      jotallas: 'Producer guarantee', ev: 'years', nyit: 'open the GARAN label', cim: 'Commercial guarantee of durability',
      szoveg: function (ev, tipus) { return 'The producer guarantees this product for ' + ev + ' years (' + tipus + ').'; },
      link: 'More about the producer guarantee and the legal guarantee', bezar: 'Close'
    };
    var JELVENY = D.jelveny || {};
    function kep(src, osztaly) { var k = el('img', osztaly); k.src = src; k.alt = ''; return k; }
    function cim_url(c) { return D.alap + encodeURIComponent(c[0]); }

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
      cimke.decoding = 'async';
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

    /* Előtöltés: a címke az oldal betöltése után, üresjáratban a háttérben letöltődik (ne vegye el a
       sávszélt a termékképektől); ha a vásárló előbb a jelvény fölé visz vagy megérinti, azonnal. */
    var elotoltott = null;
    function elotolt(c) {
      if (elotoltott) return;
      elotoltott = new Image();
      elotoltott.decoding = 'async';
      elotoltott.src = cim_url(c);
    }
    function elotolt_kesobb(c) {
      function ures() {
        if (window.requestIdleCallback) requestIdleCallback(function () { elotolt(c); }, { timeout: 3000 });
        else setTimeout(function () { elotolt(c); }, 1000);
      }
      if (document.readyState === 'complete') ures();
      else window.addEventListener('load', ures);
    }
    function nyit(c) {
      var ablak = panel(c);
      var cimke = ablak.querySelector('.bb-garan-cimke');
      if (!cimke.src) cimke.src = cim_url(c);
      ablak.hidden = false;
      document.documentElement.classList.add('bb-garan-nyitott');
      /* a következő képkockán indul az áttűnés, hogy a beúszás látsszon */
      requestAnimationFrame(function () { requestAnimationFrame(function () { ablak.classList.add('bb-garan-nyitva'); }); });
      ablak.querySelector('.bb-garan-bezar').focus();
    }

    ujra(function () {
      if (document.getElementById('bb-garan')) return true;
      var tartalom = document.getElementById('page_artdet_content');
      var sku = cikkszam();
      if (!tartalom || !sku) return false;
      var c = D.c && D.c[sku];
      if (!c) return true;
      /* a rövid leírás alá; ha nincs, a Gyártó-sor (paraméterek) elé, végül a termék neve alá */
      var leiras = document.getElementById('artdet__short-descrition');
      var parameter = document.getElementById('artdet__param-spec');
      var nev = tartalom.querySelector('.artdet__name');
      var hely = leiras || parameter || nev;
      if (!hely || !hely.parentNode) return false;

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
      ['pointerenter', 'touchstart', 'focus'].forEach(function (esemeny) {
        jelveny.addEventListener(esemeny, function () { elotolt(c); }, { passive: true });
      });
      elotolt_kesobb(c);

      var doboz = el('div', 'bb-garan-doboz');
      doboz.appendChild(jelveny);
      if (hely === parameter) hely.parentNode.insertBefore(doboz, hely);
      else hatra(doboz, hely, 3);
      return true;
    }, 5, 600);
  }

  /* ── Veszélyjelek (CLP 48. cikk): piktogramok, figyelmeztetés, H-mondatok a rövid leírás (biocidnál a biocid-mondat) alatt ──
     adat: {alap: a piktogramok mappája, t: {cikkszám: [piktogramok, V/F, mondatok, (megjegyzés {hu, en})]}, h: {hu: {kód: szöveg}, en: {…}}} */
  function veszelyjel(D) {
    var JEL = magyar ? { V: 'Veszély', F: 'Figyelem' } : { V: 'Danger', F: 'Warning' };
    var PIKT = magyar
      ? { GHS02: 'Tűzveszélyes', GHS03: 'Oxidáló', GHS05: 'Maró', GHS06: 'Mérgező', GHS07: 'Ártalmas, irritáló', GHS08: 'Egészségkárosító', GHS09: 'Környezetre veszélyes' }
      : { GHS02: 'Flammable', GHS03: 'Oxidising', GHS05: 'Corrosive', GHS06: 'Toxic', GHS07: 'Harmful, irritant', GHS08: 'Health hazard', GHS09: 'Hazardous to the environment' };
    var H = (D.h && (magyar ? D.h.hu : D.h.en)) || {};
    ujra(function () {
      var sku = cikkszam();
      if (!sku) return false;
      var a = D.t && D.t[sku];
      if (!a || document.querySelector('.bb-veszely')) return true;
      var hely = document.querySelector('.bb-a-biocid') || document.querySelector('#artdet__short-descrition')
        || document.querySelector('.artdet__short-descripton') || document.querySelector('.artdet__name');
      if (!hely) return false;
      var doboz = el('div', 'bb-veszely');
      doboz.setAttribute('role', 'note');
      var fej = el('div', 'bb-veszely__fej');
      a[0].forEach(function (p) {
        var k = document.createElement('img');
        k.src = D.alap + p + '.svg';
        k.alt = PIKT[p] || p;
        k.title = PIKT[p] || p;
        k.width = k.height = 34;
        fej.appendChild(k);
      });
      if (JEL[ a[1] ]) fej.appendChild(el('strong', '', JEL[ a[1] ]));
      doboz.appendChild(fej);
      /* „EUH208:anyag” → „EUH208 Tartalmaz: anyag. Allergiás reakciót válthat ki.” */
      doboz.appendChild(el('div', 'bb-veszely__h', a[2].map(function (h) {
        var r = h.split(':'), kod = r[0], anyag = r.slice(1).join(':');
        var szoveg = H[kod] || '';
        if (anyag) szoveg = (magyar ? 'Tartalmaz: ' : 'Contains: ') + anyag + '. ' + szoveg;
        return szoveg ? kod + ' ' + szoveg : kod;
      }).join(' ')));
      if (a[3]) doboz.appendChild(el('div', 'bb-veszely__m', magyar ? a[3].hu : (a[3].en || a[3].hu)));
      hatra(doboz, hely, 1);
      return true;
    }, 20, 250);
  }

  /* ── Gyártói információk (GPSR): a „Gyártó” paraméter (7108663) sora alá lenyitható blokk ──
     adat: {g: {normalizált márkanév: [név, cím, e-mail/űrlap, web, EU-s 1/0, felelős személy [név, cím, e-mail, importőr] vagy 0, forgalmazó 1/0]}} */
  function gyarto(D) {
    var PARAM_ID = 'artdet-param-title-7108663';
    var SZ = magyar
      ? { cim: 'Gyártói információk', gyarto: 'Gyártó', forgalmazo: 'Forgalmazó', posta: 'Postai cím', elerh: 'Elérhetőség', felelos: 'Felelős személy az EU-ban', importor: 'Importőr (felelős személy az EU-ban)' }
      : { cim: 'Manufacturer information', gyarto: 'Manufacturer', forgalmazo: 'Distributor', posta: 'Postal address', elerh: 'Contact', felelos: 'Responsible person in the EU', importor: 'Importer (responsible person in the EU)' };
    function kulcs(s) { return (s || '').toLowerCase().replace(/[^a-z0-9áéíóöőúüű]/g, ''); }
    function sor(dl, cimke, ertek, link) {
      if (!ertek) return;
      var dt = el('dt', '', cimke);
      var dd = document.createElement('dd');
      if (link) {
        var a = el('a', '', ertek);
        a.href = link; a.rel = 'nofollow noopener'; a.target = '_blank';
        dd.appendChild(a);
      } else dd.textContent = ertek;
      dl.appendChild(dt); dl.appendChild(dd);
    }
    function elerhetoseg(dl, email, web) {
      if (email) sor(dl, SZ.elerh, email.replace(/^mailto:/, ''), /^https?:/.test(email) ? email : 'mailto:' + email.replace(/^mailto:/, ''));
      if (web) sor(dl, email ? '' : SZ.elerh, web.replace(/^https?:\/\//, '').replace(/\/$/, ''), /^https?:/.test(web) ? web : 'https://' + web);
    }
    ujra(function () {
      var cim = document.getElementById(PARAM_ID);
      if (!cim) return false;
      var param = cim.closest('.artdet__spec-param') || cim.closest('.row');
      var ertekEl = param && param.querySelector('.artdet__spec-param-value');
      var g = ertekEl && D.g && D.g[kulcs(ertekEl.textContent)];
      if (!g || document.querySelector('.bb-gyarto')) return true;
      var det = el('details', 'bb-gyarto');
      det.appendChild(el('summary', '', SZ.cim));
      var dl = document.createElement('dl');
      sor(dl, g[6] ? SZ.forgalmazo : SZ.gyarto, g[0]);
      sor(dl, SZ.posta, g[1]);
      elerhetoseg(dl, g[2], g[3]);
      if (!g[4] && g[5]) {
        sor(dl, g[5][3] ? SZ.importor : SZ.felelos, g[5][0]);
        sor(dl, SZ.posta, g[5][1]);
        elerhetoseg(dl, g[5][2], '');
      }
      det.appendChild(dl);
      param.parentNode.insertBefore(det, param.nextSibling);
      return true;
    }, 20, 250);
  }

  /* ── Dokumentumok a Webstat Dokutárából (cikkszám szerint), a veszélyjel-doboz után ── */
  function dokumentumok(API) {
    var SZ = magyar
      ? { cim: 'Dokumentumok', osszes: 'Az összes dokumentum', oldal: 'oldal' }
      : { cim: 'Documents', osszes: 'All documents', oldal: 'pages' };
    var MAX = 4;
    function esc(s) {
      return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    function rajzol(sku, docs) {
      if (!docs.length || document.querySelector('.bb-doksi')) return;
      var hely = document.querySelector('.bb-veszely') || document.querySelector('.bb-a-biocid') || document.querySelector('#artdet__short-descrition')
        || document.querySelector('.artdet__short-descripton') || document.querySelector('.artdet__name');
      if (!hely) return;
      var doboz = el('div', 'bb-doksi');
      var html = '<div class="bb-doksi__cim">' + esc(SZ.cim) + '</div>';
      docs.slice(0, MAX).forEach(function (d) {
        var tipus = (d.type || 'PDF').replace('JPEG', 'JPG');
        var meta = [d.group, d.size, d.pages ? d.pages + ' ' + SZ.oldal : '', d.lang && d.lang !== 'hu' ? d.lang.toUpperCase() : ''].filter(Boolean).join(' · ');
        html += '<a class="bb-doksi__sor" href="' + esc(d.url) + '" target="_blank" rel="noopener">'
          + '<span class="bb-doksi__tipus bb-doksi__tipus--' + esc(tipus.toLowerCase()) + '">' + esc(tipus) + '</span>'
          + '<span class="bb-doksi__szoveg"><b>' + esc(d.title) + '</b><small>' + esc(meta) + '</small></span></a>';
      });
      if (docs.length > MAX) {
        html += '<a class="bb-doksi__tobb" href="/dokumentumok?q=' + encodeURIComponent(sku) + '">' + esc(SZ.osszes) + ' (' + docs.length + ') →</a>';
      }
      doboz.innerHTML = html;
      hatra(doboz, hely, 2);
    }
    var proba = 0;
    (function fut() {
      var sku = cikkszam();
      if (!sku) { if (++proba < 20) setTimeout(fut, 250); return; }
      fetch(API + '?mod=termek&sku=' + encodeURIComponent(sku))
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j || !j.docs || !j.docs.length) return;
          /* a veszélyjel-doboz később is megjöhet: ha még nincs hely, egy darabig újrapróbáljuk */
          ujra(function () { rajzol(sku, j.docs); return !!document.querySelector('.bb-doksi'); }, 20, 250);
        })
        .catch(function () { /* a Webstat nem érhető el: nincs blokk */ });
    })();
  }

  if (!regi('garan-cimkek-az-adatlaphoz') && bekapcsolva('garancia', 'bbGarancia')) adat('garancia', garancia);
  if (!regi('veszelyjelek-az-adatlaphoz') && bekapcsolva('veszelyjel', 'bbVeszelyjel')) adat('veszelyjel', veszelyjel);
  if (!regi('gyartoi-informaciok-az-adatlaphoz') && bekapcsolva('gyarto', 'bbGyarto')) adat('gyarto', gyarto);
  if (!regi('dokumentumok-az-adatlapon') && bekapcsolva('dokumentumok', 'bbDokumentumok') && ADAT.dokumentumok && window.fetch) {
    domKesz(function () { dokumentumok(ADAT.dokumentumok); });
  }
})();
