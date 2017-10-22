'use strict';

const fs = require('fs');
const mime = require('mime-types');
const { minify } = require('html-minifier');

// `import` > `require`
require('reify');

// Register Svelte SSR
require('svelte/ssr/register');

// App component
const App = require('./app/components/App/index.html');

// Data
const { items } = require('./app/data');

// Render HTML + CSS
const html = App.render({
  items,
  staticResourceDomain: process.env.STATIC_RESOURCE_DOMAIN,
  hydratable: true,
});
const { css } = App.renderCss();

module.exports.app = (event, context, callback) => {
  const htmlContainer = require('./app/html')({
    domain: process.env.STATIC_RESOURCE_DOMAIN,
  });

  const htmlContent = htmlContainer
    .replace('</head>', `<style>${css}</style></head>`)
    .replace('<main></main>', `<main>${html}</main>`);

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
    body: minify(htmlContent),
  };

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

  const file = fs.readFileSync(`./dist${event.resource}`);

  const mimeType = mime.lookup(event.resource);

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': mimeType,
    },
    body: file.toString(),
  });
};
