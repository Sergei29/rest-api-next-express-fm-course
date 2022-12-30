import { validationResult } from "express-validator";
import { RequestHandler } from "express";

/**
 * @description middleware to verify if there is any validation error returned from prev middleware
 * @param {Request} req request service object
 * @param {Response} res response service object
 * @param {NextFunction} next service Function to proceed to next
 * @returns {undefined} manipulates the incoming request
 */
export const handleInputErrors: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};
