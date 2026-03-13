"use client";

import { useState, useRef } from "react";

const API = "https://cargofi-backend-production.up.railway.app";

const DOC_TYPES: Record<string, string> = {
  "": "🤖 Auto-detectar",
  bill_of_lading: "📦 Bill of Lading (BOL)",
  commercial_invoice: "🧾 Factura Comercial",
  packing_list: "📋 Packing List",
  carta_porte: "🚛 Carta Porte",
  pedimento: "🛃 Pedimento Aduanal",
  certificate_of_origin: "🌎 Certificado de Origen",
  proof_of_delivery: "✅ POD / Comprobante de Entrega",
};

const SKIP_FIELDS = new Set(["doc_type", "doc_type_label", "filename", "warnings", "confidence", "language", "parse_error", "raw_text"]);

function formatKey(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function FieldValue({ value }: { value: unknown }) {
  if (value === null || value === undefined) return <span style={{ color: "#475569" }}>—</span>;
  if (Array.isArray(value)) {
    if (value.length === 0) return <span style={{ color: "#475569" }}>—</span>;
    if (typeof value[0] === "object") {
      return (
        <div className="flex flex-col gap-2 mt-1">
          {value.map((item, i) => (
            <div key={i} className="rounded-lg p-3 text-xs" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {Object.entries(item as Record<string, unknown>).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span style={{ color: "#64748b", minWidth: 100 }}>{formatKey(k)}:</span>
                  <span style={{ color: "#cbd5e1" }}>{String(v ?? "—")}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
    return <span style={{ color: "#e2e8f0" }}>{value.join(", ")}</span>;
  }
  return <span style={{ color: "#e2e8f0" }}>{String(value)}</span>;
}

export default function Demo() {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setResult(null);
    setError("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const extract = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);

    const form = new FormData();
    form.append("file", file);
    if (docType) form.append("doc_type_hint", docType);

    try {
      const res = await fetch(`${API}/api/docs/extract`, { method: "POST", body: form });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const mainFields = result
    ? Object.entries(result).filter(([k]) => !SKIP_FIELDS.has(k))
    : [];

  const confidence = result?.confidence as number | undefined;
  const warnings = result?.warnings as string[] | undefined;

  return (
    <div className="min-h-screen" style={{ background: "#0a0f1e", color: "#fff" }}>
      {/* Nav */}
      <nav style={{ background: "rgba(10,15,30,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="sticky top-0 z-50 px-6 h-14 flex items-center justify-between">
        <a href="/" className="text-lg font-bold">Cargo<span style={{ color: "#3b82f6" }}>Fi</span></a>
        <div className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#93c5fd" }}>
          Demo en vivo
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Extracción de documentos <span style={{ color: "#3b82f6" }}>con IA</span>
          </h1>
          <p style={{ color: "#94a3b8" }} className="text-lg">
            Sube cualquier documento aduanal — la IA extrae todos los campos en segundos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload panel */}
          <div>
            <div className="rounded-2xl p-6 mb-4"
              style={{ background: "#0d1530", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 className="font-bold text-lg mb-4">📤 Subir documento</h2>

              {/* Drop zone */}
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className="rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all mb-4"
                style={{
                  height: 180,
                  border: dragOver ? "2px solid #3b82f6" : "2px dashed rgba(255,255,255,0.12)",
                  background: dragOver ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)",
                }}>
                <input ref={inputRef} type="file" accept=".pdf,image/*" className="hidden"
                  onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
                {file ? (
                  <div className="text-center px-4">
                    <div className="text-3xl mb-2">📄</div>
                    <div className="font-semibold text-sm" style={{ color: "#e2e8f0" }}>{file.name}</div>
                    <div className="text-xs mt-1" style={{ color: "#64748b" }}>
                      {(file.size / 1024).toFixed(0)} KB · clic para cambiar
                    </div>
                  </div>
                ) : (
                  <div className="text-center px-4">
                    <div className="text-4xl mb-3">☁️</div>
                    <div className="font-semibold" style={{ color: "#94a3b8" }}>
                      Arrastra o haz clic para subir
                    </div>
                    <div className="text-xs mt-2" style={{ color: "#475569" }}>PDF · JPG · PNG · hasta 20 MB</div>
                  </div>
                )}
              </div>

              {/* Doc type selector */}
              <label className="block text-sm mb-2" style={{ color: "#94a3b8" }}>Tipo de documento</label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)}
                className="w-full rounded-lg px-4 py-3 text-sm mb-5 outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
                {Object.entries(DOC_TYPES).map(([k, v]) => (
                  <option key={k} value={k} style={{ background: "#0d1530" }}>{v}</option>
                ))}
              </select>

              {/* Extract button */}
              <button onClick={extract} disabled={!file || loading}
                className="w-full py-4 rounded-xl font-bold text-base transition-all"
                style={{
                  background: !file || loading ? "rgba(59,130,246,0.3)" : "linear-gradient(90deg, #2563eb, #0891b2)",
                  color: "#fff",
                  cursor: !file || loading ? "not-allowed" : "pointer",
                  boxShadow: file && !loading ? "0 8px 24px rgba(37,99,235,0.3)" : "none",
                }}>
                {loading ? "⏳ Extrayendo..." : "🤖 Extraer con IA"}
              </button>

              {error && (
                <div className="mt-3 p-3 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>
                  ❌ {error}
                </div>
              )}
            </div>

            {/* Supported docs */}
            <div className="rounded-xl p-5" style={{ background: "#0d1530", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#64748b" }}>Documentos soportados</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(DOC_TYPES).filter(([k]) => k).map(([, v]) => (
                  <div key={v} className="text-xs py-1.5" style={{ color: "#94a3b8" }}>{v}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div>
            {!result && !loading && (
              <div className="rounded-2xl flex flex-col items-center justify-center h-full"
                style={{ background: "#0d1530", border: "1px dashed rgba(255,255,255,0.08)", minHeight: 400 }}>
                <div className="text-5xl mb-4 opacity-30">📋</div>
                <p className="text-center" style={{ color: "#475569" }}>
                  Los campos extraídos<br />aparecerán aquí
                </p>
              </div>
            )}

            {loading && (
              <div className="rounded-2xl flex flex-col items-center justify-center h-full"
                style={{ background: "#0d1530", border: "1px solid rgba(59,130,246,0.2)", minHeight: 400 }}>
                <div className="text-5xl mb-4" style={{ animation: "spin 2s linear infinite" }}>⚙️</div>
                <p className="font-semibold" style={{ color: "#93c5fd" }}>Analizando documento...</p>
                <p className="text-sm mt-2" style={{ color: "#475569" }}>Claude Vision está leyendo el documento</p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {result && !loading && (
              <div className="rounded-2xl p-6" style={{ background: "#0d1530", border: "1px solid rgba(59,130,246,0.2)" }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="font-bold text-lg">{result.doc_type_label as string}</div>
                    <div className="text-xs mt-1" style={{ color: "#64748b" }}>{result.filename as string}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {confidence !== undefined && (
                      <div className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: confidence > 0.8 ? "rgba(34,197,94,0.15)" : "rgba(234,179,8,0.15)",
                          border: `1px solid ${confidence > 0.8 ? "rgba(34,197,94,0.4)" : "rgba(234,179,8,0.4)"}`,
                          color: confidence > 0.8 ? "#4ade80" : "#facc15",
                        }}>
                        {Math.round(confidence * 100)}% confianza
                      </div>
                    )}
                  </div>
                </div>

                {/* Warnings */}
                {warnings && warnings.length > 0 && (
                  <div className="mb-4 p-3 rounded-lg" style={{ background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)" }}>
                    <div className="text-xs font-semibold mb-1" style={{ color: "#facc15" }}>⚠️ Observaciones</div>
                    {warnings.map((w, i) => (
                      <div key={i} className="text-xs" style={{ color: "#fde68a" }}>• {w}</div>
                    ))}
                  </div>
                )}

                {/* Fields */}
                <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: 480 }}>
                  {mainFields.map(([key, val]) => (
                    <div key={key} className="rounded-lg p-3"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-xs mb-1 font-semibold" style={{ color: "#3b82f6" }}>
                        {formatKey(key)}
                      </div>
                      <FieldValue value={val} />
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <button onClick={() => { setFile(null); setResult(null); }}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}>
                    Nuevo documento
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                    style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.3)" }}>
                    Copiar JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
