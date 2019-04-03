require('dotenv').config({ silent: true });

const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
   const template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
   res.send(template);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
   const reload = require('reload');
   const reloadServer = reload(app);
   require('./webpack-dev-middleware').init(app);
}

server.listen(process.env.PORT, () => {
   console.log(`Example app listening on port ${process.env.PORT}!`);
   if (process.env.NODE_ENV === 'development') {
      require('opn')(`http://localhost:${process.env.PORT}`);
   }
});