(function () {
if (!/elallas-bejelentese/.test(location.pathname)) return;
function indul() {
var valaszto = document.querySelectorAll('form input[type="radio"][name$="_radio_Visszateritesmodja"]');
if (!valaszto.length) return;
var urlap = valaszto[0].form;
var mezok = [].filter.call(urlap.querySelectorAll('input[type="text"]'), function (m) {
return /_text_(Bankszamlaszam|Abankszamlatulajdonosa)/.test(m.name);
});
var cim = [].filter.call(urlap.querySelectorAll('.form-element-text-title'), function (e) {
return /kifejezetten hozzájárul/.test(e.textContent);
})[0];
var elemek = mezok.map(function (m) { return m.closest('.form-group') || m.parentNode; });
if (cim) {
cim.classList.remove('h4');
cim.style.cssText = 'font-size:14px;font-weight:400;line-height:1.5;color:#4a443c;margin:4px 0 10px';
elemek.unshift(cim);
var utana = cim.nextElementSibling;
if (utana && utana.classList.contains('form-element-text') && !utana.textContent.trim()) elemek.push(utana);
}
function frissit() {
var banki = [].some.call(valaszto, function (r) { return r.checked && /banki/i.test(r.value); });
elemek.forEach(function (e) { e.style.display = banki ? '' : 'none'; });
mezok.forEach(function (m) { m.required = banki; });
}
[].forEach.call(valaszto, function (r) { r.addEventListener('change', frissit); });
frissit();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul); else indul();
})();
