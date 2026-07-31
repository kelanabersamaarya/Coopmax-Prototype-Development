import * as React from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import SavingsAccountDetail from "@/components/savings/SavingsAccountDetail";

type AccountStatus = "Aktif" | "Nonaktif" | "Ditutup";

type SavingsAccount = {
  id: string;
  accountNo: string;
  registeredAt: string;
  product: string;
  customerId: string;
  customerName: string;
  balance: string;
  status: AccountStatus;
};

const accountRows: SavingsAccount[] = [
  {
    id: "SAV-001",
    accountNo: "112233111",
    registeredAt: "10-06-2026",
    product: "Simpanan Kaya",
    customerId: "N2600006",
    customerName: "Laura Patel",
    balance: "4.000.000,00",
    status: "Aktif",
  },
  {
    id: "SAV-002",
    accountNo: "4260029",
    registeredAt: "02-05-2026",
    product: "Simpanan Sukarela",
    customerId: "N2400029",
    customerName: "Pangeran Sirait",
    balance: "2.750.000,00",
    status: "Aktif",
  },
  {
    id: "SAV-003",
    accountNo: "112233222",
    registeredAt: "17-04-2026",
    product: "Simpanan Mapan",
    customerId: "N2500010",
    customerName: "Gaby",
    balance: "20.000.000,00",
    status: "Aktif",
  },
  {
    id: "SAV-004",
    accountNo: "SWJ-2600006",
    registeredAt: "07-04-2026",
    product: "Simpanan Wajib",
    customerId: "N2600006",
    customerName: "Laura Patel",
    balance: "100.000,00",
    status: "Aktif",
  },
  {
    id: "SAV-005",
    accountNo: "SBJ-2600006",
    registeredAt: "07-04-2026",
    product: "Simpanan Berjangka",
    customerId: "N2600006",
    customerName: "Laura Patel",
    balance: "50.000,00",
    status: "Nonaktif",
  },
  {
    id: "SAV-006",
    accountNo: "SMG250045",
    registeredAt: "12-12-2025",
    product: "Simpanan Harian",
    customerId: "N2500009",
    customerName: "Indah Sari",
    balance: "850.000,00",
    status: "Aktif",
  },
];

function HeaderLabel({
  children,
  sortable = true,
  className,
}: {
  children: React.ReactNode;
  sortable?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <span className="leading-[1.05]">{children}</span>
      {sortable ? (
        <span className="inline-flex flex-col leading-none text-slate-900/80">
          <ChevronUp className="-mb-0.5 h-3.5 w-3.5" />
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: AccountStatus }) {
  const style: Record<AccountStatus, string> = {
    Aktif: "bg-emerald-600 text-white hover:bg-emerald-600",
    Nonaktif: "bg-amber-500 text-white hover:bg-amber-500",
    Ditutup: "bg-rose-600 text-white hover:bg-rose-600",
  };

  return (
    <Badge
      className={cn(
        "rounded-[5px] px-2.5 py-1 text-[11px] font-bold leading-none",
        style[status],
      )}
    >
      {status}
    </Badge>
  );
}

function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (nextPage: number) => void;
}) {
  const previousDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  return (
    <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
      <button
        type="button"
        disabled={previousDisabled}
        onClick={() => onPage(Math.max(1, page - 1))}
        className="h-10 px-4 text-[14px] font-medium text-slate-500 transition hover:bg-slate-200 disabled:text-slate-400"
      >
        Sebelumnya
      </button>

      <div className="grid h-10 w-10 place-items-center bg-violet-600 text-[14px] font-semibold text-white">
        {page}
      </div>

      <button
        type="button"
        disabled={nextDisabled}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
        className="h-10 px-4 text-[14px] font-medium text-slate-500 transition hover:bg-slate-200 disabled:text-slate-400"
      >
        Selanjutnya
      </button>
    </div>
  );
}

export default function RekeningSimpanan() {
  const [selectedAccount, setSelectedAccount] =
    React.useState<SavingsAccount | null>(null);
  const [pageSize, setPageSize] = React.useState(20);
  const [page, setPage] = React.useState(1);

  const [accountNo, setAccountNo] = React.useState("");
  const [registeredAt, setRegisteredAt] = React.useState("");
  const [product, setProduct] = React.useState("Semua");
  const [customerId, setCustomerId] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");
  const [balance, setBalance] = React.useState("0,00");
  const [status, setStatus] = React.useState<"Semua" | AccountStatus>("Semua");

  const products = React.useMemo(
    () => ["Semua", ...new Set(accountRows.map((row) => row.product))],
    [],
  );

  const filteredRows = React.useMemo(() => {
    const accountQuery = accountNo.trim().toLowerCase();
    const dateQuery = registeredAt.trim().toLowerCase();
    const customerIdQuery = customerId.trim().toLowerCase();
    const customerQuery = customerName.trim().toLowerCase();

    return accountRows.filter((row) => {
      const matchesAccount = accountQuery
        ? row.accountNo.toLowerCase().includes(accountQuery)
        : true;
      const matchesDate = dateQuery
        ? row.registeredAt.toLowerCase().includes(dateQuery)
        : true;
      const matchesProduct = product === "Semua" || row.product === product;
      const matchesCustomerId = customerIdQuery
        ? row.customerId.toLowerCase().includes(customerIdQuery)
        : true;
      const matchesCustomer = customerQuery
        ? row.customerName.toLowerCase().includes(customerQuery)
        : true;
      const matchesStatus = status === "Semua" || row.status === status;

      return (
        matchesAccount &&
        matchesDate &&
        matchesProduct &&
        matchesCustomerId &&
        matchesCustomer &&
        matchesStatus
      );
    });
  }, [
    accountNo,
    customerId,
    customerName,
    product,
    registeredAt,
    status,
  ]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [
    accountNo,
    customerId,
    customerName,
    pageSize,
    product,
    registeredAt,
    status,
  ]);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const pagedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  const showingStart =
    filteredRows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filteredRows.length, page * pageSize);

  const inputClassName =
    "h-7 rounded-[6px] border-slate-300 bg-white text-[12.5px] font-normal shadow-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/20";
  const selectClassName =
    "h-7 rounded-[6px] border-slate-300 bg-white text-[12.5px] font-normal shadow-none focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20";
  const pageSizeClassName =
    "h-7 w-[68px] rounded-[6px] border-slate-300 bg-white px-2 text-[12.5px] font-semibold text-slate-900 shadow-none";

  const th = "px-2 py-2.5";
  const filterCell = "px-2 py-1.5";
  const td = "px-2 py-2";

  if (selectedAccount) {
    return (
      <SavingsAccountDetail
        account={selectedAccount}
        onBack={() => setSelectedAccount(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              Rekening Tabungan
            </h1>
            <span className="text-sm font-semibold text-slate-500">Daftar</span>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              toast("Tambah Rekening Tabungan (prototype)", {
                description: "Form tambah rekening tabungan belum dibuat.",
              })
            }
            className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800 hover:bg-slate-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah
          </Button>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex items-center gap-2 pb-3 text-[13px] font-medium text-slate-800">
            <span>Tampilkan</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className={pageSizeClassName}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                {[10, 20, 50, 100].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>entri</span>
          </div>

          <div className="overflow-hidden bg-white">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead className="bg-white">
                  <tr className="border-b border-slate-300/70 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900">
                    <th className={cn("w-[44px] whitespace-nowrap", th)}>
                      <HeaderLabel sortable={false}>No.</HeaderLabel>
                    </th>
                    <th className={cn("w-[155px]", th)}>
                      <HeaderLabel>
                        <span className="block">No.</span>
                        <span className="block">Rekening</span>
                      </HeaderLabel>
                    </th>
                    <th className={cn("w-[115px]", th)}>
                      <HeaderLabel>
                        <span className="block">Tanggal</span>
                        <span className="block">Daftar</span>
                      </HeaderLabel>
                    </th>
                    <th className={cn("w-[185px]", th)}>
                      <HeaderLabel>
                        <span className="block">Produk</span>
                        <span className="block">Tabungan</span>
                      </HeaderLabel>
                    </th>
                    <th className={cn("w-[120px]", th)}>
                      <HeaderLabel>
                        <span className="block">ID.</span>
                        <span className="block">Nasabah</span>
                      </HeaderLabel>
                    </th>
                    <th className={cn("w-[180px]", th)}>
                      <HeaderLabel>Nasabah</HeaderLabel>
                    </th>
                    <th className={cn("w-[160px] text-right", th)}>
                      <HeaderLabel className="justify-end">Saldo</HeaderLabel>
                    </th>
                    <th className={cn("w-[130px]", th)}>
                      <HeaderLabel>Status</HeaderLabel>
                    </th>
                  </tr>

                  <tr className="border-b border-slate-200 bg-white">
                    <th className={filterCell} />
                    <th className={filterCell}>
                      <Input
                        value={accountNo}
                        onChange={(event) => setAccountNo(event.target.value)}
                        className={inputClassName}
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={registeredAt}
                        onChange={(event) => setRegisteredAt(event.target.value)}
                        className={inputClassName}
                      />
                    </th>
                    <th className={filterCell}>
                      <Select value={product} onValueChange={setProduct}>
                        <SelectTrigger className={selectClassName}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          {products.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option === "Semua" ? "-- Semua --" : option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={customerId}
                        onChange={(event) => setCustomerId(event.target.value)}
                        className={inputClassName}
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                        className={inputClassName}
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={balance}
                        onChange={(event) => setBalance(event.target.value)}
                        className={cn(inputClassName, "text-right tabular-nums")}
                        placeholder="0,00"
                        inputMode="decimal"
                      />
                    </th>
                    <th className={filterCell}>
                      <Select
                        value={status}
                        onValueChange={(value) =>
                          setStatus(value as "Semua" | AccountStatus)
                        }
                      >
                        <SelectTrigger className={selectClassName}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">-- Semua --</SelectItem>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                          <SelectItem value="Ditutup">Ditutup</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {pagedRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-10 text-center text-sm text-slate-600"
                      >
                        Tidak ada data yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    pagedRows.map((row, index) => (
                      <tr
                        key={row.id}
                        className={cn(
                          "border-b border-slate-200 text-[13px]",
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                        )}
                      >
                        <td className={cn(td, "tabular-nums text-slate-900")}>
                          {(page - 1) * pageSize + index + 1}
                        </td>
                        <td className={td}>
                          <button
                            type="button"
                            onClick={() => setSelectedAccount(row)}
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            {row.accountNo}
                          </button>
                        </td>
                        <td className={cn(td, "tabular-nums whitespace-nowrap")}>
                          {row.registeredAt}
                        </td>
                        <td className={cn(td, "text-slate-900")}>
                          {row.product}
                        </td>
                        <td className={cn(td, "tabular-nums whitespace-nowrap")}>
                          {row.customerId}
                        </td>
                        <td className={cn(td, "text-slate-900")}>
                          {row.customerName}
                        </td>
                        <td
                          className={cn(
                            td,
                            "text-right font-medium tabular-nums whitespace-nowrap text-slate-900",
                          )}
                        >
                          {row.balance}
                        </td>
                        <td className={td}>
                          <StatusBadge status={row.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-[14px] text-slate-900">
              Menampilkan {showingStart} sampai {showingEnd} dari{" "}
              {filteredRows.length} entri{" "}
              <span className="text-slate-600">
                (disaring dari {accountRows.length} entri keseluruhan)
              </span>
            </div>

            <Pagination page={page} pageCount={pageCount} onPage={setPage} />
          </div>
        </Card>
      </div>
    </div>
  );
}