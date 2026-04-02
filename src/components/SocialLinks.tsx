import { MessageCircle, Camera } from "lucide-react";

type Props = {
  whatsappUrl: string;
  instagramUrl: string;
  whatsappLabel: string;
  instagramLabel: string;
};

export default function SocialLinks({
  whatsappUrl,
  instagramUrl,
  whatsappLabel,
  instagramLabel,
}: Props) {
  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl bg-[#1b3558] px-5 py-3 text-white shadow-md transition hover:opacity-90"
      >
        <MessageCircle size={18} />
        {whatsappLabel}
      </a>

      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl border border-[#d9c4a1] bg-white px-5 py-3 text-[#1b3558] shadow-md transition hover:bg-[#f9f6f2]"
      >
        <Camera size={18} />
        {instagramLabel}
      </a>
    </div>
  );
}