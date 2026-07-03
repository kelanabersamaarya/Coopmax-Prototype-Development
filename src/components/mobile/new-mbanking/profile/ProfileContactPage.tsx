import { Mail, MapPin, Phone } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

const contacts = [
  {
    icon: Phone,
    label: "Telepon",
    value: "(0361) 974213",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "081338263322",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@koperasi.co.id",
  },
  {
    icon: MapPin,
    label: "Alamat",
    value: "Jl. Koperasi Digital No. 1, Bali",
  },
];

export default function ProfileContactPage({ onBack }: { onBack: () => void }) {
  return (
    <ProfileSubPageShell title="Kontak Kami" onBack={onBack}>
      <div className="grid gap-[12px]">
        {contacts.map((contact) => {
          const Icon = contact.icon;

          return (
            <div
              key={`${contact.label}-${contact.value}`}
              className="flex items-start gap-3 rounded-[18px] bg-white p-4 ring-1 ring-[#EEF0F4]"
            >
              <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
                <Icon className="h-[22px] w-[22px]" strokeWidth={2.6} />
              </span>

              <div className="min-w-0">
                <div className="text-[13px] font-normal leading-none text-[#8F8F8F]">
                  {contact.label}
                </div>
                <div className="mt-[8px] text-[15px] font-bold leading-snug text-black">
                  {contact.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ProfileSubPageShell>
  );
}