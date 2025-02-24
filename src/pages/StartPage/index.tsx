import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "src/config/routes";
import { motion } from "motion/react";

export const StartPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center relative bg-zinc-800">
      <img
        className="w-full h-screen object-cover brightness-45"
        src="/start-page.jpg"
        alt="bg-icon"
      />
      <div className="absolute w-full px-12 sm:px-36 flex flex-col sm:items-start items-center">
        <motion.p
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut", delay: 1.7 }}
          className="text-orange-400 mb-4 text-xl sm:text-2xl italic"
        >
          GET IN FIT IN 2 WEEKS
        </motion.p>
        <motion.h2
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          className="text-white text-3xl sm:text-5xl lg:text-7xl w-full lg:w-[75%] tracking-wider font-semibold sm:text-left text-center"
        >
          START YOUR PROGRAM TODAY
        </motion.h2>
        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut", delay: 1.7 }}
          className="border-t-4 border-orange-400 w-full sm:w-[8%] my-4 sm:my-8 origin-left"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 2.7 }}
          className="text-white w-[75%] lg:w-[60%] tracking-wider text-xs sm:text-base sm:text-left text-center"
        >
          Fit Form is a modern gym app designed to help users track workouts,
          set fitness goals, and stay motivated on their fitness journey. With
          personalized plans and progress tracking, it makes achieving your
          health goals easier and more efficient.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 2.7 }}
          onClick={() => navigate(routes.login)}
          className="flex items-center rounded-md hover:scale-125 duration-300 text-2xl cursor-pointer justify-center mt-6 mb-8 sm:mt-12 bg-orange-400 w-[130px] h-[45px] sm:mb-16"
          data-testid="start-btn"
        >
          Start →
        </motion.div>
      </div>
    </div>
  );
};
