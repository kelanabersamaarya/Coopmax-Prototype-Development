import * as React from "react";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  CheckCircle2,
  Info,
  Megaphone,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

type NotificationType = "transaction" | "security" | "promo" | "info";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

const notificationsSeed: NotificationItem[] = [
  {
    id: "notif-1",
    type: "transaction",
    title: "Setoran Berhasil",
    description:
      "Setoran ke Simpanan Kaya sebesar Rp. 500.000,00 telah berhasil diproses.",
    time: "Hari ini, 10:24",
    unread: true,
  },
  {
    id: "notif-2",
    type: "security",
    title: "Login Baru Terdeteksi",
    description:
      "Akun Anda berhasil masuk dari perangkat yang terdaftar. Abaikan jika ini Anda.",
    time: "Hari ini, 09:12",
    unread: true,
  },
  {
    id: "notif-3",
    type: "info",
    title: "Tagihan Angsuran Tersedia",
    description:
      "Tagihan angsuran Pinjaman Billing periode berikutnya sudah tersedia untuk dibayar.",
    time: "Kemarin, 16:40",
    unread: false,
  },
  {
    id: "notif-4",
    type: "promo",
    title: "Promo Transfer Antar Bank",
    description:
      "Nikmati biaya admin lebih ringan untuk transfer antar bank selama periode promo.",
    time: "24 Juni 2026",
    unread: false,
  },
];

function notificationIconConfig(type: NotificationType) {
  if (type === "transaction") {
    return {
      Icon: CheckCircle2,
      frameClassName: "bg-[#33AA00]",
    };
  }

  if (type === "security") {
    return {
      Icon: ShieldCheck,
      frameClassName: "bg-[#479DF4]",
    };
  }

  if (type === "promo") {
    return {
      Icon: Megaphone,
      frameClassName: "bg-[#F59E0B]",
    };
  }

  return {
    Icon: Info,
    frameClassName: "bg-[#7C3AED]",
  };
}

function NotificationCard({
  notification,
  onMarkAsRead,
}: {
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
}) {
  const { Icon, frameClassName } = notificationIconConfig(notification.type);

  return (
    <button
      type="button"
      onClick={() => onMarkAsRead(notification.id)}
      className={cn(
        "block w-full rounded-[18px] bg-white px-4 py-4 text-left",
        "shadow-sm ring-1 ring-[#EEF0F4] transition active:scale-[0.99]",
        notification.unread ? "ring-[#BFE0FF]" : "",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full text-white",
            frameClassName,
          )}
        >
          <Icon className="h-[23px] w-[23px] text-white" strokeWidth={2.6} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
                {notification.title}
              </div>
              <div className="mt-[6px] text-[12px] font-normal leading-relaxed text-[#6B7280]">
                {notification.description}
              </div>
            </div>

            {notification.unread ? (
              <span className="mt-[4px] h-[9px] w-[9px] shrink-0 rounded-full bg-[#479DF4]" />
            ) : null}
          </div>

          <div className="mt-[10px] text-[11px] font-normal leading-none text-[#8F8F8F]">
            {notification.time}
          </div>
        </div>
      </div>
    </button>
  );
}

function EmptyNotificationState() {
  return (
    <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
      <div className="grid h-[92px] w-[92px] place-items-center rounded-full bg-[#479DF4] text-white">
        <Bell className="h-[44px] w-[44px] text-white" strokeWidth={2.4} />
      </div>

      <div className="mt-[24px] text-[18px] font-bold leading-tight text-black">
        Belum Ada Notifikasi
      </div>

      <div className="mt-[10px] max-w-[280px] text-[13px] font-normal leading-relaxed text-[#8F8F8F]">
        Notifikasi transaksi, keamanan, dan informasi koperasi akan muncul di
        sini.
      </div>
    </div>
  );
}

export default function NewMBankingNotificationPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [notifications, setNotifications] = React.useState(notificationsSeed);

  const unreadCount = notifications.filter((item) => item.unread).length;

  function markAsRead(id: string) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({ ...item, unread: false })),
    );
  }

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="min-w-0 flex-1 truncate text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Notifikasi
          </h1>

          {unreadCount > 0 ? (
            <button
              type="button"
              onClick={markAllAsRead}
              className="shrink-0 text-[12px] font-semibold leading-none text-[#479DF4] transition active:scale-[0.98]"
            >
              Baca Semua
            </button>
          ) : null}
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]">
          {notifications.length > 0 ? (
            <div className="grid gap-[12px]">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          ) : (
            <EmptyNotificationState />
          )}

          <div className="sr-only">
            <AlertCircle />
          </div>
        </section>
      </main>
    </div>
  );
}