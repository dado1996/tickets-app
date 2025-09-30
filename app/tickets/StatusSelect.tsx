"use client";

import { Select } from "@/components/ui/select";
import { Ticket, TicketStatus } from "@prisma/client";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useRouter } from "next/navigation";

export function StatusSelect({ ticket }: { ticket: Ticket }) {
  const router = useRouter();

  async function handleStatusChange(status: TicketStatus) {
    await fetch(`/api/tickets/${ticket.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    router.refresh();
  }

  return (
    <Select defaultValue={ticket.status} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Change status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(TicketStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
