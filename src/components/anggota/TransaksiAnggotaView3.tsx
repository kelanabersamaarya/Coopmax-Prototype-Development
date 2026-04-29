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
  return (
    <TransaksiAnggotaView2
      nasabah={nasabah}
      skemaTagihanLabel="Tagihan Dihitung dari Sisa Saldo Pokok"
    />
  );
}