import {
  prisma
} from "./chunk-P56FXF2G.mjs";

// src/routes/get-all-events.ts
import { z } from "zod";
async function getAllEvents(app) {
  app.withTypeProvider().get(
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
                attendeesAmount: z.number().int()
              })
            })
          )
        }
      }
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
              attendees: true
            }
          }
        }
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
            attendeesAmount: eventIndex._count.attendees
          }
        };
        eventsList.push(event);
      }
      return reply.status(200).send(eventsList);
    }
  );
}

export {
  getAllEvents
};
