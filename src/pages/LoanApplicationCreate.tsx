import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  CalendarDays,
  Plus,
} from "lucide-react";
import PenaltyScheduleForm, {
  type PenaltyScheduleDraft,
} from "@/components/loans/PenaltyScheduleForm";

type TabId = "general" | "agunan" | "penanggung" | "upload" | "jadwal";

const UI = {
  radius: "rounded-[5px]",
  h: "h-[30px]",
  text: "text-[12.5px]",
  gapY: "gap-[15px]",
  input: "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
  selectTrigger: "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
  btn: "h-[30px] rounded-[5px] text-[12.5px]",
  sectionTitle: "text-[16px] font-semibold tracking-tight text-slate-900",
} as const;

const ACTION_BTN_SM =
  "h-9 rounded-xl px-4 text-[13px] font-semibold text-white transition";

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
            "flex w-full items-center justify-between border border-slate-200 bg-white px-3 text-left font-medium text-slate-900 shadow-sm transition hover:bg-slate-50",
            UI.h,
            UI.radius,
            UI.text,
          )}
        >
          <span className={cn(value === "Pilih Pinjaman" ? "text-slate-500" : "")}>
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

export default function LoanApplicationCreate() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState<TabId>("general");

  const [noRekening, setNoRekening] = React.useState("6459.00");
  const [idNasabah, setIdNasabah] = React.useState("Z261283");

  const [nik, setNik] = React.useState("1601095402960002");
  const [ktpVerified, setKtpVerified] = React.useState(false);

  const [nama, setNama] = React.useState("FERNA MARLENA");
  const [alamat, setAlamat] = React.useState(
    "Tidak Dusun IV Sumber Sari Blok N Batumarta XI",
  );
  const [unitAnggota, setUnitAnggota] = React.useState(
    "Tidak Terdapat Unit Anggota",
  );

  const [kolektor, setKolektor] = React.useState("Pilih Kolektor");
  const [tanggal, setTanggal] = React.useState("02-10-2025");

  const [produkPinjaman, setProdukPinjaman] = React.useState<
    LoanProductOption | "Pilih Pinjaman"
  >("Pilih Pinjaman");

  const [sektorPinjaman, setSektorPinjaman] = React.useState(
    "Pilih Sektor Pinjaman",
  );
  const [tujuanPeminjaman, setTujuanPeminjaman] = React.useState(
    "Pilih Tujuan Peminjaman",
  );

  const [bungaPerTahun, setBungaPerTahun] = React.useState("");
  const [metodeBunga, setMetodeBunga] = React.useState(
    "Pilih Metode Bunga Pinjaman",
  );

  const [besarPinjaman, setBesarPinjaman] = React.useState("0,00");
  const [jangkaWaktu, setJangkaWaktu] = React.useState("0,00");

  const showJadwalTab = produkPinjaman === "Pinjaman Billing";

  React.useEffect(() => {
    if (!showJadwalTab && tab === "jadwal") setTab("general");
  }, [showJadwalTab, tab]);

  // --- Jadwal tab state (prototype) ---
  const [jenisPerhitunganBunga, setJenisPerhitunganBunga] =
    React.useState<string>("Jadwal Tetap");
  const [metodePerhitunganBunga, setMetodePerhitunganBunga] =
    React.useState<string>("Bunga Efektif");
  const [frekuensiBunga, setFrekuensiBunga] = React.useState<string>("Bulanan");
  const [periode, setPeriode] = React.useState<string>("");
  const [tanggalTagihanKe1, setTanggalTagihanKe1] = React.useState<string>(
    getTodayDmy(),
  );

  // --- Denda: sesuai menu Produk Pinjaman ---
  const [penaltyVisible, setPenaltyVisible] = React.useState(false);
  const [penaltyDraft, setPenaltyDraft] = React.useState<PenaltyScheduleDraft>({
    rateMode: "percent",
    rateValue: "0",
    base: "Pokok",
    lateDays: "0",
  });

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

    toast.success("Tersimpan (prototype)", {
      description: "Data pengajuan pinjaman belum disimpan ke database.",
    });
    navigate("/loans/applications");
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
    ...(showJadwalTab
      ? [{ id: "jadwal" as const, label: "Pengaturan Jadwal" }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Pengajuan Pinjaman
          </h1>
          <div className="text-base font-semibold text-slate-500">Tambah</div>
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
                      <Link
                        to="/anggota/transaksi"
                        className="text-blue-600 hover:underline"
                      >
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
                        <Button
                          onClick={verifyKtp}
                          className={cn(
                            UI.btn,
                            "shrink-0 bg-violet-600 px-3 text-white hover:bg-violet-700",
                          )}
                        >
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Verifikasi KTP
                          <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[12px]">
                            ✦
                          </span>
                        </Button>
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
                      <SelectTrigger className={UI.selectTrigger}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={cn(UI.radius, "border-slate-200")}>
                        <SelectItem value="Pilih Kolektor">
                          Pilih Kolektor
                        </SelectItem>
                        <SelectItem value="Kolektor A">Kolektor A</SelectItem>
                        <SelectItem value="Kolektor B">Kolektor B</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRowInline>

                  <FieldRowInline label="Tanggal Daftar" required>
                    <Input
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                      className={UI.input}
                      placeholder={getTodayDmy()}
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Produk Pinjaman" required>
                    <LoanProductCombobox
                      value={produkPinjaman}
                      onChange={(v) => {
                        setProdukPinjaman(v);
                        if (v === "Pinjaman Billing") {
                          toast.success("Pinjaman Billing dipilih", {
                            description:
                              "Tab Pengaturan Jadwal sekarang tersedia.",
                          });
                        } else {
                          toast("Produk dipilih", { description: v });
                        }
                      }}
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Sektor Pinjaman" required>
                    <Select
                      value={sektorPinjaman}
                      onValueChange={setSektorPinjaman}
                    >
                      <SelectTrigger className={UI.selectTrigger}>
                        <SelectValue />
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
                    <Select
                      value={tujuanPeminjaman}
                      onValueChange={setTujuanPeminjaman}
                    >
                      <SelectTrigger className={UI.selectTrigger}>
                        <SelectValue />
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
                      <SelectTrigger className={UI.selectTrigger}>
                        <SelectValue />
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
                      className={UI.input}
                    />
                  </FieldRowInline>

                  <FieldRowInline label="Jangka Waktu" required>
                    <Input
                      value={jangkaWaktu}
                      onChange={(e) => setJangkaWaktu(e.target.value)}
                      className={UI.input}
                    />
                  </FieldRowInline>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    className={cn(ACTION_BTN_SM, "bg-blue-600 hover:bg-blue-700")}
                    onClick={() =>
                      toast("Simulasi (prototype)", {
                        description:
                          "Simulasi untuk General Information belum diimplementasikan.",
                      })
                    }
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Simulasi
                  </Button>

                  <Button
                    className={cn(ACTION_BTN_SM, "bg-slate-600 hover:bg-slate-700")}
                    onClick={() => navigate("/loans/applications")}
                  >
                    Batalkan
                  </Button>

                  <Button
                    className={cn(
                      ACTION_BTN_SM,
                      "bg-emerald-600 hover:bg-emerald-700",
                    )}
                    onClick={save}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            ) : tab === "jadwal" ? (
              <div className="grid gap-10">
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
                      <div className="relative w-full">
                        <Input
                          value={tanggalTagihanKe1}
                          onChange={(e) => setTanggalTagihanKe1(e.target.value)}
                          className={cn(UI.input, "pr-11")}
                        />
                        <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </FieldRowInline>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className={UI.sectionTitle}>Jadwal Denda</div>

                    <Button
                      className={cn(
                        UI.btn,
                        "bg-blue-600 px-4 text-white hover:bg-blue-700",
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
                    </Button>
                  </div>

                  {penaltyVisible ? (
                    <div className="[&_.rounded-xl]:rounded-[5px] [&_.rounded-2xl]:rounded-[5px] [&_.rounded-3xl]:rounded-[5px] [&_.h-11]:h-[30px] [&_.h-10]:h-[30px] [&_.h-9]:h-[30px] [&_.mt-4]:mt-[15px]">
                      <PenaltyScheduleForm
                        value={penaltyDraft}
                        onChange={setPenaltyDraft}
                        onDelete={() => {
                          setPenaltyVisible(false);
                          toast("Denda dihapus (prototype)", {
                            description: "Form denda ditutup.",
                          });
                        }}
                      />
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    className={cn(ACTION_BTN_SM, "bg-blue-600 hover:bg-blue-700")}
                    onClick={() =>
                      toast("Simulasi (prototype)", {
                        description:
                          "Simulasi jadwal belum diimplementasikan di prototype ini.",
                      })
                    }
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Simulasi
                  </Button>

                  <Button
                    className={cn(ACTION_BTN_SM, "bg-slate-600 hover:bg-slate-700")}
                    onClick={() => navigate("/loans/applications")}
                  >
                    Batalkan
                  </Button>

                  <Button
                    className={cn(
                      ACTION_BTN_SM,
                      "bg-emerald-600 hover:bg-emerald-700",
                    )}
                    onClick={() =>
                      toast.success("Jadwal tersimpan (prototype)", {
                        description: "Pengaturan jadwal belum disimpan permanen.",
                      })
                    }
                  >
                    Simpan
                  </Button>
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