import { getConection, queries } from "../database";

export async function getConsultasById(patientId) {
  const pool = await getConection();
  const query =
    queries.getConsultaById + "'" + patientId + "'" + queries.orderByDate;
  const result = await pool.request().query(query);
  return result.recordset;
}
