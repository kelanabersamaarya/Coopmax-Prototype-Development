import { useState } from "react";
import {
  CalendarDays,
  FileText,
  History,
  List,
  Printer,
  ReceiptText,
  SquarePen,
  XSquare,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SavingsAccountDetail = {
  accountNo: string;
  registeredAt: string;
  product: string;
  customerId: string;
  customerName: string;
  balance: string;
  status: "Aktif" | "Nonaktif" | "Ditutup";
};

function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
    >
      <Icon className="h-4 w-4 text-slate-600" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[132px_12px_minmax(0,1fr)] gap-2 py-1.5 text-[12px]">
      <span className="text-slate-500">{label}</span>
      <span className="text-center text-slate-400">:</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function QrPreview() {
  const cells = Array.from({ length: 81 }, (_, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const corner =
      (row < 3 && col < 3) ||
      (row < 3 && col > 5) ||
      (row > 5 && col < 3);

    return corner || (row * 5 + col * 3) % 4 === 0;
  });

  return (
    <div className="grid h-20 w-20 grid-cols-9 gap-0.5 bg-white p-1 ring-1 ring-slate-300">
      {cells.map((active, index) => (
        <span key={index} className={active ? "bg-black" : "bg-white"} />
      ))}
    </div>
  );
}

export default function SavingsAccountDetail({
  account,
  onBack,
}: {
  account: SavingsAccountDetail;
  onBack: () => void;
}) {
  const [autodebitRows] = useState<never[]>([]);
  const active = account.status === "Aktif";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Rekening Tabungan
          </h1>
          <span className="text-sm font-semibold text-slate-500">Detail</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-2">
          <ActionButton
            icon={History}
            label="Riwayat Transaksi Autodebet"
            onClick={() => toast("Riwayat Autodebet (prototype)")}
          />
          <ActionButton
            icon={ReceiptText}
            label="Riwayat Transaksi"
            onClick={() => toast("Riwayat Transaksi (prototype)")}
          />
          <ActionButton
            icon={XSquare}
            label="Tutup Rekening"
            onClick={() => toast("Tutup Rekening (prototype)")}
          />
          <ActionButton
            icon={Printer}
            label="Dokumen"
            onClick={() => toast("Dokumen (prototype)")}
          />
          <ActionButton
            icon={List}
            label="Kembali ke Daftar"
            onClick={onBack}
          />
          <ActionButton
            icon={SquarePen}
            label="Ubah"
            onClick={() => toast("Ubah Rekening (prototype)")}
          />
        </div>

        <Card className="mt-5 rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-800">
            Informasi Rekening
          </div>

          <div className="mt-4 grid gap-5 lg:grid-cols-[210px_minmax(0,1fr)]">
            <div className="flex w-full flex-col items-center gap-3">
              <QrPreview />
              <div className="grid w-full grid-cols-2 gap-3">
                <Button
                  onClick={() => toast("Preview QR (prototype)")}
                  className="h-8 rounded-[7px] bg-blue-600 px-4 text-[12px] font-semibold text-white hover:bg-blue-700"
                >
                  <List className="mr-2 h-3.5 w-3.5 shrink-0" />
                  Preview
                </Button>
                <Button
                  onClick={() => toast("Cetak QR (prototype)")}
                  className="h-8 rounded-[7px] bg-blue-600 px-4 text-[12px] font-semibold text-white hover:bg-blue-700"
                >
                  <Printer className="mr-2 h-3.5 w-3.5 shrink-0" />
                  Cetak
                </Button>
              </div>
            </div>

            <div className="rounded-[8px] bg-[#6f3fc3] p-5 text-white shadow-sm">
              <div className="text-[12px] font-extrabold uppercase tracking-wide">
                {account.product}
              </div>
              <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-[11px] text-white/80">Kode Tabungan</div>
                  <div className="mt-1 text-[13px] font-bold">
                    {account.accountNo}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-white/80">Kolektor</div>
                  <div className="mt-1 text-[13px] font-bold">
                    Dinda Sudiati
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-white/80">
                    Tanggal Dibuat
                  </div>
                  <div className="mt-1 text-[13px] font-bold">
                    {account.registeredAt}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-white/80">Saldo</div>
                  <div className="mt-1 text-[13px] font-bold">
                    {account.balance}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-white/80">
                    Bunga Per Tahun (%)
                  </div>
                  <div className="mt-1 text-[13px] font-bold">2,00 %</div>
                </div>
                <div>
                  <div className="text-[11px] text-white/80">
                    Tabungan Berjangka
                  </div>
                  <span className="mt-1 inline-flex rounded-[4px] bg-[#DC3545] px-2 py-1 text-[11px] font-bold text-white">
                    Tidak
                  </span>
                </div>
                <div>
                  <div className="text-[11px] text-white/80">Status</div>
                  <span
                    className={cn(
                      "mt-1 inline-flex rounded-[4px] px-2 py-1 text-[11px] font-bold",
                      active
                        ? "bg-[#3BB001] text-white"
                        : "bg-rose-500 text-white",
                    )}
                  >
                    {account.status}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] text-white/80">Label</div>
                  <div className="mt-1 text-[13px] font-bold">-</div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-6 h-px bg-slate-200" />

          <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-800">
            Informasi Nasabah
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div>
              <InfoRow
                label="ID"
                value={
                  <span className="text-blue-600">{account.customerId} ↗</span>
                }
              />
              <InfoRow label="NIP" value="-" />
              <InfoRow label="Nama" value={account.customerName} />
              <InfoRow label="Tanggal Lahir" value="1990-01-02" />
              <InfoRow label="Kategori Nasabah" value="Anggota" />
              <InfoRow label="Jenis Kelamin" value="Perempuan" />
              <InfoRow label="Alamat" value="Jl. Sri Rama No. 49" />
              <InfoRow
                label="Hubungan dengan Koperasi"
                value="Calon Anggota"
              />
              <InfoRow label="Tanggal Daftar" value={account.registeredAt} />
              <InfoRow label="Tag" value="-" />
              <InfoRow label="Unit" value="-" />
              <InfoRow
                label="Status Verifikasi KTP"
                value={
                  <span className="inline-flex rounded-[4px] bg-rose-600 px-2 py-1 text-[10px] font-bold text-white">
                    BELUM TERVERIFIKASI
                  </span>
                }
              />
              <InfoRow
                label="Status"
                value={
                  <span
                    className={cn(
                      "inline-flex rounded-[4px] px-2 py-1 text-[10px] font-bold text-white",
                      active ? "bg-[#3BB001]" : "bg-rose-600",
                    )}
                  >
                    {active ? "Aktif" : account.status}
                  </span>
                }
              />
            </div>

            <div>
              <InfoRow label="Agama" value="Hindu" />
              <InfoRow label="Profesi" value="SWASTA" />
              <InfoRow label="Jenis Identitas" value="KTP" />
              <InfoRow label="No. Identitas" value="6203617005258715" />
              <InfoRow label="No. Telp/Handphone" value="023 5822 6972" />
              <InfoRow label="Alamat Email" value="putu@gmail.com" />
            </div>
          </div>

          <div className="my-6 h-px bg-slate-200" />

          <div className="flex items-center justify-between gap-3">
            <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-800">
              Jadwal Autodebet
            </div>
            <Button
              onClick={() => toast("Tambah Jadwal Autodebet (prototype)")}
              variant="ghost"
              className="h-8 rounded-[5px] px-2 text-[12px] font-semibold text-slate-600 hover:bg-slate-100"
            >
              <PlusIcon />
              Tambah
            </Button>
          </div>

          <div className="mt-4 overflow-hidden rounded-[5px] ring-1 ring-slate-200">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[850px] border-collapse">
                <thead className="bg-white">
                  <tr className="border-b border-slate-200 text-left text-[10px] font-extrabold uppercase tracking-wide text-slate-700">
                    {[
                      "No.",
                      "Produk Tujuan",
                      "No. Rekening Tujuan",
                      "Pemilik Rekening Tujuan",
                      "Setiap Tanggal",
                      "Tanggal Transaksi Selanjutnya",
                      "Keterangan",
                      "Status",
                      "Aksi",
                    ].map((label) => (
                      <th key={label} className="px-3 py-3">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {autodebitRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-8 text-center text-[12px] text-slate-500"
                      >
                        No data available in table
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PlusIcon() {
  return <span className="mr-1 text-base leading-none">⊞</span>;
}