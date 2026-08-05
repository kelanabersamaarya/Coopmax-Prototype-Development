"use client";

import * as React from "react";

const DIALOG_SELECTOR =
  '[role="dialog"][class*="max-w-[1000px]"], [data-radix-dialog-content][class*="max-w-[1000px]"]';

const BUTTON_ATTRIBUTE = "data-ktp-delete-button";

function createTrashIcon() {
  return `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      style="width:16px;height:16px"
    >
      <path d="M3 6h18"></path>
      <path d="M8 6V4h8v2"></path>
      <path d="M19 6l-1 14H6L5 6"></path>
      <path d="M10 11v5"></path>
      <path d="M14 11v5"></path>
    </svg>
  `;
}

function syncDeleteButton() {
  const dialog = document.querySelector<HTMLElement>(DIALOG_SELECTOR);
  if (!dialog) return;

  const uploadSection = dialog.querySelector<HTMLElement>(
    "main > div.grid > section:nth-child(2)",
  );
  if (!uploadSection) return;

  const uploadBox = uploadSection.querySelector<HTMLElement>(
    "> div.flex",
  );
  if (!uploadBox) return;

  const previewImage = uploadBox.querySelector<HTMLImageElement>("img");

  if (!previewImage || previewImage.dataset.ktpDeleted === "true") {
    uploadBox.querySelector(`[${BUTTON_ATTRIBUTE}]`)?.remove();
    return;
  }

  if (uploadBox.querySelector(`[${BUTTON_ATTRIBUTE}]`)) return;

  uploadBox.style.position = "relative";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.setAttribute(BUTTON_ATTRIBUTE, "true");
  deleteButton.setAttribute("aria-label", "Hapus foto KTP");
  deleteButton.setAttribute("title", "Hapus foto KTP");
  deleteButton.innerHTML = createTrashIcon();

  Object.assign(deleteButton.style, {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: "20",
    width: "34px",
    height: "34px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "0",
    borderRadius: "8px",
    backgroundColor: "#DC3545",
    color: "#FFFFFF",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(15, 23, 42, 0.16)",
  });

  deleteButton.addEventListener("mouseenter", () => {
    deleteButton.style.backgroundColor = "#C72F3D";
  });

  deleteButton.addEventListener("mouseleave", () => {
    deleteButton.style.backgroundColor = "#DC3545";
  });

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    previewImage.dataset.ktpDeleted = "true";
    previewImage.style.display = "none";
    deleteButton.remove();

    const fileInput = uploadBox.querySelector<HTMLInputElement>(
      'input[type="file"]',
    );

    if (fileInput) {
      fileInput.value = "";
    }
  });

  uploadBox.appendChild(deleteButton);
}

export default function KtpUploadDeleteEnhancer() {
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(syncDeleteButton);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    syncDeleteButton();

    return () => observer.disconnect();
  }, []);

  return null;
}