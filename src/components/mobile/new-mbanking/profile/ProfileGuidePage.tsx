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
      <ol className="grid gap-[12px]">
        {guides.map((guide, index) => (
          <li
            key={guide}
            className="flex items-start gap-3 rounded-[16px] bg-white p-4 ring-1 ring-[#EEF0F4]"
          >
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