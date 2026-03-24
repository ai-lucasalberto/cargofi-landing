"use client";

export default function Hub() {
  return (
    <main
      style={{ background: "#0a0f1e", minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Nav */}
      <nav
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
          Cargo<span style={{ color: "#34d399" }}>Fi</span>
        </div>
        <a
          href="mailto:contact@cargofi.io"
          style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}
        >
          contact@cargofi.io
        </a>
      </nav>

      {/* Hero */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 300,
            background: "radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#3b82f6",
            marginBottom: 24,
          }}
        >
          Cross-Border Freight Intelligence
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 68px)",
            fontWeight: 900,
            letterSpacing: "-1.5px",
            lineHeight: 1.08,
            color: "#fff",
            marginBottom: 20,
            maxWidth: 700,
          }}
        >
          Movemos carga.<br />
          <span
            style={{
              background: "linear-gradient(90deg, #3b82f6, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Inteligencia incluida.
          </span>
        </h1>

        <p
          style={{
            fontSize: 17,
            color: "#94a3b8",
            maxWidth: 480,
            lineHeight: 1.7,
            marginBottom: 64,
          }}
        >
          Dos soluciones para el corredor MEX–USA. Elige lo que necesitas.
        </p>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            maxWidth: 720,
            width: "100%",
          }}
        >
          {/* Docs Card */}
          <a
            href="/docs"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(59,130,246,0.25)",
                borderRadius: 20,
                padding: "36px 32px",
                textAlign: "left",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.6)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(59,130,246,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.25)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>📄</div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#3b82f6",
                  marginBottom: 8,
                }}
              >
                CargoFi Docs
              </div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 12,
                  letterSpacing: "-0.3px",
                }}
              >
                IA para documentación aduanal
              </h2>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, marginBottom: 24 }}>
                Captura, valida y organiza BOLs, pedimentos, facturas y cartas porte.
                Detecta errores antes de llegar a frontera.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#3b82f6",
                }}
              >
                Ver plataforma →
              </div>
            </div>
          </a>

          {/* Transport Card */}
          <a
            href="/transport"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(52,211,153,0.25)",
                borderRadius: 20,
                padding: "36px 32px",
                textAlign: "left",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(52,211,153,0.6)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(52,211,153,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(52,211,153,0.25)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>🚛</div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#34d399",
                  marginBottom: 8,
                }}
              >
                CargoFi Transport
              </div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 12,
                  letterSpacing: "-0.3px",
                }}
              >
                Carrier cross-border Laredo TX
              </h2>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, marginBottom: 24 }}>
                Transporte de carga entre México y USA. Corredor Laredo–interior Texas.
                Visibilidad en tiempo real, despacho inteligente.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#34d399",
                }}
              >
                Trabajar con nosotros →
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 12,
          color: "#334155",
        }}
      >
        <span>
          Cargo<span style={{ color: "#34d399", fontWeight: 700 }}>Fi</span>
        </span>
        <span>© {new Date().getFullYear()} CargoFi LLC · Texas</span>
        <a href="mailto:contact@cargofi.io" style={{ color: "#475569", textDecoration: "none" }}>
          contact@cargofi.io
        </a>
      </footer>
    </main>
  );
}
