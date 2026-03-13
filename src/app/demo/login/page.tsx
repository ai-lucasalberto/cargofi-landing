"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/demo";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/demo/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, from }),
    });

    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Contraseña incorrecta");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0a0f1e" }}>

      {/* Grid bg */}
      <div className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

      {/* Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 600, height: 300, background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)" }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-extrabold tracking-tight mb-2">
            Cargo<span style={{ color: "#3b82f6" }}>Fi</span>
          </div>
          <div className="text-sm px-4 py-1.5 rounded-full inline-block"
            style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", color: "#93c5fd" }}>
            Demo privado
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8"
          style={{ background: "#0d1530", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h1 className="text-xl font-bold mb-1 text-white">Acceso al demo</h1>
          <p className="text-sm mb-6" style={{ color: "#64748b" }}>
            Ingresa la contraseña para ver la demo en vivo.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#94a3b8" }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                autoFocus
                required
                className="w-full px-4 py-3 rounded-xl text-white outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            {error && (
              <div className="text-sm px-3 py-2 rounded-lg"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all"
              style={{
                background: loading || !password
                  ? "rgba(59,130,246,0.3)"
                  : "linear-gradient(90deg, #2563eb, #0891b2)",
                cursor: loading || !password ? "not-allowed" : "pointer",
                boxShadow: !loading && password ? "0 8px 24px rgba(37,99,235,0.25)" : "none",
              }}>
              {loading ? "Verificando..." : "Entrar →"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#334155" }}>
          ¿No tienes acceso? Escríbenos a{" "}
          <a href="mailto:hello@cargofi.io" style={{ color: "#3b82f6" }}>hello@cargofi.io</a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
