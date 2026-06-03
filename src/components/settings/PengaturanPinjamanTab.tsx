"use client";

import * as React from "react";
import { ImagePlus, Save, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
        "grid gap-3 md:grid-cols-[220px_minmax(0,1fr)]",
        align === "top" ? "md:items-start" : "md:items-center",
      )}
    >
      <div
        className={cn(
          "text-[14px] font-normal text-slate-900",
          align === "top" ? "pt-2" : "",
        )}
      >
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function PengaturanPinjamanTab() {
  const [loanEnabled, setLoanEnabled] = React.useState(true);
  const [showProductOnline, setShowProductOnline] = React.useState(true);
  const [autoNumbering, setAutoNumbering] = React.useState(true);
  const [title, setTitle] = React.useState("Pinjaman Koperasi");
  const [description, setDescription] = React.useState(
    "Produk pinjaman untuk anggota koperasi dengan proses pengajuan yang mudah dan terarah.",
  );
  const [terms, setTerms] = React.useState(
    "Lengkapi data diri, dokumen pendukung, dan pastikan informasi pengajuan sesuai kebutuhan.",
  );

  const inputClass =
    "h-[34px] rounded-[5px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

  return (
    <Card className="mt-8 rounded-[5px] border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
      <div className="text-[16px] font-semibold tracking-tight text-slate-900">
        Pengaturan Pinjaman
      </div>

      <Separator className="my-5 bg-slate-200/70" />

      <div className="grid gap-[15px]">
        <FieldRow label="Status Pinjaman">
          <div className="flex items-center gap-3">
            <Switch checked={loanEnabled} onCheckedChange={setLoanEnabled} />
            <span className="text-[13px] font-medium text-slate-700">
              {loanEnabled ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
        </FieldRow>

        <FieldRow label="Tampilkan Produk Online">
          <div className="flex items-center gap-3">
            <Switch
              checked={showProductOnline}
              onCheckedChange={setShowProductOnline}
            />
            <span className="text-[13px] font-medium text-slate-700">
              {showProductOnline ? "Ditampilkan" : "Disembunyikan"}
            </span>
          </div>
        </FieldRow>

        <FieldRow label="Nomor Rekening Otomatis">
          <div className="flex items-center gap-3">
            <Switch checked={autoNumbering} onCheckedChange={setAutoNumbering} />
            <span className="text-[13px] font-medium text-slate-700">
              {autoNumbering ? "Aktif" : "Manual"}
            </span>
          </div>
        </FieldRow>

        <FieldRow label="Judul Produk">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={inputClass}
          />
        </FieldRow>

        <FieldRow label="Gambar Produk" align="top">
          <button
            type="button"
            onClick={() =>
              toast("Upload gambar (prototype)", {
                description: "Pemilihan file belum disimpan permanen.",
              })
            }
            className={cn(
              "flex min-h-[118px] w-full items-center justify-center rounded-[5px]",
              "border border-dashed border-slate-300 bg-slate-50/70",
              "text-center transition hover:bg-slate-50",
            )}
          >
            <div className="flex flex-col items-center gap-2 px-4 py-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] bg-white text-slate-700 ring-1 ring-slate-200">
                <ImagePlus className="h-5 w-5" />
              </span>
              <div className="text-[13px] font-semibold text-slate-900">
                Upload Gambar Produk
              </div>
              <div className="text-[12px] font-normal text-slate-500">
                JPG, PNG, atau JPEG.
              </div>
            </div>
          </button>
        </FieldRow>

        <FieldRow label="Deskripsi" align="top">
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-[100px] rounded-[5px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </FieldRow>

        <FieldRow label="Ketentuan" align="top">
          <Textarea
            value={terms}
            onChange={(event) => setTerms(event.target.value)}
            className="min-h-[100px] rounded-[5px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </FieldRow>

        <div className="grid gap-3 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
          <div />
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() =>
                toast.success("Pengaturan pinjaman tersimpan (prototype)", {
                  description: title,
                })
              }
              className="h-[30px] rounded-[5px] bg-[#2fb300] px-4 text-[12px] font-bold text-white hover:bg-[#279800]"
            >
              <Save className="mr-2 h-4 w-4" />
              Simpan
            </Button>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <UploadCloud />
      </div>
    </Card>
  );
}