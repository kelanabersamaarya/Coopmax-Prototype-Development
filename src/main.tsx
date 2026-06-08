import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./styles/placeholders.css";
import "./styles/loan-installment-v2.css";
import "./styles/loan-installment-v2-billing-values.css";

createRoot(document.getElementById("root")!).render(<App />);