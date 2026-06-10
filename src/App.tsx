import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MobileAwareToaster from "./components/MobileAwareToaster";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoanProducts = lazy(() => import("./pages/LoanProducts"));
const NewLoan = lazy(() => import("./pages/NewLoan"));
const LoanProductCreate = lazy(() => import("./pages/LoanProductCreate"));
const LoanProductEdit = lazy(() => import("./pages/LoanProductEdit"));
const LoanProductDetail = lazy(() => import("./pages/LoanProductDetail"));
const LoanProductsCabang = lazy(() => import("./pages/LoanProductsCabang"));
const AnggotaTransaksi = lazy(() => import("./pages/AnggotaTransaksi"));
const LoanApplications = lazy(() => import("./pages/LoanApplications"));
const LoanApplicationCreate = lazy(() => import("./pages/LoanApplicationCreate"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const RekeningPinjaman = lazy(() => import("./pages/RekeningPinjaman"));
const LaporanKolektibilitas = lazy(() => import("./pages/LaporanKolektibilitas"));
const LoanAccountEdit = lazy(() => import("./pages/LoanAccountEdit"));
const LoanTransactions = lazy(() => import("./pages/LoanTransactions"));
const LoanInstallmentPayment = lazy(() => import("./pages/LoanInstallmentPayment"));
const LoanInstallmentPaymentV2 = lazy(
  () => import("./pages/LoanInstallmentPaymentV2"),
);
const LoanPemutihanDaftar = lazy(() => import("./pages/LoanPemutihanDaftar"));
const TransaksiPinjamanDetail = lazy(
  () => import("./pages/TransaksiPinjamanDetail"),
);
const ObsSamudraHarta = lazy(() => import("./pages/ObsSamudraHarta"));
const ObsSamudraHartaDetail = lazy(() => import("./pages/ObsSamudraHartaDetail"));
const ObsWeb = lazy(() => import("./pages/ObsWeb"));
const LaporanPinjaman = lazy(() => import("./pages/LaporanPinjaman"));
const LaporanDetailPinjaman = lazy(() => import("./pages/LaporanDetailPinjaman"));
const LaporanPortofolioPinjamanCabang = lazy(
  () => import("./pages/LaporanPortofolioPinjamanCabang"),
);
const LaporanProduktivitas = lazy(() => import("./pages/LaporanProduktivitas"));
const LaporanProduktivitasCabang = lazy(
  () => import("./pages/LaporanProduktivitasCabang"),
);
const PengaturanUmum = lazy(() => import("./pages/PengaturanUmum"));
const MobileEKolektor = lazy(() => import("./pages/MobileEKolektor"));
const MobileMBanking = lazy(() => import("./pages/MobileMBanking"));

const queryClient = new QueryClient();

const routeFallback = (
  <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--app-bg))] px-4">
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 shadow-sm">
      Memuat halaman...
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <MobileAwareToaster />
        <Suspense fallback={routeFallback}>
          <Routes>
            <Route path="/" element={<Index />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="pengaturan-umum" element={<PengaturanUmum />} />
              <Route path="mobile/e-kolektor" element={<MobileEKolektor />} />
              <Route path="mobile/m-banking" element={<MobileMBanking />} />
              <Route path="obs-samudra-harta" element={<ObsSamudraHarta />} />
              <Route
                path="obs-samudra-harta/:id"
                element={<ObsSamudraHartaDetail />}
              />
              <Route path="obs-web" element={<ObsWeb />} />
              <Route path="loan-products" element={<LoanProducts />} />
              <Route path="loan-products/cabang" element={<LoanProductsCabang />} />
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
              <Route
                path="laporan/detail-pinjaman"
                element={
                  <Navigate
                    to="/laporan/portofolio-pinjaman-konsolidasi"
                    replace
                  />
                }
              />
              <Route
                path="laporan/portofolio-pinjaman-konsolidasi"
                element={<LaporanDetailPinjaman />}
              />
              <Route
                path="laporan/portofolio-pinjaman-cabang"
                element={<LaporanPortofolioPinjamanCabang />}
              />
              <Route
                path="laporan/produktivitas"
                element={<LaporanProduktivitas />}
              />
              <Route
                path="laporan/produktivitas-cabang"
                element={<LaporanProduktivitasCabang />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;