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
  console.log(query);
  const result = await pool.request().query(query);
  res.send(result.recordset);
};

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
