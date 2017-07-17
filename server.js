require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const serialize = require('serialize-javascript')

app.use('/public', express.static(path.join(__dirname, 'public')));

let renderer;
if (process.env.NODE_ENV === 'production') {
    const bundle = fs.readFileSync('./dist/node.bundle.js', 'utf-8');
    renderer = require('vue-server-renderer').createBundleRenderer(bundle);
    app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

const events = [];

app.get('/', (req, res) => {
    let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
    if (renderer) {
        renderer.renderToString({ events }, (err, html) => {
            if (err) {
                console.log(err);
            } else {
                res.send(template.replace('<!--APP-LOCATION-->', `<script> window.__INITIAL_STATE__= ${serialize(events)}</script>\n${html}`));

            }
        });
    } else {
        res.send('<p>Awiting compiliation....</p><script src="/reload/reload.js"></script>')
    }

});

app.use(require('body-parser').json());
app.post('/event', (req, res) => {
    events.push(req.body);
    res.sendStatus(200);
});
app.get('/events', (req, res) => {
    res.send(events);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
    const reload = require('reload');
    const reloadServer = reload(server, app);
    require('./webpack-dev-middleware').init(app);
    require('./webpack-server-compiler').init(bundle => {
        const needsReload = renderer === undefined;
        renderer = require('vue-server-renderer').createBundleRenderer(bundle);
        if (needsReload) {
            reloadServer.reload();
        }
    });
}

server.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`);
    if (process.env.NODE_ENV === 'development') {
        //require("open")(`http://localhost:${process.env.PORT}`);
    }
});
