import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "src/config/routes";

export const StartPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center relative">
      <img
        className="w-full h-screen bg-contain brightness-45"
        src="/start-page.jpg"
        alt="bg-icon"
      />
      <div className="absolute w-full px-36">
        <p className="text-orange-400 mb-4 text-2xl italic">
          GET IN FIT IN 2 WEEKS
        </p>
        <h2 className="text-white text-7xl w-[50%] tracking-wider font-semibold">
          START YOUR PROGRAM TODAY
        </h2>
        <hr className="border-t-4 border-orange-400 w-[8%] my-8" />
        <p className="text-white w-[60%] tracking-wider">
          Fit Form is a modern gym app designed to help users track workouts,
          set fitness goals, and stay motivated on their fitness journey. With
          personalized plans and progress tracking, it makes achieving your
          health goals easier and more efficient.
        </p>
        <div
          onClick={() => navigate(routes.registration)}
          className="flex items-center hover:scale-125 duration-300 text-2xl cursor-pointer justify-center mt-12 bg-orange-400 w-[130px] h-[45px] mb-16"
        >
          Start →
        </div>
      </div>
    </div>
  );
};
