export const queries = {
  getAllPacients: "SELECT * FROM Pacientes",
  insertPacient:
    "INSERT INTO Pacientes (firstName, lastName, email, dni, cell, ocupacion) VALUES (@firstName, @lastName, @email, @dni, @cell, @ocupacion)",
  getPatientBy: "SELECT * FROM Pacientes WHERE ",

  insertConsulta:
    "INSERT INTO consultas (patientId, date, payed, register) VALUES (15, CURRENT_TIMESTAMP, 0, 'Esto es una pruebaaaa')",
  getConsultaById: "SELECT * FROM Consultas WHERE patientId=",
};
