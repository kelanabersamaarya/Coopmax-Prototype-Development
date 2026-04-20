import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Eye, Plus, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Row = {
  id: string;
  noRekening: string;
  produk: string;
  nasabahId: string;
  nasabahNama: string;
  status: "Aktif" | "Lunas" | "Macet";
  sisaPokok: string;
};

const seed: Row[] = [
  {
    id: "RP-260001",
    noRekening: "SMG260004",
    produk: "Pinjaman Billing",
    nasabahId: "N2500010",
    nasabahNama: "Gaby",
    status: "Aktif",
    sisaPokok: "10.000.000,00",
  },
  {
    id: "RP-260002",
    noRekening: "SMG260018",
    produk: "Pinjaman Bulanan 9",
    nasabahId: "N2400029",
    nasabahNama: "Pangeran Sirait",
    status: "Lunas",
    sisaPokok: "0,00",
  },
  {
    id: "RP-260003",
    noRekening: "SMG260021",
    produk: "Pinjaman Harian",
    nasabahId: "N2400033",
    nasabahNama: "Rika Wastuti",
    status: "Macet",
    sisaPokok: "3.250.000,00",
  },
];

function StatusBadge({ status }: { status: Row["status"] }) {
  const map: Record<Row["status"], string> = {
    Aktif: "bg-emerald-600 text-white hover:bg-emerald-600",
    Lunas: "bg-slate-200 text-slate-800 hover:bg-slate-200",
    Macet: "bg-rose-600 text-white hover:bg-rose-600",
  };
  return <Badge className={cn("rounded-md px-3", map[status])}>{status}</Badge>;
}

export default function RekeningPinjaman() {
  const rows = React.useMemo(() => seed, []);

  const [qRek, setQRek] = React.useState("");
  const [qNasabah, setQNasabah] = React.useState("");
  const [qProduk, setQProduk] = React.useState("");

  const filtered = React.useMemo(() => {
    const rekQ = qRek.trim().toLowerCase();
    const nasabahQ = qNasabah.trim().toLowerCase();
    const produkQ = qProduk.trim().toLowerCase();

    return rows.filter((r) => {
      const okRek = rekQ ? r.noRekening.toLowerCase().includes(rekQ) : true;
      const okNasabah = nasabahQ
        ? `${r.nasabahId} ${r.nasabahNama}`.toLowerCase().includes(nasabahQ)
        : true;
      const okProduk = produkQ ? r.produk.toLowerCase().includes(produkQ) : true;
      return okRek && okNasabah && okProduk;
    });
  }, [qNasabah, qProduk, qRek, rows]);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Rekening Pinjaman
              </h1>
              <div className="text-sm font-semibold text-slate-500">Daftar</div>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Daftar rekening pinjaman (prototype) untuk navigasi modul Pinjaman.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800 hover:bg-slate-50"
          >
            <Link to="/loans/accounts/new" onClick={(e) => e.preventDefault()}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah
            </Link>
          </Button>
        </div>

        <Separator className="my-6 bg-slate-200/70" />

        <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">Daftar Rekening</div>

            <Button
              variant="outline"
              className="h-9 rounded-xl border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
              onClick={() => {
                setQRek("");
                setQNasabah("");
                setQProduk("");
                toast("Filter direset", { description: "Semua filter kembali kosong." });
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[980px] border-collapse">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                    <th className="w-[70px] px-4 py-3">No.</th>
                    <th className="w-[190px] px-4 py-3">No. Rekening</th>
                    <th className="min-w-[220px] px-4 py-3">Produk</th>
                    <th className="w-[180px] px-4 py-3">Nasabah</th>
                    <th className="w-[150px] px-4 py-3">Status</th>
                    <th className="w-[190px] px-4 py-3 text-right">Sisa Pokok</th>
                    <th className="w-[120px] px-4 py-3">Aksi</th>
                  </tr>

                  <tr className="border-t border-slate-200 bg-white">
                    <th className="px-4 py-2" />
                    <th className="px-4 py-2">
                      <Input
                        value={qRek}
                        onChange={(e) => setQRek(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                        placeholder=""
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Input
                        value={qProduk}
                        onChange={(e) => setQProduk(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                        placeholder=""
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Input
                        value={qNasabah}
                        onChange={(e) => setQNasabah(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                        placeholder=""
                      />
                    </th>
                    <th className="px-4 py-2" />
                    <th className="px-4 py-2" />
                    <th className="px-4 py-2" />
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-sm text-slate-600"
                      >
                        Tidak ada data yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r, idx) => (
                      <tr key={r.id} className="border-t border-slate-100 text-sm">
                        <td className="px-4 py-3 text-slate-700">{idx + 1}</td>

                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() =>
                              toast("Detail rekening (prototype)", {
                                description: r.noRekening,
                              })
                            }
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            {r.noRekening}
                          </button>
                        </td>

                        <td className="px-4 py-3 text-slate-900">{r.produk}</td>

                        <td className="px-4 py-3 text-slate-800">
                          <div className="font-semibold text-slate-900">{r.nasabahNama}</div>
                          <div className="text-xs text-slate-600">{r.nasabahId}</div>
                        </td>

                        <td className="px-4 py-3">
                          <StatusBadge status={r.status} />
                        </td>

                        <td className="px-4 py-3 text-right font-semibold text-slate-900">
                          {r.sisaPokok}
                        </td>

                        <td className="px-4 py-3">
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-white"
                            onClick={() =>
                              toast("Lihat (prototype)", { description: r.noRekening })
                            }
                            aria-label="Lihat"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-600">
            Menampilkan 1 sampai {filtered.length} dari {filtered.length} entri
          </div>
        </Card>
      </div>
    </div>
  );
}