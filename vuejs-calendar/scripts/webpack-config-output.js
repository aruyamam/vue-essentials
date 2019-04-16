const fs = require('fs');
const { pretty } = require('js-object-pretty-print');

require('../webpack.config.js').forEach((target) => {
   const fileName = `./tmp/${target.target}.${
      process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
   }.js`;
   fs.writeFile(fileName, `module.export = ${pretty(target)};`, (err) => {
      if (err) {
         return console.log(err);
      }
      console.log(`${fileName} successfully saved.`);
   });
});
