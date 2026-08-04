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
  "/empty box ilustration 1.png",
  "/empty box ilustration 1.jpg",
  "/empty box ilustration 1.jpeg",
  "/empty box ilustration 1.webp",
  "/empty box ilustration 1.svg",
  "/empty box ilustration 1",
];

function KtpExample({ type }: { type: "valid" | "invalid" }) {
  const valid = type === "valid";
  const sources = valid ? ktpImageSources : invalidKtpImageSources;
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [imageUnavailable, setImageUnavailable] = React.useState(false);

  React.useEffect(() => {
    setSourceIndex(0);
    setImageUnavailable(false);
  }, [type]);

  return (
    <div
      className={cn(
        "h-full overflow-hidden rounded-[10px] border-2 border-dashed bg-slate-50 p-3",
        valid ? "border-[#20b342]" : "border-rose-400",
      )}
    >
      {imageUnavailable ? (
        <div className="grid h-full place-items-center rounded-[8px] bg-slate-100 text-center text-[12px] font-semibold text-slate-500">
          Gambar KTP tidak tersedia
        </div>
      ) : (
        <img
          src={sources[sourceIndex]}
          alt={
            valid
              ? "Contoh foto KTP yang benar"
              : "Contoh foto KTP yang salah"
          }
          className={cn(
            "h-full w-full rounded-[8px] object-cover",
            !valid && "blur-[2px]",
          )}
          onError={() => {
            const nextIndex = sourceIndex + 1;

            if (nextIndex < sources.length) {
              setSourceIndex(nextIndex);
              return;
            }

            setImageUnavailable(true);
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
        )}
      >
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
                Contoh Foto KTP
              </h3>

              <div className="mt-5 grid h-[225px] gap-6 sm:grid-cols-2">
                <div className="flex min-h-0 flex-col">
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-[#20b342]" />
                    Contoh foto KTP yang benar
                  </div>
                  <div className="mt-3 min-h-0 flex-1">
                    <KtpExample type="valid" />
                  </div>
                </div>

                <div className="flex min-h-0 flex-col">
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-700">
                    <X className="h-5 w-5 rounded-full bg-rose-500 p-0.5 text-white" />
                    Contoh foto KTP yang salah
                  </div>
                  <div className="mt-3 min-h-0 flex-1">
                    <KtpExample type="invalid" />
                  </div>
                </div>
              </div>
            </section>

            <section className="pt-[40px]">
              <h3 className="text-[18px] font-bold text-slate-800">Foto KTP</h3>

              <div className="mt-3 flex h-[192px] flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-slate-300 px-5 py-5 text-center">
                {uploadedImageUrl ? (
                  <img
                    src={uploadedImageUrl}
                    alt="Preview KTP yang diunggah"
                    className="max-h-[120px] max-w-full rounded-[6px] object-contain shadow-sm"
                  />
                ) : (
                  <>
                    <IdCard className="h-8 w-8 text-black" strokeWidth={2.4} />
                    <div className="mt-2 text-[16px] font-bold text-black">
                      Foto KTP
                    </div>
                    <p className="mt-1 text-[13px] text-slate-700">
                      Unggah foto KTP Nasabah. Pastikan terlihat jelas untuk
                      validasi identitas.
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500">
                      JPG, JPEG, PNG. Maksimal 1 MB.
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
                  className="mt-3 inline-flex h-9 items-center gap-2 rounded-[4px] bg-[#3366FF] px-4 text-[13px] font-semibold text-white transition hover:bg-[#2855d9]"
                >
                  <Upload className="h-4 w-4" />
                  {uploadedImageUrl ? "Ganti Foto KTP" : "Unggah KTP"}
                </button>
              </div>
            </section>
          </div>

          <div className="mt-7 rounded-[12px] bg-[#fff4cf] px-5 py-4 text-black">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <h3 className="text-[17px] font-bold">
                  Perhatikan Foto KTP yang Anda Unggah Pastikan Sesuai dengan
                  Ketentuan Berikut :
                </h3>
                <ol className="mt-2 list-decimal space-y-0.5 pl-6 text-[14px] leading-relaxed">
                  <li>KTP harus identitas asli untuk validasi identitas.</li>
                  <li>
                    Informasi dalam KTP harus terlihat dengan jelas, tidak blur
                    dan tidak ada objek yang menghalangi KTP.
                  </li>
                  <li>Pastikan KTP full screen dan background foto polos.</li>
                  <li>Format file yang dapat diunggah adalah JPG, JPEG, atau PNG.</li>
                  <li>Maksimal ukuran file yang dapat diunggah adalah 1 MB.</li>
                </ol>
              </div>
            </div>
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
            className="inline-flex h-9 items-center gap-2 rounded-[5px] bg-[#2fb300] px-4 text-[13px] font-semibold text-white transition hover:bg-[#279800]"
          >
            <CheckCircle2 className="h-5 w-5" strokeWidth={3} />
            Simpan
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}

export default function KtpPhotoDialog({
  open,
  onOpenChange,
  memberName,
  hasKtpPhoto,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  memberId: string;
  hasKtpPhoto: boolean;
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
  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    setSourceIndex(0);
    setImageUnavailable(false);
    setEmptyIllustrationIndex(0);
    setEmptyIllustrationUnavailable(false);
    setUploadedImageUrl(null);
    setUploadDialogOpen(false);
  }, [open]);

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
    event.target.value = "";
  }

  const showImage = hasKtpPhoto || uploadedImageUrl !== null;
  const imageUrl =
    uploadedImageUrl ?? (imageUnavailable ? null : ktpImageSources[sourceIndex]);

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
            >
              <X className="h-5 w-5" strokeWidth={3} />
            </button>
          </header>

          <main className="min-h-[340px] bg-white px-5 py-5">
            {showImage && imageUrl ? (
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
                  onClick={() => setUploadDialogOpen(true)}
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
    </>
  );
}