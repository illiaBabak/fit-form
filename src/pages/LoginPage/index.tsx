import { JSX, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  useLoginMutation,
  useSignInWithGoogleMutation,
} from "src/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "src/config/routes";
import { Loader } from "src/components/Loader";
import { FormField } from "src/components/FormField";
import { isValidEmail } from "src/utils/isValidEmail";

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isSuccess, isLoading, error: errorLogin }] =
    useLoginMutation();

  const [signInWithGoogle] = useSignInWithGoogleMutation();

  const shouldLogin = isValidEmail(email) && password.length;

  useEffect(() => {
    if (isSuccess) navigate(routes.main);
  }, [isSuccess]);

  return (
    <div className="w-full h-screen relative flex items-center xl:justify-stretch justify-center">
      <img
        className="w-full h-screen object-cover brightness-60"
        src="/regestration.jpg"
        alt="bg-icon"
      />
      <motion.h1
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="text-8xl absolute text-white font-semibold right-0 me-24 mb-12 tracking-wider w-[33%] leading-[1.2] hidden xl:flex"
      >
        Welcome <br /> Back!
      </motion.h1>
      <motion.div
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="absolute w-full sm:w-[500px] md:w-[600px] h-full sm:h-[80%] flex flex-col items-center justify-between bg-white rounded-0 sm:rounded-lg xl:ms-24 shadow-lg py-6 px-10"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-wider">
          Login
        </h2>
        <p className="text-gray-400 mt-6 sm:text-base sm:text-left text-center text-sm">
          Welcome back! Please login to your account.
        </p>

        <div className="flex flex-col w-[80%] justify-between h-full mb-8 mt-4 sm:mt-8">
          <div>
            <FormField
              label="Email"
              type="text"
              value={email}
              onChange={({ currentTarget: { value } }) => setEmail(value)}
            />

            <FormField
              label="Password"
              type="password"
              value={password}
              onChange={({ currentTarget: { value } }) => setPassword(value)}
            />

            {!!errorLogin && (
              <p className="text-red-400">*{errorLogin as string}</p>
            )}
          </div>

          <div>
            <div
              onClick={() => login({ email, password })}
              className={`${
                shouldLogin
                  ? "cursor-pointer hover:scale-105"
                  : "grayscale-25 opacity-75 cursor-not-allowed"
              } mt-1 sm:mt-4 w-full shadow-md bg-orange-400 rounded-lg text-white h-[45px] sm:h-[60px] duration-300 flex items-center justify-center text-lg sm:text-xl`}
            >
              Login
            </div>

            <div
              onClick={signInWithGoogle}
              className="mt-4 w-full text-black cursor-pointer hover:scale-105 rounded-lg h-[45px] sm:h-[60px] duration-300 flex items-center justify-center text-sm sm:text-xl shadow-xl outline-black outline/10"
            >
              <img
                src="/google-logo.webp"
                className="object-contain h-[30px] w-[30px] sm:h-[40px] sm:w-[40px]"
                alt="google-logo"
              />
              <p className="sm:text-xl text-sm ms-2">Continue with Google</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-auto">
          <p className="text-gray-400">New User?</p>
          <p
            className="text-orange-400 ms-2 cursor-pointer hover:scale-105 duration-300"
            onClick={() => navigate(routes.signUp)}
          >
            Signup
          </p>
        </div>
      </motion.div>

      {isLoading && <Loader />}
    </div>
  );
};
