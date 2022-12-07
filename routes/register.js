require("dotenv").config();
const uuid = require("uuid");
const nodemailer = require("nodemailer");
const Validator = require("fastest-validator");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const { user } = require("../models");
const validator = new Validator();

const registerRouter = async (req, res) => {
  let uuidBytes = uuid.parse(uuid.v4());
  let uuidDataString = uuid.stringify(uuidBytes);

  console.log("EMAILL : ", JSON.stringify(process.env.SMTP_EMAIL));

  const schema = {
    email: "string",
    password: "string",
  };

  var validate = validator.validate(req.body, schema);

  if (validate) validate = [];

  if (/(?=.*[0-9])/.test(req.body.password) === false) {
    validate.push({
      type: "validation",
      message: "must include number",
      field: "password",
    });
  } else if (/(?=.*[a-z])/.test(req.body.password) === false) {
    validate.push({
      type: "validation",
      message: "must include lowercase letter",
      field: "password",
    });
  } else if (/(?=.*[A-Z])/.test(req.body.password) === false) {
    validate.push({
      type: "validation",
      message: "must include uppercase letter",
      field: "password",
    });
  } else if (/(?=.*\W)(?!.* )/.test(req.body.password) === false) {
    validate.push({
      type: "validation",
      message: "must include special character",
      field: "password",
    });
  } else if (/.{8,}/.test(req.body.password) === false) {
    validate.push({
      type: "validation",
      message: "must at least 8 character",
      field: "password",
    });
  }

  if (validate.length > 0) {
    return res.status(400).json({ errors: validate });
  }

  var register;

  try {
    register = await user.create({
      id: uuidDataString,
      email: req.body.email,
      password: req.body.password,
    });

    transporter
      .sendMail({
        from: process.env.SMTP_EMAIL,
        to: req.body.email,
        subject: "Registration Success",
        text:
          "You successfully registered an account with email " + req.body.email,
      })
      .then((info) => {
        console.log({ info });
        testNumber++;
      })
      .catch(console.error);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: "user with email " + req.body.email + " already registered",
      });
    }
  }

  res.json(register);
};

module.exports = registerRouter;
