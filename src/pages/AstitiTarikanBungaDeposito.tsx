import * as React from "react";
import { Clipboard, Plus, Search, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DepositAccountPickerDialog, { type DepositAccount } from "@/components/savings/DepositAccountPickerDialog";

export default function AstitiTarikanBungaDeposito() {
  const navigate = useNavigate();
  const [tanggal, setTanggal] = React.useState("13-09-2026");
  const [rekeningTabungan, setRekeningTabungan] = React.useState("-");
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<DepositAccount | null>(null);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))] px-3 py-6 text-[#123664] md:px-5 md:py-4">
      <div className="mb-10 flex items-baseline gap-2 px-1"><h1 className="text-xl font-semibold tracking-tight md:text-2xl">Transaksi Deposito</h1><span className="text-base font-normal">Tarikan</span></div>
      <Card className="min-h-[480px] rounded-3xl border-0 bg-white px-5 py-8 shadow-none md:px-12 md:py-8">
        <div className="grid max-w-full grid-cols-[185px_minmax(0,1fr)] items-center gap-y-3 text-[13px]">
          <label htmlFor="tanggal">Tanggal<span className="text-red-500">*</span></label><Input id="tanggal" value={tanggal} onChange={(event) => setTanggal(event.target.value)} className="h-8 rounded-md border-slate-300 text-[13px] shadow-none" />
          <label htmlFor="jenis">Jenis Transaksi<span className="text-red-500">*</span></label><Select defaultValue="penarikan"><SelectTrigger id="jenis" className="h-8 rounded-md border-slate-300 text-[13px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="penarikan">Penarikan Bunga SIJAKOP</SelectItem></SelectContent></Select>
        </div>
        <div className="mt-12 grid grid-cols-[55px_minmax(270px,1.1fr)_minmax(250px,1fr)_minmax(300px,1.2fr)] gap-5 text-[13px]">
          <div className="font-semibold uppercase tracking-wider text-[#64799a]">No</div><div className="font-semibold uppercase tracking-wider text-[#64799a]">Nasabah<span className="text-red-500">*</span></div><div className="font-semibold uppercase tracking-wider text-[#64799a]">Saldo</div><div className="font-semibold uppercase tracking-wider text-[#64799a]">Transaksi<span className="text-red-500">*</span></div><div className="col-span-4 -mt-3 border-b border-slate-200" />
          <div className="pt-3 text-center">1.</div>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2"><span className="w-[115px]">No Rekening :</span><div className="flex h-8 flex-1"><Input value={selectedAccount?.noRekening ?? ""} readOnly placeholder="Cari rekening deposito" className="h-8 rounded-r-none border-slate-300 text-[12px] shadow-none" /><Button onClick={() => setPickerOpen(true)} className="h-8 w-9 rounded-l-none bg-[#7a8ca9] px-0 hover:bg-[#64799a]"><Search className="h-4 w-4" /></Button></div></div>
            <div><span className="inline-block w-[115px]">Nama :</span>{selectedAccount?.nasabah ?? ""}</div><div><span className="inline-block w-[115px]">Alamat :</span></div><div><span className="inline-block w-[115px]">Produk :</span>{selectedAccount?.produk ?? ""}</div>
          </div>
          <div className="space-y-0 pt-2"><div className="flex justify-between border-b border-slate-200 pb-5"><span>Saldo :</span><span>{selectedAccount?.saldoDeposito ?? "0,00"}</span></div><div className="flex justify-between pt-5"><span>Saldo Bunga :</span><span>{selectedAccount?.saldoBunga ?? "0,00"}</span></div></div>
          <div className="space-y-2 pt-2"><div className="flex items-center gap-3"><span className="w-[98px]">Rekening<br />Tabungan :</span><Select value={rekeningTabungan} onValueChange={setRekeningTabungan}><SelectTrigger className="h-8 flex-1 rounded-md border-slate-300 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="-">-</SelectItem><SelectItem value="55230003">55230003</SelectItem></SelectContent></Select><Button className="h-8 w-11 bg-[#7890b1] px-0 hover:bg-[#64799a]"><Plus className="h-5 w-5" /></Button></div><div className="flex items-center gap-3"><span className="w-[98px]">Keterangan :</span><div className="flex flex-1"><Input className="h-8 rounded-r-none border-slate-300 text-[12px] shadow-none" /><Button className="h-8 w-9 rounded-l-none bg-[#7890b1] px-0 hover:bg-[#64799a]"><Clipboard className="h-4 w-4" /></Button></div><Button className="h-8 w-11 bg-[#df3147] px-0 hover:bg-red-700"><Trash2 className="h-4 w-4" /></Button></div><div className="flex justify-end pt-3"><span className="rounded bg-[#df3147] px-2 py-1 text-[10px] font-semibold text-white">Belum diproses</span></div></div>
        </div>
        <div className="mt-8 flex items-center justify-end gap-3 text-base"><span>Total :</span><span className="w-[215px] bg-slate-50 px-2 py-1 text-right">0,00</span></div><div className="mt-5 flex justify-end gap-1"><Button onClick={() => navigate("/astiti-dana-lestari/simpanan-berjangka/transaksi")} className="h-10 rounded-md bg-[#7d8eac] px-5 text-[13px] hover:bg-[#657895]"><X className="mr-1 h-3 w-3" />Batalkan</Button><Button className="h-10 rounded-md bg-[#26b500] px-5 text-[13px] hover:bg-green-700">Simpan</Button></div>
      </Card>
      <DepositAccountPickerDialog open={pickerOpen} onOpenChange={setPickerOpen} onPick={setSelectedAccount} />
    </div>
  );
}
