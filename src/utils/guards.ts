import { Exercise } from "src/types";

export const isObj = (data: unknown): data is object =>
  !!data && typeof data === "object";

export const isString = (data: unknown): data is string =>
  typeof data === "string";

export const isStringArr = (data: unknown): data is string[] =>
  Array.isArray(data) && data.every((el) => isString(el));

export const isExercise = (data: unknown): data is Exercise =>
  isObj(data) &&
  "bodyPart" in data &&
  "equipment" in data &&
  "gifUrl" in data &&
  "id" in data &&
  "instructions" in data &&
  "name" in data &&
  "secondaryMuscles" in data &&
  "target" in data &&
  isString(data.bodyPart) &&
  isString(data.equipment) &&
  isString(data.gifUrl) &&
  isString(data.id) &&
  isStringArr(data.instructions) &&
  isString(data.name) &&
  isStringArr(data.secondaryMuscles) &&
  isString(data.target);

export const isExerciseArr = (data: unknown): data is Exercise[] =>
  Array.isArray(data) && data.every((el) => isExercise(el));
