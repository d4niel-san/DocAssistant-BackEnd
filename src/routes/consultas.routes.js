import { Router } from "express";

import {
  cargarHistoria,
  getConsultasById,
  pagarConsulta,
  altaConsulta,
} from "../controllers/consultas.controller.js";
const router = Router();

router.post("/consultasPaciente", getConsultasById);
router.post("/cargarHistoria", cargarHistoria);
router.post("/pagarConsulta", pagarConsulta);
router.post("/newConsulta", altaConsulta);

export default router;
