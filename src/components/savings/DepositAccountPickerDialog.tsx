"use client";

import * as React from "react";
import { ChevronDown, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type DepositAccount = {
  id: string;
  noRekening: string;
  tanggal: string;
  produk: string;
  nasabahId: string;
  nasabah: string;
  saldoDeposito: string;
  saldoBunga: string;
  bunga: string;
};

const accounts: DepositAccount[] = [
  ["55260001", "29-01-2026", "SIJAKOP", "N2400028", "Rahmi Melani", "20.000.000,00", "0,00", "10.00"],
  ["55250001", "08-05-2025", "SIJAKOP", "A2300013", "Yulia Farida", "100.000.000,00", "0,00", "12.00"],
  ["55240001", "13-05-2024", "SIJAKOP", "N2400029", "Pangeran Sirait", "100.000.000,00", "0,00", "4.80"],
  ["55230011", "24-07-2023", "SIJAKOP", "A2300001", "Balijan Uwais", "10.000.000,00", "0,00", "10.00"],
  ["55230010", "31-08-2023", "SIJAKOP", "A2300024", "Jessica Uvainah S.Gz", "10.000.000,00", "0,00", "10.00"],
  ["55230009", "31-08-2023", "SIJAKOP", "A2300022", "Vanya Rahmawati", "10.000.000,00", "0,00", "10.00"],
  ["55230008", "18-07-2023", "SIJAKOP", "A2300023", "Jamil Thamrin", "50.000.000,00", "0,00", "10.00"],
  ["55230007", "16-06-2023", "SIJAKOP", "A2300013", "Yulia Farida", "10.000.000,00", "0,00", "10.00"],
  ["55230006", "16-06-2023", "SIJAKOP", "A2300024", "Jessica Uvainah S.Gz", "1.000.000,00", "0,00", "10.00"],
  ["55230005", "16-06-2023", "SIJAKOP", "A2300018", "Ciaobella Usada S.Farm", "10.000.000,00", "0,00", "9.00"],
  ["55230004", "16-06-2023", "SIJAKOP", "A2300013", "Yulia Farida", "100.000,00", "0,00", "10.00"],
  ["55230003", "16-06-2023", "SIJAKOP", "A2400002", "Zulfa Yunita Nasyidah S.Ked", "1.000.000,00", "0,00", "10.00"],
  ["55230002", "16-06-2023", "SIJAKOP", "A2300022", "Vanya Rahmawati", "1.000.000.000,00", "0,00", "10.00"],
  ["55230001", "07-06-2023", "SIJAKOP", "A2300008", "Jelita Padmasari", "20.000.000,00", "333.200,00", "10.00"],
].map(([noRekening, tanggal, produk, nasabahId, nasabah, saldoDeposito, saldoBunga, bunga], index) => ({ id: String(index + 1), noRekening, tanggal, produk, nasabahId, nasabah, saldoDeposito, saldoBunga, bunga }));

const header = "px-2 py-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-[#253451]";
const field = "h-8 rounded-md border-slate-300 px-2 text-[10px] shadow-none";

export default function DepositAccountPickerDialog({ open, onOpenChange, onPick }: { open: boolean; onOpenChange: (open: boolean) => void; onPick: (account: DepositAccount) => void }) {
  const [pageSize, setPageSize] = React.useState("20");
  const [query, setQuery] = React.useState("");
  const [nasabahQuery, setNasabahQuery] = React.useState("");
  const [product, setProduct] = React.useState("all");

  const filtered = accounts.filter((account) => {
    const text = `${account.noRekening} ${account.nasabahId}`.toLowerCase();
    return text.includes(query.toLowerCase()) && account.nasabah.toLowerCase().includes(nasabahQuery.toLowerCase()) && (product === "all" || account.produk === product);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1.25rem)] max-w-[1180px] overflow-hidden border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
          <header className="flex h-[62px] items-center justify-between border-b border-slate-200 px-6">
            <h2 className="text-lg font-semibold text-[#1d2a45]">Rekening Deposito</h2>
            <button type="button" onClick={() => onOpenChange(false)} className="text-slate-500 hover:text-slate-800" aria-label="Tutup"><X className="h-5 w-5" /></button>
          </header>
          <div className="max-h-[calc(100vh-150px)] overflow-auto px-6 py-6">
            <div className="mb-4 flex items-center gap-1 text-[13px] text-slate-700">Tampilkan <Select value={pageSize} onValueChange={setPageSize}><SelectTrigger className="h-8 w-[44px] rounded-md border-slate-300 px-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select> entri</div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1040px] border-collapse text-[11px] text-[#304568]">
                <thead>
                  <tr className="bg-white text-left">
                    <th className={`${header} w-[6%] bg-slate-100`}>No. <ChevronsUpDown className="inline h-3 w-3" /></th>
                    <th className={`${header} w-[11%]`}>No. Rekening <ChevronsUpDown className="inline h-3 w-3" /></th>
                    <th className={`${header} w-[11%] bg-slate-100`}>Tanggal<br />Daftar <ChevronDown className="ml-1 inline h-3 w-3" /></th>
                    <th className={`${header} w-[13%]`}>Produk<br />Deposito <ChevronsUpDown className="inline h-3 w-3" /></th>
                    <th className={`${header} w-[11%]`}>ID. Nasabah <ChevronsUpDown className="inline h-3 w-3" /></th>
                    <th className={`${header} w-[17%]`}>Nama Nasabah <ChevronsUpDown className="float-right h-3 w-3" /></th>
                    <th className={`${header} w-[13%]`}>Saldo<br />Deposito <ChevronsUpDown className="float-right h-3 w-3" /></th>
                    <th className={`${header} w-[11%]`}>Saldo<br />Bunga <ChevronsUpDown className="float-right h-3 w-3" /></th>
                    <th className={`${header} w-[10%]`}>Bunga Per<br />Tahun (%) <ChevronsUpDown className="float-right h-3 w-3" /></th>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <th />
                    <th className="p-2"><Input value={query} onChange={(e) => setQuery(e.target.value)} className={field} /></th>
                    <th className="bg-slate-100 p-2"><Input className={field} /></th>
                    <th className="p-2"><Select value={product} onValueChange={setProduct}><SelectTrigger className={field}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">-- Semua --</SelectItem><SelectItem value="SIJAKOP">SIJAKOP</SelectItem></SelectContent></Select></th>
                    <th className="p-2"><Input className={field} /></th><th className="p-2"><Input value={nasabahQuery} onChange={(e) => setNasabahQuery(e.target.value)} className={field} /></th><th className="p-2"><Input placeholder="0,00" className={`${field} text-right`} /></th><th className="p-2"><Input placeholder="0,00" className={`${field} text-right`} /></th><th className="p-2"><Input className={field} /></th>
                  </tr>
                </thead>
                <tbody>{filtered.slice(0, Number(pageSize)).map((row) => <tr key={row.id} onClick={() => { onPick(row); onOpenChange(false); }} className="cursor-pointer border-b border-slate-200 hover:bg-blue-50"><td className="bg-slate-100 px-2 py-1.5">{row.id}</td><td className="px-2 py-1.5">{row.noRekening}</td><td className="bg-slate-100 px-2 py-1.5">{row.tanggal}</td><td className="px-2 py-1.5">{row.produk}</td><td className="px-2 py-1.5">{row.nasabahId}</td><td className="px-2 py-1.5">{row.nasabah}</td><td className="px-2 py-1.5 text-right">{row.saldoDeposito}</td><td className="px-2 py-1.5 text-right">{row.saldoBunga}</td><td className="px-2 py-1.5">{row.bunga}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between text-[13px] text-slate-600"><span>Menampilkan 1 sampai {filtered.length} dari {filtered.length} entri</span><div className="flex gap-1"><Button variant="outline" className="h-8 px-3" disabled>Sebelumnya</Button><Button className="h-8 w-8 bg-violet-600 p-0">1</Button><Button variant="outline" className="h-8 px-3" disabled>Selanjutnya</Button></div></div>
          </div>
          <footer className="flex justify-end border-t border-slate-200 px-6 py-4"><Button onClick={() => onOpenChange(false)} className="h-8 rounded-md bg-[#7b8da9] px-5 text-[12px] hover:bg-[#687b99]">× Tutup</Button></footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}
