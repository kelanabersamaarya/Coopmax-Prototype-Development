import * as React from "react";
import { useNavigate } from "react-router-dom";
import { GripVertical, Plus, Save, Trash2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

function FormRow({ label, children, required = true }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="grid gap-2 md:grid-cols-[280px_minmax(0,1fr)] md:items-center">
      <label className="text-[13px] text-[#002060]">{label}{required ? <span className="text-red-600">*</span> : null}</label>
      <div>{children}</div>
    </div>
  );
}

function ReportSwitch({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked);

  return (
    <span className="relative inline-flex h-6 w-[62px]">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        className="h-6 w-[62px] rounded-full border-0 bg-[#a59bed] data-[state=checked]:bg-[#5843f5] [&>span]:h-5 [&>span]:w-5 [&>span]:bg-white [&>span]:data-[state=checked]:translate-x-[38px] [&>span]:data-[state=unchecked]:translate-x-0"
      />
      <span className={`pointer-events-none absolute inset-y-0 flex items-center text-[10px] font-bold leading-none text-white ${checked ? "left-[13px]" : "right-[10px]"}`}>
        {checked ? "ON" : "OFF"}
      </span>
    </span>
  );
}

export default function MitraKaryaPenyesuaianLaporanTambah() {
  const navigate = useNavigate();
  const [basis, setBasis] = React.useState("");
  const [columnRows, setColumnRows] = React.useState<number[]>([]);
  const [draggedRow, setDraggedRow] = React.useState<number | null>(null);

  const moveColumnRow = (targetRow: number) => {
    if (draggedRow === null || draggedRow === targetRow) return;
    setColumnRows((rows) => {
      const nextRows = [...rows];
      const fromIndex = nextRows.indexOf(draggedRow);
      const toIndex = nextRows.indexOf(targetRow);
      nextRows.splice(fromIndex, 1);
      nextRows.splice(toIndex, 0, draggedRow);
      return nextRows;
    });
    setDraggedRow(null);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))] px-1 py-7 md:px-4 md:py-8">
      <h1 className="px-5 text-[22px] font-medium text-[#002060]"><strong>Penyesuaian Laporan</strong> <span className="text-[16px]">Tambah</span></h1>
      <Card className="mt-10 rounded-[22px] border-0 bg-white px-6 py-8 shadow-sm md:px-12 md:py-8 [&_svg.lucide-chevron-down]:text-black [&_svg.lucide-chevron-down]:opacity-100">
        <div className="grid gap-3">
          <FormRow label="Basis Laporan">
            <Select value={basis} onValueChange={setBasis}><SelectTrigger className="h-8 w-full rounded-[5px] border-slate-300 text-[13px] shadow-none focus:ring-0 [&>svg]:text-black"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tabungan">Laporan Rekening Tabungan</SelectItem><SelectItem value="anggota">Laporan Anggota</SelectItem><SelectItem value="pinjaman">Laporan Rekening Pinjaman</SelectItem><SelectItem value="deposito">Laporan Rekening Deposito</SelectItem></SelectContent></Select>
          </FormRow>
          <FormRow label="Judul Laporan"><Input className="h-8 rounded-[5px] border-slate-300 text-[13px] shadow-none focus-visible:ring-0" /></FormRow>
          <FormRow label="Tampilkan Total"><ReportSwitch defaultChecked /></FormRow>
          <FormRow label="Tanda Tangan Laporan"><ReportSwitch defaultChecked /></FormRow>
          <FormRow label="Tetapkan Sebagai Laporan Utama"><ReportSwitch /></FormRow>
          {basis ? <div className="mt-5 grid grid-cols-1 gap-16">
            <section>
              <div className="flex items-center justify-between border-b border-slate-300 pb-2"><h2 className="text-[21px] text-[#002060]"><strong>Pengaturan Kolom Laporan</strong> <span className="text-[16px]">Daftar</span></h2><button type="button" onClick={() => setColumnRows((rows) => [...rows, rows.length + 1])} className="h-8 rounded-[5px] bg-[#3564ef] px-4 text-[13px] font-semibold text-white hover:bg-[#2854d8]">+ Tambah</button></div>
              <div className="grid grid-cols-[1fr_1fr_1fr_180px_40px] px-2 pt-2 text-[11px] font-medium uppercase tracking-wide text-[#64769a]"><span>Field Key</span><span>Field Label</span><span>Field Order</span><span /><span /></div>
              {columnRows.map((row, index) => <div key={row} draggable onDragStart={() => setDraggedRow(row)} onDragOver={(event) => event.preventDefault()} onDrop={() => moveColumnRow(row)} className="grid grid-cols-[1fr_1fr_1fr_180px_40px] items-center gap-1 border-b border-slate-200 py-1"><Select><SelectTrigger className="h-8 rounded-[5px] border-slate-300 text-[13px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="__empty__"><span className="sr-only">Kosongkan Field Key</span>&nbsp;</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="no-anggota">No. Anggota</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="nama">Nama Anggota</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="tanggal-daftar">Tanggal Daftar</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="nomor-identitas">Nomor Identitas</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="tanggal-lahir">Tanggal Lahir</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="jenis-kelamin">Jenis Kelamin</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="tempat-lahir">Tempat Lahir</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="alamat">Alamat Anggota</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="no-handphone">No. Handphone</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="kategori">Kategori</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="simpanan-pokok">Simpanan Pokok</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="simpanan-wajib">Simpanan Wajib</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="simpanan-khusus">Simpanan Khusus</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="simpanan-penyertaan">Simpanan Penyertaan</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="total-simpanan">Total Simpanan</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="status">Status</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="ketersediaan-file-ktp">Ketersediaan File KTP</SelectItem><SelectItem className="focus:bg-[#2563eb] focus:text-white" value="preview-file-ktp">Preview File KTP</SelectItem></SelectContent></Select><Input className="h-8 rounded-[5px] border-slate-300 text-[13px]" /><span className="px-2 text-[13px] text-[#002060]">{index + 1}</span><div className="flex gap-1"><button type="button" onClick={() => setColumnRows((rows) => [...rows, Math.max(0, ...rows) + 1])} className="inline-flex h-8 w-11 items-center justify-center rounded-[5px] bg-[#7d8da9] text-white transition hover:bg-[#6d7d98]" aria-label="Tambah Field Key"><Plus className="h-4 w-4" /></button><button type="button" onClick={() => setColumnRows((rows) => rows.filter((item) => item !== row))} className="inline-flex h-8 w-11 items-center justify-center rounded-[5px] bg-[#e8334f] text-white"><Trash2 className="h-4 w-4" /></button></div><GripVertical className="h-4 w-4 cursor-grab text-[#002060] active:cursor-grabbing" aria-label="Pindahkan Field Key" /></div>)}
            </section>
            <section>
              <div className="flex items-center justify-between border-b border-slate-300 pb-2"><h2 className="text-[21px] text-[#002060]"><strong>Pengaturan Urutan Data</strong> <span className="text-[16px]">Daftar</span></h2><button type="button" className="h-8 rounded-[5px] bg-[#3564ef] px-4 text-[13px] font-semibold text-white hover:bg-[#2854d8]">+ Tambah</button></div>
              <div className="grid grid-cols-3 px-4 pt-2 text-[11px] font-medium uppercase tracking-wide text-[#64769a]"><span>Sort Key</span><span>Tipe Urutan</span><span>Sort Order</span></div>
            </section>
          </div> : null}
        </div>
        <div className="mt-5 flex justify-end gap-1">
          <button type="button" onClick={() => navigate("/mitra-karya/laporan/penyesuaian")} className="inline-flex h-10 items-center gap-1 rounded-[7px] bg-[#7d8da9] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6d7d98]"><X className="h-3 w-3" strokeWidth={3} />Batalkan</button>
          <button type="button" onClick={() => navigate("/mitra-karya/laporan/penyesuaian")} className="inline-flex h-10 items-center gap-1 rounded-[7px] bg-[#26ad00] px-5 text-[13px] font-semibold text-white transition hover:bg-[#209500]"><Save className="h-3 w-3" strokeWidth={3} />Simpan</button>
        </div>
      </Card>
    </div>
  );
}
