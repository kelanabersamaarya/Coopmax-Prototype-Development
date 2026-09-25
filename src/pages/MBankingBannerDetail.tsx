import { List, Pencil, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export type SavedBanner = {
  id: string;
  name: string;
  start: string;
  end: string;
  active: boolean;
  content: string;
  images: string[];
};

const bannerStorageKey = "mbanking-banners";

function normalizeBanner(banner: Partial<SavedBanner>, index: number): SavedBanner {
  return {
    id: banner.id || `saved-${index}`,
    name: banner.name || "Banner Baru",
    start: banner.start || "-",
    end: banner.end || "-",
    active: Boolean(banner.active),
    content: banner.content || "",
    images: Array.isArray(banner.images) ? banner.images : [],
  };
}

export default function MBankingBannerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const banners = (JSON.parse(window.localStorage.getItem(bannerStorageKey) || "[]") as Partial<SavedBanner>[]).map(normalizeBanner);
  const banner = banners.find((item) => item.id === id);

  if (!banner) {
    return (
      <div className="min-h-screen bg-[#f4f6fc] px-5 py-8 text-[#062c63] md:px-10">
        <button type="button" onClick={() => navigate("/mobile/mbanking-banners")} className="flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] text-[#526784] shadow-sm transition-colors hover:bg-[#f8faff]"><List className="h-4 w-4" />Kembali ke Daftar</button>
        <div className="mt-8 rounded-[22px] bg-white p-8">Data banner tidak ditemukan.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fc] px-5 py-7 text-[#062c63] md:px-10 md:py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[22px] font-semibold">Banner <span className="text-[16px] font-normal">Detail</span></h1>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => navigate("/mobile/mbanking-banners")} className="flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] text-[#526784] shadow-sm transition-colors hover:bg-[#f8faff]"><List className="h-4 w-4" />Kembali ke Daftar</button>
          <button type="button" onClick={() => navigate(`/mobile/mbanking-banners/${banner.id}/ubah`)} className="flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] text-[#526784] shadow-sm"><Pencil className="h-4 w-4" />Ubah</button>
          <button type="button" className="flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] text-[#526784] shadow-sm"><Trash2 className="h-4 w-4" />Hapus</button>
        </div>
      </div>

      <section className="mt-8 rounded-[22px] bg-white px-8 py-8 md:px-12 md:py-9">
        <h2 className="text-[15px] font-bold uppercase">Detail Banner</h2>
        <dl className="mt-5 grid max-w-[600px] grid-cols-[198px_1fr] gap-y-4 text-[13px]">
          <dt className="text-[#7184a2]">Nama Banner</dt><dd>: {banner.name}</dd>
          <dt className="text-[#7184a2]">Tanggal Banner</dt><dd>: {banner.start}</dd>
          <dt className="text-[#7184a2]">Tanggal Kadaluarsa</dt><dd>: {banner.end}</dd>
          <dt className="text-[#7184a2]">Status</dt><dd><span className={`rounded px-3 py-1 text-[11px] font-bold text-white ${banner.active ? "bg-green-600" : "bg-red-500"}`}>{banner.active ? "Aktif" : "Tidak Aktif"}</span></dd>
        </dl>

        <div className="mt-9 border-t border-[#d8dde7] pt-4">
          <h2 className="text-[15px] font-bold uppercase">Daftar Gambar Banner</h2>
          <div className="mt-4 grid grid-cols-[230px_1fr] border-b border-[#cbd5e1] pb-2 text-[12px] font-semibold uppercase text-[#7184a2]"><span className="pl-4">No.</span><span>Gambar</span></div>
          {banner.images.length > 0 ? banner.images.map((image, index) => <div key={`${image}-${index}`} className="grid min-h-[190px] grid-cols-[230px_1fr] items-center border-b border-[#e2e6ed] text-[12px]"><span className="pl-4">{index + 1}</span><img src={image} alt={`${banner.name} ${index + 1}`} className="h-[170px] w-[140px] object-cover" /></div>) : null}
        </div>

        <div className="mt-4 border-t border-[#d8dde7] pt-4">
          <h2 className="text-[15px] font-bold uppercase">Konten Banner</h2>
          <p className="mt-5 whitespace-pre-wrap text-[13px] text-[#123664]">{banner.content || "-"}</p>
        </div>
      </section>
    </div>
  );
}
