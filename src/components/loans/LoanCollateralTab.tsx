import * as React from "react";
import { CheckSquare, Copy, Eye, FileText, FileUp, Plus, Search, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { OperationalConfirmDialog } from "@/components/OperationalConfirmDialog";
import { OperationalSuccessDialog } from "@/components/OperationalSuccessDialog";
import "@/styles/collateral-attribute-select.css";

type CollateralRow = { id: number; name: string; nominal: string; percentage: string; claimedNominal: string; description: string };
type FileItem = { file: File; documentName: string };
type DeleteItem = { documentName: string; index: number; fileName: string };

const inputClass = "h-9 w-full rounded-[5px] border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-500";
const documentAttributes = ["Sepeda Motor", "Mobil", "SHM", "Deposito"];

export default function LoanCollateralTab({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
  const [collaterals, setCollaterals] = React.useState<CollateralRow[]>([]);
  const [attributeModalRow, setAttributeModalRow] = React.useState<number | null>(null);
  const [attribute, setAttribute] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"attribute" | "document">("attribute");
  const [attributeValues, setAttributeValues] = React.useState<Record<string, string>>({});
  const [documents, setDocuments] = React.useState<Record<string, File[]>>({});
  const [previewFile, setPreviewFile] = React.useState<FileItem | null>(null);
  const [deleteFile, setDeleteFile] = React.useState<DeleteItem | null>(null);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [useSavings, setUseSavings] = React.useState(false);
  const [useDeposits, setUseDeposits] = React.useState(false);

  const documentNames = attribute === "SHM" ? ["Sertifikat SHM", "Foto agunan"] : attribute === "Deposito" ? ["Bilyet Deposito"] : ["BPKB", "STNK", "Foto agunan"];
  const fields = attribute === "SHM"
    ? [["Nama", "name"], ["Alamat", "address"], ["No. SHM", "shmNumber"], ["Surat Ukur", "surveyLetter"], ["Luas", "area"], ["NIB", "nib"]]
    : attribute === "Deposito"
      ? [["Nama", "name"], ["Alamat", "address"], ["No. Rekening Deposito", "depositAccountNumber"], ["Nominal Deposito", "depositAmount"]]
      : attribute === "Tabungan"
        ? [["Nama", "name"], ["Alamat", "address"], ["No. Rekening Tabungan", "savingsAccountNumber"], ["Nominal Tabungan", "savingsAmount"]]
        : [["Nama", "name"], ["Alamat", "address"], ["Merek", "brand"], ["Tahun Pembuatan", "year"], ["No. Rangka", "chassisNumber"], ["No. Mesin", "engineNumber"], ["No. BPKB", "bpkbNumber"], ["No. Plat", "plateNumber"]];

  const resetModal = () => {
    setAttributeModalRow(null);
    setAttribute("");
    setActiveTab("attribute");
    setAttributeValues({});
    setDocuments({});
    setPreviewFile(null);
  };

  const openPreview = (file: File, documentName: string) => {
    const url = URL.createObjectURL(file);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (opened) window.setTimeout(() => URL.revokeObjectURL(url), 60000);
  };

  const addCollateral = () => setCollaterals((rows) => [...rows, { id: Date.now(), name: "", nominal: "0,00", percentage: "0", claimedNominal: "0,00", description: "" }]);

  return <div className="rounded-[20px] bg-white p-6 text-[#06255a] md:p-12">
    <section>
      <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Agunan <span className="font-normal">Daftar</span></h2><Button type="button" onClick={addCollateral} className="h-8 rounded-[5px] bg-blue-600 px-4 text-xs"><Plus className="mr-1 h-4 w-4" />Tambah</Button></div>
      <div className="mt-8 space-y-2">{collaterals.map((row) => <div key={row.id} className="border-b border-slate-300 pb-2"><div className="grid gap-2 sm:grid-cols-4"><select className={inputClass} value={row.name} onChange={(e) => setCollaterals((rows) => rows.map((item) => item.id === row.id ? { ...item, name: e.target.value } : item))}><option value="">Pilih Agunan</option><option>Sepeda Motor</option><option>Deposito</option><option>Mobil</option><option>Tabungan</option><option value="(SHM) Sertifikat Hak Milik / Tanah dan Bangunan">(SHM) Sertifikat Hak Milik / Tanah dan Bangunan</option></select><input className={inputClass} value={row.nominal} onChange={(e) => setCollaterals((rows) => rows.map((item) => item.id === row.id ? { ...item, nominal: e.target.value } : item))} /><input className={inputClass} value={row.percentage} onChange={(e) => setCollaterals((rows) => rows.map((item) => item.id === row.id ? { ...item, percentage: e.target.value } : item))} /><input className={inputClass} value={row.claimedNominal} onChange={(e) => setCollaterals((rows) => rows.map((item) => item.id === row.id ? { ...item, claimedNominal: e.target.value } : item))} /></div><div className="mt-2 flex gap-2"><input className={`${inputClass} flex-1`} placeholder="Masukkan keterangan agunan" value={row.description} onChange={(e) => setCollaterals((rows) => rows.map((item) => item.id === row.id ? { ...item, description: e.target.value } : item))} /><Button type="button" onClick={() => { setAttributeModalRow(row.id); setAttribute(row.name.includes("SHM") ? "SHM" : row.name); setActiveTab("attribute"); }} className="h-9 rounded-[5px] bg-blue-600 px-4 text-xs"><Search className="mr-1 h-4 w-4" />Atribut Agunan</Button><Button type="button" onClick={() => setCollaterals((rows) => rows.filter((item) => item.id !== row.id))} className="h-9 rounded-[5px] bg-rose-600 px-4 text-xs"><Trash2 className="mr-1 h-4 w-4" />Hapus</Button></div></div>)}</div>
    </section>
    <section className="mt-12 flex flex-wrap gap-6"><label className="flex items-center gap-2 text-sm"><Switch checked={useSavings} onCheckedChange={setUseSavings} />Rekening Anggota/Nasabah Lain</label><label className="flex items-center gap-2 text-sm"><Switch checked={useDeposits} onCheckedChange={setUseDeposits} />Rekening Deposito</label></section>
    <div className="mt-8 flex justify-end gap-2"><Button type="button" onClick={onCancel} className="rounded-[6px] bg-[#7987B6] text-white"><X className="mr-1 h-4 w-4" />Batalkan</Button><Button type="button" onClick={onSave} className="rounded-[6px] bg-[#3BB001] text-white"><CheckSquare className="mr-1 h-4 w-4" />Simpan</Button></div>

    {attributeModalRow !== null && <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-2"><div className="flex max-h-[90vh] w-full max-w-[825px] flex-col overflow-hidden rounded-2xl bg-white text-[#25334a] shadow-2xl"><div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4"><h2 className="text-[18px] font-bold">Atribut Agunan</h2><button type="button" onClick={resetModal} className="text-2xl font-bold">×</button></div><div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
      {documentAttributes.includes(attribute) && <div className="mb-6 flex gap-2 border-b border-slate-200 pb-3"><button type="button" onClick={() => setActiveTab("attribute")} className={`rounded-full px-5 py-2 text-xs font-semibold ${activeTab === "attribute" ? "bg-[#7c3aed] text-white" : "text-[#29446a] hover:bg-violet-50"}`}>Atribut Agunan</button><button type="button" onClick={() => setActiveTab("document")} className={`rounded-full px-5 py-2 text-xs font-semibold ${activeTab === "document" ? "bg-[#7c3aed] text-white" : "text-[#29446a] hover:bg-violet-50"}`}>Dokumen Agunan</button></div>}
      {activeTab === "attribute" && <div className="grid gap-3 md:grid-cols-[150px_1fr] md:items-center"><label className="text-xs">Attribute</label><select id="collateral-attribute" value={attribute} onChange={(e) => { setAttribute(e.target.value); setActiveTab("attribute"); }} className="h-9 w-full rounded-md border border-[#c6d2e4] px-3 text-sm"><option value="">Pilih Attributes</option><option value="Sepeda Motor">Sepeda Motor</option><option value="Mobil">Mobil</option><option value="SHM">SHM ( Sertifikat Hak Milik / Tanah dan Bangunan )</option><option value="Deposito">Deposito</option><option value="Tabungan">Tabungan</option></select>{attribute && fields.map(([label, key]) => <React.Fragment key={key}><label className="text-xs">{label}</label><input className="h-9 w-full rounded-md border border-[#c6d2e4] px-3 text-sm" value={attributeValues[key] || ""} onChange={(e) => setAttributeValues((values) => ({ ...values, [key]: e.target.value }))} /></React.Fragment>)}</div>}
      {activeTab === "document" && <div className="space-y-4">{documentNames.map((documentName) => { const files = documents[documentName] || []; return <div key={documentName} className="rounded-xl border border-[#cbd8eb] p-4"><p className="mb-3 text-sm font-bold">{documentName}</p><div className="rounded-lg border border-dashed border-[#b8c9e2] p-5 text-center"><FileUp className="mx-auto mb-2 h-8 w-8" /><p className="mb-3 text-xs text-slate-400">JPG, JPEG, PNG atau PDF. Maksimal 1 MB.</p><label htmlFor={`document-${documentName}`} className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-[#3267f5] px-3 py-2 text-xs font-semibold text-white"><Upload className="h-3.5 w-3.5" />Unggah File<input id={`document-${documentName}`} type="file" multiple accept="image/*,.pdf" onChange={(e) => setDocuments((current) => ({ ...current, [documentName]: [...files, ...Array.from(e.target.files || [])] }))} className="sr-only" /></label></div>{files.map((file, index) => <div key={`${file.name}-${index}`} className="mt-3 flex items-center gap-3 rounded-lg border border-[#dbe4f1] p-3"><FileText className="h-7 w-7 text-blue-600" /><span className="min-w-0 flex-1 truncate text-xs">{file.name}</span><button type="button" onClick={() => openPreview(file, documentName)} className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white"><Eye className="h-3 w-3" />Pratinjau</button><button type="button" onClick={() => setDeleteFile({ documentName, index, fileName: file.name })} className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white"><Trash2 className="h-3 w-3" />Hapus</button></div>)}</div>; })}</div>}
    </div><div className="flex shrink-0 justify-end gap-2 border-t border-slate-200 px-6 py-4"><Button type="button" onClick={resetModal} className="h-8 rounded-[5px] bg-[#7987B6] text-xs text-white"><X className="mr-1 h-4 w-4" />Batalkan</Button><Button type="button" onClick={() => setConfirmOpen(true)} className="h-8 rounded-[5px] bg-[#3BB001] text-xs text-white"><CheckSquare className="mr-1 h-4 w-4" />Simpan</Button></div></div></div>}

    <OperationalConfirmDialog open={deleteFile !== null} onOpenChange={(open) => !open && setDeleteFile(null)} onConfirm={() => { if (!deleteFile) return; setDocuments((current) => ({ ...current, [deleteFile.documentName]: (current[deleteFile.documentName] || []).filter((_, index) => index !== deleteFile.index) })); setDeleteFile(null); setDeleteSuccessOpen(true); }} title="Yakin menghapus file?" />
    <OperationalSuccessDialog open={deleteSuccessOpen} onOpenChange={setDeleteSuccessOpen} onConfirm={() => setDeleteSuccessOpen(false)} title="Berhasil menghapus file" />
    <OperationalConfirmDialog open={confirmOpen} onOpenChange={setConfirmOpen} onConfirm={() => { setConfirmOpen(false); resetModal(); setSuccessOpen(true); }} />
    <OperationalSuccessDialog open={successOpen} onOpenChange={setSuccessOpen} onConfirm={() => setSuccessOpen(false)} />
  </div>;
}
