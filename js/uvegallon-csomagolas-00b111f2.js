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