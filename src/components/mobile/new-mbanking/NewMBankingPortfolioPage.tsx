import * as React from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BatteryMedium,
  Eye,
  EyeOff,
  PieChart,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";

type PortfolioProduct = {
  name: string;
  fields: Array<{ label: string; value: string }>;
};

const products: PortfolioProduct[] = [
  {
    name: "Simpanan Kaya",
    fields: [
      { label: "No. Rekening", value: "112233111" },
      { label: "Saldo", value: "Rp. 20.000.000,00" },
      { label: "Bunga Pertahun", value: "2,50%" },
    ],
  },
  {
    name: "Simpanan Mapan",
    fields: [
      { label: "No. Rekening", value: "112233222" },
      { label: "Saldo", value: "Rp. 20.000.000,00" },
      { label: "Bunga Pertahun", value: "3,00%" },
    ],
  },
  {
    name: "Deposito Koperasi",
    fields: [
      { label: "No. Rekening", value: "DEP112233" },
      { label: "Saldo", value: "Rp. 10.000.000,00" },
      { label: "Bunga Pertahun", value: "6,00%" },
      { label: "Periode Waktu", value: "12 Bulan" },
      { label: "Saldo Bunga", value: "Rp. 600.000,00" },
      { label: "No. Rek. Tabungan", value: "112233111" },
    ],
  },
];

function PortfolioStatusBar() {
  return (
    <div className="flex h-[30px] shrink-0 items-center justify-between px-6 pt-2 text-black">
      <div className="text-[14px] font-bold leading-none tracking-[-0.02em]">
        11:30
      </div>

      <div className="flex items-center gap-[8px]">
        <div className="flex h-4 items-end gap-[2px]" aria-hidden="true">
          <span className="h-[5px] w-[3px] rounded-full bg-black" />
          <span className="h-[8px] w-[3px] rounded-full bg-black" />
          <span className="h-[11px] w-[3px] rounded-full bg-black" />
          <span className="h-[14px] w-[3px] rounded-full bg-black" />
        </div>
        <Wifi className="h-[17px] w-[17px] text-black" strokeWidth={2.6} />
        <BatteryMedium
          className="h-[19px] w-[19px] text-black"
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
}

function SegmentedTabs() {
  return (
    <div className="mt-[18px] rounded-full bg-white p-[4px] shadow-sm ring-1 ring-[#E5E7EB]">
      <div className="grid grid-cols-2 gap-[4px]">
        <button
          type="button"
          className="h-[42px] rounded-full bg-[#479DF4] text-[14px] font-bold leading-none text-white shadow-sm"
        >
          Aset
        </button>

        <button
          type="button"
          className="h-[42px] rounded-full bg-transparent text-[14px] font-bold leading-none text-[#4B5563] transition active:scale-[0.98]"
        >
          Pinjaman
        </button>
      </div>
    </div>
  );
}

function TotalAssetCard() {
  const [visible, setVisible] = React.useState(true);

  return (
    <section
      className={cn(
        "relative mt-[22px] overflow-hidden rounded-[24px]",
        "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_54%,#1D4ED8_100%)]",
        "px-5 py-[26px] text-center text-white shadow-[0_12px_30px_rgba(37,99,235,0.18)]",
      )}
    >
      <div className="pointer-events-none absolute -left-[34px] top-[24px] h-[108px] w-[108px] rounded-full border-[18px] border-white/14" />
      <div className="pointer-events-none absolute -right-[36px] -top-[28px] h-[126px] w-[126px] rounded-full border-[20px] border-white/14" />
      <div className="pointer-events-none absolute right-[56px] bottom-[-34px] h-[92px] w-[92px] rounded-full border-[16px] border-cyan-100/12" />

      <div className="relative z-10">
        <div className="text-[13px] font-normal leading-none text-white/82">
          Total Aset
        </div>

        <div className="mt-[12px] flex items-center justify-center gap-[10px]">
          <div className="text-[24px] font-bold leading-tight tracking-[-0.04em] text-white">
            {visible ? "Rp. 50.000.000,00" : "••••••••••••"}
          </div>

          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/14 text-white transition active:scale-[0.96]"
            aria-label={visible ? "Sembunyikan total aset" : "Tampilkan total aset"}
            title={visible ? "Sembunyikan total aset" : "Tampilkan total aset"}
          >
            {visible ? (
              <Eye className="h-[18px] w-[18px]" strokeWidth={2.5} />
            ) : (
              <EyeOff className="h-[18px] w-[18px]" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

function PortfolioDonutChart() {
  return (
    <section className="mt-[26px] flex justify-center">
      <div className="relative h-[292px] w-[292px]">
        <div
          className="absolute inset-0 rounded-full shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
          style={{
            background:
              "conic-gradient(#49CFF2 0deg 144deg, #18B7A1 144deg 216deg, #2563EB 216deg 360deg)",
          }}
        />

        <div className="absolute inset-[70px] rounded-full bg-white shadow-inner" />

        <div className="absolute left-[42px] top-[56px] w-[92px] -rotate-[16deg] text-center text-white">
          <div className="text-[22px] font-bold leading-none">40%</div>
          <div className="mt-[6px] text-[11px] font-normal leading-tight">
            Simpanan Kaya
          </div>
        </div>

        <div className="absolute right-[29px] top-[134px] w-[88px] rotate-[8deg] text-center text-white">
          <div className="text-[21px] font-bold leading-none">20%</div>
          <div className="mt-[6px] text-[11px] font-normal leading-tight">
            Deposito Koperasi
          </div>
        </div>

        <div className="absolute bottom-[48px] left-[72px] w-[118px] rotate-[9deg] text-center text-white">
          <div className="text-[22px] font-bold leading-none">40%</div>
          <div className="mt-[6px] text-[11px] font-normal leading-tight">
            Simpanan Mapan
          </div>
        </div>

        <div className="absolute inset-[111px] grid place-items-center rounded-full bg-[#F9FAFB]">
          <PieChart className="h-[35px] w-[35px] text-[#479DF4]" strokeWidth={2.4} />
        </div>
      </div>
    </section>
  );
}

function ProductInfoCell({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-normal leading-none text-[#8F8F8F]">
        {label}
      </div>
      <div className="mt-[7px] break-words text-[14px] font-bold leading-snug text-black">
        {value}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: PortfolioProduct }) {
  return (
    <article className="overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white">
      <div className="flex items-center justify-between gap-4 bg-[#F7F8FC] px-4 py-[14px]">
        <h3 className="min-w-0 truncate text-[17px] font-bold leading-tight tracking-[-0.025em] text-black">
          {product.name}
        </h3>

        <button
          type="button"
          className="inline-flex h-[30px] shrink-0 items-center justify-center gap-[6px] rounded-full bg-[#479DF4] px-[12px] text-[11px] font-semibold leading-none text-white transition active:scale-[0.98]"
        >
          Lihat Detail
          <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={2.6} />
        </button>
      </div>

      <div className="h-px w-full bg-[#E5E7EB]" />

      <div className="grid grid-cols-2 gap-x-5 gap-y-[18px] px-4 py-[16px]">
        {product.fields.map((field) => (
          <ProductInfoCell
            key={`${product.name}-${field.label}`}
            label={field.label}
            value={field.value}
          />
        ))}
      </div>
    </article>
  );
}

export default function NewMBankingPortfolioPage({
  onBack,
  onHomeClick,
  onQrisClick,
}: {
  onBack: () => void;
  onHomeClick: () => void;
  onQrisClick: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <PortfolioStatusBar />

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
            Portofolio
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[150px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[28px] pt-[22px]">
          <SegmentedTabs />
          <TotalAssetCard />
          <PortfolioDonutChart />

          <section className="mt-[28px] grid gap-[16px]">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </section>
        </section>
      </main>

      <NewMBankingHomeMenuSection
        activeTab="portfolio"
        onHomeClick={onHomeClick}
        onPortfolioClick={() => {}}
        onQrisClick={onQrisClick}
      />
    </div>
  );
}