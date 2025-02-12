import jwt from "jsonwebtoken";
import { config } from "../lib/config";

export class JwtUtil {
  static generateTokens(payload: object) {
    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, config.REFRESH_SECRET, {
      expiresIn: config.REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, config.REFRESH_SECRET);
  }
}
