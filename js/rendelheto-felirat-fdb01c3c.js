(function () {
  "use strict";

  function wrapWarehouseStatus() {
    var box = document.querySelector("#artdet__warehouses");
    if (!box) return;

    if (box.dataset.bbaStatusStyled === "1") return;

    var html = box.innerHTML;

    html = html.replace(
      /(^|[\s>])Raktáron([\s<]|$)/g,
      '$1<span class="bba-stock-badge--in-stock">Raktáron</span>$2'
    );

    html = html.replace(
      /(^|[\s>])Rendelhető([\s<]|$)/g,
      '$1<span class="bba-stock-badge--to-order">Rendelhető</span>$2'
    );

    html = html.replace(
      /(^|[\s>])Nincs raktáron([\s<]|$)/g,
      '$1<span class="bba-stock-badge--to-order">Nincs raktáron</span>$2'
    );

    box.innerHTML = html;
    box.dataset.bbaStatusStyled = "1";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wrapWarehouseStatus);
  } else {
    wrapWarehouseStatus();
  }

  var obs = new MutationObserver(wrapWarehouseStatus);
  obs.observe(document.body, { childList: true, subtree: true });
})();