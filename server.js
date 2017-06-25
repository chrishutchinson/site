const fs = require('fs');
const http = require('http');

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
});
const { css } = App.renderCss();

const server = http.createServer((request, response) => {
  let responseText;
  let contentType = 'text/html';

  switch (request.url) {
    case '/':
      responseText = fs
        .readFileSync('./dist/index.html')
        .toString()
        .replace('</head>', `<style>${css}</style></head>`)
        .replace('<main></main>', `<main>${html}</main>`);
      break;
    default:
      response.end();
      return;
  }

  response.writeHead(200, { 'Content-Type': contentType });
  response.write(responseText);
  response.end();
});

server.listen(8001);
console.log('Server is listening');
