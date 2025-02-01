import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "src/config/routes";

export const RedirectPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col-reverse md:flex-row md:justify-normal justify-center items-center px-8 md:px-20">
      <div className="flex flex-col md:justify-normal justify-center items-center md:items-start mb-16 md:text-left text-center">
        <h1 className="text-4xl md:text-6xl w-full md:w-[85%]">
          Oopss, nothing here...
        </h1>
        <p className="my-8 text-gray-600">
          It seems you've landed on a page that doesn't exist. Don't worry—let's
          get you back to where you need to be!
        </p>
        <div
          className="cursor-pointer bg-red-300 text-white p-4 rounded-md hover:scale-125 duration-300 w-[155px] md:w-[175px] flex justify-center items-center"
          onClick={() => navigate(routes.start)}
        >
          Return to start page
        </div>
      </div>
      <img
        className="max-w-[50vw] w-auto h-auto object-contain md:h-[75%] md:ps-8"
        src="/404.jpg"
        alt="not-found-icon"
      />
    </div>
  );
};
