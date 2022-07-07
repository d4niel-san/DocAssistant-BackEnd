export const queries = {
  getAllPacients: "SELECT * FROM Pacientes",
  insertPacient:
    "INSERT INTO Pacientes (firstName, lastName, email, dni, cell) VALUES (@firstName, @lastName, @email, @dni, @cell)",
};
