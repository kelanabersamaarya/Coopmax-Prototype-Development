"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AccountNode = {
  code: string;
  name: string;
  children?: AccountNode[];
};

type FlatAccount = {
  code: string;
  name: string;
  level: number;
  hasChildren: boolean;
};

const accounts: AccountNode[] = [
  {
    code: "1",
    name: "Aset",
    children: [
      {
        code: "1.1",
        name: "Kas dan Setara Kas",
        children: [
          { code: "1.1.1", name: "Kas" },
          { code: "1.1.2", name: "Bank" },
          { code: "1.1.3", name: "Simpanan Anggota" },
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
    name: "Kewajiban",
    children: [
      { code: "2.1", name: "Simpanan Sukarela" },
      { code: "2.2", name: "Simpanan Berjangka" },
      { code: "2.3", name: "Hutang Pajak" },
    ],
  },
  {
    code: "3",
    name: "Ekuitas",
    children: [
      { code: "3.1", name: "Simpanan Pokok" },
      { code: "3.2", name: "Simpanan Wajib" },
      { code: "3.3", name: "Cadangan Koperasi" },
    ],
  },
  {
    code: "4",
    name: "Pendapatan",
    children: [
      { code: "4.1", name: "Pendapatan Bunga Pinjaman" },
      { code: "4.2", name: "Pendapatan Administrasi" },
      { code: "4.3", name: "Pendapatan Denda" },
    ],
  },
  {
    code: "5",
    name: "Beban",
    children: [
      { code: "5.1", name: "Beban Bunga Simpanan" },
      { code: "5.2", name: "Beban Operasional" },
      { code: "5.3", name: "Beban Administrasi" },
    ],
  },
];

function getExpandableCodes(nodes: AccountNode[]) {
  const codes: string[] = [];

  function walk(items: AccountNode[]) {
    items.forEach((item) => {
      if (item.children?.length) {
        codes.push(item.code);
        walk(item.children);
      }
    });
  }

  walk(nodes);
  return codes;
}

function flattenAccounts(
  nodes: AccountNode[],
  expanded: Set<string>,
  level = 0,
): FlatAccount[] {
  const result: FlatAccount[] = [];

  nodes.forEach((node) => {
    const hasChildren = Boolean(node.children?.length);

    result.push({
      code: node.code,
      name: node.name,
      level,
      hasChildren,
    });

    if (hasChildren && expanded.has(node.code)) {
      result.push(...flattenAccounts(node.children ?? [], expanded, level + 1));
    }
  });

  return result;
}

function AccountActionButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center",
        "bg-transparent p-0 text-[#006DFF] transition hover:text-[#0057cc]",
        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
      )}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function AccountRow({
  account,
  expanded,
  onToggle,
}: {
  account: FlatAccount;
  expanded: boolean;
  onToggle: () => void;
}) {
  const showCode = account.level > 0;

  return (
    <div className="relative" style={{ paddingLeft: `${account.level * 30}px` }}>
      {account.level > 0 ? (
        <span
          className="absolute bottom-0 top-0 w-px bg-[#2F7BFF]"
          style={{ left: `${account.level * 30 - 16}px` }}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={cn(
          "group inline-flex min-h-[36px] max-w-full items-center gap-2",
          "border border-slate-200 bg-white px-3 py-1.5",
          "text-[14px] font-bold text-black",
          "transition-colors hover:bg-white",
        )}
      >
        {account.hasChildren ? (
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "inline-flex h-5 w-5 shrink-0 items-center justify-center",
              "bg-transparent p-0 text-[16px] font-bold leading-none text-black",
              "transition hover:text-slate-700",
              "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
            aria-label={expanded ? "Tutup akun" : "Buka akun"}
            title={expanded ? "Tutup" : "Buka"}
          >
            {expanded ? "-" : "+"}
          </button>
        ) : (
          <span className="h-5 w-5 shrink-0" />
        )}

        <span className="whitespace-nowrap font-bold text-[#334155] transition-colors group-hover:text-[#006DFF]">
          {account.name}
        </span>

        {showCode ? (
          <span className="whitespace-nowrap font-bold tabular-nums text-[#334155] transition-colors group-hover:text-[#006DFF]">
            ({account.code})
          </span>
        ) : null}

        <span className="ml-5 inline-flex shrink-0 items-center gap-4">
          <AccountActionButton
            label={`Ubah akun ${account.name}`}
            onClick={() =>
              toast("Ubah akun (prototype)", {
                description: `${account.name} • ${account.code}`,
              })
            }
          >
            <Pencil className="h-[15px] w-[15px]" strokeWidth={2.6} />
          </AccountActionButton>

          <AccountActionButton
            label={`Hapus akun ${account.name}`}
            onClick={() =>
              toast("Hapus akun (prototype)", {
                description: `${account.name} • ${account.code}`,
              })
            }
          >
            <Trash2 className="h-[15px] w-[15px]" strokeWidth={2.6} />
          </AccountActionButton>
        </span>
      </div>
    </div>
  );
}

export default function AccountingCodeAccountsView() {
  const allExpandableCodes = React.useMemo(() => getExpandableCodes(accounts), []);

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

      <div className="mt-3 overflow-x-auto rounded-[5px] bg-white">
        <div className="grid w-max gap-0">
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