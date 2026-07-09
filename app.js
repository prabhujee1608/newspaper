/* ==========================================================================
   JAN JAGRITI NETWORK - Main Application Engine
   ========================================================================== */

// ==========================================================================
// JAN JAGRITI NETWORK - Configurations
// ==========================================================================
// Set USE_WORDPRESS to true to sync articles from a WordPress site API.
// Set USE_WORDPRESS to false to use the local CMS Publishing Dashboard and browser database.
const USE_WORDPRESS = false; 

// Your WordPress Site REST API Target URL (E.g. "https://yournewswebsite.com")
const WORDPRESS_SITE_URL = "";

// Pre-seeded News Articles Database
const DEFAULT_ARTICLES = [
    {
        id: "art-1",
        title: "Global Leaders Sign Historic Fusion Energy Accord at Geneva Summit",
        author: "Alistair Cooke",
        category: "environment",
        date: "July 9, 2026",
        abstract: "A historic breakthrough as 195 nations agree to fund and build commercial fusion power grids, paving the way for clean, limitless electricity.",
        image: "assets/environment.png",
        tag: "GLOBAL PACT",
        trending: true,
        content: `
            <p class="first-para">In what is being hailed as the most significant international treaty since the turn of the century, delegates from 195 nations at the Geneva Climate Summit have officially signed the Global Fusion Energy Accord. The treaty commits signatories to a joint fund of $850 billion over the next decade to construct the world's first commercial-scale thermonuclear fusion power grids, potentially solving humanity's energy crisis forever.</p>
            <p>Fusion energy, long considered a distant dream of physics, mimics the nuclear reactions that power the sun. Unlike current fission reactors, fusion produces no long-lived radioactive waste, carries zero risk of meltdown, and relies on isotopes of hydrogen easily extracted from water. The accord details a shared intellectual property framework, allowing developing nations immediate access to design schematics for localized grid implementation.</p>
            <p><strong>\"Today, we have chosen to light our own stars,\"</strong> declared Dr. Aris Thorne, Director of the International Thermonuclear Fusion Project, during the signing ceremony. <strong>\"By pooling scientific minds and financial capital on an unprecedented scale, we are ending the era of fossil dependence and embarking on a century of limitless, clean carbon-free electricity.\"</strong></p>
            <p>Critics of the accord have raised concerns regarding the massive upfront capital requirements and the technical hurdles that remain in stabilizing plasma confinement for continuous output. However, the energy ministries of the United States, China, and the European Union issued a joint statement expressing absolute confidence in current magnetic confinement prototypes, citing successful runs that generated net-energy yields exceeding 300% for consecutive weeks.</p>
            <p>Under the treaty guidelines, the first cluster of commercial reactors will break ground in central Europe and East Asia late next year, with power distribution slated to connect to national grids by 2031. For citizens worldwide, this translates to clean energy prices projected to fall by up to 70% within two decades, radically changing manufacturing, transport, and daily life.</p>
        `
    },
    {
        id: "art-2",
        title: "Silicon Valley Unveils First Commercially Viable Quantum Processing Units",
        author: "Marcus Vance",
        category: "technology",
        date: "July 8, 2026",
        abstract: "Tech giants achieve quantum supremacy in commercial chips, introducing computing power that operates at room temperature.",
        image: "assets/tech.png",
        tag: "COMPUTING SUPREMACY",
        trending: true,
        content: `
            <p class="first-para">A coalition of silicon valley hardware developers has stunned the scientific community by announcing the commercial availability of the Helios-Q1, the first-ever 512-qubit quantum processing unit (QPU) that operates without the need for sub-zero liquid helium cooling systems. Operating at standard room temperature, this chip marks a monumental shift from laboratory research to general commercial deployment.</p>
            <p>Until now, quantum computers were massive structures confined to specialized server rooms, requiring cooling systems colder than deep space to maintain qubit coherence. The Helios-Q1 achieves stabilization through a novel carbon-diamond lattice structure, shielding qubits from thermal noise and allowing integration into conventional server cabinets.</p>
            <p>The implications for software developers, cryptographers, and research facilities are staggering. Tasks that once took supercomputers years to model—such as complex chemical molecular simulation, global logistical optimization, and advanced artificial intelligence model training—can now be computed in seconds. Major cloud providers have already announced plans to deploy the chips in server clusters beginning this autumn.</p>
            <p>However, security analysts are warning of a major threat to global encryption frameworks. The processing power of a 512-qubit chip could theoretically decrypt conventional RSA-2048 keys in real-time. In response, cybersecurity standards agencies are urging banks and government bodies to accelerate migration plans to quantum-resistant encryption algorithms immediately.</p>
        `
    },
    {
        id: "art-3",
        title: "Federal Reserve Announces Digital Dollar Pilot Program for Wholesale Settlements",
        author: "Sarah Jenkins",
        category: "finance",
        date: "July 7, 2026",
        abstract: "A major overhaul of the financial system as the central bank initiates phase one of its blockchain-based wholesale settlement network.",
        image: "assets/finance.png",
        tag: "DIGITAL DECURRENCY",
        trending: false,
        content: `
            <p class="first-para">In a bid to modernize the global financial system and secure the dollar's position in digital commerce, the Federal Reserve has launched the Digital Dollar Pilot Program. Built on a private, permissioned ledger system, this digital asset is designed to facilitate instantaneous, cross-border wholesale settlements between central banks, commercial lenders, and international clearinghouses.</p>
            <p>Wholesale transactions, which involve the movement of billions of dollars daily between global banks, currently rely on legacy netting systems that can take up to three business days to fully settle, locking up immense capital. The digital dollar ledger clears transactions in under three seconds with cryptographic proof of finality.</p>
            <p><strong>\"The speed of money must match the speed of global trade,\"</strong> said Federal Reserve Governor Alan Ross. <strong>\"Our digital dollar network will slash transactional costs, eliminate counterparty risks, and unlock trillions in liquid assets that are currently frozen in clearing channels.\"</strong></p>
            <p>Commercial banking representatives have expressed cautious optimism, stressing the absolute need for robust regulatory oversight and privacy protections. The Fed has reassured market participants that the initial phase is strictly wholesale and will not replace paper currency or retail banking accounts, but rather serve as a backend pipeline system to accelerate trade velocity.</p>
        `
    },
    {
        id: "art-4",
        title: "Singapore Transforming Urban Centers Into Vertical Forest Biomes",
        author: "Clara Croft",
        category: "environment",
        date: "July 6, 2026",
        abstract: "How vertical forests and natural ventilation systems are transforming urban centers into self-sustaining biomes.",
        image: "assets/environment.png",
        tag: "URBAN RENEWAL",
        trending: false,
        content: `
            <p class="first-para">As the impacts of climate change trigger rising temperatures in metropolitan centers, urban architects in Singapore are completing the first phases of the 'Forest Canopy City' project. The initiative has successfully covered 12 major skyscrapers in living vertical forests, planting over 450,000 native trees, shrubs, and climbers directly onto tower facades.</p>
            <p>Urban heat islands—where concrete and asphalt absorb solar radiation and raise ambient temperatures—have long plagued major cities. By enveloping glass towers in dense vegetation, these living buildings cool down structures by up to 6°C through evapotranspiration, reducing air conditioning power consumption in offices by 40%.</p>
            <p>Beyond thermal cooling, the foliage filters out carbon dioxide and particulate matter while harboring hundreds of bird and pollinator species, restoring local biodiversity. Natural water collection channels run down the facades, recycling heavy monsoon rains to feed automated hydroponic drip systems, rendering the entire watering process self-contained.</p>
        `
    },
    {
        id: "art-5",
        title: "Medical Regulators Approve Neural Implant to Restore Functional Vision",
        author: "Dr. Evelyn Ross",
        category: "technology",
        date: "July 5, 2026",
        abstract: "Medical regulators approve implantable microchips that bypass damaged optical systems to restore functional sight.",
        image: "assets/tech.png",
        tag: "BIOMEDICAL WONDER",
        trending: true,
        content: `
            <p class="first-para">In a landmark decision for neuro-restorative medicine, international health agencies have approved the 'OptiCore-X,' an implantable microchip designed to bypass damaged eyes and optical nerves, transmitting visual data directly to the visual cortex of the brain. The device offers functional sight restoration for patients suffering from total blindness due to macular degeneration or optic nerve trauma.</p>
            <p>The system consists of a pair of specialized glasses equipped with high-resolution cameras, a processing unit that translates visual light into neural electrical signals, and a tiny array of micro-electrodes implanted on the occipital lobe. The electrical stimulations mimic light signals, creating a grid of visual points—referred to as phosphenes—that allow the brain to compile an image of the physical world.</p>
            <p>Clinical trials yielded extraordinary results. Patients who had spent decades in absolute darkness were successfully able to navigate unfamiliar rooms, recognize shapes, and read large-text fonts. <strong>\"It's like seeing the world in an elegant pixel grid,\"</strong> shared Arthur Bennett, one of the pilot trial participants. <strong>\"After thirty years, seeing the outline of my daughter's face was an indescribable miracle.\"</strong></p>
        `
    },
    {
        id: "art-6",
        title: "Zero-Emission Shipping Lanes Redraw the Map of Maritime Trade",
        author: "Derrick Chen",
        category: "finance",
        date: "July 4, 2026",
        abstract: "Zero-emission shipping lanes and carbon-taxed ports redraw the map of international maritime commerce.",
        image: "assets/finance.png",
        tag: "LOGISTICS SHIFT",
        trending: false,
        content: `
            <p class="first-para">Maritime logistics networks are experiencing their largest disruption in fifty years as major trade hubs officially implement the 'Green Corridor' initiative. Ports across Northern Europe and East Asia have instituted strict carbon penalties, restricting entry or charging heavy tariffs on ships powered by heavy fuel oils, while offering massive subsidies to vessels using green hydrogen, ammonia, or wind-assisted rotor sails.</p>
            <p>Global shipping accounts for roughly 3% of global carbon emissions. The green corridors serve to force transport conglomerates to transition their fleets. Logistics giants have responded by commissioning fleets of mega-container ships fitted with massive carbon-capture systems and automated sails, dramatically reducing ocean voyage emissions to near zero.</p>
            <p>While the long-term environmental benefits are clear, freight operators note that fuel costs for eco-friendly hydrogen fuels are currently 30% higher, leading to slight increases in consumer goods pricing. Economists believe these costs will stabilize as mass production of green hydrogen ramps up, but warn that developing nations lacking port infrastructure might face temporary trade delays.</p>
        `
    }
];

// Weather City Profiles
const WEATHER_PROFILES = {
    new_delhi: { city: "New Delhi, IND", temp: 32, desc: "Humid / Light Rain", humidity: "78%", wind: "14 km/h", icon: "rain" },
    mumbai: { city: "Mumbai, IND", temp: 29, desc: "Heavy Monsoon", humidity: "88%", wind: "26 km/h", icon: "rain" },
    bengaluru: { city: "Bengaluru, IND", temp: 24, desc: "Partly Cloudy", humidity: "65%", wind: "16 km/h", icon: "cloudy" },
    kolkata: { city: "Kolkata, IND", temp: 31, desc: "Thunderstorms", humidity: "82%", wind: "12 km/h", icon: "rain" },
    chennai: { city: "Chennai, IND", temp: 34, desc: "Humid / Clear Sun", humidity: "70%", wind: "10 km/h", icon: "sun" },
    hyderabad: { city: "Hyderabad, IND", temp: 28, desc: "Overcast", humidity: "72%", wind: "15 km/h", icon: "cloudy" }
};

// Stock Markets List State
let stocks = [
    { symbol: "COMP", name: "NASDAQ Composite", price: 18452.20, change: 120.40, changePct: 0.65 },
    { symbol: "DJIA", name: "Dow Jones Indus.", price: 40125.60, change: -85.10, changePct: -0.21 },
    { symbol: "BTC", name: "Bitcoin USD", price: 68120.00, change: 1420.50, changePct: 2.13 },
    { symbol: "ETH", name: "Ethereum USD", price: 3450.80, change: 75.30, changePct: 2.23 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: -4.20, changePct: -1.66 },
    { symbol: "AAPL", name: "Apple Inc.", price: 218.30, change: 1.85, changePct: 0.85 }
];

/* ==========================================================================
   State Variables
   ========================================================================== */
let articles = [];
let bookmarks = [];
let comments = {};
let currentView = "feed"; // feed, bookmarks, admin, article
let currentCategory = "all";
let searchQuery = "";
let activeArticleId = null;
let fontSizeClass = "font-size-medium";

// Text to Speech State
let activeSpeechUtterance = null;
let isSpeechPlaying = false;
let isSpeechPaused = false;
let ttsVoices = [];

/* ==========================================================================
   Initial Startup & DOM Content Loaded
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Databases from LocalStorage or seed data
    initDatabases();

    // 2. Setup Navigation Events
    initNavigation();

    // 3. Setup CMS Form & Image Upload Handlers
    initCMSForm();

    // 4. Setup Theme Toggle
    initTheme();

    // 5. Setup Font Sizing & Bookmark toggling in reader
    initReaderControls();

    // 6. Setup Live Widgets
    initLiveWidgets();

    // 7. Setup Comments submission
    initCommentsForm();

    // 8. Load voices for TTS
    initTTSVoices();

    // 9. Perform initial render of feed
    if (USE_WORDPRESS) {
        // WordPress Mode: Hide Publish buttons and pull live posts
        const navWriteBtn = document.getElementById("nav-write");
        if (navWriteBtn) navWriteBtn.style.display = "none";
        fetchWordPressArticles();
    } else {
        // Local CMS Mode
        renderApp();
    }

    // 10. Load legal & about page content from WordPress or local cache
    loadLegalPages();
});

/* ==========================================================================
   Database Initializer
   ========================================================================== */
function initDatabases() {
    // Load Articles
    const localArticles = localStorage.getItem("the_chronicle_articles");
    if (localArticles) {
        articles = JSON.parse(localArticles);
    } else {
        articles = [...DEFAULT_ARTICLES];
        localStorage.setItem("the_chronicle_articles", JSON.stringify(articles));
    }

    // Load Bookmarks
    const localBookmarks = localStorage.getItem("the_chronicle_bookmarks");
    if (localBookmarks) {
        bookmarks = JSON.parse(localBookmarks);
    } else {
        bookmarks = [];
        localStorage.setItem("the_chronicle_bookmarks", JSON.stringify(bookmarks));
    }

    // Load Comments
    const localComments = localStorage.getItem("the_chronicle_comments");
    if (localComments) {
        comments = JSON.parse(localComments);
    } else {
        comments = {};
        // Add a default comment on Article 1 to make it look active
        comments["art-1"] = [
            {
                id: "c-1",
                author: "Professor Arthur G.",
                text: "This is a massive step forward. Fusion is the only way we can power global vertical agriculture and desalination plants without running into carbon limits.",
                timestamp: "2 hours ago",
                replies: [
                    {
                        id: "c-2",
                        author: "Linus Miller",
                        text: "Completely agree. The grid integration timeline is aggressive, but with centralized funding it is highly achievable.",
                        timestamp: "1 hour ago"
                    }
                ]
            }
        ];
        localStorage.setItem("the_chronicle_comments", JSON.stringify(comments));
    }
}

/* ==========================================================================
   SPA Router & Navigation Handler
   ========================================================================== */
function initNavigation() {
    // Brand Logo click -> Reset filters, go home
    document.getElementById("brand-logo").addEventListener("click", (e) => {
        e.preventDefault();
        resetSearch();
        currentCategory = "all";
        updateCategoryTabHighlight();
        switchView("feed");
    });

    // Category Tabs click
    const categoryTabs = document.querySelectorAll(".nav-tab");
    categoryTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const category = tab.getAttribute("data-category");
            resetSearch();
            currentCategory = category;
            
            // Highlight active tab
            categoryTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            switchView("feed");
        });
    });

    // Bookmarks page button
    document.getElementById("nav-bookmarks").addEventListener("click", () => {
        switchView("bookmarks");
    });

    // Write / CMS page button
    document.getElementById("nav-write").addEventListener("click", () => {
        switchView("admin");
    });

    // Footer Legal Pages
    const aboutBtn = document.getElementById("footer-about-btn");
    if (aboutBtn) {
        aboutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            switchView("about");
        });
    }
    const privacyBtn = document.getElementById("footer-privacy-btn");
    if (privacyBtn) {
        privacyBtn.addEventListener("click", (e) => {
            e.preventDefault();
            switchView("privacy");
        });
    }
    const termsBtn = document.getElementById("footer-terms-btn");
    if (termsBtn) {
        termsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            switchView("terms");
        });
    }

    // Back to home buttons inside views
    document.querySelectorAll(".btn-back").forEach(btn => {
        btn.addEventListener("click", () => {
            switchView("feed");
        });
    });

    // Footer categories links
    document.querySelectorAll(".cat-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const cat = link.getAttribute("data-cat");
            resetSearch();
            currentCategory = cat;
            
            // Sync highlight to navigation tabs
            categoryTabs.forEach(tab => {
                if (tab.getAttribute("data-category") === cat) {
                    tab.classList.add("active");
                } else {
                    tab.classList.remove("active");
                }
            });
            
            switchView("feed");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // Browse news button in Empty Bookmarks State
    document.querySelector(".go-home-btn").addEventListener("click", () => {
        switchView("feed");
    });

    // Search bar typing
    const searchInput = document.getElementById("search-input");
    const searchClear = document.getElementById("search-clear-btn");

    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        if (searchQuery.length > 0) {
            searchClear.style.display = "block";
        } else {
            searchClear.style.display = "none";
        }
        
        // When searching, force view to feed
        if (currentView !== "feed") {
            currentView = "feed";
            document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));
            document.getElementById("view-feed").classList.add("active");
        }
        
        renderArticlesList();
    });

    searchClear.addEventListener("click", () => {
        resetSearch();
        renderArticlesList();
    });
}

function resetSearch() {
    searchQuery = "";
    const searchInput = document.getElementById("search-input");
    searchInput.value = "";
    document.getElementById("search-clear-btn").style.display = "none";
}

function updateCategoryTabHighlight() {
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
        if (tab.getAttribute("data-category") === currentCategory) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });
}

function switchView(viewName) {
    // 1. Cancel speech synthesis immediately if navigating away from reader
    if (currentView === "article" && viewName !== "article") {
        cancelSpeech();
    }

    // 2. Set active view state
    currentView = viewName;

    // 3. Toggle CSS active panel class
    document.querySelectorAll(".view-panel").forEach(panel => {
        panel.classList.remove("active");
    });

    const activePanel = document.getElementById(`view-${viewName}`);
    if (activePanel) {
        activePanel.classList.add("active");
    }

    // 4. Trigger specific renders
    if (viewName === "feed") {
        renderArticlesList();
    } else if (viewName === "bookmarks") {
        renderBookmarksList();
    } else if (viewName === "article") {
        renderArticleDetail();
    }

    // 5. Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "instant" });
}

/* ==========================================================================
   News Feed Render Engines (Hero & Grid list)
   ========================================================================== */
function renderArticlesList() {
    const heroContainer = document.getElementById("hero-article-container");
    const gridContainer = document.getElementById("articles-grid");

    // Filter articles based on active category & search query
    let filtered = articles;

    // Apply category filter
    if (currentCategory !== "all") {
        filtered = filtered.filter(art => art.category === currentCategory);
    }

    // Apply search query filter
    if (searchQuery.length > 0) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(art => 
            art.title.toLowerCase().includes(query) || 
            art.abstract.toLowerCase().includes(query) || 
            art.author.toLowerCase().includes(query) ||
            art.tag.toLowerCase().includes(query)
        );
    }

    // Handle Empty Search/Filter State
    if (filtered.length === 0) {
        heroContainer.innerHTML = "";
        gridContainer.innerHTML = `
            <div class="empty-state" style="grid-column: span 2; width: 100%;">
                <svg class="empty-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.56l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg>
                <p>No news articles match your search criteria. Try using different keywords or selecting another category.</p>
            </div>
        `;
        return;
    }

    // The first article in list is rendered in the featured HERO view
    const heroArticle = filtered[0];
    const gridArticles = filtered.slice(1);

    // Render HERO
    const readTimeHero = Math.ceil(heroArticle.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200);
    const isHeroBookmarked = bookmarks.includes(heroArticle.id);

    heroContainer.innerHTML = `
        <div class="hero-card" data-id="${heroArticle.id}">
            <div class="hero-img-wrap">
                <span class="badge badge-${heroArticle.category} hero-meta-badge">${heroArticle.category}</span>
                <img src="${heroArticle.image}" alt="${heroArticle.title}">
            </div>
            <div class="hero-details">
                <div class="hero-date-read">
                    <span>${heroArticle.date}</span>
                    <span>•</span>
                    <span>${readTimeHero} min read</span>
                </div>
                <h2 class="hero-headline">
                    <a href="#" class="view-article-link" data-id="${heroArticle.id}">${highlightText(heroArticle.title)}</a>
                </h2>
                <p class="hero-excerpt">${highlightText(heroArticle.abstract)}</p>
                <div class="hero-author-row">
                    <div class="author-avatar">${heroArticle.author.charAt(0)}</div>
                    <div class="author-details">
                        <span class="author-name">${highlightText(heroArticle.author)}</span>
                        <span class="author-title">Senior Correspondent</span>
                    </div>
                    <button class="btn-icon card-bookmark-btn ${isHeroBookmarked ? 'active' : ''}" data-id="${heroArticle.id}" style="margin-left: auto; border:none; background:none;" title="Bookmark">
                        <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2m0 15l-5-2.18L7 18V5h10Z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Render Grid Articles
    let gridHTML = "";
    gridArticles.forEach(art => {
        const readTime = Math.ceil(art.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200);
        const isBookmarked = bookmarks.includes(art.id);
        
        gridHTML += `
            <div class="news-card" data-id="${art.id}">
                <div class="card-img-wrap">
                    <span class="badge badge-${art.category} card-badge">${art.category}</span>
                    <img src="${art.image}" alt="${art.title}">
                </div>
                <div class="card-details">
                    <div class="card-meta-line">
                        <span>${art.date}</span>
                        <span>•</span>
                        <span>${readTime} min read</span>
                    </div>
                    <h3 class="card-headline">
                        <a href="#" class="view-article-link" data-id="${art.id}">${highlightText(art.title)}</a>
                    </h3>
                    <p class="card-excerpt">${highlightText(art.abstract)}</p>
                    <div class="card-footer">
                        <span class="card-author">By ${highlightText(art.author)}</span>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <button class="btn-icon card-bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${art.id}" style="border:none; background:none; width:30px; height:30px;" title="Bookmark">
                                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2m0 15l-5-2.18L7 18V5h10Z"/></svg>
                            </button>
                            <a href="#" class="card-read-more view-article-link" data-id="${art.id}">
                                <span>Read</span>
                                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = gridHTML;

    // Attach click listeners to all dynamically created reading links
    document.querySelectorAll(".view-article-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            activeArticleId = link.getAttribute("data-id");
            switchView("article");
        });
    });

    // Attach click listeners to all card-level bookmark buttons
    document.querySelectorAll(".card-bookmark-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            toggleBookmarkState(id);
            btn.classList.toggle("active");
        });
    });
}

/* ==========================================================================
   Bookmarks Render Engine
   ========================================================================== */
function renderBookmarksList() {
    const grid = document.getElementById("bookmarks-grid");
    const emptyState = document.getElementById("bookmarks-empty");

    if (bookmarks.length === 0) {
        grid.style.display = "none";
        emptyState.style.display = "flex";
        return;
    }

    grid.style.display = "grid";
    emptyState.style.display = "none";

    const bookmarkedArticles = articles.filter(art => bookmarks.includes(art.id));

    let html = "";
    bookmarkedArticles.forEach(art => {
        const readTime = Math.ceil(art.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200);
        html += `
            <div class="news-card" data-id="${art.id}">
                <div class="card-img-wrap">
                    <span class="badge badge-${art.category} card-badge">${art.category}</span>
                    <img src="${art.image}" alt="${art.title}">
                </div>
                <div class="card-details">
                    <div class="card-meta-line">
                        <span>${art.date}</span>
                        <span>•</span>
                        <span>${readTime} min read</span>
                    </div>
                    <h3 class="card-headline">
                        <a href="#" class="view-article-link" data-id="${art.id}">${art.title}</a>
                    </h3>
                    <p class="card-excerpt">${art.abstract}</p>
                    <div class="card-footer">
                        <span class="card-author">By ${art.author}</span>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <button class="btn-icon card-bookmark-btn active" data-id="${art.id}" style="border:none; background:none; width:30px; height:30px;" title="Remove Bookmark">
                                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2m0 15l-5-2.18L7 18V5h10Z"/></svg>
                            </button>
                            <a href="#" class="card-read-more view-article-link" data-id="${art.id}">
                                <span>Read</span>
                                <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;

    // Attach listeners
    document.querySelectorAll("#bookmarks-grid .view-article-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            activeArticleId = link.getAttribute("data-id");
            switchView("article");
        });
    });

    document.querySelectorAll("#bookmarks-grid .card-bookmark-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            toggleBookmarkState(id);
            // Refresh list
            renderBookmarksList();
        });
    });
}

/* ==========================================================================
   Article Detail & Reader view Render
   ========================================================================== */
function renderArticleDetail() {
    const article = articles.find(art => art.id === activeArticleId);
    const container = document.getElementById("active-article-content");
    const bookmarkBtn = document.getElementById("reader-bookmark-btn");

    if (!article) {
        container.innerHTML = "<p>Article not found.</p>";
        return;
    }

    // Update bookmark button state
    const isBookmarked = bookmarks.includes(article.id);
    if (isBookmarked) {
        bookmarkBtn.classList.add("active");
        bookmarkBtn.querySelector("span").textContent = "Bookmarked";
    } else {
        bookmarkBtn.classList.remove("active");
        bookmarkBtn.querySelector("span").textContent = "Bookmark";
    }

    const readTime = Math.ceil(article.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200);

    container.className = `news-article ${fontSizeClass}`;
    container.innerHTML = `
        <div class="news-article-header">
            <div class="article-category-tag">
                <span class="badge badge-${article.category}">${article.category}</span>
            </div>
            <h1 class="article-title-hero">${article.title}</h1>
            <div class="article-meta-card">
                <div class="author-avatar">${article.author.charAt(0)}</div>
                <div>
                    <strong>By ${article.author}</strong>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
                        Published ${article.date} &nbsp;•&nbsp; ${readTime} min read
                    </div>
                </div>
            </div>
        </div>
        <!-- Share Bar -->
        <div class="article-share-bar">
            <span class="share-title">Share Article:</span>
            <!-- WhatsApp -->
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}" target="_blank" class="share-btn share-wa" title="Share to WhatsApp">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.163-1.355a9.96 9.96 0 0 0 4.843 1.258h.005c5.507 0 9.99-4.478 9.99-9.984 0-2.669-1.037-5.176-2.922-7.062A9.92 9.92 0 0 0 12.012 2zm5.72 14.12c-.25.705-1.464 1.278-2.02 1.332-.507.05-1.168.188-3.385-.733-2.836-1.176-4.66-4.062-4.802-4.25-.14-.19-1.13-1.503-1.13-2.868 0-1.365.705-2.03.957-2.302.254-.272.564-.34.761-.34.197 0 .395.002.564.01.183.007.43-.075.676.52.254.612.873 2.128.948 2.278.076.15.126.326.025.523-.1.196-.153.32-.303.494-.15.175-.316.39-.45.522-.15.15-.306.313-.13.613.176.3.784 1.292 1.68 2.09.155.138.3.292.484.37.183.076.29.06.396-.06.106-.12.45-.522.57-.7.12-.178.24-.15.405-.09.167.06 1.055.498 1.238.59.183.09.306.136.35.212.046.076.046.44-.204 1.144z"/></svg>
            </a>
            <!-- Facebook -->
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn share-fb" title="Share to Facebook">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <!-- X / Twitter -->
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn share-x" title="Share to X">
                <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <!-- Copy Link -->
            <button class="share-btn share-copy" id="share-copy-btn" title="Copy Link">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <!-- Print -->
            <button class="share-btn share-print" id="share-print-btn" title="Print Article">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            </button>
        </div>
        <div class="article-hero-img">
            <img src="${article.image}" alt="${article.title}">
        </div>
        <div class="article-body-text">
            ${article.content}
        </div>
        <div class="article-tags">
            <span class="article-tag">#${article.category.toUpperCase()}</span>
            <span class="article-tag">#${article.tag}</span>
            <span class="article-tag">#JANJAGRITI</span>
        </div>
    `;

    // Render comments list
    renderComments();

    // Attach click events for share utilities
    const copyBtn = document.getElementById("share-copy-btn");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(window.location.href)
                .then(() => showToast("Link copied to clipboard!", "success"))
                .catch(() => showToast("Failed to copy link", "alert"));
        });
    }

    const printBtn = document.getElementById("share-print-btn");
    if (printBtn) {
        printBtn.addEventListener("click", () => {
            window.print();
        });
    }
}

/* ==========================================================================
   Highlight Text Search Helper
   ========================================================================== */
function highlightText(text) {
    if (!searchQuery) return text;
    try {
        const escaped = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // Escape regex characters
        const regex = new RegExp(`(${escaped})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    } catch(e) {
        return text;
    }
}

/* ==========================================================================
   Bookmark State Toggle Engine
   ========================================================================== */
function toggleBookmarkState(id) {
    const idx = bookmarks.indexOf(id);
    const article = articles.find(art => art.id === id);
    const titleSnippet = article ? `"${article.title.substring(0, 20)}..."` : 'Article';

    if (idx > -1) {
        bookmarks.splice(idx, 1);
        showToast(`${titleSnippet} removed from bookmarks`, "alert");
    } else {
        bookmarks.push(id);
        showToast(`${titleSnippet} added to bookmarks`, "success");
    }

    localStorage.setItem("the_chronicle_bookmarks", JSON.stringify(bookmarks));

    // If on active article page, sync button UI
    if (currentView === "article" && activeArticleId === id) {
        const bookmarkBtn = document.getElementById("reader-bookmark-btn");
        const isBookmarked = bookmarks.includes(id);
        if (isBookmarked) {
            bookmarkBtn.classList.add("active");
            bookmarkBtn.querySelector("span").textContent = "Bookmarked";
        } else {
            bookmarkBtn.classList.remove("active");
            bookmarkBtn.querySelector("span").textContent = "Bookmark";
        }
    }
}

function initReaderControls() {
    // Sizer Decrease
    document.getElementById("font-dec").addEventListener("click", () => {
        const container = document.getElementById("active-article-content");
        if (fontSizeClass === "font-size-large") {
            fontSizeClass = "font-size-medium";
        } else if (fontSizeClass === "font-size-medium") {
            fontSizeClass = "font-size-small";
        }
        container.className = `news-article ${fontSizeClass}`;
    });

    // Sizer Increase
    document.getElementById("font-inc").addEventListener("click", () => {
        const container = document.getElementById("active-article-content");
        if (fontSizeClass === "font-size-small") {
            fontSizeClass = "font-size-medium";
        } else if (fontSizeClass === "font-size-medium") {
            fontSizeClass = "font-size-large";
        }
        container.className = `news-article ${fontSizeClass}`;
    });

    // Toolbar Bookmark toggle
    document.getElementById("reader-bookmark-btn").addEventListener("click", () => {
        if (activeArticleId) {
            toggleBookmarkState(activeArticleId);
        }
    });
}

/* ==========================================================================
   Comments Engine (Submissions & Nested Replies)
   ========================================================================== */
function initCommentsForm() {
    const form = document.getElementById("comment-submit-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const authorInput = document.getElementById("comment-author");
        const textInput = document.getElementById("comment-text");
        
        const newComment = {
            id: "comment-" + Date.now(),
            author: authorInput.value.trim(),
            text: textInput.value.trim(),
            timestamp: "Just now",
            replies: []
        };

        if (!comments[activeArticleId]) {
            comments[activeArticleId] = [];
        }

        comments[activeArticleId].unshift(newComment);
        localStorage.setItem("the_chronicle_comments", JSON.stringify(comments));

        textInput.value = "";
        authorInput.value = "";
        
        showToast("Comment posted successfully");
        renderComments();
    });
}

function renderComments() {
    const activeComments = comments[activeArticleId] || [];
    const countContainer = document.getElementById("comments-count");
    const listContainer = document.getElementById("comments-list");

    // Calculate total count (comments + inner replies)
    let totalCount = 0;
    activeComments.forEach(c => {
        totalCount++;
        if (c.replies) totalCount += c.replies.length;
    });

    countContainer.textContent = totalCount;

    if (activeComments.length === 0) {
        listContainer.innerHTML = `<p class="text-muted" style="font-size:0.9rem; text-align:center; padding: 15px 0;">No comments yet. Be the first to start the discussion!</p>`;
        return;
    }

    let html = "";
    activeComments.forEach(comment => {
        html += `
            <div class="comment-node" id="${comment.id}">
                <div class="comment-header">
                    <span class="comment-author-name">${comment.author}</span>
                    <span class="comment-time">${comment.timestamp}</span>
                </div>
                <div class="comment-text-body">${comment.text}</div>
                <div class="comment-actions">
                    <button class="comment-action-btn reply-trigger" data-id="${comment.id}">Reply</button>
                </div>
                
                <!-- Reply Input placeholder -->
                <div class="reply-form-container" id="reply-container-${comment.id}" style="display:none;"></div>
                
                <!-- Replies Render -->
                <div class="comment-replies">
                    ${renderCommentReplies(comment.replies || [])}
                </div>
            </div>
        `;
    });

    listContainer.innerHTML = html;

    // Attach reply click triggers
    document.querySelectorAll(".reply-trigger").forEach(btn => {
        btn.addEventListener("click", () => {
            const commentId = btn.getAttribute("data-id");
            toggleReplyForm(commentId);
        });
    });
}

function renderCommentReplies(replies) {
    let html = "";
    replies.forEach(reply => {
        html += `
            <div class="comment-node" style="border-left: 2px solid var(--accent); margin-top:12px;">
                <div class="comment-header">
                    <span class="comment-author-name">${reply.author}</span>
                    <span class="comment-time">${reply.timestamp}</span>
                </div>
                <div class="comment-text-body">${reply.text}</div>
            </div>
        `;
    });
    return html;
}

function toggleReplyForm(commentId) {
    const container = document.getElementById(`reply-container-${commentId}`);
    if (container.style.display === "block") {
        container.style.display = "none";
        container.innerHTML = "";
        return;
    }

    container.style.display = "block";
    container.innerHTML = `
        <div class="comment-form" style="padding: 12px; margin-bottom: 0; background-color: var(--bg-card);">
            <div class="comment-form-row">
                <input type="text" id="reply-author-${commentId}" required placeholder="Your Name" style="padding:6px 10px; font-size:0.8rem;">
            </div>
            <div class="comment-form-row">
                <textarea id="reply-text-${commentId}" required rows="2" placeholder="Write reply..." style="padding:6px 10px; font-size:0.8rem;"></textarea>
            </div>
            <button class="btn btn-primary submit-reply-btn" data-id="${commentId}" style="padding:4px 10px; font-size:0.75rem;">Post Reply</button>
        </div>
    `;

    // Attach submission event
    container.querySelector(".submit-reply-btn").addEventListener("click", () => {
        submitReply(commentId);
    });
}

function submitReply(commentId) {
    const authorInput = document.getElementById(`reply-author-${commentId}`);
    const textInput = document.getElementById(`reply-text-${commentId}`);
    
    const author = authorInput.value.trim();
    const text = textInput.value.trim();

    if (!author || !text) return;

    // Find parent comment
    const activeComments = comments[activeArticleId] || [];
    const parentComment = activeComments.find(c => c.id === commentId);

    if (parentComment) {
        if (!parentComment.replies) parentComment.replies = [];
        parentComment.replies.push({
            id: "reply-" + Date.now(),
            author: author,
            text: text,
            timestamp: "Just now"
        });

        localStorage.setItem("the_chronicle_comments", JSON.stringify(comments));
        showToast("Reply posted successfully");
        renderComments();
    }
}

/* ==========================================================================
   CMS Publishing Logic
   ========================================================================== */
let uploadedImageBase64 = "";

function initCMSForm() {
    const form = document.getElementById("cms-publish-form");
    if (!form) return;

    // Handle Image Upload Base64 conversion and preview
    const imageInput = document.getElementById("cms-image-upload");
    const imagePreview = document.getElementById("image-preview");
    const previewContainer = document.getElementById("image-preview-container");

    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                uploadedImageBase64 = event.target.result;
                imagePreview.src = uploadedImageBase64;
                previewContainer.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            uploadedImageBase64 = "";
            imagePreview.src = "";
            previewContainer.style.display = "none";
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Lock form if WordPress mode is active
        if (USE_WORDPRESS) {
            showToast("Publishing local articles disabled while WordPress is enabled", "alert");
            return;
        }

        const title = document.getElementById("cms-title").value.trim();
        const author = document.getElementById("cms-author").value.trim();
        const category = document.getElementById("cms-category").value;
        const abstract = document.getElementById("cms-abstract").value.trim();
        const tag = document.getElementById("cms-tags").value.trim().toUpperCase();
        const contentBody = document.getElementById("cms-content").value;

        // Process contentBody lines into HTML paragraphs
        const paragraphs = contentBody.split('\n\n').map((para, index) => {
            const cleanPara = para.trim().replace(/\n/g, '<br>');
            if (index === 0) {
                return `<p class="first-para">${cleanPara}</p>`;
            }
            return `<p>${cleanPara}</p>`;
        }).join('\n');

        // Form Date today
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const todayStr = new Date().toLocaleDateString('en-US', options);

        const newArticle = {
            id: "user-art-" + Date.now(),
            title: title,
            author: author,
            category: category,
            date: todayStr,
            abstract: abstract,
            image: uploadedImageBase64 || "assets/tech.png",
            tag: tag,
            trending: false,
            content: paragraphs
        };

        // Add to main array at position zero
        articles.unshift(newArticle);
        localStorage.setItem("the_chronicle_articles", JSON.stringify(articles));

        // Reset Form & Preview
        form.reset();
        uploadedImageBase64 = "";
        imagePreview.src = "";
        previewContainer.style.display = "none";

        // Broadcast success toast
        showToast(`Article published locally!`, "success");

        // Redirect to Home Feed showing All news
        currentCategory = "all";
        updateCategoryTabHighlight();
        resetSearch();
        switchView("feed");
    });
}

/* ==========================================================================
   Text-to-Speech Engine
   ========================================================================== */
function initTTSVoices() {
    if (typeof speechSynthesis === 'undefined') return;

    // Load voice list. Some browsers load asynchronously.
    const loadVoices = () => {
        ttsVoices = speechSynthesis.getVoices();
        const selector = document.getElementById("tts-voice-select");
        const selectionContainer = document.getElementById("voice-selection-container");
        
        if (ttsVoices.length > 0) {
            selector.innerHTML = "";
            ttsVoices.forEach((voice, index) => {
                // Prioritize English voices or standard clean system voices
                if (voice.lang.includes("en-") || voice.lang.includes("en_")) {
                    const opt = document.createElement("option");
                    opt.value = index;
                    opt.textContent = `${voice.name} (${voice.lang})`;
                    // Auto-select standard natural voices
                    if (voice.name.includes("Natural") || voice.name.includes("Google")) {
                        opt.selected = true;
                    }
                    selector.appendChild(opt);
                }
            });

            // If no English voices, append all
            if (selector.children.length === 0) {
                ttsVoices.forEach((voice, index) => {
                    const opt = document.createElement("option");
                    opt.value = index;
                    opt.textContent = `${voice.name} (${voice.lang})`;
                    selector.appendChild(opt);
                });
            }

            if (selector.children.length > 0) {
                selectionContainer.style.display = "block";
            }
        }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }
}

function initReaderControlsTTS() {
    const playBtn = document.getElementById("tts-play-btn");
    const pauseBtn = document.getElementById("tts-pause-btn");
    const stopBtn = document.getElementById("tts-stop-btn");
    const statusText = document.getElementById("tts-status-text");

    playBtn.addEventListener("click", () => {
        if (isSpeechPaused) {
            // Resume
            speechSynthesis.resume();
            isSpeechPaused = false;
            isSpeechPlaying = true;
            playBtn.style.display = "none";
            pauseBtn.style.display = "inline-flex";
            statusText.textContent = "Narrator playing...";
            return;
        }

        // Generate text content from reading screen
        const titleText = document.querySelector(".article-title-hero")?.textContent || "";
        const authorText = document.querySelector(".article-meta-card strong")?.textContent || "";
        const bodyText = Array.from(document.querySelectorAll(".article-body-text p"))
                              .map(p => p.textContent)
                              .join(" ");

        const combinedText = `Article: ${titleText}. Written ${authorText}. ${bodyText}`;

        cancelSpeech(); // Safety clean

        activeSpeechUtterance = new SpeechSynthesisUtterance(combinedText);
        
        // Match voice selection
        const voiceIndex = document.getElementById("tts-voice-select").value;
        if (ttsVoices[voiceIndex]) {
            activeSpeechUtterance.voice = ttsVoices[voiceIndex];
        }

        activeSpeechUtterance.rate = 1.0;
        activeSpeechUtterance.pitch = 1.0;

        activeSpeechUtterance.onstart = () => {
            isSpeechPlaying = true;
            playBtn.style.display = "none";
            pauseBtn.style.display = "inline-flex";
            stopBtn.style.display = "inline-flex";
            statusText.textContent = "Narrator playing...";
        };

        activeSpeechUtterance.onpause = () => {
            isSpeechPaused = true;
            isSpeechPlaying = false;
            playBtn.style.display = "inline-flex";
            pauseBtn.style.display = "none";
            statusText.textContent = "Narrator paused";
        };

        activeSpeechUtterance.onresume = () => {
            isSpeechPaused = false;
            isSpeechPlaying = true;
            playBtn.style.display = "none";
            pauseBtn.style.display = "inline-flex";
            statusText.textContent = "Narrator playing...";
        };

        activeSpeechUtterance.onend = () => {
            resetTTSButtonControls("Narrator finished");
        };

        activeSpeechUtterance.onerror = (e) => {
            console.error("Speech Error", e);
            resetTTSButtonControls("Narrator voice error");
        };

        speechSynthesis.speak(activeSpeechUtterance);
    });

    pauseBtn.addEventListener("click", () => {
        speechSynthesis.pause();
    });

    stopBtn.addEventListener("click", () => {
        cancelSpeech();
    });
}

function cancelSpeech() {
    if (typeof speechSynthesis !== 'undefined') {
        speechSynthesis.cancel();
        resetTTSButtonControls("Audio narrator ready");
    }
}

function resetTTSButtonControls(status) {
    isSpeechPlaying = false;
    isSpeechPaused = false;
    activeSpeechUtterance = null;
    
    document.getElementById("tts-play-btn").style.display = "inline-flex";
    document.getElementById("tts-pause-btn").style.display = "none";
    document.getElementById("tts-stop-btn").style.display = "none";
    document.getElementById("tts-status-text").textContent = status;
}

// Bind TTS events during script loading
function initLiveWidgets() {
    initReaderControlsTTS();
    initWeatherWidget();
    renderLatestHeadlinesList();
    renderTrendingList();
}

/* ==========================================================================
   Live Weather Widget Simulation
   ========================================================================== */
function initWeatherWidget() {
    const citySelector = document.getElementById("weather-city-selector");
    
    const updateWeatherUI = (cityKey) => {
        const info = WEATHER_PROFILES[cityKey];
        if (!info) return;

        // Update header teaser weather
        document.getElementById("weather-summary").textContent = `${info.city.split(',')[0]}, ${info.temp}°C ${info.desc}`;

        // Update detailed card info
        document.getElementById("weather-detail-temp").textContent = `${info.temp}°C`;
        document.getElementById("weather-detail-desc").textContent = info.desc;
        document.getElementById("weather-detail-humidity").textContent = info.humidity;
        document.getElementById("weather-detail-wind").textContent = info.wind;

        // Render SVG Icon representation
        const iconContainer = document.getElementById("weather-detail-icon");
        iconContainer.innerHTML = getWeatherSVG(info.icon);
    };

    citySelector.addEventListener("change", (e) => {
        updateWeatherUI(e.target.value);
    });

    // Seed default weather
    updateWeatherUI("new_delhi");

    // Live fluctuate weather temp slightly every 15 seconds to simulate real environment changes
    setInterval(() => {
        Object.keys(WEATHER_PROFILES).forEach(key => {
            // Random shift between -0.5 and +0.5
            const shift = (Math.random() - 0.5);
            WEATHER_PROFILES[key].temp = parseFloat((WEATHER_PROFILES[key].temp + shift).toFixed(1));
        });
        updateWeatherUI(citySelector.value);
    }, 15000);
}

function getWeatherSVG(type) {
    if (type === "sun") {
        return `<svg viewBox="0 0 24 24" style="width:100%; height:100%;"><path fill="currentColor" d="M12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3m0-7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1m0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1M3.51 4.93a1 1 0 0 1 1.41 0l1.42 1.42a1 1 0 1 1-1.42 1.42L3.51 6.34a1 1 0 0 1 0-1.41m14.14 14.14a1 1 0 0 1 1.42 0l1.41 1.41a1 1 0 0 1-1.41 1.42l-1.42-1.42a1 1 0 0 1 0-1.41M2 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1m16 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1M4.93 20.49a1 1 0 0 1 0-1.41l1.42-1.42a1 1 0 1 1 1.42 1.42l-1.42 1.42a1 1 0 0 1-1.42 0M19.07 3.51a1 1 0 0 1 0 1.42l-1.42 1.42a1 1 0 1 1-1.42-1.42l1.42-1.42a1 1 0 0 1 1.42 0Z"/></svg>`;
    } else if (type === "rain") {
        return `<svg viewBox="0 0 24 24" style="width:100%; height:100%;"><path fill="currentColor" d="M12 2a5 5 0 0 0-5 5c0 .34.03.67.1 1A6 6 0 0 0 2 13.5A5.5 5.5 0 0 0 7.5 19h9a5.5 5.5 0 0 0 5.5-5.5c0-2.64-1.85-4.85-4.32-5.38A5 5 0 0 0 12 2zm1 19a1 1 0 0 1-2 0v-1a1 1 0 0 1 2 0v1zm-4-1a1 1 0 0 1-2 0v-1a1 1 0 0 1 2 0v1zm8 0a1 1 0 0 1-2 0v-1a1 1 0 0 1 2 0v1z"/></svg>`;
    } else if (type === "cloudy") {
        return `<svg viewBox="0 0 24 24" style="width:100%; height:100%;"><path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.468 5.468 0 0 1 12 6c2.63 0 4.8 1.93 5.16 4.54l.17 1.27l1.28.09A3.003 3.003 0 0 1 22 15c0 1.66-1.34 3-3 3z"/></svg>`;
    } else {
        return `<svg viewBox="0 0 24 24" style="width:100%; height:100%;"><path fill="currentColor" d="M21.5 10.5H13V2.03a.5.5 0 0 0-.85-.35l-10 10a.5.5 0 0 0 .35.85H11v8.47a.5.5 0 0 0 .85.35l10-10a.5.5 0 0 0-.35-.85z"/></svg>`;
    }
}

/* ==========================================================================
   Latest Headlines Widget Renderer
   ========================================================================== */
function renderLatestHeadlinesList() {
    const list = document.getElementById("latest-headlines-list");
    if (!list) return;
    
    // Slice first 5 articles
    const latest = articles.slice(0, 5);
    let html = "";
    latest.forEach(art => {
        html += `
            <li style="border-bottom: 1px solid var(--border-color-light); padding-bottom: 8px; margin-bottom: 8px;">
                <a href="#" class="latest-headline-link" data-id="${art.id}" style="font-size: 0.95rem; font-weight: 600; line-height: 1.35; font-family: var(--font-serif); transition: color 0.2s;">${art.title}</a>
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px; font-family: var(--font-sans); text-transform: uppercase;">${art.category} &nbsp;•&nbsp; ${art.date}</div>
            </li>
        `;
    });
    list.innerHTML = html;
    
    // Attach click handlers
    list.querySelectorAll(".latest-headline-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            activeArticleId = link.getAttribute("data-id");
            switchView("article");
        });
    });
}

/* ==========================================================================
   Trending Headlines Column
   ========================================================================== */
function renderTrendingList() {
    const list = document.getElementById("trending-headlines-list");
    const trendingArticles = articles.filter(art => art.trending).slice(0, 5);

    let html = "";
    trendingArticles.forEach(art => {
        html += `
            <li class="trending-item">
                <a href="#" class="trending-link" data-id="${art.id}">${art.title}</a>
                <div class="trending-item-meta">${art.category} &nbsp;•&nbsp; By ${art.author}</div>
            </li>
        `;
    });

    list.innerHTML = html;

    // Attach click triggers
    document.querySelectorAll(".trending-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            activeArticleId = link.getAttribute("data-id");
            switchView("article");
        });
    });
}

// (Removed newsletter logic as requested)

/* ==========================================================================
   Theme Logic (Light / Dark Mode Toggle)
   ========================================================================== */
function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem("the_chronicle_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    toggle.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = activeTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("the_chronicle_theme", nextTheme);
        
        showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`, "success");
    });
}

/* ==========================================================================
   Toast Notification Drawer System
   ========================================================================== */
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    // Select suitable SVG Icon
    let iconSVG = "";
    if (type === "success") {
        iconSVG = `<svg class="toast-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
    } else {
        iconSVG = `<svg class="toast-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
    }

    toast.innerHTML = `
        ${iconSVG}
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Fade out and remove toast automatically
    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3500);
}

/* ==========================================================================
   WordPress API Integration Engine
   ========================================================================== */
async function fetchWordPressArticles() {
    if (!WORDPRESS_SITE_URL) return;

    try {
        const response = await fetch(`${WORDPRESS_SITE_URL}/wp-json/wp/v2/posts?_embed&per_page=12`);
        if (!response.ok) throw new Error("Network response was not ok");
        const posts = await response.json();

        if (posts && posts.length > 0) {
            // Map WordPress posts to Jan Jagriti Network article format
            articles = posts.map(post => {
                // Extract featured image URL
                let imageUrl = "assets/tech.png"; // fallback
                if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
                    imageUrl = post._embedded['wp:featuredmedia'][0].source_url || "assets/tech.png";
                }

                // Extract author name
                let authorName = "Staff Reporter";
                if (post._embedded && post._embedded['author'] && post._embedded['author'][0]) {
                    authorName = post._embedded['author'][0].name || "Staff Reporter";
                }

                // Format category name
                let categoryName = "world";
                if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
                    const terms = post._embedded['wp:term'][0];
                    if (terms.length > 0) {
                        categoryName = terms[0].name.toLowerCase();
                    }
                }
                // Fallback standard categories if mapped category is not one of our nav categories
                const validCategories = ["world", "technology", "finance", "environment", "lifestyle"];
                if (!validCategories.includes(categoryName)) {
                    categoryName = "world";
                }

                // Format Date
                const dateObj = new Date(post.date);
                const formattedDate = dateObj.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                // Extract a clean abstract/excerpt
                let rawExcerpt = post.excerpt ? post.excerpt.rendered : "";
                let cleanAbstract = rawExcerpt.replace(/<[^>]*>/g, "").trim();
                if (cleanAbstract.length > 150) {
                    cleanAbstract = cleanAbstract.substring(0, 150) + "...";
                }
                if (!cleanAbstract) {
                    cleanAbstract = "Click to read the full story on Jan Jagriti Network.";
                }

                return {
                    id: "wp-" + post.id,
                    title: post.title.rendered,
                    author: authorName,
                    category: categoryName,
                    date: formattedDate,
                    abstract: cleanAbstract,
                    image: imageUrl,
                    tag: categoryName.toUpperCase(),
                    trending: post.sticky || false,
                    content: post.content.rendered
                };
            });

            // Save to localStorage for offline cache
            localStorage.setItem("the_chronicle_articles", JSON.stringify(articles));
            
            // Re-render components with the new live data
            renderApp();
            renderTrendingList();
            showToast("News feed synced with WordPress", "success");
        }
    } catch (err) {
        console.error("Error syncing with WordPress API:", err);
        showToast("Using local offline news cache", "alert");
    }
}

/* ==========================================================================
   Core App Render dispatcher
   ========================================================================== */
function renderApp() {
    renderArticlesList();
    renderLatestHeadlinesList();
}

/* ==========================================================================
   Legal Pages dynamic loader & templates
   ========================================================================== */
const DEFAULT_ABOUT_HTML = `
    <p><strong>Jan Jagriti Network</strong> is a premier independent news organization dedicated to offering factual, real-time, and public-focused news across India. Established in 2026, our networks deliver reports on national affairs, environmental science, technological innovations, financial changes, and regional updates.</p>
    <h3>Our Editorial Integrity</h3>
    <p>We operate under a strict code of ethics to preserve editorial independence. We verify sources, confirm facts with multi-level desks, and publish transparent corrections if errors occur.</p>
    <h3>Contact the Editorial Desk</h3>
    <p>If you have any feedback, news tips, or queries, reach us directly via:</p>
    <ul>
        <li><strong>Phone</strong>: +91 6204718308</li>
        <li><strong>Email</strong>: janjagriti06@gmail.com</li>
    </ul>
`;

const DEFAULT_PRIVACY_HTML = `
    <p><em>Last Updated: July 2026</em></p>
    <p>Jan Jagriti Network respects your privacy. We do not track personal demographics, sell visitor analytics, or store personal identifiers without your explicit approval.</p>
    <h3>1. Information We Collect</h3>
    <p>We do not require accounts to read news. We use local browser storage (localStorage) exclusively to store your reading theme preferences, bookmarks list, and local comments draft history. This data remains on your physical device and is never uploaded to our servers.</p>
    <h3>2. Third-Party Connections</h3>
    <p>Our website utilizes dynamic REST requests to fetch weather and index statistics from verified open-access APIs. These integrations do not receive your personal data.</p>
    <h3>3. Data Retention</h3>
    <p>Local storage data persists until you clear your browser cookies and site cache.</p>
`;

const DEFAULT_TERMS_HTML = `
    <p><em>Last Updated: July 2026</em></p>
    <p>By browsing the Jan Jagriti Network website, you agree to comply with our Terms of Service.</p>
    <h3>1. Use of Content</h3>
    <p>All articles, graphics, and custom logos are properties of Jan Jagriti Network. You may share headlines and snippets provided you attribute Jan Jagriti Network as the primary source.</p>
    <h3>2. Code of Conduct for Comments</h3>
    <p>When participating in our threaded comment boards, users must maintain civil discourse. Spam, hate speech, promotional advertisements, and harassment are strictly prohibited and subject to deletion.</p>
    <h3>3. Disclaimers</h3>
    <p>Our weather metrics and news snippets are simulated/fetched for informal reading and entertainment. Do not make investment decisions based on statistics displayed herein.</p>
`;

async function loadLegalPages() {
    await fetchWordPressPage("about-us", "about-content", DEFAULT_ABOUT_HTML);
    await fetchWordPressPage("privacy-policy", "privacy-content", DEFAULT_PRIVACY_HTML);
    await fetchWordPressPage("terms-of-service", "terms-content", DEFAULT_TERMS_HTML);
}

async function fetchWordPressPage(slug, elementId, defaultHTML) {
    const container = document.getElementById(elementId);
    if (!container) return;

    if (!USE_WORDPRESS || !WORDPRESS_SITE_URL) {
        container.innerHTML = defaultHTML;
        return;
    }

    try {
        const response = await fetch(`${WORDPRESS_SITE_URL}/wp-json/wp/v2/pages?slug=${slug}`);
        if (!response.ok) throw new Error("Page request failed");
        const pages = await response.json();
        if (pages && pages.length > 0) {
            container.innerHTML = `
                <div>${pages[0].content.rendered}</div>
            `;
            return;
        }
        container.innerHTML = defaultHTML;
    } catch (err) {
        console.warn(`WordPress Page for '${slug}' not loaded, fallback to default.`);
        container.innerHTML = defaultHTML;
    }
}
