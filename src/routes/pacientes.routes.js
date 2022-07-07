import { Router } from "express";
import {
  addPacient,
  getPacientes,
  getPacientsById,
} from "../controllers/pacientes.controller";

const router = Router();

router.get("/pacientes/:id", getPacientsById);
router.get("/pacientes", getPacientes);

router.post("/pacientes", addPacient);

router.delete("/pacientes", getPacientes);

router.put("/pacientes", getPacientes);

export default router;
