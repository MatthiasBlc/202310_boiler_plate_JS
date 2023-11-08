import { RequestHandler } from "express";
import createHttpError from "http-errors";
import prisma from "../util/db";
import bcrypt from "bcrypt";


interface SignUpBody {
  username?: string,
  email?: string
  password?: string
}


export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing.");
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        username: true,
      },
    })

    if (existingUsername) {
      throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    })

    if (existingEmail) {
      throw createHttpError(409, "A user with this email adress already exist. Please log in instead.");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);


    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: passwordHashed,
      },
    });
    res.status(201).json(newUser);


  } catch (error) {
    next(error);
  }

}