import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

type ContentItem = {
  term: string;
  definition: string;
};

const privacySections = [
  "Definisi",
  "Ruang Lingkup dan Jenis Data Pribadi yang Kami Kumpulkan",
  "Bagaimana Kami Mengumpulkan Data Pribadi Anda",
  "Penggunaan Data Pribadi Anda",
  "Pengungkapan Data Pribadi pada Pihak Lain",
  "Hak - Hak Anda",
  "Penggunaan Cookie",
  "Keamanan Data Pribadi Anda",
  "Tindakan Keamanan Khusus",
  "Perubahan Kebijakan",
  "Kontak",
];

const definitionItems: ContentItem[] = [
  {
    term: "Data Pribadi",
    definition:
      "berarti data mengenai individu tertentu yang diidentifikasi atau dapat diidentifikasi secara tersendiri atau digabungkan dengan Informasi lain baik secara langsung maupun tidak langsung.",
  },
  {
    term: "Informasi",
    definition:
      "berarti keterangan, pernyataan, gagasan, dan tanda-tanda yang mengandung nilai, makna, dan pesan, termasuk data, fakta, dan penjelasannya yang dapat dilihat, didengar, dan dibaca, yang disajikan dalam berbagai kemasan dan format sesuai dengan perkembangan teknologi informasi atau komunikasi, baik secara elektronik maupun non-elektronik.",
  },
  {
    term: "Hukum yang Berlaku",
    definition:
      "berarti semua hukum, undang-undang, peraturan, kebijakan, tata cara, otorisasi, lisensi atau persyaratan dari pengadilan, badan administratif, otoritas, atau badan pengatur, yang berlaku dari waktu ke waktu.",
  },
];

const personalDataScopeItems = [
  "Data Identitas, termasuk namun tidak terbatas pada, nama, jenis kelamin, alamat, tempat dan tanggal lahir, pekerjaan, dan lainnya;",
  "Data Gambar, termasuk namun tidak terbatas pada, foto profil yang diambil oleh pengguna langsung dari kamera perangkat mereka atau disimpan di perpustakaan foto mereka, gambar yang diunggah sebagai bagian dari pembuatan konten atau interaksi dalam aplikasi, dan segala media visual lain yang diberikan oleh pengguna;",
  "Data Kontak, termasuk namun tidak terbatas pada alamat email, nomor ponsel, informasi kontak lainnya yang Anda berikan secara langsung atau diakses dari perangkat Anda, seperti kontak yang tersimpan di ponsel Anda dan lainnya;",
  "Data Pembayaran dan Keuangan, termasuk namun tidak terbatas pada rincian rekening, informasi keuangan, dan lainnya;",
  "Data yang terkait dengan aktivitas Anda ketika menggunakan Layanan, termasuk namun tidak terbatas pada, istilah yang Anda cari, tampilan dan interaksi dengan konten, aktivitas input dan pemrosesan transaksi.",
];

function DefinitionContent() {
  return (
    <ol className="grid list-decimal gap-3 pl-5">
      {definitionItems.map((item) => (
        <li key={item.term} className="pl-1">
          <span className="font-bold text-black">"{item.term}"</span>{" "}
          {item.definition}
        </li>
      ))}
    </ol>
  );
}

function PersonalDataScopeContent() {
  return (
    <div className="grid gap-4">
      <p>
        Berikut ini adalah cakupan dan jenis Data Pribadi tentang Anda yang akan
        Kami proses sehubungan dengan penggunaan Layanan oleh Anda (sebagaimana
        berlaku, yang tergantung pada konteks atau keadaan pengumpulan dan sifat
        Layanan yang digunakan atau transaksi yang dilakukan):
      </p>

      <ol className="grid list-decimal gap-3 pl-5">
        {personalDataScopeItems.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PrivacySectionContent({ section }: { section: string }) {
  if (section === "Definisi") {
    return <DefinitionContent />;
  }

  if (section === "Ruang Lingkup dan Jenis Data Pribadi yang Kami Kumpulkan") {
    return <PersonalDataScopeContent />;
  }

  return (
    <div className="text-[13px] font-normal leading-relaxed text-[#4B5563]">
      Detail kebijakan privasi untuk bagian ini menyusul.
    </div>
  );
}

export default function ProfilePrivacyPage({ onBack }: { onBack: () => void }) {
  return (
    <ProfileSubPageShell title="Kebijakan Privasi" onBack={onBack}>
      <div className="flex items-start gap-3 rounded-[22px] bg-[#EAF8EF] p-4 ring-1 ring-[#D6F1E0]">
        <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#15965A] text-white">
          <ShieldCheck className="h-[22px] w-[22px]" strokeWidth={2.6} />
        </span>

        <p className="text-[13px] font-normal leading-relaxed text-[#4B5563]">
          Kebijakan Privasi ini menjelaskan bagaimana data pribadi Anda
          dikumpulkan, digunakan, dilindungi, dan dikelola dalam layanan
          M-Banking Koperasi.
        </p>
      </div>

      <Accordion type="single" collapsible className="mt-[22px] grid gap-[10px]">
        {privacySections.map((section, index) => (
          <AccordionItem
            key={section}
            value={`privacy-${index}`}
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
                <PrivacySectionContent section={section} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ProfileSubPageShell>
  );
}