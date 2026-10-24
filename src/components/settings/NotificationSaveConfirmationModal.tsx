import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function NotificationSaveConfirmationModal({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const confirmSave = () => {
    onConfirm();
    setSuccessOpen(true);
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-labelledby="notification-save-confirmation-title"
        onCancel={onCancel}
        className="m-auto w-[calc(100vw-14px)] max-w-[528px] rounded-[5px] border-0 bg-white p-0 text-center shadow-2xl backdrop:bg-black/40"
      >
        <div className="px-4 pb-[17px] pt-[40px] sm:px-6">
          <svg aria-hidden="true" viewBox="0 0 92 92" className="mx-auto h-[92px] w-[92px]">
            <circle cx="46" cy="46" r="44" fill="none" stroke="#f8c9a4" strokeWidth="4" />
            <path d="M46 23v30M46 66v1" fill="none" stroke="#f8b37d" strokeLinecap="round" strokeWidth="6" />
          </svg>
          <h2 id="notification-save-confirmation-title" className="mt-[31px] text-[30px] font-bold leading-[36px] text-[#526070]">Yakin untuk menyimpan data ?</h2>
          <div className="mx-auto mt-[29px] flex w-fit items-center gap-2">
            <button type="button" autoFocus onClick={confirmSave} className="h-[48px] w-[104px] rounded-[5px] bg-[#398fd6] text-[16px] font-semibold text-white ring-2 ring-[#b5d4ec] ring-offset-2 hover:bg-[#2f7fbd]">Yes</button>
            <button type="button" onClick={onCancel} className="h-[48px] w-[126px] rounded-[5px] bg-[#ababab] text-[16px] font-semibold text-white hover:bg-[#969696]">Cancel</button>
          </div>
        </div>
      </dialog>

      {successOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div role="dialog" aria-modal="true" aria-labelledby="save-success-title" className="w-[calc(100vw-14px)] max-w-[528px] rounded-[5px] bg-white px-4 pb-[17px] pt-[40px] text-center shadow-2xl sm:px-6">
            <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#dff2d5] text-[#9bd77e]"><Check className="h-[58px] w-[58px]" strokeWidth={2.5} /></div>
            <h2 id="save-success-title" className="mt-[31px] text-[30px] font-bold leading-[36px] text-[#5b5b5b]">Berhasil {"menambahkan data"}</h2>
            <button type="button" autoFocus onClick={() => { setSuccessOpen(false); window.dispatchEvent(new CustomEvent("jadwal-bunga-save-success")); }} className="mt-[29px] h-[48px] w-[104px] rounded-[5px] bg-[#398fd6] text-[16px] font-semibold text-white ring-2 ring-[#b5d4ec] ring-offset-2 hover:bg-[#2f7fbd]">OK</button>
          </div>
        </div>
      )}
    </>
  );
}
