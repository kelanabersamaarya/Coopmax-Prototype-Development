"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const GRID_SELECTOR = ".loan-extension-account-grid";
const TOGGLE_CLASS = "loan-extension-account-info-toggle";

function getElements() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  const grid = wizard?.querySelector<HTMLElement>(GRID_SELECTOR);
  const section = grid?.closest("section") as HTMLElement | null;
  if (!wizard || !grid || !section) return null;
  return {
    grid,
    section,
    fields: Array.from(grid.querySelectorAll<HTMLElement>(".loan-extension-account-field")),
    headings: Array.from(grid.querySelectorAll<HTMLElement>("[data-account-item-heading='true']")),
  };
}

function applyVisibility(fields: HTMLElement[], expanded: boolean) {
  fields.forEach((field) => {
    const compact = field.dataset.accountCompact === "true";
    field.style.setProperty("display", expanded || compact ? "block" : "none", "important");
  });
}

function applyHeadingVisibility(headings: HTMLElement[]) {
  headings.forEach((heading) => {
    let next = heading.nextElementSibling as HTMLElement | null;
    let hasVisibleField = false;
    while (next && !next.matches("[data-account-item-heading='true']")) {
      if (next.classList.contains("loan-extension-account-field") && next.style.display !== "none") {
        hasVisibleField = true;
        break;
      }
      next = next.nextElementSibling as HTMLElement | null;
    }
    heading.style.setProperty("display", hasVisibleField ? "block" : "none", "important");
  });
}

function updateButton(button: HTMLButtonElement, expanded: boolean) {
  button.replaceChildren();
  const label = document.createElement("span");
  label.textContent = expanded ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak";
  const icon = document.createElement("span");
  icon.textContent = expanded ? "⌃" : "⌄";
  icon.setAttribute("aria-hidden", "true");
  icon.style.fontSize = "18px";
  button.append(label, icon);
  button.setAttribute("aria-expanded", String(expanded));
  button.setAttribute("aria-label", expanded ? "Sembunyikan informasi rekening tambahan" : "Tampilkan informasi rekening tambahan");
}

function sync() {
  const elements = getElements();
  if (!elements || elements.fields.length === 0) return;
  const { grid, section, fields, headings } = elements;
  section.style.position = "relative";
  section.style.paddingBottom = "64px";
  let button = section.querySelector<HTMLButtonElement>(`.${TOGGLE_CLASS}`);
  if (!button) {
    button = document.createElement("button");
    button.type = "button";
    button.className = TOGGLE_CLASS;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const expanded = grid.dataset.accountInfoExpanded === "true";
      grid.dataset.accountInfoExpanded = String(!expanded);
      applyVisibility(fields, !expanded);
      applyHeadingVisibility(headings);
      updateButton(button!, !expanded);
    });
    section.appendChild(button);
  }
  Object.assign(button.style, { position: "absolute", right: "16px", bottom: "12px", zIndex: "100", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", minWidth: "170px", minHeight: "38px", padding: "8px 10px", border: "0", borderRadius: "8px", background: "transparent", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: "700", lineHeight: "1", whiteSpace: "nowrap", pointerEvents: "auto", touchAction: "manipulation" });
  const expanded = grid.dataset.accountInfoExpanded === "true";
  applyVisibility(fields, expanded);
  applyHeadingVisibility(headings);
  updateButton(button, expanded);
}

export default function LoanExtensionAccountInfoToggle() {
  React.useEffect(() => {
    let frameId = 0;
    const scheduleSync = () => { window.cancelAnimationFrame(frameId); frameId = window.requestAnimationFrame(sync); };
    const observer = new MutationObserver(scheduleSync);
    const intervalId = window.setInterval(sync, 250);
    observer.observe(document.body, { childList: true, subtree: true });
    scheduleSync();
    return () => { window.cancelAnimationFrame(frameId); window.clearInterval(intervalId); observer.disconnect(); document.querySelectorAll(`.${TOGGLE_CLASS}`).forEach((button) => button.remove()); };
  }, []);
  return null;
}
