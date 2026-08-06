"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const GRID_SELECTOR = ".loan-extension-account-grid";
const TOGGLE_CLASS = "loan-extension-account-info-toggle";
const COLLAPSED_COUNT = 12;

function setButtonContent(button: HTMLButtonElement, expanded: boolean) {
  button.replaceChildren();

  const label = document.createElement("span");
  label.textContent = expanded
    ? "Tampilkan Lebih Sedikit"
    : "Tampilkan Lebih Banyak";

  const chevron = document.createElement("span");
  chevron.setAttribute("aria-hidden", "true");
  chevron.style.display = "inline-flex";
  chevron.style.alignItems = "center";
  chevron.style.justifyContent = "center";
  chevron.style.width = "18px";
  chevron.style.height = "18px";
  chevron.style.flexShrink = "0";
  chevron.style.transition = "transform 180ms ease";
  chevron.style.transform = expanded ? "rotate(180deg)" : "rotate(0deg)";
  chevron.innerHTML = `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  `;

  button.append(label, chevron);
}

function applyFieldVisibility(fields: HTMLElement[], expanded: boolean) {
  fields.forEach((field, index) => {
    const shouldShow = expanded || index < COLLAPSED_COUNT;

    field.style.setProperty(
      "display",
      shouldShow ? "block" : "none",
      "important",
    );
  });
}

function styleToggleButton(button: HTMLButtonElement) {
  Object.assign(button.style, {
    position: "absolute",
    right: "16px",
    bottom: "12px",
    zIndex: "100",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: "170px",
    minHeight: "38px",
    padding: "8px 10px",
    border: "0",
    borderRadius: "8px",
    background: "rgba(15, 118, 110, 0.22)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "1",
    pointerEvents: "auto",
    touchAction: "manipulation",
    userSelect: "none",
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

  section.style.position = "relative";
  section.style.zIndex = "1";
  section.style.paddingBottom = "64px";

  let button = section.querySelector<HTMLButtonElement>(`.${TOGGLE_CLASS}`);

  if (!button) {
    button = document.createElement("button");
    button.type = "button";
    button.className = TOGGLE_CLASS;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Tampilkan informasi rekening lainnya");

    button.addEventListener(
      "pointerdown",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
      },
      { passive: false },
    );

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const expanded = button.getAttribute("aria-expanded") === "true";
      const nextExpanded = !expanded;

      button.setAttribute("aria-expanded", String(nextExpanded));
      button.setAttribute(
        "aria-label",
        nextExpanded
          ? "Sembunyikan informasi rekening tambahan"
          : "Tampilkan informasi rekening lainnya",
      );

      applyFieldVisibility(fields, nextExpanded);
      setButtonContent(button, nextExpanded);
    });

    button.addEventListener("mouseenter", () => {
      button.style.background = "rgba(15, 118, 110, 0.38)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.background = "rgba(15, 118, 110, 0.22)";
    });

    section.appendChild(button);
  }

  styleToggleButton(button);

  const expanded = button.getAttribute("aria-expanded") === "true";
  applyFieldVisibility(fields, expanded);
  setButtonContent(button, expanded);
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