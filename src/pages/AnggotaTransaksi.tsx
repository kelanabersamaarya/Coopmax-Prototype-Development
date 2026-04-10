import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, History } from "lucide-react";
import { toast } from "sonner";
import NasabahPickerDialog from "@/components/anggota/NasabahPickerDialog";

export default function AnggotaTransaksi() {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-[calc(100vh-2rem)] rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur md:p-6">
      <NasabahPickerDialog
        open={open}
        onOpenChange={setOpen}
        onPick={(n) => {
          setQuery(n.id);
          setOpen(false);
          toast.success("Nasabah dipilih", {
            description: `${n.nama} • ${n.noIdentitas}`,
          });
        }}
      />

      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Transaksi
        </h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:max-w-md">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              placeholder="No Nasabah/No Rekening"
              className="h-11 rounded-xl border-slate-300 bg-white"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => setOpen(true)}
              className="h-11 rounded-xl bg-[hsl(var(--app-accent))] px-5 text-white hover:bg-[hsl(var(--app-accent-2))]"
            >
              <Search className="mr-2 h-4 w-4" />
              Cari
            </Button>

            <Button
              onClick={() => {
                toast("Riwayat Transaksi (prototype)", {
                  description: "Halaman riwayat belum dibuat.",
                });
              }}
              className="h-11 rounded-xl bg-[hsl(var(--app-accent))] px-5 text-white hover:bg-[hsl(var(--app-accent-2))]"
            >
              <History className="mr-2 h-4 w-4" />
              Riwayat Transaksi
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-200/70 pt-4 text-sm text-slate-500">
        © 2026 PT. Solusi Anak Sakti
      </div>
    </div>
  );
}