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
  Trash2,
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

function fileKey(file: File) {
  return `${file.name}::${file.size}::${file.lastModified}`;
}

function uniqByKey<T>(items: T[], keyFn: (item: T) => string) {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of items) {
    const k = keyFn(it);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
}

type PreviewItem = {
  key: string;
  name: string;
  type: string;
  url?: string;
};

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

  // ✅ multi-file
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = React.useState(false);

  // ✅ build preview URLs for ALL image files
  const previews = React.useMemo<PreviewItem[]>(() => {
    return files.map((f) => {
      const key = fileKey(f);
      const isImage = isImageFile(f);
      return {
        key,
        name: f.name,
        type: f.type,
        url: isImage ? URL.createObjectURL(f) : undefined,
      };
    });
  }, [files]);

  React.useEffect(() => {
    return () => {
      previews.forEach((p) => {
        if (p.url) URL.revokeObjectURL(p.url);
      });
    };
  }, [previews]);

  function addFiles(next: File[] | FileList | null | undefined) {
    const list = next ? Array.from(next) : [];
    if (list.length === 0) return;

    setFiles((prev) => uniqByKey([...prev, ...list], fileKey));
  }

  function clearAllFiles() {
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFileByKey(key: string) {
    setFiles((prev) => prev.filter((f) => fileKey(f) !== key));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function openPicker() {
    fileInputRef.current?.click();
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
      description: `Produk: ${produk}${
        files.length > 0 ? ` • Dokumen: ${files.length} file` : ""
      }`,
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
    clearAllFiles();
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
              {/* ✅ Jangan ada menu yang "aktif" */}
              <TopNavLink label="Pengaduan" />
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
                  Dokumen Pendukung (Opsional)
                </Label>

                {/* Hidden native input (tanpa tombol Choose File) */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="sr-only"
                  accept="image/*,.jpg,.jpeg,.png,.pdf"
                  onChange={(e) => addFiles(e.target.files)}
                />

                {/* ✅ Border luar solid */}
                <div className="rounded-3xl border border-slate-200 bg-white p-2">
                  {/* ✅ Preview semua file di atas dropzone (tanpa header box) */}
                  {files.length > 0 ? (
                    <div className="mb-2 bg-white">
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {previews.map((p) => (
                          <div
                            key={p.key}
                            className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200"
                          >
                            <div className="flex items-center justify-between gap-2 px-3 py-2">
                              <div className="min-w-0">
                                <div
                                  className="truncate text-[12px] font-extrabold text-slate-900"
                                  title={p.name}
                                >
                                  {p.name}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFileByKey(p.key)}
                                className={cn(
                                  "inline-flex h-8 w-8 items-center justify-center rounded-full",
                                  "bg-slate-900/5 text-slate-700 transition hover:bg-slate-900/10",
                                )}
                                aria-label={`Hapus ${p.name}`}
                                title="Hapus"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {p.url ? (
                              <div className="bg-white p-3">
                                <img
                                  src={p.url}
                                  alt={p.name}
                                  className="h-[160px] w-full rounded-xl object-cover ring-1 ring-slate-200"
                                  draggable={false}
                                />
                              </div>
                            ) : (
                              <div className="bg-white p-3">
                                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-700 ring-1 ring-slate-200">
                                    <FileText className="h-5 w-5" />
                                  </span>
                                  <div className="min-w-0">
                                    <div className="text-[12px] font-extrabold text-slate-900">
                                      File terpilih
                                    </div>
                                    <div className="mt-1 text-[11px] font-semibold text-slate-600">
                                      Preview hanya tersedia untuk gambar.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={openPicker}
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
                      addFiles(e.dataTransfer.files);
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
                          Upload Dokumen
                        </div>
                        <div className="mt-1 max-w-[520px] text-center text-[12px] font-semibold text-slate-600">
                          Klik Tombol Dibawah Untuk Mengunggah File Pendukung. (JPG,
                          JPEG, PNG, PDF) — Anda Dapat Menggungah Lebih Dari Satu File.
                        </div>
                      </div>

                      <div
                        className={cn(
                          "mt-2 inline-flex items-center justify-center rounded-[8px] px-4 py-2",
                          "text-[12.5px] font-semibold text-white",
                          "ring-1 transition",
                        )}
                        style={{
                          backgroundColor: "#275AA3",
                          borderColor: "rgba(39,90,163,0.25)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor =
                            "#224f8f";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor =
                            "#275AA3";
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Unggah Dokumen
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <Button
                onClick={submit}
                className={cn(
                  "h-12 w-full rounded-full",
                  "text-[14px] font-extrabold tracking-tight text-white",
                )}
                style={{ backgroundColor: "#275AA3" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#224f8f";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#275AA3";
                }}
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