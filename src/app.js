import express from "express";
import config from "./config";
import consultasRoutes from "./routes/consultas.routes";
import pacientesRoutes from "./routes/pacientes.routes";

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
