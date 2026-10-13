(function () {
var MINDENKI = true;
var API = "https://webstat.bi-bor.hu/api/dokutar.php";
var allapot = null;
try {
var m = location.search.match(/[?&]dokumentumok=([01])/);
if (m) localStorage.setItem('bbDokumentumok', m[1]);
allapot = localStorage.getItem('bbDokumentumok');
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var magyar = (document.documentElement.lang || 'hu').slice(0, 2) === 'hu';
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
if (!document.getElementById('bb-doksi-stilus')) {
var st = document.createElement('style');
st.id = 'bb-doksi-stilus';
st.textContent = ".bb-doksi{margin: 12px 0 0;padding: 10px 12px 6px;border: 1px solid #e2dbcf;border-radius: 10px;background: #fff;color: #221f1b;font-size: 13px;line-height: 1.4}.bb-doksi__cim{font-size: 11.5px;font-weight: 700;letter-spacing: .06em;text-transform: uppercase;color: #6b645a;margin-bottom: 4px}.bb-doksi__sor{display: flex;align-items: center;gap: 10px;padding: 6px 4px;margin: 0 -4px;border-radius: 8px;color: inherit !important;text-decoration: none !important}.bb-doksi__sor:hover{background: #f4f9f1}.bb-doksi__sor:hover b{color: #1f6a0c}.bb-doksi__tipus{flex: none;width: 30px;height: 36px;border-radius: 4px 9px 4px 4px;display: grid;place-items: end center;padding-bottom: 4px;font-size: 8.5px;font-weight: 800;color: #fff;background: #8a8178}.bb-doksi__tipus--pdf{background: #c4432f}.bb-doksi__tipus--jpg,.bb-doksi__tipus--png,.bb-doksi__tipus--webp{background: #2f8a85}.bb-doksi__tipus--doc,.bb-doksi__tipus--docx{background: #2f5fa8}.bb-doksi__tipus--xls,.bb-doksi__tipus--xlsx{background: #2a8511}.bb-doksi__szoveg{display: flex;flex-direction: column;min-width: 0}.bb-doksi__szoveg b{font-weight: 600;font-size: 13.5px}.bb-doksi__szoveg small{color: #6b645a;font-size: 12px}.bb-doksi__tobb{display: inline-block;margin: 4px 0 4px;font-size: 12.5px;font-weight: 600;color: #1f6a0c !important}";
document.head.appendChild(st);
}
var doboz = document.createElement('div');
doboz.className = 'bb-doksi';
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
hely.parentNode.insertBefore(doboz, hely.nextSibling);
}

var proba = 0;
(function fut() {
var el = document.querySelector('.artdet__sku-value');
var sku = el && el.textContent.trim();
if (!sku) { if (++proba < 20) setTimeout(fut, 250); return; }
fetch(API + '?mod=termek&sku=' + encodeURIComponent(sku))
.then(function (r) { return r.ok ? r.json() : null; })
.then(function (j) {
if (!j || !j.docs || !j.docs.length) return;
var n = 0;
(function tesz() {
rajzol(sku, j.docs);
if (!document.querySelector('.bb-doksi') && ++n < 20) setTimeout(tesz, 250);
})();
})
.catch(function () { /* a Webstat nem érhető el: nincs blokk */ });
})();
})();
