import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusFilter = "Semua" | "Aktif / Sudah Dicairkan" | "Lunas" | "Macet";

type Row = {
  id: string;
  noRekening: string;
  tanggalDaftar: string;
  produkPinjaman: string;
  idNasabah: string;
  namaNasabah: string;
  nominal: string;
  sisaPinjaman: string;
  bungaPerTahun: string;
  status: Exclude<StatusFilter, "Semua">;
};

const seed: Row[] = [
  {
    id: "RP-260001",
    noRekening: "SMG260004",
    tanggalDaftar: "07-04-2026",
    produkPinjaman: "Pinjaman Bulanan 9",
    idNasabah: "N2600006",
    namaNasabah: "Bapak Bagus",
    nominal: "12.000.000,00",
    sisaPinjaman: "10.553.571,00",
    bungaPerTahun: "12.00",
    status: "Aktif / Sudah Dicairkan",
  },
  {
    id: "RP-260002",
    noRekening: "klpk04.07260001",
    tanggalDaftar: "10-02-2026",
    produkPinjaman: "Pinjaman Bulanan 1",
    idNasabah: "N2500009",
    namaNasabah: "indah sari",
    nominal: "10.000.000,00",
    sisaPinjaman: "8.645.833,33",
    bungaPerTahun: "11.50",
    status: "Aktif / Sudah Dicairkan",
  },
  {
    id: "RP-260003",
    noRekening: "SMG260021",
    tanggalDaftar: "26-06-2024",
    produkPinjaman: "Pinjaman Harian",
    idNasabah: "N2400033",
    namaNasabah: "Rika Wastuti",
    nominal: "3.500.000,00",
    sisaPinjaman: "3.250.000,00",
    bungaPerTahun: "20.00",
    status: "Macet",
  },
];

function shortenAccountNo(v: string) {
  const s = v.trim();
  if (s.length <= 10) return s;
  const head = s.slice(0, 6);
  const tail = s.slice(-4);
  return `${head}…${tail}`;
}

function StatusBadge({ status }: { status: Row["status"] }) {
  const map: Record<Row["status"], { className: string; label: string }> = {
    "Aktif / Sudah Dicairkan": {
      className: "bg-emerald-600 text-white hover:bg-emerald-600",
      label: "Aktif / Sudah Dicairkan",
    },
    Lunas: {
      className: "bg-slate-200 text-slate-800 hover:bg-slate-200",
      label: "Lunas",
    },
    Macet: {
      className: "bg-rose-600 text-white hover:bg-rose-600",
      label: "Macet",
    },
  };

  const v = map[status];
  return (
    <Badge
      className={cn(
        "whitespace-nowrap rounded-md px-2.5 py-1 text-[12px]",
        v.className,
      )}
    >
      {v.label}
    </Badge>
  );
}

export default function RekeningPinjaman() {
  const rows = React.useMemo(() => seed, []);

  const [pageSize, setPageSize] = React.useState<number>(20);

  const [qNoRek, setQNoRek] = React.useState("");
  const [qTanggal, setQTanggal] = React.useState("");
  const [qProduk, setQProduk] = React.useState<string>("Semua");
  const [qIdNasabah, setQIdNasabah] = React.useState("");
  const [qNamaNasabah, setQNamaNasabah] = React.useState("");
  const [qNominal, setQNominal] = React.useState("0,00");
  const [qSisa, setQSisa] = React.useState("0,00");
  const [qBunga, setQBunga] = React.useState("");
  const [qStatus, setQStatus] = React.useState<StatusFilter>("Semua");

  const productOptions = React.useMemo(() => {
    const set = new Set<string>(rows.map((r) => r.produkPinjaman));
    return ["Semua", ...Array.from(set)];
  }, [rows]);

  const filtered = React.useMemo(() => {
    const noRekQ = qNoRek.trim().toLowerCase();
    const tanggalQ = qTanggal.trim().toLowerCase();
    const produkQ = qProduk;
    const idQ = qIdNasabah.trim().toLowerCase();
    const namaQ = qNamaNasabah.trim().toLowerCase();
    const bungaQ = qBunga.trim().toLowerCase();
    const statusQ = qStatus;

    return rows.filter((r) => {
      const okNoRek = noRekQ ? r.noRekening.toLowerCase().includes(noRekQ) : true;
      const okTanggal = tanggalQ
        ? r.tanggalDaftar.toLowerCase().includes(tanggalQ)
        : true;
      const okProduk = produkQ === "Semua" ? true : r.produkPinjaman === produkQ;
      const okId = idQ ? r.idNasabah.toLowerCase().includes(idQ) : true;
      const okNama = namaQ ? r.namaNasabah.toLowerCase().includes(namaQ) : true;
      const okBunga = bungaQ ? r.bungaPerTahun.toLowerCase().includes(bungaQ) : true;
      const okStatus = statusQ === "Semua" ? true : r.status === statusQ;

      const okNominal = true;
      const okSisa = true;

      return (
        okNoRek &&
        okTanggal &&
        okProduk &&
        okId &&
        okNama &&
        okNominal &&
        okSisa &&
        okBunga &&
        okStatus
      );
    });
  }, [
    qBunga,
    qIdNasabah,
    qNamaNasabah,
    qNoRek,
    qProduk,
    qStatus,
    qTanggal,
    qNominal,
    qSisa,
    rows,
  ]);

  const paged = React.useMemo(
    () => filtered.slice(0, pageSize),
    [filtered, pageSize],
  );

  // padding dibuat lebih rapat
  const th = "px-2 py-2.5";
  const td = "px-2 py-3";
  const filterCell = "px-2 py-2";

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
          </div>
        </div>

        <Separator className="my-6 bg-slate-200/70" />

        <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm text-slate-700">Tampilkan</div>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => setPageSize(Number(v))}
              >
                <SelectTrigger className="h-9 w-[92px] rounded-xl border-slate-200 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200">
                  {[10, 20, 50, 100].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-slate-700">entri</div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[1080px] border-collapse">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                    <th className={cn("w-[64px] whitespace-nowrap", th)}>No.</th>
                    <th className={cn("w-[140px]", th)}>No. Rekening</th>
                    <th className={cn("w-[140px]", th)}>Tanggal Daftar</th>
                    <th className={cn("w-[180px]", th)}>Produk Pinjaman</th>
                    <th className={cn("w-[140px]", th)}>ID. Nasabah</th>
                    <th className={cn("w-[170px]", th)}>Nama Nasabah</th>
                    <th className={cn("w-[170px] text-right", th)}>Nominal</th>
                    <th className={cn("w-[170px] text-right", th)}>Sisa Pinjaman</th>
                    <th className={cn("w-[150px]", th)}>Bunga / Tahun</th>
                    <th className={cn("w-[190px]", th)}>Status</th>
                  </tr>

                  <tr className="border-t border-slate-200 bg-white">
                    <th className={filterCell} />
                    <th className={filterCell}>
                      <Input
                        value={qNoRek}
                        onChange={(e) => setQNoRek(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                        placeholder=""
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={qTanggal}
                        onChange={(e) => setQTanggal(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                        placeholder=""
                      />
                    </th>
                    <th className={filterCell}>
                      <Select value={qProduk} onValueChange={setQProduk}>
                        <SelectTrigger className="h-9 rounded-xl border-slate-200 bg-white text-sm">
                          <SelectValue placeholder="-- Semua --" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          {productOptions.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p === "Semua" ? "-- Semua --" : p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={qIdNasabah}
                        onChange={(e) => setQIdNasabah(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                        placeholder=""
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={qNamaNasabah}
                        onChange={(e) => setQNamaNasabah(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                        placeholder=""
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={qNominal}
                        onChange={(e) => setQNominal(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm text-right tabular-nums"
                        placeholder="0,00"
                        inputMode="decimal"
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={qSisa}
                        onChange={(e) => setQSisa(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm text-right tabular-nums"
                        placeholder="0,00"
                        inputMode="decimal"
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={qBunga}
                        onChange={(e) => setQBunga(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm tabular-nums"
                        placeholder=""
                        inputMode="decimal"
                      />
                    </th>
                    <th className={filterCell}>
                      <Select
                        value={qStatus}
                        onValueChange={(v) => setQStatus(v as StatusFilter)}
                      >
                        <SelectTrigger className="h-9 rounded-xl border-slate-200 bg-white text-sm">
                          <SelectValue placeholder="-- Semua --" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">-- Semua --</SelectItem>
                          <SelectItem value="Aktif / Sudah Dicairkan">
                            Aktif / Sudah Dicairkan
                          </SelectItem>
                          <SelectItem value="Lunas">Lunas</SelectItem>
                          <SelectItem value="Macet">Macet</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {paged.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-4 py-10 text-center text-sm text-slate-600"
                      >
                        Tidak ada data yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    paged.map((r, idx) => (
                      <tr
                        key={r.id}
                        className="border-t border-slate-100 text-sm align-top"
                      >
                        <td className={cn(td, "text-slate-700 tabular-nums")}>
                          {idx + 1}
                        </td>

                        <td className={cn(td, "whitespace-nowrap")}>
                          <button
                            type="button"
                            onClick={() =>
                              window.alert(`Detail rekening: ${r.noRekening}`)
                            }
                            className="font-semibold text-blue-600 hover:underline"
                            title={r.noRekening}
                          >
                            {shortenAccountNo(r.noRekening)}
                          </button>
                        </td>

                        <td
                          className={cn(td, "whitespace-nowrap text-slate-800 tabular-nums")}
                        >
                          {r.tanggalDaftar}
                        </td>

                        <td className={cn(td, "text-slate-900")}>{r.produkPinjaman}</td>

                        <td
                          className={cn(td, "whitespace-nowrap text-slate-800 tabular-nums")}
                        >
                          {r.idNasabah}
                        </td>

                        <td className={cn(td, "text-slate-900")}>{r.namaNasabah}</td>

                        <td
                          className={cn(
                            td,
                            "whitespace-nowrap text-right font-semibold text-slate-900 tabular-nums",
                          )}
                        >
                          {r.nominal}
                        </td>

                        <td
                          className={cn(
                            td,
                            "whitespace-nowrap text-right font-semibold text-slate-900 tabular-nums",
                          )}
                        >
                          {r.sisaPinjaman}
                        </td>

                        <td
                          className={cn(td, "whitespace-nowrap text-slate-800 tabular-nums")}
                        >
                          {r.bungaPerTahun}
                        </td>

                        <td className={cn(td, "whitespace-nowrap")}>
                          <StatusBadge status={r.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-600">
            Menampilkan 1 sampai {paged.length} dari {filtered.length} entri
          </div>
        </Card>
      </div>
    </div>
  );
}