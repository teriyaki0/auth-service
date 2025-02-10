import { AppContext } from "../lib/ctx";
import { HashUtil } from "../utils/hash.util";
import { JwtUtil } from "../utils/jwt.util";

export class AuthService {
  constructor(private ctx: AppContext) {}

  async register(email: string, password: string) {
    const passwordHash = await HashUtil.hashPassword(password);
    const user = await this.ctx.prisma.user.create({
      data: { email, password: passwordHash },
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.ctx.prisma.user.findUnique({ where: { email } });
    if (!user || !(await HashUtil.comparePassword(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const tokens = JwtUtil.generateTokens({ userId: user.id });
    await this.ctx.redis.set(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshToken(userId: string, token: string) {
    const storedToken = await this.ctx.redis.get(userId);
    if (storedToken !== token) throw new Error("Invalid refresh token");
    return JwtUtil.generateTokens({ userId });
  }
}
