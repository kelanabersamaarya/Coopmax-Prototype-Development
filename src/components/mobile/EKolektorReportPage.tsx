"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import EKolektorBottomNav from "@/components/mobile/EKolektorBottomNav";
import { cn } from "@/lib/utils";

type ReportTab = "setoran" | "penarikan" | "angsuran" | "realisasi";

type ReportEntry = {
  name: string;
  account: string;
  type: string;
  amount: string;
  date: string;
  time: string;
};

const entries: ReportEntry[] = [
  { name: "Emma Walker", account: "4260059", type: "Simpanan Sukarela", amount: "+Rp. 5.000,00", date: "22 Okt 2026", time: "13:44" },
  { name: "Surya Negara", account: "4260060", type: "Simpanan Sukarela", amount: "+Rp. 5.000,00", date: "21 Okt 2026", time: "15:50" },
  { name: "Emma Walker", account: "4260059", type: "Simpanan Sukarela", amount: "+Rp. 5.000,00", date: "22 Okt 2026", time: "13:44" },
  { name: "Surya Negara", account: "4260060", type: "Simpanan Sukarela", amount: "+Rp. 5.000,00", date: "21 Okt 2026", time: "15:50" },
];

const tabs: { id: ReportTab; label: string }[] = [
  { id: "setoran", label: "Setoran" },
  { id: "penarikan", label: "Penarikan" },
  { id: "angsuran", label: "Angsuran" },
  { id: "realisasi", label: "Realisasi" },
];

export default function EKolektorReportPage({
  onHome,
  onTransactions,
  onBack,
}: {
  onHome: () => void;
  onTransactions: () => void;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<ReportTab>("setoran");
  const [productOpen, setProductOpen] = React.useState(false);
  const [product, setProduct] = React.useState("Pilih Produk");
  const [showTotal, setShowTotal] = React.useState(false);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[215px] overflow-hidden bg-[#004FC7] px-[34px] pt-[6px] text-white">
          <div className="pointer-events-none absolute -right-[52px] -top-[62px] h-[190px] w-[280px] rounded-full bg-[#004FC7]/35" />
          <div className="pointer-events-none absolute -right-[96px] top-[90px] h-[190px] w-[210px] rounded-full border-[25px] border-[#004FC7]/30" />
          <h1 className="relative text-[26px] font-extrabold leading-tight tracking-[-1px]">Laporan</h1>
          <div className="relative -mx-[34px] mt-[29px] flex gap-[14px] overflow-hidden px-[34px] pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "shrink-0 rounded-full px-[21px] py-[11px] text-[17px] font-extrabold leading-none transition",
                  activeTab === tab.id ? "bg-white text-[#004FC7] shadow-sm" : "text-white hover:bg-white/10",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <main className="relative -mt-[1px] rounded-t-[30px] bg-white px-[30px] pb-8 pt-[31px] shadow-[0_-4px_18px_rgba(0,0,0,0.04)]">
          <div className="flex h-[68px] items-center rounded-[13px] bg-[#f1f1f1] px-[14px] text-[#364463]">
            <button type="button" className="flex min-w-0 flex-1 items-center justify-between text-left text-[15px] leading-[1.3]" onClick={() => setShowTotal(false)}>
              <span>28 Sep<br />2026</span><ChevronDown className="h-4 w-4 shrink-0 text-[#222]" />
            </button>
            <span className="mx-[9px] h-[52px] w-[2px] bg-[#c9c9c9]" />
            <button type="button" className="flex min-w-0 flex-1 items-center justify-between text-left text-[15px] leading-[1.3]" onClick={() => setShowTotal(false)}>
              <span>28 Okt<br />2026</span><ChevronDown className="h-5 w-5 shrink-0 text-[#222]" />
            </button>
          </div>

          <div className="mt-[34px] flex items-center gap-[14px]">
            <div className="relative min-w-0 flex-1">
              <button type="button" onClick={() => setProductOpen((open) => !open)} className="flex h-[78px] w-full items-center justify-between rounded-[13px] bg-[#f1f1f1] px-[16px] text-left text-[15px] text-[#929292]">
                <span className="truncate">{product}</span><ChevronDown className="h-6 w-6 shrink-0 text-[#858585]" />
              </button>
              {productOpen ? (
                <div className="absolute left-0 right-0 top-[99px] z-20 overflow-hidden rounded-[14px] border border-slate-100 bg-white shadow-lg">
                  {["Semua Produk", "Simpanan Sukarela", "Simpanan Wajib"].map((item) => (
                    <button key={item} type="button" className="block w-full px-4 py-2.5 text-left text-[14px] text-slate-700 hover:bg-slate-50" onClick={() => { setProduct(item); setProductOpen(false); }}>
                      {item}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button type="button" onClick={() => setShowTotal((visible) => !visible)} className="h-[58px] shrink-0 rounded-full bg-[#004FC7] px-[16px] text-[15px] font-medium text-white shadow-sm transition active:scale-[0.98]">Lihat Total &gt;</button>
          </div>

          {showTotal ? <div className="mt-3 rounded-xl bg-[#eaf1ff] px-4 py-3 text-center text-[15px] font-bold text-[#004FC7]">Total {activeTab}: Rp. 20.000,00</div> : null}

          <div className="mt-[28px] space-y-[25px]">
            {entries.map((entry, index) => (
              <article key={`${entry.account}-${index}`} className="relative min-h-[185px] overflow-hidden rounded-[20px] border border-[#e5e5e5] bg-white pl-[70px] pr-[13px] pt-[14px] shadow-[0_2px_5px_rgba(0,0,0,0.16)]">
                <div className="absolute left-0 top-0 flex h-[60px] w-[58px] items-center justify-center rounded-br-[20px] bg-[#303030] text-[23px] font-bold text-white">{index + 1}</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 text-[16px] font-extrabold leading-[1.2] text-black">
                    <div>{entry.name}</div><div>{entry.account}</div>
                  </div>
                  <div className="shrink-0 text-right text-[16px] font-extrabold leading-[1.18] text-[#43ad58]">{entry.amount}</div>
                </div>
                <div className="mt-[8px] text-[14px] font-semibold leading-tight text-[#a1a1a1]">{entry.type}</div>
                <div className="absolute right-[13px] top-[55px] text-right text-[13px] font-semibold leading-[1.45] text-[#858585]">{entry.date}<br />{entry.time}</div>
                <button type="button" className="mt-[15px] rounded-full bg-[#f3bf2e] px-[20px] py-[9px] text-[13px] font-extrabold text-white">Belum Diverifikasi</button>
              </article>
            ))}
          </div>
        </main>
      </div>

      <EKolektorBottomNav activeTab="report" onHomeClick={onHome} onTransactionClick={onTransactions} onReportClick={() => {}} onAndroidBack={onBack} />
    </div>
  );
}
