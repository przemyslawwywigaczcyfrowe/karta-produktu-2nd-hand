// Browser build - React i lucide-react są globalami (UMD) ładowanymi z CDN
const { useState } = window.React;
const {
  Search,
  Menu,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Camera,
  Truck,
  ShieldCheck,
  RotateCw,
  Star,
  Info,
  Package,
  ExternalLink,
  MapPin,
  X,
} = window.LucideReact;

// ---------------------------------------------------------------------
// PROTOTYP MOBILE - karta produktu z wariantem "używany" (cyfrowe.pl)
// Zadanie Asana: https://app.asana.com/0/0/1211609581804503
//
// Cel mobilnej wersji:
//   - klient jednym kciukiem przełącza Nowy/Używany/Wypożycz
//   - egzemplarze używane widać jeden pod drugim, pełna szerokość
//   - stan/akcesoria/gwarancja/faktura rozwijają się pod wybranym egz.
//     (inline) - zawsze blisko decyzji, nie schowane pod CTA
//   - sticky CTA "Do koszyka" przy dolnej krawędzi viewportu - zawsze
//     dostępny, z aktualną ceną wybranego egzemplarza
//   - sekcje opisu i specyfikacji składane (accordion) dla mobile
//   - "PRODUKT UŻYWANY · Faktura {typ}" zawsze widoczny nad ceną
//     w wariancie używanym
//
// Design tokens jak na desktopowym prototypie cyfrowe.pl:
//   - font Lato, body 15px, H1 24px/weight 400/#000
//   - akcent #DD0031, body #525252, panel #F2F2F2
//   - CTA #DD0031 biały tekst, border-radius 0, font 18px weight 700
//   - taby: aktywny podkreślony 2px czerwony
// ---------------------------------------------------------------------

const RED = "#DD0031";
const BODY = "#525252";
const PANEL_BG = "#F2F2F2";
const FONT_STACK = 'Lato, "Lato Fallback", system-ui, -apple-system, sans-serif';

const WYPOZYCZ_URL =
  "https://www.cyfrowe.rent/web_store/items/918?location_id=36389";

const ALL_SALONS = [
  "Gdańsk",
  "Warszawa Mokotów",
  "Katowice",
  "Poznań",
  "Warszawa Wola",
  "Łódź",
  "Kraków",
];

// Te same dane co w desktopowym prototypie - spójność wariantów.
const VARIANTS = {
  nowy: {
    id: "nowy",
    label: "Nowy",
    price: 8490,
    oldPrice: 8990,
    discount: "-6%",
    ratyCount: 20,
    ratyAmount: 424,
    leasingRate: 125.94,
    gwarancja: "24 miesiące gwarancji producenta Canon",
    dostepnosc: "Duża ilość w magazynie",
    dostepnoscLevel: 90,
    dostepnoscColor: "#16a34a",
    deliveryTime: "Wysyłamy w 24h",
    sku: "ACFCANEOSR6MKII",
    imageLabel: "Zdjęcie producenta Canon",
    imageSubLabel: "Sprzęt fabrycznie nowy, zapakowany",
    promos: ["20 rat RRSO 0%", "Canon RF 50 mm za 1 zł"],
    salons: ALL_SALONS,
    warrantyPriceFrom: 111,
  },
  uzywany1: {
    id: "uzywany1",
    label: "Używany - egz. 1",
    serialNumber: "21203021007764",
    price: 7999,
    ratyCount: 10,
    ratyAmount: 800,
    leasingRate: 118.66,
    stanScore: "9/10",
    stanGrade: "Bardzo dobry",
    stanMechaniczny: [
      "przełączniki i pokrętła działają poprawnie",
      "przebieg migawki: 8 547 zdjęć",
    ],
    stanWizualny: [
      "drobne ślady użytkowania na obudowie (rysa na gripie)",
      "matryca i wizjer bez rys",
    ],
    akcesoria: [
      "Pudełko",
      "Ładowarka Canon LC-E6",
      "Akumulator Canon LP-E6NH",
      "Pasek naszyjny Canon",
      "Instrukcja PL",
    ],
    gwarancja: "Gwarancja rozruchowa 6 miesięcy",
    faktura: "VAT-marża",
    dostepnosc: "Ten jeden egzemplarz",
    dostepnoscLevel: 20,
    dostepnoscColor: "#d97706",
    deliveryTime: "Wysyłamy w 24h",
    sku: "ACFCANEOSR6MKII_UZ_21203021007764",
    imageLabel: "Zdjęcie tego egzemplarza",
    imageSubLabel: "Realna fotografia konkretnej sztuki",
    promos: ["Gwarancja rozruchowa 6 mc"],
    salons: ["Warszawa Mokotów"],
    warrantyPriceFrom: 104,
  },
  uzywany2: {
    id: "uzywany2",
    label: "Używany - egz. 2",
    serialNumber: "21201022008120",
    price: 7499,
    ratyCount: 10,
    ratyAmount: 750,
    leasingRate: 111.22,
    stanScore: "7/10",
    stanGrade: "Dobry",
    stanMechaniczny: [
      "przełączniki i pokrętła działają poprawnie",
      "przebieg migawki: 34 712 zdjęć",
    ],
    stanWizualny: [
      "wyraźne ślady użytkowania na gumach gripu i okularze wizjera",
      "matryca bez rys, wizjer czysty",
    ],
    akcesoria: [
      "Ładowarka zamiennikowa Patona",
      "Akumulator zamiennikowy Patona",
      "Pasek naszyjny Canon",
    ],
    gwarancja: "Gwarancja rozruchowa 6 miesięcy",
    faktura: "VAT 23%",
    dostepnosc: "Ten jeden egzemplarz",
    dostepnoscLevel: 20,
    dostepnoscColor: "#d97706",
    deliveryTime: "Wysyłamy w 24h",
    sku: "ACFCANEOSR6MKII_UZ_21201022008120",
    imageLabel: "Zdjęcie tego egzemplarza",
    imageSubLabel: "Widoczne ślady użytkowania na obudowie",
    promos: ["Gwarancja rozruchowa 6 mc", "Faktura VAT 23%"],
    salons: ["Gdańsk"],
    warrantyPriceFrom: 97,
  },
  uzywany3: {
    id: "uzywany3",
    label: "Używany - egz. 3",
    serialNumber: "21203022019455",
    price: 8299,
    ratyCount: 10,
    ratyAmount: 830,
    leasingRate: 123.08,
    stanScore: "10/10",
    stanGrade: "Jak nowy",
    stanMechaniczny: [
      "przełączniki i pokrętła działają poprawnie jak w nowym egzemplarzu",
      "przebieg migawki: 1 247 zdjęć",
    ],
    stanWizualny: ["brak widocznych śladów użytkowania"],
    akcesoria: [
      "Pudełko oryginalne Canon",
      "Ładowarka Canon LC-E6",
      "Dwa akumulatory Canon LP-E6NH",
      "Pasek naszyjny Canon",
      "Komplet dokumentacji",
    ],
    gwarancja: "Gwarancja rozruchowa 6 miesięcy",
    faktura: "VAT-marża",
    dostepnosc: "Ten jeden egzemplarz",
    dostepnoscLevel: 20,
    dostepnoscColor: "#d97706",
    deliveryTime: "Wysyłamy w 24h",
    sku: "ACFCANEOSR6MKII_UZ_21203022019455",
    imageLabel: "Zdjęcie tego egzemplarza",
    imageSubLabel: "Praktycznie jak nowy, licznik 1 247",
    promos: ["Gwarancja rozruchowa 6 mc", "Prawie nowy - tańszy o 191 zł"],
    salons: ["Kraków"],
    warrantyPriceFrom: 108,
  },
};

const SPEC_COMMON = [
  { k: "Matryca", v: "pełnoklatkowa CMOS 24,2 MP" },
  { k: "Procesor obrazu", v: "DIGIC X" },
  { k: "Czułość ISO", v: "100-102400 (rozszerzone 50-204800)" },
  { k: "Stabilizacja obrazu", v: "5-osiowa, do 8 EV" },
  { k: "Autofocus", v: "Dual Pixel CMOS AF II, 1053 punkty" },
  { k: "Zdjęcia seryjne", v: "40 kl./s (migawka elektroniczna)" },
  { k: "Wideo", v: "4K 60p bez nadpróbkowania, 6K RAW (zewnętrznie)" },
  { k: "Wizjer", v: "OLED 3,69 mln punktów, 120 Hz" },
  { k: "Ekran", v: "dotykowy 3'' odchylany 1,62 mln punktów" },
  { k: "Łączność", v: "Wi-Fi, Bluetooth, USB-C" },
  { k: "Mocowanie", v: "Canon RF" },
  { k: "Waga", v: "670 g (z akumulatorem i kartą)" },
];

const RATING = { avg: 4.8, count: 16 };

// Szerokość viewportu mobilnego, typowa dla smartfonów 390-420px
const MOBILE_WIDTH = 390;

function Stars({ value, size = 14 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{
            width: size,
            height: size,
            color: i <= Math.round(value) ? "#FFC107" : "#D1D5DB",
            fill: i <= Math.round(value) ? "#FFC107" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 50,
        padding: "6px 10px",
        fontSize: 12,
        fontWeight: 400,
        color: "#000",
        border: "1px solid #E5E5E5",
        background: "transparent",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

// Mobile header: hamburger, logo w środku, koszyk + ulubione po prawej
function MobileHeader() {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #EDEDED" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          gap: 8,
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            padding: 4,
            cursor: "pointer",
          }}
          aria-label="Menu"
        >
          <Menu style={{ width: 24, height: 24, color: "#000" }} />
        </button>
        <div
          style={{
            border: "1px solid #1a1a1a",
            padding: "4px 10px",
            fontFamily: '"Times New Roman", Times, serif',
            fontStyle: "italic",
            fontSize: 16,
            letterSpacing: "-0.3px",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          cyfr<span style={{ color: RED }}>oω</span>e.pl
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            style={{ background: "none", border: "none", padding: 4, cursor: "pointer" }}
            aria-label="Szukaj"
          >
            <Search style={{ width: 22, height: 22, color: "#000" }} />
          </button>
          <button
            style={{ background: "none", border: "none", padding: 4, cursor: "pointer", position: "relative" }}
            aria-label="Koszyk"
          >
            <ShoppingCart style={{ width: 22, height: 22, color: "#000" }} />
            <span
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                background: RED,
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                borderRadius: "50%",
                width: 14,
                height: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              0
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Mobilna nawigacja - horyzontalny scroll kategorii, biały tekst na czarnym tle
function MobileNav() {
  const items = [
    { label: "Promocje", promo: true },
    { label: "Fotografia" },
    { label: "Filmowanie" },
    { label: "Studio" },
    { label: "Drony" },
    { label: "Używane" },
    { label: "Wypożyczalnia" },
    { label: "Więcej" },
  ];
  return (
    <div style={{ background: "#000", overflowX: "auto" }}>
      <div
        style={{
          display: "flex",
          padding: "0 8px",
          gap: 0,
          fontSize: 13,
          color: "#fff",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {items.map((it) => (
          <a
            key={it.label}
            href="#"
            style={{
              padding: "14px 12px",
              color: it.promo ? RED : "#fff",
              fontWeight: it.promo ? 700 : 400,
              textDecoration: "none",
            }}
          >
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div
      style={{
        fontSize: 12,
        color: BODY,
        padding: "10px 14px",
        whiteSpace: "nowrap",
        overflowX: "auto",
      }}
    >
      <a href="#" style={{ color: BODY, textDecoration: "none" }}>Cyfrowe.pl</a>
      <span style={{ margin: "0 5px", color: "#C0C0C0" }}>/</span>
      <a href="#" style={{ color: BODY, textDecoration: "none" }}>Fotografia</a>
      <span style={{ margin: "0 5px", color: "#C0C0C0" }}>/</span>
      <a href="#" style={{ color: BODY, textDecoration: "none" }}>Bezlusterkowce</a>
      <span style={{ margin: "0 5px", color: "#C0C0C0" }}>/</span>
      <span style={{ color: "#000" }}>Canon EOS R6 mark II</span>
    </div>
  );
}

// Mobilna galeria - pełna szerokość ekranu, swipe między zdjęciami,
// kropki indeksu zdjęcia, badge z rogu
function MobileGallery({ variant }) {
  const bg = variant.id === "nowy" ? "#F7F7F7" : "#FAF6F0";
  const [activeThumb, setActiveThumb] = useState(0);
  return (
    <div style={{ position: "relative", background: bg }}>
      {/* Badge w lewym górnym rogu */}
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        {variant.id === "nowy" ? (
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#000",
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              lineHeight: 1.15,
            }}
          >
            20 RAT
            <br />
            RRSO 0%
          </div>
        ) : (
          <div
            style={{
              background: "#000",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "5px 10px",
              borderRadius: 0,
              letterSpacing: 0.3,
            }}
          >
            UŻYWANY · Stan {variant.stanScore} {variant.stanGrade}
          </div>
        )}
      </div>

      {/* Ulubione w prawym górnym rogu */}
      <button
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10,
          width: 36,
          height: 36,
          background: "rgba(255,255,255,0.9)",
          border: "1px solid #E5E5E5",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        aria-label="Dodaj do ulubionych"
      >
        <Heart style={{ width: 18, height: 18, color: "#000" }} />
      </button>

      {/* Główne zdjęcie - pełna szerokość, kwadrat */}
      <div
        style={{
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <Camera
            style={{ width: 96, height: 96, color: "#525252", margin: "0 auto 12px" }}
            strokeWidth={1}
          />
          <div style={{ fontSize: 13, color: "#000", fontWeight: 400 }}>
            {variant.imageLabel}
          </div>
          <div style={{ fontSize: 11, color: BODY, marginTop: 4 }}>
            {variant.imageSubLabel}
          </div>
          {variant.serialNumber && (
            <div style={{ marginTop: 10, fontSize: 10, color: BODY, fontFamily: "monospace" }}>
              s.n. {variant.serialNumber}
            </div>
          )}
        </div>

        {/* Kropki indeksu - typowe mobilne wskaźniki swipe */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 6,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              onClick={() => setActiveThumb(i)}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === activeThumb ? "#000" : "rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Pasek z numerem zdjęcia - prawy dolny róg */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          background: "rgba(0,0,0,0.6)",
          color: "#fff",
          fontSize: 11,
          padding: "3px 8px",
          borderRadius: 0,
        }}
      >
        {activeThumb + 1} / 7
      </div>
    </div>
  );
}

// Mobilne taby - pełna szerokość, równe kolumny, horizontal scroll jeśli potrzeba
function VariantTabsMobile({ variantId, setVariantId }) {
  const isUzywanyActive = variantId.startsWith("uzywany");

  const tabBase = {
    flex: 1,
    padding: "14px 8px",
    fontSize: 14,
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    fontFamily: FONT_STACK,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    textDecoration: "none",
    marginBottom: -1,
    lineHeight: 1.2,
    textAlign: "center",
  };
  const tabActive = {
    ...tabBase,
    fontWeight: 700,
    color: "#000",
    borderBottom: `2px solid ${RED}`,
  };
  const tabInactive = {
    ...tabBase,
    fontWeight: 400,
    color: BODY,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        borderBottom: "1px solid #E5E5E5",
        background: "#fff",
      }}
    >
      <button
        style={variantId === "nowy" ? tabActive : tabInactive}
        onClick={() => setVariantId("nowy")}
      >
        Nowy
      </button>
      <button
        style={isUzywanyActive ? tabActive : tabInactive}
        onClick={() => {
          if (!isUzywanyActive) setVariantId("uzywany1");
        }}
      >
        Używany
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            background: "#F2F2F2",
            color: "#000",
            borderRadius: 50,
            padding: "2px 6px",
          }}
        >
          3
        </span>
      </button>
      <a
        href={WYPOZYCZ_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={tabInactive}
        title="Otwiera się w nowej karcie - cyfrowe.rent"
      >
        Wypożycz
        <ExternalLink style={{ width: 12, height: 12, color: BODY }} />
      </a>
    </div>
  );
}

// Mobilna lista egzemplarzy używanych - karty pełnej szerokości,
// stan/akcesoria/gwarancja/faktura rozwijają się inline pod wybranym
function UsedInstancesList({ variantId, setVariantId }) {
  const uzywaneIds = ["uzywany1", "uzywany2", "uzywany3"];
  return (
    <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 13, color: BODY, marginBottom: 2 }}>
        Wybierz konkretny egzemplarz używany:
      </div>
      {uzywaneIds.map((id) => {
        const v = VARIANTS[id];
        const selected = variantId === id;
        return (
          <div
            key={id}
            style={{
              border: selected ? `2px solid ${RED}` : "1px solid #E5E5E5",
              background: "#fff",
              borderRadius: 0,
            }}
          >
            <button
              onClick={() => setVariantId(id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: 12,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: FONT_STACK,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: "#FAF6F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Camera style={{ width: 24, height: 24, color: BODY }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Tytuł = ocena stanu (to co klient porównuje między egz.).
                      Badge obok = sama liczba ze skali (9/10), bez powtarzania
                      oceny słownej, żeby nie było redundancji. */}
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span>Stan: {v.stanGrade}</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        background: "#000",
                        color: "#fff",
                        borderRadius: 50,
                        padding: "2px 7px",
                      }}
                    >
                      {v.stanScore}
                    </span>
                  </div>
                  {/* Gwarancja z ikoną tarczy - jedyna informacja pod tytułem
                      (poza ceną). Akcesoria i faktura pokazują się po wyborze. */}
                  <div
                    style={{
                      fontSize: 11,
                      color: BODY,
                      marginTop: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <ShieldCheck
                      style={{ width: 12, height: 12, color: "#16a34a", flexShrink: 0 }}
                    />
                    {v.gwarancja}
                  </div>
                  {/* Cena - bez pastylki "wybrany"; wybór pokazuje sama
                      obwódka karty (2px czerwona) i rozwinięte szczegóły. */}
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#000",
                      marginTop: 6,
                    }}
                  >
                    {v.price.toLocaleString("pl-PL")} zł
                  </div>
                </div>
              </div>
            </button>

            {selected && (
              <div style={{ padding: "0 12px 12px 12px", fontSize: 13, color: BODY }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#000",
                    marginTop: 4,
                    marginBottom: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <ShieldCheck style={{ width: 13, height: 13 }} />
                  Stan mechaniczny
                </div>
                <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.5 }}>
                  {v.stanMechaniczny.map((d) => (
                    <li key={d} style={{ marginBottom: 2 }}>
                      {d}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#000",
                    margin: "10px 0 4px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Info style={{ width: 13, height: 13 }} />
                  Stan wizualny
                </div>
                <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.5 }}>
                  {v.stanWizualny.map((d) => (
                    <li key={d} style={{ marginBottom: 2 }}>
                      {d}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#000",
                    margin: "10px 0 4px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Package style={{ width: 13, height: 13 }} />
                  W zestawie
                </div>
                <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.5 }}>
                  {v.akcesoria.map((a) => (
                    <li key={a} style={{ marginBottom: 2 }}>
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Gwarancja jest już w nagłówku karty egzemplarza (z ikoną
                    tarczy); faktura - w czarnym banerze nad zakładkami. */}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Cena + raty na mobile - większy font ceny, mniejszy body
function PriceBlockMobile({ variant }) {
  return (
    <div style={{ padding: "16px 14px 0 14px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: "#000", lineHeight: 1 }}>
          {variant.price.toLocaleString("pl-PL")} zł
        </div>
        {variant.oldPrice && (
          <>
            <span style={{ fontSize: 14, color: BODY, textDecoration: "line-through" }}>
              {variant.oldPrice.toLocaleString("pl-PL")} zł
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                background: RED,
                borderRadius: 50,
                padding: "2px 8px",
                lineHeight: 1.2,
              }}
            >
              {variant.discount}
            </span>
          </>
        )}
      </div>
      {variant.ratyCount && (
        <div style={{ fontSize: 13, color: BODY, marginTop: 6, lineHeight: 1.6 }}>
          Raty RRSO 0%:{" "}
          <a href="#" style={{ color: "#000", fontWeight: 700, textDecoration: "underline" }}>
            {variant.ratyCount} x {variant.ratyAmount} zł
          </a>
        </div>
      )}
    </div>
  );
}

// Promocyjne pigułki - horyzontalny scroll na mobile
function PromoPills({ promos }) {
  if (!promos || promos.length === 0) return null;
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        padding: "10px 14px 0 14px",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {promos.map((p) => (
        <Pill key={p}>{p}</Pill>
      ))}
    </div>
  );
}

// Accordion - składane sekcje (opis, specyfikacja, dostawa, opinie)
function Accordion({ title, icon: Icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: "1px solid #E5E5E5" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "#fff",
          border: "none",
          padding: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: FONT_STACK,
          fontSize: 15,
          fontWeight: 700,
          color: "#000",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {Icon && <Icon style={{ width: 18, height: 18, color: "#000" }} />}
          {title}
        </span>
        {open ? (
          <ChevronUp style={{ width: 20, height: 20, color: BODY }} />
        ) : (
          <ChevronDown style={{ width: 20, height: 20, color: BODY }} />
        )}
      </button>
      {open && <div style={{ padding: "0 14px 14px 14px" }}>{children}</div>}
    </div>
  );
}

function DeliveryAccordionContent({ variant }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: variant.dostepnoscColor,
            display: "inline-block",
          }}
        />
        <div>
          <div style={{ color: "#000", fontWeight: 700 }}>{variant.deliveryTime}</div>
          <div style={{ fontSize: 12, color: BODY }}>{variant.dostepnosc}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Truck style={{ width: 16, height: 16, color: BODY }} />
        <a href="#" style={{ color: "#000", textDecoration: "underline" }}>
          Darmowa dostawa
        </a>
      </div>
      {/* Salon(y) odbioru - dla używanego tylko JEDEN, gdzie fizycznie leży
          ten egzemplarz. Aktualizuje się wraz z wyborem egzemplarza. */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <MapPin style={{ width: 16, height: 16, color: BODY, marginTop: 2 }} />
        <div>
          <a href="#" style={{ color: "#000", textDecoration: "underline" }}>
            {variant.salons.length === 1
              ? "Darmowy odbiór osobisty w salonie"
              : "Darmowy odbiór w salonach"}
          </a>
          <div
            style={{
              fontSize: 11,
              color: BODY,
              marginTop: 3,
              display: "flex",
              flexWrap: "wrap",
              gap: "3px 8px",
            }}
          >
            {variant.salons.map((c) => (
              <span key={c} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a" }} />
                {c}
                {variant.salons.length === 1 && (
                  <span style={{ color: "#A3A3A3", fontSize: 10 }}>
                    (tam leży ten egzemplarz)
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Cena ubezpieczenia/gwarancji zależy od wartości egzemplarza. */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ShieldCheck style={{ width: 16, height: 16, color: BODY }} />
        <a href="#" style={{ color: "#000", textDecoration: "underline" }}>
          Dodatkowa gwarancja lub ubezpieczenie już od {variant.warrantyPriceFrom} zł
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <RotateCw style={{ width: 16, height: 16, color: BODY }} />
        <a href="#" style={{ color: "#000", textDecoration: "underline" }}>
          Sprzedaj swój stary sprzęt
        </a>
      </div>
    </div>
  );
}

// Sticky CTA przy dolnej krawędzi - zawsze dostępny, pokazuje aktualną
// cenę wybranego egzemplarza. NA mobile to standard w e-commerce.
function StickyCta({ variant }) {
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        borderTop: "1px solid #E5E5E5",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
        zIndex: 100,
      }}
    >
      <div style={{ flex: "0 0 auto" }}>
        <div
          style={{
            fontSize: 10,
            color: BODY,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {variant.id === "nowy" ? "Nowy" : `Egz. ${variant.id.slice(-1)}`}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#000", lineHeight: 1.2 }}>
          {variant.price.toLocaleString("pl-PL")} zł
        </div>
      </div>
      <button
        style={{
          flex: 1,
          background: RED,
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: FONT_STACK,
          border: "none",
          borderRadius: 0,
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <ShoppingCart style={{ width: 18, height: 18 }} />
        Do koszyka
      </button>
    </div>
  );
}

// Banner PRODUKT UŻYWANY + typ faktury - na mobile pełna szerokość,
// bez paddingu od krawędzi bocznych ekranu
function UsedBannerMobile({ variant }) {
  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        padding: "10px 14px",
        fontSize: 12,
        lineHeight: 1.4,
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontWeight: 700, letterSpacing: 0.3 }}>PRODUKT UŻYWANY</span>
      <span style={{ color: "#A3A3A3" }}>·</span>
      <span>
        Faktura <strong style={{ fontWeight: 700 }}>{variant.faktura}</strong>
      </span>
    </div>
  );
}

function PrototypeHeader({ variantId }) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        color: "#E5E5E5",
        fontSize: 11,
        padding: "6px 14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <span>
          <strong style={{ color: "#fff" }}>PROTOTYP MOBILE</strong> ·{" "}
          <a
            href="https://app.asana.com/0/0/1211609581804503"
            style={{ color: "#FF8FA3", textDecoration: "underline" }}
          >
            Asana
          </a>
        </span>
        <span style={{ fontFamily: "monospace", color: "#A3A3A3" }}>
          wariant: <span style={{ color: "#FF8FA3" }}>{variantId}</span>
        </span>
      </div>
    </div>
  );
}

function ProductPagePrototypeMobile() {
  const [variantId, setVariantId] = useState("nowy");
  const variant = VARIANTS[variantId];
  const isUsed = variantId.startsWith("uzywany");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F2F2F2",
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
        fontFamily: FONT_STACK,
      }}
    >
      {/* Ramka symulująca ekran telefonu - dla testowania na desktopie.
          Na prawdziwym urządzeniu ten wrapper byłby po prostu body. */}
      <div
        style={{
          width: MOBILE_WIDTH,
          maxWidth: "100%",
          background: "#fff",
          color: BODY,
          fontSize: 14,
          fontFamily: FONT_STACK,
          fontWeight: 400,
          position: "relative",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          border: "1px solid #E5E5E5",
          display: "flex",
          flexDirection: "column",
          minHeight: 844,
        }}
      >
        <PrototypeHeader variantId={variantId} />
        <MobileHeader />
        <MobileNav />

        {/* Scrollowalna zawartość - skrolujemy w obrębie ramki, sticky CTA
            na dole. Na rzeczywistym telefonie skrolujemy cały document. */}
        <div style={{ flex: 1, overflow: "auto", paddingBottom: 4 }}>
          <Breadcrumb />

          {/* Tytuł + rating - NAD galerią na mobile, żeby klient od razu
              wiedział na co patrzy (tak jak na cyfrowe.pl mobile) */}
          <div style={{ padding: "0 14px 12px 14px" }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: "#000",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Aparat cyfrowy Canon EOS R6 mark II
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <Stars value={RATING.avg} size={14} />
              <a href="#" style={{ fontSize: 12, color: "#000", textDecoration: "underline" }}>
                {RATING.avg}/5 ({RATING.count} opinii)
              </a>
            </div>
          </div>

          {/* Galeria - pełna szerokość ekranu */}
          <MobileGallery variant={variant} />

          {/* Banner "PRODUKT UŻYWANY · Faktura X" tylko dla używanych */}
          {isUsed && <UsedBannerMobile variant={variant} />}

          {/* Taby Nowy / Używany / Wypożycz */}
          <VariantTabsMobile variantId={variantId} setVariantId={setVariantId} />

          {/* Lista egzemplarzy używanych z rozwiniętym szczegółem wybranego */}
          {isUsed && (
            <UsedInstancesList variantId={variantId} setVariantId={setVariantId} />
          )}

          {/* Pigułki promocyjne - TYLKO dla wariantu NOWY. Dla używanego
              wszystkie istotne info są już w badge stanu, banerze faktury i
              nagłówku egzemplarza. */}
          {!isUsed && <PromoPills promos={variant.promos} />}

          {/* Cena + raty - widoczne w kontencie (osobno niż sticky CTA,
              żeby dawał pełną informację o racie, leasingu) */}
          <div style={{ background: PANEL_BG, marginTop: 16, paddingBottom: 16 }}>
            <PriceBlockMobile variant={variant} />
            <div style={{ padding: "12px 14px 0 14px" }}>
              <div style={{ fontSize: 13, color: BODY }}>
                Leasing:{" "}
                <a href="#" style={{ color: "#000", fontWeight: 700, textDecoration: "underline" }}>
                  rata od {variant.leasingRate.toFixed(2).replace(".", ",")} zł
                </a>
              </div>
            </div>
          </div>

          {/* Accordiony - składane sekcje typowe dla mobile e-commerce */}
          <Accordion title="Dostawa i odbiór" icon={Truck} defaultOpen={true}>
            <DeliveryAccordionContent variant={variant} />
          </Accordion>

          <Accordion title="Opis produktu" icon={Info}>
            <p style={{ fontSize: 13, color: BODY, lineHeight: 1.6, margin: 0 }}>
              Canon EOS R6 mark II to następca cenionego R6, który trafił w ręce
              tysięcy fotografów i filmowców. Pełnoklatkowa matryca 24,2 MP,
              stabilizacja do 8 EV, Dual Pixel CMOS AF II z 1053 punktami i
              nagrywanie wideo 4K 60p bez nadpróbkowania robią z tego aparatu
              uniwersalne narzędzie do pracy.
            </p>
            <div
              style={{
                marginTop: 10,
                background: "#F2F2F2",
                padding: 10,
                fontSize: 12,
                color: BODY,
                lineHeight: 1.4,
              }}
            >
              <span style={{ color: "#000", fontWeight: 700 }}>
                Wspólny opis dla wszystkich wariantów.
              </span>{" "}
              Nowy i używany to ten sam model aparatu, dlatego opis i
              specyfikacja są takie same.
            </div>
          </Accordion>

          <Accordion title="Specyfikacja techniczna" icon={Package}>
            <dl style={{ fontSize: 12, margin: 0 }}>
              {SPEC_COMMON.map((s) => (
                <div
                  key={s.k}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1.5fr",
                    gap: 8,
                    padding: "7px 0",
                    borderBottom: "1px solid #EDEDED",
                  }}
                >
                  <dt style={{ color: BODY, margin: 0 }}>{s.k}</dt>
                  <dd style={{ color: "#000", margin: 0 }}>{s.v}</dd>
                </div>
              ))}
            </dl>
          </Accordion>

          <Accordion title={`Opinie (${RATING.count})`} icon={Star}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#000" }}>
                {RATING.avg}/5
              </div>
              <div>
                <Stars value={RATING.avg} size={16} />
                <div style={{ fontSize: 11, color: BODY, marginTop: 2 }}>
                  na podstawie {RATING.count} opinii
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: BODY, lineHeight: 1.5 }}>
              Po konsolidacji opinie są wspólne dla nowego i używanego - ten
              sam model, ta sama karta, jeden zestaw opinii.
            </div>
          </Accordion>

          {/* Dodatkowy spacer żeby ostatni element nie chował się pod
              sticky CTA */}
          <div style={{ height: 24 }} />
        </div>

        {/* Sticky CTA - zawsze przy dolnej krawędzi */}
        <StickyCta variant={variant} />
      </div>
    </div>
  );
}

// --- Render do DOM ---
window.ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductPagePrototypeMobile />
);
