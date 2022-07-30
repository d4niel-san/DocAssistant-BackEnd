import { getConection, queries } from "../database";

export const getConsultasById = async (req, res) => {
  const { patientId } = req.body;
  const pool = await getConection();
  const query = queries.getConsultaById + "'" + patientId + "'";
  const result = await pool.request().query(query);
  res.send(result.recordset);
};
