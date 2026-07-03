import { Copy, IdCard, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

function MemberQrVisual() {
  const cells = Array.from({ length: 15 * 15 }).map((_, index) => {
    const row = Math.floor(index / 15);
    const col = index % 15;

    const topLeft = row < 5 && col < 5;
    const topRight = row < 5 && col > 9;
    const bottomLeft = row > 9 && col < 5;
    const middle =
      (row >= 6 && row <= 9 && col >= 6 && col <= 9) ||
      (row + col) % 5 === 0 ||
      (row * 3 + col * 7) % 11 === 0;

    const finderGap =
      ((row === 1 || row === 3) && (col < 5 || col > 9)) ||
      ((col === 1 || col === 3) && (row < 5 || row > 9));

    return topLeft || topRight || bottomLeft ? !finderGap : middle;
  });

  return (
    <div className="grid h-[118px] w-[118px] shrink-0 grid-cols-[repeat(15,minmax(0,1fr))] gap-[2px] rounded-[18px] bg-white p-[13px] shadow-sm ring-1 ring-white/60">
      {cells.map((active, index) => (
        <span
          key={index}
          className={cn(active ? "rounded-[1.5px] bg-black" : "bg-white")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function MemberInfo({
  label,
  value,
  copyable = false,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-normal leading-none text-white/72">
        {label}
      </div>

      <div className="mt-[7px] flex min-w-0 items-center gap-2">
        <div className="truncate text-[15px] font-bold leading-tight text-white">
          {value}
        </div>

        {copyable ? (
          <button
            type="button"
            className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
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

export default function NewMBankingMemberCard({
  memberNo = "AGT-2600006",
  memberName = "Laura Patel",
  className,
}: {
  memberNo?: string;
  memberName?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[24px] px-5 py-5 text-white",
        "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_50%,#7C3AED_100%)]",
        "shadow-[0_14px_34px_rgba(37,99,235,0.20)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-[42px] -top-[44px] h-[142px] w-[142px] rounded-full bg-white/16" />
      <div className="pointer-events-none absolute right-[54px] top-[70px] h-[66px] w-[66px] rounded-full bg-cyan-200/16" />
      <div className="pointer-events-none absolute -bottom-[40px] left-[74px] h-[108px] w-[108px] rounded-full bg-violet-950/12" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(15,23,42,0.10))]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/18">
              <IdCard className="h-[14px] w-[14px]" strokeWidth={2.6} />
              Kartu Anggota
            </div>

            <h2 className="mt-[16px] text-[21px] font-bold leading-tight tracking-[-0.04em] text-white">
              M-Banking Koperasi
            </h2>
          </div>

          <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[14px] bg-white/18 text-white ring-1 ring-white/20">
            <QrCode className="h-[23px] w-[23px]" strokeWidth={2.5} />
          </span>
        </div>

        <div className="mt-[20px] grid grid-cols-[minmax(0,1fr)_118px] items-center gap-4">
          <div className="grid min-w-0 gap-[18px]">
            <MemberInfo label="Nomor Anggota" value={memberNo} copyable />
            <MemberInfo label="Nama" value={memberName} />
          </div>

          <MemberQrVisual />
        </div>
      </div>
    </article>
  );
}