export default function LoanAccountsPaginationBar({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;
  const buttonClass =
    "h-9 rounded-none bg-[#f0f2f6] px-3 text-[13px] font-normal text-slate-500 transition hover:bg-slate-200 disabled:text-slate-300 disabled:hover:bg-[#f0f2f6]";

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={prevDisabled}
        className={buttonClass}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>
      <button
        type="button"
        disabled={nextDisabled}
        className={buttonClass}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}
