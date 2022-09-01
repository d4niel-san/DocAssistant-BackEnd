import { Router } from "express";

import {
  cargarHistoria,
  getConsultasById,
} from "../controllers/consultas.controller.js";
const router = Router();

router.post("/consultasPaciente", getConsultasById);
router.post("/cargarHistoria", cargarHistoria);

export default router;
