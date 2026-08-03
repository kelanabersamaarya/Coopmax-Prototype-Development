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
  const detail =
    method === "Tenor Tambahan"
      ? {
          label: "Tenor Tambahan",
          value: `${additionalTenor} Bulan`,
        }
      : method === "Tenor Baru"
        ? {
            label: "Tenor Baru",
            value: `${newTenor} Bulan`,
          }
        : {
            label: "Jatuh Tempo Akhir Baru",
            value: newDueDate,
          };

  return (
    <section className="rounded-[12px] border border-slate-200 bg-white px-4 py-4">
      <div className="text-[12px] font-semibold text-slate-500">
        {detail.label}
      </div>
      <div className="mt-1 text-[14px] font-extrabold text-[#2563EB]">
        {detail.value}
      </div>
    </section>
  );
}