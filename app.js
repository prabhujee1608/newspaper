/* ==========================================================================
   JAN JAGRITI NETWORK - Main Application Engine
   ========================================================================== */

// ==========================================================================
// JAN JAGRITI NETWORK - Configurations
// ==========================================================================
const USE_WORDPRESS = false; 

const DEFAULT_SEED_ARTICLES = [
    {
        id: "art-1",
        title: "Global Climate Summit Reaches Historic Clean Energy Pact",
        author: "Sarah Jenkins",
        category: "environment",
        date: "July 11, 2026",
        abstract: "Over 190 nations have signed a landmark agreement to triple renewable energy capacity and phase out fossil fuel subsidies by 2035.",
        image: "assets/environment.png",
        tag: "ENVIRONMENT",
        trending: true,
        content: `
            <p><strong>GENEVA</strong> — In what is being hailed as the most significant diplomatic breakthrough since the Paris Agreement, representatives from 195 nations have finalized a legally binding treaty to drastically accelerate the global transition to clean energy.</p>
            <p>The accord, finalized after two weeks of intense round-the-clock negotiations at the UN Climate Summit, mandates the tripling of global renewable energy capacity by 2035 and requires governments to immediately commence phasing out "inefficient" fossil fuel subsidies.</p>
            <p>“Today, we make history,” declared Summit President Elena Rostova. “This pact represents a definitive turning point in our collective battle against global warming. We have moved from promises to hard, measurable timelines.”</p>
        `
    },
    {
        id: "art-2",
        title: "Quantum Computing Chips Enter Commercial Manufacturing Phase",
        author: "Dr. Marcus Chen",
        category: "technology",
        date: "July 10, 2026",
        abstract: "Tech giants announce the first scalable, room-temperature quantum processor ready for commercial server deployment.",
        image: "assets/tech.png",
        tag: "TECHNOLOGY",
        trending: true,
        content: `
            <p><strong>SILICON VALLEY</strong> — A consortium of leading computing labs and tech firms has officially announced the commencement of mass production for the world's first commercial-grade quantum processor.</p>
            <p>Unlike previous experimental quantum units that required temperatures near absolute zero to stabilize qubits, the new "Aether-Q1" silicon-diamond hybrid chip operates under standard room-temperature server conditions, marking a massive leap forward for server rack integration.</p>
            <p>The chip is expected to revolutionize industries relying on complex cryptographic simulations, advanced molecular modeling, and real-time artificial intelligence processing.</p>
        `
    },
    {
        id: "art-3",
        title: "Stock Markets Reach All-Time Highs Amid Technology Boom",
        author: "Elena Rostova",
        category: "finance",
        date: "July 9, 2026",
        abstract: "Global stock indices closed at record highs as commercial quantum chip production triggers a major rally in tech shares.",
        image: "assets/finance.png",
        tag: "FINANCE",
        trending: false,
        content: `
            <p><strong>NEW YORK</strong> — Tech-heavy indices led a historic rally on Wall Street today, with the NASDAQ and S&P 500 both closing at record highs following announcements of scalable quantum computing chips entering manufacturing.</p>
            <p>Market analysts are calling this the "Quantum Boom," as shares of chip design agencies, server manufacturers, and power grid operators surged between 8% and 15% in a single session.</p>
            <p>“What we are seeing is not just speculative momentum; it's capital pricing in the next paradigm of computational infrastructure,” said chief financial strategist Alan Vance.</p>
        `
    }
];

// Load WordPress Site REST API Target URL from localStorage or fallback to a premium news site
const DEFAULT_WORDPRESS_URL = "https://techcrunch.com";
let WORDPRESS_SITE_URL = localStorage.getItem("wordpress_site_url") || DEFAULT_WORDPRESS_URL;

const API_BASE_URL = (() => {
    const origin = window.location.origin;
    if (!origin || !origin.startsWith("http")) {
        return "http://localhost:8090";
    }
    // Fallback to node backend port 8090 if running on another local dev server port (e.g. 5500)
    if ((origin.includes("localhost") || origin.includes("127.0.0.1")) && window.location.port !== "8090") {
        return "http://localhost:8090";
    }
    return origin;
})();

const BACKEND_API_URL = `${API_BASE_URL}/api/news`;

async function fetchLocalPublisherNews() {
    try {
        const response = await fetch(BACKEND_API_URL);
        if (!response.ok) throw new Error("Failed to fetch news from backend");
        const data = await response.json();
        if (data && Array.isArray(data)) {
            articles = data;
            localStorage.setItem("the_chronicle_articles", JSON.stringify(articles));
        }
    } catch (err) {
        console.warn("Backend fetch failed, using local offline news cache:", err);
        const cached = localStorage.getItem("the_chronicle_articles");
        if (cached) {
            articles = JSON.parse(cached);
        } else {
            articles = DEFAULT_SEED_ARTICLES;
        }
    }
    renderArticlesList();
    renderTrendingList();
}

// Live Coordinates mapping for Preset Weather Cities
const CITY_COORDINATES = {
    new_delhi: { name: "New Delhi, IND", lat: 28.6139, lon: 77.2090 },
    mumbai: { name: "Mumbai, IND", lat: 19.0760, lon: 72.8777 },
    bengaluru: { name: "Bengaluru, IND", lat: 12.9716, lon: 77.5946 },
    kolkata: { name: "Kolkata, IND", lat: 22.5726, lon: 88.3639 },
    chennai: { name: "Chennai, IND", lat: 13.0827, lon: 80.2707 },
    hyderabad: { name: "Hyderabad, IND", lat: 17.3850, lon: 78.4867 }
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
let currentView = "feed"; // views: feed, article, bookmarks, about, privacy, terms, cms
let currentCategory = "all"; // categories: all, world, technology, finance, environment, lifestyle, politics, sports, entertainment
let displayedArticlesCount = 6;
let adminToken = sessionStorage.getItem("admin_token") || "";
let fontSizeClass = "font-size-medium";
let editingArticleId = null;
let searchQuery = "";

// Reader Authenticated Session State
let readerToken = localStorage.getItem("reader_token") || "";
let readerName = localStorage.getItem("reader_name") || "";
let readerUsername = localStorage.getItem("reader_username") || "";

// Live Views & Comments Polling State
let activeViewersInterval = null;
let activeCommentsInterval = null;
let activeCommentsList = [];
let clientId = sessionStorage.getItem("reader_client_id") || (() => {
    const cid = "client-" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem("reader_client_id", cid);
    return cid;
})();

// Feed Pagination State
let paginationMode = "infinite"; // infinite or page
let currentPage = 1;
const pageSize = 6;
let scrollObserver = null;

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

    // 3. Setup CMS Form & Direct Publisher Handlers
    initAdminPanel();

    // 4. Setup Theme Toggle
    initTheme();

    // 5. Setup Font Sizing & Bookmark toggling in reader
    initReaderControls();

    // 6. Setup Live Widgets
    initLiveWidgets();

    // 7. Setup Comments submission
    initCommentsForm();

    // 7a. Setup Reader Authentication
    initReaderAuth();

    // 7b. Setup Feed Scroll/Pagination controls
    initPaginationControls();

    // 8. Load voices for TTS
    initTTSVoices();

    // 9. Perform initial render of feed
    fetchLocalPublisherNews();
    
    // 10. Load legal & about page content from WordPress or local cache
    loadLegalPages();
});

/* ==========================================================================
   Database Initializer
   ========================================================================== */
function initDatabases() {
    // Load Articles
    const localArticles = localStorage.getItem("the_chronicle_articles");
    if (localArticles && JSON.parse(localArticles).length > 0) {
        articles = JSON.parse(localArticles);
    } else {
        articles = DEFAULT_SEED_ARTICLES;
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
            displayedArticlesCount = 6;
            
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
        displayedArticlesCount = 6;
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
        if (activeViewersInterval) {
            clearInterval(activeViewersInterval);
            activeViewersInterval = null;
        }
        if (activeCommentsInterval) {
            clearInterval(activeCommentsInterval);
            activeCommentsInterval = null;
        }
    }

    // 1a. Cancel admin dashboard polling when navigating away from admin view
    if (currentView === "admin" && viewName !== "admin") {
        stopAdminStatsPolling();
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
        displayedArticlesCount = 6;
        renderArticlesList();
    } else if (viewName === "bookmarks") {
        renderBookmarksList();
    } else if (viewName === "article") {
        renderArticleDetail();
    } else if (viewName === "admin") {
        const role = sessionStorage.getItem("admin_role");
        if (sessionStorage.getItem("admin_logged_in") === "true" && role === "admin") {
            startAdminStatsPolling();
        }
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
    const loadMoreContainer = document.getElementById("load-more-container");

    // Dynamic SEO updating
    document.title = "Jan Jagriti Network | Premium Global Journalism";
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
        descMeta.setAttribute("content", "Jan Jagriti Network - A premium dynamic newspaper website with live updates, bookmarks, text-to-speech reading, and a CMS dashboard.");
    }

    // Filter articles based on active category & search query
    let filtered = articles;

    // Apply category filter
    if (currentCategory !== "all") {
        filtered = filtered.filter(art => art.category.toLowerCase() === currentCategory.toLowerCase());
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
        if (loadMoreContainer) loadMoreContainer.innerHTML = "";
        return;
    }

    // Render Grid Articles
    let startIdx = 1;
    let endIdx = displayedArticlesCount;
    
    if (paginationMode === "page") {
        startIdx = 1 + (currentPage - 1) * pageSize;
        endIdx = startIdx + pageSize;
    }
    
    const totalCount = filtered.length;
    const heroArticle = filtered[0];
    const gridArticles = filtered.slice(startIdx, endIdx);

    // Render HERO (only if we are on Page 1 or in Infinite Scroll Mode)
    if (paginationMode === "infinite" || currentPage === 1) {
        const readTimeHero = Math.ceil(heroArticle.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200);
        const isHeroBookmarked = bookmarks.includes(heroArticle.id);
        heroContainer.style.display = "block";
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
                        <span>•</span>
                        <span>👁️ ${heroArticle.views || 0} views</span>
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
    } else {
        heroContainer.style.display = "none";
    }

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
                        <span>•</span>
                        <span>👁️ ${art.views || 0} views</span>
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

    // Bind navigation triggers
    document.querySelectorAll(".view-article-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            activeArticleId = link.getAttribute("data-id");
            switchView("article");
        });
    });

    // Bind card bookmarks
    document.querySelectorAll(".card-bookmark-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            toggleBookmarkState(id);
            btn.classList.toggle("active");
        });
    });

    // Render Load More / Scroll Observer / Pagination Controls
    if (loadMoreContainer) {
        // Disconnect old scroll observer
        if (scrollObserver) {
            scrollObserver.disconnect();
            scrollObserver = null;
        }

        if (paginationMode === "infinite") {
            if (totalCount > displayedArticlesCount) {
                loadMoreContainer.innerHTML = `
                    <div id="infinite-scroll-sentinel" style="height: 30px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: var(--text-muted); font-weight: 600; padding: 25px 0;">
                        <span>Loading more articles...</span>
                    </div>
                `;
                
                const sentinel = document.getElementById("infinite-scroll-sentinel");
                scrollObserver = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        displayedArticlesCount += pageSize;
                        renderArticlesList();
                    }
                }, { threshold: 0.1 });
                scrollObserver.observe(sentinel);
            } else {
                loadMoreContainer.innerHTML = `
                    <p style="text-align: center; font-size: 0.85rem; color: var(--text-muted); font-weight: 600; padding: 20px 0;">No more articles to load.</p>
                `;
            }
        } else {
            // Page Pagination
            const totalGridPages = Math.ceil((totalCount - 1) / pageSize);
            if (totalGridPages > 1) {
                let pagesHTML = `<div class="pagination-container">`;
                pagesHTML += `
                    <button class="pagination-btn" id="pagination-prev" ${currentPage === 1 ? "disabled" : ""}>&laquo; Prev</button>
                `;
                for (let i = 1; i <= totalGridPages; i++) {
                    pagesHTML += `
                        <button class="pagination-btn ${currentPage === i ? "active" : ""}" data-page="${i}">${i}</button>
                    `;
                }
                pagesHTML += `
                    <button class="pagination-btn" id="pagination-next" ${currentPage === totalGridPages ? "disabled" : ""}>Next &raquo;</button>
                `;
                pagesHTML += `</div>`;
                loadMoreContainer.innerHTML = pagesHTML;

                loadMoreContainer.querySelectorAll(".pagination-btn").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const pageAttr = btn.getAttribute("data-page");
                        if (pageAttr) {
                            currentPage = parseInt(pageAttr);
                        } else if (btn.id === "pagination-prev") {
                            currentPage = Math.max(1, currentPage - 1);
                        } else if (btn.id === "pagination-next") {
                            currentPage = Math.min(totalGridPages, currentPage + 1);
                        }
                        renderArticlesList();
                        document.getElementById("view-feed").scrollIntoView({ behavior: "smooth" });
                    });
                });
            } else {
                loadMoreContainer.innerHTML = "";
            }
        }
    }

    // Render Category Spotlights at the bottom of the feed if viewing "all" and search is empty
    if (currentCategory === "all" && searchQuery === "") {
        const spotlightCategories = ["India", "politics", "technology", "sports"];
        let spotlightsHTML = "";
        
        spotlightCategories.forEach(cat => {
            const catArticles = articles.filter(art => art.category.toLowerCase() === cat.toLowerCase()).slice(0, 3);
            if (catArticles.length > 0) {
                spotlightsHTML += `
                    <div class="category-spotlight" style="grid-column: span 2; width: 100%; margin-top: 40px; border-top: 2px solid var(--border-color); padding-top: 25px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 800; border-bottom: 3px solid var(--accent); padding-bottom: 4px; color: var(--text-main); margin: 0; text-transform: capitalize;">${cat === 'India' ? 'India News' : cat} Spotlight</h3>
                            <button class="btn btn-secondary view-cat-btn" data-category="${cat.toLowerCase()}" style="padding: 4px 10px; font-size: 0.8rem; cursor: pointer;">View All</button>
                        </div>
                        <div class="spotlight-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
                            ${catArticles.map(art => {
                                const readTime = Math.ceil(art.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200);
                                return `
                                    <div class="news-card" data-id="${art.id}">
                                        <div class="card-img-wrap">
                                            <span class="badge badge-${art.category} card-badge">${art.category}</span>
                                            <img src="${art.image}" alt="${art.title}">
                                        </div>
                                        <div class="card-details" style="display: flex; flex-direction: column; flex: 1;">
                                            <div class="card-meta-line">
                                                <span>${art.date}</span> • <span>${readTime} min read</span>
                                            </div>
                                            <h4 class="card-headline">
                                                <a href="#" class="view-article-link" data-id="${art.id}">${highlightText(art.title)}</a>
                                            </h4>
                                            <p class="card-excerpt">${highlightText(art.abstract)}</p>
                                            <div class="card-footer" style="margin-top: auto;">
                                                <span class="card-author">By ${highlightText(art.author)}</span>
                                                <a href="#" class="card-read-more view-article-link" data-id="${art.id}">
                                                    <span>Read</span>
                                                    <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join("")}
                        </div>
                    </div>
                `;
            }
        });
        
        gridContainer.innerHTML += spotlightsHTML;
        
        // Bind Category View All buttons
        document.querySelectorAll(".view-cat-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const category = btn.getAttribute("data-category");
                currentCategory = category;
                displayedArticlesCount = 6;
                resetSearch();
                updateCategoryTabHighlight();
                switchView("feed");
            });
        });
    }

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

    // Start views tracking and active heartbeat
    incrementArticleViews(article.id);
    startActiveViewersTracking(article.id);

    // Dynamic SEO update for details page
    document.title = `${article.title} | Jan Jagriti Network`;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
        descMeta.setAttribute("content", article.abstract);
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
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span>Published ${article.date}</span>
                        <span>•</span>
                        <span>${readTime} min read</span>
                        <span>•</span>
                        <span style="display: inline-flex; align-items: center; gap: 3px;"><svg style="width:14px; height:14px; margin-top:-1px;" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M12 17a5 5 0 1 0-5-5a5 5 0 0 0 5 5Z"/></svg> <span id="article-total-views">${article.views || 0}</span> views</span>
                        <span>•</span>
                        <span style="display: inline-flex; align-items: center; gap: 4px; color: var(--accent); font-weight: bold; background: rgba(185, 28, 28, 0.08); padding: 1px 6px; border-radius: 4px;">
                            <span class="live-pulse-dot" style="width: 7px; height: 7px; background: var(--accent); border-radius: 50%; display: inline-block;"></span>
                            <span id="article-live-viewers">1</span> reading now
                        </span>
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

    // Render Related Articles (matching category, excluding current)
    let related = articles.filter(art => art.category === article.category && art.id !== article.id).slice(0, 3);
    if (related.length < 3) {
        const fallback = articles.filter(art => art.id !== article.id && !related.some(r => r.id === art.id)).slice(0, 3 - related.length);
        related = related.concat(fallback);
    }

    let relatedHTML = "";
    if (related.length > 0) {
        relatedHTML = `
            <div class="related-articles-section" style="margin-top: 40px; border-top: 1px solid var(--border-color); padding-top: 30px; margin-bottom: 20px;">
                <h3 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 20px; color: var(--text-main);">Related Stories</h3>
                <div class="related-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    ${related.map(art => `
                        <div class="related-card" style="display: flex; flex-direction: column; gap: 8px;">
                            <a href="#" class="view-related-link" data-id="${art.id}" style="text-decoration: none;">
                                <div style="height: 120px; border-radius: 4px; overflow: hidden; background: #333;">
                                    <img src="${art.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${art.title}">
                                </div>
                            </a>
                            <span class="badge badge-${art.category}" style="align-self: flex-start; font-size: 0.65rem; padding: 2px 6px;">${art.category}</span>
                            <h4 style="font-family: var(--font-serif); font-size: 0.95rem; line-height: 1.3; margin: 0;">
                                <a href="#" class="view-related-link" data-id="${art.id}" style="color: var(--text-main); text-decoration: none; font-weight: 600;">${art.title}</a>
                            </h4>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }

    container.innerHTML += relatedHTML;

    // Attach click listeners to related article links
    container.querySelectorAll(".view-related-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            activeArticleId = link.getAttribute("data-id");
            renderArticleDetail();
            window.scrollTo({ top: 0, behavior: "instant" });
        });
    });

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
        
        if (!readerToken) {
            showToast("Please sign in to comment", "alert");
            return;
        }

        const textInput = document.getElementById("comment-text");
        const commentText = textInput.value.trim();
        if (!commentText) return;

        fetch(`${window.location.origin}/api/comments/${activeArticleId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author: readerName,
                text: commentText
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to post comment");
            return res.json();
        })
        .then(data => {
            textInput.value = "";
            showToast("Comment posted successfully", "success");
            fetchComments();
        })
        .catch(err => {
            showToast(err.message, "alert");
        });
    });
}

function renderComments() {
    const activeComments = activeCommentsList;
    const countContainer = document.getElementById("comments-count");
    const listContainer = document.getElementById("comments-list");

    const form = document.getElementById("comment-submit-form");
    let prompt = document.getElementById("comment-login-prompt");

    if (!readerToken) {
        form.style.display = "none";
        if (!prompt) {
            prompt = document.createElement("div");
            prompt.id = "comment-login-prompt";
            prompt.className = "comment-login-prompt";
            prompt.innerHTML = `
                <p>You must be signed in to post comments or replies.</p>
                <button class="btn btn-primary" id="comment-signin-trigger" style="padding: 8px 16px; cursor: pointer; border-radius: 4px; font-weight: 600;">Sign In / Sign Up</button>
            `;
            form.parentNode.insertBefore(prompt, form);
            document.getElementById("comment-signin-trigger").addEventListener("click", () => {
                document.getElementById("nav-reader-login").click();
            });
        } else {
            prompt.style.display = "block";
        }
    } else {
        form.style.display = "block";
        if (prompt) prompt.style.display = "none";
        
        const authorInput = document.getElementById("comment-author");
        if (authorInput) {
            authorInput.value = readerName;
            authorInput.readOnly = true;
            authorInput.style.opacity = "0.7";
            authorInput.style.cursor = "not-allowed";
        }
    }

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
    if (!readerToken) {
        showToast("Please sign in to reply.", "alert");
        document.getElementById("nav-reader-login").click();
        return;
    }

    const container = document.getElementById(`reply-container-${commentId}`);
    if (container.style.display === "block") {
        container.style.display = "none";
        container.innerHTML = "";
        return;
    }

    container.style.display = "block";
    container.innerHTML = `
        <div class="comment-form" style="padding: 12px; margin-bottom: 0; background-color: var(--bg-card);">
            <div class="comment-form-row" style="display: none;">
                <input type="text" id="reply-author-${commentId}" value="${readerName}" required readonly>
            </div>
            <div class="comment-form-row">
                <textarea id="reply-text-${commentId}" required rows="2" placeholder="Write reply as ${readerName}..." style="padding:6px 10px; font-size:0.8rem;"></textarea>
            </div>
            <button class="btn btn-primary submit-reply-btn" data-id="${commentId}" style="padding:4px 10px; font-size:0.75rem; cursor: pointer;">Post Reply</button>
        </div>
    `;

    container.querySelector(".submit-reply-btn").addEventListener("click", () => {
        submitReply(commentId);
    });
}

function submitReply(commentId) {
    const textInput = document.getElementById(`reply-text-${commentId}`);
    if (!textInput) return;
    const text = textInput.value.trim();

    if (!text) return;

    fetch(`${API_BASE_URL}/api/comments/${activeArticleId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            author: readerName,
            text: text,
            parentCommentId: commentId
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to post reply");
        return res.json();
    })
    .then(data => {
        showToast("Reply posted successfully", "success");
        fetchComments();
    })
    .catch(err => {
        showToast(err.message, "alert");
    });
}

/* ==========================================================================
   CMS Publishing Logic
   ========================================================================== */
function initAdminPanel() {
    const loginPanel = document.getElementById("cms-login-panel");
    const publisherPanel = document.getElementById("cms-publisher-panel");
    const loginForm = document.getElementById("cms-login-form");
    const publishForm = document.getElementById("cms-publish-form");
    const logoutBtn = document.getElementById("cms-logout-btn");
    const imageSelector = document.getElementById("pub-image");
    const customImageInput = document.getElementById("pub-image-custom");

    if (!loginPanel || !publisherPanel) return;

    // Check if already logged in
    const checkLoginStatus = () => {
        const userLabel = document.getElementById("cms-user-role-label");
        const role = sessionStorage.getItem("admin_role");
        
        if (sessionStorage.getItem("admin_logged_in") === "true") {
            loginPanel.style.display = "none";
            publisherPanel.style.display = "block";
            
            if (userLabel) {
                userLabel.textContent = role === "admin" ? "Administrator Dashboard" : "Editor Dashboard (Read-Only Mode)";
            }

            // Fetch admin analytics metrics if role is admin
            const metricsPanel = document.getElementById("cms-metrics-panel");
            if (role === "admin") {
                if (metricsPanel) metricsPanel.style.display = "block";
                fetchAdminStats();
            } else {
                if (metricsPanel) metricsPanel.style.display = "none";
            }

            // Disable or enable publish form elements depending on role
            const formElements = publishForm.querySelectorAll("input, textarea, select, button[type='submit']");
            formElements.forEach(el => {
                if (role === "admin") {
                    el.removeAttribute("disabled");
                    el.style.opacity = "1";
                } else {
                    el.setAttribute("disabled", "true");
                    el.style.opacity = "0.6";
                }
            });

            renderAdminArticlesManager();
        } else {
            loginPanel.style.display = "block";
            publisherPanel.style.display = "none";
            const metricsPanel = document.getElementById("cms-metrics-panel");
            if (metricsPanel) metricsPanel.style.display = "none";
        }
    };

    // Image selector dynamic custom URL field toggle
    if (imageSelector && customImageInput) {
        imageSelector.addEventListener("change", (e) => {
            if (e.target.value === "custom") {
                customImageInput.style.display = "block";
                customImageInput.required = true;
            } else {
                customImageInput.style.display = "none";
                customImageInput.required = false;
            }
        });
    }

    // Login Form Submit
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("cms-username");
            const passwordInput = document.getElementById("cms-password");
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            
            fetch(`${API_BASE_URL}/api/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })
            .then(res => parseJsonResponse(res, "Login failed"))
            .then(data => {
                sessionStorage.setItem("admin_logged_in", "true");
                sessionStorage.setItem("admin_role", data.role);
                sessionStorage.setItem("admin_token", data.token);
                adminToken = data.token;
                
                showToast(`Logged in successfully as ${data.role}!`, "success");
                checkLoginStatus();
                usernameInput.value = "";
                passwordInput.value = "";
            })
            .catch(err => {
                showToast(err.message, "alert");
            });
        });
    }

    // Logout Button
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("admin_logged_in");
            sessionStorage.removeItem("admin_token");
            adminToken = "";
            showToast("Logged out successfully.", "success");
            checkLoginStatus();
        });
    }

    // Publish Form Submit
    if (publishForm) {
        publishForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const title = document.getElementById("pub-title").value.trim();
            const category = document.getElementById("pub-category").value;
            const author = document.getElementById("pub-author").value.trim();
            const abstract = document.getElementById("pub-abstract").value.trim();
            const content = document.getElementById("pub-content").value.trim();
            
            let imageUrl = imageSelector.value;
            if (imageUrl === "custom") {
                imageUrl = customImageInput.value.trim();
            }

            const newArticle = {
                id: "art-" + Date.now(),
                title: title,
                author: author,
                category: category,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }),
                abstract: abstract,
                image: imageUrl || "assets/tech.png",
                tag: category.toUpperCase(),
                trending: false,
                content: content
            };

            // Send to backend
            if (editingArticleId) {
                fetch(`${BACKEND_API_URL}/${editingArticleId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("admin_token")}`
                    },
                    body: JSON.stringify(newArticle)
                })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to update article");
                    return response.json();
                })
                .then(data => {
                    showToast("Article updated successfully!", "success");
                    const index = articles.findIndex(art => art.id === editingArticleId);
                    if (index !== -1) {
                        articles[index] = {
                            ...articles[index],
                            title: newArticle.title,
                            author: newArticle.author,
                            category: newArticle.category,
                            abstract: newArticle.abstract,
                            image: newArticle.image,
                            tag: newArticle.tag,
                            content: newArticle.content
                        };
                        localStorage.setItem("the_chronicle_articles", JSON.stringify(articles));
                    }
                })
                .catch(err => {
                    console.error("Update failed:", err);
                    showToast("Failed to update article on server.", "alert");
                })
                .finally(() => {
                    editingArticleId = null;
                    document.getElementById("cms-form-title").textContent = "Publish a New Article";
                    document.getElementById("cms-submit-btn-text").textContent = "Publish Instantly";
                    publishForm.reset();
                    if (customImageInput) {
                        customImageInput.style.display = "none";
                        customImageInput.required = false;
                    }
                    renderAdminArticlesManager();
                    renderArticlesList();
                    renderTrendingList();
                });
            } else {
                fetch(BACKEND_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("admin_token")}`
                    },
                    body: JSON.stringify(newArticle)
                })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to publish to backend");
                    return response.json();
                })
                .then(data => {
                    showToast("Article published successfully!", "success");
                    articles.unshift(newArticle);
                    localStorage.setItem("the_chronicle_articles", JSON.stringify(articles));
                })
                .catch(err => {
                    console.error("Publish to backend failed:", err);
                    showToast("Publish failed on server.", "alert");
                })
                .finally(() => {
                    publishForm.reset();
                    if (customImageInput) {
                        customImageInput.style.display = "none";
                        customImageInput.required = false;
                    }
                    renderAdminArticlesManager();
                    renderArticlesList();
                    renderTrendingList();
                });
            }
        });
    }

    checkLoginStatus();
}

function renderAdminArticlesManager() {
    const listContainer = document.getElementById("cms-articles-list");
    if (!listContainer) return;

    if (articles.length === 0) {
        listContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No articles published yet.</p>`;
        return;
    }

    const role = sessionStorage.getItem("admin_role");
    
    listContainer.innerHTML = articles.map(art => {
        const editButtonHTML = role === "admin" 
            ? `<button class="btn btn-secondary edit-art-btn" data-id="${art.id}" style="padding: 4px 10px; font-size: 0.85rem; cursor: pointer; margin-right: 5px; color: var(--accent); border-color: rgba(185, 28, 28, 0.3);">Edit</button>`
            : "";
        const deleteButtonHTML = role === "admin" 
            ? `<button class="btn btn-secondary delete-art-btn" data-id="${art.id}" style="color: #ff4a4a; border-color: rgba(255, 74, 74, 0.3); padding: 4px 10px; font-size: 0.85rem; cursor: pointer;">Delete</button>`
            : `<button class="btn btn-secondary" style="color: var(--text-muted); border-color: var(--border-color); padding: 4px 10px; font-size: 0.85rem; cursor: not-allowed; opacity: 0.5;" disabled title="Only Administrators can delete articles">Delete</button>`;

        return `
            <div class="cms-mgr-card" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-card); gap: 15px;">
                <div style="flex: 1; min-width: 0;">
                    <h4 style="font-family: var(--font-serif); font-size: 1rem; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-main);">${art.title}</h4>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">
                        <span>Category: <strong>${art.category}</strong></span> | <span>Author: ${art.author}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 5px; align-items: center;">
                    ${editButtonHTML}
                    ${deleteButtonHTML}
                </div>
            </div>
        `;
    }).join("");

    // Bind edit events
    document.querySelectorAll(".edit-art-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = btn.getAttribute("data-id");
            const art = articles.find(a => a.id === id);
            if (!art) return;
            
            // Populate form
            document.getElementById("pub-title").value = art.title;
            document.getElementById("pub-category").value = art.category;
            document.getElementById("pub-author").value = art.author;
            document.getElementById("pub-abstract").value = art.abstract;
            document.getElementById("pub-content").value = art.content;
            
            const imageSelector = document.getElementById("pub-image");
            const customImageInput = document.getElementById("pub-image-custom");
            
            if (art.image.startsWith("assets/")) {
                imageSelector.value = art.image;
                if (customImageInput) {
                    customImageInput.style.display = "none";
                    customImageInput.required = false;
                }
            } else {
                imageSelector.value = "custom";
                if (customImageInput) {
                    customImageInput.value = art.image;
                    customImageInput.style.display = "block";
                    customImageInput.required = true;
                }
            }
            
            // Set editing state
            editingArticleId = art.id;
            document.getElementById("cms-form-title").textContent = `Edit Article: ${art.title}`;
            document.getElementById("cms-submit-btn-text").textContent = "Update Article";
            
            // Scroll to form
            document.getElementById("cms-publish-form").scrollIntoView({ behavior: "smooth" });
        });
    });

    // Bind delete events
    document.querySelectorAll(".delete-art-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = btn.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this article?")) {
                fetch(`${BACKEND_API_URL}/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("admin_token")}`
                    }
                })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to delete from backend");
                    showToast("Article deleted successfully.", "success");
                })
                .catch(err => {
                    console.error("Delete from backend failed:", err);
                    showToast("Delete failed on server, removed locally.", "alert");
                })
                .finally(() => {
                    articles = articles.filter(art => art.id !== id);
                    localStorage.setItem("the_chronicle_articles", JSON.stringify(articles));
                    renderAdminArticlesManager();
                    renderArticlesList();
                    renderTrendingList();
                });
            }
        });
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
    initLiveDateTime();
}

function initLiveDateTime() {
    const updateDateTime = () => {
        const liveDateEl = document.getElementById("live-date");
        if (!liveDateEl) return;
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', options);
        const timeStr = now.toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        liveDateEl.textContent = `${dateStr} | ${timeStr}`;
    };
    updateDateTime();
    setInterval(updateDateTime, 1000);
}


/* ==========================================================================
   Live Weather Widget Simulation
   ========================================================================== */
function getWeatherDetailsFromCode(code) {
    // Mapping WMO Weather Codes to text & basic categories
    if (code === 0) {
        return { desc: "Clear Skies", icon: "sun" };
    } else if (code === 1 || code === 2) {
        return { desc: "Partly Cloudy", icon: "cloudy" };
    } else if (code === 3 || code === 45 || code === 48) {
        return { desc: "Overcast / Foggy", icon: "cloudy" };
    } else if (code >= 51 && code <= 57) {
        return { desc: "Drizzle", icon: "rain" };
    } else if (code >= 61 && code <= 67) {
        return { desc: "Rainy", icon: "rain" };
    } else if (code >= 71 && code <= 77) {
        return { desc: "Snowy", icon: "cloudy" };
    } else if (code >= 80 && code <= 82) {
        return { desc: "Rain Showers", icon: "rain" };
    } else if (code === 85 || code === 86) {
        return { desc: "Snow Showers", icon: "cloudy" };
    } else if (code >= 95 && code <= 99) {
        return { desc: "Thunderstorm", icon: "rain" };
    }
    return { desc: "Mild Conditions", icon: "sun" };
}

async function fetchLiveWeather(lat, lon, cityName) {
    const tempEl = document.getElementById("weather-detail-temp");
    const descEl = document.getElementById("weather-detail-desc");
    const humidityEl = document.getElementById("weather-detail-humidity");
    const windEl = document.getElementById("weather-detail-wind");
    const headerWeatherEl = document.getElementById("weather-summary");
    const iconContainer = document.getElementById("weather-detail-icon");

    if (descEl) descEl.textContent = "Updating...";

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=sunrise,sunset&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather request failed");
        const data = await response.json();
        
        if (data && data.current) {
            const temp = Math.round(data.current.temperature_2m);
            const humidity = data.current.relative_humidity_2m;
            const windSpeed = Math.round(data.current.wind_speed_10m);
            const code = data.current.weather_code;
            
            const weatherInfo = getWeatherDetailsFromCode(code);
            
            // Update UI
            if (tempEl) tempEl.textContent = `${temp}°C`;
            if (descEl) descEl.textContent = weatherInfo.desc;
            if (humidityEl) humidityEl.textContent = `${humidity}%`;
            if (windEl) windEl.textContent = `${windSpeed} km/h`;
            if (headerWeatherEl) {
                headerWeatherEl.textContent = `${cityName}, ${temp}°C ${weatherInfo.desc}`;
            }
            if (iconContainer) {
                iconContainer.innerHTML = getWeatherSVG(weatherInfo.icon);
            }

            // Update Sunrise/Sunset
            if (data.daily && data.daily.sunrise && data.daily.sunset) {
                const sunriseRaw = data.daily.sunrise[0].split('T')[1];
                const sunsetRaw = data.daily.sunset[0].split('T')[1];
                
                const formatTime12h = (timeStr) => {
                    if (!timeStr) return "--:--";
                    const parts = timeStr.split(':');
                    let hours = parseInt(parts[0], 10);
                    const minutes = parts[1];
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    return `${hours}:${minutes} ${ampm}`;
                };

                const sunriseEl = document.getElementById("weather-detail-sunrise");
                const sunsetEl = document.getElementById("weather-detail-sunset");
                if (sunriseEl) sunriseEl.textContent = formatTime12h(sunriseRaw);
                if (sunsetEl) sunsetEl.textContent = formatTime12h(sunsetRaw);
            }
        }
    } catch (err) {
        console.error("Error fetching live weather:", err);
        if (descEl) descEl.textContent = "Offline";
    }
}

function initWeatherWidget() {
    const citySelector = document.getElementById("weather-city-selector");
    const locBtn = document.getElementById("weather-location-btn");

    const loadCityWeather = (cityKey) => {
        const cityData = CITY_COORDINATES[cityKey];
        if (!cityData) return;
        fetchLiveWeather(cityData.lat, cityData.lon, cityData.name.split(',')[0]);
    };

    if (citySelector) {
        citySelector.addEventListener("change", (e) => {
            loadCityWeather(e.target.value);
        });
        
        // Load default city weather
        loadCityWeather(citySelector.value);
    }

    if (locBtn) {
        locBtn.addEventListener("click", () => {
            if (navigator.geolocation) {
                showToast("Requesting device location...", "success");
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        
                        showToast("Location detected. Loading local weather...", "success");
                        // Reset selector display
                        if (citySelector) {
                            // Find or add custom option
                            let customOpt = document.getElementById("custom-location-option");
                            if (!customOpt) {
                                customOpt = document.createElement("option");
                                customOpt.id = "custom-location-option";
                                customOpt.value = "my_location";
                                citySelector.appendChild(customOpt);
                            }
                            customOpt.textContent = "📍 My Location";
                            customOpt.selected = true;
                        }
                        
                        fetchLiveWeather(lat, lon, "Local");
                    },
                    (error) => {
                        console.warn("Geolocation error:", error);
                        showToast("Unable to detect location. Please select a city.", "alert");
                    }
                );
            } else {
                showToast("Geolocation is not supported by your browser.", "alert");
            }
        });
    }

    // Refresh weather every 10 minutes
    setInterval(() => {
        const activeOption = citySelector ? citySelector.value : "new_delhi";
        if (activeOption !== "my_location") {
            loadCityWeather(activeOption);
        }
    }, 600000);
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
    // Sort by views count descending, fallback to 0
    const trendingArticles = [...articles]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);

    let html = "";
    trendingArticles.forEach(art => {
        html += `
            <li class="trending-item">
                <a href="#" class="trending-link" data-id="${art.id}">${art.title}</a>
                <div class="trending-item-meta">${art.category} &nbsp;•&nbsp; By ${art.author} &nbsp;•&nbsp; 👁️ ${art.views || 0} views</div>
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
function renderSkeletons() {
    const heroContainer = document.getElementById("hero-article-container");
    const gridContainer = document.getElementById("articles-grid");
    
    // Render Hero Skeleton
    if (heroContainer) {
        heroContainer.innerHTML = `
            <div class="skeleton-card" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; min-height: 380px;">
                <div class="skeleton-img" style="height: 100%;"></div>
                <div class="skeleton-text-wrap" style="justify-content: center;">
                    <div class="skeleton-meta" style="width: 25%;"></div>
                    <div class="skeleton-title" style="height: 32px; margin-top: 15px;"></div>
                    <div class="skeleton-title" style="height: 32px; width: 75%;"></div>
                    <div class="skeleton-excerpt" style="margin-top: 15px;"></div>
                    <div class="skeleton-excerpt"></div>
                    <div class="skeleton-meta" style="width: 35%; margin-top: 25px;"></div>
                </div>
            </div>
        `;
    }
    
    // Render Grid Skeletons
    if (gridContainer) {
        let skeletonsHTML = "";
        for (let i = 0; i < 4; i++) {
            skeletonsHTML += `
                <div class="skeleton-card">
                    <div class="skeleton-img"></div>
                    <div class="skeleton-text-wrap">
                        <div class="skeleton-meta"></div>
                        <div class="skeleton-title"></div>
                        <div class="skeleton-title" style="width: 60%;"></div>
                        <div class="skeleton-excerpt" style="margin-top: 10px;"></div>
                        <div class="skeleton-excerpt"></div>
                    </div>
                </div>
            `;
        }
        gridContainer.innerHTML = skeletonsHTML;
    }
}

const updateCMSStatusUI = (status, host = WORDPRESS_SITE_URL) => {
    const indicator = document.getElementById("cms-status-indicator");
    const statusText = document.getElementById("cms-status-text");
    if (!indicator || !statusText) return;

    if (status === "connecting") {
        indicator.className = "status-indicator dot-loading";
        statusText.textContent = `Syncing with ${host}...`;
    } else if (status === "connected") {
        indicator.className = "status-indicator dot-connected";
        statusText.textContent = `Connected to ${host}`;
    } else if (status === "failed") {
        indicator.className = "status-indicator dot-disconnected";
        statusText.textContent = `Failed to connect to ${host}`;
    }
};

function getWordPressApiUrl(endpointPath) {
    if (!WORDPRESS_SITE_URL) return "";
    let baseUrl = WORDPRESS_SITE_URL.replace(/\/+$/, "");
    
    // Check if it is a WordPress.com site (not self-hosted WordPress)
    if (baseUrl.includes(".wordpress.com")) {
        // Extract host domain (e.g. janjagritinetwork.wordpress.com)
        let domain = baseUrl.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
        
        // Strip out /wp-json prefix if present in the path
        let path = endpointPath;
        if (path.startsWith("/wp-json")) {
            path = path.slice(8);
        }
        
        // Normalize suffix path (remove /wp/v2 prefix if it's there as the proxy adds it or we rewrite)
        let apiSuffix = path.replace(/^\/wp\/v2/, "");
        if (!apiSuffix.startsWith("/")) {
            apiSuffix = "/" + apiSuffix;
        }
        
        return `https://public-api.wordpress.com/wp/v2/sites/${domain}${apiSuffix}`;
    }
    
    // Standard self-hosted WordPress site (WP.org)
    let path = endpointPath;
    if (!path.startsWith("/")) {
        path = "/" + path;
    }
    // If path already starts with /wp-json, don't prepend it, otherwise prepend /wp-json
    if (!path.startsWith("/wp-json")) {
        path = "/wp-json" + path;
    }
    return `${baseUrl}${path}`;
}

async function fetchWordPressArticles() {
    if (!WORDPRESS_SITE_URL) {
        const heroContainer = document.getElementById("hero-article-container");
        const gridContainer = document.getElementById("articles-grid");
        if (heroContainer) {
            heroContainer.innerHTML = `
                <div class="empty-state" style="grid-column: span 2; width: 100%;">
                    <p style="font-size: 1.1rem; font-weight: 500;">No WordPress CMS URL configured.</p>
                    <button class="btn btn-primary" onclick="switchView('admin')" style="margin-top: 10px;">Configure CMS URL</button>
                </div>
            `;
        }
        if (gridContainer) gridContainer.innerHTML = "";
        return;
    }

    renderSkeletons();
    updateCMSStatusUI("connecting");

    try {
        const apiUrl = getWordPressApiUrl("/wp/v2/posts?_embed&per_page=12");
        const response = await fetch(apiUrl);
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

                // Smarter category mapping algorithm
                let categoryName = "world";
                
                // Get list of terms (categories, tags, etc.)
                let termsList = [];
                if (post._embedded && post._embedded['wp:term']) {
                    post._embedded['wp:term'].forEach(taxonomy => {
                        taxonomy.forEach(term => {
                            if (term && term.name) {
                                termsList.push(term.name.toLowerCase());
                            }
                        });
                    });
                }

                // Look for matches
                const isTech = termsList.some(t => t.includes("tech") || t.includes("ai") || t.includes("gadget") || t.includes("software") || t.includes("hardware") || t.includes("quantum") || t.includes("computer") || t.includes("cyber"));
                const isFinance = termsList.some(t => t.includes("finance") || t.includes("business") || t.includes("market") || t.includes("stock") || t.includes("economy") || t.includes("startup") || t.includes("venture") || t.includes("money"));
                const isEnvironment = termsList.some(t => t.includes("environment") || t.includes("climate") || t.includes("science") || t.includes("green") || t.includes("energy") || t.includes("nature") || t.includes("fusion"));
                const isLifestyle = termsList.some(t => t.includes("lifestyle") || t.includes("life") || t.includes("travel") || t.includes("culture") || t.includes("art") || t.includes("health") || t.includes("food") || t.includes("fashion"));
                
                if (isTech) categoryName = "technology";
                else if (isFinance) categoryName = "finance";
                else if (isEnvironment) categoryName = "environment";
                else if (isLifestyle) categoryName = "lifestyle";
                else {
                    // Try exact match with category name if any
                    if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
                        const terms = post._embedded['wp:term'][0];
                        if (terms.length > 0) {
                            const termName = terms[0].name.toLowerCase();
                            const validCategories = ["world", "technology", "finance", "environment", "lifestyle"];
                            if (validCategories.includes(termName)) {
                                categoryName = termName;
                            }
                        }
                    }
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
                // Decode HTML entities
                cleanAbstract = cleanAbstract.replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&amp;/g, '&');
                if (cleanAbstract.length > 150) {
                    cleanAbstract = cleanAbstract.substring(0, 150) + "...";
                }
                if (!cleanAbstract) {
                    cleanAbstract = "Click to read the full story on Jan Jagriti Network.";
                }

                let cleanTitle = post.title.rendered.replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&amp;/g, '&');

                return {
                    id: "wp-" + post.id,
                    title: cleanTitle,
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
            updateCMSStatusUI("connected");
            showToast("News feed synced with WordPress", "success");
        } else {
            throw new Error("No articles found on this WordPress site");
        }
    } catch (err) {
        console.error("Error syncing with WordPress API:", err);
        updateCMSStatusUI("failed");
        showToast("Using local offline news cache", "alert");
        
        // Load cache if we have it
        const cached = localStorage.getItem("the_chronicle_articles");
        if (cached) {
            articles = JSON.parse(cached);
        } else {
            articles = [];
        }
        
        if (articles.length > 0) {
            renderApp();
            renderTrendingList();
        } else {
            // Show error message on feed
            const heroContainer = document.getElementById("hero-article-container");
            const gridContainer = document.getElementById("articles-grid");
            if (heroContainer) {
                heroContainer.innerHTML = `
                    <div class="empty-state" style="grid-column: span 2; width: 100%; border: 1px solid var(--border-color); padding: 40px; text-align: center;">
                        <svg class="empty-icon" style="color: var(--accent); margin-bottom: 15px;" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                        <h3 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 8px;">CMS Connection Failed</h3>
                        <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 15px; font-size: 0.9rem;">
                            We were unable to connect to the WordPress REST API at <code>${WORDPRESS_SITE_URL}</code>. 
                            Please verify that the URL is correct and the server allows cross-origin requests.
                        </p>
                        <button class="btn btn-primary" onclick="switchView('admin')">CMS Connection Settings</button>
                    </div>
                `;
            }
            if (gridContainer) gridContainer.innerHTML = "";
        }
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
        const apiUrl = getWordPressApiUrl(`/wp/v2/pages?slug=${slug}`);
        const response = await fetch(apiUrl);
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

/* ==========================================================================
   Reader Authentication & Session Functions
   ========================================================================== */
function initReaderAuth() {
    const loginBtn = document.getElementById("nav-reader-login");
    const logoutBtn = document.getElementById("reader-logout-btn");
    const welcomeLabel = document.getElementById("reader-welcome-label");
    const modal = document.getElementById("reader-auth-modal");
    const closeModal = document.getElementById("close-reader-modal");
    
    const loginPane = document.getElementById("reader-login-pane");
    const signupPane = document.getElementById("reader-signup-pane");
    const goToSignup = document.getElementById("go-to-signup");
    const goToLogin = document.getElementById("go-to-login");
    
    const loginForm = document.getElementById("reader-login-form");
    const signupForm = document.getElementById("reader-signup-form");

    const updateReaderHeaderUI = () => {
        if (readerToken) {
            if (loginBtn) loginBtn.style.display = "none";
            if (welcomeLabel) {
                welcomeLabel.textContent = `Hi, ${readerName}!`;
                welcomeLabel.style.display = "inline";
            }
            if (logoutBtn) logoutBtn.style.display = "inline";
        } else {
            if (loginBtn) loginBtn.style.display = "inline-flex";
            if (welcomeLabel) welcomeLabel.style.display = "none";
            if (logoutBtn) logoutBtn.style.display = "none";
        }
    };
    
    updateReaderHeaderUI();

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            if (modal) {
                modal.style.display = "flex";
                if (loginPane) loginPane.style.display = "block";
                if (signupPane) signupPane.style.display = "none";
            }
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (goToSignup && loginPane && signupPane) {
        goToSignup.addEventListener("click", (e) => {
            e.preventDefault();
            loginPane.style.display = "none";
            signupPane.style.display = "block";
        });
    }

    if (goToLogin && loginPane && signupPane) {
        goToLogin.addEventListener("click", (e) => {
            e.preventDefault();
            loginPane.style.display = "block";
            signupPane.style.display = "none";
        });
    }

    // Login Form Submit
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("reader-login-user");
            const passwordInput = document.getElementById("reader-login-pass");
            
            fetch(`${API_BASE_URL}/api/readers/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameInput.value.trim(),
                    password: passwordInput.value
                })
            })
            .then(res => parseJsonResponse(res, "Login failed"))
            .then(data => {
                readerToken = data.token;
                readerName = data.name;
                readerUsername = data.username;
                
                localStorage.setItem("reader_token", readerToken);
                localStorage.setItem("reader_name", readerName);
                localStorage.setItem("reader_username", readerUsername);
                
                showToast("Welcome back!", "success");
                updateReaderHeaderUI();
                if (modal) modal.style.display = "none";
                usernameInput.value = "";
                passwordInput.value = "";
                
                if (currentView === "article") {
                    renderComments();
                }
            })
            .catch(err => {
                showToast(err.message, "alert");
            });
        });
    }

    // Signup Form Submit
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("reader-signup-user");
            const passwordInput = document.getElementById("reader-signup-pass");
            
            fetch(`${API_BASE_URL}/api/readers/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameInput.value.trim(),
                    password: passwordInput.value
                })
            })
            .then(res => parseJsonResponse(res, "Signup failed"))
            .then(data => {
                showToast("Account created! Please sign in.", "success");
                usernameInput.value = "";
                passwordInput.value = "";
                
                if (loginPane) loginPane.style.display = "block";
                if (signupPane) signupPane.style.display = "none";
            })
            .catch(err => {
                showToast(err.message, "alert");
            });
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            readerToken = "";
            readerName = "";
            readerUsername = "";
            
            localStorage.removeItem("reader_token");
            localStorage.removeItem("reader_name");
            localStorage.removeItem("reader_username");
            
            showToast("Signed out successfully.", "success");
            updateReaderHeaderUI();
            
            if (currentView === "article") {
                renderComments();
            }
        });
    }

    // Forgot Password Click Handler
    const forgotPassBtn = document.getElementById("reader-forgot-pass-btn");
    if (forgotPassBtn) {
        forgotPassBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const username = prompt("Enter your Username to recover password:");
            if (!username) return;

            fetch(`${API_BASE_URL}/api/readers/recover`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username })
            })
            .then(res => parseJsonResponse(res, "Recovery failed"))
            .then(data => {
                alert(`Your password is: ${data.password}`);
            })
            .catch(err => {
                showToast(err.message, "alert");
            });
        });
    }
}

/* ==========================================================================
   Feed Reading Mode Toggles
   ========================================================================== */
function initPaginationControls() {
    const toggleInfinite = document.getElementById("toggle-infinite-scroll");
    const togglePage = document.getElementById("toggle-page-pagination");

    if (toggleInfinite && togglePage) {
        toggleInfinite.addEventListener("click", () => {
            paginationMode = "infinite";
            toggleInfinite.classList.add("active");
            togglePage.classList.remove("active");
            currentPage = 1;
            displayedArticlesCount = 6;
            renderArticlesList();
        });

        togglePage.addEventListener("click", () => {
            paginationMode = "page";
            togglePage.classList.add("active");
            toggleInfinite.classList.remove("active");
            currentPage = 1;
            renderArticlesList();
        });
    }
}

/* ==========================================================================
   Comments live fetching loader
   ========================================================================== */
function fetchComments() {
    if (!activeArticleId) return;
    fetch(`${API_BASE_URL}/api/comments/${activeArticleId}`)
    .then(res => parseJsonResponse(res, "Failed to fetch comments"))
    .then(data => {
        activeCommentsList = data;
        renderComments();
    })
    .catch(err => {
        console.warn("Failed to fetch comments:", err);
    });
}

/* ==========================================================================
   Article Views and Heartbeats trackers
   ========================================================================== */
function incrementArticleViews(id) {
    fetch(`${API_BASE_URL}/api/news/${id}/view`, { method: "POST" })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            const viewsEl = document.getElementById("article-total-views");
            if (viewsEl) viewsEl.textContent = data.views;
            
            // Sync local cache
            const index = articles.findIndex(a => a.id === id);
            if (index !== -1) {
                articles[index].views = data.views;
                localStorage.setItem("the_chronicle_articles", JSON.stringify(articles));
                // Update views inside home grid dynamically if visible
                renderTrendingList();
            }
        }
    })
    .catch(err => console.warn("Failed to increment views:", err));
}

function startActiveViewersTracking(id) {
    if (activeViewersInterval) clearInterval(activeViewersInterval);
    if (activeCommentsInterval) clearInterval(activeCommentsInterval);

    const sendHeartbeat = () => {
        fetch(`${API_BASE_URL}/api/news/${id}/heartbeat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clientId })
        })
        .then(res => res.json())
        .then(data => {
            const activeEl = document.getElementById("article-live-viewers");
            if (activeEl) activeEl.textContent = data.activeViewers;
        })
        .catch(err => console.warn("Heartbeat failed:", err));
    };

    sendHeartbeat();
    activeViewersInterval = setInterval(sendHeartbeat, 5000);

    fetchComments();
    activeCommentsInterval = setInterval(fetchComments, 5000);
}

/* ==========================================================================
   Admin Analytics Dashboard metrics loader
   ========================================================================== */
function fetchAdminStats() {
    if (!adminToken) return;

    fetch(`${API_BASE_URL}/api/admin/stats`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${adminToken}`
        }
    })
    .then(res => parseJsonResponse(res, "Failed to load audience stats"))
    .then(data => {
        const readersVal = document.getElementById("metric-registered-readers");
        const loginsVal = document.getElementById("metric-total-logins");
        const activeVal = document.getElementById("metric-active-viewers");
        const viewsVal = document.getElementById("metric-total-views");
        
        const spotlightTitle = document.getElementById("metric-most-viewed-title");
        const spotlightViews = document.getElementById("metric-most-viewed-views");

        if (readersVal) readersVal.textContent = data.registeredReaders;
        if (loginsVal) loginsVal.textContent = data.totalLogins;
        if (activeVal) activeVal.textContent = data.activeReaders;
        if (viewsVal) viewsVal.textContent = data.totalArticleViews;
        
        if (spotlightTitle) spotlightTitle.textContent = data.mostViewedArticle.title;
        if (spotlightViews) spotlightViews.textContent = data.mostViewedArticle.views;



        // Render login logs list
        const loginsListBody = document.getElementById("admin-logins-list-body");
        if (loginsListBody && data.loginLogs) {
            if (data.loginLogs.length === 0) {
                loginsListBody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 10px;">No login history yet.</td></tr>`;
            } else {
                loginsListBody.innerHTML = data.loginLogs.slice(0, 30).map(l => `
                    <tr style="border-bottom: 1px solid var(--border-color-light);">
                        <td style="padding: 6px 4px; font-weight: 600;">${l.identifier}</td>
                        <td style="padding: 6px 4px; font-size: 0.75rem;">${l.timestamp}</td>
                        <td style="padding: 6px 4px; font-family: monospace;">${l.ip}</td>
                        <td style="padding: 6px 4px; font-weight: bold; color: ${l.status.includes('success') ? 'var(--success)' : 'var(--accent)'};">${l.status}</td>
                    </tr>
                `).join("");
            }
        }
    })
    .catch(err => {
        console.warn("Analytics stats loading error:", err);
    });
}

let adminStatsInterval = null;

function startAdminStatsPolling() {
    if (adminStatsInterval) clearInterval(adminStatsInterval);
    fetchAdminStats();
    adminStatsInterval = setInterval(fetchAdminStats, 3000);
}

function stopAdminStatsPolling() {
    if (adminStatsInterval) {
        clearInterval(adminStatsInterval);
        adminStatsInterval = null;
    }
}

async function parseJsonResponse(res, defaultError) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || defaultError);
        }
        return data;
    } else {
        const text = await res.text();
        throw new Error(text || defaultError);
    }
}
