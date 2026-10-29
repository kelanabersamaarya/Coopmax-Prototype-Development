"use client";

import * as React from "react";
import { ArrowLeft, ChevronDown, Copy } from "lucide-react";

type Props = { onBack: () => void };

const banks = ["BCA", "Bank Mandiri", "BRI", "BNI"];

function ReviewPage({ accountNo, bankName, amount, onBack }: { accountNo: string; bankName: string; amount: string; onBack: () => void }) {
  const [openMethod, setOpenMethod] = React.useState("m-banking");
  const numericAmount = Number(amount || 0);
  const adminFee = 8500;
  const total = numericAmount + adminFee;
  const vaPrefix = bankName === "BCA" ? "5301" : bankName === "Bank Mandiri" ? "8808" : bankName === "BRI" ? "0021" : "8810";
  const virtualAccount = `${vaPrefix}${accountNo.replace(/\D/g, "").padStart(8, "0")}`;
  const methods = [
    ["m-banking", ["Masukkan Kartu ATM dan PIN.", "Pilih Transaksi Lainnya > Transfer > ke Rekening.", "Pilih Virtual Account dan masukkan nomor VA.", "Masukkan nominal sesuai total transaksi.", "Periksa detail lalu konfirmasi pembayaran."]],
    ["Internet Banking", ["Login ke internet banking bank Anda.", "Pilih Transfer atau Virtual Account.", "Masukkan nomor Virtual Account.", "Pastikan penerima dan nominal sudah benar.", "Konfirmasi transaksi dan simpan bukti pembayaran."]],
    ["ATM", ["Masukkan kartu dan PIN ATM.", "Pilih Transfer > Virtual Account.", "Masukkan nomor Virtual Account.", "Periksa detail transaksi.", "Konfirmasi dan simpan struk pembayaran."]],
  ] as const;

  return (
    <div className="h-full overflow-y-auto bg-[#004FC7] text-[#26365F] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="relative overflow-hidden px-6 pb-8 pt-6 text-white">
        <div className="pointer-events-none absolute -right-5 -top-16 h-[150px] w-[150px] rounded-full bg-white/10" />
        <button type="button" onClick={onBack} className="relative z-10 -ml-2 inline-flex h-10 w-10 items-center justify-center" aria-label="Kembali"><ArrowLeft className="h-8 w-8" /></button>
        <h1 className="relative z-10 mt-4 text-[26px] font-extrabold">Review</h1>
      </header>
      <main className="bg-[#004FC7] px-4 pb-8 pt-2">
        <div className="mx-auto max-w-[380px] rounded-[20px] bg-white px-4 pb-6 pt-5 shadow-[0_4px_18px_rgba(15,23,42,0.12)]">
          <p className="text-[16px] font-semibold text-[#B2B2B2]">Lakukan Pembayaran Sebelum</p>
          <p className="mt-3 text-[16px] font-extrabold text-[#333333]">12 Feb 2024, 10:20 WITA</p>
          <div className="my-4 border-t border-[#E5E5E5]" />
          <div className="flex items-center gap-3"><div className="grid h-12 w-16 place-items-center rounded-xl bg-[#F1F1F1] text-[12px] font-extrabold text-[#0A4DA2]">{bankName}</div><div><p className="font-extrabold text-[#333333]">{bankName} VA</p><p className="text-[12px] text-[#555555]">Luna Thompson</p></div></div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F1F1F1] px-4 py-4"><span className="text-[16px] font-extrabold tracking-wide text-[#222222]">{virtualAccount}</span><button type="button" onClick={() => navigator.clipboard?.writeText(virtualAccount)} className="font-extrabold text-[#0057CE]">Salin</button></div>
          <h2 className="mt-5 text-[16px] font-extrabold text-[#263D78]">Detail Transaksi</h2>
          <div className="mt-3 rounded-[14px] bg-[#F5F5F5] p-4">
            <p className="text-[14px] font-semibold text-[#A0A0A0]">Ke Rekening</p><p className="mt-1 text-[16px] font-extrabold text-[#263D78]">{accountNo} - Luna Thompson</p><p className="mt-1 text-[16px] font-extrabold text-black">Simpanan Sukarela</p>
            <div className="mt-5 w-full rounded-[12px] border border-[#E3E3E3] bg-white p-4"><div className="flex justify-between text-[16px]"><span className="font-semibold text-[#999999]">Nominal</span><span className="font-extrabold">Rp{numericAmount.toLocaleString("id-ID")}</span></div><div className="mt-5 flex justify-between text-[16px]"><span className="font-semibold text-[#999999]">Biaya Admin</span><span className="font-extrabold">Rp{adminFee.toLocaleString("id-ID")}</span></div><div className="my-5 border-t border-dashed border-[#BDBDBD]" /><div className="font-extrabold">Total</div><div className="mt-3 flex justify-between rounded-xl bg-[#F1F1F1] px-4 py-3"><span className="font-extrabold">Rp {total.toLocaleString("id-ID")}</span><button type="button" onClick={() => navigator.clipboard?.writeText(String(total))} className="font-extrabold text-[#0057CE]">Salin</button></div><p className="mt-3 text-[10px] text-[#999999]">Pastikan anda memasukkan nominal sesuai dengan jumlah transfer</p></div>
          </div>
          <section className="mt-6"><h2 className="text-[17px] font-extrabold text-[#263D78]">Cara Melakukan Pembayaran</h2><div className="mt-4 overflow-hidden rounded-[14px] border border-[#E1E1E1]">{methods.map(([name, steps], index) => <div key={name} className={index ? "border-t border-[#E8E8E8]" : ""}><button type="button" onClick={() => setOpenMethod(openMethod === name ? "" : name)} className="flex min-h-[56px] w-full items-center justify-between px-4 text-left font-bold text-[#333333]"><span>{name}</span><ChevronDown className={`h-5 w-5 transition-transform ${openMethod === name ? "rotate-180" : ""}`} /></button>{openMethod === name && <ol className="list-decimal space-y-3 px-9 pb-5 text-[12px] leading-relaxed text-[#4A4A4A]">{steps.map((step) => <li key={step}>{step}</li>)}</ol>}</div>)}</div></section>
        </div>
      </main>
    </div>
  );
}

export default function MBankingSavingsPage({ onBack }: Props) {
  const [screen, setScreen] = React.useState<"detail" | "amount" | "bank" | "review">("detail");
  const [amount, setAmount] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const accountNo = "4260054";

  if (screen === "review") return <ReviewPage accountNo={accountNo} bankName={bankName} amount={amount} onBack={() => setScreen("bank")} />;
  if (screen === "bank") return <div className="flex h-full flex-col bg-white px-6 py-8 text-[#26365F]"><button type="button" onClick={() => setScreen("amount")} className="mb-8 w-fit text-[#004FC7]"><ArrowLeft /></button><h1 className="text-2xl font-extrabold">Pilih Bank</h1><div className="mt-6 grid gap-3">{banks.map((bank) => <button key={bank} type="button" onClick={() => setBankName(bank)} className={`rounded-2xl border-2 p-4 text-left font-bold ${bankName === bank ? "border-[#004FC7] bg-[#F1F7FF]" : "border-[#E4EAF2]"}`}>{bank}</button>)}</div><button type="button" disabled={!bankName} onClick={() => setScreen("review")} className="mt-auto h-12 rounded-xl bg-[#004FC7] font-bold text-white disabled:bg-[#B8CBE8]">Lanjutkan</button></div>;
  if (screen === "amount") return <div className="flex h-full flex-col bg-white px-6 py-8 text-[#26365F]"><button type="button" onClick={() => setScreen("detail")} className="w-fit text-[#004FC7]"><ArrowLeft /></button><h1 className="mt-8 text-2xl font-extrabold">Nominal Transfer</h1><input value={amount} onChange={(event) => setAmount(event.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Masukkan nominal transfer" className="mt-6 rounded-xl bg-[#F1F1F1] p-4 outline-none" /><button type="button" disabled={!amount} onClick={() => setScreen("bank")} className="mt-auto h-12 rounded-xl bg-[#004FC7] font-bold text-white disabled:bg-[#B8CBE8]">Lanjutkan</button></div>;
  return <div className="flex h-full flex-col bg-white px-6 py-8 text-[#26365F]"><button type="button" onClick={onBack} className="w-fit text-[#004FC7]"><ArrowLeft /></button><h1 className="mt-8 text-2xl font-extrabold text-[#004FC7]">Simpanan</h1><div className="mt-8 rounded-2xl bg-[#F5F5F5] p-5"><p className="text-sm text-[#999999]">Ke Rekening</p><p className="mt-2 text-lg font-extrabold">{accountNo} - Luna Thompson</p><p className="mt-1 font-extrabold text-black">Simpanan Sukarela</p></div><button type="button" onClick={() => setScreen("amount")} className="mt-8 rounded-xl bg-[#004FC7] py-3 font-bold text-white">Tambah Saldo</button></div>;
}
