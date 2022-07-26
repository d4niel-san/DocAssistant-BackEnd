import express from "express";
import config from "./config";
import { addPacient } from "./controllers/pacientes.controller";
import pacientesRoutes from "./routes/pacientes.routes";
import consultasRoutes from "./routes/consultas.routes";

const cors = require("cors");

const app = express();
const { port } = config;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(pacientesRoutes);
app.use(consultasRoutes);

export default app;
