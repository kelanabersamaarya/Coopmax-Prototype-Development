import { useEffect } from "react";
import JadwalBungaSimpanan from "./JadwalBungaSimpanan";

export default function JadwalBungaSimpananEdit() {
  useEffect(() => {
    sessionStorage.setItem("jadwal-bunga-edit", "true");
    const addButton = Array.from(document.querySelectorAll("button")).find((button) => button.textContent?.includes("Tambah"));
    addButton?.click();
  }, []);

  return <JadwalBungaSimpanan />;
}
