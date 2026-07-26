function setPageMeta(title, description) {
  const normalizedTitle = title.includes("|") ? title : `${title} | FleetOps`;
  document.title = normalizedTitle;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && description) meta.setAttribute("content", description);
}

function renderPageHeroMark(themeAsset) {
  return `
          <div class="page-hero__mark" aria-hidden="true" role="presentation">
            <img class="logo__icon" src="${themeAsset("assets/logos/logo-black.svg", "assets/logos/logo-white.svg")}" data-theme-src-light="assets/logos/logo-black.svg" data-theme-src-dark="assets/logos/logo-white.svg" alt="" aria-hidden="true" />
          </div>`;
}

function renderMarketingShell({ title, description, eyebrow, lead, body }) {
  const app = document.getElementById("app");
  if (!app) return;

  const theme = FleetUI.getLandingTheme();
  const themeAsset = FleetUI.getLandingThemeAsset(theme);
  setPageMeta(title, description);

  app.innerHTML = `
    <div class="landing marketing">
${FleetUI.renderLandingHeader(themeAsset)}

      <main class="container section" id="main-content">
        <div class="page-hero">
          <div class="page-hero__content">
            <p class="tag">${eyebrow}</p>
            <h1 class="page-hero__title">${title}</h1>
            <p class="page-hero__lead">${lead}</p>
          </div>
${renderPageHeroMark(themeAsset)}
        </div>
        ${body}
      </main>

${FleetUI.renderLandingFooter(themeAsset)}
    </div>
  `;

  FleetUI.initLandingShell();
}

function renderProductPage() {
  renderMarketingShell({
    title: "Produkt FleetOps",
    eyebrow: "Produkt",
    lead: "Jeden system do zarządzania zleceniami, flotą i kierowcami. Klarowny obraz operacji, mniej ręcznej pracy, szybsze decyzje.",
    description: "FleetOps to platforma do zarządzania transportem: zlecenia, flota, kierowcy, raporty i SLA w jednym panelu.",
    body: `
      <section class="section-tight">
        <div class="marketing-hero">
          <div class="marketing-hero__content">
            <h2 class="marketing-hero__title">Operacje w czasie rzeczywistym</h2>
            <p class="marketing-hero__text">Widoki zleceń, floty i kierowców synchronizują statusy, ETA i alerty. Zespół operacyjny ma jedno źródło prawdy.</p>
            <div class="marketing-hero__cta">
              <a class="button button--primary" href="/#/login">Umów demo</a>
              <a class="button button--secondary" href="/#/app">Zobacz panel</a>
            </div>
          </div>
          <div class="marketing-hero__panel">
            <p class="tag">Wskazniki zaufania</p>
            <dl class="marketing-hero__stats">
              <div class="marketing-hero__stat-card">
                <dt class="marketing-hero__stat-label">Dokładność ETA</dt>
                <dd class="marketing-hero__stat-value">96.8%</dd>
              </div>
              <div class="marketing-hero__stat-card">
                <dt class="marketing-hero__stat-label">Dostępność SLA</dt>
                <dd class="marketing-hero__stat-value">99.6%</dd>
              </div>
              <div class="marketing-hero__stat-card">
                <dt class="marketing-hero__stat-label">Reakcja na alert</dt>
                <dd class="marketing-hero__stat-value">12 min</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="section-header">
          <p class="tag">Jak to dziala</p>
          <h2 class="section-header__title">Od danych do decyzji w 4 krokach</h2>
          <p class="section-header__lead">
            FleetOps prowadzi zespół od uporządkowania danych po bieżącą kontrolę operacji, SLA i raportów w jednym widoku.
          </p>
        </div>
        <div class="grid">
          <div class="card card--step">
          <span class="card__step-number" aria-hidden="true">1</span>
            <h3 class="card__title">Zasil dane</h3>
            <p class="card__text">Import zleceń, pojazdów i kierowców lub start na danych demo.</p>
          </div>
          <div class="card card--step">
          <span class="card__step-number" aria-hidden="true">2</span>
            <h3 class="card__title">Ustaw SLA</h3>
            <p class="card__text">Definiuj priorytety, progi opóźnień i alerty operacyjne.</p>
          </div>
          <div class="card card--step">
          <span class="card__step-number" aria-hidden="true">3</span>
            <h3 class="card__title">Monitoruj</h3>
            <p class="card__text">Statusy na żywo, ETA i oś czasu serwisów w jednym widoku.</p>
          </div>
          <div class="card card--step">
          <span class="card__step-number" aria-hidden="true">4</span>
            <h3 class="card__title">Ulepszaj</h3>
            <p class="card__text">Raporty KPI i eksporty pomagaja zamykac petle operacyjna.</p>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="section-header">
          <p class="tag">Moduły</p>
          <h2 class="section-header__title">Najważniejsze obszary pod kontrolą</h2>
          <p class="section-header__lead">
            FleetOps łączy kluczowe obszary pracy operacyjnej, żeby zespół widział zlecenia, flotę, kierowców i raporty bez przełączania się między narzędziami.
          </p>
        </div>
        <div class="grid">
          <div class="card marketing-card">
            <h3 class="card__title">Zlecenia</h3>
            <p class="card__text">Statusy, priorytety, ETA, alerty opóźnień i szybkie wyszukiwanie tras.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">Flota</h3>
            <p class="card__text">Przeglądy, zdarzenia, koszty i harmonogramy serwisowe floty.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">Kierowcy</h3>
            <p class="card__text">Widok dyspozycyjności, ostatnie kursy, telefon i przypisania.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">Raporty</h3>
            <p class="card__text">KPI, SLA, wydajność i zgodność z wymaganiami klienta.</p>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="section-header">
          <p class="tag">Integracje</p>
          <h2 class="section-header__title">Podłącz swoje systemy</h2>
          <p class="section-header__lead">
            FleetOps może zbierać dane z systemów używanych w operacjach transportowych, żeby statusy, trasy i raporty trafiały do jednego panelu.
          </p>
        </div>
        <div class="grid">
          <div class="card marketing-card">
            <h3 class="card__title">GPS i telematyka</h3>
            <p class="card__text">Pozycje pojazdów, prędkości, postoje i zdarzenia drogowe w jednej osi czasu.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">ERP / TMS</h3>
            <p class="card__text">Zlecenia, kontrakty i dane operacyjne trafiają do panelu bez ręcznego przepisywania.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">WMS / e-commerce</h3>
            <p class="card__text">Statusy dostaw, ETA i informacje o realizacji wracają do klienta końcowego.</p>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="section-header">
          <p class="tag">Bezpieczeństwo</p>
          <h2 class="section-header__title">Role, uprawnienia i audyt</h2>
          <p class="section-header__lead">
            FleetOps porządkuje dostęp do danych operacyjnych, żeby każdy członek zespołu widział tylko właściwe moduły, działania i historię zmian.
          </p>
        </div>
        <div class="grid">
          <div class="card marketing-card">
            <h3 class="card__title">RBAC</h3>
            <p class="card__text">Role dla dyspozytora, menedżera floty, lidera operacji i podglądu.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">Audyt zmian</h3>
            <p class="card__text">Historia statusów, notatek i eksportów dostępna do kontroli oraz compliance.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">Kontrola dostępu</h3>
            <p class="card__text">Uprawnienia per moduł i widok, przydatne przy pracy z podwykonawcami.</p>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="cta-panel">
          <div class="cta-panel__header">
            <h2 class="cta-panel__title">Gotowy uporządkować pracę floty?</h2>
            <p class="cta-panel__lead">Sprawdź FleetOps w wersji demonstracyjnej lub umów rozmowę o wdrożeniu dla zespołu operacyjnego.</p>
          </div>
          <div class="cta-panel__actions">
            <a class="button button--primary" href="/contact/">Umów rozmowę</a>
            <a class="button button--secondary" href="/#/app">Zobacz demo aplikacji</a>
          </div>
        </div>
      </section>
    `,
  });
}

function renderFeaturesPage() {
  renderMarketingShell({
    title: "Funkcje FleetOps",
    eyebrow: "Funkcje",
    lead: "Wszystko, czego potrzebuje zespol operacyjny: dispatch, monitoring, kierowcy, analityka i compliance.",
    description: "Lista funkcji FleetOps: dyspozycja, monitoring, kierowcy, analityka i zgodnosc dla zespolow transportowych.",
    body: `
      <section class="section-tight">
        <h2 class="sr-only">Funkcje operacyjne</h2>
        <div class="grid grid--features">
          <div class="card card--feature">
            <h3 class="card__title">Dyspozycja</h3>
            <ul class="card__list">
              <li>Przypisania kursow i priorytetow</li>
              <li>Widok statusow i szybkie filtry</li>
              <li>Alerty opóźnień i SLA</li>
              <li>Historia zmian i notatki operacyjne</li>
            </ul>
          </div>
          <div class="card card--feature">
            <h3 class="card__title">Monitoring</h3>
            <ul class="card__list">
              <li>ETA w czasie rzeczywistym</li>
              <li>Podglad trasy i punktow kontrolnych</li>
              <li>Wczesne ostrzeżenia o ryzyku opóźnienia</li>
              <li>Lista incydentow i eskalacji</li>
            </ul>
          </div>
          <div class="card card--feature">
            <h3 class="card__title">Kierowcy</h3>
            <ul class="card__list">
              <li>Dyspozycyjnosc i ostatnie kursy</li>
              <li>Kontakt do kierowcy z panelu</li>
              <li>Wydajność kierowców i rotacja</li>
              <li>Notatki i zgodnosc z instrukcjami</li>
            </ul>
          </div>
          <div class="card card--feature">
            <h3 class="card__title">Analityka</h3>
            <ul class="card__list">
              <li>Raporty KPI i SLA</li>
              <li>Eksport CSV do klienta</li>
              <li>Wydajność floty i wykorzystanie pojazdów</li>
              <li>Trendy opóźnień i kosztów</li>
            </ul>
          </div>
          <div class="card card--feature">
            <h3 class="card__title">Zgodnosc</h3>
            <ul class="card__list">
              <li>Audit log zmian statusow</li>
              <li>Role i uprawnienia RBAC</li>
              <li>Polityki SLA i potwierdzenia</li>
              <li>Historia serwisów i przeglądów</li>
            </ul>
          </div>
          <div class="card card--feature">
            <h3 class="card__title">Automatyzacja</h3>
            <ul class="card__list">
              <li>Reguły alertów dla opóźnień i SLA</li>
              <li>Automatyczne przypomnienia dla zespołu</li>
              <li>Szablony procesów operacyjnych</li>
              <li>Powiadomienia o zmianach statusów</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="section-header">
          <p class="tag">Dla kogo</p>
          <h2 class="section-header__title">Branze, ktore wspiera FleetOps</h2>
          <p class="section-header__lead">FleetOps sprawdza się tam, gdzie liczy się widoczność dostaw, szybka reakcja zespołu i kontrola jakości operacji.</p>
        </div>
        <div class="grid grid--industries">
          <div class="card marketing-card">
            <h3 class="card__title">Logistyka MSP</h3>
            <p class="card__text">Panel operacyjny dla firm, które chcą uporządkować zlecenia, statusy i komunikację bez ciężkich wdrożeń enterprise.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">Operatorzy logistyczni</h3>
            <p class="card__text">Jeden standard pracy dla wielu flot, kierowców, klientów i zespołów odpowiedzialnych za realizację dostaw.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">Handel internetowy i detaliczny</h3>
            <p class="card__text">Lepsza widoczność dostaw last mile, SLA i opóźnień w procesach ważnych dla obsługi klienta.</p>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="cta-panel">
          <div class="cta-panel__header">
            <h2 class="cta-panel__title">Chcesz sprawdzić funkcje w praktyce?</h2>
            <p class="cta-panel__lead">Otwórz demo FleetOps i zobacz, jak panel wspiera dyspozycję, monitoring, raporty i automatyzację pracy zespołu.</p>
          </div>
          <div class="cta-panel__actions">
            <a class="button button--primary" href="/contact/">Umów rozmowę</a>
            <a class="button button--secondary" href="/#/app">Zobacz demo aplikacji</a>
          </div>
        </div>
      </section>
    `,
  });
}

function renderPricingPage() {
  renderMarketingShell({
    title: "Cennik FleetOps",
    eyebrow: "Cennik",
    lead: "Proste plany dla zespolow operacyjnych. Bez ukrytych oplat, z jasnym SLA i wsparciem.",
    description: "Cennik FleetOps: Start, Rozwoj i Korporacyjny z porownaniem funkcji.",
    body: `
      <section class="section-tight">
        <div class="grid grid--pricing">
            <div class="card card--pricing">
              <div class="badge">Start</div>
              <h3 class="card__title">Podstawowa kontrola operacji</h3>
              <div class="card__price">199 PLN</div>
              <p class="card__text">dla małych flot do 15 pojazdów</p>
              <ul class="card__list">
                <li>kontrola zleceń i statusów</li>
                <li>podgląd pojazdów w jednym panelu</li>
                <li>dobry start dla małego zespołu</li>
              </ul>
              <a class="button button--secondary" href="/#/login">Przetestuj panel</a>
            </div>
            <div class="card card--pricing">
              <div class="badge">Rozwój</div>
              <h3 class="card__title">Rozszerzona kontrola operacji</h3>
              <div class="card__price">499 PLN</div>
              <p class="card__text">dla zespołów obsługujących do 60 pojazdów</p>
              <ul class="card__list">
                <li>szersza obsługa zleceń i floty</li>
                <li>raporty operacyjne dla zespołu</li>
                <li>więcej kontroli nad codzienną pracą</li>
              </ul>
              <a class="button button--secondary" href="/contact/">Umów demo</a>
            </div>
            <div class="card card--pricing">
              <div class="badge">Korporacyjny</div>
              <h3 class="card__title">Kontrola operacji w większej skali</h3>
              <div class="card__price">Indywidualnie</div>
              <p class="card__text">dla flot powyżej 60 pojazdów</p>
              <ul class="card__list">
                <li>zakres dopasowany do większej skali</li>
                <li>wsparcie dla procesów i zespołów</li>
                <li>elastyczne podejście do wdrożenia</li>
              </ul>
              <a class="button button--secondary" href="/contact/">Porozmawiajmy</a>
            </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="section-header">
          <p class="tag">Porownanie</p>
          <h2 class="section-header__title">Porównanie planów FleetOps</h2>
          <p class="section-header__lead">Zobacz, które funkcje są dostępne w każdym planie i wybierz zakres dopasowany do skali pracy zespołu.</p>
        </div>
        <div class="table-responsive pricing-table">
          <table class="table">
            <thead>
              <tr>
                <th>Funkcja</th>
                <th>Start</th>
                <th>Rozwoj</th>
                <th>Korporacyjny</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Zlecenia + Flota</td><td>Tak</td><td>Tak</td><td>Tak</td></tr>
              <tr><td>Monitoring ETA</td><td>Podstawowy</td><td>Zaawansowany</td><td>Zaawansowany</td></tr>
              <tr><td>Kierowcy + dyspozycyjnosc</td><td>Nie</td><td>Tak</td><td>Tak</td></tr>
              <tr><td>Raporty SLA</td><td>Podstawowe</td><td>Rozszerzone</td><td>Indywidualnie</td></tr>
              <tr><td>Integracje ERP / TMS</td><td>Nie</td><td>Opcja</td><td>Tak</td></tr>
              <tr><td>SLA + wsparcie</td><td>E-mail</td><td>Biznes</td><td>Dedykowane</td></tr>
            </tbody>
          </table>
        </div>
        <p class="pricing-note">Faktura VAT, SLA i wsparcie w cenie. Ceny netto.</p>
      </section>

      <section class="section-tight">
        <div class="cta-panel">
          <div class="cta-panel__header">
            <h2 class="cta-panel__title">Potrzebujesz wyceny dla swojej floty?</h2>
            <p class="cta-panel__lead">Skontaktuj się, przygotujemy ofertę dopasowaną do skali operacji.</p>
          </div>
          <div class="cta-panel__actions">
            <a class="button button--primary" href="/contact/">Skontaktuj się</a>
            <a class="button button--secondary" href="/#/app">Zobacz demo aplikacji</a>
          </div>
        </div>
      </section>
    `,
  });
}

function renderSecurityPage() {
  renderMarketingShell({
    title: "Bezpieczeństwo",
    eyebrow: "Bezpieczeństwo",
    lead: "Informacje o standardach bezpieczeństwa FleetOps udostępnimy wkrótce.",
    description: "Bezpieczeństwo FleetOps - strona w przygotowaniu.",
    body: `
      <section class="section-tight">
        <div class="marketing-card">
          <p class="tag">W przygotowaniu</p>
          <h2>Bezpieczeństwo w przygotowaniu</h2>
          <p>Ta podstrona jest w trakcie przygotowań. Udostępnimy szczegóły o praktykach i certyfikacjach bezpieczeństwa.</p>
          <p>W przygotowaniu - wróć wkrótce.</p>
          <div class="hero-cta">
            <a class="button button--primary" href="/contact/">Skontaktuj się</a>
            <a class="button button--secondary" href="/#/app">Zobacz demo</a>
          </div>
        </div>
      </section>
    `,
  });
}

function renderCareersPage() {
  renderMarketingShell({
    title: "Kariera",
    eyebrow: "Kariera",
    lead: "Otwarte role i informacje o zespołach FleetOps pojawią się wkrótce.",
    description: "Kariera w FleetOps - strona w przygotowaniu.",
    body: `
      <section class="section-tight">
        <div class="marketing-card">
          <p class="tag">W przygotowaniu</p>
          <h2>Kariera w przygotowaniu</h2>
          <p>Budujemy sekcję z ofertami pracy i opisem zespołu. Jeśli chcesz porozmawiać wcześniej, odezwij się.</p>
          <p>W przygotowaniu - sprawdź ponownie niebawem.</p>
          <div class="hero-cta">
            <a class="button button--primary" href="/contact/">Skontaktuj się</a>
            <a class="button button--secondary" href="/#/app">Zobacz demo</a>
          </div>
        </div>
      </section>
    `,
  });
}

function renderAboutPage() {
  renderMarketingShell({
    title: "O nas",
    eyebrow: "O FleetOps",
    lead: "Budujemy FleetOps dla zespołów transportowych, które potrzebują przejrzystości, szybkiej reakcji i większego spokoju w codziennej operacji.",
    description: "Poznaj zespół FleetOps i naszą misję budowania operacyjnej przejrzystości w transporcie.",
    body: `
      <section class="section-tight">
        <div class="marketing-hero">
          <div class="marketing-hero__content">
            <h2 class="marketing-hero__title">Nasza misja</h2>
            <p class="marketing-hero__text">Upraszczamy zarządzanie transportem, żeby zespoły operacyjne szybciej widziały statusy, ryzyka i dane potrzebne do decyzji.</p>
            <ul class="marketing-hero__list">
              <li>Jedno źródło prawdy dla statusów</li>
              <li>Operacje oparte o SLA i fakty</li>
              <li>Przejrzysta współpraca z klientami</li>
            </ul>
          </div>
          <div class="marketing-hero__panel">
            <p class="tag">Historia</p>
            <div class="marketing-hero__panel-copy">
              <p class="marketing-hero__panel-text marketing-hero__panel-text--strong">FleetOps powstał z potrzeby uporządkowania codziennej pracy operatorów logistycznych w jednym panelu.</p>
              <p class="marketing-hero__panel-text">Łączymy produktowe podejście z praktyką branży transportowej, żeby wspierać realne procesy operacyjne.</p>
              <p class="marketing-hero__panel-text">Projektujemy FleetOps tak, żeby codzienne decyzje były szybsze, dane bardziej dostępne, a odpowiedzialność w zespole jasno widoczna.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="section-header">
          <p class="tag">Dlaczego FleetOps</p>
          <h2 class="section-header__title">Operacje bez chaosu</h2>
          <p class="section-header__lead">FleetOps porządkuje statusy, dane i odpowiedzialność, żeby zespół mógł szybciej reagować na zmiany w codziennej pracy.</p>
        </div>
        <div class="grid">
          <div class="card marketing-card">
            <h3 class="card__title">Transparentność</h3>
            <p class="card__text">Jasne statusy, ETA i alerty dla całego zespołu.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">Szybkie decyzje</h3>
            <p class="card__text">Fakty zamiast telefonów i arkuszy, bez opóźnień w reakcjach.</p>
          </div>
          <div class="card marketing-card">
            <h3 class="card__title">Skalowalność</h3>
            <p class="card__text">Ten sam proces dla 10 i 500 pojazdów.</p>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="section-header">
          <p class="tag">Podejście</p>
          <h2 class="section-header__title">Praca w iteracjach</h2>
        </div>
        <div class="grid">
          <div class="card card--step">
            <span class="card__step-number" aria-hidden="true">1</span>
            <h3>Diagnoza</h3>
            <p>Mapujemy procesy dispatch i SLA, by dobrze ustawić priorytety.</p>
          </div>
          <div class="card card--step">
            <span class="card__step-number" aria-hidden="true">2</span>
            <h3>Wdrożenie</h3>
            <p>Konfigurujemy role, alerty i raporty zgodnie z operacjami.</p>
          </div>
          <div class="card card--step">
            <span class="card__step-number" aria-hidden="true">3</span>
            <h3>Ulepszanie</h3>
            <p>Regularnie pracujemy nad KPI, trendami i automatyzacjami.</p>
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="cta-panel">
          <div class="cta-panel__header">
            <h2 class="cta-panel__title">Chcesz poznać nasz zespół?</h2>
            <p class="cta-panel__lead">Porozmawiajmy o twojej flocie i pokażmy, jak pracuje FleetOps.</p>
          </div>
          <div class="cta-panel__actions">
            <a class="button button--primary" href="/contact/">Skontaktuj się</a>
            <a class="button button--secondary" href="/#/app">Zobacz demo aplikacji</a>
          </div>
        </div>
      </section>
    `,
  });
}

function renderContactPage() {
  renderMarketingShell({
    title: "Kontakt",
    eyebrow: "Kontakt",
    lead: "Opisz potrzeby swojej floty, a wrócimy z konkretną odpowiedzią dotyczącą demo, wdrożenia lub zakresu funkcji.",
    description: "Skontaktuj się z zespołem FleetOps. Demo, integracje i pytania o cennik.",
    body: `
      <section class="section-tight">
        <div class="grid grid--contact">
          <div class="contact-form">
            <h2 class="contact-form__title">Formularz kontaktowy</h2>
            <p class="contact-form__lead">Zostaw dane, a odezwiemy się w ciągu 1 dnia roboczego.</p>
            <form id="contactForm" class="contact-form__body">
              <label class="form-control">
                <span class="label">Imię i nazwisko</span>
                <input class="input" name="name" type="text" required minlength="3" placeholder="Jan Kowalski" />
              </label>
              <label class="form-control">
                <span class="label">E-mail służbowy</span>
                <input class="input" name="email" type="email" required placeholder="twoja@firma.pl" />
              </label>
              <label class="form-control">
                <span class="label">Wielkość floty</span>
                <select class="input" name="fleet" required>
                  <option value="">Wybierz</option>
                  <option value="1-15">1-15 pojazdów</option>
                  <option value="16-60">16-60 pojazdów</option>
                  <option value="60+">60+ pojazdów</option>
                </select>
              </label>
              <label class="form-control">
                <span class="label">Wiadomość</span>
                <textarea class="input" name="message" rows="4" required minlength="10" placeholder="Opisz wyzwania operacyjne lub cele..."></textarea>
              </label>
              <div class="form-control">
                <span class="label">Zgoda</span>
                <label class="checkbox-control" for="contactConsent">
                  <input id="contactConsent" name="consent" type="checkbox" required />
                  <span>Zgadzam się na kontakt w sprawie FleetOps. Formularz jest częścią demonstracyjnego projektu portfolio.</span>
                </label>
              </div>
              <button class="button button--primary" type="submit">Wyślij zapytanie</button>
            </form>
          </div>
          <div class="contact-panel">
            <div class="contact-panel__header">
              <h2 class="contact-panel__title">Dane kontaktowe</h2>
              <p class="contact-panel__lead">Kontakt w sprawie projektu, podobnych wdrożeń i współpracy z KP_Code Digital Studio.</p>
            </div>
            <address class="contact-panel__address">
              <div class="contact-panel__address-item">
                <p class="contact-panel__label">E-mail</p>
                <p class="contact-panel__value">
                  <a class="contact-panel__link" href="mailto:kontakt@kp-code.pl">kontakt@kp-code.pl</a>
                </p>
              </div>
              <div class="contact-panel__address-item">
                <p class="contact-panel__label">Telefon</p>
                <p class="contact-panel__value">
                  <a class="contact-panel__link" href="tel:+48533537091">+48 533 537 091</a>
                </p>
              </div>
              <div class="contact-panel__address-item">
                <p class="contact-panel__label">Adres</p>
                <p class="contact-panel__value">
                  Marynarki Wojennej 12/3<br />
                  33-100 Tarnów<br />
                  Polska
                </p>
              </div>
            </address>
            <div class="contact-panel__note">
              <p class="contact-panel__note-text">
                Chcesz omówić podobny panel SaaS, stronę firmową lub wdrożenie dla branży transportowej? Napisz kilka zdań o potrzebach, a wrócimy z propozycją zakresu i kierunku realizacji.
                <span class="contact-panel__studio">
                  Kontakt obsługuje <a class="contact-panel__studio-link" href="/about/">KP_Code Digital Studio</a>.
                </span>
              </p>
              <a class="button button--secondary contact-panel__action" href="/pricing/">Zobacz cennik</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section-tight section-faq">
        <div class="section-header">
          <p class="tag">Pytania</p>
          <h2 class="section-header__title">Najczęstsze pytania</h2>
          <p class="section-header__lead">
            Krótkie odpowiedzi na pytania dotyczące kontaktu, demo FleetOps i podobnych wdrożeń SaaS.
          </p>
        </div>
        <div class="accordion" id="faq">
          <div class="accordion-item">
            <button class="accordion-header">Jak szybko odpowiadacie na wiadomość?<span aria-hidden="true">▾</span></button>
            <div class="accordion-content">
              <p class="accordion-text">Najczęściej odpowiadamy w ciągu 1 dnia roboczego. W pilnych sprawach warto opisać zakres potrzeby już w pierwszej wiadomości.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header">Czy formularz dotyczy prawdziwego wdrożenia FleetOps?<span aria-hidden="true">▾</span></button>
            <div class="accordion-content">
              <p class="accordion-text">FleetOps jest projektem demonstracyjnym, ale formularz może służyć do kontaktu w sprawie podobnego panelu, strony firmowej lub rozwiązania SaaS.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header">Czy można omówić podobny panel dla własnej firmy?<span aria-hidden="true">▾</span></button>
            <div class="accordion-content">
              <p class="accordion-text">Tak. Możesz opisać branżę, cele i najważniejsze funkcje, a kontakt wróci z propozycją kierunku, zakresu i możliwego sposobu realizacji.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header">Czy mogę najpierw sprawdzić wersję demo?<span aria-hidden="true">▾</span></button>
            <div class="accordion-content">
              <p class="accordion-text">Tak. Panel demonstracyjny działa w przeglądarce i pozwala sprawdzić przykładowy dashboard, zlecenia, flotę, kierowców oraz raporty.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header">Jakie informacje warto wysłać w formularzu?<span aria-hidden="true">▾</span></button>
            <div class="accordion-content">
              <p class="accordion-text">Najlepiej podać typ firmy, wielkość floty, główny problem operacyjny, oczekiwane funkcje oraz informację, czy chodzi o stronę, panel SaaS czy pełniejsze wdrożenie.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header">Czy takie rozwiązanie może być dopasowane do innej branży?<span aria-hidden="true">▾</span></button>
            <div class="accordion-content">
              <p class="accordion-text">Tak. FleetOps pokazuje przykład dla transportu, ale podobny układ można zastosować także dla usług, rezerwacji, obsługi klientów, raportowania lub paneli administracyjnych.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header">Czy kontakt obsługuje KP_Code Digital Studio?<span aria-hidden="true">▾</span></button>
            <div class="accordion-content">
              <p class="accordion-text">Tak. Kontakt dotyczy projektu FleetOps oraz podobnych realizacji przygotowywanych w ramach KP_Code Digital Studio.</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header">Czy po kontakcie od razu powstaje wycena?<span aria-hidden="true">▾</span></button>
            <div class="accordion-content">
              <p class="accordion-text">Najpierw ustalany jest kontekst, zakres i cel projektu. Dopiero po krótkiej analizie można przygotować sensowną propozycję zakresu lub orientacyjną wycenę.</p>
            </div>
          </div>
        </div>
      </section>
    `,
  });

  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      Toast.show("Uzupełnij wymagane pola.", "warning", { assertive: true });
      return;
    }
    form.reset();
    Toast.show("Dziękujemy! Wkrótce się odezwiemy.", "success");
  });
}

function renderPrivacyPage() {
  renderMarketingShell({
    title: "Polityka prywatności",
    eyebrow: "Polityka prywatności",
    lead: "Informacje o zasadach przetwarzania danych, korzystania z formularza kontaktowego oraz danych zapisywanych lokalnie w projekcie FleetOps.",
    description: "Polityka prywatności FleetOps. Zasady dotyczące danych kontaktowych, danych lokalnych, cookies i sposobu działania projektu.",
    body: `
      <section class="section-tight">
        <nav class="legal-nav" aria-label="Spis treści polityki prywatności">
          <div class="legal-nav__box">
            <p class="tag">Spis treści</p>
            <ol class="legal-nav__list">
              <li><a class="legal-nav__link" href="#privacy-character">Charakter projektu FleetOps</a></li>
              <li><a class="legal-nav__link" href="#privacy-administrator">Administrator, twórca i kontakt</a></li>
              <li><a class="legal-nav__link" href="#privacy-scope">Zakres danych, cele i podstawy przetwarzania</a></li>
              <li><a class="legal-nav__link" href="#privacy-contact">Formularz kontaktowy i komunikacja e-mail</a></li>
              <li><a class="legal-nav__link" href="#privacy-local-storage">Dane lokalne, localStorage i preferencje</a></li>
              <li><a class="legal-nav__link" href="#privacy-cookies">Cookies i technologie podobne</a></li>
              <li><a class="legal-nav__link" href="#privacy-rights">Odbiorcy, okres przechowywania i prawa użytkownika</a></li>
              <li><a class="legal-nav__link" href="#privacy-security">Bezpieczeństwo, zmiany dokumentu i kontakt</a></li>
            </ol>
          </div>
        </nav>
      </section>

      <section class="section-tight">
        <article class="legal-doc" aria-labelledby="privacy-document-title">
          <div class="section-header">
            <p class="tag">Dokument</p>
            <h2 class="section-header__title" id="privacy-document-title">Zasady prywatności FleetOps</h2>
            <p class="section-header__lead">
              Dokument określa zasady przetwarzania danych w ramach projektu FleetOps oraz kontaktu z KP_Code Digital Studio.
            </p>
          </div>

          <div class="legal-doc__content">
            <section class="legal-doc__section" id="privacy-character" tabindex="-1">
              <h3>1. Charakter projektu FleetOps</h3>
              <p>
                FleetOps jest statycznym projektem typu SaaS, przygotowanym jako realizacja portfolio i referencyjny projekt front-end dla KP_Code Digital Studio. Projekt prezentuje przykładowy panel do pracy z flotą, zleceniami, kierowcami, raportami i ustawieniami.
              </p>
              <p>
                FleetOps ma charakter demonstracyjny i nie stanowi produkcyjnej usługi transportowej, operatora floty ani komercyjnej platformy do obsługi realnych procesów operacyjnych. Projekt nie umożliwia zawierania umów, dokonywania płatności, realizacji usług przewozowych ani korzystania z rzeczywistych integracji GPS, TMS, ERP lub podobnych systemów.
              </p>
              <p>
                Dane widoczne w panelu mają charakter przykładowy albo lokalny. Użytkownik nie powinien wprowadzać do formularzy ani widoków projektu danych wrażliwych, poufnych, produkcyjnych danych firmowych ani informacji dotyczących rzeczywistych operacji transportowych.
              </p>
            </section>

            <section class="legal-doc__section" id="privacy-administrator" tabindex="-1">
              <h3>2. Administrator, twórca i kontakt</h3>
              <p>
                Administratorem danych przetwarzanych w związku z kontaktem dotyczącym FleetOps jest KP_Code Digital Studio. Projekt został zaprojektowany i wykonany przez Kamila Króla oraz stanowi jego własność jako twórcy i właściciela projektu.
              </p>
              <p>
                W sprawach związanych z prywatnością, projektem FleetOps lub podobnymi realizacjami można skontaktować się za pośrednictwem adresu
                <a class="legal-doc__link" href="mailto:kontakt@kp-code.pl">kontakt@kp-code.pl</a>.
              </p>
              <p>
                Dane kontaktowe publikowane w serwisie służą komunikacji dotyczącej projektu, współpracy z KP_Code Digital Studio oraz zapytań związanych z podobnymi wdrożeniami.
              </p>
            </section>

            <section class="legal-doc__section" id="privacy-scope" tabindex="-1">
              <h3>3. Zakres danych, cele i podstawy przetwarzania</h3>
              <p>
                W ramach projektu mogą występować dane wpisane dobrowolnie przez użytkownika w formularzu kontaktowym, dane przekazane w korespondencji e-mail oraz dane techniczne związane z korzystaniem ze strony i działania przeglądarki.
              </p>
              <p>
                Dane mogą obejmować w szczególności imię i nazwisko, adres e-mail, treść wiadomości, informacje o zakresie zapytania oraz dane techniczne przetwarzane w zakresie niezbędnym do prawidłowego działania strony, bezpieczeństwa lub obsługi komunikacji.
              </p>
              <ul>
                <li>dane kontaktowe mogą być przetwarzane w celu obsługi zapytania i prowadzenia korespondencji,</li>
                <li>podstawą przetwarzania może być zgoda użytkownika albo prawnie uzasadniony interes administratora polegający na udzieleniu odpowiedzi,</li>
                <li>dane techniczne mogą być przetwarzane w zakresie wynikającym z działania przeglądarki, hostingu lub zabezpieczenia strony.</li>
              </ul>
              <p>
                FleetOps nie wykorzystuje danych do zautomatyzowanego podejmowania decyzji, profilowania marketingowego ani sprzedaży danych podmiotom trzecim.
              </p>
            </section>

            <section class="legal-doc__section" id="privacy-contact" tabindex="-1">
              <h3>4. Formularz kontaktowy i komunikacja e-mail</h3>
              <p>
                Formularz kontaktowy służy do przekazania zapytania dotyczącego FleetOps, podobnego panelu, strony firmowej lub współpracy z KP_Code Digital Studio. W aktualnej implementacji formularz działa po stronie przeglądarki i nie wysyła danych do produkcyjnego backendu FleetOps.
              </p>
              <p>
                Jeżeli użytkownik skorzysta z linku e-mail lub wyśle wiadomość bezpośrednio na adres kontaktowy, dane zawarte w wiadomości są przetwarzane w celu udzielenia odpowiedzi, prowadzenia korespondencji oraz ustalenia kontekstu zapytania.
              </p>
              <p>
                W wiadomościach nie należy przekazywać haseł, danych wrażliwych, poufnych materiałów, danych produkcyjnych firm ani informacji o realnych klientach, jeżeli nie są one konieczne do obsługi zapytania.
              </p>
            </section>

            <section class="legal-doc__section" id="privacy-local-storage" tabindex="-1">
              <h3>5. Dane lokalne, localStorage i preferencje</h3>
              <p>
                FleetOps działa głównie po stronie przeglądarki. Mechanizm localStorage może zapisywać lokalnie dane przykładowe oraz preferencje interfejsu, takie jak motyw, tryb kompaktowy, zakres dashboardu, status logowania testowego, filtry, preferencje list, aktualny użytkownik demonstracyjny, dane domenowe, aktywność oraz kolejka działań offline.
              </p>
              <p>
                Dane zapisane w localStorage pozostają w przeglądarce użytkownika i mogą zostać usunięte z poziomu ustawień przeglądarki albo przez funkcję resetu danych w panelu FleetOps. Usunięcie tych danych przywraca projekt do stanu początkowego lub usuwa lokalne zmiany testowe.
              </p>
              <p>
                Router może używać sessionStorage do tymczasowego zapamiętania ścieżki powrotu po logowaniu testowym. Taki zapis ma charakter techniczny, krótkotrwały i jest związany z działaniem nawigacji w przeglądarce.
              </p>
            </section>

            <section class="legal-doc__section" id="privacy-cookies" tabindex="-1">
              <h3>6. Cookies i technologie podobne</h3>
              <p>
                W kodzie projektu nie przewidziano narzędzi analitycznych, reklamowych ani marketingowych plików cookies. Projekt może natomiast korzystać z mechanizmów przeglądarki, takich jak localStorage, sessionStorage, cache oraz standardowe zasoby niezbędne do wyświetlenia strony.
              </p>
              <p>
                W zależności od sposobu hostingu przeglądarka lub infrastruktura hostingowa może przetwarzać podstawowe dane techniczne, takie jak adres IP, informacje o żądaniu, typ przeglądarki lub logi bezpieczeństwa. Zakres takich danych zależy od środowiska, w którym projekt jest uruchomiony.
              </p>
              <p>
                Użytkownik może zarządzać cookies, cache i danymi lokalnymi w ustawieniach swojej przeglądarki. Ograniczenie lub usunięcie danych lokalnych może spowodować utratę zapisanych preferencji i zmian testowych.
              </p>
            </section>

            <section class="legal-doc__section" id="privacy-rights" tabindex="-1">
              <h3>7. Odbiorcy, okres przechowywania i prawa użytkownika</h3>
              <p>
                Dane kontaktowe mogą być obsługiwane przez narzędzia poczty elektronicznej, dostawców hostingu lub inne narzędzia techniczne wykorzystywane przez administratora wyłącznie w zakresie potrzebnym do komunikacji, utrzymania strony i zapewnienia bezpieczeństwa.
              </p>
              <p>
                Dane nie są sprzedawane ani udostępniane podmiotom trzecim w celach marketingowych. Wiadomości e-mail mogą być przechowywane przez okres potrzebny do udzielenia odpowiedzi, prowadzenia dalszej korespondencji lub ochrony przed roszczeniami.
              </p>
              <p>
                Użytkownik może żądać dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia danych, wniesienia sprzeciwu oraz cofnięcia zgody, jeżeli przetwarzanie odbywa się na podstawie zgody. Przysługuje także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
              </p>
            </section>

            <section class="legal-doc__section" id="privacy-security" tabindex="-1">
              <h3>8. Bezpieczeństwo, zmiany dokumentu i kontakt</h3>
              <p>
                Projekt ogranicza zakres przetwarzania danych przez brak produkcyjnego systemu kont użytkowników, brak płatności oraz lokalny charakter danych przykładowych. Podstawowe środki bezpieczeństwa obejmują ostrożne projektowanie formularzy, ograniczenie zakresu danych oraz możliwość usunięcia danych lokalnych.
              </p>
              <p>
                Polityka prywatności może być aktualizowana wraz ze zmianami projektu, sposobu hostingu, funkcji strony lub przepisów prawa. Aktualna wersja dokumentu jest publikowana w serwisie.
              </p>
              <p>
                W sprawach związanych z prywatnością można skontaktować się przez adres
                <a class="legal-doc__link" href="mailto:kontakt@kp-code.pl">kontakt@kp-code.pl</a>.
              </p>
              <p class="legal-doc__meta">
                Data ostatniej aktualizacji:
                <time datetime="2026-06-05">05.06.2026</time>
              </p>
            </section>
          </div>
        </article>
      </section>

      <section class="section-tight">
        <div class="cta-panel">
          <div class="cta-panel__header">
            <h2 class="cta-panel__title">Masz pytania o prywatność?</h2>
            <p class="cta-panel__lead">Skontaktuj się w sprawie projektu FleetOps lub zasad opisanych w polityce prywatności.</p>
          </div>
          <div class="cta-panel__actions">
            <a class="button button--primary" href="/contact/">Kontakt</a>
            <a class="button button--secondary" href="/#/app">Przejdź do panelu</a>
          </div>
        </div>
      </section>
    `,
  });

  const links = Array.from(document.querySelectorAll(".legal-nav__link"));
  const cleanups = links.map((link) => {
    const handleClick = (event) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#privacy-")) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      const behavior = window.FleetUI?.getMotionSafeScrollBehavior
        ? FleetUI.getMotionSafeScrollBehavior()
        : "smooth";

      target.scrollIntoView({ behavior, block: "start" });
      target.focus({ preventScroll: true });
    };

    link.addEventListener("click", handleClick);
    return () => link.removeEventListener("click", handleClick);
  });

  if (window.CleanupRegistry && typeof CleanupRegistry.add === "function") {
    CleanupRegistry.add(() => cleanups.forEach((cleanup) => cleanup()));
  }
}

function renderTermsPage() {
  renderMarketingShell({
    title: "Regulamin",
    eyebrow: "Regulamin",
    lead: "Zasady korzystania z projektu FleetOps, prezentowanych funkcji panelu oraz materiałów przygotowanych przez KP_Code Digital Studio.",
    description: "Regulamin FleetOps. Zasady korzystania z projektu SaaS-style dla transportu i floty, prawa autorskie KP_Code Digital Studio oraz ograniczenia odpowiedzialności.",
    body: `
      <section class="section-tight">
        <nav class="legal-nav" aria-label="Spis treści regulaminu">
          <div class="legal-nav__box">
            <p class="tag">Spis treści</p>
            <ol class="legal-nav__list">
              <li><a class="legal-nav__link" href="#terms-definitions">Definicje</a></li>
              <li><a class="legal-nav__link" href="#terms-general">Postanowienia ogólne</a></li>
              <li><a class="legal-nav__link" href="#terms-character">Charakter projektu FleetOps</a></li>
              <li><a class="legal-nav__link" href="#terms-functionality">Funkcjonalności i panel aplikacji</a></li>
              <li><a class="legal-nav__link" href="#terms-intellectual-property">Własność intelektualna</a></li>
              <li><a class="legal-nav__link" href="#terms-contact">Formularz kontaktowy i komunikacja</a></li>
              <li><a class="legal-nav__link" href="#terms-liability">Odpowiedzialność</a></li>
              <li><a class="legal-nav__link" href="#terms-external-links">Linki zewnętrzne</a></li>
              <li><a class="legal-nav__link" href="#terms-security">Bezpieczeństwo i zasady korzystania</a></li>
              <li><a class="legal-nav__link" href="#terms-changes">Zmiany regulaminu</a></li>
              <li><a class="legal-nav__link" href="#terms-final">Postanowienia końcowe</a></li>
            </ol>
          </div>
        </nav>
      </section>

      <section class="section-tight">
        <article class="legal-doc" aria-labelledby="terms-document-title">
          <div class="section-header">
            <p class="tag">Dokument</p>
            <h2 class="section-header__title" id="terms-document-title">Zasady korzystania z FleetOps</h2>
            <p class="section-header__lead">
              Dokument określa zasady korzystania z projektu FleetOps, prezentowanych treści oraz funkcjonalności front-end.
            </p>
          </div>

          <div class="legal-doc__content">
            <section class="legal-doc__section" id="terms-definitions" tabindex="-1">
              <h3>1. Definicje</h3>
              <p>Na potrzeby niniejszego regulaminu przyjmuje się następujące znaczenie pojęć:</p>
              <ul>
                <li>Serwis - publiczna strona FleetOps oraz powiązany panel aplikacyjny dostępny w przeglądarce.</li>
                <li>Projekt - FleetOps jako profesjonalny projekt referencyjny typu SaaS dla obszaru transportu, floty i operacji logistycznych.</li>
                <li>Operator - KP_Code Digital Studio oraz Kamil Król jako projektant, twórca, właściciel i dysponent praw do projektu.</li>
                <li>Użytkownik - każda osoba odwiedzająca Serwis lub korzystająca z prezentowanych funkcjonalności.</li>
                <li>Funkcjonalności - elementy interfejsu, widoki panelu, formularze, przykładowe dane i mechanizmy front-end prezentowane w ramach FleetOps.</li>
              </ul>
            </section>

            <section class="legal-doc__section" id="terms-general" tabindex="-1">
              <h3>2. Postanowienia ogólne</h3>
              <p>
                Niniejszy regulamin określa zasady korzystania z Serwisu FleetOps przygotowanego przez KP_Code Digital Studio. Dokument ma charakter informacyjny i projektowy, a jego celem jest opisanie warunków korzystania z publicznie prezentowanej realizacji.
              </p>
              <p>
                Korzystanie z Serwisu oznacza akceptację niniejszego regulaminu oraz zobowiązanie do korzystania z FleetOps zgodnie z jego przeznaczeniem, obowiązującymi przepisami prawa i zasadami bezpieczeństwa.
              </p>
              <p>
                FleetOps może być wykorzystywany jako punkt odniesienia przy rozmowie o podobnych projektach komercyjnych zamawianych w KP_Code Digital Studio, ale sam Serwis nie stanowi gotowego systemu produkcyjnego dla przedsiębiorstwa transportowego.
              </p>
            </section>

            <section class="legal-doc__section" id="terms-character" tabindex="-1">
              <h3>3. Charakter projektu FleetOps</h3>
              <p>
                FleetOps prezentuje koncepcję produktu typu SaaS dla firm transportowych i flotowych. Projekt pokazuje przykładową architekturę informacji, układ marketingowej strony produktu oraz panel do pracy z flotą, zleceniami, kierowcami, raportami i ustawieniami.
              </p>
              <ul>
                <li>prezentowane treści, dane operacyjne, statusy, nazwy i procesy mają charakter przykładowy,</li>
                <li>Serwis nie reprezentuje realnego operatora transportowego ani działającej usługi przewozowej,</li>
                <li>prezentowane informacje nie stanowią oferty w rozumieniu przepisów Kodeksu cywilnego,</li>
                <li>Serwis nie umożliwia zawierania umów, dokonywania płatności ani obsługi rzeczywistych procesów firmy.</li>
              </ul>
              <p>
                Projekt nie posiada produkcyjnego backendu FleetOps, rzeczywistych kont klientów, komercyjnych integracji GPS, TMS, ERP ani innych systemów operacyjnych.
              </p>
            </section>

            <section class="legal-doc__section" id="terms-functionality" tabindex="-1">
              <h3>4. Funkcjonalności i panel aplikacji</h3>
              <p>
                Serwis może zawierać widoki i funkcje charakterystyczne dla panelu SaaS, takie jak dashboard, zlecenia, flota, kierowcy, raporty, ustawienia, filtry, formularze i przykładowe akcje na danych.
              </p>
              <p>
                Wskazane elementy służą prezentacji rozwiązań projektowych, interfejsu użytkownika oraz implementacji front-end. Dane wprowadzane w panelu albo formularzach powinny mieć wyłącznie charakter testowy i nie powinny dotyczyć realnych klientów, kierowców, pojazdów ani zleceń.
              </p>
              <p>
                Dane lokalne i preferencje mogą być zapisywane w przeglądarce użytkownika. Szczegółowe informacje o localStorage, sessionStorage, cookies i danych kontaktowych opisują dokumenty
                <a class="legal-doc__link" href="/privacy/">Polityka prywatności</a>
                oraz
                <a class="legal-doc__link" href="/cookies/">Polityka cookies</a>.
              </p>
            </section>

            <section class="legal-doc__section" id="terms-intellectual-property" tabindex="-1">
              <h3>5. Własność intelektualna</h3>
              <p>
                Układ graficzny, struktura Serwisu, treści, koncepcja produktu, elementy wizualne oraz kod źródłowy FleetOps stanowią utwór i podlegają ochronie prawnej. Prawa do projektu przysługują Kamilowi Królowi działającemu w kontekście KP_Code Digital Studio, o ile wyraźnie nie wskazano inaczej.
              </p>
              <ul>
                <li>dopuszczalne jest przeglądanie Serwisu w celach informacyjnych, prezentacyjnych i oceny możliwości współpracy,</li>
                <li>zabronione jest kopiowanie, rozpowszechnianie, modyfikowanie lub komercyjne wykorzystywanie projektu bez uprzedniej zgody właściciela praw,</li>
                <li>niedozwolone jest przedstawianie FleetOps jako własnego produktu, wdrożenia produkcyjnego albo realnej platformy transportowej.</li>
              </ul>
            </section>

            <section class="legal-doc__section" id="terms-contact" tabindex="-1">
              <h3>6. Formularz kontaktowy i komunikacja</h3>
              <p>
                Formularz kontaktowy oraz linki kontaktowe służą do komunikacji w sprawie FleetOps, podobnych realizacji, usług KP_Code Digital Studio lub pytań dotyczących projektu. W aktualnej implementacji formularz kontaktowy działa po stronie przeglądarki i nie wysyła danych do produkcyjnego backendu FleetOps.
              </p>
              <p>
                Wysłanie wiadomości e-mail na adres
                <a class="legal-doc__link" href="mailto:kontakt@kp-code.pl">kontakt@kp-code.pl</a>
                nie powoduje automatycznego zawarcia umowy, złożenia zamówienia ani powstania zobowiązania po stronie Operatora. Odpowiedź jest udzielana w rozsądnym terminie, z uwzględnieniem charakteru zapytania i dostępności Operatora.
              </p>
              <p>
                Użytkownik nie powinien przekazywać w formularzach ani wiadomościach haseł, danych wrażliwych, danych produkcyjnych, tajemnic przedsiębiorstwa ani innych informacji, które nie są potrzebne do obsługi zapytania.
              </p>
            </section>

            <section class="legal-doc__section" id="terms-liability" tabindex="-1">
              <h3>7. Odpowiedzialność</h3>
              <p>
                Operator dokłada należytej staranności, aby Serwis działał prawidłowo i przedstawiał projekt w sposób rzetelny, jednak FleetOps jest udostępniany w aktualnym stanie technicznym, bez gwarancji ciągłości działania, kompletności funkcji ani przydatności do konkretnego zastosowania produkcyjnego.
              </p>
              <ul>
                <li>Operator nie ponosi odpowiedzialności za decyzje podjęte na podstawie przykładowych treści, danych lub widoków panelu,</li>
                <li>Operator nie odpowiada za wykorzystanie Serwisu niezgodnie z jego przeznaczeniem,</li>
                <li>Operator nie gwarantuje dostępności Serwisu w każdym czasie ani braku przerw technicznych, błędów interfejsu lub utraty danych zapisanych lokalnie w przeglądarce.</li>
              </ul>
            </section>

            <section class="legal-doc__section" id="terms-external-links" tabindex="-1">
              <h3>8. Linki zewnętrzne</h3>
              <p>
                Serwis może zawierać odnośniki do zewnętrznych stron internetowych, w tym profili społecznościowych, map, narzędzi technicznych lub innych usług podmiotów trzecich.
              </p>
              <p>
                Operator nie ponosi odpowiedzialności za treść, dostępność, bezpieczeństwo ani zasady przetwarzania danych obowiązujące w zewnętrznych serwisach. Korzystanie z takich stron odbywa się na zasadach określonych przez ich administratorów.
              </p>
            </section>

            <section class="legal-doc__section" id="terms-security" tabindex="-1">
              <h3>9. Bezpieczeństwo i zasady korzystania</h3>
              <p>
                Użytkownik powinien korzystać z aktualnej przeglądarki internetowej oraz dbać o bezpieczeństwo swojego urządzenia, połączenia sieciowego i danych wpisywanych w Serwisie.
              </p>
              <ul>
                <li>zakazane są próby obejścia zabezpieczeń, ingerencji w działanie Serwisu lub uzyskania nieuprawnionego dostępu,</li>
                <li>zakazane jest generowanie sztucznego ruchu, automatycznych zgłoszeń, spamu lub nadużywanie formularzy,</li>
                <li>zakazane jest wykorzystywanie FleetOps jako systemu do obsługi rzeczywistych danych operacyjnych, danych osobowych lub procesów firmy bez odrębnego, właściwie przygotowanego wdrożenia.</li>
              </ul>
            </section>

            <section class="legal-doc__section" id="terms-changes" tabindex="-1">
              <h3>10. Zmiany regulaminu</h3>
              <p>
                Operator może wprowadzać zmiany w niniejszym regulaminie w szczególności w przypadku aktualizacji projektu, zmian technicznych, zmian treści, nowych funkcjonalności, korekt bezpieczeństwa lub zmian przepisów prawa.
              </p>
              <p>
                Zmiany wchodzą w życie z dniem publikacji aktualnej wersji regulaminu w Serwisie, o ile w treści dokumentu nie wskazano innego terminu.
              </p>
            </section>

            <section class="legal-doc__section" id="terms-final" tabindex="-1">
              <h3>11. Postanowienia końcowe</h3>
              <p>
                W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają odpowiednie przepisy prawa. Regulamin dotyczy wyłącznie projektu FleetOps oraz zasad korzystania z publicznie prezentowanego Serwisu.
              </p>
              <p>
                Pytania dotyczące projektu, regulaminu lub współpracy można kierować na adres
                <a class="legal-doc__link" href="mailto:kontakt@kp-code.pl">kontakt@kp-code.pl</a>.
              </p>
              <p class="legal-doc__meta">
                Data ostatniej aktualizacji:
                <time datetime="2026-06-05">05.06.2026</time>
              </p>
            </section>
          </div>
        </article>
      </section>

      <section class="section-tight">
        <div class="cta-panel">
          <div class="cta-panel__header">
            <h2 class="cta-panel__title">Masz pytania o regulamin?</h2>
            <p class="cta-panel__lead">Skontaktuj się, jeśli chcesz doprecyzować zasady korzystania z FleetOps lub omówić podobny projekt dla swojej firmy.</p>
          </div>
          <div class="cta-panel__actions">
            <a class="button button--primary" href="/contact/">Kontakt</a>
            <a class="button button--secondary" href="/#/app">Przejdź do panelu</a>
          </div>
        </div>
      </section>
    `,
  });

  const links = Array.from(document.querySelectorAll(".legal-nav__link"));
  const cleanups = links.map((link) => {
    const handleClick = (event) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#terms-")) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      const behavior = window.FleetUI?.getMotionSafeScrollBehavior
        ? FleetUI.getMotionSafeScrollBehavior()
        : "smooth";

      target.scrollIntoView({ behavior, block: "start" });
      target.focus({ preventScroll: true });
    };

    link.addEventListener("click", handleClick);
    return () => link.removeEventListener("click", handleClick);
  });

  if (window.CleanupRegistry && typeof CleanupRegistry.add === "function") {
    CleanupRegistry.add(() => cleanups.forEach((cleanup) => cleanup()));
  }
}

function renderCookiesPage() {
  renderMarketingShell({
    title: "Polityka cookies",
    eyebrow: "Polityka cookies",
    lead: "Informacje o cookies, danych lokalnych przeglądarki, cache, ustawieniach interfejsu oraz kontroli tych mechanizmów w projekcie FleetOps.",
    description: "Polityka cookies FleetOps. Zasady dotyczące cookies, localStorage, sessionStorage, cache, preferencji przeglądarki i technicznych mechanizmów projektu KP_Code Digital Studio.",
    body: `
      <section class="section-tight">
        <nav class="legal-nav" aria-label="Spis treści polityki cookies">
          <div class="legal-nav__box">
            <p class="tag">Spis treści</p>
            <ol class="legal-nav__list">
              <li><a class="legal-nav__link" href="#cookies-general">Postanowienia ogólne</a></li>
              <li><a class="legal-nav__link" href="#cookies-definition">Czym są cookies i podobne technologie</a></li>
              <li><a class="legal-nav__link" href="#cookies-types">Rodzaje cookies i danych lokalnych</a></li>
              <li><a class="legal-nav__link" href="#cookies-purposes">Cele wykorzystywania mechanizmów przeglądarki</a></li>
              <li><a class="legal-nav__link" href="#cookies-legal-basis">Podstawy prawne</a></li>
              <li><a class="legal-nav__link" href="#cookies-management">Zarządzanie ustawieniami</a></li>
              <li><a class="legal-nav__link" href="#cookies-third-parties">Technologie podmiotów trzecich</a></li>
              <li><a class="legal-nav__link" href="#cookies-local-storage">localStorage, sessionStorage i cache</a></li>
              <li><a class="legal-nav__link" href="#cookies-changes">Zmiany polityki cookies</a></li>
              <li><a class="legal-nav__link" href="#cookies-contact">Kontakt</a></li>
            </ol>
          </div>
        </nav>
      </section>

      <section class="section-tight">
        <article class="legal-doc" aria-labelledby="cookies-document-title">
          <div class="section-header">
            <p class="tag">Dokument</p>
            <h2 class="section-header__title" id="cookies-document-title">Zasady cookies i danych lokalnych FleetOps</h2>
            <p class="section-header__lead">
              Dokument wyjaśnia, jakie mechanizmy przeglądarki mogą być wykorzystywane podczas korzystania z publicznej strony i panelu FleetOps.
            </p>
          </div>

          <div class="legal-doc__content">
            <section class="legal-doc__section" id="cookies-general" tabindex="-1">
              <h3>1. Postanowienia ogólne</h3>
              <p>
                Niniejsza Polityka cookies określa zasady wykorzystywania plików cookies oraz technologii o podobnym charakterze w ramach projektu FleetOps przygotowanego przez KP_Code Digital Studio.
              </p>
              <p>
                FleetOps jest profesjonalnym projektem referencyjnym typu SaaS dla obszaru floty, transportu i operacji logistycznych. Projekt został zaprojektowany i wykonany przez Kamila Króla, który jest jego twórcą, właścicielem i dysponentem praw.
              </p>
              <p>
                Dokument ma charakter informacyjny i projektowy. FleetOps nie stanowi realnego operatora transportowego, produkcyjnej usługi flotowej ani systemu do obsługi rzeczywistych procesów przedsiębiorstwa.
              </p>
              <p>
                W zakresie nieuregulowanym niniejszą Polityką cookies zastosowanie mają dokumenty
                <a class="legal-doc__link" href="/privacy/">Polityka prywatności</a>
                oraz
                <a class="legal-doc__link" href="/terms/">Regulamin</a>.
              </p>
            </section>

            <section class="legal-doc__section" id="cookies-definition" tabindex="-1">
              <h3>2. Czym są cookies i podobne technologie</h3>
              <p>
                Pliki cookies to niewielkie informacje tekstowe zapisywane na urządzeniu użytkownika przez przeglądarkę internetową. Mogą wspierać prawidłowe działanie strony, utrzymanie ustawień, bezpieczeństwo oraz stabilność techniczną.
              </p>
              <p>
                Technologie podobne do cookies obejmują między innymi localStorage, sessionStorage, cache przeglądarki oraz inne mechanizmy pozwalające zapisywać albo odczytywać informacje lokalnie po stronie urządzenia użytkownika.
              </p>
              <p>
                W FleetOps mechanizmy tego typu są związane przede wszystkim z działaniem interfejsu, zachowaniem preferencji, lokalnymi danymi referencyjnymi oraz nawigacją w przeglądarce.
              </p>
            </section>

            <section class="legal-doc__section" id="cookies-types" tabindex="-1">
              <h3>3. Rodzaje cookies i danych lokalnych</h3>
              <p>
                W zależności od środowiska uruchomienia Serwisu mogą występować cookies techniczne, mechanizmy pamięci lokalnej przeglądarki oraz dane cache potrzebne do wyświetlenia zasobów strony.
              </p>
              <ul>
                <li>cookies techniczne mogą wspierać prawidłowe działanie strony lub infrastruktury hostingu,</li>
                <li>dane funkcjonalne mogą obejmować preferencje interfejsu, takie jak motyw, tryb kompaktowy i zakres dashboardu,</li>
                <li>dane lokalne mogą obejmować filtry, preferencje list, status logowania testowego, użytkownika referencyjnego, dane domenowe, aktywność oraz kolejkę działań offline,</li>
                <li>cache przeglądarki może przechowywać zasoby strony, takie jak pliki HTML, CSS, JavaScript, obrazy, fonty lub inne elementy potrzebne do jej szybszego wyświetlenia.</li>
              </ul>
              <p>
                W aktualnym kodzie projektu nie przewidziano analitycznych cookies, reklamowych cookies, tracking scripts ani zewnętrznych pikseli marketingowych.
              </p>
            </section>

            <section class="legal-doc__section" id="cookies-purposes" tabindex="-1">
              <h3>4. Cele wykorzystywania mechanizmów przeglądarki</h3>
              <p>
                Mechanizmy przeglądarki mogą być wykorzystywane w FleetOps w celach technicznych, funkcjonalnych i organizacyjnych związanych z prezentacją projektu oraz działaniem panelu front-end.
              </p>
              <ul>
                <li>zapewnienie prawidłowego działania strony, panelu i nawigacji,</li>
                <li>zapamiętanie ustawień interfejsu, takich jak motyw, tryb kompaktowy i zakres danych w dashboardzie,</li>
                <li>utrzymanie lokalnych danych referencyjnych, filtrów, preferencji widoków i stanu wybranych elementów panelu,</li>
                <li>obsługa technicznego zapamiętania ścieżki powrotu po logowaniu testowym,</li>
                <li>poprawa stabilności i szybkości wyświetlania zasobów przez cache przeglądarki.</li>
              </ul>
              <p>
                Zakres danych może zależeć od używanej przeglądarki, ustawień użytkownika, sposobu hostingu oraz aktualnej wersji projektu FleetOps.
              </p>
            </section>

            <section class="legal-doc__section" id="cookies-legal-basis" tabindex="-1">
              <h3>5. Podstawy prawne</h3>
              <p>
                Stosowanie cookies i podobnych technologii odbywa się zgodnie z właściwymi przepisami dotyczącymi prywatności, ochrony danych osobowych oraz łączności elektronicznej, w tym RODO, jeżeli dane techniczne mogą zostać uznane za dane osobowe.
              </p>
              <p>
                Dla mechanizmów niezbędnych do prawidłowego działania Serwisu podstawą może być prawnie uzasadniony interes Operatora polegający na zapewnieniu bezpieczeństwa, stabilności i poprawnego działania strony.
              </p>
              <p>
                Jeżeli w przyszłości w FleetOps zostałyby wdrożone cookies lub narzędzia inne niż niezbędne, w szczególności analityczne albo marketingowe, ich stosowanie powinno być poprzedzone odpowiednią informacją oraz mechanizmem zgody użytkownika, jeżeli wymagają tego przepisy prawa.
              </p>
            </section>

            <section class="legal-doc__section" id="cookies-management" tabindex="-1">
              <h3>6. Zarządzanie ustawieniami</h3>
              <p>
                Użytkownik może zarządzać cookies, cache oraz danymi lokalnymi z poziomu ustawień swojej przeglądarki internetowej. Dostępne opcje zależą od przeglądarki, urządzenia i konfiguracji prywatności.
              </p>
              <ul>
                <li>można ograniczyć albo zablokować zapisywanie cookies,</li>
                <li>można usunąć zapisane wcześniej cookies, dane witryny, cache, localStorage albo sessionStorage,</li>
                <li>w panelu FleetOps można skorzystać z funkcji resetu danych lokalnych, jeżeli jest dostępna w danym widoku ustawień.</li>
              </ul>
              <p>
                Ograniczenie lub usunięcie danych lokalnych może spowodować utratę zapisanych preferencji, lokalnych zmian testowych, filtrów, ustawień widoków oraz powrót projektu do stanu początkowego.
              </p>
            </section>

            <section class="legal-doc__section" id="cookies-third-parties" tabindex="-1">
              <h3>7. Technologie podmiotów trzecich</h3>
              <p>
                W aktualnym kodzie FleetOps nie stwierdzono zewnętrznych narzędzi analitycznych, reklamowych, tracking scripts ani pikseli marketingowych, które służyłyby profilowaniu użytkowników.
              </p>
              <p>
                W zależności od sposobu publikacji Serwis może być obsługiwany przez dostawców hostingu, infrastruktury IT, domeny, poczty elektronicznej lub narzędzi technicznych. Takie podmioty mogą przetwarzać podstawowe dane techniczne, na przykład logi serwera, adres IP, informacje o żądaniu, typ przeglądarki lub dane bezpieczeństwa.
              </p>
              <p>
                Zasady działania usług zewnętrznych określają ich własne polityki prywatności i regulaminy. Operator nie odpowiada za treść ani praktyki prywatności stron zewnętrznych, do których użytkownik przechodzi poza FleetOps.
              </p>
            </section>

            <section class="legal-doc__section" id="cookies-local-storage" tabindex="-1">
              <h3>8. localStorage, sessionStorage i cache</h3>
              <p>
                FleetOps działa głównie po stronie przeglądarki. Mechanizm localStorage może przechowywać ustawienia i dane referencyjne, takie jak motyw, tryb kompaktowy, zakres dashboardu, status logowania testowego, aktualny użytkownik, filtry, preferencje list, aktywność, dane domenowe oraz kolejkę działań offline.
              </p>
              <p>
                Mechanizm sessionStorage może być wykorzystywany technicznie przez router do tymczasowego zapamiętania ścieżki powrotu po logowaniu testowym. Taki zapis jest związany z bieżącą sesją przeglądarki.
              </p>
              <p>
                Cache przeglądarki może przechowywać zasoby potrzebne do wyświetlenia strony. Usunięcie cache albo danych witryny może wymagać ponownego pobrania zasobów i odtworzenia preferencji interfejsu.
              </p>
              <p>
                Szczegółowe informacje o danych lokalnych i prywatności opisuje
                <a class="legal-doc__link" href="/privacy/">Polityka prywatności</a>.
              </p>
            </section>

            <section class="legal-doc__section" id="cookies-changes" tabindex="-1">
              <h3>9. Zmiany polityki cookies</h3>
              <p>
                Operator może aktualizować niniejszą Politykę cookies w przypadku zmian przepisów prawa, zmian sposobu hostingu, rozwoju funkcji FleetOps, korekt technicznych lub zmiany technologii używanych w projekcie.
              </p>
              <p>
                Aktualna wersja dokumentu jest publikowana w Serwisie. Zmiany wchodzą w życie z dniem publikacji, o ile w treści dokumentu nie wskazano innego terminu.
              </p>
            </section>

            <section class="legal-doc__section" id="cookies-contact" tabindex="-1">
              <h3>10. Kontakt</h3>
              <p>
                W sprawach związanych z cookies, danymi lokalnymi, zasadami prywatności lub projektem FleetOps można skontaktować się z KP_Code Digital Studio pod adresem
                <a class="legal-doc__link" href="mailto:kontakt@kp-code.pl">kontakt@kp-code.pl</a>.
              </p>
              <p>
                Wiadomości są obsługiwane w zakresie potrzebnym do odpowiedzi na zapytanie i wyjaśnienia zasad działania projektu.
              </p>
              <p class="legal-doc__meta">
                Data ostatniej aktualizacji:
                <time datetime="2026-06-05">05.06.2026</time>
              </p>
            </section>
          </div>
        </article>
      </section>

      <section class="section-tight">
        <div class="cta-panel">
          <div class="cta-panel__header">
            <h2 class="cta-panel__title">Masz pytania o cookies?</h2>
            <p class="cta-panel__lead">Skontaktuj się, jeśli chcesz doprecyzować zasady cookies, danych lokalnych lub działania FleetOps w przeglądarce.</p>
          </div>
          <div class="cta-panel__actions">
            <a class="button button--primary" href="/contact/">Kontakt</a>
            <a class="button button--secondary" href="/#/app">Przejdź do panelu</a>
          </div>
        </div>
      </section>
    `,
  });

  const links = Array.from(document.querySelectorAll(".legal-nav__link"));
  const cleanups = links.map((link) => {
    const handleClick = (event) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#cookies-")) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      const behavior = window.FleetUI?.getMotionSafeScrollBehavior
        ? FleetUI.getMotionSafeScrollBehavior()
        : "smooth";

      target.scrollIntoView({ behavior, block: "start" });
      target.focus({ preventScroll: true });
    };

    link.addEventListener("click", handleClick);
    return () => link.removeEventListener("click", handleClick);
  });

  if (window.CleanupRegistry && typeof CleanupRegistry.add === "function") {
    CleanupRegistry.add(() => cleanups.forEach((cleanup) => cleanup()));
  }
}

window.renderProductPage = renderProductPage;
window.renderFeaturesPage = renderFeaturesPage;
window.renderPricingPage = renderPricingPage;
window.renderSecurityPage = renderSecurityPage;
window.renderCareersPage = renderCareersPage;
window.renderAboutPage = renderAboutPage;
window.renderContactPage = renderContactPage;
window.renderPrivacyPage = renderPrivacyPage;
window.renderTermsPage = renderTermsPage;
window.renderCookiesPage = renderCookiesPage;
