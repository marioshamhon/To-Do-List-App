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
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_EXPIRES_IN = getEnv("JWT_EXPIRES_IN");
