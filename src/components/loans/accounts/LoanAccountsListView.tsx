import { Separator } from "@/components/ui/separator";
import LoanAccountsTable from "./LoanAccountsTable";
import { useLoanAccountsList } from "./useLoanAccountsList";

export default function LoanAccountsListView({
  onSelectAccount,
}: {
  onSelectAccount: (accountNo: string) => void;
}) {
  const list = useLoanAccountsList();

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              Rekening Pinjaman
            </h1>
            <div className="text-sm font-semibold text-slate-500">Daftar</div>
          </div>
        </div>
      </div>

      <Separator className="my-6 bg-slate-200/70" />

      <LoanAccountsTable
        rows={list.rows}
        paged={list.paged}
        filters={list.filters}
        filterHandlers={list.filterHandlers}
        productOptions={list.productOptions}
        pageSize={list.pageSize}
        page={list.page}
        pageCount={list.pageCount}
        showingStart={list.showingStart}
        showingEnd={list.showingEnd}
        filteredCount={list.filtered.length}
        onPageSizeChange={list.setPageSize}
        onPage={list.setPage}
        onSelectAccount={onSelectAccount}
      />
    </div>
  );
}
