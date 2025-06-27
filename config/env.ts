import { config } from "dotenv";

config({ path: "./.env" });

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const PORT = getEnv("PORT");
export const DBConnectionURL = getEnv("DBConnectionURL");
export const JWT_SECRET_REFRESH_TOKEN = getEnv("JWT_SECRET_REFRESH_TOKEN");
export const JWT_EXPIRES_IN_REFRESH_TOKEN = getEnv(
  "JWT_EXPIRES_IN_REFRESH_TOKEN"
);
export const JWT_SECRET_ACCESS_TOKEN = getEnv("JWT_SECRET_ACCESS_TOKEN");
export const JWT_EXPIRES_IN_ACCESS_TOKEN = getEnv(
  "JWT_EXPIRES_IN_ACCESS_TOKEN"
);
export const GEMINI_API_KEY = getEnv("GEMINI_API_KEY");
