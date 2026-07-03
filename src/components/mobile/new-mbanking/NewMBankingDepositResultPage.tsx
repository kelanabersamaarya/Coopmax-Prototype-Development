import * as React from "react";
import {
  ArrowLeft,
  BatteryMedium,
  ChevronDown,
  ChevronUp,
  Copy,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingDepositDestinationCard from "@/components/mobile/new-mbanking/NewMBankingDepositDestinationCard";

function StatusBar() {
  return (
    <div className="flex h-[30px] shrink-0 items-center justify-between px-6 pt-2 text-black">
      <div className="text-[14px] font-bold leading-none tracking-[-0.02em]">
        11:30
      </div>

      <div className="flex items-center gap-[8px]">
        <div className="flex h-4 items-end gap-[2px]" aria-hidden="true">
          <span className="h-[5px] w-[3px] rounded-full bg-black" />
          <span className="h-[8px] w-[3px] rounded-full bg-black" />
          <span className="h-[11px] w-[3px] rounded-full bg-black" />
          <span className="h-[14px] w-[3px] rounded-full bg-black" />
        </div>
        <Wifi className="h-[17px] w-[17px] text-black" strokeWidth={2.6} />
        <BatteryMedium
          className="h-[19px] w-[19px] text-black"
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
        {children}
      </div>
      <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />
    </div>
  );
}

function DetailRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-[7px]">
      <div className="text-[14px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div
        className={cn(
          "text-right font-bold leading-tight text-black",
          strong ? "text-[18px] tracking-[-0.02em]" : "text-[14px]",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function InstructionAccordionItem({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[52px] w-full items-center justify-between gap-4 px-4 py-3 text-left transition active:scale-[0.99]"
        aria-expanded={open}
      >
        <span className="text-[14px] font-bold leading-tight text-black">
          {title}
        </span>
        {open ? (
          <ChevronUp className="h-[20px] w-[20px] text-black" strokeWidth={2.6} />
        ) : (
          <ChevronDown
            className="h-[20px] w-[20px] text-black"
            strokeWidth={2.6}
          />
        )}
      </button>

      {open ? (
        <div className="px-4 pb-4">
          <div className="rounded-[12px] bg-[#F9FAFB] px-4 py-4">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DepositInstructions() {
  const [openItem, setOpenItem] = React.useState<"mbanking" | "internet" | "atm">(
    "mbanking",
  );

  const steps = [
    "Buka aplikasi mobile banking atau e-wallet pilihan Anda.",
    "Pilih menu Transfer atau Virtual Account.",
    "Masukkan nomor Virtual Account 111222334455.",
    "Pastikan nama penerima adalah Arya dan produk rekening adalah Simpanan Kaya.",
    "Masukkan nominal setoran sesuai total transaksi.",
    "Periksa kembali detail transaksi sebelum melanjutkan.",
    "Konfirmasi pembayaran dan simpan bukti transaksi.",
  ];

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#D8D8D8] bg-white">
      <InstructionAccordionItem
        title="M-Banking"
        open={openItem === "mbanking"}
        onToggle={() =>
          setOpenItem((current) => (current === "mbanking" ? "internet" : "mbanking"))
        }
      >
        <ol className="list-decimal space-y-[8px] pl-5 text-[13px] font-normal leading-relaxed text-black">
          {steps.map((step) => (
            <li key={step} className="pl-1">
              {step}
            </li>
          ))}
        </ol>
      </InstructionAccordionItem>

      <div className="h-px w-full bg-[#E5E7EB]" />

      <InstructionAccordionItem
        title="Internet Banking"
        open={openItem === "internet"}
        onToggle={() =>
          setOpenItem((current) => (current === "internet" ? "mbanking" : "internet"))
        }
      >
        <div className="text-[13px] font-normal leading-relaxed text-black">
          Gunakan menu transfer Virtual Account pada internet banking, lalu masukkan
          nomor VA dan nominal sesuai detail setoran.
        </div>
      </InstructionAccordionItem>

      <div className="h-px w-full bg-[#E5E7EB]" />

      <InstructionAccordionItem
        title="ATM"
        open={openItem === "atm"}
        onToggle={() =>
          setOpenItem((current) => (current === "atm" ? "mbanking" : "atm"))
        }
      >
        <div className="text-[13px] font-normal leading-relaxed text-black">
          Pilih menu transfer Virtual Account di ATM, masukkan nomor VA, cek detail,
          lalu lanjutkan pembayaran.
        </div>
      </InstructionAccordionItem>
    </div>
  );
}

function parseIdrLike(value: string) {
  const cleaned = value.replace(/[^\d]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return `Rp. ${Math.round(value).toLocaleString("id-ID")},00`;
}

export default function NewMBankingDepositResultPage({
  amount,
  onBack,
  onDone,
}: {
  amount: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const [copied, setCopied] = React.useState(false);
  const nominal = amount.trim() || "Rp. 50.000,00";
  const adminFee = "Rp. 2.500,00";
  const total = formatIdr(parseIdrLike(nominal) + 2500);
  const virtualAccount = "111222334455";

  function copyVirtualAccount() {
    navigator.clipboard.writeText(virtualAccount);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1400);
  }

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <StatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Setoran
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pt-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[28px] pt-[28px] shadow-[0_-8px_28px_rgba(15,23,42,0.06)]">
          <div>
            <SectionTitle>Rekening Tujuan</SectionTitle>
            <NewMBankingDepositDestinationCard />
          </div>

          <section className="mt-[30px]">
            <SectionTitle>Nomor Virtual Account</SectionTitle>

            <div className="mt-[18px] flex min-h-[64px] items-center justify-between gap-4 rounded-[16px] bg-[#F1F3F6] px-4 py-3">
              <div className="min-w-0 truncate text-[20px] font-bold leading-tight tracking-[-0.02em] text-black">
                {virtualAccount}
              </div>

              <button
                type="button"
                onClick={copyVirtualAccount}
                className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-bold leading-none text-[#479DF4] transition active:scale-[0.98]"
              >
                <Copy className="h-[17px] w-[17px]" strokeWidth={2.5} />
                {copied ? "Tersalin" : "Salin"}
              </button>
            </div>
          </section>

          <section className="mt-[30px]">
            <SectionTitle>Detail Setoran</SectionTitle>

            <div className="mt-[12px]">
              <DetailRow label="Nominal" value={nominal} />
              <DetailRow label="Biaya Admin" value={adminFee} />

              <div className="my-[10px] border-t border-dashed border-[#D8D8D8]" />

              <DetailRow label="Total Transaksi" value={total} strong />
            </div>
          </section>

          <section className="mt-[30px]">
            <SectionTitle>Cara Melakukan Setoran</SectionTitle>

            <div className="mt-[18px]">
              <DepositInstructions />
            </div>
          </section>

          <button
            type="button"
            onClick={onDone}
            className={cn(
              "mt-[30px] h-[52px] w-full rounded-full bg-[#479DF4]",
              "text-[14px] font-semibold leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Selesai
          </button>
        </section>
      </main>
    </div>
  );
}