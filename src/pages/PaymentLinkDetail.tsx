import type { ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  getPaymentLinkByNo,
  type PaymentLinkRow,
} from "@/lib/paymentLinksStore";

function StatusBadge({ status }: { status: PaymentLinkRow["status"] }) {
  const map: Record<PaymentLinkRow["status"], string> = {
    Terkirim: "bg-[#3BB001] text-white",
    "Gagal Terkirim": "bg-[#DC3545] text-white",
    Kedaluwarsa: "bg-[#DC3545] text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-3 py-1.5 text-[12px] font-bold leading-none",
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
        "inline-flex items-center rounded-[5px] px-3 py-1.5 text-[12px] font-bold leading-none",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

function DetailField({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="text-[12px] font-semibold text-white/85">{label}</div>
      <div className="mt-1 text-[14px] font-extrabold tracking-tight text-white">
        <span className="block break-words leading-snug">{value}</span>
      </div>
    </div>
  );
}

function ActionButton({
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
        "inline-flex h-10 items-center gap-2 rounded-full bg-transparent px-4",
        "text-[13px] font-semibold text-slate-700",
        "border-0 shadow-none ring-0 transition hover:bg-slate-50",
        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
      )}
    >
      <Icon className="h-4.5 w-4.5 text-slate-600" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function getLoanProductName(row: PaymentLinkRow) {
  if (row.noRekPinjaman === "SMG260004") return "Pinjaman Billing";
  if (row.noRekPinjaman === "12260006") return "Pinjaman Bulanan";
  if (row.noRekPinjaman === "072260001") return "Pinjaman Harian";
  if (row.noRekPinjaman === "klpk04.07260001") return "Pinjaman Bulanan 1";
  return "Simpanan Multiguna";
}

function getBillBreakdown(row: PaymentLinkRow) {
  if (row.nominalTagihan === "991.666,00") {
    return {
      pokok: "833.333,00",
      bunga: "83.333,00",
      denda: "75.000,00",
    };
  }

  if (row.nominalTagihan === "916.667,00") {
    return {
      pokok: "833.333,00",
      bunga: "83.334,00",
      denda: "0,00",
    };
  }

  if (row.nominalTagihan === "1.250.000,00") {
    return {
      pokok: "1.000.000,00",
      bunga: "175.000,00",
      denda: "75.000,00",
    };
  }

  if (row.nominalTagihan === "1.120.000,00") {
    return {
      pokok: "1.000.000,00",
      bunga: "120.000,00",
      denda: "0,00",
    };
  }

  return {
    pokok: "490.292,00",
    bunga: "9.708,00",
    denda: "0,00",
  };
}

export default function PaymentLinkDetail() {
  const navigate = useNavigate();
  const params = useParams<{ linkNo: string }>();
  const linkNo = params.linkNo ?? "";
  const data = getPaymentLinkByNo(linkNo);
  const showTransactionDetailButton = data?.statusPembayaranTagihan === "Lunas";
  const billBreakdown = data ? getBillBreakdown(data) : null;

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Pengingat Tagihan
            </h1>
            <div className="text-base font-semibold text-slate-600">Detail</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ActionButton
              icon={ArrowLeft}
              label="Kembali ke Daftar"
              onClick={() => navigate("/payment-link")}
            />
            {showTransactionDetailButton ? (
              <ActionButton
                icon={ReceiptText}
                label="Detail Transaksi"
                onClick={() =>
                  navigate(
                    `/payment-link/${encodeURIComponent(linkNo)}/transaction-detail`,
                  )
                }
              />
            ) : null}
          </div>
        </div>

        {!data ? (
          <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold text-slate-900">
              Payment Link tidak ditemukan.
            </div>
            <div className="mt-2 text-sm text-slate-600">
              No. Payment Link: <span className="font-semibold">{linkNo}</span>
            </div>
            <div className="mt-4">
              <Link to="/payment-link" className="text-blue-600 hover:underline">
                Kembali ke daftar
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
            <div className="overflow-hidden rounded-[12px] bg-[#1aa0b5] p-5 text-white md:p-6">
              <div className="text-[13px] font-extrabold uppercase tracking-wide text-white">
                INFORMASI PENGINGAT TAGIHAN
              </div>

              <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                <DetailField label="No. Payment Link" value={data.noPaymentLink} />
                <DetailField label="Nama Anggota" value={data.namaAnggota} />
                <DetailField label="No. Rek. Pinjaman" value={data.noRekPinjaman} />
                <DetailField label="Produk Pinjaman" value={getLoanProductName(data)} />

                <DetailField label="Tagihan Pokok" value={billBreakdown?.pokok} />
                <DetailField label="Tagihan Bunga" value={billBreakdown?.bunga} />
                <DetailField label="Tagihan Denda" value={billBreakdown?.denda} />
                <DetailField label="Total Tagihan" value={data.nominalTagihan} />

                <DetailField label="Tahap Pengingat" value={data.tahapPengingat} />
                <DetailField
                  label="Tanggal Pengingat Tagihan Dikirim"
                  value={data.tanggalDibuat}
                />
                <DetailField
                  label="Tanggal Pengingat Tagihan Kedaluarsa"
                  value={data.tanggalKedaluwarsa}
                />
                <DetailField
                  label="Status Pembayaran Tagihan"
                  value={
                    <PaymentStatusBadge status={data.statusPembayaranTagihan} />
                  }
                />

                <DetailField
                  label="Status Pengiriman Pengingat Tagihan"
                  value={<StatusBadge status={data.status} />}
                />
              </div>
            </div>

            <Separator className="my-6 bg-slate-200/70" />

            <div className="text-[14px] font-extrabold uppercase tracking-wide text-slate-900">
              RIWAYAT PERUBAHAN STATUS
            </div>

            <div className="mt-4 overflow-hidden rounded-[12px] ring-1 ring-slate-200">
              <div className="safe-x-scroll bg-white">
                <table className="w-full min-w-[860px] border-collapse">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-600">
                      <th className="w-[70px] px-4 py-3">No.</th>
                      <th className="w-[180px] px-4 py-3">Tanggal</th>
                      <th className="w-[320px] px-4 py-3">
                        Status Pengiriman Pengingat Tagihan
                      </th>
                      <th className="w-[260px] px-4 py-3">
                        Status Pembayaran Tagihan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        tanggal: data.tanggalDibuat,
                        statusPengiriman: data.status,
                        statusPembayaran: data.statusPembayaranTagihan,
                      },
                    ].map((item, index) => (
                      <tr
                        key={`${item.statusPengiriman}-${index}`}
                        className="border-t border-slate-100 text-[13px]"
                      >
                        <td className="px-4 py-3 tabular-nums">{index + 1}</td>
                        <td className="px-4 py-3 tabular-nums">{item.tanggal}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={item.statusPengiriman} />
                        </td>
                        <td className="px-4 py-3">
                          <PaymentStatusBadge status={item.statusPembayaran} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}