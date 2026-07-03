import { Volume2 } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

const announcements = [
  {
    title: "Pemeliharaan Sistem M-Banking",
    date: "30 Juni 2026",
    body: "Layanan M-Banking akan mengalami pemeliharaan singkat pukul 23:00 - 23:30 WIB.",
  },
  {
    title: "Promo Biaya Admin Transfer",
    date: "25 Juni 2026",
    body: "Nikmati biaya admin lebih ringan untuk transfer antar bank selama periode promo.",
  },
  {
    title: "Update Keamanan Akun",
    date: "20 Juni 2026",
    body: "Pastikan PIN dan kata sandi Anda tidak dibagikan kepada siapa pun.",
  },
];

export default function ProfileAnnouncementPage({ onBack }: { onBack: () => void }) {
  return (
    <ProfileSubPageShell title="Pengumuman" onBack={onBack}>
      <div className="grid gap-[14px]">
        {announcements.map((item) => (
          <article
            key={item.title}
            className="rounded-[18px] border border-[#EEF0F4] bg-white px-4 py-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
                <Volume2 className="h-[23px] w-[23px]" strokeWidth={2.8} />
              </span>

              <div className="min-w-0">
                <div className="text-[15px] font-bold leading-tight text-black">
                  {item.title}
                </div>
                <div className="mt-[6px] text-[12px] font-normal leading-none text-[#8F8F8F]">
                  {item.date}
                </div>
                <p className="mt-[10px] text-[13px] font-normal leading-relaxed text-[#4B5563]">
                  {item.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ProfileSubPageShell>
  );
}