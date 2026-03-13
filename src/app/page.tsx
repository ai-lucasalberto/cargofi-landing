"use client";

import { useState } from "react";

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-[#0a0f1e]/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">
          Cargo<span className="text-blue-500">Fi</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#problema" className="hover:text-white transition-colors">Problema</a>
          <a href="#solucion" className="hover:text-white transition-colors">Solución</a>
          <a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a>
          <a href="#precios" className="hover:text-white transition-colors">Precios</a>
        </div>
        <a
          href="#contacto"
          className="hidden md:inline-flex px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold transition-colors"
        >
          Solicitar demo
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400">
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm text-slate-300 bg-[#0d1530]">
          <a href="#problema" onClick={() => setOpen(false)}>Problema</a>
          <a href="#solucion" onClick={() => setOpen(false)}>Solución</a>
          <a href="#como-funciona" onClick={() => setOpen(false)}>Cómo funciona</a>
          <a href="#precios" onClick={() => setOpen(false)}>Precios</a>
          <a href="#contacto" onClick={() => setOpen(false)} className="text-blue-400 font-semibold">
            Solicitar demo →
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative text-center px-6 max-w-4xl mx-auto pt-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8">
          <span>📄</span>
          <span>Plataforma AI · Cross-border MEX–USA</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          Cruza la frontera
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            con inteligencia
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          CargoFi captura, valida y organiza toda tu documentación aduanal con IA.
          Detecta errores antes de llegar a frontera. Reduce horas de trabajo manual a segundos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#contacto"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 font-bold text-base transition-all shadow-lg shadow-blue-500/20"
          >
            Solicitar demo gratis
          </a>
          <a
            href="#como-funciona"
            className="px-8 py-4 rounded-xl border border-white/10 hover:border-white/30 font-semibold text-slate-300 hover:text-white transition-all"
          >
            Ver cómo funciona →
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "< 10s", label: "por documento" },
            { value: "6+", label: "tipos de doc" },
            { value: "0", label: "errores en aduana" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Problem ──────────────────────────────────────────────────────────────────
function Problem() {
  return (
    <section id="problema" className="py-24 bg-[#0d1530]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">El problema</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            El cruce de frontera sigue siendo
            <br />
            <span className="text-red-400">papel y errores</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            La documentación aduanal es el cuello de botella más costoso del transporte cross-border. Y nadie lo ha resuelto bien.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "⏱️",
              stat: "3–5 horas",
              color: "text-red-400",
              title: "por embarque",
              desc: "El tiempo promedio que pierde un operador logístico procesando documentación manualmente por cada embarque.",
            },
            {
              icon: "🚫",
              stat: "1 de cada 4",
              color: "text-orange-400",
              title: "con retrasos",
              desc: "Embarques cross-border MEX–USA enfrentan retrasos en aduana por documentos erróneos o incompletos.",
            },
            {
              icon: "💸",
              stat: "$500–$2,000",
              color: "text-red-400",
              title: "por retraso de 24h",
              desc: "El costo promedio de una detención en frontera causada por documentación incorrecta o faltante.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 hover:border-white/20 transition-colors"
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <div className={`text-4xl font-extrabold ${p.color} mb-1`}>{p.stat}</div>
              <div className="text-slate-300 font-semibold mb-3">{p.title}</div>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Solution ─────────────────────────────────────────────────────────────────
function Solution() {
  const features = [
    {
      icon: "🔍",
      name: "Doc Capture",
      desc: "Sube un PDF, imagen o foto desde WhatsApp. La IA extrae todos los campos en segundos. BOLs, facturas, packing lists, cartas porte, pedimentos.",
    },
    {
      icon: "🛡️",
      name: "Pre-Cross Validator",
      desc: "Checklist inteligente antes de salir. ¿Falta el pedimento? ¿La invoice no coincide con el BOL? Te lo dice antes de llegar a la aduana.",
    },
    {
      icon: "📝",
      name: "Doc Generator",
      desc: "Llena un formulario simple y genera BOLs, packing lists y commercial invoices listos para firmar. Bilingüe MEX/USA.",
    },
    {
      icon: "🏷️",
      name: "HS Code Advisor",
      desc: "Describe tu carga y obtén la fracción arancelaria MEX + código HTS USA con nivel de confianza y notas. Menos consultas al agente, más velocidad.",
    },
    {
      icon: "🧮",
      name: "Cost Estimator",
      desc: "Estimación de arancel, IVA, DTA y honorarios antes de cruzar. Sin sorpresas en frontera. Planifica tus costos con anticipación.",
    },
    {
      icon: "🗄️",
      name: "Doc Vault",
      desc: "Todos tus documentos organizados por embarque, cliente y fecha. Búsqueda instantánea. Nunca más pierdas un POD o un BOL.",
    },
  ];

  return (
    <section id="solucion" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">La solución</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Todo lo que necesitas para
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              cruzar sin fricciones
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Seis módulos integrados que cubren todo el ciclo documental de una operación cross-border.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.name}
              className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors">{f.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      icon: "📤",
      num: "01",
      title: "Sube el documento",
      desc: "PDF, imagen o foto directo desde WhatsApp. Cualquier documento aduanal o de embarque.",
    },
    {
      icon: "🤖",
      num: "02",
      title: "La IA extrae y clasifica",
      desc: "Tipo de documento detectado automáticamente. Todos los campos identificados y estructurados en segundos.",
    },
    {
      icon: "✅",
      num: "03",
      title: "Valida antes de cruzar",
      desc: "Checklist automático + alertas de inconsistencias entre documentos. Sin sorpresas en aduana.",
    },
    {
      icon: "📂",
      num: "04",
      title: "Queda en tu vault",
      desc: "Archivo organizado por embarque y cliente. Búsqueda instantánea. Acceso desde cualquier dispositivo.",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#0d1530]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Cómo funciona</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            De documento a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              cruce aprobado
            </span>
            <br />en 4 pasos
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
              )}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg shadow-blue-500/20">
                {s.icon}
              </div>
              <div className="text-xs text-blue-400 font-bold tracking-widest mb-2">{s.num}</div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      limit: "Hasta 30 embarques/mes",
      features: [
        "Doc Capture (OCR + extracción AI)",
        "Pre-Cross Validator",
        "Doc Vault",
        "Soporte por email",
      ],
      featured: false,
    },
    {
      name: "Growth",
      price: "$249",
      limit: "Hasta 150 embarques/mes",
      features: [
        "Todo Starter",
        "Doc Generator",
        "HS Code Advisor",
        "Cost Estimator",
        "Soporte prioritario",
      ],
      featured: true,
    },
    {
      name: "Pro",
      price: "$499",
      limit: "Ilimitado + API",
      features: [
        "Todo Growth",
        "API acceso completo",
        "Integración WhatsApp",
        "Multi-usuario",
        "Onboarding dedicado",
      ],
      featured: false,
    },
  ];

  return (
    <section id="precios" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Precios</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Planes simples</h2>
          <p className="text-slate-400 text-lg">
            Sin contratos anuales. Cancela cuando quieras.{" "}
            <span className="text-green-400 font-semibold">30 días gratis para piloto.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 ${
                p.featured
                  ? "bg-gradient-to-b from-blue-600/20 to-cyan-600/10 border-2 border-blue-500"
                  : "bg-white/[0.03] border border-white/[0.08]"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider whitespace-nowrap">
                  MÁS POPULAR
                </div>
              )}
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">{p.name}</div>
              <div className="text-5xl font-extrabold mb-1">
                {p.price}
                <span className="text-slate-500 text-base font-normal"> USD/mes</span>
              </div>
              <div className="text-slate-500 text-sm mb-8">{p.limit}</div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-blue-400 font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                  p.featured
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                    : "border border-white/10 hover:border-white/30 hover:bg-white/5"
                }`}
              >
                {p.featured ? "Empezar ahora" : "Solicitar demo"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA / Contact ─────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contacto" className="py-24 bg-[#0d1530] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="text-5xl mb-6">🚛</div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          ¿Listo para cruzar{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            sin fricciones?
          </span>
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          Piloto gratuito 30 días. Sin tarjeta de crédito. Setup en 15 minutos.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const email = (form.elements.namedItem("email") as HTMLInputElement).value;
            const company = (form.elements.namedItem("company") as HTMLInputElement).value;
            window.location.href = `mailto:hello@cargofi.io?subject=Demo request - ${company}&body=Email: ${email}%0AEmpresa: ${company}`;
          }}
          className="flex flex-col gap-4 max-w-md mx-auto"
        >
          <input
            name="company"
            type="text"
            placeholder="Nombre de tu empresa"
            required
            className="px-5 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <input
            name="email"
            type="email"
            placeholder="Tu correo de trabajo"
            required
            className="px-5 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 font-bold text-base transition-all shadow-lg shadow-blue-500/20"
          >
            Solicitar piloto gratis →
          </button>
        </form>

        <p className="text-slate-600 text-sm mt-8">
          También puedes escribirnos directo a{" "}
          <a href="mailto:hello@cargofi.io" className="text-blue-400 hover:underline">
            hello@cargofi.io
          </a>
        </p>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0f1e] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <div className="font-bold text-slate-400">
          Cargo<span className="text-blue-500">Fi</span>
        </div>
        <div>© {new Date().getFullYear()} CargoFi · cargofi.io</div>
        <div className="flex gap-6">
          <a href="mailto:hello@cargofi.io" className="hover:text-slate-400 transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
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
