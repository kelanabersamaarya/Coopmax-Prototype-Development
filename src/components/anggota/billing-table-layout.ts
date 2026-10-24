export const BILLING_COLUMN_WIDTHS = {
  selection: "36px",
  dueDate: "95px",
  amount: "100px",
  action: "24px",
  status: "200px",
} as const;

export const BILLING_TABLE_MIN_WIDTH = "960px";

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
    columns.push(BILLING_COLUMN_WIDTHS.amount, BILLING_COLUMN_WIDTHS.action);
  }
  if (showStatusColumn) columns.push(BILLING_COLUMN_WIDTHS.status);
  return columns.join(" ");
}
