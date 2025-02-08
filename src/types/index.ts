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
