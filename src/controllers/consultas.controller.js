import { getConection, queries } from "../database";

export const getConsultasById = async (req, res) => {
  console.log("hola");
  const { patientId } = req.body;
  const pool = await getConection();
  const query = queries.getConsultaById + "'" + patientId + "'";
  console.log(query);
  const result = await pool.request().query(query);
  res.send(result.recordset);
};
