"use client";

import { Lang } from "@/lib/i18n";

type Props = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

export default function LanguageSwitcher({ lang, onChange }: Props) {
  const languages: Lang[] = ["fa", "tr", "en"];

  return (
    <div className="flex gap-2">
      {languages.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            lang === item
              ? "bg-[#1b3558] text-white"
              : "bg-white/70 text-[#1b3558] border border-[#d9c4a1]"
          }`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
