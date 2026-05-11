import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  date: z.string().min(1, "Select a preferred date"),
  time: z.string().min(1, "Select a preferred time"),
  visitors: z.coerce.number().min(1, "At least 1 visitor").max(20),
  message: z.string().max(800).optional(),
});
export type BookingValues = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  subject: z.string().trim().min(2, "Subject is required").max(120),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1500),
});
export type ContactValues = z.infer<typeof contactSchema>;
