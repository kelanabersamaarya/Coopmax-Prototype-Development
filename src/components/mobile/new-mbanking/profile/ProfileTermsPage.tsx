import { FileText } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

const terms = [
  "Pengguna wajib menjaga kerahasiaan username, kata sandi, PIN, dan data pribadi.",
  "Setiap transaksi yang berhasil dikonfirmasi dengan PIN dianggap sah oleh pengguna.",
  "Koperasi dapat melakukan pemeliharaan sistem untuk menjaga kualitas layanan.",
  "Pengguna wajib memastikan data transaksi sudah benar sebelum menekan tombol konfirmasi.",
];

export default function ProfileTermsPage({ onBack }: { onBack: () => void }) {
  return (
    <ProfileSubPageShell title="Syarat dan Ketentuan" onBack={onBack}>
      <div className="flex items-start gap-3 rounded-[22px] bg-[#F8FAFC] p-4 ring-1 ring-[#EEF0F4]">
        <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
          <FileText className="h-[22px] w-[22px]" strokeWidth={2.6} />
        </span>
        <p className="text-[13px] font-normal leading-relaxed text-[#4B5563]">
          Dengan menggunakan layanan M-Banking, pengguna dianggap telah membaca
          dan menyetujui syarat serta ketentuan berikut.
        </p>
      </div>

      <div className="mt-[22px] grid gap-[12px]">
        {terms.map((term) => (
          <div key={term} className="rounded-[16px] bg-white p-4 text-[13px] font-normal leading-relaxed text-black ring-1 ring-[#EEF0F4]">
            {term}
          </div>
        ))}
      </div>
    </ProfileSubPageShell>
  );
}