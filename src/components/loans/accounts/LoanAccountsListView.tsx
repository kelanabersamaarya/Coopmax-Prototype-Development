import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoanAccountsTable from "./LoanAccountsTable";
import { useLoanAccountsList } from "./useLoanAccountsList";

export default function LoanAccountsListView({
  onSelectAccount,
  createPath = "/loans/applications/new",
}: {
  onSelectAccount: (accountNo: string) => void;
  createPath?: string;
}) {
  const navigate = useNavigate();
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
        <Button
          type="button"
          onClick={() => navigate(createPath)}
          className="h-10 rounded-full bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Buat Pinjaman Baru
        </Button>
      </div>

      <div className="mt-8">
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
    </div>
  );
}
