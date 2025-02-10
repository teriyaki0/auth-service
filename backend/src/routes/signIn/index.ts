import { RequestHandler } from "express";
import { config } from "src/lib/config";
import { HashUtil } from "src/utils/hash.util";
import { JwtUtil } from "src/utils/jwt.util";

export const signIn: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await req.ctx.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const isPasswordValid = await HashUtil.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Неверный пароль или имя пользователя");
    }

    const { accessToken, refreshToken } = JwtUtil.generateTokens({
      user,
    });

    await req.ctx.redis.set(refreshToken, user.id, {
      EX: Number(config.REFRESH_EXPIRES_IN),
    });

    res.status(200).json({
      message: "Вход выполнен успешно",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
