"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BillingTableView2, {
  type BillingRow,
} from "@/components/anggota/BillingTableView2";
import BillSummaryCard from "@/components/anggota/BillSummaryCard";
import TransactionFormCardView2 from "@/components/anggota/TransactionFormCardView2";
import { TX, type TransactionType } from "@/components/anggota/transaction-types";

const seedRows: BillingRow[] = [
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-02-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-03-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-04-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-05-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
];

function parseNumLikeId(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;
  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatIdr0(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Denda khusus (prototype) — mengikuti pola yang ada di app: 25.000 + idx*5.000
function khususPenaltyForIndex(idx: number) {
  const base = 25000;
  return base + idx * 5000;
}

export default function LoanBillingAndSummarySection({
  className,
}: {
  className?: string;
}) {
  const rows = React.useMemo(() => seedRows, []);
  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rows.map(() => true),
  );

  const [jenisTransaksi, setJenisTransaksi] = React.useState<TransactionType>(
    TX.REGULER,
  );

  const isPenurunanBakiDebet = jenisTransaksi === TX.PENURUNAN_BAKI_DEBET;
  const isKhusus = jenisTransaksi === TX.KHUSUS;

  // --- Form state ---
  const [tanggalEfektif, setTanggalEfektif] = React.useState("25-03-2026");
  const [kolektor, setKolektor] = React.useState<string>("Pilih Kolektor");

  const [nominal, setNominal] = React.useState("0");
  const [nominalPokok, setNominalPokok] = React.useState("0");
  const [nominalBunga, setNominalBunga] = React.useState("0");
  const [nominalDenda, setNominalDenda] = React.useState("0");

  const [tabungan, setTabungan] = React.useState("Tanpa Tabungan");
  const [keterangan, setKeterangan] = React.useState("");

  React.useEffect(() => {
    setSelected((prev) => rows.map((_, idx) => prev[idx] ?? true));
  }, [rows]);

  // RULES:
  // - Penurunan baki debet: tidak ada checklist, tapi state dibuat true agar ringkasan konsisten.
  // - Khusus: saat masuk mode khusus, default tidak ada yang dicentang.
  React.useEffect(() => {
    if (isPenurunanBakiDebet) {
      setSelected(rows.map(() => true));
      return;
    }
    if (isKhusus) {
      setSelected(rows.map(() => false));
      return;
    }
    // selain itu: biarkan default existing (true) agar seperti sebelumnya
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPenurunanBakiDebet, isKhusus, rows.length]);

  const sisaPinjamanText = React.useMemo(() => {
    if (!isPenurunanBakiDebet) return null;
    const total = rows.reduce((sum, r) => sum + parseNumLikeId(r.sisaPokok), 0);
    return formatIdr0(total);
  }, [isPenurunanBakiDebet, rows]);

  // Totals berdasarkan selection (dipakai untuk Ringkasan & autofill di Khusus)
  const selectedTotals = React.useMemo(() => {
    let pokok = 0;
    let bunga = 0;
    let denda = 0;

    for (let i = 0; i < rows.length; i++) {
      if (!(selected[i] ?? false)) continue;
      pokok += parseNumLikeId(rows[i]?.tagihanPokok ?? "0");
      bunga += parseNumLikeId(rows[i]?.tagihanBunga ?? "0");

      // khusus: denda dihitung per baris (prototype)
      if (isKhusus) denda += khususPenaltyForIndex(i);
    }

    const total = pokok + bunga + denda;
    return { pokok, bunga, denda, total };
  }, [isKhusus, rows, selected]);

  // Autofill field pembayaran untuk Khusus: ikut selection
  React.useEffect(() => {
    if (!isKhusus) return;
    setNominalPokok(formatIdr0(selectedTotals.pokok));
    setNominalBunga(formatIdr0(selectedTotals.bunga));
    setNominalDenda(formatIdr0(selectedTotals.denda));
    // nominal (single) tidak dipakai untuk khusus, tapi biar bersih:
    setNominal("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKhusus, selectedTotals.pokok, selectedTotals.bunga, selectedTotals.denda]);

  const totalsForSummary = React.useMemo(() => {
    if (isPenurunanBakiDebet) {
      const v = sisaPinjamanText ?? "0";
      return { pokok: v, bunga: "0", denda: "0", total: v };
    }

    if (isKhusus) {
      return {
        pokok: formatIdr0(selectedTotals.pokok),
        bunga: formatIdr0(selectedTotals.bunga),
        denda: formatIdr0(selectedTotals.denda),
        total: formatIdr0(selectedTotals.total),
      };
    }

    // Mode lain: tetap sederhana (bisa kita kembangkan kalau diperlukan)
    return { pokok: "0", bunga: "0", denda: "0", total: "0" };
  }, [
    isKhusus,
    isPenurunanBakiDebet,
    selectedTotals.bunga,
    selectedTotals.denda,
    selectedTotals.pokok,
    selectedTotals.total,
    sisaPinjamanText,
  ]);

  // Matikan ring/outline per-row untuk mode reguler, seperti yang sudah disamakan sebelumnya.
  const disableRowChrome = !isPenurunanBakiDebet;

  return (
    <div className={cn(className)}>
      <div className="text-center text-[14px] font-semibold tracking-tight text-slate-900">
        Tagihan dan Pembayaran Angsuran
      </div>
      <div className="mt-2 h-px w-full bg-slate-300/70" />

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="min-w-0 rounded-[5px] border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
          <div className="text-sm font-semibold text-slate-900">
            INFORMASI TAGIHAN DAN DENDA
          </div>

          <Separator className="my-3 bg-slate-200/70" />

          <BillingTableView2
            rows={rows}
            selected={selected}
            setSelected={setSelected}
            isLocked={isPenurunanBakiDebet ? true : false}
            showNextBillInfo={false}
            showGraceInfo={true}
            highlightGraceBlock={true}
            keepGraceShellWithoutInfo={false}
            hideSelection={isPenurunanBakiDebet}
            showPenaltyColumn={isPenurunanBakiDebet ? false : true}
            disableRowRings={disableRowChrome}
            disableRowActiveRing={disableRowChrome}
            penaltyIndexOffset={0}
            rowDensity="default"
          />
        </Card>

        <div className="space-y-4 px-1">
          <BillSummaryCard
            mode="regular"
            totals={totalsForSummary}
            installment={{ ke: "1", lunas: "0", seharusnya: "0" }}
            transactionType={jenisTransaksi}
            onTransactionTypeChange={(v) => setJenisTransaksi(v)}
            hasAnySelected={selected.some(Boolean)}
          />

          <TransactionFormCardView2
            tanggalEfektif={tanggalEfektif}
            setTanggalEfektif={setTanggalEfektif}
            jenisTransaksi={jenisTransaksi}
            setJenisTransaksi={setJenisTransaksi}
            kolektor={kolektor}
            setKolektor={setKolektor}
            nominal={nominal}
            setNominal={setNominal}
            nominalPokok={nominalPokok}
            setNominalPokok={setNominalPokok}
            nominalBunga={nominalBunga}
            setNominalBunga={setNominalBunga}
            nominalDenda={nominalDenda}
            setNominalDenda={setNominalDenda}
            tabungan={tabungan}
            setTabungan={setTabungan}
            keterangan={keterangan}
            setKeterangan={setKeterangan}
          />
        </div>
      </div>
    </div>
  );
}