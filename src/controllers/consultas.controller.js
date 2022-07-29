import { getConection, queries } from "../database";

export const getConsultasById = async (req, res) => {
  const { patientId } = req.body;
  const pool = await getConection();
  const query = queries.getConsultaById + "'" + patientId + "'";
  const result = await pool.request().query(query);
  let consultas = result.recordset;
  let dateFormatted = consultas.map((element) => ({
    ...element,
    date: obtenerFecha(element.date),
  }));
  console.log(dateFormatted);
  res.send(dateFormatted);
};

export function obtenerFecha(fecha) {
  const date = new Date(fecha);
  let [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  let [hour, minutes, seconds] = [
    date.getHours() + date.getTimezoneOffset() / 60, //el ofset devuelve la diferencia en minutos
    date.getMinutes(),
    date.getSeconds(),
  ];
  if (hour < 10) hour = "0" + hour;
  if (minutes < 10) minutes = "0" + minutes;
  if (month < 10) month = "0" + month;
  const convertedDate =
    day + "/" + month + "/" + year + " - " + hour + ":" + minutes;
  return convertedDate;
}
