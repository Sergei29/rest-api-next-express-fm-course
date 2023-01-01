import { RequestHandler } from "express";

import { hashPassword, comparePasswords, createJWT } from "../modules/auth";
import { errorTypes } from "../constants";
import prisma from "../db";

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPw = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPw,
      },
    });
    const userInfo = { id: user.id, username: user.username };
    const token = createJWT(userInfo);

    res.status(200).json({ token });
    return;
  } catch (error) {
    error.type = errorTypes.signupFailed;
    next(error);
    return;
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatching = await comparePasswords(password, user.password);
    if (!isPasswordMatching) {
      throw new Error("Wrong credentials");
    }

    const userInfo = { id: user.id, username: user.username };
    const token = createJWT(userInfo);

    res.status(200).json({ token });
    return;
  } catch (error) {
    error.type = errorTypes.authFailed;
    next(error);
    return;
  }
};
