import { useState } from "react";
import { Bell, Check, Info, Signal, Wifi, X } from "lucide-react";
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
  const notificationTitle = "Hari Raya Galungan";
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const confirmationText = "Yakin melakukan push notifikasi banner?";
  const successText = "Berhasil melakukan push notifikasi banner";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4">
      <div className={showConfirmation || showSuccess ? "hidden" : "relative flex max-h-[calc(100vh-48px)] w-full max-w-[542px] flex-col overflow-hidden rounded-[5px] bg-white shadow-2xl"}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
          <h2 className="text-[17px] font-bold text-[#102d58]">Push Notifikasi Banner</h2>
          <button type="button" onClick={onClose} aria-label="Tutup preview" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-[#102d58]"><X className="h-5 w-5" /></button>
        </div>

        <div className="relative h-[500px] min-h-0 flex-none overflow-hidden bg-white px-4 pt-5 sm:px-8">
          <div className="mb-0 rounded-[6px] border border-[#72A7FF] bg-[#EFF6FF] px-3 py-3 text-[#073B88]">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
                <Info className="h-4 w-4" strokeWidth={2.8} />
              </span>
              <div>
                <p className="text-[12px] leading-relaxed">
                  Dengan melakukan notifikasi push notifikasi banner, pengguna M-Banking akan menerima informasi promo, ucapan, serta pemberitahuan penting lainnya secara langsung melalui aplikasi M-Banking.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-0 mx-auto h-[420px] w-[min(100%,350px)] translate-y-3">
            <MobileMockupFrame edgeToEdge squareBottom>
              <div className="relative min-h-[420px] overflow-hidden bg-[#77736f] text-white">
                <img src="/bannerhariraya.jpg" alt="" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-35 blur-[18px]" />
                <div className="absolute inset-0 bg-[#302d2b]/55" />
                <div className="relative px-5 pb-4 pt-3">
                  <div className="flex items-center justify-between text-[12px] font-medium">
                    <span>XL</span>
                    <div className="flex items-center gap-1.5"><span className="text-[10px]">⌁</span><Wifi className="h-3.5 w-3.5" strokeWidth={2.5} /><span className="text-[9px]">Vo LTE</span><Signal className="h-3.5 w-3.5" strokeWidth={3} /><span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-700">82</span></div>
                  </div>
                  <div className="mt-7 flex items-baseline gap-2"><span className="text-[27px] font-semibold tracking-tight">17.43</span><span className="text-[15px]">Sen, 5 Okt</span></div>
                </div>

                <main className="relative space-y-3 px-2 pb-24">
                  <div className="flex min-h-[91px] items-center gap-3 rounded-[32px] bg-white/75 px-3 py-3 text-[#262626] shadow-[0_5px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] bg-white text-[#16a34a] shadow-sm"><Bell className="h-7 w-7" fill="currentColor" /></span>
                    <div className="min-w-0 flex-1"><div className="flex items-baseline gap-2"><p className="truncate text-[13px] font-bold">{notificationTitle}</p><span className="text-[10px] text-slate-600">17.12</span></div><p className="mt-1 text-[12px] leading-tight">Semoga Dharma senantiasa menang atas Adharma, dan kedamaian selalu menyertai kita semua. Mari kita jadikan momentum ini sebagai pengingat akan pentingnya kebersamaan, kejujuran, dan gotong royong dalam kehidupan dan berkoperasi.</p></div>
                  </div>
                </main>
                <div className="absolute inset-x-2 bottom-3 flex justify-between gap-3"><button type="button" className="rounded-full bg-black/20 px-4 py-2 text-[11px] text-white">Pengaturan notifikasi</button><button type="button" className="rounded-full bg-black/20 px-5 py-2 text-[11px] text-white">Hapus</button></div>
              </div>
            </MobileMockupFrame>
          </div>
        </div>

        <footer className="relative z-10 flex justify-end gap-2 border-t border-slate-200 bg-white px-5 py-3">
          <button type="button" onClick={onClose} className="inline-flex h-9 items-center gap-1.5 rounded-[5px] bg-[#8494af] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6f7f9a]"><X className="h-4 w-4" strokeWidth={2.5} />Batal</button>
          <button type="button" onClick={() => setShowConfirmation(true)} className="inline-flex h-9 items-center gap-1.5 rounded-[5px] bg-[#31b900] px-5 text-[13px] font-semibold text-white transition hover:bg-[#279b00]"><span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border-2 border-white"><Check className="h-[14px] w-[14px]" strokeWidth={3.2} /></span>Push Notifikasi Sekarang</button>
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
              <button type="button" onClick={() => { setShowConfirmation(false); if (isActive) { onClose(); } }} className="order-2 h-12 rounded-[5px] bg-[#A7A7A7] px-8 text-[18px] font-semibold text-white transition hover:bg-[#929292]">Cancel</button>
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
