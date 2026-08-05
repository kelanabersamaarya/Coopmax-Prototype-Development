"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";

const ktpImageSources = [
  "/image%204.png",
  "/image%204.jpg",
  "/image%204.jpeg",
  "/image%204.webp",
  "/image%204",
];

const emptyIllustrationSources = [
  "/empty%20box%20ilustration%201.png",
  "/empty%20box%20ilustration%201.jpg",
  "/empty%20box%20ilustration%201.jpeg",
  "/empty%20box%20ilustration%201.webp",
  "/empty%20box%20ilustration%201.svg",
  "/empty%20box%20ilustration%201",
];

function UploadKtpDialog({
  open,
  onOpenChange,
  onSave,
  fileInputRef,
  uploadedImageUrl,
  onFileSelected,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  uploadedImageUrl: string | null;
  onFileSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[1000px]",
          "max-w-[1000px] max-h-[92vh] overflow-hidden",
          "rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col bg-white">
          <header className="flex items-center justify-between border-b border-slate-300 px-6 py-5">
            <h2 className="text-[22px] font-extrabold tracking-tight text-black">
              Upload Foto KTP Nasabah
            </h2>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] text-black transition hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-6 w-6" strokeWidth={3} />
            </button>
          </header>

          <main className="max-h-[calc(92vh-160px)] overflow-auto px-6 py-8">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_1fr]">
              <section>
                <h3 className="text-[18px] font-bold text-slate-800">
                  Foto KTP
                </h3>

                <div className="mt-5 flex h-[225px] items-center justify-center rounded-[10px] border-2 border-dashed border-slate-300 p-5 text-center">
                  {uploadedImageUrl ? (
                    <img
                      src={uploadedImageUrl}
                      alt="Preview KTP yang diunggah"
                      className="max-h-[180px] max-w-full rounded-[6px] object-contain shadow-sm"
                    />
                  ) : (
                    <div className="text-[14px] text-slate-600">
                      Belum ada foto KTP yang dipilih.
                    </div>
                  )}
                </div>
              </section>

              <section className="pt-0 lg:pt-[40px]">
                <h3 className="text-[18px] font-bold text-slate-800">
                  Unggah File
                </h3>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="sr-only"
                  onChange={onFileSelected}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 flex h-[192px] w-full flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-slate-300 px-5 py-5 text-center transition hover:bg-slate-50"
                >
                  <Upload className="h-8 w-8 text-black" strokeWidth={2.4} />
                  <div className="mt-2 text-[16px] font-bold text-black">
                    {uploadedImageUrl ? "Ganti Foto KTP" : "Unggah Foto KTP"}
                  </div>
                  <p className="mt-1 text-[13px] text-slate-700">
                    JPG, JPEG, PNG. Maksimal 1 MB.
                  </p>
                </button>
              </section>
            </div>
          </main>

          <footer className="flex justify-end gap-3 border-t border-slate-300 px-6 py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 items-center gap-2 rounded-[5px] bg-[#7789b7] px-4 text-[13px] font-semibold text-white transition hover:bg-[#6879a4]"
            >
              <X className="h-5 w-5" strokeWidth={3} />
              Batalkan
            </button>

            <button
              type="button"
              onClick={onSave}
              disabled={!uploadedImageUrl}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-[5px] bg-[#2fb300] px-4 text-[13px] font-semibold text-white transition hover:bg-[#279800]",
                !uploadedImageUrl ? "cursor-not-allowed opacity-50" : "",
              )}
            >
              <Upload className="h-5 w-5" strokeWidth={3} />
              Simpan
            </button>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MitraKaryaKtpPreviewModal() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
  const [selectedHasKtp, setSelectedHasKtp] = React.useState(false);
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [emptyIllustrationIndex, setEmptyIllustrationIndex] = React.useState(0);
  const [imageUnavailable, setImageUnavailable] = React.useState(false);
  const [emptyIllustrationUnavailable, setEmptyIllustrationUnavailable] =
    React.useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button[aria-label^='Lihat ']");

      if (!button) return;

      const row = button.closest("tr");
      if (!row) return;

      const rowText = row.textContent?.toLowerCase() ?? "";
      const isUnavailable = rowText.includes("belum tersedia");
      const isAvailable = !isUnavailable && rowText.includes("tersedia");

      if (!isAvailable && !isUnavailable) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      setSelectedHasKtp(isAvailable);
      setSourceIndex(0);
      setEmptyIllustrationIndex(0);
      setImageUnavailable(false);
      setEmptyIllustrationUnavailable(false);
      setUploadedImageUrl(null);
      setUploadDialogOpen(false);
      setOpen(true);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (uploadedImageUrl) URL.revokeObjectURL(uploadedImageUrl);
    };
  }, [uploadedImageUrl]);

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 1024 * 1024) {
      event.target.value = "";
      return;
    }

    if (uploadedImageUrl) URL.revokeObjectURL(uploadedImageUrl);

    setUploadedImageUrl(URL.createObjectURL(file));
    setSelectedHasKtp(true);
    event.target.value = "";
  }

  return (
    <>
      <UploadKtpDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        fileInputRef={fileInputRef}
        uploadedImageUrl={uploadedImageUrl}
        onFileSelected={handleUpload}
        onSave={() => setUploadDialogOpen(false)}
      />

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

            {selectedHasKtp ? (
              <main className="flex min-h-0 flex-1 items-center justify-center px-5 py-8">
                <div className="flex max-h-full w-full items-center justify-center rounded-[5px] border border-slate-300 bg-slate-50 p-3">
                  {uploadedImageUrl ? (
                    <img
                      src={uploadedImageUrl}
                      alt="Foto KTP Anggota"
                      className="max-h-[360px] w-full rounded-[5px] object-contain"
                    />
                  ) : imageUnavailable ? (
                    <div className="text-center text-[14px] font-semibold text-slate-600">
                      Gambar KTP tidak tersedia
                    </div>
                  ) : (
                    <img
                      src={ktpImageSources[sourceIndex]}
                      alt="Foto KTP Anggota"
                      className="max-h-[360px] w-full rounded-[5px] object-contain"
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
            ) : (
              <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 text-center">
                {!emptyIllustrationUnavailable ? (
                  <img
                    src={emptyIllustrationSources[emptyIllustrationIndex]}
                    alt="Foto KTP belum tersedia"
                    className="h-[190px] w-[230px] object-contain"
                    onError={() => {
                      const nextIndex = emptyIllustrationIndex + 1;

                      if (nextIndex < emptyIllustrationSources.length) {
                        setEmptyIllustrationIndex(nextIndex);
                        return;
                      }

                      setEmptyIllustrationUnavailable(true);
                    }}
                  />
                ) : (
                  <div className="grid h-[150px] w-[180px] place-items-center rounded-[24px] bg-blue-50 text-blue-500 ring-1 ring-blue-100">
                    <Upload className="h-12 w-12" />
                  </div>
                )}

                <h3 className="mt-5 text-[22px] font-bold tracking-tight text-black">
                  Foto KTP Anggota Belum Tersedia
                </h3>

                <p className="mt-2 text-[14px] font-normal text-slate-700">
                  Silakan klik tombol dibawah ini untuk mengunggah file KTP anggota
                </p>

                <button
                  type="button"
                  onClick={() => setUploadDialogOpen(true)}
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-[#3366FF] px-5 text-[14px] font-semibold text-white transition hover:bg-[#2855d9]"
                >
                  <Upload className="h-4 w-4" />
                  Unggah Foto KTP Anggota
                </button>
              </main>
            )}

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
    </>
  );
}