import * as React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  RotateCcw,
  Search,
  CheckSquare,
  ChevronDown,
  Check,
  ShieldCheck,
  XCircle,
  Plus,
  HelpCircle,
} from "lucide-react";
import PenaltyScheduleForm, {
  type PenaltyScheduleDraft,
  type PenaltyBase as PenaltyBaseFromForm,
} from "@/components/loans/PenaltyScheduleForm";
import LoanFormActionButtons from "@/components/loans/LoanFormActionButtons";
import { Switch } from "@/components/ui/switch";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";

type TabId = "general" | "agunan" | "penanggung" | "upload" | "jadwal";

const UI = {
  radius: "rounded-[5px]",
  h: "h-[30px]",
  text: "text-[12.5px]",
  gapY: "gap-[15px]",
  input:
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] !placeholder:text-[#64748B]",
  selectTrigger:
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] [&_[data-placeholder]]:text-slate-500",
  btn: "h-[30px] rounded-[5px] text-[12.5px]",
  sectionTitle: "text-[16px] font-semibold tracking-tight text-slate-900",
} as const;

function isPlaceholderValue(v: string) {
  const s = (v ?? "").trim().toLowerCase();
  return s.startsWith("pilih ") || s === "semua";
}

function isDefaultMoney(v: string) {
  return (v ?? "").trim() === "0,00" || (v ?? "").trim() === "0";
}

function FieldRowInline({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
      <div className="text-left">
        <div className="text-sm font-normal text-slate-900">
          {label}
          {required ? <span className="text-rose-600"> *</span> : null}
        </div>
        {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function TabPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-full px-5 text-sm font-semibold transition",
        active
          ? "bg-violet-600 text-white shadow-sm"
          : "bg-transparent text-slate-600 hover:bg-white/60",
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}

function ActionIconButton({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex w-11 items-center justify-center rounded-r-[5px] bg-slate-600 text-white ring-1 ring-slate-600/20 transition hover:bg-slate-700",
        UI.h,
      )}
    >
      {icon}
    </button>
  );
}

const loanProductOptions = [
  "Pinjaman Koperasi",
  "Pinjaman RC",
  "PINJAMAN EMAS",
  "Pinjaman Billing",
  "PINJAMAN BILLING - BARU",
  "PINJAMAN BULANAN TETAP",
] as const;

type LoanProductOption = (typeof loanProductOptions)[number];

function LoanProductCombobox({
  value,
  onChange,
}: {
  value: LoanProductOption | "Pilih Pinjaman";
  onChange: (v: LoanProductOption) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between border border-slate-200 bg-white px-3 text-left font-medium shadow-sm transition hover:bg-slate-50",
            UI.h,
            UI.radius,
            UI.text,
          )}
        >
          <span
            className={cn(
              value === "Pilih Pinjaman" ? "text-[#64748B]" : "text-slate-900",
            )}
          >
            {value}
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "w-[--radix-popover-trigger-width] border-slate-200 p-0",
          UI.radius,
        )}
      >
        <Command className={cn(UI.radius)}>
          <CommandInput placeholder="Cari..." />
          <CommandList>
            <CommandEmpty>Tidak ada hasil.</CommandEmpty>
            <CommandGroup>
              {loanProductOptions.map((opt) => (
                <CommandItem
                  key={opt}
                  value={opt}
                  onSelect={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={cn(UI.radius)}
                >
                  <span className="min-w-0 flex-1 truncate">{opt}</span>
                  {value === opt ? (
                    <Check className="h-4 w-4 text-[hsl(var(--app-accent-2))]" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function getTodayDmy() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

type PenaltyBase = PenaltyBaseFromForm;

const RECURRING_TT =
  "Aktifkan Agar Denda Dihitung Secara Berulang dan Terus Bertambah Hingga Tagihan Dilunasi";

type PrefillSeed = {
  noRekening: string;
  tanggalDaftar: string;
  produkPinjaman: LoanProductOption;
  idNasabah: string;
  nik: string;
  nama: string;
  alamat: string;
  unitAnggota: string;
  kolektor: string;

  bungaPerTahun: string;
  metodeBunga: string;
  besarPinjaman: string;
  jangkaWaktu: string;

  // Jadwal
  jenisPerhitunganBunga: string;
  metodePerhitunganBunga: string;
  frekuensiBunga: string;
  periode: string;
  tanggalTagihanKe1: string;

  // Jadwal Denda
  penaltyVisible: boolean;
  penaltyDraft: PenaltyScheduleDraft;
  penaltyRecurring: boolean;
};

const seedByAccountNo: Record<string, PrefillSeed> = {
  SMG260004: {
    noRekening: "SMG260004",
    tanggalDaftar: "07-04-2026",
    produkPinjaman: "Pinjaman Billing",
    idNasabah: "N2600006",
    nik: "887878787878787",
    nama: "Bapak Bagus",
    alamat: "Sidakarya",
    unitAnggota: "-",
    kolektor: "Gina Farida M.M.",

    bungaPerTahun: "12.00",
    metodeBunga: "Flat",
    besarPinjaman: "12.000.000,00",
    jangkaWaktu: "12",

    jenisPerhitunganBunga: "Jadwal Tetap",
    metodePerhitunganBunga: "Bunga Efektif",
    frekuensiBunga: "Bulanan",
    periode: "1",
    tanggalTagihanKe1: "07-04-2026",

    penaltyVisible: true,
    penaltyDraft: {
      rateMode: "percent",
      rateValue: "1%",
      base: "Pokok",
      lateDays: "3",
    },
    penaltyRecurring: true,
  },
  "klpk04.07260001": {
    noRekening: "klpk04.07260001",
    tanggalDaftar: "10-02-2026",
    produkPinjaman: "Pinjaman Billing",
    idNasabah: "N2500009",
    nik: "1601095402960002",
    nama: "Indah Sari",
    alamat: "Denpasar",
    unitAnggota: "-",
    kolektor: "Kolektor A",

    bungaPerTahun: "11.50",
    metodeBunga: "Flat",
    besarPinjaman: "10.000.000,00",
    jangkaWaktu: "12",

    jenisPerhitunganBunga: "Jadwal Tetap",
    metodePerhitunganBunga: "Bunga Efektif",
    frekuensiBunga: "Bulanan",
    periode: "1",
    tanggalTagihanKe1: "10-02-2026",

    penaltyVisible: true,
    penaltyDraft: {
      rateMode: "rp",
      rateValue: "25.000",
      base: "Pokok",
      lateDays: "5",
    },
    penaltyRecurring: false,
  },
};

const DETAIL_RETURN_KEY = "dyad.loanAccountEdit.returnToDetailUrl";

export default function LoanAccountEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ accountNo: string }>();
  const accountNo = params.accountNo ?? "";

  const st = (location.state ?? null) as
    | { fromLoanAccountDetail?: boolean; selectedAccountNo?: string }
    | null;

  const fromDetail = !!st?.fromLoanAccountDetail;
  const selectedFromState = st?.selectedAccountNo;

  const prefill = seedByAccountNo[accountNo] ?? null;

  const [tab, setTab] = React.useState<TabId>("general");

  const [noRekening, setNoRekening] = React.useState(prefill?.noRekening ?? "");
  const [idNasabah, setIdNasabah] = React.useState(prefill?.idNasabah ?? "");

  const [nik, setNik] = React.useState(prefill?.nik ?? "");
  const [ktpVerified, setKtpVerified] = React.useState(true);

  const [nama, setNama] = React.useState(prefill?.nama ?? "");
  const [alamat, setAlamat] = React.useState(prefill?.alamat ?? "");
  const [unitAnggota, setUnitAnggota] = React.useState(prefill?.unitAnggota ?? "-");

  const [kolektor, setKolektor] = React.useState(prefill?.kolektor ?? "Pilih Kolektor");
  const [tanggal, setTanggal] = React.useState(prefill?.tanggalDaftar ?? getTodayDmy());

  const [produkPinjaman, setProdukPinjaman] = React.useState<
    LoanProductOption | "Pilih Pinjaman"
  >(prefill?.produkPinjaman ?? "Pinjaman Billing");

  const [sektorPinjaman, setSektorPinjaman] = React.useState("Pilih Sektor Pinjaman");
  const [tujuanPeminjaman, setTujuanPeminjaman] = React.useState("Pilih Tujuan Peminjaman");

  const [bungaPerTahun, setBungaPerTahun] = React.useState(prefill?.bungaPerTahun ?? "");
  const [metodeBunga, setMetodeBunga] = React.useState(prefill?.metodeBunga ?? "Flat");

  const [besarPinjaman, setBesarPinjaman] = React.useState(prefill?.besarPinjaman ?? "0,00");
  const [jangkaWaktu, setJangkaWaktu] = React.useState(prefill?.jangkaWaktu ?? "0,00");

  const showJadwalTab = produkPinjaman === "Pinjaman Billing";

  React.useEffect(() => {
    if (!showJadwalTab && tab === "jadwal") setTab("general");
  }, [showJadwalTab, tab]);

  // Simpan URL tujuan "detail" saat edit dibuka dari detail
  React.useEffect(() => {
    if (!fromDetail) return;
    const selected = selectedFromState ?? accountNo;
    const returnUrl = `/loans/accounts?detail=${encodeURIComponent(selected)}`;
    sessionStorage.setItem(DETAIL_RETURN_KEY, returnUrl);
  }, [accountNo, fromDetail, selectedFromState]);

  function navigateToDetail() {
    const selected = selectedFromState ?? accountNo;

    // Cara yang sudah dipakai di RekeningPinjaman: state.selectedAccountNo
    navigate("/loans/accounts", {
      replace: true,
      state: { selectedAccountNo: selected },
    });
  }

  // Back browser (POP) -> selalu arahkan ke detail
  React.useEffect(() => {
    if (!fromDetail) return;

    const onPop = () => {
      navigateToDetail();
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDetail, accountNo, selectedFromState]);

  // --- Jadwal tab state (prefilled) ---
  const [jenisPerhitunganBunga, setJenisPerhitunganBunga] = React.useState<string>(
    prefill?.jenisPerhitunganBunga ?? "Jadwal Tetap",
  );
  const [metodePerhitunganBunga, setMetodePerhitunganBunga] = React.useState<string>(
    prefill?.metodePerhitunganBunga ?? "Bunga Efektif",
  );
  const [frekuensiBunga, setFrekuensiBunga] = React.useState<string>(
    prefill?.frekuensiBunga ?? "Bulanan",
  );
  const [periode, setPeriode] = React.useState<string>(prefill?.periode ?? "");
  const [tanggalTagihanKe1, setTanggalTagihanKe1] = React.useState<string>(
    prefill?.tanggalTagihanKe1 ?? getTodayDmy(),
  );

  // --- Denda (Jadwal Denda) ---
  const [penaltyVisible, setPenaltyVisible] = React.useState<boolean>(
    prefill?.penaltyVisible ?? true,
  );
  const [penaltyDraft, setPenaltyDraft] = React.useState<PenaltyScheduleDraft>(
    prefill?.penaltyDraft ?? {
      rateMode: "percent",
      rateValue: "0%",
      base: "Pokok",
      lateDays: "0",
    },
  );

  const [penaltyRecurring, setPenaltyRecurring] = React.useState<boolean>(
    prefill?.penaltyRecurring ?? false,
  );

  const penaltyIsPercent = penaltyDraft.rateMode === "percent";

  React.useEffect(() => {
    if (!showJadwalTab) setPenaltyVisible(false);
  }, [showJadwalTab]);

  function save() {
    if (!noRekening.trim()) return toast("No. Rekening wajib diisi");
    if (!idNasabah.trim()) return toast("ID Nasabah wajib diisi");
    if (!nik.trim()) return toast("NIK wajib diisi");
    if (kolektor === "Pilih Kolektor") return toast("Kolektor wajib dipilih");
    if (produkPinjaman === "Pilih Pinjaman")
      return toast("Produk Pinjaman wajib dipilih");

    toast.success("Perubahan tersimpan (prototype)", {
      description: `Rekening: ${noRekening}`,
    });
    navigateToDetail();
  }

  function verifyKtp() {
    setKtpVerified(true);
    toast.success("KTP terverifikasi (prototype)", {
      description: "Status verifikasi hanya disimpan di UI.",
    });
  }

  const tabs = [
    { id: "general" as const, label: "General Information" },
    { id: "agunan" as const, label: "Agunan" },
    { id: "penanggung" as const, label: "Penanggung Jawab" },
    { id: "upload" as const, label: "Upload File" },
    ...(showJadwalTab ? [{ id: "jadwal" as const, label: "Pengaturan Jadwal" }] : []),
  ];

  const kolektorIsPlaceholder = isPlaceholderValue(kolektor);
  const sektorIsPlaceholder = isPlaceholderValue(sektorPinjaman);
  const tujuanIsPlaceholder = isPlaceholderValue(tujuanPeminjaman);
  const metodeBungaIsPlaceholder = isPlaceholderValue(metodeBunga);

  const moneyLikeText = (v: string) =>
    isDefaultMoney(v) ? "text-[#64748B]" : "text-slate-900";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Rekening Pinjaman
              </h1>
              <div className="text-base font-semibold text-slate-500">Ubah</div>
            </div>
          </div>

          {!prefill ? (
            <div className="rounded-[5px] bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-200">
              Data rekening untuk <span className="font-semibold">{accountNo}</span>{" "}
              belum ada di seed prototype, jadi form tampil kosong.
            </div>
          ) : null}
        </div>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((t) => (
              <TabPill
                key={t.id}
                label={t.label}
                active={tab === t.id}
                onClick={() => setTab(t.id)}
              />
            ))}
          </div>

          <Card className="mt-6 w-full rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
            {tab === "general" ? (
              <div className={cn("grid", UI.gapY)}>
                <div className={cn("grid", UI.gapY)}>
                  <FieldRowInline label="No Rekening" required>
                    <div className="flex items-center">
                      <Input
                        value={noRekening}
                        onChange={(e) => setNoRekening(e.target.value)}
                        className={cn(
                          UI.input,
                          "rounded-l-[5px] rounded-r-none bg-slate-200/70 text-slate-800",
                        )}
                      />
                      <ActionIconButton
                        label="Generate ulang"
                        onClick={() => toast("Generate (prototype)")}
                        icon={<RotateCcw className="h-4.5 w-4.5" />}
                      />
                    </div>
                  </FieldRowInline>

                  <FieldRowInline
                    label="ID Nasabah"
                    required
                    hint={
                      <Link to="/anggota/transaksi" className="text-blue-600 hover:underline">
                        Lihat Rekening Nasabah
                      </Link>
                    }
                  >
                    <div className="flex items-center">
                      <Input
                        value={idNasabah}
                        onChange={(e) => setIdNasabah(e.target.value)}
                        className={cn(UI.input, "rounded-l-[5px] rounded-r-none")}
                      />
                      <ActionIconButton
                        label="Cari nasabah"
                        onClick={() =>
                          toast("Cari Nasabah (prototype)", {
                            description:
                              "Dialog pencarian nasabah belum dihubungkan di halaman ini.",
                          })
                        }
                        icon={<Search className="h-4.5 w-4.5" />}
                      />
                    </div>
                  </FieldRowInline>

                  <FieldRowInline label="NIK" required>
                    <div className="grid gap-2">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Input
                          value={nik}
                          onChange={(e) => {
                            setNik(e.target.value);
                            setKtpVerified(false);
                          }}
                          className={cn(UI.input, "w-full")}
                        />
                        <button
                          type="button"
                          onClick={verifyKtp}
                          className={cn(
                            UI.btn,
                            "shrink-0 min-w-fit whitespace-nowrap",
                            "inline-flex items-center justify-center gap-2 px-3",
                            "bg-violet-600 text-white hover:bg-violet-700",
                          )}
                        >
                          <ShieldCheck className="h-4 w-4" />
                          Verifikasi KTP
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[12px]">
                            ✦
                          </span>
                        </button>
                      </div>

                      {!ktpVerified ? (
                        <div className="flex items-center gap-2 text-sm font-semibold text-rose-600">
                          <XCircle className="h-4 w-4" />
                          Data KTP Belum Terverifikasi
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                          <CheckSquare className="h-4 w-4" />
                          Data KTP Terverifikasi
                        </div>
                      )}
                    </div>
                  </FieldRowInline>

                  <FieldRowInline label="Nama" required>
                    <Input
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className={cn(UI.input, "bg-slate-200/70 text-slate-800")}
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Alamat" required>
                    <Input
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      className={cn(UI.input, "bg-slate-200/70 text-slate-800")}
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Unit Anggota">
                    <Input
                      value={unitAnggota}
                      onChange={(e) => setUnitAnggota(e.target.value)}
                      className={cn(UI.input, "bg-slate-200/70 text-slate-700")}
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Kolektor" required>
                    <Select value={kolektor} onValueChange={setKolektor}>
                      <SelectTrigger
                        className={cn(
                          UI.selectTrigger,
                          kolektorIsPlaceholder ? "text-[#64748B]" : "text-slate-900",
                        )}
                      >
                        <SelectValue placeholder="Pilih Kolektor" />
                      </SelectTrigger>
                      <SelectContent className={cn(UI.radius, "border-slate-200")}>
                        <SelectItem value="Pilih Kolektor">Pilih Kolektor</SelectItem>
                        <SelectItem value="Gina Farida M.M.">Gina Farida M.M.</SelectItem>
                        <SelectItem value="Kolektor A">Kolektor A</SelectItem>
                        <SelectItem value="Kolektor B">Kolektor B</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRowInline>

                  <FieldRowInline label="Tanggal Daftar" required>
                    <DatePickerDmyField
                      value={tanggal}
                      onChange={setTanggal}
                      inputClassName={UI.input}
                      popoverAlign="end"
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Produk Pinjaman" required>
                    <LoanProductCombobox
                      value={produkPinjaman}
                      onChange={(v) => {
                        setProdukPinjaman(v);
                        if (v === "Pinjaman Billing") {
                          toast.success("Pinjaman Billing dipilih", {
                            description: "Tab Pengaturan Jadwal tersedia.",
                          });
                        } else {
                          toast("Produk dipilih", { description: v });
                        }
                      }}
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Sektor Pinjaman" required>
                    <Select value={sektorPinjaman} onValueChange={setSektorPinjaman}>
                      <SelectTrigger
                        className={cn(
                          UI.selectTrigger,
                          sektorIsPlaceholder ? "text-[#64748B]" : "text-slate-900",
                        )}
                      >
                        <SelectValue placeholder="Pilih Sektor Pinjaman" />
                      </SelectTrigger>
                      <SelectContent className={cn(UI.radius, "border-slate-200")}>
                        <SelectItem value="Pilih Sektor Pinjaman">
                          Pilih Sektor Pinjaman
                        </SelectItem>
                        <SelectItem value="Perdagangan">Perdagangan</SelectItem>
                        <SelectItem value="Pertanian">Pertanian</SelectItem>
                        <SelectItem value="Jasa">Jasa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRowInline>

                  <FieldRowInline label="Tujuan Peminjaman" required>
                    <Select value={tujuanPeminjaman} onValueChange={setTujuanPeminjaman}>
                      <SelectTrigger
                        className={cn(
                          UI.selectTrigger,
                          tujuanIsPlaceholder ? "text-[#64748B]" : "text-slate-900",
                        )}
                      >
                        <SelectValue placeholder="Pilih Tujuan Peminjaman" />
                      </SelectTrigger>
                      <SelectContent className={cn(UI.radius, "border-slate-200")}>
                        <SelectItem value="Pilih Tujuan Peminjaman">
                          Pilih Tujuan Peminjaman
                        </SelectItem>
                        <SelectItem value="Modal Usaha">Modal Usaha</SelectItem>
                        <SelectItem value="Konsumtif">Konsumtif</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRowInline>

                  <FieldRowInline label="Bunga Pertahun (%)" required>
                    <Input
                      value={bungaPerTahun}
                      onChange={(e) => setBungaPerTahun(e.target.value)}
                      className={UI.input}
                      placeholder="0,00"
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Metode Bunga Pinjaman" required>
                    <Select value={metodeBunga} onValueChange={setMetodeBunga}>
                      <SelectTrigger
                        className={cn(
                          UI.selectTrigger,
                          metodeBungaIsPlaceholder ? "text-[#64748B]" : "text-slate-900",
                        )}
                      >
                        <SelectValue placeholder="Pilih Metode Bunga Pinjaman" />
                      </SelectTrigger>
                      <SelectContent className={cn(UI.radius, "border-slate-200")}>
                        <SelectItem value="Pilih Metode Bunga Pinjaman">
                          Pilih Metode Bunga Pinjaman
                        </SelectItem>
                        <SelectItem value="Anuitas">Anuitas</SelectItem>
                        <SelectItem value="Flat">Flat</SelectItem>
                        <SelectItem value="Menurun">Menurun</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRowInline>

                  <FieldRowInline label="Besar Pinjaman" required>
                    <Input
                      value={besarPinjaman}
                      onChange={(e) => setBesarPinjaman(e.target.value)}
                      className={cn(UI.input, moneyLikeText(besarPinjaman))}
                      placeholder="0,00"
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Jangka Waktu" required>
                    <Input
                      value={jangkaWaktu}
                      onChange={(e) => setJangkaWaktu(e.target.value)}
                      className={cn(UI.input, moneyLikeText(jangkaWaktu))}
                      placeholder="0,00"
                    />
                  </FieldRowInline>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <LoanFormActionButtons
                    onCancel={navigateToDetail}
                    onSave={save}
                    cancelLabel="Batalkan"
                    saveLabel="Simpan"
                    className="mt-0"
                  />
                </div>
              </div>
            ) : tab === "jadwal" ? (
              <div className="no-purple-select grid gap-10">
                <div className="space-y-5">
                  <div className={UI.sectionTitle}>Jadwal Perhitungan Bunga</div>

                  <div className={cn("grid w-full max-w-none", UI.gapY)}>
                    <FieldRowInline label="Jenis Perhitungan Bunga" required>
                      <Select
                        value={jenisPerhitunganBunga}
                        onValueChange={setJenisPerhitunganBunga}
                      >
                        <SelectTrigger className={cn("w-full px-3", UI.selectTrigger)}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Jadwal Tetap">Jadwal Tetap</SelectItem>
                          <SelectItem value="Jadwal Fleksibel & Tagihan Berkala">
                            Jadwal Fleksibel & Tagihan Berkala
                          </SelectItem>
                          <SelectItem value="Tagihan Dihitung dari Sisa Saldo Pokok">
                            Tagihan Dihitung dari Sisa Saldo Pokok
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldRowInline>

                    <FieldRowInline label="Metode Perhitungan Bunga" required>
                      <Select
                        value={metodePerhitunganBunga}
                        onValueChange={setMetodePerhitunganBunga}
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full px-3 bg-slate-200/70 text-slate-800",
                            UI.selectTrigger,
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Bunga Efektif">Bunga Efektif</SelectItem>
                          <SelectItem value="Bunga Flat">Bunga Flat</SelectItem>
                          <SelectItem value="Menurun">Menurun</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldRowInline>

                    <FieldRowInline label="Frekuensi Bunga" required>
                      <Select value={frekuensiBunga} onValueChange={setFrekuensiBunga}>
                        <SelectTrigger
                          className={cn(
                            "w-full px-3 bg-slate-200/70 text-slate-800",
                            UI.selectTrigger,
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Bulanan">Bulanan</SelectItem>
                          <SelectItem value="Mingguan">Mingguan</SelectItem>
                          <SelectItem value="Harian">Harian</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldRowInline>

                    <FieldRowInline label="Periode" required>
                      <Input
                        value={periode}
                        onChange={(e) => setPeriode(e.target.value)}
                        className={cn(UI.input, "bg-slate-200/70 text-slate-800")}
                        placeholder=""
                      />
                    </FieldRowInline>

                    <FieldRowInline label="Tanggal Tagihan Ke-1" required>
                      <DatePickerDmyField
                        value={tanggalTagihanKe1}
                        onChange={setTanggalTagihanKe1}
                        inputClassName={UI.input}
                        popoverAlign="end"
                      />
                    </FieldRowInline>
                  </div>
                </div>

                <Separator className="bg-slate-200/70" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className={UI.sectionTitle}>Jadwal Denda</div>

                    <button
                      type="button"
                      className={cn(
                        UI.btn,
                        "inline-flex items-center justify-center px-4",
                        "bg-blue-600 text-white hover:bg-blue-700",
                      )}
                      onClick={() => {
                        setPenaltyVisible(true);
                        toast("Tambah Denda (prototype)", {
                          description: "Form denda ditampilkan.",
                        });
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah
                    </button>
                  </div>

                  {penaltyVisible ? (
                    <div className="[&_.rounded-xl]:rounded-[5px] [&_.rounded-2xl]:rounded-[5px] [&_.rounded-3xl]:rounded-[5px] [&_.h-11]:h-[30px] [&_.h-10]:h-[30px] [&_.h-9]:h-[30px] [&_.mt-4]:mt-[15px]">
                      <PenaltyScheduleForm
                        value={penaltyDraft}
                        onChange={(next) => {
                          setPenaltyDraft(next);
                          if (next.rateMode !== "percent") setPenaltyRecurring(false);
                        }}
                        onDelete={() => {
                          setPenaltyVisible(false);
                          toast("Denda dihapus (prototype)", {
                            description: "Form denda ditutup.",
                          });
                        }}
                      />

                      <div className="mt-[15px] grid gap-[15px]">
                        {penaltyIsPercent ? (
                          <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                            <div className="flex min-w-0 items-start gap-2">
                              <div className="min-w-0 text-[14px] font-medium leading-tight text-slate-900">
                                <div>Proses Denda Berulang</div>
                                <div className="text-slate-700">(Recurring)</div>
                              </div>

                              <span
                                className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white ring-1 ring-[#2563eb]/25"
                                aria-hidden="true"
                                title={RECURRING_TT}
                              >
                                <HelpCircle className="h-4 w-4" />
                              </span>
                            </div>

                            <div className="flex items-center justify-start md:-ml-1">
                              <Switch
                                checked={penaltyRecurring}
                                onCheckedChange={setPenaltyRecurring}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div className="sr-only">
                        {penaltyDraft.base}
                        {penaltyDraft.lateDays}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <LoanFormActionButtons
                    onCancel={navigateToDetail}
                    onSave={() =>
                      toast.success("Jadwal tersimpan (prototype)", {
                        description: "Pengaturan jadwal belum disimpan permanen.",
                      })
                    }
                    cancelLabel="Batalkan"
                    saveLabel="Simpan"
                    className="mt-0"
                  />
                </div>

                <div className="sr-only">
                  <Separator />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-700 ring-1 ring-slate-200">
                Tab <span className="font-semibold">{tab}</span> masih prototype
                (konten belum dibuat).
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}