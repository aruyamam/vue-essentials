require('dotenv').config({ silent: true });

const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const moment = require('moment-timezone');
const serialize = require('serialize-javascript');

moment.tz.setDefault('UTC');

const app = express();

app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

const events = [
   {
      description: 'Random event 1',
      date: moment('2019-04-06', 'YYYY-MM-DD'),
   },
   {
      description: 'Random event 2',
      date: moment('2019-04-15', 'YYYY-MM-DD'),
   },
   {
      description: 'Random event 3',
      date: moment('2019-05-02', 'YYYY-MM-DD'),
   },
];

let renderer;

if (process.env.NODE_ENV === 'production') {
   const bundle = fs.readFileSync('./dist/node.bundle.js', 'utf8');
   renderer = require('vue-server-renderer').createBundleRenderer(bundle);
   app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

app.get('/', (req, res) => {
   const template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
   const contentMarker = '<!--APP-->';
   if (renderer) {
      renderer.renderToString({ events }, (err, html) => {
         if (err) {
            console.log(err);
         }
         else {
            // console.log(html);
            res.send(
               template.replace(
                  contentMarker,
                  `<script>var __INITIAL_STATE__ = ${serialize(events)}</script>\n${html}`,
               ),
            );
         }
      });
   }
   else {
      res.send('<p>Awaiting compilation</p><script src="/reload/reload.js"></script>');
   }
});

app.post('/add_event', (req, res) => {
   events.push({
      description: req.body.description,
      date: moment(req.body.date),
   });
   res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
   const reload = require('reload');
   const reloadServer = reload(app);
   require('./webpack-dev-middleware').init(app);
   require('./webpack-server-compiler').init((bundle) => {
      const needsReload = renderer === undefined;
      renderer = require('vue-server-renderer').createBundleRenderer(bundle);
      if (needsReload) {
         reloadServer.reload();
      }
   });
}

server.listen(process.env.PORT, () => {
   console.log(`Example app listening on port ${process.env.PORT}!`);
   if (process.env.NODE_ENV === 'development') {
      require('opn')(`http://localhost:${process.env.PORT}`);
   }
});
