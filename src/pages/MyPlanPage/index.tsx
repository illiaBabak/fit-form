import { JSX, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetExercisesByIdsQuery,
  useGetExercisesQuery,
  useLazyGetUserPlansQuery,
} from "src/api/apiSlice";
import { RootState } from "src/app/store";
import { PlanWindow } from "src/components/PlanWindow";
import { Header } from "src/components/Header";
import { Loader } from "src/components/Loader";
import { setExercisesToShowInModal } from "src/features/exercises/exercisesSlice";
import { setCurrentPlan, setPlanToShow } from "src/features/plans/plansSlice";
import { CurrentPlan, Exercise } from "src/types";
import { DAYS } from "src/utils/constants";
import { GlobalContext } from "src/root";

export const MyPlanPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const { currentUser } = useContext(GlobalContext);

  const [shouldShowCreatePlanWindow, setShouldShowCreatePlanWindow] =
    useState(false);

  const [fetchUserPlans, { data: plans, isLoading: isLoadingPlans }] =
    useLazyGetUserPlansQuery();

  const { data: exercises, isLoading: isLoadingExercises } =
    useGetExercisesQuery();

  const planToShow = useSelector((state: RootState) => state.plans.planToShow);

  const closeWindow = () => dispatch(setPlanToShow(null));

  const shouldSetExercises = !useSelector(
    (state: RootState) => state.exercises.exercisesToShowInModal
  ).length;

  const exerciseQueries = DAYS.map((day) =>
    useGetExercisesByIdsQuery(planToShow?.[day] || [])
  );

  const exercisesData = Object.fromEntries(
    DAYS.map((day, index) => [
      day,
      {
        data: exerciseQueries[index]?.data || [],
        isLoading: exerciseQueries[index]?.isLoading,
      },
    ])
  ) as Record<keyof CurrentPlan, { data: Exercise[]; isLoading: boolean }>;

  const currentPlan = Object.fromEntries(
    DAYS.map((day) => [day, exercisesData[day].data])
  ) as CurrentPlan;

  useEffect(() => {
    if (!!exercises?.length && shouldSetExercises)
      dispatch(setExercisesToShowInModal(exercises));

    if (Object.values(currentPlan).some((el) => el.length))
      dispatch(setCurrentPlan(currentPlan));
  }, [
    isLoadingExercises,
    exercises,
    dispatch,
    shouldSetExercises,
    currentPlan,
  ]);

  useEffect(() => {
    if (!currentUser) return;

    fetchUserPlans(currentUser.uid);
  }, [currentUser, fetchUserPlans]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-800">
      {shouldShowCreatePlanWindow && (
        <PlanWindow closeWindow={() => setShouldShowCreatePlanWindow(false)} />
      )}
      {!!planToShow && (
        <PlanWindow
          closeWindow={closeWindow}
          existedPlan={{
            existedPlanName: planToShow?.name ?? "",
            existedPlanId: planToShow?.id ?? "",
          }}
        />
      )}
      <Header />
      <div className="w-full px-16 mt-10 flex flex-col items-center">
        <div
          onClick={() => setShouldShowCreatePlanWindow(true)}
          className="text-white flex justify-center w-[95%] h-[45px] sm:h-[60px] text-lg sm:text-xl items-center cursor-pointer hover:scale-105 duration-300 rounded-md bg-orange-400"
        >
          Create plan
        </div>

        <div className="flex flex-col mt-4 sm:mt-8 w-full items-center">
          {!isLoadingPlans && !plans?.length && (
            <h1 className="text-2xl sm:text-4xl mt-1 text-white">
              You don't have any plans yet
            </h1>
          )}
          {!!plans?.length && (
            <h1 className="text-2xl sm:text-4xl mt-1 text-white">Your plans</h1>
          )}
          <div className="w-full flex flex-col overflow-y-auto items-center h-[320px] sm:h-[400px] mt-3">
            {isLoadingPlans ? (
              <Loader />
            ) : (
              plans?.map((plan, index) => (
                <div
                  onClick={() => dispatch(setPlanToShow(plan))}
                  className="w-[75%] min-h-[45px] sm:min-h-[60px] flex justify-center items-center cursor-pointer hover:scale-105 duration-300 rounded-md bg-orange-400 my-3"
                  key={`plan-${index}-${plan.name}`}
                >
                  <p className="w-[400px] text-center whitespace-nowrap inline-block text-ellipsis overflow-hidden text-white text-lg sm:text-xl">
                    {plan.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
