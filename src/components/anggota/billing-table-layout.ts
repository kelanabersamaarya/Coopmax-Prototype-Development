export const BILLING_COLUMN_WIDTHS = {
  selection: "44px",
  dueDate: "120px",
  amount: "128px",
  action: "56px",
  status: "170px",
} as const;

export const BILLING_TABLE_MIN_WIDTH = "1160px";

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
