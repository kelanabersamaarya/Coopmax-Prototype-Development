import * as React from "react";
import { Upload, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ktpImageSources = [
  "/image%204.png",
  "/image%204.jpg",
  "/image%204.jpeg",
  "/image%204.webp",
  "/image%204",
];

const emptyIllustrationSources = [
  "/empty box ilustration 1.png",
  "/empty box ilustration 1.jpg",
  "/empty box ilustration 1.jpeg",
  "/empty box ilustration 1.webp",
  "/empty box ilustration 1.svg",
  "/empty box ilustration 1",
];

export default function KtpPhotoDialog({
  open,
  onOpenChange,
  memberName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  memberId: string;
}) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [imageUnavailable, setImageUnavailable] = React.useState(false);
  const [emptyIllustrationIndex, setEmptyIllustrationIndex] = React.useState(0);
  const [emptyIllustrationUnavailable, setEmptyIllustrationUnavailable] =
    React.useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    if (!open) return;

    setSourceIndex(0);
    setImageUnavailable(false);
    setEmptyIllustrationIndex(0);
    setEmptyIllustrationUnavailable(false);
    setUploadedImageUrl(null);
  }, [open]);

  React.useEffect(() => {
    return () => {
      if (uploadedImageUrl) URL.revokeObjectURL(uploadedImageUrl);
    };
  }, [uploadedImageUrl]);

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    if (uploadedImageUrl) URL.revokeObjectURL(uploadedImageUrl);

    setUploadedImageUrl(URL.createObjectURL(file));
    event.target.value = "";
  }

  const imageUrl = uploadedImageUrl ?? (imageUnavailable ? null : ktpImageSources[sourceIndex]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] max-w-[620px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <header className="flex items-center justify-between border-b border-slate-300 px-5 py-4">
          <h2 className="text-[18px] font-bold tracking-tight text-black">
            Foto KTP Anggota
          </h2>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] text-black transition hover:bg-slate-100"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-5 w-5" strokeWidth={3} />
          </button>
        </header>

        <main className="min-h-[340px] bg-white px-5 py-5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={handleUpload}
          />

          {imageUrl ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-[5px] border border-slate-300 bg-slate-50 p-3">
              <img
                src={imageUrl}
                alt={`KTP ${memberName}`}
                className="max-h-[42vh] w-auto max-w-full rounded-[4px] object-contain shadow-sm"
                onError={() => {
                  if (uploadedImageUrl) {
                    setUploadedImageUrl(null);
                    return;
                  }

                  const nextIndex = sourceIndex + 1;

                  if (nextIndex < ktpImageSources.length) {
                    setSourceIndex(nextIndex);
                    return;
                  }

                  setImageUnavailable(true);
                }}
              />
            </div>
          ) : (
            <div className="flex min-h-[390px] flex-col items-center justify-center px-4 text-center">
              {!emptyIllustrationUnavailable ? (
                <img
                  src={emptyIllustrationSources[emptyIllustrationIndex]}
                  alt=""
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
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-[#3366FF] px-5 text-[14px] font-semibold text-white transition hover:bg-[#2855d9]"
              >
                <Upload className="h-4 w-4" />
                Unggah Foto KTP Anggota
              </button>
            </div>
          )}
        </main>

        <footer className="flex justify-end border-t border-slate-300 px-5 py-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-9 min-w-[88px] rounded-[5px] bg-[#2fb300] px-4 text-[12px] font-bold text-white transition hover:bg-[#279800]"
          >
            Selesai
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}