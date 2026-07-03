import * as React from "react";
import { Check, Eye, EyeOff, KeyRound, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

type CredentialVariant = "password" | "pin";

function SuccessState({
  variant,
  onRequireLogin,
}: {
  variant: CredentialVariant;
  onRequireLogin?: () => void;
}) {
  const isPin = variant === "pin";

  return (
    <ProfileSubPageShell
      title={isPin ? "Ubah PIN" : "Ubah Kata Sandi"}
      onBack={() => {}}
      className="relative flex min-h-full flex-col pb-[92px]"
    >
      <div className="flex min-h-[520px] flex-1 flex-col items-center justify-center text-center">
        <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EAF8EF]">
          <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#33AA00] text-white">
            <Check className="h-[54px] w-[54px]" strokeWidth={3.8} />
          </div>
        </div>

        <h1 className="mt-[30px] max-w-[310px] text-[20px] font-bold leading-tight tracking-[-0.025em] text-black">
          {isPin ? "PIN Berhasil Diubah" : "Kata Sandi Berhasil Diubah"}
        </h1>

        <p className="mt-[14px] max-w-[310px] text-[14px] font-normal leading-relaxed text-[#828282]">
          Demi keamanan akun, silakan login ulang untuk melanjutkan penggunaan M-Banking.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-white pt-4">
        <button
          type="button"
          onClick={onRequireLogin}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Login Ulang
        </button>
      </div>
    </ProfileSubPageShell>
  );
}

function SecretField({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
}) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="grid gap-[9px]">
      <label className="text-[14px] font-bold leading-none text-black">
        {label}
        <span className="text-[#EF135D]">*</span>
      </label>

      <div className="relative">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          className={cn(
            "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-4 pr-[48px]",
            "text-[14px] font-normal text-black shadow-none outline-none",
            "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
            "focus:border-[#479DF4]",
          )}
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-[7px] top-1/2 inline-flex h-[32px] w-[32px] -translate-y-1/2 items-center justify-center rounded-full text-[#828282] transition active:scale-[0.98]"
          aria-label={visible ? "Sembunyikan" : "Tampilkan"}
          title={visible ? "Sembunyikan" : "Tampilkan"}
        >
          {visible ? (
            <Eye className="h-[21px] w-[21px]" strokeWidth={2.6} />
          ) : (
            <EyeOff className="h-[21px] w-[21px]" strokeWidth={2.6} />
          )}
        </button>
      </div>
    </div>
  );
}

export default function ProfileCredentialChangePage({
  variant,
  onBack,
  onRequireLogin,
}: {
  variant: CredentialVariant;
  onBack: () => void;
  onRequireLogin?: () => void;
}) {
  const isPin = variant === "pin";
  const [oldValue, setOldValue] = React.useState("");
  const [newValue, setNewValue] = React.useState("");
  const [confirmValue, setConfirmValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  function normalizeInput(value: string) {
    if (!isPin) return value;
    return value.replace(/[^\d]/g, "").slice(0, 6);
  }

  function submit() {
    if (!oldValue.trim() || !newValue.trim() || !confirmValue.trim()) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (newValue !== confirmValue) {
      setError(
        isPin
          ? "Konfirmasi PIN baru belum sama."
          : "Konfirmasi kata sandi baru belum sama.",
      );
      return;
    }

    if (isPin && newValue.length < 6) {
      setError("PIN baru minimal 6 digit.");
      return;
    }

    setError("");
    setSuccess(true);
  }

  if (success) {
    return <SuccessState variant={variant} onRequireLogin={onRequireLogin} />;
  }

  const Icon = isPin ? KeyRound : LockKeyhole;

  return (
    <ProfileSubPageShell
      title={isPin ? "Ubah PIN" : "Ubah Kata Sandi"}
      onBack={onBack}
      className="relative flex min-h-full flex-col pb-[92px]"
    >
      <div className="rounded-[22px] bg-[#F8FAFC] p-4 ring-1 ring-[#EEF0F4]">
        <div className="flex items-start gap-3">
          <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
            <Icon className="h-[23px] w-[23px]" strokeWidth={2.6} />
          </span>

          <div className="min-w-0">
            <div className="text-[16px] font-bold leading-tight text-black">
              {isPin ? "Perbarui PIN Transaksi" : "Perbarui Kata Sandi"}
            </div>
            <p className="mt-2 text-[13px] font-normal leading-relaxed text-[#6B7280]">
              {isPin
                ? "Masukkan PIN lama dan PIN baru untuk memperbarui keamanan transaksi."
                : "Masukkan kata sandi lama dan kata sandi baru untuk menjaga keamanan akun."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[24px] grid gap-[18px]">
        <SecretField
          label={isPin ? "PIN Lama" : "Kata Sandi Lama"}
          value={oldValue}
          onChange={(value) => {
            setOldValue(normalizeInput(value));
            setError("");
          }}
          placeholder={isPin ? "Masukkan PIN lama" : "Masukkan kata sandi lama"}
          inputMode={isPin ? "numeric" : "text"}
          maxLength={isPin ? 6 : undefined}
        />

        <SecretField
          label={isPin ? "PIN Baru" : "Kata Sandi Baru"}
          value={newValue}
          onChange={(value) => {
            setNewValue(normalizeInput(value));
            setError("");
          }}
          placeholder={isPin ? "Masukkan PIN baru" : "Masukkan kata sandi baru"}
          inputMode={isPin ? "numeric" : "text"}
          maxLength={isPin ? 6 : undefined}
        />

        <SecretField
          label={isPin ? "Konfirmasi PIN Baru" : "Konfirmasi Kata Sandi Baru"}
          value={confirmValue}
          onChange={(value) => {
            setConfirmValue(normalizeInput(value));
            setError("");
          }}
          placeholder={isPin ? "Ulangi PIN baru" : "Ulangi kata sandi baru"}
          inputMode={isPin ? "numeric" : "text"}
          maxLength={isPin ? 6 : undefined}
        />
      </div>

      {error ? (
        <div className="mt-[14px] rounded-[14px] bg-[#FCE4E7] px-4 py-3 text-[13px] font-semibold text-[#DC3545]">
          {error}
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 bg-white pt-4">
        <button
          type="button"
          onClick={submit}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          {isPin ? "Ubah PIN" : "Ubah Kata Sandi"}
        </button>
      </div>
    </ProfileSubPageShell>
  );
}