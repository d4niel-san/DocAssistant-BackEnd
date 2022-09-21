const queries = {
  getAllPacients: "SELECT * FROM Pacientes",
  insertPacient:
    "INSERT INTO Pacientes (firstName, lastName, email, dni, cell, ocupacion) VALUES (@firstName, @lastName, @email, @dni, @cell, @ocupacion)",
  insertConsulta:
    "INSERT INTO Consultas (patientId, date, amount, payed, link) VALUES (@patientId, @date, @amount, @payed, @link)",
  getPatientBy: "SELECT * FROM Pacientes WHERE ",

  /* insertConsulta:
    "INSERT INTO consultas (patientId, date, payed, register) VALUES (15, select convert(varchar, current_timestamp, 113), 0, 'Esto es una pruebaaaa')", */
  getConsultaById: "SELECT * FROM Consultas WHERE patientId=",
  orderByDate: " ORDER BY date DESC;",
};

function addPaymentQuery(element) {
  return `UPDATE Consultas SET payed= '${element.payed}' where id= ${element.Id}`;
}

export { addPaymentQuery, queries };
