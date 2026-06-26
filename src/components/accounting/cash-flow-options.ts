export type CashFlowOptionGroup = {
  title: string;
  items: string[];
};

export const cashFlowOptionGroups: CashFlowOptionGroup[] = [
  {
    title: "Penerimaan Arus Kas dari Aktivitas Operasi",
    items: [
      "Penerimaan Kas dari pelayanan pada anggota",
      "Penerimaan Kas dari penjualan non anggota",
    ],
  },
  {
    title: "Pengeluaran Arus Kas dari Aktivitas Operasi",
    items: [
      "Pembayaran barang/jasa kepada anggota",
      "Pembayaran barang/jasa kepada non anggota",
      "Biaya operasional dan administrasi",
      "Biaya bunga",
      "Pembayaran pos luar biasa",
    ],
  },
  {
    title: "Penerimaan Arus Kas dari Aktivitas Investasi",
    items: [
      "Penjualan surat berharga",
      "Penjualan investasi jangka panjang",
      "Penjualan properti Investasi",
      "Penjualan Aset Tetap",
    ],
  },
  {
    title: "Pengeluaran Arus Kas dari Aktivitas Investasi",
    items: [
      "Pembelian Surat Berharga",
      "Pembelian investasi jangka panjang",
      "Pembelian properti Investasi",
    ],
  },
];

export const cashFlowOptions = cashFlowOptionGroups.flatMap((group) => [
  group.title,
  ...group.items,
]);