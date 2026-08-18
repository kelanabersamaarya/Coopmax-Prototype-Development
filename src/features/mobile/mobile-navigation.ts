export type MobileScreen = string;

export type MobileNavigationState = {
  screen: MobileScreen;
  history: MobileScreen[];
};

export function createMobileNavigationState(screen: MobileScreen): MobileNavigationState {
  return { screen, history: [] };
}

export function pushMobileScreen(state: MobileNavigationState, screen: MobileScreen): MobileNavigationState {
  return { screen, history: [...state.history, state.screen] };
}

export function popMobileScreen(state: MobileNavigationState): MobileNavigationState {
  const previous = state.history[state.history.length - 1];
  if (previous === undefined) return state;
  return { screen: previous, history: state.history.slice(0, -1) };
}
