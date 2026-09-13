"use client";

import * as React from "react";
import { ChevronDown, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type RekeningTabungan = {
  id: string;
  noRekening: string;
  tanggal: string;
  produk: string;
  nasabahId: string;
  nasabah: string;
  saldo: string;
};

const rows: RekeningTabungan[] = [
  ["P001260014", "11-09-2026", "Simpanan Pokok", "A2600014", "Djoko Manggolo", "200.000,00"],
  ["P002260014", "11-09-2026", "Simpanan Wajib", "A2600014", "Djoko Manggolo", "50.000,00"],
  ["P001260013", "10-09-2026", "Simpanan Pokok", "A2600013", "Neri Susilawati", "250.000,00"],
  ["P002260013", "10-09-2026", "Simpanan Wajib", "A2600013", "Neri Susilawati", "50.000,00"],
  ["11111260006", "10-09-2026", "tabungan", "A2600013", "Neri Susilawati", "500.000,00"],
  ["P002260012", "08-09-2026", "Simpanan Wajib", "A2600012", "M.JOHAN PAKPAHAN, SIPMA", "50.000,00"],
  ["P001260012", "08-09-2026", "Simpanan Pokok", "A2600012", "M.JOHAN PAKPAHAN, SIPMA", "100.000,00"],
  ["P001260011", "07-09-2026", "Simpanan Pokok", "A2600011", "Neri Susilawati", "150.000,00"],
  ["P002260011", "07-09-2026", "Simpanan Wajib", "A2600011", "Neri Susilawati", "50.000,00"],
  ["SK01260009", "07-09-2026", "Simpanan Sukarela", "A2600010", "Sinergi Sukses Sentosa", "60.000,00"],
  ["P001260010", "07-09-2026", "Simpanan Pokok", "A2600010", "Sinergi Sukses Sentosa", "200.000,00"],
  ["P002260010", "07-09-2026", "Simpanan Wajib", "A2600010", "Sinergi Sukses Sentosa", "50.000,00"],
  ["SK01260008", "03-09-2026", "Simpanan Sukarela", "A2600009", "Sumber Rejeki", "10.000,00"],
  ["P001260009", "03-09-2026", "Simpanan Pokok", "A2600009", "Sumber Rejeki", "200.000,00"],
  ["P002260009", "03-09-2026", "Simpanan Wajib", "A2600009", "Sumber Rejeki", "50.000,00"],
  ["P001260008", "28-08-2026", "Simpanan Pokok", "A2600008", "ardina yanti", "200.000,00"],
  ["P002260008", "28-08-2026", "Simpanan Wajib", "A2600008", "ardina yanti", "50.000,00"],
  ["11111260005", "28-08-2026", "tabungan", "A2600008", "ardina yanti", "1.000.000,00"],
  ["SK01260007", "14-08-2026", "Simpanan Sukarela", "A2600007", "bmt al fath ikmi", "160.000,00"],
  ["P001260007", "14-08-2026", "Simpanan Pokok", "A2600007", "bmt al fath ikmi", "200.000,00"],
].map(([noRekening, tanggal, produk, nasabahId, nasabah, saldo], i) => ({ id: String(i + 1), noRekening, tanggal, produk, nasabahId, nasabah, saldo })).slice(0, 10);

const R = "rounded-[5px]";

export default function RekeningTabunganPickerDialog({ open, onOpenChange, onPick }: { open: boolean; onOpenChange: (open: boolean) => void; onPick: (rekening: RekeningTabungan) => void }) {
  const [pageSize, setPageSize] = React.useState("10");
  const [query, setQuery] = React.useState("");
  const filtered = rows.filter((row) => `${row.noRekening} ${row.nasabah} ${row.nasabahId}`.toLowerCase().includes(query.toLowerCase()));

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[1180px] overflow-hidden border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
      <div className="overflow-hidden rounded-[16px] bg-white shadow-2xl ring-1 ring-slate-200">
        <header className="flex h-[62px] items-center justify-between border-b border-slate-200 px-6">
          <h2 className="text-[18px] font-semibold text-[#1d2a45]">Rekening Tabungan</h2>
          <button type="button" onClick={() => onOpenChange(false)} className="text-slate-500 hover:text-slate-800" aria-label="Tutup"><X className="h-5 w-5" /></button>
        </header>
        <div className="max-h-[calc(100vh-150px)] overflow-auto px-6 py-6">
          <div className="mb-4 flex items-center gap-1 text-[13px] text-slate-700">Tampilkan <Select value={pageSize} onValueChange={setPageSize}><SelectTrigger className={cn("h-8 w-[44px] px-2", R)}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem></SelectContent></Select> entri</div>
          <div className="overflow-hidden border border-slate-200">
            <table className="w-full table-fixed border-collapse text-[12px] text-[#304568]">
              <thead>
                <tr className="h-10 bg-white text-left font-bold uppercase tracking-wide text-[#253451]">
                  <th className="w-[6%] px-3">No. <ChevronsUpDown className="ml-1 inline h-3 w-3" /></th><th className="w-[17%] px-3">No. Rekening <ChevronsUpDown className="ml-1 inline h-3 w-3" /></th><th className="w-[13%] bg-slate-100 px-3 leading-3">Tanggal<br />Daftar <ChevronDown className="ml-2 inline h-3 w-3" /></th><th className="w-[16%] px-3">Produk Tabungan <ChevronsUpDown className="inline h-3 w-3" /></th><th className="w-[12%] px-3">ID Nasabah <ChevronsUpDown className="inline h-3 w-3" /></th><th className="w-[22%] px-3">Nasabah <ChevronsUpDown className="float-right h-3 w-3" /></th><th className="w-[14%] px-3">Saldo <ChevronsUpDown className="float-right h-3 w-3" /></th>
                </tr>
                <tr className="border-b border-slate-200">
                  <th /> <th className="p-2"><Input value={query} onChange={(e) => setQuery(e.target.value)} className={cn("h-8 border-slate-300", R)} /></th><th className="p-2"><Input className={cn("h-8 border-slate-300", R)} /></th><th className="p-2"><Select defaultValue="all"><SelectTrigger className={cn("h-8 border-slate-300", R)}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">-- Semua --</SelectItem></SelectContent></Select></th><th className="p-2"><Input className={cn("h-8 border-slate-300", R)} /></th><th className="p-2"><Input className={cn("h-8 border-slate-300", R)} /></th><th className="p-2"><Input className={cn("h-8 border-slate-300 text-right", R)} /></th>
                </tr>
              </thead>
              <tbody>{filtered.slice(0, Number(pageSize)).map((row) => <tr key={row.id} onClick={() => { onPick(row); onOpenChange(false); }} className="cursor-pointer border-b border-slate-200 hover:bg-blue-50"><td className="px-3 py-1.5 text-center">{row.id}</td><td className="bg-slate-50 px-3 py-1.5">{row.noRekening}</td><td className="px-3 py-1.5 text-center">{row.tanggal}</td><td className="px-3 py-1.5">{row.produk}</td><td className="px-3 py-1.5">{row.nasabahId}</td><td className="px-3 py-1.5">{row.nasabah}</td><td className="px-3 py-1.5 text-right">{row.saldo}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-[13px] text-slate-600"><span>Menampilkan 1 sampai {Math.min(filtered.length, Number(pageSize))} dari 199 entri (disaring dari 201 entri keseluruhan)</span><div className="flex gap-1"><Button variant="outline" className={cn("h-8 px-3", R)} disabled>Sebelumnya</Button><Button className={cn("h-8 w-8 bg-violet-600 p-0", R)}>1</Button>{[2,3,4,5].map(n => <Button key={n} variant="outline" className={cn("h-8 w-8 p-0", R)}>{n}</Button>)}<span className="px-2 py-1">...</span><Button variant="outline" className={cn("h-8 px-3", R)}>Selanjutnya</Button></div></div>
        </div>
        <footer className="flex justify-end border-t border-slate-200 px-6 py-4"><Button onClick={() => onOpenChange(false)} className={cn("bg-slate-500 px-5", R)}>× Tutup</Button></footer>
      </div>
    </DialogContent>
  </Dialog>;
}

export function rekeningToNasabah(rekening: RekeningTabungan) {
  return { id: rekening.nasabahId, nama: rekening.nasabah, noIdentitas: rekening.nasabahId, alamat: "", status: "Anggota" as const };
}
