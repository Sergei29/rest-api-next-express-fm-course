import { Response } from "express";

export * from "./product";
export * from "./users";
export * from "./update";

export const handleError = (
  res: Response,
  error: any,
  defaultMessage = "An error occurred"
) => {
  const msg = error instanceof Error ? error.message : defaultMessage;
  res.status(400).json({ message: msg });
};
