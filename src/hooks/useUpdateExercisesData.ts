import { useEffect } from "react";
import { useUpdateExercisesMutation } from "src/api/apiSlice";
import { useLazyGetValidExercisesQuery } from "src/api/exercisesDbSlice";

export const useUpdateExercisesData = () => {
  const lastUpdatedTime = localStorage.getItem("lastUpdatedTime") ?? "0";

  const [getValidExercises, { data, isLoading }] =
    useLazyGetValidExercisesQuery();

  const [updateExercises] = useUpdateExercisesMutation();

  useEffect(() => {
    const currentTime = new Date().getTime();
    const lastUpdated = parseInt(lastUpdatedTime, 10);
    const fiveHoursInMs = 5 * 60 * 60 * 1000;

    if (!lastUpdated || currentTime - lastUpdated > fiveHoursInMs) {
      getValidExercises();

      if (!!data?.length && !isLoading) {
        updateExercises(data);
        localStorage.setItem("lastUpdatedTime", currentTime.toString());
      }
    }
  }, [lastUpdatedTime, data, isLoading, getValidExercises, updateExercises]);
};
