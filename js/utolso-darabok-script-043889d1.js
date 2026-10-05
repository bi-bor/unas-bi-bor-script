(function () {
  var WARNING_TEXT = 'Gyorsan fogy! Utolsó darabok';
  var CRITICAL_TEXT = 'Utolsó darab!';
  var WRAP_SELECTOR = '.product__stock, .artdet__stock';

  var FLAME_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z"></path></svg>';

  var style = document.createElement('style');
  style.textContent = `
    .stock--warning .stock__qty-and-unit,
    .stock--critical .stock__qty-and-unit {
      transform: scale(1.1);
      transform-origin: left center;
    }

    .stock--warning .stock__qty-and-unit {
      background-color: #f77f00;
      color: #fff !important;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      position: relative;
      overflow: hidden;
    }
    .stock--warning .stock__qty-and-unit svg {
      animation: flameFlicker 1.2s ease-in-out infinite;
    }
    @keyframes flameFlicker {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }
    .stock--warning .stock__qty-and-unit::after {
      content: '';
      position: absolute;
      top: 0; left: -60%;
      width: 40%; height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
      animation: stockSweep 2.4s ease-in-out infinite;
    }
    @keyframes stockSweep {
      0% { left: -60%; }
      60%, 100% { left: 130%; }
    }

    .stock--critical .stock__qty-and-unit {
      background-color: #c1121f;
      color: #fff !important;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .stock--critical .stock__qty-and-unit::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #fff;
      animation: stockPulse 1.4s ease-in-out infinite;
      flex-shrink: 0;
    }
    @keyframes stockPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.7); }
    }
  `;
  document.head.appendChild(style);

  function markLowStock() {
    document.querySelectorAll('.stock__qty-and-unit.is-text').forEach(function (el) {
      var text = el.textContent.trim();
      var stockWrap = el.closest(WRAP_SELECTOR);
      if (!stockWrap) return;

      stockWrap.classList.remove('stock--warning', 'stock--critical');
      el.querySelectorAll('svg.stock-flame-icon').forEach(function (s) { s.remove(); });

      if (text.indexOf(WARNING_TEXT) !== -1) {
        stockWrap.classList.add('stock--warning');
        if (!el.querySelector('svg.stock-flame-icon')) {
          el.insertAdjacentHTML('afterbegin', FLAME_SVG.replace('<svg ', '<svg class="stock-flame-icon" '));
        }
      } else if (text.indexOf(CRITICAL_TEXT) !== -1) {
        stockWrap.classList.add('stock--critical');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', markLowStock);
  markLowStock();

  var timeout;
  var observer = new MutationObserver(function () {
    clearTimeout(timeout);
    timeout = setTimeout(markLowStock, 150);
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();