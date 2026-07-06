import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Banknote,
  BookOpen,
  CreditCard,
  FileText,
  Fingerprint,
  HandCoins,
  History,
  Landmark,
  LockKeyhole,
  PieChart,
  QrCode,
  ReceiptText,
  Send,
  ShieldCheck,
  Smartphone,
  UserRound,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

type GuideSection = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  steps: string[];
  tips?: string[];
};

const guideSections: GuideSection[] = [
  {
    title: "Registrasi Akun M-Banking",
    description:
      "Panduan untuk mendaftarkan akun baru sebelum menggunakan layanan M-Banking.",
    icon: UserRound,
    steps: [
      "Pada halaman awal aplikasi, pilih tombol Daftar.",
      "Isi informasi keanggotaan seperti No. Rekening Utama, No. Identitas, dan Nomor Telepon.",
      "Tekan Lanjut untuk masuk ke tahap pembuatan akun.",
      "Isi Username, Kata Sandi, dan Konfirmasi Kata Sandi.",
      "Baca halaman Syarat dan Ketentuan yang ditampilkan.",
      "Centang persetujuan syarat dan ketentuan.",
      "Tekan Daftar Sekarang untuk menyelesaikan pendaftaran.",
      "Jika berhasil, aplikasi menampilkan halaman sukses pendaftaran.",
    ],
  },
  {
    title: "Masuk ke Aplikasi",
    description:
      "Panduan login untuk pengguna yang sudah memiliki akun M-Banking.",
    icon: LockKeyhole,
    steps: [
      "Pada halaman awal aplikasi, pilih tombol Masuk.",
      "Masukkan Username dan Password akun M-Banking.",
      "Aktifkan Simpan Username jika ingin username tersimpan otomatis.",
      "Tekan Masuk untuk masuk ke halaman Beranda.",
      "Jika lupa kata sandi, gunakan menu Lupa Kata Sandi bila sudah tersedia.",
    ],
  },
  {
    title: "Beranda",
    description:
      "Halaman utama untuk melihat ringkasan rekening dan mengakses fitur utama.",
    icon: Smartphone,
    steps: [
      "Setelah berhasil masuk, pengguna diarahkan ke halaman Beranda.",
      "Lihat sapaan pengguna dan ringkasan rekening pada area utama.",
      "Gunakan bagian Rekening Anda untuk melihat Simpanan, Pinjaman, dan Deposito.",
      "Geser kartu rekening untuk melihat rekening lain yang tersedia.",
      "Tekan ikon mata pada bagian Saldo untuk menampilkan atau menyembunyikan nominal.",
      "Gunakan menu cepat seperti Setor, Transfer, Bayar Angsuran, Bayar, dan Beli untuk memulai transaksi.",
      "Gunakan navigasi bawah untuk berpindah ke Beranda, Portofolio, QRIS, Riwayat, dan Profil.",
    ],
  },
  {
    title: "Rekening Simpanan",
    description:
      "Panduan melihat detail rekening simpanan dan aktivitas transaksi terkait.",
    icon: CreditCard,
    steps: [
      "Pada Beranda, pilih tab Simpanan di bagian Rekening Anda.",
      "Tekan Lihat Detail pada kartu simpanan.",
      "Halaman detail menampilkan produk simpanan, nomor rekening, nomor VA, dan saldo simpanan.",
      "Gunakan tombol salin untuk menyalin nomor rekening atau nomor VA.",
      "Gunakan tombol Transfer Antar Rekening untuk transfer ke sesama rekening koperasi.",
      "Gunakan tombol Setor untuk membuat instruksi setoran.",
      "Gunakan tombol Transfer Antar Bank untuk transfer ke bank lain.",
      "Lihat riwayat transaksi simpanan berdasarkan bulan yang dipilih.",
    ],
  },
  {
    title: "Setoran",
    description:
      "Panduan melakukan setoran ke rekening simpanan melalui Virtual Account.",
    icon: WalletCards,
    steps: [
      "Dari Beranda, pilih menu Setor.",
      "Pilih rekening simpanan tujuan setoran.",
      "Pilih nominal cepat yang tersedia atau masukkan nominal setoran secara manual.",
      "Tekan Lanjutkan.",
      "Masukkan PIN transaksi M-Banking.",
      "Setelah berhasil, aplikasi menampilkan nomor Virtual Account setoran.",
      "Salin nomor Virtual Account jika diperlukan.",
      "Ikuti instruksi pembayaran melalui M-Banking, Internet Banking, atau ATM.",
      "Tekan Selesai untuk kembali ke halaman sebelumnya.",
    ],
    tips: [
      "Pastikan nama penerima, rekening tujuan, dan nominal setoran sudah sesuai sebelum melakukan pembayaran.",
    ],
  },
  {
    title: "Transfer Antar Rekening",
    description: "Panduan transfer ke sesama rekening koperasi.",
    icon: Send,
    steps: [
      "Dari Beranda atau detail Simpanan, pilih menu Transfer.",
      "Pilih Transfer Antar Rekening.",
      "Pilih Penerima Baru atau penerima yang sudah tersimpan.",
      "Masukkan nomor rekening penerima jika memilih penerima baru.",
      "Masukkan nominal transfer.",
      "Isi deskripsi transfer bila diperlukan.",
      "Tekan Lanjutkan.",
      "Periksa detail transaksi pada halaman konfirmasi.",
      "Masukkan PIN transaksi.",
      "Jika berhasil, aplikasi menampilkan halaman sukses transfer.",
    ],
  },
  {
    title: "Transfer Antar Bank",
    description: "Panduan transfer dana ke rekening bank lain.",
    icon: Landmark,
    steps: [
      "Dari Beranda atau detail Simpanan, pilih menu Transfer.",
      "Pilih Transfer Antar Bank.",
      "Pilih Penerima Baru atau penerima yang sudah tersimpan.",
      "Jika memilih penerima baru, pilih bank tujuan terlebih dahulu.",
      "Masukkan nomor rekening penerima.",
      "Masukkan nominal transfer.",
      "Isi deskripsi bila diperlukan.",
      "Tekan Lanjutkan.",
      "Periksa sumber dana, tujuan transfer, nominal, biaya admin, dan total transaksi.",
      "Masukkan PIN untuk menyelesaikan transaksi.",
      "Jika berhasil, aplikasi menampilkan bukti transaksi transfer.",
    ],
    tips: [
      "Pastikan nama bank dan nomor rekening penerima sudah benar sebelum melanjutkan.",
    ],
  },
  {
    title: "QRIS",
    description: "Panduan pembayaran menggunakan scan QRIS atau kode QR pembayaran.",
    icon: QrCode,
    steps: [
      "Pada navigasi bawah, tekan tombol QRIS.",
      "Arahkan kamera ke kode QR merchant.",
      "Jika scan berhasil, aplikasi menampilkan detail merchant.",
      "Masukkan nominal pembayaran jika QRIS tidak memiliki nominal tetap.",
      "Pilih sumber dana pembayaran.",
      "Tekan Lanjutkan.",
      "Periksa detail pembayaran pada halaman konfirmasi.",
      "Masukkan PIN transaksi.",
      "Jika pembayaran berhasil, aplikasi menampilkan halaman sukses.",
      "Pengguna dapat melihat atau menyimpan bukti transaksi.",
    ],
    tips: [
      "Pastikan nominal dan nama merchant sudah sesuai sebelum memasukkan PIN.",
      "Kode QR yang kedaluwarsa perlu diperbarui sebelum digunakan.",
    ],
  },
  {
    title: "Portofolio",
    description:
      "Panduan melihat seluruh aset dan pinjaman pengguna dalam satu halaman.",
    icon: PieChart,
    steps: [
      "Pada navigasi bawah, pilih Portofolio.",
      "Gunakan tab Aset untuk melihat komposisi simpanan dan deposito.",
      "Lihat grafik komposisi aset untuk memahami proporsi produk keuangan.",
      "Tekan Lihat Detail pada kartu produk untuk membuka detail rekening.",
      "Gunakan tab Pinjaman untuk melihat daftar pinjaman.",
      "Tekan Lihat Detail pada kartu pinjaman untuk membuka detail rekening pinjaman.",
      "Gunakan navigasi bawah untuk kembali ke Beranda, QRIS, Riwayat, atau Profil.",
    ],
  },
  {
    title: "Bayar Angsuran Pinjaman",
    description:
      "Panduan membayar tagihan angsuran pinjaman dari aplikasi.",
    icon: HandCoins,
    steps: [
      "Dari Beranda, pilih menu Bayar Angsuran.",
      "Pilih rekening pinjaman yang ingin dibayar.",
      "Lihat informasi pinjaman seperti total pinjaman, sisa pinjaman, jatuh tempo, dan tagihan.",
      "Tekan Lihat Daftar Tagihan untuk melihat rincian tagihan jika tersedia.",
      "Tekan Riwayat Angsuran untuk melihat riwayat pembayaran pinjaman.",
      "Tekan Bayar Angsuran.",
      "Pilih sumber dana pembayaran.",
      "Periksa detail pokok, bunga, hutang, denda, dan total bayar pada halaman konfirmasi.",
      "Masukkan PIN transaksi.",
      "Jika sumber dana adalah rekening simpanan, pembayaran langsung diproses.",
      "Jika sumber dana adalah Virtual Account, aplikasi menampilkan nomor VA dan instruksi pembayaran.",
      "Jika berhasil, aplikasi menampilkan halaman sukses pembayaran angsuran.",
    ],
  },
  {
    title: "Daftar Tagihan Pinjaman",
    description:
      "Panduan melihat rincian tagihan pinjaman dan periode grace period.",
    icon: FileText,
    steps: [
      "Pada detail pinjaman, pilih Lihat Daftar Tagihan.",
      "Halaman menampilkan daftar jatuh tempo, tagihan pokok, bunga, sisa pokok, sisa bunga, dan denda.",
      "Jika pinjaman memiliki grace period, informasi grace period ditampilkan pada bagian atas daftar tagihan.",
      "Gunakan tombol pagination untuk berpindah halaman tagihan.",
      "Pada beberapa rekening, informasi tagihan berikutnya juga ditampilkan.",
      "Kembali ke detail pinjaman setelah selesai melihat tagihan.",
    ],
  },
  {
    title: "Riwayat Angsuran",
    description:
      "Panduan melihat riwayat pembayaran angsuran pinjaman.",
    icon: History,
    steps: [
      "Pada detail pinjaman, pilih Riwayat Angsuran.",
      "Halaman menampilkan daftar pembayaran angsuran yang pernah dilakukan.",
      "Setiap riwayat menampilkan tanggal transaksi, waktu transaksi, pokok, bunga, denda, nominal pembayaran, dan sisa pinjaman.",
      "Gunakan tombol kembali untuk kembali ke detail pinjaman.",
    ],
  },
  {
    title: "Pembayaran Tagihan",
    description:
      "Panduan membayar tagihan seperti listrik, air, internet, BPJS, PBB, TV, finance, dan pulsa pascabayar.",
    icon: ReceiptText,
    steps: [
      "Dari Beranda, pilih menu Bayar.",
      "Pilih kategori tagihan yang ingin dibayar.",
      "Pilih penyedia layanan, misalnya PLN, PDAM, IndiHome, atau BPJS.",
      "Masukkan nomor pelanggan atau nomor handphone sesuai jenis layanan.",
      "Untuk BPJS, pilih jumlah bulan pembayaran.",
      "Tekan Lanjutkan.",
      "Periksa detail tagihan pada halaman review.",
      "Pilih atau ubah sumber dana pembayaran.",
      "Tekan Lanjutkan Pembayaran.",
      "Periksa detail pada modal konfirmasi.",
      "Tekan Bayar Sekarang untuk menyelesaikan pembayaran.",
      "Jika berhasil, aplikasi menampilkan halaman sukses dan pilihan menyimpan penerima atau bukti transaksi.",
    ],
  },
  {
    title: "Pembelian",
    description:
      "Panduan membeli pulsa, paket data, token PLN, dan top up e-wallet.",
    icon: Banknote,
    steps: [
      "Dari Beranda, pilih menu Beli.",
      "Pilih kategori pembelian seperti Pulsa, Paket Data, Token PLN, atau E-Wallet.",
      "Masukkan nomor handphone, nomor meter, atau data tujuan sesuai kategori.",
      "Pilih nominal pembelian atau paket yang tersedia.",
      "Pilih sumber dana pembayaran.",
      "Tekan Lanjutkan.",
      "Periksa detail transaksi pada modal konfirmasi.",
      "Tekan Bayar Sekarang untuk menyelesaikan transaksi.",
      "Jika berhasil, aplikasi menampilkan halaman sukses transaksi.",
      "Pengguna dapat menyimpan tujuan pembelian untuk digunakan kembali.",
    ],
  },
  {
    title: "Data Tersimpan dan Riwayat Pembayaran",
    description:
      "Panduan menggunakan daftar tersimpan dan riwayat transaksi pembayaran atau pembelian.",
    icon: BookOpen,
    steps: [
      "Pada halaman Bayar atau Beli, pilih tab Tersimpan untuk melihat penerima yang sudah disimpan.",
      "Tekan salah satu item tersimpan untuk membuka ulang transaksi dengan data yang sudah terisi.",
      "Gunakan ikon hapus untuk menghapus data tersimpan.",
      "Konfirmasi penghapusan jika ingin menghapus data tersebut.",
      "Pilih tab Riwayat untuk melihat transaksi yang pernah dilakukan.",
      "Gunakan pilihan bulan untuk menyaring riwayat berdasarkan periode.",
    ],
  },
  {
    title: "Riwayat Transaksi",
    description:
      "Panduan melihat dan memfilter seluruh riwayat transaksi aplikasi.",
    icon: History,
    steps: [
      "Pada navigasi bawah, pilih Riwayat.",
      "Pilih bulan untuk melihat transaksi pada periode tertentu.",
      "Tekan ikon filter untuk membuka halaman filter transaksi.",
      "Pilih filter sumber dana jika ingin membatasi rekening tertentu.",
      "Pilih periode transaksi seperti Hari Ini, 7 Hari Terakhir, 30 Hari Terakhir, 3 Bulan Terakhir, atau Pilih Tanggal.",
      "Jika memilih Pilih Tanggal, isi tanggal awal dan tanggal akhir.",
      "Pilih metode transaksi seperti Transfer, Setoran, QRIS, Pembayaran, Pembelian, atau Angsuran.",
      "Tekan Terapkan untuk melihat hasil filter.",
      "Gunakan tombol Reset untuk menghapus filter yang dipilih.",
    ],
  },
  {
    title: "Profil",
    description:
      "Panduan mengakses informasi profil, kartu anggota, dan menu bantuan.",
    icon: UserRound,
    steps: [
      "Pada navigasi bawah, pilih Profil.",
      "Halaman profil menampilkan nama pengguna dan kartu anggota digital.",
      "Tekan ikon QR pada kartu anggota untuk menampilkan QR keanggotaan.",
      "Gunakan menu Pengumuman untuk melihat informasi terbaru.",
      "Gunakan menu Struktur Organisasi untuk melihat struktur koperasi jika tersedia.",
      "Gunakan menu Kritik dan Saran untuk mengirim masukan.",
      "Gunakan menu Kontak Kami untuk melihat kontak resmi koperasi.",
      "Gunakan menu Pengaturan untuk mengubah konfigurasi fitur prototype.",
      "Gunakan tombol Keluar untuk keluar dari aplikasi.",
    ],
  },
  {
    title: "Akun dan Keamanan",
    description:
      "Panduan mengelola keamanan akun seperti kata sandi, PIN, biometrik, dan hapus akun.",
    icon: ShieldCheck,
    steps: [
      "Pada halaman Profil, pilih menu Akun.",
      "Pilih Ubah Kata Sandi untuk mengganti kata sandi akun.",
      "Masukkan kata sandi lama, kata sandi baru, dan konfirmasi kata sandi baru.",
      "Konfirmasi perubahan pada modal yang muncul.",
      "Pilih Ubah PIN untuk mengganti PIN transaksi.",
      "Masukkan PIN lama, PIN baru, dan konfirmasi PIN baru.",
      "Aktifkan Login Biometric jika ingin menggunakan biometrik perangkat.",
      "Pilih Hapus Akun jika ingin menghapus akun M-Banking.",
      "Masukkan kata sandi dan konfirmasi penghapusan akun jika benar-benar ingin menghapus akun.",
    ],
    tips: [
      "Setelah mengubah kata sandi atau PIN, pengguna akan diarahkan untuk masuk kembali.",
      "Hapus akun akan mengembalikan pengguna ke halaman awal aplikasi.",
    ],
  },
  {
    title: "Syarat, Ketentuan, dan Kebijakan Privasi",
    description:
      "Panduan membaca informasi legal dan kebijakan perlindungan data.",
    icon: FileText,
    steps: [
      "Pada halaman Profil, pilih Syarat dan Ketentuan untuk membaca aturan layanan M-Banking.",
      "Gunakan accordion untuk membuka tiap bagian seperti definisi, keanggotaan, transaksi, biaya, risiko, dan force majeure.",
      "Pilih Kebijakan Privasi untuk membaca cara aplikasi mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi.",
      "Baca seluruh bagian kebijakan privasi seperti definisi, jenis data, penggunaan data, pengungkapan data, hak pengguna, cookie, keamanan, dan kontak.",
    ],
  },
  {
    title: "Simpan Bukti Transaksi",
    description:
      "Panduan menyimpan bukti transaksi setelah pembayaran atau transfer berhasil.",
    icon: Fingerprint,
    steps: [
      "Setelah transaksi berhasil, aplikasi menampilkan halaman sukses.",
      "Tekan Simpan Bukti Transaksi atau Bukti Transaksi jika tersedia.",
      "Aplikasi menampilkan status bahwa bukti transaksi tersimpan.",
      "Pada transaksi QRIS, pengguna juga dapat membuka halaman bukti transaksi detail.",
      "Tekan Selesai untuk kembali ke alur utama aplikasi.",
    ],
  },
];

function GuideStepList({ steps }: { steps: string[] }) {
  return (
    <ol className="grid list-decimal gap-2.5 pl-5">
      {steps.map((step) => (
        <li
          key={step}
          className="pl-1 text-justify text-[13px] font-normal leading-relaxed text-[#4B5563]"
        >
          {step}
        </li>
      ))}
    </ol>
  );
}

function GuideTips({ tips }: { tips?: string[] }) {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="mt-4 rounded-[14px] bg-[#EEF6FF] px-4 py-3 ring-1 ring-[#CFE4FF]">
      <div className="text-[12px] font-bold uppercase tracking-wide text-[#2563EB]">
        Catatan
      </div>
      <ul className="mt-2 grid list-disc gap-1.5 pl-5">
        {tips.map((tip) => (
          <li
            key={tip}
            className="pl-1 text-justify text-[12.5px] font-normal leading-relaxed text-[#315E8F]"
          >
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProfileGuidePage({ onBack }: { onBack: () => void }) {
  return (
    <ProfileSubPageShell title="Petunjuk Penggunaan" onBack={onBack}>
      <Accordion type="single" collapsible className="grid gap-[10px]">
        {guideSections.map((section, index) => {
          const Icon = section.icon;

          return (
            <AccordionItem
              key={section.title}
              value={`guide-${index}`}
              className={cn(
                "overflow-hidden rounded-[16px] border border-[#EEF0F4] bg-white px-0",
                "shadow-none",
              )}
            >
              <AccordionTrigger
                className={cn(
                  "min-h-[68px] px-4 py-4 text-left hover:no-underline",
                  "[&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-black",
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#EEF6FF] text-[#479DF4]">
                    <Icon className="h-[21px] w-[21px]" strokeWidth={2.6} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[14px] font-bold leading-tight text-black">
                      {section.title}
                    </span>
                    <span className="mt-[5px] block text-[12px] font-normal leading-snug text-[#8F8F8F]">
                      {section.description}
                    </span>
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4 pt-0">
                <div className="border-t border-[#EEF0F4] pt-4">
                  <GuideStepList steps={section.steps} />
                  <GuideTips tips={section.tips} />
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ProfileSubPageShell>
  );
}