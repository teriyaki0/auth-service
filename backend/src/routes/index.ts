import { Router } from "express";
import { signUp } from "./signUp";
import { signIn } from "./signIn";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

export default router;
