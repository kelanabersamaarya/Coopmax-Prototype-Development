import * as React from "react";
import { createPortal } from "react-dom";
import { Copy, FileUp, Plus, Save, Search, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type CollateralRow = {
  id: number;
  name: string;
  nominal: string;
  percentage: string;
  claimedNominal: string;
  description: string;
};

type SavingsRow = {
  id: number;
  name: string;
  nominal: string;
  description: string;
};

const inputClass = "h-9 w-full rounded-[5px] border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-offset-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500";

function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-[#06255a]">{title} <span className="font-normal">Daftar</span></h2>
      <Button type="button" onClick={onAdd} className="h-8 rounded-[5px] bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700">
        <Plus className="mr-1 h-4 w-4" />Tambah
      </Button>
    </div>
  );
}

function TotalRow({ value }: { value: string }) {
  return <div className="flex justify-end border-t border-slate-200 pt-4 text-base text-[#06255a]"><span className="mr-2 font-medium">Total:</span><span className="min-w-[180px] bg-slate-50 px-2 text-right">{value}</span></div>;
}

export default function LoanCollateralTab({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
  const [collaterals, setCollaterals] = React.useState<CollateralRow[]>([]);
  const [savings, setSavings] = React.useState<SavingsRow[]>([]);
  const [deposits, setDeposits] = React.useState<SavingsRow[]>([]);
  const [useSavings, setUseSavings] = React.useState(false);
  const [useDeposits, setUseDeposits] = React.useState(false);
  const [attributeModalRow, setAttributeModalRow] = React.useState<number | null>(null);
  const [attribute, setAttribute] = React.useState("");
  const [activeAttributeTab, setActiveAttributeTab] = React.useState<"attribute" | "document">("attribute");
  const [attributeValues, setAttributeValues] = React.useState<Record<string, string>>({});
  const [documents, setDocuments] = React.useState<Record<string, File[]>>({});

  function addCollateral() {
    setCollaterals((rows) => [...rows, { id: Date.now(), name: "", nominal: "0,00", percentage: "0", claimedNominal: "0,00", description: "" }]);
  }

  function duplicateCollateral(row: CollateralRow) {
    setCollaterals((rows) => [...rows, { ...row, id: Date.now() }]);
  }

  function addSavings(setRows: React.Dispatch<React.SetStateAction<SavingsRow[]>>) {
    setRows((rows) => [...rows, { id: Date.now(), name: "", nominal: "0,00", description: "" }]);
  }

  return (
    <div className="rounded-[20px] bg-white p-6 text-[#06255a] md:p-12">
      <section>
        <SectionHeader title="Agunan" onAdd={addCollateral} />
        <div className="mt-8 grid w-full grid-cols-1 gap-2 border-b border-slate-300 px-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-[#7184a5] sm:grid-cols-[minmax(180px,1fr)_minmax(130px,1fr)_minmax(130px,1fr)_minmax(160px,1fr)] sm:gap-4 sm:px-1 lg:w-[calc(100%-19rem)]">
          <span>Agunan</span><span>Nominal</span><span>Pengakuan %</span><span>Nominal Pengakuan</span>
        </div>
        <div className="space-y-2 py-2">
          {collaterals.map((row) => (
            <div key={row.id} className="border-b border-slate-300 pb-1">
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-[minmax(180px,1fr)_minmax(130px,1fr)_minmax(130px,1fr)_minmax(160px,1fr)] sm:gap-1 lg:w-[calc(100%-19rem)]">
                <div className="relative">
                  {row.name && <button type="button" onClick={() => setCollaterals((items) => items.map((item) => item.id === row.id ? { ...item, name: "" } : item))} aria-label="Hapus pilihan agunan" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg font-bold leading-none text-red-600 hover:text-red-700">×</button>}
                  <select className={`${inputClass} appearance-none bg-[linear-gradient(45deg,transparent_50%,#94a3b8_50%),linear-gradient(135deg,#94a3b8_50%,transparent_50%)] bg-[length:5px_5px,5px_5px] bg-[position:calc(100%-14px)_15px,calc(100%-9px)_15px] bg-no-repeat pr-8 ${row.name ? "pl-12 text-[#49698f]" : "text-slate-500"}`} value={row.name} onChange={(e) => setCollaterals((items) => items.map((item) => item.id === row.id ? { ...item, name: e.target.value } : item))}>
                    <option value="">Pilih Agunan</option>
                    <option value="Sepeda Motor">Sepeda Motor</option>
                    <option value="Deposito">Deposito</option>
                    <option value="(SHM) Sertifikat Hak Milik / Tanah dan Bangunan">(SHM) Sertifikat Hak Milik / Tanah dan Bangunan</option>
                    <option value="Mobil">Mobil</option>
                    <option value="Tabungan">Tabungan</option>
                  </select>
                </div>
                <input className={inputClass} value={row.nominal} onChange={(e) => setCollaterals((items) => items.map((item) => item.id === row.id ? { ...item, nominal: e.target.value } : item))} />
                <input className={inputClass} value={row.percentage} onChange={(e) => setCollaterals((items) => items.map((item) => item.id === row.id ? { ...item, percentage: e.target.value } : item))} />
                <input className={inputClass} value={row.claimedNominal} onChange={(e) => setCollaterals((items) => items.map((item) => item.id === row.id ? { ...item, claimedNominal: e.target.value } : item))} />
              </div>
              <div className="mt-1 flex flex-col gap-1 sm:flex-row">
                <input className={`${inputClass} sm:flex-1`} value={row.description} onChange={(e) => setCollaterals((items) => items.map((item) => item.id === row.id ? { ...item, description: e.target.value } : item))} placeholder="Masukkan keterangan agunan" />
                <Button type="button" onClick={() => duplicateCollateral(row)} aria-label="Salin agunan" className="h-8 rounded-none bg-slate-500 px-3 text-white hover:bg-slate-600"><Copy className="h-4 w-4" /></Button>
                <Button type="button" onClick={() => { setAttributeModalRow(row.id); setAttribute(row.name.includes("SHM") ? "SHM" : row.name); setActiveAttributeTab("attribute"); }} aria-label="Atribut agunan" className="h-8 rounded-[5px] bg-blue-600 px-5 text-xs font-semibold text-white hover:bg-blue-700"><Search className="mr-1 h-4 w-4" />Atribut Agunan</Button>
                <Button type="button" onClick={() => setCollaterals((items) => items.filter((item) => item.id !== row.id))} className="h-8 rounded-[5px] bg-rose-600 px-5 text-xs font-semibold text-white hover:bg-rose-700"><Trash2 className="mr-1 h-4 w-4" />Hapus Agunan</Button>
              </div>
            </div>
          ))}
        </div>
        <TotalRow value="0,00" />
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-8"><h2 className="text-xl font-semibold tracking-tight text-[#06255a]">Tabungan <span className="font-normal">Daftar</span></h2><label className="flex items-center gap-3 text-sm text-[#06255a]"><Switch checked={useSavings} onCheckedChange={setUseSavings} />Rekening Anggota/Nasabah Lain</label></div><Button type="button" onClick={() => addSavings(setSavings)} className="h-8 rounded-[5px] bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"><Plus className="mr-1 h-4 w-4" />Tambah</Button></div>
        <div className="mt-8 grid grid-cols-[minmax(220px,1fr)_minmax(150px,1fr)_minmax(180px,1fr)] gap-4 border-b border-slate-300 px-4 pb-2 text-[11px] font-semibold uppercase tracking-wide text-[#7184a5]"><span>Tabungan</span><span>Nominal</span><span>Keterangan</span></div>
        <div className="space-y-3 px-4 py-3">{savings.map((row) => <div key={row.id} className="grid grid-cols-3 gap-4"><input className={inputClass} value={row.name} onChange={(e) => setSavings((items) => items.map((item) => item.id === row.id ? { ...item, name: e.target.value } : item))} placeholder="Rekening tabungan" /><input className={inputClass} value={row.nominal} onChange={(e) => setSavings((items) => items.map((item) => item.id === row.id ? { ...item, nominal: e.target.value } : item))} /><input className={inputClass} value={row.description} onChange={(e) => setSavings((items) => items.map((item) => item.id === row.id ? { ...item, description: e.target.value } : item))} /></div>)}</div>
        <TotalRow value="0,00" />
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-8"><h2 className="text-xl font-semibold tracking-tight text-[#06255a]">Deposit <span className="font-normal">Daftar</span></h2><label className="flex items-center gap-3 text-sm text-[#06255a]"><Switch checked={useDeposits} onCheckedChange={setUseDeposits} />Rekening Anggota/Nasabah Lain</label></div><Button type="button" onClick={() => addSavings(setDeposits)} className="h-8 rounded-[5px] bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"><Plus className="mr-1 h-4 w-4" />Tambah</Button></div>
        <div className="mt-8 grid grid-cols-[minmax(220px,1fr)_minmax(150px,1fr)_minmax(180px,1fr)] gap-4 border-b border-slate-300 px-4 pb-2 text-[11px] font-semibold uppercase tracking-wide text-[#7184a5]"><span>Deposito</span><span>Nominal</span><span>Keterangan</span></div>
        <div className="space-y-3 px-4 py-3">{deposits.map((row) => <div key={row.id} className="grid grid-cols-3 gap-4"><input className={inputClass} value={row.name} onChange={(e) => setDeposits((items) => items.map((item) => item.id === row.id ? { ...item, name: e.target.value } : item))} placeholder="Rekening deposito" /><input className={inputClass} value={row.nominal} onChange={(e) => setDeposits((items) => items.map((item) => item.id === row.id ? { ...item, nominal: e.target.value } : item))} /><input className={inputClass} value={row.description} onChange={(e) => setDeposits((items) => items.map((item) => item.id === row.id ? { ...item, description: e.target.value } : item))} /></div>)}</div>
        <TotalRow value="0,00" />
      </section>

      <div className="mt-8 flex justify-end gap-2"><Button type="button" onClick={onSave} className="h-10 rounded-[7px] bg-green-600 px-4 text-sm font-semibold text-white hover:bg-green-700"><Save className="mr-1 h-4 w-4" />Simpan</Button><Button type="button" onClick={onCancel} className="h-10 rounded-[7px] bg-slate-500 px-4 text-sm font-semibold text-white hover:bg-slate-600"><X className="mr-1 h-4 w-4" />Batal</Button></div>

      {attributeModalRow !== null && createPortal(<div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center overflow-y-auto bg-slate-950/75 p-2" role="dialog" aria-modal="true" aria-labelledby="attribute-modal-title">
        <div className="max-h-[75vh] w-full max-w-[825px] overflow-y-auto rounded-2xl bg-white text-[#25334a] shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4"><h2 id="attribute-modal-title" className="text-xl font-bold">Atribut Agunan</h2><button type="button" onClick={() => setAttributeModalRow(null)} aria-label="Tutup modal" className="text-2xl font-bold text-slate-500 hover:text-slate-800">×</button></div>
          <div className="grid gap-3 border-b border-slate-200 px-6 py-6 md:grid-cols-[120px_1fr] md:items-center">
            <label htmlFor="collateral-attribute" className="text-xs text-[#25334a]">Attribute</label>
            <div className="relative">
              {attribute && <button type="button" onClick={() => setAttribute("")} aria-label="Hapus pilihan atribut" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm font-bold text-red-600 hover:text-red-700">×</button>}
              <select id="collateral-attribute" value={attribute} onChange={(e) => setAttribute(e.target.value)} className={`h-8 w-full rounded-md border border-[#c6d2e4] bg-white px-3 pr-8 text-sm text-[#7b8da8] outline-none focus:ring-2 focus:ring-blue-500 ${attribute ? "pl-8 text-[#49698f]" : ""}`}><option value="">Pilih Attributes</option><option value="Sepeda Motor">Sepeda Motor</option><option value="Mobil">Mobil</option><option value="SHM">SHM ( Sertifikat Hak Milik / Tanah dan Bangunan )</option><option value="Deposito">Deposito</option><option value="Tabungan">Tabungan</option></select>
            </div>
            {attribute && <>
              <div className="col-span-full mt-3 flex items-center gap-2"><button type="button" onClick={() => setActiveAttributeTab("attribute")} className={`rounded-full px-5 py-2 text-xs font-semibold transition-colors ${activeAttributeTab === "attribute" ? "bg-[#7c3aed] text-white" : "bg-transparent text-[#29446a] hover:bg-[#ede9fe]"}`}>Atribut Agunan</button><button type="button" onClick={() => setActiveAttributeTab("document")} className={`rounded-full px-5 py-2 text-xs font-semibold transition-colors ${activeAttributeTab === "document" ? "bg-[#7c3aed] text-white" : "bg-transparent text-[#29446a] hover:bg-[#ede9fe]"}`}>Dokumen Agunan</button></div>
              {activeAttributeTab === "attribute" && <div className="col-span-full grid gap-3 md:grid-cols-[120px_1fr] md:items-center">
              {(attribute === "Sepeda Motor" || attribute === "Mobil") && [["Nama", "name"], ["Alamat", "address"], ["Merek", "brand"], ["Tahun Pembuatan", "year"], ["No. Rangka", "chassisNumber"], ["No. Mesin", "engineNumber"], ["No. BPKB", "bpkbNumber"], ["No. Plat", "plateNumber"]].map(([label, key]) => <React.Fragment key={key}><label htmlFor={`attribute-${key}`} className="text-xs text-[#25334a]">{label}</label><input id={`attribute-${key}`} className="h-8 w-full rounded-md border border-[#c6d2e4] bg-white px-3 text-sm text-[#49698f] outline-none focus:ring-2 focus:ring-blue-500" value={attributeValues[key] || ""} onChange={(e) => setAttributeValues((current) => ({ ...current, [key]: e.target.value }))} /></React.Fragment>)}
              {attribute === "SHM" && [["Nama", "name"], ["Alamat", "address"], ["No. SHM", "shmNumber"], ["Surat Ukur", "surveyLetter"], ["Luas", "area"], ["NIB", "nib"]].map(([label, key]) => <React.Fragment key={key}><label htmlFor={`attribute-${key}`} className="text-xs text-[#25334a]">{label}</label><input id={`attribute-${key}`} className="h-8 w-full rounded-md border border-[#c6d2e4] bg-white px-3 text-sm text-[#49698f] outline-none focus:ring-2 focus:ring-blue-500" value={attributeValues[key] || ""} onChange={(e) => setAttributeValues((current) => ({ ...current, [key]: e.target.value }))} /></React.Fragment>)}
              {(attribute === "Deposito" || attribute === "Tabungan") && [["Nama", "name"], ["Alamat", "address"], [attribute === "Deposito" ? "No. Rekening Deposito" : "No. Rekening Tabungan", "accountNumber"], [attribute === "Deposito" ? "Nominal Deposito" : "Nominal Tabungan", "nominal"]].map(([label, key]) => <React.Fragment key={key}><label htmlFor={`attribute-${key}`} className="text-xs text-[#25334a]">{label}</label><input id={`attribute-${key}`} className="h-8 w-full rounded-md border border-[#c6d2e4] bg-white px-3 text-sm text-[#49698f] outline-none focus:ring-2 focus:ring-blue-500" value={attributeValues[key] || ""} onChange={(e) => setAttributeValues((current) => ({ ...current, [key]: e.target.value }))} /></React.Fragment>)}
              </div>}
              {activeAttributeTab === "document" && <div className="col-span-full mt-4 grid gap-4 md:grid-cols-[120px_1fr] md:items-center">
                {(attribute === "Sepeda Motor" || attribute === "Mobil") && <div className="col-span-full">
                  <div className="space-y-4">{["BPKB", "STNK", "Foto agunan"].map((documentName) => { const files = documents[documentName] || []; return <div key={documentName} className="rounded-xl border border-[#cbd8eb] p-4"><p className="mb-3 text-sm font-bold text-[#111827]">{documentName}</p><div className="rounded-lg border border-dashed border-[#b8c9e2] p-4">{files.length > 0 ? <div className="flex flex-col items-center gap-3 rounded-md bg-slate-50 p-4"><div className="grid w-full gap-3 sm:grid-cols-2">{files.map((file, index) => <div key={`${file.name}-${index}`} className="flex flex-col items-center gap-2 rounded-md bg-white p-3">{file.type.startsWith("image/") ? <img src={URL.createObjectURL(file)} alt={`Preview ${documentName} ${index + 1}`} className="max-h-48 max-w-full rounded-md object-contain" /> : <div className="flex h-32 w-full items-center justify-center text-sm text-slate-500"><FileUp className="mr-2 h-6 w-6" />Preview PDF tersedia</div>}<div className="flex w-full items-center justify-between gap-2"><span className="max-w-[60%] truncate text-xs text-slate-500">{file.name}</span><button type="button" onClick={() => setDocuments((current) => ({ ...current, [documentName]: files.filter((_, fileIndex) => fileIndex !== index) }))} aria-label={`Hapus ${file.name}`} className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700"><Trash2 className="h-3 w-3" />Hapus</button></div></div>)}</div><label htmlFor={`document-${documentName}`} className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-[#3267f5] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2456df]"><Upload className="h-3.5 w-3.5" />Tambah File<input id={`document-${documentName}`} type="file" multiple accept="image/*,.pdf" onChange={(e) => setDocuments((current) => ({ ...current, [documentName]: [...files, ...Array.from(e.target.files || [])] }))} className="sr-only" /></label></div> : <div className="flex min-h-[120px] flex-col items-center justify-center text-center"><FileUp className="mb-2 h-8 w-8 text-[#1f2937]" /><p className="mb-3 text-xs text-slate-500">Unggah file {documentName}</p><label htmlFor={`document-${documentName}`} className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-[#3267f5] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2456df]"><Upload className="h-3.5 w-3.5" />Unggah File<input id={`document-${documentName}`} type="file" multiple accept="image/*,.pdf" onChange={(e) => setDocuments((current) => ({ ...current, [documentName]: Array.from(e.target.files || []) }))} className="sr-only" /></label></div>}</div></div> })}</div>
                </div>}
                {attribute !== "Sepeda Motor" && attribute !== "Mobil" && <div className="rounded-md border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">Belum ada dokumen agunan.</div>}
              </div>}
            </>}
          </div>
          <div className="sticky bottom-0 z-10 flex justify-end border-t border-slate-200 bg-white px-6 py-4"><Button type="button" onClick={() => setAttributeModalRow(null)} className="h-8 rounded-md bg-[#8192ad] px-4 text-xs font-semibold text-white hover:bg-[#6d7e99]"><X className="mr-1 h-4 w-4" />Tutup</Button></div>
        </div>
      </div>, document.body)}
    </div>
  );
}
