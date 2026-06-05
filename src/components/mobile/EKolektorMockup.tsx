"use client";

import * as React from "react";
import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import EKolektorHome from "@/components/mobile/EKolektorHome";
import EKolektorLoginForm from "@/components/mobile/EKolektorLoginForm";

export default function EKolektorMockup() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <MobileMockupFrame edgeToEdge>
      {loggedIn ? (
        <EKolektorHome onLogout={() => setLoggedIn(false)} />
      ) : (
        <EKolektorLoginForm onLogin={() => setLoggedIn(true)} />
      )}
    </MobileMockupFrame>
  );
}