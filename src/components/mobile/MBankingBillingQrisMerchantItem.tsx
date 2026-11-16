import * as React from "react";
import { ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingQrisConfirmModal from "@/components/mobile/MBankingBillingQrisConfirmModal";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/MBankingBillingQrisSourceFundModal";
import NewMBankingSourceFundGradientCard from "@/components/mobile/MBankingBillingQrisSourceFundCard";
import NewMBankingInScreenToast from "@/components/mobile/MBankingBillingQrisToast";

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
    <section className="relative flex min-h-0 flex-1 flex-col overflow-y-auto rounded-t-[20px] bg-[#FFFFFF] px-[31px] pb-[18px] pt-[18px]">
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
        <div className="rounded-[12px] border border-[#D8D8D8] px-[14px] py-[14px]">
          <div className="flex items-start gap-[12px]">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#004FC7] text-white shadow-sm">
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
        </div>

        <div className="mt-[20px]">
          <label className="text-[14px] font-bold leading-tight text-[#777777]">
            Nominal Pembayaran<span className="text-[#EF135D]">*</span>
          </label>

          <div className="relative mt-[5px] flex h-[54px] items-center rounded-[12px] bg-[#F1F1F1] px-4">
            <span className="shrink-0 text-[16px] font-normal text-[#26365F]">Rp.</span>
            <input
              value={nominal}
              onChange={(event) => {
                setNominal(formatThousands(event.target.value));
                setToastMessage("");
              }}
              placeholder="Masukkan Nominal Pembayaran"
              inputMode="numeric"
              className={cn(
                "ml-4 min-w-0 flex-1 bg-transparent pr-[30px]",
                "text-[16px] font-normal text-[#26365F] shadow-none outline-none",
                "placeholder:text-[16px] placeholder:font-normal placeholder:text-[#8FA5C4]",
              )}
            />

            {nominal.trim() ? (
              <button
                type="button"
                onClick={() => {
                  setNominal("");
                  setToastMessage("");
                }}
                className={cn(
                  "absolute right-[9px] top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center",
                  "rounded-full bg-transparent text-[#8F8F8F] transition active:scale-[0.94]",
                )}
                aria-label="Hapus nominal pembayaran"
                title="Hapus"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={2.6} />
              </button>
            ) : null}
          </div>

          <div className="mt-[5px] text-[12px] font-normal leading-relaxed text-[#828282]">
            Pastikan nominal yang akan memotong saldo Anda sudah sesuai
          </div>
        </div>

        <div className="mt-[20px]">
          <div className="text-[14px] font-bold leading-tight text-[#777777]">
            Sumber Dana
          </div>

          <div className="mt-[8px]">
            <NewMBankingSourceFundGradientCard
              account={sourceFund}
              selected
              showChevron={false}
              onClick={() => setSourceFundOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-30 mt-auto shrink-0 px-0 pb-0 pt-[14px]">
        <button
          type="button"
          onClick={continueToConfirm}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#004FC7]",
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