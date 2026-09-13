import * as React from "react";
import { Check, Copy, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import RekeningTabunganPickerDialog, {
  type RekeningTabungan,
} from "@/components/anggota/RekeningTabunganPickerDialog";
import { saveSavingsTransaction } from "@/lib/savingsTransactionsStore";

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-[185px_minmax(0,1fr)] items-center gap-2 text-[12px]", className)}>
      <Label className="text-[12px] font-normal text-[#08285f]">
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </Label>
      {children}
    </div>
  );
}

const inputClass =
  "h-[30px] rounded-[5px] border border-[#c6d2e5] bg-white text-[12px] text-[#526784] shadow-none";

export default function AstitiTarikanSimpanan() {
  const [date, setDate] = React.useState("13-09-2026");
  const [collector, setCollector] = React.useState("Pilih Kolektor");
  const [openRekening, setOpenRekening] = React.useState(false);
  const [rekening, setRekening] = React.useState<RekeningTabungan | null>(null);
  const [amount, setAmount] = React.useState("0,00");
  const [note, setNote] = React.useState("");
  const [serial, setSerial] = React.useState("");
  const [confirmSave, setConfirmSave] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleConfirmSave = () => {
    const saldoAwal = rekening?.saldo ?? "0,00";
    saveSavingsTransaction({
      rekening: rekening?.noRekening ?? "-",
      nasabah: rekening?.nasabahId ?? "-",
      nama: rekening?.nasabah ?? "-",
      kolektor: collector === "Pilih Kolektor" ? "-" : collector,
      tabungan: rekening?.produk ?? "Simpanan Sukarela",
      tanggal: date,
      jenis: "Transaksi Tarikan Simpanan",
      nominal: `- ${amount}`,
      keterangan: note,
      saldoAwal,
      saldoAkhir: amount,
      produk: rekening?.produk ?? "Simpanan Sukarela",
    });
    setConfirmSave(false);
    setSaveSuccess(true);
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-[hsl(var(--app-bg))] px-4 py-4 text-[#08285f] md:px-8">
      <RekeningTabunganPickerDialog
        open={openRekening}
        onOpenChange={setOpenRekening}
        onPick={setRekening}
      />

      <Dialog open={confirmSave} onOpenChange={setConfirmSave}>
        <DialogContent className="max-w-[528px] rounded-[5px] border-0 bg-white p-0 text-center shadow-2xl [&>button]:hidden">
          <div className="px-8 pb-5 pt-10">
            <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#f7c79f] text-[58px] font-semibold leading-none text-[#f4b77f]">!</div>
            <p className="mt-8 text-[30px] font-semibold text-[#405772]">Yakin untuk menyimpan data ?</p>
            <div className="mt-8 flex justify-center gap-2">
              <Button type="button" onClick={handleConfirmSave} className="h-12 w-[104px] rounded-[5px] bg-[#348bd1] text-[16px] font-semibold text-white ring-2 ring-[#b9d1e7] ring-offset-2 hover:bg-[#287abf]">Yes</Button>
              <Button type="button" onClick={() => setConfirmSave(false)} className="h-12 w-[126px] rounded-[5px] bg-[#aaa] text-[16px] font-semibold text-white hover:bg-[#999]">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={saveSuccess} onOpenChange={setSaveSuccess}>
        <DialogContent className="max-w-[528px] rounded-[5px] border-0 bg-white p-0 text-center shadow-2xl [&>button]:hidden">
          <div className="px-5 pb-5 pt-10">
            <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#dff0d7] text-[62px] font-semibold leading-none text-[#9bd681]">✓</div>
            <p className="mt-8 text-[30px] font-semibold text-[#5b5b5b]">Berhasil menambahkan transaksi</p>
            <div className="mt-8 flex justify-center gap-2">
              <Button type="button" onClick={() => window.location.assign("/astiti-dana-lestari/simpanan/transaksi")} className="h-12 w-[216px] rounded-[5px] bg-[#aaa] text-[16px] font-semibold text-white hover:bg-[#999]">Kembali ke Daftar</Button>
              <Button type="button" onClick={() => window.location.assign("/astiti-dana-lestari/simpanan/transaksi/detail")} className="h-12 w-[216px] rounded-[5px] bg-[#348bd1] text-[16px] font-semibold text-white ring-2 ring-[#b9d1e7] ring-offset-2 hover:bg-[#287abf]">Lihat Detail</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <h1 className="text-[22px] font-semibold tracking-tight">
        Transaksi Tabungan <span className="font-normal">Tarikan</span>
      </h1>

      <Card className="mt-11 min-h-[600px] rounded-[20px] border-0 bg-white px-6 py-8 shadow-none md:px-12 md:py-9">
        <div className="max-w-[1140px] space-y-3">
          <Field label="Tanggal" required><Input value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} /></Field>
          <Field label="Jenis Transaksi" required><select className={cn(inputClass, "w-full px-3 outline-none")} defaultValue="Transaksi Tarikan Simpanan"><option>Transaksi Tarikan Simpanan</option></select></Field>
          <Field label="Kolektor" required><select value={collector} onChange={(e) => setCollector(e.target.value)} className={cn(inputClass, "w-full px-3 outline-none")}><option>Pilih Kolektor</option><option>Purwanto Santoso</option><option>Kolektor A</option><option>Kolektor B</option></select></Field>
        </div>

        <div className="mt-12 grid grid-cols-[55px_330px_minmax(230px,1fr)_395px] gap-3 text-[13px] text-[#08285f]">
          <div className="border-b border-[#c6d2e5] pb-2 text-center uppercase text-[#6f87a9]">No</div>
          <div className="border-b border-[#c6d2e5] pb-2 uppercase text-[#6f87a9]">Nasabah<span className="text-red-500">*</span></div>
          <div className="border-b border-[#c6d2e5] pb-2 uppercase text-[#6f87a9]">Saldo</div>
          <div className="border-b border-[#c6d2e5] pb-2 uppercase text-[#6f87a9]">Transaksi<span className="text-red-500">*</span></div>

          <div className="pt-3 text-center">1.</div>
          <div className="space-y-5 pt-2">
            <div className="flex items-center"><span className="w-[122px] text-[12px]">No Rekening :</span><div className="flex min-w-0 flex-1"><Input value={rekening?.noRekening ?? ""} placeholder="Cari rekening" readOnly className={cn(inputClass, "rounded-r-none")} /><Button type="button" onClick={() => setOpenRekening(true)} className="h-[30px] w-[30px] rounded-l-none bg-[#7b8ca9] p-0 hover:bg-[#687b9b]"><Search className="h-3.5 w-3.5" /></Button></div></div>
            <div><span className="inline-block w-[122px]">Nama :</span>{rekening?.nasabah ?? ""}</div>
            <div><span className="inline-block w-[122px]">Alamat :</span>{rekening ? "-" : ""}</div>
            <div><span className="inline-block w-[122px]">Produk :</span>{rekening?.produk ?? ""}</div>
          </div>
          <div className="space-y-4 pt-2"><div className="grid grid-cols-[125px_1fr]">Tanggal Daftar :<span>{rekening?.tanggal ?? ""}</span></div><div className="grid grid-cols-[125px_1fr]">Saldo Awal :<span>{rekening?.saldo ?? "0,00"}</span></div><div className="grid grid-cols-[125px_1fr]">Saldo Akhir :<span>{rekening?.saldo ?? "0,00"}</span></div></div>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-[12px]"><span className="w-[78px] shrink-0">Nominal :</span><Input value={amount} onChange={(e) => setAmount(e.target.value)} className={cn(inputClass, "text-right")} /><Button type="button" className="h-[30px] w-[30px] shrink-0 rounded-[5px] bg-[#7b8ca9] p-0 hover:bg-[#687b9b]"><Plus className="h-3.5 w-3.5" /></Button></div>
            <div className="flex items-center gap-2 text-[12px]"><span className="w-[78px] shrink-0">Keterangan :</span><div className="flex w-[280px] min-w-0 flex-none"><Input value={note} onChange={(e) => setNote(e.target.value)} className={cn(inputClass, "rounded-r-none")} /><Button type="button" className="h-[30px] w-[30px] shrink-0 rounded-l-none bg-[#7b8ca9] p-0 hover:bg-[#687b9b]"><Copy className="h-3.5 w-3.5" /></Button></div><Button type="button" onClick={() => setNote("")} className="h-[30px] w-[30px] shrink-0 rounded-[5px] bg-[#e3394d] p-0 hover:bg-[#c82f41]"><Trash2 className="h-3.5 w-3.5" /></Button></div>
            <div className="flex items-center gap-2 text-[12px]"><span className="w-[78px] shrink-0 leading-4">Nomor Seri<br />Transaksi :</span><div className="flex w-[280px] min-w-0"><Input value={serial} onChange={(e) => setSerial(e.target.value)} placeholder="Bersifat opsional dan tidak wajib diisi" className={cn(inputClass, "rounded-r-none")} /><Button type="button" className="h-[30px] w-[30px] shrink-0 rounded-l-none bg-[#7b8ca9] p-0 hover:bg-[#687b9b]"><Copy className="h-3.5 w-3.5" /></Button></div></div>
          </div>
        </div>

        <div className="mt-16 flex justify-end"><div className="w-[270px]"><div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-2 text-[16px]"><span>Total :</span><span>{amount}</span></div><div className="flex justify-end gap-1"><Button type="button" className="h-10 rounded-[5px] bg-[#7b8ca9] px-5 hover:bg-[#687b9b]">× Batalkan</Button><Button type="button" onClick={() => setConfirmSave(true)} className="h-10 rounded-[5px] bg-[#2eb400] px-5 hover:bg-[#249500]"><Check className="mr-1 h-3.5 w-3.5" /> Simpan</Button></div></div></div>
      </Card>
    </div>
  );
}
