"use client";

import * as React from "react";
import {
  History,
  Calculator,
  ReceiptText,
  BookOpenText,
  Printer,
  ScrollText,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AksiDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-[5px] bg-white px-3 text-sm font-semibold text-slate-900 ring-1 ring-white/60 hover:bg-white/90"
        >
          Aksi <ChevronDown className="ml-2 h-4 w-4 text-slate-600" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 rounded-[5px] border-slate-200 p-1"
      >
        <DropdownMenuItem
          className="rounded-[5px]"
          onClick={() => toast("Riwayat Transaksi (prototype)")}
        >
          <History className="mr-2 h-4 w-4" />
          Riwayat Transaksi
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-[5px]"
          onClick={() => toast("Simulasi Tunggakan (prototype)")}
        >
          <Calculator className="mr-2 h-4 w-4" />
          Simulasi Tunggakan
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="rounded-[5px]"
          onClick={() => toast("Cetak Kwitansi Terakhir (prototype)")}
        >
          <ReceiptText className="mr-2 h-4 w-4" />
          Cetak Kwitansi Terakhir
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-[5px]"
          onClick={() => toast("Cetak Buku Transaksi Terakhir (prototype)")}
        >
          <BookOpenText className="mr-2 h-4 w-4" />
          Cetak Buku Transaksi Terakhir
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-[5px]"
          onClick={() => toast("Cetak Buku (prototype)")}
        >
          <Printer className="mr-2 h-4 w-4" />
          Cetak Buku
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-[5px]"
          onClick={() => toast("Cetak Prima Nota (prototype)")}
        >
          <ScrollText className="mr-2 h-4 w-4" />
          Cetak Prima Nota
        </DropdownMenuItem>
      </DropdownMenuContent>

      <div className="sr-only">
        <React.Fragment />
      </div>
    </DropdownMenu>
  );
}