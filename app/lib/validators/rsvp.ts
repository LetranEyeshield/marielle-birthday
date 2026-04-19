import { z } from "zod";

export const RSVPValidator = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.email().optional(),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(2, "Address requires at least 2 characters"),
  attending: z.string().min(1, "Please select if you will attend"),
  guests: z.number().min(0, "Select at least 1"),
  message: z.string().min(2, "Message requires at least 2 characters"),
});