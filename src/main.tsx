import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./styles/placeholders.css";
import "./styles/loan-interest-wizard-step-two.css";
import "./styles/loan-interest-reason-field.css";

createRoot(document.getElementById("root")!).render(<App />);