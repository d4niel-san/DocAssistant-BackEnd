import { Router } from "express";
import { addPacient, getPacientes } from "../controllers/pacientes.controller";

const router = Router();

router.get("/pacientes", getPacientes);
router.post("/pacientes", addPacient);
router.get("/pacientes", getPacientes);
router.delete("/pacientes", getPacientes);
router.put("/pacientes", getPacientes);

export default router;
