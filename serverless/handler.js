'use strict';

const fs = require('fs');

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
