const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const listModel = require("./models/model.js");
require("dotenv").config();

const app = express();

//Middlewares

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Connect to DB
mongoose.connect(
  "mongodb+srv://musharrafjamal92:Nl3fqjnBt0OV8qqt@cluster1.gqt9nep.mongodb.net/?retryWrites=true&w=majority"
);

//GET home-page

app.get("/", async (req, res) => {
  try {
    const items = await listModel.find();
    res.send(items);
  } catch (err) {
    console.log("Error occurs while posting data to server", err);
  }
});

app.post("/", (req, res) => {
  const item = req.body.item;
  try {
    const newItem = new listModel({ item: item });
    const saveItem = newItem.save();
    res.status(201).json(saveItem);
  } catch (err) {
    console.error("Error occurs while posting data to server", err);
  }
});

app.delete("/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const deleteItem = await listModel.findByIdAndDelete(itemId);

    if (!deleteItem) {
      return res.status(404).send("Item not found");
    }
    res.send({ message: "item deleted successfully!", deleteItem });
  } catch (err) {
    console.error("Error occurs while deleting data to server", err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
