import { PrismaClient } from "@prisma/client";
import { log } from "console";
import fastify from "fastify";
import { z } from "zod";

const app = fastify()
const prisma = new PrismaClient()


app.get('/', (request, reply) => {
  reply.send({ hello: "world" })
})

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  log(`🔥 Server is running in ${address}`)
})