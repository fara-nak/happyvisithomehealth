import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'

// Ensure root element exists before rendering
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

// Global error handler to catch unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error, event.filename, event.lineno)
  if (rootElement && !rootElement.querySelector('h1')) {
    rootElement.innerHTML = `
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; padding: 2rem; color: white; text-align: center; background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.45) 100%), url('/bg.png'); background-size: cover; background-position: center top;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Something went wrong</h1>
        <p style="font-size: 1.1rem; margin-bottom: 2rem;">Please refresh the page.</p>
        <a href="/" style="padding: 1rem 2rem; background: white; color: #086744; border-radius: 50px; text-decoration: none; font-weight: 600;">Refresh Page</a>
      </div>
    `
  }
})

// Add console log to verify script is loading
console.log('React app initializing...', {
  hasRoot: !!rootElement,
  userAgent: navigator.userAgent,
  location: window.location.href
})

// Wrap everything in try-catch to prevent blank page
try {
  // Ensure React and ReactDOM are available
  if (typeof createRoot === 'undefined') {
    throw new Error('React createRoot is not available')
  }

  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
  console.log('React app rendered successfully')
} catch (error) {
  console.error('Failed to render React app:', error)
  console.error('Error details:', error)
  
  // Show error message to user
  const errorMessage = error instanceof Error ? error.message : String(error)
  rootElement.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; padding: 2rem; color: white; text-align: center; background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.45) 100%), url('/bg.png'); background-size: cover; background-position: center top;">
      <h1 style="font-size: 2rem; margin-bottom: 1rem;">Something went wrong</h1>
      <p style="font-size: 1.1rem; margin-bottom: 2rem;">Please refresh the page or contact us directly.</p>
      <p style="font-size: 0.9rem; margin-bottom: 1rem; opacity: 0.8;">Error: ${errorMessage}</p>
      <a href="/" style="padding: 1rem 2rem; background: white; color: #086744; border-radius: 50px; text-decoration: none; font-weight: 600;">Refresh Page</a>
    </div>
  `
}
