import express from "express";
import config from "./config";
import pacientesRoutes from "./routes/pacientes.routes";

const app = express();
const { port } = config;

app.set("port", port);
app.use(pacientesRoutes);

export default app;
