const pushMessageVariables = [
  ["{Nama}", "Untuk menampilkan nama nasabah"],
  ["{StatusPinjaman}", "Untuk menampilkan status pinjaman"],
  ["{NoRekeningPengirim}", "Untuk menampilkan nomor rekening nasabah yang mengirimkan transfer"],
  ["{NoRekeningPenerima}", "Untuk menampilkan nomor rekening nasabah yang menerima transfer"],
  ["{Nominal}", "Untuk menampilkan nominal transfer"],
  ["{TanggalTransfer}", "Untuk menampilkan tanggal transfer"],
];

export default function PushMessageFormatFields() {
  return <>
    <label htmlFor="push-message-format" className="pt-1 text-[13px]">Format Pesan<span className="text-red-600">*</span></label>
    <div className="grid gap-6 lg:grid-cols-[365px_minmax(0,1fr)]">
      <textarea id="push-message-format" placeholder="Tulis contoh pesan anda disini. Anda dapat menggunakan variabel yang tersedia di sebelah kanan" className="h-[212px] resize-none rounded border border-[#c7d3e4] p-2 text-[13px] text-[#5d7194] outline-none placeholder:text-[#7083a2] focus:border-blue-400" />
      <div className="text-[13px] leading-5"><p>Daftar variabel pesan:</p><ul className="list-disc pl-5">{pushMessageVariables.map(([variable, description]) => <li key={variable}><strong>{variable}</strong>: {description}</li>)}</ul></div>
    </div>
  </>;
}
