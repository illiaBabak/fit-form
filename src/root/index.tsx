import { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "src/config/routes";
import { RedirectPage } from "src/pages/RedirectPage";
import { RegistrationPage } from "src/pages/RegistrationPage";
import { StartPage } from "src/pages/StartPage";

export const App = (): JSX.Element => {
  const { start, redirect, registration } = routes;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={start} />} />
        <Route path="/*" element={<Navigate to={redirect} />} />
        <Route path={start} element={<StartPage />} />
        <Route path={redirect} element={<RedirectPage />} />
        <Route path={registration} element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
};
