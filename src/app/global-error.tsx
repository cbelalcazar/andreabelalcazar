"use client"; // reemplaza al root layout cuando este falla; debe renderizar <html> y <body>

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="es-CO">
      <body style={{ margin: 0, background: "#f5f5f7", color: "#1d1d1f", fontFamily: "system-ui, sans-serif" }}>
        <title>Error · Andrea Belalcázar</title>
        <main
          style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}
        >
          <div>
            <h1
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "2rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              El sitio no pudo cargarse.
            </h1>
            <p style={{ color: "#5f5f64" }}>
              Intenta de nuevo en unos segundos.{error.digest ? ` Ref. ${error.digest}` : ""}
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: "1.5rem",
                minHeight: 48,
                padding: "0 2rem",
                borderRadius: 999,
                border: 0,
                background: "#1d1d1f",
                color: "#ffffff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reintentar
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
