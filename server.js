const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 8090;
const DB_FILE = path.join(__dirname, 'database.json');

// General Rate Limiter: max 100 requests per 15 minutes
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again later.' }
});

// Admin Limiter: max 15 operations per minute
const adminActionLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many admin operations from this IP, please slow down.' }
});

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use('/api/', generalLimiter);

// Authentication middleware checking custom Bearer token
function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
    }
    const token = authHeader.split(' ')[1];
    
    if (token === 'admin-secret-session-token') {
        req.userRole = 'admin';
        next();
    } else if (token === 'editor-secret-session-token') {
        req.userRole = 'editor';
        if (req.method === 'DELETE') {
            return res.status(403).json({ error: 'Forbidden: Admin role required for deletion.' });
        }
        next();
    } else {
        return res.status(403).json({ error: 'Forbidden: Invalid token credentials' });
    }
}

// Initialize database file with premium seed articles if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
    const defaultArticles = [
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
        },
        {
            id: "art-4",
            title: "Democratic Union Polls Scheduled for Mid-November",
            author: "Jameson Croft",
            category: "politics",
            date: "July 8, 2026",
            abstract: "The Global Election Commission has officially announced scheduling for the long-awaited GDU assembly votes.",
            image: "assets/tech.png",
            tag: "POLITICS",
            trending: true,
            content: `
                <p><strong>BRUSSELS</strong> — The Global Election Commission announced today that elections for the GDU Representative Assembly will take place over three days in mid-November.</p>
                <p>Over 80 million voters are registered to elect delegates who will oversee international trade, standard regulations, and mutual development programs.</p>
                <p>Key political coalitions have already begun aligning campaign platforms around renewable energy investments and cybersecurity standards.</p>
            `
        },
        {
            id: "art-5",
            title: "Underdogs Clinch Victory in Thrilling Football Finals",
            author: "Marcus Vance",
            category: "sports",
            date: "July 7, 2026",
            abstract: "Against all oddsmaker predictions, the Titans managed a dramatic 3-2 overtime victory in the League championship.",
            image: "assets/finance.png",
            tag: "SPORTS",
            trending: false,
            content: `
                <p><strong>LONDON</strong> — In one of the greatest upsets in modern sports history, the Titans walked away as tournament champions after scoring a critical overtime goal.</p>
                <p>“We believed in our system, stayed disciplined, and played our hearts out,” said head coach Darren Ross during a post-match press conference.</p>
                <p>Fans celebrated late into the night, signaling a resurgence for the franchise after five consecutive seasons of missing out on playoff qualifications.</p>
            `
        },
        {
            id: "art-6",
            title: "Sci-Fi Indie Sensation Wins Palme d'Or at Cannes",
            author: "Aria Thorne",
            category: "entertainment",
            date: "July 6, 2026",
            abstract: "A low-budget independent film centering on memory deletion has taken the top honor at the prestigious festival.",
            image: "assets/environment.png",
            tag: "ENTERTAINMENT",
            trending: false,
            content: `
                <p><strong>CANNES</strong> — The indie sci-fi drama 'Echoes of You' has been awarded the Palme d'Or, beating major studio contenders in a surprising festival finale.</p>
                <p>The film, written and directed by newcomer Clara Zhao, was praised for its emotional depth and minimalistic production design.</p>
                <p>“We wanted to tell an intimate human story using sci-fi elements to amplify what it feels like to forget,” Zhao commented during her acceptance speech.</p>
            `
        }
    ];
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultArticles, null, 2), 'utf8');
}

// GET articles
app.get('/api/news', (req, res) => {
    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading database file:", err);
            return res.status(500).json({ error: 'Failed to read database' });
        }
        try {
            res.json(JSON.parse(data));
        } catch (parseErr) {
            console.error("Error parsing database JSON:", parseErr);
            res.status(500).json({ error: 'Failed to parse database content' });
        }
    });
});

// POST article (Protected: Admin authentication + Admin rate limiter + Input Validation)
app.post('/api/news', adminActionLimiter, authenticateAdmin, (req, res) => {
    // Explicit Admin-only authorization check
    if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Only Administrators can publish articles.' });
    }

    const newArticle = req.body;
    
    // Server-side robust validation
    if (!newArticle || !newArticle.id || !newArticle.title || !newArticle.content || !newArticle.author || !newArticle.category) {
        return res.status(400).json({ error: 'Invalid article data. Missing required fields (id, title, content, author, category).' });
    }

    // Clean, sanitize and validate values
    newArticle.title = String(newArticle.title).trim();
    newArticle.content = String(newArticle.content).trim();
    newArticle.author = String(newArticle.author).trim();
    newArticle.category = String(newArticle.category).trim().toLowerCase();
    newArticle.abstract = String(newArticle.abstract || '').trim().substring(0, 150);
    newArticle.image = String(newArticle.image || 'assets/tech.png').trim();
    newArticle.tag = String(newArticle.category).toUpperCase();
    newArticle.trending = req.body.trending === true;
    newArticle.date = newArticle.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const validCategories = ['politics', 'world', 'technology', 'sports', 'finance', 'entertainment', 'environment', 'lifestyle', 'india'];
    if (!validCategories.includes(newArticle.category)) {
        return res.status(400).json({ error: 'Invalid category specified.' });
    }

    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading database file:", err);
            return res.status(500).json({ error: 'Failed to read database' });
        }
        
        let articles = [];
        try {
            articles = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing database JSON:", parseErr);
            return res.status(500).json({ error: 'Failed to parse database content' });
        }

        articles.unshift(newArticle);

        fs.writeFile(DB_FILE, JSON.stringify(articles, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error("Error writing database file:", writeErr);
                return res.status(500).json({ error: 'Failed to save database' });
            }
            res.json({ success: true, article: newArticle });
        });
    });
});

// PUT article (Protected: Admin authentication + Admin rate limiter + Input Validation)
app.put('/api/news/:id', adminActionLimiter, authenticateAdmin, (req, res) => {
    // Explicit Admin-only authorization check
    if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Only Administrators can edit or update articles.' });
    }

    const id = req.params.id;
    const updatedArticle = req.body;
    
    if (!updatedArticle || !updatedArticle.title || !updatedArticle.content || !updatedArticle.author || !updatedArticle.category) {
        return res.status(400).json({ error: 'Invalid article data. Missing required fields.' });
    }

    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading database file:", err);
            return res.status(500).json({ error: 'Failed to read database' });
        }
        
        let articles = [];
        try {
            articles = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing database JSON:", parseErr);
            return res.status(500).json({ error: 'Failed to parse database content' });
        }

        const index = articles.findIndex(art => art.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Article not found.' });
        }

        articles[index] = {
            ...articles[index],
            title: String(updatedArticle.title).trim(),
            content: String(updatedArticle.content).trim(),
            author: String(updatedArticle.author).trim(),
            category: String(updatedArticle.category).trim().toLowerCase(),
            abstract: String(updatedArticle.abstract || '').trim().substring(0, 150),
            image: String(updatedArticle.image || 'assets/tech.png').trim(),
            tag: String(updatedArticle.category).toUpperCase(),
            trending: updatedArticle.trending === true
        };

        fs.writeFile(DB_FILE, JSON.stringify(articles, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error("Error writing database file:", writeErr);
                return res.status(500).json({ error: 'Failed to save database' });
            }
            res.json({ success: true, article: articles[index] });
        });
    });
});

// DELETE article (Protected: Admin authentication + Admin rate limiter)
app.delete('/api/news/:id', adminActionLimiter, authenticateAdmin, (req, res) => {
    // Explicit Admin-only authorization check
    if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Only Administrators can delete articles.' });
    }

    const id = req.params.id;

    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading database file:", err);
            return res.status(500).json({ error: 'Failed to read database' });
        }
        
        let articles = [];
        try {
            articles = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing database JSON:", parseErr);
            return res.status(500).json({ error: 'Failed to parse database content' });
        }

        articles = articles.filter(art => art.id !== id);

        fs.writeFile(DB_FILE, JSON.stringify(articles, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error("Error writing database file:", writeErr);
                return res.status(500).json({ error: 'Failed to save database' });
            }
            res.json({ success: true });
        });
    });
});

// Fallback to index.html for main SPA routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
