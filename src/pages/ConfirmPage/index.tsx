import { JSX, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SUPABASE } from "src/root";

export const ConfirmPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");

      if (!token) return;

      const channel = new BroadcastChannel("auth");

      channel.postMessage({ type: "VERIFIED" });

      await SUPABASE.auth.verifyOtp({
        token_hash: token,
        type: "email",
      });
    };

    verify();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-8xl text-orange-400">Fit form</h1>
      <p className="text-gray-500 text-2xl mt-2">
        Now you can close this page!
      </p>
    </div>
  );
};
