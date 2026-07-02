export type NewMBankingOnboardingSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  accentColor: string;
};

export const newMBankingOnboardingSlides: NewMBankingOnboardingSlide[] = [
  {
    id: "secure",
    eyebrow: "Aman setiap saat",
    title: "Kelola keuangan dari genggaman",
    description:
      "Pantau saldo, riwayat transaksi, dan aktivitas rekening koperasi dengan tampilan yang lebih ringkas.",
    accentColor: "#0B63CE",
  },
  {
    id: "fast",
    eyebrow: "Transaksi cepat",
    title: "Bayar angsuran tanpa antre",
    description:
      "Akses informasi pinjaman dan lakukan pembayaran dari aplikasi kapan saja saat dibutuhkan.",
    accentColor: "#18B7A1",
  },
  {
    id: "ready",
    eyebrow: "Siap digunakan",
    title: "Masuk dan mulai bertransaksi",
    description:
      "Nikmati pengalaman mobile banking baru yang bersih, nyaman, dan tetap familiar untuk anggota.",
    accentColor: "#F59E0B",
  },
];