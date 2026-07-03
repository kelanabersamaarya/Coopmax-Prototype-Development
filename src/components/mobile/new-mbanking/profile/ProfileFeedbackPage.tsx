import * as React from "react";
import { Check, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

export default function ProfileFeedbackPage({ onBack }: { onBack: () => void }) {
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <ProfileSubPageShell title="Kritik dan Saran" onBack={onBack}>
      <div className="rounded-[22px] bg-[#F8FAFC] p-4 ring-1 ring-[#EEF0F4]">
        <div className="flex items-start gap-3">
          <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
            <MessageSquareText className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </span>
          <div className="min-w-0">
            <div className="text-[16px] font-bold leading-tight text-black">
              Bantu kami menjadi lebih baik
            </div>
            <p className="mt-2 text-[13px] font-normal leading-relaxed text-[#6B7280]">
              Tulis kritik, saran, atau kendala yang Anda alami saat menggunakan aplikasi.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[22px] grid gap-[10px]">
        <label className="text-[14px] font-bold leading-tight text-black">
          Pesan
        </label>
        <textarea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Tulis kritik dan saran Anda..."
          className={cn(
            "min-h-[160px] w-full resize-none rounded-[14px] border border-[#CDD4E0] bg-white px-4 py-3",
            "text-[14px] font-normal text-black outline-none",
            "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
            "focus:border-[#479DF4]",
          )}
        />
      </div>

      {submitted ? (
        <div className="mt-[14px] flex items-center gap-2 rounded-[14px] bg-[#EAF8EF] px-4 py-3 text-[13px] font-semibold text-[#15965A]">
          <Check className="h-4 w-4" strokeWidth={3} />
          Terima kasih, masukan Anda sudah diterima.
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => {
          if (!message.trim()) return;
          setSubmitted(true);
          setMessage("");
        }}
        className={cn(
          "mt-[24px] h-[52px] w-full rounded-[8px]",
          "bg-[#479DF4] text-[14px] font-semibold leading-none text-white",
          "transition active:scale-[0.98]",
          !message.trim() ? "cursor-not-allowed opacity-60" : "",
        )}
        disabled={!message.trim()}
      >
        Kirim
      </button>
    </ProfileSubPageShell>
  );
}