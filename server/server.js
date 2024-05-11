const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// POST endpoint to handle form submissions
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure your email provider here
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "New message from your website",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log("Email sent successfully");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending email:", error);
    res.sendStatus(500);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
