import { useEffect, useRef, useState } from "react";
import { Check, CheckSquare, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotificationSaveConfirmationModal from "@/components/settings/NotificationSaveConfirmationModal";
import PushMessageFormatFields from "@/components/settings/PushMessageFormatFields";

const messageVariables = [
  ["{DariProduk}", "Untuk menampilkan nama produk sumber (transaksi pemindahbukuan)"],
  ["{Produk}", "Untuk menampilkan nama produk"],
  ["{DariNoRek}", "Untuk menampilkan no. rekening sumber (transaksi pemindahbukuan)"],
  ["{NoRek}", "Untuk menampilkan no. rekening"],
  ["{Nasabah}", "Untuk menampilkan nama nasabah pemilik rekening"],
  ["{Jumlah}", "Untuk menampilkan nominal transaksi"],
  ["{Tanggal}", "Untuk menampilkan tanggal transaksi"],
  ["{Saldo}", "Untuk menampilkan saldo rekening"],
  ["{TanggalSekarang}", "Untuk menampilkan tanggal saat ini"],
  ["{HariPengingat}", "Untuk menampilkan Jumlah Hari Pengingat"],
];

const transactionTypes = [
  "Transaksi Setoran Simpanan",
  "Pembukaan Rekening Simpanan",
  "Bunga Simpanan Sukarela",
  "Transaksi Penarikan Simpanan",
  "Penutupan Rekening Simpanan",
  "Transfer",
  "Pembukaan Rekening SIJAKOP",
  "Penarikan bunga SIJAKOP",
  "Penarikan Bunga SIJAKOP",
  "Bunga SIJAKOP",
  "Pencarian Rekening Sijakop",
  "Bayar Angsuran",
  "Transaksi Biaya Admin",
  "Biaya Pinalti Simpanan",
  "Pinalty Sijakop",
  "Bunga RC",
  "Biaya Admin RC",
  "Penarikan RC",
  "Pemutihan Pinjaman",
  "Pencairan Pinjaman",
  "Perpanjangan Pinjaman",
  "Bunga Simpanan Program",
  "Transaksi PPOB",
  "Pajak Bunga Simpanan",
  "Penerimaan Jasa SHU",
  "Penarikan SHU",
  "Transfer SHU",
  "Perpanjangan Pinjaman RC",
  "Bunga Rc Over Draf",
  "Pembayaran Gaji Pegawai",
  "Penempatan Modal Penyertaan",
  "Penarikan Modal Penyertaan",
  "Pemutihan Pinjaman RC",
  "Transaksi Refund PPOB",
  "Pendapatan Jasa Pinjaman RC",
  "Biaya Admin Pinjaman",
  "Pembukaan rekening via bank",
  "Setoran via BRI",
];

const reminderKeys = [
  "pengingat_simpanan_wajib",
  "pengingat_simpanan_berjangka",
  "pengingat_angsuran",
  "pengingat_jatuh_tempo_pinjaman",
  "info_pencairan_pinjaman",
];

const pushNotificationKeys = [
  "push_notif_pengajuan_pinjaman",
  "push_notif_pembaruan_status_pinjaman",
  "push_notif_penerima_transfer_antar_rekening",
  "push_notif_pengirim_transfer_antar_rekening",
  "push_notif_sukses_transfer_antar_bank",
  "push_notif_pengembalian_dana_transfer_antar_bank",
  "push_notif_gagal_transfer_antar_bank",
];

const pushMessageVariables = [
  ["{Nama}", "Untuk menampilkan nama nasabah"],
  ["{StatusPinjaman}", "Untuk menampilkan status pinjaman"],
  ["{NoRekeningPengirim}", "Untuk menampilkan nomor rekening nasabah yang mengirimkan transfer"],
  ["{NoRekeningPenerima}", "Untuk menampilkan nomor rekening nasabah yang menerima transfer"],
  ["{Nominal}", "Untuk menampilkan nominal transfer"],
  ["{TanggalTransfer}", "Untuk menampilkan tanggal transfer"],
];

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return <button type="button" aria-pressed={value} onClick={onChange} className={`flex h-[26px] w-[62px] items-center rounded-full p-1 text-[10px] font-bold text-white transition-colors ${value ? "bg-[#5b42f5]" : "bg-[#a297ee]"}`}>
    {value ? <><span className="pl-1">ON</span><span className="ml-auto h-[18px] w-[18px] rounded-full bg-white" /></> : <><span className="h-[18px] w-[18px] rounded-full bg-white" /><span className="ml-auto pr-1">OFF</span></>}
  </button>;
}

export default function PengaturanNotifikasiUbah() {
  const navigate = useNavigate();
  const [notificationType, setNotificationType] = useState("Informasi Transaksi");
  const [transactionType, setTransactionType] = useState("");
  const [transactionSearch, setTransactionSearch] = useState("");
  const [transactionDropdownOpen, setTransactionDropdownOpen] = useState(false);
  const [reminderKey, setReminderKey] = useState("");
  const [reminderSearch, setReminderSearch] = useState("");
  const [reminderDropdownOpen, setReminderDropdownOpen] = useState(false);
  const [pushKey, setPushKey] = useState("");
  const [pushSearch, setPushSearch] = useState("");
  const [pushDropdownOpen, setPushDropdownOpen] = useState(false);
  const [smsActive, setSmsActive] = useState(false);
  const [pushActive, setPushActive] = useState(false);
  const [status, setStatus] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTransactionDropdownOpen(false);
        setReminderDropdownOpen(false);
        setPushDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return <div className="min-h-screen bg-[#f5f7fc] px-4 py-7 text-[#002060] md:px-8">
    <h1 className="px-1 text-[22px] font-semibold">Pengaturan Notifikasi <span className="text-[16px] font-normal">Ubah</span></h1>
    <section className="mt-8 rounded-[22px] bg-white px-5 py-8 shadow-sm md:px-12">
      <div className="grid gap-x-8 gap-y-3 md:grid-cols-[170px_minmax(0,1fr)]">
        <label htmlFor="notification-title" className="pt-1 text-[13px]">Judul<span className="text-red-600">*</span></label>
        <Input id="notification-title" placeholder="Masukkan Judul Notifikasi" className="h-8 rounded border-[#c7d3e4] bg-white text-[13px] shadow-none placeholder:text-white focus-visible:ring-1 focus-visible:ring-blue-400" />

        <span className="pt-1 text-[13px]">Jenis Notifikasi<span className="text-red-600">*</span></span>
        <div className="flex flex-wrap items-center gap-4 text-[13px]">
          {["Informasi Transaksi", "Informasi Pengingat", "Push Notifikasi"].map((type) => <label key={type} className="flex items-center gap-1.5"><input type="radio" name="notification-type" checked={notificationType === type} onChange={() => { setNotificationType(type); setTransactionType(""); setReminderKey(""); setPushKey(""); setTransactionDropdownOpen(false); setReminderDropdownOpen(false); setPushDropdownOpen(false); }} className="h-4 w-4 accent-blue-500" />{type}</label>)}
        </div>

        <label htmlFor="transaction-type" className="pt-1 text-[13px]">{notificationType !== "Informasi Transaksi" ? "Key Notifikasi" : "Jenis Transaksi"}<span className="text-red-600">*</span></label>
        <div ref={dropdownRef} className="relative">
          <button type="button" id="transaction-type" onClick={() => notificationType === "Informasi Pengingat" ? setReminderDropdownOpen((open) => !open) : notificationType === "Push Notifikasi" ? setPushDropdownOpen((open) => !open) : setTransactionDropdownOpen((open) => !open)} className="flex h-8 w-full items-center justify-between rounded border border-[#c7d3e4] bg-white px-3 text-left text-[13px] text-[#71809b]">
            <span>{notificationType === "Informasi Pengingat" ? (reminderKey || "Pilih Key Pengingat") : notificationType === "Push Notifikasi" ? (pushKey || "Pilih Key Custom") : (transactionType || "Pilih Jenis Transaksi")}</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
          {notificationType === "Informasi Pengingat" && reminderDropdownOpen && (
            <div className="absolute left-0 right-0 top-9 z-20 rounded border border-[#c7d3e4] bg-white p-1 shadow-lg">
              <Input autoFocus value={reminderSearch} onChange={(event) => setReminderSearch(event.target.value)} placeholder="Cari key pengingat" className="mb-1 h-8 rounded border-slate-400 px-2 text-[13px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-400" />
              <div className="max-h-40 overflow-y-auto">{reminderKeys.filter((key) => key.toLowerCase().includes(reminderSearch.toLowerCase())).map((key) => <button type="button" key={key} onClick={() => { setReminderKey(key); setReminderSearch(""); setReminderDropdownOpen(false); }} className="block w-full px-2 py-1.5 text-left text-[13px] text-[#123664] hover:bg-[#5b42f5] hover:text-white">{key}</button>)}</div>
            </div>
          )}
          {notificationType === "Push Notifikasi" && pushDropdownOpen && (
            <div className="absolute left-0 right-0 top-9 z-20 rounded border border-[#c7d3e4] bg-white p-1 shadow-lg">
              <Input autoFocus value={pushSearch} onChange={(event) => setPushSearch(event.target.value)} placeholder="Cari key custom" className="mb-1 h-8 rounded border-slate-400 px-2 text-[13px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-400" />
              <div className="max-h-40 overflow-y-auto">{pushNotificationKeys.filter((key) => key.toLowerCase().includes(pushSearch.toLowerCase())).map((key) => <button type="button" key={key} onClick={() => { setPushKey(key); setPushSearch(""); setPushDropdownOpen(false); }} className="block w-full px-2 py-1.5 text-left text-[13px] text-[#123664] hover:bg-[#5b42f5] hover:text-white">{key}</button>)}</div>
            </div>
          )}
          {notificationType === "Informasi Transaksi" && transactionDropdownOpen && (
            <div className="absolute left-0 right-0 top-9 z-20 rounded border border-[#c7d3e4] bg-white p-1 shadow-lg">
              <Input autoFocus value={transactionSearch} onChange={(event) => setTransactionSearch(event.target.value)} placeholder="Cari jenis transaksi" className="mb-1 h-8 rounded border-slate-400 px-2 text-[13px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-400" />
              <div className="max-h-40 overflow-y-auto">{transactionTypes.filter((type) => type.toLowerCase().includes(transactionSearch.toLowerCase())).map((type) => <button type="button" key={type} onClick={() => { setTransactionType(type); setTransactionSearch(""); setTransactionDropdownOpen(false); }} className="block w-full px-2 py-1.5 text-left text-[13px] text-[#123664] hover:bg-[#5b42f5] hover:text-white">{type}</button>)}</div>
            </div>
          )}
        </div>

        {notificationType === "Push Notifikasi" ? (
          <>
            <span className="pt-1 text-[13px]">Push Notifikasi via M-Banking</span>
            <Toggle value={pushActive} onChange={() => setPushActive((value) => !value)} />
          </>
        ) : (
          <>
            <span className="pt-1 text-[13px]">Aktifkan SMS</span>
            <Toggle value={smsActive} onChange={() => setSmsActive((value) => !value)} />
          </>
        )}

        {notificationType !== "Push Notifikasi" && <>
          <label htmlFor="message-format" className="pt-1 text-[13px]">Format Pesan<span className="text-red-600">*</span></label>
          <div className="grid gap-6 lg:grid-cols-[365px_minmax(0,1fr)]"><textarea id="message-format" placeholder="Tulis contoh pesan anda disini. Anda dapat menggunakan variabel yang tersedia di sebelah kanan" className="h-[212px] resize-none rounded border border-[#c7d3e4] p-2 text-[13px] text-[#5d7194] outline-none placeholder:text-[#7083a2] focus:border-blue-400" /><div className="text-[13px] leading-5"><p>Daftar variabel pesan:</p><ul className="list-disc pl-5">{messageVariables.map(([variable, description]) => <li key={variable}><strong>{variable}</strong>: {description}</li>)}</ul></div></div>
        </>}

        {notificationType === "Push Notifikasi" && <PushMessageFormatFields />}

        <label htmlFor="minimum-amount" className="pt-1 text-[13px]">Jumlah Minimal</label><Input id="minimum-amount" defaultValue="0,00" readOnly={notificationType === "Push Notifikasi"} className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none read-only:cursor-not-allowed read-only:bg-slate-100 read-only:text-slate-400" />
        <label htmlFor="maximum-amount" className="pt-1 text-[13px]">Jumlah Maksimal</label><Input id="maximum-amount" defaultValue="0,00" readOnly={notificationType === "Push Notifikasi"} className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none read-only:cursor-not-allowed read-only:bg-slate-100 read-only:text-slate-400" />
        {notificationType !== "Push Notifikasi" && <>
          <label htmlFor="reminder-days" className="pt-1 text-[13px]">Hari Pengingat</label><div><Input id="reminder-days" className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none" /><p className="mt-1 text-[13px] text-[#637ba3]">Jumlah hari sebelum tanggal jadwal. Contoh : hari pengingat diatur "1", tanggal angsuran adalah "25", maka notifikasi dikirim pada tanggal 24</p></div>
        </>}
        <span className="pt-1 text-[13px]">Status</span><Toggle value={status} onChange={() => setStatus((value) => !value)} />
      </div>
      <div className="mt-7 flex justify-end gap-1"><Button type="button" onClick={() => navigate("/pengaturan-notifikasi")} className="h-10 rounded-md bg-[#8494af] px-5 text-[13px] font-semibold text-white hover:bg-[#6f7f9a]"><X className="mr-1 h-3 w-3" />Batalkan</Button><Button type="button" onClick={() => setShowConfirmation(true)} className="h-10 rounded-md bg-[#31b900] px-5 text-[13px] font-semibold text-white hover:bg-[#279b00]"><CheckSquare className="mr-1 h-4 w-4" />Simpan</Button></div>
    </section>
    <NotificationSaveConfirmationModal
      open={showConfirmation}
      onConfirm={() => {
        setShowConfirmation(false);
        setShowSuccess(true);
      }}
      onCancel={() => setShowConfirmation(false)}
    />
    {showSuccess && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="save-success-title"
          className="w-[calc(100vw-14px)] max-w-[528px] rounded-[5px] bg-white px-4 pb-[17px] pt-[40px] text-center shadow-2xl sm:w-[528px] sm:px-6"
        >
          <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#dff2d5] text-[#9bd77e]">
            <Check className="h-[58px] w-[58px]" strokeWidth={2.5} />
          </div>
          <h2
            id="save-success-title"
            className="mt-[31px] text-[30px] font-bold leading-[36px] text-[#5b5b5b]"
          >
            Berhasil Menyimpan Data
          </h2>
          <button
            type="button"
            autoFocus
            onClick={() => {
              setShowSuccess(false);
              navigate("/pengaturan-notifikasi");
            }}
            className="mt-[29px] h-[48px] w-[104px] rounded-[5px] bg-[#398fd6] text-[16px] font-semibold text-white ring-2 ring-[#b5d4ec] ring-offset-2 hover:bg-[#2f7fbd]"
          >
            OK
          </button>
        </div>
      </div>
    )}
  </div>;
}
