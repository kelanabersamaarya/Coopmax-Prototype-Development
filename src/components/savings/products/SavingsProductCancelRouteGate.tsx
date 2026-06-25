"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function SavingsProductCancelRouteGate({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  const navigate = useNavigate();

  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement | null;
    const button = target?.closest("button") as HTMLButtonElement | null;

    if (!button || button.disabled) return;

    const label = (button.textContent ?? "").trim().toLowerCase();
    const isCancelButton = label.includes("batal");

    if (!isCancelButton) return;

    event.preventDefault();
    event.stopPropagation();

    navigate(to);
  }

  return <div onClickCapture={handleClickCapture}>{children}</div>;
}