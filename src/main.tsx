import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./styles/placeholders.css";
import "./styles/loan-installment-v2.css";
import "./styles/loan-installment-v2-billing-values.css";
import "./styles/loan-installment-v2-billing-nasabah.css";
import "./styles/loan-installment-v2-billing-grace-period.css";
import "./styles/loan-installment-v2-hide-required.css";
import "./styles/loan-installment-v2-hide-tunggakan-bunga.css";
import "./styles/loan-installment-v2-show-monthly-product.css";
import "./styles/loan-installment-v2-regular-default-totals.css";
import "./styles/loan-product-cabang-edit.css";
import "./styles/daftar-tagihan-dialog.css";
import "./styles/loan-installment-v2-title-color.css";

createRoot(document.getElementById("root")!).render(<App />);