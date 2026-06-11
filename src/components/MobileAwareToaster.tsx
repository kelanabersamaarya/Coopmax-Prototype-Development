"use client";

import * as React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function MobileAwareToaster() {
  const location = useLocation();
  const isMobilePrototype = location.pathname.startsWith("/mobile");
  const isObsArea =
    location.pathname.startsWith("/obs-samudra-harta") ||
    location.pathname.startsWith("/obs-web");

  const shouldHideToaster = isMobilePrototype || isObsArea;

  React.useEffect(() => {
    if (!shouldHideToaster) return;

    toast.dismiss();

    const intervalId = window.setInterval(() => {
      toast.dismiss();
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [shouldHideToaster]);

  if (shouldHideToaster) return null;

  return (
    <Sonner
      position="top-right"
      offset={{ top: 20, right: 32, left: 16, bottom: 16 }}
    />
  );
}