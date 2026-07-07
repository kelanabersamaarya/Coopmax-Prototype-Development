import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import PaymentLinkDateFilterField from "@/components/payment-link/PaymentLinkDateFilterField";
import {
  getPaymentLinks,
  paymentReminderStageOptions,
  type PaymentBillPaymentStatus,
  type PaymentLinkRow,
  type PaymentLinkStatus,
  type PaymentReminderStage,
} from "@/lib/paymentLinksStore";

function StatusBadge({ status }: { status: PaymentLinkRow["status"] }) {
  const map: Record<PaymentLinkRow["status"], string> = {
    Terkirim: "bg-[#3BB001] text-white hover:bg-[#3BB001]",
    "Gagal Terkirim": "bg-[#DC3545] text-white hover:bg-[#DC3545]",
    Kedaluwarsa: "bg-[#DC3545] text-white hover:bg-[#DC3545]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-2.5 py-1 text-[11px] font-bold leading-none",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

function PaymentStatusBadge({
  status,
}: {
  status: PaymentLinkRow["statusPembayaranTagihan"];
}) {
  const map: Record<PaymentLinkRow["statusPembayaranTagihan"], string> = {
    "Belum Bayar": "bg-[#DC3545] text-white",
    Lunas: "bg-[#3BB001] text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-2.5 py-1 text-[11px] font-bold leading-none",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

function ThLabel({
  children,
  sortable = true,
  className,
}: {
  children: React.ReactNode;
  sortable?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <div className="leading-[1.05]">{children}</div>
      {sortable ? (
        <span className="inline-flex flex-col leading-none text-slate-900/80">
          <ChevronUp className="-mb-0.5 h-3.5 w-3.5" />
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </div>
  );
}

function PaginationBar({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
}) {
  if (pageCount <= 1) {
    return (
      <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
        <button
          type="button"
          disabled
          className="h-10 px-4 text-[14px] font-medium text-slate-400"
        >
          Sebelumnya
        </button>
        <div className="grid h-10 w-10 place-items-center bg-violet-600 text-[14px] font-semibold text-white">
          1
        </div>
        <button
          type="button"
          disabled
          className="h-10 px-4 text-[14px] font-medium text-slate-400"
        >
          Selanjutnya
        </button>
      </div>
    );
  }

  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  const btnBase =
    "h-10 px-4 text-[14px] font-medium transition disabled:text-slate-400";

  return (
    <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
      <button
        type="button"
        className={cn(btnBase, "text-slate-500 hover:bg-slate-200")}
        disabled={prevDisabled}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

      <button
        type="button"
        className="h-10 w-10 bg-violet-600 text-[14px] font-semibold text-white"
        onClick={() => onPage(page)}
        aria-current="page"
      >
        {page}
      </button>

      <button
        type="button"
        className={cn(btnBase, "text-slate-500 hover:bg-slate-200")}
        disabled={nextDisabled}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}

export default function PaymentLink() {
  const navigate = useNavigate();
  const rows = React.useMemo(() => getPaymentLinks(), []);

  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  const [qNamaAnggota, setQNamaAnggota] = React.useState("");
  const [qIdAnggota, setQIdAnggota] = React.useState("");
  const [qTahapPengingat, setQTahapPengingat] =
    React.useState<PaymentReminderStage>("Semua");
  const [qTanggalPengiriman, setQTanggalPengiriman] = React.useState("");
  const [qNoRekPinjaman, setQNoRekPinjaman] = React.useState("");
  const [qNominalTagihan, setQNominalTagihan] = React.useState("0,00");
  const [qStatus, setQStatus] = React.useState<PaymentLinkStatus>("Semua");
  const [qStatusPembayaran, setQStatusPembayaran] =
    React.useState<PaymentBillPaymentStatus>("Semua");

  const filtered = React.useMemo(() => {
    const namaQ = qNamaAnggota.trim().toLowerCase();
    const idAnggotaQ = qIdAnggota.trim().toLowerCase();
    const tanggalQ = qTanggalPengiriman.trim().toLowerCase();
    const rekQ = qNoRekPinjaman.trim().toLowerCase();

    return rows.filter((row) => {
      const okNama = namaQ
        ? row.namaAnggota.toLowerCase().includes(namaQ)
        : true;
      const okIdAnggota = idAnggotaQ
        ? row.idAnggota.toLowerCase().includes(idAnggotaQ)
        : true;
      const okTahap =
        qTahapPengingat === "Semua"
          ? true
          : row.tahapPengingat === qTahapPengingat;
      const okTanggal = tanggalQ
        ? row.tanggalDibuat.toLowerCase().includes(tanggalQ)
        : true;
      const okRek = rekQ
        ? row.noRekPinjaman.toLowerCase().includes(rekQ)
        : true;
      const okStatus = qStatus === "Semua" ? true : row.status === qStatus;
      const okStatusPembayaran =
        qStatusPembayaran === "Semua"
          ? true
          : row.statusPembayaranTagihan === qStatusPembayaran;

      const okNominal = true;

      return (
        okNama &&
        okIdAnggota &&
        okTahap &&
        okTanggal &&
        okRek &&
        okNominal &&
        okStatus &&
        okStatusPembayaran
      );
    });
  }, [
    qIdAnggota,
    qNamaAnggota,
    qNoRekPinjaman,
    qNominalTagihan,
    qStatus,
    qStatusPembayaran,
    qTahapPengingat,
    qTanggalPengiriman,
    rows,
  ]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [
    pageSize,
    qNamaAnggota,
    qIdAnggota,
    qTahapPengingat,
    qTanggalPengiriman,
    qNoRekPinjaman,
    qNominalTagihan,
    qStatus,
    qStatusPembayaran,
  ]);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  const th = "px-3 py-3";
  const filterCell = "px-3 py-1.5";
  const td = "px-3 py-2.5";

  const filterInputCls =
    "h-8 rounded-[6px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/20";
  const filterSelectTriggerCls =
    "h-8 rounded-[6px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20";
  const pageSizeTriggerCls =
    "h-7 w-[68px] rounded-[6px] border-slate-300 bg-white px-2 text-[12.5px] font-semibold text-slate-900 shadow-none";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Pengingat Tagihan
          </h1>
          <div className="text-base font-semibold text-slate-600">Daftar</div>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex items-center gap-2 pb-3 text-[13px] font-medium text-slate-800">
            <span>Tampilkan</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className={pageSizeTriggerCls}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                {[10, 20, 50, 100].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>entri</span>
          </div>

          <div className="overflow-hidden bg-white">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[1380px] border-collapse">
                <thead className="bg-white">
                  <tr className="border-b border-slate-300/70 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                    <th className={cn("w-[44px] whitespace-nowrap", th)}>
                      <ThLabel sortable={false}>No.</ThLabel>
                    </th>

                    <th className={cn("w-[210px]", th)}>
                      <ThLabel>Nama Anggota</ThLabel>
                    </th>

                    <th className={cn("w-[150px]", th)}>
                      <ThLabel>
                        <span className="block">ID.</span>
                        <span className="block">Anggota</span>
                      </ThLabel>
                    </th>

                    <th className={cn("w-[170px]", th)}>
                      <ThLabel>
                        <span className="block">No. Rek.</span>
                        <span className="block">Pinjaman</span>
                      </ThLabel>
                    </th>

                    <th className={cn("w-[170px] text-right", th)}>
                      <ThLabel className="justify-end">Total Tagihan</ThLabel>
                    </th>

                    <th className={cn("w-[210px]", th)}>
                      <ThLabel>Tahap Pengingat Tagihan</ThLabel>
                    </th>

                    <th className={cn("w-[210px]", th)}>
                      <ThLabel>Tanggal Pengiriman Pengingat</ThLabel>
                    </th>

                    <th className={cn("w-[240px]", th)}>
                      <ThLabel>
                        <span className="block">Status Pengiriman</span>
                        <span className="block">Pengingat Tagihan</span>
                      </ThLabel>
                    </th>

                    <th className={cn("w-[190px]", th)}>
                      <ThLabel>Status Pembayaran Tagihan</ThLabel>
                    </th>
                  </tr>

                  <tr className="border-b border-slate-200 bg-white">
                    <th className={filterCell} />

                    <th className={filterCell}>
                      <Input
                        value={qNamaAnggota}
                        onChange={(event) => setQNamaAnggota(event.target.value)}
                        className={filterInputCls}
                        placeholder=""
                      />
                    </th>

                    <th className={filterCell}>
                      <Input
                        value={qIdAnggota}
                        onChange={(event) => setQIdAnggota(event.target.value)}
                        className={filterInputCls}
                        placeholder=""
                      />
                    </th>

                    <th className={filterCell}>
                      <Input
                        value={qNoRekPinjaman}
                        onChange={(event) =>
                          setQNoRekPinjaman(event.target.value)
                        }
                        className={filterInputCls}
                        placeholder=""
                      />
                    </th>

                    <th className={cn(filterCell, "text-right")}>
                      <Input
                        value={qNominalTagihan}
                        onChange={(event) =>
                          setQNominalTagihan(event.target.value)
                        }
                        className={cn(filterInputCls, "text-right tabular-nums")}
                        placeholder="0,00"
                        inputMode="decimal"
                      />
                    </th>

                    <th className={filterCell}>
                      <Select
                        value={qTahapPengingat}
                        onValueChange={(value) =>
                          setQTahapPengingat(value as PaymentReminderStage)
                        }
                      >
                        <SelectTrigger className={filterSelectTriggerCls}>
                          <SelectValue placeholder="-- Semua --" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          {paymentReminderStageOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option === "Semua" ? "-- Semua --" : option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </th>

                    <th className={filterCell}>
                      <PaymentLinkDateFilterField
                        value={qTanggalPengiriman}
                        onChange={setQTanggalPengiriman}
                        className={filterInputCls}
                      />
                    </th>

                    <th className={filterCell}>
                      <Select
                        value={qStatus}
                        onValueChange={(value) =>
                          setQStatus(value as PaymentLinkStatus)
                        }
                      >
                        <SelectTrigger className={filterSelectTriggerCls}>
                          <SelectValue placeholder="-- Semua --" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">-- Semua --</SelectItem>
                          <SelectItem value="Terkirim">Terkirim</SelectItem>
                          <SelectItem value="Gagal Terkirim">
                            Gagal Terkirim
                          </SelectItem>
                          <SelectItem value="Kedaluwarsa">Kedaluwarsa</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>

                    <th className={filterCell}>
                      <Select
                        value={qStatusPembayaran}
                        onValueChange={(value) =>
                          setQStatusPembayaran(value as PaymentBillPaymentStatus)
                        }
                      >
                        <SelectTrigger className={filterSelectTriggerCls}>
                          <SelectValue placeholder="-- Semua --" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">-- Semua --</SelectItem>
                          <SelectItem value="Belum Bayar">Belum Bayar</SelectItem>
                          <SelectItem value="Lunas">Lunas</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {paged.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-10 text-center text-sm text-slate-600"
                      >
                        Tidak ada data yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    paged.map((row, index) => (
                      <tr
                        key={row.id}
                        className={cn(
                          "border-b border-slate-200 text-[13px]",
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                        )}
                      >
                        <td className={cn(td, "text-slate-900 tabular-nums")}>
                          {(page - 1) * pageSize + index + 1}
                        </td>

                        <td className={cn(td, "font-medium text-slate-900")}>
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/payment-link/${encodeURIComponent(
                                  row.noPaymentLink,
                                )}`,
                              )
                            }
                            className="block w-full text-left font-semibold text-blue-600 hover:underline"
                            title={row.namaAnggota}
                          >
                            {row.namaAnggota}
                          </button>
                        </td>

                        <td
                          className={cn(
                            td,
                            "text-slate-900 tabular-nums whitespace-nowrap",
                          )}
                        >
                          {row.idAnggota}
                        </td>

                        <td
                          className={cn(
                            td,
                            "text-slate-900 tabular-nums whitespace-nowrap",
                          )}
                        >
                          {row.noRekPinjaman}
                        </td>

                        <td
                          className={cn(
                            td,
                            "text-right font-semibold text-slate-900 tabular-nums whitespace-nowrap",
                          )}
                        >
                          {row.nominalTagihan}
                        </td>

                        <td className={cn(td, "text-slate-900")}>
                          {row.tahapPengingat}
                        </td>

                        <td
                          className={cn(
                            td,
                            "text-slate-900 tabular-nums whitespace-nowrap",
                          )}
                        >
                          {row.tanggalDibuat}
                        </td>

                        <td className={td}>
                          <StatusBadge status={row.status} />
                        </td>

                        <td className={td}>
                          <PaymentStatusBadge
                            status={row.statusPembayaranTagihan}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-[14px] text-slate-900">
              Menampilkan {showingStart} sampai {showingEnd} dari{" "}
              {filtered.length} entri{" "}
              <span className="text-slate-600">
                (disaring dari {rows.length} entri keseluruhan)
              </span>
            </div>

            <PaginationBar page={page} pageCount={pageCount} onPage={setPage} />
          </div>
        </Card>
      </div>
    </div>
  );
}