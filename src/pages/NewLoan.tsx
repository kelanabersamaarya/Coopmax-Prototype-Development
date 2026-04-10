import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getLoanProducts, LoanProduct } from "@/lib/loanProductsStore";
import { toast } from "sonner";
import { Check, ChevronDown, FileText, Sparkles } from "lucide-react";

export default function NewLoan() {
  const products = useMemo(() => getLoanProducts(), []);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo<LoanProduct | null>(() => {
    if (!selectedId) return null;
    return products.find((p) => p.id === selectedId) ?? null;
  }, [products, selectedId]);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
        <div className="flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 backdrop-blur">
            <FileText className="h-3.5 w-3.5 text-[hsl(var(--app-accent))]" />
            Pembuatan pinjaman — 1 halaman
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Buat Pinjaman Baru
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Pilih produk pinjaman untuk menentukan skema dasar. Untuk prototype,
            aksi hanya menampilkan toast.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <Card className="rounded-3xl border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Produk Pinjaman
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Gunakan combobox untuk mencari cepat.
                </div>
              </div>
              <Badge className="rounded-full bg-[hsl(var(--app-accent))]/10 text-[hsl(var(--app-accent-2))] hover:bg-[hsl(var(--app-accent))]/10">
                Wajib
              </Badge>
            </div>

            <Separator className="my-4 bg-slate-200/70" />

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-2xl border-slate-200 bg-white/70 text-slate-900 hover:bg-white"
                >
                  <span className={selected ? "" : "text-slate-500"}>
                    {selected ? selected.name : "Pilih Produk Pinjaman…"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] rounded-2xl border-slate-200 p-0" align="start">
                <Command className="rounded-2xl">
                  <CommandInput placeholder="Cari produk…" />
                  <CommandList>
                    <CommandEmpty>Tidak ada produk.</CommandEmpty>
                    <CommandGroup heading="Katalog">
                      {products.map((p) => (
                        <CommandItem
                          key={p.id}
                          value={p.name}
                          onSelect={() => {
                            setSelectedId(p.id);
                            setOpen(false);
                          }}
                          className="rounded-xl"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium">
                                {p.name}
                              </div>
                              <div className="mt-0.5 text-xs text-slate-600">
                                {p.billingScheme} • {p.tenorMonths} bln
                              </div>
                            </div>
                          </div>
                          {selectedId === p.id ? (
                            <Check className="h-4 w-4 text-[hsl(var(--app-accent-2))]" />
                          ) : null}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => {
                  if (!selected) {
                    toast("Pilih produk dulu", {
                      description: "Produk pinjaman wajib dipilih sebelum lanjut.",
                    });
                    return;
                  }
                  toast.success("Draft disimpan", {
                    description: `Produk terpilih: ${selected.name}`,
                  });
                }}
                className="rounded-full bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-2))]"
              >
                Simpan Draft
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (!selected) {
                    toast("Pilih produk dulu", {
                      description: "Produk pinjaman wajib dipilih sebelum lanjut.",
                    });
                    return;
                  }
                  toast("Lanjutkan (prototype)", {
                    description: "Tahap berikutnya belum termasuk dalam scope.",
                  });
                }}
                className="rounded-full border-slate-200 bg-white/60 hover:bg-white"
              >
                Lanjutkan
              </Button>
            </div>
          </Card>

          <Card className="rounded-3xl border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Ringkasan Produk
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Read-only, muncul setelah memilih produk.
                </div>
              </div>
              <Sparkles className="h-4 w-4 text-[hsl(var(--app-accent-2))]" />
            </div>

            <Separator className="my-4 bg-slate-200/70" />

            {!selected ? (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
                Belum ada produk yang dipilih.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-xs font-medium text-slate-600">Nama</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {selected.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="text-xs font-medium text-slate-600">
                      Skema billing
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      {selected.billingScheme}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="text-xs font-medium text-slate-600">Grace</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      {selected.gracePeriodDays} hari
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="text-xs font-medium text-slate-600">
                      Tenor
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      {selected.tenorMonths} bulan
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="text-xs font-medium text-slate-600">
                      Bunga
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      {selected.interestRateYearly}% / tahun
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
