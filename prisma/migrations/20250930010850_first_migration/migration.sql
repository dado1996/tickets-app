-- CreateEnum
CREATE TYPE "public"."TicketType" AS ENUM ('BUG', 'FEATURE', 'QUESTION');

-- CreateEnum
CREATE TYPE "public"."TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "public"."TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "public"."tickets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "external_id" TEXT,
    "description" TEXT,
    "type" "public"."TicketType" NOT NULL,
    "status" "public"."TicketStatus" NOT NULL,
    "priority" "public"."TicketPriority" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolved_at" TIMESTAMP(3),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_external_id_key" ON "public"."tickets"("external_id");

-- CreateIndex
CREATE INDEX "tickets_status_type_idx" ON "public"."tickets"("status", "type");
