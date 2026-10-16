(function () {
var MINDENKI = false;
var OLDAL = 927735;
var KULCS = 'bbUjUgyintezes';
var shop = window.UNAS && window.UNAS.shop;
var oldal = shop && shop.page_id ? Number(shop.page_id) : 0;
if (oldal !== OLDAL && !/^\/online-ugyintezes\/?$/.test(location.pathname)) return;
var allapot = null;
try {
var m = location.search.match(/[?&]ujugyintezes=([01])/);
if (m) localStorage.setItem(KULCS, m[1]);
allapot = localStorage.getItem(KULCS);
} catch (e) { allapot = null; }
if (allapot === '0' || (!allapot && !MINDENKI)) return;
var gyoker = document.documentElement;
if ((gyoker.lang || 'hu').slice(0, 2) !== 'hu') return;

gyoker.classList.add('bb-ujugy');
gyoker.setAttribute('data-bb-ujugy', '2026-10-16 11:36:16');
var stilus = document.createElement('style');
stilus.id = 'bb-ujugy';
stilus.textContent = "html.bb-ujugy #bb-online-ugyintezes{display: none !important}html.bb-ujugy.bb-ujugy-kesz .main__title{display: none}.bbu{--bbu-bordo: #4A0F22;--bbu-bor: #6F1731;--bbu-zold: #2a8511;--bbu-zold-s: #226d0e;--bbu-szoveg: #1B2036;--bbu-halk: #4A4E5E;--bbu-halk2: #5B5F70;--bbu-keret: rgba(74,15,34,.12);--bbu-rozsa: #F3E9EC;color: var(--bbu-szoveg);font-family: inherit;margin: 8px 0 48px;display: flex;flex-direction: column;gap: 48px}.bbu *,.bbu *::before,.bbu *::after{box-sizing: border-box}.bbu h1,.bbu h2,.bbu p{margin: 0}.bbu a{text-decoration: none}.bbu a:focus-visible,.bbu button:focus-visible,.bbu summary:focus-visible{outline: 2px solid var(--bbu-zold);outline-offset: 2px}.bbu-fej{display: flex;flex-wrap: wrap;gap: 28px;align-items: flex-start;background: #fff;border: 1px solid rgba(74,15,34,.10);border-radius: 24px;padding: 32px}.bbu-fo{flex: 999 1 520px;min-width: 0;display: flex;flex-direction: column;gap: 18px}.bbu-felcim{font-size: 13px;font-weight: 700;letter-spacing: .08em;text-transform: uppercase;color: var(--bbu-bor)}.bbu-cim{font-size: clamp(30px,4vw,44px);line-height: 1.08;font-weight: 800;letter-spacing: -.02em;color: var(--bbu-szoveg);margin-top: 6px !important}.bbu-bev{font-size: 17px;line-height: 1.5;color: var(--bbu-halk);max-width: 620px;margin-top: 8px !important}.bbu-kereso{display: flex;align-items: center;gap: 12px;background: #fff;border: 2px solid rgba(74,15,34,.22);border-radius: 18px;padding: 6px 8px 6px 18px;transition: box-shadow .15s,border-color .15s}.bbu-kereso:focus-within{border-color: var(--bbu-zold);box-shadow: 0 0 0 4px rgba(42,133,17,.15)}.bbu-kereso input{flex: 1 1 auto;min-width: 0;border: 0 !important;background: transparent !important;box-shadow: none !important;font: inherit;font-size: 18px;color: var(--bbu-szoveg);padding: 14px 0;height: auto;outline: none}.bbu-kereso input::-webkit-search-cancel-button{display: none}.bbu-torol{flex: 0 0 auto;width: 44px;height: 44px;border: 0;border-radius: 12px;background: #F3F1F2;color: var(--bbu-halk);font: inherit;font-size: 22px;line-height: 1;cursor: pointer}.bbu-rejt{position: absolute !important;width: 1px;height: 1px;overflow: hidden;clip: rect(0 0 0 0);white-space: nowrap}.bbu-chipek{display: flex;flex-wrap: wrap;gap: 8px;align-items: center}.bbu-chipek\u003Espan{font-size: 14px;color: var(--bbu-halk2);margin-right: 4px}.bbu-chip{min-height: 40px;padding: 0 14px;border-radius: 999px;border: 1px solid rgba(74,15,34,.18);background: #fff;color: var(--bbu-bordo);font: inherit;font-size: 14px;font-weight: 500;cursor: pointer}.bbu-chip:hover{background: var(--bbu-rozsa);border-color: rgba(111,23,49,.35)}.bbu-talalat{display: flex;flex-direction: column;gap: 10px}.bbu-talalat[hidden],.bbu-chipek[hidden],.bbu-nincs[hidden],.bbu-torol[hidden]{display: none !important}.bbu-tcim{font-size: 14px;font-weight: 600;color: var(--bbu-zold)}.bbu-hit{display: flex;flex-wrap: wrap;gap: 14px 20px;align-items: center;color: var(--bbu-szoveg) !important;background: #fff;border: 1px solid var(--bbu-keret);border-radius: 16px;padding: 16px 18px}.bbu-hit.bbu-elso{background: #F2F8F0;border-color: rgba(42,133,17,.45)}.bbu-hit-sz{flex: 999 1 300px;min-width: 0;display: flex;flex-direction: column;gap: 4px}.bbu-hit-fej{display: flex;gap: 10px;align-items: center;flex-wrap: wrap;font-size: 18px;font-weight: 700}.bbu-jel{font-size: 12px;font-weight: 700;letter-spacing: .04em;text-transform: uppercase;color: #fff;background: var(--bbu-zold);border-radius: 6px;padding: 3px 8px}.bbu-hit-mi{font-size: 15px;color: var(--bbu-halk);line-height: 1.45}.bbu-hit-kell{font-size: 13px;color: var(--bbu-halk2)}.bbu-hit-kell b{color: var(--bbu-bordo)}.bbu-tovabb{flex: 1 0 auto;display: inline-flex;align-items: center;justify-content: center;gap: 8px;min-height: 44px;padding: 0 18px;border-radius: 12px;background: var(--bbu-rozsa);color: var(--bbu-bor);font-weight: 700;font-size: 15px}.bbu-elso .bbu-tovabb{background: var(--bbu-zold);color: #fff}.bbu-nincs{display: flex;flex-wrap: wrap;gap: 12px 20px;align-items: center;background: #FFF8EC;border: 1px solid #F0D9AE;border-radius: 16px;padding: 16px 18px}.bbu-nincs p{flex: 999 1 300px;font-size: 15px;line-height: 1.5;color: #4A3A1A}.bbu-gomb{display: inline-flex;align-items: center;justify-content: center;gap: 8px;min-height: 44px;padding: 0 18px;border-radius: 12px;background: var(--bbu-zold);color: #fff !important;font-weight: 700;font-size: 15px}.bbu-gomb:hover{background: var(--bbu-zold-s)}.bbu-gomb2{display: inline-flex;align-items: center;gap: 8px;min-height: 44px;padding: 0 16px;border-radius: 12px;border: 1px solid rgba(74,15,34,.25);color: var(--bbu-bor) !important;font-weight: 700;font-size: 15px;background: #fff}.bbu-gomb2:hover{background: var(--bbu-rozsa);color: var(--bbu-bordo) !important}.bbu-oldal{flex: 1 1 280px;min-width: 0;display: flex;flex-direction: column;gap: 14px;background: #FBF7F8;border: 1px solid rgba(74,15,34,.10);border-radius: 20px;padding: 20px}.bbu-allapot{display: flex;align-items: center;gap: 10px;font-size: 14px;font-weight: 600;color: var(--bbu-zold)}.bbu-allapot i{width: 10px;height: 10px;border-radius: 50%;background: currentColor;box-shadow: 0 0 0 4px rgba(42,133,17,.18);flex: 0 0 auto}.bbu-zarva{color: #8A5A00}.bbu-zarva i{box-shadow: 0 0 0 4px rgba(138,90,0,.15)}.bbu-tel{display: flex;flex-direction: column;gap: 2px;font-size: 13px;color: var(--bbu-halk2)}.bbu-tel a{font-size: 24px;font-weight: 800;color: var(--bbu-bordo) !important;letter-spacing: -.01em}.bbu-vonal{height: 1px;background: rgba(74,15,34,.10)}.bbu-elok{display: flex;flex-direction: column;gap: 6px;font-size: 14px;color: #3A3E4E}.bbu-elok b{font-size: 13px;color: var(--bbu-bordo);margin-bottom: 2px}.bbu-elok span{display: flex;gap: 8px;align-items: center}.bbu-szakasz-fej{display: flex;flex-direction: column;gap: 6px;margin-bottom: 24px}.bbu-h2{font-size: 28px;font-weight: 800;color: var(--bbu-bordo);letter-spacing: -.01em;line-height: 1.2}.bbu-szakasz-fej p,.bbu-gyik-bal p{font-size: 16px;line-height: 1.5;color: var(--bbu-halk)}.bbu-ut{display: grid;grid-template-columns: repeat(auto-fit,minmax(250px,1fr));gap: 20px}.bbu-lepes{display: flex;flex-direction: column;gap: 10px}.bbu-lepes-fej{display: flex;align-items: center;gap: 10px;padding-bottom: 6px}.bbu-szam{flex: 0 0 auto;width: 32px;height: 32px;border-radius: 50%;background: var(--bbu-bordo);color: #fff;font-weight: 800;font-size: 15px;display: flex;align-items: center;justify-content: center}.bbu-lepes-nev{display: flex;flex-direction: column;font-size: 13px;color: var(--bbu-halk2)}.bbu-lepes-nev b{font-size: 17px;font-weight: 800;color: var(--bbu-szoveg)}.bbu-lepes-fej::after{content: \"\";flex: 1 1 auto;height: 2px;background: linear-gradient(90deg,rgba(74,15,34,.25),rgba(74,15,34,0))}.bbu-csempe{display: flex;gap: 14px;align-items: flex-start;color: var(--bbu-szoveg) !important;background: #fff;border: 1px solid var(--bbu-keret);border-radius: 16px;padding: 16px;transition: border-color .15s,box-shadow .15s,transform .15s}.bbu-csempe:hover,.bbu-hit:hover{border-color: rgba(111,23,49,.45);box-shadow: 0 6px 18px rgba(74,15,34,.08);transform: translateY(-1px)}.bbu-ikon{flex: 0 0 auto;width: 42px;height: 42px;border-radius: 12px;background: var(--bbu-rozsa);display: flex;align-items: center;justify-content: center}.bbu-csempe span:last-child{display: flex;flex-direction: column;gap: 3px;font-size: 14px;color: var(--bbu-halk2);line-height: 1.4}.bbu-csempe b{font-size: 16px;font-weight: 700;color: var(--bbu-szoveg)}.bbu-gyik{display: flex;flex-wrap: wrap;gap: 28px 48px;align-items: flex-start}.bbu-gyik-bal{flex: 1 1 280px;min-width: 0;display: flex;flex-direction: column;gap: 12px;align-items: flex-start}.bbu-gyik-lista{flex: 999 1 520px;min-width: 0;display: flex;flex-direction: column;gap: 10px}.bbu-gyik details{background: #fff;border: 1px solid var(--bbu-keret);border-radius: 16px;padding: 0 18px}.bbu-gyik summary{list-style: none;cursor: pointer;display: flex;justify-content: space-between;align-items: center;gap: 16px;min-height: 56px;font-size: 16px;font-weight: 700}.bbu-gyik summary::-webkit-details-marker{display: none}.bbu-gyik summary::after{content: \"+\";flex: 0 0 auto;font-size: 24px;font-weight: 400;color: var(--bbu-bor);transition: transform .2s}.bbu-gyik details[open] summary::after{transform: rotate(45deg)}.bbu-gyik details p{margin: 0 0 18px;font-size: 15px;line-height: 1.6;color: #3A3E4E}.bbu-gyik details a{color: var(--bbu-bor);font-weight: 600}.bbu-bolt{display: flex;flex-wrap: wrap;background: #fff;border: 1px solid var(--bbu-keret);border-radius: 24px;overflow: hidden}.bbu-bolt-kep{flex: 1 1 340px;min-height: 240px;position: relative;background: #EDE6E8;margin: 0}.bbu-bolt-kep img{position: absolute;inset: 0;width: 100%;height: 100%;object-fit: cover}.bbu-bolt-sz{flex: 999 1 420px;min-width: 0;display: flex;flex-direction: column;gap: 16px;padding: 28px}.bbu-bolt-sz .bbu-felcim{color: var(--bbu-zold)}.bbu-bolt-sz\u003Ep{font-size: 16px;color: var(--bbu-halk)}.bbu-bolt-adat{display: grid;grid-template-columns: repeat(auto-fit,minmax(200px,1fr));gap: 12px 20px;font-size: 15px;color: #3A3E4E}.bbu-bolt-adat\u003Ediv{display: flex;gap: 10px;align-items: flex-start}.bbu-bolt-adat svg{margin-top: 2px;flex: 0 0 auto}.bbu-gombok{display: flex;flex-wrap: wrap;gap: 10px}@media (max-width: 575px){.bbu{gap: 36px}.bbu-fej{padding: 20px 16px;border-radius: 20px}.bbu-kereso input{font-size: 16px}.bbu-h2{font-size: 24px}.bbu-bolt-sz{padding: 20px 16px}.bbu-bolt-kep{min-height: 200px}}";
(document.head || gyoker).appendChild(stilus);

var BOLTKEP = "https://cdn.jsdelivr.net/gh/bi-bor/unas-bi-bor-script@cab92dec708f1117f76db547c06454fd293246e5/terkep/uzlet.webp";
var TEL = '+36 30 663 7381';
var NYITVA_SZOVEG = 'H–P 7:30–16:30 · Szo 8:00–12:00';

function svg(d, szin, meret) {
return '<svg aria-hidden="true" width="' + (meret || 22) + '" height="' + (meret || 22) + '" viewBox="0 0 24 24" fill="none" stroke="'
+ (szin || '#6F1731') + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
}
var IKON = {
kerdes: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5h.01"/>',
kulcs: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8V20h3.2l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
ajanlat: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h4"/>',
kartya: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>',
ceruza: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
x: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
doboz: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8M10 6l2 3-1 2"/>',
csere: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
vissza: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
pajzs: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
szamla: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
panasz: '<path d="M4 5h16v11H9l-5 4z"/><path d="M12 8v4M12 14.5h.01"/>',
nagyito: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
nyil: '<path d="M5 12h14M13 6l6 6-6 6"/>',
pipa: '<path d="m5 12 5 5L20 7"/>',
hely: '<path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
ora: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
};

var UGYEK = {
segitseg: { cim: 'Segítség általánosságban', href: '/segitseg_altalanossagban', ikon: 'kerdes', rovid: 'Bármilyen kérdés, ha nem tudja, hová tartozik',
mi: 'Írja meg, miben segíthetünk — kollégánk a megfelelő helyre irányítja.', kell: 'rendelésszám, ha van', kw: ['segit', 'kerdes', 'erdeklod'] },
muszaki: { cim: 'Műszaki kérdés egy termékről', href: '/muszaki-kerdes-egy-termekrol', ikon: 'kulcs', rovid: 'Méret, anyag, használat — szakértőnk válaszol',
mi: 'Szakértőnk válaszol méretről, anyagról, használatról.', kell: 'terméknév vagy cikkszám',
kw: ['hogyan', 'melyik', 'meret', 'alkalmas', 'kompatibilis', 'hasznal', 'adagol', 'mennyit', 'muszaki', 'liter', 'passzol', 'illik', 'mukodik a'] },
arajanlat: { cim: 'Árajánlat', href: '/arajanlat', ikon: 'ajanlat', rovid: 'Nagyobb tételre, borászatnak, viszonteladónak',
mi: 'Nagyobb mennyiségre vagy borászati beruházásra kér ajánlatot.', kell: 'termékek és mennyiségek, szállítási cím',
kw: ['arajanlat', 'ajanlat', 'nagyker', 'nagy tetel', 'mennyisegi', 'kedvezmeny', 'viszontelad', 'tartaly', 'beruhaz'] },
fizetes: { cim: 'Sikertelen online fizetés', href: '/sikertelen-online-fizetes', ikon: 'kartya', rovid: 'Levonták az összeget, de a rendelés nem ment át?',
mi: 'Levonták az összeget, de a rendelés nem jött létre — vagy fordítva.', kell: 'a fizetés időpontja és összege, ha van: rendelésszám',
kw: ['fizet', 'kartya', 'bankkartya', 'levon', 'terhel', 'simple', 'barion', 'nem ment at', 'sikertelen', 'atutal', 'ketszer'] },
modosit: { cim: 'Megrendelés módosítása', href: '/megrendeles-modositasa', ikon: 'ceruza', rovid: 'Mennyiség, termék, cím vagy szállítási mód',
mi: 'Még nem indult el a csomag, és változtatna rajta.', kell: 'rendelésszám, mi változzon',
kw: ['modosit', 'valtoztat', 'hozzaten', 'meg egy', 'szallitasi mod', 'mennyiseg', 'rossz cim', 'elir', 'cimet'] },
torles: { cim: 'Megrendelés törlése', href: '/megrendeles-torlese', ikon: 'x', rovid: 'Ha mégsem kéri a rendelést',
mi: 'Mégsem kéri a rendelést.', kell: 'rendelésszám', kw: ['torol', 'lemond', 'storno', 'visszavon', 'megsem', 'nem kerem'] },
serult: { cim: 'Sérült vagy hiányos csomag', href: '/serult-hianyos-csomag-bejelentese', ikon: 'doboz', rovid: 'Fotózza le a dobozt és a tartalmát, és jelezze',
mi: 'Ha törötten, horpadtan vagy hiányosan érkezett valami.', kell: 'rendelésszám, fotó a dobozról és a termékről',
kw: ['torot', 'tort', 'serul', 'repedt', 'horpad', 'hiany', 'nincs benne', 'kevesebb', 'osszetor', 'eltor', 'szivarog', 'folyik', 'demizson', 'uveg'] },
csere: { cim: 'Termék cseréje', href: '/megrendeles-modositasa', ikon: 'csere', rovid: 'Más méret vagy más típus kellene',
mi: 'Másik méretre, színre vagy típusra cserélné.', kell: 'rendelésszám, melyik termék helyett mit kér',
kw: ['csere', 'cserel', 'mas meret', 'kisebb', 'nagyobb', 'rossz meret', 'nem jo meret', 'mas tipus', 'masikat'] },
elallas: { cim: 'Elállás bejelentése', href: '/elallas-bejelentese', ikon: 'vissza', rovid: 'Az átvételtől számított 14 napon belül, indoklás nélkül',
mi: 'Az átvételtől számított 14 napon belül, indoklás nélkül visszaküldheti.', kell: 'rendelésszám, a visszaküldendő termékek',
kw: ['visszakuld', 'nem kell', 'elall', 'visszavisz', 'penzvissza', 'visszaterit', 'meggondol', 'nem tetszik', 'visszaad'] },
garancia: { cim: 'Garanciális ügyintézés', href: '/garancialis-ugyintezesek', ikon: 'pajzs', rovid: 'Meghibásodott a termék a jótállási időben',
mi: 'Használat közben meghibásodott a termék.', kell: 'számla vagy rendelésszám, a hiba leírása, fotó vagy videó',
kw: ['garancia', 'jotall', 'elromlott', 'nem mukodik', 'meghibasod', 'hibas', 'romlott', 'nem indul', 'szivattyu', 'motor', 'szakadt'] },
szamla: { cim: 'Számla másolat igénylése', href: '/szamla-masolat-igenylese', ikon: 'szamla', rovid: 'Elkallódott, vagy céges adatokra kellene',
mi: 'Elkallódott a számla, vagy más adatokra kellene.', kell: 'rendelésszám vagy a számla sorszáma',
kw: ['szamla', 'ceges', 'adoszam', 'afa', 'nyugta'] },
panasz: { cim: 'Panasz bejelentés', href: '/panasz-bejelentes', ikon: 'panasz', rovid: 'Ha valami nem úgy ment, ahogy kellett volna',
mi: 'Ha valami nem úgy ment, ahogy kellett volna.', kell: 'rendelésszám, mi történt',
kw: ['panasz', 'eleg', 'felhaborit', 'udvariatlan', 'keses', 'kesik', 'nem jott meg', 'meg mindig nem'] },
kapcsolat: { cim: 'Elérhetőség, kapcsolat', href: '/elerhetoseg-kapcsolat', ikon: 'hely', rovid: 'Telefon, cím, nyitvatartás',
mi: 'Telefon, cím, nyitvatartás egy helyen.', kell: '—', kw: ['telefon', 'nyit', 'zar', 'hol vagytok', 'uzlet', 'szemelyes', 'email', 'elerhet'] }
};
var SZAKASZOK = [
{ nev: 'Vásárlás előtt', al: 'kérdése van, ajánlatot kér', ugyek: ['segitseg', 'muszaki', 'arajanlat'] },
{ nev: 'Leadtam a rendelést', al: 'még nem érkezett meg', ugyek: ['fizetes', 'modosit', 'torles'] },
{ nev: 'Megérkezett a csomag', al: 'de valami nem stimmel', ugyek: ['serult', 'csere', 'elallas'] },
{ nev: 'Használat közben', al: 'később jött elő a gond', ugyek: ['garancia', 'szamla', 'panasz'] }
];
var CHIPEK = ['Törötten jött', 'Visszaküldeném', 'Nem ment át a fizetés', 'Kell a számla', 'Elromlott', 'Másik méret kellene'];
var GYIK = [
{ k: 'Meddig állhatok el a vásárlástól?', v: 'A termék átvételétől számított 14 napon belül, indoklás nélkül. A visszatérítés az eredeti fizetési módra megy; a visszatérítést a termék beérkezéséig (vagy a visszaküldés igazolásáig) visszatarthatjuk.', link: 'elallas', lsz: 'Elállás bejelentése' },
{ k: 'Mit tegyek, ha sérülten érkezett a csomag?', v: 'Fotózza le a csomagolást és a sérült terméket, és a fotókkal együtt minél hamarabb jelentse be nekünk.', link: 'serult', lsz: 'Bejelentés' },
{ k: 'Mennyi a szállítási díj?', v: 'A szállítás 990 Ft-tól indul; a pontos díjat a termék súlya és a választott mód adja, a termékoldalon és a pénztárban látja. Villányi üzletünkben személyesen is átveheti.' },
{ k: 'Mi az a csomagolási és kezelési költség?', v: 'A kartonban szállított termékeknél felszámolt díj. Személyes átvételnél és a Bí-Bor Futárszolgálattal történő kiszállításnál nem jár — a pénztár ilyenkor magától leveszi.' },
{ k: 'Elkallódott a számlám. Hogyan kérhetek újat?', v: 'A rendelésszámmal vagy a számla sorszámával kérje a számlamásolat-űrlapon, és e-mailben elküldjük.', link: 'szamla', lsz: 'Számla másolat' },
{ k: 'Módosíthatom még a leadott rendelést?', v: 'Amíg a csomag nem indult el, igen: mennyiséget, terméket, címet és szállítási módot is. Minél hamarabb jelzi, annál biztosabb.', link: 'modosit', lsz: 'Módosítás' }
];

function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

function talal(q) {
var n = norm(q).trim();
if (n.length < 2) return [];
var szavak = n.split(/\s+/);
var lista = [];
Object.keys(UGYEK).forEach(function (id) {
var u = UGYEK[id], pont = 0;
u.kw.forEach(function (k) {
if (n.indexOf(k) >= 0) pont += 3;
else if (szavak.some(function (s) { return s.length >= 4 && k.indexOf(s) === 0; })) pont += 1;
});
if (norm(u.cim).indexOf(n) >= 0) pont += 4;
if (pont > 0) lista.push({ id: id, pont: pont });
});
lista.sort(function (a, b) { return b.pont - a.pont; });
var also = lista.length ? Math.max(2, lista[0].pont / 2) : 0;
lista = lista.filter(function (x, i) { return i === 0 || x.pont >= also; });
return lista.slice(0, 3).map(function (x) { return UGYEK[x.id]; });
}

function nyitvaAllapot() {
var nap = 1, perc = 600;
try {
var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Budapest', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
var g = function (t) { for (var i = 0; i < p.length; i++) if (p[i].type === t) return p[i].value; return ''; };
nap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday'));
perc = parseInt(g('hour'), 10) % 24 * 60 + parseInt(g('minute'), 10);
} catch (e) { /* régi böngésző: munkaidőt feltételezünk */ }
var r = nap >= 1 && nap <= 5 ? { t: 450, v: 990 } : nap === 6 ? { t: 480, v: 720 } : null;
if (r && perc >= r.t && perc < r.v) {
var ig = Math.floor(r.v / 60) + ':' + ('0' + r.v % 60).slice(-2);
return { nyitva: true, hosszu: 'Ügyfélszolgálatunk most elérhető · ' + ig + '-ig', rovid: 'Most nyitva, ' + ig + '-ig' };
}
return { nyitva: false, hosszu: 'Most zárva — az űrlapokat a következő munkanapon nézzük', rovid: 'Most zárva' };
}

function csempe(id) {
var u = UGYEK[id];
return '<a class="bbu-csempe" href="' + u.href + '"><span class="bbu-ikon">' + svg(IKON[u.ikon]) + '</span>'
+ '<span><b>' + esc(u.cim) + '</b>' + esc(u.rovid) + '</span></a>';
}

function html() {
var all = nyitvaAllapot();
var pipa = svg(IKON.pipa, '#2a8511', 16);
var h = '<div class="bbu" id="bbu">';
h += '<section class="bbu-fej" aria-labelledby="bbu-cim"><div class="bbu-fo"><div>'
+ '<div class="bbu-felcim">Online ügyintézés · Bí-Bor-Ász ügyfélszolgálat</div>'
+ '<h1 class="bbu-cim" id="bbu-cim">Miben segíthetünk?</h1>'
+ '<p class="bbu-bev">Írja le pár szóval, mi történt — megmutatjuk, hol intézheti a leggyorsabban.</p></div>'
+ '<form class="bbu-kereso" role="search" action="#" onsubmit="return false">' + svg(IKON.nagyito, '#6F1731', 22)
+ '<label for="bbu-q" class="bbu-rejt">Mi történt?</label>'
+ '<input id="bbu-q" type="search" autocomplete="off" enterkeyhint="go" placeholder="pl. törötten jött a demizson, nem ment át a fizetés…">'
+ '<button type="button" class="bbu-torol" aria-label="Keresés törlése" hidden>×</button></form>'
+ '<div class="bbu-chipek"><span>Gyakori:</span>'
+ CHIPEK.map(function (c) { return '<button type="button" class="bbu-chip">' + esc(c) + '</button>'; }).join('') + '</div>'
+ '<div class="bbu-talalat" aria-live="polite" hidden></div>'
+ '<div class="bbu-nincs" hidden><p>Erre nem találtunk pontos ügytípust — <strong>írja meg nekünk a „Segítség általánosságban” űrlapon</strong>, és kollégánk a megfelelő helyre irányítja.</p>'
+ '<a class="bbu-gomb" href="/segitseg_altalanossagban">Írok nektek</a></div></div>'
+ '<aside class="bbu-oldal"><div class="bbu-allapot' + (all.nyitva ? '' : ' bbu-zarva') + '"><i></i>' + esc(all.hosszu) + '</div>'
+ '<div class="bbu-tel">Inkább beszélne velünk?<a href="tel:+36306637381">' + TEL + '</a>' + NYITVA_SZOVEG + '</div>'
+ '<div class="bbu-vonal"></div>'
+ '<div class="bbu-elok"><b>Gyorsabb lesz, ha kéznél van:</b>'
+ '<span>' + pipa + 'rendelésszám (a visszaigazoló levélben)</span><span>' + pipa + 'számla sorszáma</span>'
+ '<span>' + pipa + 'terméknév vagy cikkszám</span><span>' + pipa + 'sérülésnél: fotó</span></div></aside></section>';

h += '<section aria-labelledby="bbu-ut"><div class="bbu-szakasz-fej"><h2 class="bbu-h2" id="bbu-ut">Vagy válasszon aszerint, hol tart</h2>'
+ '<p>Minden ügy egy helyen, a vásárlás előtti kérdéstől a garanciáig.</p></div><div class="bbu-ut">';
SZAKASZOK.forEach(function (s, i) {
h += '<div class="bbu-lepes"><div class="bbu-lepes-fej"><span class="bbu-szam">' + (i + 1) + '</span>'
+ '<span class="bbu-lepes-nev"><b>' + esc(s.nev) + '</b>' + esc(s.al) + '</span></div>'
+ s.ugyek.map(csempe).join('') + '</div>';
});
h += '</div></section>';

h += '<section class="bbu-gyik" aria-labelledby="bbu-gyik"><div class="bbu-gyik-bal"><h2 class="bbu-h2" id="bbu-gyik">Mielőtt írna: gyakori kérdések</h2>'
+ '<p>A legtöbb kérdésre itt azonnal választ talál — űrlap és várakozás nélkül.</p>'
+ '<a class="bbu-gomb2" href="/segitseg_altalanossagban">Nem találom a választ</a></div><div class="bbu-gyik-lista">';
GYIK.forEach(function (g) {
var u = g.link ? UGYEK[g.link] : null;
h += '<details><summary>' + esc(g.k) + '</summary><p>' + esc(g.v)
+ (u ? ' <a href="' + u.href + '">' + esc(g.lsz) + ' →</a>' : '') + '</p></details>';
});
h += '</div></section>';

h += '<section class="bbu-bolt" aria-labelledby="bbu-bolt"><figure class="bbu-bolt-kep"><img src="' + BOLTKEP + '" alt="A Bí-Bor-Ász Gazdabolt épülete Villányban" width="720" height="370" loading="lazy" decoding="async"></figure>'
+ '<div class="bbu-bolt-sz"><div><div class="bbu-felcim">Személyesen is szívesen segítünk</div>'
+ '<h2 class="bbu-h2" id="bbu-bolt">Bí-Bor-Ász Gazdabolt, Villány</h2></div>'
+ '<p>Minden, amire egy borásznak szüksége lehet — 1999 óta.</p>'
+ '<div class="bbu-bolt-adat"><div>' + svg(IKON.hely, '#6F1731', 18) + '<span>7773 Villány,<br>Szent István u. 35.</span></div>'
+ '<div>' + svg(IKON.ora, '#6F1731', 18) + '<span><strong class="bbu-allapot' + (all.nyitva ? '' : ' bbu-zarva') + '" style="display:inline">' + esc(all.rovid) + '</strong><br>' + NYITVA_SZOVEG + '</span></div></div>'
+ '<div class="bbu-gombok"><a class="bbu-gomb" href="https://www.google.com/maps/dir/?api=1&amp;destination=' + encodeURIComponent('Bí-Bor-Ász, 7773 Villány, Szent István u. 35.') + '" target="_blank" rel="noopener">Útvonaltervezés</a>'
+ '<a class="bbu-gomb2" href="/rolunk">Ismerje meg a csapatot</a>'
+ '<a class="bbu-gomb2" href="/elerhetoseg-kapcsolat">Minden elérhetőség</a></div></div></section>';
return h + '</div>';
}

function talalatHtml(lista) {
return '<div class="bbu-tcim">' + (lista.length === 1 ? 'Ezt találtuk:' : 'Ezeket találtuk — az első a legvalószínűbb:') + '</div>'
+ lista.map(function (u, i) {
return '<a class="bbu-hit' + (i === 0 ? ' bbu-elso' : '') + '" href="' + u.href + '"><span class="bbu-hit-sz">'
+ '<span class="bbu-hit-fej">' + (i === 0 ? '<span class="bbu-jel">Ezt ajánljuk</span>' : '') + esc(u.cim) + '</span>'
+ '<span class="bbu-hit-mi">' + esc(u.mi) + '</span>'
+ '<span class="bbu-hit-kell"><b>Készítse elő:</b> ' + esc(u.kell) + '</span></span>'
+ '<span class="bbu-tovabb">Tovább' + svg(IKON.nyil, 'currentColor', 18) + '</span></a>';
}).join('');
}

function epit() {
var regi = document.getElementById('bb-online-ugyintezes');
if (!regi || document.getElementById('bbu')) { if (!regi) gyoker.classList.remove('bb-ujugy'); return; }
var doboz = document.createElement('div');
doboz.innerHTML = html();
var uj = doboz.firstChild;
regi.parentNode.insertBefore(uj, regi);
regi.parentNode.removeChild(regi);
gyoker.classList.add('bb-ujugy-kesz');

var input = uj.querySelector('#bbu-q');
var torol = uj.querySelector('.bbu-torol');
var chipek = uj.querySelector('.bbu-chipek');
var talalat = uj.querySelector('.bbu-talalat');
var nincs = uj.querySelector('.bbu-nincs');
var elso = null;
function frissit() {
var q = input.value;
var van = norm(q).trim().length >= 2;
var lista = van ? talal(q) : [];
elso = lista.length ? lista[0] : null;
torol.hidden = !q;
chipek.hidden = van;
talalat.hidden = !lista.length;
nincs.hidden = !van || lista.length > 0;
talalat.innerHTML = lista.length ? talalatHtml(lista) : '';
}
input.addEventListener('input', frissit);
input.addEventListener('keydown', function (e) {
if (e.key === 'Enter' && elso) { e.preventDefault(); location.href = elso.href; }
});
torol.addEventListener('click', function () { input.value = ''; frissit(); input.focus(); });
chipek.addEventListener('click', function (e) {
var b = e.target.closest('.bbu-chip');
if (!b) return;
input.value = b.textContent;
frissit();
});
}
function indul() {
try { epit(); } catch (e) {
gyoker.classList.remove('bb-ujugy', 'bb-ujugy-kesz');
if (window.console) console.error('[ugyintezes] ', e);
}
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', indul);
else indul();
})();
