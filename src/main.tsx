import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'

// Redirect old URLs to homepage
const currentPath = window.location.pathname;
const oldUrlPatterns = [
  '/About.html',
  '/index.html',
  '/HIL/',
  '/lander'
];

// Check if current path matches any old URL pattern
const isOldUrl = oldUrlPatterns.some(pattern => {
  if (pattern.endsWith('/')) {
    return currentPath.startsWith(pattern);
  }
  return currentPath === pattern || currentPath.startsWith(pattern + '?');
});

// Also check for HIL or lander in path
if (isOldUrl || currentPath.includes('/HIL/') || currentPath.includes('/lander')) {
  // Redirect to homepage (preserve hash if present for React routing)
  window.location.replace('/');
}

// Ensure root element exists before rendering
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
