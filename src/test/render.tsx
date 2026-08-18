import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";

export function renderWithProviders(
  ui: ReactNode,
  options: MemoryRouterProps & { queryClient?: QueryClient } = {},
) {
  const { queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } }), ...routerProps } = options;

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter {...routerProps}>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}
