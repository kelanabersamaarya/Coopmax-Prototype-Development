import * as React from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type AutodebetSchedule = {
  product: string;
  accountNo: string;
  date: string;
  description: string;
  status: boolean;
};

const accountOptions: Record<string, string[]> = {
  "Simpanan Sukarela": ["4260029 - Pangeran Sirait"],
  "Simpanan Mapan": ["112233222 - Gaby"],
  "Simpanan Wajib": ["SWJ-2600006 - Laura Patel"],
};

function AutodebetToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[22px] w-[49px] items-center rounded-full p-[3px]",
        "transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        checked ? "bg-[#635BFF]" : "bg-[#A89BFF]",
      )}
      aria-pressed={checked}
    >
      <span
        className={cn(
          "absolute text-[9px] font-bold leading-none text-white",
          checked ? "left-[7px]" : "right-[7px]",
        )}
      >
        {checked ? "ON" : "OFF"}
      </span>

      <span
        className={cn(
          "relative z-10 h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[27px]" : "translate-x-0",
        )}
      />
    </button>
  );
}

export default function AutodebetScheduleDialog({
  open,
  onOpenChange,
  onProcess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcess: (schedule: AutodebetSchedule) => void;
}) {
  const [interMember, setInterMember] = React.useState(false);
  const [product, setProduct] = React.useState("");
  const [accountNo, setAccountNo] = React.useState("");
  const [date, setDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    setInterMember(false);
    setProduct("");
    setAccountNo("");
    setDate("");
    setDescription("");
    setStatus(false);
  }, [open]);

  function processSchedule() {
    if (!product) {
      toast("Produk tujuan wajib dipilih");
      return;
    }

    if (!accountNo) {
      toast("No. rekening tujuan wajib dipilih");
      return;
    }

    if (!date) {
      toast("Tanggal autodebet wajib dipilih");
      return;
    }

    onProcess({
      product,
      accountNo,
      date,
      description,
      status,
    });
    onOpenChange(false);
  }

  const inputClassName = cn(
    "h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
    "text-[14px] font-normal text-[#526685] shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const labelClassName = "text-[14px] font-normal text-[#002060]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[760px]",
          "max-w-[760px] overflow-hidden rounded-[14px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between border-b border-[#CBD5E1] px-5 py-4">
            <h2 className="text-[18px] font-bold leading-tight text-[#1F2A3D]">
              Jadwal Autodebet
            </h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" strokeWidth={3} />
            </button>
          </div>

          <div className="px-5 py-8 sm:px-10">
            <div className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start">
              <Label className={cn(labelClassName, "pt-1")}>
                Transaksi Rekening
                <br />
                Anggota/Nasabah lain
              </Label>
              <div className="flex h-[31px] items-center">
                <AutodebetToggle
                  checked={interMember}
                  onChange={setInterMember}
                />
              </div>

              <Label className={labelClassName}>Produk Tujuan</Label>
              <Select
                value={product}
                onValueChange={(value) => {
                  setProduct(value);
                  setAccountNo("");
                }}
              >
                <SelectTrigger className={inputClassName}>
                  <SelectValue placeholder="Pilih Produk" />
                </SelectTrigger>
                <SelectContent className="rounded-[5px] border-slate-200">
                  {Object.keys(accountOptions).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label className={labelClassName}>No. Rekening Tujuan</Label>
              <Select
                value={accountNo}
                onValueChange={setAccountNo}
                disabled={!product}
              >
                <SelectTrigger
                  className={cn(
                    inputClassName,
                    !product ? "bg-slate-100 text-slate-400" : "",
                  )}
                >
                  <SelectValue placeholder="Pilih Rekening" />
                </SelectTrigger>
                <SelectContent className="rounded-[5px] border-slate-200">
                  {(accountOptions[product] ?? []).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label className={labelClassName}>Tanggal Autodebet</Label>
              <Input
                value={date}
                onChange={(event) => setDate(event.target.value)}
                placeholder="Pilih Tanggal"
                inputMode="numeric"
                className={inputClassName}
              />

              <Label className={cn(labelClassName, "pt-1")}>Keterangan</Label>
              <Textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-[108px] rounded-[5px] border-[#CBD5E1] text-[14px] focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <Label className={cn(labelClassName, "pt-1")}>
                Status Autodebet
              </Label>
              <div className="flex h-[31px] items-center">
                <AutodebetToggle checked={status} onChange={setStatus} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#CBD5E1] px-4 py-4">
            <button
              type="button"
              onClick={processSchedule}
              className="h-[38px] rounded-[7px] bg-[#6F42C1] px-5 text-[14px] font-semibold text-white transition hover:bg-[#643ab0]"
            >
              Proses
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-[7px] bg-[#77839A] px-4 text-[14px] font-semibold text-white transition hover:bg-[#6b768c]"
            >
              <X className="h-4 w-4" strokeWidth={3} />
              Tutup
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}