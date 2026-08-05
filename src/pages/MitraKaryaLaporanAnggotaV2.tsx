import * as React from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
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

type Category = "Anggota" | "Calon Anggota";
type KtpStatus = "Tersedia" | "Belum Tersedia";

type Member = {
  id: string;
  name: string;
  registeredAt: string;
  category: Category;
  ktpStatus: KtpStatus;
  phone: string;
  address: string;
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
  },
  {
    id: "A2300002",
    name: "Jatmiko Wacana",
    registeredAt: "28-03-2023",
    category: "Anggota",
    ktpStatus: "Belum Tersedia",
    phone: "028 4560 3652",
    address: "Jl. Raya Sibang",
  },
  {
    id: "A2300003",
    name: "Laksana Hidayanto",
    registeredAt: "20-04-2023",
    category: "Anggota",
    ktpStatus: "Tersedia",
    phone: "0478 5431 649",
    address: "Denpasar",
  },
  {
    id: "A2300004",
    name: "Zulaikha Mulyani",
    registeredAt: "21-04-2023",
    category: "Anggota",
    ktpStatus: "Belum Tersedia",
    phone: "0837 6686 458",
    address: "Jln. Wijaya Kusuma No. 11A",
  },
  {
    id: "A2300005",
    name: "Nasrullah Banafi Mustofa M.M",
    registeredAt: "21-04-2023",
    category: "Anggota",
    ktpStatus: "Tersedia",
    phone: "(+62) 800 773 744",
    address: "Denpasar",
  },
  {
    id: "C2600001",
    name: "Kadek Putra Wijaya",
    registeredAt: "07-01-2026",
    category: "Calon Anggota",
    ktpStatus: "Belum Tersedia",
    phone: "0812 3456 7890",
    address: "Gianyar",
  },
];

function HeaderLabel({
  children,
  sortable = true,
}: {
  children: React.ReactNode;
  sortable?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="leading-[1.05]">{children}</span>
      {sortable ? (
        <span className="inline-flex flex-col leading-none text-slate-900/80">
          <ChevronUp className="-mb-0.5 h-3.5 w-3.5" />
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </div>
  );
}

function KtpBadge({ status }: { status: KtpStatus }) {
  const available = status === "Tersedia";

  return (
    <span
      className={cn(
        "inline-flex rounded-[4px] px-2 py-1 text-[10px] font-bold leading-none text-white",
        available ? "bg-[#27ae00]" : "bg-[#dc3545]",
      )}
    >
      {status}
    </span>
  );
}

export default function MitraKaryaLaporanAnggotaV2() {
  const [name, setName] = React.useState("");
  const [registeredAt, setRegisteredAt] = React.useState("");
  const [category, setCategory] = React.useState("Semua");
  const [ktpStatus, setKtpStatus] = React.useState("Semua");
  const [searched, setSearched] = React.useState(false);

  const filteredMembers = React.useMemo(() => {
    const nameQuery = name.trim().toLowerCase();
    const dateQuery = registeredAt.trim().toLowerCase();

    return members.filter((member) => {
      const matchesName = nameQuery
        ? member.name.toLowerCase().includes(nameQuery)
        : true;
      const matchesDate = dateQuery
        ? member.registeredAt.toLowerCase().includes(dateQuery)
        : true;
      const matchesCategory =
        category === "Semua" || member.category === category;
      const matchesKtp = ktpStatus === "Semua" || member.ktpStatus === ktpStatus;

      return matchesName && matchesDate && matchesCategory && matchesKtp;
    });
  }, [category, ktpStatus, name, registeredAt]);

  const fieldClassName =
    "h-[31px] rounded-[5px] border-slate-300 bg-white text-[14px] font-normal text-slate-900 shadow-none placeholder:!text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0";

  const th = "px-3 py-3";
  const td = "px-3 py-2.5";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          Laporan Anggota
        </h1>

        <Card className="mt-6 w-full max-w-[720px] rounded-[5px] border-0 bg-transparent p-0 shadow-none">
          <div className="grid gap-[15px]">
            <div className="grid gap-2 sm:grid-cols-[165px_minmax(0,1fr)] sm:items-center">
              <label className="text-[14px] font-normal text-[#002060]">
                Nama
              </label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Masukkan nama anggota"
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-[165px_minmax(0,1fr)] sm:items-center">
              <label className="text-[14px] font-normal text-[#002060]">
                Tanggal Daftar
              </label>
              <Input
                value={registeredAt}
                onChange={(event) => setRegisteredAt(event.target.value)}
                placeholder="DD-MM-YYYY"
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-[165px_minmax(0,1fr)] sm:items-center">
              <label className="text-[14px] font-normal text-[#002060]">
                Kategori
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className={fieldClassName}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[5px] border-slate-200">
                  <SelectItem value="Semua">Semua</SelectItem>
                  <SelectItem value="Anggota">Anggota</SelectItem>
                  <SelectItem value="Calon Anggota">Calon Anggota</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 sm:grid-cols-[165px_minmax(0,1fr)] sm:items-center">
              <label className="text-[14px] font-normal text-[#002060]">
                Status File KTP
              </label>
              <Select value={ktpStatus} onValueChange={setKtpStatus}>
                <SelectTrigger className={fieldClassName}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[5px] border-slate-200">
                  <SelectItem value="Semua">Semua</SelectItem>
                  <SelectItem value="Tersedia">Sudah Tersedia</SelectItem>
                  <SelectItem value="Belum Tersedia">Belum Tersedia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid sm:grid-cols-[165px_minmax(0,1fr)]">
              <div />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSearched(true)}
                  className="inline-flex h-[31px] items-center justify-center gap-1.5 rounded-[5px] bg-[#3BB001] px-4 text-[14px] font-semibold text-white transition hover:bg-[#349d01]"
                >
                  <Search className="h-4 w-4" strokeWidth={3} />
                  Cari
                </button>
              </div>
            </div>
          </div>
        </Card>

        {searched ? (
          <Card className="mt-5 rounded-3xl border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-300/70 text-left text-[11px] font-extrabold uppercase tracking-wide text-[#002060]">
                    <th className={cn("w-[60px]", th)}>
                      <HeaderLabel sortable={false}>No.</HeaderLabel>
                    </th>
                    <th className={cn("w-[130px]", th)}>
                      <HeaderLabel>No. Anggota</HeaderLabel>
                    </th>
                    <th className={cn("w-[200px]", th)}>
                      <HeaderLabel>Nama</HeaderLabel>
                    </th>
                    <th className={cn("w-[130px]", th)}>
                      <HeaderLabel>
                        <span className="block">Tanggal</span>
                        <span className="block">Daftar</span>
                      </HeaderLabel>
                    </th>
                    <th className={cn("w-[150px]", th)}>
                      <HeaderLabel>Kategori</HeaderLabel>
                    </th>
                    <th className={cn("w-[140px]", th)}>
                      <HeaderLabel>
                        <span className="block">Status File</span>
                        <span className="block">KTP</span>
                      </HeaderLabel>
                    </th>
                    <th className={cn("w-[150px]", th)}>
                      <HeaderLabel>No. Handphone</HeaderLabel>
                    </th>
                    <th className={cn("min-w-[220px]", th)}>
                      <HeaderLabel>Alamat</HeaderLabel>
                    </th>
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
                        <td className={cn(td, "tabular-nums")}>{index + 1}</td>
                        <td className={cn(td, "font-semibold")}>{member.id}</td>
                        <td className={td}>{member.name}</td>
                        <td className={cn(td, "tabular-nums")}>
                          {member.registeredAt}
                        </td>
                        <td className={td}>{member.category}</td>
                        <td className={td}>
                          <KtpBadge status={member.ktpStatus} />
                        </td>
                        <td className={td}>{member.phone}</td>
                        <td className={td}>{member.address}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-10 text-center text-[13px] text-slate-500"
                      >
                        Anggota tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-[13px] text-slate-600">
              Menampilkan {filteredMembers.length} dari {members.length} entri
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}