var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var registerRouter = require("./routes/register");
var app = express();

const cors = require("cors");
const corsOptions = {
  credentials: true,
  origin: true,
};
app.use(cors(corsOptions));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/register", registerRouter);

module.exports = app;
app.listen("8081");
