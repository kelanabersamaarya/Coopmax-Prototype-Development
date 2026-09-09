import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Save, X } from "lucide-react";
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
  return (
    <Switch
      defaultChecked={defaultChecked}
      className="h-6 w-[62px] rounded-full border-0 bg-[#a59bed] data-[state=checked]:bg-[#5843f5] [&>span]:h-5 [&>span]:w-5 [&>span]:bg-white [&>span]:data-[state=checked]:translate-x-[38px] [&>span]:data-[state=unchecked]:translate-x-0"
    />
  );
}

export default function MitraKaryaPenyesuaianLaporanTambah() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))] px-1 py-7 md:px-4 md:py-8">
      <h1 className="px-5 text-[22px] font-medium text-[#002060]"><strong>Penyesuaian Laporan</strong> <span className="text-[16px]">Tambah</span></h1>
      <Card className="mt-10 rounded-[22px] border-0 bg-white px-6 py-8 shadow-sm md:px-12 md:py-8">
        <div className="grid gap-3">
          <FormRow label="Basis Laporan">
            <Select><SelectTrigger className="h-8 w-full rounded-[5px] border-slate-300 text-[13px] shadow-none focus:ring-0"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tabungan">Laporan Rekening Tabungan</SelectItem><SelectItem value="anggota">Laporan Anggota</SelectItem><SelectItem value="pinjaman">Laporan Rekening Pinjaman</SelectItem><SelectItem value="deposito">Laporan Rekening Deposito</SelectItem></SelectContent></Select>
          </FormRow>
          <FormRow label="Judul Laporan"><Input className="h-8 rounded-[5px] border-slate-300 text-[13px] shadow-none focus-visible:ring-0" /></FormRow>
          <FormRow label="Tampilkan Total"><ReportSwitch defaultChecked /></FormRow>
          <FormRow label="Tanda Tangan Laporan"><ReportSwitch defaultChecked /></FormRow>
          <FormRow label="Tetapkan Sebagai Laporan Utama"><ReportSwitch /></FormRow>
        </div>
        <div className="mt-5 flex justify-end gap-1">
          <button type="button" onClick={() => navigate("/mitra-karya/laporan/penyesuaian")} className="inline-flex h-10 items-center gap-1 rounded-[7px] bg-[#7d8da9] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6d7d98]"><X className="h-3 w-3" strokeWidth={3} />Batalkan</button>
          <button type="button" onClick={() => navigate("/mitra-karya/laporan/penyesuaian")} className="inline-flex h-10 items-center gap-1 rounded-[7px] bg-[#26ad00] px-5 text-[13px] font-semibold text-white transition hover:bg-[#209500]"><Save className="h-3 w-3" strokeWidth={3} />Simpan</button>
        </div>
      </Card>
    </div>
  );
}
