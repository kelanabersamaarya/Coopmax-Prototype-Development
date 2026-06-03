"use client";

import * as React from "react";
import { CheckSquare, Minus, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

function NumberStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  function update(next: number) {
    onChange(Math.max(0, next));
  }

  return (
    <div className="flex w-full overflow-hidden rounded-[5px] border border-slate-300 bg-white">
      <button
        type="button"
        onClick={() => update(value - 1)}
        className={cn(
          "inline-flex h-[42px] w-[62px] items-center justify-center",
          "bg-[#77839A] text-white transition hover:bg-[#6b768c]",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
        aria-label="Kurangi jumlah hari"
        title="Kurangi"
      >
        <Minus className="h-5 w-5" strokeWidth={3} />
      </button>

      <Input
        value={String(value)}
        onChange={(event) => {
          const next = Number(event.target.value.replace(/[^\d]/g, ""));
          update(Number.isFinite(next) ? next : 0);
        }}
        inputMode="numeric"
        className={cn(
          "h-[42px] min-w-0 flex-1 rounded-none border-0 bg-white px-4",
          "text-center text-[24px] font-normal text-black shadow-none",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
      />

      <button
        type="button"
        onClick={() => update(value + 1)}
        className={cn(
          "inline-flex h-[42px] w-[62px] items-center justify-center",
          "bg-[#77839A] text-white transition hover:bg-[#6b768c]",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
        aria-label="Tambah jumlah hari"
        title="Tambah"
      >
        <Plus className="h-6 w-6" strokeWidth={3} />
      </button>
    </div>
  );
}

export default function PengaturanSinkronisasiTab() {
  const [jumlahHari, setJumlahHari] = React.useState(30);

  function saveSettings() {
    toast.success("Pengaturan sinkronisasi tersimpan", {
      description: `Jumlah hari sync transaksi pinjaman: ${jumlahHari}`,
    });
  }

  return (
    <div className="mt-8 w-full rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
      <div className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white">
        <div className="flex min-h-[72px] items-center gap-5 bg-[#F7F8FC] px-[20px]">
          <span className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#3F6BFF] text-white shadow-sm">
            <RefreshCw className="h-[28px] w-[28px]" strokeWidth={3} />
          </span>

          <div className="text-[24px] font-bold tracking-tight text-black">
            Pengaturan Sinkronisasi
          </div>
        </div>

        <div
          className={cn(
            "grid min-h-[74px] grid-cols-[minmax(0,1fr)_minmax(300px,380px)] items-center",
            "border-t border-[#D7DEE9] px-[13px] text-[24px] font-normal text-black",
          )}
        >
          <div className="min-w-0 pr-4 leading-snug">
            Jumlah Hari Sync Transaksi Pinjaman
          </div>

          <div className="flex min-w-0 justify-end">
            <NumberStepper value={jumlahHari} onChange={setJumlahHari} />
          </div>
        </div>
      </div>

      <div className="mt-[15px] flex justify-end">
        <button
          type="button"
          onClick={saveSettings}
          className={cn(
            "inline-flex h-[28px] w-[90px] items-center justify-center gap-1.5 rounded-[6px]",
            "bg-[#2fb300] px-2 text-[11px] font-bold tracking-tight text-white",
            "ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2fb300]/25",
          )}
        >
          <CheckSquare className="h-4 w-4" strokeWidth={3} />
          Simpan
        </button>
      </div>
    </div>
  );
}