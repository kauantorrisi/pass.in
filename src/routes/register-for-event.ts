import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function registerForEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events/:eventId/attendees", // :eventId significa um Route Params
    {
      schema: {
        summary: "Register an attendee",
        tags: ["attendees"],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),
        params: z.object({
          // Como quero receber os params na URL
          eventId: z.string().uuid(),
        }),
        response: {
          // Como vou passar a reply (reposta)
          201: z.object({
            attendeeId: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;

      const attendeeFromEmail = await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            email,
            eventId,
          },
        },
      });

      if (attendeeFromEmail !== null) {
        reply.status(400);
        throw new Error("This e-mail is already registered for this event.");
      }

      // roda as duas juntas, invés de uma ter que esperar pela outra, afinal
      // uma nao depende da outra
      const [event, amountOfAttendeesForEvent] = await Promise.all([
        prisma.event.findUnique({
          where: {
            id: eventId,
          },
        }),

        prisma.attendee.count({
          where: {
            eventId,
          },
        }),
      ]);

      if (
        event?.maximumAttendees &&
        amountOfAttendeesForEvent >= event?.maximumAttendees
      ) {
        throw new Error(
          "The maximum number of attendees for this event has been reached."
        );
      }

      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId,
        },
      });

      return reply.status(201).send({ attendeeId: attendee.id });
    }
  );
}
