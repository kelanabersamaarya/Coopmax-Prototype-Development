export const BILLING_COLUMN_WIDTHS = {
  selection: "36px",
  dueDate: "72px",
  amount: "96px",
  totalAmount: "100px",
  penalty: "100px",
  action: "28px",
  status: "105px",
} as const;

export const BILLING_TABLE_MIN_WIDTH = "0px";

const LOAN_DIALOG_COLUMN_WIDTHS = {
  selection: "36px",
  dueDate: "72px",
  amount: "90px",
  totalAmount: "80px",
  penalty: "84px",
  action: "24px",
  status: "76px",
} as const;

export function getBillingGridTemplateColumns({
  hideSelection,
  showPenaltyColumn,
  showStatusColumn,
  layout = "default",
}: {
  hideSelection: boolean;
  showPenaltyColumn: boolean;
  showStatusColumn: boolean;
  layout?: "default" | "anggota" | "loan-dialog";
}) {
  const widths = layout === "loan-dialog"

    ? LOAN_DIALOG_COLUMN_WIDTHS
    : BILLING_COLUMN_WIDTHS;
  const remainingAmount = layout === "loan-dialog" ? "90px" : "100px";
  const columns = hideSelection ? [] : [widths.selection];
  columns.push(
    widths.dueDate,
    widths.totalAmount,
    widths.amount,
    widths.amount,
    remainingAmount,
    remainingAmount,
  );
  if (showPenaltyColumn) {
    columns.push(widths.penalty, widths.action);
  }
  if (showStatusColumn) columns.push(widths.status);
  return columns.map((column) => `minmax(0, ${column.replace("px", "")}fr)`).join(" ");
}
