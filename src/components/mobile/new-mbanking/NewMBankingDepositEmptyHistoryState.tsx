import NewMBankingEmptyStateImage from "@/components/mobile/new-mbanking/NewMBankingEmptyStateImage";

export default function NewMBankingDepositEmptyHistoryState({
  title = "Tidak Ada Riwayat Setoran",
  description = "Belum ada setoran pada bulan yang dipilih.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-[calc(100dvh-235px)] flex-col items-center justify-center px-5 pb-12 pt-4 text-center">
      <NewMBankingEmptyStateImage className="mb-5 h-[168px] w-[168px] object-contain" />

      <div className="text-[16px] font-bold text-black">{title}</div>
      <div className="mx-auto mt-2 max-w-[270px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
        {description}
      </div>
    </div>
  );
}