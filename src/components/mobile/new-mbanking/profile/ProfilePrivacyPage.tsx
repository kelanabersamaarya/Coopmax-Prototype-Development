import { ShieldCheck } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

const policies = [
  {
    title: "Pengumpulan Data",
    body: "Data digunakan untuk kebutuhan verifikasi akun, keamanan transaksi, dan peningkatan layanan.",
  },
  {
    title: "Keamanan Data",
    body: "Kami menerapkan pengamanan berlapis untuk menjaga informasi pribadi dan aktivitas transaksi Anda.",
  },
  {
    title: "Penggunaan Data",
    body: "Data tidak dibagikan kepada pihak lain tanpa dasar kebutuhan layanan atau ketentuan hukum yang berlaku.",
  },
];

export default function ProfilePrivacyPage({ onBack }: { onBack: () => void }) {
  return (
    <ProfileSubPageShell title="Kebijakan Privasi" onBack={onBack}>
      <div className="rounded-[22px] bg-[#EAF8EF] p-4 ring-1 ring-[#D6F1E0]">
        <div className="flex items-start gap-3">
          <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#15965A] text-white">
            <ShieldCheck className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </span>
          <div>
            <div className="text-[16px] font-bold leading-tight text-black">
              Privasi Anda penting
            </div>
            <p className="mt-2 text-[13px] font-normal leading-relaxed text-[#4B5563]">
              Kami menjaga data pribadi Anda sesuai kebutuhan layanan koperasi.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[22px] grid gap-[12px]">
        {policies.map((policy) => (
          <article key={policy.title} className="rounded-[16px] bg-white p-4 ring-1 ring-[#EEF0F4]">
            <div className="text-[15px] font-bold leading-tight text-black">
              {policy.title}
            </div>
            <p className="mt-2 text-[13px] font-normal leading-relaxed text-[#4B5563]">
              {policy.body}
            </p>
          </article>
        ))}
      </div>
    </ProfileSubPageShell>
  );
}