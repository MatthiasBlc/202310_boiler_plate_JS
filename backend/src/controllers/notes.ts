import { RequestHandler } from "express";
import prisma from "../util/db";
import createHttpError from "http-errors";



export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({
      select: {
        id: true,
        title: true,
        text: true,
        createdAt: true,
        updatedAT: true,
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
        text: true,
        createdAt: true,
        updatedAT: true,
      },
    })

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

interface CreateNoteBody {
  title?: string,
  text?: string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title || !text) {
      throw createHttpError(400, "Note must have a title and a text");
    }
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

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string,
  text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!newTitle || !newText) {
      throw createHttpError(400, "Note must have a title and a text");
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        title: newTitle,
        text: newText,
      }
    })

    if (!updatedNote) {
      throw createHttpError(404, "Note not found");
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }

};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const note = await prisma.note.delete({
      where: { id: noteId },
    })

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);

  }

};
