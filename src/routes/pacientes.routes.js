import { Router } from "express";
import { getPacientes } from "../controllers/pacientes.controller";

const router = Router();

router.get("/pacientes", getPacientes);
router.post("/pacientes", getPacientes);
router.get("/pacientes", getPacientes);
router.delete("/pacientes", getPacientes);
router.put("/pacientes", getPacientes);

export default router;
