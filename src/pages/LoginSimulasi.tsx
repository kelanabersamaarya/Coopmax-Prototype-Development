import * as React from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";

function CoopmaxLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <img
        src="/publiccoopmax-logo.png.png"
        alt="Logo Coopmax"
        className="h-[48px] w-[58px] object-contain"
      />
      <span className="text-[39px] font-bold leading-none tracking-[-2px] text-[#3487f2]">
        Coop<span className="font-normal text-[#f02bbd]">max</span>
      </span>
    </div>
  );
}

export default function LoginSimulasi() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showAccessNotice, setShowAccessNotice] = React.useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8 font-sans">
      <div className="w-full max-w-[440px] border border-[#ccd5e4] bg-white px-[38px] pb-8 pt-12 sm:px-[38px]">
        <CoopmaxLogo />

        <h1 className="mt-8 text-center text-[30px] font-extrabold tracking-[-1.5px] text-[#3262f2]">
          Demo Koperasi
        </h1>

        <div className="mt-8 text-center text-[#001d58]">
          <h2 className="text-[27px] font-normal leading-tight">Selamat Datang</h2>
          <p className="mt-2 text-[19px] font-semibold">Masuk untuk melanjutkan</p>
        </div>

        {showAccessNotice ? (
          <div className="mt-4 rounded-[3px] border border-solid border-red-500 bg-red-100/70 px-3 py-2.5 text-left text-red-700">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <p className="text-[13px] font-bold">Akses Dibatasi Sementara</p>
            </div>
            <p className="mt-1 text-[12px] leading-[1.45]">
              Mohon maaf, sistem hanya dapat diakses pada jam operasional, yaitu pukul 08.00–17.00. Silakan masuk kembali pada jam operasional.
            </p>
          </div>
        ) : null}

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
            onClick={() => setShowAccessNotice(true)}
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
