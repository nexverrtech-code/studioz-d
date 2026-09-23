import { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Top-level error boundary.
 *
 * Catches render-time failures so a single broken component takes down a
 * section rather than the whole site, and offers the visitor a real way out.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Surface in development; in production this is where a reporting
    // service (Sentry et al.) would be called.
    if (import.meta.env.DEV) {
      console.error('Studioz D — render error:', error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-[70svh] items-center justify-center px-gutter py-section">
        <div className="flex max-w-prose-sm flex-col items-center gap-6 text-center">
          <p className="eyebrow">Something broke</p>
          <h1 className="text-fluid-3xl text-ink-900">
            That did not load the way it should have.
          </h1>
          <p className="text-fluid-base text-ink-500">
            The page hit an error on our side. Reloading usually clears it — and if it does not,
            we would genuinely like to know.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" className="btn btn-solid" onClick={this.handleReset}>
              Try again
            </button>
            <Link to="/" className="btn btn-outline" onClick={this.handleReset}>
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
