'use strict';

var mobilelist = [
  'android',
  'flappybird',
  'whackamole'
];

var getJSON = function(url, successCallback, failCallback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        successCallback(this.responseText);
      } else {
        failCallback();
      }
    }
  };
  request.send();
  request = null;
};

getJSON(`./list.json?t=${+Date}`, function(data) {
  var list = JSON.parse(data).list;
  var container = document.getElementById('container');
  var app = document.getElementById('app');

  if (container) {
    list.forEach(item => {
      var href = `${location.href}examples/${item}`;
      var a = document.createElement('a');
      a.innerHTML = item;
      var li = document.createElement('li');

      if (!!~mobilelist.indexOf(item)) {
        a.href = `//pillowjs.github.io/demoview/?previewUrl=${encodeURIComponent(href)}`;
      } else {
        a.href = href;
      }
      li.appendChild(a);
      container.appendChild(li);
    });
  }

  if (app) {
    list.forEach(item => {
      var href = `./examples/${item}`;
      var div = document.createElement('div');
      var iframe = document.createElement('iframe');
      iframe.src = href;
      iframe.scrolling = 'no';
      div.appendChild(iframe);
      var a = document.createElement('a');
      a.href = href;
      a.innerHTML = item;
      div.appendChild(a);
      app.appendChild(div);
    });
  }
});

