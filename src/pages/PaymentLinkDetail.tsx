import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    Kedaluwarsa: "bg-[#F59E0B] text-white",
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
  value: React.ReactNode;
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

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 py-2 sm:grid-cols-[220px_14px_minmax(0,1fr)] sm:items-start">
      <div className="text-[14px] font-normal text-slate-600">{label}</div>
      <div className="hidden text-center text-[14px] font-normal text-slate-400 sm:block">
        :
      </div>
      <div className="text-[14px] font-semibold text-slate-900">{value}</div>
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

export default function PaymentLinkDetail() {
  const navigate = useNavigate();
  const params = useParams<{ linkNo: string }>();
  const linkNo = params.linkNo ?? "";
  const data = getPaymentLinkByNo(linkNo);

  const publicLink = data
    ? `https://pay.coopmax.id/${data.noPaymentLink.replace(/\//g, "-")}`
    : "";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Payment Link
            </h1>
            <div className="text-base font-semibold text-slate-600">Detail</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ActionButton
              icon={ArrowLeft}
              label="Kembali ke Daftar"
              onClick={() => navigate("/payment-link")}
            />
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
                INFORMASI PAYMENT LINK
              </div>

              <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                <DetailField label="No. Payment Link" value={data.noPaymentLink} />
                <DetailField label="Nama Anggota" value={data.namaAnggota} />
                <DetailField label="No. Rek. Pinjaman" value={data.noRekPinjaman} />
                <DetailField
                  label="Status Pengiriman Pengingat Tagihan"
                  value={<StatusBadge status={data.status} />}
                />

                <DetailField label="Nominal Tagihan" value={data.nominalTagihan} />
                <DetailField label="Tahap Pengingat" value={data.tahapPengingat} />
                <DetailField label="Tanggal Dibuat" value={data.tanggalDibuat} />
                <DetailField
                  label="Tanggal Kedaluwarsa"
                  value={data.tanggalKedaluwarsa}
                />
              </div>
            </div>

            <Separator className="my-6 bg-slate-200/70" />

            <div className="text-[14px] font-extrabold uppercase tracking-wide text-slate-900">
              DETAIL LINK
            </div>

            <div className="mt-4 bg-white">
              <InfoRow
                label="URL Payment Link"
                value={
                  <span className="break-all font-semibold text-blue-600">
                    {publicLink}
                  </span>
                }
              />
              <InfoRow label="Channel Pengiriman" value="WhatsApp" />
            </div>

            <Separator className="my-6 bg-slate-200/70" />

            <div className="text-[14px] font-extrabold uppercase tracking-wide text-slate-900">
              RIWAYAT PERUBAHAN STATUS
            </div>

            <div className="mt-4 overflow-hidden rounded-[12px] ring-1 ring-slate-200">
              <div className="safe-x-scroll bg-white">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-600">
                      <th className="w-[70px] px-4 py-3">No.</th>
                      <th className="w-[180px] px-4 py-3">Tanggal</th>
                      <th className="w-[240px] px-4 py-3">
                        Status Pengiriman
                      </th>
                      <th className="px-4 py-3">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        tanggal: data.tanggalDibuat,
                        status: "Dibuat",
                        keterangan: "Payment Link dibuat oleh Admin Coopmax.",
                      },
                      {
                        tanggal: data.tanggalDibuat,
                        status: data.status,
                        keterangan: "Pengingat tagihan dikirim melalui WhatsApp.",
                      },
                    ].map((item, index) => (
                      <tr
                        key={`${item.status}-${index}`}
                        className="border-t border-slate-100 text-[13px]"
                      >
                        <td className="px-4 py-3 tabular-nums">{index + 1}</td>
                        <td className="px-4 py-3 tabular-nums">{item.tanggal}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {item.status}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {item.keterangan}
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