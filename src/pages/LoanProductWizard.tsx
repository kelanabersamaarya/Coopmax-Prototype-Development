import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  BillingScheme,
  createLoanProduct,
} from "@/lib/loanProductsStore";
import {
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Settings2,
  Sparkles,
} from "lucide-react";

type StepId = "basic" | "pricing" | "billing";

type WizardDraft = {
  name: string;
  tenorMonths: number;
  interestRateYearly: number;
  billingScheme: BillingScheme;
  gracePeriodDays: number;
};

const steps: Array<{ id: StepId; title: string; subtitle: string; icon: any }> = [
  {
    id: "basic",
    title: "Informasi Dasar",
    subtitle: "Nama & tenor produk",
    icon: ClipboardList,
  },
  {
    id: "pricing",
    title: "Harga & Bunga",
    subtitle: "Suku bunga & parameter",
    icon: Sparkles,
  },
  {
    id: "billing",
    title: "Billing",
    subtitle: "Skema tagihan & grace",
    icon: Settings2,
  },
];

function isBasicComplete(draft: WizardDraft) {
  return draft.name.trim().length >= 3 && draft.tenorMonths >= 1;
}
function isPricingComplete(draft: WizardDraft) {
  return draft.interestRateYearly > 0;
}
function isBillingComplete(draft: WizardDraft) {
  return draft.gracePeriodDays >= 0 && !!draft.billingScheme;
}

export default function LoanProductWizard() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<StepId>("basic");

  const [draft, setDraft] = useState<WizardDraft>({
    name: "",
    tenorMonths: 12,
    interestRateYearly: 18,
    billingScheme: "Anuitas",
    gracePeriodDays: 7,
  });

  const status = useMemo(() => {
    const basic = isBasicComplete(draft);
    const pricing = isPricingComplete(draft);
    const billing = isBillingComplete(draft);

    return {
      basic,
      pricing,
      billing,
      all: basic && pricing && billing,
    };
  }, [draft]);

  function save() {
    if (!status.all) {
      toast("Belum lengkap", {
        description:
          "Lengkapi minimal informasi dasar, bunga, dan billing sebelum menyimpan.",
      });
      return;
    }

    createLoanProduct({
      name: draft.name.trim(),
      tenorMonths: draft.tenorMonths,
      interestRateYearly: draft.interestRateYearly,
      billingScheme: draft.billingScheme,
      gracePeriodDays: draft.gracePeriodDays,
    });

    toast.success("Produk disimpan", {
      description: "Produk pinjaman baru sudah masuk ke katalog.",
    });
    navigate("/loan-products");
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Button
              asChild
              variant="ghost"
              className="-ml-3 rounded-full text-slate-700 hover:bg-white/60"
            >
              <Link to="/loan-products">
                <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
              </Link>
            </Button>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Setup Produk Pinjaman
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Wizard dengan free navigation — klik step di sidebar kapan saja.
            </p>
          </div>

          <Button
            onClick={save}
            className="rounded-full bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-2))]"
          >
            Simpan Produk
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[320px_1fr]">
          <Card className="rounded-3xl border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Steps
            </div>

            <div className="mt-3 space-y-2">
              {steps.map((s) => {
                const complete =
                  s.id === "basic"
                    ? status.basic
                    : s.id === "pricing"
                      ? status.pricing
                      : status.billing;
                const Icon = s.icon;
                const isActive = activeStep === s.id;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveStep(s.id)}
                    className={`w-full rounded-2xl px-3 py-3 text-left ring-1 transition ${
                      isActive
                        ? "bg-slate-900 text-white ring-slate-900"
                        : "bg-white/70 text-slate-900 ring-slate-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl ${
                          isActive
                            ? "bg-white/15"
                            : "bg-[hsl(var(--app-accent))]/10 text-[hsl(var(--app-accent-2))]"
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="truncate text-sm font-semibold">
                            {s.title}
                          </div>
                          {complete ? (
                            <Badge className="rounded-full bg-emerald-500 text-white hover:bg-emerald-500">
                              <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                              Lengkap
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className={`rounded-full ${
                                isActive
                                  ? "bg-white/15 text-white"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              Belum
                            </Badge>
                          )}
                        </div>
                        <div
                          className={`mt-0.5 text-xs ${
                            isActive ? "text-white/75" : "text-slate-600"
                          }`}
                        >
                          {s.subtitle}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <Separator className="my-4 bg-slate-200/70" />

            <div className="rounded-2xl bg-white/70 p-3 text-xs text-slate-600 ring-1 ring-slate-200">
              <div className="font-semibold text-slate-900">Tip</div>
              <div className="mt-1 leading-relaxed">
                Tidak ada locking step. Status hanya indikator agar mudah melihat
                yang sudah dilengkapi.
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur">
            {activeStep === "basic" && (
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Informasi Dasar
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Tentukan identitas produk dan tenor default.
                </div>

                <div className="mt-5 grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nama Produk</Label>
                    <Input
                      id="name"
                      value={draft.name}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, name: e.target.value }))
                      }
                      placeholder="Contoh: Pinjaman Modal Kerja"
                      className="rounded-2xl"
                    />
                    <div className="text-[11px] text-slate-600">
                      Minimal 3 karakter.
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label>Tenor (bulan)</Label>
                      <div className="text-sm font-semibold text-slate-900">
                        {draft.tenorMonths} bulan
                      </div>
                    </div>
                    <Slider
                      value={[draft.tenorMonths]}
                      min={1}
                      max={36}
                      step={1}
                      onValueChange={(v) =>
                        setDraft((d) => ({ ...d, tenorMonths: v[0] ?? 12 }))
                      }
                    />
                    <div className="text-[11px] text-slate-600">
                      Pilih tenor default untuk produk.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === "pricing" && (
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Harga & Bunga
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Parameter sederhana untuk prototype.
                </div>

                <div className="mt-5 grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label>Suku Bunga (per tahun)</Label>
                      <div className="text-sm font-semibold text-slate-900">
                        {draft.interestRateYearly}%
                      </div>
                    </div>
                    <Slider
                      value={[draft.interestRateYearly]}
                      min={1}
                      max={48}
                      step={0.5}
                      onValueChange={(v) =>
                        setDraft((d) => ({
                          ...d,
                          interestRateYearly: v[0] ?? 18,
                        }))
                      }
                    />
                    <div className="text-[11px] text-slate-600">
                      Nilai ini dipakai sebagai ringkasan produk.
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[hsl(var(--app-accent))]/5 p-4 ring-1 ring-[hsl(var(--app-accent))]/15">
                    <div className="text-xs font-semibold text-slate-900">
                      Preview singkat
                    </div>
                    <div className="mt-2 text-sm text-slate-700">
                      Produk <span className="font-semibold">{draft.name || "(nama)"}</span> akan
                      menampilkan bunga <span className="font-semibold">{draft.interestRateYearly}%/th</span>
                      dengan tenor default <span className="font-semibold">{draft.tenorMonths} bulan</span>.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === "billing" && (
              <div>
                <div className="text-sm font-semibold text-slate-900">Billing</div>
                <div className="mt-1 text-xs text-slate-600">
                  Skema tagihan dan grace period.
                </div>

                <div className="mt-5 grid gap-5">
                  <div className="grid gap-2">
                    <Label>Skema Billing</Label>
                    <RadioGroup
                      value={draft.billingScheme}
                      onValueChange={(v) =>
                        setDraft((d) => ({ ...d, billingScheme: v as BillingScheme }))
                      }
                      className="grid gap-2"
                    >
                      {["Anuitas", "Flat", "Menurun"].map((s) => (
                        <label
                          key={s}
                          className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 transition hover:bg-white"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={s} id={`billing-${s}`} />
                            <div>
                              <div className="text-sm font-semibold text-slate-900">
                                {s}
                              </div>
                              <div className="text-xs text-slate-600">
                                Cocok untuk prototype ringkas.
                              </div>
                            </div>
                          </div>
                          <Badge className="rounded-full bg-slate-900 text-white hover:bg-slate-900">
                            {s}
                          </Badge>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label>Grace period (hari)</Label>
                      <div className="text-sm font-semibold text-slate-900">
                        {draft.gracePeriodDays} hari
                      </div>
                    </div>
                    <Slider
                      value={[draft.gracePeriodDays]}
                      min={0}
                      max={30}
                      step={1}
                      onValueChange={(v) =>
                        setDraft((d) => ({
                          ...d,
                          gracePeriodDays: v[0] ?? 0,
                        }))
                      }
                    />
                    <div className="text-[11px] text-slate-600">
                      Opsional. 0 berarti tidak ada grace period.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
