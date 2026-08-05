import * as React from "react";
import {
  ChevronDown,
  Eye,
  FileSpreadsheet,
  FileText,
  Printer,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import KtpPhotoDialog from "@/components/mitra-karya/KtpPhotoDialog";
import "../styles/mitra-karya-member-report.css";

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
        <ChevronDown className="h-3.5 w-3.5 text-slate-900/80" />
      ) : null}
    </div>
  );
}

function KtpBadge({ status }: { status: KtpStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-[4px] px-2 py-1 text-[10px] font-bold leading-none text-white",
        status === "Tersedia" ? "bg-[#27ae00]" : "bg-[#dc3545]",
      )}
    >
      {status}
    </span>
  );
}

export default function MitraKaryaLaporanAnggota() {
  const [selectedKtpMember, setSelectedKtpMember] =
    React.useState<Member | null>(null);

  const actionClassName = cn(
    "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4",
    "text-[13px] font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50",
  );

  const th = "px-3 py-3";
  const td = "px-3 py-2.5";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <KtpPhotoDialog
        open={selectedKtpMember !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedKtpMember(null);
        }}
        memberName={selectedKtpMember?.name ?? ""}
        memberId={selectedKtpMember?.id ?? ""}
        hasKtpPhoto={selectedKtpMember?.ktpStatus === "Tersedia"}
      />

      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Anggota
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                toast.success("Export Laporan Rekapitulasi KTP (prototype)", {
                  description: `${members.length} data rekapitulasi KTP siap diekspor.`,
                })
              }
              className={actionClassName}
            >
              <FileText className="h-4 w-4 text-slate-600" />
              Export Laporan Rekapitulasi KTP
            </button>

            <button
              type="button"
              onClick={() =>
                toast.success("Export Excel (prototype)", {
                  description: `${members.length} data anggota siap diekspor.`,
                })
              }
              className={actionClassName}
            >
              <FileSpreadsheet className="h-4 w-4 text-slate-600" />
              Export Excel
            </button>

            <button
              type="button"
              onClick={() =>
                toast("Cetak (prototype)", {
                  description: "Laporan anggota siap dicetak.",
                })
              }
              className={actionClassName}
            >
              <Printer className="h-4 w-4 text-slate-600" />
              Cetak
            </button>
          </div>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="mitra-karya-member-report">
            <table className="w-full min-w-[1080px]">
              <thead>
                <tr>
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
                  <th className={cn("w-[70px]", th)}>
                    <HeaderLabel sortable={false}>Aksi</HeaderLabel>
                  </th>
                </tr>
              </thead>

              <tbody>
                {members.map((member, index) => (
                  <tr key={member.id}>
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
                    <td className={cn(td, "text-center")}>
                      <button
                        type="button"
                        onClick={() => setSelectedKtpMember(member)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] text-[#3366ff] transition hover:bg-blue-50"
                        aria-label={`Lihat foto KTP ${member.name}`}
                        title="Lihat foto KTP"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-[13px] text-slate-600">
            Menampilkan {members.length} dari {members.length} entri
          </div>
        </Card>
      </div>
    </div>
  );
}