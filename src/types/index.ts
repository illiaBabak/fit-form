import { DAYS } from "src/utils/constants";

export type BodyPart = {
  bodyPart: string;
  id: number;
};

export type Equipment = {
  equipment: string;
  id: number;
};

export type Muscle = {
  id: number;
  target: string;
};

export type Exercise = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  instructions: string[];
  name: string;
  secondaryMuscles: string[];
  target: string;
};

export type Plan = {
  id: string;
  name: string;
  userId: string;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export type CurrentPlan = Record<(typeof DAYS)[number], Exercise[]>;
