"use client";

import * as React from "react";
import { ChevronRight, Copy } from "lucide-react";

type SavingsAccount = {
  accountNo: string;
  staticVa?: string;
  staticVaBank?: string;
};

const accountNumbers = ["4260054", "4260055", "4260056", "4260057"];
const staticVaAccountPrefix = "mbanking-savings-static-va-account-";
const staticVaBankPrefix = "mbanking-savings-static-va-bank-";
const publicAsset = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`;

const bankLogos: Record<string, string> = {
  "BCA VA": publicAsset("bca_logo.png"),
  "Mandiri VA": publicAsset("mandiri_logo.png"),
  "Bank Mandiri": publicAsset("mandiri_logo.png"),
  "BRI VA": publicAsset("bri_logo.png"),
  BRI: publicAsset("bri_logo.png"),
  "Permata VA": publicAsset("permata_logo.png"),
  "CIMB VA": publicAsset("cimb_logo.png"),
  "Danamon VA": publicAsset("danamon_logo.png"),
  "Maybank VA": publicAsset("maybank_logo.png"),
  "BTN VA": publicAsset("btn_logo.png"),
  "BNC VA": publicAsset("neobank_logo.png"),
  "BSS VA": publicAsset("bss_logo.png"),
  "BJB VA": publicAsset("bjb_logo.png"),
  "Sinarmas VA": publicAsset("sinarmas_logo.png"),
  BNI: publicAsset("bni_logo.png"),
};

function readAccounts(): SavingsAccount[] {
  if (typeof window === "undefined") return accountNumbers.map((accountNo) => ({ accountNo }));

  return accountNumbers.map((accountNo) => ({
    accountNo,
    staticVa: window.localStorage.getItem(`${staticVaAccountPrefix}${accountNo}`) ?? undefined,
    staticVaBank: window.localStorage.getItem(`${staticVaBankPrefix}${accountNo}`) ?? undefined,
  }));
}

function SavingsCard({ account, onDetail }: { account: SavingsAccount; onDetail: (accountNo: string) => void }) {
  const hasStaticVa = Boolean(account.staticVa);
  const logo = account.staticVaBank ? bankLogos[account.staticVaBank] : undefined;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onDetail(account.accountNo)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onDetail(account.accountNo);
        }
      }}
      aria-label={`Buka detail rekening ${account.accountNo}`}
      className={`relative ${hasStaticVa ? "h-[177px]" : "h-[147px]"} w-full shrink-0 snap-center overflow-hidden rounded-[14px] bg-[#004FC7] px-5 py-5 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#004FC7]`}
    >
      <div className="pointer-events-none absolute -right-[36px] -top-[48px] h-[120px] w-[120px] rounded-full bg-white/12" />
      <div className="pointer-events-none absolute right-[22px] -top-[62px] h-[112px] w-[112px] rounded-full bg-white/10" />
      <div className="pointer-events-none absolute right-[72px] top-[18px] h-[44px] w-[44px] rounded-full bg-white/8" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="text-[16px] font-extrabold leading-tight tracking-tight text-white">Simpanan Sukarela</div>
          <button type="button" onClick={() => onDetail(account.accountNo)} className="inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold leading-none text-white transition active:scale-[0.98]">Detail <ChevronRight className="h-[13px] w-[13px]" strokeWidth={2.6} /></button>
        </div>
        <div className={hasStaticVa ? "mt-7" : "mt-auto"}>
          <div className="text-[10px] font-normal leading-none text-[#678DD8]">No Rekening</div>
          <div className="mt-2 flex items-center gap-2 text-[12px] font-semibold leading-none text-white">
            <span>{account.accountNo}</span>
            <Copy className="h-[13px] w-[13px] text-white" strokeWidth={2.4} />
          </div>
          {hasStaticVa && (
            <div className="mt-6 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-normal leading-none text-[#678DD8]">Nomor Virtual Account {account.staticVaBank}</div>
                <div className="mt-2 flex items-center gap-2 text-[14px] font-normal leading-none">
                  <span>{account.staticVa}</span>
                  <Copy className="h-[15px] w-[15px]" strokeWidth={2.4} />
                </div>
              </div>
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white p-1.5">
                {logo && <img src={logo} alt={`${account.staticVaBank} logo`} className="max-h-full max-w-full object-contain" />}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function MBankingSavingsCard({ onDetail }: { onDetail: (accountNo: string) => void }) {
  const [accounts, setAccounts] = React.useState<SavingsAccount[]>(readAccounts);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setAccounts(readAccounts());
  }, []);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardWidth = carousel.clientWidth;
    setActiveIndex(Math.min(accounts.length - 1, Math.max(0, Math.round(carousel.scrollLeft / (cardWidth + 16)))));
  };

  return (
    <section className="px-6 pt-1">
      <div ref={carouselRef} onScroll={handleScroll} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {accounts.map((account) => <SavingsCard key={account.accountNo} account={account} onDetail={onDetail} />)}
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        {accounts.map((account, index) => <span key={account.accountNo} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-[#004FC7]" : "w-1.5 bg-[#C8D7EE]"}`} />)}
      </div>
    </section>
  );
}

export { readAccounts };
