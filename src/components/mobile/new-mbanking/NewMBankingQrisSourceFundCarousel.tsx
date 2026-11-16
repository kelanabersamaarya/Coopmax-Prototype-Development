import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";

const accounts: SourceFundAccount[] = [
  {
    productName: "Simpanan Kaya",
    accountNo: "112233111",
    balance: "Rp. 4.000.000,00",
  },
  {
    productName: "Simpanan Sukarela",
    accountNo: "4260029",
    balance: "Rp. 2.750.000,00",
  },
];

export default function NewMBankingQrisSourceFundCarousel({
  selectedAccount,
  onSelect,
}: {
  selectedAccount: SourceFundAccount;
  onSelect: (account: SourceFundAccount) => void;
}) {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-[10px] overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {accounts.map((account) => (
        <div
          key={account.accountNo}
          className="w-[calc(100%_-_28px)] shrink-0 snap-start"
        >
          <NewMBankingSourceFundGradientCard
            account={account}
            selected={selectedAccount.accountNo === account.accountNo}
            showChevron={false}
            onClick={() => onSelect(account)}
          />
        </div>
      ))}
    </div>
  );
}
