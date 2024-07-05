import User from "../models/UserSchema.js";
import Artist from "../models/ArtistSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import OtpSchema from "../models/OtpSchema.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const sendOTP = async ({ email }) => {
  // Create a transporter using Gmail service
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  const newOtp = new OtpSchema({ email, otp });
  await newOtp.save();

  // Define email options
  let mailOptions = {
    from: "Effortless Beauty <alishakhatri8888@gmail.com>",
    to: email,
    subject: "Your OTP Code",
    html: `
   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your OTP Code</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 20px 0;
      }
      .header img {
        max-width: 200px;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content h1 {
        color: #333333;
      }
      .content p {
        color: #666666;
        font-size: 16px;
      }
      .otp {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        font-size: 24px;
        color: #ffffff;
        background-color: #1f6f78;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 16px;
        color: #999999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/131/186/original/logo.png?1719898059"
          alt="Company Logo"
        />
      </div>
      <div class="content">
        <h1>Your OTP Code</h1>
        <p>
          Thank you for registering with us. To complete your registration,
          please use the following One-Time Passcode (OTP):
        </p>
        <div class="otp">${otp}</div>
      </div>
      <div class="footer">
        <p>If you did not request this code, please ignore this email.</p>
        <p>&copy; 2024 Effortless Beauty. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP",
      });
    }
    console.log("Email sent: " + info.response);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  });
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender, phone, location } =
    req.body;

  try {
    let user = null;

    if (role === "customer") {
      user = await User.findOne({ email });
    } else if (role === "artist") {
      user = await Artist.findOne({ email });
    }

    // Checking if user exists
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Check if the password meets the required criteria
    if (!isPasswordValid(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, including uppercase and lowercase letters, symbols, and numbers.",
      });
    }

    // Check if the email is valid
    if (!isEmailValid(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!isNameValid(name)) {
      return res.status(400).json({
        success: false,
        message: "Invalid name format",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "customer") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
        phone,
        location,
      });
    }

    // artist
    if (role === "artist") {
      user = new Artist({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
        phone,
        location,
      });
    }
    console.log("Saving user:", user);
    // Save user to the database
    const result = await user.save();
    await sendOTP({ email });

    // You can add a response here to indicate successful registration if needed
    res.status(200).json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error(err); // Log any errors
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" }); // Handle errors gracefully
  }
};

function isPasswordValid(password) {
  // Check if password length is at least 8 characters
  if (password.length < 8) {
    return false;
  }

  // Check if password contains at least one uppercase letter
  const uppercaseRegex = /[A-Z]/;
  if (!uppercaseRegex.test(password)) {
    return false;
  }

  // Check if password contains at least one lowercase letter
  const lowercaseRegex = /[a-z]/;
  if (!lowercaseRegex.test(password)) {
    return false;
  }

  // Check if password contains at least one symbol
  const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (!symbolRegex.test(password)) {
    return false;
  }

  // Check if password contains at least one number
  const numberRegex = /\d/;
  if (!numberRegex.test(password)) {
    return false;
  }

  return true;
}

function isEmailValid(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function isNameValid(name) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    const customer = await User.findOne({ email });
    const artist = await Artist.findOne({ email });

    if (customer) {
      user = customer;
    }
    if (artist) {
      user = artist;
    }

    // Check if user exists or not
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    if (!user.verified) {
      return res
        .status(402)
        .json({ success: false, message: "Please verify OTP first" });
    }
    // Generate and return a JWT token if login is successful
    const token = generateToken(user);

    console.log(user);
    const { password, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: { ...rest, role },
      role,
    });
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ success: false, message: "Failed to login" }); // Handle errors gracefully
  }
};

export const verifyOTP = async (req, res) => {
  const { otp, email } = req.body;
  console.log(req.body);

  try {
    let user = null;
    const constumer = await User.findOne({ email });
    const artist = await Artist.findOne({ email });

    if (constumer) {
      user = constumer;
    }
    if (artist) {
      user = artist;
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otpData = await OtpSchema.findOne({ email, otp });
    console.log("OTP DATA", otpData);

    if (!otpData) {
      return res.status(400).json({ success: false, message: "OTP not found" });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ success: true, message: "OTP verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};
