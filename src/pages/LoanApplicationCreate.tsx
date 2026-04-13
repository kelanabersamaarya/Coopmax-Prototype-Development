import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { RotateCcw, Search, CheckSquare } from "lucide-react";

type TabId = "general" | "agunan" | "penanggung" | "upload";

function FieldRow({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[220px_1fr] md:items-start">
      <div className="pt-2">
        <Label className="text-sm font-semibold text-slate-900">
          {label}
          {required ? <span className="text-rose-600">*</span> : null}
        </Label>
        {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function TabPill({
  value,
  label,
  active,
  onClick,
}: {
  value: TabId;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-full px-5 text-sm font-semibold transition",
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
      className="inline-flex h-10 w-11 items-center justify-center rounded-xl bg-slate-600 text-white ring-1 ring-slate-600/20 transition hover:bg-slate-700"
    >
      {icon}
    </button>
  );
}

export default function LoanApplicationCreate() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState<TabId>("general");

  const today = React.useMemo(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = String(d.getFullYear());
    return `${dd}-${mm}-${yyyy}`;
  }, []);

  const [noRekening, setNoRekening] = React.useState("260144");
  const [idNasabah, setIdNasabah] = React.useState("");
  const [unitAnggota] = React.useState("Tidak Terdapat Data Unit Anggota");

  const [kolektor, setKolektor] = React.useState("Pilih Kolektor");
  const [tanggal, setTanggal] = React.useState(today);

  const [produkPinjaman, setProdukPinjaman] = React.useState("Pilih Pinjaman");
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

  const [besarPinjaman, setBesarPinjaman] = React.useState("0");
  const [jangkaWaktu, setJangkaWaktu] = React.useState("");

  function save() {
    if (!noRekening.trim()) {
      toast("No. Rekening wajib diisi");
      return;
    }
    if (!idNasabah.trim()) {
      toast("ID Nasabah wajib diisi");
      return;
    }
    if (kolektor === "Pilih Kolektor") {
      toast("Kolektor wajib dipilih");
      return;
    }
    toast.success("Tersimpan (prototype)", {
      description: "Data pengajuan pinjaman belum disimpan ke database.",
    });
    navigate("/loans/applications");
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Pengajuan Pinjaman
            </h1>
            <div className="text-base font-semibold text-slate-500">Tambah</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <TabPill
              value="general"
              label="General Information"
              active={tab === "general"}
              onClick={() => setTab("general")}
            />
            <TabPill
              value="agunan"
              label="Agunan"
              active={tab === "agunan"}
              onClick={() => setTab("agunan")}
            />
            <TabPill
              value="penanggung"
              label="Penanggung Jawab"
              active={tab === "penanggung"}
              onClick={() => setTab("penanggung")}
            />
            <TabPill
              value="upload"
              label="Upload File"
              active={tab === "upload"}
              onClick={() => setTab("upload")}
            />
          </div>

          <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
            <div className="hidden">
              <Tabs value={tab}>
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="agunan">Agunan</TabsTrigger>
                  <TabsTrigger value="penanggung">Penanggung</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="general" />
                <TabsContent value="agunan" />
                <TabsContent value="penanggung" />
                <TabsContent value="upload" />
              </Tabs>
            </div>

            {tab === "general" ? (
              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2 md:items-start">
                  <div className="space-y-5">
                    <FieldRow label="No. Rekening" required>
                      <div className="flex items-center gap-2">
                        <Input
                          value={noRekening}
                          onChange={(e) => setNoRekening(e.target.value)}
                          className="h-10 rounded-xl bg-slate-200/70 text-slate-800"
                        />
                        <ActionIconButton
                          label="Generate ulang"
                          onClick={() => toast("Generate (prototype)")}
                          icon={<RotateCcw className="h-4.5 w-4.5" />}
                        />
                      </div>
                    </FieldRow>

                    <FieldRow
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
                      <div className="flex items-center gap-2">
                        <Input
                          value={idNasabah}
                          onChange={(e) => setIdNasabah(e.target.value)}
                          placeholder="Cari Nasabah"
                          className="h-10 rounded-xl"
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
                    </FieldRow>

                    <FieldRow label="Unit Anggota">
                      <Input
                        value={unitAnggota}
                        readOnly
                        className="h-10 rounded-xl bg-slate-200/70 text-slate-700"
                      />
                    </FieldRow>
                  </div>

                  <div className="space-y-5">
                    <FieldRow label="Kolektor" required>
                      <Select value={kolektor} onValueChange={setKolektor}>
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Pilih Kolektor">
                            Pilih Kolektor
                          </SelectItem>
                          <SelectItem value="Kolektor A">Kolektor A</SelectItem>
                          <SelectItem value="Kolektor B">Kolektor B</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldRow>

                    <FieldRow label="Tanggal" required>
                      <Input
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldRow>

                    <FieldRow label="Produk Pinjaman" required>
                      <Select
                        value={produkPinjaman}
                        onValueChange={setProdukPinjaman}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Pilih Pinjaman">
                            Pilih Pinjaman
                          </SelectItem>
                          <SelectItem value="Pinjaman Billing">
                            Pinjaman Billing
                          </SelectItem>
                          <SelectItem value="Pinjaman Koperasi">
                            Pinjaman Koperasi
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldRow>

                    <FieldRow label="Sektor Pinjaman" required>
                      <Select
                        value={sektorPinjaman}
                        onValueChange={setSektorPinjaman}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Pilih Sektor Pinjaman">
                            Pilih Sektor Pinjaman
                          </SelectItem>
                          <SelectItem value="Perdagangan">Perdagangan</SelectItem>
                          <SelectItem value="Pertanian">Pertanian</SelectItem>
                          <SelectItem value="Jasa">Jasa</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldRow>

                    <FieldRow label="Tujuan Peminjaman">
                      <Select
                        value={tujuanPeminjaman}
                        onValueChange={setTujuanPeminjaman}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Pilih Tujuan Peminjaman">
                            Pilih Tujuan Peminjaman
                          </SelectItem>
                          <SelectItem value="Modal Usaha">Modal Usaha</SelectItem>
                          <SelectItem value="Konsumtif">Konsumtif</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldRow>

                    <FieldRow label="Bunga Per Tahun (%)" required>
                      <Input
                        value={bungaPerTahun}
                        onChange={(e) => setBungaPerTahun(e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldRow>

                    <FieldRow label="Metode Bunga Pinjaman" required>
                      <Select value={metodeBunga} onValueChange={setMetodeBunga}>
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Pilih Metode Bunga Pinjaman">
                            Pilih Metode Bunga Pinjaman
                          </SelectItem>
                          <SelectItem value="Anuitas">Anuitas</SelectItem>
                          <SelectItem value="Flat">Flat</SelectItem>
                          <SelectItem value="Menurun">Menurun</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldRow>

                    <FieldRow label="Besar Pinjaman" required>
                      <Input
                        value={besarPinjaman}
                        onChange={(e) => setBesarPinjaman(e.target.value)}
                        inputMode="numeric"
                        className="h-10 rounded-xl"
                      />
                    </FieldRow>

                    <FieldRow label="Jangka Waktu" required>
                      <Input
                        value={jangkaWaktu}
                        onChange={(e) => setJangkaWaktu(e.target.value)}
                        className="h-10 rounded-xl"
                      />
                    </FieldRow>
                  </div>
                </div>

                <Separator className="bg-slate-200/70" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    variant="secondary"
                    className="h-11 rounded-xl bg-slate-600 px-5 text-white hover:bg-slate-700"
                    onClick={() => navigate("/loans/applications")}
                  >
                    ✕ Batalkan
                  </Button>
                  <Button
                    className="h-11 rounded-xl bg-lime-600 px-5 text-white hover:bg-lime-700"
                    onClick={save}
                  >
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Simpan
                  </Button>
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