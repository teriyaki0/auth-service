import { RequestHandler } from "express";
import { signUpSchema } from "./scheme";
import { HashUtil } from "../../utils/hash.util";
import { JwtUtil } from "../../utils/jwt.util";
import { config } from "../../lib/config";

export const signUp: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { email, password } = signUpSchema.parse(req.body);

    const existingUser = await req.ctx.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("Пользователь уже существует");
    }

    const hashedPassword = await HashUtil.hashPassword(password);

    const user = await req.ctx.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { accessToken, refreshToken } = JwtUtil.generateTokens({
      user,
    });

    await req.ctx.redis.set(refreshToken, user.id, {
      EX: Number(config.REFRESH_EXPIRES_IN),
    });

    res.status(201).json({
      message: "Пользователь зарегистрирован",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export type singUpType = ReturnType<typeof signUp>;
