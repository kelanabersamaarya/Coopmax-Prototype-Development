import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, History } from "lucide-react";
import { toast } from "sonner";
import NasabahPickerDialog, {
  type Nasabah,
} from "@/components/anggota/NasabahPickerDialog";
import TransaksiAnggotaView1 from "@/components/anggota/TransaksiAnggotaView1";
import TransaksiAnggotaView2 from "@/components/anggota/TransaksiAnggotaView2";

export default function AnggotaTransaksi() {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Nasabah | null>(null);

  // Seed dialog saat ini: index 0 = "Gaby", index 1 = "Nyoman Ariana", index 2 = "Komang Dewa"
  const showView1 = selected?.nama === "Gaby";
  const showView2 = selected?.nama === "Nyoman Ariana";

  return (
    <div className="min-h-[calc(100vh-2rem)] rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur md:p-6">
      <NasabahPickerDialog
        open={open}
        onOpenChange={setOpen}
        onPick={(n) => {
          setSelected(n);
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

        {selected ? (
          <div className="text-sm text-slate-800">
            <div>
              <span className="font-semibold">No. Nasabah</span> :{" "}
              <span className="font-semibold">{selected.id}</span>
            </div>
            <div>
              <span className="font-semibold">Nama Nasabah</span> :{" "}
              <span className="font-semibold">{selected.nama}</span>
            </div>
            <div>
              <span className="font-semibold">Alamat Nasabah</span> :{" "}
              <span className="font-semibold">{selected.alamat}</span>
            </div>
          </div>
        ) : null}

        <div className="mt-3">
          {showView1 && selected ? (
            <TransaksiAnggotaView1 nasabah={selected} />
          ) : showView2 && selected ? (
            <TransaksiAnggotaView2 nasabah={selected} />
          ) : selected ? (
            <div className="rounded-2xl bg-white/80 p-4 text-sm text-slate-700 ring-1 ring-slate-200">
              Tampilan untuk nasabah ini belum dibuat. (Saat ini baru anggota
              pertama & kedua yang memiliki tampilan khusus.)
            </div>
          ) : (
            <div className="rounded-2xl bg-white/80 p-4 text-sm text-slate-700 ring-1 ring-slate-200">
              Klik tombol <span className="font-semibold">Cari</span> untuk memilih nasabah.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 border-t border-slate-200/70 pt-4 text-sm text-slate-500">
        © 2026 PT. Solusi Anak Sakti
      </div>
    </div>
  );
}