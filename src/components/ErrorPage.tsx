import * as React from "react";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

type AppError = {
  name?: string;
  message?: string;
  stack?: string;
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    background:
      "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(236,72,153,0.08))",
    padding: "24px",
  },
  card: {
    width: "min(720px, 92vw)",
    borderRadius: "20px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)",
    background: "#fff",
    padding: "28px",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.04em",
    background: "rgba(99,102,241,0.12)",
    color: "#4f46e5",
    marginBottom: "10px",
  },
  title: {
    margin: "4px 0 8px",
    fontSize: "28px",
    lineHeight: 1.2,
  },
  subtitle: {
    margin: "0 0 18px",
    color: "#555",
    fontSize: "15px",
  },
  code: {
    display: "block",
    whiteSpace: "pre-wrap",
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: "13px",
    background: "rgba(0,0,0,0.04)",
    border: "1px dashed rgba(0,0,0,0.12)",
    padding: "12px",
    borderRadius: "12px",
    color: "#1f2937",
    marginTop: "10px",
  },
  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "18px",
  },
  btn: {
    appearance: "none",
    border: "none",
    borderRadius: "12px",
    padding: "10px 14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 120ms ease, box-shadow 120ms ease, opacity 120ms",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  },
  primary: {
    background: "#4f46e5",
    color: "white",
  },
  ghost: {
    background: "transparent",
    color: "#111827",
    border: "1px solid rgba(0,0,0,0.12)",
  },
  subtle: {
    background: "rgba(0,0,0,0.04)",
    color: "#111827",
  },
  footer: {
    marginTop: "14px",
    color: "#6b7280",
    fontSize: "12px",
  },
};

export default function ErrorPage(): React.JSX.Element {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    const { status, statusText, data } = error;

    let headline = "Something went wrong";
    if (status === 404) headline = "Page not found";
    else if (status === 401 || status === 403) headline = "Access denied";
    else if (status >= 500) headline = "Server error";

    return (
      <main style={styles.page}>
        <section style={styles.card} role="alert" aria-live="assertive">
          <span style={styles.badge}>
            {status} • {statusText}
          </span>
          <h1 style={styles.title}>{headline} 😵</h1>
          <p style={styles.subtitle}>
            {status === 404
              ? "We couldn’t find the page you’re looking for."
              : `The server responded with ${status} — ${statusText}.`}
          </p>

          <code style={styles.code}>{JSON.stringify(data, null, 2)}</code>

          <div style={styles.row}>
            <button
              style={{ ...styles.btn, ...styles.primary }}
              onClick={() => navigate("/")}
            >
              ⟵ Go Home
            </button>
            <button
              style={{ ...styles.btn, ...styles.ghost }}
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <button
              style={{ ...styles.btn, ...styles.subtle }}
              onClick={() => window.location.reload()}
            >
              ↻ Retry
            </button>
          </div>

          <div style={styles.footer}>
            If this keeps happening, please report what you were trying to do.
          </div>
        </section>
      </main>
    );
  }

  // Fallback (non-route error)
  const fallbackError = error as AppError | undefined;

  return (
    <main style={styles.page}>
      <section style={styles.card} role="alert" aria-live="assertive">
        <span style={styles.badge}>Unexpected Error</span>
        <h1 style={styles.title}>Something went wrong 😵</h1>
        <p style={styles.subtitle}>
          {fallbackError?.message ?? "Unknown error"}
        </p>

        <code style={styles.code}>
          {/* {JSON.stringify(
            {
              name: fallbackError?.name,
              message: fallbackError?.message,
              stack:
                process.env.NODE_ENV === "development"
                  ? fallbackError?.stack
                  : undefined,
            },
            null,
            2
          )} */}
        </code>

        <div style={styles.row}>
          <button
            style={{ ...styles.btn, ...styles.primary }}
            onClick={() => navigate("/")}
          >
            ⟵ Go Home
          </button>
          <button
            style={{ ...styles.btn, ...styles.ghost }}
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <button
            style={{ ...styles.btn, ...styles.subtle }}
            onClick={() => window.location.reload()}
          >
            ↻ Retry
          </button>
        </div>
      </section>
    </main>
  );
}
