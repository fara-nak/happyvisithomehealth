import { Component } from 'react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
          color: 'white',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.45) 100%), url("/bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Please refresh the page or contact us directly.
          </p>
          <a 
            href="/" 
            style={{
              padding: '1rem 2rem',
              background: 'white',
              color: '#086744',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Refresh Page
          </a>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

