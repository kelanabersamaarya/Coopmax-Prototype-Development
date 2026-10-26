export const BILLING_COLUMN_WIDTHS = {
  selection: "36px",
  dueDate: "72px",
  amount: "100px",
  penalty: "90px",
  action: "24px",
  status: "150px",
} as const;

export const BILLING_TABLE_MIN_WIDTH = "892px";

export function getBillingGridTemplateColumns({
  hideSelection,
  showPenaltyColumn,
  showStatusColumn,
}: {
  hideSelection: boolean;
  showPenaltyColumn: boolean;
  showStatusColumn: boolean;
}) {
  const columns = hideSelection ? [] : [BILLING_COLUMN_WIDTHS.selection];
  columns.push(
    BILLING_COLUMN_WIDTHS.dueDate,
    BILLING_COLUMN_WIDTHS.amount,
    BILLING_COLUMN_WIDTHS.amount,
    BILLING_COLUMN_WIDTHS.amount,
    BILLING_COLUMN_WIDTHS.amount,
    BILLING_COLUMN_WIDTHS.amount,
  );
  if (showPenaltyColumn) {
    columns.push(BILLING_COLUMN_WIDTHS.penalty, BILLING_COLUMN_WIDTHS.action);
  }
  if (showStatusColumn) columns.push(BILLING_COLUMN_WIDTHS.status);
  return columns.map((column) => `minmax(0, ${column.replace("px", "")}fr)`).join(" ");
}
