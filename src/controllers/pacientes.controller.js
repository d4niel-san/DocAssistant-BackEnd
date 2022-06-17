import { getConection } from "../database/connection";

export const getPacientes = async (req, res) => {
  const sql = "SELECT * FROM Pacientes";
  const pool = await getConection();
  const result = await pool.request().query(sql);
  res.json(result);
};
