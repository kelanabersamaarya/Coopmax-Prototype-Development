"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type AccountNode = {
  code: string;
  name: string;
  children?: AccountNode[];
};

const accounts: AccountNode[] = [
  {
    code: "1",
    name: "ASET",
    children: [
      {
        code: "1.1",
        name: "Aset Lancar",
        children: [
          {
            code: "1.1.1",
            name: "Kas dan Setara Kas",
            children: [
              { code: "1.1.1.1", name: "Kas" },
              { code: "1.1.1.2", name: "Bank" },
              { code: "1.1.1.3", name: "Simpanan Anggota" },
            ],
          },
          { code: "1.1.2", name: "Piutang Pinjaman" },
        ],
      },
      {
        code: "1.2",
        name: "Aset Tetap",
        children: [
          { code: "1.2.1", name: "Tanah" },
          { code: "1.2.2", name: "Inventaris Kantor" },
        ],
      },
    ],
  },
  {
    code: "2",
    name: "KEWAJIBAN",
    children: [
      { code: "2.1", name: "Simpanan Sukarela" },
      { code: "2.2", name: "Simpanan Berjangka" },
      { code: "2.3", name: "Hutang Pajak" },
    ],
  },
  {
    code: "3",
    name: "EKUITAS",
    children: [
      { code: "3.1", name: "Simpanan Pokok" },
      { code: "3.2", name: "Simpanan Wajib" },
      { code: "3.3", name: "Cadangan Koperasi" },
    ],
  },
  {
    code: "4",
    name: "PENDAPATAN",
    children: [
      { code: "4.1", name: "Pendapatan Bunga Pinjaman" },
      { code: "4.2", name: "Pendapatan Administrasi" },
      { code: "4.3", name: "Pendapatan Denda" },
    ],
  },
  {
    code: "5",
    name: "BEBAN",
    children: [
      { code: "5.1", name: "Beban Bunga Simpanan" },
      { code: "5.2", name: "Beban Operasional" },
      { code: "5.3", name: "Beban Administrasi" },
    ],
  },
];

function flattenAccounts(
  nodes: AccountNode[],
  expanded: Set<string>,
  level = 0,
): Array<AccountNode & { level: number; hasChildren: boolean }> {
  return nodes.flatMap((node) => {
    const hasChildren = !!node.children?.length;
    const row = { ...node, level, hasChildren };

    if (!hasChildren || !expanded.has(node.code)) {
      return [row];
    }

    return [row, ...flattenAccounts(node.children ?? [], expanded, level + 1)];
  });
}

function AccountRow({
  account,
  expanded,
  onToggle,
}: {
  account: AccountNode & { level: number; hasChildren: boolean };
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative grid min-h-[42px] grid-cols-[minmax(96px,140px)_minmax(0,1fr)] items-center border-b border-slate-200 bg-white text-[14px] font-normal text-black">
      <div
        className="relative flex min-w-0 items-center gap-2 px-3 py-2"
        style={{ paddingLeft: `${12 + account.level * 28}px` }}
      >
        {account.level > 0 ? (
          <span
            className="absolute bottom-0 top-0 w-px bg-[#2F7BFF]"
            style={{ left: `${12 + (account.level - 1) * 28 + 8}px` }}
            aria-hidden="true"
          />
        ) : null}

        {account.hasChildren ? (
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px]",
              "bg-[#6F42C1] text-[13px] font-bold leading-none text-white",
              "transition hover:bg-[#643ab0]",
            )}
            aria-label={expanded ? "Tutup akun" : "Buka akun"}
            title={expanded ? "Tutup" : "Buka"}
          >
            {expanded ? "−" : "+"}
          </button>
        ) : (
          <span className="h-5 w-5 shrink-0" />
        )}

        <span className="truncate font-semibold tabular-nums text-[#334155]">
          {account.code}
        </span>
      </div>

      <div className="min-w-0 px-3 py-2">
        <span className="block truncate text-[#334155]" title={account.name}>
          {account.name}
        </span>
      </div>
    </div>
  );
}

export default function AccountingCodeAccountsView() {
  const allExpandableCodes = React.useMemo(() => {
    const collect = (nodes: AccountNode[]): string[] =>
      nodes.flatMap((node) => [
        ...(node.children?.length ? [node.code] : []),
        ...collect(node.children ?? []),
      ]);

    return collect(accounts);
  }, []);

  const [expanded, setExpanded] = React.useState<Set<string>>(
    () => new Set(allExpandableCodes),
  );

  const rows = React.useMemo(
    () => flattenAccounts(accounts, expanded),
    [expanded],
  );

  function toggle(code: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  }

  return (
    <div className="mt-5">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setExpanded(new Set(allExpandableCodes))}
          className="h-[28px] rounded-[5px] bg-[#6F42C1] px-3 text-[12px] font-semibold text-white transition hover:bg-[#643ab0]"
        >
          Perluas
        </button>

        <button
          type="button"
          onClick={() => setExpanded(new Set())}
          className="h-[28px] rounded-[5px] bg-[#6F42C1] px-3 text-[12px] font-semibold text-white transition hover:bg-[#643ab0]"
        >
          Persempit
        </button>
      </div>

      <div className="mt-3 overflow-hidden rounded-[5px] border border-slate-200 bg-white">
        <div className="grid grid-cols-[minmax(96px,140px)_minmax(0,1fr)] border-b border-slate-300 bg-slate-50 text-[12px] font-bold uppercase tracking-wide text-[#334155]">
          <div className="px-3 py-2">Kode</div>
          <div className="px-3 py-2">Nama Akun</div>
        </div>

        <div className="max-h-[520px] overflow-auto bg-white">
          {rows.map((account) => (
            <AccountRow
              key={account.code}
              account={account}
              expanded={expanded.has(account.code)}
              onToggle={() => toggle(account.code)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}