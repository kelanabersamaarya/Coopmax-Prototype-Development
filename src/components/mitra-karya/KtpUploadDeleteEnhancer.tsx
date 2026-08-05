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

function findUploadBox(uploadSection: HTMLElement) {
  return Array.from(uploadSection.children).find(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.classList.contains("flex"),
  );
}

function syncDeleteButton() {
  const dialog = document.querySelector<HTMLElement>(DIALOG_SELECTOR);
  if (!dialog) return;

  const sections = Array.from(
    dialog.querySelectorAll<HTMLElement>("main > div.grid > section"),
  );
  const uploadSection = sections[1];
  if (!uploadSection) return;

  const uploadBox = findUploadBox(uploadSection);
  if (!uploadBox) return;

  const previewImage = uploadBox.querySelector<HTMLImageElement>("img");
  const fileInput = uploadBox.querySelector<HTMLInputElement>('input[type="file"]');

  const hasUploadedFile = Boolean(fileInput?.files?.length);
  const hasPreviewImage = Boolean(previewImage);

  uploadBox.querySelector(`[${BUTTON_ATTRIBUTE}]`)?.remove();

  if (!hasUploadedFile && !hasPreviewImage) return;

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
    zIndex: "30",
    width: "36px",
    height: "36px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "0",
    borderRadius: "8px",
    backgroundColor: "#DC3545",
    color: "#FFFFFF",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(15, 23, 42, 0.2)",
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

    if (fileInput) {
      fileInput.value = "";
      fileInput.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (previewImage) {
      previewImage.remove();
    }

    deleteButton.remove();
  });

  uploadBox.appendChild(deleteButton);
}

export default function KtpUploadDeleteEnhancer() {
  React.useEffect(() => {
    let frameId = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncDeleteButton);
    };

    const observer = new MutationObserver(scheduleSync);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return null;
}