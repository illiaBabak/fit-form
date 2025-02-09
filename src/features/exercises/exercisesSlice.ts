import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise } from "src/types";

type InitialState = {
  exerciseToShow: Exercise | null;
};

const initialState: InitialState = {
  exerciseToShow: null,
};

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setExerciseToShowId: (state, action: PayloadAction<Exercise | null>) => {
      state.exerciseToShow = action.payload;
    },
  },
});

export const { setExerciseToShowId } = exercisesSlice.actions;

export default exercisesSlice.reducer;
