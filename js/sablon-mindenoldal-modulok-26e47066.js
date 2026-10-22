/* Idegen scriptek a sablonban — a burkoló (sablon-alap ág, TERMEKOLDAL.md › „Termékoldali scriptek a sablonban”,
   MINDENOLDAL.md). A csomagol.sh minden modul-csomag (minden oldali, adatlap, lista, pénztár) elejére teszi, utána a
   sablon/idegen/ fájljait VÁLTOZATLANUL, egyenként így burkolva:  window.bbIdegen('<név>', function () { …a fájl… });
   • Ha a régi UNAS Script még a lapon van (<script src="…/js/<név>-<ujjlenyomat>.js">, a fejrészben), a
     sablonbeli másolat NEM fut — az átmeneti együttfutásnál így semmi sem jelenik meg kétszer, és mindegy,
     melyik töltődik be előbb. A régi script kikapcsolása után a következő oldalbetöltéstől a sablonbeli fut.
     Az ellenőrzés a futás pillanatában van (addigra az egész lap beolvasva), így a csomag a lap elején is állhat.
   • Ugyanakkor fut, mint eddig a „defer” script: az oldal felépítése után (DOMContentLoaded-kor, a fejrész
     többi defer scriptje után; ha a csomag maga defer, rögtön) — így a body_end blokk adatai (pl. a
     BB_SZALL_TILT) is megvannak, és a modulok sorrendje az élővel azonos.
   • Ha a modul maga is a DOMContentLoaded-re iratkozik fel (pl. a nyelvválasztó: feltétel nélkül), de a
     beágyazott csomag miatt már az esemény közben fut, a feliratkozás elveszne (a futó eseményhez utólag
     hozzáadott figyelő nem hívódik meg) — ilyenkor a modul lefutása után rögtön meghívjuk. Defer csomagnál
     (az esemény előtt) nem nyúlunk hozzá.
   • Egy modul hibája nem állítja meg a többit (külön scriptként sem állította): a konzolba írjuk.
   Tilos a tartalomban: dupla kapcsos és dupla szögletes nyitó, kettőskereszt a nyitó kapcsos után. */
if (!window.bbIdegen) (function () {
  var dclVolt = document.readyState === 'complete';
  document.addEventListener('DOMContentLoaded', function () { dclVolt = true; });
  window.bbIdegen = function (nev, kod) {
    function regiAlapon() {
      try { return !!document.querySelector('script[src*="/js/' + nev + '-"]'); } catch (e) { return false; /* régi böngésző: futunk */ }
    }
    function fut() {
      if (regiAlapon()) return;
      var kesobb = [], celok = dclVolt ? [document, window] : [], eredeti = [], sajat = [];
      celok.forEach(function (c, i) {
        eredeti[i] = c.addEventListener;
        sajat[i] = Object.prototype.hasOwnProperty.call(c, 'addEventListener');
        c.addEventListener = function (tipus, fn) {
          if (tipus === 'DOMContentLoaded' && fn) { kesobb.push([c, fn]); return; }
          return eredeti[i].apply(this, arguments);
        };
      });
      try { kod.call(window); } catch (e) { if (window.console) console.error('[sablon] ' + nev + ':', e); }
      finally {
        celok.forEach(function (c, i) {
          try { if (sajat[i]) c.addEventListener = eredeti[i]; else delete c.addEventListener; } catch (e) { /* nem írható */ }
        });
      }
      kesobb.forEach(function (p) {
        try { if (typeof p[1] === 'function') p[1].call(p[0], new Event('DOMContentLoaded')); else if (p[1].handleEvent) p[1].handleEvent(new Event('DOMContentLoaded')); }
        catch (e) { if (window.console) console.error('[sablon] ' + nev + ':', e); }
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fut);
    else fut();
  };
})();

/* ── nyelvvalaszto-156b8d20.js (sablon/idegen/, a régi UNAS Script fájlja változatlanul) ── */
window.bbIdegen('nyelvvalaszto', function () {
document.addEventListener('DOMContentLoaded', function () {
  // Rejtsük el az eredeti UNAS selecteket
  ['#box_lang_select_desktop', '#box_lang_select_mobile'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(
      'style',
      'position:absolute!important;left:-9999px!important;top:auto!important;opacity:0!important;width:0;height:0;margin:0;padding:0;pointer-events:none!important;display:none!important;'
    );
  });

  // Ha nincs nyelvválasztó, nem csinál semmit
  const native = document.querySelector('#box_lang_select_desktop');
  if (!native) return;

  // === Konfiguráció ===
  const displayName = {
    hu: "Magyar",
    en: "English",
    hr: "Hrvatski",
    ro: "Română",
    de: "Deutsch",
  };

  // Zászló URL hozzárendelés
  const flag = (code) => {
    const c = code.toLowerCase();
    if (c === 'en') return 'https://flagcdn.com/w20/gb.png'; // brit zászló az angolhoz
    return `https://flagcdn.com/w20/${c}.png`;
  };

  // Aktuális nyelv felismerése (html lang vagy URL alapján)
  const detectLang = () => {
    const al = (document.documentElement.lang || '').toLowerCase().slice(0,2);
    if (['hu','en','hr','ro','de'].includes(al)) return al;
    const m = location.pathname.toLowerCase().match(/\/(hu|en|hr|ro|de)(\/|$)/);
    return m ? m[1] : 'hu';
  };
  const currentLang = detectLang();

  // Opciók a natív selectből
  const options = [...native.querySelectorAll('option')].filter(o => o.value);
  if (!options.length) return;

  // Hova rakjuk
  const mountPoint = native.closest('.lang-select-group, .lang-and-money__wrapper') || native.parentNode;

  // Wrapper létrehozása
  const wrap = document.createElement('div');
  wrap.className = 'lang-dropdown';
  mountPoint.insertBefore(wrap, native);

  // Aktuális opció beállítása
  const currentOpt =
    options.find(o => o.value.toLowerCase().includes(`/${currentLang}/`)) ||
    options[0];

  const getCode = (opt) => {
    const url = (opt.value || '').toLowerCase();
    const byUrl = (url.match(/\/(hu|en|hr|ro|de)(\/|$)/) || [])[1];
    if (byUrl) return byUrl;
    const t = (opt.textContent || '').trim().toLowerCase();
    if (t.startsWith('magyar') || t.startsWith('hu')) return 'hu';
    if (t.startsWith('english') || t.startsWith('en')) return 'en';
    if (t.startsWith('hrv') || t.startsWith('hr')) return 'hr';
    if (t.startsWith('rom') || t.startsWith('ro')) return 'ro';
    return 'en';
  };

  // === Fejléc ===
  const header = document.createElement('div');
  header.className = 'lang-current';
  const currentCode = getCode(currentOpt);
  header.innerHTML = `<img src="${flag(currentCode)}" alt="${currentCode.toUpperCase()}"><span>${currentCode.toUpperCase()}</span>`;
  wrap.appendChild(header);

  // === Lista ===
  const ul = document.createElement('ul');
  ul.className = 'lang-options';
  options.forEach(opt => {
    const code = getCode(opt);
    const name = displayName[code] || (opt.textContent || code.toUpperCase()).trim();
    const li = document.createElement('li');
    li.dataset.value = opt.value;
    if (opt === currentOpt) li.setAttribute('aria-current','true');
    li.innerHTML = `<img src="${flag(code)}" alt="${code.toUpperCase()}"><span>${name}</span>`;
    ul.appendChild(li);
  });
  wrap.appendChild(ul);

  // === Működés ===
  const close = () => ul.classList.remove('show');
  header.addEventListener('click', () => ul.classList.toggle('show'));
  ul.addEventListener('click', e => {
    const li = e.target.closest('li'); if (!li) return;
    ul.querySelectorAll('li[aria-current="true"]').forEach(x => x.removeAttribute('aria-current'));
    li.setAttribute('aria-current','true');
    const img = li.querySelector('img').src;
    const codeTxt = (li.querySelector('img').alt || 'EN').toUpperCase();
    header.innerHTML = `<img src="${img}" alt="${codeTxt}"><span>${codeTxt}</span>`;
    window.location.href = li.dataset.value;
  });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  window.addEventListener('scroll', close, { passive: true });
});

});

/* ── raktar-kezeles-d661bb3f.js (sablon/idegen/, a régi UNAS Script fájlja változatlanul) ── */
window.bbIdegen('raktar-kezeles', function () {
(function () {
  "use strict";

  // 16–30 napos beszerzés (csak akkor érvényes, ha NEM raktáron van)
  var LONG_LEAD_SKUS = [
    "31064",
  "31052",
  "31053",
  "31054",
  "31055",
  "31056",
  "31048",
  "31057",
  "31058",
  "31059",
  "31049",
  "31061",
  "31050",
  "31062",
  "31051",
  "31063",
  "50171",
  "26549",
  "31966",
  "33800",
  "33357",
  "17171",
  "21556",
  "30125",
  "29185",
  "01190",
  "20759",
  "30469",
  "20760",
  "31128",
  "20757",
  "31129",
  "31130",
  "20758",
  "31131",
  "30470",
  "28421",
  "28003",
  "31148",
  "31149",
  "31150",
  "31147",
  "30426",
  "29719",
  "30428",
  "30429",
  "30430",
  "30422",
  "30431",
  "30423",
  "30424",
  "30425",
  "28397",
  "31462",
  "33395",
  "31454",
  "31453",
  "33390",
  "33391",
  "31461",
  "31460",
  "31459",
  "33399",
  "31458",
  "31457",
  "31456",
  "31455",
  "31152",
  "31153",
  "31154",
  "31157",
  "31151",
  "25755",
  "25756",
  "27134",
  "25758",
  "27132",
  "25757",
  "32133",
  "32141",
  "32138",
  "32139",
  "32135",
  "27133",
  "32136",
  "32934",
  "32137",
  "29997",
  "15803",
  "21101",
  "18748",
  "21102",
  "15802",
  "21100",
  "19716",
  "31013",
  "31014",
  "31015",
  "31016",
  "50172",
  "50173",
  "31117",
  "31113",
  "31114",
  "31115",
  "31116",
  "31539",
  "31538",
  "20765",
  "20761",
  "20766",
  "20762",
  "20767",
  "20763",
  "20768",
  "20764",
  "31077",
  "31073",
  "31074",
  "31075",
  "31076",
  "31047",
  "31043",
  "31044",
  "31045",
  "31046",
  "20066",
  "32130",
  "04488",
  "32131",
  "32132",
  "32129",
  "31142",
  "31143",
  "31144",
  "31145",
  "31146",
  "31577",
  "31578",
  "31558",
  "31580",
  "31579",
  "31582",
  "31574",
  "31575",
  "31576",
  "31132",
  "31141",
  "31133",
  "31134",
  "31135",
  "31136",
  "31137",
  "31138",
  "31139",
  "31140",
  "28004",
  "31553",
  "31554",
  "27437",
  "62162",
  "62161",
  "62160",
  "62159",
  "62158",
  "62157",
  "62156",
  "62155",
  "31000",
  "31001",
  "31002",
  "31003",
  "31004",
  "31005",
  "31006",
  "31007",
  "62144",
  "20775",
  "20776",
  "20777",
  "31028",
  "31017",
  "31018",
  "24701",
  "31019",
  "31020",
  "31021",
  "31022",
  "31023",
  "31024",
  "31025",
  "31026",
  "31027",
  "30397",
  "30398",
  "30399",
  "30400",
  "30401",
  "30402",
  "30403",
  "30406",
  "30409",
  "30412",
  "30395",
  "30396",
  "30404",
  "30407",
  "30410",
  "30413",
  "30416",
  "36697",
  "30405",
  "30408",
  "30411",
  "30414",
  "30415",
  "30417",
  "30418",
  "30419",
  "30420",
  "30421",
  "28426",
  "22053",
  "27057",
  "31549",
  "31550",
  "31551",
  "31552",
  "62166",
  "62165",
  "62164",
  "62163",
  "31118",
  "31119",
  "31120",
  "31121",
  "31122",
  "31123",
  "31540",
  "21408",
  "31547",
  "31545",
  "31548",
  "31541",
  "31542",
  "31543",
  "31544",
  "25101",
  "31546",
  "31589",
  "29488",
  "16529",
  "04737",
  "17483",
  "30111",
  "30113",
  "30126",
  "30112",
  "30114",
  "30115",
  "26734",
  "24863",
  "22411",
  "26736",
  "33432",
  "31094",
  "31082",
  "31083",
  "31084",
  "31085",
  "31086",
  "31078",
  "31087",
  "31088",
  "31089",
  "31079",
  "31090",
  "31091",
  "31080",
  "31092",
  "31081",
  "31093",
  "31103",
  "31012",
  "31008",
  "31009",
  "31010",
  "31011",
  "35825",
  "35580",
  "35581",
  "22623",
  "35826",
  "35187",
  "35142",
  "35638",
  "22234",
  "22659",
  "22652",
  "22653",
  "22654",
  "35138",
  "35139",
  "35636",
  "22655",
  "51043",
  "30445",
  "29564",
  "22656",
  "22647",
  "22625",
  "22645",
  "22657",
  "22649",
  "22650",
  "22658",
  "22648",
  "51034",
  "22651",
  "22667",
  "02027",
  "25475",
  "27567",
  "22389",
  "27572",
  "22387",
  "15845",
  "02398",
  "15849",
  "04197",
  "04452",
  "21785",
  "04207",
  "22388",
  "22198",
  "03074",
  "25418",
  "04147",
  "21783",
  "04212",
  "21782",
  "02399",
  "04145",
  "04205",
  "15848",
  "21781",
  "24813",
  "24719",
  "29496",
  "29489",
  "29490",
  "31750",
  "04148",
  "35362",
  "32113",
  "34971",
  "18746",
  "04195",
  "16638",
  "16427",
  "21550",
  "16401",
  "29491",
  "29492",
  "29493",
  "29494",
  "21551",
  "22386",
  "19885",
  "21813",
  "27569",
  "19886",
  "27570",
  "24819",
  "29495",
  "30575",
  "19887",
  "24820",
  "27571",
  "04344",
  "35546",
  "33975",
  "35302",
  "61035",
  "20406",
  "35469",
  "16048",
  "33976",
  "25436",
  "26607",
  "62149",
  "62148",
  "62147",
  "62146",
  "62145",
  "31527",
  "31528",
  "31529",
  "22408",
  "31065",
  "31066",
  "31067",
  "31068",
  "31069",
  "31070",
  "31071",
  "31072",
  "31126",
  "31127",
  "31124",
  "31125",
  "20734",
  "20734_CS",
  "20953",
  "20133",
  "27457",
  "19444",
  "31481",
  "18836",
  "21541",
  "19246",
  "21148",
  "20842",
  "20952",
  "18786",
  "21114",
  "17596",
  "20519",
  "19679",
  "17576",
  "17626",
  "22113",
  "18365",
  "22114",
  "19677",
  "17075",
  "19312",
  "25379",
  "25397",
  "25377",
  "35685",
  "28830",
  "21039",
  "19755",
  "27524",
  "25380",
  "25378",
  "31105",
  "31106",
  "31107",
  "31108",
  "31109",
  "31110",
  "31111",
  "31112",
  "28791",
  "26784",
  "62142",
  "62140",
  "22052",
  "27056",
  "22409",
  "28413",
  "28425",
  "22405",
  "26785",
  "62143",
  "62141",
  "62139",
  "25437",
  "19164",
  "19390",
  "16201",
  "16200",
  "30710",
  "30711",
  "28417",
  "30709",
  "35409",
  "19670",
  "19152",
  "19153",
  "28883",
  "16200_1",
  "28415",
  "31033",
  "24638",
  "31034",
  "31035",
  "31036",
  "31029",
  "31037",
  "31030",
  "31031",
  "31032",
  "31505",
  "31500",
  "31506",
  "31501",
  "31507",
  "31502",
  "31508",
  "31503",
  "31509",
  "31504",
  "31514",
  "31510",
  "31515",
  "31511",
  "31516",
  "31512",
  "31517",
  "31513",
  "31520",
  "31518",
  "31519",
  "61933",
  "27147",
  "31535",
  "31536",
  "31537",
  "29621",
  "29624",
  "29625",
  "29626",
  "29627",
  "29629",
  "35599",
  "35600",
  "35601",
  "35602",
  "35603",
  "22936",
  "35604",
  "29430_1",
  "15648_1",
  "20378",
  "31444",
  "18419_1",
  "18904_1",
  "15649_1",
  "25889",
  "33087",
  "20752_1",
  "17107_1",
  "32080",
  "15650_1",
  "17108_1",
  "16555_1",
  "02450_1",
  "17111_1",
  "16556_1",
  "17113_1",
  "17105_1",
  "16554_1",
  "33088",
  "17106_1",
  "16557_1",
  "17109_1",
  "17112_1",
  "17114_1",
  "33142",
  "17116_1",
  "19819_1",
  "16558_1",
  "17110_1",
  "20753_1",
  "17115_1",
  "17117_1",
  "20754",
  "20755",
  "30393",
  "20756",
  "30394",
  "31526",
  "27211",
  "25111",
  "31521",
  "31522",
  "31524",
  "28418",
  "28419",
  "31099",
  "31100",
  "31101",
  "31102",
  "31095",
  "31104",
  "31096",
  "31097",
  "31098",
  "31038",
  "24639",
  "30341",
  "30342",
  "31039",
  "31040",
  "31041",
  "31042",
  "27671_1",
  "19946",
  "22890",
  "22891",
  "27671",
  "22889",
  "22735",
  "19945",
  "27670",
  "22888",
  "30343",
  "21971",
  "26789",
  "31530",
  "31531",
  "31532",
  "27438",
  "31533",
  "30556"
  ];

  var MSG_DEFAULT = "A termék beszerzése 7–9 munkanapot vesz igénybe, majd ezt követően feladásra kerül.";
  var MSG_LONG    = "A termék várható beérkezéséről kérjük, érdeklődjön ügyfélszolgálatunknál telefonon vagy üzenetben.";

  var OBS = null;
  var scheduled = false;

  function norm(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  function getSku() {
    var el = document.querySelector(".artdet__sku");
    if (el) {
      var m = norm(el.textContent).match(/\b\d{4,}\b/);
      if (m) return m[0];
    }
    var bodyText = norm(document.body && document.body.innerText ? document.body.innerText : "");
    var m2 = bodyText.match(/Cikksz[aá]m\s*:\s*(\d{4,})/i);
    return (m2 && m2[1]) ? m2[1] : null;
  }

  function statusFromBoxText(t) {
    // pozitív
    if (t.includes("Raktáron") || t.includes("Készleten")) return "IN_STOCK";

    // negatív / beszerzéses
    if (t.includes("Nincs raktáron") || t.includes("Elfogyott")) return "OUT_OF_STOCK";
    if (t.includes("Rendelhető")) return "ORDERABLE";

    return "UNKNOWN";
  }

  function setWarehouseMessage(box, title, message) {
    // Ne írjuk újra végtelenül ugyanazt
    var signature = title + "||" + message;
    if (box.getAttribute("data-bibor-warehouse") === signature) return;

    box.setAttribute("data-bibor-warehouse", signature);

    // Observer loop ellen: ideiglenesen szüneteltetjük a figyelést a saját írásunk alatt
    if (OBS) OBS.disconnect();

    box.innerHTML =
      '<div style="font-size:14px; line-height:1.4;">' +
        '<strong>' + title + '</strong><br /><br />' +
        message +
      '</div>';

    // Figyelés visszakapcsolása
    startObserver();
  }

  function run() {
    var box = document.querySelector(".artdet__warehouse");
    if (!box) return;

    var text = norm(box.innerText);
    var status = statusFromBoxText(text);

    if (status === "IN_STOCK" || status === "UNKNOWN") return;

    var sku = getSku();
    var isLong = sku && LONG_LEAD_SKUS.indexOf(String(sku)) !== -1;

    var title = (status === "ORDERABLE") ? "Rendelhető" : "Rendelhető!";
    var msg = isLong ? MSG_LONG : MSG_DEFAULT;

    setWarehouseMessage(box, title, msg);
  }

  function scheduleRun() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      run();
    });
  }

  function startObserver() {
    if (!document.body) return;

    if (!OBS) {
      OBS = new MutationObserver(function () {
        // Nem azonnal futtatunk minden egyes mutációra -> throttling
        scheduleRun();
      });
    }

    // Ha már figyel, ne indítsuk újra
    try {
      OBS.observe(document.body, { childList: true, subtree: true });
    } catch (e) {
      // fallback, ha valamiért a body nem figyelhető
      // (ritka)
    }
  }

  function init() {
    run();
    startObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


});

/* ── kifuto-termekek-42bd4ce5.js (sablon/idegen/, a régi UNAS Script fájlja változatlanul) ── */
window.bbIdegen('kifuto-termekek', function () {
(function () {
  "use strict";

  // ???? Kifutó matrica ID (UNAS)
  var KIFUTO_STICKER_ID = "35366";

  // Üzenet kifutó + elfogyott esetén
  var MSG_DISCONTINUED =
    "Kifutott termék – a termék beérkezéséről kérjük, érdeklődjön ügyfélszolgálatunknál.";

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

});

/* ── utolso-darabok-script-043889d1.js (sablon/idegen/, a régi UNAS Script fájlja változatlanul) ── */
window.bbIdegen('utolso-darabok-script', function () {
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
});

/* ── Legutóbb nézett termékek (sablon/uj/legutobb.js + legutobb.css; eddig a #177011 UNAS Script) ── */
window.bbIdegen('legutobb-nezett-termekek', function () {
(function () {
var MINDENKI = true; /* a sablonban mindenkinek; ?legutobb=0 egy böngészőben kikapcsolja */
var KULCS = 'bbLegutobb';
var allapot = null;
try {
var m = location.search.match(/[?&]legutobb=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { return; /* tiltott tárhely: lista sincs */ }
if (allapot === '0' || (!allapot && !MINDENKI)) return;

var gyoker = document.documentElement;
gyoker.classList.add('bb-lnz');
gyoker.setAttribute('data-bb-legutobb', 'sablon');
var stilus = document.createElement('style');
stilus.id = 'bb-legutobb';
stilus.textContent = "html.bb-lnz .bb-lnz-gomb[hidden]{display: none !important}html.bb-lnz .bb-lnz-gomb{display: inline-flex;flex-direction: column;align-items: center;justify-content: center;gap: 2px;min-width: 44px;min-height: 40px;padding: 0 8px;margin: 0;border: 0;background: transparent;color: inherit;font: inherit;font-size: 12px;line-height: 1.2;cursor: pointer;box-shadow: none}html.bb-lnz .bb-lnz-ikon{position: relative;display: inline-flex;align-items: center;justify-content: center;width: 34px;height: 34px;border-radius: 50%;border: 1.5px solid #9fcf8a;background: #eaf3e6;color: #1f6a0c}html.bb-lnz .bb-lnz-ikon svg{width: 18px;height: 18px}html.bb-lnz .bb-lnz-gomb:hover .bb-lnz-ikon,html.bb-lnz .bb-lnz-gomb[aria-expanded=\"true\"] .bb-lnz-ikon{border-color: #2a8511;background: #dcedd4}html.bb-lnz .bb-lnz-gomb:focus-visible{outline: 2px solid #2a8511;outline-offset: 2px;border-radius: 10px}html.bb-lnz .bb-lnz-db{position: absolute;top: -5px;right: -7px;min-width: 18px;height: 18px;padding: 0 4px;box-sizing: border-box;border-radius: 9px;border: 2px solid #fff;background: #2a8511;color: #fff;font-size: 10px;font-weight: 800;line-height: 14px;text-align: center}html.bb-lnz .bb-lnz-felirat{white-space: nowrap}html.bb-lnz .bb-lnz-gomb-m{order: 1;flex: 0 0 34px;width: 34px;min-width: 34px;padding: 0;margin: 0 2px 0 4px}html.bb-lnz :has(\u003E.bb-lnz-gomb-m)\u003E.bb-mlogo{order: 0}html.bb-lnz :has(\u003E.bb-lnz-gomb-m)\u003E#profile__dropdown-btn{order: 2}html.bb-lnz :has(\u003E.bb-lnz-gomb-m)\u003E.cart-box__dropdown-btn{order: 3}html.bb-lnz .bb-lnz-gomb-m .bb-lnz-ikon{width: 34px;height: 34px;border: 0;background: transparent;color: #1f2a1f}html.bb-lnz .bb-lnz-gomb-m .bb-lnz-ikon svg{width: 24px;height: 24px}html.bb-lnz .bb-lnz-gomb-m:hover .bb-lnz-ikon,html.bb-lnz .bb-lnz-gomb-m[aria-expanded=\"true\"] .bb-lnz-ikon{background: #eaf3e6}html.bb-lnz .bb-lnz-gomb-m .bb-lnz-db{top: -2px;right: -4px}html.bb-lnz :has(\u003E.bb-lnz-gomb-m:not([hidden]))\u003E.bb-mlogo{flex: 0 1 auto;min-width: 0}html.bb-lnz :has(\u003E.bb-lnz-gomb-m:not([hidden]))\u003E.bb-mlogo img{max-width: 100%;height: auto}html.bb-lnz :has(\u003E.bb-lnz-gomb-m:not([hidden]))\u003E.cart-box__dropdown-btn{margin-left: 6px !important}.bb-lnz-panel[hidden],.bb-lnz-hatter[hidden]{display: none !important}.bb-lnz-panel{position: fixed;z-index: 100050;width: 420px;max-width: calc(100vw - 24px);box-sizing: border-box;display: flex;flex-direction: column;max-height: min(560px,calc(100vh - 140px));background: #fff;border: 1px solid #ece6dc;border-radius: 14px;box-shadow: 0 12px 40px rgba(20,18,16,.16);color: #221f1b;font-size: 14px;text-align: left}.bb-lnz-csucs{position: absolute;top: -7px;left: var(--bb-lnz-csucs,200px);width: 12px;height: 12px;background: #fff;border-left: 1px solid #ece6dc;border-top: 1px solid #ece6dc;transform: rotate(45deg)}.bb-lnz-fogo{display: none}.bb-lnz-fej{display: flex;align-items: center;gap: 4px;padding: 10px 10px 8px 18px}.bb-lnz-cim{flex: 1;margin: 0 !important;font-size: 17px !important;font-weight: 800 !important;line-height: 1.3;color: #221f1b;text-transform: none;letter-spacing: 0}.bb-lnz-torol{min-height: 40px;padding: 0 8px;border: 0;background: none;color: #6b645a;font: inherit;font-size: 13px;font-weight: 600;text-decoration: underline;text-underline-offset: 2px;cursor: pointer}.bb-lnz-torol[hidden]{display: none}.bb-lnz-torol:hover{color: #221f1b}.bb-lnz-bezar{display: inline-flex;align-items: center;justify-content: center;width: 40px;height: 40px;padding: 0;border: 0;border-radius: 50%;background: #f4f1ec;color: #221f1b;cursor: pointer}.bb-lnz-bezar:hover{background: #ece6dc}.bb-lnz-lista{list-style: none;margin: 0;padding: 0 0 6px;overflow-y: auto;overscroll-behavior: contain}.bb-lnz-sor{display: flex;align-items: center;gap: 12px;padding: 10px 14px 10px 18px;border-top: 1px solid #f2eee8}.bb-lnz-kep{flex: 0 0 56px;width: 56px;height: 56px;border-radius: 10px;overflow: hidden;background: #f4f1ec;display: flex;align-items: center;justify-content: center}.bb-lnz-kep img{width: 100%;height: 100%;object-fit: contain;background: #fff}.bb-lnz-adat{flex: 1;min-width: 0;display: flex;flex-direction: column;gap: 3px}.bb-lnz-panel a.bb-lnz-nev{color: #221f1b !important;font-weight: 700;font-size: 14px;line-height: 1.3;text-decoration: none;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden}.bb-lnz-panel a.bb-lnz-nev:hover{color: #1f6a0c !important;text-decoration: underline}.bb-lnz-sor2{display: flex;align-items: center;flex-wrap: wrap;gap: 4px 10px;font-size: 13px}.bb-lnz-ar{font-weight: 800;white-space: nowrap}.bb-lnz-raktar{display: inline-flex;align-items: center;gap: 5px;color: #6b645a;white-space: nowrap}.bb-lnz-raktar::before{content: \"\";width: 7px;height: 7px;border-radius: 50%;background: #2a8511}.bb-lnz-r-o::before{background: #d08a00}.bb-lnz-r-n::before{background: #a9a196}.bb-lnz-putt{flex: 0 0 40px;display: inline-flex;align-items: center;justify-content: center;width: 40px;height: 40px;padding: 0;border: 0;border-radius: 10px;background: #2a8511;color: #fff !important;cursor: pointer;box-shadow: 0 2px 6px rgba(42,133,17,.18);text-decoration: none !important}.bb-lnz-putt:hover{background: #1f6a0c}.bb-lnz-megnez{background: #eaf3e6;color: #1f6a0c !important;border: 1.5px solid #9fcf8a;box-shadow: none;box-sizing: border-box}.bb-lnz-megnez:hover{background: #dcedd4}.bb-lnz-ures{padding: 18px;color: #6b645a;border-top: 1px solid #f2eee8}.bb-lnz-panel :is(button,a):focus-visible{outline: 2px solid #2a8511;outline-offset: 2px}.bb-lnz-hatter{position: fixed;inset: 0;z-index: 100049;background: rgba(28,26,23,.45)}html.bb-lnz-nyitva,html.bb-lnz-nyitva body{overflow: hidden !important}html.bb-lnz-nyitva molin-shop-ai{display: none !important}.bb-lnz-panel.bb-lnz-lap{top: auto !important;left: 0 !important;right: 0;bottom: 0;width: 100%;max-width: none;max-height: 82vh;border-radius: 20px 20px 0 0;border: 0;box-shadow: 0 -8px 30px rgba(20,18,16,.18);padding-bottom: env(safe-area-inset-bottom,0px);animation: bb-lnz-fel .22s ease-out}.bb-lnz-lap .bb-lnz-csucs{display: none}.bb-lnz-lap .bb-lnz-fogo{display: block;width: 40px;height: 5px;margin: 10px auto 0;border-radius: 3px;background: #d8d2c7}.bb-lnz-lap .bb-lnz-fej{padding: 4px 12px 8px 16px}.bb-lnz-lap .bb-lnz-sor{padding: 10px 16px}.bb-lnz-lap .bb-lnz-kep{flex-basis: 60px;width: 60px;height: 60px}.bb-lnz-lap .bb-lnz-putt{flex-basis: 44px;width: 44px;height: 44px}@keyframes bb-lnz-fel{from{transform: translateY(40px);opacity: .4}to{transform: none;opacity: 1}}@media (prefers-reduced-motion: reduce){.bb-lnz-panel.bb-lnz-lap{animation: none}}html.bb-lnz .artdet__img-data-left{position: relative}.bb-lnz-oszt{position: absolute;top: 116px;right: 12px;z-index: 5;display: flex;align-items: center;justify-content: center;width: 44px;height: 44px;margin: 0;padding: 0;border: 1px solid #2a8511;border-radius: 50%;background: #fff;color: #1f6a0c;cursor: pointer;box-shadow: 0 2px 8px rgba(34,31,27,.06)}.bb-lnz-oszt:hover,.bb-lnz-oszt[aria-expanded=\"true\"]{background: #eaf3e6}.bb-lnz-oszt:focus-visible{outline: 2px solid #2a8511;outline-offset: 2px}.artdet__img-data-left:has(.bb-a-3d-gomb) .bb-lnz-oszt{top: 168px}.bb-lnz-oszt-menu{position: absolute;top: 116px;right: 66px;z-index: 30;width: 230px;box-sizing: border-box;padding: 8px;display: flex;flex-direction: column;gap: 2px;background: #fff;border: 1px solid #ece6dc;border-radius: 14px;box-shadow: 0 12px 40px rgba(20,18,16,.16)}.artdet__img-data-left:has(.bb-a-3d-gomb) .bb-lnz-oszt-menu{top: 168px}.bb-lnz-oszt-menu[hidden]{display: none}.bb-lnz-oszt-cim{padding: 6px 10px 4px;color: #6b645a;font-size: 12px;font-weight: 800;text-transform: uppercase;letter-spacing: .4px}.bb-lnz-oszt-menu\u003E:is(button,a){display: flex;align-items: center;gap: 12px;min-height: 44px;padding: 0 10px;margin: 0;border: 0;border-radius: 10px;background: transparent;color: #221f1b !important;font: inherit;font-size: 15px;font-weight: 600;text-align: left;text-decoration: none !important;cursor: pointer}.bb-lnz-oszt-menu\u003E:is(button,a):hover{background: #f4f1ec}.bb-lnz-oszt-menu\u003E.kesz,.bb-lnz-oszt-menu\u003E.kesz:hover{background: #eaf3e6;color: #1f6a0c !important;font-weight: 700}.bb-lnz-oszt-menu\u003E:is(button,a):focus-visible{outline: 2px solid #2a8511;outline-offset: -2px}.bb-lnz-ertesito{position: fixed;left: 16px;right: 16px;bottom: calc(env(safe-area-inset-bottom,0px) + 96px);z-index: 100060;display: flex;align-items: center;gap: 10px;padding: 12px 14px;border-radius: 12px;background: #221f1b;color: #fff;font-size: 14px;font-weight: 700;box-shadow: 0 8px 24px rgba(20,18,16,.25);opacity: 0;transform: translateY(10px);pointer-events: none;transition: opacity .2s,transform .2s}.bb-lnz-ertesito svg{color: #9fcf8a;flex: 0 0 auto}.bb-lnz-ertesito.lathato{opacity: 1;transform: none}@media (min-width: 576px){.bb-lnz-ertesito{left: auto;right: 24px;top: 140px;bottom: auto;max-width: 380px;transform: translateY(-10px)}}@media (min-width: 768px){html.bb-lnz .back_to_top{right: 20px !important;bottom: 92px !important;left: auto !important;top: auto !important;width: 48px !important;height: 48px !important;min-width: 0 !important;padding: 0 !important;display: inline-flex !important;align-items: center;justify-content: center;border: 1.5px solid #9fcf8a !important;border-radius: 50% !important;background: #fff !important;box-shadow: 0 4px 14px rgba(20,18,16,.12) !important}html.bb-lnz .back_to_top:hover{border-color: #2a8511 !important;background: #eaf3e6 !important}html.bb-lnz .back_to_top::before{content: \"\" !important;display: block !important;width: 20px !important;height: 20px !important;margin: 0 !important;font-size: 0 !important;background: #1f6a0c !important;-webkit-mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 19V5M5 12l7-7 7 7'/%3E%3C/svg%3E\") center / contain no-repeat;mask: url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 19V5M5 12l7-7 7 7'/%3E%3C/svg%3E\") center / contain no-repeat}html.bb-lnz .back_to_top::after{display: none !important}}html.bb-lnz :is(.product__price-unit,.product-price--unit-price,.artdet__price-unit){color: #6b645a !important}html.bb-lnz .product__prices:not(.has-price-sale) .product__price-base-value\u003Ebr{display: none}html.bb-lnz .product__prices:not(.has-price-sale) .product__price-base-value\u003Espan[style]{display: block;margin-top: 1px;line-height: 1.3}html.bb-lnz .product__price-unit-wrap{margin-top: 10px}html.bb-lnz .product__prices .product__price-sale{line-height: 1.15}html.bb-lnz .product__prices .product__price-sale\u003Ebr{display: none}html.bb-lnz .product__prices .product__price-sale\u003Espan[style]{display: block !important;margin-top: 1px !important;line-height: 1.3}html.bb-lnz :is(.has-price-sale,.has-sale) :is(.product__price-base-value,.artdet__price-base-value),html.bb-lnz .product-price--base .text-line-through{color: #6b645a !important}html.bb-lnz :is(.has-price-sale,.has-sale) :is(.product__price-base-value,.product-price--base,.artdet__price-base) :is(.price-gross,.price-currency),html.bb-lnz .artdet__price-base.has-sale :is(.price-gross,.price-currency){color: #6b645a !important}html.bb-lnz .badge--sale{background-color: #c62828 !important}html.bb-lnz .sticker[data-id=\"16884\"]{background-color: #5e7e3c !important}html.bb-lnz .sticker[data-id=\"35361\"]{background-color: #846d86 !important}html.bb-lnz .sticker[data-id=\"35366\"]{background-color: #577980 !important}html.bb-lnz .sticker[data-id=\"35371\"]{background-color: #9d6666 !important}html.bb-lnz .sticker[data-id=\"35376\"]{background-color: #b35c00 !important}html.bb-lnz .sticker[data-id=\"35381\"]{background-color: #956e22 !important}html.bb-lnz .sticker[data-id=\"35386\"]{background-color: #c62828 !important}html.bb-lnz .sticker[data-id=\"45836\"]{background-color: #8f7016 !important}html.bb-lnz .product__qty-buttons button,html.bb-lnz .artdet__qty-buttons button,html.bb-lnz .qtyplus_common,html.bb-lnz .qtyminus_common{min-width: 24px;min-height: 24px}";
(document.head || gyoker).appendChild(stilus);

var MAX = 12;
var nyelv = (gyoker.lang || 'hu').slice(0, 2);
var magyar = nyelv === 'hu';
var LISTA = 'bbLegutobbLista_' + nyelv;
var T = magyar
? { cim: 'Legutóbb nézett', torol: 'Lista törlése', bezar: 'Bezárás', putt: 'Puttonyba', megnez: 'Megnézem', ures: 'Még nem nézett meg terméket.', oszt: 'Megosztás', masol: 'Link másolása', masolva: 'Link másolva', email: 'E-mail', masolvaUz: 'Link másolva, bárhová beillesztheti', bekerult: 'A Puttonyba került: ' }
: { cim: 'Recently viewed', torol: 'Clear list', bezar: 'Close', putt: 'Add to cart', megnez: 'View', ures: 'No products viewed yet.', oszt: 'Share', masol: 'Copy link', masolva: 'Link copied', email: 'E-mail', masolvaUz: 'Link copied', bekerult: 'Added to cart: ' };

function $(s, gy) { return (gy || document).querySelector(s); }
function kisMobil() { return !!(window.matchMedia && window.matchMedia('(max-width: 575.98px)').matches); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function sajatUrl(u) { try { var x = new URL(u, location.href); return x.origin === location.origin ? x.href : ''; } catch (e) { return ''; } }
function utvonal(u) { try { return new URL(u, location.href).pathname; } catch (e) { return u; } }

function olvas() {
try { var l = JSON.parse(localStorage.getItem(LISTA) || '[]'); return Array.isArray(l) ? l : []; } catch (e) { return []; }
}
function ir(l) { try { localStorage.setItem(LISTA, JSON.stringify(l.slice(0, MAX))); } catch (e) { /* tele a tárhely */ } }

var IKON_ORA = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v4h4"/><path d="M12 7v5l3 2"/></svg>';
var IKON_X = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
var IKON_PUTT = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M12 11v6M9 14h6"/></svg>';
var IKON_NYIL = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
var IKON_OSZT = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/></svg>';
var IKON_LINK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>';
var IKON_PIPA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>';
var IKON_FB = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>';
var IKON_LEVEL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

function arLd() {
var ar = null;
[].some.call(document.querySelectorAll('script[type="application/ld+json"]'), function (s) {
try {
var d = JSON.parse(s.textContent);
var o = d && d['@type'] === 'Product' && d.offers;
if (o && o.price) { ar = { p: +o.price, c: o.priceCurrency || 'HUF' }; return true; }
} catch (e) { /* nem JSON */ }
return false;
});
return ar;
}
function arSzoveg(ar) {
if (!ar || !isFinite(ar.p)) return '';
try {
if (ar.c === 'HUF') return new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 }).format(ar.p) + ' Ft';
return new Intl.NumberFormat(gyoker.lang || 'hu', { style: 'currency', currency: ar.c }).format(ar.p);
} catch (e) { return ar.p + ' ' + ar.c; }
}
function megjegyez() {
var tartalom = document.getElementById('page_artdet_content');
if (!tartalom) return;
var nevEl = $('.artdet__name', tartalom);
var url = sajatUrl(($('link[rel="canonical"]') || {}).href || location.href.split(/[?#]/)[0]);
if (!nevEl || !url) return;
var kepEl = document.getElementById('main_image') || $('.artdet__img-inner img', tartalom);
var gomb = $('.artdet__cart-btn', tartalom);
var cikk = gomb && (gomb.getAttribute('data-cartadd') || gomb.getAttribute('onclick') || '').match(/cart_add\('([^']+)'/);
var db = cikk && document.getElementById('db_' + cikk[1]);
var raktar = $('.artdet__stock', tartalom);
var rSzoveg = raktar ? (($('.stock__qty-and-unit', raktar) || raktar).textContent || '').replace(/\s+/g, ' ').trim() : '';
var rm = rSzoveg.match(/^Több mint (.+?) (db|darab|pár|csomag|kg|l|m)? ?raktáron$/i);
if (rm) rSzoveg = rm[1] + '+ ' + (rm[2] ? rm[2] + ' ' : '') + 'raktáron';
var egyszeru = !!(cikk && db && (db.getAttribute('data-min') || '1') === '1' && (db.getAttribute('data-step') || '1') === '1' &&
!document.getElementById('artdet__type') && !document.querySelector('#page_artdet_content [id^="egyeb_list"], #page_artdet_content [name^="egyeb_list"], #page_artdet_content [id^="cust_input"]') &&
!(raktar && raktar.classList.contains('no-stock')));
var tetel = {
u: url,
n: nevEl.textContent.replace(/\s+/g, ' ').trim(),
k: sajatUrl(kepEl && (kepEl.currentSrc || kepEl.src) || ''),
a: arSzoveg(arLd()),
r: rSzoveg.slice(0, 40),
rs: raktar ? (raktar.classList.contains('no-stock') ? 'n' : raktar.classList.contains('to-order') ? 'o' : 'z') : '',
s: egyszeru ? cikk[1] : '',
t: Date.now()
};
var p = utvonal(url);
ir([tetel].concat(olvas().filter(function (x) { return x && utvonal(x.u) !== p; })));
}

var panel = null, hatter = null, nyitoGomb = null;
function lathatoLista() {
var p = utvonal(location.href);
return olvas().filter(function (x) { return x && x.u && x.n && utvonal(x.u) !== p; });
}
function gombok() {
var db = lathatoLista().length;
[].forEach.call(document.querySelectorAll('.bb-lnz-gomb'), function (g) {
g.hidden = !db;
var j = g.querySelector('.bb-lnz-db');
if (j) j.textContent = db > 9 ? '9+' : String(db);
});
}
function ujGomb(mobil) {
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-lnz-gomb btn' + (mobil ? ' bb-lnz-gomb-m' : '');
g.setAttribute('aria-label', T.cim);
g.setAttribute('aria-haspopup', 'dialog');
g.setAttribute('aria-expanded', 'false');
g.title = T.cim;
g.innerHTML = '<span class="bb-lnz-ikon">' + IKON_ORA + '<span class="bb-lnz-db"></span></span>' +
(mobil ? '' : '<span class="bb-lnz-felirat">' + esc(T.cim) + '</span>');
g.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); panel && !panel.hidden ? zar() : nyit(g); });
return g;
}
function beilleszt() {
var asztali = document.getElementById('profile__dropdown-btn2');
if (asztali && !asztali.parentNode.querySelector('.bb-lnz-gomb')) asztali.parentNode.insertBefore(ujGomb(false), asztali);
var mobil = document.getElementById('profile__dropdown-btn');
if (mobil && !document.querySelector('.bb-lnz-gomb-m')) mobil.parentNode.insertBefore(ujGomb(true), mobil);
gombok();
}

function sorHtml(x, i) {
var kep = x.k ? '<img src="' + esc(x.k) + '" alt="" loading="lazy" decoding="async">' : '';
var raktar = x.r ? '<span class="bb-lnz-raktar bb-lnz-r-' + esc(x.rs || 'z') + '">' + esc(x.r) + '</span>' : '';
var gomb = x.s
? '<button type="button" class="bb-lnz-putt" data-i="' + i + '" aria-label="' + esc(T.putt + ': ' + x.n) + '" title="' + esc(T.putt) + '">' + IKON_PUTT + '</button>'
: '<a class="bb-lnz-putt bb-lnz-megnez" href="' + esc(x.u) + '" aria-label="' + esc(T.megnez + ': ' + x.n) + '" title="' + esc(T.megnez) + '">' + IKON_NYIL + '</a>';
return '<li class="bb-lnz-sor"><a class="bb-lnz-kep" href="' + esc(x.u) + '" tabindex="-1" aria-hidden="true">' + kep + '</a>' +
'<div class="bb-lnz-adat"><a class="bb-lnz-nev" href="' + esc(x.u) + '">' + esc(x.n) + '</a>' +
'<div class="bb-lnz-sor2">' + (x.a ? '<span class="bb-lnz-ar">' + esc(x.a) + '</span>' : '') + raktar + '</div></div>' + gomb + '</li>';
}
function rajzol() {
var l = lathatoLista();
panel.querySelector('.bb-lnz-lista').innerHTML = l.length ? l.map(sorHtml).join('') : '<li class="bb-lnz-ures">' + esc(T.ures) + '</li>';
panel.querySelector('.bb-lnz-torol').hidden = !l.length;
return l;
}
function epit() {
if (panel) return;
hatter = document.createElement('div');
hatter.className = 'bb-lnz-hatter';
hatter.hidden = true;
hatter.addEventListener('click', zar);
panel = document.createElement('section');
panel.className = 'bb-lnz-panel';
panel.setAttribute('role', 'dialog');
panel.setAttribute('aria-label', T.cim);
panel.hidden = true;
panel.innerHTML = '<span class="bb-lnz-csucs" aria-hidden="true"></span><span class="bb-lnz-fogo" aria-hidden="true"></span>' +
'<div class="bb-lnz-fej"><h2 class="bb-lnz-cim">' + esc(T.cim) + '</h2>' +
'<button type="button" class="bb-lnz-torol">' + esc(T.torol) + '</button>' +
'<button type="button" class="bb-lnz-bezar" aria-label="' + esc(T.bezar) + '">' + IKON_X + '</button></div>' +
'<ul class="bb-lnz-lista"></ul>';
panel.addEventListener('click', function (e) {
if (e.target.closest('.bb-lnz-bezar')) { zar(); return; }
if (e.target.closest('.bb-lnz-torol')) { ir([]); rajzol(); gombok(); zar(); return; }
var p = e.target.closest('button.bb-lnz-putt');
if (p) {
var x = lathatoLista()[+p.getAttribute('data-i')];
if (x && x.s && typeof window.cart_add === 'function') {
zar();
try { window.cart_add(x.s, 'bblnz_', 1); ertesit(T.bekerult + x.n); } catch (er) { location.href = x.u; }
} else if (x) location.href = x.u;
}
});
document.body.appendChild(hatter);
document.body.appendChild(panel);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { zar(); nyitoGomb && nyitoGomb.focus(); } });
document.addEventListener('click', function (e) {
if (!panel.hidden && !kisMobil() && !panel.contains(e.target) && !e.target.closest('.bb-lnz-gomb')) zar();
});
window.addEventListener('resize', helyez);
window.addEventListener('scroll', helyez, { passive: true });
}
function helyez() {
if (!panel || panel.hidden || !nyitoGomb) return;
if (kisMobil()) { panel.style.top = panel.style.left = ''; return; }
var r = nyitoGomb.getBoundingClientRect();
if (!r.width) { zar(); return; }
var w = panel.offsetWidth || 420;
var bal = Math.max(12, Math.min(window.innerWidth - w - 12, r.left + r.width / 2 - w / 2));
panel.style.top = Math.round(r.bottom + 10) + 'px';
panel.style.left = Math.round(bal) + 'px';
panel.style.setProperty('--bb-lnz-csucs', Math.round(r.left + r.width / 2 - bal - 7) + 'px');
}
function nyit(g) {
epit();
nyitoGomb = g;
rajzol();
panel.classList.toggle('bb-lnz-lap', kisMobil());
panel.hidden = false;
hatter.hidden = !kisMobil();
gyoker.classList.toggle('bb-lnz-nyitva', kisMobil());
g.setAttribute('aria-expanded', 'true');
helyez();
var elso = panel.querySelector('.bb-lnz-bezar');
elso && elso.focus({ preventScroll: true });
}
function zar() {
if (!panel || panel.hidden) return;
panel.hidden = true;
hatter.hidden = true;
gyoker.classList.remove('bb-lnz-nyitva');
[].forEach.call(document.querySelectorAll('.bb-lnz-gomb'), function (g) { g.setAttribute('aria-expanded', 'false'); });
}

var ertesito = null;
function ertesit(szoveg) {
if (!ertesito) {
ertesito = document.createElement('div');
ertesito.className = 'bb-lnz-ertesito';
ertesito.setAttribute('role', 'status');
document.body.appendChild(ertesito);
}
ertesito.innerHTML = IKON_PIPA + '<span>' + esc(szoveg) + '</span>';
ertesito.classList.add('lathato');
clearTimeout(ertesito.idozito);
ertesito.idozito = setTimeout(function () { ertesito.classList.remove('lathato'); }, 2600);
}
function masol(szoveg, kesz) {
function regi() {
var t = document.createElement('textarea');
t.value = szoveg; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
document.body.appendChild(t); t.select();
try { document.execCommand('copy'); } catch (e) { /* nincs vágólap */ }
t.remove(); kesz();
}
if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(szoveg).then(kesz, regi); else regi();
}
function megosztas() {
var tartalom = document.getElementById('page_artdet_content');
var hely = tartalom && $('.artdet__img-data-left', tartalom);
if (!hely || hely.querySelector('.bb-lnz-oszt')) return;
var url = sajatUrl(($('link[rel="canonical"]') || {}).href || location.href.split(/[?#]/)[0]) || location.href;
var cim = (($('.artdet__name', tartalom) || {}).textContent || document.title).replace(/\s+/g, ' ').trim();
var g = document.createElement('button');
g.type = 'button';
g.className = 'bb-lnz-oszt';
g.setAttribute('aria-label', T.oszt);
g.setAttribute('aria-haspopup', 'menu');
g.setAttribute('aria-expanded', 'false');
g.title = T.oszt;
g.innerHTML = IKON_OSZT;
var menu = document.createElement('div');
menu.className = 'bb-lnz-oszt-menu';
menu.setAttribute('role', 'menu');
menu.hidden = true;
var e = encodeURIComponent;
menu.innerHTML = '<div class="bb-lnz-oszt-cim">' + esc(T.oszt) + '</div>' +
'<button type="button" role="menuitem" class="bb-lnz-oszt-masol">' + IKON_LINK + '<span>' + esc(T.masol) + '</span></button>' +
'<a role="menuitem" href="https://www.facebook.com/sharer/sharer.php?u=' + e(url) + '" target="_blank" rel="noopener">' + IKON_FB + '<span>Facebook</span></a>' +
'<a role="menuitem" href="mailto:?subject=' + e(cim) + '&amp;body=' + e(cim + '\n' + url) + '">' + IKON_LEVEL + '<span>' + esc(T.email) + '</span></a>';
function menuZar() { menu.hidden = true; g.setAttribute('aria-expanded', 'false'); }
g.addEventListener('click', function (ev) {
ev.preventDefault(); ev.stopPropagation();
if (navigator.share && (kisMobil() || !(window.matchMedia && window.matchMedia('(pointer: fine)').matches))) {
navigator.share({ title: cim, url: url }).catch(function () { /* bezárta */ });
return;
}
if (kisMobil()) { masol(url, function () { ertesit(T.masolvaUz); }); return; }
var m = menu.querySelector('.bb-lnz-oszt-masol');
m.classList.remove('kesz'); m.innerHTML = IKON_LINK + '<span>' + esc(T.masol) + '</span>';
menu.hidden = !menu.hidden;
g.setAttribute('aria-expanded', String(!menu.hidden));
});
menu.addEventListener('click', function (ev) {
var m = ev.target.closest('.bb-lnz-oszt-masol');
if (m) {
masol(url, function () { m.classList.add('kesz'); m.innerHTML = IKON_PIPA + '<span>' + esc(T.masolva) + '</span>'; setTimeout(menuZar, 1400); });
return;
}
if (ev.target.closest('a')) setTimeout(menuZar, 0);
});
document.addEventListener('click', function (ev) { if (!menu.hidden && !menu.contains(ev.target) && !g.contains(ev.target)) menuZar(); });
document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !menu.hidden) { menuZar(); g.focus(); } });
hely.appendChild(g);
hely.appendChild(menu);
}

function akadalymentes() {
[].forEach.call(document.querySelectorAll('#footer a, footer a'), function (a) {
if (!a.textContent.trim() && !a.querySelector('img, svg, i, [class*="icon"]') && !a.getAttribute('aria-label') && !a.title) a.remove();
});
function keretek() {
[].forEach.call(document.querySelectorAll('iframe:not([title])'), function (f) {
if (/barion\.com/.test(f.src || '')) f.setAttribute('title', 'Barion fizetési szolgáltatás (rejtett)');
});
}
function nevek() {
var hu = (document.documentElement.lang || 'hu').slice(0, 2) === 'hu';
[].forEach.call(document.querySelectorAll('.sticker img[alt=""]'), function (k) {
var m = k.closest('.sticker'), t = m && (m.getAttribute('data-tippy') || m.textContent.trim());
if (t) k.alt = t.replace(/<[^>]*>/g, '').trim();
});
var PSWP = hu
? { close: 'Bezárás', fs: 'Teljes képernyő', zoom: 'Nagyítás', 'arrow--left': 'Előző kép', 'arrow--right': 'Következő kép' }
: { close: 'Close', fs: 'Full screen', zoom: 'Zoom', 'arrow--left': 'Previous image', 'arrow--right': 'Next image' };
Object.keys(PSWP).forEach(function (k) {
[].forEach.call(document.querySelectorAll('.pswp__button--' + k + ':not([aria-label])'), function (b) { b.setAttribute('aria-label', PSWP[k]); });
});
[].forEach.call(document.querySelectorAll('a[data-size]:not([aria-label])'), function (a) {
if (!a.textContent.trim()) a.setAttribute('aria-label', hu ? 'Kép nagyítása' : 'Enlarge image');
});
[].forEach.call(document.querySelectorAll('input.js-search-input'), function (i) {
if (!/keres|search|such|caut|traž/i.test(i.getAttribute('aria-label') || '')) i.setAttribute('aria-label', hu ? 'Keresés a termékek között' : 'Search products');
});
[].forEach.call(document.querySelectorAll('.product_filter_group'), function (g) {
var cim = g.querySelector('.product_filter_title');
if (!cim) return;
[].forEach.call(g.querySelectorAll('input[id^="filter-number-"]'), function (i) {
var a = i.getAttribute('aria-label') || '';
if (a.indexOf(cim.textContent.trim()) !== 0) i.setAttribute('aria-label', cim.textContent.trim() + ' – ' + a);
});
});
[].forEach.call(document.querySelectorAll('.read-more__btn:not([aria-label])'), function (b) {
var sp = b.querySelector('[aria-label]');
if (sp) b.setAttribute('aria-label', sp.getAttribute('aria-label'));
});
}
nevek();
keretek(); setTimeout(function () { keretek(); nevek(); }, 3000); setTimeout(function () { keretek(); nevek(); }, 8000);
[].forEach.call(document.querySelectorAll('ul > ul, ul > ol, ol > ul, ol > ol'), function (belso) {
var kulso = belso.parentNode;
while (belso.firstChild) kulso.insertBefore(belso.firstChild, belso);
belso.remove();
});
}

function indul() {
try { megjegyez(); } catch (e) { /* hiányos adatlap */ }
beilleszt();
megosztas();
try { akadalymentes(); } catch (e) { /* nem kritikus */ }
window.addEventListener('storage', function (e) { if (e.key === LISTA) { gombok(); if (panel && !panel.hidden) rajzol(); } });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul); else indul();
})();

});
