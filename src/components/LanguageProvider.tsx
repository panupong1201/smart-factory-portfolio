"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

type Messages = Record<string, unknown>;

interface LangContext {
  lang: string;
  setLang: (l: string) => void;
  t: (key: string) => string;
}

const LangCtx = createContext<LangContext>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

import { useRouter } from "next/navigation";

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang?: string;
}) {
  const router = useRouter();
  const [lang, _setLang] = useState(initialLang || "en");
  const [messages, setMessages] = useState<Messages>({});

  const setLang = (l: string) => {
    _setLang(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    // navigate to the new locale route
    const { pathname, search, hash } = window.location;
    // Remove the current locale from pathname, then prepend the new locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?:\/|$)/, "/");
    router.replace(
      `/${l}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}${search}${hash}`,
    );
  };

  useEffect(() => {
    const saved =
      typeof localStorage !== "undefined" && localStorage.getItem("lang");
    if (saved) _setLang(saved);
  }, []);

  useEffect(() => {
    // if router locale differs, sync
    const win = window as unknown as { __NEXT_DATA__?: { locale?: string } };
    if (typeof window !== "undefined" && win.__NEXT_DATA__?.locale) {
      const rloc = win.__NEXT_DATA__.locale;
      if (rloc && rloc !== lang) _setLang(rloc);
    }
  }, [lang]);

  useEffect(() => {
    import(`../locales/${lang}.json`).then((mod) => {
      setMessages(mod.default);
    });
  }, [lang]);

  const t = (key: string) => {
    const parts = key.split(".");
    let result: unknown = messages;
    for (const p of parts) {
      if (result && typeof result === "object")
        result = (result as Record<string, unknown>)[p];
      else return key;
    }
    if (typeof result === "string") return result;
    return key;
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>
  );
}

export function useLanguage() {
  return useContext(LangCtx);
}
