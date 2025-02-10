import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});
