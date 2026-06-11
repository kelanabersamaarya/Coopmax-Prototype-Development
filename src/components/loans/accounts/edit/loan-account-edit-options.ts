export const UI = {
  radius: "rounded-[5px]",
  h: "h-[30px]",
  text: "text-[12.5px]",
  gapY: "gap-[15px]",
  input:
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] !placeholder:text-[#64748B]",
  selectTrigger:
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] [&_[data-placeholder]]:text-slate-500",
  btn: "h-[30px] rounded-[5px] text-[12.5px]",
  sectionTitle: "text-[16px] font-semibold tracking-tight text-slate-900",
} as const;

export const loanProductOptions = [
  "Pinjaman Koperasi",
  "Pinjaman RC",
  "PINJAMAN EMAS",
  "Pinjaman Billing",
  "PINJAMAN BILLING - BARU",
  "PINJAMAN BULANAN TETAP",
] as const;

export const RECURRING_TT =
  "Aktifkan Agar Denda Dihitung Secara Berulang dan Terus Bertambah Hingga Tagihan Dilunasi";
