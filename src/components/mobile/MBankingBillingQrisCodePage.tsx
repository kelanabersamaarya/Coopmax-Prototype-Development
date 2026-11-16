import * as React from "react";
import { ArrowLeft, RefreshCcw, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingQrExpiredPage from "@/components/mobile/MBankingBillingQrisExpiredPage";
import NewMBankingQrisFixedAmountPage from "@/components/mobile/MBankingBillingQrisFixedAmountPage";
import NewMBankingTransactionSuccessPage from "@/components/mobile/MBankingBillingQrisSuccessPage";

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function QrCodeVisual() {
  const cells = React.useMemo(() => {
    return Array.from({ length: 29 * 29 }).map((_, index) => {
      const row = Math.floor(index / 29);
      const col = index % 29;

      const inFinder =
        (row < 7 && col < 7) ||
        (row < 7 && col > 21) ||
        (row > 21 && col < 7);

      const inFinderCenter =
        (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
        (row >= 2 && row <= 4 && col >= 24 && col <= 26) ||
        (row >= 24 && row <= 26 && col >= 2 && col <= 4);

      const inFinderGap =
        ((row === 1 || row === 5) && (col < 7 || col > 21)) ||
        ((col === 1 || col === 5) && row < 7) ||
        ((col === 23 || col === 27) && row < 7) ||
        ((row === 23 || row === 27) && col < 7) ||
        ((col === 1 || col === 5) && row > 21);

      const patterned =
        (row * 7 + col * 11 + row * col) % 5 === 0 ||
        (row + col) % 7 === 0 ||
        (row > 9 && row < 22 && col > 8 && col < 22 && (row * col) % 3 === 0) ||
        (row > 12 && col > 17 && (row + col) % 4 === 0);

      const active = inFinder ? !inFinderGap || inFinderCenter : patterned;

      return active;
    });
  }, []);

  return (
    <div className="grid h-[232px] w-[232px] grid-cols-[repeat(29,minmax(0,1fr))] grid-rows-[repeat(29,minmax(0,1fr))] gap-[1px] bg-white p-[10px]">
      {cells.map((active, index) => (
        <span
          key={index}
          className={active ? "bg-black" : "bg-white"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function NewMBankingQrCodeDisplayPage({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const [seconds, setSeconds] = React.useState(120);
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    if (seconds <= 0) return;

    const intervalId = window.setInterval(() => {
      setSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [seconds]);

  function refreshCode() {
    setSeconds(120);
    setShowSuccess(false);
  }

  if (showSuccess) {
    return <NewMBankingTransactionSuccessPage onDone={onDone} />;
  }

  if (seconds <= 0) {
    return (
      <NewMBankingQrExpiredPage
        onBack={onBack}
        onRefresh={refreshCode}
      />
    );
  }

  if (seconds <= 110) {
    return (
      <NewMBankingQrisFixedAmountPage
        onBack={onBack}
        onContinuePayment={() => setShowSuccess(true)}
      />
    );
  }

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#0758C9] text-black">
      <header className="flex h-[128px] shrink-0 flex-col items-start px-[31px] pt-[18px] text-white">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-white transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[25px] w-[25px]" strokeWidth={2.7} />
        </button>

        <h1 className="mt-[12px] text-[25px] font-bold leading-tight text-white">
          Tunjukan Kode QR
        </h1>
      </header>

      <main className="mx-0 mb-0 flex min-h-0 flex-1 flex-col rounded-t-[28px] rounded-b-none bg-white px-5 pb-[22px] pt-[34px]">
        <section className="text-center">
          <div className="mx-auto flex max-w-[345px] items-start gap-3 rounded-[14px] bg-[#EAF2FF] px-4 py-4 text-left text-[14px] font-normal leading-[1.45] text-[#0758C9]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#0758C9] text-[12px] font-bold leading-none">i</span>
            <p>
              Pastikan nominal yang akan memotong saldo Anda sudah sesuai. Kode QR
              hanya boleh Anda tunjukan ke kasir
            </p>
          </div>
        </section>

        <section className="flex flex-1 flex-col items-center justify-center pb-[78px] pt-[42px]">
          <div className="grid h-[292px] w-[292px] place-items-center rounded-[28px] border border-[#D8D8D8] bg-white">
            <QrCodeVisual />
          </div>

          <div className="mt-[36px] flex items-center justify-center gap-[10px]">
            <span className="text-[14px] font-normal leading-none text-[#8F8F8F]">
              Kode akan kadaluarsa dalam
            </span>

            <Timer className="h-[20px] w-[20px] text-[#0758C9]" strokeWidth={2.5} />

            <span className="text-[14px] font-normal leading-none text-[#0758C9]">
              {formatTimer(seconds)}
            </span>
          </div>
        </section>

        <button
          type="button"
          onClick={refreshCode}
          className={cn(
            "h-[58px] w-full rounded-[10px] bg-[#0758C9]",
            "text-[14px] font-bold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          <span className="inline-flex items-center justify-center gap-[14px]">
            <RefreshCcw className="h-[24px] w-[24px]" strokeWidth={2.5} />
            Perbarui Kode QR
          </span>
        </button>
      </main>
    </div>
  );
}