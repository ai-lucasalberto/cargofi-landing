"use client";

import { useState, useRef } from "react";

const API = "https://cargofi-backend-production.up.railway.app";

// ── Sample documents for "Try with example" ──────────────────────────────────
const SAMPLES: { label: string; icon: string; desc: string; data: Record<string, unknown> }[] = [
  {
    label: "Bill of Lading",
    icon: "📦",
    desc: "Embarque Monterrey → Laredo TX",
    data: {
      doc_type: "bill_of_lading",
      doc_type_label: "Bill of Lading (BOL)",
      filename: "BOL-SAMPLE-2024.pdf",
      confidence: 0.97,
      language: "bilingual",
      warnings: [],
      bol_number: "MTY-2024-00847",
      booking_number: "BK-20240312",
      shipper_name: "Industrias Monterrey S.A. de C.V.",
      shipper_address: "Av. Constitución 1200, Monterrey, N.L. 64000, México",
      consignee_name: "Texas Distributors LLC",
      consignee_address: "1502 E. Saunders St, Laredo, TX 78041, USA",
      notify_party: "Texas Distributors LLC",
      port_of_loading: "Monterrey, N.L.",
      port_of_discharge: "Laredo, TX",
      place_of_delivery: "Dallas, TX",
      cargo_description: "Autopartes metálicas — 240 cajas / Automotive metal parts",
      hs_code: "8708.99",
      quantity: "240",
      weight_kg: "4800",
      volume_cbm: "18.5",
      freight_terms: "Prepaid",
      issue_date: "2024-03-12",
    },
  },
  {
    label: "Carta Porte",
    icon: "🚛",
    desc: "CFDI 4.0 — Tránsito nacional MEX",
    data: {
      doc_type: "carta_porte",
      doc_type_label: "Carta Porte",
      filename: "CARTA-PORTE-SAMPLE.pdf",
      confidence: 0.94,
      language: "es",
      warnings: ["Verificar que el RFC del receptor sea válido en el SAT"],
      folio_fiscal: "A1B2C3D4-E5F6-7890-ABCD-EF1234567890",
      fecha_emision: "2024-03-12T08:30:00",
      rfcEmisor: "TRA860315KT2",
      nombreEmisor: "Transportes Rápidos del Norte S.A. de C.V.",
      rfcReceptor: "IND920801XY3",
      nombreReceptor: "Industrias del Norte S.A. de C.V.",
      total_distance_km: "920",
      unit_type: "Tractocamión",
      unit_plates: "NLE-123-A",
      operator_name: "Juan Carlos Ramírez López",
      operator_license: "RALJ840510H2",
      origin_location: "Monterrey, Nuevo León",
      origin_date: "2024-03-12T09:00:00",
      destination_location: "Ciudad Juárez, Chihuahua",
      estimated_arrival: "2024-03-13T14:00:00",
      merchandise_description: "Autopartes metálicas para exportación",
      weight_kg: "4800",
      quantity: "240",
      hs_code: "8708.99",
      hazmat_flag: false,
    },
  },
  {
    label: "Factura Comercial",
    icon: "🧾",
    desc: "Export Invoice MEX → USA",
    data: {
      doc_type: "commercial_invoice",
      doc_type_label: "Factura Comercial / Commercial Invoice",
      filename: "INVOICE-SAMPLE-2024.pdf",
      confidence: 0.96,
      language: "bilingual",
      warnings: [],
      invoice_number: "INV-2024-00312",
      invoice_date: "2024-03-11",
      seller_name: "Industrias Monterrey S.A. de C.V.",
      seller_address: "Av. Constitución 1200, Monterrey, N.L. 64000, México",
      seller_tax_id: "IMO8603154XZ",
      buyer_name: "Texas Distributors LLC",
      buyer_address: "1502 E. Saunders St, Laredo, TX 78041, USA",
      buyer_tax_id: "TX-87-654321",
      incoterms: "DAP Laredo TX",
      payment_terms: "Net 30",
      currency: "USD",
      country_of_origin: "México",
      country_of_destination: "United States",
      line_items: [
        { description: "Bracket soporte motor — Ref. BS-2240", hs_code: "8708.99", qty: "120", unit_price: "45.00", total: "5400.00" },
        { description: "Tuerca hexagonal acero inox — Ref. TH-0880", hs_code: "7318.16", qty: "5000", unit_price: "0.48", total: "2400.00" },
      ],
      subtotal: "7800.00",
      taxes: "0.00",
      total_amount: "7800.00",
    },
  },
];

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

const SKIP_FIELDS = new Set(["doc_type","doc_type_label","filename","warnings","confidence","language","parse_error","raw_text"]);

function formatKey(k: string) {
  return k.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
}

function FieldValue({ value }: { value: unknown }) {
  if (value === null || value === undefined) return <span style={{color:"#475569"}}>—</span>;
  if (Array.isArray(value)) {
    if (!value.length) return <span style={{color:"#475569"}}>—</span>;
    if (typeof value[0]==="object") return (
      <div className="flex flex-col gap-1 mt-1">
        {value.map((item,i)=>(
          <div key={i} className="rounded p-2 text-xs" style={{background:"rgba(255,255,255,0.04)"}}>
            {Object.entries(item as Record<string,unknown>).map(([k,v])=>(
              <div key={k} className="flex gap-2">
                <span style={{color:"#64748b",minWidth:90}}>{formatKey(k)}:</span>
                <span style={{color:"#cbd5e1"}}>{String(v??"—")}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
    return <span style={{color:"#e2e8f0"}}>{value.join(", ")}</span>;
  }
  return <span style={{color:"#e2e8f0"}}>{String(value)}</span>;
}

// Map extracted fields to eManifest fields
function buildManifest(docs: Record<string,unknown>[]): Record<string,string> {
  const merged: Record<string,unknown> = {};
  for (const d of docs) Object.assign(merged, d);

  return {
    shipper_name: String(merged.shipper_name ?? merged.seller_name ?? ""),
    shipper_address: String(merged.shipper_address ?? merged.seller_address ?? ""),
    consignee_name: String(merged.consignee_name ?? merged.buyer_name ?? ""),
    consignee_address: String(merged.consignee_address ?? merged.buyer_address ?? ""),
    cargo_description: String(merged.cargo_description ?? merged.goods_description ?? ""),
    hs_code: String(merged.hs_code ?? ""),
    weight_kg: String(merged.weight_kg ?? merged.total_gross_weight_kg ?? ""),
    quantity: String(merged.quantity ?? merged.total_packages ?? ""),
    country_of_origin: String(merged.country_of_origin ?? "MX"),
    bol_number: String(merged.bol_number ?? merged.reference_number ?? ""),
    port_of_entry: "",
    arrival_date: "",
    carrier_name: "",
    truck_plates: String(merged.unit_plates ?? ""),
    driver_name: String(merged.operator_name ?? ""),
    driver_license: String(merged.operator_license ?? ""),
  };
}

type Step = "upload" | "extracted" | "validated" | "manifest";

export default function Demo() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");
  const [extracted, setExtracted] = useState<Record<string,unknown> | null>(null);
  const [validation, setValidation] = useState<Record<string,unknown> | null>(null);
  const [manifest, setManifest] = useState<Record<string,string>>({});
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => { setFile(f); setError(""); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  // STEP 1 → Extract
  const doExtract = async () => {
    if (!file) return;
    setLoading(true); setLoadingLabel("Extrayendo campos con IA..."); setError("");
    const form = new FormData();
    form.append("file", file);
    if (docType) form.append("doc_type_hint", docType);
    try {
      const res = await fetch(`${API}/api/docs/extract`, { method:"POST", body:form });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setExtracted(data);
      setStep("extracted");
    } catch(e: unknown) {
      setError(e instanceof Error ? e.message : "Error de conexión");
    } finally { setLoading(false); }
  };

  // STEP 2 → Validate
  const doValidate = async () => {
    if (!extracted) return;
    setLoading(true); setLoadingLabel("Validando documentos...");
    try {
      const form = new FormData();
      form.append("docs", JSON.stringify([extracted]));
      form.append("operation_type", "import_mex_usa");
      const res = await fetch(`${API}/api/docs/validate`, { method:"POST", body:form });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setValidation(data);
      setStep("validated");
    } catch(e: unknown) {
      setError(e instanceof Error ? e.message : "Error de conexión");
    } finally { setLoading(false); }
  };

  // STEP 3 → Generate Manifest
  const doManifest = () => {
    const m = buildManifest(extracted ? [extracted] : []);
    setManifest(m);
    setStep("manifest");
  };

  const copyManifest = () => {
    const text = Object.entries(manifest)
      .map(([k,v]) => `${formatKey(k)}: ${v || "—"}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStep("upload"); setFile(null); setExtracted(null);
    setValidation(null); setManifest({}); setError("");
  };

  const confidence = extracted?.confidence as number | undefined;
  const warnings = extracted?.warnings as string[] | undefined;
  const mainFields = extracted ? Object.entries(extracted).filter(([k]) => !SKIP_FIELDS.has(k)) : [];

  const score = validation?.score as number | undefined;
  const readyToCross = validation?.ready_to_cross as boolean | undefined;
  const issues = validation?.issues as {severity:string,field:string,message:string}[] | undefined;
  const checklist = validation?.checklist as {item:string,status:string,detail:string|null}[] | undefined;
  const recommendations = validation?.recommendations as string[] | undefined;

  return (
    <div className="min-h-screen" style={{background:"#0a0f1e",color:"#fff"}}>
      {/* Nav */}
      <nav style={{background:"rgba(10,15,30,0.9)",borderBottom:"1px solid rgba(255,255,255,0.06)"}}
        className="sticky top-0 z-50 px-6 h-14 flex items-center justify-between">
        <a href="/" className="text-lg font-bold">Cargo<span style={{color:"#3b82f6"}}>Fi</span></a>
        <div className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{background:"rgba(59,130,246,0.15)",border:"1px solid rgba(59,130,246,0.3)",color:"#93c5fd"}}>
          Demo en vivo
        </div>
      </nav>

      {/* Progress steps */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-2">
        <div className="flex items-center gap-2 mb-8">
          {([
            {id:"upload",label:"1. Subir"},
            {id:"extracted",label:"2. Extraer"},
            {id:"validated",label:"3. Validar"},
            {id:"manifest",label:"4. eManifest"},
          ] as {id:Step,label:string}[]).map((s,i)=>{
            const steps:Step[] = ["upload","extracted","validated","manifest"];
            const currentIdx = steps.indexOf(step);
            const thisIdx = steps.indexOf(s.id);
            const done = thisIdx < currentIdx;
            const active = s.id === step;
            return (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: done ? "#22c55e" : active ? "#3b82f6" : "rgba(255,255,255,0.08)",
                      color: done||active ? "#fff" : "#64748b",
                    }}>
                    {done ? "✓" : i+1}
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap" style={{color:active?"#fff":done?"#4ade80":"#64748b"}}>
                    {s.label}
                  </span>
                </div>
                {i<3 && <div className="flex-1 h-px" style={{background:done?"#22c55e":"rgba(255,255,255,0.08)"}}/>}
              </div>
            );
          })}
        </div>

        {/* ── STEP 1: UPLOAD ── */}
        {step === "upload" && (
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-extrabold mb-2 text-center">Sube tu documento</h1>
            <p className="text-center mb-6" style={{color:"#94a3b8"}}>BOL, Factura, Carta Porte, Pedimento, POD — cualquier formato</p>

            {/* Sample documents */}
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{color:"#64748b"}}>
                — O prueba con un documento de ejemplo —
              </div>
              <div className="grid grid-cols-3 gap-3">
                {SAMPLES.map((s) => (
                  <button key={s.label} onClick={() => { setExtracted(s.data); setStep("extracted"); setError(""); }}
                    className="rounded-xl p-4 text-left transition-all group"
                    style={{background:"rgba(59,130,246,0.06)",border:"1px solid rgba(59,130,246,0.2)"}}>
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <div className="text-sm font-bold text-white">{s.label}</div>
                    <div className="text-xs mt-1" style={{color:"#64748b"}}>{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div onClick={()=>inputRef.current?.click()}
              onDragOver={e=>{e.preventDefault();setDragOver(true)}}
              onDragLeave={()=>setDragOver(false)} onDrop={handleDrop}
              className="rounded-2xl flex flex-col items-center justify-center cursor-pointer mb-5"
              style={{height:200,border:dragOver?"2px solid #3b82f6":"2px dashed rgba(255,255,255,0.12)",
                background:dragOver?"rgba(59,130,246,0.08)":"rgba(255,255,255,0.02)"}}>
              <input ref={inputRef} type="file" accept=".pdf,image/*" className="hidden"
                onChange={e=>{if(e.target.files?.[0]) handleFile(e.target.files[0]);}}/>
              {file ? (
                <div className="text-center px-4">
                  <div className="text-4xl mb-2">📄</div>
                  <div className="font-semibold" style={{color:"#e2e8f0"}}>{file.name}</div>
                  <div className="text-xs mt-1" style={{color:"#64748b"}}>{(file.size/1024).toFixed(0)} KB · clic para cambiar</div>
                </div>
              ) : (
                <div className="text-center px-4">
                  <div className="text-4xl mb-3">☁️</div>
                  <div className="font-semibold" style={{color:"#94a3b8"}}>Arrastra o haz clic para subir</div>
                  <div className="text-xs mt-2" style={{color:"#475569"}}>PDF · JPG · PNG · hasta 20 MB</div>
                </div>
              )}
            </div>

            <select value={docType} onChange={e=>setDocType(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm mb-4 outline-none"
              style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}}>
              {Object.entries(DOC_TYPES).map(([k,v])=>(
                <option key={k} value={k} style={{background:"#0d1530"}}>{v}</option>
              ))}
            </select>

            {error && <div className="mb-3 p-3 rounded-xl text-sm" style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5"}}>❌ {error}</div>}

            <button onClick={doExtract} disabled={!file||loading}
              className="w-full py-4 rounded-xl font-bold text-base text-white transition-all"
              style={{background:!file||loading?"rgba(59,130,246,0.3)":"linear-gradient(90deg,#2563eb,#0891b2)",
                cursor:!file||loading?"not-allowed":"pointer"}}>
              {loading ? `⏳ ${loadingLabel}` : "🤖 Extraer con IA →"}
            </button>
          </div>
        )}

        {/* ── STEP 2: EXTRACTED ── */}
        {step === "extracted" && extracted && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-extrabold">{extracted.doc_type_label as string}</h2>
                <div className="text-sm mt-1" style={{color:"#64748b"}}>{extracted.filename as string}</div>
              </div>
              <div className="flex items-center gap-3">
                {confidence !== undefined && (
                  <div className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{background:confidence>0.7?"rgba(34,197,94,0.15)":"rgba(234,179,8,0.15)",
                      border:`1px solid ${confidence>0.7?"rgba(34,197,94,0.4)":"rgba(234,179,8,0.4)"}`,
                      color:confidence>0.7?"#4ade80":"#facc15"}}>
                    {Math.round(confidence*100)}% confianza
                  </div>
                )}
              </div>
            </div>

            {warnings && warnings.length > 0 && (
              <div className="mb-5 p-4 rounded-xl" style={{background:"rgba(234,179,8,0.08)",border:"1px solid rgba(234,179,8,0.25)"}}>
                <div className="text-sm font-bold mb-2" style={{color:"#facc15"}}>⚠️ Observaciones del documento</div>
                {warnings.map((w,i)=><div key={i} className="text-sm" style={{color:"#fde68a"}}>• {w}</div>)}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-3 mb-6 max-h-96 overflow-y-auto pr-1">
              {mainFields.map(([key,val])=>(
                <div key={key} className="rounded-xl p-4" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
                  <div className="text-xs font-semibold mb-1" style={{color:"#3b82f6"}}>{formatKey(key)}</div>
                  <FieldValue value={val}/>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={reset} className="px-5 py-3 rounded-xl font-semibold text-sm"
                style={{border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8"}}>
                ← Nuevo doc
              </button>
              <button onClick={doValidate} disabled={loading}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white"
                style={{background:loading?"rgba(59,130,246,0.3)":"linear-gradient(90deg,#2563eb,#0891b2)",
                  cursor:loading?"not-allowed":"pointer"}}>
                {loading ? `⏳ ${loadingLabel}` : "🛡️ Validar antes de cruzar →"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: VALIDATED ── */}
        {step === "validated" && validation && (
          <div>
            <div className="flex items-start gap-6 mb-6">
              {/* Score */}
              <div className="rounded-2xl p-6 text-center flex-shrink-0"
                style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",minWidth:160}}>
                <div className="text-5xl font-extrabold mb-1"
                  style={{color:score&&score>=80?"#4ade80":score&&score>=50?"#facc15":"#f87171"}}>
                  {score}
                </div>
                <div className="text-xs" style={{color:"#64748b"}}>/ 100 puntos</div>
                <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold ${readyToCross?"":"opacity-80"}`}
                  style={{background:readyToCross?"rgba(34,197,94,0.2)":"rgba(239,68,68,0.2)",
                    color:readyToCross?"#4ade80":"#f87171"}}>
                  {readyToCross ? "✅ LISTO PARA CRUZAR" : "🚫 REVISAR ANTES DE CRUZAR"}
                </div>
              </div>

              {/* Issues */}
              <div className="flex-1">
                {issues && issues.length > 0 && (
                  <div className="flex flex-col gap-2 mb-4">
                    {issues.map((iss,i)=>(
                      <div key={i} className="rounded-xl p-3 flex gap-3 items-start"
                        style={{background:iss.severity==="critical"?"rgba(239,68,68,0.08)":"rgba(234,179,8,0.08)",
                          border:`1px solid ${iss.severity==="critical"?"rgba(239,68,68,0.25)":"rgba(234,179,8,0.25)"}`}}>
                        <span>{iss.severity==="critical"?"🔴":"⚠️"}</span>
                        <div>
                          <div className="text-sm font-semibold" style={{color:iss.severity==="critical"?"#fca5a5":"#fde68a"}}>{formatKey(iss.field)}</div>
                          <div className="text-xs mt-0.5" style={{color:"#94a3b8"}}>{iss.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {recommendations && recommendations.length > 0 && (
                  <div className="rounded-xl p-4" style={{background:"rgba(59,130,246,0.06)",border:"1px solid rgba(59,130,246,0.2)"}}>
                    <div className="text-xs font-bold mb-2" style={{color:"#60a5fa"}}>💡 Recomendaciones</div>
                    {recommendations.map((r,i)=><div key={i} className="text-sm" style={{color:"#94a3b8"}}>• {r}</div>)}
                  </div>
                )}
              </div>
            </div>

            {/* Checklist */}
            {checklist && checklist.length > 0 && (
              <div className="rounded-2xl p-5 mb-6" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)"}}>
                <div className="text-sm font-bold mb-3" style={{color:"#94a3b8"}}>📋 Checklist de cruce</div>
                <div className="flex flex-col gap-2">
                  {checklist.map((item,i)=>(
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span>{item.status==="ok"?"✅":item.status==="warning"?"⚠️":"❌"}</span>
                      <div>
                        <span style={{color:item.status==="ok"?"#e2e8f0":item.status==="warning"?"#fde68a":"#fca5a5"}}>{item.item}</span>
                        {item.detail && <div className="text-xs mt-0.5" style={{color:"#64748b"}}>{item.detail}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={()=>setStep("extracted")} className="px-5 py-3 rounded-xl font-semibold text-sm"
                style={{border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8"}}>
                ← Volver
              </button>
              <button onClick={doManifest}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white"
                style={{background:"linear-gradient(90deg,#2563eb,#0891b2)"}}>
                📄 Generar eManifest pre-llenado →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: EMANIFEST ── */}
        {step === "manifest" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-extrabold">eManifest pre-llenado</h2>
                <p className="text-sm mt-1" style={{color:"#64748b"}}>Generado desde los documentos extraídos · Listo para compartir con tu agente aduanal</p>
              </div>
              <div className="flex gap-2">
                <button onClick={copyManifest}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                  style={{background:copied?"rgba(34,197,94,0.3)":"rgba(59,130,246,0.2)",border:"1px solid rgba(59,130,246,0.4)"}}>
                  {copied ? "✅ Copiado" : "📋 Copiar"}
                </button>
                <button onClick={reset}
                  className="px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8"}}>
                  Nuevo doc
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Auto-filled from docs */}
              <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)"}}>
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{color:"#3b82f6"}}>
                  ✅ Auto-llenado desde documentos
                </div>
                {(["shipper_name","shipper_address","consignee_name","consignee_address",
                   "cargo_description","hs_code","weight_kg","quantity","country_of_origin","bol_number"] as const).map(k=>(
                  <div key={k} className="mb-3">
                    <label className="block text-xs mb-1 font-semibold" style={{color:"#64748b"}}>{formatKey(k)}</label>
                    <input value={manifest[k]||""} onChange={e=>setManifest(m=>({...m,[k]:e.target.value}))}
                      className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                      style={{background:manifest[k]?"rgba(34,197,94,0.08)":"rgba(255,255,255,0.04)",
                        border:`1px solid ${manifest[k]?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.1)"}`,color:"#fff"}}/>
                  </div>
                ))}
              </div>

              {/* Manual fields */}
              <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)"}}>
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{color:"#f59e0b"}}>
                  ✏️ Completar manualmente
                </div>
                {(["carrier_name","truck_plates","driver_name","driver_license","port_of_entry","arrival_date"] as const).map(k=>(
                  <div key={k} className="mb-3">
                    <label className="block text-xs mb-1 font-semibold" style={{color:"#64748b"}}>{formatKey(k)}</label>
                    <input value={manifest[k]||""} onChange={e=>setManifest(m=>({...m,[k]:e.target.value}))}
                      placeholder={k==="port_of_entry"?"Ej: Laredo TX":k==="arrival_date"?"YYYY-MM-DD":""}
                      className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                      style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}}/>
                  </div>
                ))}

                {/* Summary box */}
                <div className="rounded-xl p-4 mt-4" style={{background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)"}}>
                  <div className="text-xs font-bold mb-2" style={{color:"#60a5fa"}}>🚀 Siguiente paso</div>
                  <p className="text-xs leading-relaxed" style={{color:"#94a3b8"}}>
                    Comparte este resumen con tu agente aduanal o tu equipo de despacho. 
                    Próximamente: envío directo al sistema de tu agente desde CargoFi.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5 flex items-center gap-4 mb-6"
              style={{background:"rgba(34,197,94,0.05)",border:"1px solid rgba(34,197,94,0.2)"}}>
              <div className="text-3xl">⏱️</div>
              <div>
                <div className="font-bold" style={{color:"#4ade80"}}>De 20 minutos a 2 minutos</div>
                <div className="text-sm" style={{color:"#64748b"}}>
                  Tiempo típico llenando el manifiesto manualmente vs con CargoFi
                </div>
              </div>
            </div>

            {/* CTA Post-Demo */}
            <div className="rounded-2xl p-8 text-center"
              style={{background:"linear-gradient(135deg, rgba(37,99,235,0.12), rgba(8,145,178,0.08))", border:"2px solid rgba(59,130,246,0.3)"}}>
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-2xl font-extrabold mb-2 text-white">¿Te convenció?</h3>
              <p className="text-sm mb-6" style={{color:"#94a3b8"}}>
                Esto fue solo el demo. Con tu cuenta tienes vault completo, validación multi-documento y soporte dedicado.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/#contacto"
                  className="px-8 py-3 rounded-xl font-bold text-sm text-white"
                  style={{background:"linear-gradient(90deg,#2563eb,#0891b2)",boxShadow:"0 8px 24px rgba(37,99,235,0.3)"}}>
                  Solicitar piloto gratis — 30 días →
                </a>
                <button onClick={reset}
                  className="px-6 py-3 rounded-xl font-semibold text-sm"
                  style={{border:"1px solid rgba(255,255,255,0.12)",color:"#94a3b8"}}>
                  Probar otro documento
                </button>
              </div>
              <p className="text-xs mt-4" style={{color:"#475569"}}>
                Sin tarjeta de crédito · Setup en 15 minutos
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
