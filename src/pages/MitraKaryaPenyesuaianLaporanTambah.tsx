import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckSquare, GripVertical, Plus, Trash2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type Column = { id: number; key: string; label: string };
type Sort = { id: number; key: string; direction: string };
type SavedReport = { basis: string; title: string; total: "Tampilkan" | "Tidak"; signature: "Tampilkan" | "Tidak"; main: "Tampilkan" | "Tidak"; columns?: Column[]; sorts?: Sort[] };

const reportKey = "mitra-karya-penyesuaian-laporan";
const fieldOptions = [
  ["no-anggota", "No. Anggota"], ["nama", "Nama Anggota"], ["tanggal-daftar", "Tanggal Daftar"], ["nomor-identitas", "Nomor Identitas"], ["tanggal-lahir", "Tanggal Lahir"], ["jenis-kelamin", "Jenis Kelamin"], ["tempat-lahir", "Tempat Lahir"], ["alamat", "Alamat Anggota"], ["no-handphone", "No. Handphone"], ["kategori", "Kategori"], ["simpanan-pokok", "Simpanan Pokok"], ["simpanan-wajib", "Simpanan Wajib"], ["simpanan-khusus", "Simpanan Khusus"], ["simpanan-penyertaan", "Simpanan Penyertaan"], ["total-simpanan", "Total Simpanan"], ["status", "Status"], ["ketersediaan-file-ktp", "Ketersediaan File KTP"], ["preview-file-ktp", "Pratinjau File KTP"],
] as const;

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-2 md:grid-cols-[280px_minmax(0,1fr)] md:items-center"><label className="text-[13px] text-[#002060]">{label}<span className="text-red-600">*</span></label><div>{children}</div></div>;
}
function ReportSwitch({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return <span className="relative inline-flex h-6 w-[62px]"><Switch checked={checked} onCheckedChange={onChange} className="h-6 w-[62px] rounded-full border-0 bg-[#a59bed] data-[state=checked]:bg-[#5843f5] [&>span]:h-5 [&>span]:w-5 [&>span]:bg-white [&>span]:data-[state=checked]:translate-x-[38px] [&>span]:data-[state=unchecked]:translate-x-0" /><span className={`pointer-events-none absolute inset-y-0 flex items-center text-[10px] font-bold text-white ${checked ? "left-[13px]" : "right-[10px]"}`}>{checked ? "ON" : "OFF"}</span></span>;
}
function Options({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [search, setSearch] = React.useState("");
  const filteredOptions = fieldOptions.filter(([, label]) =>
    label.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <Select
      value={value}
      onValueChange={onChange}
      onOpenChange={(open) => {
        if (!open) setSearch("");
      }}
    >
      <SelectTrigger className="h-8 rounded-[5px] border-slate-300 text-[13px]"><SelectValue /></SelectTrigger>
      <SelectContent className="max-h-[320px] overflow-hidden p-0 [&_[data-highlighted]]:bg-[#2563eb] [&_[data-highlighted]]:text-white [&_[data-state=checked]]:bg-[#2563eb] [&_[data-state=checked]]:pl-2">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white p-2">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
            placeholder=""
            className="h-8 rounded-[4px] border-slate-300 text-[12px] shadow-none focus-visible:ring-0"
            aria-label="Cari field key"
          />
        </div>
        <div className="max-h-[272px] overflow-y-auto px-1 py-1">
          <SelectItem className="focus:bg-[#2563eb] focus:text-white" value="__empty__"><span className="sr-only">Kosongkan Field Key</span>&nbsp;</SelectItem>
          {filteredOptions.map(([key, label]) => <SelectItem key={key} className="focus:bg-[#2563eb] focus:text-white" value={key}>{label}</SelectItem>)}
        </div>
      </SelectContent>
    </Select>
  );
}

export default function MitraKaryaPenyesuaianLaporanTambah() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [basis, setBasis] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [showTotal, setShowTotal] = React.useState(true);
  const [showSignature, setShowSignature] = React.useState(true);
  const [isMain, setIsMain] = React.useState(false);
  const [columns, setColumns] = React.useState<Column[]>([]);
  const [sorts, setSorts] = React.useState<Sort[]>([]);
  const [draggedId, setDraggedId] = React.useState<number | null>(null);
  const nextId = () => Date.now() + Math.random();

  React.useEffect(() => {
    if (!id) return;
    const saved = JSON.parse(localStorage.getItem(reportKey) || "[]") as SavedReport[];
    const report = saved.find((item) => item.title === decodeURIComponent(id));
    if (!report) return;
    setBasis(report.basis === "Laporan Anggota" ? "anggota" : report.basis === "Laporan Rekening Tabungan" ? "tabungan" : report.basis === "Laporan Rekening Deposito" ? "deposito" : report.basis === "Laporan Transaksi Tabungan" ? "transaksi-tabungan" : report.basis === "Laporan Transaksi Pinjaman" ? "transaksi-pinjaman" : "pinjaman");
    setTitle(report.title); setShowTotal(report.total === "Tampilkan"); setShowSignature(report.signature === "Tampilkan"); setIsMain(report.main === "Tampilkan");
    setColumns(report.columns || []); setSorts(report.sorts || []);
  }, [id]);

  const addColumn = () => setColumns((items) => [...items, { id: nextId(), key: "__empty__", label: "" }]);
  const addSort = () => setSorts((items) => [...items, { id: nextId(), key: "__empty__", direction: "az" }]);
  const moveColumn = (targetId: number) => {
    if (draggedId === null || draggedId === targetId) return;
    setColumns((items) => { const next = [...items]; const from = next.findIndex((item) => item.id === draggedId); const to = next.findIndex((item) => item.id === targetId); const [item] = next.splice(from, 1); next.splice(to, 0, item); return next; });
    setDraggedId(null);
  };
  const save = () => {
    const saved = JSON.parse(localStorage.getItem(reportKey) || "[]") as SavedReport[];
    const next: SavedReport = { basis: basis === "tabungan" ? "Laporan Rekening Tabungan" : basis === "deposito" ? "Laporan Rekening Deposito" : basis === "transaksi-tabungan" ? "Laporan Transaksi Tabungan" : basis === "transaksi-pinjaman" ? "Laporan Transaksi Pinjaman" : basis === "anggota" ? "Laporan Anggota" : "Laporan Rekening Pinjaman", title: title || "Tanpa Judul", total: showTotal ? "Tampilkan" : "Tidak", signature: showSignature ? "Tampilkan" : "Tidak", main: isMain ? "Tampilkan" : "Tidak", columns, sorts };
    const deletedTitles = JSON.parse(localStorage.getItem("mitra-karya-penyesuaian-laporan-deleted") || "[]") as string[];
    const updated = isEdit ? saved.map((item) => item.title === decodeURIComponent(id || "") ? next : item) : [...saved, next];
    localStorage.setItem(reportKey, JSON.stringify(updated));
    localStorage.setItem("mitra-karya-penyesuaian-laporan-deleted", JSON.stringify(deletedTitles.filter((item) => item !== next.title)));
    navigate("/mitra-karya/laporan/penyesuaian");
  };

  return <div className="min-h-screen bg-[hsl(var(--app-bg))] px-1 py-7 md:px-4 md:py-8"><h1 className="px-5 text-[22px] font-medium text-[#002060]"><strong>Penyesuaian Laporan</strong> <span className="text-[16px]">{isEdit ? "Ubah" : "Tambah"}</span></h1><Card className="mt-10 rounded-[22px] border-0 bg-white px-6 py-8 shadow-sm md:px-12 md:py-8 [&_svg.lucide-chevron-down]:text-black [&_svg.lucide-chevron-down]:opacity-100"><div className="grid gap-3">
    <FormRow label="Basis Laporan"><Select value={basis || "__empty__"} onValueChange={(value) => setBasis(value === "__empty__" ? "" : value)}><SelectTrigger className="h-8 w-full rounded-[5px] border-slate-300 text-[13px]"><SelectValue /></SelectTrigger><SelectContent className="[&_[data-highlighted]]:bg-[#2563eb] [&_[data-highlighted]]:text-white [&_[data-state=checked]]:bg-[#2563eb] [&_[data-state=checked]]:pl-2 [&_[data-state=checked]>span]:hidden"><SelectItem value="__empty__" className="pl-2">&nbsp;</SelectItem><SelectItem value="tabungan" className="pl-2">Laporan Rekening Tabungan</SelectItem><SelectItem value="deposito" className="pl-2">Laporan Rekening Deposito</SelectItem><SelectItem value="pinjaman" className="pl-2">Laporan Rekening Pinjaman</SelectItem><SelectItem value="transaksi-tabungan" className="pl-2">Laporan Transaksi Tabungan</SelectItem><SelectItem value="transaksi-pinjaman" className="pl-2">Laporan Transaksi Pinjaman</SelectItem><SelectItem value="anggota" className="pl-2">Laporan Anggota</SelectItem></SelectContent></Select></FormRow>
    <FormRow label="Judul Laporan"><Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-8 rounded-[5px] border-slate-300 text-[13px]" /></FormRow><FormRow label="Tampilkan Total"><ReportSwitch checked={showTotal} onChange={setShowTotal} /></FormRow><FormRow label="Tanda Tangan Laporan"><ReportSwitch checked={showSignature} onChange={setShowSignature} /></FormRow><FormRow label="Tetapkan Sebagai Laporan Utama"><ReportSwitch checked={isMain} onChange={setIsMain} /></FormRow>
    {basis ? <div className="mt-5 grid grid-cols-1 gap-16"><section><div className="flex items-center justify-between border-b border-slate-300 pb-2"><h2 className="text-[21px] text-[#002060]"><strong>Pengaturan Kolom Laporan</strong> <span className="text-[16px]">Daftar</span></h2><button type="button" onClick={addColumn} className="h-8 rounded-[5px] bg-[#3564ef] px-4 text-[13px] font-semibold text-white">+ Tambah</button></div><div className="grid grid-cols-[1fr_1fr_1fr_180px_40px] px-2 pt-2 text-[11px] uppercase tracking-wide text-[#64769a]"><span>Field Key</span><span>Field Label</span><span>Field Order</span><span /><span /></div>{columns.map((column, index) => <div key={column.id} draggable onDragStart={() => setDraggedId(column.id)} onDragOver={(e) => e.preventDefault()} onDrop={() => moveColumn(column.id)} className="grid grid-cols-[1fr_1fr_1fr_180px_40px] items-center gap-1 border-b border-slate-200 py-1"><Options value={column.key} onChange={(key) => setColumns((items) => items.map((item) => item.id === column.id ? { ...item, key } : item))} /><Input value={column.label} onChange={(e) => setColumns((items) => items.map((item) => item.id === column.id ? { ...item, label: e.target.value } : item))} className="h-8 rounded-[5px] border-slate-300 text-[13px]" /><span className="px-2 text-[13px] text-[#002060]">{index + 1}</span><div className="flex gap-1"><button type="button" onClick={addColumn} className="inline-flex h-8 w-11 items-center justify-center rounded-[5px] bg-[#7d8da9] text-white"><Plus className="h-4 w-4" /></button><button type="button" onClick={() => setColumns((items) => items.filter((item) => item.id !== column.id))} className="inline-flex h-8 w-11 items-center justify-center rounded-[5px] bg-[#e8334f] text-white"><Trash2 className="h-4 w-4" /></button></div><GripVertical className="h-4 w-4 cursor-grab text-[#002060]" /></div>)}</section>
    <section><div className="flex items-center justify-between border-b border-slate-300 pb-2"><h2 className="text-[21px] text-[#002060]"><strong>Pengaturan Urutan Data</strong> <span className="text-[16px]">Daftar</span></h2><button type="button" onClick={addSort} className="h-8 rounded-[5px] bg-[#3564ef] px-4 text-[13px] font-semibold text-white">+ Tambah</button></div><div className="grid grid-cols-[1fr_1fr_1fr_180px_40px] px-4 pt-2 text-[11px] uppercase tracking-wide text-[#64769a]"><span>Sort Key</span><span>Tipe Urutan</span><span>Sort Order</span><span /><span /></div>{sorts.map((sort, index) => <div key={sort.id} className="grid grid-cols-[1fr_1fr_1fr_180px_40px] items-center gap-1 border-b border-slate-200 py-1"><Options value={sort.key} onChange={(key) => setSorts((items) => items.map((item) => item.id === sort.id ? { ...item, key } : item))} /><Select value={sort.direction} onValueChange={(direction) => setSorts((items) => items.map((item) => item.id === sort.id ? { ...item, direction } : item))}><SelectTrigger className="h-8 rounded-[5px] border-slate-300 text-[13px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="az">A-Z</SelectItem><SelectItem value="za">Z-A</SelectItem></SelectContent></Select><span className="px-2 text-[13px] text-[#002060]">{index + 1}</span><div className="flex gap-1"><button type="button" onClick={addSort} className="inline-flex h-8 w-11 items-center justify-center rounded-[5px] bg-[#7d8da9] text-white"><Plus className="h-4 w-4" /></button><button type="button" onClick={() => setSorts((items) => items.filter((item) => item.id !== sort.id))} className="inline-flex h-8 w-11 items-center justify-center rounded-[5px] bg-[#e8334f] text-white"><Trash2 className="h-4 w-4" /></button></div><GripVertical className="h-4 w-4 text-[#002060]" /></div>)}</section></div> : null}
  </div><div className="mt-5 flex justify-end gap-1"><button type="button" onClick={() => navigate("/mitra-karya/laporan/penyesuaian")} className="inline-flex h-10 items-center gap-1 rounded-[7px] bg-[#7d8da9] px-5 text-[13px] font-semibold text-white"><X className="h-3 w-3" strokeWidth={3} />Batalkan</button><button type="button" onClick={save} className="inline-flex h-10 items-center gap-1 rounded-[7px] bg-[#26ad00] px-5 text-[13px] font-semibold text-white"><CheckSquare className="h-4 w-4" strokeWidth={3} />Simpan</button></div></Card></div>;
}
