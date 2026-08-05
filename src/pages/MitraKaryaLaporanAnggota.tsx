import * as React from "react";
import {
  ChevronDown,
  FileSpreadsheet,
  Info,
  Printer,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Category = "Semua" | "Anggota" | "Calon Anggota";
type KtpStatus = "Semua" | "Tersedia" | "Belum Tersedia";

type Member = {
  id: string;
  name: string;
  registeredAt: string;
  category: Exclude<Category, "Semua">;
  ktpStatus: Exclude<KtpStatus, "Semua">;
  phone: string;
  address: string;
  product: string;
  wilayah: string;
  tag: string;
  balance: number;
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
    balance: 4_000_000,
  },
  {
    id: "A2300002",
    name: "Jatmiko Wacana",
    registeredAt: "28-03-2023",
    category: "Anggota",
    ktpStatus: "Belum Tersedia",
    phone: "028 4560 3652",
    address: "Jl. Raya Sibang",
    product: "Simpanan Sukarela",
    wilayah: "Gianyar",
    tag: "Reguler",
    balance: 2_750_000,
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
    balance: 20_000_000,
  },
  {
    id: "A2300004",
    name: "Zulaikha Mulyani",
    registeredAt: "21-04-2023",
    category: "Anggota",
    ktpStatus: "Belum Tersedia",
    phone: "0837 6686 458",
    address: "Jln. Wijaya Kusuma No. 11A",
    product: "Simpanan Kaya",
    wilayah: "Badung",
    tag: "Prioritas",
    balance: 950_000,
  },
  {
    id: "A2300005",
    name: "Nasrullah Banafi Mustofa M.M",
    registeredAt: "21-04-2023",
    category: "Anggota",
    ktpStatus: "Tersedia",
    phone: "(+62) 800 773 744",
    address: "Denpasar",
    product: "Simpanan Berjangka",
    wilayah: "Denpasar",
    tag: "Deposito",
    balance: 10_000_000,
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
    balance: 100_000,
  },
];

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
      <SelectContent className="rounded-[5px] border-slate-200">{children}</SelectContent>
    </Select>
  );
}

export default function MitraKaryaLaporanAnggota() {
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
  const [ktpStatus, setKtpStatus] = React.useState<KtpStatus>("Semua");
  const [searched, setSearched] = React.useState(false);

  const filteredMembers = React.useMemo(() => {
    const nameQuery = name.trim().toLowerCase();
    const min = Number(minBalance.replace(/[^\d]/g, "")) || 0;
    const max = Number(maxBalance.replace(/[^\d]/g, "")) || Infinity;

    return members.filter((member) => {
      const matchName = nameQuery
        ? `${member.name} ${member.id}`.toLowerCase().includes(nameQuery)
        : true;
      const matchCategory =
        category === "Semua" || member.category === category;
      const matchKtp = ktpStatus === "Semua" || member.ktpStatus === ktpStatus;
      const matchProduct = product === "Semua" || member.product === product;
      const matchWilayah =
        wilayah === "Semua" || member.wilayah === wilayah;
      const matchTag = tag === "Semua" || member.tag === tag;
      const matchBalance = member.balance >= min && member.balance <= max;

      return (
        matchName &&
        matchCategory &&
        matchKtp &&
        matchProduct &&
        matchWilayah &&
        matchTag &&
        matchBalance
      );
    });
  }, [category, ktpStatus, maxBalance, minBalance, name, product, tag, wilayah]);

  const inputClassName = cn(
    "h-[32px] rounded-[5px] border-slate-300 bg-white px-3",
    "text-[14px] font-normal text-slate-900 shadow-none",
    "placeholder:!text-[#94a3b8]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  function exportReport(label: string) {
    toast.success(`${label} (prototype)`, {
      description: `${filteredMembers.length} data anggota siap diekspor.`,
    });
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-[24px] font-bold tracking-tight text-[#001b4e]">
            Laporan Anggota
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => exportReport("Export Excel")}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-[13px] font-semibold text-[#001b4e] shadow-sm transition hover:bg-slate-50"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export Excel
            </button>

            <button
              type="button"
              onClick={() => toast("Cetak (prototype)")}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-[13px] font-semibold text-[#001b4e] shadow-sm transition hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" />
              Cetak
            </button>
          </div>
        </div>

        <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,742px)_minmax(360px,1fr)]">
          <Card className="rounded-[5px] border-0 bg-transparent p-0 shadow-none">
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

              <FormRow label="File KTP Anggota">
                <FilterSelect
                  value={ktpStatus}
                  onChange={(value) => setKtpStatus(value as KtpStatus)}
                  placeholder="Semua"
                >
                  <SelectItem value="Semua">Semua</SelectItem>
                  <SelectItem value="Tersedia">Sudah Tersedia</SelectItem>
                  <SelectItem value="Belum Tersedia">Belum Tersedia</SelectItem>
                </FilterSelect>
              </FormRow>

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
          </Card>

          <section className="rounded-[5px] border border-[#0EA5E9] bg-white px-5 py-4 text-[#0098CD]">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0EA5C6] text-white">
                <Info className="h-4 w-4" />
              </span>

              <div className="min-w-0">
                <h2 className="text-[14px] font-extrabold leading-snug">
                  Fitur Penyesuaian Laporan
                </h2>
                <p className="mt-2 max-w-[440px] text-[13px] font-normal leading-relaxed">
                  Anda dapat melakukan kustomisasi tampilan laporan (pengaturan
                  kolom dan urutan data) pada laporan ini dengan menggunakan fitur
                  penyesuaian laporan. Silahkan klik menu Penyesuaian Laporan
                  untuk dapat melakukan pengaturan.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    toast("Pilih Laporan (prototype)", {
                      description: "Menu penyesuaian laporan belum dihubungkan.",
                    })
                  }
                  className="mt-5 inline-flex h-[42px] items-center gap-2 rounded-[5px] bg-[#7C3AED] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6D28D9]"
                >
                  Pilih Laporan
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        </div>

        {searched ? (
          <Card className="mt-7 rounded-[5px] border-slate-200/70 bg-white p-4 shadow-sm">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-left text-[11px] font-bold uppercase tracking-wide text-[#002060]">
                    <th className="px-3 py-3">No.</th>
                    <th className="px-3 py-3">No. Anggota</th>
                    <th className="px-3 py-3">Nama</th>
                    <th className="px-3 py-3">Tanggal Daftar</th>
                    <th className="px-3 py-3">Produk</th>
                    <th className="px-3 py-3 text-right">Saldo</th>
                    <th className="px-3 py-3">KTP</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length ? (
                    filteredMembers.map((member, index) => (
                      <tr
                        key={member.id}
                        className={cn(
                          "border-b border-slate-200 text-[12px] text-[#002060]",
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                        )}
                      >
                        <td className="px-3 py-2.5">{index + 1}</td>
                        <td className="px-3 py-2.5 font-semibold">{member.id}</td>
                        <td className="px-3 py-2.5">{member.name}</td>
                        <td className="px-3 py-2.5">{member.registeredAt}</td>
                        <td className="px-3 py-2.5">{member.product}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums">
                          {member.balance.toLocaleString("id-ID")},00
                        </td>
                        <td className="px-3 py-2.5">{member.ktpStatus}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-[13px] text-slate-500"
                      >
                        Anggota tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}