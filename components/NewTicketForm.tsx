"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  type: z.enum(["BUG", "FEATURE", "QUESTION"]),
});

export function NewTicketForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", priority: "MEDIUM", type: "BUG" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch("/api/tickets", {
      method: "POST",
      body: JSON.stringify(values),
    });
    setOpen(false);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-8 ${open ? "visible" : "invisible"}`}
      >
        <FormField
          name="title"
          render={() => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <input type="text" name="title" id="title" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="description"
          render={() => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <textarea name="description" id="description" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="priority"
          render={() => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <input type="text" name="priority" id="priority" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="type"
          render={() => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <input type="text" name="type" id="type" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
}
