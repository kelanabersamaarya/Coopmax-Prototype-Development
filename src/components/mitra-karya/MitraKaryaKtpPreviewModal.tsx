"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function MitraKaryaKtpPreviewModal() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button[aria-label^='Lihat ']");

      if (!button) return;

      const row = button.closest("tr");
      if (!row) return;

      const rowText = row.textContent?.toLowerCase() ?? "";
      const isAvailable = rowText.includes("tersedia");

      if (!isAvailable) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      setOpen(true);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "h-[585px] w-[calc(100vw-2rem)] max-w-[619px]",
          "overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col bg-white">
          <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-slate-300 px-5">
            <h2 className="text-[16px] font-bold tracking-tight text-black">
              Foto KTP Anggota
            </h2>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] text-black transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" strokeWidth={3} />
            </button>
          </header>

          <main className="flex min-h-0 flex-1 items-center justify-center px-5 py-8">
            <div className="flex max-h-full w-full items-center justify-center rounded-[5px] border border-slate-300 bg-slate-50 p-3">
              <img
                src="/image%204.png"
                alt="Foto KTP Anggota"
                className="max-h-[360px] w-full rounded-[5px] object-contain"
              />
            </div>
          </main>

          <footer className="flex h-[58px] shrink-0 items-center justify-end border-t border-slate-300 px-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-[34px] min-w-[80px] items-center justify-center rounded-[5px] bg-[#27ae00] px-4 text-[12px] font-bold text-white transition hover:bg-[#229400]"
            >
              Selesai
            </button>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}