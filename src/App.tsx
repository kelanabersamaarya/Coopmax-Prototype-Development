import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoanProducts from "./pages/LoanProducts";
import NewLoan from "./pages/NewLoan";
import LoanProductCreate from "./pages/LoanProductCreate";
import AnggotaTransaksi from "./pages/AnggotaTransaksi";
import LoanApplications from "./pages/LoanApplications";
import LoanApplicationCreate from "./pages/LoanApplicationCreate";
import Dashboard from "./pages/Dashboard";
import RekeningPinjaman from "./pages/RekeningPinjaman";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="loan-products" element={<LoanProducts />} />
            <Route path="loan-products/new" element={<LoanProductCreate />} />
            <Route path="loans/new" element={<NewLoan />} />
            <Route path="loans/applications" element={<LoanApplications />} />
            <Route path="loans/accounts" element={<RekeningPinjaman />} />
            <Route
              path="loans/applications/new"
              element={<LoanApplicationCreate />}
            />
            <Route path="anggota/transaksi" element={<AnggotaTransaksi />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;