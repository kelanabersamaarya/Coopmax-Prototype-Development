import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./styles/placeholders.css";
import "./styles/loan-interest-wizard-step-two.css";
import "./styles/loan-interest-reason-field.css";
import "./styles/loan-interest-summary-visibility.css";
import "./styles/loan-interest-step-two-billing-table.css";
import "./styles/loan-interest-step-two-hide-penalty-icons.css";

createRoot(document.getElementById("root")!).render(<App />);