"use client";

import * as React from "react";
import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import MBankingLoginForm from "@/components/mobile/MBankingLoginForm";
import MBankingHome from "@/components/mobile/MBankingHome";

export default function MBankingMockup() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <MobileMockupFrame edgeToEdge>
      {loggedIn ? (
        <MBankingHome />
      ) : (
        <MBankingLoginForm onLogin={() => setLoggedIn(true)} />
      )}
    </MobileMockupFrame>
  );
}