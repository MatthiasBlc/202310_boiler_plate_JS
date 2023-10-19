import "dotenv/config"
import env from "./util/validateEnv"
import express from "express";
import { PrismaClient } from '@prisma/client'


const app = express();
const prisma = new PrismaClient()
const port = env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World !");
});


async function main() {
  // const user = await prisma.user.create({ data: { name: "thomas"}})
  // console.log(user)
  console.log("server running on port" + port);

}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())

