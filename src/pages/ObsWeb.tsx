import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Building2,
} from "lucide-react";
import RupiahMoneyInput from "@/components/anggota/RupiahMoneyInput";
import ObsProdukSelect from "@/components/obs/ObsProdukSelect";
import ObsUploadSection from "@/components/obs/ObsUploadSection";

type Product = "Pinjaman Koperasi";

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

  const [kolektor, setKolektor] = React.useState("");
  const [nominalPengajuan, setNominalPengajuan] = React.useState("0,00");
  const [jangkaWaktuBulan, setJangkaWaktuBulan] = React.useState("");
  const [deskripsi, setDeskripsi] = React.useState("");

  const [produk, setProduk] = React.useState<Product>("Pinjaman Koperasi");
  const [uploadResetKey, setUploadResetKey] = React.useState(0);
  const [ktpCount, setKtpCount] = React.useState(0);
  const [agunanCount, setAgunanCount] = React.useState(0);

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

    const totalDokumen = ktpCount + agunanCount;

    toast.success("Pendaftaran terkirim (prototype)", {
      description: `Produk: ${produk}${totalDokumen > 0 ? ` • File: ${totalDokumen}` : ""}`,
    });

    setNama("");
    setPhone("");
    setEmail("");
    setAlamat("");

    setKolektor("");
    setNominalPengajuan("0,00");
    setJangkaWaktuBulan("");
    setDeskripsi("");

    setProduk("Pinjaman Koperasi");
    setUploadResetKey((current) => current + 1);
  }

  const inputCls = cn(
    "h-11 rounded-2xl border-slate-200 bg-white",
    "text-[14px] font-medium text-slate-900",
    "placeholder:text-slate-400",
    "shadow-sm",
    "focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/15 focus-visible:ring-offset-0",
  );

  const textareaCls = cn(
    "min-h-[120px] rounded-2xl border border-slate-300 bg-white",
    "px-3 py-2.5",
    "text-[14px] font-medium text-slate-900",
    "leading-6",
    "placeholder:text-slate-400",
    "shadow-sm",
    "transition-colors",
    "hover:border-slate-400",
    "focus-visible:border-slate-400 focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/15 focus-visible:ring-offset-0",
    "resize-y",
  );

  const produkSelectContentCls = cn(
    "rounded-[5px] border-slate-200 p-1 shadow-xl",
    "[&_[data-radix-collection-item][data-highlighted]]:bg-[#275AA3]",
    "[&_[data-radix-collection-item][data-highlighted]]:text-white",
    "[&_[data-radix-collection-item][data-state=checked]]:bg-[#275AA3]",
    "[&_[data-radix-collection-item][data-state=checked]]:text-white",
    "[&_[data-radix-collection-item]:hover]:bg-[#275AA3]",
    "[&_[data-radix-collection-item]:hover]:text-white",
  );

  const produkSelectTriggerCls = cn(inputCls, "h-11 justify-between rounded-2xl");

  const logoSrc = "/samudra-harta-logo.png";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="border-b border-slate-200/70 bg-[#dbeafe]">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                <img
                  src={logoSrc}
                  alt="Samudra Harta"
                  className="h-7 w-7 rounded-full object-contain"
                  draggable={false}
                  onError={(event) => {
                    (event.currentTarget as HTMLImageElement).style.display =
                      "none";
                    const parent = (event.currentTarget as HTMLImageElement)
                      .parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className =
                        "grid h-7 w-7 place-items-center text-[hsl(var(--app-accent-2))]";
                      fallback.innerHTML = "";
                      parent.appendChild(fallback);
                    }
                  }}
                />
                <span className="sr-only">
                  <Globe className="h-5 w-5" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="truncate text-[18px] font-extrabold tracking-tight text-[#275AA3]">
                  KOPERASI SIMPAN PINJAM SAMUDRA HARTA
                </div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-1 md:justify-end">
              <TopNavLink label="Beranda" />
              <TopNavLink label="Produk & Layanan" />
              <TopNavLink label="Berita" />
              <TopNavLink label="Tentang Kami" />
              <TopNavLink label="Pengaduan" />
            </nav>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <div className="text-center">
          <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900 md:text-[34px]">
            PENDAFTARAN
          </h1>
          <Breadcrumb />
        </div>

        <div className="mt-7">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-200/70 md:p-6">
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label className="text-[13px] font-semibold text-slate-700">
                  Nama
                </Label>
                <Input
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
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
                    onChange={(event) => setPhone(event.target.value)}
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
                    onChange={(event) => setEmail(event.target.value)}
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
                  onChange={(event) => setAlamat(event.target.value)}
                  className={inputCls}
                  placeholder=""
                />
              </div>

              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label className="text-[13px] font-semibold text-slate-700">
                    Kolektor
                  </Label>
                  <Input
                    value={kolektor}
                    onChange={(event) => setKolektor(event.target.value)}
                    className={inputCls}
                    placeholder=""
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-[13px] font-semibold text-slate-700">
                    Nominal Pengajuan
                  </Label>
                  <RupiahMoneyInput
                    value={nominalPengajuan}
                    onChange={setNominalPengajuan}
                    placeholder="0,00"
                    aria-label="Nominal Pengajuan"
                    className="h-11 rounded-2xl border-slate-200 bg-white px-3 text-[14px] font-medium shadow-sm focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/15 focus-visible:ring-offset-0"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-[13px] font-semibold text-slate-700">
                    Jangka Waktu (bulan)
                  </Label>
                  <Input
                    value={jangkaWaktuBulan}
                    onChange={(event) =>
                      setJangkaWaktuBulan(
                        (event.target.value ?? "").replace(/[^\d]/g, ""),
                      )
                    }
                    className={inputCls}
                    placeholder="0"
                    inputMode="numeric"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-[13px] font-semibold text-slate-700">
                    Deskripsi
                  </Label>
                  <textarea
                    value={deskripsi}
                    onChange={(event) => setDeskripsi(event.target.value)}
                    className={textareaCls}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-[13px] font-semibold text-slate-700">
                  Produk
                </Label>

                <ObsProdukSelect
                  value={produk}
                  onValueChange={(value) => setProduk(value as Product)}
                  options={["Pinjaman Koperasi"]}
                  triggerClassName={produkSelectTriggerCls}
                  contentClassName={produkSelectContentCls}
                />
              </div>

              <ObsUploadSection
                label="KTP"
                resetKey={uploadResetKey}
                onFileCountChange={setKtpCount}
                uploadTitle="Upload Foto"
                uploadButtonText="Unggah KTP"
                helperText="Klik Tombol Dibawah Untuk Mengunggah File Pendukung. (JPG, JPEG, PNG, PDF) — Anda Dapat Menggungah Lebih Dari Satu File."
                accept="image/*,.jpg,.jpeg,.png,.pdf"
              />

              <ObsUploadSection
                label="Agunan"
                resetKey={uploadResetKey}
                onFileCountChange={setAgunanCount}
                uploadTitle="Upload Dokumen"
                uploadButtonText="Unggah Agunan"
                helperText="Klik Tombol Dibawah Untuk Mengunggah File Pendukung. (JPG, JPEG, PNG, PDF) — Anda Dapat Menggungah Lebih Dari Satu File."
                accept="image/*,.jpg,.jpeg,.png,.pdf"
              />

              <Button
                onClick={submit}
                className={cn(
                  "h-12 w-full rounded-full",
                  "text-[14px] font-extrabold tracking-tight text-white",
                )}
                style={{ backgroundColor: "#275AA3" }}
                onMouseEnter={(event) => {
                  (event.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#224f8f";
                }}
                onMouseLeave={(event) => {
                  (event.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#275AA3";
                }}
              >
                Kirim Pendaftaran
              </Button>
            </div>

            <div className="sr-only">
              <Card />
              <Button />
            </div>
          </div>
        </div>
      </div>

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
                    Jl. Suneta, Ubud, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571
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