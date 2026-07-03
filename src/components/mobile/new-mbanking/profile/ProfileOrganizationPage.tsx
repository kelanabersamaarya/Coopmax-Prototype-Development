import { Building2 } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

export default function ProfileOrganizationPage({ onBack }: { onBack: () => void }) {
  return (
    <ProfileSubPageShell title="Struktur Organisasi" onBack={onBack}>
      <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
        <div className="grid h-[94px] w-[94px] place-items-center rounded-full bg-[#EEF6FF] text-[#479DF4]">
          <Building2 className="h-[46px] w-[46px]" strokeWidth={2.4} />
        </div>

        <h2 className="mt-[24px] text-[18px] font-bold leading-tight text-black">
          Belum Ada Struktur Organisasi
        </h2>

        <p className="mt-[10px] max-w-[300px] text-[13px] font-normal leading-relaxed text-[#8F8F8F]">
          Data struktur organisasi koperasi belum tersedia saat ini.
        </p>
      </div>
    </ProfileSubPageShell>
  );
}