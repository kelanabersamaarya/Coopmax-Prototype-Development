import { ArrowLeft, Copy, IdCard, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

function MemberQrVisual() {
  const cells = Array.from({ length: 17 * 17 }).map((_, index) => {
    const row = Math.floor(index / 17);
    const col = index % 17;

    const topLeft = row < 5 && col < 5;
    const topRight = row < 5 && col > 11;
    const bottomLeft = row > 11 && col < 5;
    const center =
      (row >= 7 && row <= 10 && col >= 7 && col <= 10) ||
      (row + col) % 5 === 0 ||
      (row * 3 + col * 7) % 11 === 0;

    const finderGap =
      ((row === 1 || row === 3) && (col < 5 || col > 11)) ||
      ((col === 1 || col === 3) && (row < 5 || row > 11));

    return (topLeft || topRight || bottomLeft) ? !finderGap : center;
  });

  return (
    <div className="grid h-[184px] w-[184px] grid-cols-[repeat(17,minmax(0,1fr))] gap-[3px] rounded-[22px] bg-white p-[18px] shadow-sm ring-1 ring-[#E5E7EB]">
      {cells.map((active, index) => (
        <span
          key={index}
          className={cn(active ? "rounded-[2px] bg-black" : "bg-white")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function MemberInfoRow({
  label,
  value,
  copyable = false,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[10px]">
      <div className="text-[13px] font-normal leading-tight text-white/76">
        {label}
      </div>

      <div className="flex min-w-0 items-center justify-end gap-2 text-right">
        <div className="truncate text-[15px] font-bold leading-tight text-white">
          {value}
        </div>

        {copyable ? (
          <button
            type="button"
            className="inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
            aria-label={`Salin ${label}`}
            title="Salin"
          >
            <Copy className="h-[14px] w-[14px]" strokeWidth={2.5} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function NewMBankingMembershipPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const memberNo = "AGT-2600006";
  const memberName = "Laura Patel";

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
            Keanggotaan
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[28px]">
          <div className="text-[14px] font-normal leading-relaxed text-[#8F8F8F]">
            Kartu anggota digital Anda dapat digunakan untuk identifikasi anggota
            koperasi.
          </div>

          <article
            className={cn(
              "relative mt-[24px] overflow-hidden rounded-[26px] px-5 pb-6 pt-5 text-white",
              "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_50%,#7C3AED_100%)]",
              "shadow-[0_14px_34px_rgba(37,99,235,0.22)]",
            )}
          >
            <div className="pointer-events-none absolute -right-[44px] -top-[48px] h-[150px] w-[150px] rounded-full bg-white/16" />
            <div className="pointer-events-none absolute right-[56px] top-[66px] h-[70px] w-[70px] rounded-full bg-cyan-200/16" />
            <div className="pointer-events-none absolute -bottom-[42px] left-[72px] h-[112px] w-[112px] rounded-full bg-violet-950/12" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(15,23,42,0.10))]" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/18">
                    <IdCard className="h-[14px] w-[14px]" strokeWidth={2.6} />
                    Kartu Anggota
                  </div>

                  <h2 className="mt-[18px] text-[22px] font-bold leading-tight tracking-[-0.04em] text-white">
                    M-Banking Koperasi
                  </h2>
                </div>

                <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[14px] bg-white/18 text-white ring-1 ring-white/20">
                  <QrCode className="h-[24px] w-[24px]" strokeWidth={2.5} />
                </span>
              </div>

              <div className="mt-[22px] rounded-[20px] bg-white/12 px-4 py-2 ring-1 ring-white/14">
                <MemberInfoRow
                  label="Nomor Anggota"
                  value={memberNo}
                  copyable
                />
                <div className="h-px w-full bg-white/14" />
                <MemberInfoRow label="Nama" value={memberName} />
              </div>

              <div className="mt-[24px] flex justify-center">
                <MemberQrVisual />
              </div>

              <div className="mt-[18px] text-center text-[12px] font-normal leading-relaxed text-white/78">
                Tunjukkan QR code ini kepada petugas koperasi saat diperlukan.
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}