import { RequestHandler } from "express";

export const me: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const user = await req.ctx.prisma.user.findUnique({
      where: { id: req.me!.id },
    });

    if (!user) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
