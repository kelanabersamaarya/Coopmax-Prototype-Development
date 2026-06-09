"use client";

import * as React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function MobileAwareToaster() {
  const location = useLocation();
  const isMobilePrototype = location.pathname.startsWith("/mobile");

  React.useEffect(() => {
    if (!isMobilePrototype) return;

    toast.dismiss();

    const intervalId = window.setInterval(() => {
      toast.dismiss();
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [isMobilePrototype]);

  if (isMobilePrototype) return null;

  return (
    <Sonner
      position="top-right"
      offset={{ top: 20, right: 32, left: 16, bottom: 16 }}
    />
  );
}