export default function MBankingQrisPaymentHistoryCard({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[24px] bg-white px-6 py-5 text-left shadow-[0_4px_14px_rgba(15,23,42,0.20)] ring-1 ring-slate-100 transition active:scale-[0.99]"
      aria-label="Lihat bukti transaksi QRIS"
    >
      <div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-[14px]">
          <InfoBlock label="Total Bayar" value="Rp. 50.000,00" />
          <InfoBlock label="Tanggal" value="30 Juni 2026" align="right" />

          <InfoBlock label="Penerima" value="QRIS Indomaret" />
          <InfoBlock label="Waktu Transaksi" value="22:15 WIB" align="right" />

          <div className="col-span-2">
            <InfoBlock label="Sumber Dana" value="Simpanan Kaya - 112233111" />
          </div>
        </div>
      </div>
    </button>
  );
}

function InfoBlock({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
        {label}
      </div>
      <div className="mt-[5px] text-[14px] font-extrabold leading-tight tracking-tight text-black">
        {value}
      </div>
    </div>
  );
}
