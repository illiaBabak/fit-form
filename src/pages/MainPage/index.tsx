import { JSX, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ExerciseItem } from "src/components/ExerciseItem";
import { Header } from "src/components/Header";
import { Loader } from "src/components/Loader";
import { SkeletonLoader } from "src/components/SkeletonLoader";
import {
  useGetBodyPartListQuery,
  useGetEquipmentListQuery,
  useGetExercisesQuery,
  useGetMusclesQuery,
} from "src/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { ExerciseWindow } from "src/components/ExerciseWindow";
import { motion } from "motion/react";
import { useUpdateExercisesData } from "src/hooks/useUpdateExercisesData";
import { setExerciseToShow } from "src/features/exercises/exercisesSlice";

export const MainPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") ?? "";
  const bodyPart = searchParams.get("bodyPart") ?? "";
  const equipment = searchParams.get("equipment") ?? "";
  const target = searchParams.get("target") ?? "";

  const exerciseToShow = useSelector(
    (state: RootState) => state.exercises.exerciseToShow
  );

  const { data: bodyPartList, isLoading: isLoadingBodyParts } =
    useGetBodyPartListQuery();

  const { data: equipmentList, isLoading: isLoadingEquipment } =
    useGetEquipmentListQuery();

  const { data: muscles, isLoading: isLoadingMuscles } = useGetMusclesQuery();

  const { data: exercises, isLoading: isLoadingExercises } =
    useGetExercisesQuery();

  useUpdateExercisesData();

  const filteredExercises = exercises?.filter(
    (exercise) =>
      (searchQuery
        ? exercise.name
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        : true) &&
      (bodyPart === "all" || exercise.bodyPart === bodyPart) &&
      (equipment === "all" || exercise.equipment === equipment) &&
      (target === "all" || exercise.target === target)
  );

  useEffect(() => {
    if (!searchQuery)
      setSearchParams({
        bodyPart: bodyPart,
        equipment: equipment,
        target: target,
      });
  }, [searchQuery, setSearchParams, bodyPart, equipment, target]);

  useEffect(() => {
    setSearchParams({
      query: searchQuery,
      bodyPart: bodyPart || "all",
      equipment: equipment || "all",
      target: target || "all",
    });
  }, [bodyPart, equipment, setSearchParams, searchQuery, target]);

  const handleSearchChange = (key: string, value: string) =>
    setSearchParams((prevParams) => ({
      ...Object.fromEntries(prevParams),
      [key]: value,
    }));

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-800">
      {!!exerciseToShow && <ExerciseWindow exercise={exerciseToShow} />}
      <Header />
      <div className="flex flex-col w-full items-center">
        <menu className="bg-gray-200 flex-col flex w-[95%] mt-4 mx-4 sm:mt-8 sm:mx-8 p-4 sm:p-6 rounded-md">
          <div className="w-full relative">
            <input
              data-testid="search"
              className="shadow-md ps-3 bg-white outline-black outline/55 w-full pe-[28px] sm:pe-[42px] h-[32px] sm:h-[42px] py-2 px-3 cursor-pointer rounded-md"
              type="text"
              onChange={({ currentTarget: { value } }) =>
                setSearchParams({
                  query: value,
                  bodyPart: bodyPart,
                  equipment: equipment,
                  target: target,
                })
              }
              value={searchQuery}
              placeholder="Search..."
            />
            {searchQuery.length ? (
              <div
                onClick={() =>
                  setSearchParams({
                    query: "",
                    bodyPart: bodyPart,
                    equipment: equipment,
                    target: target,
                  })
                }
                className="absolute right-0 top-0 text-xl me-1 sm:me-0 sm:text-2xl flex justify-center items-center w-[20px] h-[20px] sm:w-[32px] sm:h-[32px] mt-1 cursor-pointer duration-300 hover:scale-125"
              >
                x
              </div>
            ) : (
              <img
                className="absolute right-0 top-0 object-contain w-[20px] h-[20px] sm:w-[32px] sm:h-[32px] mt-2 me-2 sm:mt-1.25 sm:me-1.25"
                src="/search.png"
                alt="search-icon"
              />
            )}
          </div>

          <div className="flex flex-row justify-center lg:justify-between lg:mt-4">
            <div className="flex flex-row lg:flex-row w-full flex-wrap sm:w-auto justify-center items-center">
              {[
                {
                  label: "Body part",
                  value: bodyPart,
                  data: bodyPartList,
                  isLoading: isLoadingBodyParts,
                  key: "bodyPart",
                  icon: "/bodyPart.png",
                },
                {
                  label: "Equipment",
                  value: equipment,
                  data: equipmentList,
                  isLoading: isLoadingEquipment,
                  key: "equipment",
                  icon: "/equipment.png",
                },
                {
                  label: "Muscle",
                  value: target,
                  data: muscles,
                  isLoading: isLoadingMuscles,
                  key: "target",
                  icon: "/muscle.png",
                },
              ].map(({ label, value, data, isLoading, key, icon }) => (
                <div
                  key={key}
                  className={`flex flex-row items-center mt-4 ms-3 sm:ms-5`}
                >
                  <img
                    className="h-[24px] w-[24px] object-cover"
                    src={icon}
                    alt={label}
                  />
                  <p className="sm:ms-1">{label}:</p>
                  {isLoading ? (
                    <SkeletonLoader className="w-[80px] sm:w-[140px] h-[32px] rounded-md ms-1" />
                  ) : (
                    <select
                      data-testid={key}
                      onChange={({ currentTarget: { value } }) =>
                        handleSearchChange(key, value)
                      }
                      value={value}
                      className="bg-white shadow-md ms-1 outline-black outline/10 w-[80px] sm:w-[140px] h-[32px] rounded-md cursor-pointer"
                    >
                      {data?.map((item, index) => (
                        <option
                          className="bg-gray-100"
                          key={`${index}-${item.id}-${key}`}
                        >
                          {item[key as keyof typeof item]}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        </menu>
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
          }}
          className="flex flex-row flex-wrap w-full px-6 mt-4 justify-center sm:justify-between"
          data-testid="exercise-list"
        >
          {isLoadingExercises ? (
            <Loader />
          ) : (
            filteredExercises?.map((exercise, index) => (
              <ExerciseItem
                handleClick={() => dispatch(setExerciseToShow(exercise))}
                exercise={exercise}
                key={`${index}-${exercise.id}-exercise`}
              />
            ))
          )}
        </motion.div>
        {!isLoadingExercises && !filteredExercises?.length && (
          <p className="text-white text-3xl sm:text-5xl mt-1 sm:mt-12">
            No exercises found :(
          </p>
        )}
      </div>
    </div>
  );
};
