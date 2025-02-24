import { JSX, useContext, useState } from "react";
import { WindowWrapper } from "../WindowWrapper";
import { useCreateOrEditPlanMutation } from "src/api/apiSlice";
import { DAYS } from "src/utils/constants";
import { ExerciseItem } from "../ExerciseItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addExerciseToDay,
  removeExerciseFromDay,
} from "src/features/plans/plansSlice";
import { RootState } from "src/app/store";
import { capitalize } from "src/utils/capitalize";
import { Exercise, Plan } from "src/types";
import { GlobalContext } from "src/root";

type Props = {
  closeWindow: () => void;
  existedPlan?: {
    existedPlanId: string;
    existedPlanName: string;
  };
};

export const PlanWindow = ({
  closeWindow,
  existedPlan,
}: Props): JSX.Element => {
  const { currentUser } = useContext(GlobalContext);

  const [planName, setPlanName] = useState(
    existedPlan ? existedPlan.existedPlanName : ""
  );
  const [selectedDay, setSelectedDay] = useState<
    keyof RootState["plans"]["currentPlanExercises"] | null
  >(null);
  const [isDrag, setIsDrag] = useState(false);
  const [draggedExercise, setDraggedExercise] = useState<Exercise | null>(null);
  const [draggedExerciseDay, setDraggedExerciseDay] = useState<
    (typeof DAYS)[number] | null
  >(null); // from which day I get dragged exercise

  const dispatch = useDispatch();

  const currentPlan = useSelector(
    (state: RootState) => state.plans.currentPlanExercises
  );

  const exercises = useSelector(
    (state: RootState) => state.exercises.exercisesToShowInModal
  );

  const onDragStart = (exercise: Exercise, day: (typeof DAYS)[number]) => {
    setIsDrag(true);
    setDraggedExercise(exercise);
    setDraggedExerciseDay(day);
  };

  const onDrop = (day: (typeof DAYS)[number]) => {
    setIsDrag(false);
    setDraggedExercise(null);
    setDraggedExerciseDay(null);

    if (
      !draggedExerciseDay ||
      !draggedExercise ||
      day === draggedExerciseDay ||
      Object.values(currentPlan[day]).some(
        (existExercise) => existExercise === draggedExercise
      )
    )
      return;

    dispatch(
      addExerciseToDay({
        day,
        exercise: draggedExercise,
      })
    );

    dispatch(
      removeExerciseFromDay({
        day: draggedExerciseDay,
        exercise: draggedExercise,
      })
    );
  };

  const [createOrEditPlan] = useCreateOrEditPlanMutation();

  const handleCreatePlan = () => {
    if (!currentUser || !planName.length) return;

    const planData = {
      ...(existedPlan && { id: existedPlan.existedPlanId }),
      userId: currentUser.uid,
      name: planName,
      ...Object.fromEntries(
        Object.entries(currentPlan).map(([day, exercises]) => [
          day,
          exercises.map((exercise) => exercise.id),
        ])
      ),
    } as Plan;

    createOrEditPlan(planData);

    setSelectedDay(null);
    closeWindow();
  };

  if (selectedDay)
    return (
      <WindowWrapper onClose={() => setSelectedDay(null)}>
        <div
          data-testid="exercises-window"
          onClick={(e) => e.stopPropagation()}
          className="flex cursor-default flex-col px-8 py-4 shadow-md rounded-md relative outline-black outline/10 bg-white w-[95%] h-[95%]"
        >
          <div
            onClick={() => setSelectedDay(null)}
            className="w-[32px] h-[32px] text-2xl font-semibold cursor-pointer duration-300 hover:scale-115 flex justify-center items-center absolute right-2 top-2"
          >
            x
          </div>
          <h2 className="text-center text-3xl mt-1 pb-2">Choose exercises</h2>
          <div className="flex flex-row flex-wrap justify-center overflow-y-auto">
            {exercises?.map((exercise, index) => (
              <ExerciseItem
                handleClick={() => {
                  setSelectedDay(null);

                  if (
                    Object.values(currentPlan[selectedDay]).some(
                      (existExercise) => existExercise === exercise
                    )
                  )
                    return;

                  dispatch(
                    addExerciseToDay({
                      day: selectedDay,
                      exercise,
                    })
                  );
                }}
                exercise={exercise}
                key={`exercise-plan-${index}-${exercise.id}`}
              />
            ))}
          </div>
        </div>
      </WindowWrapper>
    );

  return (
    <WindowWrapper onClose={closeWindow}>
      <div
        data-testid="plan-window"
        onClick={(e) => e.stopPropagation()}
        className="flex cursor-default flex-col px-8 py-4 shadow-md rounded-md relative outline-black outline/10 bg-white w-[95%] h-[95%]"
      >
        <div
          onClick={closeWindow}
          className="w-[32px] h-[32px] text-2xl font-semibold cursor-pointer duration-300 hover:scale-115 flex justify-center items-center absolute right-2 top-2"
        >
          x
        </div>

        <div className="flex flex-col justify-start h-full items-center">
          <h1 className="text-center text-3xl mt-1">
            {existedPlan ? "Your" : "Create"} plan
          </h1>

          <div className="flex flex-row items-center w-full justify-center mt-5">
            <p className="text-xl">Name</p>
            <input
              data-testid="plan-name"
              value={planName}
              onChange={({ currentTarget: { value } }) => setPlanName(value)}
              type="text"
              className="outline-black outline/10 rounded-md shadow-sm ms-3 px-1 py-2 h-[40px] w-[75%] bg-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 w-full gap-3 mt-6 h-full overflow-y-auto lg:overflow-y-hidden">
            {DAYS.map((day, index) => (
              <div
                data-testid={`${day}-section`}
                onDrop={() => onDrop(day)}
                onDragOver={(e) => e.preventDefault()}
                className={`border-orange-400 rounded-md border-solid border-3 w-full h-full ${
                  isDrag ? "bg-gray-200" : ""
                }`}
                key={`${index}-${day}-day`}
              >
                <h2 className="bg-orange-400 text-white text-center py-1">
                  {capitalize(day)}
                </h2>
                <div className="flex flex-col items-center overflow-y-auto h-[480px]">
                  <img
                    data-testid="add-exercise-btn"
                    onClick={() => setSelectedDay(day)}
                    src="/plus.png"
                    alt="plus-icon"
                    className="object-contain w-[40px] h-[40px] cursor-pointer duration-300 hover:scale-115 mt-2 mb-2"
                  />
                  {currentPlan[day].map((exercise, index) => (
                    <div
                      data-testid="plan-exercise"
                      draggable
                      onDragStart={() => onDragStart(exercise, day)}
                      className="flex flex-col justify-center items-center w-[90px] h-[90px] rounded-md p-2 shadow-md outline-black outline/10 cursor-pointer duration-300 hover:scale-115 mt-2"
                      key={`exercise-day-${index}-${exercise.id}`}
                    >
                      <img
                        className="object-contain w-[55px] h-[55px] mb-1"
                        src="/loading.gif"
                        alt="gif-url"
                        onLoad={(e) => (e.currentTarget.src = exercise.gifUrl)}
                      />
                      <h1 className="text-xs text-center text-ellipsis w-[70px] h-[20px] inline-block overflow-hidden whitespace-nowrap">
                        {exercise.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            data-testid="save-plan-btn"
            onClick={handleCreatePlan}
            className={`${
              !planName.length
                ? "opacity-75 grayscale-25 cursor-not-allowed"
                : "cursor-pointer hover:scale-105 duration-300"
            } bg-orange-400 text-white flex items-center justify-center rounded-md h-[40px] w-[220px] sm:w-[300px] py-2 mt-4`}
          >
            {existedPlan ? "Save" : "Create"}
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};
