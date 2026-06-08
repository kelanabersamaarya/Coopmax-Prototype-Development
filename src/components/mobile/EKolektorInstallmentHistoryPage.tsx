"use client";

import * as React from "react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

type InstallmentHistoryRow = {
  id: string;
  installmentNo: string;
  date: string;
  principal: string;
  interest: string;
  penalty: string;
  total: string;
  status: string;
};

const historyRows: InstallmentHistoryRow[] = [
  {
    id: "hist-1",
    installmentNo: "1",
    date: "25-01-2026",
    principal: "833.333",
    interest: "83.333",
    penalty: "75.000",
    total: "991.666",
    status: "Belum Dibayar",
  },
  {
    id: "hist-2",
    installmentNo: "2",
    date: "25-02-2026",
    principal: "833.333",
    interest: "83.333",
    penalty: "0",
    total: "916.666",
    status: "Belum Dibayar",
  },
  {
    id: "hist-3",
    installmentNo: "3",
    date: "25-03-2026",
    principal: "833.333",
    interest: "83.333",
    penalty: "0",
    total: "916.666",
    status: "Belum Dibayar",
  },
];

function DateField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative min-w-0 flex-1">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode="numeric"
        className={cn(
          "h-[41px] w-full rounded-[9px] border-0 bg-white px-4 pr-10",
          "text-[13px] font-normal text-black shadow-sm",
          "placeholder:text-[13px] placeholder:font-normal placeholder:text-[#9A9A9A]",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
      />

      <CalendarDays
        className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7B7B7B]"
        strokeWidth={2.4}
      />
    </div>
  );
}

function HistoryCard({ row }: { row: InstallmentHistoryRow }) {
  return (
    <div className="rounded-[12px] bg-white px-[15px] py-[14px] shadow-[0_3px_12px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Angsuran Ke-{row.installmentNo}
          </div>
          <div className="mt-[6px] text-[13px] font-semibold leading-tight tracking-tight text-[#63809E]">
            Jatuh Tempo {row.date}
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-[#EF135D]/10 px-3 py-1 text-[11px] font-extrabold leading-none text-[#EF135D]">
          {row.status}
        </span>
      </div>

      <div className="mt-[14px] grid grid-cols-2 gap-x-4 gap-y-[12px] border-t border-[#E8E8E8] pt-[13px]">
        <div>
          <div className="text-[12px] font-semibold leading-tight tracking-tight text-[#9A9A9A]">
            Pokok
          </div>
          <div className="mt-[5px] text-[13px] font-extrabold leading-tight tracking-tight text-[#23305A]">
            Rp. {row.principal}
          </div>
        </div>

        <div>
          <div className="text-[12px] font-semibold leading-tight tracking-tight text-[#9A9A9A]">
            Bunga
          </div>
          <div className="mt-[5px] text-[13px] font-extrabold leading-tight tracking-tight text-[#23305A]">
            Rp. {row.interest}
          </div>
        </div>

        <div>
          <div className="text-[12px] font-semibold leading-tight tracking-tight text-[#9A9A9A]">
            Denda
          </div>
          <div className="mt-[5px] text-[13px] font-extrabold leading-tight tracking-tight text-[#23305A]">
            Rp. {row.penalty}
          </div>
        </div>

        <div>
          <div className="text-[12px] font-semibold leading-tight tracking-tight text-[#9A9A9A]">
            Total
          </div>
          <div className="mt-[5px] text-[13px] font-extrabold leading-tight tracking-tight text-[#004FC7]">
            Rp. {row.total}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EKolektorInstallmentHistoryPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const filteredRows = React.useMemo(() => {
    const start = startDate.trim();
    const end = endDate.trim();

    return historyRows.filter((row) => {
      const matchesStart = start ? row.date.includes(start) : true;
      const matchesEnd = end ? row.date.includes(end) : true;
      return matchesStart && matchesEnd;
    });
  }, [endDate, startDate]);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[116px] overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
          <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
          <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />

          <div className="relative z-10">
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
              aria-label="Kembali"
              title="Kembali"
            >
              <ArrowLeft className="h-[28px] w-[28px]" strokeWidth={2.6} />
            </button>

            <h1 className="mt-3 text-[25px] font-extrabold leading-none tracking-tight text-white">
              Riwayat Angsuran
            </h1>
          </div>
        </header>

        <main className="relative z-10 -mt-[30px] min-h-[calc(100%-86px)] rounded-t-[30px] bg-[#F2F2F2] px-6 pb-8 pt-8">
          <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#004FC7]">
            Pinjaman Billing
          </div>
          <div className="mt-1 text-[14px] font-normal leading-relaxed text-[#9B9B9B]">
            SMG260004 • Gaby
          </div>

          <div className="mt-[22px] flex items-center gap-3">
            <DateField
              value={startDate}
              onChange={setStartDate}
              placeholder="Tanggal awal"
            />
            <DateField
              value={endDate}
              onChange={setEndDate}
              placeholder="Tanggal akhir"
            />
          </div>

          <div className="mt-[20px] grid gap-3">
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => <HistoryCard key={row.id} row={row} />)
            ) : (
              <div className="rounded-[12px] bg-white px-5 py-8 text-center shadow-[0_3px_12px_rgba(15,23,42,0.08)]">
                <div className="text-[16px] font-extrabold tracking-tight text-[#23305A]">
                  Tidak Ada Riwayat Angsuran
                </div>
                <div className="mt-2 text-[12px] font-normal leading-relaxed text-[#8E8E8E]">
                  Data tidak ditemukan berdasarkan filter tanggal.
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}