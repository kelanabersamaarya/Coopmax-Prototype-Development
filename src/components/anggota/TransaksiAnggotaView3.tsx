"use client";

import * as React from "react";
import TransaksiAnggotaView2 from "@/components/anggota/TransaksiAnggotaView2";

type Props = {
  nasabah: {
    id: string;
    nama: string;
    noIdentitas: string;
    alamat: string;
  };
};

export default function TransaksiAnggotaView3({ nasabah }: Props) {
  // NOTE: View3 saat ini me-reuse View2. Agar label skema tagihan bisa berbeda,
  // kita override value "Skema Tagihan" lewat prop tambahan.
  return (
    <TransaksiAnggotaView2
      nasabah={nasabah}
      skemaTagihanLabel="Tagihan Berdasarkan Sisa Angsuran"
    />
  );
}