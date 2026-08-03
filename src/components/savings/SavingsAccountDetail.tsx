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

function ActiveBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-[4px] bg-[#3BB001] px-2 py-1 text-[10px] font-bold text-white">
      {children}
    </span>
  );
}

function SuccessBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-[4px] bg-[#3BB001] px-2 py-1 text-[10px] font-bold text-white">
      {children}
    </span>
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
      {label}
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [schedules, setSchedules] = useState<AutodebetSchedule[]>(() =>
    getAutodebetSchedules(account.accountNo),
  );

  useEffect(() => {
    setSchedules(getAutodebetSchedules(account.accountNo));
    setEditingIndex(null);
    setViewingIndex(null);
    setDeletingIndex(null);
  }, [account.accountNo]);

  function updateSchedules(next: AutodebetSchedule[]) {
    setSchedules(next);
    saveAutodebetSchedules(account.accountNo, next);
  }

  function saveSchedule(schedule: AutodebetSchedule) {
    const next =
      editingIndex === null
        ? [...schedules, schedule]
        : schedules.map((item, index) =>
            index === editingIndex ? schedule : item,
          );

    updateSchedules(next);
    setEditingIndex(null);
    toast.success("Jadwal autodebet tersimpan");
  }

  function openEdit(index: number) {
    setViewingIndex(null);
    setEditingIndex(index);
    setScheduleOpen(true);
  }

  function requestDelete(index: number) {
    setViewingIndex(null);
    setDeletingIndex(index);
  }

  const viewedSchedule =
    viewingIndex === null ? null : schedules[viewingIndex] ?? null;

  const hasLoanSchedule = schedules.some(
    (schedule) => schedule.product === "Produk Pinjaman",
  );

  if (viewedSchedule) {
    return (
      <>
        <AutodebetScheduleDialog
          open={scheduleOpen}
          onOpenChange={(open) => {
            setScheduleOpen(open);
            if (!open) setEditingIndex(null);
          }}
          schedule={editingIndex === null ? null : schedules[editingIndex]}
          onProcess={saveSchedule}
        />

        <AutodebetDeleteConfirmDialog
          open={deletingIndex !== null}
          onCancel={() => setDeletingIndex(null)}
          onConfirm={() => {
            if (deletingIndex === null) return;

            updateSchedules(
              schedules.filter((_, index) => index !== deletingIndex),
            );
            setDeletingIndex(null);
            setViewingIndex(null);
            toast.success("Jadwal autodebet dihapus");
          }}
        />

        <AutodebetScheduleDetail
          schedule={viewedSchedule}
          sourceAccount={account}
          onBack={() => setViewingIndex(null)}
          onEdit={() => openEdit(viewingIndex ?? 0)}
          onDelete={() => requestDelete(viewingIndex ?? 0)}
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
          if (!open) setEditingIndex(null);
        }}
        schedule={editingIndex === null ? null : schedules[editingIndex]}
        onProcess={saveSchedule}
      />

      <AutodebetDeleteConfirmDialog
        open={deletingIndex !== null}
        onCancel={() => setDeletingIndex(null)}
        onConfirm={() => {
          if (deletingIndex === null) return;

          updateSchedules(schedules.filter((_, index) => index !== deletingIndex));
          setDeletingIndex(null);
          toast.success("Jadwal autodebet dihapus");
        }}
      />

      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Rekening Tabungan
          </h1>
          <span className="text-sm font-semibold text-slate-500">Detail</span>
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-2">
          <ActionButton
            icon={History}
            label="Riwayat Transaksi"
            onClick={() => toast("Riwayat Transaksi (prototype)")}
          />
          <ActionButton
            icon={ReceiptText}
            label="Dokumen"
            onClick={() => toast("Dokumen (prototype)")}
          />
          <ActionButton
            icon={Printer}
            label="Cetak"
            onClick={() => toast("Cetak (prototype)")}
          />
          <ActionButton icon={List} label="Kembali ke Daftar" onClick={onBack} />
          <ActionButton
            icon={SquarePen}
            label="Ubah"
            onClick={() => toast("Ubah Rekening (prototype)")}
          />
          <ActionButton
            icon={XSquare}
            label="Tutup Rekening"
            onClick={() => toast("Tutup Rekening (prototype)")}
          />
        </div>

        <Card className="mt-5 rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-800">
            Informasi Rekening
          </div>

          <div className="mt-4 rounded-[8px] bg-[#6f3fc3] p-5 text-white shadow-sm">
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
                <div className="text-[11px] text-white/80">Status</div>
                <div className="mt-1">
                  <ActiveBadge>{account.status}</ActiveBadge>
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
              <InfoRow label="Nama" value={account.customerName} />
              <InfoRow label="Alamat" value="Jl. Sri Rama No. 49" />
              <InfoRow
                label="Status Verifikasi KTP"
                value={
                  <span className="inline-flex items-center gap-2 rounded-[5px] bg-rose-100 px-3 py-2 text-[12px] font-semibold text-red-600">
                    <CircleX className="h-4 w-4" />
                    BELUM TERVERIFIKASI
                  </span>
                }
              />
            </div>
            <div>
              <InfoRow label="Jenis Identitas" value="KTP" />
              <InfoRow label="No. Identitas" value="6203617005258715" />
              <InfoRow label="No. Telp/Handphone" value="023 5822 6972" />
              <InfoRow
                label="Status"
                value={<SuccessBadge>Aktif</SuccessBadge>}
              />
            </div>
          </div>

          <div className="my-6 h-px bg-slate-200" />

          <div className="flex items-center justify-between gap-3">
            <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-800">
              Jadwal Autodebet
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setEditingIndex(null);
                setScheduleOpen(true);
              }}
              className="h-8 rounded-[5px] px-2 text-[12px] font-semibold text-slate-600 hover:text-violet-600"
            >
              <Plus className="mr-1 h-4 w-4" />
              Tambah
            </Button>
          </div>

          <div className="mt-4 safe-x-scroll">
            <table className="w-full min-w-[850px] border-collapse text-[12px] text-black">
              <thead>
                <tr className="border-b border-slate-200 text-left font-bold uppercase tracking-wide">
                  <th className="px-3 py-3">No.</th>
                  <th className="px-3 py-3">Produk Tujuan</th>
                  <th className="px-3 py-3">No. Rekening Tujuan</th>
                  <th className="px-3 py-3">Pemilik Rekening Tujuan</th>
                  {hasLoanSchedule ? (
                    <th className="px-3 py-3 text-right">Nominal Angsuran</th>
                  ) : null}
                  <th className="px-3 py-3">Setiap Tanggal</th>
                  <th className="px-3 py-3">Tanggal Transaksi Selanjutnya</th>
                  <th className="px-3 py-3">Keterangan</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {schedules.length === 0 ? (
                  <tr>
                    <td
                      colSpan={hasLoanSchedule ? 10 : 9}
                      className="px-4 py-8 text-center"
                    >
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  schedules.map((schedule, index) => {
                    const [targetAccount, owner = "-"] =
                      schedule.accountNo.split(" - ");
                    const isLoanSchedule =
                      schedule.product === "Produk Pinjaman";

                    return (
                      <tr
                        key={`${schedule.accountNo}-${schedule.date}-${index}`}
                        className="border-b border-slate-200 last:border-b-0"
                      >
                        <td className="px-3 py-3">{index + 1}</td>
                        <td className="px-3 py-3 font-semibold">
                          {schedule.product}
                        </td>
                        <td className="px-3 py-3">{targetAccount}</td>
                        <td className="px-3 py-3">{owner}</td>
                        {hasLoanSchedule ? (
                          <td className="px-3 py-3 text-right tabular-nums">
                            {isLoanSchedule ? "1.120.000,00" : "-"}
                          </td>
                        ) : null}
                        <td className="px-3 py-3">
                          {schedule.date.replace("Setiap tanggal ", "")}
                        </td>
                        <td className="px-3 py-3">31-08-2026</td>
                        <td className="px-3 py-3">
                          {schedule.description || "-"}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={cn(
                              "inline-flex rounded-[4px] px-2 py-1 text-[10px] font-bold text-white",
                              schedule.status ? "bg-[#3BB001]" : "bg-[#DC3545]",
                            )}
                          >
                            {schedule.status ? "Aktif" : "Nonaktif"}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setViewingIndex(index)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] text-slate-500 hover:bg-slate-100"
                              title="Lihat jadwal"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openEdit(index)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] text-blue-600 hover:bg-slate-100"
                              title="Ubah jadwal"
                            >
                              <SquarePen className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => requestDelete(index)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] text-rose-600 hover:bg-slate-100"
                              title="Hapus jadwal"
                            >
                              <CircleX className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}