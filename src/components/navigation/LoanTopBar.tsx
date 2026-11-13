import { Bell, ChevronDown, Grid2X2, Menu, Users, UserRound } from "lucide-react";

type LoanTopBarProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function LoanTopBar({
  sidebarOpen,
  onToggleSidebar,
}: LoanTopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-[62px] items-center border-b border-slate-200 bg-white px-4 shadow-[0_1px_8px_rgba(31,58,95,0.06)] md:px-7">
      <div className="flex min-w-0 flex-1 basis-0 items-center gap-2 md:gap-5">
        <div className="flex shrink-0 items-center gap-2.5" aria-label="Coopmax">
          <span className="relative block h-8 w-8" aria-hidden="true">
            <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-[#a735f4]" />
            <span className="absolute bottom-0 left-0 h-4 w-4 rounded-full bg-[#4f8cf7]" />
            <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-[#26c6da]" />
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-[#ef4da8]" />
          </span>
          <span className="text-[21px] font-bold tracking-[-0.04em] text-[#3289ed]">
            Coop<span className="text-[#ec4da8]">max</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#10294e] transition hover:bg-blue-50"
          aria-label={sidebarOpen ? "Sembunyikan menu" : "Tampilkan menu"}
          aria-expanded={sidebarOpen}
        >
          <Menu className="h-6 w-6" strokeWidth={1.8} />
        </button>
      </div>

      <div className="min-w-0 flex-1 text-center">
        <h1 className="truncate px-4 text-[15px] font-semibold tracking-[0.01em] text-[#092653] md:text-[20px]">
          KOPERASI KONSUMEN ARTHA SARI SEDANA
        </h1>
      </div>

      <div className="flex min-w-0 flex-1 basis-0 items-center justify-end gap-1 text-[#092653] md:gap-3">
        <button type="button" className="hidden rounded-lg p-2 transition hover:bg-blue-50 md:inline-flex" aria-label="Pengguna">
          <Users className="h-5 w-5" strokeWidth={1.8} />
        </button>
        <button type="button" className="relative rounded-lg p-2 transition hover:bg-blue-50" aria-label="Notifikasi anggota">
          <UserRound className="h-5 w-5" strokeWidth={1.8} />
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#da2f4c] px-1 text-[9px] font-bold text-white">13</span>
        </button>
        <button type="button" className="relative rounded-lg p-2 transition hover:bg-blue-50" aria-label="Notifikasi">
          <Bell className="h-5 w-5" strokeWidth={1.8} />
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#da2f4c] px-1 text-[9px] font-bold text-white">58</span>
        </button>
        <button type="button" className="hidden rounded-lg p-2 transition hover:bg-blue-50 md:inline-flex" aria-label="Aplikasi">
          <Grid2X2 className="h-5 w-5" strokeWidth={1.8} />
        </button>
        <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d65b7] text-white ring-2 ring-blue-100" aria-label="Profil">
          <UserRound className="h-5 w-5" strokeWidth={1.6} />
        </button>
        <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
      </div>
    </header>
  );
}
