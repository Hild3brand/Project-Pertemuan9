var http = require('http');
var fileSys = require('fs');
var url = require('url');
const express = require('express');
const server = express();

// Use express to serve static files from the 'public' directory
server.use(express.static('public'));

server.get('*', (req, res) => {
    let q = url.parse(req.url, true);
    let path = q.query;
    let fileLocation;
    switch (path.menu) {
        case 'dashboard':
            fileLocation = 'pages/dashboard.html';
            break;
        case 'team':
            fileLocation = 'pages/team.html';
            break;
        case 'pemain':
            fileLocation = 'pages/pemain.html';
            break;
        case 'gor':
            fileLocation = 'pages/gor.html';
            break;
        default:
            fileLocation = 'pages/dashboard.html';
    }
    fileSys.readFile(fileLocation, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
});

const port = 8000;
http.createServer(server).listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
