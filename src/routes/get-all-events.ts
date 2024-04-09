import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { title } from "process";

export async function getAllEvents(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events",
    {
      schema: {
        summary: "Get all events",
        tags: ["events"],
        response: {
          200: z.array(
            z.object({
              event: z.object({
                id: z.string().uuid(),
                title: z.string(),
                details: z.string().nullable(),
                maximumAttendees: z.number().int().nullable(),
                attendeesAmount: z.number().int(),
              }),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const events = await prisma.event.findMany({
        select: {
          id: true,
          title: true,
          details: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true,
            },
          },
        },
      });

      let eventsList = [];

      for (let i in events) {
        const eventIndex = events[i];

        let event = {
          event: {
            id: eventIndex.id,
            title: eventIndex.title,
            details: eventIndex.details,
            maximumAttendees: eventIndex.maximumAttendees,
            attendeesAmount: eventIndex._count.attendees,
          },
        };

        eventsList.push(event);
      }

      return reply.status(200).send(eventsList);
    }
  );
}
