import { Trash2 } from "lucide-react";

type SpecialAccessUser = {
  name: string;
  status: string;
  date: string;
  start: string;
  end: string;
};

type Props = {
  users: SpecialAccessUser[];
  onDelete: (user: SpecialAccessUser) => void;
};

export function OperationalSpecialAccessTable({ users, onDelete }: Props) {
  return (
    <div className="border-b border-[#D7DEE9] p-2.5">
      <div className="overflow-x-auto rounded-[5px] border border-[#D1DCEB]">
        <table className="w-full min-w-[1120px] table-fixed border-collapse text-left text-[12px] text-[#003477]">
          <colgroup>
            <col className="w-[5%]" />
            <col className="w-[18%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[22%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead>
            <tr className="h-[44px] border-b border-[#D1DCEB] bg-white">
              {[
                "NO.",
                "USER DENGAN AKSES KHUSUS",
                "TANGGAL DAN WAKTU MULAI AKSES KHUSUS",
                "TANGGAL DAN WAKTU SELESAI AKSES KHUSUS",
                "ALASAN PEMBERIAN AKSES KHUSUS",
                "AKSI",
              ].map((heading) => (
                <th key={heading} className="border-r border-[#D1DCEB] px-3 py-3 font-bold last:border-r-0">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={`${user.name}-${index}`} className="h-[58px] border-b border-[#D1DCEB] last:border-b-0">
                <td className="border-r border-[#D1DCEB] px-3 py-3 align-middle">{index + 1}</td>
                <td className="border-r border-[#D1DCEB] px-3 py-3 align-middle">{user.name}</td>
                <td className="border-r border-[#D1DCEB] px-3 py-3 align-middle">{user.date} · {user.start}</td>
                <td className="border-r border-[#D1DCEB] px-3 py-3 align-middle">{user.date} · {user.end}</td>
                <td className="border-r border-[#D1DCEB] px-3 py-3 align-middle">Kebutuhan operasional</td>
                <td className="px-3 py-3 align-middle">
                  <button type="button" onClick={() => onDelete(user)} className="inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-[5px] bg-[#dc3545] px-3 text-[12px] font-bold text-white transition-colors hover:bg-[#bb2d3b]">
                    <Trash2 className="h-3.5 w-3.5" />
                    Hapus Akses
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
