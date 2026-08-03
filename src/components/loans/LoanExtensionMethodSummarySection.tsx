import { cn } from "@/lib/utils";

type ExtensionMethod =
  | "Tenor Tambahan"
  | "Tenor Baru"
  | "Jatuh Tempo Akhir Baru";

export default function LoanExtensionMethodSummarySection({
  method,
  additionalTenor,
  newTenor,
  newDueDate,
}: {
  method: ExtensionMethod;
  additionalTenor: string;
  newTenor: number;
  newDueDate: string;
}) {
  const methodValue =
    method === "Tenor Tambahan"
      ? `${additionalTenor} Bulan`
      : method === "Tenor Baru"
        ? `${newTenor} Bulan`
        : newDueDate;

  const detailLabel =
    method === "Tenor Tambahan"
      ? "Tenor Tambahan"
      : method === "Tenor Baru"
        ? "Tenor Baru"
        : "Jatuh Tempo Akhir Baru";

  return (
    <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Metode Perpanjangan
      </div>

      <div className="grid gap-4 px-4 py-4 text-[14px] sm:grid-cols-2">
        <div>
          <div className="text-[12px] font-semibold text-slate-500">
            Metode Dipilih
          </div>
          <div className="mt-1 font-extrabold text-slate-900">{method}</div>
        </div>

        <div className="sm:text-right">
          <div className="text-[12px] font-semibold text-slate-500">
            {detailLabel}
          </div>
          <div className={cn("mt-1 font-extrabold text-[#2563EB]")}>
            {methodValue}
          </div>
        </div>

        <div>
          <div className="text-[12px] font-semibold text-slate-500">
            Total Tenor Setelah Perpanjangan
          </div>
          <div className="mt-1 font-extrabold text-slate-900">
            {newTenor} Bulan
          </div>
        </div>

        <div className="sm:text-right">
          <div className="text-[12px] font-semibold text-slate-500">
            Jatuh Tempo Akhir Baru
          </div>
          <div className="mt-1 font-extrabold text-[#2563EB]">
            {newDueDate}
          </div>
        </div>
      </div>
    </section>
  );
}