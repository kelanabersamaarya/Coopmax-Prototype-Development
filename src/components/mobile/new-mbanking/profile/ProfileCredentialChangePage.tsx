import * as React from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";
import ProfileChangePasswordConfirmModal from "@/components/mobile/new-mbanking/profile/ProfileChangePasswordConfirmModal";
import ProfilePinNumericKeyboard, {
  type ProfilePinFieldKey,
} from "@/components/mobile/new-mbanking/profile/ProfilePinNumericKeyboard";
import ProfileTopToast from "@/components/mobile/new-mbanking/profile/ProfileTopToast";

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
    <div className="flex h-full min-h-full flex-col bg-[#F9F9F9] px-6 py-[30px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center pb-[124px]">
        <section className="flex w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white px-7 py-9 text-center shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EAF8EF]">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#33AA00] text-white">
              <Check className="h-[54px] w-[54px]" strokeWidth={3.8} />
            </div>
          </div>

          <h1 className="mt-[30px] max-w-[310px] text-[20px] font-bold leading-tight tracking-[-0.025em] text-black">
            {isPin ? "PIN Berhasil Diubah" : "Kata Sandi Berhasil Diubah"}
          </h1>

          <p className="mt-[14px] max-w-[310px] text-[14px] font-normal leading-relaxed text-[#828282]">
            {isPin
              ? "Perubahan PIN berhasil dilakukan, silakan masuk kembali untuk melanjutkan penggunaan M-Banking"
              : "Perubahan kata sandi berhasil dilakukan, silakan masuk kembali untuk melanjutkan penggunaan M-Banking"}
          </p>
        </section>
      </main>

      <div className="absolute inset-x-6 bottom-[30px] z-10">
        <button
          type="button"
          onClick={onRequireLogin}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Masuk
        </button>
      </div>
    </div>
  );
}

function SecretField({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
  maxLength,
  readOnly = false,
  active = false,
  onActivate,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  readOnly?: boolean;
  active?: boolean;
  onActivate?: () => void;
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
          onPointerDown={(event) => {
            if (!readOnly) return;
            event.preventDefault();
            event.stopPropagation();
            onActivate?.();
          }}
          onClick={() => {
            if (!readOnly) return;
            onActivate?.();
          }}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          readOnly={readOnly}
          className={cn(
            "h-[44px] w-full rounded-[12px] border bg-white px-4 pr-[48px]",
            "text-[14px] font-normal text-black shadow-none outline-none",
            "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
            active
              ? "border-[#2563eb] shadow-[0_0_0_2px_rgba(37,99,235,0.18)]"
              : "border-[#CDD4E0] focus:border-[#479DF4]",
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
  const [activePinField, setActivePinField] =
    React.useState<ProfilePinFieldKey | null>(null);
  const [toastMessage, setToastMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const isSubmitDisabled =
    !oldValue.trim() || !newValue.trim() || !confirmValue.trim();

  function normalizeInput(value: string) {
    if (!isPin) return value;
    return value.replace(/[^\d]/g, "").slice(0, 6);
  }

  function showWarning(message: string) {
    setToastMessage("");
    window.setTimeout(() => setToastMessage(message), 0);
  }

  function validateForm() {
    if (!oldValue.trim() || !newValue.trim() || !confirmValue.trim()) {
      showWarning("Semua field wajib diisi.");
      return false;
    }

    if (newValue !== confirmValue) {
      showWarning(
        isPin
          ? "Konfirmasi PIN baru belum sama."
          : "Konfirmasi kata sandi baru belum sama.",
      );
      return false;
    }

    if (isPin && newValue.length < 6) {
      showWarning("PIN baru minimal 6 digit.");
      return false;
    }

    return true;
  }

  function submit() {
    if (isSubmitDisabled) return;
    if (!validateForm()) return;

    setActivePinField(null);
    setConfirmOpen(true);
  }

  function updatePinField(field: ProfilePinFieldKey, value: string) {
    const normalized = normalizeInput(value);

    if (field === "old") setOldValue(normalized);
    if (field === "new") setNewValue(normalized);
    if (field === "confirm") setConfirmValue(normalized);

    setToastMessage("");
  }

  if (success) {
    return <SuccessState variant={variant} onRequireLogin={onRequireLogin} />;
  }

  return (
    <ProfileSubPageShell
      title={isPin ? "Ubah PIN" : "Ubah Kata Sandi"}
      onBack={onBack}
      className="relative flex min-h-full flex-col pb-[124px]"
    >
      <style>
        {`
          [data-mobile-screen="true"]:has([data-profile-credential-change-page="true"])
            [data-input-clear-button="true"] {
            display: none !important;
          }

          [data-mobile-screen="true"]:has([data-profile-pin-keyboard="true"])
            [data-profile-credential-change-page="true"] {
            padding-bottom: 360px !important;
          }

          [data-mobile-screen="true"]:has([data-profile-credential-change-page="true"]):has([data-numeric-keyboard="true"])
            [data-profile-submit-cta="true"] {
            display: none !important;
          }

          [data-mobile-screen="true"]:has([data-profile-credential-change-page="true"]):has([data-numeric-keyboard="true"])
            [data-numeric-keyboard="true"]
            > button:last-child {
            font-size: 0 !important;
          }

          [data-mobile-screen="true"]:has([data-profile-credential-change-page="true"]):has([data-numeric-keyboard="true"])
            [data-numeric-keyboard="true"]
            > button:last-child::after {
            content: "Selesai";
            font-size: 14px !important;
            font-weight: 600 !important;
            line-height: 1 !important;
          }
        `}
      </style>

      <div data-profile-credential-change-page="true">
        <ProfileTopToast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />

        {isPin ? (
          <ProfilePinNumericKeyboard
            activeField={activePinField}
            values={{
              old: oldValue,
              new: newValue,
              confirm: confirmValue,
            }}
            onChange={updatePinField}
            onClose={() => setActivePinField(null)}
          />
        ) : null}

        <ProfileChangePasswordConfirmModal
          open={confirmOpen}
          title={isPin ? "Yakin Merubah PIN?" : "Yakin Merubah Kata Sandi?"}
          description={
            isPin
              ? "Pastikan PIN baru sudah benar sebelum melanjutkan."
              : "Pastikan kata sandi baru sudah benar sebelum melanjutkan."
          }
          confirmLabel={isPin ? "Ya, Ubah PIN" : "Ya, Ubah Kata Sandi"}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            setSuccess(true);
          }}
        />

        <div className="grid gap-[18px]">
          <SecretField
            label={isPin ? "PIN Lama" : "Kata Sandi Lama"}
            value={oldValue}
            onChange={(value) => {
              setOldValue(normalizeInput(value));
              setToastMessage("");
            }}
            placeholder={isPin ? "Masukkan PIN lama" : "Masukkan kata sandi lama"}
            inputMode={isPin ? "numeric" : "text"}
            maxLength={isPin ? 6 : undefined}
            readOnly={isPin}
            active={activePinField === "old"}
            onActivate={() => setActivePinField("old")}
          />

          <SecretField
            label={isPin ? "PIN Baru" : "Kata Sandi Baru"}
            value={newValue}
            onChange={(value) => {
              setNewValue(normalizeInput(value));
              setToastMessage("");
            }}
            placeholder={isPin ? "Masukkan PIN baru" : "Masukkan kata sandi baru"}
            inputMode={isPin ? "numeric" : "text"}
            maxLength={isPin ? 6 : undefined}
            readOnly={isPin}
            active={activePinField === "new"}
            onActivate={() => setActivePinField("new")}
          />

          <SecretField
            label={isPin ? "Konfirmasi PIN Baru" : "Konfirmasi Kata Sandi Baru"}
            value={confirmValue}
            onChange={(value) => {
              setConfirmValue(normalizeInput(value));
              setToastMessage("");
            }}
            placeholder={isPin ? "Konfirmasi PIN baru" : "Konfirmasi Kata Sandi Baru"}
            inputMode={isPin ? "numeric" : "text"}
            maxLength={isPin ? 6 : undefined}
            readOnly={isPin}
            active={activePinField === "confirm"}
            onActivate={() => setActivePinField("confirm")}
          />
        </div>

        <div
          data-profile-submit-cta="true"
          className="absolute inset-x-6 bottom-[26px] bg-white"
        >
          <button
            type="button"
            onClick={submit}
            disabled={isSubmitDisabled}
            className={cn(
              "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
              "text-[14px] font-semibold leading-none text-white",
              "transition active:scale-[0.98]",
              isSubmitDisabled ? "cursor-not-allowed opacity-60" : "",
            )}
          >
            {isPin ? "Ubah PIN" : "Ubah Kata Sandi"}
          </button>
        </div>
      </div>
    </ProfileSubPageShell>
  );
}