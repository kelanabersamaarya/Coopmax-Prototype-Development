import { Bell, ChevronDown, Menu, Users, UserRound } from "lucide-react";

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
        <div className="flex shrink-0 items-center" aria-label="Coopmax">
          <img
            src="/coopmaxlogo.png"
            alt="Coopmax"
            className="h-9 w-auto max-w-[154px] object-contain"
          />
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

      <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center">
        <img
          src="/publiccoopmax-logo.png.png"
          alt="Coopmax"
          className="h-7 w-auto max-w-[34px] object-contain md:h-8 md:max-w-[40px]"
        />
        <h1 className="truncate px-1 text-[15px] font-semibold tracking-[0.01em] text-[#092653] md:text-[20px]">
          KOPERASI DJOIN
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
        <button type="button" className="hidden rounded-lg p-2 transition hover:bg-blue-50 md:inline-flex" aria-label="Dropbox">
          <img
            src="/akar-icons_dropbox-fill.svg"
            alt="Dropbox"
            className="h-5 w-5 object-contain"
          />
        </button>
        <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d65b7] text-white ring-2 ring-blue-100" aria-label="Profil">
          <UserRound className="h-5 w-5" strokeWidth={1.6} />
        </button>
        <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
      </div>
    </header>
  );
}
