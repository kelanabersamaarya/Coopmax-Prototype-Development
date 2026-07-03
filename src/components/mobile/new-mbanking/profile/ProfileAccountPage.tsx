import * as React from "react";
import { ChevronRight, Fingerprint, KeyRound, LockKeyhole, Trash2 } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";
import ProfileToggle from "@/components/mobile/new-mbanking/profile/ProfileToggle";

function AccountMenuRow({
  icon: Icon,
  title,
  subtitle,
  trailing,
  danger = false,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  subtitle: string;
  trailing?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-4 border-b border-[#EEF0F4] px-4 py-4 text-left transition active:scale-[0.99] last:border-b-0"
    >
      <span
        className={
          danger
            ? "grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#DC3545] text-white"
            : "grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white"
        }
      >
        <Icon className="h-[23px] w-[23px] text-white" strokeWidth={2.6} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-bold leading-tight text-black">
          {title}
        </span>
        <span className="mt-[5px] block text-[12px] font-normal leading-snug text-[#8F8F8F]">
          {subtitle}
        </span>
      </span>

      {trailing ?? (
        <ChevronRight className="h-[22px] w-[22px] shrink-0 text-black" strokeWidth={2.6} />
      )}
    </button>
  );
}

export default function ProfileAccountPage({ onBack }: { onBack: () => void }) {
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);

  return (
    <ProfileSubPageShell title="Akun" onBack={onBack}>
      <div className="overflow-hidden rounded-[22px] bg-white ring-1 ring-[#EEF0F4]">
        <AccountMenuRow
          icon={LockKeyhole}
          title="Ubah Kata Sandi"
          subtitle="Perbarui kata sandi akun M-Banking Anda."
        />
        <AccountMenuRow
          icon={KeyRound}
          title="Ubah PIN"
          subtitle="Ganti 6 digit PIN transaksi Anda."
        />
        <AccountMenuRow
          icon={Fingerprint}
          title="Login Biometric"
          subtitle="Gunakan sidik jari atau Face ID untuk masuk."
          trailing={
            <ProfileToggle
              checked={biometricEnabled}
              onChange={setBiometricEnabled}
            />
          }
        />
        <AccountMenuRow
          icon={Trash2}
          title="Hapus Akun"
          subtitle="Ajukan penghapusan akun M-Banking Anda."
          danger
        />
      </div>
    </ProfileSubPageShell>
  );
}