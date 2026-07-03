import { ArrowLeft, CalendarDays, Clock3, HandCoins, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

type InstallmentHistoryItem = {
  id: string;
  installmentLabel: string;
  tanggalTransaksi: string;
  waktuTransaksi: string;
  nominalPembayaran: string;
  nominalPokok: string;
  nominalBunga: string;
  nominalDenda: string;
  sisaPinjaman: string;
};

const histories: InstallmentHistoryItem[] = [
  {
    id: "history-1",
    installmentLabel: "Angsuran ke-1",
    tanggalTransaksi: "20 Juni 2026",
    waktuTransaksi: "10:34 WIB",
    nominalPembayaran: "Rp. 991.666,00",
    nominalPokok: "Rp. 833.333,00",
    nominalBunga: "Rp. 83.333,00",
    nominalDenda: "Rp. 75.000,00",
    sisaPinjaman: "Rp. 10.000.000,00",
  },
  {
    id: "history-2",
    installmentLabel: "Angsuran ke-2",
    tanggalTransaksi: "18 Juli 2026",
    waktuTransaksi: "14:18 WIB",
    nominalPembayaran: "Rp. 916.667,00",
    nominalPokok: "Rp. 833.333,00",
    nominalBunga: "Rp. 83.333,00",
    nominalDenda: "Rp. 0,00",
    sisaPinjaman: "Rp. 9.166.667,00",
  },
  {
    id: "history-3",
    installmentLabel: "Angsuran ke-3",
    tanggalTransaksi: "22 Agustus 2026",
    waktuTransaksi: "09:42 WIB",
    nominalPembayaran: "Rp. 916.667,00",
    nominalPokok: "Rp. 833.333,00",
    nominalBunga: "Rp. 83.333,00",
    nominalDenda: "Rp. 0,00",
    sisaPinjaman: "Rp. 8.333.334,00",
  },
];

function HistoryIcon() {
  return (
    <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
      <HandCoins className="h-[22px] w-[22px] text-white" strokeWidth={2.6} />
    </span>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-[#EEF6FF] text-[#479DF4]">
        <Icon className="h-[16px] w-[16px]" strokeWidth={2.5} />
      </span>

      <div className="mt-[8px] text-[10px] font-normal leading-none text-[#8F8F8F]">
        {label}
      </div>
      <div className="mt-[5px] max-w-full truncate text-[12px] font-semibold leading-tight text-black">
        {value}
      </div>
    </div>
  );
}

function AmountRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-[7px]">
      <div
        className={cn(
          "text-[13px] leading-tight",
          highlight ? "font-bold text-black" : "font-normal text-[#8F8F8F]",
        )}
      >
        {label}
      </div>

      <div
        className={cn(
          "shrink-0 text-right leading-tight",
          highlight
            ? "text-[15px] font-bold text-black"
            : "text-[13px] font-semibold text-black",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function HistoryCard({ item }: { item: InstallmentHistoryItem }) {
  return (
    <article className="rounded-[22px] bg-white px-5 py-5 shadow-[0_4px_14px_rgba(15,23,42,0.12)] ring-1 ring-slate-100">
      <div className="flex items-start gap-3">
        <HistoryIcon />

        <div className="min-w-0 pt-[2px]">
          <div className="text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
            Pembayaran Angsuran
          </div>
          <div className="mt-[6px] text-[12px] font-normal leading-tight text-[#8F8F8F]">
            {item.installmentLabel}
          </div>
        </div>
      </div>

      <div className="mt-[18px] rounded-[18px] bg-[#F8FAFC] px-4 py-4 ring-1 ring-[#EEF0F4]">
        <div className="grid grid-cols-2 gap-4">
          <MetaItem
            icon={CalendarDays}
            label="Tanggal Transaksi"
            value={item.tanggalTransaksi}
          />
          <MetaItem
            icon={Clock3}
            label="Waktu Transaksi"
            value={item.waktuTransaksi}
          />
        </div>
      </div>

      <div className="my-[15px] h-px w-full bg-[#EEF0F4]" />

      <div className="grid">
        <AmountRow label="Nominal Pokok" value={item.nominalPokok} />
        <AmountRow label="Nominal Bunga" value={item.nominalBunga} />
        <AmountRow label="Nominal Denda" value={item.nominalDenda} />

        <div className="my-[8px] border-t border-dashed border-[#D8D8D8]" />

        <AmountRow
          label="Nominal Pembayaran"
          value={item.nominalPembayaran}
          highlight
        />
        <AmountRow label="Sisa Pinjaman" value={item.sisaPinjaman} />
      </div>
    </article>
  );
}

export default function NewMBankingLoanInstallmentHistoryPage({
  accountNo,
  onBack,
}: {
  accountNo: string;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Riwayat Angsuran
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]">
          <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#14B8A6_0%,#0F766E_52%,#115E59_100%)] px-5 py-5 text-white">
            <div className="pointer-events-none absolute -right-[42px] -top-[42px] h-[136px] w-[136px] rounded-full bg-white/16" />
            <div className="pointer-events-none absolute right-[48px] top-[58px] h-[64px] w-[64px] rounded-full bg-emerald-200/16" />
            <div className="pointer-events-none absolute -bottom-[36px] left-[72px] h-[96px] w-[96px] rounded-full bg-teal-950/12" />

            <div className="relative z-10 flex items-center gap-3">
              <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[14px] bg-white/18 text-white">
                <ReceiptText className="h-[23px] w-[23px]" strokeWidth={2.5} />
              </span>

              <div className="min-w-0">
                <div className="text-[12px] font-normal leading-none text-white/78">
                  No. Pinjaman
                </div>
                <div className="mt-[8px] truncate text-[18px] font-bold leading-tight text-white">
                  {accountNo}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[24px] flex items-center gap-3">
            <div className="shrink-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
              Daftar Riwayat
            </div>
            <div className="h-px min-w-0 flex-1 bg-[#E5E7EB]" />
          </div>

          <div className="mt-[14px] grid gap-[14px]">
            {histories.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}