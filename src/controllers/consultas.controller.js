import { getConection, queries } from "../database";

export async function getConsultasById(patientId) {
  const pool = await getConection();
  const query =
    queries.getConsultaById + "'" + patientId + "'" + queries.orderByDate;
  const result = await pool.request().query(query);
  return result.recordset;
}

export async function cargarHistoria(req, res) {
  const { historia, id } = req.body;
  const pool = await getConection();

  console.log(historia, id);
  const query = `UPDATE Consultas SET register= '${historia}' where id=${id}`;
  const result = await pool
    .request()
    .query(query)
    .then(() => res.send(true));
}
