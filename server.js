const serverConfig = require("./server.config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();

app.use(serveStatic(path.join(__dirname, "dist")));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    serverConfig.mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(error => console.log(error));

let Schema = mongoose.Schema;
let recordSchema = new Schema({
  date: String,
  weight: String,
  notes: String
});

let Record = mongoose.model("Record", recordSchema);

app.post("/api/get", (req, res) => {
  Record.find({}, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

app.post("/api/delete", (req, res) => {
  if (req.body.id) {
    Record.deleteOne({ _id: req.body.id }, err => {
      if (err) return handleError(err);
      res.send("record deleted");
    });
  } else {
    Record.deleteMany({}, () => {
      res.send("all data deleted");
    });
  }
});

app.post("/api/update", (req, res) => {
  Record.updateOne(
    { _id: req.body.id },
    { date: req.body.date, weight: req.body.weight, notes: req.body.notes },
    () => {
      res.send("record updated");
    }
  );
});

app.post("/api/save", (req, res) => {
  if (!req.body.id) {
    let record = Record(req.body);
    record.save(() => {
      res.send("record saved");
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log("api running on port " + port + ": ");
