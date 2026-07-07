import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  ReceiptText,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getPaymentLinkByNo } from "@/lib/paymentLinksStore";
import PaymentLinkTransactionDetailCard from "@/components/payment-link/PaymentLinkTransactionDetailCard";

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

function deriveTransactionNo(linkNo: string) {
  const decoded = decodeURIComponent(linkNo ?? "");
  const compact = decoded.replace(/[^\d]/g, "").slice(-8) || "0707260001";
  return `BA/${compact.slice(0, 6)}/${compact.slice(-4).padStart(4, "0")}`;
}

export default function PaymentLinkTransactionDetail() {
  const navigate = useNavigate();
  const params = useParams<{ linkNo: string }>();
  const linkNo = params.linkNo ?? "";
  const paymentLink = getPaymentLinkByNo(linkNo);
  const transactionNo = deriveTransactionNo(paymentLink?.noPaymentLink ?? linkNo);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-[21px] font-extrabold tracking-tight text-black">
              Transaksi Pinjaman Detail
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <ActionButton
              icon={ReceiptText}
              label="Kwitansi"
              onClick={() =>
                toast("Kwitansi (prototype)", {
                  description: `Transaksi: ${transactionNo}`,
                })
              }
            />
            <ActionButton
              icon={FileText}
              label="Kwitansi Kas"
              onClick={() =>
                toast("Kwitansi Kas (prototype)", {
                  description: `Transaksi: ${transactionNo}`,
                })
              }
            />
            <ActionButton
              icon={ArrowLeft}
              label="Kembali ke Detail Pengingat Tagihan"
              onClick={() => navigate(`/payment-link/${encodeURIComponent(linkNo)}`)}
            />
            <ActionButton
              icon={Trash2}
              label="Hapus"
              onClick={() =>
                toast("Hapus (prototype)", {
                  description: "Aksi hapus belum diimplementasikan.",
                })
              }
            />
          </div>
        </div>

        <PaymentLinkTransactionDetailCard transactionNo={transactionNo} />
      </div>
    </div>
  );
}