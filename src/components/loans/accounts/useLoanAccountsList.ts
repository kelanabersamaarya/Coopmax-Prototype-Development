import * as React from "react";
import { loanAccountRowsSeed } from "./loan-account-mock";
import type { StatusFilter } from "./loan-account-types";

export function useLoanAccountsList() {
  const rows = React.useMemo(() => loanAccountRowsSeed, []);

  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  const [qNoRek, setQNoRek] = React.useState("");
  const [qTanggal, setQTanggal] = React.useState("");
  const [qProduk, setQProduk] = React.useState<string>("Semua");
  const [qIdNasabah, setQIdNasabah] = React.useState("");
  const [qNamaNasabah, setQNamaNasabah] = React.useState("");
  const [qNominal, setQNominal] = React.useState("0,00");
  const [qSisa, setQSisa] = React.useState("0,00");
  const [qBunga, setQBunga] = React.useState("");
  const [qStatus, setQStatus] = React.useState<StatusFilter>("Semua");

  const productOptions = React.useMemo(() => {
    const set = new Set<string>(rows.map((r) => r.produkPinjaman));
    return ["Semua", ...Array.from(set)];
  }, [rows]);

  const filtered = React.useMemo(() => {
    const noRekQ = qNoRek.trim().toLowerCase();
    const tanggalQ = qTanggal.trim().toLowerCase();
    const produkQ = qProduk;
    const idQ = qIdNasabah.trim().toLowerCase();
    const namaQ = qNamaNasabah.trim().toLowerCase();
    const bungaQ = qBunga.trim().toLowerCase();
    const statusQ = qStatus;

    return rows.filter((r) => {
      const okNoRek = noRekQ ? r.noRekening.toLowerCase().includes(noRekQ) : true;
      const okTanggal = tanggalQ
        ? r.tanggalDaftar.toLowerCase().includes(tanggalQ)
        : true;
      const okProduk = produkQ === "Semua" ? true : r.produkPinjaman === produkQ;
      const okId = idQ ? r.idNasabah.toLowerCase().includes(idQ) : true;
      const okNama = namaQ ? r.namaNasabah.toLowerCase().includes(namaQ) : true;
      const okBunga = bungaQ ? r.bungaPerTahun.toLowerCase().includes(bungaQ) : true;
      const okStatus = statusQ === "Semua" ? true : r.status === statusQ;

      const okNominal = true;
      const okSisa = true;

      return (
        okNoRek &&
        okTanggal &&
        okProduk &&
        okId &&
        okNama &&
        okNominal &&
        okSisa &&
        okBunga &&
        okStatus
      );
    });
  }, [
    qBunga,
    qIdNasabah,
    qNamaNasabah,
    qNoRek,
    qProduk,
    qStatus,
    qTanggal,
    qNominal,
    qSisa,
    rows,
  ]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [
    pageSize,
    qNoRek,
    qTanggal,
    qProduk,
    qIdNasabah,
    qNamaNasabah,
    qNominal,
    qSisa,
    qBunga,
    qStatus,
  ]);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  return {
    rows,
    pageSize,
    setPageSize,
    page,
    setPage,
    filters: {
      qNoRek,
      qTanggal,
      qProduk,
      qIdNasabah,
      qNamaNasabah,
      qNominal,
      qSisa,
      qBunga,
      qStatus,
    },
    filterHandlers: {
      setQNoRek,
      setQTanggal,
      setQProduk,
      setQIdNasabah,
      setQNamaNasabah,
      setQNominal,
      setQSisa,
      setQBunga,
      setQStatus,
    },
    productOptions,
    filtered,
    paged,
    pageCount,
    showingStart,
    showingEnd,
  };
}
