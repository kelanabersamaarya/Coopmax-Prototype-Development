"use client";

import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePrivacyPolicyIntroSection({
  className,
}: {
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[22px] bg-white p-5 ring-1 ring-[#EEF0F4]",
        "shadow-[0_8px_22px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      <div className="flex flex-col items-center text-center">
        <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[#15965A] text-white">
          <ShieldCheck className="h-[26px] w-[26px]" strokeWidth={2.6} />
        </span>

        <h2 className="mt-4 text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
          KEBIJAKAN PRIVASI
        </h2>

        <div className="mt-1 text-[12px] font-semibold leading-tight text-[#479DF4]">
          Berlaku sejak 1 April 2024
        </div>
      </div>

      <div className="mt-5 grid gap-4 text-[13px] font-normal leading-relaxed text-[#4B5563]">
        <p>
          Kebijakan privasi ini ("Kebijakan") mengatur bagaimana kami, danarahayu
          dan/atau afiliasi kami yang terkait ("Kami") mengumpulkan dan memproses
          data Anda dalam Layanan kami (sebagaimana didefinisikan di bawah ini).
          Kami sangat berkomitmen untuk melindungi dan mengamankan Data Pribadi
          Anda (sebagaimana didefinisikan di bawah ini). Kami bertanggung jawab
          untuk menjunjung tinggi prinsip-prinsip pengelolaan data dengan penuh
          integritas, sehingga keamanan Data Pribadi Anda adalah prioritas utama
          kami. Kebijakan ini berlaku untuk seluruh pengguna Layanan yang
          mengakses melalui situs web, aplikasi mobile, dan platform lainnya yang
          Kami kelola (secara bersama-sama disebut sebagai "Platform") termasuk
          pihak manapun yang bekerja sama dengan Kami, kecuali diatur dalam
          kebijakan privasi yang terpisah.
        </p>

        <p>
          Kami mengembangkan berbagai layanan yang akan membantu Anda dalam
          pekerjaan yang berkaitan dengan bidang-bidang yang termasuk namun tidak
          terbatas pada manajemen keuangan & pelaporan, manajemen hubungan
          pelanggan, produk digital, analisis data, dan kemungkinan bidang-bidang
          lainnya di masa depan. Layanan kami termasuk namun tidak terbatas pada
          Aplikasi Core, Aplikasi Mobile Banking (M-Banking), Aplikasi E-Collector
          (selanjutnya disebut "Layanan").
        </p>

        <p>
          Dengan menggunakan Layanan, Anda mengakui bahwa Anda telah menyetujui
          dan terikat dengan ketentuan-ketentuan yang tercantum dalam Kebijakan
          ini. Oleh karena itu, Kami mengharapkan Anda untuk membaca kebijakan ini
          untuk memastikan bahwa Anda memahami bagaimana Kami menangani Data
          Pribadi Anda.
        </p>
      </div>
    </section>
  );
}