import type { PenaltyScheduleDraft } from "@/components/loans/PenaltyScheduleForm";
import { loanProductOptions } from "./loan-account-edit-options";

export type TabId = "general" | "agunan" | "penanggung" | "upload" | "jadwal";

export type LoanProductOption = (typeof loanProductOptions)[number];

export type PrefillSeed = {
  noRekening: string;
  tanggalDaftar: string;
  produkPinjaman: LoanProductOption;
  idNasabah: string;
  nik: string;
  nama: string;
  alamat: string;
  unitAnggota: string;
  kolektor: string;

  bungaPerTahun: string;
  metodeBunga: string;
  besarPinjaman: string;
  jangkaWaktu: string;

  jenisPerhitunganBunga: string;
  metodePerhitunganBunga: string;
  frekuensiBunga: string;
  periode: string;
  tanggalTagihanKe1: string;

  penaltyVisible: boolean;
  penaltyDraft: PenaltyScheduleDraft;
  penaltyRecurring: boolean;
};
