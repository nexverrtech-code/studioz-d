import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';

/**
 * Entry point.
 *
 * `scrollRestoration = 'manual'` hands scroll control to the router's
 * ScrollToTop, which knows about the sticky header and Lenis. Leaving it on
 * 'auto' causes the browser to fight both.
 */
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const container = document.getElementById('root');

// Clear the anti-FOUC veil from index.html before React takes over the node.
container.innerHTML = '';

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
