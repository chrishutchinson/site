// main.js
import App from './components/App/index.html';

// Data
import { items } from './data/index.js';

const app = new App({
  target: document.querySelector('main'),
  hydratable: true,
  data: {
    items,
  },
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker
      .register(`${window.staticResourceDomain}sw.js`)
      .then(
        registration => {
          // Registration was successful
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          );
        },
        err => {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        }
      )
  );
}
