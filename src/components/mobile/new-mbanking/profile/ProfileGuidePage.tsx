import { BookOpen } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

const guides = [
  "Gunakan menu Beranda untuk melihat ringkasan simpanan, pinjaman, dan deposito.",
  "Pilih Setor untuk membuat instruksi setoran melalui Virtual Account.",
  "Gunakan Transfer untuk mengirim dana ke sesama rekening atau antar bank.",
  "Pilih Bayar atau Beli untuk transaksi tagihan, pulsa, paket data, dan QRIS.",
  "Jaga kerahasiaan PIN, kata sandi, dan kode OTP Anda.",
];

export default function ProfileGuidePage({ onBack }: { onBack: () => void }) {
  return (
    <ProfileSubPageShell title="Petunjuk Penggunaan" onBack={onBack}>
      <div className="rounded-[22px] bg-[#F8FAFC] p-4 ring-1 ring-[#EEF0F4]">
        <div className="flex items-start gap-3">
          <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#15965A] text-white">
            <BookOpen className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </span>
          <div>
            <div className="text-[16px] font-bold leading-tight text-black">
              Panduan Singkat M-Banking
            </div>
            <p className="mt-2 text-[13px] font-normal leading-relaxed text-[#6B7280]">
              Ikuti panduan berikut agar transaksi Anda lebih mudah dan aman.
            </p>
          </div>
        </div>
      </div>

      <ol className="mt-[22px] grid gap-[12px]">
        {guides.map((guide, index) => (
          <li key={guide} className="flex items-start gap-3 rounded-[16px] bg-white p-4 ring-1 ring-[#EEF0F4]">
            <span className="grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full bg-[#EEF6FF] text-[12px] font-bold text-[#479DF4]">
              {index + 1}
            </span>
            <span className="text-[13px] font-normal leading-relaxed text-black">
              {guide}
            </span>
          </li>
        ))}
      </ol>
    </ProfileSubPageShell>
  );
}