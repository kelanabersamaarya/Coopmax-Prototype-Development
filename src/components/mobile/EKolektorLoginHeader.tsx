"use client";

const headerImageUrl =
  "dyad-media://media/Pinjaman%20Billing/.dyad/media/6815035a5c2bc615fa6de6ed6adc3c54a1490eaa8beb2863bbc05bd0298a4eaf.png";

export default function EKolektorLoginHeader() {
  return (
    <div className="relative h-[390px] shrink-0 overflow-hidden bg-[#2db0d3]">
      <img
        src={headerImageUrl}
        alt="Ilustrasi header login E-Kolektor"
        className="h-full w-full object-cover object-center"
        draggable={false}
      />
    </div>
  );
}