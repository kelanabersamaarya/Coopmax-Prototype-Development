import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MobileAwareToaster from "./components/MobileAwareToaster";
import SavingsProductCancelRouteGate from "./components/savings/products/SavingsProductCancelRouteGate";
import SavingsProductSaveConfirmGate from "./components/savings/products/SavingsProductSaveConfirmGate";
import SavingsProductsListPage from "./components/savings/products/SavingsProductsListPage";
import TermSavingsProductsListPage from "./components/savings/term-products/TermSavingsProductsListPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import SimulasiDashboard from "./pages/SimulasiDashboard";
import DashboardSimpanan from "./pages/DashboardSimpanan";
import AstitiDanaLestariDashboard from "./pages/AstitiDanaLestariDashboard";
import AstitiSimpananTransaksi from "./pages/AstitiSimpananTransaksi";
import AstitiRekeningTabungan from "./pages/AstitiRekeningTabungan";
import AstitiRekeningTabunganDetail from "./pages/AstitiRekeningTabunganDetail";
import AstitiTransaksiDeposito from "./pages/AstitiTransaksiDeposito";
import AstitiTransaksiDepositoDetail from "./pages/AstitiTransaksiDepositoDetail";
import AstitiTarikanBungaDeposito from "./pages/AstitiTarikanBungaDeposito";
import AstitiRekeningDeposito from "./pages/AstitiRekeningDeposito";
import AstitiSetoranSimpanan from "./pages/AstitiSetoranSimpanan";
import AstitiTarikanSimpanan from "./pages/AstitiTarikanSimpanan";
import AstitiTransaksiTabunganDetail from "./pages/AstitiTransaksiTabunganDetail";
import AstitiDanaLestariPembayaranAngsuran from "./pages/AstitiDanaLestariPembayaranAngsuran";
import AstitiRekeningPinjaman from "./pages/AstitiRekeningPinjaman";
import MitraKaryaDashboard from "./pages/MitraKaryaDashboard";
import MitraKaryaAnggota from "./pages/MitraKaryaAnggota";
import MitraKaryaCalonAnggota from "./pages/MitraKaryaCalonAnggota";
import MitraKaryaCalonAnggotaDetail from "./pages/MitraKaryaCalonAnggotaDetail";
import MitraKaryaAnggotaDetail from "./pages/MitraKaryaAnggotaDetail";
import MitraKaryaPendaftaranAnggota from "./pages/MitraKaryaPendaftaranAnggota";
import MitraKaryaLaporanAnggota from "./pages/MitraKaryaLaporanAnggota";
import MitraKaryaLaporanAnggotaV2 from "./pages/MitraKaryaLaporanAnggotaV2";
import MitraKaryaPenyesuaianLaporan from "./pages/MitraKaryaPenyesuaianLaporan";
import MitraKaryaPenyesuaianLaporanTambah from "./pages/MitraKaryaPenyesuaianLaporanTambah";
import RekeningSimpanan from "./pages/RekeningSimpanan";
import TutupRekening from "./pages/TutupRekening";
import TutupRekeningDetail from "./pages/TutupRekeningDetail";
import PerpanjanganSimpanan from "./pages/PerpanjanganSimpanan";
import NewLoan from "./pages/NewLoan";
import LoanApplications from "./pages/LoanApplications";
import LoanApplicationDetail from "./pages/LoanApplicationDetail";
import LoanApplicationCreate from "./pages/LoanApplicationCreate";
import LoanProductCreate from "./pages/LoanProductCreate";
import LoanProductDetail from "./pages/LoanProductDetail";
import LoanProductEdit from "./pages/LoanProductEdit";
import LoanProducts from "./pages/LoanProducts";
import LoanProductsCabang from "./pages/LoanProductsCabang";
import RekeningPinjaman from "./pages/RekeningPinjaman";
import LoanAccountEdit from "./pages/LoanAccountEdit";
import LoanTransactions from "./pages/LoanTransactions";
import PinjamanLunas from "./pages/PinjamanLunas";
import PinjamanLunasDetail from "./pages/PinjamanLunasDetail";
import LoanInstallmentPayment from "./pages/LoanInstallmentPayment";
import LoanInstallmentPaymentV2 from "./pages/LoanInstallmentPaymentV2";
import LoanPemutihanDaftar from "./pages/LoanPemutihanDaftar";
import TransaksiPinjamanDetail from "./pages/TransaksiPinjamanDetail";
import AnggotaTransaksi from "./pages/AnggotaTransaksi";
import LaporanKolektibilitas from "./pages/LaporanKolektibilitas";
import LaporanPinjaman from "./pages/LaporanPinjaman";
import LaporanDetailPinjaman from "./pages/LaporanDetailPinjaman";
import LaporanPortofolioPinjamanCabang from "./pages/LaporanPortofolioPinjamanCabang";
import LaporanProduktivitas from "./pages/LaporanProduktivitas";
import LaporanProduktivitasCabang from "./pages/LaporanProduktivitasCabang";
import PengaturanUmum from "./pages/PengaturanUmum";
import PengaturanNotifikasi from "./pages/PengaturanNotifikasi";
import PengaturanNotifikasiTambah from "./pages/PengaturanNotifikasiTambah";
import PengaturanNotifikasiUbah from "./pages/PengaturanNotifikasiUbah";
import ObsSamudraHarta from "./pages/ObsSamudraHarta";
import ObsSamudraHartaDetail from "./pages/ObsSamudraHartaDetail";
import ObsPengaturanUmum from "./pages/ObsPengaturanUmum";
import ObsWaktuAksesOperasional from "./pages/ObsWaktuAksesOperasional";
import LoginSimulasi from "./pages/LoginSimulasi";
import ObsWeb from "./pages/ObsWeb";
import MobileEKolektor from "./pages/MobileEKolektor";
import MobileEKolektorFace from "./pages/MobileEKolektorFace";
import MobileMBanking from "./pages/MobileMBanking";
import MobileMBankingTransactions from "./pages/MobileMBankingTransactions";
import MBankingBanners from "./pages/MBankingBanners";
import MBankingBannerCreate from "./pages/MBankingBannerCreate";
import MBankingBannerDetail from "./pages/MBankingBannerDetail";
import MobilePaymentLinkStatus from "./pages/MobilePaymentLinkStatus";
import NewMBanking from "./pages/NewMBanking";
import PaymentLink from "./pages/PaymentLink";
import PaymentLinkDetail from "./pages/PaymentLinkDetail";
import PaymentLinkStatus from "./pages/PaymentLinkStatus";
import PaymentLinkTransactionDetail from "./pages/PaymentLinkTransactionDetail";
import ProdukTabunganTambah from "./pages/ProdukTabunganTambah";
import ProdukDepositoTambah from "./pages/ProdukDepositoTambah";
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
            <Route path="dashboard-simpanan" element={<DashboardSimpanan />} />
            <Route path="astiti-dana-lestari/dashboard" element={<AstitiDanaLestariDashboard />} />
            <Route path="astiti-dana-lestari/simpanan/transaksi" element={<AstitiSimpananTransaksi />} />
            <Route path="astiti-dana-lestari/simpanan/rekening" element={<AstitiRekeningTabungan />} />
            <Route path="anggota/simpanan/transaksi" element={<AstitiSimpananTransaksi />} />
            <Route path="anggota/simpanan/rekening" element={<AstitiRekeningTabungan />} />
            <Route path="astiti-dana-lestari/simpanan/rekening/detail" element={<AstitiRekeningTabunganDetail />} />
            <Route path="astiti-dana-lestari/simpanan/setoran" element={<AstitiSetoranSimpanan />} />
            <Route path="astiti-dana-lestari/simpanan/tarikan" element={<AstitiTarikanSimpanan />} />
            <Route path="astiti-dana-lestari/simpanan/transaksi/detail" element={<AstitiTransaksiTabunganDetail />} />
            <Route path="anggota/simpanan/transaksi/detail" element={<AstitiTransaksiTabunganDetail />} />
            <Route path="astiti-dana-lestari/pinjaman/transaksi" element={<LoanTransactions />} />
            <Route path="astiti-dana-lestari/pinjaman/rekening" element={<AstitiRekeningPinjaman />} />
            <Route
              path="astiti-dana-lestari/pinjaman/pembayaran-angsuran"
              element={<AstitiDanaLestariPembayaranAngsuran />}
            />
            <Route path="astiti-dana-lestari/simpanan-berjangka/transaksi" element={<AstitiTransaksiDeposito />} />
            <Route path="astiti-dana-lestari/simpanan-berjangka/transaksi/:id" element={<AstitiTransaksiDepositoDetail />} />
            <Route path="astiti-dana-lestari/simpanan-berjangka/tarikan" element={<AstitiTarikanBungaDeposito />} />
            <Route path="astiti-dana-lestari/simpanan-berjangka/rekening" element={<AstitiRekeningDeposito />} />
            <Route path="anggota/simpanan-berjangka/transaksi" element={<AstitiTransaksiDeposito />} />
            <Route path="anggota/simpanan-berjangka/transaksi/:id" element={<AstitiTransaksiDepositoDetail />} />
            <Route path="anggota/simpanan-berjangka/tarikan" element={<AstitiTarikanBungaDeposito />} />
            <Route path="anggota/simpanan-berjangka/rekening" element={<AstitiRekeningDeposito />} />
            <Route path="astiti-dana-lestari/akunting" element={<SakAkunting />} />
            <Route path="mitra-karya/dashboard" element={<MitraKaryaDashboard />} />
            <Route path="mitra-karya/anggota" element={<MitraKaryaAnggota />} />
            <Route path="mitra-karya/calon-anggota" element={<MitraKaryaCalonAnggota />} />
            <Route path="mitra-karya/calon-anggota/pendaftaran" element={<MitraKaryaPendaftaranAnggota />} />
            <Route path="mitra-karya/calon-anggota/:id/ubah" element={<MitraKaryaPendaftaranAnggota />} />
            <Route path="mitra-karya/calon-anggota/:id" element={<MitraKaryaCalonAnggotaDetail />} />
            <Route path="mitra-karya/anggota/pendaftaran" element={<MitraKaryaPendaftaranAnggota />} />
            <Route path="mitra-karya/anggota/:id/ubah" element={<MitraKaryaPendaftaranAnggota />} />
            <Route path="mitra-karya/anggota/:id" element={<MitraKaryaAnggotaDetail />} />
            <Route path="mitra-karya/pinjaman/pengajuan" element={<LoanApplications />} />
            <Route path="mitra-karya/pinjaman/pengajuan/:id" element={<LoanApplicationDetail />} />
            <Route path="mitra-karya/pinjaman/pengajuan/tambah" element={<LoanApplicationCreate />} />
            <Route path="mitra-karya/pinjaman/rekening" element={<RekeningPinjaman />} />
            <Route path="mitra-karya/m-banking" element={<MobileMBanking />} />
            <Route path="mitra-karya/mbanking-transactions" element={<MobileMBankingTransactions />} />
            <Route path="mitra-karya/mbanking-banners" element={<MBankingBanners />} />
            <Route path="mitra-karya/mbanking-banners/tambah" element={<MBankingBannerCreate />} />
            <Route path="mitra-karya/mbanking-banners/:id/ubah" element={<MBankingBannerCreate />} />
            <Route path="mitra-karya/mbanking-banners/:id" element={<MBankingBannerDetail />} />
            <Route path="mitra-karya/akunting" element={<SakAkunting />} />
            <Route
              path="mitra-karya/laporan/anggota"
              element={<MitraKaryaLaporanAnggota />}
            />
            <Route
              path="mitra-karya/laporan/anggota-v2"
              element={<MitraKaryaLaporanAnggotaV2 />}
            />
            <Route
              path="mitra-karya/laporan/penyesuaian"
              element={<MitraKaryaPenyesuaianLaporan />}
            />
            <Route
              path="mitra-karya/laporan/penyesuaian/tambah"
              element={<MitraKaryaPenyesuaianLaporanTambah />}
            />
            <Route
              path="mitra-karya/laporan/penyesuaian/:id/ubah"
              element={<MitraKaryaPenyesuaianLaporanTambah />}
            />
            <Route path="simpanan/rekening" element={<RekeningSimpanan />} />
            <Route path="simpanan/perpanjangan" element={<PerpanjanganSimpanan />} />
            <Route path="simpanan/tutup-rekening" element={<TutupRekening />} />
            <Route path="simpanan/tutup-rekening/:accountNo" element={<TutupRekeningDetail />} />
            <Route path="anggota/simpanan/perpanjangan" element={<PerpanjanganSimpanan />} />
            <Route path="anggota/simpanan/tutup-rekening" element={<TutupRekening />} />
            <Route path="anggota/simpanan/tutup-rekening/:accountNo" element={<TutupRekeningDetail />} />

            <Route path="payment-link" element={<PaymentLink />} />
            <Route
              path="payment-link/status-pembayaran"
              element={<PaymentLinkStatus />}
            />
            <Route
              path="payment-link/:linkNo/transaction-detail"
              element={<PaymentLinkTransactionDetail />}
            />
            <Route path="payment-link/:linkNo" element={<PaymentLinkDetail />} />
            <Route path="payment-link/loan-products" element={<LoanProducts />} />
            <Route
              path="payment-link/loan-products/new"
              element={<LoanProductCreate />}
            />
            <Route
              path="payment-link/loan-products/:id"
              element={<LoanProductDetail />}
            />
            <Route
              path="payment-link/loan-products/:id/edit"
              element={<LoanProductEdit />}
            />

            <Route path="sak-ep-cabang/dashboard" element={<Dashboard />} />
            <Route path="sak-ep-cabang/akunting" element={<SakAkunting />} />
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

            <Route path="sak-ep-cabang/loan-products" element={<LoanProducts />} />
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
            <Route path="pengaturan-notifikasi" element={<PengaturanNotifikasi />} />
            <Route path="pengaturan-notifikasi/tambah" element={<PengaturanNotifikasiTambah />} />
            <Route path="pengaturan-notifikasi/ubah/:id" element={<PengaturanNotifikasiUbah />} />

            <Route path="mobile/e-kolektor" element={<MobileEKolektor />} />
            <Route path="mobile/e-kolektor-wajah" element={<MobileEKolektorFace />} />
            <Route path="mobile/m-banking" element={<MobileMBanking />} />
            <Route path="mobile/mbanking-transactions" element={<MobileMBankingTransactions />} />
            <Route path="mobile/mbanking-banners" element={<MBankingBanners />} />
            <Route path="mobile/mbanking-banners/tambah" element={<MBankingBannerCreate />} />
            <Route path="mobile/mbanking-banners/:id/ubah" element={<MBankingBannerCreate />} />
            <Route path="mobile/mbanking-banners/:id" element={<MBankingBannerDetail />} />
            <Route
              path="mobile/status-pembayaran-payment-link"
              element={<MobilePaymentLinkStatus />}
            />
            <Route path="mobile/new-mbanking" element={<NewMBanking />} />

            <Route path="obs-samudra-harta" element={<ObsSamudraHarta />} />
            <Route
              path="obs-samudra-harta/pengaturan-umum"
              element={<ObsPengaturanUmum />}
            />
            <Route
              path="obs-samudra-harta/waktu-akses-operasional"
              element={<ObsWaktuAksesOperasional />}
            />
            <Route path="login/simulasi" element={<LoginSimulasi />} />
            <Route
              path="login/simulasi-footer-belum-diatur"
              element={<SimulasiDashboard hideOperationalInfo />}
            />
            <Route
              path="login/simulasi-login-operasional-tutup"
              element={<LoginSimulasi operationalClosed />}
            />
            <Route
              path="login/simulasi-operasional-tutup"
              element={<SimulasiDashboard operationalStatus="closed" />}
            />
            <Route path="login/simulasi-dashboard" element={<SimulasiDashboard />} />
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
            <Route path="loans/applications/:id" element={<LoanApplicationDetail />} />
            <Route path="loans/applications/new" element={<LoanApplicationCreate />} />
            <Route path="loans/accounts" element={<RekeningPinjaman />} />
            <Route
              path="loans/accounts/:accountNo/edit"
              element={<LoanAccountEdit />}
            />
            <Route path="loans/paid" element={<PinjamanLunas />} />
            <Route path="loans/paid/:accountNo" element={<PinjamanLunasDetail />} />
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

            <Route path="anggota" element={<MitraKaryaAnggota />} />
            <Route path="anggota/pendaftaran" element={<MitraKaryaPendaftaranAnggota />} />
            <Route path="anggota/:id/ubah" element={<MitraKaryaPendaftaranAnggota />} />
            <Route path="anggota/:id" element={<MitraKaryaAnggotaDetail />} />
            <Route path="anggota/calon-anggota" element={<MitraKaryaCalonAnggota />} />
            <Route path="anggota/calon-anggota/pendaftaran" element={<MitraKaryaPendaftaranAnggota />} />
            <Route path="anggota/calon-anggota/:id/ubah" element={<MitraKaryaPendaftaranAnggota />} />
            <Route path="anggota/calon-anggota/:id" element={<MitraKaryaCalonAnggotaDetail />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;