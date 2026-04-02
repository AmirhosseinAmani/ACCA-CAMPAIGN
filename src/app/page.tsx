"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import VisitorCounter from "@/components/VisitorCounter";
import SocialLinks from "@/components/SocialLinks";
import { EMAIL_SUBJECT, PETITION_TEXT, RECIPIENTS, UNIVERSITIES } from "@/lib/constants";
import { Lang, translations } from "@/lib/i18n";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("fa");
  const [visitorCount, setVisitorCount] = useState(0);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [university, setUniversity] = useState("");
  const [loading, setLoading] = useState(false);

  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    const setupVisitor = async () => {
      let token = localStorage.getItem("visitor_token");

      if (!token) {
        token = crypto.randomUUID();
        localStorage.setItem("visitor_token", token);
      }

      const res = await fetch("/api/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitorToken: token }),
      });

      const data = await res.json();
      if (data.count !== undefined) {
        setVisitorCount(data.count);
      }
    };

    setupVisitor();
  }, []);

  const handleSubmit = async () => {
    if (!fullName || !phoneNumber || !university) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          university,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Submission failed.");
        return;
      }

      const userInfo = `

Ad Soyad: ${fullName}
Telefon: ${phoneNumber}
Üniversite: ${university}
`;

      const finalBody = `${PETITION_TEXT}${userInfo}`;
      const recipients = RECIPIENTS.join(",");

      const mailto = `mailto:${recipients}?subject=${encodeURIComponent(
        EMAIL_SUBJECT
      )}&body=${encodeURIComponent(finalBody)}`;

      window.location.href = mailto;
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <LanguageSwitcher lang={lang} onChange={setLang} />
          <VisitorCounter count={visitorCount} label={t.visitors} />
        </div>

        <section className="rounded-3xl border border-[#d9c4a1] bg-white/70 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 overflow-hidden rounded-full border border-[#d9c4a1] bg-white shadow-md">
              <Image
                src="/logo.jpg"
                alt="ACCA Logo"
                width={220}
                height={220}
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-3xl font-bold text-[#1b3558]">{t.title}</h1>
            <p className="mt-4 max-w-2xl leading-8 text-[#4b5563]">{t.intro}</p>
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[#e7d7bf] bg-[#fffdfa] p-6 shadow-md">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b3558]">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-2xl border border-[#d9c4a1] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#1b3558]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b3558]">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-2xl border border-[#d9c4a1] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#1b3558]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1b3558]">
                  {t.university}
                </label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full rounded-2xl border border-[#d9c4a1] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#1b3558]"
                >
                  <option value="">{t.selectUniversity}</option>
                  {UNIVERSITIES.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-2xl bg-[#1b3558] px-4 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Loading..." : t.confirm}
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-[#6b7280]">{t.footerNote}</p>
          </div>

          <div className="flex justify-center">
            <SocialLinks
              whatsappUrl="https://chat.whatsapp.com/YOUR_GROUP_LINK"
              instagramUrl="https://instagram.com/YOUR_PAGE"
              whatsappLabel={t.whatsapp}
              instagramLabel={t.instagram}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
