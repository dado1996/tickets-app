"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { NewTicketForm } from "@/components/NewTicketForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { Ticket } from "@prisma/client";

export default withPageAuthRequired(function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    retrieveTickets();

    async function retrieveTickets() {
      const response = await fetch("/api/tickets");
      const tickets = await response.json();
      setTickets(tickets);
    }
  }, []);

  return (
    <div className="mx-auto container py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setOpenForm(true)}>New Ticket</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Ticket</DialogTitle>
            </DialogHeader>
            <NewTicketForm open={openForm} setOpen={setOpenForm} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={tickets} />
      <Link href="/">Home</Link>
    </div>
  );
});
