import { JSX, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { routes } from "src/config/routes";
import { FIREBASE_AUTH } from "src/root";

export const ConfirmPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const oobCode = searchParams.get("oobCode");

      if (!oobCode) return;

      await applyActionCode(FIREBASE_AUTH, oobCode);

      navigate(routes.main);
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-8xl text-orange-400">Fit form</h1>
      <p className="text-gray-500 text-2xl mt-2">Wait</p>
    </div>
  );
};
