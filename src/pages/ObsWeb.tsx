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
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Building2,
  Image as ImageIcon,
  Upload,
  FileText,
  X,
} from "lucide-react";

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

function onlyDigits(input: string) {
  return (input ?? "").replace(/[^\d]/g, "");
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

export default function ObsWeb() {
  const [nama, setNama] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [alamat, setAlamat] = React.useState("");

  // NEW fields (below Alamat)
  const [kolektor, setKolektor] = React.useState("");
  const [nominalPengajuan, setNominalPengajuan] = React.useState("");
  const [jangkaWaktuBulan, setJangkaWaktuBulan] = React.useState("");
  const [deskripsi, setDeskripsi] = React.useState("");

  const [produk, setProduk] = React.useState<Product>("Pinjaman Koperasi");
  const [fileName, setFileName] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const previewUrl = React.useMemo(() => {
    if (!file) return null;
    if (!isImageFile(file)) return null;
    return URL.createObjectURL(file);
  }, [file]);

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handlePickFile(next: File | null | undefined) {
    setFile(next ?? null);
    setFileName(next?.name ?? "");
  }

  function clearFile() {
    setFile(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

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

    setKolektor("");
    setNominalPengajuan("");
    setJangkaWaktuBulan("");
    setDeskripsi("");

    setProduk("Pinjaman Koperasi");
    clearFile();
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

              {/* NEW fields below Alamat (✅ one column) */}
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label className="text-[13px] font-semibold text-slate-700">
                    Kolektor
                  </Label>
                  <Input
                    value={kolektor}
                    onChange={(e) => setKolektor(e.target.value)}
                    className={inputCls}
                    placeholder=""
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-[13px] font-semibold text-slate-700">
                    Nominal Pengajuan
                  </Label>
                  <Input
                    value={nominalPengajuan}
                    onChange={(e) => setNominalPengajuan(onlyDigits(e.target.value))}
                    className={inputCls}
                    placeholder="0"
                    inputMode="numeric"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-[13px] font-semibold text-slate-700">
                    Jangka Waktu (bulan)
                  </Label>
                  <Input
                    value={jangkaWaktuBulan}
                    onChange={(e) => setJangkaWaktuBulan(onlyDigits(e.target.value))}
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
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className={textareaCls}
                    placeholder=""
                  />
                </div>
              </div>
              {/* END new fields */}

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

                {/* Hidden native input (tanpa tombol Choose File) */}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  accept="image/*,.jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handlePickFile(e.target.files?.[0])}
                />

                {/* ✅ Border luar solid */}
                <div className="rounded-3xl border border-slate-200 bg-white p-2">
                  {/* ✅ Preview di atas dropzone dashed */}
                  {file ? (
                    <div className="mb-2 overflow-hidden rounded-[20px] bg-slate-50 ring-1 ring-slate-200">
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <div className="min-w-0">
                          <div className="truncate text-[13px] font-extrabold text-slate-900">
                            Preview
                          </div>
                          <div className="mt-0.5 truncate text-[12px] font-semibold text-slate-600">
                            {file.name}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={clearFile}
                          className={cn(
                            "inline-flex h-9 w-9 items-center justify-center rounded-full",
                            "bg-white text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100",
                          )}
                          aria-label="Hapus file"
                          title="Hapus file"
                        >
                          <X className="h-4.5 w-4.5" />
                        </button>
                      </div>

                      {previewUrl ? (
                        <div className="bg-white p-3">
                          <img
                            src={previewUrl}
                            alt={file.name}
                            className="mx-auto max-h-[240px] w-full rounded-2xl object-contain ring-1 ring-slate-200"
                            draggable={false}
                          />
                        </div>
                      ) : (
                        <div className="bg-white p-4">
                          <div className="flex items-start gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-700 ring-1 ring-slate-200">
                              <FileText className="h-5 w-5" />
                            </span>

                            <div className="min-w-0">
                              <div className="text-[13px] font-extrabold text-slate-900">
                                File terpilih
                              </div>
                              <div className="mt-1 text-[12px] font-semibold text-slate-600">
                                Preview hanya tersedia untuk gambar (JPG/PNG). File ini akan tetap ikut terkirim saat submit.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragActive(true);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragActive(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragActive(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragActive(false);
                      handlePickFile(e.dataTransfer.files?.[0]);
                    }}
                    className={cn(
                      "w-full rounded-[20px] border-2 border-dashed p-4 text-left transition",
                      dragActive
                        ? "border-[hsl(var(--app-accent))] bg-[hsl(var(--app-accent))]/5"
                        : "border-slate-200 bg-white hover:bg-slate-50",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/15 focus-visible:ring-offset-0",
                    )}
                    aria-label="Unggah dokumen"
                  >
                    <div className="grid place-items-center gap-2 py-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-700 ring-1 ring-slate-200">
                        <ImageIcon className="h-5 w-5" />
                      </span>

                      <div className="text-center">
                        <div className="text-[13px] font-extrabold text-slate-900">
                          {fileName ? "File terpilih" : "Upload Dokumen"}
                        </div>
                        <div className="mt-1 max-w-[520px] text-center text-[12px] font-semibold text-slate-600">
                          {fileName
                            ? fileName
                            : "Klik tombol di bawah atau drag & drop file ke area ini. (JPG, JPEG, PNG, PDF)"}
                        </div>
                      </div>

                      <div className="mt-2 inline-flex items-center justify-center rounded-[8px] bg-[#2563eb] px-4 py-2 text-[12.5px] font-semibold text-white ring-1 ring-[#2563eb]/25 transition hover:bg-[#1d4ed8]">
                        <Upload className="mr-2 h-4 w-4" />
                        Unggah Dokumen
                      </div>

                      {fileName ? (
                        <div className="mt-1 text-[12px] font-semibold text-slate-500">
                          Klik lagi untuk ganti file.
                        </div>
                      ) : null}
                    </div>
                  </button>
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