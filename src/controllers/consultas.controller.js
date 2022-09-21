import { getConection } from "../database";
import { addPaymentQuery, sql, queries } from "../database";

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
  /* console.log(array); */
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

export async function altaConsulta(req, res) {
  const pool = await getConection();
  const query = queries.insertConsulta;
  const newConsulta = req.body;
  console.log(newConsulta);
  console.log(query);
  try {
    await pool
      .request()
      .input("patientId", sql.Numeric, newConsulta.patientId)
      .input("date", sql.DateTime2, newConsulta.dayHour)
      .input("amount", sql.Numeric, newConsulta.amount)
      .input("payed", sql.Bit, newConsulta.payed)
      .input("link", sql.VarChar, newConsulta.link)
      .query(queries.insertConsulta);
    return res.send(true);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

//Front envia: 2022-09-21T10:41
//Back recibe: 2022-02-26T10:10:00.000Z
