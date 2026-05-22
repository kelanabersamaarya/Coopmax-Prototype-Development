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
import LoanReportTable from "@/components/laporan/LoanReportTable";
import ClearableFilterInput from "@/components/laporan/ClearableFilterInput";
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
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <ClearableFilterInput
        value={startValue}
        onChange={onStartChange}
        placeholder={startPlaceholder}
      />

      <ClearableFilterInput
        value={endValue}
        onChange={onEndChange}
        placeholder={endPlaceholder}
      />
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

  const [showReport, setShowReport] = React.useState(false);

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
    "text-[12.5px] font-normal shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-500",
  );

  const mutedSelectText = "text-[#64748B]";
  const normalSelectText = "text-slate-900";

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

        <Card className="mt-6 rounded-3xl border-0 bg-transparent p-0 shadow-none">
          <div className="grid gap-4">
            <FieldRow label="Jenis Pinjaman">
              <FieldWrap>
                <Select value={jenisPinjaman} onValueChange={setJenisPinjaman}>
                  <SelectTrigger
                    className={cn(
                      selectTriggerCls,
                      jenisPinjaman === "Pilih pinjaman"
                        ? mutedSelectText
                        : normalSelectText,
                    )}
                  >
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
                <ClearableFilterInput
                  value={namaNoRek}
                  onChange={setNamaNoRek}
                  placeholder="Masukkan Nama/No Rekening"
                />
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Kolektor">
              <FieldWrap>
                <Select value={kolektor} onValueChange={setKolektor}>
                  <SelectTrigger
                    className={cn(
                      selectTriggerCls,
                      kolektor === "Pilih Kolektor"
                        ? mutedSelectText
                        : normalSelectText,
                    )}
                  >
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
                  <SelectTrigger
                    className={cn(
                      selectTriggerCls,
                      wilayah === "Pilih wilayah"
                        ? mutedSelectText
                        : normalSelectText,
                    )}
                  >
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
                  <SelectTrigger
                    className={cn(
                      selectTriggerCls,
                      tipeKolektibilitas === "-- Semua --"
                        ? mutedSelectText
                        : normalSelectText,
                    )}
                  >
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
                    <SelectTrigger
                      className={cn(
                        selectTriggerCls,
                        kolektibilitasBulan === "Mei"
                          ? mutedSelectText
                          : normalSelectText,
                      )}
                    >
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
                    <SelectTrigger
                      className={cn(
                        selectTriggerCls,
                        kolektibilitasTahun === "2026"
                          ? mutedSelectText
                          : normalSelectText,
                      )}
                    >
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
                  <SelectTrigger
                    className={cn(
                      selectTriggerCls,
                      jenisKelamin === "-- Semua --"
                        ? mutedSelectText
                        : normalSelectText,
                    )}
                  >
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
                  <SelectTrigger
                    className={cn(
                      selectTriggerCls,
                      statusPinjaman === "Aktif / Sudah Dicairkan"
                        ? mutedSelectText
                        : normalSelectText,
                    )}
                  >
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
                <ClearableFilterInput
                  value={tanggalSaldo}
                  onChange={setTanggalSaldo}
                  placeholder="Masukkan tanggal saldo.."
                />
              </FieldWrap>
            </FieldRow>

            <FieldRow label="Status Anggota">
              <FieldWrap>
                <Select value={statusAnggota} onValueChange={setStatusAnggota}>
                  <SelectTrigger
                    className={cn(
                      selectTriggerCls,
                      statusAnggota === "Pilih Jenis Anggota"
                        ? mutedSelectText
                        : normalSelectText,
                    )}
                  >
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
                  <ClearableFilterInput
                    value={sisaMin}
                    onChange={setSisaMin}
                    placeholder="Sisa Minimal"
                    inputMode="decimal"
                  />
                  <ClearableFilterInput
                    value={sisaMax}
                    onChange={setSisaMax}
                    placeholder="Sisa Maksimal"
                    inputMode="decimal"
                  />
                </div>

                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReport(true);
                    }}
                    className={cn(
                      "inline-flex h-[30px] w-[61px] items-center justify-center gap-1.5 rounded-[5px]",
                      "bg-[#3BB001] text-[13px] font-normal text-white",
                      "ring-1 ring-[#3BB001]/25 transition hover:bg-[#349d01]",
                    )}
                  >
                    <Search className="h-3.5 w-3.5" />
                    Cari
                  </button>
                </div>
              </FieldWrap>
            </FieldRow>
          </div>
        </Card>

        {showReport ? <LoanReportTable /> : null}
      </div>
    </div>
  );
}