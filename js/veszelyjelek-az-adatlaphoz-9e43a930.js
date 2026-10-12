(function () {
var MINDENKI = true;
var allapot = null;
try {
var m = location.search.match(/[?&]veszelyjel=([01])/);
if (m) localStorage.setItem('bbVeszelyjel', m[1]);
allapot = localStorage.getItem('bbVeszelyjel');
} catch (e) { /* tiltott tárhely: marad az alapértelmezés */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var TERMEKEK = {"16280":[ ["GHS05","GHS07"],"V",["H302","H318","EUH031"] ],"18774":[ ["GHS05","GHS07"],"V",["H302","H318","EUH031"] ],"50878":[ ["GHS05","GHS07"],"V",["H302","H318","EUH031"] ],"32078":[ ["GHS05","GHS07"],"V",["H302","H318","EUH031"] ],"04463":[ ["GHS05","GHS07"],"V",["H302","H318","EUH031"] ],"64424":[ ["GHS05","GHS07"],"V",["H302","H318","EUH031"] ],"25132":[ ["GHS05"],"V",["H318"] ],"18145":[ ["GHS05"],"V",["H318"] ],"03054":[ ["GHS05"],"V",["H318"] ],"21789":[ ["GHS05"],"V",["H318"] ],"21790":[ ["GHS05"],"V",["H318"] ],"21483":[ ["GHS05"],"V",["H315","H318"] ],"25131":[ ["GHS05"],"V",["H315","H318"] ],"50778":[ ["GHS05","GHS07","GHS08"],"V",["H302","H318","H361d"] ],"18146":[ ["GHS07"],"F",["H319"] ],"19309":[ ["GHS07"],"F",["H319"] ],"25130":[ ["GHS07"],"F",["H319"] ],"26729":[ ["GHS07"],"F",["H319"] ],"21854":[ ["GHS07"],"F",["H319"] ],"04427":[ ["GHS07"],"F",["H319"] ],"24505":[ ["GHS07"],"F",["H319"] ],"25148":[ ["GHS07"],"F",["H319"] ],"22828":[ ["GHS07"],"F",["H319"] ],"15825":[ ["GHS07"],"F",["H315"],{"hu":"Égetéskor mérgező kén-dioxid keletkezik: a füstöt ne lélegezze be, a hordót és a helyiséget kénezés után alaposan szellőztesse ki. Gyújtóforrástól távol tartandó.","en":"Burning releases toxic sulphur dioxide: do not inhale the fumes, ventilate the barrel and the room thoroughly after sulphuring. Keep away from sources of ignition."}],"04124":[ ["GHS07"],"F",["H315"],{"hu":"Égetéskor mérgező kén-dioxid keletkezik: a füstöt ne lélegezze be, a hordót és a helyiséget kénezés után alaposan szellőztesse ki. Gyújtóforrástól távol tartandó.","en":"Burning releases toxic sulphur dioxide: do not inhale the fumes, ventilate the barrel and the room thoroughly after sulphuring. Keep away from sources of ignition."}],"19257":[ ["GHS02","GHS07"],"F",["H228","H315"] ],"31928":[ ["GHS02","GHS07"],"F",["H228","H315"] ],"26818":[ ["GHS02","GHS07"],"F",["H228","H315"] ],"60599":[ ["GHS07"],"F",["H319"] ],"04391":[ ["GHS07"],"F",["H315","H319","H335"] ],"16316":[ ["GHS05","GHS07","GHS09"],"V",["H302","H318","H410"] ],"31277":[ ["GHS05","GHS07","GHS09"],"V",["H302","H318","H410"] ],"19230":[ ["GHS09"],"",["H411"] ],"33110":[ ["GHS09"],"",["H411"] ],"33731":[ ["GHS05","GHS07"],"V",["H318","H335"] ],"33730":[ ["GHS05"],"V",["H318"] ],"17639":[ ["GHS05"],"V",["H315","H318","EUH031"] ],"24570":[ ["GHS05"],"V",["H315","H318","EUH031"] ],"15901":[ ["GHS05","GHS07"],"V",["H315","H318","H335","EUH031"] ],"22491":[ ["GHS05"],"V",["H314"] ],"19432":[ ["GHS02","GHS05","GHS07","GHS09"],"V",["H242","H290","H302","H312","H314","H332","H335","H410"] ],"35523":[ ["GHS05","GHS07"],"V",["H290","H312","H314","EUH031"] ],"35932":[ ["GHS05","GHS07","GHS09"],"V",["H290","H302","H314","H335","H410","EUH031"] ],"26740":[ ["GHS07"],"F",["H319"] ],"19964":[ ["GHS07"],"F",["H319"] ],"20244":[ ["GHS07"],"F",["H319"] ],"19965":[ ["GHS07"],"F",["H319"] ],"19966":[ ["GHS07"],"F",["H319"] ],"04241":[ ["GHS05"],"V",["H314"] ],"03082":[ ["GHS05"],"V",["H314"] ],"03050":[ ["GHS09"],"",["H411","EUH208:allil-izotiocianát"] ],"04123":[ ["GHS09"],"",["H411","EUH208:allil-izotiocianát"] ],"04125":[ ["GHS09"],"",["H411","EUH208:allil-izotiocianát"] ],"30491":[ ["GHS03","GHS07","GHS09"],"V",["H272","H302","H319","H335","H410","EUH031"] ],"50876":[ ["GHS07"],"F",["H319"] ],"18775":[ ["GHS07"],"F",["H319"] ],"20960":[ ["GHS07"],"F",["H315","H319"] ],"25484":[ ["GHS07"],"F",["H315","H319"] ],"25480":[ ["GHS07"],"F",["H315","H319"] ],"25488":[ ["GHS07"],"F",["H315","H319"] ],"32070":[ ["GHS09"],"F",["H410","EUH208:1,2-benzizotiazol-3(2H)-on"] ],"30508":[ ["GHS03","GHS07","GHS09"],"V",["H272","H302","H319","H335","H410","EUH031","EUH206"] ],"30509":[ ["GHS03","GHS07","GHS09"],"V",["H272","H302","H319","H335","H410","EUH031"] ],"35568":[ ["GHS07","GHS09"],"F",["H302","H319","H335","H410","EUH031"] ],"34963":[ ["GHS02"],"V",["H222","H229"] ],"34964":[ ["GHS02"],"V",["H222","H229"] ],"35917":[ ["GHS07"],"F",["H315","H319"] ],"26644":[ ["GHS05","GHS07"],"V",["H302","H315","H318"] ],"30080":[ ["GHS05","GHS07"],"V",["H302","H315","H318"] ],"61605":[ ["GHS09"],"F",["H410","EUH208:permetrin"] ],"60603":[ ["GHS09"],"F",["H410","EUH208:permetrin"] ],"31959":[ ["GHS09"],"F",["H410","EUH401","EUH208:2-oktil-2H-izotiazol-3-on, 1,2-benzizotiazol-3(2H)-on"] ],"21250":[ ["GHS09"],"",["H411"] ],"30179":[ ["GHS02","GHS09"],"V",["H222","H229","H410"] ],"60975":[ [],"",["H412","EUH208:12-hidroxi-oktadekánsav és polietilénglikol polimerje"] ],"61916":[ ["GHS09"],"F",["H410"] ],"29112":[ ["GHS02","GHS07","GHS09"],"V",["H222","H229","H315","H410","EUH208:permetrin, narancsolaj, limonén"] ],"20421":[ ["GHS02","GHS09"],"V",["H222","H229","H410","EUH208:permetrin"] ],"29096":[ [],"",["EUH208:CMIT/MIT, 1,2-benzizotiazol-3(2H)-on"] ],"60508":[ ["GHS09"],"F",["H410","EUH208:permetrin"] ],"61584":[ ["GHS09"],"F",["H410","EUH208:permetrin"] ],"35404":[ ["GHS02","GHS07","GHS09"],"V",["H222","H229","H315","H319","H410"] ],"60901":[ ["GHS02","GHS09"],"V",["H222","H229","H411"] ],"26510":[ ["GHS07"],"F",["H319"] ],"50343":[ [],"",["H412"] ],"27240":[ ["GHS07","GHS09"],"F",["H317","H319","H410"] ],"30079":[ ["GHS05"],"V",["H318"] ],"26709":[ ["GHS05"],"V",["H318"] ],"17997":[ ["GHS07"],"F",["H317","EUH208:geraniol, (R)-p-menta-1,8-dién"] ],"27275":[ ["GHS09"],"F",["H410"] ],"27276":[ ["GHS09"],"F",["H410"] ]};
var ALAP = "https://cdn.jsdelivr.net/gh/bi-bor/unas-bi-bor-script@3e26882fc937cbb57bd90f39dc49d1483a7ec5a3/ghs/";

var magyar = (document.documentElement.lang || 'hu').slice(0, 2) === 'hu';
var JEL = magyar ? { V: 'Veszély', F: 'Figyelem' } : { V: 'Danger', F: 'Warning' };
var PIKT = magyar
? { GHS02: 'Tűzveszélyes', GHS03: 'Oxidáló', GHS05: 'Maró', GHS06: 'Mérgező', GHS07: 'Ártalmas, irritáló', GHS08: 'Egészségkárosító', GHS09: 'Környezetre veszélyes' }
: { GHS02: 'Flammable', GHS03: 'Oxidising', GHS05: 'Corrosive', GHS06: 'Toxic', GHS07: 'Harmful, irritant', GHS08: 'Health hazard', GHS09: 'Hazardous to the environment' };
var H = magyar ? {
H225: 'Fokozottan tűzveszélyes folyadék és gőz.', H226: 'Tűzveszélyes folyadék és gőz.', H228: 'Tűzveszélyes szilárd anyag.',
H242: 'Hő hatására tüzet okozhat.', H272: 'Fokozhatja a tűz intenzitását; oxidáló hatású.', H290: 'Fémekre korrozív hatású lehet.',
H301: 'Lenyelve mérgező.', H302: 'Lenyelve ártalmas.', H312: 'Bőrrel érintkezve ártalmas.', H314: 'Súlyos égési sérülést és szemkárosodást okoz.',
H315: 'Bőrirritáló hatású.', H317: 'Allergiás bőrreakciót válthat ki.', H318: 'Súlyos szemkárosodást okoz.', H319: 'Súlyos szemirritációt okoz.',
H331: 'Belélegezve mérgező.', H332: 'Belélegezve ártalmas.', H334: 'Belélegezve allergiás és asztmás tüneteket, illetve nehézlégzést okozhat.',
H335: 'Légúti irritációt okozhat.', H336: 'Álmosságot vagy szédülést okozhat.', H361d: 'Feltehetően károsítja a születendő gyermeket.',
H400: 'Nagyon mérgező a vízi élővilágra.', H410: 'Nagyon mérgező a vízi élővilágra, hosszan tartó károsodást okoz.',
H411: 'Mérgező a vízi élővilágra, hosszan tartó károsodást okoz.', H412: 'Ártalmas a vízi élővilágra, hosszan tartó károsodást okoz.',
EUH031: 'Savval érintkezve mérgező gázok képződnek.', EUH032: 'Savval érintkezve nagyon mérgező gázok képződnek.',
EUH206: 'Figyelem! Más termékekkel nem használható együtt. Veszélyes gázok (klór) szabadulhatnak fel.',
EUH208: 'Allergiás reakciót válthat ki.',
EUH401: 'Az emberi egészség és a környezet veszélyeztetésének elkerülése érdekében tartsa be a használati utasítást.',
H222: 'Rendkívül tűzveszélyes aeroszol.', H229: 'Nyomás alatt lévő tartály: hő hatására megrepedhet.'
} : {
H225: 'Highly flammable liquid and vapour.', H226: 'Flammable liquid and vapour.', H228: 'Flammable solid.',
H242: 'Heating may cause a fire.', H272: 'May intensify fire; oxidiser.', H290: 'May be corrosive to metals.',
H301: 'Toxic if swallowed.', H302: 'Harmful if swallowed.', H312: 'Harmful in contact with skin.', H314: 'Causes severe skin burns and eye damage.',
H315: 'Causes skin irritation.', H317: 'May cause an allergic skin reaction.', H318: 'Causes serious eye damage.', H319: 'Causes serious eye irritation.',
H331: 'Toxic if inhaled.', H332: 'Harmful if inhaled.', H334: 'May cause allergy or asthma symptoms or breathing difficulties if inhaled.',
H335: 'May cause respiratory irritation.', H336: 'May cause drowsiness or dizziness.', H361d: 'Suspected of damaging the unborn child.',
H400: 'Very toxic to aquatic life.', H410: 'Very toxic to aquatic life with long lasting effects.',
H411: 'Toxic to aquatic life with long lasting effects.', H412: 'Harmful to aquatic life with long lasting effects.',
EUH031: 'Contact with acids liberates toxic gas.', EUH032: 'Contact with acids liberates very toxic gas.',
EUH206: 'Warning! Do not use together with other products. May release dangerous gases (chlorine).',
EUH208: 'May produce an allergic reaction.',
EUH401: 'To avoid risks to human health and the environment, comply with the instructions for use.',
H222: 'Extremely flammable aerosol.', H229: 'Pressurised container: May burst if heated.'
};

function indul() {
var sku = document.querySelector('.artdet__sku-value');
var adat = sku && TERMEKEK[sku.textContent.trim()];
if (!adat || document.querySelector('.bb-veszely')) return !!adat;
var hely = document.querySelector('.bb-a-biocid') || document.querySelector('#artdet__short-descrition')
|| document.querySelector('.artdet__short-descripton') || document.querySelector('.artdet__name');
if (!hely) return false;

if (!document.getElementById('bb-veszely-stilus')) {
var st = document.createElement('style');
st.id = 'bb-veszely-stilus';
st.textContent = ".bb-veszely{margin: 10px 0 0;padding: 8px 12px;border: 1px solid #e6c9c9;border-radius: 8px;background: #fff;color: #2b2620;font-size: 13px;line-height: 1.45}.bb-veszely__fej{display: flex;align-items: center;gap: 6px;margin-bottom: 4px}.bb-veszely__fej img{width: 34px;height: 34px;flex: 0 0 auto}.bb-veszely__fej strong{margin-left: 4px;color: #b71c1c;font-size: 14px;letter-spacing: .02em}.bb-veszely__h{color: #3d3730}.bb-veszely__m{margin-top: 4px;color: #6b4a00;font-weight: 600}";
document.head.appendChild(st);
}
var doboz = document.createElement('div');
doboz.className = 'bb-veszely';
doboz.setAttribute('role', 'note');
var fej = document.createElement('div');
fej.className = 'bb-veszely__fej';
adat[0].forEach(function (p) {
var k = document.createElement('img');
k.src = ALAP + p + '.svg';
k.alt = PIKT[p] || p;
k.title = PIKT[p] || p;
k.width = k.height = 34;
fej.appendChild(k);
});
if (JEL[ adat[1] ]) {
var jel = document.createElement('strong');
jel.textContent = JEL[ adat[1] ];
fej.appendChild(jel);
}
doboz.appendChild(fej);
var mondatok = document.createElement('div');
mondatok.className = 'bb-veszely__h';
mondatok.textContent = adat[2].map(function (h) {
var r = h.split(':'), kod = r[0], anyag = r.slice(1).join(':');
var szoveg = H[kod] || '';
if (anyag) szoveg = (magyar ? 'Tartalmaz: ' : 'Contains: ') + anyag + '. ' + szoveg;
return szoveg ? kod + ' ' + szoveg : kod;
}).join(' ');
doboz.appendChild(mondatok);
if (adat[3]) {
var megj = document.createElement('div');
megj.className = 'bb-veszely__m';
megj.textContent = magyar ? adat[3].hu : (adat[3].en || adat[3].hu);
doboz.appendChild(megj);
}
hely.parentNode.insertBefore(doboz, hely.nextSibling);
return true;
}

var proba = 0;
(function fut() {
var sku = document.querySelector('.artdet__sku-value');
if (sku && !TERMEKEK[sku.textContent.trim()]) return;
if (indul() && document.querySelector('.bb-veszely')) return;
if (++proba < 20) setTimeout(fut, 250);
})();
})();
