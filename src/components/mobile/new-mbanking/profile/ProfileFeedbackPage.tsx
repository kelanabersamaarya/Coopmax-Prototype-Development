import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";

export default function ProfileFeedbackPage({ onBack }: { onBack: () => void }) {
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <ProfileSubPageShell
      title="Kritik dan Saran"
      onBack={onBack}
      className="flex min-h-full flex-col"
    >
      <div className="grid gap-[10px]">
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
            "min-h-[180px] w-full resize-none rounded-[14px] border border-[#CDD4E0] bg-white px-4 py-3",
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

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => {
            if (!message.trim()) return;
            setSubmitted(true);
            setMessage("");
          }}
          className={cn(
            "h-[52px] w-full rounded-[8px]",
            "bg-[#479DF4] text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
            !message.trim() ? "cursor-not-allowed opacity-60" : "",
          )}
          disabled={!message.trim()}
        >
          Kirim
        </button>
      </div>
    </ProfileSubPageShell>
  );
}