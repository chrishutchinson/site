// main.js
import App from './components/App/index.html';

// Data
import { items } from './data/index.js';

const app = new App({
  target: document.querySelector('main'),
  hydratable: true,
  data: {
    items,
    staticResourceDomain: 'http://localhost:3000/',
  },
});
