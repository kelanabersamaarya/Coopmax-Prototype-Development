import { isPaymentLinkLoanProductsPath, isSakCabangPath, isObsPath, resolveLoanRoute } from "./route-context";

export function isLoanSectionActive(pathname: string) {
  return (
    isPaymentLinkLoanProductsPath(pathname) ||
    pathname.startsWith("/loan-products") ||
    pathname.startsWith("/loans") ||
    pathname.startsWith("/sak-ep-cabang")
  );
}

export function isLoanMenuItemActive(to: string, pathname: string, search: string) {
  const itemTo = resolveLoanRoute(to, pathname);

  if (to === "/loan-products") {
    if (isSakCabangPath(pathname) || isObsPath(pathname)) {
      return pathname === itemTo || (pathname.startsWith(`${itemTo}/`) && !pathname.endsWith("/cabang") && search !== "?from=cabang");
    }
    if (isPaymentLinkLoanProductsPath(pathname)) {
      return pathname === "/payment-link/loan-products" || (pathname.startsWith("/payment-link/loan-products/") && search !== "?from=cabang");
    }
    return pathname === "/loan-products" || (pathname.startsWith("/loan-products/") && !pathname.endsWith("/cabang") && search !== "?from=cabang");
  }

  if (to === "/loan-products/cabang") {
    const prefix = isSakCabangPath(pathname) || isObsPath(pathname) ? `${itemTo.replace("/cabang", "")}/` : "/loan-products/";
    if (isPaymentLinkLoanProductsPath(pathname)) {
      return pathname === "/payment-link/loan-products/cabang" || (pathname.startsWith("/payment-link/loan-products/") && search === "?from=cabang");
    }
    return pathname === itemTo || (pathname.startsWith(prefix) && search === "?from=cabang");
  }

  return pathname === itemTo || pathname.startsWith(`${itemTo}/`);
}
