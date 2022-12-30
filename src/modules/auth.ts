import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createJWT = (user: Record<string, any>) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  return token;
};

/**
 * @description a middleware to protect routes by allowing the authenticated users only, and adds `req.user` property to the request object if user is authenticated
 * @param {Request} req request service object
 * @param {Response} res response service object
 * @param {NextFunction} next service Function to proceed to next
 * @returns {undefined} manipulates the incoming request
 */
export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const [_, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({ message: "Not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    (req as Record<string, any>).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not valid token" });
    return;
  }
};

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 5);

export const comparePasswords = (passsword: string, hashedPassword: string) =>
  bcrypt.compare(passsword, hashedPassword);
