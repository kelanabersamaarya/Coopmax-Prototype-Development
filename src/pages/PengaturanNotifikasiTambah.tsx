import { useState } from "react";
import { AlertCircle, CheckSquare, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return <button type="button" aria-pressed={value} onClick={onChange} className={`flex h-[26px] w-[62px] items-center rounded-full p-1 text-[10px] font-bold text-white transition-colors ${value ? "bg-[#5b42f5]" : "bg-[#a297ee]"}`}>
    {value ? <><span className="pl-1">ON</span><span className="ml-auto h-[18px] w-[18px] rounded-full bg-white" /></> : <><span className="h-[18px] w-[18px] rounded-full bg-white" /><span className="ml-auto pr-1">OFF</span></>}
  </button>;
}

export default function PengaturanNotifikasiTambah() {
  const navigate = useNavigate();
  const [notificationType, setNotificationType] = useState("Informasi Transaksi");
  const [smsActive, setSmsActive] = useState(false);
  const [pushActive, setPushActive] = useState(false);
  const [status, setStatus] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return <div className="min-h-screen bg-[#f5f7fc] px-4 py-7 text-[#002060] md:px-8">
    <h1 className="px-1 text-[22px] font-semibold">Pengaturan Notifikasi <span className="text-[16px] font-normal">Tambah</span></h1>
    <section className="mt-8 rounded-[22px] bg-white px-5 py-8 shadow-sm md:px-12">
      <div className="grid gap-x-8 gap-y-3 md:grid-cols-[170px_minmax(0,1fr)]">
        <label htmlFor="notification-title" className="pt-1 text-[13px]">Judul<span className="text-red-600">*</span></label>
        <Input id="notification-title" className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-400" />

        <span className="pt-1 text-[13px]">Jenis Notifikasi<span className="text-red-600">*</span></span>
        <div className="flex flex-wrap items-center gap-4 text-[13px]">
          {["Informasi Transaksi", "Informasi Pengingat", "Push Notifikasi"].map((type) => <label key={type} className="flex items-center gap-1.5"><input type="radio" name="notification-type" checked={notificationType === type} onChange={() => setNotificationType(type)} className="h-4 w-4 accent-blue-500" />{type}</label>)}
        </div>

        <label htmlFor="transaction-type" className="pt-1 text-[13px]">Jenis Transaksi<span className="text-red-600">*</span></label>
        <div className="relative"><select id="transaction-type" className="h-8 w-full appearance-none rounded border border-[#c7d3e4] bg-white px-3 text-[13px] text-[#71809b]"><option>Pilih Jenis Transaksi</option></select><ChevronDown className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-slate-500" /></div>

        <span className="pt-1 text-[13px]">Aktifkan SMS</span><Toggle value={smsActive} onChange={() => setSmsActive((value) => !value)} />
        <span className="pt-1 text-[13px]">Aktifkan (Push Notification)</span><Toggle value={pushActive} onChange={() => setPushActive((value) => !value)} />

        {!pushActive && <>
          <label htmlFor="message-format" className="pt-1 text-[13px]">Format Pesan<span className="text-red-600">*</span></label>
          <div className="grid gap-6 lg:grid-cols-[365px_minmax(0,1fr)]"><textarea id="message-format" placeholder="Tulis contoh pesan anda disini. Anda dapat menggunakan variabel yang tersedia di sebelah kanan" className="h-[212px] resize-none rounded border border-[#c7d3e4] p-2 text-[13px] text-[#5d7194] outline-none placeholder:text-[#7083a2] focus:border-blue-400" /><div className="text-[13px] leading-5"><p>Daftar variabel pesan:</p><ul className="list-disc pl-5">{messageVariables.map(([variable, description]) => <li key={variable}><strong>{variable}</strong>: {description}</li>)}</ul></div></div>
        </>}

        <label htmlFor="minimum-amount" className="pt-1 text-[13px]">Jumlah Minimal</label><Input id="minimum-amount" defaultValue="0,00" className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none" />
        <label htmlFor="maximum-amount" className="pt-1 text-[13px]">Jumlah Maksimal</label><Input id="maximum-amount" defaultValue="0,00" className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none" />
        {!pushActive && <>
          <label htmlFor="reminder-days" className="pt-1 text-[13px]">Hari Pengingat</label><div><Input id="reminder-days" className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none" /><p className="mt-1 text-[13px] text-[#637ba3]">Jumlah hari sebelum tanggal jadwal. Contoh : hari pengingat diatur "1", tanggal angsuran adalah "25", maka notifikasi dikirim pada tanggal 24</p></div>
        </>}
        <span className="pt-1 text-[13px]">Status</span><Toggle value={status} onChange={() => setStatus((value) => !value)} />
      </div>
      <div className="mt-7 flex justify-end gap-1"><Button type="button" onClick={() => navigate("/pengaturan-notifikasi")} className="h-10 rounded-md bg-[#8494af] px-5 text-[13px] font-semibold text-white hover:bg-[#6f7f9a]"><X className="mr-1 h-3 w-3" />Batalkan</Button><Button type="button" onClick={() => setShowConfirmation(true)} className="h-10 rounded-md bg-[#31b900] px-5 text-[13px] font-semibold text-white hover:bg-[#279b00]"><CheckSquare className="mr-1 h-4 w-4" />Simpan</Button></div>
    </section>
    {showConfirmation && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div role="dialog" aria-modal="true" aria-labelledby="save-confirmation-title" className="w-full max-w-[528px] rounded-md bg-white px-6 py-10 text-center shadow-2xl"><AlertCircle aria-hidden="true" className="mx-auto h-[92px] w-[92px] stroke-[#f8b37d]" strokeWidth={1.8} /><h2 id="save-confirmation-title" className="mt-8 text-[30px] font-bold leading-tight text-[#526070]">Yakin untuk menyimpan data ?</h2><div className="mx-auto mt-7 grid w-fit grid-cols-2 gap-2"><button type="button" autoFocus onClick={() => navigate("/pengaturan-notifikasi")} className="h-12 min-w-[102px] rounded-md bg-[#398fd6] px-6 text-[16px] font-semibold text-white ring-2 ring-[#b5d4ec] ring-offset-2 hover:bg-[#2f7fbd]">Yes</button><button type="button" onClick={() => setShowConfirmation(false)} className="h-12 min-w-[126px] rounded-md bg-[#ababab] px-6 text-[16px] font-semibold text-white hover:bg-[#969696]">Cancel</button></div></div></div>}
  </div>;
}
