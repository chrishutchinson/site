// main.js
import App from './components/App/index.html';

// Data
import { items } from './data/index.js';

document.querySelector('main').innerHTML = '';
const app = new App({
  target: document.querySelector('main'),
  data: {
    items,
  },
});
