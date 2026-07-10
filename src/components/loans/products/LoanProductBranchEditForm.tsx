"use client";

import * as React from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  getLoanProducts,
  updateLoanProduct,
  type LoanProductFormConfig,
} from "@/lib/loanProductsStore";
import LoanFormActionButtons from "@/components/loans/LoanFormActionButtons";
import SearchableFeeCoaSelect from "@/components/loans/SearchableFeeCoaSelect";
import FieldTooltip from "@/components/loans/FieldTooltip";
import { deriveLoanProductCode } from "@/components/loans/products/loan-product-list-utils";

type MainCoaOption =
  | "PINJAMAN YANG DIBERIKAN"
  | "PEND. BUNGA PINJAMAN"
  | "PEND. DENDA"
  | "PENDAPATAN LAIN - LAIN"
  | "PEN. ADMINISTRASI";

type MainFieldKey =
  | "coaLoan"
  | "coaInterestRevenue"
  | "coaSplitInterestRevenue"
  | "coaPenaltyRevenue"
  | "coaRoundingRevenue"
  | "coaAdminRevenue";

type SakEpFieldKey =
  | "coaInterestRecognitionRevenue"
  | "coaDeferredAdminRevenue";

type FieldConfig<Key extends string> = {
  key: Key;
  label: React.ReactNode;
  helper?: string;
  placeholder: string;
  options: MainCoaOption[];
};

const mainFields: FieldConfig<MainFieldKey>[] = [
  {
    key: "coaLoan",
    label: "KP Pinjaman",
    placeholder: "Pilih KP Pinjaman",
    options: ["PINJAMAN YANG DIBERIKAN", "PENDAPATAN LAIN - LAIN"],
  },
  {
    key: "coaInterestRevenue",
    label: "KP Pendapatan Bunga",
    placeholder: "Pilih KP Pendapatan Bunga",
    options: ["PEND. BUNGA PINJAMAN", "PENDAPATAN LAIN - LAIN"],
  },
  {
    key: "coaSplitInterestRevenue",
    label: (
      <span className="inline-flex items-center">
        KP Pembagi Pendapatan Bunga
        <FieldTooltip content="Diisi jika ingin pembukuan pendapatan Bunga dibagi ke KP ini." />
      </span>
    ),
    helper: "Diisi jika ingin pembukuan pendapatan Bunga dibagi ke KP ini.",
    placeholder: "Pilih KP Pendapatan Bunga",
    options: ["PEND. BUNGA PINJAMAN", "PENDAPATAN LAIN - LAIN"],
  },
  {
    key: "coaPenaltyRevenue",
    label: "KP Pendapatan Denda",
    placeholder: "Pilih KP Biaya Denda",
    options: ["PEND. DENDA", "PENDAPATAN LAIN - LAIN"],
  },
  {
    key: "coaRoundingRevenue",
    label: "KP Pendapatan Pembulatan",
    placeholder: "Pilih KP Pembulatan",
    options: ["PENDAPATAN LAIN - LAIN", "PEND. DENDA"],
  },
  {
    key: "coaAdminRevenue",
    label: "KP Pendapatan Admin",
    placeholder: "Pilih KP Biaya Admin",
    options: ["PEN. ADMINISTRASI", "PENDAPATAN LAIN - LAIN"],
  },
];

const sakEpFields: FieldConfig<SakEpFieldKey>[] = [
  {
    key: "coaInterestRecognitionRevenue",
    label: "KP Pengakuan Pendapatan Bunga",
    helper:
      "Akun pengakuan pendapatan bunga sesuai kebijakan akuntansi pinjaman pada penerapan SAK EP",
    placeholder: "Pilih KP Pengakuan Pendapatan Bunga",
    options: ["PEND. BUNGA PINJAMAN", "PENDAPATAN LAIN - LAIN"],
  },
  {
    key: "coaDeferredAdminRevenue",
    label: "KP Penangguhan Pendapatan Admin",
    helper:
      "Akun penangguhan pendapatan administrasi sesuai kebijakan akuntansi pinjaman pada penerapan SAK EP",
    placeholder: "Pilih KP Penangguhan Pendapatan Admin",
    options: ["PEN. ADMINISTRASI", "PENDAPATAN LAIN - LAIN"],
  },
];

function readConfigValue(
  config: LoanProductFormConfig | undefined,
  key: string,
): string | undefined {
  const value = config?.[key];
  return typeof value === "string" && value !== "PILIH" ? value : undefined;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <div className="h-px w-full bg-slate-200/80" />
      <div className="mt-6 text-base font-semibold text-slate-900">
        {children}
      </div>
    </div>
  );
}

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
      <div className="text-sm font-normal text-slate-900">{label}</div>
      <Input
        value={value}
        readOnly
        aria-readonly="true"
        className={cn(
          "h-[30px] rounded-[5px] border-slate-200 bg-slate-200/80",
          "text-[12.5px] font-medium text-slate-700 shadow-none",
          "cursor-not-allowed focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
      />
    </div>
  );
}

function CoaFieldRow<Key extends string>({
  field,
  value,
  onChange,
}: {
  field: FieldConfig<Key>;
  value?: string;
  onChange: (value: string | undefined) => void;
}) {
  const hasValue = !!value;

  return (
    <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-start">
      <div className="pt-1">
        <div className="text-sm font-normal text-slate-900">{field.label}</div>
      </div>

      <div className="min-w-0">
        <div className="relative min-w-0">
          {hasValue ? (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onChange(undefined);
              }}
              className={cn(
                "absolute left-2 top-1/2 z-10 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center",
                "rounded-[5px] text-red-600 transition hover:bg-red-50",
                "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              )}
              aria-label={`Hapus ${field.placeholder}`}
              title="Hapus pilihan"
            >
              <X className="h-4.5 w-4.5" strokeWidth={3} />
            </button>
          ) : null}

          <SearchableFeeCoaSelect
            value={value}
            placeholder={field.placeholder}
            options={field.options}
            onChange={onChange}
            triggerClassName={cn(
              "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
              hasValue ? "pl-10 text-slate-900" : "text-slate-500",
            )}
            contentClassName="rounded-[5px] border-slate-200 p-0 shadow-xl"
          />
        </div>

        {field.helper ? (
          <div className="mt-1 text-xs leading-relaxed text-slate-500">
            {field.helper}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function LoanProductBranchEditForm({
  productId,
  onCancel,
  onSaved,
}: {
  productId: string;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const location = useLocation();
  const isSakEpCabangModule = location.pathname.startsWith("/sak-ep-cabang");

  const product = React.useMemo(() => {
    return getLoanProducts().find((item) => item.id === productId) ?? null;
  }, [productId]);

  const [mainValues, setMainValues] = React.useState<
    Record<MainFieldKey, string | undefined>
  >(() => ({
    coaLoan: readConfigValue(product?.formConfig, "coaLoan"),
    coaInterestRevenue: readConfigValue(
      product?.formConfig,
      "coaInterestRevenue",
    ),
    coaSplitInterestRevenue: readConfigValue(
      product?.formConfig,
      "coaSplitInterestRevenue",
    ),
    coaPenaltyRevenue: readConfigValue(product?.formConfig, "coaPenaltyRevenue"),
    coaRoundingRevenue: readConfigValue(
      product?.formConfig,
      "coaRoundingRevenue",
    ),
    coaAdminRevenue: readConfigValue(product?.formConfig, "coaAdminRevenue"),
  }));

  const [sakEpValues, setSakEpValues] = React.useState<
    Record<SakEpFieldKey, string | undefined>
  >(() => ({
    coaInterestRecognitionRevenue: readConfigValue(
      product?.formConfig,
      "coaInterestRecognitionRevenue",
    ),
    coaDeferredAdminRevenue: readConfigValue(
      product?.formConfig,
      "coaDeferredAdminRevenue",
    ),
  }));

  function save() {
    if (!product) {
      toast("Produk tidak ditemukan");
      return;
    }

    updateLoanProduct(product.id, {
      formConfig: {
        ...(product.formConfig ?? {}),
        ...mainValues,
        ...(isSakEpCabangModule ? sakEpValues : {}),
      },
    });

    toast.success("Perubahan tersimpan", {
      description: `Produk: ${product.name}`,
    });
    onSaved();
  }

  return (
    <Card className="rounded-[5px] border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
      <div className="text-[16px] font-semibold text-slate-900">
        Konfigurasi Dasar Produk Pinjaman
      </div>

      <div className="mt-5 grid gap-[15px]">
        <ReadOnlyField
          label="Kode"
          value={product ? deriveLoanProductCode(product) : ""}
        />
        <ReadOnlyField label="Produk Pinjaman" value={product?.name ?? ""} />
      </div>

      <SectionTitle>Konfigurasi KP Pendapatan Pinjaman</SectionTitle>

      <div className="mt-5 grid gap-5">
        {mainFields.map((field) => (
          <CoaFieldRow
            key={field.key}
            field={field}
            value={mainValues[field.key]}
            onChange={(value) =>
              setMainValues((current) => ({
                ...current,
                [field.key]: value,
              }))
            }
          />
        ))}
      </div>

      {isSakEpCabangModule ? (
        <>
          <SectionTitle>Konfigurasi KP Pendapatan Pinjaman SAK EP</SectionTitle>

          <div className="mt-5 grid gap-5">
            {sakEpFields.map((field) => (
              <CoaFieldRow
                key={field.key}
                field={field}
                value={sakEpValues[field.key]}
                onChange={(value) =>
                  setSakEpValues((current) => ({
                    ...current,
                    [field.key]: value,
                  }))
                }
              />
            ))}
          </div>
        </>
      ) : null}

      <LoanFormActionButtons onCancel={onCancel} onSave={save} />
    </Card>
  );
}