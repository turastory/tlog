import clsx from "clsx";
import * as React from "react";

export const LOCAL_STORAGE_LANG = "lang";
export const LANGUAGES = ["EN", "KR"];

const LanguageContext = React.createContext<{
  language: string;
  setLanguage: (lang: string) => void;
}>({
  language: LANGUAGES[0],
  setLanguage: () => {},
});

export const useLanguage = () => React.useContext(LanguageContext);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getInitialLanguage = () => {
    if (typeof window !== "undefined")
      return localStorage.getItem(LOCAL_STORAGE_LANG) || LANGUAGES[0];
    return "EN";
  };

  const [language, setLanguage] = React.useState(getInitialLanguage);

  const setNewLanguage = (newLanguage: string) => {
    // const newLanguage = getInitialLanguage() === "EN" ? "KR" : "EN";
    setLanguage(newLanguage);
    if (typeof window !== "undefined")
      localStorage.setItem(LOCAL_STORAGE_LANG, newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: setNewLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center">
      <button
        className="relative w-16 h-8 rounded-full bg-gray-300 focus:outline-none"
        onClick={() =>
          setLanguage(language === LANGUAGES[0] ? LANGUAGES[1] : LANGUAGES[0])
        }
      >
        <span
          className={`absolute left-0 top-0 w-1/2 h-full bg-blue-500 rounded-full transition-transform duration-300 ${
            language === "EN"
              ? "transform translate-x-0"
              : "transform translate-x-full"
          }`}
        />
        <span
          className={clsx(
            "absolute left-0 top-0 w-8 h-8 flex items-center justify-center z-10 transition-colors duration-200",
            language === LANGUAGES[1] ? "text-text" : "text-white"
          )}
        >
          {LANGUAGES[0]}
        </span>
        <span
          className={clsx(
            "absolute right-0 top-0 w-8 h-8 flex items-center justify-center z-10 transition-colors duration-200",
            language === LANGUAGES[0] ? "text-text" : "text-white"
          )}
        >
          {LANGUAGES[1]}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
