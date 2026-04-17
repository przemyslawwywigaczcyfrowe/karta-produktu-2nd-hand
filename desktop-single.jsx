// Browser build - React i lucide-react są globalami (UMD) ładowanymi z CDN
const { useState } = window.React;
const {
  Search,
  User,
  Phone,
  Heart,
  ShoppingCart,
  MapPin,
  Truck,
  ShieldCheck,
  RotateCw,
  Star,
  ChevronLeft,
  ChevronRight,
  Camera,
  Info,
  Package,
  ExternalLink,
} = window.LucideReact;

// ---------------------------------------------------------------------
// PROTOTYP - karta produktu z wariantem "używany" (pixel-perfect wg cyfrowe.pl)
// Zadanie Asana: https://app.asana.com/0/0/1211609581804503
//
// Klucze designu (wyciągnięte z żywej strony cyfrowe.pl):
//   - font: Lato, base 15px, body color #525252, H1 color #000 weight 400
//   - akcent: #DD0031 (czerwony Cyfrowe)
//   - CTA "Do koszyka": background #DD0031, color white, border-radius 0,
//     padding 0 30px, font-size 20px, weight 700
//   - szary blok z ceną/CTA: #F2F2F2, padding 24px 30px, border-radius 0
//   - czarny pasek główny menu: #000, wysokość 71px
//   - pigułki promocyjne: okrągłe (radius 50px), transparent bg, czarny tekst
//   - badge -% rabatu: biały tekst na #DD0031, radius 50px, 13px weight 700
//   - linki podkreślone: kolor czarny (a nie czerwony)
//
// Taby Nowy / Używany / Wypożycz - tak jak na żywej stronie cyfrowe.pl dzisiaj:
//   - trzy zakładki obok siebie, "Wypożycz" jako zakładka prowadząca do
//     zewnętrznego serwisu cyfrowe.rent (link target="_blank", ikona External)
//   - aktywny tab podkreślony cienką czerwoną kreską #DD0031
//
// Szczegóły egzemplarza (stan, akcesoria, gwarancja) wyświetlają się
// BEZPOŚREDNIO W WYBRANEJ KARCIE EGZEMPLARZA na liście wariantu używanego -
// nie pod CTA, żeby nie rozpychać kontentu w dół i żeby informacja była
// blisko punktu decyzji klienta przy przełączaniu między egzemplarzami.
// ---------------------------------------------------------------------

const RED = "#DD0031";
const BODY = "#525252";
const PANEL_BG = "#F2F2F2";
const FONT_STACK = 'Lato, "Lato Fallback", system-ui, -apple-system, sans-serif';

const WYPOZYCZ_URL =
  "https://www.cyfrowe.rent/web_store/items/918?location_id=36389";

// Salony Cyfrowe - używamy do pokazywania gdzie jest konkretny egzemplarz
const ALL_SALONS = [
  "Gdańsk",
  "Warszawa Mokotów",
  "Katowice",
  "Poznań",
  "Warszawa Wola",
  "Łódź",
  "Kraków",
];

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
    gwarancjaShort: "24 mc Canon",
    dostepnosc: "Duża ilość w magazynie",
    dostepnoscLevel: 90,
    dostepnoscColor: "#16a34a",
    deliveryTime: "Wysyłamy w 24h",
    sku: "ACFCANEOSR6MKII",
    imageLabel: "Zdjęcie producenta Canon",
    imageSubLabel: "Sprzęt fabrycznie nowy, zapakowany",
    promos: ["20 rat RRSO 0%", "Canon RF 50 mm za 1 zł"],
    // Dla nowego - sprzęt jest w magazynie centralnym, odbiór możliwy we
    // wszystkich salonach. Warranty/ubezpieczenie - cena "od 111 zł".
    salons: ALL_SALONS,
    warrantyPriceFrom: 111,
  },
  // STRUKTURA EGZEMPLARZY = zgodna z rzeczywistymi kartami używanymi cyfrowe.pl:
  //  - stanScore: "9/10", stanGrade: "Bardzo dobry"
  //  - stanMechaniczny: (tekst dot. sprawności, przebieg migawki)
  //  - stanWizualny: (tekst dot. wyglądu)
  //  - gwarancja: domyślnie "Gwarancja rozruchowa 6 miesięcy"
  //  - faktura: "VAT-marża" LUB "VAT 23%" - różni się per egzemplarz!
  //  - akcesoria (w zestawie - bullety)
  // WARIANT SINGLE-INSTANCE: w realiach cyfrowe.pl najczęściej mamy tylko
  // 1 egzemplarz używany danego modelu (bo każdy używany to unikat).
  // Dlatego w tym prototypie nie robimy listy wyboru - pokazujemy od razu
  // szczegóły jedynego egzemplarza.
  uzywany: {
    id: "uzywany",
    label: "Używany",
    serialNumber: "21203021007764",
    price: 7999,
    oldPrice: null,
    discount: null,
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
    // Egzemplarz fizycznie w salonie Warszawa Mokotów - tam odbiór osobisty
    salons: ["Warszawa Mokotów"],
    warrantyPriceFrom: 104,
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

function Stars({ value, size = 14 }) {
  return (
    <div className="flex items-center" style={{ gap: 2 }}>
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

// Pigułka promocyjna (np. "20 rat RRSO 0%") - na cyfrowe.pl: border-radius
// 50px, transparent bg, czarny tekst, subtelny border.
function Pill({ children }) {
  return (
    <span
      className="inline-flex items-center"
      style={{
        borderRadius: 50,
        padding: "7.5px 12px",
        fontSize: 13,
        fontWeight: 400,
        color: "#000",
        border: "1px solid #E5E5E5",
        background: "transparent",
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

function Logo() {
  return (
    <div
      className="select-none"
      style={{
        border: "1px solid #1a1a1a",
        padding: "6px 12px",
        fontFamily: '"Times New Roman", Times, serif',
        fontStyle: "italic",
        fontSize: 18,
        letterSpacing: "-0.3px",
        lineHeight: 1,
      }}
    >
      cyfr<span style={{ color: RED }}>oω</span>e.pl
    </div>
  );
}

function TopBar() {
  const cities = [
    "Gdańsk",
    "Katowice",
    "Kraków",
    "Łódź",
    "Poznań",
    "Warszawa Mokotów",
    "Warszawa Wola",
  ];
  return (
    <div style={{ background: "#FFFFFF", borderBottom: "1px solid #EDEDED" }}>
      <div
        className="max-w-7xl mx-auto px-4 flex items-center justify-end flex-wrap"
        style={{
          padding: "6px 16px",
          fontSize: 12,
          color: BODY,
          gap: 4,
        }}
      >
        <MapPin style={{ width: 12, height: 12, color: BODY }} />
        {cities.map((c, i) => (
          <span key={c}>
            <a href="#" style={{ color: BODY, textDecoration: "none" }}>
              {c}
            </a>
            {i < cities.length - 1 && (
              <span style={{ margin: "0 8px", color: "#D4D4D4" }}>|</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{ background: "#fff" }}>
      <div
        className="max-w-7xl mx-auto"
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Logo />
        <div style={{ flex: 1, position: "relative" }}>
          <input
            style={{
              width: "100%",
              border: "1px solid #D4D4D4",
              borderRadius: 0,
              padding: "10px 50px 10px 16px",
              fontSize: 15,
              fontFamily: FONT_STACK,
              outline: "none",
              color: "#000",
            }}
            placeholder="Znajdź produkt..."
            defaultValue="canon r6 mark ii"
          />
          <button
            style={{
              position: "absolute",
              right: 4,
              top: 4,
              bottom: 4,
              width: 40,
              background: "#F2F2F2",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            <Search style={{ width: 18, height: 18, color: "#000" }} />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 12, color: "#000" }}>
          {[
            { icon: User, label: "Zaloguj" },
            { icon: Phone, label: "Kontakt" },
            { icon: Heart, label: "Ulubione" },
            { icon: ShoppingCart, label: "Koszyk" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <Icon style={{ width: 20, height: 20 }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Główny pasek nawigacji - czarny, wysokość 71px, białe linki bez podkreślenia
function Nav() {
  const items = [
    { label: "Promocje", promo: true },
    { label: "Fotografia" },
    { label: "Filmowanie" },
    { label: "Studio" },
    { label: "Druk i edycja" },
    { label: "Drony" },
    { label: "Obserwacja" },
    { label: "Fot. mobile" },
    { label: "Fot. analogowa" },
    { label: "Używane" },
    { label: "Sprzedaj używane" },
    { label: "Wypożyczalnia" },
    { label: "Więcej" },
  ];
  return (
    <div style={{ background: "#000", height: 71 }}>
      <div
        className="max-w-7xl mx-auto"
        style={{
          padding: "0 16px",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 0,
            fontSize: 14,
            color: "#fff",
            width: "100%",
            overflowX: "auto",
          }}
        >
          {items.map((it) => (
            <a
              key={it.label}
              href="#"
              style={{
                whiteSpace: "nowrap",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                color: it.promo ? RED : "#fff",
                fontWeight: it.promo ? 700 : 400,
                textDecoration: "none",
              }}
            >
              {it.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div style={{ fontSize: 13, color: BODY, padding: "12px 0" }}>
      <a href="#" style={{ color: BODY, textDecoration: "none" }}>Cyfrowe.pl</a>
      <span style={{ margin: "0 6px", color: "#C0C0C0" }}>/</span>
      <a href="#" style={{ color: BODY, textDecoration: "none" }}>Fotografia</a>
      <span style={{ margin: "0 6px", color: "#C0C0C0" }}>/</span>
      <a href="#" style={{ color: BODY, textDecoration: "none" }}>Aparaty cyfrowe</a>
      <span style={{ margin: "0 6px", color: "#C0C0C0" }}>/</span>
      <a href="#" style={{ color: BODY, textDecoration: "none" }}>Bezlusterkowce</a>
      <span style={{ margin: "0 6px", color: "#C0C0C0" }}>/</span>
      <span style={{ color: "#000" }}>Aparat cyfrowy Canon EOS R6 mark II</span>
    </div>
  );
}

function ProductGallery({ variant }) {
  const bg = variant.id === "nowy" ? "#F7F7F7" : "#FAF6F0";
  return (
    <div style={{ position: "relative" }}>
      {/* Badge - 20 rat RRSO 0% dla wariantu nowy, plakietka dla używanego */}
      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10 }}>
        {variant.id === "nowy" ? (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#000",
              color: "#fff",
              fontSize: 10,
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
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 12px",
              borderRadius: 0,
              letterSpacing: 0.3,
            }}
          >
            UŻYWANY · Stan {variant.stanScore} {variant.stanGrade}
          </div>
        )}
      </div>

      {/* Główne zdjęcie */}
      <div
        style={{
          position: "relative",
          background: bg,
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            background: "#fff",
            border: "1px solid #E5E5E5",
            borderRadius: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft style={{ width: 18, height: 18, color: "#000" }} />
        </button>
        <button
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            background: "#fff",
            border: "1px solid #E5E5E5",
            borderRadius: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronRight style={{ width: 18, height: 18, color: "#000" }} />
        </button>
        <div style={{ textAlign: "center", padding: "0 32px" }}>
          <Camera
            style={{ width: 128, height: 128, color: "#525252", margin: "0 auto 16px" }}
            strokeWidth={1}
          />
          <div style={{ fontSize: 14, color: "#000", fontWeight: 400 }}>{variant.imageLabel}</div>
          <div style={{ fontSize: 12, color: BODY, marginTop: 4 }}>{variant.imageSubLabel}</div>
          {variant.serialNumber && (
            <div style={{ marginTop: 12, fontSize: 11, color: BODY, fontFamily: "monospace" }}>
              s.n. {variant.serialNumber}
            </div>
          )}
        </div>
      </div>

      {/* Miniatury */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <button
            key={i}
            style={{
              width: 64,
              height: 64,
              background: bg,
              border: i === 1 ? `2px solid ${RED}` : "1px solid #E5E5E5",
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Camera style={{ width: 26, height: 26, color: "#525252" }} strokeWidth={1} />
          </button>
        ))}
      </div>
    </div>
  );
}

// Taby Nowy / Używany / Wypożycz - tak jak na żywej stronie cyfrowe.pl.
// "Wypożycz" to zakładka z linkiem zewnętrznym (target="_blank") do
// cyfrowe.rent - pozostaje w formie zakładki, żeby nie zmieniać UX karty.
// Pod listą egzemplarzy rozwija się szczegół wybranego egzemplarza inline
// (stan + akcesoria + gwarancja) - blisko wyboru, zamiast pod CTA.
function VariantTabs({ variantId, setVariantId }) {
  const isUzywanyActive = variantId === "uzywany";
  const v = VARIANTS.uzywany;

  const tabBase = {
    padding: "12px 20px",
    fontSize: 15,
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    fontFamily: FONT_STACK,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    marginBottom: -1,
    lineHeight: 1,
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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          borderBottom: "1px solid #E5E5E5",
          marginBottom: 16,
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
          onClick={() => setVariantId("uzywany")}
        >
          Używany
        </button>
        {/* Wypożycz - zakładka prowadząca do zewnętrznego serwisu cyfrowe.rent */}
        <a
          href={WYPOZYCZ_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={tabInactive}
          title="Otwiera się w nowej karcie - cyfrowe.rent"
        >
          Wypożycz
          <ExternalLink style={{ width: 13, height: 13, color: BODY }} />
        </a>
      </div>

      {/* SINGLE-INSTANCE: tylko 1 egzemplarz używany, więc zamiast listy
          wyboru pokazujemy od razu rozwinięte szczegóły tego jednego
          egzemplarza. Klient nie wybiera - widzi co dokładnie dostaje. */}
      {isUzywanyActive && (
        <div
          style={{
            border: "1px solid #E5E5E5",
            background: "#fff",
            borderRadius: 0,
            marginBottom: 16,
          }}
        >
          <div style={{ padding: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "#FAF6F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Camera style={{ width: 20, height: 20, color: BODY }} />
              </div>
              <div style={{ flex: 1 }}>
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
                      fontSize: 11,
                      fontWeight: 700,
                      background: "#000",
                      color: "#fff",
                      borderRadius: 50,
                      padding: "2px 8px",
                    }}
                  >
                    {v.stanScore}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: BODY,
                    marginTop: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <ShieldCheck style={{ width: 13, height: 13, color: "#16a34a" }} />
                  {v.gwarancja}
                </div>
              </div>
            </div>
          </div>

          {/* Szczegóły stanu/akcesoriów - zawsze rozwinięte, bo jest tylko
              1 egzemplarz i nie ma czego porównywać/wybierać. */}
          <div
            style={{
              padding: "0 12px 12px 12px",
              fontSize: 13,
              color: BODY,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#000",
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ShieldCheck style={{ width: 13, height: 13 }} />
                Stan mechaniczny
              </div>
              <ul style={{ paddingLeft: 16, margin: 0, lineHeight: 1.5 }}>
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
              <ul style={{ paddingLeft: 16, margin: 0, lineHeight: 1.5 }}>
                {v.stanWizualny.map((d) => (
                  <li key={d} style={{ marginBottom: 2 }}>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#000",
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Package style={{ width: 13, height: 13 }} />
                W zestawie
              </div>
              <ul style={{ paddingLeft: 16, margin: 0, lineHeight: 1.5 }}>
                {v.akcesoria.map((a) => (
                  <li key={a} style={{ marginBottom: 2 }}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Cena - na cyfrowe.pl czarna, 36px, weight 700; stara cena przekreślona,
// badge -% to biały tekst na czerwonej pigułce (radius 50px)
function PricePanel({ variant }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: "#000", lineHeight: 1 }}>
          {variant.price.toLocaleString("pl-PL")} zł
        </div>
        {variant.oldPrice && (
          <>
            <span style={{ fontSize: 15, color: BODY, textDecoration: "line-through" }}>
              {variant.oldPrice.toLocaleString("pl-PL")} zł
            </span>
            <span
              style={{
                fontSize: 13,
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
        <div style={{ fontSize: 14, color: BODY, lineHeight: 1.6 }}>
          <div>
            Raty RRSO 0%:{" "}
            <a href="#" style={{ color: "#000", fontWeight: 700, textDecoration: "underline" }}>
              {variant.ratyCount} x {variant.ratyAmount} zł
            </a>
          </div>
          <div>
            Leasing:{" "}
            <a href="#" style={{ color: "#000", fontWeight: 700, textDecoration: "underline" }}>
              rata od {variant.leasingRate.toFixed(2).replace(".", ",")}zł
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// Przycisk "Do koszyka" - TYLKO na cyfrowe.pl: #DD0031, border-radius 0,
// font-size 20px, weight 700, padding 0 30px
function AddToCartBlock({ variant }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 8, marginTop: 16 }}>
      <button
        style={{
          flex: 1,
          background: RED,
          color: "#fff",
          fontSize: 20,
          fontWeight: 700,
          fontFamily: FONT_STACK,
          border: "none",
          borderRadius: 0,
          padding: "14px 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <ShoppingCart style={{ width: 20, height: 20 }} />
        Do koszyka
      </button>
      <button
        style={{
          width: 52,
          background: "#fff",
          border: "1px solid #D4D4D4",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        title="Dodaj do ulubionych"
      >
        <Heart style={{ width: 20, height: 20, color: "#000" }} />
      </button>
      {variant.id === "nowy" && (
        <button
          style={{
            background: "#fff",
            border: "1px solid #D4D4D4",
            borderRadius: 0,
            padding: "0 18px",
            fontSize: 14,
            color: "#000",
            fontFamily: FONT_STACK,
            cursor: "pointer",
          }}
        >
          Zapytaj o ofertę
        </button>
      )}
    </div>
  );
}

// Dla wariantu NOWY: dopasowany zestaw (Canon RF 50mm 1zł itp.).
// Dla wariantu używanego nie renderujemy nic - szczegóły są w liście
// egzemplarzy bezpośrednio przy wybranym egzemplarzu, żeby nie rozpychać
// kontentu pod CTA.
function VariantDetails({ variant }) {
  if (variant.id !== "nowy") return null;
  return (
    <div
      style={{
        marginTop: 16,
        background: "#fff",
        padding: 12,
        border: "1px solid #E5E5E5",
        borderRadius: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Camera style={{ width: 24, height: 24, color: BODY }} />
          <span style={{ fontSize: 18, color: "#C0C0C0" }}>+</span>
          <Camera style={{ width: 24, height: 24, color: BODY }} />
        </div>
        <div style={{ flex: 1, fontSize: 14 }}>
          <a href="#" style={{ color: "#000", fontWeight: 700, textDecoration: "underline" }}>
            Wybierz swój zestaw
          </a>
          <div style={{ fontSize: 12, color: BODY }}>Drugi produkt już od 1 zł</div>
        </div>
      </div>
    </div>
  );
}

function DeliveryInfo({ variant }) {
  return (
    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
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
          <div style={{ fontSize: 12, color: BODY, display: "flex", alignItems: "center", gap: 8 }}>
            {variant.dostepnosc}
            <span
              style={{
                display: "inline-block",
                width: 64,
                height: 5,
                background: "#E5E5E5",
                overflow: "hidden",
                borderRadius: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  height: "100%",
                  width: `${variant.dostepnoscLevel}%`,
                  background: variant.dostepnoscColor,
                }}
              />
            </span>
            <span style={{ color: "#A3A3A3" }}>Zaktualizowano o 15:10</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Truck style={{ width: 16, height: 16, color: BODY }} />
        <a href="#" style={{ color: "#000", textDecoration: "underline" }}>
          Darmowa dostawa
        </a>
      </div>
      {/* Salon(y) odbioru - dla nowego wszystkie magazyny, dla używanego
          konkretny salon gdzie fizycznie leży ten egzemplarz. Aktualizuje
          się wraz ze zmianą wybranego egz. */}
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
              fontSize: 12,
              color: BODY,
              marginTop: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: "4px 10px",
            }}
          >
            {variant.salons.map((c) => (
              <span key={c} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                {c}
                {variant.salons.length === 1 && (
                  <span style={{ color: "#A3A3A3", fontSize: 11 }}>
                    (tam leży ten egzemplarz)
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Cena ubezpieczenia zależy od wartości egzemplarza - aktualizuje
          się wraz ze zmianą wybranego wariantu. */}
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

function PurchasePanel({ variantId, setVariantId }) {
  const variant = VARIANTS[variantId];
  const isUsed = variantId.startsWith("uzywany");
  return (
    <div>
      {/* Banner "PRODUKT UŻYWANY" + typ faktury - obecny NA każdej karcie
          używanej na cyfrowe.pl. Typ faktury (VAT-marża lub VAT 23%) RÓŻNI SIĘ
          per egzemplarz, stąd wyciągamy z wybranego wariantu. */}
      {isUsed && (
        <div
          style={{
            background: "#000",
            color: "#fff",
            padding: "10px 14px",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.3,
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span>PRODUKT UŻYWANY</span>
          <span style={{ color: "#A3A3A3", fontWeight: 400 }}>·</span>
          <span style={{ fontWeight: 400 }}>
            Na ten egzemplarz wystawiamy fakturę{" "}
            <strong style={{ fontWeight: 700 }}>{variant.faktura}</strong>
          </span>
        </div>
      )}

      {/* Pigułki promocyjne nad tabami - TYLKO dla wariantu NOWY.
          Na zakładce Używany ich nie pokazujemy, bo duplikowałyby info
          z badge stanu, banera faktury i gwarancji w nagłówku egzemplarza. */}
      {!isUsed && variant.promos && variant.promos.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {variant.promos.map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </div>
      )}

      {/* Taby wariantu Nowy / Używany */}
      <VariantTabs variantId={variantId} setVariantId={setVariantId} />

      {/* Szary blok z ceną i CTA - #F2F2F2, padding 24px 30px, radius 0 */}
      <div style={{ background: PANEL_BG, padding: "24px 30px", borderRadius: 0 }}>
        <PricePanel variant={variant} />
        <AddToCartBlock variant={variant} />
      </div>

      {/* Szczegóły wariantu (zestawy dla nowego; nic dla używanego - szczegóły
          egzemplarza są wyżej, inline w karcie wybranego egzemplarza) */}
      <VariantDetails variant={variant} />

      {/* Dostępność i logistyka */}
      <DeliveryInfo variant={variant} />
    </div>
  );
}

function Description() {
  return (
    <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 400, color: "#000", margin: "0 0 12px 0" }}>
          Canon EOS R6 mark II - pełnoklatkowy bezlusterkowiec dla profesjonalistów
        </h2>
        <p style={{ fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>
          Canon EOS R6 mark II to następca cenionego R6, który trafił w ręce
          tysięcy fotografów i filmowców. Pełnoklatkowa matryca 24,2 MP,
          stabilizacja do 8 EV, Dual Pixel CMOS AF II z 1053 punktami i
          nagrywanie wideo 4K 60p bez nadpróbkowania robią z tego aparatu
          uniwersalne narzędzie do pracy.
        </p>
        <p style={{ fontSize: 15, color: BODY, lineHeight: 1.6, marginTop: 12 }}>
          Korpus jest lżejszy od poprzednika, ergonomia dopracowana, a czas
          pracy na baterii wystarczająco długi, żeby przetrwać dzień zdjęciowy.
          Dla fotografów ślubnych, reporterów i twórców wideo to sprzęt
          pozwalający realizować zlecenia w każdych warunkach.
        </p>
        <div
          style={{
            marginTop: 16,
            background: "#F2F2F2",
            padding: 12,
            fontSize: 13,
            color: BODY,
            borderRadius: 0,
          }}
        >
          <span style={{ color: "#000", fontWeight: 700 }}>
            Wspólny opis dla wszystkich wariantów.
          </span>{" "}
          Opis marketingowy, zdjęcia producenta i specyfikacja techniczna to ta
          sama treść dla wersji nowej i używanej - to ten sam model aparatu.
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#000", margin: "0 0 12px 0" }}>
          Specyfikacja techniczna
        </h3>
        <dl style={{ fontSize: 13, margin: 0 }}>
          {SPEC_COMMON.map((s) => (
            <div
              key={s.k}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 3fr",
                gap: 8,
                padding: "8px 0",
                borderBottom: "1px solid #EDEDED",
              }}
            >
              <dt style={{ color: BODY, margin: 0 }}>{s.k}</dt>
              <dd style={{ color: "#000", margin: 0 }}>{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <div
      style={{
        marginTop: 40,
        background: "#F2F2F2",
        padding: 20,
        borderRadius: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#000" }}>{RATING.avg}/5</div>
        <div>
          <Stars value={RATING.avg} size={18} />
          <div style={{ fontSize: 12, color: BODY, marginTop: 2 }}>
            na podstawie {RATING.count} opinii
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: BODY, lineHeight: 1.5 }}>
        Opinie dzielone są na poziomie modelu - każdy klient, który kupił R6 mark
        II (nowy lub używany), może wystawić opinię tej karcie. Dziś opinie z
        kart używanych nie dziedziczą się na kartę nowego (i odwrotnie) - po
        konsolidacji przestaniemy tracić social proof.
      </div>
    </div>
  );
}

function PrototypeHeader({ variantId }) {
  return (
    <div style={{ background: "#1a1a1a", color: "#E5E5E5", fontSize: 12, padding: "8px 16px" }}>
      <div
        className="max-w-7xl mx-auto"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span>
          <strong style={{ color: "#fff" }}>PROTOTYP</strong> - karta produktu z wariantem używany (zadanie Asana{" "}
          <a
            href="https://app.asana.com/0/0/1211609581804503"
            style={{ color: "#FF8FA3", textDecoration: "underline" }}
          >
            1211609581804503
          </a>
          )
        </span>
        <span style={{ fontFamily: "monospace", color: "#A3A3A3" }}>
          aktywny wariant: <span style={{ color: "#FF8FA3" }}>{variantId}</span>
        </span>
      </div>
    </div>
  );
}

function ProductPagePrototype() {
  const [variantId, setVariantId] = useState("nowy");
  const variant = VARIANTS[variantId];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: BODY,
        fontSize: 15,
        fontFamily: FONT_STACK,
        fontWeight: 400,
      }}
    >
      <PrototypeHeader variantId={variantId} />
      <TopBar />
      <Header />
      <Nav />
      <div className="max-w-7xl mx-auto" style={{ padding: "0 16px" }}>
        <Breadcrumb />
        {/* H1 na cyfrowe.pl to weight 400, 28px, color #000 (NIE bold) */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 400, color: "#000", margin: 0, lineHeight: 1.25 }}>
              Aparat cyfrowy Canon EOS R6 mark II
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <Stars value={RATING.avg} size={16} />
              <a href="#" style={{ fontSize: 13, color: "#000", textDecoration: "underline" }}>
                {RATING.avg}/5 ({RATING.count} opinii)
              </a>
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 400, color: "#A3A3A3", fontStyle: "italic" }}>
            Canon
          </div>
        </div>

        {/* Dwukolumnowy layout galerii + panelu zakupu */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <ProductGallery variant={variant} />
          <PurchasePanel variantId={variantId} setVariantId={setVariantId} />
        </div>

        <Description />
        <Reviews />
        <div style={{ height: 64 }} />
      </div>
    </div>
  );
}

// --- Render do DOM ---
window.ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductPagePrototype />
);
