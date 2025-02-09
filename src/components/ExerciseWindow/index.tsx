import { JSX } from "react";
import { Exercise } from "src/types";
import { WindowWrapper } from "../WindowWrapper";
import { useDispatch } from "react-redux";
import { setExerciseToShowId } from "src/features/exercises/exercisesSlice";
import { capitalize } from "src/utils/capitalize";

type Props = {
  exercise: Exercise;
};

export const ExerciseWindow = ({ exercise }: Props): JSX.Element => {
  const dispatch = useDispatch();

  const closeWindow = () => dispatch(setExerciseToShowId(null));

  return (
    <WindowWrapper onClose={closeWindow}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex cursor-default relative flex-col md:flex-row items-center md:items-start w-[80%] h-[90%] rounded-md bg-white shadow-md outline-black outline/10 md:py-8 p-1 md:px-6"
      >
        <div
          onClick={closeWindow}
          className="w-[32px] h-[32px] text-2xl font-semibold cursor-pointer duration-300 hover:scale-115 flex justify-center items-center absolute right-2 top-2"
        >
          x
        </div>
        <img
          className="object-contain w-[180px] h-[180px] md:w-[280px] lg:w-[450px] md:h-full"
          src={exercise.gifUrl}
          alt="exercise-gif"
        />
        <div className="flex flex-col items-center md:items-start md:ms-3 tracking-wide">
          <h1 className="text-xl text-center lg:text-left lg:text-4xl">
            {capitalize(exercise.name)}
          </h1>
          <p className="mt-2 lg:mt-4 lg:text-base text-sm">
            <strong>Body part:</strong> {exercise.bodyPart}
          </p>
          <p className="mt-1 lg:text-base text-sm">
            <strong>Target muscle:</strong> {exercise.target}
          </p>
          <div className="flex flex-row mt-1 lg:text-base text-sm">
            <strong>Secondary muscles: </strong>
            {exercise.secondaryMuscles.map((muscle, index) => (
              <p className="ms-1" key={`${muscle}-${index}-muscle`}>
                {muscle}
                {exercise.secondaryMuscles.length !== 0 &&
                index < exercise.secondaryMuscles.length - 1
                  ? ","
                  : ""}
              </p>
            ))}
          </div>
          <p className="mt-1 lg:text-base text-sm">
            <strong>Equipment:</strong> {exercise.equipment}
          </p>

          <div className="mt-1 lg:text-base text-sm flex flex-col md:items-stretch items-center">
            <strong>Instructions: </strong>
            <ul className="list-disc list-outside mt-1 ms-4 pe-2 overflow-y-auto h-[120px] md:h-[320px]">
              {exercise.instructions.map((instruction, index) => (
                <li
                  className="my-1 ms-4 list-item"
                  key={`${instruction}-${index}-instruction`}
                >
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};
