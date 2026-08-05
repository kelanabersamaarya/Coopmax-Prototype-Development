"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

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

function hideChangePhotoButton(uploadBox: HTMLElement) {
  Array.from(uploadBox.querySelectorAll<HTMLButtonElement>("button")).forEach(
    (button) => {
      if ((button.textContent ?? "").trim().toLowerCase() === "ganti foto ktp") {
        button.style.display = "none";
      }
    },
  );
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

  hideChangePhotoButton(uploadBox);

  const previewImage = uploadBox.querySelector<HTMLImageElement>("img");
  const fileInput = uploadBox.querySelector<HTMLInputElement>(
    'input[type="file"]',
  );

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
  deleteButton.innerHTML = `
    <span style="display:inline-flex;align-items:center;justify-content:center;">
      ${createTrashIcon()}
    </span>
    <span>Hapus</span>
  `;

  Object.assign(deleteButton.style, {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: "30",
    minWidth: "82px",
    height: "36px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "0 10px",
    border: "0",
    borderRadius: "8px",
    backgroundColor: "#DC3545",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "1",
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

    previewImage?.remove();
    deleteButton.remove();
  });

  uploadBox.appendChild(deleteButton);
}

function stopModalEvent(event: React.SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
}

function KtpSaveConfirmModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="pointer-events-auto fixed inset-0 z-[99999] flex items-center justify-center bg-black/35 px-5"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi"
        onPointerDown={stopModalEvent}
        onClick={(event) => {
          stopModalEvent(event);
          onCancel();
        }}
      />

      <div
        className="relative z-10 w-full max-w-[460px] rounded-[5px] bg-white px-6 pb-6 pt-8 text-center shadow-2xl"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-[#f7c8a6]">
          <span className="text-5xl font-light leading-none text-[#f2b98f]">
            !
          </span>
        </div>

        <h2 className="mt-6 text-[22px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
          Yakin menyimpan foto KTP anggota?
        </h2>

        <div className="relative z-20 mt-7 flex items-center justify-center gap-2">
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              stopModalEvent(event);
              onConfirm();
            }}
            className={cn(
              "pointer-events-auto inline-flex h-11 min-w-[100px] items-center justify-center rounded-[5px]",
              "bg-[#2f80ed] px-5 text-[14px] font-semibold text-white",
              "transition hover:bg-[#266ed0]",
            )}
          >
            Yes
          </button>

          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              stopModalEvent(event);
              onCancel();
            }}
            className={cn(
              "pointer-events-auto inline-flex h-11 min-w-[110px] items-center justify-center rounded-[5px]",
              "bg-[#77839A] px-5 text-[14px] font-semibold text-white",
              "transition hover:bg-[#6b768c]",
            )}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function KtpSaveSuccessModal({
  open,
  onOk,
}: {
  open: boolean;
  onOk: () => void;
}) {
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="pointer-events-auto fixed inset-0 z-[100000] flex items-center justify-center bg-black/35 px-5"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="relative z-10 w-full max-w-[460px] rounded-[5px] bg-white px-6 py-8 text-center shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white ring-2 ring-[#b9dfa2]">
          <Check className="h-11 w-11 text-[#33aa00]" strokeWidth={3} />
        </div>

        <h2 className="mt-6 text-[22px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
          Berhasil mengunggah foto KTP anggota
        </h2>

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            stopModalEvent(event);
            onOk();
          }}
          className="relative z-20 mt-7 inline-flex h-11 min-w-[110px] items-center justify-center rounded-[5px] bg-[#2f80ed] px-5 text-[14px] font-semibold text-white transition hover:bg-[#266ed0]"
        >
          OK
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function KtpUploadDeleteEnhancer() {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const pendingSaveButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const bypassRef = React.useRef(false);

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

    function handleSaveClick(event: MouseEvent) {
      if (bypassRef.current) return;

      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>("button");
      if (!button || button.disabled) return;

      const dialog = button.closest<HTMLElement>(DIALOG_SELECTOR);
      if (!dialog) return;

      const label = (button.textContent ?? "").trim().toLowerCase();
      if (label !== "simpan") return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      pendingSaveButtonRef.current = button;
      setConfirmOpen(true);
    }

    document.addEventListener("click", handleSaveClick, true);
    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener("click", handleSaveClick, true);
    };
  }, []);

  function finishSave() {
    const button = pendingSaveButtonRef.current;

    setSuccessOpen(false);
    pendingSaveButtonRef.current = null;

    if (!button) return;

    bypassRef.current = true;

    window.requestAnimationFrame(() => {
      button.click();

      window.setTimeout(() => {
        bypassRef.current = false;
      }, 0);
    });
  }

  return (
    <>
      <KtpSaveConfirmModal
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false);
          pendingSaveButtonRef.current = null;
        }}
        onConfirm={() => {
          setConfirmOpen(false);
          setSuccessOpen(true);
        }}
      />

      <KtpSaveSuccessModal open={successOpen} onOk={finishSave} />
    </>
  );
}