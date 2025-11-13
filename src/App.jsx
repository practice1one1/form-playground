import React from "react";
import { CheckOutForm } from "./forms/checkout-form/CheckOutForm";
import { CountryCodeProvider } from "./forms/loan-application/CountryCodeContext";

const App = () => {
  return (
    <div>
      <CountryCodeProvider>
        <CheckOutForm />
      </CountryCodeProvider>
    </div>
  );
};

export default App;
