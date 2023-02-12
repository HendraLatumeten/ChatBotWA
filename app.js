const express = require("express");
const request = require("request");
const twilio = require("twilio");

const app = express();
const API_KEY = "your_openai_api_key";
const twilioAccountSid = "SK46dc8aaee122e5ff18779dc90c201821";
const twilioAuthToken = "hY5NWe349zltNzzUrNBifuiGhAnhOsFz";
const client = new twilio(twilioAccountSid, twilioAuthToken);

app.post("/whatsapp", (req, res) => {
  const message = req.body.Body;
  request(
    {
      method: "POST",
      uri: "https://api.openai.com/v1/engines/davinci/jobs",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      json: {
        prompt: message,
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const responseMessage = body.choices[0].text;
        client.messages
          .create({
            to: req.body.From,
            from: "+14155238886",
            body: responseMessage,
          })
          .then(() => {
            res.status(200).end();
          })
          .catch((err) => {
            console.error(err);
            res.status(500).end();
          });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
