import { getConection, sql, queries } from "../database";
import { getConsultasById } from "./consultas.controller";

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
  const consultas = await getConsultasById(result.recordset[0].Id);
  consultas.forEach((element) => {
    element.date = obtenerFecha(element.date);
  });
  const paciente = { ...result.recordset[0], consultas };
  paciente.DNI = formatDNI(paciente.DNI);
  paciente.Cell = formatCell(paciente.Cell);
  paciente.Id = formatId(paciente.Id);
  res.send(paciente);
};

function formatId(id) {
  let cant = id.toString().length;
  for (let i = cant; i < 6; i++) {
    id = "0" + id;
  }
  return id
}

function formatCell(unformattedCell) {
  let cell = unformattedCell.toString();
  cell = cell.slice(0, 2) + "-" + cell.slice(2, 6) + "-" + cell.slice(6);
  return cell;
}

function formatDNI(unformattedDNI) {
  let dni = unformattedDNI.toString();
  dni = dni.slice(0, 2) + "." + dni.slice(2, 5) + "." + dni.slice(5, 8);
  return dni;
}

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
  const dia = day + "/" + month + "/" + (year - 2000);
  /* const hora = hour + ":" + minutes;
  const convertedDate = dia + " - " + hora;
   */ return dia;
}

export const addPacient = async (req, res) => {
  const { firstName, lastName, email, dni, cell, ocupacion } = req.body;
  const validateReturn = validatePacient(req.body);
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
  const { id } = req.params;
  res.send(id);
};
