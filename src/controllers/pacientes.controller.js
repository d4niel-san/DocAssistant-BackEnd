import { getConection, sql } from "../database/connection";

export const getPacientes = async (req, res) => {
  const sql = "SELECT * FROM Pacientes";
  const pool = await getConection();
  const result = await pool.request().query(sql);
  res.json(result.recordset);
};

export const addPacient = async (req, res) => {
  const { firstName, lastName, email, dni, cell } = req.body.paciente;
  const validateReturn = validatePacient(req.body.paciente);
  if (!validateReturn) {
    console.log(validateReturn);
    return res.status(400).json({ msg: validateReturn });
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
    .finally(console.log("all goooood!!!"));
  //res.json("Agregar paciente");
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

  if (isNaN(pacient.cell) || body(pacient.cell).isLength({ min: 8 })) {
    return "Nro de celular erroneo";
  }

  if (isNaN(pacient.dni) || body(pacient.dni).isLength({ min: 8 })) {
    return "Nro de documento erroneo";
  }

  if (!body(pacient.email).isEmail()) {
    return "email erroneo";
  }
  return true;
};
