import * as React from "react";
import { useLocation } from "react-router-dom";
import LoanAccountDetailView from "@/components/loans/accounts/LoanAccountDetailView";
import LoanAccountsListView from "@/components/loans/accounts/LoanAccountsListView";

export default function RekeningPinjaman() {
  const location = useLocation();
  const [selectedAccountNo, setSelectedAccountNo] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const state = location.state as { selectedAccountNo?: string } | null;
    if (state?.selectedAccountNo) {
      setSelectedAccountNo(state.selectedAccountNo);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        {selectedAccountNo ? (
          <LoanAccountDetailView
            accountNo={selectedAccountNo}
            onBack={() => setSelectedAccountNo(null)}
          />
        ) : (
          <LoanAccountsListView onSelectAccount={setSelectedAccountNo} />
        )}
      </div>
    </div>
  );
}
