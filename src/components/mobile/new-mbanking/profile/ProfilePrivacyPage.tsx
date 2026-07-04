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

const dataCollectionItems = [
  "Melalui penyediaan langsung oleh Anda ketika Anda mendaftar atau menggunakan Layanan, baik secara online maupun offline, termasuk ketika seseorang mengunjungi kantor kami dan meminta untuk menjadi anggota, di mana staf kami membantu mereka melalui proses pendaftaran, dan mereka memberikan informasi pribadi yang diperlukan untuk keanggotaan;",
  "Melalui Platform, browser, dan perangkat yang Anda gunakan; Informasi yang Kami kumpulkan meliputi ID unik, jenis dan pengaturan browser, jenis dan pengaturan perangkat, sistem operasi, informasi jaringan seluler termasuk nama operator dan nomor telepon, serta nomor versi aplikasi. Kami juga mengumpulkan informasi tentang aplikasi, browser, dan interaksi perangkat Anda dengan Layanan Kami, termasuk alamat IP Anda, laporan kerusakan, aktivitas sistem, dan waktu, tanggal, serta URL pengarah permintaan Anda.",
  "Jika Anda memberikan kepada Kami Data Pribadi yang terkait dengan individu lain (seperti Data Pribadi pasangan Anda, anggota keluarga, atau pihak lain), Anda menyatakan bahwa Anda telah memperoleh persetujuan dari individu yang bersangkutan, dan dengan ini menyetujui atas nama individu tersebut untuk pengumpulan, penggunaan, pengungkapan, dan pemrosesan Data Pribadi mereka oleh Kami.",
];

const personalDataUsageItems = [
  "Menyediakan Layanan dan/atau Produk Kami.",
  "Penggunaan fitur-fitur yang tersedia dalam Layanan Kami.",
  "Untuk mempersonalisasi pengalaman Anda (contohnya, menampilkan foto profil Anda), informasi Anda membantu kami untuk lebih baik menanggapi kebutuhan individu Anda.",
  "Mendaftarkan Anda sebagai pengguna pada Platform Kami, dan juga untuk mengurus dan/atau mengelola akun Anda.",
  "Menginformasikan kepada Anda mengenai aktivitas yang terjadi pada Platform Kami atau platform/sistem lain yang terhubung dengan Platform Kami.",
  "Berinteraksi secara langsung dengan Anda dan memberitahukan kepada Anda mengenai setiap pembaruan atau perubahan pada Layanan.",
  "Memberitahukan kepada Anda setiap informasi sehubungan dengan penggunaan Layanan.",
  "Melakukan pemeliharaan, peningkatan, pemecahan masalah, pengembangan dan personalisasi/kustomisasi Layanan untuk memenuhi kebutuhan dan preferensi Anda.",
  "Menawarkan atau menyediakan layanan dari afiliasi atau mitra Kami (jika ada).",
  "Mengembangkan layanan baru.",
  "Memantau, memahami dan menganalisis aktivitas dan perilaku Anda termasuk kebiasaan dan penggunaan berbagai layanan yang tersedia di Platform.",
  "Menyediakan afiliasi dan/atau pihak ketiga yang bekerja sama dengan Kami (dalam hal ini vendor, agen, pemasok, kontraktor, konsultan, mitra dan pihak lain yang memberikan layanan kepada Kami atau Anda) yang secara teknis diperlukan untuk memproses transaksi Anda atau tujuan kerja sama Kami dengan pihak ketiga tersebut (jika ada).",
  "Menangani atau menyelesaikan keluhan sehubungan dengan masalah operasional yang terjadi pada Layanan.",
  "Menghasilkan informasi statistik dan data analitis untuk tujuan pengujian, penelitian, analisis, pengembangan produk.",
  "Mematuhi semua kewajiban berdasarkan Hukum yang Berlaku, termasuk namun tidak terbatas pada menanggapi permintaan, pertanyaan, atau arahan dari peraturan dan/atau anggota pemerintah.",
  "Membantu meningkatkan keamanan dan keandalan layanan Kami. Hal ini termasuk mendeteksi, mencegah, dan menanggapi penipuan, penyalahgunaan, risiko keamanan, aktivitas kriminal, atau penyalahgunaan Layanan Kami, masalah teknis yang dapat merugikan danarahayu, pengguna Kami, atau publik, serta untuk memastikan keamanan sistem, arsitektur, dan jaringan TI Kami.",
  "Tujuan lain yang Kami beritahukan kepada Anda, dan/atau jika diwajibkan oleh Hukum yang Berlaku, sebagaimana Kami akan mendapatkan persetujuan Anda.",
];

const dataDisclosureItems = [
  "Kami tidak akan mengungkapkan, memberikan akses, membagikan dan/atau mendistribusikan Data Pribadi Anda tanpa persetujuan Anda kecuali ditentukan lain dalam Kebijakan ini. Kami hanya akan mengungkapkan Data Pribadi Anda kepada pihak lain (i) berdasarkan persetujuan Anda atau (ii) jika diizinkan atau diwajibkan oleh Hukum yang Berlaku atau (iii) diinstruksikan oleh otoritas pemerintah, atau (iv) berdasarkan perintah pengadilan (sebagaimana relevan).",
  "Selain yang diatur dalam Kebijakan ini, Kami dapat mengungkapkan, memberikan akses, dan/atau membagikan Data Pribadi Anda jika kami telah memperoleh persetujuan Anda untuk pengungkapan yang relevan. Apabila Anda memberikan persetujuan Anda kepada Kami untuk mengungkapkan Data Pribadi Anda kepada pihak ketiga tertentu, maka Anda mengizinkan Kami untuk mengakses dan mengirimkan data tersebut kepada pihak ketiga yang dipilih dan Anda membebaskan Kami dari segala dampak yang timbul dari pemrosesan Data Pribadi Anda oleh pihak ketiga tersebut. Kami menyarankan Anda untuk memeriksa dan memahami kebijakan privasi yang diterapkan oleh pihak ketiga manapun yang telah Anda setujui untuk memberikan Data Pribadi Anda.",
  "Kami tidak akan menjual atau menyewakan Data Pribadi Anda kepada pihak manapun.",
];

const rightsItems = [
  "Memperbarui dan/atau memperbaiki kesalahan dan/atau ketidakakuratan Data Pribadi Anda yang tercatat pada Platform;",
  "Menarik persetujuan Anda untuk memproses Data Pribadi pada Platform;",
  "Menghapus dan/atau memusnahkan Data Pribadi Anda, dengan memberikan pemberitahuan tertulis kepada Kami yang ditujukan kepada admin@sakti.id.",
  "Sehubungan dengan permintaan Anda untuk menarik persetujuan Anda, Anda harus memahami dan mengakui bahwa setelah permohonan Anda diajukan kepada Kami, Anda mungkin tidak lagi dapat menggunakan Layanan. Penarikan persetujuan Anda dapat mengakibatkan penghentian akun Anda atau hubungan kontraktual Anda dengan Kami, dengan semua hak dan kewajiban yang tampaknya telah terpenuhi sepenuhnya. Setelah menerima pemberitahuan untuk menarik persetujuan atas pemrosesan Data Pribadi Anda, Kami akan memberi tahu Anda tentang kemungkinan konsekuensi dari penarikan tersebut sehingga Anda dapat memutuskan apakah Anda masih ingin menarik persetujuan tersebut.",
  "Kami berkomitmen untuk menghormati hak Anda untuk mengontrol data pribadi Anda. Jika Anda ingin meminta penghapusan data pribadi Anda dari sistem kami, silakan hubungi kami di Form Permintaan Penghapusan Data Pribadi. Kami akan menanggapi permintaan Anda dalam waktu 30 hari dan mengambil langkah yang tepat untuk memastikan penghapusan data Anda secara permanen dari semua sistem dan basis data kami.",
  "Harap diperhatikan bahwa data tertentu dapat dikecualikan dari penghapusan untuk mematuhi kewajiban hukum atau untuk tujuan bisnis yang sah. Dalam hal demikian, kami akan memberi tahu Anda tentang alasan penyimpanan data dan dasar hukum yang berlaku.",
];

const cookieUsageItems = [
  "Cookie adalah file teks yang ditempatkan pada komputer Anda untuk tujuan pencatatan. Kami menggunakan cookie untuk membantu Kami mempermudah Anda dalam menggunakan Produk.",
  "Cookies akan merekam data Anda seperti data yang Anda simpan pada Platform. Sebagai contoh, jika Anda membuat akun di Platform, cookie akan membantu Kami mengingat data spesifik untuk kunjungan Anda berikutnya. Ketika Anda kembali ke Platform, data yang Anda berikan sebelumnya akan diberikan kembali, sehingga akan lebih mudah jika Anda mengaktifkan cookies Anda.",
  "Selain itu, pihak lain juga dapat menganalisis data untuk Kami, seperti Google Analytics. Mereka dapat mengumpulkan data non-pribadi Anda tentang aktivitas online Anda ketika Anda menggunakan layanan Kami atau mengakses Platform.",
];

const personalDataSecurityItems = [
  "Kami selalu berusaha untuk meningkatkan keamanan Data Pribadi Anda dengan menggunakan teknologi terbaru dan mematuhi peraturan yang berlaku untuk memenuhi harapan pihak-pihak terkait, dan untuk memastikan peningkatan kualitas yang berkelanjutan. Selain itu, Kami menganggap melindungi Data Pribadi Anda sebagai prioritas Kami dengan menggunakan standar tertinggi untuk mengamankan Data Pribadi Anda.",
  "Meskipun Kami akan berusaha melindungi Data Pribadi Anda, Kami tidak dapat menjamin keutuhan dan keakuratan Data Pribadi yang Anda berikan melalui internet, mengingat pengiriman informasi melalui internet tidak sepenuhnya aman. Anda berkewajiban untuk menjaga kerahasiaan akun Anda dan Anda harus selalu menjaga dan bertanggung jawab atas keamanan perangkat yang Anda gunakan.",
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

function DataCollectionContent() {
  return (
    <div className="grid gap-4">
      <p>
        Kami memperoleh dan mengumpulkan Data Pribadi Anda dengan beberapa cara,
        seperti:
      </p>

      <ol className="grid list-decimal gap-3 pl-5">
        {dataCollectionItems.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PersonalDataUsageContent() {
  return (
    <div className="grid gap-4">
      <p>
        Untuk Data Pribadi Anda yang Kami kumpulkan, Kami dapat menggunakannya
        untuk tujuan-tujuan berikut ini atau tujuan-tujuan lain yang diwajibkan
        atau diizinkan oleh Hukum yang Berlaku ("Tujuan"):
      </p>

      <ol className="grid list-decimal gap-3 pl-5">
        {personalDataUsageItems.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ol>

      <p>
        Kami menggunakan berbagai teknologi untuk memproses Data Pribadi Anda
        untuk Tujuan yang disebutkan di atas. Kami menggunakan sistem otomatis
        yang menganalisis konten Anda untuk menyediakan hal-hal seperti hasil
        pencarian yang disesuaikan atau fitur lain yang disesuaikan dengan cara
        Anda menggunakan layanan Kami. Kami juga menganalisis konten Anda untuk
        membantu Kami mendeteksi penyalahgunaan seperti spam, malware, dan konten
        ilegal.
      </p>

      <p>
        Data Pribadi Anda akan disimpan selama Anda menggunakan aplikasi atau
        selama periode yang diperlukan untuk mencapai Tujuan, mana saja yang
        lebih lama.
      </p>
    </div>
  );
}

function DataDisclosureContent() {
  return (
    <ol className="grid list-decimal gap-3 pl-5">
      {dataDisclosureItems.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ol>
  );
}

function RightsContent() {
  return (
    <div className="grid gap-4">
      <p>
        Sehubungan dengan pemrosesan Data Pribadi Anda melalui Platform Kami,
        Anda memiliki hak untuk:
      </p>

      <ol className="grid list-decimal gap-3 pl-5">
        {rightsItems.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

function CookieUsageContent() {
  return (
    <ol className="grid list-decimal gap-3 pl-5">
      {cookieUsageItems.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ol>
  );
}

function PersonalDataSecurityContent() {
  return (
    <ol className="grid list-decimal gap-3 pl-5">
      {personalDataSecurityItems.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ol>
  );
}

function PrivacySectionContent({ section }: { section: string }) {
  if (section === "Definisi") {
    return <DefinitionContent />;
  }

  if (section === "Ruang Lingkup dan Jenis Data Pribadi yang Kami Kumpulkan") {
    return <PersonalDataScopeContent />;
  }

  if (section === "Bagaimana Kami Mengumpulkan Data Pribadi Anda") {
    return <DataCollectionContent />;
  }

  if (section === "Penggunaan Data Pribadi Anda") {
    return <PersonalDataUsageContent />;
  }

  if (section === "Pengungkapan Data Pribadi pada Pihak Lain") {
    return <DataDisclosureContent />;
  }

  if (section === "Hak - Hak Anda") {
    return <RightsContent />;
  }

  if (section === "Penggunaan Cookie") {
    return <CookieUsageContent />;
  }

  if (section === "Keamanan Data Pribadi Anda") {
    return <PersonalDataSecurityContent />;
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