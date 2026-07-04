import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";
import { cn } from "@/lib/utils";

const termsSections = [
  "Definisi",
  "Keanggotaan",
  "Persyaratan Keanggotaan",
  "Registrasi Keanggotaan",
  "Aktivasi Status Keanggotaan",
  "Pengamanan Transaksi",
  "Penggunaan M-Banking",
  "Pelayanan dan Penyelesaian Pengaduan",
  "Nilai Tambah Penggunaan M-Banking",
  "Biaya Penggunaan M-Banking",
  "Pemblokiran (Penghentian Sementara) Akses M-Banking",
  "Pengakhiran Keanggotaan M-Banking",
  "Force Majeure",
  "Lain - Lain",
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

      <Accordion type="single" collapsible className="mt-[22px] grid gap-[10px]">
        {termsSections.map((section, index) => (
          <AccordionItem
            key={section}
            value={`terms-${index}`}
            className={cn(
              "overflow-hidden rounded-[16px] border border-[#EEF0F4] bg-white px-0",
              "shadow-none",
            )}
          >
            <AccordionTrigger
              className={cn(
                "min-h-[58px] px-4 py-4 text-left hover:no-underline",
                "text-[14px] font-bold leading-tight text-black",
                "[&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-black",
              )}
            >
              {section}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-0">
              <div className="border-t border-[#EEF0F4] pt-4 text-[13px] font-normal leading-relaxed text-[#4B5563]">
                Konten bagian ini akan dilengkapi sesuai materi yang Anda
                berikan.
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ProfileSubPageShell>
  );
}