import { useEffect } from "react";
import { useUpdateExercisesMutation } from "src/api/apiSlice";
import { useLazyGetValidExercisesQuery } from "src/api/exercisesDbSlice";

export const useUpdateExercisesData = () => {
  const lastUpdatedTime = localStorage.getItem("lastUpdatedTime") ?? "0";
  const [getValidExercises, { data, isLoading, isSuccess }] =
    useLazyGetValidExercisesQuery();

  const [updateExercises] = useUpdateExercisesMutation();

  useEffect(() => {
    const currentTime = new Date().getTime();
    const lastUpdated = parseInt(lastUpdatedTime, 10);
    const threeHoursInMs = 3 * 60 * 60 * 1000;

    if (!lastUpdated || currentTime - lastUpdated > threeHoursInMs) {
      getValidExercises();
    }
  }, [lastUpdatedTime, getValidExercises]);

  useEffect(() => {
    if (isSuccess && data?.length && !isLoading) {
      updateExercises(data);
      localStorage.setItem("lastUpdatedTime", new Date().getTime().toString());
    }
  }, [isSuccess, data, isLoading, updateExercises]);
};
