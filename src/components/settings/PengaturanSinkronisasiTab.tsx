"use client";

import * as React from "react";
import { CheckSquare, Minus, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type ToggleSyncSetting = {
  id: string;
  label: string;
  type: "toggle";
  defaultValue?: boolean;
};

type NumberSyncSetting = {
  id: string;
  label: string;
  type: "number";
  defaultValue: number;
};

type SyncSetting = ToggleSyncSetting | NumberSyncSetting;

const syncSettings: SyncSetting[] = [
  {
    id: "sync-bank",
    label: "Sync Bank",
    type: "toggle",
    defaultValue: true,
  },
  {
    id: "sync-jenis-tagihan",
    label: "Sync Jenis Tagihan",
    type: "toggle",
    defaultValue: true,
  },
  {
    id: "jumlah-hari-sync-transaksi-tabungan",
    label: "Jumlah Hari Sync Transaksi Tabungan",
    type: "number",
    defaultValue: 30,
  },
  {
    id: "jumlah-hari-sync-transaksi-deposito",
    label: "Jumlah Hari Sync Transaksi Deposito",
    type: "number",
    defaultValue: 30,
  },
  {
    id: "jumlah-hari-sync-transaksi-pinjaman",
    label: "Jumlah Hari Sync Transaksi Pinjaman",
    type: "number",
    defaultValue: 30,
  },
  {
    id: "periode-tagihan-sync",
    label: "Pengaturan berapa periode tagihan yang dapat di sync",
    type: "number",
    defaultValue: 3,
  },
];

function TogglePill({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[22px] w-[48px] shrink-0 items-center rounded-full px-[2px]",
        "transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        checked ? "bg-[#635BFF]" : "bg-[#A89BFF]",
      )}
      aria-pressed={checked}
    >
      <span
        className={cn(
          "absolute text-[9px] font-bold leading-none text-white transition",
          checked ? "left-[7px]" : "right-[6px]",
        )}
      >
        {checked ? "ON" : "OFF"}
      </span>

      <span
        className={cn(
          "relative z-10 h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[26px]" : "translate-x-0",
        )}
      />
    </button>
  );
}

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
          "inline-flex h-[30px] w-[42px] items-center justify-center",
          "bg-[#77839A] text-white transition hover:bg-[#6b768c]",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
        aria-label="Kurangi nilai"
        title="Kurangi"
      >
        <Minus className="h-4 w-4" strokeWidth={3} />
      </button>

      <Input
        value={String(value)}
        onChange={(event) => {
          const next = Number(event.target.value.replace(/[^\d]/g, ""));
          update(Number.isFinite(next) ? next : 0);
        }}
        inputMode="numeric"
        className={cn(
          "h-[30px] min-w-0 flex-1 rounded-none border-0 bg-white px-3",
          "text-center text-[12px] font-normal text-black shadow-none",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
      />

      <button
        type="button"
        onClick={() => update(value + 1)}
        className={cn(
          "inline-flex h-[30px] w-[42px] items-center justify-center",
          "bg-[#77839A] text-white transition hover:bg-[#6b768c]",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
        aria-label="Tambah nilai"
        title="Tambah"
      >
        <Plus className="h-4 w-4" strokeWidth={3} />
      </button>
    </div>
  );
}

export default function PengaturanSinkronisasiTab() {
  const [toggleValues, setToggleValues] = React.useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        syncSettings
          .filter((item): item is ToggleSyncSetting => item.type === "toggle")
          .map((item) => [item.id, item.defaultValue ?? false]),
      ),
  );

  const [numberValues, setNumberValues] = React.useState<Record<string, number>>(
    () =>
      Object.fromEntries(
        syncSettings
          .filter((item): item is NumberSyncSetting => item.type === "number")
          .map((item) => [item.id, item.defaultValue]),
      ),
  );

  function saveSettings() {
    toast.success("Pengaturan sinkronisasi tersimpan", {
      description: "Semua pengaturan sinkronisasi berhasil diperbarui.",
    });
  }

  return (
    <div className="mt-8 w-full rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
      <div className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white">
        <div className="flex min-h-[55px] items-center gap-4 bg-[#F7F8FC] px-[20px]">
          <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F6BFF] text-white shadow-sm">
            <RefreshCw className="h-[18px] w-[18px]" strokeWidth={3} />
          </span>

          <div className="text-[15px] font-bold text-black">
            Pengaturan Sinkronisasi
          </div>
        </div>

        {syncSettings.map((item) => (
          <div
            key={item.id}
            className={cn(
              "grid min-h-[42px] grid-cols-[minmax(0,1fr)_minmax(300px,380px)] items-center",
              "border-t border-[#D7DEE9] px-[13px] text-[12px] font-normal text-black",
            )}
          >
            <div className="min-w-0 pr-4 leading-snug">{item.label}</div>

            <div className="flex min-w-0 justify-end">
              {item.type === "toggle" ? (
                <TogglePill
                  checked={toggleValues[item.id] ?? false}
                  onChange={(value) =>
                    setToggleValues((current) => ({
                      ...current,
                      [item.id]: value,
                    }))
                  }
                />
              ) : null}

              {item.type === "number" ? (
                <NumberStepper
                  value={numberValues[item.id] ?? item.defaultValue}
                  onChange={(value) =>
                    setNumberValues((current) => ({
                      ...current,
                      [item.id]: value,
                    }))
                  }
                />
              ) : null}
            </div>
          </div>
        ))}
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