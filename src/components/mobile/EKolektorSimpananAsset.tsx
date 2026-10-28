"use client";

import * as React from "react";
import EKolektorTransactionTypeSheet from "@/components/mobile/EKolektorTransactionTypeSheet";

const savingAccounts = [
  {
    customerName: "KORMANI",
    accountNo: "3259238260108",
    memberNo: "AGT-2600001",
    productName: "Simpanan Sukarela",
    address: "Penatih",
  },
  {
    customerName: "LAURA PATEL",
    accountNo: "7260175",
    memberNo: "AGT-2600002",
    productName: "Simpanan Wajib",
    address: "Denpasar",
  },
  {
    customerName: "I KETUT AGUS PASEK JAYA ARTA",
    accountNo: "SMG260004",
    memberNo: "AGT-2600003",
    productName: "Simpanan Pokok",
    address: "Sidakarya",
  },
];

export default function EKolektorSimpananAsset({
  onSelectDeposit,
  onSelectWithdrawal,
}: {
  onSelectDeposit?: (account: (typeof savingAccounts)[number]) => void;
  onSelectWithdrawal?: (account: (typeof savingAccounts)[number]) => void;
}) {
  const [selectedAccount, setSelectedAccount] = React.useState<(typeof savingAccounts)[number] | null>(null);

  return (
    <div className="mt-[22px] grid w-full gap-[14px]">
      {savingAccounts.map((account) => (
        <div
          key={account.accountNo}
          className="relative min-h-[250px] w-full overflow-hidden rounded-[12px] bg-white shadow-[0_3px_12px_rgba(15,23,42,0.08)]"
        >
          <div className="min-h-[250px] px-[22px] pb-[66px] pt-[20px]">
            <div className="flex items-center gap-[14px]">
              <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#004FC7]">
                <span className="text-[14px] font-normal leading-none text-white">
                  {account.customerName.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 truncate text-[16px] font-extrabold leading-tight tracking-tight text-[#172957]">
                {account.customerName}
              </div>
            </div>

            <div className="mt-[14px] h-px w-full bg-[#E4E8EF]" />

            <div className="mt-[11px] grid gap-[7px] text-[14px] leading-tight">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#63809E]">No. Rekening</span>
                <span className="truncate text-right font-extrabold text-[#172957]">
                  {account.accountNo}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#63809E]">No. Anggota</span>
                <span className="truncate text-right font-extrabold text-[#172957]">
                  {account.memberNo}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#63809E]">Produk simpanan</span>
                <span className="truncate text-right font-extrabold text-[#172957]">
                  {account.productName}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#63809E]">Alamat</span>
                <span className="truncate text-right font-extrabold text-[#172957]">
                  {account.address}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedAccount(account)}
            className="absolute inset-x-0 bottom-0 h-[52px] bg-[#004FC7] text-[14px] font-semibold text-white transition active:bg-[#0046B3]"
          >
            Pilih
          </button>
        </div>
      ))}

      {selectedAccount ? (
        <EKolektorTransactionTypeSheet
          onClose={() => setSelectedAccount(null)}
          onSelect={(type) => {
            if (type === "setoran" && onSelectDeposit) {
              onSelectDeposit(selectedAccount);
              return;
            }
            if (type === "penarikan" && onSelectWithdrawal) {
              onSelectWithdrawal(selectedAccount);
              return;
            }
            setSelectedAccount(null);
          }}
        />
      ) : null}
    </div>
  );
}
