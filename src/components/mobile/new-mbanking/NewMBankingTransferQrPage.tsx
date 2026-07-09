import * as React from "react";
import { ArrowLeft, Copy, RefreshCcw, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

const QR_DURATION_SECONDS = 90;

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function TransferQrVisual({ refreshKey }: { refreshKey: number }) {
  const cells = React.useMemo(() => {
    return Array.from({ length: 25 * 25 }).map((_, index) => {
      const row = Math.floor(index / 25);
      const col = index % 25;

      const topLeft = row < 7 && col < 7;
      const topRight = row < 7 && col > 17;
      const bottomLeft = row > 17 && col < 7;

      const finderInner =
        (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
        (row >= 2 && row <= 4 && col >= 20 && col <= 22) ||
        (row >= 20 && row <= 22 && col >= 2 && col <= 4);

      const finderGap =
        ((row === 1 || row === 5) && (col < 7 || col > 17)) ||
        ((col === 1 || col === 5) && row < 7) ||
        ((col === 19 || col === 23) && row < 7) ||
        ((row === 19 || row === 23) && col < 7) ||
        ((col === 1 || col === 5) && row > 17);

      const patterned =
        (row * (5 + refreshKey) + col * 7 + row * col + refreshKey * 11) %
          4 ===
          0 ||
        (row + col + refreshKey) % 6 === 0 ||
        (row > 8 && col > 8 && (row * col + refreshKey) % 5 === 0) ||
        (row > 11 && col > 14 && (row + col + refreshKey) % 3 === 0);

      return topLeft || topRight || bottomLeft
        ? !finderGap || finderInner
        : patterned;
    });
  }, [refreshKey]);

  return (
    <div className="grid h-[286px] w-[286px] grid-cols-[repeat(25,minmax(0,1fr))] gap-[2.5px] rounded-[28px] bg-white p-[20px] shadow-sm ring-1 ring-[#E5E7EB]">
      {cells.map((active, index) => (
        <span
          key={`${refreshKey}-${index}`}
          className={cn(active ? "rounded-[1px] bg-black" : "bg-white")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function InfoRow({
  label,
  value,
  copyable = false,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[9px]">
      <div className="min-w-0 text-[13px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>

      <div className="flex max-w-[190px] items-center justify-end gap-2 text-right">
        <div className="truncate text-[13px] font-bold leading-tight text-black">
          {value}
        </div>

        {copyable ? (
          <button
            type="button"
            className="inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full text-[#479DF4] transition active:scale-[0.96]"
            aria-label={`Salin ${label}`}
            title="Salin"
          >
            <Copy className="h-[14px] w-[14px]" strokeWidth={2.6} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function NewMBankingTransferQrPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [timeLeft, setTimeLeft] = React.useState(QR_DURATION_SECONDS);
  const [qrRefreshKey, setQrRefreshKey] = React.useState(0);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setQrRefreshKey((key) => key + 1);
          return QR_DURATION_SECONDS;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  function refreshQrNow() {
    setQrRefreshKey((key) => key + 1);
    setTimeLeft(QR_DURATION_SECONDS);
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

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
            QR Transfer
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[118px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[30px]">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
              Kode QR Transfer
            </h2>

            <p className="mt-[8px] max-w-[300px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
              Tunjukkan kode QR ini kepada pengirim untuk menerima transfer antar
              rekening koperasi.
            </p>
          </div>

          <div className="mt-[28px] flex justify-center">
            <TransferQrVisual refreshKey={qrRefreshKey} />
          </div>

          <div className="mt-[18px] flex flex-col items-center gap-[12px]">
            <div className="flex items-center justify-center gap-[12px] text-[14px] font-normal leading-none">
              <span className="text-[#8F8F8F]">Kode akan kadaluarsa dalam</span>
              <Timer className="h-[20px] w-[20px] text-[#479DF4]" strokeWidth={2.6} />
              <span className="text-[#479DF4]">{formatTimer(timeLeft)}</span>
            </div>

            <button
              type="button"
              onClick={refreshQrNow}
              className={cn(
                "inline-flex h-[40px] items-center justify-center gap-2 rounded-[10px] px-4",
                "border border-[#D8D8D8] bg-white text-[13px] font-semibold text-[#479DF4]",
                "transition active:scale-[0.98]",
              )}
              aria-label="Perbarui kode QR"
              title="Perbarui kode QR"
            >
              <RefreshCcw className="h-[17px] w-[17px]" strokeWidth={2.6} />
              Perbarui Kode QR
            </button>
          </div>

          <div className="mt-[24px] overflow-hidden rounded-[20px] bg-[#F8FAFC] px-5 py-4 ring-1 ring-[#E5E7EB]">
            <InfoRow label="Nama Penerima" value="Laura Patel" />
            <div className="h-px w-full bg-[#E5E7EB]" />
            <InfoRow label="No. Rekening" value="112233111" copyable />
            <div className="h-px w-full bg-[#E5E7EB]" />
            <InfoRow label="Produk" value="Simpanan Kaya" />
          </div>
        </section>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Selesai
        </button>
      </div>
    </div>
  );
}