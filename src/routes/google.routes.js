import { Router } from "express";
import { createToken } from "../controllers/google.controller";

const router = Router();

router.post("/create-tokens", createToken);

export default router;
