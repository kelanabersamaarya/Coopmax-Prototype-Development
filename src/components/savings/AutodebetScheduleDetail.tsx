import {
  ArrowLeft,
  ExternalLink,
  List,
  Pencil,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AutodebetSchedule } from "@/components/savings/AutodebetScheduleDialog";

type SavingsAccount = {
  accountNo: string;
  customerId: string;
  customerName: string;
  balance: string;
  product: string;
  registeredAt: string;
};

const NEXT_TRANSACTION_DATE = "31 Agustus 2026";

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
  link = false,
}: {
  label: string;
  value: string;
  link?: boolean;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,164px)_12px_minmax(0,1fr)] gap-2 py-1.5 text-[13px]">
      <span className="text-slate-500">{label}</span>
      <span className="text-center text-slate-400">:</span>
      <span
        className={cn(
          "font-semibold",
          link ? "inline-flex items-center gap-1 text-blue-600" : "text-slate-800",
        )}
      >
        {value}
        {link ? <ExternalLink className="h-3.5 w-3.5" /> : null}
      </span>
    </div>
  );
}

function AccountInfoCard({
  title,
  account,
  tone,
}: {
  title: string;
  account: {
    accountNo: string;
    customerName: string;
    product: string;
    balance: string;
    registeredAt: string;
  };
  tone: "source" | "target";
}) {
  const colorClass =
    tone === "source" ? "bg-[#6f3fc3]" : "bg-[#17a2b8]";

  return (
    <div className={cn("rounded-[8px] p-5 text-white shadow-sm", colorClass)}>
      <div className="text-[14px] font-extrabold tracking-tight">{title}</div>

      <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <div className="text-[11px] text-white/80">Kode Rekening</div>
          <div className="mt-1 inline-flex items-center gap-1 text-[13px] font-bold">
            {account.accountNo}
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
        </div>

        <div>
          <div className="text-[11px] text-white/80">Bunga Per Tahun (%)</div>
          <div className="mt-1 text-[13px] font-bold">
            {tone === "source" ? "2.000 %" : "0.000 %"}
          </div>
        </div>

        <div>
          <div className="text-[11px] text-white/80">Saldo Rekening</div>
          <div className="mt-1 text-[13px] font-bold">{account.balance}</div>
        </div>

        <div>
          <div className="text-[11px] text-white/80">Tanggal Dibuat</div>
          <div className="mt-1 text-[13px] font-bold">{account.registeredAt}</div>
        </div>

        <div>
          <div className="text-[11px] text-white/80">Jenis Rekening</div>
          <div className="mt-1 text-[13px] font-bold">{account.product}</div>
        </div>

        <div>
          <div className="text-[11px] text-white/80">Kolektor</div>
          <div className="mt-1 text-[13px] font-bold">
            {tone === "source" ? "Dinda Sudiati" : "Hilda Usamah"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AutodebetScheduleDetail({
  schedule,
  sourceAccount,
  onBack,
  onEdit,
  onDelete,
}: {
  schedule: AutodebetSchedule;
  sourceAccount: SavingsAccount;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [targetAccountNo, targetCustomerName = "-"] = schedule.accountNo.split(" - ");
  const isLoan = schedule.product === "Produk Pinjaman";
  const transactionDate = isLoan
    ? schedule.date.replace("Tanggal tersedia:", "").trim()
    : schedule.date.replace("Setiap tanggal ", "").trim();

  const targetAccount = {
    accountNo: targetAccountNo,
    customerName: targetCustomerName,
    product: isLoan ? "Pinjaman Bulanan" : "Simpanan Wajib",
    balance: isLoan ? "8.900.000,00" : "50.000,00",
    registeredAt: "06 Dec 2024",
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <h1 className="text-xl font-semibold tracking-tight text-[#002060] md:text-2xl">
          Jadwal Autodebet Detail
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
          <ActionButton
            icon={List}
            label="Kembali ke List Autodebet"
            onClick={onBack}
          />
          <ActionButton
            icon={Pencil}
            label="Edit Jadwal Autodebet"
            onClick={onEdit}
          />
          <ActionButton
            icon={ArrowLeft}
            label="Kembali ke Rekening"
            onClick={onBack}
          />
          <ActionButton icon={Trash2} label="Hapus" onClick={onDelete} />
        </div>

        <div className="mt-6 grid gap-4">
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:p-6">
            <div className="text-[13px] font-extrabold uppercase tracking-wide text-[#002060]">
              Informasi Jadwal Autodebet
            </div>

            <div className="mt-4">
              <InfoRow
                label="Tanggal dilakukan transaksi"
                value={transactionDate}
              />
              <InfoRow
                label="Transaksi Selanjutnya"
                value={NEXT_TRANSACTION_DATE}
              />
              <InfoRow
                label="Keterangan"
                value={schedule.description || "-"}
              />
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:p-6">
            <div className="text-[13px] font-extrabold uppercase tracking-wide text-[#002060]">
              Informasi Data Nasabah/Anggota
            </div>

            <div className="mt-5 grid gap-8 lg:grid-cols-2">
              <div>
                <div className="text-[15px] font-extrabold uppercase text-[#002060]">
                  Rekening Sumber
                </div>
                <div className="mt-3">
                  <InfoRow
                    label="Nama Nasabah"
                    value={sourceAccount.customerName}
                  />
                  <InfoRow
                    label="Kode Nasabah"
                    value={sourceAccount.customerId}
                    link
                  />
                  <InfoRow
                    label="Alamat Nasabah"
                    value="Jl. Sri Rama No. 49"
                  />
                </div>
              </div>

              <div>
                <div className="text-[15px] font-extrabold uppercase text-[#002060]">
                  Rekening Tujuan
                </div>
                <div className="mt-3">
                  <InfoRow
                    label="Nama Nasabah"
                    value={targetCustomerName}
                  />
                  <InfoRow label="Kode Nasabah" value="N2400045" link />
                  <InfoRow
                    label="Alamat Nasabah"
                    value="Jl. Sri Rama No. 49"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:p-6">
            <div className="text-[13px] font-extrabold uppercase tracking-wide text-[#002060]">
              Informasi Rekening
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <AccountInfoCard
                title="Rekening Sumber"
                tone="source"
                account={{
                  accountNo: sourceAccount.accountNo,
                  customerName: sourceAccount.customerName,
                  product: sourceAccount.product,
                  balance: sourceAccount.balance,
                  registeredAt: sourceAccount.registeredAt,
                }}
              />
              <AccountInfoCard
                title="Rekening Tujuan"
                tone="target"
                account={targetAccount}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}