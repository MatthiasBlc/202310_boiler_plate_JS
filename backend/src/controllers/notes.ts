import { RequestHandler } from "express";
import prisma from "../util/db";



export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({
      select: {
        id: true,
        title: true,
      },
    })
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
}

