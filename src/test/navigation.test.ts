import { describe, expect, it } from "vitest";
import { isLoanMenuItemActive, isLoanSectionActive } from "@/navigation/menu-state";
import { resolveLoanRoute } from "@/navigation/route-context";

describe("loan navigation contracts", () => {
  it("resolves context-specific loan routes", () => {
    expect(resolveLoanRoute("/loan-products", "/loan-products")).toBe("/loan-products");
    expect(resolveLoanRoute("/loan-products", "/sak-ep-cabang/loan-products")).toBe("/sak-ep-cabang/loan-products");
    expect(resolveLoanRoute("/loan-products", "/obs-samudra-harta/loan-products")).toBe("/obs-samudra-harta/loan-products");
  });

  it("preserves from=cabang active state", () => {
    expect(isLoanMenuItemActive("/loan-products/cabang", "/loan-products/123", "?from=cabang")).toBe(true);
    expect(isLoanMenuItemActive("/loan-products", "/loan-products/123", "?from=cabang")).toBe(false);
  });

  it("marks reports and settings as part of the loan section", () => {
    expect(isLoanSectionActive("/laporan/produktivitas")).toBe(true);
    expect(isLoanSectionActive("/pengaturan-umum")).toBe(true);
  });
});
