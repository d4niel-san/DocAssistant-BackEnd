export const queries = {
  getAllPacients: "SELECT * FROM Pacientes",
  insertPacient:
    "INSERT INTO Pacientes (firstName, lastName, email, dni, cell, ocupacion) VALUES (@firstName, @lastName, @email, @dni, @cell, @ocupacion)",
  getPatientBy: "SELECT * FROM Pacientes WHERE ",
};
