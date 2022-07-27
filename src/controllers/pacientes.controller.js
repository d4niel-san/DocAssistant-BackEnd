import { getConection, sql, queries } from "../database";

export const getPacientes = async (req, res) => {
  const pool = await getConection();
  const result = await pool.request().query(queries.getAllPacients);
  res.json(result.recordset);
};

export const getPaciente = async (req, res) => {
  const { filter, data } = req.body;
  const pool = await getConection();
  const query = queries.getPatientBy + filter + " = '" + data + "'";
  const result = await pool.request().query(query);
  let consultas = await getConsultasById(result.recordset[0].Id);

  /*consultas.forEach((element) => {
    element.date = obtenerFecha(element.date);
  });
*/
  console.log(consultas);
  obtenerFecha(consultas[0].date);
  res.send({ ...result.recordset[0], consultas });
};

function obtenerFecha(fecha) {
  console.log("fecha: ", fecha.toString()); //consultas[0].date);
  const date = new Date(fecha);
  console.log("date: ", date.toString()); //consultas[0].date);
  let [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  let [hour, minutes, seconds] = [
    date.getHours() - date.getTimezoneOffset() / 60, //el ofset devuelve la diferencia en minutos
    date.getMinutes(),
    date.getSeconds(),
  ];
  if (hour < 10) hour = "0" + hour;
  if (minutes < 10) minutes = "0" + minutes;
  if (month < 10) month = "0" + month;
  //console.log(day + "/" + month + "/" + year);
  //console.log(hour + ":" + minutes);
  const convertedDate =
    day + "/" + month + "/" + year + " - " + hour + ":" + minutes;
  console.log(convertedDate);
  return convertedDate;
}

async function getConsultasById(patientId) {
  const pool = await getConection();
  const query = queries.getConsultaById + "'" + patientId + "'";
  const result = await pool.request().query(query);
  return result.recordset;
}

export const addPacient = async (req, res) => {
  const { firstName, lastName, email, dni, cell, ocupacion } = req.body;
  const validateReturn = validatePacient(req.body);
  console.log(ocupacion);
  if (validateReturn != true) {
    return res.status(400).json({ msg: { validateReturn } });
  }
  try {
    const pool = await getConection();
    await pool
      .request()
      .input("firstName", sql.VarChar, firstName)
      .input("lastName", sql.VarChar, lastName)
      .input("ocupacion", sql.VarChar, ocupacion)
      .input("email", sql.VarChar, email)
      .input("dni", sql.Numeric, dni)
      .input("cell", sql.Numeric, cell)
      .query(queries.insertPacient);
    return res.send(true);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const validatePacient = (pacient) => {
  const { body, validationResult } = require("express-validator");
  if (
    !pacient.firstName ||
    !pacient.lastName ||
    !pacient.dni ||
    !pacient.cell ||
    !pacient.email
  ) {
    return "Bad Request. Please Fill all fields";
  }

  if (
    isNaN(parseInt(pacient.cell, 10)) ||
    !body(parseInt(pacient.cell, 10)).isLength({ min: 10 })
  ) {
    return "Nro de celular erroneo";
  }

  if (
    isNaN(parseInt(pacient.dni, 10)) ||
    !body(parseInt(pacient.dni, 10)).isLength({ min: 8 })
  ) {
    return "Nro de documento erroneo";
  }

  if (!body(pacient.email).isEmail()) {
    return "email erroneo";
  }
  return true;
};

export const getPacientsById = async (req, res) => {
  console.log("entre");
  const { id } = req.params;
  res.send(id);
};
