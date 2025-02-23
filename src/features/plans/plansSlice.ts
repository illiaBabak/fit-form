import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentPlan, Exercise, Plan } from "src/types";

type InitialState = {
  currentPlanExercises: CurrentPlan;
  planToShow: Plan | null;
};

const initialState: InitialState = {
  currentPlanExercises: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  planToShow: null,
};

export const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addExerciseToDay: (
      state,
      action: PayloadAction<{ day: keyof CurrentPlan; exercise: Exercise }>
    ) => {
      state.currentPlanExercises = {
        ...state.currentPlanExercises,
        [action.payload.day]: [
          ...state.currentPlanExercises[action.payload.day],
          action.payload.exercise,
        ],
      };
    },

    removeExerciseFromDay: (
      state,
      action: PayloadAction<{ day: keyof CurrentPlan; exercise: Exercise }>
    ) => {
      state.currentPlanExercises = {
        ...state.currentPlanExercises,
        [action.payload.day]: state.currentPlanExercises[
          action.payload.day
        ].filter((exercise) => exercise.id !== action.payload.exercise.id),
      };
    },

    setPlanToShow: (state, action: PayloadAction<Plan | null>) => {
      state.planToShow = action.payload;
    },

    setCurrentPlan: (state, action: PayloadAction<CurrentPlan>) => {
      state.currentPlanExercises = action.payload;
    },
  },
});

export const {
  addExerciseToDay,
  removeExerciseFromDay,
  setPlanToShow,
  setCurrentPlan,
} = plansSlice.actions;

export default plansSlice.reducer;
