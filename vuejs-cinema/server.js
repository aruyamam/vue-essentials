require('dotenv').config({ silent: true });

const path = require('path');
const fs = require('fs');
const express = require('express');
const api = require('./api');

const app = express();

if (process.env.NODE_ENV === 'development') {
   require('./webpack-dev-middleware').init(app);
}

if (process.env.NODE_ENV === 'production') {
   app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

app.use('/public', express.static(path.join(__dirname, 'public')));

const template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');

app.get('/', (req, res) => {
   res.send(template);
});

app.get('/api', (req, res) => {
   api.getData((err, data) => {
      if (err) {
         res.status(500).send(err);
      }
      else {
         res.json(data);
      }
   });
});

const offlineData = JSON.parse(fs.readFileSync(path.resolve('./api_offline.json'), 'utf-8'));
app.get('/offline_api', (req, res) => {
   let data = offlineData.find(item => item.imdbID === req.query.i);

   if (!data) {
      data = {
         Response: 'False',
         Error: `IMDb ID ${req.query.i} not found.`,
      };
   }

   res.json(data);
});

app.listen(process.env.PORT, () => {
   console.log(`Example app lsitening on port ${process.env.PORT}!`);

   if (process.env.NODE_ENV === 'development') {
      require('opn')(`http://localhost:${process.env.PORT}`);
   }
});
