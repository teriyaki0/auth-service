import express from "express";
import { AuthService } from "../services/auth.service";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await new AuthService(req.ctx).register(
      req.body.email,
      req.body.password
    );
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const tokens = await new AuthService(req.ctx).login(
      req.body.email,
      req.body.password
    );
    res.json(tokens);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
