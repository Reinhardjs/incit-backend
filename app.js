var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var registerRouter = require("./routes/register");
const deleteAllRouter = require("./routes/deleteAll");

const corsOptions = {
  credentials: true,
  origin: true,
};
const cors = require("cors");
const app = express();
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
app.delete("/deleteAll", deleteAllRouter);

module.exports = app;
app.listen("8081");
