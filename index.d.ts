import "express";

declare module "express" {
  interface Request {
    /** Populated by your JWT/auth middleware */
    userId?: string;
  }
}
