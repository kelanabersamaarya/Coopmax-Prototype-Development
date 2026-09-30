import { useState } from "react";
import { ArrowLeft, Check, Info, X } from "lucide-react";
import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";

type BannerPreview = {
  name: string;
  content: string;
  images: string[];
};

export default function MBankingBannerNotificationPreview({
  banner,
  onClose,
  isActive = false,
  onToggle,
}: {
  banner: BannerPreview;
  onClose: () => void;
  isActive?: boolean;
  onToggle?: () => void;
}) {
  const image = "/banner_sample.jpeg";
  const notificationTitle = "Spesial Harpelnas";
  const [showConfirmation, setShowConfirmation] = useState(isActive);
  const [showSuccess, setShowSuccess] = useState(false);
  const confirmationText = isActive ? "Yakin menonaktifkan push notifikasi banner?" : "Yakin mengaktifkan push notifikasi banner?";
  const successText = isActive ? "Berhasil menonaktifkan push notifikasi banner" : "Berhasil mengaktifkan push notifikasi banner";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4">
      <div className={showConfirmation || showSuccess ? "hidden" : "relative flex max-h-[76vh] w-full max-w-[525px] flex-col overflow-hidden rounded-[5px] bg-white shadow-2xl"}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-[17px] font-bold text-[#102d58]">Push Notifikasi Banner</h2>
          <button type="button" onClick={onClose} aria-label="Tutup preview" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-[#102d58]"><X className="h-5 w-5" /></button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden bg-white px-4 pt-5 sm:px-8">
          <div className="mb-0 rounded-[6px] border border-[#72A7FF] bg-[#EFF6FF] px-3 py-3 text-[#073B88]">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
                <Info className="h-4 w-4" strokeWidth={2.8} />
              </span>
              <div>
                <p className="text-[12px] leading-relaxed">
                  Dengan mengaktifkan notifikasi push notifikasi banner, pengguna M-Banking akan menerima informasi promo, ucapan, serta pemberitahuan penting lainnya secara langsung melalui aplikasi M-Banking.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-0 mx-auto w-[min(100%,390px)] translate-y-8">
            <MobileMockupFrame edgeToEdge squareBottom>
              <div className="flex min-h-[460px] flex-col overflow-y-auto bg-white text-[#23305A]">
                <header className="px-6 pb-5 pt-8">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="h-7 w-7 text-[#004FC7]" strokeWidth={2.2} />
                    <h1 className="text-[23px] font-extrabold text-[#004FC7]">Notifikasi</h1>
                  </div>
                </header>

                <main className="px-6 pb-12">
                  <div className="flex items-center gap-8">
                    <span className="px-2 py-3 text-[16px] font-bold text-[#004FC7]">Transfer</span>
                    <span className="rounded-full bg-[#004FC7] px-7 py-3 text-[16px] font-bold text-white shadow-sm">Info</span>
                  </div>

                  <article className="mt-4 rounded-[20px] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(30,47,83,0.09)]">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[16px] font-bold leading-tight text-[#23305A]">{notificationTitle}</p>
                      <p className="shrink-0 whitespace-nowrap text-right text-[13px] leading-tight text-[#23305A]">20 Jul 2026 • 12:00</p>
                    </div>
                    <img src={image} alt={notificationTitle} className="mt-3 block w-full rounded-[12px] object-cover" />
                  </article>
                </main>
              </div>
            </MobileMockupFrame>
          </div>
        </div>

        <footer className="relative z-10 flex justify-end gap-2 border-t border-slate-200 bg-white px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-9 items-center gap-1.5 rounded-[5px] bg-[#8494af] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6f7f9a]"><X className="h-4 w-4" strokeWidth={2.5} />Batal</button>
          <button type="button" onClick={() => setShowConfirmation(true)} className="inline-flex h-9 items-center gap-1.5 rounded-[5px] bg-[#31b900] px-5 text-[13px] font-semibold text-white transition hover:bg-[#279b00]"><span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border-2 border-white"><Check className="h-[14px] w-[14px]" strokeWidth={3.2} /></span>{isActive ? "Nonaktifkan" : "Aktifkan"}</button>
        </footer>
      </div>

      {showConfirmation ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-[530px] rounded-[5px] bg-white px-6 py-8 text-center shadow-2xl">
            <div className="mx-auto flex h-[126px] w-[126px] items-center justify-center rounded-full border-[5px] border-[#F7C9A4] text-[#F7B77D]">
              <span className="text-[62px] font-light leading-none">!</span>
            </div>
            <p className="mt-7 text-[30px] font-semibold leading-tight text-[#46576B]">
              {confirmationText}
            </p>
            <div className="mt-7 flex justify-center gap-2">
              <button type="button" onClick={() => { setShowConfirmation(false); onToggle?.(); setShowSuccess(true); }} className="order-1 h-12 rounded-[5px] bg-[#348DD3] px-8 text-[18px] font-semibold text-white ring-2 ring-[#B9D4EA] ring-offset-2 transition hover:bg-[#2679B9]">Yes</button>
              <button type="button" onClick={() => setShowConfirmation(false)} className="order-2 h-12 rounded-[5px] bg-[#A7A7A7] px-8 text-[18px] font-semibold text-white transition hover:bg-[#929292]">Cancel</button>
            </div>
          </div>
        </div>
      ) : null}

      {showSuccess ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-[530px] rounded-[5px] bg-white px-6 py-8 text-center shadow-2xl">
            <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border-[5px] border-[#DFF0D4] text-[#9EDB7D]">
              <Check className="h-12 w-12" strokeWidth={2.5} />
            </div>
            <p className="mt-7 text-[30px] font-semibold leading-tight text-[#5B5B5B]">
              {successText}
            </p>
            <button type="button" onClick={onClose} className="mt-8 h-12 rounded-[5px] bg-[#348DD3] px-10 text-[18px] font-semibold text-white ring-2 ring-[#B9D4EA] ring-offset-2 transition hover:bg-[#2679B9]">OK</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
