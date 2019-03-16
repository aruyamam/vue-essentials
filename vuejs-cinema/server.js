require('dotenv').config({ silent: true });

const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'development') {
   require('./webpack-dev-middleware').init(app);
}

app.use('/public', express.static(path.join(__dirname, 'public')));

let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');

app.get('/', function(req, res) {
   res.send(template);
});

app.listen(process.env.PORT, function() {
   console.log(`Example app lsitening on port ${process.env.PORT}!`);

   if (process.env.NODE_ENV === 'development') {
      require('opn')(`http://localhost:${process.env.PORT}`);
   }
});
