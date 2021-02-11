// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date(Date.now()).toUTCString() });
});

app.get("/api/timestamp/:date", (req, res) => {
  let var_date = req.params.date;
  let int_date = parseInt(var_date);
  let output = {};

  if (/\d{5,}/.test(var_date)) {
    output = {
      unix: int_date,
      utc: new Date(int_date).toUTCString(),
    };
  } else {
    let obj_date = new Date(var_date);

    if (obj_date.toString() === "Invalid Date") {
      output = { error: "Invalid Date" };
    } else {
      output = {
        unix: obj_date.valueOf(),
        utc: obj_date.toUTCString(),
      };
    }
  }

  res.json(output);
});

// listen for requests :)
process.env.PORT = 3000;
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
