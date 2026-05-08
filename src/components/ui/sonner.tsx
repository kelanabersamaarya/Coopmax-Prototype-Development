import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

type SonnerOffset =
  | number
  | {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };

function normalizeOffset(offset: SonnerOffset | undefined) {
  if (typeof offset === "number") {
    return { top: offset, right: offset, bottom: offset, left: offset };
  }
  return offset ?? {};
}

const DEFAULT_INSET = 16;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const position = props.position ?? "bottom-right";
  const offset = normalizeOffset(props.offset as SonnerOffset | undefined);

  const forcedInsetStyle: React.CSSProperties = (() => {
    // Only force inset for corner positions to avoid “nempel”.
    // Sonner uses fixed positioning; this ensures consistent gaps.
    switch (position) {
      case "top-right":
        return {
          top: offset.top ?? DEFAULT_INSET,
          right: offset.right ?? DEFAULT_INSET,
        };
      case "top-left":
        return {
          top: offset.top ?? DEFAULT_INSET,
          left: offset.left ?? DEFAULT_INSET,
        };
      case "bottom-right":
        return {
          bottom: offset.bottom ?? DEFAULT_INSET,
          right: offset.right ?? DEFAULT_INSET,
        };
      case "bottom-left":
        return {
          bottom: offset.bottom ?? DEFAULT_INSET,
          left: offset.left ?? DEFAULT_INSET,
        };
      default:
        return {};
    }
  })();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={{ ...(props.style ?? {}), ...forcedInsetStyle }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };