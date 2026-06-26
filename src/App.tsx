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
import LoanProductsCabang from "./pages/LoanProductsCabang";
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
import LaporanDetailPinjaman from "./pages/LaporanDetailPinjaman";
import LaporanPortofolioPinjamanCabang from "./pages/LaporanPortofolioPinjamanCabang";
import LaporanProduktivitas from "./pages/LaporanProduktivitas";
import LaporanProduktivitasCabang from "./pages/LaporanProduktivitasCabang";
import PengaturanUmum from "./pages/PengaturanUmum";
import MobileEKolektor from "./pages/MobileEKolektor";
import MobileMBanking from "./pages/MobileMBanking";
import MobileAwareToaster from "./components/MobileAwareToaster";
import SavingsProductsListPage from "./components/savings/products/SavingsProductsListPage";
import TermSavingsProductsListPage from "./components/savings/term-products/TermSavingsProductsListPage";
import ProdukTabunganTambah from "./pages/ProdukTabunganTambah";
import ProdukDepositoTambah from "./pages/ProdukDepositoTambah";
import SavingsProductSaveConfirmGate from "./components/savings/products/SavingsProductSaveConfirmGate";
import SavingsProductCancelRouteGate from "./components/savings/products/SavingsProductCancelRouteGate";
import SakAkunting from "./pages/SakAkunting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <MobileAwareToaster />
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sak-ep-cabang/dashboard" element={<Dashboard />} />
            <Route
              path="sak-ep-cabang/akunting"
              element={<SakAkunting />}
            />
            <Route
              path="sak-ep-cabang/simpanan/produk-simpanan-cabang"
              element={
                <SavingsProductsListPage
                  title="Produk Simpanan Cabang"
                  editPath={(id) =>
                    `/sak-ep-cabang/simpanan/produk-simpanan-cabang/${id}/edit`
                  }
                />
              }
            />
            <Route
              path="sak-ep-cabang/simpanan/produk-simpanan-cabang/:id/edit"
              element={
                <SavingsProductSaveConfirmGate>
                  <SavingsProductCancelRouteGate to="/sak-ep-cabang/simpanan/produk-simpanan-cabang">
                    <div className="produk-tabungan-cabang-ubah-page">
                      <ProdukTabunganTambah />
                    </div>
                  </SavingsProductCancelRouteGate>
                </SavingsProductSaveConfirmGate>
              }
            />
            <Route
              path="sak-ep-cabang/simpanan/produk-simpanan-konsolidasi"
              element={
                <SavingsProductsListPage
                  title="Produk Simpanan Konsolidasi"
                  showCreateButton
                  createPath="/sak-ep-cabang/simpanan/produk-simpanan-konsolidasi/new"
                  editPath={(id) =>
                    `/sak-ep-cabang/simpanan/produk-simpanan-konsolidasi/${id}/edit`
                  }
                />
              }
            />
            <Route
              path="sak-ep-cabang/simpanan/produk-simpanan-konsolidasi/new"
              element={
                <SavingsProductSaveConfirmGate>
                  <ProdukTabunganTambah />
                </SavingsProductSaveConfirmGate>
              }
            />
            <Route
              path="sak-ep-cabang/simpanan/produk-simpanan-konsolidasi/:id/edit"
              element={
                <SavingsProductSaveConfirmGate>
                  <div className="produk-tabungan-ubah-page">
                    <ProdukTabunganTambah />
                  </div>
                </SavingsProductSaveConfirmGate>
              }
            />
            <Route
              path="sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-cabang"
              element={
                <TermSavingsProductsListPage
                  title="Produk Simpanan Berjangka Cabang"
                  editPath={(id) =>
                    `/sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-cabang/${id}/edit`
                  }
                />
              }
            />
            <Route
              path="sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-cabang/:id/edit"
              element={
                <SavingsProductSaveConfirmGate>
                  <SavingsProductCancelRouteGate to="/sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-cabang">
                    <div className="produk-deposito-cabang-ubah-page">
                      <ProdukDepositoTambah />
                    </div>
                  </SavingsProductCancelRouteGate>
                </SavingsProductSaveConfirmGate>
              }
            />
            <Route
              path="sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-konsolidasi"
              element={
                <TermSavingsProductsListPage
                  title="Produk Simpanan Berjangka Konsolidasi"
                  showCreateButton
                  createPath="/sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-konsolidasi/new"
                  editPath={(id) =>
                    `/sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-konsolidasi/${id}/edit`
                  }
                />
              }
            />
            <Route
              path="sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-konsolidasi/new"
              element={
                <SavingsProductSaveConfirmGate>
                  <ProdukDepositoTambah />
                </SavingsProductSaveConfirmGate>
              }
            />
            <Route
              path="sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-konsolidasi/:id/edit"
              element={
                <SavingsProductSaveConfirmGate>
                  <ProdukDepositoTambah />
                </SavingsProductSaveConfirmGate>
              }
            />
            <Route
              path="sak-ep-cabang/loan-products"
              element={<LoanProducts />}
            />
            <Route
              path="sak-ep-cabang/loan-products/cabang"
              element={<LoanProductsCabang />}
            />
            <Route
              path="sak-ep-cabang/loan-products/new"
              element={<LoanProductCreate />}
            />
            <Route
              path="sak-ep-cabang/loan-products/:id"
              element={<LoanProductDetail />}
            />
            <Route
              path="sak-ep-cabang/loan-products/:id/edit"
              element={<LoanProductEdit />}
            />
            <Route path="pengaturan-umum" element={<PengaturanUmum />} />
            <Route path="mobile/e-kolektor" element={<MobileEKolektor />} />
            <Route path="mobile/m-banking" element={<MobileMBanking />} />
            <Route path="obs-samudra-harta" element={<ObsSamudraHarta />} />
            <Route
              path="obs-samudra-harta/loan-products"
              element={<LoanProducts />}
            />
            <Route
              path="obs-samudra-harta/loan-products/cabang"
              element={<LoanProductsCabang />}
            />
            <Route
              path="obs-samudra-harta/loans/applications"
              element={<LoanApplications />}
            />
            <Route
              path="obs-samudra-harta/loans/applications/new"
              element={<LoanApplicationCreate />}
            />
            <Route
              path="obs-samudra-harta/loans/accounts"
              element={<RekeningPinjaman />}
            />
            <Route
              path="obs-samudra-harta/loans/transactions"
              element={<LoanTransactions />}
            />
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
            <Route path="laporan/produktivitas" element={<LaporanProduktivitas />} />
            <Route
              path="laporan/produktivitas-cabang"
              element={<LaporanProduktivitasCabang />}
            />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;