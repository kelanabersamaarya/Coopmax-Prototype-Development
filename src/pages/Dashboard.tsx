import * as React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ReceiptText, UsersRound, Landmark } from "lucide-react";

function DevMenuCard({
  title,
  subtitle,
  icon: Icon,
  onClick,
  accent = "violet",
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  accent?: "violet" | "sky" | "emerald";
}) {
  const accentMap: Record<string, { bg: string; ring: string; text: string }> = {
    violet: {
      bg: "bg-violet-100",
      ring: "ring-violet-200",
      text: "text-violet-700",
    },
    sky: { bg: "bg-sky-100", ring: "ring-sky-200", text: "text-sky-700" },
    emerald: {
      bg: "bg-emerald-100",
      ring: "ring-emerald-200",
      text: "text-emerald-700",
    },
  };

  const a = accentMap[accent];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full text-left",
        "rounded-[5px] bg-white/90 p-3.5 shadow-sm ring-1 ring-slate-200/70 backdrop-blur",
        "transition hover:bg-white",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-[5px] ring-1",
            a.bg,
            a.ring,
          )}
        >
          <Icon className={cn("h-4.5 w-4.5", a.text)} />
        </div>

        <div className="min-w-0">
          <div className="text-[13px] font-extrabold tracking-tight text-slate-900">
            {title}
          </div>
          <div className="mt-1 text-[11px] leading-relaxed text-slate-600">
            {subtitle}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [logoOk, setLogoOk] = React.useState(true);

  // Pastikan nama ini sama persis dengan file di /public
  const logoSrc = "/publiccoopmax-logo.png.png";

  return (
    <div className="min-h-[calc(100vh-2rem)] overflow-hidden rounded-[5px] bg-white/70 p-3 shadow-sm ring-1 ring-slate-200/70 backdrop-blur md:p-3.5">
      <div className="mb-3 rounded-[5px] bg-white/90 p-3.5 shadow-sm ring-1 ring-slate-200/70 backdrop-blur md:mb-3.5">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] bg-white ring-1 ring-slate-200">
            {logoOk ? (
              <img
                src={logoSrc}
                alt="Coopmax"
                className="h-6 w-6 object-contain"
                draggable={false}
                onError={() => setLogoOk(false)}
              />
            ) : (
              <div className="text-[10px] font-bold text-slate-600">Logo</div>
            )}
          </div>

          <div className="min-w-0">
            <div className="text-base font-extrabold tracking-tight text-slate-900 md:text-lg">
              Hi, Admin
            </div>
            <div className="mt-0.5 text-[13px] font-semibold tracking-tight text-slate-700">
              Selamat datang di dashboard pengembangan{" "}
              <span className="text-violet-700">Coopmax</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[5px] bg-slate-50/70 p-3 ring-1 ring-slate-200 md:p-3.5">
        <div className="grid gap-2.5 md:grid-cols-2">
          <DevMenuCard
            title="Pinjaman Billing"
            subtitle="Alur pinjaman dengan penjadwalan billing & pembayaran angsuran."
            icon={ReceiptText}
            accent="sky"
            onClick={() => {
              toast("Membuka Pinjaman Billing", {
                description: "Diarahkan ke Anggota → Transaksi (prototype).",
              });
              navigate("/anggota/transaksi");
            }}
          />

          <DevMenuCard
            title="OBS Samudra Harta"
            subtitle="Menu OBS untuk monitoring & aktivitas operasional (prototype)."
            icon={Landmark}
            accent="emerald"
            onClick={() =>
              toast("OBS Samudra Harta (prototype)", {
                description: "Menu ini belum dihubungkan ke halaman khusus.",
              })
            }
          />

          <DevMenuCard
            title="Pinjaman Tanggung Renteng"
            subtitle="Skema kelompok (TR) untuk pengajuan, monitoring, dan pembayaran."
            icon={UsersRound}
            accent="violet"
            onClick={() =>
              toast("Pinjaman Tanggung Renteng (prototype)", {
                description: "Shortcut ini masih menu pengembangan.",
              })
            }
          />
        </div>
      </div>
    </div>
  );
}