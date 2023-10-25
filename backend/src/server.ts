import app from "./app";
import env from "./util/validateEnv";
// import { PrismaClient } from '@prisma/client';
import prisma from './util/db'

// const prisma = new PrismaClient()
const port = env.PORT;



async function main() {
  await app.listen(port, () => {
    console.log(`server running on port: ${port}!`);
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())

