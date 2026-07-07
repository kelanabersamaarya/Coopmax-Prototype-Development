import * as React from "react";
import { Copy, Link2, Plus, QrCode } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type PaymentLinkRow = {
  id: string;
  customerName: string;
  amount: string;
  description: string;
  link: string;
  status: "Aktif" | "Dibayar";
};

const initialRows: PaymentLinkRow[] = [
  {
    id: "PL-260001",
    customerName: "Laura Patel",
    amount: "500.000,00",
    description: "Pembayaran angsuran koperasi",
    link: "https://pay.coopmax.app/pl/260001",
    status: "Aktif",
  },
  {
    id: "PL-260002",
    customerName: "Bapak Bagus",
    amount: "1.250.000,00",
    description: "Pembayaran simpanan",
    link: "https://pay.coopmax.app/pl/260002",
    status: "Dibayar",
  },
];

function StatusBadge({ status }: { status: PaymentLinkRow["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-[5px] px-2.5 py-1 text-[11px] font-bold leading-none text-white",
        status === "Aktif" ? "bg-[#3BB001]" : "bg-[#2563EB]",
      )}
    >
      {status}
    </span>
  );
}

export default function PaymentLink() {
  const [rows, setRows] = React.useState<PaymentLinkRow[]>(initialRows);
  const [customerName, setCustomerName] = React.useState("");
  const [amount, setAmount] = React.useState("0,00");
  const [description, setDescription] = React.useState("");

  function createPaymentLink() {
    if (!customerName.trim()) {
      toast("Nama pelanggan wajib diisi");
      return;
    }

    if (!amount.trim() || amount.trim() === "0,00" || amount.trim() === "0") {
      toast("Nominal wajib diisi");
      return;
    }

    const id = `PL-${Date.now().toString().slice(-6)}`;
    const next: PaymentLinkRow = {
      id,
      customerName: customerName.trim(),
      amount: amount.trim(),
      description: description.trim() || "-",
      link: `https://pay.coopmax.app/pl/${id.toLowerCase()}`,
      status: "Aktif",
    };

    setRows((current) => [next, ...current]);
    setCustomerName("");
    setAmount("0,00");
    setDescription("");

    toast.success("Payment Link dibuat", {
      description: next.link,
    });
  }

  function copyLink(link: string) {
    navigator.clipboard.writeText(link);
    toast.success("Link disalin", {
      description: link,
    });
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Payment Link
            </h1>
            <div className="text-base font-semibold text-slate-600">Modul</div>
          </div>

          <Button
            onClick={createPaymentLink}
            className="h-10 rounded-[5px] bg-[#635BFF] px-4 text-white hover:bg-[#554cf0]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Buat Link
          </Button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[380px_minmax(0,1fr)]">
          <Card className="rounded-[5px] border-slate-200/70 bg-white/90 p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] bg-[#EEF6FF] text-[#2563EB] ring-1 ring-[#CFE4FF]">
                <Link2 className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[16px] font-extrabold text-slate-900">
                  Buat Payment Link
                </div>
                <div className="mt-1 text-[13px] leading-relaxed text-slate-600">
                  Isi data singkat untuk membuat link pembayaran prototype.
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <label className="text-[13px] font-semibold text-slate-700">
                  Nama Pelanggan
                </label>
                <Input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="h-10 rounded-[5px] border-slate-300 bg-white"
                  placeholder="Contoh: Laura Patel"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-[13px] font-semibold text-slate-700">
                  Nominal
                </label>
                <Input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="h-10 rounded-[5px] border-slate-300 bg-white text-right tabular-nums"
                  placeholder="0,00"
                  inputMode="decimal"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-[13px] font-semibold text-slate-700">
                  Deskripsi
                </label>
                <Textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="min-h-[96px] rounded-[5px] border-slate-300 bg-white"
                  placeholder="Tulis keterangan pembayaran..."
                />
              </div>

              <Button
                onClick={createPaymentLink}
                className="h-10 rounded-[5px] bg-[#3BB001] text-white hover:bg-[#349d01]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Buat Payment Link
              </Button>
            </div>
          </Card>

          <Card className="rounded-[5px] border-slate-200/70 bg-white/90 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[16px] font-extrabold text-slate-900">
                  Daftar Payment Link
                </div>
                <div className="mt-1 text-[13px] leading-relaxed text-slate-600">
                  Semua link pembayaran yang dibuat di prototype.
                </div>
              </div>

              <span className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] bg-violet-50 text-violet-700 ring-1 ring-violet-200">
                <QrCode className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-5 overflow-hidden rounded-[5px] border border-slate-200 bg-white">
              <div className="safe-x-scroll">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-600">
                      <th className="w-[110px] px-3 py-3">ID</th>
                      <th className="w-[170px] px-3 py-3">Pelanggan</th>
                      <th className="w-[140px] px-3 py-3 text-right">Nominal</th>
                      <th className="min-w-[230px] px-3 py-3">Link</th>
                      <th className="w-[100px] px-3 py-3">Status</th>
                      <th className="w-[80px] px-3 py-3 text-center">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, index) => (
                      <tr
                        key={row.id}
                        className={cn(
                          "border-b border-slate-100 text-[13px]",
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                        )}
                      >
                        <td className="px-3 py-3 font-semibold text-slate-900">
                          {row.id}
                        </td>
                        <td className="px-3 py-3 text-slate-900">
                          <div className="font-semibold">{row.customerName}</div>
                          <div className="mt-0.5 line-clamp-1 text-[12px] text-slate-500">
                            {row.description}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right font-semibold tabular-nums text-slate-900">
                          {row.amount}
                        </td>
                        <td className="px-3 py-3">
                          <div className="truncate font-medium text-blue-600">
                            {row.link}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex justify-center">
                            <button
                              type="button"
                              onClick={() => copyLink(row.link)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] bg-white text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
                              aria-label="Salin link"
                              title="Salin link"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}