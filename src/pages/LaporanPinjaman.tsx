import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Calculator,
  FileSpreadsheet,
  FileText,
  Printer,
  RefreshCw,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ActionPill({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full bg-white px-4",
        "text-[13px] font-normal text-slate-700",
        "ring-1 ring-slate-200 shadow-sm transition hover:bg-slate-50",
      )}
    >
      <Icon className="h-4 w-4 text-slate-500" />
      {label}
    </button>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
      <div className="text-[13px] font-normal tracking-tight text-black">
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function FieldWrap({ children }: { children: React.ReactNode }) {
  return <div className="w-full md:w-[440px] -mt-0.5">{children}</div>;
}

function DateRangeField({
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  startPlaceholder,
  endPlaceholder,
}: {
  startValue: string;
  endValue: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
  startPlaceholder: string;
  endPlaceholder: string;
}) {
  const inputCls =
    "h-[30px] rounded-[6px] border-slate-200 bg-white text-[12.5px] font-normal text-slate-900 shadow-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0";

  function ClearBtn({ onClick }: { onClick: () => void }) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
        className={cn(
          "absolute right-0 top-0",
          "h-[30px] w-[36px]",
          "rounded-r-[6px] rounded-l-none",
          "bg-slate-600 text-white",
          "ring-1 ring-slate-600/20 transition hover:bg-slate-700",
          "text-[16px] font-semibold leading-none",
        )}
        aria-label="Clear"
        title="Clear"
      >
        ×
      </button>
    );
  }

  return (
    <div className="grid gap-2 md:grid-cols-2">
      <div className="relative">
        <Input
          value={startValue}
          onChange={(e) => onStartChange(e.target.value)}
          placeholder={startPlaceholder}
          className={cn(inputCls, startValue ? "pr-10" : "")}
        />
        {startValue ? <ClearBtn onClick={() => onStartChange("")} /> : null}
      </div>

      <div className="relative">
        <Input
          value={endValue}
          onChange={(e) => onEndChange(e.target.value)}
          placeholder={endPlaceholder}
          className={cn(inputCls, endValue ? "pr-10" : "")}
        />
        {endValue ? <ClearBtn onClick={() => onEndChange("")} /> : null}
      </div>
    </div>
  );
}

export default function LaporanPinjaman() {
  const months = React.useMemo(
    () => [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    [],
  );

  const years = React.useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: 7 }).map((_, i) => String(now - 3 + i));
  }, []);

  const [jenisPinjaman, setJenisPinjaman] = React.useState("Pilih pinjaman");
  const [namaNoRek, setNamaNoRek] = React.useState("");
  const [kolektor, setKolektor] = React.useState("Pilih Kolektor");
  const [wilayah, setWilayah] = React.useState("Pilih wilayah");

  const [tipeKolektibilitas, setTipeKolektibilitas] =
    React.useState<string>("-- Semua --");

  const [kolektibilitasBulan, setKolektibilitasBulan] = React.useState("Mei");
  const [kolektibilitasTahun, setKolektibilitasTahun] =
    React.useState<string>("2026");

  const [jatuhTempoStart, setJatuhTempoStart] = React.useState("");
  const [jatuhTempoEnd, setJatuhTempoEnd] = React.useState("");

  const [jenisKelamin, setJenisKelamin] = React.useState("-- Semua --");
  const [statusPinjaman, setStatusPinjaman] = React.useState(
    "Aktif / Sudah Dicairkan",
  );

  const [aktifStart, setAktifStart] = React.useState("");
  const [aktifEnd, setAktifEnd] = React.useState("");

  const [tanggalSaldo, setTanggalSaldo] = React.useState("");

  const [statusAnggota, setStatusAnggota] =
    React.useState<string>("Pilih Jenis Anggota");

  const [sisaMin, setSisaMin] = React.useState("");
  const [sisaMax, setSisaMax] = React.useState("");

  const actions = [
    {
      label: "Rekapitulasi Kolektibilitas",
      icon: Calculator,
      onClick: () =>
        toast("Rekapitulasi Kolektibilitas (prototype)", {
          description: "Aksi ini belum dihubungkan.",
        }),
    },
    {
      label: "Proses Kolektibilitas",
      icon: RefreshCw,
      onClick: () =>
        toast("Proses Kolektibilitas (prototype)", {
          description: "Aksi ini belum dihubungkan.",
        }),
    },
    {
      label: "Export Excel",
      icon: FileSpreadsheet,
      onClick: () => toast("Export Excel (prototype)"),
    },
    {
      label: "Export PDF",
      icon: FileText,
      onClick: () => toast("Export PDF (prototype)"),
    },
    { label: "Cetak", icon: Printer, onClick: () => toast("Cetak (prototype)") },
  ] as const;

  const selectTriggerCls = cn(
    "h-[30px] w-full justify-between rounded-[6px] border border-slate-200 bg-white px-3",
    "text-[12.5px] font-normal text-slate-900 shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-500",
  );

  const inputCls = cn(
    "h-[30px] w-full rounded-[6px] border border-slate-200 bg-white px-3",
    "text-[12.5px] font-normal text-slate-900 shadow-sm",
    "placeholder:text-slate-500",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))] text-[13px] font-normal">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Pinjaman
          </h1>

          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
            {actions.map((a) => (
              <ActionPill
                key={a.label}
                icon={a.icon}
                label={a.label}
                onClick={a.onClick}
              />
            ))}
          </div>
        </div>

        {/* wrapper Card transparan */}
        <Card className="mt-6 rounded-3xl border-0 bg-transparent p-0 shadow-none">
          <div className="grid gap-4">
            <FieldRow label="Jenis Pinjaman">
              <FieldWrap>
                <Select value={jenisPinjaman} onValueChange={setJenisPinjaman}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="Pilih pinjaman">Pilih pinjaman</SelectItem>
                    <SelectItem value="Pinjaman Bulanan 9">
                      Pinjaman Bulanan 9
                    </SelectItem>
                    <SelectItem value="Pinjaman Harian">Pinjaman Harian</SelectItem>
                    <SelectItem value="Pinjaman Billing">Pinjaman Billing</SelectItem>
                  </SelectContent>
                </Select>
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Nama/No Rekening">
              <FieldWrap>
                <Input
                  value={namaNoRek}
                  onChange={(e) => setNamaNoRek(e.target.value)}
                  placeholder="Masukkan Nama/No Rekening"
                  className={inputCls}
                />
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Kolektor">
              <FieldWrap>
                <Select value={kolektor} onValueChange={setKolektor}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="Pilih Kolektor">Pilih Kolektor</SelectItem>
                    <SelectItem value="Dinda Sudiati">Dinda Sudiati</SelectItem>
                    <SelectItem value="Kolektor A">Kolektor A</SelectItem>
                    <SelectItem value="Kolektor B">Kolektor B</SelectItem>
                  </SelectContent>
                </Select>
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Wilayah">
              <FieldWrap>
                <Select value={wilayah} onValueChange={setWilayah}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="Pilih wilayah">Pilih wilayah</SelectItem>
                    <SelectItem value="Pusat">Pusat</SelectItem>
                    <SelectItem value="Denpasar">Denpasar</SelectItem>
                    <SelectItem value="Badung">Badung</SelectItem>
                    <SelectItem value="Gianyar">Gianyar</SelectItem>
                  </SelectContent>
                </Select>
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Tipe Kolektibilitas">
              <FieldWrap>
                <Select
                  value={tipeKolektibilitas}
                  onValueChange={setTipeKolektibilitas}
                >
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="-- Semua --">-- Semua --</SelectItem>
                    <SelectItem value="Lancar">Lancar</SelectItem>
                    <SelectItem value="Dalam Perhatian Khusus">
                      Dalam Perhatian Khusus
                    </SelectItem>
                    <SelectItem value="Kurang Lancar">Kurang Lancar</SelectItem>
                    <SelectItem value="Diragukan">Diragukan</SelectItem>
                    <SelectItem value="Macet">Macet</SelectItem>
                  </SelectContent>
                </Select>
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Kolektibilitas Per">
              <FieldWrap>
                <div className="grid gap-2 md:grid-cols-2">
                  <Select
                    value={kolektibilitasBulan}
                    onValueChange={setKolektibilitasBulan}
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                      {months.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={kolektibilitasTahun}
                    onValueChange={setKolektibilitasTahun}
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Tanggal Jatuh Tempo">
              <FieldWrap>
                <DateRangeField
                  startValue={jatuhTempoStart}
                  endValue={jatuhTempoEnd}
                  onStartChange={setJatuhTempoStart}
                  onEndChange={setJatuhTempoEnd}
                  startPlaceholder="Masukkan tanggal awal"
                  endPlaceholder="Masukkan tanggal akhir"
                />
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Jenis Kelamin">
              <FieldWrap>
                <Select value={jenisKelamin} onValueChange={setJenisKelamin}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="-- Semua --">-- Semua --</SelectItem>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Status Pinjaman">
              <FieldWrap>
                <Select value={statusPinjaman} onValueChange={setStatusPinjaman}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="Aktif / Sudah Dicairkan">
                      Aktif / Sudah Dicairkan
                    </SelectItem>
                    <SelectItem value="Lunas">Lunas</SelectItem>
                    <SelectItem value="Macet">Macet</SelectItem>
                  </SelectContent>
                </Select>
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Tanggal Aktif / Sudah Dicairkan">
              <FieldWrap>
                <DateRangeField
                  startValue={aktifStart}
                  endValue={aktifEnd}
                  onStartChange={setAktifStart}
                  onEndChange={setAktifEnd}
                  startPlaceholder="Masukkan tanggal awal"
                  endPlaceholder="Masukkan tanggal akhir"
                />
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Tanggal Saldo">
              <FieldWrap>
                <div className="relative">
                  <Input
                    value={tanggalSaldo}
                    onChange={(e) => setTanggalSaldo(e.target.value)}
                    placeholder="Masukkan tanggal saldo.."
                    className={cn(inputCls, tanggalSaldo ? "pr-10" : "")}
                  />
                  {tanggalSaldo ? (
                    <button
                      type="button"
                      onClick={() => setTanggalSaldo("")}
                      className={cn(
                        "absolute right-0 top-0",
                        "h-[30px] w-[36px]",
                        "rounded-r-[6px] rounded-l-none",
                        "bg-slate-600 text-white",
                        "ring-1 ring-slate-600/20 transition hover:bg-slate-700",
                        "text-[16px] font-semibold leading-none",
                      )}
                      aria-label="Clear tanggal saldo"
                      title="Clear"
                    >
                      ×
                    </button>
                  ) : null}
                </div>
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Status Anggota">
              <FieldWrap>
                <Select value={statusAnggota} onValueChange={setStatusAnggota}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="Pilih Jenis Anggota">
                      Pilih Jenis Anggota
                    </SelectItem>
                    <SelectItem value="Semua">Semua</SelectItem>
                    <SelectItem value="Anggota">Anggota</SelectItem>
                    <SelectItem value="Calon">Calon</SelectItem>
                  </SelectContent>
                </Select>
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Sisa Pinjaman">
              <FieldWrap>
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={sisaMin}
                    onChange={(e) => setSisaMin(e.target.value)}
                    placeholder="Sisa Minimal"
                    className={inputCls}
                    inputMode="decimal"
                  />
                  <Input
                    value={sisaMax}
                    onChange={(e) => setSisaMax(e.target.value)}
                    placeholder="Sisa Maksimal"
                    className={inputCls}
                    inputMode="decimal"
                  />
                </div>
              </FieldWrap>
            </FieldRow>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => {
                  toast("Cari (prototype)", {
                    description: "Filter belum dihubungkan ke data laporan.",
                  });
                }}
                className={cn(
                  "inline-flex h-[30px] items-center gap-2 rounded-[10px] px-6",
                  "bg-[#3BB001] text-[13px] font-normal text-white",
                  "ring-1 ring-[#3BB001]/25 transition hover:bg-[#349d01]",
                )}
              >
                <Search className="h-4.5 w-4.5" />
                Cari
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}