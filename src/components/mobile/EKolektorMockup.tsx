"use client";

import * as React from "react";
import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import EKolektorHome from "@/components/mobile/EKolektorHome";
import EKolektorLoginForm from "@/components/mobile/EKolektorLoginForm";
import EKolektorTransactions from "@/components/mobile/EKolektorTransactions";

type EKolektorScreen = "home" | "transactions";

export default function EKolektorMockup() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [screen, setScreen] = React.useState<EKolektorScreen>("home");

  if (!loggedIn) {
    return (
      <MobileMockupFrame edgeToEdge>
        <EKolektorLoginForm
          onLogin={() => {
            setLoggedIn(true);
            setScreen("home");
          }}
        />
      </MobileMockupFrame>
    );
  }

  return (
    <MobileMockupFrame edgeToEdge>
      {screen === "transactions" ? (
        <EKolektorTransactions onBackHome={() => setScreen("home")} />
      ) : (
        <EKolektorHome
          onLogout={() => {
            setLoggedIn(false);
            setScreen("home");
          }}
          onOpenTransactions={() => setScreen("transactions")}
        />
      )}
    </MobileMockupFrame>
  );
}