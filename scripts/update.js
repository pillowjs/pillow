'use strict';

const fs = require('fs');
const path = require('path');

const examples = path.join(__dirname, '..', 'examples');
const dist = path.join(__dirname, '..', 'list.json');

let list = fs.readdirSync(examples);

list = list.filter(item => {
  return !~item.indexOf('.');
});

var data = {
  list: list
};


fs.writeFileSync(dist, JSON.stringify(data, null, 2));
