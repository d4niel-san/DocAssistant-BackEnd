import { getConection } from "../database";
import { addPaymentQuery, queries } from "../database";

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
  const query = `UPDATE Consultas SET register= '${historia}' where id=${id}`;
  const result = await pool
    .request()
    .query(query)
    .then(() => res.send(true));
}

export async function pagarConsulta(req, res) {
  const array = req.body;
  console.log(array);
  array.forEach((element) => {
    addpayment(element);
  });
  res.send(true);
}

async function addpayment(element) {
  const pool = await getConection();
  const query = addPaymentQuery(element);
  const result = await pool.request().query(query);
}
