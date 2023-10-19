import app from "./app";
import env from "./util/validateEnv";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()
const port = env.PORT;



async function main() {
  // const user = await prisma.user.create({ data: { name: "thomas"}})
  // console.log(user)

  app.listen(port, () => {
    console.log("server running on port: " + port);
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())

