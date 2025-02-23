export const SUPABASE_URL = "https://bjldpefzbrrmjgljtmjf.supabase.co";

export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.ENV_FIREBASE_API_KEY,
  authDomain: import.meta.env.ENV_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.ENV_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.ENV_FIREBASE_APP_ID,
  measurementId: import.meta.env.ENV_FIREBASE_MEASUREMENT_ID,
} as const;
