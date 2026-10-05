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