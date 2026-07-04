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

function TermsSectionContent({ section }: { section: string }) {
  if (section === "Definisi") {
    return (
      <ol className="grid list-decimal gap-3 pl-5">
        {definitionItems.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ol>
    );
  }

  if (section === "Keanggotaan") {
    return (
      <ol className="grid list-decimal gap-3 pl-5">
        {membershipItems.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ol>
    );
  }

  if (section === "Persyaratan Keanggotaan") {
    return (
      <ol className="grid list-decimal gap-3 pl-5">
        {membershipRequirementItems.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ol>
    );
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