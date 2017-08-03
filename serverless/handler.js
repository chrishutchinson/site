'use strict';

const fs = require('fs');
const mime = require('mime-types');

// `import` > `require`
require('reify');

// Register Svelte SSR
require('svelte/ssr/register');

// App component
const App = require('../app/components/App/index.html');

// Data
const { items } = require('../app/data');

// Render HTML + CSS
const html = App.render({
  items,
  hydratable: true,
});
const { css } = App.renderCss();

module.exports.app = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  };

  response.body = fs
    .readFileSync('./index.html')
    .toString()
    .replace('</head>', `<style>${css}</style></head>`)
    .replace('<main></main>', `<main>${html}</main>`);

  callback(null, response);
};

module.exports.file = (event, context, callback) => {
  const validFiles = ['/app.js', '/sw.js', '/main.css', '/manifest.json'];

  if (!validFiles.includes(event.resource)) {
    callback(null, {
      statusCode: 404,
    });
    return;
  }

  const file = fs.readFileSync(`../dist${event.resource}`);
  const mimeType = mime.lookup(event.resource);

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': mimeType,
    },
    body: file.toString(),
  });
};
