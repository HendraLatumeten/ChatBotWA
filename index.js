const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());
const API_KEY = "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";
const TWILIO_ACCOUNT_SID = "AC2482aaf1f6ec32773067df5e2e278287";
const TWILIO_AUTH_TOKEN = "0906dc8131c318870189e40e40e67a30";
const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const TWILIO_PHONE_NUMBER = "whatsapp:+14155238886";
// console.log(client);

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

// app.post(
//   "/whatsapp",
//   async (req, res) => {
//     const message = " halo ";

// request(
//   {
//     method: "POST",
//     uri: "https://api.openai.com/v1/engines/davinci/jobs",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${API_KEY}`,
//     },
//     json: {
//       prompt: message,
//     },
//   },
//   (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       const responseMessage = body.choices[0].text;
//   client.messages
//     .create({
//       to: "whatsapp:+6282261172997",
//       from: "whatsapp:+14155238886",
//       body: "responseMessage",
//     })
//     .then(() => {
//       res.status(200).end();
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).end();
//     });
// }
// }
// );

// });
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to chatBOT WA" });
});
app.post("/waBot", (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();
  const message = req.body.Body.toLowerCase();
  const from = req.body.From;

  if (message.includes("hello")) {
    twiml.message("Hello! How can I help you today?");
    client.messages.create({
      to: from,
      from: TWILIO_PHONE_NUMBER,
      body: "Hello! How can I help you today?",
    });
  } else if (message.includes("bye")) {
    twiml.message("Goodbye! Have a great day.");
    client.messages.create({
      to: from,
      from: TWILIO_PHONE_NUMBER,
      body: "Goodbye! Have a great day.",
    });
  } else {
    twiml.message(
      "I'm sorry, I didn't understand that. Could you please rephrase?"
    );
    client.messages.create({
      to: from,
      from: TWILIO_PHONE_NUMBER,
      body: "I'm sorry, I didn't understand that. Could you please rephrase?",
    });
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
