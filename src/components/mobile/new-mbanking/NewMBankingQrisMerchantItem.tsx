import * as React from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingQrisConfirmModal from "@/components/mobile/new-mbanking/NewMBankingQrisConfirmModal";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import NewMBankingInScreenToast from "@/components/mobile/new-mbanking/NewMBankingInScreenToast";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

function SectionDivider() {
  return <div className="my-[10px] h-px w-full bg-[#D8D8D8]" />;
}

function onlyDigits(value: string) {
  return (value ?? "").replace(/[^\d]/g, "");
}

function formatThousands(value: string) {
  const digits = onlyDigits(value);
  if (!digits) return "";

  const normalized = digits.replace(/^0+(?=\d)/, "");
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatQrisAmountForConfirm(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "Rp. 50.000,00";
  return `Rp. ${trimmed},00`;
}

export default function NewMBankingQrisMerchantItem({
  onContinuePayment,
}: {
  onContinuePayment: () => void;
}) {
  const [nominal, setNominal] = React.useState("");
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);
  const [toastMessage, setToastMessage] = React.useState("");

  function showWarning(message: string) {
    setToastMessage("");
    window.setTimeout(() => setToastMessage(message), 0);
  }

  function continueToConfirm() {
    if (!nominal.trim()) {
      showWarning("Nominal Pembayaran Belum Terisi");
      return;
    }

    setConfirmOpen(true);
  }

  return (
    <section className="relative flex min-h-[calc(100%-92px)] flex-col px-[31px] pb-[112px] pt-[18px]">
      <NewMBankingInScreenToast
        message={toastMessage}
        variant="warning"
        onClose={() => setToastMessage("")}
        className="-top-[78px]"
      />

      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <NewMBankingQrisConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        amount={formatQrisAmountForConfirm(nominal)}
        sourceFund={sourceFund}
        onSourceFundChange={setSourceFund}
        onContinuePayment={onContinuePayment}
      />

      <div>
        <div className="flex items-start gap-[12px]">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-sm">
            <ShoppingCart
              className="h-[20px] w-[20px] text-white"
              strokeWidth={2.6}
            />
          </div>

          <div className="min-w-0">
            <div className="text-[18px] font-bold leading-tight text-black">
              Mini Mart
            </div>
            <div className="mt-[6px] text-[12px] font-normal leading-relaxed text-[#828282]">
              Bali, Indonesia
            </div>
            <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
              Merchant PAN : 2211122223333
            </div>
          </div>
        </div>

        <SectionDivider />

        <div>
          <label className="text-[14px] font-bold leading-tight text-[#2F3137]">
            Nominal Pembayaran<span className="text-[#EF135D]">*</span>
          </label>

          <input
            value={nominal}
            onChange={(event) => {
              setNominal(formatThousands(event.target.value));
              setToastMessage("");
            }}
            placeholder="Masukkan Nominal Pembayaran"
            inputMode="numeric"
            className={cn(
              "mt-[5px] h-[41px] w-full rounded-[9px] border border-[#CDD4E0] bg-white px-4",
              "text-[14px] font-normal text-black shadow-none outline-none",
              "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
              "focus:border-[#479DF4]",
            )}
          />

          <div className="mt-[5px] text-[12px] font-normal leading-relaxed text-[#828282]">
            Pastikan nominal yang akan memotong saldo Anda sudah sesuai
          </div>
        </div>

        <SectionDivider />

        <div>
          <div className="text-[14px] font-bold leading-tight text-[#2F3137]">
            Sumber Dana
          </div>

          <div className="mt-[8px]">
            <NewMBankingSourceFundGradientCard
              account={sourceFund}
              onClick={() => setSourceFundOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={continueToConfirm}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan
        </button>
      </div>
    </section>
  );
}