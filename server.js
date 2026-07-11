const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8090;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

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

// POST article
app.post('/api/news', (req, res) => {
    const newArticle = req.body;
    if (!newArticle || !newArticle.id) {
        return res.status(400).json({ error: 'Invalid article data' });
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

// DELETE article
app.delete('/api/news/:id', (req, res) => {
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

// Fallback to index.html for main routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
