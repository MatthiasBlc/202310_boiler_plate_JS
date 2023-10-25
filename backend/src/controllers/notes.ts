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
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
      select: {
        id: true,
        title: true,
      },
    })
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}


export const createNote: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    const newNote = await prisma.note.create({
      data: {
        title: title,
        text: text,
      },
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }

};
