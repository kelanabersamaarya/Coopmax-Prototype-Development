"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  IdCard,
  Upload,
  X,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ktpImageSources = [
  "/image%204.png",
  "/image%204.jpg",
  "/image%204.jpeg",
  "/image%204.webp",
  "/image%204",
];

const invalidKtpImageSources = [
  "/imagektpblur.png",
  "/imagektpblur.jpg",
  "/imagektpblur.jpeg",
  "/imagektpblur.webp",
  "/imagektpblur",
];

const emptyIllustrationSources = [
  "/empty%20box%20ilustration%201.png",
  "/empty%20box%20ilustration%201.jpg",
  "/empty%20box%20ilustration%201.jpeg",
  "/empty%20box%20ilustration%201.webp",
  "/empty%20box%20ilustration%201.svg",
  "/empty%20box%20ilustration%201",
];

function KtpExample({ type }: { type: "valid" | "invalid" }) {
  const isValid = type === "valid";
  const sources = isValid ? ktpImageSources : invalidKtpImageSources;
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [unavailable, setUnavailable] = React.useState(false);

  return (
    <div
      className={cn(
        "h-[178px] overflow-hidden rounded-[9px] border-2 border-dashed bg-slate-50 p-2.5",
        isValid ? "border-[#20b342]" : "border-rose-400",
      )}
    >
      {unavailable ? (
        <div className="grid h-full place-items-center text-center text-[12px] font-semibold text-slate-500">
          Contoh gambar tidak tersedia
        </div>
      ) : (
        <img
          src={sources[sourceIndex]}
          alt={
            isValid
              ? "Contoh foto KTP yang benar"
              : "Contoh foto KTP yang salah"
          }
          className={cn(
            "h-full w-full rounded-[6px] object-cover",
            !isValid && "blur-[2px]",
          )}
          onError={() => {
            const nextIndex = sourceIndex + 1;

            if (nextIndex < sources.length) {
              setSourceIndex(nextIndex);
            } else {
              setUnavailable(true);
            }
          }}
        />
      )}
    </div>
  );
}

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
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col bg-white">
          <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-slate-300 px-6">
            <h2 className="text-[20px] font-extrabold tracking-tight text-black">
              Upload Foto KTP Nasabah
            </h2>

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

          <main className="max-h-[calc(92vh-140px)] overflow-auto px-6 py-7">
            <div className="grid gap-7 lg:grid-cols-[1.1fr_1fr]">
              <section>
                <h3 className="text-[17px] font-bold text-[#26364f]">
                  Contoh Foto KTP
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#40506a]">
                      <CheckCircle2 className="h-5 w-5 text-[#20b342]" />
                      Contoh foto KTP yang benar
                    </div>
                    <div className="mt-3">
                      <KtpExample type="valid" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#40506a]">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white">
                        <X className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      Contoh foto KTP yang salah
                    </div>
                    <div className="mt-3">
                      <KtpExample type="invalid" />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-[17px] font-bold text-[#26364f]">
                  Foto KTP
                </h3>

                <div className="mt-5 flex h-[178px] flex-col items-center justify-center rounded-[9px] border-2 border-dashed border-slate-300 px-5 text-center">
                  {uploadedImageUrl ? (
                    <img
                      src={uploadedImageUrl}
                      alt="Preview KTP yang diunggah"
                      className="max-h-[112px] max-w-full rounded-[6px] object-contain"
                    />
                  ) : (
                    <>
                      <IdCard className="h-7 w-7 text-black" strokeWidth={2.3} />
                      <div className="mt-2 text-[15px] font-bold text-black">
                        Foto KTP
                      </div>
                      <p className="mt-1 max-w-[270px] text-[12px] leading-relaxed text-slate-600">
                        Unggah foto KTP Nasabah. Pastikan terlihat jelas untuk
                        validasi identitas.
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        JPG, JPEG, PNG. Maksimal 1MB.
                      </p>
                    </>
                  )}

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
                    className="mt-3 inline-flex h-9 items-center gap-2 rounded-[5px] bg-[#3366FF] px-5 text-[12px] font-bold text-white transition hover:bg-[#2855d9]"
                  >
                    <Upload className="h-4 w-4" strokeWidth={2.8} />
                    {uploadedImageUrl ? "Ganti Foto KTP" : "Unggah KTP"}
                  </button>
                </div>
              </section>
            </div>

            <section className="mt-7 rounded-[12px] bg-[#fff2c9] px-5 py-4 text-black">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

                <div>
                  <h3 className="text-[15px] font-bold leading-relaxed">
                    Perhatikan Foto KTP yang Anda Unggah Pastikan Sesuai dengan
                    Ketentuan Berikut :
                  </h3>

                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-[12px] leading-relaxed">
                    <li>KTP harus identitas asli untuk validasi identitas.</li>
                    <li>
                      Informasi dalam KTP harus terlihat dengan jelas, tidak blur
                      dan tidak ada objek yang menghalangi KTP.
                    </li>
                    <li>Pastikan KTP full screen dan background foto polos.</li>
                    <li>
                      Format file yang dapat diunggah adalah JPG, JPEG, atau PNG.
                    </li>
                    <li>Maksimal ukuran file yang dapat diunggah adalah 1 MB.</li>
                  </ol>
                </div>
              </div>
            </section>
          </main>

          <footer className="flex shrink-0 justify-end gap-3 border-t border-slate-300 px-6 py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 items-center gap-2 rounded-[5px] bg-[#7789b7] px-5 text-[12px] font-bold text-white transition hover:bg-[#6879a4]"
            >
              <X className="h-4 w-4" strokeWidth={3} />
              Batalkan
            </button>

            <button
              type="button"
              onClick={onSave}
              disabled={!uploadedImageUrl}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-[5px] bg-[#2fb300] px-5 text-[12px] font-bold text-white transition hover:bg-[#279800]",
                !uploadedImageUrl ? "cursor-not-allowed opacity-50" : "",
              )}
            >
              <CheckCircle2 className="h-4 w-4" strokeWidth={3} />
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
                        } else {
                          setImageUnavailable(true);
                        }
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
                      } else {
                        setEmptyIllustrationUnavailable(true);
                      }
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