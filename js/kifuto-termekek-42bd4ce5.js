(function () {
  "use strict";

  // ???? Kifutó matrica ID (UNAS)
  var KIFUTO_STICKER_ID = "35366";

  // Üzenet kifutó + elfogyott esetén
  var MSG_DISCONTINUED =
    "Kifutott termék – a termék beérkezéséről kérjük, érdeklődj ügyfélszolgálatunknál.";

  function norm(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  function hasKifutoSticker() {
    return document.querySelector(
      '.sticker[data-id="' + KIFUTO_STICKER_ID + '"]'
    );
  }

  function getWarehouseBox() {
    return document.querySelector(".artdet__warehouse");
  }

  function stockStatus(text) {
    if (text.includes("Raktáron") || text.includes("Készleten")) return "IN_STOCK";
    if (text.includes("Nincs raktáron") || text.includes("Elfogyott")) return "OUT_OF_STOCK";
    if (text.includes("Rendelhető")) return "ORDERABLE";
    return "UNKNOWN";
  }

  function hideCartAndQty() {
    // Kosár gombok
    var buttons = document.querySelectorAll("button, a");
    buttons.forEach(function (el) {
      var t = norm(el.textContent);
      if (t.includes("Puttonyba") || t.includes("Kosárba") || t.includes("Megrendelem")) {
        el.style.display = "none";
        el.setAttribute("disabled", "disabled");
      }
    });

    // Mennyiség mezők
    var qty = document.querySelectorAll(
      'input[type="number"], input[name*="quantity"], input[id*="quantity"]'
    );
    qty.forEach(function (el) {
      el.setAttribute("disabled", "disabled");
      if (el.parentElement) el.parentElement.style.display = "none";
    });
  }

  function replaceWarehouseText(box) {
    if (!box || box.getAttribute("data-bibor-kifuto") === "1") return;

    box.setAttribute("data-bibor-kifuto", "1");
    box.innerHTML =
      '<div style="font-size:14px; line-height:1.4;">' +
        '<strong>Kifutott termék</strong><br /><br />' +
        MSG_DISCONTINUED +
      '</div>';
  }

  function run() {
    // Csak ha kifutó matrica VAN
    if (!hasKifutoSticker()) return;

    var box = getWarehouseBox();
    if (!box) return;

    var status = stockStatus(norm(box.innerText));

    // Ha raktáron van → még eladható
    if (status === "IN_STOCK") return;

    // Egyébként tiltjuk
    hideCartAndQty();
    replaceWarehouseText(box);
  }

  // Init
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  // UNAS dinamikus frissítések miatt
  var obs = new MutationObserver(run);
  var obsBeallitas = { childList: true, subtree: true };
  if (document.body) obs.observe(document.body, obsBeallitas);
  else document.addEventListener("DOMContentLoaded", function () { obs.observe(document.body, obsBeallitas); });

})();
