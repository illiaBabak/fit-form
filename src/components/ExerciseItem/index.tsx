import { JSX } from "react";
import { Exercise } from "src/types";

type Props = {
  exercise: Exercise;
  handleClick: () => void;
};

export const ExerciseItem = ({ exercise, handleClick }: Props): JSX.Element => (
  <div
    data-testid="exercise"
    onClick={handleClick}
    className="bg-white flex flex-col items-center justify-center outline-black outline/10 shadow-md w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-lg cursor-pointer duration-300 hover:scale-105 p-3 m-3"
  >
    <img
      className="object-contain w-[120px] h-[120px] md:h-[200px] md:w-[200px] mb-1"
      src="/loading.gif"
      alt="gif-url"
      onLoad={(e) => (e.currentTarget.src = exercise.gifUrl)}
      onError={(e) => (e.currentTarget.src = "/loading.gif")}
    />
    <h1 className="text-lg md:text-xl text-center">{exercise.name}</h1>
    <p className="text-gray-500 text-center mt-1">{exercise.target}</p>
  </div>
);
