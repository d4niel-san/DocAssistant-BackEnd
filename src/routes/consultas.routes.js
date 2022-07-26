import { Router } from "express";

import { getConsultasById } from "../controllers/consultas.controller.js";
const router = Router();

router.post("/consultasPaciente", getConsultasById);

export default router;
