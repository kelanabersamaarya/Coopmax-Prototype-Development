import * as React from "react";
import { Copy, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingMemberQrModal from "@/components/mobile/new-mbanking/NewMBankingMemberQrModal";

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

      <div className="mt-[5px] flex min-w-0 items-center gap-2">
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
  const [qrOpen, setQrOpen] = React.useState(false);

  return (
    <>
      <NewMBankingMemberQrModal
        open={qrOpen}
        onOpenChange={setQrOpen}
        memberNo={memberNo}
        memberName={memberName}
      />

      <article
        className={cn(
          "relative overflow-hidden rounded-[24px] px-5 py-5 text-white",
          "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_50%,#7C3AED_100%)]",
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
              <h2 className="text-[21px] font-bold leading-tight tracking-[-0.04em] text-white">
                Koperasi Bukit Indah
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[14px] bg-white/18 text-white ring-1 ring-white/20 transition active:scale-[0.96]"
              aria-label="Tampilkan QR anggota"
              title="Tampilkan QR anggota"
            >
              <QrCode className="h-[23px] w-[23px]" strokeWidth={2.5} />
            </button>
          </div>

          <div className="mt-[18px] grid gap-[12px]">
            <MemberInfo label="Nama" value={memberName} />
            <div className="h-px w-full bg-white/14" />
            <MemberInfo label="Nomor Anggota" value={memberNo} copyable />
          </div>
        </div>
      </article>
    </>
  );
}