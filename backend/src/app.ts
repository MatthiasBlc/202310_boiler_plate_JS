import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import prisma from './util/db'



const app = express();

app.get("/", async (req, res, next) => {
  try {
    // throw Error("Crash Test");
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
});

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;