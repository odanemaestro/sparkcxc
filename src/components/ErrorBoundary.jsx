import React from "react";

// ============================================================================
// Done by: Odane Robinson
//
// Wraps the whole app (see src/index.js) so a thrown error anywhere in the
// component tree - a malformed question object, a null Supabase response,
// anything - shows a clear recovery screen instead of an unhandled crash
// leaving the student looking at a blank white page with no way forward.
//
// This is a class component because React error boundaries currently have
// no hook-based equivalent - getDerivedStateFromError/componentDidCatch are
// only available on class components.
// ============================================================================
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Logged for local debugging; swap this for a real error-reporting
    // service (Sentry, LogRocket, etc.) if/when one is wired up.
    console.error("SPARK crashed:", error, info?.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#FAFAF8", padding: 24, fontFamily: "'Atkinson Hyperlegible','Inter',sans-serif",
      }}>
        <div style={{
          maxWidth: 440, width: "100%", background: "#fff", borderRadius: 16, padding: 36,
          boxShadow: "0 12px 32px rgba(15,37,87,.14)", border: "1px solid #E2E8F0", textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }} aria-hidden="true">⚠️</div>
          <h1 style={{
            fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 22, fontWeight: 700,
            color: "#0F2557", margin: "0 0 10px",
          }}>
            SPARK could not load this page
          </h1>
          <p style={{ color: "#64748B", fontSize: 14.5, lineHeight: 1.6, margin: "0 0 22px" }}>
            SPARK ran into an unexpected error and couldn't continue. Your progress up to this
            point is saved - reloading should get you right back on track.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              background: "#0D9488", color: "#fff", border: "none", borderRadius: 8,
              padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer",
              boxShadow: "0 2px 8px rgba(13,148,136,.22)",
            }}
          >
            Reload SPARK
          </button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre style={{
              marginTop: 22, textAlign: "left", fontSize: 11.5, color: "#991B1B",
              background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8,
              padding: 12, overflowX: "auto", whiteSpace: "pre-wrap",
            }}>
              {String(this.state.error?.stack || this.state.error)}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
