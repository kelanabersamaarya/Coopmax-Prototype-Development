import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

function CoopmaxLogo() {
  return (
    <div className="flex items-center justify-center">
      <img
        src="/publiccoopmax-logo.png.png"
        alt="Coopmax"
        className="h-auto w-[105px] object-contain"
      />
    </div>
  );
}

export default function LoginSimulasi() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8 font-sans">
      <div className="w-full max-w-[440px] border border-[#ccd5e4] bg-white px-[38px] pb-8 pt-12 sm:px-[38px]">
        <div className="mt-2 flex items-center justify-center gap-3">
          <CoopmaxLogo />
          <h1 className="text-[26px] font-extrabold tracking-[-1.5px] text-[#3262f2]">
            Demo Koperasi
          </h1>
        </div>

        <div className="mt-14 text-center text-[#001d58]">
          <h2 className="text-[27px] font-normal leading-tight">Selamat Datang</h2>
          <p className="mt-2 text-[19px] font-semibold">Masuk untuk melanjutkan</p>
        </div>

        <form
          className="mt-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block text-[14px] text-[#7688aa]" htmlFor="username">
            Nama Pengguna
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Masukan Nama Pengguna"
            className="mt-1 h-[33px] w-full border border-[#bdc9db] px-2.5 text-[14px] text-[#001d58] outline-none placeholder:text-[#9caac0] focus:border-[#3262f2]"
          />

          <label className="mt-2 block text-[14px] text-[#7688aa]" htmlFor="password">
            Kata Sandi
          </label>
          <div className="mt-1 flex h-[34px] border border-[#bdc9db] focus-within:border-[#3262f2]">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukan Kata Sandi"
              className="min-w-0 flex-1 px-2.5 text-[14px] text-[#001d58] outline-none placeholder:text-[#9caac0]"
            />
            <button
              type="button"
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              onClick={() => setShowPassword((value) => !value)}
              className="flex w-[46px] items-center justify-center border-l border-[#bdc9db] bg-[#e3e8f0] text-[#58708f]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <button
            type="submit"
            className="mt-7 h-[34px] w-full rounded-[3px] bg-[#3262f2] text-[14px] font-semibold text-white transition hover:bg-[#2852d7]"
          >
            Masuk
          </button>
        </form>

        <p className="mt-11 text-center text-[19px] font-bold text-[#7185a6]">
          PT. Solusi Anak Sakti
        </p>
      </div>
    </div>
  );
}
