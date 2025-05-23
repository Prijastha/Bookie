import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type LoginFormInputs = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });
export type SignupFormInputs = z.infer<typeof signupSchema>;

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required."),
  author: z.string().min(1, "Author is required."),
  genre: z.string().min(1, "Genre is required."),
  image: z.string().optional(),
  status: z.enum(["To Read", "Currently Reading", "Read"], {
    required_error: "Status is required",
  }),
});
export type BookFormInputs = z.infer<typeof bookSchema>;
