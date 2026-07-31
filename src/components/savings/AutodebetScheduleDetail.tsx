import { type ReactNode } from "react";
import {
  ExternalLink,
  Info,
  List,
  SquarePen,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="text-[14px] font-extrabold uppercase tracking-wide text-[#002060]">
      {children}
    </div>
  );
}

function TransactionDateValue({
  date,
  isLoan,
}: {
  date: string;
  isLoan: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      {date}
      {isLoan ? (
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-white ring-1 ring-[#2563EB]/20 transition hover:bg-[#1D4ED8]"
              aria-label="Informasi tanggal autodebet"
              title="Informasi"
            >
              <Info className="h-3.5 w-3.5" strokeWidth={2.8} />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px] rounded-[8px] border-slate-200 bg-white px-3 py-2 text-[12px] font-medium leading-relaxed text-slate-700 shadow-xl">
            Autodebet pinjaman dilakukan otomatis di akhir bulan, yaitu antara
            tanggal 28, 29, 30, 31 sesuai tanggal terakhir pada bulan berjalan.
          </TooltipContent>
        </Tooltip>
      ) : null}
    </span>
  );
}

function InfoRow({
  label,
  value,
  link = false,
}: {
  label: string;
  value: ReactNode;
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

function CustomerInfoCard({
  title,
  customerName,
  customerId,
  address,
  tone,
}: {
  title: string;
  customerName: string;
  customerId: string;
  address: string;
  tone: "source" | "target";
}) {
  const toneClassName =
    tone === "source" ? "bg-[#6f3fc3]" : "bg-[#17a2b8]";

  return (
    <div className={cn("rounded-[8px] p-5 text-white shadow-sm", toneClassName)}>
      <div className="text-[14px] font-extrabold tracking-tight">{title}</div>

      <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <div className="text-[11px] text-white/80">Nama Nasabah</div>
          <div className="mt-1 text-[13px] font-bold">{customerName}</div>
        </div>

        <div>
          <div className="text-[11px] text-white/80">Kode Nasabah</div>
          <div className="mt-1 inline-flex items-center gap-1 text-[13px] font-bold">
            {customerId}
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <div className="text-[11px] text-white/80">Alamat Nasabah</div>
          <div className="mt-1 text-[13px] font-bold">{address}</div>
        </div>
      </div>
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
            icon={SquarePen}
            label="Edit Jadwal Autodebet"
            onClick={onEdit}
          />
          <ActionButton
            icon={List}
            label="Kembali ke Rekening"
            onClick={onBack}
          />
          <ActionButton icon={FilledTrashIcon} label="Hapus" onClick={onDelete} />
        </div>

        <div className="mt-6 grid gap-4">
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:p-6">
            <SectionHeader>Informasi Jadwal Autodebet</SectionHeader>

            <div className="mt-4">
              <InfoRow
                label="Tanggal dilakukan transaksi"
                value={<TransactionDateValue date={transactionDate} isLoan={isLoan} />}
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
            <SectionHeader>Informasi Data Nasabah/Anggota</SectionHeader>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <CustomerInfoCard
                title="Rekening Sumber"
                tone="source"
                customerName={sourceAccount.customerName}
                customerId={sourceAccount.customerId}
                address="Jl. Sri Rama No. 49"
              />

              <CustomerInfoCard
                title="Rekening Tujuan"
                tone="target"
                customerName={targetCustomerName}
                customerId="N2400045"
                address="Jl. Sri Rama No. 49"
              />
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:p-6">
            <SectionHeader>Informasi Rekening</SectionHeader>

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