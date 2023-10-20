import "dotenv/config"
import express from "express";
import prisma from './util/db'



const app = express();

app.get("/", async (req, res) => {
  const notes = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
    },
  })
  res.status(200).json(notes);
  // res.send(notes);
  // res.send("Hello World !");
});


export default app;