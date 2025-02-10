import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const configSchema = z.object({
  HTTP_HOST: z.string().default("localhost"),
  HTTP_PORT: z.coerce.number().int().positive().default(8000),

  DATABASE_URL: z.string().url("Некорректный URL базы данных"),

  REDIS_HOST: z.string().min(1, "REDIS_HOST не может быть пустым"),
  REDIS_PORT: z.coerce
    .number()
    .int()
    .positive("REDIS_PORT должен быть положительным числом"),

  JWT_SECRET: z.string().min(10, "JWT_SECRET слишком короткий"),
  JWT_EXPIRES_IN: z
    .string()
    .regex(/^\d+[smhd]$/, "Формат времени: 10s, 5m, 2h, 7d"),

  REFRESH_SECRET: z.string().min(10, "REFRESH_SECRET слишком короткий"),
  REFRESH_EXPIRES_IN: z
    .string()
    .regex(/^\d+[smhd]$/, "Формат времени: 10s, 5m, 2h, 7d"),
});

export const config = configSchema.parse(process.env);
