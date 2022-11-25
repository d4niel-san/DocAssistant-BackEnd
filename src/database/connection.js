//#region Imports
import sql from "mssql";
import config from "../config";

//#endregion
const { user, password, server, database } = config;

const dbSettings = {
  user,
  password,
  server,
  database,
  options: {
    encrypt: true, 
    trustServerCertificate: true,
  },
};

export async function getConection() {
  try {
    const pool = await sql
      .connect(dbSettings)
      .finally(() => console.log("Connected"));
    return pool;
  } catch (error) {
    console.error(error);
  }
}

export { sql };
