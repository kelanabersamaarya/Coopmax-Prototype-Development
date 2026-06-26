"use client";

import * as React from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EditCategoryDialog from "@/components/accounting/EditCategoryDialog";
import AddCategoryDialog from "@/components/accounting/AddCategoryDialog";
import AddAccountDialog from "@/components/accounting/AddAccountDialog";

type AccountNode = {
  code: string;
  name: string;
  hideCode?: boolean;
  children?: AccountNode[];
};

type FlatAccount = {
  code: string;
  name: string;
  level: number;
  hasChildren: boolean;
  hideCode?: boolean;
};

const accounts: AccountNode[] = [
  {
    code: "1",
    name: "Aset",
    children: [
      {
        code: "1.1",
        name: "Aset Lancar",
        children: [
          {
            code: "1.1.1",
            name: "Kas dan Setara Kas",
            children: [
              {
                code: "1.1.1.1",
                name: "Kas",
                children: [
                  { code: "1.1.1.1.1", name: "Kas Kecil" },
                  { code: "1.1.1.1.2", name: "Kas Teller" },
                  { code: "1.1.1.1.3", name: "Kas Besar" },
                  { code: "1.1.1.1.4", name: "Kas Operasional" },
                ],
              },
              {
                code: "1.1.1.2",
                name: "Bank",
                children: [
                  { code: "1.1.1.2.1", name: "Giro" },
                  { code: "1.1.1.2.2", name: "Tabungan Bank" },
                  { code: "1.1.1.2.3", name: "Deposito Bank" },
                ],
              },
            ],
          },
          {
            code: "1.1.2",
            name: "Piutang",
            children: [
              {
                code: "1.1.2.1",
                name: "Pinjaman yang Diberikan",
                children: [
                  { code: "1.1.2.1.1", name: "Pinjaman Anggota" },
                  { code: "1.1.2.1.2", name: "Pinjaman Calon Anggota" },
                  { code: "1.1.2.1.3", name: "Pinjaman Non Anggota" },
                  { code: "1.1.2.1.4", name: "Pinjaman Billing" },
                  { code: "1.1.2.1.5", name: "Pinjaman RC" },
                ],
              },
              { code: "1.1.2.2", name: "Piutang Bunga Pinjaman" },
              { code: "1.1.2.3", name: "Piutang Administrasi Pinjaman" },
              { code: "1.1.2.4", name: "Piutang Denda Pinjaman" },
              { code: "1.1.2.5", name: "Piutang Lain-lain" },
              { code: "1.1.2.6", name: "Cadangan Kerugian Piutang" },
            ],
          },
          {
            code: "1.1.3",
            name: "Simpanan Anggota",
            children: [
              { code: "1.1.3.1", name: "Simpanan Sukarela" },
              { code: "1.1.3.2", name: "Simpanan Berjangka" },
              { code: "1.1.3.3", name: "Simpanan Wajib" },
              { code: "1.1.3.4", name: "Simpanan Pokok" },
            ],
          },
          {
            code: "1.1.4",
            name: "Persediaan",
            children: [
              { code: "1.1.4.1", name: "Persediaan Materai" },
              { code: "1.1.4.2", name: "Persediaan ATK" },
            ],
          },
          {
            code: "1.1.5",
            name: "Biaya Dibayar Dimuka",
            children: [
              { code: "1.1.5.1", name: "Sewa Dibayar Dimuka" },
              { code: "1.1.5.2", name: "Asuransi Dibayar Dimuka" },
            ],
          },
        ],
      },
      {
        code: "1.2",
        name: "Aset Tetap",
        children: [
          { code: "1.2.1", name: "Tanah" },
          { code: "1.2.2", name: "Bangunan" },
          { code: "1.2.3", name: "Inventaris Kantor" },
          { code: "1.2.4", name: "Kendaraan" },
          { code: "1.2.5", name: "Peralatan Kantor" },
          {
            code: "1.2.6",
            name: "Akumulasi Penyusutan",
            children: [
              { code: "1.2.6.1", name: "Akumulasi Penyusutan Bangunan" },
              { code: "1.2.6.2", name: "Akumulasi Penyusutan Inventaris Kantor" },
              { code: "1.2.6.3", name: "Akumulasi Penyusutan Kendaraan" },
              { code: "1.2.6.4", name: "Akumulasi Penyusutan Peralatan Kantor" },
            ],
          },
        ],
      },
      {
        code: "1.3",
        name: "Aset Lain-lain",
        children: [
          { code: "1.3.1", name: "Agunan Yang Diambil Alih" },
          { code: "1.3.2", name: "Aset Pajak Tangguhan" },
          { code: "1.3.3", name: "Setoran Jaminan" },
        ],
      },
    ],
  },
  {
    code: "2",
    name: "Kewajiban",
    children: [
      {
        code: "2.1",
        name: "Kewajiban Lancar",
        children: [
          {
            code: "2.1.1",
            name: "Simpanan",
            children: [
              { code: "2.1.1.1", name: "Simpanan Sukarela" },
              { code: "2.1.1.2", name: "Simpanan Harian" },
              { code: "2.1.1.3", name: "Simpanan Pendidikan" },
              { code: "2.1.1.4", name: "Simpanan Pokok" },
              { code: "2.1.1.5", name: "Simpanan Wajib" },
              { code: "2.1.1.6", name: "Simpanan Berjangka" },
            ],
          },
          {
            code: "2.1.2",
            name: "Hutang",
            children: [
              { code: "2.1.2.1", name: "Hutang Bunga Simpanan" },
              { code: "2.1.2.2", name: "Hutang Bunga Deposito" },
              { code: "2.1.2.3", name: "Hutang Pajak Bunga" },
              { code: "2.1.2.4", name: "Hutang Administrasi" },
              { code: "2.1.2.5", name: "Hutang Biaya Operasional" },
              { code: "2.1.2.6", name: "Hutang Titipan" },
            ],
          },
          {
            code: "2.1.3",
            name: "Pendapatan Diterima Dimuka",
            children: [
              { code: "2.1.3.1", name: "Pendapatan Administrasi Ditangguhkan" },
              { code: "2.1.3.2", name: "Pendapatan Provisi Ditangguhkan" },
            ],
          },
        ],
      },
      {
        code: "2.2",
        name: "Kewajiban Jangka Panjang",
        children: [
          { code: "2.2.1", name: "Pinjaman Diterima" },
          { code: "2.2.2", name: "Kewajiban Imbalan Kerja" },
        ],
      },
    ],
  },
  {
    code: "3",
    name: "Ekuitas",
    children: [
      {
        code: "3.1",
        name: "Modal Anggota",
        children: [
          { code: "3.1.1", name: "Simpanan Pokok" },
          { code: "3.1.2", name: "Simpanan Wajib" },
          { code: "3.1.3", name: "Simpanan Khusus" },
        ],
      },
      {
        code: "3.2",
        name: "Cadangan",
        children: [
          { code: "3.2.1", name: "Cadangan Umum" },
          { code: "3.2.2", name: "Cadangan Risiko" },
          { code: "3.2.3", name: "Cadangan Tujuan" },
        ],
      },
      {
        code: "3.3",
        name: "Sisa Hasil Usaha",
        children: [
          { code: "3.3.1", name: "SHU Tahun Berjalan" },
          { code: "3.3.2", name: "SHU Tahun Lalu" },
          { code: "3.3.3", name: "Pembagian SHU" },
        ],
      },
    ],
  },
  {
    code: "4",
    name: "Pendapatan",
    children: [
      {
        code: "4.1",
        name: "Pendapatan Pinjaman",
        children: [
          { code: "4.1.1", name: "Pendapatan Bunga Pinjaman" },
          { code: "4.1.2", name: "Pendapatan Administrasi Pinjaman" },
          { code: "4.1.3", name: "Pendapatan Provisi Pinjaman" },
          { code: "4.1.4", name: "Pendapatan Denda Pinjaman" },
          { code: "4.1.5", name: "Pendapatan Pembulatan Pinjaman" },
          { code: "4.1.6", name: "Pendapatan Biaya Asuransi Pinjaman" },
          { code: "4.1.7", name: "Pendapatan Aktivasi M-Banking" },
        ],
      },
      {
        code: "4.2",
        name: "Pendapatan Simpanan",
        children: [
          { code: "4.2.1", name: "Pendapatan Administrasi Simpanan" },
          { code: "4.2.2", name: "Pendapatan Penutupan Rekening" },
          { code: "4.2.3", name: "Pendapatan Pinalty Simpanan" },
          { code: "4.2.4", name: "Pendapatan Pengendapan Simpanan" },
        ],
      },
      {
        code: "4.3",
        name: "Pendapatan Operasional Lainnya",
        children: [
          { code: "4.3.1", name: "Pendapatan Fee Kolektor" },
          { code: "4.3.2", name: "Pendapatan PPOB" },
          { code: "4.3.3", name: "Pendapatan Lain-lain" },
        ],
      },
    ],
  },
  {
    code: "5",
    name: "Beban",
    children: [
      {
        code: "5.1",
        name: "Beban Jasa Simpanan",
        children: [
          {
            code: "5.1.1",
            name: "Beban Jasa Simpanan Sukarela/Tabungan Dari Anggota",
          },
          { code: "5.1.2", name: "Beban Bunga Simpanan Berjangka" },
          { code: "5.1.3", name: "Beban Bunga Deposito" },
          { code: "5.1.4", name: "Beban Pajak Bunga" },
        ],
      },
      {
        code: "5.2",
        name: "Beban Operasional",
        children: [
          { code: "5.2.1", name: "Beban Gaji dan Tunjangan" },
          { code: "5.2.2", name: "Beban Transportasi" },
          { code: "5.2.3", name: "Beban Listrik, Air, dan Telepon" },
          { code: "5.2.4", name: "Beban ATK" },
          { code: "5.2.5", name: "Beban Sewa" },
          { code: "5.2.6", name: "Beban Perawatan Kantor" },
          { code: "5.2.7", name: "Beban Penyusutan" },
          { code: "5.2.8", name: "Beban Administrasi Bank" },
        ],
      },
      {
        code: "5.3",
        name: "Beban Pinjaman",
        children: [
          { code: "5.3.1", name: "Beban Cadangan Kerugian Pinjaman" },
          { code: "5.3.2", name: "Beban Penghapusan Pinjaman" },
          { code: "5.3.3", name: "Beban Asuransi Pinjaman" },
        ],
      },
      {
        code: "5.4",
        name: "Beban Lain-lain",
        children: [
          { code: "5.4.1", name: "Beban Pajak" },
          { code: "5.4.2", name: "Beban Denda" },
          { code: "5.4.3", name: "Beban Lain-lain" },
        ],
      },
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
      hideCode: node.hideCode,
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
        "bg-transparent p-0 text-[#245BFF] transition hover:text-[#0046d9]",
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
  const showCode = account.level > 0 && !account.hideCode;
  const indent = account.level * 30;

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "group flex min-h-[48px] items-center",
          "border border-[#D7DDE6] bg-white px-3 py-2",
          "text-[14px] font-bold text-black",
          "transition-colors hover:bg-white",
        )}
        style={{
          marginLeft: `${indent}px`,
          width: `calc(100% - ${indent}px)`,
        }}
      >
        <div className="flex w-full min-w-0 items-center">
          <div className="flex w-[26px] shrink-0 items-center justify-start">
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
          </div>

          <div className="flex min-w-0 items-center gap-1">
            <span className="whitespace-nowrap font-bold text-[#0F172A] transition-colors group-hover:text-[#006DFF]">
              {account.name}
            </span>

            {showCode ? (
              <span className="whitespace-nowrap font-bold tabular-nums text-[#0F172A] transition-colors group-hover:text-[#006DFF]">
                ({account.code})
              </span>
            ) : null}
          </div>

          <span className="ml-5 inline-flex shrink-0 items-center gap-5">
            <AccountActionButton
              label={`Ubah akun ${account.name}`}
              onClick={() => onEdit(account)}
            >
              <Pencil className="h-[16px] w-[16px]" strokeWidth={2.6} />
            </AccountActionButton>

            <AccountActionButton
              label={`Hapus akun ${account.name}`}
              onClick={() =>
                toast("Hapus akun (prototype)", {
                  description: `${account.name} • ${account.code}`,
                })
              }
            >
              <Trash2 className="h-[16px] w-[16px]" strokeWidth={2.6} />
            </AccountActionButton>
          </span>
        </div>
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
  const [addCategoryOpen, setAddCategoryOpen] = React.useState(false);
  const [addAccountOpen, setAddAccountOpen] = React.useState(false);

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
      <AddCategoryDialog
        open={addCategoryOpen}
        onOpenChange={setAddCategoryOpen}
      />

      <AddAccountDialog
        open={addAccountOpen}
        onOpenChange={setAddAccountOpen}
      />

      <EditCategoryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        account={editAccount}
      />

      <div className="mb-2 flex justify-end gap-2">
        <AddTopButton onClick={() => setAddCategoryOpen(true)}>
          Tambah Kategori
        </AddTopButton>

        <AddTopButton onClick={() => setAddAccountOpen(true)}>
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
        <div className="min-w-[980px]">
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