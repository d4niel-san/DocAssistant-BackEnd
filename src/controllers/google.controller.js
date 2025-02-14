import { oauth2 } from "googleapis/build/src/apis/oauth2";
import { getPacienteById } from "./pacientes.controller";

const { google } = require("googleapis");

const GOOGLE_CLIENT_ID = process.env.IDCLIENTE;
const GOOGLE_CLIENT_SECRET = process.env.CLIENTSECRET;
let USER_REFRESH_TOKEN = process.env.USER_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:3000"
);

export const createToken = async (req, res) => {
  const { code } = req.body;
  const { tokens } = await oAuth2Client.getToken(code);
  if (tokens.refresh_token !== null) {
    USER_REFRESH_TOKEN = tokens.refresh_token;
    console.log("Refresh Token actualizado: ", tokens.refresh_token);
  }
  res.send(tokens);
  /* createEvent(); */
};

export const GEventConstructor = async (consulta, paciente) => {
  const summary = `Consulta medica con ${consulta.patientName}`;
  const description = `Enlace de videollamada: ${consulta.link}`;
  const location = "Bs. As. Argentina";
  const colorId = "7";
  const start = { dateTime: new Date(consulta.dayHour) };
  const end = { dateTime: new Date(consulta.endTime) };
  const sendUpdates = "all";
  const attendee = { displayName: paciente[0].FirstName, email: paciente[0].Email };
  let attendees
  attendees = [attendee] 
  const evento = {
    summary,
    description,
    location,
    colorId,
    start,
    end,
    sendUpdates,
    attendees,
  };
  createEvent(evento);
};

export const createEvent = async (event) => {
  oAuth2Client.setCredentials({ refresh_token: USER_REFRESH_TOKEN });
  const calendar = google.calendar("v3");
  const response = await calendar.events.insert({
    auth: oAuth2Client,
    calendarId:
      "846b2948edc69305044ca49eb9b3592ffd54629d4a95197bf611925542f4e376@group.calendar.google.com",
    requestBody: event,
  });
};

/*
Color Id:
1: Blue
2: Green
3: Purple
4: Red
5: Yellow
6: Orange
7: Turquoise
8: Gray
9: Bold Blue
10: Bold Green
11: Bold Red
*/
