//ADMIN PASSWORT A14kfaLp1Z3SyaCY

import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import path from "path";

import Cards from "./dbCards.js";

// App Config
const app = express();

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("tinder-clone/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "tinder-clone", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:A14kfaLp1Z3SyaCY@cluster0.k2crc.mongodb.net/tinderdb?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

// API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("HELLO CLEVER PROGRAMMERS");
});

app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/card", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
