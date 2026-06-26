"use client";

import * as React from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EditCategoryDialog from "@/components/accounting/EditCategoryDialog";

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

function AddTopButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-[31px] items-center justify-center gap-2 rounded-[5px]",
        "border-0 bg-white px-3",
        "text-[14px] font-normal text-black",
        "transition hover:bg-slate-50",
        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
      )}
    >
      <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border border-slate-400 text-slate-500">
        <Plus className="h-[13px] w-[13px]" strokeWidth={3} />
      </span>
      {children}
    </button>
  );
}

function AccountRow({
  account,
  expanded,
  onToggle,
  onEdit,
}: {
  account: FlatAccount;
  expanded: boolean;
  onToggle: () => void;
  onEdit: (account: FlatAccount) => void;
}) {
  const showCode = account.level > 0;
  const indent = account.level * 30;

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "group flex min-h-[36px] items-center gap-2",
          "border border-slate-200 bg-white px-3 py-1.5",
          "text-[14px] font-bold text-black",
          "transition-colors hover:bg-white",
        )}
        style={{
          marginLeft: `${indent}px`,
          width: `calc(100% - ${indent}px)`,
        }}
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
            onClick={() => onEdit(account)}
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
  const [editOpen, setEditOpen] = React.useState(false);
  const [editAccount, setEditAccount] = React.useState<FlatAccount | null>(null);

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

  function openEdit(account: FlatAccount) {
    setEditAccount(account);
    setEditOpen(true);
  }

  return (
    <div className="mt-5">
      <EditCategoryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        account={editAccount}
      />

      <div className="mb-2 flex justify-end gap-2">
        <AddTopButton
          onClick={() =>
            toast("Tambah Kategori (prototype)", {
              description: "Form tambah kategori belum dihubungkan.",
            })
          }
        >
          Tambah Kategori
        </AddTopButton>

        <AddTopButton
          onClick={() =>
            toast("Tambah Akun (prototype)", {
              description: "Form tambah akun belum dihubungkan.",
            })
          }
        >
          Tambah Akun
        </AddTopButton>
      </div>

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
        <div className="min-w-[760px]">
          {rows.map((account) => (
            <AccountRow
              key={account.code}
              account={account}
              expanded={expanded.has(account.code)}
              onToggle={() => toggle(account.code)}
              onEdit={openEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}