import { createClient } from "@supabase/supabase-js";
import { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "src/config/routes";
import { ConfirmPage } from "src/pages/ConfirmPage";
import { MainPage } from "src/pages/MainPage";
import { RedirectPage } from "src/pages/RedirectPage";
import { LoginPage } from "src/pages/LoginPage";
import { StartPage } from "src/pages/StartPage";
import { SUPABASE_URL } from "src/utils/constants";
import { SignUpPage } from "src/pages/SignUpPage";

export const SUPABASE = createClient(
  SUPABASE_URL,
  import.meta.env.ENV_SUPABASE_KEY
);

export const App = (): JSX.Element => {
  const { start, redirect, login, signUp, main, confirm } = routes;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={start} />} />
        <Route path="/*" element={<Navigate to={redirect} />} />
        <Route path={start} element={<StartPage />} />
        <Route path={redirect} element={<RedirectPage />} />
        <Route path={login} element={<LoginPage />} />
        <Route path={signUp} element={<SignUpPage />} />
        <Route path={main} element={<MainPage />} />
        <Route path={confirm} element={<ConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
};
