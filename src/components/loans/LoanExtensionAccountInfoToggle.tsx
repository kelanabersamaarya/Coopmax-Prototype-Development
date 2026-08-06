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
  chevron.style.width = "16px";
  chevron.style.height = "16px";
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
      width="16"
      height="16"
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
    right: "20px",
    bottom: "16px",
    zIndex: "30",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "5px",
    minHeight: "24px",
    padding: "3px 0",
    border: "0",
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "600",
    lineHeight: "1",
    pointerEvents: "auto",
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
  section.style.paddingBottom = "58px";

  let button = section.querySelector<HTMLButtonElement>(`.${TOGGLE_CLASS}`);

  if (!button) {
    button = document.createElement("button");
    button.type = "button";
    button.className = TOGGLE_CLASS;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Tampilkan informasi rekening lainnya");

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
      button.style.color = "rgba(255,255,255,0.78)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.color = "#ffffff";
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