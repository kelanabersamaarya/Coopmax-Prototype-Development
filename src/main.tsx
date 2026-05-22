import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./styles/placeholders.css";

createRoot(document.getElementById("root")!).render(<App />);