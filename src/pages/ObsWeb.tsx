import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone, Globe, Building2 } from "lucide-react";

type Product = "Pinjaman Koperasi" | "Produk Tabungan";

function TopNavLink({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full px-3 py-2 text-[13px] font-semibold text-slate-700 transition",
        "hover:bg-white/70 hover:text-slate-900",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
        className,
      )}
      onClick={() =>
        toast("Navigasi (prototype)", {
          description: `Menu: ${label}`,
        })
      }
    >
      {label}
    </button>
  );
}

function Breadcrumb() {
  return (
    <div className="mt-2 flex items-center justify-center gap-2 text-[12px] font-semibold text-slate-500">
      <span className="hover:text-slate-700">Produk & Layanan</span>
      <span className="text-slate-300">/</span>
      <span className="hover:text-slate-700">Pinjaman</span>
      <span className="text-slate-300">/</span>
      <span className="text-slate-900">Pendaftaran</span>
    </div>
  );
}

function FooterInfoRow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0 text-[13px] font-semibold text-white/90">
        {children}
      </div>
    </div>
  );
}

function MiniMapCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-white/10">
      <div className="bg-slate-100 p-3">
        <div className="text-xs font-extrabold uppercase tracking-wide text-slate-700">
          Peta (prototype)
        </div>
        <div className="mt-1 text-xs text-slate-600">
          Tampilan peta belum dihubungkan.
        </div>
      </div>
      <div className="grid place-items-center bg-white p-4">
        <div className="grid h-[140px] w-full place-items-center rounded-xl border border-slate-200 bg-slate-50">
          <div className="text-center text-[12px] font-semibold text-slate-600">
            MAP
            <div className="mt-1 text-[11px] font-medium text-slate-500">
              Embedded map placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ObsWeb() {
  const [nama, setNama] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const [produk, setProduk] = React.useState<Product>("Pinjaman Koperasi");
  const [fileName, setFileName] = React.useState<string>("");

  function submit() {
    if (!nama.trim()) {
      toast("Nama wajib diisi", { description: "Mohon lengkapi nama." });
      return;
    }
    if (!phone.trim()) {
      toast("Nomor Telepon wajib diisi", {
        description: "Mohon lengkapi nomor telepon.",
      });
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast("Email belum valid", { description: "Mohon isi email yang benar." });
      return;
    }
    if (!alamat.trim()) {
      toast("Alamat wajib diisi", { description: "Mohon lengkapi alamat." });
      return;
    }

    toast.success("Pendaftaran terkirim (prototype)", {
      description: `Produk: ${produk}${fileName ? ` • Dokumen: ${fileName}` : ""}`,
    });

    setNama("");
    setPhone("");
    setEmail("");
    setAlamat("");
    setProduk("Pinjaman Koperasi");
    setFileName("");
  }

  const inputCls = cn(
    "h-11 rounded-2xl border-slate-200 bg-white",
    "text-[14px] font-medium text-slate-900",
    "placeholder:text-slate-400",
    "shadow-sm",
    "focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/15 focus-visible:ring-offset-0",
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Header */}
      <div className="border-b border-slate-200/70 bg-[#dbeafe]">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                <Globe className="h-5 w-5 text-[hsl(var(--app-accent-2))]" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[14px] font-extrabold tracking-tight text-slate-900">
                  KOPERASI SIMPAN PINJAM SAMUDRA HARTA
                </div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-1 md:justify-end">
              <TopNavLink label="Beranda" />
              <TopNavLink label="Produk & Layanan" />
              <TopNavLink label="Berita" />
              <TopNavLink label="Tentang Kami" />
              <TopNavLink
                label="Pengaduan"
                className="bg-white/50 hover:bg-white/80"
              />
            </nav>
          </div>
        </div>
      </div>

      {/* Page */}
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <div className="text-center">
          <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900 md:text-[34px]">
            PENDAFTARAN
          </h1>
          <Breadcrumb />
        </div>

        <div className="mt-7">
          {/* Hanya 1 panel form (tanpa card wrapper luar) */}
          <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-200/70 md:p-6">
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label className="text-[13px] font-semibold text-slate-700">
                  Nama
                </Label>
                <Input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className={inputCls}
                  placeholder=""
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label className="text-[13px] font-semibold text-slate-700">
                    Nomor Telepon
                  </Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputCls}
                    placeholder=""
                    inputMode="tel"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-[13px] font-semibold text-slate-700">
                    Email
                  </Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                    placeholder=""
                    inputMode="email"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-[13px] font-semibold text-slate-700">
                  Alamat
                </Label>
                <Input
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className={inputCls}
                  placeholder=""
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-[13px] font-semibold text-slate-700">
                  Produk
                </Label>
                <Select value={produk} onValueChange={(v) => setProduk(v as Product)}>
                  <SelectTrigger
                    className={cn(
                      inputCls,
                      "h-11 justify-between rounded-2xl",
                      "[&>svg]:text-slate-400",
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
                    <SelectItem value="Pinjaman Koperasi" className="rounded-xl">
                      Pinjaman Koperasi
                    </SelectItem>
                    <SelectItem value="Produk Tabungan" className="rounded-xl">
                      Produk Tabungan
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="text-[13px] font-semibold text-slate-700">
                  Dokumen (opsional)
                </Label>

                <div className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="grid gap-4 md:grid-cols-[160px_minmax(0,1fr)] md:items-start">
                    <div className="grid place-items-center rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                      <div className="text-[12px] font-extrabold text-slate-500">
                        Pratinjau
                      </div>
                      <div className="mt-1 text-[11px] font-medium text-slate-400">
                        (prototype)
                      </div>
                    </div>

                    <div className="min-w-0">
                      <input
                        type="file"
                        className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
                        onChange={(e) =>
                          setFileName(e.target.files?.[0]?.name ?? "")
                        }
                      />
                      {fileName ? (
                        <div className="mt-2 text-[12px] font-semibold text-slate-700">
                          File: <span className="text-slate-900">{fileName}</span>
                        </div>
                      ) : (
                        <div className="mt-2 text-[12px] text-slate-500">
                          Belum ada file dipilih.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={submit}
                className={cn(
                  "h-12 w-full rounded-full",
                  "bg-[#1d4f91] text-white hover:bg-[#18467f]",
                  "text-[14px] font-extrabold tracking-tight",
                )}
              >
                Kirim Pendaftaran
              </Button>
            </div>

            <div className="sr-only">
              <Card />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 bg-[#0b1220]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1.1fr]">
            <div className="space-y-4">
              <div className="text-[13px] font-extrabold tracking-tight text-white">
                Kontak
              </div>
              <FooterInfoRow icon={Phone}>(0361) 974213</FooterInfoRow>
              <FooterInfoRow icon={Phone}>081338263322</FooterInfoRow>
              <FooterInfoRow icon={Mail}>kspsamudraharta99@gmail.com</FooterInfoRow>
              <FooterInfoRow icon={Globe}>Ksp Samudra Harta</FooterInfoRow>
            </div>

            <div className="space-y-4">
              <div className="text-[13px] font-extrabold tracking-tight text-white">
                Alamat
              </div>
              <FooterInfoRow icon={Building2}>
                <div>
                  <div className="font-extrabold text-white">Kantor Pusat</div>
                  <div className="mt-1 text-[12px] font-semibold text-white/80">
                    Jl. Pasung Gris, Kemenuh, Kec. Sukawati, Kabupaten Gianyar,
                    Bali 80582
                  </div>
                </div>
              </FooterInfoRow>

              <FooterInfoRow icon={MapPin}>
                <div>
                  <div className="font-extrabold text-white">Kantor Cabang</div>
                  <div className="mt-1 text-[12px] font-semibold text-white/80">
                    Jl. Suneta, Ubud, Kecamatan Ubud, Kabupaten Gianyar, Bali
                    80571
                  </div>
                </div>
              </FooterInfoRow>
            </div>

            <div className="space-y-4">
              <div className="text-[13px] font-extrabold tracking-tight text-white">
                Peta
              </div>
              <MiniMapCard />
            </div>
          </div>

          <Separator className="my-8 bg-white/10" />

          <div className="text-[12px] font-semibold text-white/70">
            © 2026 Koperasi Simpan Pinjam Samudra Harta. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}