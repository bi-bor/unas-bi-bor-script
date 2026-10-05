/* ---------------------------------------------------------------------------
 * Bí-Bor-Ász — kosár visszajelzés
 *
 * Elrejti az alapértelmezett zöld toast üzenetet, és helyette egy saját,
 * letisztult panelt jelenít meg: termék neve, mennyiség, és — ha nincs
 * raktáron — a Skylonból szinkronizált várható beérkezés.
 *
 * Ha van várható beérkezés, a panel NEM tűnik el magától: a vásárlónak
 * be kell zárnia. Raktáron lévő terméknél pár másodperc után magától eltűnik.
 *
 * 2026.09.22-29: raktáron lévő terméknél megkérdezi a keszlet-ellenorzes.php-t,
 * hogy a kosárba tett mennyiség megvan-e. Ha nincs, figyelmeztetést ír ki,
 * és a panel nyitva marad. Minden más változatlan.
 *
 * Hova: Unas admin > Kinézet > egyedi JS, vagy Külső kapcsolatok > Script kezelés.
 *
 * ELŐFELTÉTEL: az Unas adminban a "Várható beérkezés" termék paraméternél
 * be kell kapcsolni a termék adatlapon való megjelenítést.
 * ------------------------------------------------------------------------- */

(function () {
  "use strict";

  var CONFIG = {
    /* --- Felismerés ------------------------------------------------------ */
    toastContainers: ["#toast-container", "#overlay_cart_add"],
    toastItemSelector: ".toast, .toast-success, .toast-message",

    // A paraméter Unas-beli azonosítója (ez alapján keressük a dátumot)
    paramId: "8812851",
    paramLabel: "Várható beérkezés",

    /* --- Szövegek -------------------------------------------------------- */
    title: "A terméket a Puttonyba tettük",

    // {date} helyére kerül a dátum
    waitText: "Várhatóan raktárunkba érkezik: {date}",
    waitNote: "Ezt követően adjuk fel a csomagot.",
    inStockText: "Raktáron, azonnal szállítható",

    // Nincs készleten, de rendelhető, és nincs konkrét beérkezési dátum
    orderableText: "Jelenleg nincs készleten, megrendeljük",

    // Ha az oldalon szerepel beszerzési idő ("7–9 munkanap"), azt a
    // rendelhető állapot alá írjuk. {lead} helyére kerül a talált szöveg.
    orderableNote: "{lead}",

    // Ha nincs ilyen szöveg az oldalon, ez a tartalék megjegyzés:
    orderableNoteFallback: "A beszerzés után azonnal feladjuk a csomagot.",

    cartButtonText: "Tovább a kosárba",
    continueButtonText: "Vásárlás folytatása",

    /* --- Készletellenőrzés (új) ------------------------------------------ */
    // Üresen hagyva kikapcsol, és minden a régi módon működik.
    stockUrl: "https:" + "//bibor." + "bi-bor" + ".hu/keszlet-ellenorzes.php",
    shortText: "Raktáron, de nem a teljes mennyiség",
    shortNote: "A kért mennyiség jelenleg nincs teljes egészében raktáron. "
             + "Pontos készletinformációért írjon nekünk, kollégáink szívesen segítenek: ",
    // Az e-mail címet két részből rakjuk össze, hogy a webshop
    // e-mail-védelme ne írja át a szkriptet.
    shortEmailUser: "info",
    shortEmailDomain: "bi-bor" + ".hu",

    /* --- Viselkedés ------------------------------------------------------ */
    // Raktáron lévő terméknél ennyi ms után tűnik el magától (0 = soha)
    autoCloseMs: 2000,

    // Ha van várható beérkezés, ne tűnjön el magától
    keepOpenWhenWaiting: true,

    // Kattintás a panelen kívülre bezárja
    closeOnOutsideClick: true,

    // Kapcsolódó/ajánlott termékek kártyáinak felismerése.
    // false = mindig az oldal fő termékét olvassa (a korábbi viselkedés).
    cardDetection: true,

    // Kapcsolódó/ajánlott termék kártyájáról kosárba tett terméknél NE
    // vegyük át a felugrót — maradjon a webshop alapértelmezett üzenete.
    // Csak a termék adatlapján lévő fő gombnál jelenik meg a saját panel.
    skipOnCards: false,

    // Tartalék heurisztika: ha a szelektorok nem fognak, próbáljuk-e
    // "kitalálni" a kártyát a DOM szerkezetéből? Alapból KI, mert a
    // termék adatlapján is tévesen kártyát talált.
    cardHeuristic: false,

    // A TERMÉK ADATLAP fő kosárgombja. A sablonból (content_product_details_1.html):
    //   <div id="artdet__cart" class="... js-main-cart-btn">
    //     <button class="artdet__cart-btn ... js-main-product-cart-btn">
    // Ha a kattintás ezen belül volt, biztosan a fő termékről van szó.
    mainCartSelector: ".js-main-product-cart-btn, .js-main-cart-btn, #artdet__cart",

    // Lista- és karusszel-kártyák. A .js-product-ot NEM használjuk, mert az
    // az adatlapon is szerepel (artdet__pic-data-wrap js-product).
    // A page_artlist_ azonosító viszont csak kártyán van, és a cikkszámot is
    // tartalmazza: id="page_artlist_additional_02301"
    cardSelector: "[id^='page_artlist_'], .carousel-cell.product, "
                + ".product-box, .product-card, .artlist__item",

    // Termékkép megjelenítése a panelen
    showImage: true,

    // A kosár URL-je. Üresen hagyva a script megkeresi az oldalon.
    cartUrl: "/shop_cart.php",

    debug: false
  };

  var VERSION = "2026.09.22-29";

  var DATE_RE = /(\d{4}[.\-/]\s?\d{1,2}[.\-/]\s?\d{1,2}\.?)/;
  var PANEL_ID = "bb-cart-panel";
  var STYLE_ID = "bb-cart-style";
  var closeTimer = null;

  function log() {
    if (CONFIG.debug && window.console) {
      console.log.apply(console, ["[cart-panel]"].concat([].slice.call(arguments)));
    }
  }

  /* ======================================================================
   * Adatok kiolvasása az oldalról
   * ==================================================================== */

  /* ======================================================================
   * A kattintott termék megtalálása
   *
   * Kapcsolódó / ajánlott termékeknél nem az oldal fő terméke kerül a
   * kosárba, hanem a kártyán lévő. Ezért megjegyezzük az utolsó kattintást,
   * és onnan felfelé keressük meg a termékkártyát. Minden adatot (név,
   * cikkszám, kép, mennyiség, dátum) azon belül olvasunk ki.
   * ==================================================================== */

  var lastClick = null;
  var lastClickAt = 0;

  function textLen(el) { return ((el.textContent || "").trim()).length; }

  /* Egy elem akkor termékkártya, ha:
   *  - nem tartalmazza az oldal H1-jét (tehát nem a fő termék blokkja),
   *  - van benne terméknév (link vagy cím),
   *  - és nem túl nagy (különben már egy lista, nem egy termék). */
  function looksLikeCard(el) {
    if (!el || el.nodeType !== 1) return false;

    var pageH1 = document.querySelector("h1");
    if (pageH1 && el.contains(pageH1)) return false;
    if (textLen(el) > 4000 || textLen(el) < 5) return false;

    // Terméknév: cím, vagy értelmes szövegű link
    if (el.querySelector('h2, h3, h4, h5, .product-name, [class*="product-title"], '
                       + '[class*="item-title"], [class*="artlist"] a')) return true;

    var links = el.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      if ((links[i].textContent || "").trim().length >= 6) return true;
    }
    return false;
  }

  /* Felfelé lépkedve a LEGSZŰKEBB olyan elemet keressük, ami kártyának tűnik. */
  function findCard(el) {
    var pageH1 = document.querySelector("h1");

    // 1) Ismert kártya-szelektor a kattintás felett (legszűkebb találat)
    if (CONFIG.cardSelector && el.closest) {
      var explicit = null;
      try { explicit = el.closest(CONFIG.cardSelector); } catch (e) { explicit = null; }
      if (explicit && !(pageH1 && explicit.contains(pageH1))) {
        log("kartya szelektor alapjan:", explicit.className);
        return explicit;
      }
    }

    // 2) Tartalék heurisztika — csak ha kifejezetten bekapcsolták
    if (CONFIG.cardHeuristic) {
      var node = el;
      for (var i = 0; i < 14 && node && node !== document.body; i++) {
        if (looksLikeCard(node)) { log("kartya heurisztikaval:", node.className); return node; }
        node = node.parentElement;
      }
    }
    return null;
  }

  /* A cikkszám kinyerése a kártya osztály-/azonosítónevéből.
   * Pl. class="... page_artlist_sku_02301 ..." -> 02301 */
  function skuFromCardAttrs(card) {
    var hay = (card.className || "") + " " + (card.id || "");
    var m = hay.match(/(?:sku|artlist_additional|artlist_related)[_-]([A-Za-z0-9_\-\.]+)/);
    return m ? m[1] : null;
  }

  /* A kattintás alapján eldönti, hogy kártyáról vagy a fő termékről van szó.
   * Visszatérés: { root, isCard } — root a keresési hatókör. */
  function resolveContext() {
    if (!CONFIG.cardDetection) return { root: document, isCard: false };
    if (!lastClick || (Date.now() - lastClickAt) >= 8000) {
      return { root: document, isCard: false };
    }

    // 1) A termék adatlap fő gombja? Akkor biztosan a fő termék.
    try {
      if (lastClick.closest && lastClick.closest(CONFIG.mainCartSelector)) {
        log("fo termek gombja");
        return { root: document, isCard: false };
      }
    } catch (e) { /* rossz szelektor eseten tovabb */ }

    // 2) Kártyáról jött?
    var card = findCard(lastClick);
    if (card) {
      log("kattintott termekkartya:", card.tagName, card.className);
      return { root: card, isCard: true };
    }

    return { root: document, isCard: false };
  }

  function scopedQuery(root, selector) {
    try {
      return root === document
        ? document.querySelectorAll(selector)
        : root.querySelectorAll(selector);
    } catch (e) { return []; }
  }
  function looksLikeLogo(src) {
    if (!src) return true;
    if (/^data:/i.test(src)) return true;
    return /logo|favicon|placeholder|no[-_]?image|sprite|icon|badge|banner|sticker|matrica|szallitas|blank|spacer|loading/i.test(src);
  }

  /* Lazy-load: a valódi kép gyakran data-src / data-original / srcset alatt van,
   * a src pedig csak egy helyőrző. */
  function imgSrc(img) {
    if (!img) return null;
    var cands = [
      img.currentSrc,
      img.getAttribute("src"),
      img.getAttribute("data-src"),
      img.getAttribute("data-original"),
      img.getAttribute("data-lazy"),
      img.getAttribute("data-echo")
    ];
    var ss = img.getAttribute("srcset") || img.getAttribute("data-srcset");
    if (ss) cands.push(ss.split(",")[0].trim().split(/\s+/)[0]);

    for (var i = 0; i < cands.length; i++) {
      if (cands[i] && !looksLikeLogo(cands[i])) return cands[i];
    }
    return null;
  }

  /* A legnagyobb, valódi termékkép egy adott elemen belül. */
  function bestImageIn(root) {
    var imgs = root.querySelectorAll("img");
    var best = null, bestArea = -1;
    for (var i = 0; i < imgs.length; i++) {
      var src = imgSrc(imgs[i]);
      if (!src) continue;
      var w = imgs[i].naturalWidth || imgs[i].width || 0;
      var h = imgs[i].naturalHeight || imgs[i].height || 0;
      var area = w * h;
      // Ha nincs meret (meg nem toltodott be), akkor is jelolt, de kisebb sullyal
      if (area === 0) area = 1;
      if (area > bestArea) { bestArea = area; best = src; }
    }
    return best;
  }

  function absUrl(src) {
    if (!src) return null;
    try { return new URL(src, document.baseURI).href; } catch (e) { return src; }
  }

  function findProductImage(fromJsonLd) {
    // 1) og:image - termékoldalon szinte mindig a termék fotója
    var og = document.querySelector('meta[property="og:image"], meta[name="og:image"]');
    if (og) {
      var ogSrc = og.getAttribute("content");
      if (ogSrc && !looksLikeLogo(ogSrc)) { log("kep: og:image"); return absUrl(ogSrc); }
    }

    // 2) JSON-LD Product image
    if (fromJsonLd && !looksLikeLogo(fromJsonLd)) {
      log("kep: JSON-LD");
      return absUrl(fromJsonLd);
    }

    // 3) A legnagyobb kép a fő tartalomban (fejlécet/láblécet, valamint a
    //    kapcsolódó/ajánlott termékek karusszeljeit kihagyva)
    var skipInside = "header, nav, footer, #toast-container, #" + PANEL_ID
      + ", .carousel, [class*='additional'], [class*='related'], [class*='artlist']"
      + (CONFIG.cardSelector ? ", " + CONFIG.cardSelector : "");

    var imgs = document.querySelectorAll("img");
    var best = null, bestArea = 0;
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var inSkipped = false;
      try { inSkipped = !!img.closest(skipInside); } catch (e) { inSkipped = false; }
      if (inSkipped) continue;

      var src = imgSrc(img);
      if (!src) continue;

      var w = img.naturalWidth || img.width || 0;
      var h = img.naturalHeight || img.height || 0;
      if (w < 100 || h < 100) continue;

      var area = w * h;
      if (area > bestArea) { bestArea = area; best = src; }
    }
    if (best) { log("kep: legnagyobb tartalmi kep"); return absUrl(best); }

    log("nem talaltam termekképet");
    return null;
  }

  function readProduct(ctx) {
    var out = { name: null, sku: null, image: null };

    if (ctx.isCard) {
      // --- Kártya: mindent a kártyán belül keresünk ---
      var card = ctx.root;

      var titleEl = card.querySelector(
        'h2, h3, h4, .product-name, [class*="product-title"], [class*="item-title"]');
      if (!titleEl) {
        // A leghosszabb szövegű link általában a terméknév
        var links = card.querySelectorAll("a[href]");
        var best = null;
        for (var i = 0; i < links.length; i++) {
          var t = (links[i].textContent || "").trim();
          if (t.length > 3 && (!best || t.length > best.length)) best = t;
        }
        if (best) out.name = best;
      } else {
        out.name = (titleEl.textContent || "").trim();
      }

      out.sku = skuFromCardAttrs(card);
      if (!out.sku) {
        var m = (card.textContent || "").match(/Cikksz[\u00e1a]m:?\s*([A-Za-z0-9_\-\.]+)/);
        if (m) out.sku = m[1];
      }

      if (CONFIG.showImage) {
        var src = bestImageIn(card);
        if (src) out.image = absUrl(src);
        log("kartya kep:", out.image);
      }
      return out;
    }

    // --- Fő termék oldal ---
    var jsonLdImage = null;

    var h1 = document.querySelector("h1");
    if (h1) out.name = h1.textContent.trim();

    var blocks = document.querySelectorAll('script[type="application/ld+json"]');
    for (var b = 0; b < blocks.length; b++) {
      var data;
      try { data = JSON.parse(blocks[b].textContent); } catch (e) { continue; }
      var list = Array.isArray(data) ? data : [data];
      if (data && data["@graph"]) list = list.concat(data["@graph"]);
      for (var j = 0; j < list.length; j++) {
        var node = list[j];
        if (!node || typeof node !== "object") continue;
        if ([].concat(node["@type"] || []).indexOf("Product") === -1) continue;
        if (node.sku) out.sku = node.sku;
        else if (node.mpn && !out.sku) out.sku = node.mpn;
        if (!jsonLdImage && node.image) {
          var im = Array.isArray(node.image) ? node.image[0] : node.image;
          jsonLdImage = (im && typeof im === "object") ? (im.url || im.contentUrl) : im;
        }
        if (!out.name && (node.sku || node.offers)) out.name = node.name || null;
      }
    }

    if (!out.sku) {
      var mm = document.body.textContent.match(/Cikksz[\u00e1a]m:?\s*([A-Za-z0-9_\-\.]+)/);
      if (mm) out.sku = mm[1];
    }
    if (CONFIG.showImage) out.image = findProductImage(jsonLdImage);
    return out;
  }

  function cleanDate(m) { return m ? m[1].replace(/\s/g, "") : null; }

  // Egy elem "sajat" szovege: csak akkor fogadjuk el datumforrasnak, ha rovid.
  // Igy nem tudunk veletlenul egy egesz oldalszakaszbol datumot kihalaszni.
  var MAX_CONTEXT_LEN = 200;

  function dateFrom(el) {
    if (!el) return null;
    var txt = (el.textContent || "").trim();
    if (!txt || txt.length > MAX_CONTEXT_LEN) return null;
    return cleanDate(txt.match(DATE_RE));
  }

  /* 1) Keresés a paraméter AZONOSÍTÓJA alapján.
   * Csak pontos attribútum-egyezéseket fogadunk el. A korábbi laza
   * [id*=...] / [class*=...] mintákat elhagytuk, mert téves találatot adtak. */
  function readDateById(ctx) {
    var root = ctx && ctx.root ? ctx.root : document;
    var id = CONFIG.paramId;
    if (!id) return null;

    // Pontos minták: itt a közvetlen szomszéd is jöhet (címke/érték páros).
    // Az Unas termékadat-blokkban a szerkezet ez:
    //   <div id="page_artdet_product_param_title_<ID>">Várható beérkezés:</div>
    //   <div id="page_artdet_product_param_value_<ID>">
    //     <div class="artdet__param-value">2026.09.08.</div>
    //   </div>
    var exact = [
      // Adatlap, "További adatok" blokk (artdet__spec-param)
      "#page_artdet_product_param_spec_" + id,
      '[id$="_param_spec_' + id + '"]',
      // Adatlap, ADATOK fül (data__item-value)
      "#page_artdet_product_param_value_" + id,
      '[id$="_param_value_' + id + '"]',
      '[id$="_value_' + id + '"]',
      // Listakártya
      '[id$="_param_' + id + '"]',
      '[id*="product_param"][id*="' + id + '"]',
      '[data-param-id="' + id + '"]',
      '[data-parameter-id="' + id + '"]',
      "#param_" + id, "#parameter_" + id, "#param" + id,
      ".param_" + id, ".parameter_" + id,
      '[id="param-' + id + '"]', '[class~="param-' + id + '"]'
    ];

    for (var i = 0; i < exact.length; i++) {
      var nodes;
      nodes = scopedQuery(root, exact[i]);
      for (var j = 0; j < nodes.length; j++) {
        var el = nodes[j];
        if (el.closest("#" + PANEL_ID)) continue;
        var d = dateFrom(el);
        if (d) { log("datum: pontos ID minta", exact[i]); return d; }
        d = dateFrom(el.nextElementSibling);
        if (d) { log("datum: pontos ID + szomszed", exact[i]); return d; }
      }
    }

    // Laza minták: az azonosító bárhol az id/class attribútumban.
    // Itt CSAK az elem saját, rövid szövegét fogadjuk el — szomszédokat nem,
    // különben téves dátumot szedhetnénk ki a lap más részéből.
    var loose = ['[id*="' + id + '"]', '[class*="' + id + '"]',
                 '[data-id*="' + id + '"]', '[name*="' + id + '"]'];

    for (var k = 0; k < loose.length; k++) {
      var ln;
      ln = scopedQuery(root, loose[k]);
      for (var m2 = 0; m2 < ln.length; m2++) {
        var le = ln[m2];
        if (le.closest("#" + PANEL_ID)) continue;
        var ld = dateFrom(le);
        if (ld) { log("datum: laza ID minta", loose[k], le.tagName, le.className); return ld; }
      }
    }
    return null;
  }

  /* 2) Tartalék: a felirat szövege alapján.
   * Szigorúan: a dátum vagy ugyanabban a szövegcsomópontban van, vagy a
   * felirat elemének közvetlen szomszédjában, vagy a szülő közvetlen
   * szomszédjában — legfeljebb EGY szinttel feljebb. */
  function readDateByLabel(ctx) {
    var root = (ctx && ctx.root && ctx.root !== document) ? ctx.root : document.body;
    var label = CONFIG.paramLabel.toLowerCase();
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node;

    while ((node = walker.nextNode())) {
      var parent = node.parentElement;
      if (!parent || parent.closest("#" + PANEL_ID)) continue;

      var text = node.nodeValue.trim();
      if (!text || text.length > MAX_CONTEXT_LEN) continue;
      if (text.toLowerCase().indexOf(label) === -1) continue;

      // a) ugyanabban a szövegben
      var d = cleanDate(text.match(DATE_RE));
      if (d) { log("datum: felirat + ertek egy szovegben"); return d; }

      // b) a felirat elemének közvetlen szomszédja
      d = dateFrom(parent.nextElementSibling);
      if (d) { log("datum: felirat szomszedja"); return d; }

      // c) A szülő közvetlen szomszédja — DE csak akkor, ha a felirat egyedül
      //    van a szülőjében. Ha a szülő több elemet tartalmaz (pl. címke +
      //    üres érték), akkor a szomszéd már egy másik blokk, nem a mi értékünk.
      if (parent.parentElement && parent.parentElement.children.length === 1) {
        d = dateFrom(parent.parentElement.nextElementSibling);
        if (d) { log("datum: szulo szomszedja"); return d; }
      }

      // d) A szülőn belül, a feliratot követő elemek
      var sib = parent.nextElementSibling;
      while (sib) {
        d = dateFrom(sib);
        if (d) { log("datum: feliratot koveto elem"); return d; }
        sib = sib.nextElementSibling;
      }

      // A feliratot megtaláltuk, de nem volt mellette érték. NEM állunk meg:
      // a paraméter több helyen is megjelenhet az oldalon (pl. egy rejtett
      // fülön üresen, máshol kitöltve). Megyünk tovább a következő találatra.
      log("felirat ertek nelkul, keressuk tovabb");
    }
    return null;
  }

  /* 3) Az Unas érték-elemeire célzunk közvetlenül. A paraméter több helyen
   * és többféle sablonnal is megjelenhet (ADATOK fül, spec blokk, kártya),
   * de az értéket mindig ilyen osztályú elem tartalmazza. Csak akkor
   * fogadjuk el, ha a körülötte lévő blokkban ott a felirat is. */
  function readDateByValueClass(ctx) {
    var root = ctx && ctx.root ? ctx.root : document;
    var label = CONFIG.paramLabel.toLowerCase();
    var sels = ".artdet__spec-param-value, .artdet__param-value, "
             + ".data__item-value, .product__param-value, "
             + '[class*="param-value"], [class*="item-value"]';

    var nodes = scopedQuery(root, sels);
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.closest && el.closest("#" + PANEL_ID)) continue;

      // A paraméterhez tartozó blokk: vagy az azonosító alapján, vagy a
      // legközelebbi sor/elem, ami tartalmazza a feliratot
      var block = null;
      try {
        block = el.closest('[id*="' + CONFIG.paramId + '"]')
             || el.closest(".artdet__spec-param, .data__item, .data__item-param, "
                         + ".product__param, .row, tr, li, dl");
      } catch (e) { block = null; }
      if (!block) continue;

      var btxt = (block.textContent || "").trim();
      if (btxt.length > 300) continue;
      if (btxt.toLowerCase().indexOf(label) === -1) continue;

      var d = dateFrom(el);
      if (d) { log("datum: ertek-elem alapjan", el.className); return d; }
    }
    return null;
  }

  function readExpectedDate(ctx) {
    var d = readDateById(ctx) || readDateByValueClass(ctx) || readDateByLabel(ctx);
    if (!d) log("nincs varhato beerkezes ehhez a termekhez");
    return d;
  }

  /* Kártyán a paraméter gyakran nincs kirenderelve. Ilyenkor a kártya saját
   * készletjelzését nézzük ("Több mint 20 db raktáron", "Raktáron"), és csak
   * akkor írunk állapotot, ha biztosan tudjuk. Különben elhagyjuk a sort. */
  /* A készletállapot a sablonból (content_product_details_1.html 453. sor):
   *   <div class="artdet__stock stock ... on-stock | to-order | no-stock">
   * A listakártyán ugyanezek az osztályok szerepelnek. Így nem téveszt meg
   * a "Villányi üzlet - Raktáron" doboz sem. */
  function classToStatus(el) {
    if (!el || !el.classList) return null;
    if (el.classList.contains("on-stock")) return "instock";
    if (el.classList.contains("to-order")) return "orderable";
    if (el.classList.contains("no-stock")) return "nostock";
    return null;
  }

  /* Kizárjuk a raktárankénti / üzleti készletdobozokat — azok ugyanilyen
   * osztályokat használnak, de a bolti átvételre vonatkoznak, nem a
   * webshop készletére. */
  function inWarehouseBox(el) {
    try {
      return !!el.closest('#artdet__warehouses, [class*="warehouse"], '
                        + '[class*="uzlet"], [class*="store"], [id*="warehouse"]');
    } catch (e) { return false; }
  }

  function readStockStatus(ctx) {
    var root = ctx.root === document ? document : ctx.root;

    // 1) A FŐ állapotjelző (sablon: <div class="artdet__stock stock ...">)
    var main = root.querySelector(".artdet__stock, .product__stock");
    var st = classToStatus(main);
    if (st) { log("keszlet: fo allapotjelzo ->", st); return st; }

    // 2) Bármelyik állapotjelző, a raktár/üzlet dobozokat kihagyva
    var all = root.querySelectorAll(".on-stock, .to-order, .no-stock");
    for (var k = 0; k < all.length; k++) {
      if (inWarehouseBox(all[k])) continue;
      st = classToStatus(all[k]);
      if (st) { log("keszlet: osztaly alapjan ->", st); return st; }
    }

    // Tartalék: szöveg alapján, rövid elemekben.
    // Az ÜZLETI készletdobozt ("Villányi üzlet - raktárról, azonnal!
    // [Raktáron]") KI kell zárni, mert az a bolti átvételre vonatkozik,
    // nem a webshop készletére.
    var scope = root === document ? document.body : root;
    var els = scope.querySelectorAll("*");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length > 0) continue;          // csak levélelemek
      if (el.closest("#" + PANEL_ID)) continue;

      var t = (el.textContent || "").trim();
      if (!t || t.length > 60) continue;

      // bolti / üzleti átvétel és raktárankénti dobozok kihagyása
      if (inWarehouseBox(el)) continue;
      var around = (el.parentElement && el.parentElement.textContent) || "";
      if (/[u\u00fc]zlet|bolt|szem[e\u00e9]lyes [a\u00e1]tv/i.test(around)) continue;

      if (/rakt[a\u00e1]ron/i.test(t)) return "instock";
      if (/rendelhet[o\u0151]/i.test(t)) return "orderable";
      if (/nincs k[e\u00e9]szlet/i.test(t)) return "nostock";
    }
    return "unknown";
  }

  /* A beszerzési idő szövege, pl. "A termék beszerzése 7-9 munkanapot vesz
   * igénybe, majd ezt követően feladásra kerül." */
  function readLeadTime(ctx) {
    var root = ctx.root === document ? document : ctx.root;
    var walker = document.createTreeWalker(
      root === document ? document.body : root, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      if (node.parentElement && node.parentElement.closest("#" + PANEL_ID)) continue;
      var t = (node.nodeValue || "").trim();
      if (!t || t.length > 200) continue;
      if (/munkanap/i.test(t) && /beszerz/i.test(t)) return t;
    }
    return null;
  }

  function readStockHint(ctx) {
    if (!ctx.isCard) return "instock";
    var txt = (ctx.root.textContent || "");
    if (/rakt[\u00e1a]ron/i.test(txt)) return "instock";
    if (/rendelhet[\u0151o]|nincs rakt|el[\u0151o]rendel/i.test(txt)) return "unknown";
    return "unknown";
  }

  function readQuantity(ctx) {
    var root = (ctx && ctx.root) ? ctx.root : document;
    var input = (root.querySelector || document.querySelector).call(root,
      'input[name="db"], input[name="quantity"], .product-quantity input, input.quantity');
    if (input) {
      var n = parseInt(input.value, 10);
      if (!isNaN(n) && n > 0) return n;
    }
    return 1;
  }

  function cartUrl() {
    if (CONFIG.cartUrl) return CONFIG.cartUrl;
    var a = document.querySelector('a[href*="shop_cart.php"]');
    return a ? a.getAttribute("href") : "/shop_cart.php";
  }

  /* ======================================================================
   * Készletellenőrzés (új)
   * Válasz: true = van elég, false = nincs elég, null = nem tudjuk.
   * Csak a false esetén változik bármi a panelen.
   * ==================================================================== */

  function checkStock(sku, qty, done) {
    if (!CONFIG.stockUrl || !sku || !window.fetch) return;
    var L = String.fromCharCode(91), R = String.fromCharCode(93);
    var url = CONFIG.stockUrl + "?" + "items="
            + encodeURIComponent(L + JSON.stringify([String(sku), qty]) + R);
    fetch(url, { credentials: "omit" })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var v = (j && j.ok && j.items) ? j.items[String(sku)] : null;
        log("keszlet valasz:", sku, qty, "->", v);
        done(v);
      })
      .catch(function (e) { log("keszlet hiba:", e && e.message); });
  }

  function markShort(panel) {
    if (!panel || !panel.parentNode || panel.getAttribute("data-short")) return;
    panel.setAttribute("data-short", "1");

    // nyitva marad: az automatikus zárás leáll
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }

    var status = panel.querySelector(".bb-status");
    if (status) {
      status.className = "bb-status bb-status--short";
      while (status.firstChild) status.removeChild(status.firstChild);
      status.appendChild(svgIcon("wait", 17));
      var st = document.createElement("span");
      st.textContent = CONFIG.shortText;
      status.appendChild(st);
    }

    var info = panel.querySelector(".bb-info");
    if (info) {
      var email = CONFIG.shortEmailUser + String.fromCharCode(64) + CONFIG.shortEmailDomain;
      var note = document.createElement("p");
      note.className = "bb-note bb-note--short";
      note.appendChild(document.createTextNode(CONFIG.shortNote));
      var a = document.createElement("a");
      a.href = "mai" + "lto:" + email;
      a.textContent = email;
      note.appendChild(a);
      info.appendChild(note);
    }
  }

  /* ======================================================================
   * Megjelenés
   * ==================================================================== */

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      "#" + PANEL_ID + "{position:fixed;top:24px;left:50%;transform:translateX(-50%) translateY(-12px);",
      "  z-index:2147483000;width:calc(100% - 32px);max-width:460px;box-sizing:border-box;",
      "  background:#fff;border:1px solid #e3e8e3;border-radius:16px;",
      "  box-shadow:0 18px 48px rgba(20,40,20,.18),0 2px 6px rgba(20,40,20,.06);",
      "  font-family:inherit;color:#1b2a1b;opacity:0;",
      "  transition:opacity .22s ease,transform .22s ease;overflow:hidden;}",
      "#" + PANEL_ID + ".is-open{opacity:1;transform:translateX(-50%) translateY(0);}",

      "#" + PANEL_ID + " .bb-head{display:flex;align-items:center;gap:10px;",
      "  padding:14px 48px 14px 18px;background:#f2f9f2;border-bottom:1px solid #e6efe6;}",
      "#" + PANEL_ID + " .bb-head-text{font-weight:650;font-size:15px;color:#256b2b;}",

      "#" + PANEL_ID + " .bb-close{position:absolute;top:10px;right:10px;width:32px;height:32px;",
      "  display:flex;align-items:center;justify-content:center;border:0;background:transparent;",
      "  border-radius:8px;cursor:pointer;color:#6b7a6b;padding:0;line-height:1;}",
      "#" + PANEL_ID + " .bb-close:hover{background:rgba(0,0,0,.06);color:#1b2a1b;}",

      "#" + PANEL_ID + " .bb-body{display:flex;gap:14px;padding:16px 18px 4px;}",
      "#" + PANEL_ID + " .bb-thumb{flex:0 0 auto;width:56px;height:56px;border-radius:10px;",
      "  object-fit:contain;background:#f6f8f6;border:1px solid #eef2ee;}",
      "#" + PANEL_ID + " .bb-info{flex:1 1 auto;min-width:0;}",
      "#" + PANEL_ID + " .bb-name{font-weight:650;font-size:15.5px;line-height:1.35;",
      "  margin:0 0 8px;color:#12210f;}",
      "#" + PANEL_ID + " .bb-meta{display:flex;align-items:center;gap:8px 12px;flex-wrap:wrap;}",
      "#" + PANEL_ID + " .bb-qty{font-size:14px;color:#5c6a5c;background:#f2f4f2;",
      "  padding:2px 9px;border-radius:999px;}",
      "#" + PANEL_ID + " .bb-status{display:inline-flex;align-items:center;gap:6px;",
      "  font-weight:650;font-size:14.5px;}",
      "#" + PANEL_ID + " .bb-status--wait{color:#c0392b;}",
      "#" + PANEL_ID + " .bb-status--stock{color:#2e7d32;}",
      "#" + PANEL_ID + " .bb-status--short{color:#b26a00;}",
      "#" + PANEL_ID + " .bb-note{margin:8px 0 0;font-size:13px;color:#6b7a6b;line-height:1.45;}",
      "#" + PANEL_ID + " .bb-note--short{color:#5a4200;background:#fff8ec;border:1px solid #f0d9a8;",
      "  border-radius:10px;padding:9px 11px;font-size:13.5px;}",
      "#" + PANEL_ID + " .bb-note--short a{color:#b3261e;font-weight:700;text-decoration:underline;}",

      "#" + PANEL_ID + " .bb-actions{display:flex;gap:10px;flex-wrap:wrap;padding:16px 18px 18px;}",
      "#" + PANEL_ID + " .bb-btn{display:inline-block;padding:11px 20px;border-radius:999px;",
      "  font-weight:700;font-size:14.5px;line-height:1.2;text-decoration:none !important;",
      "  cursor:pointer;border:1px solid transparent;transition:background .15s ease;}",
      "#" + PANEL_ID + " .bb-btn--primary{background:#e03127;color:#fff !important;}",
      "#" + PANEL_ID + " .bb-btn--primary:hover{background:#c02219;}",
      "#" + PANEL_ID + " .bb-btn--ghost{background:#fff;color:#3d4a3d !important;border-color:#d8e0d8;}",
      "#" + PANEL_ID + " .bb-btn--ghost:hover{background:#f4f7f4;}",

      "@media (max-width:520px){",
      "  #" + PANEL_ID + "{top:12px;border-radius:14px;}",
      "  #" + PANEL_ID + " .bb-actions .bb-btn{flex:1 1 100%;text-align:center;}",
      "}"
    ].join("\n");

    var el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = css;
    document.head.appendChild(el);
  }

  function svgIcon(kind, size) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", size || 18);
    svg.setAttribute("height", size || 18);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");

    if (kind === "x") {
      var p = document.createElementNS(ns, "path");
      p.setAttribute("stroke", "currentColor");
      p.setAttribute("stroke-width", "2");
      p.setAttribute("stroke-linecap", "round");
      p.setAttribute("d", "M6 6l12 12M18 6L6 18");
      svg.appendChild(p);
      return svg;
    }

    var c = document.createElementNS(ns, "circle");
    c.setAttribute("cx", "12"); c.setAttribute("cy", "12"); c.setAttribute("r", "10");
    c.setAttribute("stroke", "currentColor"); c.setAttribute("stroke-width", "2");
    svg.appendChild(c);

    var path = document.createElementNS(ns, "path");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("d", kind === "wait" ? "M12 7v5l3 2" : "M8 12.5l2.5 2.5L16 9");
    svg.appendChild(path);
    return svg;
  }

  function closePanel() {
    var p = document.getElementById(PANEL_ID);
    if (!p) return;
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    document.removeEventListener("click", outsideClick, true);
    p.classList.remove("is-open");
    setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 240);
  }

  function buildPanel(product, qty, date, stockHint, leadTime) {
    injectStyle();

    // Ha ugyanaz a panel mar nyitva van, NE epitsuk ujra - kulonben az
    // automatikus zaras idozitoje minden alkalommal nullazodna, es a panel
    // sosem tunne el magatol.
    var signature = [product.name, qty, date || "", stockHint || "", leadTime || ""].join("|");
    var existing = document.getElementById(PANEL_ID);
    if (existing) {
      var sameContent = existing.getAttribute("data-signature") === signature;
      var age = Date.now() - (+existing.getAttribute("data-built-at") || 0);
      // Azonos tartalom -> soha ne epitsuk ujra.
      // Elteroe tartalom -> csak 1 masodperc utan, kulonben az esemenyek
      // ismetlodese vegtelenul nullazna az automatikus zaras idozitojet.
      if (sameContent || age < 1000) {
        log("panel mar nyitva (azonos:", sameContent, ", kora:", age, "ms) - nem epitjuk ujra");
        return existing;
      }
    }
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }

    var panel = document.createElement("div");
    panel.id = PANEL_ID;
    panel.setAttribute("data-signature", signature);
    panel.setAttribute("data-built-at", String(Date.now()));
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-live", "polite");

    /* fejléc */
    var head = document.createElement("div");
    head.className = "bb-head";
    var okIcon = svgIcon("ok", 20);
    okIcon.style.color = "#2e7d32";
    head.appendChild(okIcon);
    var headText = document.createElement("span");
    headText.className = "bb-head-text";
    headText.textContent = CONFIG.title;
    head.appendChild(headText);
    panel.appendChild(head);

    /* bezárás */
    var close = document.createElement("button");
    close.className = "bb-close";
    close.type = "button";
    close.setAttribute("aria-label", "Bez\u00e1r\u00e1s");
    close.appendChild(svgIcon("x", 18));
    close.addEventListener("click", closePanel);
    panel.appendChild(close);

    /* törzs */
    var body = document.createElement("div");
    body.className = "bb-body";

    if (product.image) {
      var thumb = document.createElement("img");
      thumb.className = "bb-thumb";
      thumb.src = product.image;
      thumb.alt = "";
      thumb.onerror = function () { if (this.parentNode) this.parentNode.removeChild(this); };
      body.appendChild(thumb);
    }

    var info = document.createElement("div");
    info.className = "bb-info";

    var name = document.createElement("p");
    name.className = "bb-name";
    name.textContent = product.name;
    info.appendChild(name);

    var meta = document.createElement("div");
    meta.className = "bb-meta";

    var qtyEl = document.createElement("span");
    qtyEl.className = "bb-qty";
    qtyEl.textContent = qty + " darab";
    meta.appendChild(qtyEl);

    // Három eset: van dátum / raktáron / rendelhető dátum nélkül
    var mode = null;
    if (date) mode = "wait";
    else if (stockHint === "instock") mode = "stock";
    else if (stockHint === "orderable" || stockHint === "nostock") mode = "order";

    if (mode) {
      var status = document.createElement("span");
      status.className = "bb-status bb-status--" + (mode === "stock" ? "stock" : "wait");
      status.appendChild(svgIcon(mode === "stock" ? "ok" : "wait", 17));
      var statusText = document.createElement("span");
      statusText.textContent =
        mode === "wait"  ? CONFIG.waitText.replace("{date}", date) :
        mode === "stock" ? CONFIG.inStockText :
                           CONFIG.orderableText;
      status.appendChild(statusText);
      meta.appendChild(status);
    }

    info.appendChild(meta);

    var noteText = null;
    if (mode === "wait" && CONFIG.waitNote) {
      noteText = CONFIG.waitNote;
    } else if (mode === "order") {
      noteText = leadTime
        ? CONFIG.orderableNote.replace("{lead}", leadTime)
        : CONFIG.orderableNoteFallback;
    }
    if (noteText) {
      var note = document.createElement("p");
      note.className = "bb-note";
      note.textContent = noteText;
      info.appendChild(note);
    }

    body.appendChild(info);
    panel.appendChild(body);

    /* gombok */
    var actions = document.createElement("div");
    actions.className = "bb-actions";

    var cta = document.createElement("a");
    cta.className = "bb-btn bb-btn--primary";
    cta.href = cartUrl();
    cta.textContent = CONFIG.cartButtonText;
    actions.appendChild(cta);

    var cont = document.createElement("button");
    cont.className = "bb-btn bb-btn--ghost";
    cont.type = "button";
    cont.textContent = CONFIG.continueButtonText;
    cont.addEventListener("click", closePanel);
    actions.appendChild(cont);

    panel.appendChild(actions);
    document.body.appendChild(panel);

    // belépő animáció
    requestAnimationFrame(function () { panel.classList.add("is-open"); });

    /* automatikus zárás — csak ha nincs várható beérkezés */
    var keepOpen = date && CONFIG.keepOpenWhenWaiting;
    if (!keepOpen && CONFIG.autoCloseMs > 0) {
      closeTimer = setTimeout(function () {
        log("automatikus zaras");
        closePanel();
      }, CONFIG.autoCloseMs);

      // Ha az egér a panelen van, ne záruljon; ha lejön róla, induljon újra
      panel.addEventListener("mouseenter", function () {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; log("idozito szunetel"); }
      });
      panel.addEventListener("mouseleave", function () {
        if (panel.getAttribute("data-short")) return;   // hiánynál nyitva marad
        if (!closeTimer) closeTimer = setTimeout(closePanel, CONFIG.autoCloseMs);
      });
    }

    /* kattintás a panelen kívül -> bezárás */
    if (CONFIG.closeOnOutsideClick) {
      setTimeout(function () {
        document.addEventListener("click", outsideClick, true);
      }, 50);
    }

    log(keepOpen ? "panel nyitva marad (van datum)"
                 : "panel " + CONFIG.autoCloseMs + " ms mulva zarul");
    return panel;
  }

  function outsideClick(e) {
    var panel = document.getElementById(PANEL_ID);
    if (!panel) { document.removeEventListener("click", outsideClick, true); return; }
    if (panel.contains(e.target)) return;
    closePanel();
  }

  /* ======================================================================
   * Az eredeti toast elrejtése + saját panel
   * ==================================================================== */

  function hideOriginal(el) {
    try {
      el.style.setProperty("display", "none", "important");
      el.setAttribute("data-bb-hidden", "1");
    } catch (e) { /* nem baj */ }
  }

  function isCartMessage(el) {
    return isMessageText((el.textContent || "").trim());
  }

  function handle(node) {
    try { handleInner(node); }
    catch (err) {
      log("HIBA a feldolgozasban:", err && err.message);
      if (window.console && console.error) console.error("[cart-panel]", err);
    }
  }

  function handleInner(node) {
    if (!node || node.nodeType !== 1) return;
    if (node.id === PANEL_ID || (node.closest && node.closest("#" + PANEL_ID))) return;
    if (node.getAttribute && node.getAttribute("data-bb-hidden")) return;
    if (!isCartMessage(node)) return;

    var ctx;
    try { ctx = resolveContext(); }
    catch (e) { log("kartyafelismeres hiba, oldalszintre esunk vissza"); ctx = { root: document, isCard: false }; }

    // Kártyáról jött? Akkor nem nyúlunk hozzá — menjen az alap felugró.
    if (ctx.isCard && CONFIG.skipOnCards) {
      log("kartyarol jott - meghagyjuk az alap felugrot");
      return;
    }

    var product = readProduct(ctx);
    if (!product.name) { log("nincs termeknev, hagyjuk az eredeti uzenetet"); return; }

    var qty = readQuantity(ctx);
    var date = readExpectedDate(ctx);
    var stockHint = readStockStatus(ctx);
    var leadTime = (stockHint === "orderable" || stockHint === "nostock")
      ? readLeadTime(ctx) : null;
    log("termek:", product.name, "| cikkszam:", product.sku, "| db:", qty,
        "| datum:", date, "| keszlet:", stockHint, "| kartya:", ctx.isCard);

    // Az eredeti felugró elrejtése: maga az üzenet, a benne levő elemek,
    // és a körülötte lévő keret is
    hideMessageAndWrappers(node);
    var inner = node.querySelectorAll ? node.querySelectorAll(CONFIG.toastItemSelector) : [];
    [].forEach.call(inner, hideOriginal);

    var panel = buildPanel(product, qty, date, stockHint, leadTime);

    // Új: raktáron lévő terméknél megnézzük, megvan-e a teljes mennyiség
    if (!date && stockHint === "instock" && product.sku) {
      checkStock(product.sku, qty, function (enough) {
        if (enough === false && document.getElementById(PANEL_ID) === panel) markShort(panel);
      });
    }
  }

  /* ======================================================================
   * Figyelés
   * ==================================================================== */

  /* ======================================================================
   * Figyelés — EGYETLEN globális megfigyelő
   *
   * Nem kötjük magunkat konkrét konténerekhez (a #toast-container például
   * csak a kattintáskor jön létre, az #overlay_cart_add viszont már a
   * betöltéskor ott van). Helyette minden DOM-változás után megnézzük,
   * van-e látható kosár-üzenet bárhol az oldalon.
   * ==================================================================== */

  /* "Látszik-e" — szándékosan NEM a méretet nézzük, mert a felugró a
   * megjelenés pillanatában még nincs elrendezve (offsetWidth = 0), és így
   * lemaradnánk róla. Helyette azt vizsgáljuk, hogy el van-e rejtve. */
  function isVisible(el) {
    if (!el || el.nodeType !== 1) return false;

    var node = el;
    for (var i = 0; i < 20 && node && node.nodeType === 1; i++) {
      if (node.hasAttribute && (node.hasAttribute("hidden")
          || node.getAttribute("aria-hidden") === "true")) return false;

      if (node.style && (node.style.display === "none"
          || node.style.visibility === "hidden")) return false;

      var st = null;
      try { st = window.getComputedStyle(node); } catch (e) { st = null; }
      if (st && (st.display === "none" || st.visibility === "hidden")) return false;

      node = node.parentElement;
    }
    return true;
  }

  /* Kosárgomb-e (vagy annak valamelyik szülője)? */
  function looksLikeCartButton(el) {
    var node = el;
    for (var i = 0; i < 5 && node && node !== document.body; i++) {
      var cls = "";
      if (typeof node.className === "string") cls = node.className;
      cls += " " + (node.id || "");
      if (/cart|kosar|puttony|basket/i.test(cls)) return true;

      var txt = (node.textContent || "").trim();
      if (txt && txt.length < 40 && /puttony|kos[a\u00e1]rba/i.test(txt)) return true;

      node = node.parentElement;
    }
    return false;
  }

  /* Bárhol az oldalon: a legszűkebb látható elem, aminek a szövege a
   * kosárba tételt jelzi. Nem függ a felugró típusától. */
  var MESSAGE_CANDIDATES = [
    '[id*="cart"]', '[class*="cart"]',
    '[class*="overlay"]', '[id*="overlay"]',
    '[class*="toast"]', '[id*="toast"]',
    '[class*="popup"]', '[class*="modal"]',
    '[class*="notification"]', '[class*="alert"]',
    '[role="alert"]', '[role="status"]'
  ].join(", ");

  /* A visszajelző üzenet szövege: kell benne "puttony"/"kosár" ÉS egy ige,
   * ami a hozzáadást jelzi. Enélkül a "Puttonyba" feliratú GOMB is
   * üzenetnek látszana — az rövidebb, így korábban azt választotta. */
  var MESSAGE_RE = /(puttony|kos[a\u00e1]r)/i;
  var MESSAGE_VERB_RE = /(ker[u\u00fc]lt|tett[u\u00fc]k|hozz[a\u00e1]ad|siker|beker[u\u00fc]lt)/i;

  function isMessageText(txt) {
    return MESSAGE_RE.test(txt) && MESSAGE_VERB_RE.test(txt);
  }

  /* Vezérlőelem-e (gomb, link, mező)? Ezek soha nem üzenetek. */
  function isControl(el) {
    var tag = el.tagName;
    if (tag === "BUTTON" || tag === "A" || tag === "INPUT" || tag === "SELECT") return true;
    if (el.closest && el.closest("button, a, input, select, form")) {
      // Kivétel: a felugró belsejében lehet gomb; ha az elem MAGA nem
      // vezérlő, de gombban van, akkor is kihagyjuk
      return true;
    }
    return false;
  }

  function findVisibleCartMessage() {
    var nodes;
    try { nodes = document.querySelectorAll(MESSAGE_CANDIDATES); }
    catch (e) { return null; }

    var best = null, bestLen = Infinity;
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.id === PANEL_ID) continue;
      if (el.closest && el.closest("#" + PANEL_ID)) continue;
      if (el.getAttribute && el.getAttribute("data-bb-hidden")) continue;
      if (isControl(el)) continue;

      var txt = (el.textContent || "").trim();
      if (!txt || txt.length > 400) continue;
      if (!isMessageText(txt)) continue;
      if (!isVisible(el)) continue;

      if (txt.length < bestLen) { bestLen = txt.length; best = el; }
    }
    return best;
  }

  /* Az üzenetet tartalmazó KÜLSŐ felugró keretet is el kell rejteni,
   * különben a régi doboz üresen ott marad a képernyőn. */
  function hideMessageAndWrappers(el) {
    hideOriginal(el);
    var node = el.parentElement;
    for (var i = 0; i < 4 && node && node !== document.body; i++) {
      var txt = (node.textContent || "").trim();
      if (txt.length > 400 || !isMessageText(txt)) break;
      hideOriginal(node);
      node = node.parentElement;
    }
  }

  var scanScheduled = false;

  function scheduleScan() {
    if (scanScheduled) return;
    scanScheduled = true;
    setTimeout(function () {
      scanScheduled = false;
      scan();
    }, 60);
  }

  function scan() {
    if (document.getElementById(PANEL_ID)) return;   // már látszik a panelünk
    var msg = findVisibleCartMessage();
    if (!msg) return;
    log("uzenet megtalalva:", msg.tagName,
        "id=" + (msg.id || "-"), "class=" + (msg.className || "-"));
    handle(msg);
  }

  /* Kattintás után 3 másodpercig figyelünk, 150 ms-onként — akkor is, ha a
   * MutationObserver valamiért nem kapja el az eseményt. */
  function scheduleSweeps() {
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      scan();
      if (document.getElementById(PANEL_ID) || tries > 20) clearInterval(iv);
    }, 150);
    scan();
  }

  function init() {
    log("verzio:", VERSION);

    document.addEventListener("click", function (e) {
      lastClick = e.target;
      lastClickAt = Date.now();
      if (looksLikeCartButton(e.target)) {
        log("kosargomb kattintas eszlelve");
        scheduleSweeps();
      }
    }, true);

    // Az Unas saját eseménye kosárba tételkor (main.js: addToCartSuccess).
    // Ez a legmegbízhatóbb jelzés — ha van jQuery, erre is felkötünk.
    var jq = window.jQuery || window.$;
    if (jq && jq(document) && jq(document).on) {
      try {
        jq(document).on("addToCartSuccess", function () {
          log("addToCartSuccess esemeny");
          scheduleSweeps();
        });
      } catch (e) { log("addToCartSuccess felkotes nem sikerult"); }
    }

    // Minden DOM-változásnál ellenőrizzük, megjelent-e a visszajelzés
    new MutationObserver(scheduleScan).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "hidden", "aria-hidden"]
    });

    scan();   // ha valami már most látszik

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
    });
  }

  /* Diagnosztika: konzolbol -> cartPanelDebug() */
  window.cartPanelDebug = function () {
    var id = CONFIG.paramId;
    console.log("=== cart-panel diagnosztika ===");
    console.log("SCRIPT VERZIO:", VERSION);
    console.log("Utolso kattintas:", lastClick
      ? "<" + lastClick.tagName.toLowerCase() + " class='" + lastClick.className + "'>"
      : "(nem volt)");
    var ctx = resolveContext();
    console.log("Hatokor:", ctx.isCard ? "TERMEKKARTYA" : "fo termek oldal");
    if (ctx.isCard) {
      console.log("  kartya: <" + ctx.root.tagName.toLowerCase()
                  + " class='" + ctx.root.className + "'>");
    } else if (lastClick) {
      console.log("  Nem talaltam kartyat. A kattintas feletti DOM-lanc:");
      var n = lastClick, lvl = 0;
      while (n && n !== document.body && lvl < 14) {
        var h1 = document.querySelector("h1");
        console.log("   [" + lvl + "] <" + n.tagName.toLowerCase()
          + " class='" + (n.className || "") + "' id='" + (n.id || "") + "'>"
          + " szoveg=" + textLen(n)
          + (h1 && n.contains(h1) ? " (tartalmazza a H1-et)" : ""));
        n = n.parentElement; lvl++;
      }
      console.log("  Masold be nekem ezt a listat, vagy allitsd be a "
                  + "CONFIG.cardSelector erteket.");
    }
    console.log("Termek:", readProduct(ctx));
    console.log("Mennyiseg:", readQuantity(ctx));

    var hits = [];
    try {
      hits = [].slice.call(document.querySelectorAll(
        '[id*="' + id + '"], [class*="' + id + '"]'));
    } catch (e) { /* ures marad */ }
    console.log("A(z) " + id + " azonositot tartalmazo elemek:", hits.length);
    hits.slice(0, 8).forEach(function (el) {
      console.log("   id='" + el.id + "' class='" + el.className + "' szoveg='"
                  + (el.textContent || "").trim().slice(0, 60) + "'");
    });

    console.log("Datum (ID alapjan)     :", readDateById(ctx));
    console.log("Datum (ertek-elem)      :", readDateByValueClass(ctx));
    console.log("Datum (felirat alapjan):", readDateByLabel(ctx));
    console.log("Keszletallapot:", readStockStatus(ctx));
    console.log("Beszerzesi ido:", readLeadTime(ctx));
    console.log("Kosar URL:", cartUrl());
    var msg = findVisibleCartMessage();
    console.log("Lathato kosar-uzenet most:", msg
      ? "<" + msg.tagName.toLowerCase() + " id='" + msg.id + "' class='"
        + msg.className + "'> " + (msg.textContent || "").trim().slice(0, 60)
      : "(nincs)");
    console.log("=== vege ===");
  };

  /* Elonezet teszteleshez: cartPanelPreview() vagy cartPanelPreview("2026.09.11.") */
  window.cartPanelPreview = function (date) {
    var ctx = resolveContext();
    var sh = readStockStatus(ctx);
    buildPanel(readProduct(ctx), readQuantity(ctx),
               typeof date === "undefined" ? readExpectedDate(ctx) : date,
               sh, readLeadTime(ctx));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();