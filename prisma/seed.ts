// prisma/seed.ts
import {
  PrismaClient,
  TicketStatus,
  TicketType,
  TicketPriority,
} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");
  await prisma.ticket.create({
    data: {
      title: "Login button not working on Safari",
      description:
        "Users on Safari are reporting that the login button is unresponsive.",
      type: TicketType.BUG,
      status: TicketStatus.OPEN,
      priority: TicketPriority.HIGH,
    },
  });
  // ... add more tickets
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
