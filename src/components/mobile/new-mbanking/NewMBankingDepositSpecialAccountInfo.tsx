import { Copy, FileText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const specialInfo = [
  {
    label: "Nomor Rekening Deposito",
    value: "DEP112233",
  },
  {
    label: "Nomor Bilyet",
    value: "BLY-260630-001",
  },
  {
    label: "Status Perpanjangan",
    value: "ARO Aktif",
  },
  {
    label: "Rekening Penampung Bunga",
    value: "112233111",
  },
];

function SpecialInfoRow({
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

export default function NewMBankingDepositSpecialAccountInfo({
  className,
}: {
  className?: string;
}) {
  return (
    <section
      className={cn(
        "mt-[26px] overflow-hidden rounded-[24px] bg-[#F8FAFC] px-5 py-5 ring-1 ring-[#E5E7EB]",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
          <FileText className="h-[22px] w-[22px]" strokeWidth={2.6} />
        </span>

        <div className="min-w-0">
          <div className="text-[16px] font-bold leading-tight text-black">
            Informasi Khusus Deposito
          </div>
          <div className="mt-[5px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
            Detail identitas rekening deposito dan pengaturan pencairannya.
          </div>
        </div>
      </div>

      <div className="mt-[15px] divide-y divide-[#E5E7EB]">
        {specialInfo.map((item, index) => (
          <SpecialInfoRow
            key={item.label}
            label={item.label}
            value={item.value}
            copyable={index === 0 || item.label === "Nomor Bilyet"}
          />
        ))}
      </div>

      <div className="mt-[15px] flex items-start gap-3 rounded-[16px] bg-white px-4 py-3 ring-1 ring-[#EEF0F4]">
        <span className="mt-[1px] grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full bg-[#EAF8EF] text-[#15965A]">
          <ShieldCheck className="h-[16px] w-[16px]" strokeWidth={2.7} />
        </span>

        <div className="min-w-0 text-[12px] font-normal leading-relaxed text-[#4B5563]">
          Nomor rekening deposito digunakan khusus untuk identifikasi simpanan
          berjangka dan berbeda dari rekening penampung bunga.
        </div>
      </div>
    </section>
  );
}