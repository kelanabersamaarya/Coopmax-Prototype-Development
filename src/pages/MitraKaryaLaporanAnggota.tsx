import * as React from "react";
import {
  ChevronDown,
  Eye,
  FileSpreadsheet,
  Info,
  Printer,
  Search,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import KtpPhotoDialog from "@/components/mitra-karya/KtpPhotoDialog";
import "../styles/mitra-karya-member-report.css";

type Member = {
  id: string;
  name: string;
  phone: string;
  category: "Anggota" | "Calon Anggota";
  status: "Aktif" | "Nonaktif";
  product: string;
  region: string;
  tag: string;
  joined: string;
  address: string;
  simpananPokok: number;
  simpananWajib: number;
  simpananKhusus: number;
  simpananPenyertaan: number;
  ktpAvailable: boolean;
};

type KtpAvailabilityFilter = "Semua" | "Tersedia" | "Tidak Tersedia";

const members: Member[] = [
  { id: "A2300001", name: "Balian Uwais", phone: "028 8478 394", category: "Anggota", status: "Aktif", product: "Simpanan Anggota", region: "Surabaya", tag: "Prioritas", joined: "14-03-2023", address: "Surabaya", simpananPokok: 0, simpananWajib: 0, simpananKhusus: 0, simpananPenyertaan: 0, ktpAvailable: true },
  { id: "A2300002", name: "Jatmiko Wacana", phone: "028 4560 3652", category: "Anggota", status: "Aktif", product: "Simpanan Anggota", region: "Surabaya", tag: "Reguler", joined: "28-03-2023", address: "Jl Raya Sibang", simpananPokok: 0, simpananWajib: 0, simpananKhusus: 0, simpananPenyertaan: 0, ktpAvailable: false },
  { id: "A2300003", name: "Laksana Hidayanto", phone: "0478 5431 649", category: "Anggota", status: "Aktif", product: "Simpanan Berjangka", region: "Denpasar", tag: "Prioritas", joined: "20-04-2023", address: "Denpasar", simpananPokok: 1500000, simpananWajib: 50000, simpananKhusus: 0, simpananPenyertaan: 50000000, ktpAvailable: true },
  { id: "A2300004", name: "Zulaikha Mulyani", phone: "0837 6686 458", category: "Anggota", status: "Aktif", product: "Simpanan Anggota", region: "Gianyar", tag: "Reguler", joined: "21-04-2023", address: "Jln Wijaya Kusuma, No 11A", simpananPokok: 1500000, simpananWajib: 50000, simpananKhusus: 0, simpananPenyertaan: 0, ktpAvailable: false },
  { id: "A2300005", name: "Nasrullah Banafi Mustofa M.M", phone: "(+62) 800 773 744", category: "Anggota", status: "Aktif", product: "Simpanan Anggota", region: "Denpasar", tag: "Reguler", joined: "21-04-2023", address: "Jln Wijaya Kusuma, No 11A", simpananPokok: 1500000, simpananWajib: 50000, simpananKhusus: 0, simpananPenyertaan: 0, ktpAvailable: true },
  { id: "A2300006", name: "Ana Haryanti", phone: "(+62) 539 3053 739", category: "Anggota", status: "Aktif", product: "Simpanan Anggota", region: "Denpasar", tag: "Baru", joined: "21-04-2023", address: "Jln Raya Dalung Permai, No 2", simpananPokok: 1500000, simpananWajib: 50000, simpananKhusus: 0, simpananPenyertaan: 0, ktpAvailable: false },
];

const fieldClassName =
  "h-[31px] rounded-[5px] border-slate-300 bg-white text-[14px] font-normal text-slate-900 shadow-none placeholder:!text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0";

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[165px_minmax(0,1fr)] sm:items-center">
      <label className="text-[14px] font-normal text-[#002060]">{label}</label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function ClearButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-0 top-0 inline-flex h-[31px] w-9 items-center justify-center rounded-r-[5px] bg-[#77839A] text-white transition hover:bg-[#6b768c]"
      aria-label={label}
      title="Clear"
    >
      <X className="h-4 w-4" strokeWidth={3} />
    </button>
  );
}

function toDateValue(value: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  return match
    ? new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]))
    : null;
}

function parseAmount(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

function formatAmount(value: number) {
  return `${value.toLocaleString("id-ID")},00`;
}

function getTotalSavings(member: Member) {
  return (
    member.simpananPokok +
    member.simpananWajib +
    member.simpananKhusus +
    member.simpananPenyertaan
  );
}

function getReportTotals(rows: Member[]) {
  return rows.reduce(
    (totals, member) => ({
      simpananPokok: totals.simpananPokok + member.simpananPokok,
      simpananWajib: totals.simpananWajib + member.simpananWajib,
      simpananKhusus: totals.simpananKhusus + member.simpananKhusus,
      simpananPenyertaan:
        totals.simpananPenyertaan + member.simpananPenyertaan,
      totalSimpanan: totals.totalSimpanan + getTotalSavings(member),
    }),
    {
      simpananPokok: 0,
      simpananWajib: 0,
      simpananKhusus: 0,
      simpananPenyertaan: 0,
      totalSimpanan: 0,
    },
  );
}

function ReportInfoPanel() {
  return (
    <aside className="w-full rounded-[5px] border border-[#14a6d8] bg-white px-5 py-4 text-[#0097c2] shadow-sm">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0ea5c6] text-white">
          <Info className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-[13px] font-extrabold leading-snug text-[#0895bd]">
            Fitur Penyesuaian Laporan
          </h2>
          <p className="mt-2 text-[13px] font-normal leading-relaxed text-[#0097c2]">
            Anda dapat melakukan kustomisasi tampilan laporan (pengaturan kolom
            dan urutan data) pada laporan ini dengan menggunakan fitur
            penyesuaian laporan. Silahkan klik menu Penyesuaian Laporan untuk
            dapat melakukan pengaturan.
          </p>
          <button
            type="button"
            onClick={() => toast("Pilih Laporan (prototype)")}
            className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-[5px] bg-violet-600 px-5 text-[13px] font-semibold text-white ring-1 ring-violet-600/20 transition hover:bg-violet-700"
          >
            Pilih Laporan
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function KtpStatus({ available }: { available: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-[3px] px-2 py-1 text-[10px] font-bold leading-none text-white",
        available ? "bg-[#27ae00]" : "bg-[#dc3545]",
      )}
    >
      {available ? "Tersedia" : "Tidak Tersedia"}
    </span>
  );
}

export default function MitraKaryaLaporanAnggota() {
  const [nameOrNo, setNameOrNo] = React.useState("");
  const [registeredStart, setRegisteredStart] = React.useState("");
  const [registeredEnd, setRegisteredEnd] = React.useState("");
  const [category, setCategory] = React.useState("Semua");
  const [status, setStatus] = React.useState("Semua");
  const [product, setProduct] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [balanceDate, setBalanceDate] = React.useState("");
  const [balanceMin, setBalanceMin] = React.useState("");
  const [balanceMax, setBalanceMax] = React.useState("");
  const [reportType, setReportType] = React.useState(
    "Berdasarkan Simpanan Anggota",
  );
  const [ktpAvailability, setKtpAvailability] =
    React.useState<KtpAvailabilityFilter>("Semua");
  const [isSearched, setIsSearched] = React.useState(false);
  const [tablePage, setTablePage] = React.useState(1);
  const [selectedKtpMember, setSelectedKtpMember] =
    React.useState<Member | null>(null);
  const tablePageSize = 10;

  const filtered = React.useMemo(() => {
    const searchValue = nameOrNo.trim().toLowerCase();
    const productValue = product.trim().toLowerCase();
    const regionValue = region.trim().toLowerCase();
    const tagValue = tag.trim().toLowerCase();
    const startDate = toDateValue(registeredStart);
    const endDate = toDateValue(registeredEnd);
    const minimumBalance = balanceMin.trim() ? parseAmount(balanceMin) : null;
    const maximumBalance = balanceMax.trim() ? parseAmount(balanceMax) : null;

    return members.filter((member) => {
      const joinedDate = toDateValue(member.joined);
      const totalSavings = getTotalSavings(member);

      const matchesKtpAvailability =
        ktpAvailability === "Semua" ||
        (ktpAvailability === "Tersedia" && member.ktpAvailable) ||
        (ktpAvailability === "Tidak Tersedia" && !member.ktpAvailable);

      return (
        (!searchValue ||
          member.id.toLowerCase().includes(searchValue) ||
          member.name.toLowerCase().includes(searchValue)) &&
        (category === "Semua" || member.category === category) &&
        (status === "Semua" || member.status === status) &&
        (!productValue || member.product.toLowerCase().includes(productValue)) &&
        (!regionValue || member.region.toLowerCase().includes(regionValue)) &&
        (!tagValue || member.tag.toLowerCase().includes(tagValue)) &&
        (!startDate || !joinedDate || joinedDate >= startDate) &&
        (!endDate || !joinedDate || joinedDate <= endDate) &&
        (minimumBalance === null || totalSavings >= minimumBalance) &&
        (maximumBalance === null || totalSavings <= maximumBalance) &&
        matchesKtpAvailability
      );
    });
  }, [
    balanceMax,
    balanceMin,
    category,
    ktpAvailability,
    nameOrNo,
    product,
    region,
    registeredEnd,
    registeredStart,
    status,
    tag,
  ]);

  React.useEffect(() => setTablePage(1), [filtered.length]);

  const tablePageCount = Math.max(
    1,
    Math.ceil(filtered.length / tablePageSize),
  );

  React.useEffect(() => {
    if (tablePage > tablePageCount) setTablePage(tablePageCount);
  }, [tablePage, tablePageCount]);

  const pagedMembers = React.useMemo(
    () =>
      filtered.slice(
        (tablePage - 1) * tablePageSize,
        tablePage * tablePageSize,
      ),
    [filtered, tablePage],
  );

  const pageTotals = React.useMemo(
    () => getReportTotals(pagedMembers),
    [pagedMembers],
  );
  const totalTotals = React.useMemo(() => getReportTotals(filtered), [filtered]);
  const showingStart =
    filtered.length === 0 ? 0 : (tablePage - 1) * tablePageSize + 1;
  const showingEnd = Math.min(filtered.length, tablePage * tablePageSize);

  function handleExport() {
    toast.success("Export Excel (prototype)", {
      description: `${filtered.length} data anggota siap diekspor.`,
    });
  }

  function handlePrint() {
    if (!isSearched) {
      toast("Lakukan pencarian terlebih dahulu", {
        description: "Hasil laporan akan tersedia setelah tombol Cari ditekan.",
      });
      return;
    }

    window.print();
  }

  const topActionClassName = cn(
    "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4",
    "text-[13px] font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50",
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <KtpPhotoDialog
        open={selectedKtpMember !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedKtpMember(null);
        }}
        memberName={selectedKtpMember?.name ?? ""}
        memberId={selectedKtpMember?.id ?? ""}
        hasKtpPhoto={selectedKtpMember?.ktpAvailable ?? false}
      />

      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Anggota
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className={topActionClassName}
            >
              <FileSpreadsheet className="h-4 w-4 text-slate-600" />
              Export Excel
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className={topActionClassName}
            >
              <Printer className="h-4 w-4 text-slate-600" />
              Cetak
            </button>
          </div>
        </div>

        <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,720px)_minmax(0,1fr)]">
          <div className="w-full max-w-[720px]">
            <div className="grid gap-[10px]">
              <FieldRow label="Nama/No Anggota">
                <Input
                  value={nameOrNo}
                  onChange={(event) => setNameOrNo(event.target.value)}
                  placeholder="Masukkan nama/no anggota.."
                  className={fieldClassName}
                />
              </FieldRow>

              <FieldRow label="Tanggal Daftar">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    value={registeredStart}
                    onChange={(event) => setRegisteredStart(event.target.value)}
                    placeholder="Masukkan tanggal awal"
                    className={fieldClassName}
                  />
                  <div className="relative">
                    <Input
                      value={registeredEnd}
                      onChange={(event) => setRegisteredEnd(event.target.value)}
                      placeholder="Masukkan tanggal akhir"
                      className={cn(fieldClassName, "pr-10")}
                    />
                    <ClearButton
                      onClick={() => setRegisteredEnd("")}
                      label="Hapus tanggal akhir"
                    />
                  </div>
                </div>
              </FieldRow>

              <FieldRow label="Kategori">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger
                    className={cn(
                      fieldClassName,
                      category === "Semua"
                        ? "text-slate-400 [&_[data-slot=select-value]]:text-slate-400"
                        : "text-slate-900",
                    )}
                  >
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[5px] border-slate-200">
                    <SelectItem value="Semua">Pilih Kategori</SelectItem>
                    <SelectItem value="Anggota">Anggota</SelectItem>
                    <SelectItem value="Calon Anggota">Calon Anggota</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="Status">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger
                    className={cn(
                      fieldClassName,
                      status === "Semua"
                        ? "text-slate-400 [&_[data-slot=select-value]]:text-slate-400"
                        : "text-slate-900",
                    )}
                  >
                    <SelectValue placeholder="Pilih Status Anggota" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[5px] border-slate-200">
                    <SelectItem value="Semua">Pilih Status Anggota</SelectItem>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="Produk">
                <Input
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                  placeholder="Pilih produk yang dimiliki"
                  className={fieldClassName}
                />
              </FieldRow>

              <FieldRow label="Wilayah">
                <Input
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  placeholder="Pilih wilayah"
                  className={fieldClassName}
                />
              </FieldRow>

              <FieldRow label="Tag">
                <Input
                  value={tag}
                  onChange={(event) => setTag(event.target.value)}
                  placeholder="Pilih tag (satu atau lebih)"
                  className={fieldClassName}
                />
              </FieldRow>

              <FieldRow label="Tanggal Saldo">
                <div className="relative">
                  <Input
                    value={balanceDate}
                    onChange={(event) => setBalanceDate(event.target.value)}
                    placeholder="Masukkan tanggal saldo"
                    className={cn(fieldClassName, "pr-10")}
                  />
                  <ClearButton
                    onClick={() => setBalanceDate("")}
                    label="Hapus tanggal saldo"
                  />
                </div>
              </FieldRow>

              <FieldRow label="Saldo Simpanan">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    value={balanceMin}
                    onChange={(event) => setBalanceMin(event.target.value)}
                    placeholder="Saldo Minimal"
                    className={fieldClassName}
                    inputMode="decimal"
                  />
                  <Input
                    value={balanceMax}
                    onChange={(event) => setBalanceMax(event.target.value)}
                    placeholder="Saldo Maksimal"
                    className={fieldClassName}
                    inputMode="decimal"
                  />
                </div>
              </FieldRow>

              <FieldRow label="Jenis Laporan">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger
                    className={cn(
                      fieldClassName,
                      reportType === "Berdasarkan Simpanan Anggota"
                        ? "text-slate-400 [&_[data-slot=select-value]]:text-slate-400"
                        : "text-slate-900",
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[5px] border-slate-200">
                    <SelectItem value="Berdasarkan Simpanan Anggota">
                      Berdasarkan Simpanan Anggota
                    </SelectItem>
                    <SelectItem value="Berdasarkan Data Anggota">
                      Berdasarkan Data Anggota
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="File KTP Anggota">
                <Select
                  value={ktpAvailability}
                  onValueChange={(value) =>
                    setKtpAvailability(value as KtpAvailabilityFilter)
                  }
                >
                  <SelectTrigger className={fieldClassName}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[5px] border-slate-200">
                    <SelectItem value="Semua">Semua</SelectItem>
                    <SelectItem value="Tersedia">Tersedia</SelectItem>
                    <SelectItem value="Tidak Tersedia">
                      Tidak Tersedia
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <div className="grid sm:grid-cols-[165px_minmax(0,1fr)]">
                <div />
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsSearched(true)}
                    className="inline-flex h-[31px] items-center justify-center gap-1.5 rounded-[5px] bg-[#3BB001] px-4 text-[14px] font-semibold text-white transition hover:bg-[#349d01]"
                  >
                    <Search className="h-4 w-4" strokeWidth={3} />
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ReportInfoPanel />
        </div>

        {isSearched ? (
          <Card className="mt-5 rounded-3xl border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
            <div className="mitra-karya-member-report">
              <table className="w-full min-w-[1420px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-[56px]">No.</th>
                    <th className="w-[100px]">No. Anggota</th>
                    <th className="w-[125px]">Nama</th>
                    <th className="w-[105px]">Tanggal Daftar</th>
                    <th className="w-[150px]">Alamat</th>
                    <th className="w-[125px]">No. Handphone</th>
                    <th className="w-[90px]">Kategori</th>
                    <th className="w-[110px]">Simpanan Pokok</th>
                    <th className="w-[110px]">Simpanan Wajib</th>
                    <th className="w-[110px]">Simpanan Khusus</th>
                    <th className="w-[125px]">Simpanan Penyertaan</th>
                    <th className="w-[115px]">Total Simpanan</th>
                    <th className="w-[85px]">Status</th>
                    <th className="w-[105px]">File KTP</th>
                    <th className="w-[60px] text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {pagedMembers.map((member, index) => (
                    <tr key={member.id}>
                      <td>{(tablePage - 1) * tablePageSize + index + 1}</td>
                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.joined}</td>
                      <td>{member.address}</td>
                      <td>{member.phone}</td>
                      <td>{member.category}</td>
                      <td>{formatAmount(member.simpananPokok)}</td>
                      <td>{formatAmount(member.simpananWajib)}</td>
                      <td>{formatAmount(member.simpananKhusus)}</td>
                      <td>{formatAmount(member.simpananPenyertaan)}</td>
                      <td>{formatAmount(getTotalSavings(member))}</td>
                      <td>
                        <span>{member.status}</span>
                      </td>
                      <td>
                        <KtpStatus available={member.ktpAvailable} />
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedKtpMember(member)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] text-[#2563EB] transition hover:bg-blue-50"
                          aria-label={`Lihat file KTP ${member.name}`}
                          title="Lihat File KTP"
                        >
                          <Eye className="h-4 w-4" strokeWidth={2.6} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {pagedMembers.length > 0 ? (
                    <>
                      <tr className="mitra-karya-total-row">
                        <td colSpan={7}>Total per Halaman</td>
                        <td>{formatAmount(pageTotals.simpananPokok)}</td>
                        <td>{formatAmount(pageTotals.simpananWajib)}</td>
                        <td>{formatAmount(pageTotals.simpananKhusus)}</td>
                        <td>{formatAmount(pageTotals.simpananPenyertaan)}</td>
                        <td>{formatAmount(pageTotals.totalSimpanan)}</td>
                        <td colSpan={3} />
                      </tr>
                      <tr className="mitra-karya-total-row">
                        <td colSpan={7}>Total</td>
                        <td>{formatAmount(totalTotals.simpananPokok)}</td>
                        <td>{formatAmount(totalTotals.simpananWajib)}</td>
                        <td>{formatAmount(totalTotals.simpananKhusus)}</td>
                        <td>{formatAmount(totalTotals.simpananPenyertaan)}</td>
                        <td>{formatAmount(totalTotals.totalSimpanan)}</td>
                        <td colSpan={3} />
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td
                        colSpan={15}
                        className="px-4 py-10 text-center text-slate-500"
                      >
                        Anggota tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-[13px] text-slate-600">
                Menampilkan {showingStart} sampai {showingEnd} dari{" "}
                {filtered.length} entri
              </div>

              <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
                <button
                  type="button"
                  disabled={tablePage <= 1}
                  onClick={() =>
                    setTablePage((current) => Math.max(1, current - 1))
                  }
                  className="h-10 px-4 text-[14px] font-medium text-slate-500 transition hover:bg-slate-200 disabled:text-slate-400"
                >
                  Sebelumnya
                </button>
                <div className="grid h-10 w-10 place-items-center bg-violet-600 text-[14px] font-semibold text-white">
                  {tablePage}
                </div>
                <button
                  type="button"
                  disabled={tablePage >= tablePageCount}
                  onClick={() =>
                    setTablePage((current) =>
                      Math.min(tablePageCount, current + 1),
                    )
                  }
                  className="h-10 px-4 text-[14px] font-medium text-slate-500 transition hover:bg-slate-200 disabled:text-slate-400"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </Card>
        ) : null}

        <div className="sr-only">{balanceDate}</div>
      </div>
    </div>
  );
}