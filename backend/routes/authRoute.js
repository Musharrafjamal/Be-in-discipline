const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const listModel = require("../models/model");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;
    const user = new User({
      username,
      email,
      password,
      profilePic: profilePic,
    });
    // console.log(user)
    await user.save();
    res.status(200).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error while saving user: " + err.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    //checking is password valid

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Password invalid");
    }

    const token = jwt.sign({ userId: user._id }, "my_secret_key");
    res.json({ token, profilePic: user.profilePic });
  } catch (err) {
    res.send("Error while login user", err.message);
  }
});

router.post("/app/:username", async (req, res) => {
  const username = req.params.username;

  const item = req.body.item;
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  try {
    const items = await User.findOne({ username });
    // const newItem = new User({ title: title, item: item, date, time });

    if (!items) {
      return res.status(404).json({ error: "Object not found" });
    }

    items.item.push({ title: title, item: item, date, time });

    const saveItem = await items.save();
    res.status(201).json(saveItem);
  } catch (err) {
    console.error("Error occurs while posting data to server", err);
  }
});

router.get("/app/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const items = await User.findOne({ username });
    res.send(items);
  } catch (err) {
    console.log("Error occurs while posting data to server", err);
  }
});

router.delete("/app/:username/:i", async (req, res) => {
  try {
    const index = req.params.i;
    const username = req.params.username;
    const items = await User.findOne({ username });
    
    items.item.splice(index, 1);
    await items.save();
    res.send({ message: "item deleted successfully!"});
  } catch (err) {
    console.error("Error occurs while deleting data to server", err);
  }
});

module.exports = router;
