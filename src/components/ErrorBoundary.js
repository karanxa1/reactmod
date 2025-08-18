import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Report error to monitoring service
    this.reportError(error, errorInfo);
  }

  reportError = (error, errorInfo) => {
    // Performance monitoring and error reporting
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorId: this.state.errorId
    };

    // Log to console for development
    console.group('🚨 Error Report');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Full Report:', errorReport);
    console.groupEnd();

    // In production, you would send this to your error tracking service
    // Example: Sentry, LogRocket, or custom analytics
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
      this.sendToErrorService(errorReport);
    }
  };

  sendToErrorService = (errorReport) => {
    // Example implementation for error reporting
    try {
      // You can integrate with services like Sentry, LogRocket, etc.
      fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport)
      }).catch(err => {
        console.error('Failed to report error:', err);
      });
    } catch (err) {
      console.error('Error reporting failed:', err);
    }
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">
              <AlertTriangle size={64} />
            </div>
            
            <h1 className="error-title">Oops! Something went wrong</h1>
            
            <p className="error-message">
              We're sorry, but something unexpected happened. Our team has been notified and is working on a fix.
            </p>
            
            <div className="error-details">
              <p className="error-id">Error ID: {this.state.errorId}</p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="error-debug">
                  <summary>Debug Information (Development Only)</summary>
                  <div className="error-debug-content">
                    <h4>Error Message:</h4>
                    <pre>{this.state.error.message}</pre>
                    
                    <h4>Stack Trace:</h4>
                    <pre>{this.state.error.stack}</pre>
                    
                    {this.state.errorInfo && (
                      <>
                        <h4>Component Stack:</h4>
                        <pre>{this.state.errorInfo.componentStack}</pre>
                      </>
                    )}
                  </div>
                </details>
              )}
            </div>
            
            <div className="error-actions">
              <button 
                className="error-button primary" 
                onClick={this.handleRetry}
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              
              <button 
                className="error-button secondary" 
                onClick={this.handleGoHome}
              >
                <Home size={18} />
                Go Home
              </button>
            </div>
            
            <div className="error-help">
              <p>If this problem persists, please contact our support team:</p>
              <a href="https://t.me/keyisheremybaby" target="_blank" rel="noopener noreferrer">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;