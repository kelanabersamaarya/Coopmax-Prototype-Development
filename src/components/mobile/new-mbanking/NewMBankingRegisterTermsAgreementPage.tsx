import * as React from "react";
import { ArrowLeft, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type TermsSection = {
  title: string;
  body: string;
  points: string[];
};

const termsSections: TermsSection[] = [
  {
    title: "Definisi",
    body:
      "M-Banking adalah fasilitas electronic channel koperasi yang dapat diakses anggota melalui aplikasi pada smartphone setelah proses registrasi dan aktivasi.",
    points: [
      "Anggota Pengguna adalah anggota yang telah terdaftar sebagai pengguna fasilitas M-Banking.",
      "Username, kata sandi, PIN, dan OTP bersifat rahasia dan hanya boleh digunakan oleh pengguna yang sah.",
      "Rekening dapat berupa produk tabungan, pinjaman, deposito, atau produk lain yang tersedia pada koperasi.",
    ],
  },
  {
    title: "Keanggotaan",
    body:
      "Untuk menggunakan layanan M-Banking, calon pengguna wajib memenuhi persyaratan keanggotaan, melakukan registrasi, dan melakukan aktivasi sesuai ketentuan koperasi.",
    points: [
      "Keanggotaan M-Banking dapat diakhiri oleh anggota maupun koperasi sesuai ketentuan yang berlaku.",
      "Pengguna wajib melakukan pengkinian data apabila terdapat perubahan email atau nomor handphone.",
      "Kerugian akibat tidak melakukan pengkinian data menjadi tanggung jawab pengguna.",
    ],
  },
  {
    title: "Persyaratan Keanggotaan",
    body:
      "Pengguna M-Banking wajib memiliki rekening aktif pada koperasi dan menggunakan data pribadi yang benar.",
    points: [
      "Memiliki rekening tabungan, pinjaman, atau deposito aktif.",
      "Memiliki nomor handphone dan email pribadi yang masih aktif.",
      "Telah membaca dan memahami syarat menjadi pengguna M-Banking.",
    ],
  },
  {
    title: "Registrasi Keanggotaan",
    body:
      "Registrasi wajib dilakukan oleh anggota yang bersangkutan dan tidak boleh diwakilkan kecuali ditentukan lain oleh koperasi.",
    points: [
      "Data identitas diri dan bukti kepemilikan rekening harus benar.",
      "Nomor handphone yang didaftarkan wajib milik pribadi anggota.",
      "Risiko akibat kelalaian saat registrasi menjadi tanggung jawab anggota.",
    ],
  },
  {
    title: "Aktivasi Status Keanggotaan",
    body:
      "Aktivasi dilakukan melalui aplikasi resmi M-Banking pada smartphone pengguna dengan nomor handphone yang sesuai dengan data registrasi.",
    points: [
      "Pengguna wajib menggunakan aplikasi resmi yang disediakan koperasi atau mitra resminya.",
      "Aktivasi hanya dapat dilakukan pada perangkat yang sah.",
      "Jika ada lebih dari satu perangkat aktif, perangkat terakhir dapat menjadi perangkat yang digunakan.",
    ],
  },
  {
    title: "Pengamanan Transaksi",
    body:
      "Kerahasiaan username, kata sandi, PIN, dan OTP sepenuhnya menjadi tanggung jawab pengguna.",
    points: [
      "Jangan memberitahukan PIN, kata sandi, atau OTP kepada siapa pun termasuk petugas koperasi.",
      "Jangan menyimpan PIN dan kata sandi di media yang mudah diketahui orang lain.",
      "Segera hubungi koperasi jika perangkat hilang atau data akses diduga diketahui pihak lain.",
    ],
  },
  {
    title: "Penggunaan M-Banking",
    body:
      "M-Banking hanya boleh digunakan oleh pengguna yang sah dan terdaftar pada sistem koperasi.",
    points: [
      "Pengguna wajib memastikan seluruh data transaksi yang diinput sudah lengkap dan benar.",
      "Transaksi yang telah dikonfirmasi dengan PIN dianggap sebagai instruksi sah dari pengguna.",
      "Koperasi dapat menolak transaksi jika saldo tidak cukup atau terdapat indikasi penyalahgunaan.",
    ],
  },
  {
    title: "Pelayanan dan Penyelesaian Pengaduan",
    body:
      "Pengaduan terkait transaksi atau akses layanan dapat disampaikan melalui kontak resmi koperasi atau kantor koperasi terdekat.",
    points: [
      "Pengguna dapat diminta menunjukkan identitas dan bukti kepemilikan rekening.",
      "Pengaduan melalui telepon dapat memerlukan validasi data identitas dan nomor rekening.",
      "Penyelesaian pengaduan mengikuti prosedur internal koperasi.",
    ],
  },
  {
    title: "Nilai Tambah Penggunaan M-Banking",
    body:
      "M-Banking memberikan kemudahan untuk melakukan transaksi kapan pun dan di mana pun melalui smartphone.",
    points: [
      "Layanan dapat digunakan untuk melihat informasi rekening dan melakukan transaksi finansial.",
      "Transaksi menjadi lebih praktis, cepat, dan aman.",
      "Pengguna tetap wajib memeriksa detail transaksi sebelum melakukan konfirmasi.",
    ],
  },
  {
    title: "Biaya Penggunaan M-Banking",
    body:
      "Penggunaan M-Banking dapat dikenakan biaya komunikasi, biaya administrasi, atau biaya transaksi sesuai ketentuan koperasi.",
    points: [
      "Biaya komunikasi mengikuti ketentuan operator atau penyedia internet yang digunakan.",
      "Biaya transaksi dapat didebet langsung dari rekening pengguna.",
      "Daftar biaya dapat berubah sesuai kebijakan koperasi.",
    ],
  },
  {
    title: "Potensi Risiko",
    body:
      "Penggunaan layanan digital memiliki risiko seperti lupa PIN, perangkat hilang, salah input transaksi, atau penyalahgunaan data akses.",
    points: [
      "Lupa PIN atau kata sandi dapat menyebabkan akses terblokir.",
      "Salah input data transaksi dapat menyebabkan salah pembayaran atau salah transfer.",
      "Perangkat yang hilang berisiko disalahgunakan jika tidak segera dilaporkan.",
    ],
  },
  {
    title: "Pemblokiran Akses",
    body:
      "Koperasi dapat melakukan pemblokiran akses M-Banking berdasarkan permintaan pengguna atau karena alasan keamanan.",
    points: [
      "Pemblokiran dapat dilakukan jika pengguna salah memasukkan kata sandi atau PIN berulang kali.",
      "Pemblokiran dapat dilakukan jika ada dugaan penyalahgunaan rekening.",
      "Aktivasi kembali dapat memerlukan registrasi ulang sesuai prosedur koperasi.",
    ],
  },
  {
    title: "Pengakhiran Keanggotaan",
    body:
      "Pengakhiran keanggotaan M-Banking dapat dilakukan atas permintaan pengguna atau berdasarkan kebijakan koperasi.",
    points: [
      "Pengakhiran dapat terjadi jika pengguna menutup seluruh rekening yang terhubung.",
      "Koperasi dapat menghentikan layanan sesuai ketentuan yang berlaku.",
      "Pengakhiran tidak menghapus kewajiban yang masih berjalan.",
    ],
  },
  {
    title: "Force Majeure",
    body:
      "Koperasi tidak bertanggung jawab atas kegagalan layanan akibat keadaan di luar kendali, seperti bencana, gangguan sistem, gangguan jaringan, kebijakan pemerintah, atau serangan digital.",
    points: [
      "Koperasi akan berupaya menyampaikan informasi melalui media resmi.",
      "Layanan dapat terganggu sementara akibat pemeliharaan atau kondisi darurat.",
      "Pengguna membebaskan koperasi dari tuntutan atas kejadian di luar kendali tersebut.",
    ],
  },
  {
    title: "Lain-lain",
    body:
      "Koperasi berhak memperbarui, memelihara, atau menghentikan layanan M-Banking sementara waktu maupun permanen dengan alasan yang dianggap perlu.",
    points: [
      "Ketentuan yang tidak berlaku tidak membatalkan ketentuan lain dalam perjanjian.",
      "Pengguna bertanggung jawab untuk membaca pembaruan syarat dan ketentuan.",
      "Penggunaan layanan setelah pembaruan dianggap sebagai persetujuan pengguna.",
    ],
  },
];

function TermsCard({
  section,
  index,
}: {
  section: TermsSection;
  index: number;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <article className="overflow-hidden rounded-[18px] bg-white shadow-sm ring-1 ring-[#E5E7EB]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start gap-3 px-4 py-4 text-left transition active:scale-[0.99]"
        aria-expanded={open}
      >
        <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#EEF6FF] text-[13px] font-bold text-[#479DF4]">
          {index + 1}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold leading-tight text-black">
            {section.title}
          </span>
          <span className="mt-[5px] line-clamp-2 text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
            {section.body}
          </span>
        </span>

        <ChevronDown
          className={cn(
            "mt-1 h-[20px] w-[20px] shrink-0 text-black transition-transform",
            open ? "rotate-180" : "rotate-0",
          )}
          strokeWidth={2.6}
        />
      </button>

      {open ? (
        <div className="border-t border-[#EEF0F4] bg-[#FBFCFE] px-4 pb-4 pt-3">
          <p className="text-justify text-[13px] font-normal leading-relaxed text-[#4B5563]">
            {section.body}
          </p>

          <ul className="mt-3 grid list-disc gap-2 pl-5">
            {section.points.map((point) => (
              <li
                key={point}
                className="text-justify text-[12.5px] font-normal leading-relaxed text-[#4B5563]"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export default function NewMBankingRegisterTermsAgreementPage({
  onBack,
  onAgree,
}: {
  onBack: () => void;
  onAgree: () => void;
}) {
  const [accepted, setAccepted] = React.useState(false);

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <header className="flex h-[86px] items-center gap-3 px-6 pt-[18px]">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
          </button>

          <h1 className="text-[16px] font-bold leading-tight text-black">
            Syarat dan Ketentuan
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[170px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]">
          <div
            className={cn(
              "relative overflow-hidden rounded-[24px]",
              "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_52%,#7C3AED_100%)]",
              "px-5 py-5 text-white shadow-[0_14px_34px_rgba(37,99,235,0.18)]",
            )}
          >
            <div className="pointer-events-none absolute -right-[42px] -top-[42px] h-[136px] w-[136px] rounded-full bg-white/16" />
            <div className="pointer-events-none absolute right-[48px] top-[58px] h-[64px] w-[64px] rounded-full bg-cyan-200/16" />

            <div className="relative z-10 flex items-start gap-4">
              <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[16px] bg-white/18 text-white ring-1 ring-white/20">
                <ShieldCheck className="h-[28px] w-[28px]" strokeWidth={2.7} />
              </span>

              <div className="min-w-0">
                <div className="text-[20px] font-bold leading-tight tracking-[-0.03em] text-white">
                  Persetujuan Layanan M-Banking
                </div>
                <p className="mt-2 text-[13px] font-normal leading-relaxed text-white/88">
                  Baca dan setujui syarat serta ketentuan berikut sebelum
                  menyelesaikan pendaftaran akun M-Banking.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[18px] grid gap-[12px]">
            {termsSections.map((section, index) => (
              <TermsCard key={section.title} section={section} index={index} />
            ))}
          </div>
        </section>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 rounded-t-[24px] bg-white px-6 pb-[26px] pt-[16px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={() => setAccepted((value) => !value)}
          className="flex w-full items-start gap-3 text-left transition active:scale-[0.99]"
          aria-pressed={accepted}
        >
          <span
            className={cn(
              "mt-[1px] inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] border-2 transition",
              accepted
                ? "border-[#479DF4] bg-[#479DF4] text-white"
                : "border-[#CDD4E0] bg-white text-transparent",
            )}
          >
            <Check className="h-[15px] w-[15px]" strokeWidth={3} />
          </span>

          <span className="min-w-0 text-[12px] font-normal leading-relaxed text-[#4B5563]">
            Saya telah membaca, memahami, dan menyetujui seluruh syarat dan
            ketentuan penggunaan layanan M-Banking.
          </span>
        </button>

        <button
          type="button"
          onClick={onAgree}
          disabled={!accepted}
          className={cn(
            "mt-[14px] h-[52px] w-full rounded-[10px]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
            accepted
              ? "bg-[#479DF4]"
              : "cursor-not-allowed bg-[#A9D0FA]",
          )}
        >
          Daftar Sekarang
        </button>
      </div>
    </div>
  );
}