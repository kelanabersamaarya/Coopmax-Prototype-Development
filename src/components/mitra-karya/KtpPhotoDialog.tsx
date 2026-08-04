import * as React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ktpImageSources = [
  "/image%204.png",
  "/image%204.jpg",
  "/image%204.jpeg",
  "/image%204.webp",
  "/image%204",
];

export default function KtpPhotoDialog({
  open,
  onOpenChange,
  memberName,
  memberId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  memberId: string;
}) {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [imageUnavailable, setImageUnavailable] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    setSourceIndex(0);
    setImageUnavailable(false);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] max-w-[900px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <header className="flex items-center justify-between border-b border-slate-300 px-6 py-5">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-black">
              Foto KTP Anggota
            </h2>
            <p className="mt-1 text-[13px] text-slate-500">
              {memberName} • {memberId}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] text-black transition hover:bg-slate-100"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-6 w-6" strokeWidth={3} />
          </button>
        </header>

        <main className="bg-slate-50 px-6 py-7">
          <div className="flex min-h-[280px] items-center justify-center rounded-[5px] border border-slate-300 bg-white p-4">
            {imageUnavailable ? (
              <div className="text-center text-[14px] font-semibold text-slate-500">
                Gambar KTP tidak dapat ditemukan.
              </div>
            ) : (
              <img
                src={ktpImageSources[sourceIndex]}
                alt={`KTP ${memberName}`}
                className="max-h-[65vh] w-auto max-w-full rounded-[4px] object-contain shadow-sm"
                onError={() => {
                  const nextIndex = sourceIndex + 1;

                  if (nextIndex < ktpImageSources.length) {
                    setSourceIndex(nextIndex);
                    return;
                  }

                  setImageUnavailable(true);
                }}
              />
            )}
          </div>
        </main>

        <footer className="h-5 border-t border-slate-300" />
      </DialogContent>
    </Dialog>
  );
}