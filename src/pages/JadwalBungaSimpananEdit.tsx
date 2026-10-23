import { useLayoutEffect } from "react";
import JadwalBungaSimpanan from "./JadwalBungaSimpanan";

export default function JadwalBungaSimpananEdit() {
  useLayoutEffect(() => {
    sessionStorage.setItem("jadwal-bunga-edit", "true");

    const openEditForm = () => {
      const addButton = Array.from(document.querySelectorAll<HTMLButtonElement>("button")).find(
        (button) => button.textContent?.trim().includes("Tambah"),
      );
      addButton?.click();
    };

    const frame = window.requestAnimationFrame(openEditForm);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <JadwalBungaSimpanan />;
}
