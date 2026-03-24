"use client";

import { useState } from "react";

function Nav() {
  return (
    <nav
      style={{
        background: "rgba(10,15,30,0.90)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
      }}
    >
      <a href="/" style={{ textDecoration: "none", fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
        Cargo<span style={{ color: "#34d399" }}>Fi</span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 13, color: "#94a3b8" }}>
        <a href="#lanes" style={{ color: "#94a3b8", textDecoration: "none" }}>Lanes</a>
        <a href="#servicios" style={{ color: "#94a3b8", textDecoration: "none" }}>Servicios</a>
        <a href="#contacto" style={{ color: "#94a3b8", textDecoration: "none" }}>Contacto</a>
        <a
          href="#contacto"
          style={{
            background: "linear-gradient(90deg, #059669, #34d399)",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: 8,
            fontWeight: 700,
            textDecoration: "none",
            fontSize: 13,
          }}
        >
          Cotizar carga
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      style={{
        background: "#0a0f1e",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "100px 24px 60px",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 400,
          background: "radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", textAlign: "center", maxWidth: 780 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: 12,
            fontWeight: 700,
            color: "#34d399",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          <span>🚛</span> CargoFi Transport · Laredo TX / Nuevo Laredo
        </div>

        <h1
          style={{
            fontSize: "clamp(38px, 6vw, 72px)",
            fontWeight: 900,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            color: "#fff",
            marginBottom: 24,
          }}
        >
          Tu carga cruza.<br />
          <span
            style={{
              background: "linear-gradient(90deg, #34d399, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Nosotros la movemos.
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "#94a3b8",
            maxWidth: 520,
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}
        >
          Carrier certificado en el corredor México–USA. Despacho inteligente,
          visibilidad en tiempo real y documentación automatizada en cada embarque.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#contacto"
            style={{
              background: "linear-gradient(90deg, #059669, #34d399)",
              color: "#fff",
              padding: "16px 36px",
              borderRadius: 12,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 15,
              boxShadow: "0 8px 24px rgba(52,211,153,0.2)",
            }}
          >
            Cotizar mi carga →
          </a>
          <a
            href="#lanes"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#cbd5e1",
              padding: "16px 36px",
              borderRadius: 12,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Ver lanes
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            maxWidth: 440,
            margin: "64px auto 0",
          }}
        >
          {[
            { value: "Laredo TX", label: "Hub principal" },
            { value: "Cross-border", label: "MEX / USA" },
            { value: "24/7", label: "Despacho activo" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lanes() {
  const lanes = [
    { from: "Nuevo Laredo", to: "Laredo TX", flag: "🔀", desc: "Drayage en frontera. Transferencia de carga entre carrier mexicano y americano." },
    { from: "Laredo TX", to: "San Antonio TX", flag: "🇺🇸", desc: "Hub regional Texas. Conexión a distribución sur de USA." },
    { from: "Laredo TX", to: "Houston TX", flag: "🇺🇸", desc: "Puerto seco al puerto marítimo. Carga industrial y química." },
    { from: "Laredo TX", to: "Dallas / Fort Worth", flag: "🇺🇸", desc: "Corredor DFW. Uno de los destinos más activos del corredor Laredo." },
    { from: "Laredo TX", to: "Interior USA", flag: "🗺️", desc: "Midwest, Southeast y costa este via interline con carriers aliados." },
  ];

  return (
    <section
      id="lanes"
      style={{ background: "#0d1530", padding: "96px 24px" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#34d399", marginBottom: 12 }}>
            Cobertura
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 16 }}>
            Lanes que operamos
          </h2>
          <p style={{ color: "#64748b", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>
            Corredor principal: Laredo TX / Nuevo Laredo. El punto de entrada más activo de la frontera México–USA.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {lanes.map((l) => (
            <div
              key={l.from + l.to}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 280 }}>
                <span style={{ fontSize: 22 }}>{l.flag}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>
                    {l.from} → {l.to}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#64748b", flex: 1 }}>{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    {
      icon: "📦",
      title: "Dry Van",
      desc: "Carga general y manufacturada. Capacidad estándar 53' para rutas domésticas e internacionales.",
    },
    {
      icon: "🤖",
      title: "Despacho inteligente",
      desc: "Nuestro sistema de despacho basado en IA coordina cada movimiento. Menos tiempo en vacío, más eficiencia.",
    },
    {
      icon: "📱",
      title: "Visibilidad en tiempo real",
      desc: "Tracking de tu carga en cada etapa del viaje. Notificaciones automáticas en cruces clave.",
    },
    {
      icon: "📄",
      title: "Documentación automatizada",
      desc: "BOLs, cartas porte y documentos aduanales generados y validados automáticamente en cada embarque.",
    },
    {
      icon: "🤝",
      title: "Owner Operators",
      desc: "Red de operadores propietarios verificados y certificados. Flota flexible que escala con tu demanda.",
    },
    {
      icon: "🔄",
      title: "Cross-border coordinado",
      desc: "Coordinamos la transferencia entre carrier mexicano y americano en frontera. Sin fricciones.",
    },
  ];

  return (
    <section
      id="servicios"
      style={{ background: "#0a0f1e", padding: "96px 24px" }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#34d399", marginBottom: 12 }}>
            Servicios
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
            Por qué CargoFi Transport
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {items.map((item) => (
            <div
              key={item.title}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "28px 24px",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const company = (form.elements.namedItem("company") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const details = (form.elements.namedItem("details") as HTMLTextAreaElement).value.trim();
    try {
      const res = await fetch("https://cargofi-backend-production.up.railway.app/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, email, source: "transport", details }),
      });
      if (!res.ok) throw new Error("server");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      style={{ background: "#0d1530", padding: "96px 24px", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>🚛</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 16 }}>
          Cotiza tu carga
        </h2>
        <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 40, lineHeight: 1.7 }}>
          Dinos qué necesitas mover. Te respondemos en menos de 2 horas en días hábiles.
        </p>

        {status === "success" ? (
          <div
            style={{
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.3)",
              borderRadius: 16,
              padding: "40px 32px",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              ¡Recibido! Te contactamos pronto.
            </div>
            <p style={{ fontSize: 14, color: "#94a3b8" }}>
              Nuestro equipo de despacho revisa tu solicitud y te escribe en menos de 2 horas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "company", type: "text", placeholder: "Empresa / Nombre" },
              { name: "email", type: "email", placeholder: "Correo de contacto" },
            ].map((f) => (
              <input
                key={f.name}
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                required
                disabled={status === "loading"}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "14px 18px",
                  color: "#fff",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            ))}
            <textarea
              name="details"
              placeholder="Cuéntanos: origen, destino, tipo de carga, frecuencia estimada..."
              rows={4}
              disabled={status === "loading"}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "14px 18px",
                color: "#fff",
                fontSize: 14,
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
            {status === "error" && (
              <p style={{ fontSize: 13, color: "#f87171" }}>
                Algo salió mal. Escríbenos a{" "}
                <a href="mailto:contact@cargofi.io" style={{ color: "#60a5fa" }}>contact@cargofi.io</a>
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                background: status === "loading" ? "rgba(5,150,105,0.5)" : "linear-gradient(90deg, #059669, #34d399)",
                color: "#fff",
                padding: "16px",
                borderRadius: 12,
                fontWeight: 800,
                fontSize: 15,
                border: "none",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                boxShadow: "0 8px 24px rgba(52,211,153,0.2)",
              }}
            >
              {status === "loading" ? "Enviando..." : "Enviar solicitud →"}
            </button>
          </form>
        )}

        <p style={{ fontSize: 13, color: "#334155", marginTop: 24 }}>
          O escríbenos directo a{" "}
          <a href="mailto:contact@cargofi.io" style={{ color: "#34d399" }}>contact@cargofi.io</a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "#0a0f1e",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 12,
        color: "#334155",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <a href="/" style={{ textDecoration: "none", fontWeight: 800, color: "#94a3b8" }}>
        Cargo<span style={{ color: "#34d399" }}>Fi</span>
      </a>
      <span>© {new Date().getFullYear()} CargoFi LLC · Texas · Laredo Corridor</span>
      <a href="mailto:contact@cargofi.io" style={{ color: "#475569", textDecoration: "none" }}>
        contact@cargofi.io
      </a>
    </footer>
  );
}

export default function TransportPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Lanes />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
