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

type CtaStyle = {
  element: HTMLElement;
  transform: string;
  transition: string;
  willChange: string;
  zIndex: string;
};

const EXTRA_BOTTOM_SPACE = 42;
const FALLBACK_KEYBOARD_HEIGHT = 320;
const CTA_KEYBOARD_GAP = 10;

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

  const viewportBottom =
    window.visualViewport.offsetTop + window.visualViewport.height;
  const keyboardHeight = Math.max(0, window.innerHeight - viewportBottom);

  return keyboardHeight > 0 ? keyboardHeight : FALLBACK_KEYBOARD_HEIGHT;
}

function getFieldContextText(field: EditableField) {
  return [
    field.placeholder,
    field.getAttribute("aria-label"),
    field.name,
    field.id,
    field.parentElement?.textContent,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function isDepositNominalField(field: EditableField) {
  const text = getFieldContextText(field);

  return (
    text.includes("nominal setoran") ||
    text.includes("masukkan nominal setoran")
  );
}

function isImportantField(field: EditableField) {
  const text = getFieldContextText(field);

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

function isElementVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return element.getClientRects().length > 0 && rect.width > 0 && rect.height > 0;
}

function findScopedRoot(field: EditableField, mobileScreen: HTMLElement) {
  return (
    (field.closest(
      [
        '[data-new-mbanking-register-page="true"]',
        '[data-new-mbanking-login-detail-page="true"]',
        '[data-profile-credential-change-page="true"]',
        '[data-payment-customer-page="true"]',
        '[data-payment-bill-review-page="true"]',
        '[data-new-mbanking-purchase-input-page="true"]',
        '[data-transfer-input-page="true"]',
      ].join(","),
    ) as HTMLElement | null) ?? mobileScreen
  );
}

function isLikelyBottomCta(element: HTMLElement) {
  if (!isElementVisible(element)) return false;
  if (!element.querySelector("button")) return false;
  if (element.closest('[data-numeric-keyboard="true"]')) return false;

  const className = String(element.className ?? "");
  const hasBottomPosition =
    className.includes("bottom-0") ||
    className.includes("bottom-[") ||
    element.dataset.profileSubmitCta === "true";

  const hasFloatingPosition =
    className.includes("absolute") || className.includes("sticky");

  const looksLikeFooter =
    className.includes("bg-white") ||
    element.dataset.profileSubmitCta === "true";

  return hasBottomPosition && hasFloatingPosition && looksLikeFooter;
}

function findBottomCtaContainer(field: EditableField, mobileScreen: HTMLElement) {
  const root = findScopedRoot(field, mobileScreen);
  const candidates = Array.from(
    root.querySelectorAll<HTMLElement>('[data-profile-submit-cta="true"], div, footer, section'),
  ).filter(isLikelyBottomCta);

  if (candidates.length === 0) return null;

  return candidates.sort(
    (a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top,
  )[0];
}

function getReservedBottomForCta(field: EditableField, mobileScreen: HTMLElement) {
  const cta = findBottomCtaContainer(field, mobileScreen);
  if (!cta) return 0;

  return cta.getBoundingClientRect().height + CTA_KEYBOARD_GAP + 12;
}

function scrollFieldIntoNativeKeyboardView(field: EditableField) {
  const mobileScreen = findMobileScreen(field);
  if (!mobileScreen) return;

  const scrollParent = findScrollableParent(field, mobileScreen);
  const keyboardHeight = getKeyboardHeight();
  const fieldRect = field.getBoundingClientRect();
  const screenRect = mobileScreen.getBoundingClientRect();
  const ctaReservedBottom = getReservedBottomForCta(field, mobileScreen);

  const visualBottom = window.visualViewport
    ? window.visualViewport.offsetTop + window.visualViewport.height
    : screenRect.bottom - keyboardHeight;

  const safeBottom = visualBottom - EXTRA_BOTTOM_SPACE - ctaReservedBottom;
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
  const ctaStyleRef = React.useRef<CtaStyle | null>(null);

  React.useEffect(() => {
    if (!isMobile) return;

    function restoreBottomCtaStyle() {
      const saved = ctaStyleRef.current;
      if (!saved) return;

      saved.element.style.transform = saved.transform;
      saved.element.style.transition = saved.transition;
      saved.element.style.willChange = saved.willChange;
      saved.element.style.zIndex = saved.zIndex;

      ctaStyleRef.current = null;
    }

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

    function applyBottomCtaPosition(field: EditableField) {
      const mobileScreen = findMobileScreen(field);
      if (!mobileScreen) return;

      const cta = findBottomCtaContainer(field, mobileScreen);
      if (!cta) {
        restoreBottomCtaStyle();
        return;
      }

      const keyboardHeight = getKeyboardHeight();

      if (ctaStyleRef.current?.element !== cta) {
        restoreBottomCtaStyle();

        ctaStyleRef.current = {
          element: cta,
          transform: cta.style.transform,
          transition: cta.style.transition,
          willChange: cta.style.willChange,
          zIndex: cta.style.zIndex,
        };
      }

      cta.style.transform = `translateY(-${keyboardHeight + CTA_KEYBOARD_GAP}px)`;
      cta.style.transition = "transform 180ms ease-out";
      cta.style.willChange = "transform";
      cta.style.zIndex = "180";
    }

    function applyScrollParentStyle(field: EditableField) {
      const mobileScreen = findMobileScreen(field);
      if (!mobileScreen) return;

      const scrollParent = findScrollableParent(field, mobileScreen);
      const keyboardHeight = getKeyboardHeight();
      const ctaReservedBottom = getReservedBottomForCta(field, mobileScreen);

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

      const bottomSpace = keyboardHeight + ctaReservedBottom + EXTRA_BOTTOM_SPACE;

      scrollParent.style.paddingBottom = `${bottomSpace}px`;
      scrollParent.style.scrollPaddingBottom = `${bottomSpace}px`;
      scrollParent.style.overscrollBehaviorY = "contain";
      scrollParent.style.setProperty("-webkit-overflow-scrolling", "touch");
    }

    function scheduleScroll(field: EditableField) {
      if (!isImportantField(field)) return;

      applyBottomCtaPosition(field);
      applyScrollParentStyle(field);

      window.setTimeout(() => {
        applyBottomCtaPosition(field);
        applyScrollParentStyle(field);
        scrollFieldIntoNativeKeyboardView(field);
      }, 80);

      window.setTimeout(() => {
        applyBottomCtaPosition(field);
        applyScrollParentStyle(field);
        scrollFieldIntoNativeKeyboardView(field);
      }, 280);

      window.setTimeout(() => {
        applyBottomCtaPosition(field);
        applyScrollParentStyle(field);
        scrollFieldIntoNativeKeyboardView(field);
      }, 520);
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
        restoreBottomCtaStyle();
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
      restoreBottomCtaStyle();
      restoreScrollParentStyle();
    };
  }, [isMobile]);

  return null;
}