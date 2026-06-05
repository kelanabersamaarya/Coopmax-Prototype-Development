"use client";

export default function EKolektorHomeHeader() {
  return (
    <div className="bg-white px-5 pb-7 pt-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 pt-5">
          <div className="text-[12px] font-normal leading-none tracking-tight text-[#7f7f7f]">
            Selamat Sore,
          </div>
          <div className="mt-2 max-w-[285px] text-[14px] font-extrabold leading-tight tracking-tight text-[#111d4a]">
            I Ketut Agus Pasek Jaya Arta
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center">
          <div className="grid h-[40px] w-[40px] place-items-center rounded-full bg-[#27b4df] text-[20px] font-extrabold leading-none text-white">
            I
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-[10px] w-[10px] rounded-full bg-[#39b54a]" />
            <span className="text-[12px] font-extrabold leading-none tracking-tight text-[#39b54a]">
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}