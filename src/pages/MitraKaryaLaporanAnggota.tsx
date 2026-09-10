import * as React from "react";
import {
  ChevronDown,
  Eye,
  Info,
  Printer,
  Save,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import MemberReportEntriesPicker from "@/components/mitra-karya/MemberReportEntriesPicker";
import ReportPrintHeader from "@/components/laporan/ReportPrintHeader";
import { openBlankReportPdfPreview, openReportPdfPreview } from "@/utils/pdf-preview";
import { openReportPrintPreview } from "@/utils/print-report";
import { useNavigate } from "react-router-dom";

type Category = "Semua" | "Anggota" | "Calon Anggota";
type KtpStatus = "Semua" | "Tersedia" | "Belum Tersedia";

type Member = {
  id: string;
  name: string;
  registeredAt: string;
  category: Category;
  ktpStatus: KtpStatus;
  phone: string;
  address: string;
  product: string;
  wilayah: string;
  tag: string;
  simpananPokok: number;
  simpananWajib: number;
  simpananKhusus: number;
  simpananPenyertaan: number;
  status: "Aktif" | "Tidak Aktif";
};

const members: Member[] = [
  {
    id: "A2300001",
    name: "Balian Uwais",
    registeredAt: "14-03-2023",
    category: "Anggota",
    ktpStatus: "Tersedia",
    phone: "028 8478 394",
    address: "Surabaya",
    product: "Simpanan Kaya",
    wilayah: "Denpasar",
    tag: "Prioritas",
    simpananPokok: 0,
    simpananWajib: 0,
    simpananKhusus: 0,
    simpananPenyertaan: 0,
    status: "Aktif",
  },
  {
    id: "A2300002",
    name: "Jatmiko Wacana",
    registeredAt: "28-03-2023",
    category: "Anggota",
    ktpStatus: "Belum Tersedia",
    phone: "028 4560 3652",
    address: "Jl Raya Sibang",
    product: "Simpanan Sukarela",
    wilayah: "Gianyar",
    tag: "Reguler",
    simpananPokok: 0,
    simpananWajib: 0,
    simpananKhusus: 0,
    simpananPenyertaan: 0,
    status: "Aktif",
  },
  {
    id: "A2300003",
    name: "Laksana Hidayanto",
    registeredAt: "20-04-2023",
    category: "Anggota",
    ktpStatus: "Tersedia",
    phone: "0478 5431 649",
    address: "Denpasar",
    product: "Simpanan Mapan",
    wilayah: "Denpasar",
    tag: "Reguler",
    simpananPokok: 1_500_000,
    simpananWajib: 50_000,
    simpananKhusus: 0,
    simpananPenyertaan: 50_000_000,
    status: "Aktif",
  },
  {
    id: "A2300004",
    name: "Zulaikha Mulyani",
    registeredAt: "21-04-2023",
    category: "Anggota",
    ktpStatus: "Belum Tersedia",
    phone: "0837 6686 458",
    address: "Jln Wijaya Kusuma, No 11A",
    product: "Simpanan Kaya",
    wilayah: "Badung",
    tag: "Prioritas",
    simpananPokok: 1_500_000,
    simpananWajib: 50_000,
    simpananKhusus: 0,
    simpananPenyertaan: 0,
    status: "Aktif",
  },
  {
    id: "A2300005",
    name: "Nasrullah Banafi Mustofa M.M",
    registeredAt: "21-04-2023",
    category: "Anggota",
    ktpStatus: "Tersedia",
    phone: "(+62) 800 773 744",
    address: "Jln Wijaya Kusuma, No 11A",
    product: "Simpanan Berjangka",
    wilayah: "Denpasar",
    tag: "Deposito",
    simpananPokok: 1_500_000,
    simpananWajib: 50_000,
    simpananKhusus: 0,
    simpananPenyertaan: 0,
    status: "Aktif",
  },
  {
    id: "A2300006",
    name: "Ana Haryanti",
    registeredAt: "21-04-2023",
    category: "Anggota",
    ktpStatus: "Belum Tersedia",
    phone: "(+62) 539 8053 739",
    address: "Jln Raya Dalung Permai, No 2",
    product: "Simpanan Sukarela",
    wilayah: "Badung",
    tag: "Reguler",
    simpananPokok: 1_500_000,
    simpananWajib: 50_000,
    simpananKhusus: 0,
    simpananPenyertaan: 0,
    status: "Aktif",
  },
  {
    id: "C2600001",
    name: "Kadek Putra Wijaya",
    registeredAt: "07-01-2026",
    category: "Calon Anggota",
    ktpStatus: "Belum Tersedia",
    phone: "0812 3456 7890",
    address: "Gianyar",
    product: "Simpanan Sukarela",
    wilayah: "Gianyar",
    tag: "Baru",
    simpananPokok: 100_000,
    simpananWajib: 0,
    simpananKhusus: 0,
    simpananPenyertaan: 0,
    status: "Tidak Aktif",
  },
];

function formatMoney(value: number) {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[166px_minmax(0,1fr)] sm:items-center">
      <label className="text-[14px] font-normal text-[#002060]">{label}</label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-[32px] rounded-[5px] border-slate-300 bg-white px-3 text-[14px] font-normal text-slate-700 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-[5px] border-slate-200">
        {children}
      </SelectContent>
    </Select>
  );
}

function StatusBadge({ status }: { status: Member["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-[3px] px-2 py-1 text-[9px] font-bold leading-none text-white",
        status === "Aktif" ? "bg-[#27ae00]" : "bg-[#dc3545]",
      )}
    >
      {status}
    </span>
  );
}

function KtpBadge({ status }: { status: Member["ktpStatus"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-[3px] px-2 py-1 text-[9px] font-bold leading-none text-white",
        status === "Tersedia" ? "bg-[#27ae00]" : "bg-[#dc3545]",
      )}
    >
      {status}
    </span>
  );
}

function ReportActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-100 bg-white px-4 text-[14px] font-normal text-[#536581] shadow-sm transition hover:bg-slate-50 hover:shadow-md"
    >
      <Icon className="h-[17px] w-[17px] text-[#536581]" />
      {label}
    </button>
  );
}

function SortableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="leading-[1.2]">{children}</span>;
}

function ReportResults({ rows, selectedReport }: { rows: Member[]; selectedReport: string }) {
  const [selectedKtpMember, setSelectedKtpMember] = React.useState<Member | null>(null);
  const savedReports = JSON.parse(localStorage.getItem("mitra-karya-penyesuaian-laporan") || "[]") as { title: string; columns?: { key: string; label: string }[] }[];
  const configuredReport = savedReports.find((report) => report.title === selectedReport);
  const configuredColumns = configuredReport?.columns || [];
  const defaultColumns = [
    { key: "no-anggota", label: "No. Anggota" },
    { key: "nama", label: "Nama" },
    { key: "tanggal-daftar", label: "Tanggal Daftar" },
    { key: "alamat", label: "Alamat" },
    { key: "no-handphone", label: "No. Handphone" },
    { key: "kategori", label: "Kategori" },
    { key: "simpanan-pokok", label: "Simpanan Pokok" },
    { key: "simpanan-wajib", label: "Simpanan Wajib" },
    { key: "simpanan-khusus", label: "Simpanan Khusus" },
    { key: "simpanan-penyertaan", label: "Simpanan Penyertaan" },
    { key: "total-simpanan", label: "Total Simpanan" },
    { key: "status", label: "Status" },
  ];
  const fieldLabels: Record<string, string> = Object.fromEntries([...defaultColumns, { key: "nomor-identitas", label: "Nomor Identitas" }, { key: "tanggal-lahir", label: "Tanggal Lahir" }, { key: "jenis-kelamin", label: "Jenis Kelamin" }, { key: "tempat-lahir", label: "Tempat Lahir" }, { key: "simpanan-khusus", label: "Simpanan Khusus" }, { key: "simpanan-penyertaan", label: "Simpanan Penyertaan" }, { key: "total-simpanan", label: "Total Simpanan" }, { key: "status", label: "Status" }, { key: "ketersediaan-file-ktp", label: "Ketersediaan File KTP" }, { key: "preview-file-ktp", label: "Pratinjau File KTP" }].map((field) => [field.key, field.label]));
  const columns = (configuredReport ? configuredColumns : defaultColumns).map((column) => ({ ...column, label: column.label || fieldLabels[column.key] || column.key }));
  const getValue = (member: Member, key: string) => ({ "no-anggota": member.id, nama: member.name, "tanggal-daftar": member.registeredAt, "nomor-identitas": "-", "tanggal-lahir": "-", "jenis-kelamin": "-", "tempat-lahir": "-", alamat: member.address, "no-handphone": member.phone, kategori: member.category, "simpanan-pokok": formatMoney(member.simpananPokok), "simpanan-wajib": formatMoney(member.simpananWajib), "simpanan-khusus": formatMoney(member.simpananKhusus), "simpanan-penyertaan": formatMoney(member.simpananPenyertaan), "total-simpanan": formatMoney(member.simpananPokok + member.simpananWajib + member.simpananKhusus + member.simpananPenyertaan), status: member.status, "ketersediaan-file-ktp": member.ktpStatus }[key] || "");
  const renderCell = (member: Member, key: string) => key === "ketersediaan-file-ktp" ? (
    <KtpBadge status={member.ktpStatus} />
  ) : key === "preview-file-ktp" && member.ktpStatus === "Tersedia" ? (
    <>
      <button
        type="button"
        onClick={() => setSelectedKtpMember(member)}
        className="export-hide group relative inline-flex h-8 w-12 overflow-hidden rounded-[4px] border border-blue-100 bg-blue-50 transition hover:border-blue-400"
        aria-label={`Preview KTP ${member.name}`}
        title="Preview KTP"
      >
        <img
          src="/image 4.png"
          alt={`Pratinjau KTP ${member.name}`}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = "/imagektpblur.png";
          }}
        />
        <span className="absolute inset-0 grid place-items-center bg-[#002060]/35 opacity-0 transition group-hover:opacity-100">
          <Eye className="h-4 w-4 text-white" strokeWidth={2.5} />
        </span>
      </button>
      <a
        href="/image 4.png"
        target="_blank"
        rel="noreferrer"
        className="export-only hidden font-medium text-blue-700 underline"
      >
        Lihat File KTP
      </a>
    </>
  ) : key === "preview-file-ktp" ? "-" : getValue(member, key);

  const totals = React.useMemo(
    () =>
      rows.reduce(
        (result, member) => {
          result.simpananPokok += member.simpananPokok;
          result.simpananWajib += member.simpananWajib;
          result.simpananKhusus += member.simpananKhusus;
          result.simpananPenyertaan += member.simpananPenyertaan;
          return result;
        },
        {
          simpananPokok: 0,
          simpananWajib: 0,
          simpananKhusus: 0,
          simpananPenyertaan: 0,
        },
      ),
    [rows],
  );

  const totalSimpanan =
    totals.simpananPokok +
    totals.simpananWajib +
    totals.simpananKhusus +
    totals.simpananPenyertaan;

  return (
    <section className={cn(
      "print-report-area mt-7 overflow-hidden rounded-[10px] border border-slate-200 bg-white p-4 shadow-sm",
      !configuredReport && "default-member-report-section",
    )}>
      <ReportPrintHeader
        title={selectedReportHasKtpFields ? "Laporan KTP Anggota" : selectedReport}
        printedAt={new Date().toLocaleDateString("id-ID")}
        reportBasis={selectedReportHasKtpFields ? "Laporan Anggota" : undefined}
        reportType={selectedReportHasKtpFields ? "Berdasarkan Simpanan Anggota" : undefined}
      />
      <MemberReportEntriesPicker className="print-hide mb-4" />

      <div className="mitra-karya-member-report">
        <table className={`min-w-[1720px] w-full ${configuredReport ? "custom-report-table" : "default-report-table"}`}>
          <thead>
            <tr>
              <th>No.</th>
              {columns.map((column) => <th key={column.key}><SortableHeader>{column.label}</SortableHeader></th>)}
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((member, index) => {
                return (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    {columns.map((column) => <td key={column.key}>{renderCell(member, column.key)}</td>)}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={15}
                  className="px-4 py-10 text-center text-[13px] text-slate-500"
                >
                  Anggota tidak ditemukan.
                </td>
              </tr>
            )}

            {rows.length > 0 && !configuredReport ? (
              <>
                <tr className="mitra-karya-total-row mitra-karya-total-page-row">
                  <td colSpan={7}>Total per Halaman</td>
                  <td>{formatMoney(totals.simpananPokok)}</td>
                  <td>{formatMoney(totals.simpananWajib)}</td>
                  <td>{formatMoney(totals.simpananKhusus)}</td>
                  <td>{formatMoney(totals.simpananPenyertaan)}</td>
                  <td>{formatMoney(totalSimpanan)}</td>
                  <td />
                </tr>
                <tr className="mitra-karya-total-row mitra-karya-total-all-row">
                  <td colSpan={7}>Total</td>
                  <td>{formatMoney(totals.simpananPokok)}</td>
                  <td>{formatMoney(totals.simpananWajib)}</td>
                  <td>{formatMoney(totals.simpananKhusus)}</td>
                  <td>{formatMoney(totals.simpananPenyertaan)}</td>
                  <td>{formatMoney(totalSimpanan)}</td>
                  <td />
                </tr>
              </>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="print-hide flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-[#002060]">
          Menampilkan 1 sampai {rows.length} dari {rows.length} entri
        </div>
        <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
          <button
            type="button"
            disabled
            className="h-9 px-4 text-[12px] font-medium text-slate-400"
          >
            Sebelumnya
          </button>
          <span className="grid h-9 w-9 place-items-center bg-[#5B47FB] text-[12px] font-bold text-white">
            1
          </span>
          <button
            type="button"
            disabled
            className="h-9 px-4 text-[12px] font-medium text-slate-400"
          >
            Selanjutnya
          </button>
        </div>
      </div>

      {selectedKtpMember ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto KTP Anggota ${selectedKtpMember.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6"
          onClick={() => setSelectedKtpMember(null)}
        >
          <div
            className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-[765px] flex-col overflow-hidden rounded-[10px] bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-[63px] shrink-0 items-center justify-between border-b border-slate-200 px-6 sm:px-9">
              <h2 className="text-[17px] font-bold text-[#101010]">File KTP Anggota</h2>
              <button
                type="button"
                onClick={() => setSelectedKtpMember(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#111111] transition hover:bg-slate-100"
                aria-label="Tutup pratinjau KTP"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center border-b border-slate-200 px-6 py-5 sm:px-12 sm:py-5">
              <div className="flex max-h-full w-full items-center justify-center rounded-[4px] border border-[#cbd5e1] p-3 sm:p-[15px]">
                <img
                  src="/image 4.png"
                  alt={`Foto KTP ${selectedKtpMember.name}`}
                  className="max-h-[56vh] w-auto max-w-full object-contain sm:max-h-[390px]"
                  onError={(event) => {
                    event.currentTarget.src = "/imagektpblur.png";
                  }}
                />
              </div>
            </div>
            <div className="flex h-[58px] shrink-0 items-center justify-end px-6 sm:px-9">
              <button
                type="button"
                onClick={() => setSelectedKtpMember(null)}
                className="inline-flex h-8 items-center rounded-[5px] bg-[#7d8db8] px-5 text-[12px] font-medium text-white transition hover:bg-[#6d7dab]"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default function MitraKaryaLaporanAnggota() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [category, setCategory] = React.useState<Category>("Semua");
  const [status, setStatus] = React.useState("Semua");
  const [product, setProduct] = React.useState("Semua");
  const [wilayah, setWilayah] = React.useState("Semua");
  const [tag, setTag] = React.useState("Semua");
  const [balanceDate, setBalanceDate] = React.useState("");
  const [minBalance, setMinBalance] = React.useState("");
  const [maxBalance, setMaxBalance] = React.useState("");
  const [reportType, setReportType] = React.useState(
    "Berdasarkan Simpanan Anggota",
  );
  const [selectedReport, setSelectedReport] = React.useState("Laporan Anggota (Default)");
  const [reportRefreshKey, setReportRefreshKey] = React.useState(0);
  const [ktpStatus, setKtpStatus] = React.useState<KtpStatus>("Semua");
  const [searched, setSearched] = React.useState(false);

  const memberReportOptions = React.useMemo(() => {
    const savedReports = JSON.parse(localStorage.getItem("mitra-karya-penyesuaian-laporan") || "[]") as { basis: string; title: string }[];
    return [...new Set([
      "Laporan Anggota (Default)",
      ...savedReports.filter((report) => report.basis === "Laporan Anggota").map((report) => report.title),
    ])];
  }, [reportRefreshKey]);

  const selectedReportHasKtpFields = React.useMemo(() => {
    if (selectedReport === "Laporan Anggota (Default)") return false;
    const savedReports = JSON.parse(localStorage.getItem("mitra-karya-penyesuaian-laporan") || "[]") as {
      title: string;
      basis: string;
      columns?: { key: string }[];
    }[];
    const report = savedReports.find(
      (item) => item.basis === "Laporan Anggota" && item.title === selectedReport,
    );
    const fieldKeys = new Set((report?.columns || []).map((column) => column.key));
    return fieldKeys.has("ketersediaan-file-ktp") && fieldKeys.has("preview-file-ktp");
  }, [reportRefreshKey, selectedReport]);

  React.useEffect(() => {
    const refreshReports = () => setReportRefreshKey((key) => key + 1);
    window.addEventListener("storage", refreshReports);
    window.addEventListener("focus", refreshReports);
    return () => {
      window.removeEventListener("storage", refreshReports);
      window.removeEventListener("focus", refreshReports);
    };
  }, []);

  React.useEffect(() => {
    if (!memberReportOptions.includes(selectedReport)) setSelectedReport("Laporan Anggota (Default)");
  }, [memberReportOptions, selectedReport]);

  const filteredMembers = React.useMemo(() => {
    const nameQuery = name.trim().toLowerCase();
    const min = Number(minBalance.replace(/[^\d]/g, "")) || 0;
    const max = Number(maxBalance.replace(/[^\d]/g, "")) || Infinity;

    return members.filter((member) => {
      const totalBalance =
        member.simpananPokok +
        member.simpananWajib +
        member.simpananKhusus +
        member.simpananPenyertaan;

      return (
        (!nameQuery ||
          `${member.name} ${member.id}`.toLowerCase().includes(nameQuery)) &&
        (category === "Semua" || member.category === category) &&
        (!selectedReportHasKtpFields || ktpStatus === "Semua" || member.ktpStatus === ktpStatus) &&
        (product === "Semua" || member.product === product) &&
        (wilayah === "Semua" || member.wilayah === wilayah) &&
        (tag === "Semua" || member.tag === tag) &&
        totalBalance >= min &&
        totalBalance <= max
      );
    });
  }, [category, ktpStatus, maxBalance, minBalance, name, product, selectedReportHasKtpFields, tag, wilayah]);

  const inputClassName = cn(
    "h-[32px] rounded-[5px] border-slate-300 bg-white px-3",
    "text-[14px] font-normal text-slate-900 shadow-none",
    "placeholder:!text-[#94a3b8]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  function exportReport(label: string) {
    if (label === "Export PDF") {
      const previewWindow = openBlankReportPdfPreview("export");
      setSearched(true);
      window.setTimeout(() => {
        openReportPdfPreview({ title: "export", targetWindow: previewWindow });
      }, 80);
      return;
    }

    if (label === "Cetak") {
      setSearched(true);
      window.setTimeout(() => openReportPrintPreview(), 80);
      return;
    }

    toast.success(`${label} (prototype)`, {
      description: `${filteredMembers.length} data anggota siap diekspor.`,
    });
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-[24px] font-bold tracking-tight text-[#001b4e]">
            {selectedReport}
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <ReportActionButton
              icon={Save}
              label="Export Excel"
              onClick={() => exportReport("Export Excel")}
            />
            <ReportActionButton
              icon={Save}
              label="Export PDF"
              onClick={() => exportReport("Export PDF")}
            />
            <ReportActionButton
              icon={Printer}
              label="Cetak"
              onClick={() => exportReport("Cetak")}
            />
          </div>
        </div>

        <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,742px)_minmax(360px,1fr)]">
          <div className="grid gap-[11px]">
            <FormRow label="Nama/No Anggota">
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Masukkan nama/no anggota.."
                className={inputClassName}
              />
            </FormRow>

            <FormRow label="Tanggal Daftar">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  value={dateStart}
                  onChange={(event) => setDateStart(event.target.value)}
                  placeholder="Masukkan tanggal awal"
                  className={inputClassName}
                />
                <div className="relative">
                  <Input
                    value={dateEnd}
                    onChange={(event) => setDateEnd(event.target.value)}
                    placeholder="Masukkan tanggal akhir"
                    className={cn(inputClassName, "pr-11")}
                  />
                  <button
                    type="button"
                    onClick={() => setDateEnd("")}
                    className="absolute right-0 top-0 inline-flex h-[32px] w-[38px] items-center justify-center rounded-r-[5px] bg-[#77839A] text-white transition hover:bg-[#6b768c]"
                    aria-label="Hapus tanggal akhir"
                  >
                    <X className="h-4 w-4" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </FormRow>

            <FormRow label="Kategori">
              <FilterSelect
                value={category}
                onChange={(value) => setCategory(value as Category)}
                placeholder="Pilih Kategori"
              >
                <SelectItem value="Semua">Pilih Kategori</SelectItem>
                <SelectItem value="Anggota">Anggota</SelectItem>
                <SelectItem value="Calon Anggota">Calon Anggota</SelectItem>
              </FilterSelect>
            </FormRow>

            <FormRow label="Status">
              <FilterSelect
                value={status}
                onChange={setStatus}
                placeholder="Pilih Status Anggota"
              >
                <SelectItem value="Semua">Pilih Status Anggota</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Nonaktif">Nonaktif</SelectItem>
              </FilterSelect>
            </FormRow>

            <FormRow label="Produk">
              <FilterSelect
                value={product}
                onChange={setProduct}
                placeholder="Pilih produk yang dimiliki"
              >
                <SelectItem value="Semua">Pilih produk yang dimiliki</SelectItem>
                <SelectItem value="Simpanan Kaya">Simpanan Kaya</SelectItem>
                <SelectItem value="Simpanan Sukarela">
                  Simpanan Sukarela
                </SelectItem>
                <SelectItem value="Simpanan Mapan">Simpanan Mapan</SelectItem>
                <SelectItem value="Simpanan Berjangka">
                  Simpanan Berjangka
                </SelectItem>
              </FilterSelect>
            </FormRow>

            <FormRow label="Wilayah">
              <FilterSelect
                value={wilayah}
                onChange={setWilayah}
                placeholder="Pilih wilayah"
              >
                <SelectItem value="Semua">Pilih wilayah</SelectItem>
                <SelectItem value="Denpasar">Denpasar</SelectItem>
                <SelectItem value="Gianyar">Gianyar</SelectItem>
                <SelectItem value="Badung">Badung</SelectItem>
              </FilterSelect>
            </FormRow>

            <FormRow label="Tag">
              <FilterSelect
                value={tag}
                onChange={setTag}
                placeholder="Pilih tag (satu atau lebih)"
              >
                <SelectItem value="Semua">Pilih tag (satu atau lebih)</SelectItem>
                <SelectItem value="Prioritas">Prioritas</SelectItem>
                <SelectItem value="Reguler">Reguler</SelectItem>
                <SelectItem value="Deposito">Deposito</SelectItem>
                <SelectItem value="Baru">Baru</SelectItem>
              </FilterSelect>
            </FormRow>

            <FormRow label="Tanggal Saldo">
              <div className="relative">
                <Input
                  value={balanceDate}
                  onChange={(event) => setBalanceDate(event.target.value)}
                  placeholder="Masukkan tanggal saldo"
                  className={cn(inputClassName, "pr-11")}
                />
                <button
                  type="button"
                  onClick={() => setBalanceDate("")}
                  className="absolute right-0 top-0 inline-flex h-[32px] w-[38px] items-center justify-center rounded-r-[5px] bg-[#77839A] text-white transition hover:bg-[#6b768c]"
                  aria-label="Hapus tanggal saldo"
                >
                  <X className="h-4 w-4" strokeWidth={3} />
                </button>
              </div>
            </FormRow>

            <FormRow label="Saldo Simpanan">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  value={minBalance}
                  onChange={(event) => setMinBalance(event.target.value)}
                  placeholder="Saldo Minimal"
                  inputMode="decimal"
                  className={inputClassName}
                />
                <Input
                  value={maxBalance}
                  onChange={(event) => setMaxBalance(event.target.value)}
                  placeholder="Saldo Maksimal"
                  inputMode="decimal"
                  className={inputClassName}
                />
              </div>
            </FormRow>

            <FormRow label="Jenis Laporan">
              <FilterSelect
                value={reportType}
                onChange={setReportType}
                placeholder="Berdasarkan Simpanan Anggota"
              >
                <SelectItem value="Berdasarkan Simpanan Anggota">
                  Berdasarkan Simpanan Anggota
                </SelectItem>
                <SelectItem value="Berdasarkan Produk">
                  Berdasarkan Produk
                </SelectItem>
              </FilterSelect>
            </FormRow>

            {selectedReportHasKtpFields ? <FormRow label="Ketersediaan File KTP">
              <FilterSelect
                value={ktpStatus}
                onChange={(value) => setKtpStatus(value as KtpStatus)}
                placeholder="Semua"
              >
                <SelectItem value="Semua">Semua</SelectItem>
                <SelectItem value="Tersedia">Sudah Tersedia</SelectItem>
                <SelectItem value="Belum Tersedia">Belum Tersedia</SelectItem>
              </FilterSelect>
            </FormRow> : null}

            <div className="grid sm:grid-cols-[166px_minmax(0,1fr)]">
              <div />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSearched(true)}
                  className="inline-flex h-[32px] items-center justify-center gap-1.5 rounded-[5px] bg-[#3BB001] px-4 text-[14px] font-semibold text-white transition hover:bg-[#349d01]"
                >
                  <Search className="h-4 w-4" strokeWidth={3} />
                  Cari
                </button>
              </div>
            </div>
          </div>

          <section className="rounded-[5px] border border-[#0EA5E9] bg-white px-5 py-4 text-[#0098CD]">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0EA5C6] text-white">
                <Info className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <h2 className="text-[14px] font-extrabold leading-snug">
                  <span className="text-[#00a8c6]">Fitur Penyesuaian Laporan</span>
                </h2>
                <p className="mt-2 max-w-[440px] text-[13px] font-normal leading-relaxed">
                  Anda dapat melakukan kustomisasi tampilan laporan (pengaturan
                  kolom dan urutan data) pada laporan ini dengan menggunakan fitur
                  penyesuaian laporan. Silahkan klik menu{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/mitra-karya/laporan/penyesuaian")}
                    className="font-semibold text-[#5B47FB] underline-offset-2 hover:underline"
                  >
                    Penyesuaian Laporan
                  </button>{" "}
                  untuk dapat melakukan pengaturan.
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="mt-5 inline-flex h-[42px] items-center gap-2 rounded-[5px] bg-[#5B47FB] px-5 text-[13px] font-semibold text-white transition hover:bg-[#4d3de0]"
                    >
                      Pilih Laporan
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[240px] rounded-[5px] border-slate-200 p-1">
                    {memberReportOptions.map((report) => (
                      <DropdownMenuItem
                        key={report}
                        onClick={() => setSelectedReport(report)}
                        className="cursor-pointer rounded-[3px] text-[13px] text-[#002060] focus:bg-[#2563eb] focus:text-white"
                      >
                        {report}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </section>
        </div>

        {searched ? <ReportResults rows={filteredMembers} selectedReport={selectedReport} /> : null}
      </div>
    </div>
  );
}