import { ArrowLeft, Bell, X } from "lucide-react";
import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";

type BannerPreview = {
  name: string;
  content: string;
  images: string[];
};

export default function MBankingBannerNotificationPreview({
  banner,
  onClose,
}: {
  banner: BannerPreview;
  onClose: () => void;
}) {
  const image = banner.images[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102d58]/60 p-4">
      <div className="relative flex max-h-[94vh] w-full max-w-[510px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-[17px] font-bold text-[#102d58]">Preview Notifikasi M-Banking</h2>
            <p className="mt-1 text-[12px] text-slate-500">Contoh tampilan banner pada halaman notifikasi pengguna</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup preview" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-[#102d58]"><X className="h-5 w-5" /></button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-[#eef2f8] px-4 py-5 sm:px-8">
          <MobileMockupFrame edgeToEdge>
            <div className="flex min-h-full flex-col bg-white text-[#23305A]">
              <header className="px-6 pb-4 pt-8">
                <div className="flex items-center gap-3">
                  <ArrowLeft className="h-7 w-7 text-[#004FC7]" strokeWidth={2.2} />
                  <h1 className="text-[23px] font-extrabold text-[#004FC7]">Notifikasi</h1>
                </div>
              </header>
              <main className="px-5 pb-8">
                <div className="rounded-[20px] bg-white p-3 shadow-[0_6px_18px_rgba(30,47,83,0.12)]">
                  {image ? <img src={image} alt={banner.name} className="h-[145px] w-full rounded-[14px] object-cover" /> : <div className="flex h-[145px] items-center justify-center rounded-[14px] bg-[#dbe8ff] px-5 text-center text-[18px] font-bold text-[#164a9c]">{banner.name}</div>}
                  <div className="px-1 pb-1 pt-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f0ff] text-[#004FC7]"><Bell className="h-5 w-5 fill-current" /></span>
                      <div className="min-w-0">
                        <p className="text-[16px] font-bold leading-tight text-[#23305A]">{banner.name}</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{banner.content || "Promo, ucapan, dan informasi terbaru dari koperasi."}</p>
                        <p className="mt-3 text-[11px] font-semibold text-[#004FC7]">Hari ini • Informasi M-Banking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </MobileMockupFrame>
        </div>
      </div>
    </div>
  );
}
