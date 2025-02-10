import { Router } from "express";
import { signUp } from "./signUp";

const router = Router();

router.post("/signUp", signUp);

export default router;
