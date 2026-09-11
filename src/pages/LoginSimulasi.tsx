import { LogIn } from "lucide-react";

export default function LoginSimulasi() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))] p-4 md:p-8">
      <div className="rounded-[5px] bg-white p-6 shadow-sm ring-1 ring-[#E4E9F2] md:p-8">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#4169f5] text-white">
            <LogIn className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-[25px] font-extrabold leading-tight tracking-tight text-[#002060]">
              Simulasi Login
            </h1>
            <p className="mt-1 text-[13px] text-slate-500">
              Halaman simulasi login untuk kebutuhan pengujian aplikasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
