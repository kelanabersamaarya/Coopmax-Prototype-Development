export type NavigationArea = "base" | "obs" | "sak-ep-cabang" | "payment-link" | "mobile";

export function isObsPath(pathname: string) {
  return pathname.startsWith("/obs-samudra-harta") || pathname.startsWith("/obs-web");
}

export function isSakCabangPath(pathname: string) {
  return pathname.startsWith("/sak-ep-cabang");
}

export function isPaymentLinkLoanProductsPath(pathname: string) {
  return pathname.startsWith("/payment-link/loan-products");
}

export function getNavigationArea(pathname: string): NavigationArea {
  if (pathname.startsWith("/mobile")) return "mobile";
  if (isSakCabangPath(pathname)) return "sak-ep-cabang";
  if (isObsPath(pathname)) return "obs";
  if (pathname.startsWith("/payment-link")) return "payment-link";
  return "base";
}

export function resolveLoanRoute(to: string, pathname: string) {
  if (isSakCabangPath(pathname)) return `/sak-ep-cabang${to}`;
  if (!isObsPath(pathname)) return to;
  return `/obs-samudra-harta${to}`;
}
