import { cn } from "@/lib/utils";

export default function LoanAccountsPaginationBar({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  if (pageCount <= 1) {
    return (
      <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
        <button
          type="button"
          disabled
          className="h-10 px-4 text-[14px] font-medium text-slate-400"
        >
          Sebelumnya
        </button>
        <div className="grid h-10 w-10 place-items-center bg-violet-600 text-[14px] font-semibold text-white">
          1
        </div>
        <button
          type="button"
          disabled
          className="h-10 px-4 text-[14px] font-medium text-slate-400"
        >
          Selanjutnya
        </button>
      </div>
    );
  }

  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  const btnBase =
    "h-10 px-4 text-[14px] font-medium transition disabled:text-slate-400";

  return (
    <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
      <button
        type="button"
        className={cn(btnBase, "text-slate-500 hover:bg-slate-200")}
        disabled={prevDisabled}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

      <button
        type="button"
        className="h-10 w-10 bg-violet-600 text-[14px] font-semibold text-white"
        onClick={() => onPage(page)}
        aria-current="page"
      >
        {page}
      </button>

      <button
        type="button"
        className={cn(btnBase, "text-slate-500 hover:bg-slate-200")}
        disabled={nextDisabled}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}
