import * as React from "react";

export default function LoanAccountEditFieldRow({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
      <div className="text-left">
        <div className="text-sm font-normal text-slate-900">
          {label}
          {required ? <span className="text-rose-600"> *</span> : null}
        </div>
        {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
