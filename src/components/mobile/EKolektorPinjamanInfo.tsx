"use client";

function InfoLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E8E8E8] py-[11px] last:border-b-0">
      <div className="min-w-0 text-[14px] font-normal leading-tight text-[#8E8E8E]">
        {label}
      </div>
      <div className="max-w-[155px] text-right text-[14px] font-normal leading-tight text-black">
        {value}
      </div>
    </div>
  );
}

export default function EKolektorPinjamanInfo() {
  return (
    <div className="mt-[22px]">
      <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_3px_12px_rgba(15,23,42,0.08)]">
        <div className="px-4 py-[14px]">
          <div className="text-[16px] font-extrabold leading-tight text-black">
            Informasi Pinjaman
          </div>

          <div className="mt-[14px]">
            <InfoLine label="No Rekening" value="12260006" />
            <InfoLine label="Nama Nasabah" value="Pangeran Sirait" />
            <InfoLine label="Produk Pinjaman" value="Pinjaman Bulanan" />
            <InfoLine label="Tanggal Pinjaman" value="30-04-2026" />
            <InfoLine label="Tanggal Jatuh Tempo" value="30-04-2027" />
            <InfoLine label="Jangka Waktu" value="12 Bulan" />
            <InfoLine label="Angsuran Ke" value="2" />
            <InfoLine label="Jumlah Pinjaman" value="2.000.000,00" />
            <InfoLine label="Sisa Pinjaman" value="1.040.000,00" />
            <InfoLine label="Angsuran Pokok" value="166.700,00" />
            <InfoLine label="Angsuran Bunga" value="40.000,00" />
            <InfoLine label="Status" value="Aktif" />
          </div>
        </div>
      </div>
    </div>
  );
}