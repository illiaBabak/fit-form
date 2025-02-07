import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "src/config/routes";
import { useSignUpMutation } from "src/features/user/userSlice";
import { motion } from "motion/react";
import { Loader } from "src/components/Loader";
import { FormField } from "src/components/FormField";
import { isValidEmail } from "src/utils/isValidEmail";

type AuthMessage = {
  type: "VERIFIED";
};

export const SignUpPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [shouldClickSignUpBtn, setShouldClickSignUpBtn] = useState(true); // State for handle multiple click on sign up btn
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [
    signUp,
    { isLoading, error: signUpError, isSuccess: isSuccessSignUp },
  ] = useSignUpMutation();

  const passwordCorectLength = password.length >= 6; // Password should be at least 6 characters

  const isIdenticalPasswords =
    !!password.length &&
    !!confirmedPassword.length &&
    password === confirmedPassword;

  const shouldSignUp =
    isValidEmail(email) && !!isIdenticalPasswords && !!passwordCorectLength;

  // Timer to disabled sign up btn
  useEffect(() => {
    if (shouldClickSignUpBtn) return;

    setTimeout(() => {
      setShouldClickSignUpBtn(true);
    }, 5000);
  }, [shouldClickSignUpBtn]);

  useEffect(() => {
    const channel = new BroadcastChannel("auth");

    const handleMessage = ({ data: { type } }: MessageEvent<AuthMessage>) => {
      if (type === "VERIFIED") navigate(routes.main);
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, [navigate]);

  return (
    <div className="w-full h-screen relative flex items-center justify-center xl:justify-normal">
      <img
        className="w-full h-screen object-cover brightness-60"
        src="/regestration.jpg"
        alt="bg-icon"
      />
      <motion.h1
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="text-8xl absolute text-white font-semibold right-0 me-24 mb-12 tracking-wider w-[35%] leading-[1.2] hidden xl:flex"
      >
        Welcome to Fit form!
      </motion.h1>

      <motion.div
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="absolute w-full h-full sm:rounded-lg sm:w-[600px] sm:h-[80%] flex flex-col items-center bg-white xl:ms-24 shadow-lg py-6 px-10"
      >
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-wider">
          Sign up
        </h2>
        <p className="text-gray-400 mt-1 sm:mt-6 text-base text-center sm:text-left">
          Welcome! Sign up to our service to continue!
        </p>

        <div className="flex flex-col w-[80%] h-full mt-4 justify-between">
          <div>
            <FormField
              type="text"
              value={email}
              onChange={({ currentTarget: { value } }) => setEmail(value)}
              label="Email"
            />

            <FormField
              type="password"
              value={password}
              onChange={({ currentTarget: { value } }) => setPassword(value)}
              label="Password"
            />

            <FormField
              type="password"
              value={confirmedPassword}
              onChange={({ currentTarget: { value } }) =>
                setConfirmedPassword(value)
              }
              label="Confirm password"
            />

            {!!email.length && !passwordCorectLength && (
              <p className="text-red-400">
                *Password should be at least 6 characters
              </p>
            )}

            {!!email.length &&
              passwordCorectLength &&
              !isIdenticalPasswords && (
                <p className="text-red-400">*Passwords are not identical!</p>
              )}

            {!!signUpError && (
              <p className="text-red-400">*{signUpError as string}</p>
            )}

            {isSuccessSignUp && (
              <p className="text-green-400">
                Check your email to confirm sign up!
              </p>
            )}
          </div>

          <div
            onClick={() => signUp({ email, password })}
            className={`mt-4 w-full ${
              shouldSignUp || !shouldClickSignUpBtn
                ? "cursor-pointer hover:scale-105"
                : "cursor-not-allowed grayscale-25 opacity-75"
            } shadow-md bg-orange-400 rounded-lg text-white h-[45px] sm:h-[60px] duration-300 flex items-center justify-center text-lg sm:text-xl mb-5 sm:mb-6`}
          >
            Sign up
          </div>
        </div>

        <div className="flex flex-row mt-auto">
          <p className="text-gray-400">Already have an account?</p>
          <p
            className="text-orange-400 ms-2 cursor-pointer hover:scale-105 duration-300"
            onClick={() => navigate(routes.login)}
          >
            Login
          </p>
        </div>
      </motion.div>

      {isLoading && <Loader />}
    </div>
  );
};
