require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.KEY,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: `Portfolio Enquiry from ${req.body.name}`,
    text: `Name: ${req.body.name} \nEmail: ${req.body.email} \nMessage: ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.sendFile(__dirname + "/confirmation.html");
      console.log(`email sent ${info.response}`);
    }
  });
});

app.post("/confirmation", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is now running on Port 3000");
});
