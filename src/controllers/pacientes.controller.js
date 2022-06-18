import { getConection, sql } from "../database/connection";

export const getPacientes = async (req, res) => {
  const sql = "SELECT * FROM Pacientes";
  const pool = await getConection();
  const result = await pool.request().query(sql);
  res.json(result.recordset);
};

export const addPacient = async (req, res) => {
  const { firstName, lastName, email, dni, cell } = req.body;
  const validateReturn = validatePacient(req.body);
  console.log(validateReturn);
  if (validateReturn != true) {
    return res.status(400).json({ msg: { validateReturn } });
  }
  const pool = await getConection();
  const query =
    "INSERT INTO Pacientes (firstName, lastName, email, dni, cell) VALUES (@firstName, @lastName, @email, @dni, @cell)";
  await pool
    .request()
    .input("firstName", sql.VarChar, firstName)
    .input("lastName", sql.VarChar, lastName)
    .input("email", sql.VarChar, email)
    .input("dni", sql.Numeric, dni)
    .input("cell", sql.Numeric, cell)
    .query(query)
    .finally(res.send(true));
};

export const validatePacient = (pacient) => {
  const { body, validationResult } = require("express-validator");

  console.log(parseInt(pacient.cell, 10));

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
