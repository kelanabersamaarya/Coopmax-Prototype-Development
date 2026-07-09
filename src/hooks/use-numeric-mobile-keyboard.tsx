"use client";

import * as React from "react";

export function useNumericMobileKeyboard(deps: React.DependencyList = []) {
  React.useEffect(() => {
    const root = document.querySelector('[data-mobile-screen="true"]');
    if (!root) return;

    function applyNumericKeyboard() {
      const inputs = root.querySelectorAll<HTMLInputElement>(
        'input[inputmode="numeric"], input[inputmode="decimal"]',
      );

      inputs.forEach((input) => {
        if (input.type !== "tel") {
          input.type = "tel";
        }

        input.setAttribute("pattern", "[0-9]*");
        input.setAttribute("enterkeyhint", "done");
      });
    }

    applyNumericKeyboard();

    const observer = new MutationObserver(applyNumericKeyboard);
    observer.observe(root, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, deps);
}