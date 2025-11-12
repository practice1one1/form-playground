import { useContext, createContext, useState, useMemo } from "react";

const CountryCodeContext = createContext();

export const useCountryCode = () => useContext(CountryCodeContext);

export const CountryCodeProvider = ({ children }) => {
  const [countryCode, setCountryCode] = useState("");

  const value = useMemo(() => ({ countryCode, setCountryCode }), [countryCode]);

  return (
    <CountryCodeContext.Provider value={value}>
      {children}
    </CountryCodeContext.Provider>
  );
};
