const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

export default (app, http) => {

  const port = process.env.PORT || 80;

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(cors());

  let Schema = mongoose.Schema;
  let recordSchema = new Schema({
    date: String,
    weight: String,
    notes: String
  });

  let Record = mongoose.model("Record", recordSchema);

  app.use(bodyParser.json());

  app.post("/api/get", (req, res) => {
    mongoose
      .connect(
        "mongodb+srv://calwen:calwen@cluster0-uq0qw.mongodb.net/weight-tracker?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .catch(error => console.log(error));

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
    mongoose
      .connect(
        "mongodb+srv://calwen:calwen@cluster0-uq0qw.mongodb.net/weight-tracker?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .catch(error => console.log(error));
    Record.updateOne(
      { _id: req.body.id },
      { date: req.body.date, weight: req.body.weight, notes: req.body.notes },
      () => {
        res.send("record updated");
      }
    );
  });

  app.post("/api/save", (req, res) => {
    mongoose
      .connect(
        "mongodb+srv://calwen:calwen@cluster0-uq0qw.mongodb.net/weight-tracker?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .catch(error => console.log(error));
    if (!req.body.id) {
      let record = Record(req.body);
      record.save(() => {
        res.send("record saved");
        mongoose.connection.close();
      });
    }
  });
};
