const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

let counters = {};

async function loadCounters() {
    try {
        const data = await fs.readFile('counters.json', 'utf-8');
        counters = JSON.parse(data);
    } catch (error) {
        console.error('Error loading', error.message);
    }
}

async function saveCounters() {
    try {
        await fs.writeFile('counters.json', JSON.stringify(counters, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error saving counters', error.message);
    }
}

function updateViewCount(req, res, next) {
    const pageUrl = req.originalUrl;

    counters[pageUrl] = (counters[pageUrl] || 0) + 1;

    saveCounters();

    next();
}

function displayViewCount(req, res) {
    const pageUrl = req.originalUrl;
    const count = counters[pageUrl] || 0;

    const html = `
    <html>
      <head>
        <title>Счётчик просмотра страниц</title>
      </head>
      <body>
        <div>
          <h1>Страница по адресу: ${pageUrl}</h1>
          <p>Просмотры: ${count}</p>
          <form action="/navigate" method="post">
            <button type="submit" name="target" value="/">Главная</button>
            <button type="submit" name="target" value="/about">About</button>
          </form>
        </div>
      </body>
    </html>
  `;

    res.send(html);
}

app.post('/navigate', (req, res) => {
    const target = req.body.target;

    res.redirect(target);
})

app.use(updateViewCount);

app.get('/', displayViewCount);
app.get('/about', displayViewCount);

const startServer = async () => {
    await loadCounters();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();