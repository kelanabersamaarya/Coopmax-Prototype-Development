import { useEffect, useState } from "react";
import {
  CircleX,
  Eye,
  History,
  Info,
  List,
  Plus,
  Printer,
  ReceiptText,
  SquarePen,
  XSquare,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import AutodebetScheduleDialog, {
  type AutodebetSchedule,
} from "@/components/savings/AutodebetScheduleDialog";
import AutodebetDeleteConfirmDialog from "@/components/savings/AutodebetDeleteConfirmDialog";
import AutodebetScheduleDetail from "@/components/savings/AutodebetScheduleDetail";
import {
  getAutodebetSchedules,
  saveAutodebetSchedules,
} from "@/lib/autodebetSchedulesStore";

type SavingsAccountDetail = {
  accountNo: string;
  customerId: string;
  customerName: string;
  balance: string;
  product: string;
  registeredAt: string;
  status: "Aktif" | "Nonaktif" | "Ditutup";
};

type AutodebetHistoryState = {
  __autodebetScheduleDetail?: {
    accountNo: string;
    scheduleIndex: number;
  };
};

const LOAN_AUTODEBET_TOOLTIP =
  "Autodebet pinjaman dilakukan otomatis di akhir bulan, yaitu antara tanggal 28, 29, 30,31 sesuai tanggal terakhir pada bulan berjalan.";

function FilledTrashIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 3.5c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5V4h4a1.25 1.25 0 1 1 0 2.5H5A1.25 1.25 0 0 1 5 4h4v-.5ZM6.5 8h11l-.7 11.12A3.1 3.1 0 0 1 13.7 22h-3.4a3.1 3.1 0 0 1-3.1-2.88L6.5 8Z" />
    </svg>
  );
}

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
    <div className="grid grid-cols-[132px_12px_minmax(0,1fr)] gap-2 py-1.5 text-[14px]">
      <span className="text-slate-500">{label}</span>
      <span className="text-center text-slate-400">:</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function VerificationStatus() {
  return (
    <span className="inline-flex min-h-12 items-center gap-2.5 rounded-[5px] bg-rose-100 px-3 py-2 text-[14px] font-medium text-red-600">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
        <CircleX className="h-5 w-5" strokeWidth={2.2} />
      </span>
      BELUM TERVERIFIKASI
    </span>
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
    <div className="grid h-36 w-36 grid-cols-9 gap-0.5 bg-white p-1.5 ring-1 ring-slate-300">
      {cells.map((active, index) => (
        <span key={index} className={active ? "bg-black" : "bg-white"} />
      ))}
    </div>
  );
}

function ScheduleDateCell({ date }: { date: string }) {
  const isLoanSchedule = date.startsWith("Tanggal tersedia:");
  const displayDate = date
    .replace("Setiap tanggal ", "")
    .replace("Tanggal tersedia:", "")
    .trim();

  return (
    <div className="flex items-center gap-2">
      <span>{displayDate}</span>
      {isLoanSchedule ? (
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-white ring-1 ring-[#2563EB]/20 transition hover:bg-[#1D4ED8]"
              aria-label="Informasi tanggal autodebet pinjaman"
              title="Informasi"
            >
              <Info className="h-3.5 w-3.5" strokeWidth={2.8} />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px] rounded-[8px] border-slate-200 bg-white px-3 py-2 text-[12px] font-medium leading-relaxed text-slate-700 shadow-xl">
            {LOAN_AUTODEBET_TOOLTIP}
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
}

function ScheduleActionButton({
  label,
  tone,
  onClick,
  children,
}: {
  label: string;
  tone: "slate" | "blue" | "red";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const toneClassName =
    tone === "red"
      ? "text-[#B71C2B] hover:text-[#991524]"
      : tone === "blue"
        ? "text-[#3D65FF] hover:text-[#244BEB]"
        : "text-[#7D8CA7] hover:text-[#60708E]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-[5px]",
        "transition hover:bg-slate-100",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
        toneClassName,
      )}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

export default function SavingsAccountDetail({
  account,
  onBack,
}: {
  account: SavingsAccountDetail;
  onBack: () => void;
}) {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [editingScheduleIndex, setEditingScheduleIndex] = useState<number | null>(
    null,
  );
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<number | null>(
    null,
  );
  const [deletingScheduleIndex, setDeletingScheduleIndex] = useState<number | null>(
    null,
  );
  const [autodebitRows, setAutodebitRows] = useState<AutodebetSchedule[]>(() =>
    getAutodebetSchedules(account.accountNo),
  );
  const active = account.status === "Aktif";
  const hasLoanAutodebet = autodebitRows.some(
    (schedule) => schedule.product === "Produk Pinjaman",
  );

  const editingSchedule =
    editingScheduleIndex === null
      ? null
      : autodebitRows[editingScheduleIndex] ?? null;

  const selectedSchedule =
    selectedScheduleIndex === null
      ? null
      : autodebitRows[selectedScheduleIndex] ?? null;

  useEffect(() => {
    setAutodebitRows(getAutodebetSchedules(account.accountNo));
    setEditingScheduleIndex(null);
    setSelectedScheduleIndex(null);
    setDeletingScheduleIndex(null);
  }, [account.accountNo]);

  useEffect(() => {
    function syncScheduleDetailFromHistory() {
      const historyState = window.history.state as AutodebetHistoryState | null;
      const detail = historyState?.__autodebetScheduleDetail;

      if (detail?.accountNo !== account.accountNo) {
        setSelectedScheduleIndex(null);
        return;
      }

      const hasSchedule = detail.scheduleIndex >= 0 && detail.scheduleIndex < autodebitRows.length;
      setSelectedScheduleIndex(hasSchedule ? detail.scheduleIndex : null);
    }

    window.addEventListener("popstate", syncScheduleDetailFromHistory);
    syncScheduleDetailFromHistory();

    return () => {
      window.removeEventListener("popstate", syncScheduleDetailFromHistory);
    };
  }, [account.accountNo, autodebitRows.length]);

  function updateSchedules(nextSchedules: AutodebetSchedule[]) {
    setAutodebitRows(nextSchedules);
    saveAutodebetSchedules(account.accountNo, nextSchedules);
  }

  function openAddSchedule() {
    setEditingScheduleIndex(null);
    setScheduleOpen(true);
  }

  function openEditSchedule(index: number) {
    setSelectedScheduleIndex(null);
    setEditingScheduleIndex(index);
    setScheduleOpen(true);
  }

  function openScheduleDetail(index: number) {
    const nextState: AutodebetHistoryState = {
      ...(window.history.state as AutodebetHistoryState | null),
      __autodebetScheduleDetail: {
        accountNo: account.accountNo,
        scheduleIndex: index,
      },
    };

    window.history.pushState(nextState, "");
    setSelectedScheduleIndex(index);
  }

  function closeScheduleDetail() {
    const historyState = window.history.state as AutodebetHistoryState | null;
    const detail = historyState?.__autodebetScheduleDetail;

    if (detail?.accountNo === account.accountNo) {
      window.history.back();
      return;
    }

    setSelectedScheduleIndex(null);
  }

  function saveSchedule(schedule: AutodebetSchedule) {
    if (editingScheduleIndex === null) {
      updateSchedules([...autodebitRows, schedule]);
      toast.success("Jadwal autodebet ditambahkan", {
        description: `${schedule.product} • ${schedule.date}`,
      });
      return;
    }

    updateSchedules(
      autodebitRows.map((item, index) =>
        index === editingScheduleIndex ? schedule : item,
      ),
    );

    toast.success("Jadwal autodebet diperbarui", {
      description: `${schedule.product} • ${schedule.date}`,
    });
    setEditingScheduleIndex(null);
  }

  function confirmDeleteSchedule() {
    if (deletingScheduleIndex === null) return;

    updateSchedules(
      autodebitRows.filter(
        (_schedule, scheduleIndex) => scheduleIndex !== deletingScheduleIndex,
      ),
    );

    if (selectedScheduleIndex === deletingScheduleIndex) {
      setSelectedScheduleIndex(null);
    }

    setDeletingScheduleIndex(null);
    toast.success("Jadwal autodebet dihapus");
  }

  if (selectedSchedule) {
    return (
      <>
        <AutodebetScheduleDialog
          open={scheduleOpen}
          onOpenChange={(open) => {
            setScheduleOpen(open);
            if (!open) setEditingScheduleIndex(null);
          }}
          schedule={editingSchedule}
          onProcess={saveSchedule}
        />

        <AutodebetDeleteConfirmDialog
          open={deletingScheduleIndex !== null}
          onCancel={() => setDeletingScheduleIndex(null)}
          onConfirm={confirmDeleteSchedule}
        />

        <AutodebetScheduleDetail
          schedule={selectedSchedule}
          sourceAccount={account}
          onBack={closeScheduleDetail}
          onEdit={() => openEditSchedule(selectedScheduleIndex!)}
          onDelete={() => setDeletingScheduleIndex(selectedScheduleIndex)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <AutodebetScheduleDialog
        open={scheduleOpen}
        onOpenChange={(open) => {
          setScheduleOpen(open);
          if (!open) setEditingScheduleIndex(null);
        }}
        schedule={editingSchedule}
        onProcess={saveSchedule}
      />

      <AutodebetDeleteConfirmDialog
        open={deletingScheduleIndex !== null}
        onCancel={() => setDeletingScheduleIndex(null)}
        onConfirm={confirmDeleteSchedule}
      />

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
          <ActionButton icon={List} label="Kembali ke Daftar" onClick={onBack} />
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
            <div className="flex w-full flex-col items-center gap-3 lg:self-stretch">
              <QrPreview />
              <div className="grid w-full grid-cols-2 gap-3 lg:mt-auto">
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
                {[
                  ["Kode Tabungan", account.accountNo],
                  ["Kolektor", "Dinda Sudiati"],
                  ["Tanggal Dibuat", account.registeredAt],
                  ["Saldo", account.balance],
                  ["Bunga Per Tahun (%)", "2,00 %"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="text-[11px] text-white/80">{label}</div>
                    <div className="mt-1 text-[13px] font-bold">{value}</div>
                  </div>
                ))}
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
                      active ? "bg-[#3BB001] text-white" : "bg-rose-500 text-white",
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
                value={<span className="text-blue-600">{account.customerId} ↗</span>}
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
                value={<VerificationStatus />}
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

          <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-800">
            INFORMASI KREDIT
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div>
              <InfoRow label="Tanggal Realisasi" value="16-03-2026" />
              <InfoRow label="Besar Pinjaman / Plafon" value="10.000.000" />
              <InfoRow label="Biaya Administrasi" value="100.000" />
              <InfoRow label="Biaya Materai" value="200.000" />
              <InfoRow label="Jumlah Potongan" value="322.000" />
              <InfoRow label="Penerimaan Bersih" value="9.678.000" />
              <InfoRow
                label="Terbilang"
                value={
                  <span className="block leading-snug">
                    Sembilan Juta Enam Ratus
                    <br />
                    Tujuh Puluh Delapan Ribu
                  </span>
                }
              />
              <InfoRow label="Dicairkan ke Rekening Tabungan" value="8503046" />
            </div>

            <div>
              <InfoRow label="Satuan Grace Period" value="Bulan" />
              <InfoRow label="Durasi Grace Period" value="6" />
              <InfoRow label="Status Grace Period" value={<ActiveBadge>Aktif</ActiveBadge>} />
              <InfoRow
                label="Skema Tagihan"
                value={<span className="font-semibold">Tagihan Sesuai Jadwal Angsuran</span>}
              />
              <InfoRow
                label="Tagihan Angsuran Menggunakan Tabel Angsuran"
                value={<ActiveBadge>Aktif</ActiveBadge>}
              />
              <InfoRow
                label="Status Tabel Angsuran"
                value={
                  <SuccessBadge>
                    <span className="mr-1">✓</span> Berhasil Tersinkron
                  </SuccessBadge>
                }
              />
            </div>
          </div>

          <div className="my-6 h-px bg-slate-200" />

          <div className="flex items-center justify-between gap-3">
            <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-800">
              Jadwal Autodebet
            </div>
            <Button
              onClick={openAddSchedule}
              variant="ghost"
              className="group h-8 rounded-[5px] px-2 text-[12px] font-semibold text-slate-600 hover:bg-slate-100 hover:text-violet-600"
            >
              <PlusIcon />
              Tambah
            </Button>
          </div>

          <div className="mt-4 bg-white">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[850px] border-collapse text-black">
                <thead className="bg-white">
                  <tr className="border-b border-slate-200 text-left text-[10px] font-extrabold uppercase tracking-wide text-black">
                    <th className="px-3 py-3 text-black">No.</th>
                    <th className="px-3 py-3 text-black">Produk Tujuan</th>
                    <th className="px-3 py-3 text-black">No. Rekening Tujuan</th>
                    <th className="px-3 py-3 text-black">
                      Pemilik Rekening Tujuan
                    </th>
                    {hasLoanAutodebet ? (
                      <th className="px-3 py-3 text-right text-black">
                        Nominal Angsuran
                      </th>
                    ) : null}
                    <th className="px-3 py-3 text-black">Setiap Tanggal</th>
                    <th className="px-3 py-3 text-black">
                      Tanggal Transaksi Selanjutnya
                    </th>
                    <th className="px-3 py-3 text-black">Keterangan</th>
                    <th className="px-3 py-3 text-black">Status</th>
                    <th className="px-3 py-3 text-center text-black">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {autodebitRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={hasLoanAutodebet ? 10 : 9}
                        className="px-4 py-8 text-center text-[12px] text-black"
                      >
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    autodebitRows.map((row, index) => {
                      const [accountNo, owner = "-"] = row.accountNo.split(" - ");
                      const isLoanSchedule = row.product === "Produk Pinjaman";

                      return (
                        <tr
                          key={`${row.accountNo}-${row.date}-${index}`}
                          className="border-b border-slate-200 text-[12px] text-black last:border-b-0"
                        >
                          <td className="px-3 py-3 text-black">{index + 1}</td>
                          <td className="px-3 py-3 font-semibold text-black">
                            {row.product}
                          </td>
                          <td className="px-3 py-3 text-black">{accountNo}</td>
                          <td className="px-3 py-3 text-black">{owner}</td>
                          {hasLoanAutodebet ? (
                            <td className="px-3 py-3 text-right tabular-nums text-black">
                              {isLoanSchedule ? "1.120.000,00" : "-"}
                            </td>
                          ) : null}
                          <td className="px-3 py-3 text-black">
                            <ScheduleDateCell date={row.date} />
                          </td>
                          <td className="px-3 py-3 text-black">
                            31-08-2026
                          </td>
                          <td className="px-3 py-3 text-black">
                            {row.description || "-"}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={cn(
                                "inline-flex rounded-[4px] px-2 py-1 text-[10px] font-bold text-white",
                                row.status ? "bg-[#3BB001]" : "bg-[#DC3545]",
                              )}
                            >
                              {row.status ? "Aktif" : "Nonaktif"}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <ScheduleActionButton
                                label="Lihat jadwal"
                                tone="slate"
                                onClick={() => openScheduleDetail(index)}
                              >
                                <Eye className="h-6 w-6" strokeWidth={2.3} />
                              </ScheduleActionButton>
                              <ScheduleActionButton
                                label="Ubah jadwal"
                                tone="blue"
                                onClick={() => openEditSchedule(index)}
                              >
                                <SquarePen className="h-6 w-6" strokeWidth={2.3} />
                              </ScheduleActionButton>
                              <ScheduleActionButton
                                label="Hapus jadwal"
                                tone="red"
                                onClick={() => setDeletingScheduleIndex(index)}
                              >
                                <CircleX className="h-6 w-6" strokeWidth={2.2} />
                              </ScheduleActionButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
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
  return (
    <span className="mr-1 inline-flex h-4 w-4 items-center justify-center rounded-[3px] border border-current text-current transition-colors">
      <Plus className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}