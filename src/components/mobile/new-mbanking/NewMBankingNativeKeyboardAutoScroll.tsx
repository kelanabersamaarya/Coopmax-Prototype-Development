"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type EditableField = HTMLInputElement | HTMLTextAreaElement;

type ScrollParentStyle = {
  element: HTMLElement;
  paddingBottom: string;
  scrollPaddingBottom: string;
  overscrollBehaviorY: string;
  webkitOverflowScrolling: string;
};

const EXTRA_BOTTOM_SPACE = 42;
const FALLBACK_KEYBOARD_HEIGHT = 320;

function isEditableField(element: Element | null): element is EditableField {
  if (!element) return false;

  const tagName = element.tagName.toLowerCase();

  if (tagName !== "input" && tagName !== "textarea") return false;

  const field = element as EditableField;

  return !field.disabled && !field.readOnly;
}

function findMobileScreen(element: HTMLElement) {
  return element.closest('[data-mobile-screen="true"]') as HTMLElement | null;
}

function findScrollableParent(
  element: HTMLElement,
  mobileScreen: HTMLElement,
): HTMLElement {
  let current: HTMLElement | null = element.parentElement;

  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    const canScrollY =
      style.overflowY === "auto" ||
      style.overflowY === "scroll" ||
      style.overflowY === "overlay";

    if (canScrollY) return current;
    if (current === mobileScreen) break;

    current = current.parentElement;
  }

  return mobileScreen;
}

function getKeyboardHeight() {
  if (!window.visualViewport) return FALLBACK_KEYBOARD_HEIGHT;

  const viewportBottom = window.visualViewport.offsetTop + window.visualViewport.height;
  const keyboardHeight = Math.max(0, window.innerHeight - viewportBottom);

  return keyboardHeight > 0 ? keyboardHeight : FALLBACK_KEYBOARD_HEIGHT;
}

function isDepositNominalField(field: EditableField) {
  const text = [
    field.placeholder,
    field.getAttribute("aria-label"),
    field.name,
    field.id,
    field.parentElement?.textContent,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return text.includes("nominal setoran") || text.includes("masukkan nominal setoran");
}

function isImportantField(field: EditableField) {
  const text = [
    field.placeholder,
    field.getAttribute("aria-label"),
    field.name,
    field.id,
    field.parentElement?.textContent,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    isDepositNominalField(field) ||
    text.includes("nominal") ||
    text.includes("no. pelanggan") ||
    text.includes("no pelanggan") ||
    text.includes("nomor hp") ||
    text.includes("nomor handphone") ||
    text.includes("nomor rekening") ||
    text.includes("kata sandi") ||
    text.includes("pin")
  );
}

function scrollFieldIntoNativeKeyboardView(field: EditableField) {
  const mobileScreen = findMobileScreen(field);
  if (!mobileScreen) return;

  const scrollParent = findScrollableParent(field, mobileScreen);
  const keyboardHeight = getKeyboardHeight();
  const fieldRect = field.getBoundingClientRect();
  const screenRect = mobileScreen.getBoundingClientRect();

  const visualBottom = window.visualViewport
    ? window.visualViewport.offsetTop + window.visualViewport.height
    : screenRect.bottom - keyboardHeight;

  const safeBottom = visualBottom - EXTRA_BOTTOM_SPACE;
  const safeTop = screenRect.top + 16;

  let delta = 0;

  if (fieldRect.bottom > safeBottom) {
    delta = fieldRect.bottom - safeBottom;
  } else if (fieldRect.top < safeTop) {
    delta = fieldRect.top - safeTop;
  }

  if (Math.abs(delta) < 1) return;

  scrollParent.scrollBy({
    top: delta,
    behavior: "smooth",
  });
}

export default function NewMBankingNativeKeyboardAutoScroll() {
  const isMobile = useIsMobile();
  const activeFieldRef = React.useRef<EditableField | null>(null);
  const scrollParentStyleRef = React.useRef<ScrollParentStyle | null>(null);

  React.useEffect(() => {
    if (!isMobile) return;

    function restoreScrollParentStyle() {
      const saved = scrollParentStyleRef.current;
      if (!saved) return;

      saved.element.style.paddingBottom = saved.paddingBottom;
      saved.element.style.scrollPaddingBottom = saved.scrollPaddingBottom;
      saved.element.style.overscrollBehaviorY = saved.overscrollBehaviorY;
      saved.element.style.setProperty(
        "-webkit-overflow-scrolling",
        saved.webkitOverflowScrolling,
      );

      scrollParentStyleRef.current = null;
    }

    function applyScrollParentStyle(field: EditableField) {
      const mobileScreen = findMobileScreen(field);
      if (!mobileScreen) return;

      const scrollParent = findScrollableParent(field, mobileScreen);
      const keyboardHeight = getKeyboardHeight();

      if (scrollParentStyleRef.current?.element !== scrollParent) {
        restoreScrollParentStyle();

        scrollParentStyleRef.current = {
          element: scrollParent,
          paddingBottom: scrollParent.style.paddingBottom,
          scrollPaddingBottom: scrollParent.style.scrollPaddingBottom,
          overscrollBehaviorY: scrollParent.style.overscrollBehaviorY,
          webkitOverflowScrolling:
            scrollParent.style.getPropertyValue("-webkit-overflow-scrolling"),
        };
      }

      scrollParent.style.paddingBottom = `${keyboardHeight + EXTRA_BOTTOM_SPACE}px`;
      scrollParent.style.scrollPaddingBottom = `${keyboardHeight + EXTRA_BOTTOM_SPACE}px`;
      scrollParent.style.overscrollBehaviorY = "contain";
      scrollParent.style.setProperty("-webkit-overflow-scrolling", "touch");
    }

    function scheduleScroll(field: EditableField) {
      if (!isImportantField(field)) return;

      applyScrollParentStyle(field);

      window.setTimeout(() => scrollFieldIntoNativeKeyboardView(field), 80);
      window.setTimeout(() => scrollFieldIntoNativeKeyboardView(field), 280);
      window.setTimeout(() => scrollFieldIntoNativeKeyboardView(field), 520);
    }

    function handleFocusIn(event: FocusEvent) {
      const target = event.target as Element | null;

      if (!isEditableField(target)) return;
      if (!findMobileScreen(target)) return;

      activeFieldRef.current = target;
      target.setAttribute("data-native-keyboard-active", "true");
      scheduleScroll(target);
    }

    function handleFocusOut(event: FocusEvent) {
      const target = event.target as Element | null;

      if (isEditableField(target)) {
        target.removeAttribute("data-native-keyboard-active");
      }

      window.setTimeout(() => {
        if (document.activeElement && isEditableField(document.activeElement)) {
          return;
        }

        activeFieldRef.current = null;
        restoreScrollParentStyle();
      }, 180);
    }

    function handleViewportChange() {
      const activeField = activeFieldRef.current;
      if (!activeField) return;

      scheduleScroll(activeField);
    }

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    window.visualViewport?.addEventListener("resize", handleViewportChange);
    window.visualViewport?.addEventListener("scroll", handleViewportChange);
    window.addEventListener("resize", handleViewportChange);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      window.visualViewport?.removeEventListener("resize", handleViewportChange);
      window.visualViewport?.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      restoreScrollParentStyle();
    };
  }, [isMobile]);

  return null;
}