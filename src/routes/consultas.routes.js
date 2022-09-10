import { Router } from "express";

import {
  cargarHistoria,
  getConsultasById,
  pagarConsulta,
} from "../controllers/consultas.controller.js";
const router = Router();

router.post("/consultasPaciente", getConsultasById);
router.post("/cargarHistoria", cargarHistoria);
router.post("/pagarConsulta", pagarConsulta);

export default router;
