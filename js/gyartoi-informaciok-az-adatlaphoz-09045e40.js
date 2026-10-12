(function () {
var MINDENKI = false;
var allapot = null;
try {
var m = location.search.match(/[?&]gyarto=([01])/);
if (m) localStorage.setItem('bbGyarto', m[1]);
allapot = localStorage.getItem('bbGyarto');
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var GYARTOK = {"erbslöh":["Erbslöh Geisenheim GmbH","Erbslöhstraße 1, 65366 Geisenheim, Németország","","https://www.erbsloeh.com",1,0],"oenobiotech":["OenoBioTech SAS","30 rue des Terres Fortes, 77600 Chanteloup-en-Brie, Franciaország","info@oenobiotech.com","https://oenobiotech.com",1,0],"lallemand":["Lallemand SAS","19 rue des Briquetiers, P.A. de Font Grasse, 31700 Blagnac, Franciaország","","https://www.lallemandwine.com",1,0],"uvaferm":["Lallemand SAS","19 rue des Briquetiers, P.A. de Font Grasse, 31700 Blagnac, Franciaország","","https://www.lallemandwine.com",1,0],"chrhansen":["Chr. Hansen A/S (Novonesis)","Kogle Allé 6, 2970 Hørsholm, Dánia","","https://www.novonesis.com/en/contact",1,0],"enartis":["Enartis S.r.l.","Via San Cassiano 99, 28069 San Martino di Trecate (NO), Olaszország","vino@enartis.it","https://www.enartis.com",1,0],"aebhungáriakft":["AEB Hungária Kft.","Klapka utca 13-15., 8630 Balatonboglár, Magyarország","info@aeb-hungaria.hu","https://www.aeb-group.com/hu",1,0],"lamotheabiet":["Lamothe-Abiet SAS","ZA Actipolis, Avenue Ferdinand de Lesseps, 33610 Canéjan, Franciaország","","https://lamothe-abiet.com/contact/",1,0],"vikan":["Vikan A/S","Rævevej 1, 7800 Skive, Dánia","vikan@vikan.com","https://www.vikan.com",1,0],"zki":["ZKI Zöldségtermesztési Kutató Intézet Zrt.","Mészöly Gyula út 6., 6000 Kecskemét, Magyarország","zki@zki.hu","https://zki.hu",1,0],"unikén":["Unikén Kft.","Vasút utca 30., 6237 Kecel, Magyarország","ertekesites@uniken.hu","https://uniken.hu",1,0],"basf":["BASF SE","Carl-Bosch-Straße 38, 67056 Ludwigshafen am Rhein, Németország","global.info@basf.com","https://www.basf.com",1,0],"pulmicpulmipur":["Sanz Hermanos Valencia S.L. (Grupo Sanz)","Carretera Benisanó-Olocau s/n, 46181 Benisanó (Valencia), Spanyolország","info@gruposanz.es","https://www.gruposanz.es",1,0],"protect":["Bábolna Környezetbiológiai Központ Kft.","Szállás utca 6., 1107 Budapest, Magyarország","info@babolna-bio.com","https://www.babolna-bio.com",1,0],"biostop":["Bábolna Környezetbiológiai Központ Kft.","Szállás utca 6., 1107 Budapest, Magyarország","info@babolna-bio.com","https://www.babolna-bio.com",1,0],"bros":["BROS Sp. z o.o.","ul. Karpia 24, 61-619 Poznań, Lengyelország","biuro@bros.pl","https://bros.pl",1,0],"biopon":["BROS Sp. z o.o.","ul. Karpia 24, 61-619 Poznań, Lengyelország","biuro@bros.pl","https://bros.pl",1,0],"kapriol":["Morganti S.p.A.","Via S. Egidio 12, 23900 Lecco (LC), Olaszország","kapriol@kapriol.com","https://www.kapriol.com",1,0],"dedra":["Dedra-Exim Sp. z o.o.","ul. 3 Maja 8, 05-800 Pruszków, Lengyelország","info@dedra.pl","https://dedra.pl",1,0],"hecht":["HECHT MOTORS s.r.o.","U Mototechny 131, 251 62 Mukařov – Tehovec, Csehország","hecht@hecht.cz","https://www.hecht.cz",1,0],"neotools":["GTX Poland Sp. z o.o. Sp. K.","ul. Pograniczna 2/4, 02-285 Warszawa, Lengyelország","office@gtx-group.com","https://www.gtx-group.com",1,0],"graphite":["GTX Poland Sp. z o.o. Sp. K.","ul. Pograniczna 2/4, 02-285 Warszawa, Lengyelország","office@gtx-group.com","https://www.gtx-group.com",1,0],"cellfast":["Cellfast Sp. z o.o.","ul. Grabskiego 31, 37-450 Stalowa Wola, Lengyelország","product@cellfast.com.pl","https://cellfast.com.pl",1,0],"bahco":["SNA Europe [Italia] S.p.A.","Via Privata Georges Bizet 13/15, 20092 Cinisello Balsamo (MI), Olaszország","info@bahco.com","https://www.bahco.com",1,0],"löwe":["Gebr. Schröder GmbH (Original LÖWE)","Konrad-Zuse-Ring 3, 24220 Flintbek, Németország","info@original-loewe.de","https://www.original-loewe.de",1,0],"dunlop":["Dunlop Protective Footwear B.V.","Boeierstraat 12, 8102 HS Raalte, Hollandia","info@dunlopboots.com","https://www.dunlopboots.com",1,0],"bellota":["VNPI Global Investments & Services, S.L. (Bellota)","Urola 10, 20230 Legazpi (Gipuzkoa), Spanyolország","comercial@bellota.com","https://www.bellota.com",1,0],"truper":["TRUPER, S.A. de C.V. (Mexikó)","Mexikó","","https://www.truper.com",0,["Cu-Technik Kft. (magyarországi importőr)","2314 Halásztelek, Szenderffy Ferenc utca 9. 1/1.","info@trupershop.hu"] ],"vacuvin":["Vacu Vin BV","Kanaalweg 3b, 2628 EB Delft, Hollandia","info@vacuvin.com","https://vacuvin.com",1,0],"alko":["AL-KO Geräte GmbH","Ichenhauser Str. 14, 89359 Kötz, Németország","info@al-ko.com","https://www.al-ko.com",1,0],"gripple":["Gripple Ltd","The Old West Gun Works, Savile Street East, Sheffield S4 7UQ, Egyesült Királyság","","https://www.gripple.com/contact/",0,["Gripple GmbH","Loherstraße 4, 35614 Aßlar, Németország","deinfo@gripple.com"] ],"max":["MAX Co., Ltd. (Japán)","Japán","","https://www.max-ltd.co.jp",0,["MAX Europe B.V.","Camerastraat 19, 1322 BB Almere, Hollandia","sales@max-europe.com"] ],"momert":["MOMERT Zrt.","Papírgyári út 12-14., 2400 Dunaújváros, Magyarország","","https://www.momert.hu",1,0],"zottel":["ZOTTEL d.o.o.","Cesta Žalskega tabora 19, 3310 Žalec, Szlovénia","info@zottel.si","https://www.zottel.si",1,0],"zambellienotech":["ZAMBELLI Enotech s.r.l.","Via dell'Artigianato 70, 36043 Camisano Vicentino (VI), Olaszország","info@zambellienotech.it","https://www.zambellienotech.com",1,0],"roverpompe":["ROVER POMPE S.A.S. di Chiarello Mirco & C.","Via dell'Artigianato 4, 35020 Polverara (PD), Olaszország","roverpompe@pec.it","https://www.roverpompe.com",1,0],"enoveneta":["Enoveneta S.p.A.","Via Marconi 56, 35016 Piazzola sul Brenta (PD), Olaszország","info@enoveneta.it","https://www.enoveneta.it",1,0],"filtrox":["FILTROX AG","Moosmühlestrasse 6, 9001 St. Gallen, Svájc","sales@filtrox.com","https://www.filtrox.com",0,["FILTROX France s.a.r.l.","18 rue Buffon, 21200 Beaune, Franciaország","france@filtrox.com"] ],"spagni":["Spagni S.a.s.","Via del Cristo 2/A, Fellegara di Scandiano, 42019 (RE), Olaszország","https://www.spagni.com/contatti/","https://www.spagni.com",1,0],"guala":["Guala Closures S.p.A.","Via Rana 12, Zona Industriale D6, 15122 Spinetta Marengo (AL), Olaszország","","https://www.gualaclosures.com",1,0],"smurfit":["Smurfit Westrock Bag-in-Box","Quai de l'Ile Belon, B.P. 21064, 51200 Epernay, Franciaország","https://www.smurfitkappa.com/locations/france/smurfit-kappa-bag-in-box","https://www.smurfitwestrock.com",1,0],"verto":["GTX Poland Sp. z o.o. Sp.k.","Pograniczna 2/4, 02-285 Warszawa, Lengyelország","office@gtx-group.com","https://www.gtx-group.com",1,0],"winussrl":["Winus S.r.l.","Via Daniele Manin 37, 36040 Sossano (VI), Olaszország","winus@winus.it","https://www.winus.it",1,0],"pellenc":["Pellenc SAS","Route de Cavaillon, BP 47, 84122 Pertuis, Franciaország","","https://www.pellenc.com",1,0],"claas":["CLAAS KGaA mbH","Mühlenwinkel 1, 33428 Harsewinkel, Németország","infoclaas@claas.com","https://www.claas.com",1,0],"grifo":["Grifo Marchetti S.r.l.","Via Mantova 1, 26034 Piadena Drizzona (CR), Olaszország","info@grifomarchetti.com","https://www.grifomarchetti.com",1,0],"enoitalia":["Enoitalia Costruzioni Macchine Enologiche S.r.l.","Via Provinciale Pisana 162, 50050 Cerreto Guidi (FI), Olaszország","","https://www.enoitaliagroup.com",1,0],"seguinmoreau":["SEGUIN MOREAU & C° SAS","Zone Industrielle le Petit Oumelet, 16100 Merpins, Franciaország","info@seguin-moreau.fr","https://www.seguin-moreau.fr",1,0],"ebara":["EBARA Pumps Europe S.p.A.","Via Torri di Confine 2/1 int. C, 36053 Gambellara (VI), Olaszország","https://www.ebaraeurope.com/contacts/send-us-your-request/","https://www.ebaraeurope.com",1,0]};
var PARAM_ID = 'artdet-param-title-7108663';

var magyar = (document.documentElement.lang || 'hu').slice(0, 2) === 'hu';
var SZ = magyar
? { cim: 'Gyártói információk', gyarto: 'Gyártó', posta: 'Postai cím', elerh: 'Elérhetőség', felelos: 'Felelős személy az EU-ban' }
: { cim: 'Manufacturer information', gyarto: 'Manufacturer', posta: 'Postal address', elerh: 'Contact', felelos: 'Responsible person in the EU' };

function kulcs(s) { return (s || '').toLowerCase().replace(/[^a-z0-9áéíóöőúüű]/g, ''); }

function sor(dl, cimke, ertek, link) {
if (!ertek) return;
var dt = document.createElement('dt'); dt.textContent = cimke;
var dd = document.createElement('dd');
if (link) {
var a = document.createElement('a');
a.href = link; a.textContent = ertek; a.rel = 'nofollow noopener'; a.target = '_blank';
dd.appendChild(a);
} else dd.textContent = ertek;
dl.appendChild(dt); dl.appendChild(dd);
}
function elerhetoseg(dl, email, web) {
if (email) sor(dl, SZ.elerh, email.replace(/^mailto:/, ''), /^https?:/.test(email) ? email : 'mailto:' + email.replace(/^mailto:/, ''));
if (web) sor(dl, email ? '' : SZ.elerh, web.replace(/^https?:\/\//, '').replace(/\/$/, ''), /^https?:/.test(web) ? web : 'https://' + web);
}

function indul() {
var cim = document.getElementById(PARAM_ID);
if (!cim) return false;
var param = cim.closest('.artdet__spec-param') || cim.closest('.row');
var ertekEl = param && param.querySelector('.artdet__spec-param-value');
var g = ertekEl && GYARTOK[kulcs(ertekEl.textContent)];
if (!g || document.querySelector('.bb-gyarto')) return true;

if (!document.getElementById('bb-gyarto-stilus')) {
var st = document.createElement('style');
st.id = 'bb-gyarto-stilus';
st.textContent = ".bb-gyarto{margin: 6px 0 10px;font-size: 13px;line-height: 1.45;color: #3d3730}.bb-gyarto summary{cursor: pointer;color: #5e7e3c;font-weight: 600;list-style: none;display: inline-flex;align-items: center;gap: 6px}.bb-gyarto summary::-webkit-details-marker{display: none}.bb-gyarto summary::after{content: '';width: 6px;height: 6px;border-right: 2px solid currentColor;border-bottom: 2px solid currentColor;transform: rotate(45deg) translateY(-2px);transition: transform .2s}.bb-gyarto[open] summary::after{transform: rotate(-135deg) translateY(-1px)}.bb-gyarto dl{display: grid;grid-template-columns: max-content 1fr;gap: 2px 12px;margin: 8px 0 0;padding: 8px 12px;border-radius: 8px;background: #faf8f4;border: 1px solid #ece7de}.bb-gyarto dt{color: #6b645a;font-weight: 400}.bb-gyarto dd{margin: 0;overflow-wrap: anywhere}.bb-gyarto a{color: #2e5d1a;text-decoration: underline}";
document.head.appendChild(st);
}
var det = document.createElement('details');
det.className = 'bb-gyarto';
var sum = document.createElement('summary');
sum.textContent = SZ.cim;
det.appendChild(sum);
var dl = document.createElement('dl');
sor(dl, SZ.gyarto, g[0]);
sor(dl, SZ.posta, g[1]);
elerhetoseg(dl, g[2], g[3]);
if (!g[4] && g[5]) {
sor(dl, SZ.felelos, g[5][0]);
sor(dl, SZ.posta, g[5][1]);
elerhetoseg(dl, g[5][2], '');
}
det.appendChild(dl);
param.parentNode.insertBefore(det, param.nextSibling);
return true;
}

var proba = 0;
(function fut() {
if (indul()) return;
if (++proba < 20) setTimeout(fut, 250);
})();
})();
