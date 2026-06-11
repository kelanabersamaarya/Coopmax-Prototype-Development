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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  RotateCcw,
  Search,
  CheckSquare,
  ShieldCheck,
  XCircle,
  Plus,
  HelpCircle,
} from "lucide-react";
import PenaltyScheduleForm, { type PenaltyScheduleDraft } from "@/components/loans/PenaltyScheduleForm";
import LoanFormActionButtons from "@/components/loans/LoanFormActionButtons";
import { Switch } from "@/components/ui/switch";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import { UI, RECURRING_TT } from "@/components/loans/accounts/edit/loan-account-edit-options";
import { seedByAccountNo } from "@/components/loans/accounts/edit/loan-account-edit-seed";
import { getTodayDmy, isDefaultMoney, isPlaceholderValue } from "@/components/loans/accounts/edit/loan-account-edit-utils";
import type { LoanProductOption, TabId } from "@/components/loans/accounts/edit/loan-account-edit-types";
import LoanAccountEditActionIconButton from "@/components/loans/accounts/edit/LoanAccountEditActionIconButton";
import LoanAccountEditFieldRow from "@/components/loans/accounts/edit/LoanAccountEditFieldRow";
import LoanAccountEditTabs from "@/components/loans/accounts/edit/LoanAccountEditTabs";
import LoanAccountProductCombobox from "@/components/loans/accounts/edit/LoanAccountProductCombobox";

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
  const [unitAnggota, setUnitAnggota] = React.useState(
    prefill?.unitAnggota ?? "-",
  );

  const [kolektor, setKolektor] = React.useState(
    prefill?.kolektor ?? "Pilih Kolektor",
  );
  const [tanggal, setTanggal] = React.useState(
    prefill?.tanggalDaftar ?? getTodayDmy(),
  );

  const [produkPinjaman, setProdukPinjaman] = React.useState<
    LoanProductOption | "Pilih Pinjaman"
  >(prefill?.produkPinjaman ?? "Pinjaman Billing");

  const [sektorPinjaman, setSektorPinjaman] = React.useState(
    "Pilih Sektor Pinjaman",
  );
  const [tujuanPeminjaman, setTujuanPeminjaman] = React.useState(
    "Pilih Tujuan Peminjaman",
  );

  const [bungaPerTahun, setBungaPerTahun] = React.useState(
    prefill?.bungaPerTahun ?? "",
  );
  const [metodeBunga, setMetodeBunga] = React.useState(
    prefill?.metodeBunga ?? "Flat",
  );

  const [besarPinjaman, setBesarPinjaman] = React.useState(
    prefill?.besarPinjaman ?? "0,00",
  );
  const [jangkaWaktu, setJangkaWaktu] = React.useState(
    prefill?.jangkaWaktu ?? "0,00",
  );

  const showJadwalTab = produkPinjaman === "Pinjaman Billing";

  React.useEffect(() => {
    if (!showJadwalTab && tab === "jadwal") setTab("general");
  }, [showJadwalTab, tab]);

  function navigateToDetail(replace = true) {
    const selected = selectedFromState ?? accountNo;
    navigate("/loans/accounts", {
      replace,
      state: { selectedAccountNo: selected },
    });
  }

  React.useEffect(() => {
    if (!fromDetail) return;

    navigate(".", {
      replace: false,
      state: { ...(location.state ?? {}), __lockBackToDetail: true },
    });

    const onPop = () => {
      navigateToDetail(true);
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDetail]);

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
    navigateToDetail(true);
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
          <LoanAccountEditTabs tabs={tabs} activeTab={tab} onTabChange={setTab} />

          <Card className="mt-6 w-full rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
            {tab === "general" ? (
              <div className={cn("grid", UI.gapY)}>
                <div className={cn("grid", UI.gapY)}>
                  <LoanAccountEditFieldRow label="No Rekening" required>
                    <div className="flex items-center">
                      <Input
                        value={noRekening}
                        onChange={(e) => setNoRekening(e.target.value)}
                        className={cn(
                          UI.input,
                          "rounded-l-[5px] rounded-r-none bg-slate-200/70 text-slate-800",
                        )}
                      />
                      <LoanAccountEditActionIconButton
                        label="Generate ulang"
                        onClick={() => toast("Generate (prototype)")}
                        icon={<RotateCcw className="h-4.5 w-4.5" />}
                      />
                    </div>
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow
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
                      <LoanAccountEditActionIconButton
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
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="NIK" required>
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
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Nama" required>
                    <Input
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className={cn(UI.input, "bg-slate-200/70 text-slate-800")}
                    />
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Alamat" required>
                    <Input
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      className={cn(UI.input, "bg-slate-200/70 text-slate-800")}
                    />
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Unit Anggota">
                    <Input
                      value={unitAnggota}
                      onChange={(e) => setUnitAnggota(e.target.value)}
                      className={cn(UI.input, "bg-slate-200/70 text-slate-700")}
                    />
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Kolektor" required>
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
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Tanggal Daftar" required>
                    <DatePickerDmyField
                      value={tanggal}
                      onChange={setTanggal}
                      inputClassName={UI.input}
                      popoverAlign="end"
                    />
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Produk Pinjaman" required>
                    <LoanAccountProductCombobox
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
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Sektor Pinjaman" required>
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
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Tujuan Peminjaman" required>
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
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Bunga Pertahun (%)" required>
                    <Input
                      value={bungaPerTahun}
                      onChange={(e) => setBungaPerTahun(e.target.value)}
                      className={UI.input}
                      placeholder="0,00"
                    />
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Metode Bunga Pinjaman" required>
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
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Besar Pinjaman" required>
                    <Input
                      value={besarPinjaman}
                      onChange={(e) => setBesarPinjaman(e.target.value)}
                      className={cn(UI.input, moneyLikeText(besarPinjaman))}
                      placeholder="0,00"
                    />
                  </LoanAccountEditFieldRow>

                  <LoanAccountEditFieldRow label="Jangka Waktu" required>
                    <Input
                      value={jangkaWaktu}
                      onChange={(e) => setJangkaWaktu(e.target.value)}
                      className={cn(UI.input, moneyLikeText(jangkaWaktu))}
                      placeholder="0,00"
                    />
                  </LoanAccountEditFieldRow>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <LoanFormActionButtons
                    onCancel={() => navigateToDetail(false)}
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
                    <LoanAccountEditFieldRow label="Jenis Perhitungan Bunga" required>
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
                    </LoanAccountEditFieldRow>

                    <LoanAccountEditFieldRow label="Metode Perhitungan Bunga" required>
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
                    </LoanAccountEditFieldRow>

                    <LoanAccountEditFieldRow label="Frekuensi Bunga" required>
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
                    </LoanAccountEditFieldRow>

                    <LoanAccountEditFieldRow label="Periode" required>
                      <Input
                        value={periode}
                        onChange={(e) => setPeriode(e.target.value)}
                        className={cn(UI.input, "bg-slate-200/70 text-slate-800")}
                        placeholder=""
                      />
                    </LoanAccountEditFieldRow>

                    <LoanAccountEditFieldRow label="Tanggal Tagihan Ke-1" required>
                      <DatePickerDmyField
                        value={tanggalTagihanKe1}
                        onChange={setTanggalTagihanKe1}
                        inputClassName={UI.input}
                        popoverAlign="end"
                      />
                    </LoanAccountEditFieldRow>
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
                        onChange={setPenaltyDraft}
                        onDelete={() => {
                          setPenaltyVisible(false);
                          toast("Denda dihapus (prototype)", {
                            description: "Form denda ditutup.",
                          });
                        }}
                      />

                      <div className="mt-[15px] grid gap-[15px]">
                        {/* ✅ tampil untuk % maupun Rp */}
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
                      </div>

                      <div className="sr-only">
                        {penaltyIsPercent ? "percent" : "rp"}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <LoanFormActionButtons
                    onCancel={() => navigateToDetail(false)}
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