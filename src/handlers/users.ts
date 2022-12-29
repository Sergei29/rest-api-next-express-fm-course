import { Request, Response } from "express";

import { hashPassword, comparePasswords, createJWT } from "../modules/auth";
import prisma from "../db";

export const createNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: "No credentials provided" });
    return;
  }

  try {
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
    res.status(401).json({ message: "Signup failed." });
    return;
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: "No credentials provided" });
    return;
  }

  try {
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
    const msg =
      error instanceof Error ? error.message : "Authentication failed";
    res.status(401).json({ message: msg });
    return;
  }
};
