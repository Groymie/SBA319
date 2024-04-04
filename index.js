const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const newUsers = require("./models/newUsers");

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

app.get("/api/newusers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newUsersData = await newUsers.findById(id);
    res.status(200).json(newUsersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/newusers", async (req, res) => {
  try {
    const product = await newUsers.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
