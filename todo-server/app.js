var express = require("express");

var app = express();

require("dotenv").config();

require("./setupMongo")();

app.use(express.json());

//app.use(function (req, res, next) {
//    req.traceId = uuidv4();
//    next();
//});

app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

module.exports = app;
