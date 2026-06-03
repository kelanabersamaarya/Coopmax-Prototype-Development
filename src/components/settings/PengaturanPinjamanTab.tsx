"use client";

import * as React from "react";
import { CheckSquare, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function FieldRow({
  label,
  children,
  align = "center",
}: {
  label: string;
  children: React.ReactNode;
  align?: "center" | "top";
}) {
  return (
    <div
      className={cn(
        "grid gap-3 md:grid-cols-[260px_minmax(0,1fr)]",
        align === "top" ? "md:items-start" : "md:items-center",
      )}
    >
      <div
        className={cn(
          "text-[14px] font-normal text-black",
          align === "top" ? "pt-[6px]" : "",
        )}
      >
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function PengaturanPinjamanTab() {
  const [pinjamanAktif, setPinjamanAktif] = React.useState(true);
  const [pendaftaranOnline, setPendaftaranOnline] = React.useState(true);
  const [simulasiPinjaman, setSimulasiPinjaman] = React.useState(true);
  const [judul, setJudul] = React.useState("Pinjaman Koperasi");
  const [deskripsi, setDeskripsi] = React.useState(
    "Ajukan pinjaman koperasi dengan proses mudah, cepat, dan transparan.",
  );
  const [ketentuan, setKetentuan] = React.useState(
    "Pastikan data pengajuan, dokumen pendukung, dan nominal pinjaman sudah sesuai.",
  );

  const inputClass = cn(
    "h-[30px] rounded-[5px] border-slate-300 bg-white px-3",
    "text-[12.5px] font-normal text-black shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const textareaClass = cn(
    "min-h-[92px] rounded-[5px] border-slate-300 bg-white px-3 py-2",
    "text-[12.5px] font-normal text-black shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const actionButtonClass = cn(
    "inline-flex h-[28px] w-[90px] items-center justify-center gap-1.5",
    "rounded-[6px] px-2 text-[11px] font-bold tracking-tight text-white",
    "ring-1 transition focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="mt-8 w-full max-w-[980px]">
      <div className="grid gap-[15px]">
        <FieldRow label="Pinjaman">
          <Switch checked={pinjamanAktif} onCheckedChange={setPinjamanAktif} />
        </FieldRow>

        <FieldRow label="Pendaftaran Pinjaman Online">
          <Switch
            checked={pendaftaranOnline}
            onCheckedChange={setPendaftaranOnline}
          />
        </FieldRow>

        <FieldRow label="Simulasi Pinjaman">
          <Switch
            checked={simulasiPinjaman}
            onCheckedChange={setSimulasiPinjaman}
          />
        </FieldRow>

        <FieldRow label="Judul Halaman Pinjaman">
          <Input
            value={judul}
            onChange={(event) => setJudul(event.target.value)}
            className={inputClass}
          />
        </FieldRow>

        <FieldRow label="Gambar Halaman Pinjaman" align="top">
          <button
            type="button"
            onClick={() =>
              toast("Upload gambar (prototype)", {
                description: "Pemilihan gambar belum disimpan permanen.",
              })
            }
            className={cn(
              "flex min-h-[96px] w-full items-center justify-center rounded-[5px]",
              "border border-dashed border-slate-300 bg-white",
              "transition hover:bg-slate-50",
            )}
          >
            <div className="flex flex-col items-center gap-2 px-4 py-4 text-center">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] bg-slate-100 text-slate-700">
                <ImagePlus className="h-5 w-5" />
              </span>
              <div className="text-[12.5px] font-normal text-slate-700">
                Pilih gambar
              </div>
            </div>
          </button>
        </FieldRow>

        <FieldRow label="Deskripsi Halaman Pinjaman" align="top">
          <Textarea
            value={deskripsi}
            onChange={(event) => setDeskripsi(event.target.value)}
            className={textareaClass}
          />
        </FieldRow>

        <FieldRow label="Ketentuan Halaman Pinjaman" align="top">
          <Textarea
            value={ketentuan}
            onChange={(event) => setKetentuan(event.target.value)}
            className={textareaClass}
          />
        </FieldRow>

        <div className="grid gap-3 md:grid-cols-[260px_minmax(0,1fr)] md:items-center">
          <div />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() =>
                toast("Dibatalkan", {
                  description: "Perubahan pengaturan pinjaman tidak disimpan.",
                })
              }
              className={cn(
                actionButtonClass,
                "bg-[#77839A] ring-[#77839A]/25 hover:bg-[#6b768c]",
              )}
            >
              <X className="h-4 w-4" strokeWidth={3} />
              Batal
            </button>

            <button
              type="button"
              onClick={() =>
                toast.success("Pengaturan pinjaman tersimpan (prototype)", {
                  description: judul,
                })
              }
              className={cn(
                actionButtonClass,
                "bg-[#2fb300] ring-[#2fb300]/25 hover:bg-[#279800]",
              )}
            >
              <CheckSquare className="h-4 w-4" strokeWidth={3} />
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}