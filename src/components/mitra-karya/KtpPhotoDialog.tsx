import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function KtpPhotoDialog({
  open,
  onOpenChange,
  memberName,
  memberId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  memberId: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] max-w-[900px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <header className="flex items-center justify-between border-b border-slate-300 px-6 py-5">
          <h2 className="text-[20px] font-bold tracking-tight text-black">
            Foto KTP Anggota
          </h2>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] text-black transition hover:bg-slate-100"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-6 w-6" strokeWidth={3} />
          </button>
        </header>

        <main className="px-6 py-7">
          <div className="rounded-[5px] border border-slate-300 p-4">
            <div className="relative overflow-hidden rounded-[26px] border border-[#9dc8db] bg-[#b9e2f0] px-7 py-6 sm:px-9">
              <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:repeating-radial-gradient(ellipse_at_center,transparent_0,transparent_11px,#ffffff_12px,transparent_13px)]" />
              <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/50" />

              <div className="relative z-10">
                <div className="text-center text-[23px] font-extrabold leading-tight tracking-wide text-slate-950 sm:text-[28px]">
                  PROVINSI DKI JAKARTA
                  <br />
                  JAKARTA BARAT
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_190px]">
                  <div className="grid content-start gap-1.5 text-[13px] font-bold text-slate-800 sm:text-[16px]">
                    <div>NIK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 3171234567890123</div>
                    <div>Nama&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {memberName.toUpperCase()}</div>
                    <div>Tempat/Tgl Lahir&nbsp;&nbsp;: JAKARTA, 18-02-1986</div>
                    <div>Jenis Kelamin&nbsp;&nbsp;&nbsp;&nbsp;: PEREMPUAN&nbsp;&nbsp;&nbsp; Gol. Darah : B</div>
                    <div>Alamat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: JL. PASTI CEPAT A7/66</div>
                    <div className="pl-12">RT/RW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 007/008</div>
                    <div className="pl-12">Kel/Desa&nbsp;&nbsp;&nbsp;&nbsp;: PEGADUNGAN</div>
                    <div className="pl-12">Kecamatan&nbsp;&nbsp;&nbsp;: KALIDERES</div>
                    <div>Agama&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ISLAM</div>
                    <div>Status Perkawinan : KAWIN</div>
                    <div>Pekerjaan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: PEGAWAI SWASTA</div>
                    <div>Kewarganegaraan&nbsp;: WNI</div>
                    <div>Berlaku Hingga&nbsp;&nbsp;&nbsp;: SEUMUR HIDUP</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex h-[214px] w-[168px] items-center justify-center bg-[#bf4b43] p-3">
                      <div className="flex h-full w-full items-center justify-center bg-[#243447] text-center text-[42px] font-bold text-white/80">
                        {memberName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="mt-3 text-center text-[14px] font-extrabold text-slate-900">
                      JAKARTA BARAT
                      <br />
                      02-12-2012
                    </div>
                    <div className="mt-2 text-[22px] italic text-slate-700">4~b</div>
                  </div>
                </div>

                <div className="mt-5 text-[10px] font-semibold text-slate-600">
                  ID Anggota: {memberId}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="h-5 border-t border-slate-300" />
      </DialogContent>
    </Dialog>
  );
}