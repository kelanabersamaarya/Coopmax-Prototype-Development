import { useState } from "react";
import { Bell, BatteryFull, Check, Info, Signal, Sparkles, Wifi, X } from "lucide-react";
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
      <div className={showConfirmation || showSuccess ? "hidden" : "relative flex max-h-[calc(100vh-18px)] w-full max-w-[542px] flex-col overflow-hidden rounded-[5px] bg-white shadow-2xl"}>
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
                  Dengan melakukan notifikasi push notifikasi banner, pengguna M-Banking akan menerima informasi promo, ucapan, serta pemberitahuan penting lainnya secara langsung melalui aplikasi M-Banking.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-0 mx-auto w-[min(100%,390px)] translate-y-8">
            <MobileMockupFrame edgeToEdge squareBottom>
              <div className="relative flex min-h-[520px] flex-col overflow-hidden bg-[#f5f6fb] text-[#161922]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_4%,rgba(244,206,215,0.9),transparent_42%),radial-gradient(circle_at_85%_20%,rgba(209,220,245,0.8),transparent_46%)]" />
                <div className="relative px-6 pb-5 pt-4">
                  <div className="flex items-center justify-between text-[13px] font-semibold">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5"><Signal className="h-3.5 w-3.5" strokeWidth={3} /><Wifi className="h-3.5 w-3.5" strokeWidth={2.5} /><BatteryFull className="h-4 w-4" strokeWidth={2.5} /></div>
                  </div>
                  <div className="mt-8 flex items-center gap-2">
                    <Bell className="h-7 w-7" strokeWidth={2.4} />
                    <h1 className="text-[26px] font-bold tracking-tight">Notifications</h1>
                  </div>
                </div>

                <main className="relative mx-3 mb-5 overflow-hidden rounded-[20px] bg-white/95 px-4 py-5 shadow-[0_12px_28px_rgba(38,43,70,0.1)]">
                  <div className="mb-4 text-[13px] font-bold">Today</div>
                  <div className="flex gap-3 border-b border-slate-100 pb-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f9d8df] text-[#8b4357]"><Sparkles className="h-5 w-5" /></span>
                    <div className="min-w-0"><p className="text-[13px] font-semibold leading-tight">{notificationTitle}</p><p className="mt-1 text-[12px] text-slate-400">Informasi banner terbaru</p><p className="mt-0.5 text-[11px] text-slate-400">Hari ini pukul 12:00</p></div>
                  </div>
                  <div className="mt-4 text-[13px] font-bold">Tomorrow</div>
                  <div className="mt-3 space-y-4">
                    <div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8ebf3] text-slate-500"><Bell className="h-4 w-4" /></span><div><p className="text-[13px] font-semibold leading-tight">Promo spesial untuk Anda</p><p className="text-[11px] text-slate-400">Dijadwalkan besok pukul 08:00</p></div></div>
                    <div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8ebf3] text-slate-500"><Info className="h-4 w-4" /></span><div><p className="text-[13px] font-semibold leading-tight">Pengingat pembayaran angsuran</p><p className="text-[11px] text-slate-400">Kemarin pukul 15:00</p></div></div>
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-4 text-[13px] font-bold">Tuesday</div>
                  <div className="mt-3 flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8ebf3] text-slate-500"><Check className="h-4 w-4" /></span><div><p className="text-[13px] font-semibold leading-tight">Notifikasi berhasil dikirim</p><p className="text-[11px] text-slate-400">Tuesday at 5 PM</p></div></div>
                </main>
              </div>
            </MobileMockupFrame>
          </div>
        </div>

        <footer className="relative z-10 flex justify-end gap-2 border-t border-slate-200 bg-white px-5 py-4">
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
