import { createClient } from "@supabase/supabase-js";
import { createContext, Dispatch, JSX, SetStateAction, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "src/config/routes";
import { ConfirmPage } from "src/pages/ConfirmPage";
import { MainPage } from "src/pages/MainPage";
import { RedirectPage } from "src/pages/RedirectPage";
import { LoginPage } from "src/pages/LoginPage";
import { StartPage } from "src/pages/StartPage";
import { FIREBASE_CONFIG, SUPABASE_URL } from "src/utils/constants";
import { SignUpPage } from "src/pages/SignUpPage";
import { MyPlanPage } from "src/pages/MyPlanPage";
import { getAuth, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Database } from "src/types/supabase";

type GlobalContextType = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  currentUser: null,
  setCurrentUser: () => {
    throw new Error("Global context is not initalized");
  },
});

export const SUPABASE = createClient<Database>(
  SUPABASE_URL,
  import.meta.env.ENV_SUPABASE_KEY
);

const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const { start, redirect, login, signUp, main, confirm, myPlan } = routes;

  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={start} />} />
          <Route path="/*" element={<Navigate to={redirect} />} />
          <Route path={start} element={<StartPage />} />
          <Route path={redirect} element={<RedirectPage />} />
          <Route path={login} element={<LoginPage />} />
          <Route path={signUp} element={<SignUpPage />} />
          <Route path={confirm} element={<ConfirmPage />} />
          <Route path={main} element={<MainPage />} />
          <Route path={myPlan} element={<MyPlanPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};
