import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoanProducts from "./pages/LoanProducts";
import NewLoan from "./pages/NewLoan";
import LoanProductCreate from "./pages/LoanProductCreate";
import LoanProductEdit from "./pages/LoanProductEdit";
import LoanProductDetail from "./pages/LoanProductDetail";
import AnggotaTransaksi from "./pages/AnggotaTransaksi";
import LoanApplications from "./pages/LoanApplications";
import LoanApplicationCreate from "./pages/LoanApplicationCreate";
import Dashboard from "./pages/Dashboard";
import RekeningPinjaman from "./pages/RekeningPinjaman";
import LaporanKolektibilitas from "./pages/LaporanKolektibilitas";
import LoanAccountEdit from "./pages/LoanAccountEdit";
import LoanTransactions from "./pages/LoanTransactions";
import LoanInstallmentPayment from "./pages/LoanInstallmentPayment";
import LoanInstallmentPaymentV2 from "./pages/LoanInstallmentPaymentV2";
import LoanPemutihanDaftar from "./pages/LoanPemutihanDaftar";
import TransaksiPinjamanDetail from "./pages/TransaksiPinjamanDetail";
import ObsSamudraHarta from "./pages/ObsSamudraHarta";
import ObsSamudraHartaDetail from "./pages/ObsSamudraHartaDetail";
import ObsWeb from "./pages/ObsWeb";
import LaporanPinjaman from "./pages/LaporanPinjaman";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner
        position="top-right"
        offset={{ top: 20, right: 32, left: 16, bottom: 16 }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="obs-samudra-harta" element={<ObsSamudraHarta />} />
            <Route path="obs-samudra-harta/:id" element={<ObsSamudraHartaDetail />} />
            <Route path="obs-web" element={<ObsWeb />} />
            <Route path="loan-products" element={<LoanProducts />} />
            <Route path="loan-products/new" element={<LoanProductCreate />} />
            <Route path="loan-products/:id" element={<LoanProductDetail />} />
            <Route path="loan-products/:id/edit" element={<LoanProductEdit />} />
            <Route path="loans/new" element={<NewLoan />} />
            <Route path="loans/applications" element={<LoanApplications />} />
            <Route path="loans/accounts" element={<RekeningPinjaman />} />
            <Route
              path="loans/accounts/:accountNo/edit"
              element={<LoanAccountEdit />}
            />
            <Route path="loans/transactions" element={<LoanTransactions />} />
            <Route
              path="loans/transactions/:trxNo"
              element={<TransaksiPinjamanDetail />}
            />
            <Route path="loans/pemutihan" element={<LoanPemutihanDaftar />} />
            <Route
              path="loans/transactions/installment-payment"
              element={<LoanInstallmentPayment />}
            />
            <Route
              path="loans/transactions/installment-payment-v2"
              element={<LoanInstallmentPaymentV2 />}
            />
            <Route
              path="loans/applications/new"
              element={<LoanApplicationCreate />}
            />
            <Route path="anggota/transaksi" element={<AnggotaTransaksi />} />
            <Route
              path="laporan/kolektibilitas"
              element={<LaporanKolektibilitas />}
            />
            <Route path="laporan/pinjaman" element={<LaporanPinjaman />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;