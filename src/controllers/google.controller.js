import { oauth2 } from "googleapis/build/src/apis/oauth2";

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
  console.log(tokens);
  console.log(tokens.refresh_token);
  console.log(tokens.refresh_token === true);

  if (tokens.refresh_token !== null) {
    USER_REFRESH_TOKEN = tokens.refresh_token;
    console.log("Refresh Token actualizado: ", tokens.refresh_token);
  }
  res.send(tokens);
  createEvent();
};

export const createEvent = async () => {
  oAuth2Client.setCredentials({ refresh_token: USER_REFRESH_TOKEN });
  const calendar = google.calendar("v3");
  const response = await calendar.events.insert({
    auth: oAuth2Client,
    calendarId: "primary",
    requestBody: {
      summary: "Prueba de Apidany",
      description: "Es ist eine test",
      location: "Bs. As. Argentina",
      colorId: "7",
      start: { dateTime: new Date("Sun Oct 23 2022 15:30:57 GMT-0300") },
      end: { dateTime: new Date("Sun Oct 23 2022 17:30:57 GMT-0300") },
    },
  });
  console.log(response);
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
