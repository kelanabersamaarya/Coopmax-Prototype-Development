import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";
import { cn } from "@/lib/utils";

const definitionItems = [
  "M-Banking DAM adalah fasilitas elektronik channel dari M-Banking DAM yang dapat diakses oleh Anggota Pengguna M-Banking DAM dengan menggunakan smartphone Android yang telah melakukan registrasi.",
  "Koperasi Konsumen Dana Asri Mandiri adalah Koperasi Konsumen yang berkedudukan di Jl Antasura Gg. Dewi Madri I, Br. Jurang Asri, Peguyangan Kangin, Denpasar Utara, Kota Denpasar.",
  "Solusi Anak Sakti adalah Perseroan Terbatas yand telah melakukan kerja sama resmi dengan M-Banking DAM dalam pengembangan Aplikasi M-Banking DAM.",
  "Aplikasi M-Banking DAM adalah aplikasi yang Koperasi Konsumen Dana Asri Mandiri yang dapat diunduh melalui Smartphone.",
  "Anggota adalah perorangan pemilik rekening Tabungan, Pinjaman dan Deposito di Koperasi Konsumen Dana Asri Mandiri.",
  "Anggota Pengguna adalah Anggota yang telah terdaftar sebagai pengguna fasilitas M-Banking DAM.",
  "Virtual Account adalah nomor identifikasi pelanggan perusahaan yang dibuka oleh Bank atas permintaan perusahaan untuk selanjutnya diberikan oleh perusahaan kepada pelanggannya (perorangan maupun non perorangan) sebagai No Rekening Tujuan penerimaan (collection). Dimana setiap setoran atas keuntungan Virtual Account, sistem secara otomatis membuku ke Rekening Utama dengan mencantumkan Nomor dan Nama Rekening Virtual.",
  "SMS OTP adalah sms yang berisi PIN sekali pakai untuk validasi proses Aktivasi M-Banking DAM. SMS OTP dikirim oleh sistem M-Banking DAM ke nomor handphone Anggota saat Anggota melalukan Aktivasi M-Banking DAM.",
  "Username adalah identitas Pengguna M-Banking DAM yang bersifat rahasia (hanya boleh diketahui oleh Pengguna M-Banking DAM yang sah), yang dibuat sendiri oleh Anggota saat Registrasi M-Banking DAM dan harus dicantumkan/di-input setiap kali mengakses aplikasi M-Banking DAM.",
  "Kata Sandi adalah kode identifikasi untuk otorisasi akses aplikasi M-Banking DAM. Kata Sandi awal diberikan langsung dari petugas M-Banking DAM yang bersifat umum dan wajib diganti langsung oleh Anggota saat proses aktivasi aplikasi M-Banking DAM dengan menggunakan huruf dan angka sebagai kode akses yang dibuat sendiri dari Anggota dan bersifat rahasia (hanya boleh diketahui oleh Pengguna M-Banking DAM yang sah) dan dapat dirubah sewaktu-waktu oleh Anggota.",
  "PIN adalah kode akses/login aplikasi M-Banking DAM yang bersifat rahasia (hanya boleh diketahui oleh Pengguna M-Banking DAM yang sah), yang dibuat sendiri oleh Anggota saat melakukan Aktivasi M-Banking DAM dan harus dicantumkan/di-input setiap kali mengakses aplikasi M-Banking DAM.",
  "Rekening adalah simpanan dana dalam rupiah dapat berupa produk Tabungan.",
  "Smartphone adalah telepon genggam yang mempunyai kemampuan dengan pengunaan dan fungsi yang menyerupai komputer.",
  "Registrasi adalah proses pendaftaran Anggota M-Banking DAM agar dapat digunakan untuk melakukan Transaksi.",
  "Aktivasi adalah proses pengaktifan aplikasi M-Banking DAM dan sebagai verifikasi Nomor handphone yang didaftarkan dengan nomor telfon yang digunakan oleh Anggota.",
  "Blokir Akun M-Banking DAM proses penonaktifan Akun M-Banking DAM secara manual melalui customer service yang sifatnya sementara atas permintaan Anggota Pengguna.",
  "Ubah nomor Handphone adalah proses pembaharuan nomor handphone Anggota Pengguna yang dilakukan.",
];

const membershipItems = [
  "Keanggotaan M-Banking DAM diatur sebagai berikut:",
  "Untuk dapat menggunakan fasilitas M-Banking DAM, calon pengguna harus memenuhi persyaratan keanggotaan M-Banking DAM yang berlaku, melakukan Registrasi dan melakukan Aktivasi fasilitas tersebut.",
  "Keanggotaan M-Banking DAM dapat diakhiri secara sepihak oleh Anggota Pengguna maupun oleh pihak Koperasi Konsumen Dana Asri Mandiri.",
  "Untuk dapat menggunakan fasilitas M-Banking DAM, calon pengguna harus terlebih dahulu melakukan registrasi di Kantor Koperasi Konsumen Dana Asri Mandiri.",
  "Anggota Pengguna wajib melakukan pengkinian data ke M-Banking DAM setiap kali ada perubahan data pribadi khususnya perubahan alamat e-mail dan/atau nomor handphone yang aktif.",
  "Segala kerugian yang timbul akibat tidak dilakukannya pengkinian data oleh Anggota Pengguna kepada Koperasi Konsumen Dana Asri Mandiri, khususnya perubahan alamat e-mail dan/atau nomor handphone aktif Anggota, menjadi tanggung jawab Anggota Pengguna sepenuhnya.",
];

const membershipRequirementItems = [
  "Anggota M-Banking DAM yang memiliki rekening Tabungan, Pinjaman dan Deposito aktif.",
  "Memiliki nomor handphone dan alamat email pribadi yang masih aktif digunakan Anggota.",
  "Berusia minimal 15 tahun.",
  "Mengisi Formulir Registrasi dan Aktivasi M-Banking DAM di Kantor Koperasi Konsumen Dana Asri Mandiri.",
  "Telah membaca dan memahami syarat menjadi Anggota Pengguna M-Banking DAM.",
];

const membershipRegistrationItems = [
  "Registrasi M-Banking DAM wajib dilakukan sendiri oleh Anggota yang bersangkutan (tidak boleh diwakilkan) dengan membawa dokumen asli sesuai persyaratan keanggotaan M-Banking DAM.",
  "Dokumen asli yang wajib dibawa oleh Anggota yaitu identitas diri (KTP/SIM/Passport) dan bukti kepemilikan rekening (buku tabungan).",
  "Registrasi hanya dapat dilakukan melalui Kantor Koperasi Konsumen Dana Asri Mandiri.",
  "Anggota wajib mendaftarkan nomor handphone pribadi miliknya dan dilarang untuk mendaftarkan nomor handphone milik orang lain dengan alasan apapun.",
  "Risiko yang timbul akibat kelalaian dan/atau penyalahgunaan data oleh Anggota dalam pelaksanaan Registrasi, seperti mendaftarkan nomor handphone yang bukan milik pribadinya ataupun membuat Kata Sandi dan PIN yang mudah ditebak, akan menjadi tanggung jawab Anggota.",
];

const membershipActivationItems = [
  "Aktivasi hanya dapat dilakukan melalui aplikasi M-Banking DAM yang ter-install pada smartphone Anggota, untuk itu Anggota wajib meng-install terlebih dahulu aplikasi M-Banking DAM pada smartphone.",
  "Anggota Pengguna wajib menggunakan aplikasi resmi M-Banking DAM yang disediakan oleh M-Banking DAM pada Google Playstore yang didaftarkan oleh PT. Solusi Anak Sakti.",
  "Segala kerugian yang ditimbulkan akibat penggunaan aplikasi M-Banking DAM yang tidak berasal dari Koperasi Konsumen Dana Asri Mandiri, menjadi tanggung jawab Anggota Pengguna sepenuhnya.",
  "Aktivasi M-Banking DAM wajib dilakukan sendiri oleh Anggota yang bersangkutan (tidak boleh dilakukan oleh orang lain) dengan menggunakan smartphone pribadi milik Anggota.",
  "Anggota hanya dapat mengaktifkan 1 (satu) aplikasi M-Banking DAM pada 1 (satu) smartphone yang memiliki nomor Handphone sesuai dengan yang didaftarkan pada proses registrasi. Apabila terdapat lebih dari 1 (satu) smartphone yang mengaktifkan aplikasi M-Banking DAM dengan Username dan Nomor Handphone yang sama maka hanya smartphone yang terakhir mengaktifkan aplikasi tersebut yang dapat digunakan.",
];

const transactionSecurityItems: Array<
  | string
  | {
      text: string;
      subItems: string[];
    }
> = [
  "Kerahasiaan dan penggunaan Username M-Banking DAM adalah sepenuhnya menjadi tanggung jawab Anggota Pengguna dan hanya boleh diketahui serta digunakan oleh Anggota Pengguna yang bersangkutan.",
  {
    text: "Anggota Pengguna wajib menjaga kerahasiaan Username, Kata Sandi dan PIN miliknya agar tidak diketahui dan tidak digunakan oleh orang lain, diantaranya dengan cara:",
    subItems: [
      "Tidak memberitahukannya kepada siapapun termasuk kepada petugas Koperasi.",
      "Tidak mencatat atau menyimpannya secara tertulis pada kertas atau media penyimpanan lainnya yang memungkinkan diketahui orang lain.",
      "Berhati-hati dalam menggunakannya agar tidak terlihat orang lain.",
      "Mengganti PIN atau Kata Sandi M-Banking DAM secara berkala.",
      "Tidak menggunakan PIN dan Kata Sandi yang mudah ditebak seperti penggunaan identitas pribadi atau tanggal lahir.",
      "PIN dan Kata Sandi hendaknya tidak disamakan atau diatur berbeda dari PIN atau Kata Sandi e-channel lainnya.",
    ],
  },
  "Anggota Pengguna diberikan kebebasan untuk membuat PIN dan Kata Sandi-nya sendiri dan dapat mengubah atau menggantinya setiap saat.",
  "Apabila handphone yang digunakan untuk bertransaksi M-Banking DAM hilang, dicuri, atau berganti kepemilikan maka Anggota Pengguna wajib memberitahukan hal tersebut kepada Koperasi Konsumen Dana Asri Mandiri melalui nomor telepon resmi Koperasi Konsumen Dana Asri Mandiri.",
  "Dalam hal Anggota Pengguna mengetahui atau menduga Username, PIN atau Kata Sandi miliknya telah diketahui oleh orang lain yang tidak berwenang, maka Anggota Pengguna wajib segera melakukan pengamanan dan perubahan terhadap Username, PIN atau Kata Sandi.",
  "Apabila karena suatu sebab Anggota Pengguna tidak dapat melakukan perubahan terhadap Username, PIN atau Kata Sandi miliknya maka Anggota Pengguna wajib memberitahukan Koperasi Konsumen Dana Asri Mandiri melalui nomor telepon resmi Koperasi Konsumen Dana Asri Mandiri.",
  "Sebelum diterimanya permintaan dari Anggota Pengguna, maka segala perintah, transaksi dan komunikasi berdasarkan penggunaan Username, PIN dan/atau Kata Sandi oleh pihak yang tidak berwenang sepenuhnya menjadi tanggung jawab Anggota Pengguna.",
  "Penggunaan Username, PIN dan/atau Kata Sandi mempunyai kekuatan hukum yang sama dengan perintah tertulis yang ditandatangani oleh Anggota Pengguna, oleh karena itu Anggota Pengguna dengan ini menyatakan bahwa penggunaan Username, PIN dan/atau Kata Sandi dalam setiap perintah pada transaksi M-Banking DAM juga merupakan pemberian kuasa dari Anggota Pengguna kepada Koperasi Konsumen Dana Asri Mandiri untuk melaksanakan transaksi termasuk untuk melakukan pendebetan rekening Anggota Pengguna baik dalam rangka pelaksanaan transaksi yang diperintahkan maupun untuk pembayaran biaya transaksinya.",
  "Penyalahgunaan Username, PIN dan/atau Kata Sandi M-Banking DAM beserta akibatnya merupakan tanggung jawab Anggota Pengguna sepenuhnya.",
  "Anggota wajib menjaga smartphone miliknya dari aplikasi berbahaya seperti virus, malware, trojan, dan lain-lain, baik sebelum maupun setelah instalasi aplikasi M-Banking DAM.",
  "Segala kerugian yang ditimbulkan akibat aktivitas aplikasi berbahaya yang terdapat pada smartphone milik Anggota Pengguna, merupakan tanggung jawab Anggota Pengguna sepenuhnya.",
];

const mbankingUsageItems: Array<
  | string
  | {
      text: string;
      subItems: string[];
    }
> = [
  "M-Banking DAM hanya boleh digunakan oleh Anggota Pengguna yang sah, yaitu Anggota yang terdaftar pada sistem database M-Banking DAM sesuai dengan Username dan nomor handphone yang didaftarkannya.",
  "Segala kerugian yang ditimbulkan akibat penggunaan M-Banking DAM oleh pihak lain yang tidak berhak menjadi tanggung jawab Anggota Pengguna sepenuhnya.",
  "Anggota Pengguna dapat memanfaatkan M-Banking DAM untuk Transaksi Finansial yang telah ditentukan oleh Koperasi Konsumen Dana Asri Mandiri.",
  "Anggota Pengguna wajib mengisi secara lengkap dan benar serta memastikan ketepatan dan kelengkapan data yang dibutuhkan untuk Transaksi Finansial yang akan dilakukan.",
  "Koperasi Konsumen Dana Asri Mandiri tidak bertanggung jawab terhadap segala dampak apapun yang mungkin timbul yang diakibatkan kelalaian, ketidaklengkapan, ketidakjelasan atau ketidaktepatan data yang diisi oleh Anggota Pengguna, baik saat registrasi maupun saat melakukan Transaksi Finansial.",
  "Anggota Pengguna memiliki kesempatan untuk memeriksa kembali dan/atau membatalkan data yang telah diisi pada saat konfirmasi transaksi.",
  "Apabila telah diyakini kebenaran dan kelengkapan data yang diisi, sebagai tanda persetujuan pelaksanaan Transaksi Finansial, maka Anggota Pengguna wajib memasukkan PIN pada tampilan PIN yang ditampilkan setelah konfirmasi.",
  "Setiap perintah yang telah disetujui oleh Anggota Pengguna yang tersimpan pada pusat data Koperasi Konsumen Dana Asri Mandiri merupakan data yang benar yang diterima sebagai bukti perintah dari Anggota Pengguna kepada Koperasi Konsumen Dana Asri Mandiri untuk melaksanakan perintah yang dimaksud.",
  "Koperasi Konsumen Dana Asri Mandiri menerima dan menjalankan setiap perintah dari Anggota Pengguna sebagai perintah yang sah berdasarkan penggunaan Username, Kata Sandi dan PIN, maka Koperasi Konsumen Dana Asri Mandiri tidak mempunyai kewajiban untuk meneliti atau menyelidiki keaslian maupun keabsahan atau kewenangan pengguna Username, PIN dan Kata Sandi Transaksi atau menilai maupun membuktikan ketepatan dan kelengkapan perintah dimaksud, oleh karena itu perintah tersebut sah mengikat Anggota Pengguna.",
  {
    text: "Koperasi Konsumen Dana Asri Mandiri berhak untuk tidak melaksanakan perintah dari Anggota Pengguna, apabila:",
    subItems: [
      "Saldo rekening Anggota Pengguna di Koperasi Konsumen Dana Asri Mandiri tidak cukup.",
      "Koperasi Konsumen Dana Asri Mandiri mengetahui atau mempunyai alasan untuk menduga bahwa penipuan atau aksi kejahatan telah atau akan dilakukan.",
    ],
  },
  "Sebagai bukti bahwa Transaksi Finansial yang diperintahkan Anggota Pengguna telah berhasil dilakukan oleh Koperasi Konsumen Dana Asri Mandiri, Anggota Pengguna akan mendapatkan bukti Transaksi Finansial dan bukti tersebut akan tersimpan di dalam database Koperasi Konsumen Dana Asri Mandiri selama tiga bulan sejak tanggal Transaksi Finansial dilakukan.",
  {
    text: "Anggota Pengguna menyetujui dan mengakui bahwa:",
    subItems: [
      "Dengan dilaksanakannya Transaksi Finansial melalui M-Banking DAM, maka semua perintah dan komunikasi dari Anggota Pengguna yang diterima Koperasi Konsumen Dana Asri Mandiri akan diperlakukan sebagai alat bukti yang sah meskipun tidak dibuat dokumen tertulis dan/atau dikeluarkan dokumen yang tidak ditandatangani.",
      "Bukti atas perintah dari Anggota Pengguna kepada Koperasi Konsumen Dana Asri Mandiri dan segala bentuk komunikasi antara Koperasi Konsumen Dana Asri Mandiri dan Anggota Pengguna yang dikirim secara elektronik yang tersimpan pada pusat data Koperasi Konsumen Dana Asri Mandiri dan/atau tersimpan dalam bentuk penyimpanan informasi dan data lainnya di Koperasi Konsumen Dana Asri Mandiri, baik yang berupa dokumen tertulis, catatan, tape/cartridge, print out komputer dan/atau salinan, merupakan alat bukti yang sah yang tidak akan dibantah keabsahan, kebenaran atau keasliannya.",
    ],
  },
  "Anggota Pengguna dengan ini memberikan kuasa kepada Koperasi Konsumen Dana Asri Mandiri untuk mendebet rekening Anggota Pengguna yang terdaftar di Koperasi Konsumen Dana Asri Mandiri untuk melaksanakan Transaksi Finansial yang diinstruksikan oleh Anggota Pengguna kepada Koperasi Konsumen Dana Asri Mandiri melalui M-Banking DAM dan untuk pembayaran biaya administrasi serta biaya transaksi atas penggunaan fasilitas M-Banking DAM.",
];

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

function OrderedContentList({
  items,
}: {
  items: Array<
    | string
    | {
        text: string;
        subItems: string[];
      }
  >;
}) {
  return (
    <ol className="grid list-decimal gap-3 pl-5">
      {items.map((item, index) => {
        if (typeof item === "string") {
          return (
            <li key={item} className="pl-1">
              {item}
            </li>
          );
        }

        return (
          <li key={`${item.text}-${index}`} className="pl-1">
            <div>{item.text}</div>
            <ol type="a" className="mt-3 grid list-[lower-alpha] gap-2 pl-5">
              {item.subItems.map((subItem) => (
                <li key={subItem} className="pl-1">
                  {subItem}
                </li>
              ))}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}

function TermsSectionContent({ section }: { section: string }) {
  if (section === "Definisi") {
    return <OrderedContentList items={definitionItems} />;
  }

  if (section === "Keanggotaan") {
    return <OrderedContentList items={membershipItems} />;
  }

  if (section === "Persyaratan Keanggotaan") {
    return <OrderedContentList items={membershipRequirementItems} />;
  }

  if (section === "Registrasi Keanggotaan") {
    return <OrderedContentList items={membershipRegistrationItems} />;
  }

  if (section === "Aktivasi Status Keanggotaan") {
    return <OrderedContentList items={membershipActivationItems} />;
  }

  if (section === "Pengamanan Transaksi") {
    return <OrderedContentList items={transactionSecurityItems} />;
  }

  if (section === "Penggunaan M-Banking") {
    return <OrderedContentList items={mbankingUsageItems} />;
  }

  return (
    <div>
      Konten bagian ini akan dilengkapi sesuai materi yang Anda berikan.
    </div>
  );
}

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
                <TermsSectionContent section={section} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ProfileSubPageShell>
  );
}