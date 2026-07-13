import * as React from "react";
import { ArrowLeft, Landmark, QrCode, Send, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingBankSelectionPage from "@/components/mobile/new-mbanking/NewMBankingBankSelectionPage";
import NewMBankingNewRecipientTransferPage from "@/components/mobile/new-mbanking/NewMBankingNewRecipientTransferPage";
import NewMBankingPaymentMonthSelector from "@/components/mobile/new-mbanking/NewMBankingPaymentMonthSelector";
import NewMBankingPinInputPage from "@/components/mobile/new-mbanking/NewMBankingPinInputPage";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingTransferQrPage from "@/components/mobile/new-mbanking/NewMBankingTransferQrPage";
import type { NewMBankingRecipientInfo } from "@/components/mobile/new-mbanking/NewMBankingRecipientInfoCard";
import {
  getNewMBankingTransferRecipients,
  subscribeNewMBankingTransferRecipients,
  type NewMBankingTransferRecipientKind,
} from "@/lib/newMBankingTransferRecipientsStore";

type TransferTab = "saved" | "history";

type SavedRecipient = {
  id: string;
  name: string;
  bank: string;
  accountNo: string;
};

type TransferHistory = SavedRecipient & {
  dateTime: string;
  amount: string;
  status: "Berhasil";
  month: string;
};

const seedSavedRecipients: SavedRecipient[] = [
  {
    id: "saved-1",
    name: "Nyoman Ariawan",
    bank: "BCA",
    accountNo: "22111122333",
  },
  {
    id: "saved-2",
    name: "Nyoman Ariawan",
    bank: "Mandiri",
    accountNo: "14000999122",
  },
  {
    id: "saved-3",
    name: "Made Wirata",
    bank: "BRI",
    accountNo: "550102223344",
  },
  {
    id: "saved-4",
    name: "Ni Luh Sari",
    bank: "BNI",
    accountNo: "90011222334",
  },
];

const transferHistories: TransferHistory[] = [
  {
    id: "history-1",
    name: "Nyoman Ariawan",
    bank: "BCA",
    accountNo: "22111122333",
    dateTime: "20-06-2026 : 19.00",
    amount: "-50.000,00",
    status: "Berhasil",
    month: "Jun",
  },
  {
    id: "history-2",
    name: "Made Wirata",
    bank: "BRI",
    accountNo: "550102223344",
    dateTime: "19-06-2026 : 14.30",
    amount: "-125.000,00",
    status: "Berhasil",
    month: "Jun",
  },
  {
    id: "history-3",
    name: "Ni Luh Sari",
    bank: "BNI",
    accountNo: "90011222334",
    dateTime: "18-06-2026 : 09.15",
    amount: "-75.000,00",
    status: "Berhasil",
    month: "Jun",
  },
  {
    id: "history-4",
    name: "Kadek Surya",
    bank: "Koperasi",
    accountNo: "4260029",
    dateTime: "24-05-2026 : 11.10",
    amount: "-80.000,00",
    status: "Berhasil",
    month: "Mei",
  },
  {
    id: "history-5",
    name: "Made Wirata",
    bank: "Mandiri",
    accountNo: "7001234567",
    dateTime: "12-04-2026 : 16.45",
    amount: "-200.000,00",
    status: "Berhasil",
    month: "Apr",
  },
];

function uniqueRecipients(items: SavedRecipient[]) {
  const seen = new Set<string>();
  const result: SavedRecipient[] = [];

  for (const item of items) {
    const key = `${item.bank.toLowerCase()}::${item.accountNo}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}

function TransferOptionCard({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[112px] w-full flex-col items-center justify-center",
        "rounded-[18px] bg-white",
        "transition active:scale-[0.99]",
      )}
      aria-label={label}
      title={label}
    >
      <span className="grid h-[58px] w-[58px] place-items-center rounded-full bg-[#479DF4] text-white">
        <Icon className="h-[29px] w-[29px] text-white" strokeWidth={2.35} />
      </span>

      <span className="mt-[12px] text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
        {label}
      </span>
    </button>
  );
}

function TransferTabs({
  active,
  onChange,
}: {
  active: TransferTab;
  onChange: (tab: TransferTab) => void;
}) {
  return (
    <div className="mt-[22px] rounded-full bg-[#EEF0F4] p-[4px]">
      <div className="grid grid-cols-2 gap-[4px]">
        <button
          type="button"
          onClick={() => onChange("saved")}
          className={cn(
            "h-[40px] rounded-full text-[13px] font-bold leading-none transition",
            active === "saved"
              ? "bg-[#479DF4] text-white"
              : "bg-transparent text-[#4B5563]",
          )}
          aria-current={active === "saved" ? "page" : undefined}
        >
          Penerima Tersimpan
        </button>

        <button
          type="button"
          onClick={() => onChange("history")}
          className={cn(
            "h-[40px] rounded-full text-[13px] font-bold leading-none transition",
            active === "history"
              ? "bg-[#479DF4] text-white"
              : "bg-transparent text-[#4B5563]",
          )}
          aria-current={active === "history" ? "page" : undefined}
        >
          Riwayat Transfer
        </button>
      </div>
    </div>
  );
}

function TransferIcon({ showBankName }: { showBankName: boolean }) {
  if (showBankName) {
    return (
      <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#F59E0B] text-white">
        <Landmark className="h-[22px] w-[22px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  return (
    <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#18B7A1] text-white">
      <Send className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
    </span>
  );
}

function SavedRecipientRow({
  recipient,
  showBankName,
  onClick,
}: {
  recipient: SavedRecipient;
  showBankName: boolean;
  onClick: () => void;
}) {
  const subtitle = showBankName
    ? `${recipient.bank} • ${recipient.accountNo}`
    : recipient.accountNo;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-[#EEF0F4] py-[15px] text-left transition active:scale-[0.99] last:border-b-0"
    >
      <TransferIcon showBankName={showBankName} />

      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
          {recipient.name}
        </div>
        <div className="mt-[5px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
          {subtitle}
        </div>
      </div>
    </button>
  );
}

function TransferHistoryRow({
  history,
  showBankName,
  onClick,
}: {
  history: TransferHistory;
  showBankName: boolean;
  onClick: () => void;
}) {
  const subtitle = showBankName
    ? `${history.bank} • ${history.accountNo}`
    : history.accountNo;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 border-b border-[#EEF0F4] py-[15px] text-left transition active:scale-[0.99] last:border-b-0"
    >
      <TransferIcon showBankName={showBankName} />

      <div className="min-w-0 flex-1 pt-[1px]">
        <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
          {history.name}
        </div>
        <div className="mt-[5px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
          {subtitle}
        </div>
        <div className="mt-[4px] truncate text-[11px] font-normal leading-tight text-[#A0A0A0]">
          {history.dateTime}
        </div>
      </div>

      <div className="shrink-0 pt-[1px] text-right">
        <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
          {history.amount}
        </div>

        <div className="mt-[7px] inline-flex h-[22px] items-center rounded-full bg-[#E8F8EF] px-[10px] text-[11px] font-semibold leading-none text-[#15965A]">
          {history.status}
        </div>
      </div>
    </button>
  );
}

function EmptyTransferHistory() {
  return (
    <div className="py-[42px] text-center">
      <div className="text-[15px] font-bold text-black">
        Tidak Ada Riwayat Transfer
      </div>
      <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
        Belum ada transfer pada bulan yang dipilih.
      </div>
    </div>
  );
}

export default function NewMBankingInterbankTransferPage({
  onBack,
  onTransferDone,
  title = "Transfer Antar Bank",
}: {
  onBack: () => void;
  onTransferDone?: () => void;
  title?: string;
}) {
  const [activeTab, setActiveTab] = React.useState<TransferTab>("saved");
  const [activeMonth, setActiveMonth] = React.useState("Jun");
  const [showNewRecipientForm, setShowNewRecipientForm] = React.useState(false);
  const [showQrPinInput, setShowQrPinInput] = React.useState(false);
  const [showTransferQr, setShowTransferQr] = React.useState(false);
  const [selectedRecipient, setSelectedRecipient] =
    React.useState<NewMBankingRecipientInfo | null>(null);
  const [savedTick, setSavedTick] = React.useState(0);

  React.useEffect(() => {
    return subscribeNewMBankingTransferRecipients(() =>
      setSavedTick((current) => current + 1),
    );
  }, []);

  const isTransferAntarRekening = title === "Transfer Antar Rekening";
  const showBankName = !isTransferAntarRekening;
  const savedKind: NewMBankingTransferRecipientKind = isTransferAntarRekening
    ? "internal"
    : "interbank";

  const savedRecipients = React.useMemo(() => {
    const stored = getNewMBankingTransferRecipients(savedKind).map((item) => ({
      id: item.id,
      name: item.name,
      bank: item.bank ?? "Koperasi",
      accountNo: item.accountNo,
    }));

    return uniqueRecipients([...stored, ...seedSavedRecipients]);
  }, [savedKind, savedTick]);

  const filteredTransferHistories = React.useMemo(
    () => transferHistories.filter((history) => history.month === activeMonth),
    [activeMonth],
  );

  function buildRecipientInfo(recipient: SavedRecipient): NewMBankingRecipientInfo {
    return {
      name: recipient.name,
      accountNo: recipient.accountNo,
      bank: showBankName ? recipient.bank : undefined,
    };
  }

  function openRecipientInput(recipient: NewMBankingRecipientInfo) {
    setSelectedRecipient(recipient);
    setShowNewRecipientForm(true);
  }

  if (showTransferQr) {
    return <NewMBankingTransferQrPage onBack={() => setShowTransferQr(false)} />;
  }

  if (showQrPinInput) {
    return (
      <NewMBankingPinInputPage
        title="QR Transfer"
        description="Masukkan 6 digit PIN M-Banking untuk menampilkan kode QR transfer."
        onBack={() => setShowQrPinInput(false)}
        onSubmit={() => {
          setShowQrPinInput(false);
          setShowTransferQr(true);
        }}
      />
    );
  }

  if (showNewRecipientForm) {
    return (
      <NewMBankingNewRecipientTransferPage
        hideBankSelection={isTransferAntarRekening}
        recipient={selectedRecipient ?? undefined}
        onBack={() => {
          setSelectedRecipient(null);
          setShowNewRecipientForm(false);
        }}
        onDone={onTransferDone ?? onBack}
      />
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

          <h1 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            {title}
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[22px]">
          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-[10px]">
            <div
              className={cn(
                "grid gap-[12px]",
                isTransferAntarRekening ? "grid-cols-2" : "grid-cols-1",
              )}
            >
              <TransferOptionCard
                icon={UserPlus}
                label="Penerima Baru"
                onClick={() => {
                  setSelectedRecipient(null);
                  setShowNewRecipientForm(true);
                }}
              />

              {isTransferAntarRekening ? (
                <TransferOptionCard
                  icon={QrCode}
                  label="QR Transfer"
                  onClick={() => setShowQrPinInput(true)}
                />
              ) : null}
            </div>
          </div>

          <TransferTabs active={activeTab} onChange={setActiveTab} />

          {activeTab === "history" ? (
            <NewMBankingPaymentMonthSelector
              activeMonth={activeMonth}
              onChange={setActiveMonth}
              className="mt-[18px]"
            />
          ) : null}

          <section className="mt-[18px] rounded-[22px] bg-white px-1">
            {activeTab === "saved" ? (
              <div>
                {savedRecipients.map((recipient) => (
                  <SavedRecipientRow
                    key={`${recipient.bank}-${recipient.accountNo}`}
                    recipient={recipient}
                    showBankName={showBankName}
                    onClick={() => openRecipientInput(buildRecipientInfo(recipient))}
                  />
                ))}
              </div>
            ) : filteredTransferHistories.length > 0 ? (
              <div>
                {filteredTransferHistories.map((history) => (
                  <TransferHistoryRow
                    key={history.id}
                    history={history}
                    showBankName={showBankName}
                    onClick={() => openRecipientInput(buildRecipientInfo(history))}
                  />
                ))}
              </div>
            ) : (
              <EmptyTransferHistory />
            )}
          </section>

          <div className="sr-only">{savedTick}</div>
        </section>
      </main>
    </div>
  );
}