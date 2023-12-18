const http = require('http');
let homePageViews = 0;
let aboutPageViews = 0;

const server = http.createServer((req, res) => {
    console.log(`Request received!`);
    homePageViews++;
    aboutPageViews++;

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.write('<html><body>');
        res.write('<h1>Welcome to the Home Page</h1>');
        res.write(`<p>Views: ${homePageViews}</p>`);
        res.write('<a href="/about">Visit About Page</a>');
        res.write('</body></html>');
        res.end();

    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.write('<html><body>');
        res.write('<h1>About Us</h1>');
        res.write(`<p>Views: ${aboutPageViews}</p>`);
        res.write('<a href="/">Go back to Home Page</a>');
        res.write('</body></html>');
        res.end();
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.write('<html><body>');
        res.write('<h1>404 Not Found</h1>');
        res.write('<p>Sorry, this page was not found!</p>');
        res.write('<a href="/">Go back to Home Page</a>');
        res.write('</body></html>');
        res.end();
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});