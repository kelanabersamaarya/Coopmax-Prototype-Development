export const BILLING_COLUMN_WIDTHS = {
  selection: "36px",
  dueDate: "72px",
  amount: "100px",
  totalAmount: "90px",
  penalty: "60px",
  action: "24px",
  status: "76px",
} as const;

export const BILLING_TABLE_MIN_WIDTH = "892px";

export function getBillingGridTemplateColumns({
  hideSelection,
  showPenaltyColumn,
  showStatusColumn,
  layout = "default",
}: {
  hideSelection: boolean;
  showPenaltyColumn: boolean;
  showStatusColumn: boolean;
  layout?: "default" | "loan-dialog";
}) {
  const widths = layout === "loan-dialog"
    ? {
        ...BILLING_COLUMN_WIDTHS,
        totalAmount: "80px",
        amount: "90px",
        penalty: "84px",
      }
    : BILLING_COLUMN_WIDTHS;
  const columns = hideSelection ? [] : [widths.selection];
  columns.push(
    widths.dueDate,
    widths.totalAmount,
    widths.amount,
    widths.amount,
    widths.amount,
    widths.amount,
  );
  if (showPenaltyColumn) {
    columns.push(widths.penalty, widths.action);
  }
  if (showStatusColumn) columns.push(widths.status);
  return columns.map((column) => `minmax(0, ${column.replace("px", "")}fr)`).join(" ");
}
