"use client";

export default function EKolektorSimpananAsset() {
  return (
    <div className="mt-[18px] overflow-hidden rounded-[12px] bg-slate-100">
      <svg
        viewBox="0 0 640 360"
        className="block h-auto w-full"
        role="img"
        aria-label="Aset tab Simpanan"
      >
        <defs>
          <linearGradient id="floor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d5dae2" />
            <stop offset="45%" stopColor="#aeb7c4" />
            <stop offset="100%" stopColor="#7f8a99" />
          </linearGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#748299" />
            <stop offset="55%" stopColor="#42506a" />
            <stop offset="100%" stopColor="#26324a" />
          </linearGradient>
          <linearGradient id="step" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8ced8" />
            <stop offset="100%" stopColor="#8d97a6" />
          </linearGradient>
        </defs>

        <rect width="640" height="360" fill="url(#floor)" />

        <path d="M0 192 L318 110 L640 180 L640 360 L0 360 Z" fill="#aab2bf" opacity="0.72" />
        <path d="M0 242 L342 150 L640 214 L640 360 L0 360 Z" fill="#8792a2" opacity="0.82" />

        <g opacity="0.92">
          <path d="M-80 105 L360 0 L720 120 L260 240 Z" fill="url(#metal)" />
          <path d="M-80 105 L360 0 L720 120 L260 240 Z" fill="none" stroke="#cbd5e1" strokeWidth="2" />

          {Array.from({ length: 14 }).map((_, index) => {
            const x = -45 + index * 54;
            return (
              <path
                key={`left-grid-a-${index}`}
                d={`M${x} 113 L${x + 405} 8`}
                stroke="#cbd5e1"
                strokeWidth="2"
                opacity="0.88"
              />
            );
          })}

          {Array.from({ length: 11 }).map((_, index) => {
            const x = -40 + index * 62;
            return (
              <path
                key={`left-grid-b-${index}`}
                d={`M${x} 116 L${x + 345} 226`}
                stroke="#dbe4ef"
                strokeWidth="2"
                opacity="0.86"
              />
            );
          })}
        </g>

        <g opacity="0.95">
          <path d="M470 22 L700 0 L700 210 L435 236 Z" fill="url(#metal)" />
          <path d="M470 22 L700 0 L700 210 L435 236 Z" fill="none" stroke="#cbd5e1" strokeWidth="2" />

          {Array.from({ length: 8 }).map((_, index) => {
            const x = 478 + index * 31;
            return (
              <path
                key={`right-grid-a-${index}`}
                d={`M${x} 24 L${x - 40} 236`}
                stroke="#dbe4ef"
                strokeWidth="2"
                opacity="0.82"
              />
            );
          })}

          {Array.from({ length: 9 }).map((_, index) => {
            const y = 20 + index * 24;
            return (
              <path
                key={`right-grid-b-${index}`}
                d={`M470 ${y} L700 ${y - 18}`}
                stroke="#cbd5e1"
                strokeWidth="2"
                opacity="0.82"
              />
            );
          })}
        </g>

        <path d="M226 198 L420 145 L580 182 L380 252 Z" fill="url(#step)" opacity="0.88" />
        <path d="M268 250 L460 188 L640 224 L430 304 Z" fill="#778393" opacity="0.68" />

        <g opacity="0.9">
          <path d="M526 58 C548 72 562 98 560 132 L640 160 L640 360 L486 360 C454 320 445 265 462 220 C478 181 507 160 525 136 C540 114 534 86 526 58 Z" fill="#111827" />
          <path d="M558 0 C574 18 584 52 579 85 C574 112 558 132 540 150 L636 184 L640 0 Z" fill="#0f172a" opacity="0.92" />
          <path d="M574 92 C588 94 598 98 604 106 C593 112 579 111 566 105 Z" fill="#f3f4f6" opacity="0.92" />
        </g>

        <rect x="0" y="0" width="640" height="360" fill="#ffffff" opacity="0.08" />
      </svg>
    </div>
  );
}