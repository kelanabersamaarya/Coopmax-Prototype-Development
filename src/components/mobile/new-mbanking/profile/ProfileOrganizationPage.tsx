import NewMBankingEmptyStateImage from "@/components/mobile/new-mbanking/NewMBankingEmptyStateImage";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

export default function ProfileOrganizationPage({ onBack }: { onBack: () => void }) {
  return (
    <ProfileSubPageShell title="Struktur Organisasi" onBack={onBack}>
      <div className="flex min-h-[520px] flex-col items-center justify-center px-4 text-center">
        <NewMBankingEmptyStateImage className="h-[176px] w-[176px] object-contain" />

        <h2 className="mt-[24px] text-[18px] font-bold leading-tight tracking-[-0.02em] text-black">
          Belum Ada Struktur Organisasi
        </h2>

        <p className="mt-[10px] max-w-[300px] text-[13px] font-normal leading-relaxed text-[#8F8F8F]">
          Data struktur organisasi koperasi belum tersedia saat ini.
        </p>
      </div>
    </ProfileSubPageShell>
  );
}