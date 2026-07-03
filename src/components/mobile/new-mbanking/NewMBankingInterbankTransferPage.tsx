import * as React from "react";
import { ArrowLeft, Send, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingNewRecipientTransferPage from "@/components/mobile/new-mbanking/NewMBankingNewRecipientTransferPage";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

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
};

const savedRecipients: SavedRecipient[] = [
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
  },
  {
    id: "history-2",
    name: "Made Wirata",
    bank: "BRI",
    accountNo: "550102223344",
    dateTime: "19-06-2026 : 14.30",
    amount: "-125.000,00",
    status: "Berhasil",
  },
  {
    id: "history-3",
    name: "Ni Luh Sari",
    bank: "BNI",
    accountNo: "90011222334",
    dateTime: "18-06-2026 : 09.15",
    amount: "-75.000,00",
    status: "Berhasil",
  },
];

function NewRecipientCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mt-[22px] flex h-[132px] w-full flex-col items-center justify-center",
        "rounded-[24px] border border-[#E5E7EB] bg-white",
        "shadow-[0_5px_18px_rgba(15,23,42,0.06)]",
        "transition active:scale-[0.99]",
      )}
      aria-label="Penerima Baru"
      title="Penerima Baru"
    >
      <span className="grid h-[58px] w-[58px] place-items-center rounded-full bg-[#F1F3F6] text-[#53657D]">
        <UserPlus className="h-[29px] w-[29px]" strokeWidth={2.35} />
      </span>

      <span className="mt-[12px] text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
        Penerima Baru
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

function TransferIcon() {
  return (
    <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#F1F3F6] text-[#53657D]">
      <Send className="h-[21px] w-[21px]" strokeWidth={2.45} />
    </span>
  );
}

function SavedRecipientRow({ recipient }: { recipient: SavedRecipient }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#EEF0F4] py-[15px] last:border-b-0">
      <TransferIcon />

      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
          {recipient.name}
        </div>
        <div className="mt-[5px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
          {recipient.bank} - {recipient.accountNo}
        </div>
      </div>
    </div>
  );
}

function TransferHistoryRow({ history }: { history: TransferHistory }) {
  return (
    <div className="flex items-start gap-3 border-b border-[#EEF0F4] py-[15px] last:border-b-0">
      <TransferIcon />

      <div className="min-w-0 flex-1 pt-[1px]">
        <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
          {history.name}
        </div>
        <div className="mt-[5px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
          {history.bank} - {history.accountNo}
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
    </div>
  );
}

export default function NewMBankingInterbankTransferPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<TransferTab>("saved");
  const [showNewRecipientForm, setShowNewRecipientForm] = React.useState(false);

  if (showNewRecipientForm) {
    return (
      <NewMBankingNewRecipientTransferPage
        onBack={() => setShowNewRecipientForm(false)}
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
            Transfer Antar Bank
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-[34px] pt-[4px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <NewRecipientCard onClick={() => setShowNewRecipientForm(true)} />

        <TransferTabs active={activeTab} onChange={setActiveTab} />

        <section className="mt-[18px] rounded-[22px] bg-white px-1">
          {activeTab === "saved" ? (
            <div>
              {savedRecipients.map((recipient) => (
                <SavedRecipientRow key={recipient.id} recipient={recipient} />
              ))}
            </div>
          ) : (
            <div>
              {transferHistories.map((history) => (
                <TransferHistoryRow key={history.id} history={history} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}