// ... keep existing code

function makeBillingInfo({
  nama,
  alamat,
  skemaTagihan,
  satuanGracePeriod,
  durasiGracePeriod,
  totalPinjaman,
  sisaPokok,
}: {
  nama: string;
  alamat: string;
  skemaTagihan: string;
  satuanGracePeriod: string;
  durasiGracePeriod: string;
  totalPinjaman: string;
  sisaPokok: string;
}): LoanInfo {
  return {
    nama,
    alamat,
    produk: "Pinjaman Billing",
    isBilling: true,
    beforeFirstDividerItems: makeBillingBeforeDividerItems({
      skemaTagihan,
      satuanGracePeriod,
      durasiGracePeriod,
    }),
    afterFirstDividerItems: [
      { label: "Total Pinjaman", value: totalPinjaman },
      { label: "Sisa Pokok Pinjaman", value: sisaPokok },
      { label: "Pokok", value: "0" },
      { label: "Selisih Tanggal Transaksi", value: "0" },
      { label: "Bunga", value: "0" },
      { label: "Angsuran", value: "0" },
    ],
    afterSecondDividerItems: [],
    showMonthlyInterestArrears: true,
    monthlyInterestArrearsDefault: "0,00",
    monthlySettlementItems: [
      { label: "Total Bayar Bunga", value: "0,00" },
      { label: "Nominal Pelunasan", value: "0,00" },
    ],
  };
}

// ... keep existing code