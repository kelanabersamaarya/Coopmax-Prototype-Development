import * as React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NeracaSaldoReport() {
  const [period, setPeriod] = React.useState("Perbulan");
  const [date, setDate] = React.useState("2026-09-10");
  const [reportType, setReportType] = React.useState("Laporan Terperinci");
  const [isReportVisible, setIsReportVisible] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-[10px] bg-white text-[#08265a]">
      <div className="p-1 md:p-0">
        <h1 className="text-[21px] font-bold">
          Laporan <span className="font-normal">Neraca Saldo</span>
        </h1>

        <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          <label className="w-full text-[13px] md:max-w-[245px]">
            Periode
            <div className="relative mt-1.5">
              <select
                value={period}
                onChange={(event) => {
                  setPeriod(event.target.value);
                  setIsReportVisible(false);
                }}
                className="h-[31px] w-full appearance-none rounded-[5px] border border-[#c8d3e5] bg-white px-3 text-[13px] outline-none focus:ring-2 focus:ring-violet-200"
              >
                <option>Perbulan</option>
                <option>Harian</option>
                <option>Per tahun</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-slate-500" />
            </div>
          </label>

          <label className="w-full text-[13px] md:max-w-[245px]">
            Tanggal Laporan
            <div className="mt-1.5 flex h-[31px] overflow-hidden rounded-[5px] border border-[#c8d3e5]">
              <span className="inline-flex w-12 items-center justify-center bg-slate-100 text-slate-400">
                <CalendarDays className="h-5 w-5" />
              </span>
              <Input
                type="date"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  setIsReportVisible(false);
                }}
                className="date-report-input h-full rounded-none border-0 text-[13px] shadow-none focus-visible:ring-0"
              />
            </div>
          </label>

          <label className="w-full text-[13px] md:max-w-[245px]">
            Jenis Laporan
            <div className="relative mt-1.5">
              <select
                value={reportType}
                onChange={(event) => {
                  setReportType(event.target.value);
                  setIsReportVisible(false);
                }}
                className="h-[31px] w-full appearance-none rounded-[5px] border border-[#c8d3e5] bg-white px-3 text-[13px] outline-none focus:ring-2 focus:ring-violet-200"
              >
                <option>Laporan Terperinci</option>
                <option>Laporan Rekap</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-slate-500" />
            </div>
          </label>
        </div>

        <Button
          type="button"
          onClick={() => setIsReportVisible(true)}
          className="mt-2 h-[31px] rounded-[6px] bg-violet-600 px-3 text-[12px] hover:bg-violet-700"
        >
          Tampilkan Laporan
        </Button>
      </div>

      {isReportVisible ? (
        <div className="mt-6 rounded-[6px] border border-dashed border-[#c8d3e5] bg-slate-50 p-5 text-center text-sm text-slate-600">
          Laporan {reportType.toLowerCase()} Neraca Saldo akan ditampilkan di area ini.
        </div>
      ) : null}
    </div>
  );
}
