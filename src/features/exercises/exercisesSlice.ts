import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise } from "src/types";

type InitialState = {
  exerciseToShow: Exercise | null;
  exercisesToShowInModal: Exercise[];
};

const initialState: InitialState = {
  exerciseToShow: null,
  exercisesToShowInModal: [],
};

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setExerciseToShow: (state, action: PayloadAction<Exercise | null>) => {
      state.exerciseToShow = action.payload;
    },

    setExercisesToShowInModal: (state, action: PayloadAction<Exercise[]>) => {
      state.exercisesToShowInModal = action.payload;
    },
  },
});

export const { setExerciseToShow, setExercisesToShowInModal } =
  exercisesSlice.actions;

export default exercisesSlice.reducer;
