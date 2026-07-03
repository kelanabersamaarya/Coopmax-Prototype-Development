import * as React from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BatteryMedium,
  Copy,
  Eye,
  EyeOff,
  PieChart,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";

type PortfolioProduct = {
  name: string;
  type: "simpanan" | "deposito";
  fields: Array<{ label: string; value: string }>;
};

const products: PortfolioProduct[] = [
  {
    name: "Simpanan Kaya",
    type: "simpanan",
    fields: [
      { label: "No. Rekening", value: "112233111" },
      { label: "Saldo", value: "Rp. 20.000.000,00" },
      { label: "Bunga Pertahun", value: "2,50%" },
    ],
  },
  {
    name: "Simpanan Mapan",
    type: "simpanan",
    fields: [
      { label: "No. Rekening", value: "112233222" },
      { label: "Saldo", value: "Rp. 20.000.000,00" },
      { label: "Bunga Pertahun", value: "3,00%" },
    ],
  },
  {
    name: "Deposito Koperasi",
    type: "deposito",
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
    <section className="relative mt-[22px] overflow-hidden rounded-[24px] bg-[#4ba2f5] px-5 py-[28px] text-center text-white shadow-[0_12px_30px_rgba(71,157,244,0.22)]">
      <div className="pointer-events-none absolute -left-[98px] -top-[150px] h-[300px] w-[300px] rounded-full bg-[#f56ac8]" />
      <div className="pointer-events-none absolute -left-[36px] -top-[162px] h-[220px] w-[220px] rounded-full bg-[#f044bd]" />

      <div className="pointer-events-none absolute -right-[76px] -top-[54px] h-[178px] w-[178px] rounded-full bg-[#8fc2f3]" />
      <div className="pointer-events-none absolute right-[-8px] top-[-18px] h-[88px] w-[88px] rounded-full bg-[#459cf0]" />

      <div className="pointer-events-none absolute -bottom-[118px] right-[-116px] h-[260px] w-[260px] rounded-full bg-[#8bdcec]" />
      <div className="pointer-events-none absolute -bottom-[88px] right-[-52px] h-[188px] w-[188px] rounded-full bg-[#65d0e8]" />

      <div className="pointer-events-none absolute -bottom-[92px] -left-[48px] h-[168px] w-[168px] rounded-full bg-[#a143ef]" />
      <div className="pointer-events-none absolute -bottom-[58px] -left-[22px] h-[98px] w-[98px] rounded-full bg-[#8c16ea]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.28)_0%,rgba(37,99,235,0.12)_45%,rgba(15,23,42,0.26)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-white/10" />

      <div className="relative z-10">
        <div className="text-[13px] font-normal leading-none text-white/90 drop-shadow-[0_1px_1px_rgba(15,23,42,0.22)]">
          Total Aset
        </div>

        <div className="mt-[12px] flex items-center justify-center gap-[10px]">
          <div className="text-[24px] font-bold leading-tight tracking-[-0.04em] text-white drop-shadow-[0_1px_1px_rgba(15,23,42,0.28)]">
            {visible ? "Rp. 50.000.000,00" : "••••••••••••"}
          </div>

          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/18 text-white ring-1 ring-white/20 backdrop-blur transition active:scale-[0.96]"
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
  isAccountNumber = false,
}: {
  label: string;
  value: string;
  isAccountNumber?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[12px] font-normal leading-none text-white/70">
        {label}
      </div>
      <div className="mt-[7px] flex min-w-0 items-center gap-2 text-[14px] font-semibold leading-tight text-white">
        <span className="truncate">{value}</span>
        {isAccountNumber ? (
          <Copy className="h-[13px] w-[13px] shrink-0 text-white" strokeWidth={2.4} />
        ) : null}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: PortfolioProduct }) {
  const gradientClass =
    product.type === "deposito"
      ? "bg-[linear-gradient(135deg,#F59E0B_0%,#EA580C_54%,#C2410C_100%)]"
      : "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_52%,#1D4ED8_100%)]";

  return (
    <article
      className={cn(
        "relative min-h-[170px] overflow-hidden rounded-[14px] px-5 py-5 text-white",
        "shadow-[0_8px_22px_rgba(15,23,42,0.12)]",
        gradientClass,
      )}
    >
      <div className="pointer-events-none absolute -right-[36px] -top-[48px] h-[120px] w-[120px] rounded-full bg-white/12" />
      <div className="pointer-events-none absolute right-[22px] -top-[62px] h-[112px] w-[112px] rounded-full bg-white/10" />
      <div className="pointer-events-none absolute right-[72px] top-[18px] h-[44px] w-[44px] rounded-full bg-white/8" />
      <div className="pointer-events-none absolute -bottom-[34px] left-[58px] h-[92px] w-[92px] rounded-full bg-white/8" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[16px] font-extrabold leading-tight tracking-tight text-white">
              {product.name}
            </div>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full bg-white/95 px-3 py-2",
              "text-[11px] font-semibold leading-none",
              product.type === "deposito" ? "text-[#C2410C]" : "text-[#2563EB]",
              "shadow-sm transition active:scale-[0.98]",
            )}
          >
            Lihat Detail
            <ArrowUpRight className="h-[13px] w-[13px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="mt-[22px] grid grid-cols-2 gap-x-4 gap-y-[18px]">
          {product.fields.map((field) => (
            <ProductInfoCell
              key={`${product.name}-${field.label}`}
              label={field.label}
              value={field.value}
              isAccountNumber={
                field.label === "No. Rekening" ||
                field.label === "No. Rek. Tabungan"
              }
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function ProductSection({
  title,
  products,
}: {
  title: string;
  products: PortfolioProduct[];
}) {
  return (
    <section className="grid gap-[14px]">
      <div>
        <div className="text-[16px] font-bold leading-tight tracking-[-0.025em] text-black">
          {title}
        </div>
        <div className="mt-[10px] h-px w-full bg-[#D8D8D8]" />
      </div>

      <div className="grid gap-[14px]">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
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
  const savingsProducts = products.filter((product) => product.type === "simpanan");
  const depositProducts = products.filter((product) => product.type === "deposito");

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

      <main className="min-h-0 flex-1 overflow-y-auto bg-white pb-[150px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full bg-white px-6 pb-[28px] pt-[22px]">
          <SegmentedTabs />
          <TotalAssetCard />
          <PortfolioDonutChart />

          <div className="mt-[28px] grid gap-[24px]">
            <ProductSection title="Simpanan" products={savingsProducts} />
            <ProductSection title="Deposito" products={depositProducts} />
          </div>
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