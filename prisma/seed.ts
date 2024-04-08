import { prisma } from "../src/lib/prisma";
async function seed() {
  await prisma.event.create({
    data: {
      id: "6d7c09ff-9d7c-430a-b846-d3727a63cd25",
      title: "Evento teste",
      slug: "evento-teste",
      details: "um evento para teste",
      maximumAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
