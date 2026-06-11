"use client";

import * as React from "react";
import { Image as ImageIcon, Trash2, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

function fileKey(file: File) {
  return `${file.name}::${file.size}::${file.lastModified}`;
}

function uniqByKey<T>(items: T[], keyFn: (item: T) => string) {
  const seen = new Set<string>();
  const out: T[] = [];

  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }

  return out;
}

type PreviewItem = {
  key: string;
  name: string;
  url?: string;
};

export default function ObsUploadSection({
  label,
  resetKey,
  onFileCountChange,
}: {
  label: string;
  resetKey: number;
  onFileCountChange?: (count: number) => void;
}) {
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const previews = React.useMemo<PreviewItem[]>(() => {
    return files.map((file) => {
      const key = fileKey(file);

      return {
        key,
        name: file.name,
        url: isImageFile(file) ? URL.createObjectURL(file) : undefined,
      };
    });
  }, [files]);

  React.useEffect(() => {
    onFileCountChange?.(files.length);
  }, [files.length, onFileCountChange]);

  React.useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        if (preview.url) URL.revokeObjectURL(preview.url);
      });
    };
  }, [previews]);

  React.useEffect(() => {
    setFiles([]);
    setDragActive(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [resetKey]);

  function addFiles(next: File[] | FileList | null | undefined) {
    const list = next ? Array.from(next) : [];
    if (list.length === 0) return;

    setFiles((current) => uniqByKey([...current, ...list], fileKey));
  }

  function removeFileByKey(key: string) {
    setFiles((current) => current.filter((file) => fileKey(file) !== key));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function openPicker() {
    fileInputRef.current?.click();
  }

  return (
    <div className="grid gap-2">
      <Label className="text-[13px] font-semibold text-slate-700">
        {label}
      </Label>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="sr-only"
        accept="image/*,.jpg,.jpeg,.png,.pdf"
        onChange={(event) => addFiles(event.target.files)}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-2">
        {files.length > 0 ? (
          <div className="mb-2 bg-white">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {previews.map((preview) => (
                <div
                  key={preview.key}
                  className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200"
                >
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <div className="min-w-0">
                      <div
                        className="truncate text-[12px] font-extrabold text-slate-900"
                        title={preview.name}
                      >
                        {preview.name}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFileByKey(preview.key)}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-full",
                        "bg-slate-900/5 text-slate-700 transition hover:bg-slate-900/10",
                      )}
                      aria-label={`Hapus ${preview.name}`}
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {preview.url ? (
                    <div className="bg-white p-3">
                      <img
                        src={preview.url}
                        alt={preview.name}
                        className="h-[160px] w-full rounded-xl object-cover ring-1 ring-slate-200"
                        draggable={false}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={openPicker}
          onDragEnter={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setDragActive(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setDragActive(false);
            addFiles(event.dataTransfer.files);
          }}
          className={cn(
            "w-full rounded-[20px] border-2 border-dashed p-4 text-left transition",
            dragActive
              ? "border-[hsl(var(--app-accent))] bg-[hsl(var(--app-accent))]/5"
              : "border-slate-200 bg-white hover:bg-slate-50",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/15 focus-visible:ring-offset-0",
          )}
          aria-label={`Unggah ${label}`}
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
              onMouseEnter={(event) => {
                (event.currentTarget as HTMLDivElement).style.backgroundColor =
                  "#224f8f";
              }}
              onMouseLeave={(event) => {
                (event.currentTarget as HTMLDivElement).style.backgroundColor =
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
  );
}