import { ArrowLeft, Copy, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

function TransferQrVisual() {
  const cells = Array.from({ length: 21 * 21 }).map((_, index) => {
    const row = Math.floor(index / 21);
    const col = index % 21;

    const topLeft = row < 7 && col < 7;
    const topRight = row < 7 && col > 13;
    const bottomLeft = row > 13 && col < 7;

    const finderInner =
      (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
      (row >= 2 && row <= 4 && col >= 16 && col <= 18) ||
      (row >= 16 && row <= 18 && col >= 2 && col <= 4);

    const finderGap =
      ((row === 1 || row === 5) && (col < 7 || col > 13)) ||
      ((col === 1 || col === 5) && row < 7) ||
      ((col === 15 || col === 19) && row < 7) ||
      ((row === 15 || row === 19) && col < 7) ||
      ((col === 1 || col === 5) && row > 13);

    const patterned =
      (row * 5 + col * 7 + row * col) % 4 === 0 ||
      (row + col) % 6 === 0 ||
      (row > 8 && col > 8 && (row * col) % 5 === 0);

    return topLeft || topRight || bottomLeft
      ? !finderGap || finderInner
      : patterned;
  });

  return (
    <div className="grid h-[226px] w-[226px] grid-cols-[repeat(21,minmax(0,1fr))] gap-[2.5px] rounded-[24px] bg-white p-[18px] shadow-sm ring-1 ring-[#E5E7EB]">
      {cells.map((active, index) => (
        <span
          key={index}
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
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
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

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[30px]">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-[76px] w-[76px] place-items-center rounded-full bg-[#479DF4] text-white shadow-[0_10px_24px_rgba(71,157,244,0.24)]">
              <QrCode className="h-[38px] w-[38px] text-white" strokeWidth={2.7} />
            </span>

            <h2 className="mt-[18px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
              Kode QR Transfer
            </h2>

            <p className="mt-[8px] max-w-[300px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
              Tunjukkan kode QR ini kepada pengirim untuk menerima transfer antar
              rekening koperasi.
            </p>
          </div>

          <div className="mt-[34px] flex justify-center">
            <TransferQrVisual />
          </div>

          <div className="mt-[30px] overflow-hidden rounded-[20px] bg-[#F8FAFC] px-5 py-4 ring-1 ring-[#E5E7EB]">
            <InfoRow label="Nama Penerima" value="Laura Patel" />
            <div className="h-px w-full bg-[#E5E7EB]" />
            <InfoRow label="No. Rekening" value="112233111" copyable />
            <div className="h-px w-full bg-[#E5E7EB]" />
            <InfoRow label="Produk" value="Simpanan Kaya" />
          </div>

          <button
            type="button"
            onClick={onBack}
            className={cn(
              "mt-[30px] h-[52px] w-full rounded-[8px] bg-[#479DF4]",
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