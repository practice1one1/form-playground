import React from "react";
import { LoanApplicationForm } from "./forms/loan-application/LoanApplicationForm";
import { CountryCodeProvider } from "./forms/loan-application/CountryCodeContext";

const App = () => {
  return (
    <div>
      <CountryCodeProvider>
        <LoanApplicationForm />
      </CountryCodeProvider>
    </div>
  );
};

export default App;
