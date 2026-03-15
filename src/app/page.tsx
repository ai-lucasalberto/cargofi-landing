"use client";

import { useState } from "react";

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ background: "rgba(10,15,30,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">
          Cargo<span style={{ color: "#34d399" }}>Fi</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#94a3b8" }}>
          <a href="#problema" className="hover:text-white transition-colors">Problema</a>
          <a href="#solucion" className="hover:text-white transition-colors">Solución</a>
          <a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a>
          <a href="#precios" className="hover:text-white transition-colors">Precios</a>
          <a href="/demo" className="hover:text-white transition-colors" style={{ color: "#60a5fa" }}>Demo →</a>
        </div>
        <a href="#contacto"
          className="hidden md:inline-flex px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-white"
          style={{ background: "#2563eb" }}>
          Solicitar demo
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: "#94a3b8" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm" style={{ background: "#0d1530", color: "#cbd5e1" }}>
          <a href="#problema" onClick={() => setOpen(false)}>Problema</a>
          <a href="#solucion" onClick={() => setOpen(false)}>Solución</a>
          <a href="#como-funciona" onClick={() => setOpen(false)}>Cómo funciona</a>
          <a href="#precios" onClick={() => setOpen(false)}>Precios</a>
          <a href="#contacto" onClick={() => setOpen(false)} style={{ color: "#60a5fa", fontWeight: 600 }}>Solicitar demo →</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0a0f1e" }}>
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 800, height: 400, background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />

      <div className="relative text-center px-6 max-w-4xl mx-auto pt-24">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-white">
          Cruza la frontera<br />
          <span className="gradient-text">con inteligencia</span>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#94a3b8" }}>
          CargoFi captura, valida y organiza toda tu documentación aduanal con IA.
          Detecta errores antes de llegar a frontera. Reduce horas de trabajo manual a segundos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#contacto"
            className="px-8 py-4 rounded-xl font-bold text-base text-white transition-all"
            style={{ background: "linear-gradient(90deg, #2563eb, #0891b2)", boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}>
            Solicitar demo gratis
          </a>
          <a href="#como-funciona"
            className="px-8 py-4 rounded-xl font-semibold transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#cbd5e1" }}>
            Ver cómo funciona →
          </a>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "< 10s", label: "por documento" },
            { value: "6+", label: "tipos de doc" },
            { value: "0", label: "errores en aduana" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "#64748b" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section id="problema" className="py-24" style={{ background: "#0d1530" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#3b82f6" }}>El problema</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            El cruce de frontera sigue siendo<br />
            <span style={{ color: "#f87171" }}>papel y errores</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
            La documentación aduanal es el cuello de botella más costoso del transporte cross-border.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "⏱️", stat: "3–5 horas", color: "#f87171", title: "por embarque", desc: "El tiempo promedio que pierde un operador procesando documentación manualmente por cada embarque." },
            { icon: "🚫", stat: "1 de cada 4", color: "#fb923c", title: "con retrasos", desc: "Embarques cross-border MEX–USA enfrentan retrasos en aduana por documentos erróneos o incompletos." },
            { icon: "💸", stat: "$500–$2,000", color: "#f87171", title: "por retraso de 24h", desc: "El costo promedio de una detención en frontera por documentación incorrecta o faltante." },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl p-8 transition-all"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-4xl mb-4">{p.icon}</div>
              <div className="text-4xl font-extrabold mb-1" style={{ color: p.color }}>{p.stat}</div>
              <div className="font-semibold mb-3 text-white">{p.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const features = [
    { icon: "🔍", name: "Doc Capture", desc: "Sube un PDF, imagen o foto desde WhatsApp. La IA extrae todos los campos en segundos. BOLs, facturas, packing lists, cartas porte, pedimentos." },
    { icon: "🛡️", name: "Pre-Cross Validator", desc: "Checklist inteligente antes de salir. ¿Falta el pedimento? ¿La invoice no coincide con el BOL? Te lo dice antes de llegar a la aduana." },
    { icon: "📝", name: "Doc Generator", desc: "Llena un formulario simple y genera BOLs, packing lists y commercial invoices listos para firmar. Bilingüe MEX/USA." },
    { icon: "🏷️", name: "HS Code Advisor", desc: "Describe tu carga y obtén la fracción arancelaria MEX + código HTS USA con nivel de confianza. Menos consultas al agente." },
    { icon: "🧮", name: "Cost Estimator", desc: "Estimación de arancel, IVA, DTA y honorarios antes de cruzar. Sin sorpresas en frontera." },
    { icon: "🗄️", name: "Doc Vault", desc: "Todos tus documentos organizados por embarque, cliente y fecha. Búsqueda instantánea. Nunca más pierdas un POD." },
  ];

  return (
    <section id="solucion" className="py-24" style={{ background: "#0a0f1e" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#3b82f6" }}>La solución</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Todo lo que necesitas para<br />
            <span className="gradient-text">cruzar sin fricciones</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
            Seis módulos integrados que cubren todo el ciclo documental de una operación cross-border.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.name} className="rounded-2xl p-7 transition-all group"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{f.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: "📤", num: "01", title: "Sube el documento", desc: "PDF, imagen o foto directo desde WhatsApp. Cualquier documento aduanal o de embarque." },
    { icon: "🤖", num: "02", title: "La IA extrae y clasifica", desc: "Tipo de documento detectado automáticamente. Todos los campos identificados en segundos." },
    { icon: "✅", num: "03", title: "Valida antes de cruzar", desc: "Checklist automático + alertas de inconsistencias entre documentos. Sin sorpresas en aduana." },
    { icon: "📂", num: "04", title: "Queda en tu vault", desc: "Archivo organizado por embarque y cliente. Búsqueda instantánea. Acceso desde cualquier dispositivo." },
  ];

  return (
    <section id="como-funciona" className="py-24" style={{ background: "#0d1530" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#3b82f6" }}>Cómo funciona</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            De documento a <span className="gradient-text">cruce aprobado</span><br />en 4 pasos
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
                style={{ background: "linear-gradient(135deg, #2563eb, #0891b2)", boxShadow: "0 8px 24px rgba(37,99,235,0.25)" }}>
                {s.icon}
              </div>
              <div className="text-xs font-bold tracking-widest mb-2" style={{ color: "#3b82f6" }}>{s.num}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter", price: "$99", limit: "Hasta 30 embarques/mes", featured: false,
      features: ["Doc Capture (OCR + extracción AI)", "Pre-Cross Validator", "Doc Vault", "Soporte por email"],
    },
    {
      name: "Growth", price: "$249", limit: "Hasta 150 embarques/mes", featured: true,
      features: ["Todo Starter", "Doc Generator", "HS Code Advisor", "Cost Estimator", "Soporte prioritario"],
    },
    {
      name: "Pro", price: "$499", limit: "Ilimitado + API", featured: false,
      features: ["Todo Growth", "API acceso completo", "Integración WhatsApp", "Multi-usuario", "Onboarding dedicado"],
    },
  ];

  return (
    <section id="precios" className="py-24" style={{ background: "#0a0f1e" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#3b82f6" }}>Precios</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Planes simples</h2>
          <p className="text-lg" style={{ color: "#94a3b8" }}>
            Sin contratos anuales. Cancela cuando quieras.{" "}
            <span style={{ color: "#4ade80", fontWeight: 600 }}>30 días gratis para piloto.</span>
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.name} className="relative rounded-2xl p-8"
              style={p.featured
                ? { background: "linear-gradient(160deg, rgba(37,99,235,0.18), rgba(8,145,178,0.08))", border: "2px solid #3b82f6" }
                : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {p.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-white whitespace-nowrap"
                  style={{ background: "linear-gradient(90deg, #2563eb, #0891b2)" }}>
                  MÁS POPULAR
                </div>
              )}
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#94a3b8" }}>{p.name}</div>
              <div className="text-5xl font-extrabold mb-1 text-white">
                {p.price}<span className="text-base font-normal" style={{ color: "#64748b" }}> USD/mes</span>
              </div>
              <div className="text-sm mb-8" style={{ color: "#64748b" }}>{p.limit}</div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#cbd5e1" }}>
                    <span style={{ color: "#3b82f6", fontWeight: 700 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contacto"
                className="block text-center py-3 rounded-xl font-bold text-sm transition-all text-white"
                style={p.featured
                  ? { background: "linear-gradient(90deg, #2563eb, #0891b2)" }
                  : { border: "1px solid rgba(255,255,255,0.12)" }}>
                {p.featured ? "Empezar ahora" : "Solicitar demo"}
              </a>
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
    try {
      const res = await fetch("https://cargofi-backend-production.up.railway.app/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, email, source: "landing" }),
      });
      if (!res.ok) throw new Error("server");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden" style={{ background: "#0d1530" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 60%)" }} />
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="text-5xl mb-6">🚛</div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          ¿Listo para cruzar{" "}
          <span className="gradient-text">sin fricciones?</span>
        </h2>
        <p className="text-lg mb-10" style={{ color: "#94a3b8" }}>
          Piloto gratuito 30 días · Sin tarjeta de crédito · Setup en 15 minutos
        </p>

        {status === "success" ? (
          <div className="max-w-md mx-auto rounded-2xl p-8 text-center"
            style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)" }}>
            <div className="text-4xl mb-3">✅</div>
            <div className="text-xl font-bold mb-2 text-white">¡Listo! Te contactamos pronto.</div>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              Revisamos tu solicitud y te escribimos en menos de 24 horas para agendar el piloto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
            <input name="company" type="text" placeholder="Nombre de tu empresa" required
              disabled={status === "loading"}
              className="px-5 py-4 rounded-xl text-white outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
            <input name="email" type="email" placeholder="Tu correo de trabajo" required
              disabled={status === "loading"}
              className="px-5 py-4 rounded-xl text-white outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
            {status === "error" && (
              <p className="text-sm" style={{ color: "#f87171" }}>
                Algo salió mal. Escríbenos directo a{" "}
                <a href="mailto:hello@cargofi.io" style={{ color: "#60a5fa" }}>hello@cargofi.io</a>
              </p>
            )}
            <button type="submit" disabled={status === "loading"}
              className="px-8 py-4 rounded-xl font-bold text-base text-white transition-all"
              style={{
                background: status === "loading" ? "rgba(37,99,235,0.5)" : "linear-gradient(90deg, #2563eb, #0891b2)",
                boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
                cursor: status === "loading" ? "not-allowed" : "pointer",
              }}>
              {status === "loading" ? "Enviando..." : "Solicitar piloto gratis →"}
            </button>
          </form>
        )}

        <p className="text-sm mt-8" style={{ color: "#475569" }}>
          O escríbenos a{" "}
          <a href="mailto:hello@cargofi.io" style={{ color: "#60a5fa" }}>hello@cargofi.io</a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0a0f1e" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "#475569" }}>
        <div className="font-bold" style={{ color: "#94a3b8" }}>
          Cargo<span style={{ color: "#34d399" }}>Fi</span>
        </div>
        <div>© {new Date().getFullYear()} CargoFi · cargofi.io</div>
        <a href="mailto:hello@cargofi.io" className="hover:text-slate-400 transition-colors">Contacto</a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}
