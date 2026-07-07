"use client";

import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import { cn } from "@/lib/utils";

export default function LoanProductPaymentLinkSection({
  enabled,
  onEnabledChange,
  publishDate,
  onPublishDateChange,
  expiryDate,
  onExpiryDateChange,
  inputClassName,
}: {
  enabled: boolean;
  onEnabledChange: (value: boolean) => void;
  publishDate: string;
  onPublishDateChange: (value: string) => void;
  expiryDate: string;
  onExpiryDateChange: (value: string) => void;
  inputClassName?: string;
}) {
  return (
    <div className="loan-product-payment-link-section">
      <Separator className="my-6 bg-slate-200/70" />

      <div className="text-base font-semibold text-slate-900">Payment Link</div>

      <div className="mt-4 grid gap-5">
        <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
          <div className="text-sm font-normal text-slate-900">Payment link</div>

          <div className="flex items-center justify-start">
            <Switch checked={enabled} onCheckedChange={onEnabledChange} />
          </div>
        </div>

        {enabled ? (
          <>
            <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
              <div className="text-sm font-normal text-slate-900">
                Tanggal penerbitan
              </div>

              <DatePickerDmyField
                value={publishDate}
                onChange={onPublishDateChange}
                inputClassName={cn(
                  "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
                  inputClassName,
                )}
                popoverAlign="end"
                placeholder="Pilih Tanggal Penerbitan Payment Link"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
              <div className="text-sm font-normal text-slate-900">
                Tanggal kedaluwarsa
              </div>

              <DatePickerDmyField
                value={expiryDate}
                onChange={onExpiryDateChange}
                inputClassName={cn(
                  "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
                  inputClassName,
                )}
                popoverAlign="end"
                placeholder="Pilih Tanggal Kedaluwarsa Payment Link"
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}