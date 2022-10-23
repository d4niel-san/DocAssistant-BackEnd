const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { config } = require("dotenv");
config();
const idcliente =
  "1095309654407-8oqjrjf7ra6d9t1h9us9dqt9ebl4f2eq.apps.googleusercontent.com";
const clientsecret = process.env.CLIENTSECRET;

const oAuth2Client = new OAuth2(idcliente, clientsecret);

oAuth2Client.setCredentials({
  refresh_token:
    "4/0ARtbsJoW-pYVMQw6cOvBT8_qj5x55xbwWeLvinYQm2vCFIu-8guv2_hQphqB4h1Is5G45w",
});
console.error(oAuth2Client);

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
  summary: "api prueba",
  location: "Rivadavia 4893, Buenos Aires",
  description: "Lorem Ipsum",
  start: {
    dateTime: eventStartTime,
    timeZone: "America/Denver",
  },
  end: {
    dateTime: eventEndTime,
    timeZone: "America/Denver",
  },
  colorId: 1,
};

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: "America/Denver",
      items: [{ id: "primary" }],
    },
  },
  (err, res) => {
    if (err) return console.error("Free Busy Query Error: ", err);
    const eventArr = res.data.calendars.primary.busy;
    // Check if event array is empty which means we are not busy
    if (eventArr.length === 0)
      // If we are not busy create a new calendar event.
      return calendar.events.insert(
        { calendarId: "primary", resource: event },
        (err) => {
          // Check for errors and log them if they exist.
          if (err) return console.error("Error Creating Calender Event:", err);
          // Else log that the event was created.
          return console.log("Calendar event successfully created.");
        }
      );
    return console.log("Sorry I'm Busy");
  }
);
