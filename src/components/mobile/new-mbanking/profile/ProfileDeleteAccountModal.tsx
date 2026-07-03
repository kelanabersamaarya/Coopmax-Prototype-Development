import * as React from "react";
import { createPortal } from "react-dom";
import { Check, Eye, EyeOff, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileDeleteAccountConfirmModal from "@/components/mobile/new-mbanking/profile/ProfileDeleteAccountConfirmModal";

function DeleteSuccessPage({ onGoOnboarding }: { onGoOnboarding?: () => void }) {
  return (
    <div className="absolute inset-0 z-[140] flex flex-col bg-[#F9F9F9] px-6 py-[30px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center pb-[124px]">
        <section className="flex w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white px-7 py-9 text-center shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EAF8EF]">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#33AA00] text-white">
              <Check className="h-[54px] w-[54px]" strokeWidth={3.8} />
            </div>
          </div>

          <h1 className="mt-[30px] max-w-[300px] text-[20px] font-bold leading-[1.25] tracking-[-0.025em] text-black">
            Akun Berhasil Dihapus
          </h1>

          <p className="mt-[14px] max-w-[305px] text-[14px] font-normal leading-relaxed text-[#828282]">
            Akun M-Banking Anda telah dihapus. Silakan kembali ke halaman awal aplikasi.
          </p>
        </section>
      </main>

      <div className="absolute inset-x-6 bottom-[30px] z-10">
        <button
          type="button"
          onClick={onGoOnboarding}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Kembali ke Onboarding
        </button>
      </div>
    </div>
  );
}

export default function ProfileDeleteAccountModal({
  open,
  onOpenChange,
  onAccountDeleted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccountDeleted?: () => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
    setPassword("");
    setShowPassword(false);
    setConfirmOpen(false);
    setSuccess(false);
  }, [open]);

  if (!open || !mobileScreen) return null;

  if (success) {
    return createPortal(
      <DeleteSuccessPage onGoOnboarding={onAccountDeleted} />,
      mobileScreen,
    );
  }

  return createPortal(
    <>
      <ProfileDeleteAccountConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          setSuccess(true);
        }}
      />

      <div className="absolute inset-0 z-[130] flex items-end bg-black/35 px-5 pb-5">
        <button
          type="button"
          className="absolute inset-0 cursor-default"
          aria-label="Tutup hapus akun"
          onClick={() => onOpenChange(false)}
        />

        <div className="relative z-10 w-full overflow-hidden rounded-[8px] bg-white px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[16px] font-bold leading-tight text-black">
                Hapus Akun
              </div>
              <p className="mt-2 text-[13px] font-normal leading-relaxed text-[#828282]">
                Masukkan kata sandi untuk mengonfirmasi penghapusan akun M-Banking.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-black transition active:scale-[0.98]"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
            </button>
          </div>

          <div className="mt-[22px] grid gap-[9px]">
            <label className="text-[14px] font-bold leading-none text-black">
              Kata Sandi<span className="text-[#EF135D]">*</span>
            </label>

            <div className="relative">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                className={cn(
                  "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-4 pr-[48px]",
                  "text-[14px] font-normal text-black shadow-none outline-none",
                  "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                  "focus:border-[#479DF4]",
                )}
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-[7px] top-1/2 inline-flex h-[32px] w-[32px] -translate-y-1/2 items-center justify-center rounded-full text-[#828282] transition active:scale-[0.98]"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                title={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                {showPassword ? (
                  <Eye className="h-[21px] w-[21px]" strokeWidth={2.6} />
                ) : (
                  <EyeOff className="h-[21px] w-[21px]" strokeWidth={2.6} />
                )}
              </button>
            </div>
          </div>

          <div className="mt-[24px] grid gap-[10px]">
            <button
              type="button"
              onClick={() => {
                if (!password.trim()) return;
                setConfirmOpen(true);
              }}
              disabled={!password.trim()}
              className={cn(
                "h-[46px] rounded-[8px] bg-[#DC3545]",
                "text-[12px] font-semibold leading-none text-white",
                "transition active:scale-[0.98]",
                !password.trim() ? "cursor-not-allowed opacity-60" : "",
              )}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Trash2 className="h-4 w-4" strokeWidth={2.7} />
                Hapus Akun
              </span>
            </button>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "h-[46px] rounded-[8px] border border-[#D9D9D9] bg-white",
                "text-[12px] font-semibold leading-none text-[#828282]",
                "transition active:scale-[0.98]",
              )}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </>,
    mobileScreen,
  );
}