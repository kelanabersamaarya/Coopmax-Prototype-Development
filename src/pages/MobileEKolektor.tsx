import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import eKolektorLogin from "@/assets/mobile/e-kolektor/login.svg";

const eKolektorScreenshots = [
  {
    src: eKolektorLogin,
    alt: "Halaman login E-Kolektor",
  },
];

export default function MobileEKolektor() {
  return (
    <div className="h-full min-h-0 overflow-hidden bg-[hsl(var(--app-bg))]">
      <div className="h-full min-h-0 w-full overflow-hidden px-2 py-0 md:px-3">
        <MobileMockupFrame screenshots={eKolektorScreenshots} edgeToEdge />
      </div>
    </div>
  );
}