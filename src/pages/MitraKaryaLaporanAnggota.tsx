import * as React from "react";
import { Search, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const members = [
  { id: "MKM-001", name: "I Made Suryana", status: "Aktif", joined: "10-01-2024" },
  { id: "MKM-002", name: "Ni Luh Kartika", status: "Aktif", joined: "18-03-2024" },
  { id: "MKM-003", name: "Komang Suardika", status: "Nonaktif", joined: "04-06-2024" },
];

export default function MitraKaryaLaporanAnggota() {
  const [query, setQuery] = React.useState("");

  const filtered = members.filter((member) => {
    const value = query.trim().toLowerCase();
    return (
      !value ||
      member.name.toLowerCase().includes(value) ||
      member.id.toLowerCase().includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          Laporan Anggota
        </h1>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <UsersRound className="h-5 w-5" />
              </span>
              Total anggota: {filtered.length}
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari nama atau ID anggota"
                className="h-10 rounded-xl border-slate-200 pl-9 text-sm"
              />
            </div>
          </div>

          <div className="mt-5 safe-x-scroll overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full min-w-[620px] border-collapse text-sm">
              <thead className="bg-slate-50 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-3">No.</th>
                  <th className="px-4 py-3">ID Anggota</th>
                  <th className="px-4 py-3">Nama Anggota</th>
                  <th className="px-4 py-3">Tanggal Bergabung</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member, index) => (
                  <tr key={member.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 tabular-nums">{index + 1}</td>
                    <td className="px-4 py-3 font-semibold text-violet-700">{member.id}</td>
                    <td className="px-4 py-3 font-medium">{member.name}</td>
                    <td className="px-4 py-3 tabular-nums">{member.joined}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-bold text-white",
                          member.status === "Aktif" ? "bg-emerald-600" : "bg-slate-500",
                        )}
                      >
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                      Anggota tidak ditemukan.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}