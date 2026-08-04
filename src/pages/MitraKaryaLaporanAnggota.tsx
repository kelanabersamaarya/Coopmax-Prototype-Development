import * as React from "react";
import { Search, UsersRound, X } from "lucide-react";
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

type Member = {
  id: string;
  name: string;
  category: "Anggota" | "Calon Anggota";
  status: "Aktif" | "Nonaktif";
  product: string;
  region: string;
  tag: string;
  joined: string;
  balance: number;
};

const members: Member[] = [
  {
    id: "MKM-001",
    name: "I Made Suryana",
    category: "Anggota",
    status: "Aktif",
    product: "Simpanan Anggota",
    region: "Denpasar",
    tag: "Prioritas",
    joined: "10-01-2024",
    balance: 2500000,
  },
  {
    id: "MKM-002",
    name: "Ni Luh Kartika",
    category: "Anggota",
    status: "Aktif",
    product: "Simpanan Berjangka",
    region: "Gianyar",
    tag: "Reguler",
    joined: "18-03-2024",
    balance: 4500000,
  },
  {
    id: "MKM-003",
    name: "Komang Suardika",
    category: "Calon Anggota",
    status: "Nonaktif",
    product: "Simpanan Anggota",
    region: "Badung",
    tag: "Baru",
    joined: "04-06-2024",
    balance: 750000,
  },
];

const fieldClassName =
  "h-[31px] rounded-[5px] border-slate-300 bg-white text-[14px] font-normal text-slate-900 shadow-none placeholder:text-[#7987b6] focus-visible:ring-0 focus-visible:ring-offset-0";

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[230px_minmax(0,1fr)] sm:items-center">
      <label className="text-[14px] font-normal text-[#002060]">{label}</label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function toDateValue(value: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!match) return null;

  const date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseAmount(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
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
  const [isSearched, setIsSearched] = React.useState(false);

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
      const matchesSearch =
        !searchValue ||
        member.id.toLowerCase().includes(searchValue) ||
        member.name.toLowerCase().includes(searchValue);
      const matchesCategory = category === "Semua" || member.category === category;
      const matchesStatus = status === "Semua" || member.status === status;
      const matchesProduct =
        !productValue || member.product.toLowerCase().includes(productValue);
      const matchesRegion =
        !regionValue || member.region.toLowerCase().includes(regionValue);
      const matchesTag = !tagValue || member.tag.toLowerCase().includes(tagValue);
      const matchesStart = !startDate || !joinedDate || joinedDate >= startDate;
      const matchesEnd = !endDate || !joinedDate || joinedDate <= endDate;
      const matchesMin =
        minimumBalance === null || member.balance >= minimumBalance;
      const matchesMax =
        maximumBalance === null || member.balance <= maximumBalance;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesProduct &&
        matchesRegion &&
        matchesTag &&
        matchesStart &&
        matchesEnd &&
        matchesMin &&
        matchesMax
      );
    });
  }, [
    balanceMax,
    balanceMin,
    category,
    nameOrNo,
    product,
    region,
    registeredEnd,
    registeredStart,
    status,
    tag,
  ]);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          Laporan Anggota
        </h1>

        <Card className="mt-6 max-w-[860px] rounded-[5px] border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
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
              <div className="grid grid-cols-2 gap-8">
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
                  <button
                    type="button"
                    onClick={() => setRegisteredEnd("")}
                    className="absolute right-0 top-0 inline-flex h-[31px] w-9 items-center justify-center rounded-r-[5px] bg-[#77839A] text-white transition hover:bg-[#6b768c]"
                    aria-label="Hapus tanggal akhir"
                  >
                    <X className="h-4 w-4" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </FieldRow>

            <FieldRow label="Kategori">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className={fieldClassName}>
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
                <SelectTrigger className={fieldClassName}>
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
                <button
                  type="button"
                  onClick={() => setBalanceDate("")}
                  className="absolute right-0 top-0 inline-flex h-[31px] w-9 items-center justify-center rounded-r-[5px] bg-[#77839A] text-white transition hover:bg-[#6b768c]"
                  aria-label="Hapus tanggal saldo"
                >
                  <X className="h-4 w-4" strokeWidth={3} />
                </button>
              </div>
            </FieldRow>

            <FieldRow label="Saldo Simpanan">
              <div className="grid grid-cols-2 gap-8">
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
                <SelectTrigger className={fieldClassName}>
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

            <div className="grid sm:grid-cols-[230px_minmax(0,1fr)]">
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
        </Card>

        {isSearched ? (
          <Card className="mt-5 rounded-3xl border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <UsersRound className="h-5 w-5" />
              </span>
              Total anggota: {filtered.length}
            </div>

            <div className="mt-5 safe-x-scroll overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead className="bg-slate-50 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-4 py-3">No.</th>
                    <th className="px-4 py-3">ID Anggota</th>
                    <th className="px-4 py-3">Nama Anggota</th>
                    <th className="px-4 py-3">Produk</th>
                    <th className="px-4 py-3">Wilayah</th>
                    <th className="px-4 py-3">Saldo Simpanan</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((member, index) => (
                    <tr key={member.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 tabular-nums">{index + 1}</td>
                      <td className="px-4 py-3 font-semibold text-violet-700">
                        {member.id}
                      </td>
                      <td className="px-4 py-3 font-medium">{member.name}</td>
                      <td className="px-4 py-3">{member.product}</td>
                      <td className="px-4 py-3">{member.region}</td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {member.balance.toLocaleString("id-ID")},00
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-3 py-1 text-xs font-bold text-white",
                            member.status === "Aktif"
                              ? "bg-emerald-600"
                              : "bg-slate-500",
                          )}
                        >
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                        Anggota tidak ditemukan.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </Card>
        ) : null}

        <div className="sr-only">{balanceDate}</div>
      </div>
    </div>
  );
}