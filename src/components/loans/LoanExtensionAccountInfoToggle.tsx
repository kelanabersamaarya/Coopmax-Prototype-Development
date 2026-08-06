"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const GRID_SELECTOR = ".loan-extension-account-grid";
const TOGGLE_CLASS = "loan-extension-account-info-toggle";
const COLLAPSED_COUNT = 12;

function applyFieldVisibility(
  fields: HTMLElement[],
  expanded: boolean,
) {
  fields.forEach((field, index) => {
    const shouldShow = expanded || index < COLLAPSED_COUNT;
    field.style.setProperty("display", shouldShow ? "block" : "none", "important");
  });
}

function syncAccountInfoToggle() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  const grid = wizard?.querySelector<HTMLElement>(GRID_SELECTOR);

  if (!wizard || !grid) return;

  const fields = Array.from(
    grid.querySelectorAll<HTMLElement>(".loan-extension-account-field"),
  );

  if (fields.length <= COLLAPSED_COUNT) return;

  const section = grid.closest("section");
  if (!section) return;

  let button = section.querySelector<HTMLButtonElement>(`.${TOGGLE_CLASS}`);

  if (!button) {
    button = document.createElement("button");
    button.type = "button";
    button.className = TOGGLE_CLASS;
    button.setAttribute("aria-expanded", "false");
    button.textContent = "Tampilkan Lebih Banyak";

    Object.assign(button.style, {
      display: "block",
      marginLeft: "auto",
      marginTop: "16px",
      padding: "4px 0",
      border: "0",
      background: "transparent",
      color: "#ffffff",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "1.2",
    });

    button.addEventListener("mouseenter", () => {
      button.style.color = "rgba(255,255,255,0.78)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.color = "#ffffff";
    });

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const expanded = button?.getAttribute("aria-expanded") === "true";
      const nextExpanded = !expanded;

      applyFieldVisibility(fields, nextExpanded);

      button?.setAttribute("aria-expanded", String(nextExpanded));
      button!.textContent = nextExpanded
        ? "Tampilkan Lebih Sedikit"
        : "Tampilkan Lebih Banyak";
    });

    section.appendChild(button);
  }

  const expanded = button.getAttribute("aria-expanded") === "true";
  applyFieldVisibility(fields, expanded);
}

export default function LoanExtensionAccountInfoToggle() {
  React.useEffect(() => {
    let frameId = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncAccountInfoToggle);
    };

    const observer = new MutationObserver(scheduleSync);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();

      document
        .querySelectorAll(`.${TOGGLE_CLASS}`)
        .forEach((button) => button.remove());
    };
  }, []);

  return null;
}