import { Router } from "express";
import { signUp } from "./signUp";
import { signIn } from "./signIn";
import { checkAuth } from "../lib/auth.check";
import { me } from "./getMe";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

router.get("/me", checkAuth, me);

export default router;
