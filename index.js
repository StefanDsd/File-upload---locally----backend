const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.post("/uploads", (req, res) => {
  const { file } = req.files;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  file.mv(`${path.resolve(".")}/uploads/${file.name}`, function (err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded!");
  });
});

app.listen(4000);