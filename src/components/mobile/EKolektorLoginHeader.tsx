"use client";

const headerImageUrl =
  "dyad-media://media/Pinjaman%20Billing/.dyad/media/6815035a5c2bc615fa6de6ed6adc3c54a1490eaa8beb2863bbc05bd0298a4eaf.png";

export default function EKolektorLoginHeader() {
  return (
    <div className="relative h-[390px] shrink-0 overflow-hidden bg-[#0754c9]">
      <div className="relative z-20 h-[158px] overflow-hidden bg-[#0754c9] px-6 pt-4 text-white">
        <div className="flex h-5 items-center justify-between">
          <div className="text-[15px] font-bold leading-none tracking-tight">
            9:41
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[2px]">
              <span className="block h-[4px] w-[3px] rounded-full bg-white/80" />
              <span className="block h-[7px] w-[3px] rounded-full bg-white/85" />
              <span className="block h-[10px] w-[3px] rounded-full bg-white/90" />
              <span className="block h-[13px] w-[3px] rounded-full bg-white" />
            </div>

            <div className="h-[10px] w-[19px] rounded-[3px] border border-white/90 p-[1px]">
              <div className="h-full w-[13px] rounded-[2px] bg-white" />
            </div>
          </div>
        </div>

        <div className="relative mt-9 flex items-center gap-6">
          <div className="h-[82px] w-[82px] shrink-0 rounded-full bg-white shadow-sm" />

          <div className="min-w-0">
            <div className="text-[27px] font-extrabold leading-none tracking-tight text-white">
              E-Kolektor
            </div>
            <div className="mt-3 whitespace-nowrap text-[19px] font-bold leading-none tracking-tight text-white">
              Koperasi Bina Sejahtera
            </div>
          </div>
        </div>

        <div className="absolute -right-12 -top-10 h-[170px] w-[170px] rounded-full bg-white/10" />
        <div className="absolute -right-6 top-[46px] h-[110px] w-[150px] rotate-[-20deg] rounded-[70px] bg-white/14" />
      </div>

      <div className="absolute inset-x-0 top-[158px] z-10 h-[232px] overflow-hidden bg-[#a9bbb7]">
        <img
          src={headerImageUrl}
          alt="Ilustrasi header login E-Kolektor"
          className="h-full w-full scale-110 object-cover object-center opacity-80 blur-[1.4px]"
          draggable={false}
        />

        <div className="absolute inset-0 bg-[#d8e6df]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f2f2c]/25 via-[#d8e6df]/5 to-[#d9ebe1]/35" />
      </div>
    </div>
  );
}