const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const newUsers = require("./models/newUsers");
const bands = require("./models/bands");

app.use(express.json());

// Database connection to SBA319 and server start
mongoose
  .connect(
    "mongodb+srv://sprowalc:3bBqQ1Evt3UKlGtt@barles.wx95pbz.mongodb.net/SBA319?retryWrites=true&w=majority&appName=Barles"
  )
  .then(() => {
    console.log("Connected to SBA319");
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}.`);
    });
  })
  .catch(() => {
    console.log("There was a problem connecting to SBA319");
  });

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the homepage for SBA319!");
});

app.get("/api/newusers", async (req, res) => {
  try {
    const newUsersData = await newUsers.find({});
    res.status(200).json(newUsersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/bands", async (req, res) => {
  try {
    const bandsData = await bands.find({});
    res.status(200).json(bandsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/newusers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newUserData = await newUsers.findById(id);
    res.status(200).json(newUserData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/newusers", async (req, res) => {
  try {
    const newUser = await newUsers.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/bands", async (req, res) => {
  try {
    const band = await bands.create(req.body);
    res.status(200).json(band);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
