import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  subject: z.string().trim().min(1, "Please add a subject.").max(150),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(5000, "Keep your message under 5,000 characters."),
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
