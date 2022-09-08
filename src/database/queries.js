export const queries = {
  getAllPacients: "SELECT * FROM Pacientes",
  insertPacient:
    "INSERT INTO Pacientes (firstName, lastName, email, dni, cell, ocupacion) VALUES (@firstName, @lastName, @email, @dni, @cell, @ocupacion)",
  getPatientBy: "SELECT * FROM Pacientes WHERE ",

  insertConsulta:
    "INSERT INTO consultas (patientId, date, payed, register) VALUES (15, select convert(varchar, current_timestamp, 113), 0, 'Esto es una pruebaaaa')",
  getConsultaById: "SELECT * FROM Consultas WHERE patientId=",
  orderByDate: " ORDER BY date DESC;",
};
