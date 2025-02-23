/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENV_SUPABASE_KEY: string;
  readonly ENV_EXERCISE_DB_API_KEY: string;
  readonly ENV_FIREBASE_API_KEY: string;
  readonly ENV_FIREBASE_AUTH_DOMAIN: string;
  readonly ENV_FIREBASE_PROJECT_ID: string;
  readonly ENV_FIREBASE_STORAGE_BUCKET: string;
  readonly ENV_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly ENV_FIREBASE_APP_ID: string;
  readonly ENV_FIREBASE_MEASUREMENT_ID: string;
}
