import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

type SignUpData = z.infer<typeof signUpSchema>;

export const validateSignUp = (data: SignUpData): SignUpData => {
  const parsed = signUpSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
  }
  return parsed.data;
};
